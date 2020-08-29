var api = {
  call: function(action, error_vars, data, success_callback, progress_callback) {
    success_callback = (success_callback === undefined) ? null : success_callback;
    progress_callback = (progress_callback === undefined) ? null : progress_callback;

    uiManager.setHold(true);
    //fab.hide(true);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
        uiManager.setHold(false);
        //fab.hide(false);
        if(this.status === 200) {
          try {
            var json = JSON.parse(this.responseText.trim());
          } catch(err) {
            api.error("invalid_json", error_vars);
            return;
          }

          if(json.success) {
            if(success_callback === null) {
              dirListManager.refreshDirList();
            } else {
              success_callback(json);
            }
          } else {
            api.error(json.reason, error_vars, json);
          }
        } else {
          api.error("http_error", error_vars);
        }
      }
    }
    xhr.onabort = function() {
      // because we need to restore state when we abort upload too
      uiManager.setHold(false);
      //fab.hide(false);
    }

    if(progress_callback !== null) {
      xhr.upload.addEventListener("progress", function() {
        progress_callback(xhr);
      });
    }

    xhr.open("POST", serverSettings.apiUrl + "?a=" + action, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-SpravceSlozek-API", "Authorized-Request");

    if(data instanceof FormData) {
      data.append("dir", globals.currentDir);
    } else {
      data += ("&dir=" + encodeURIComponent(globals.currentDir));
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    xhr.send(data);
  },

  error: function(type, error_vars, additional_data) {
    additional_data = (additional_data === undefined) ? {} : additional_data;

    // wrapper method for future use
    errorManager.viewError(type, error_vars, additional_data);
  },

  renewSession: function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", serverSettings.apiUrl + "?a=sessionrenew");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-SpravceSlozek-API", "Authorized-Request");
    xhr.send("dir=" + encodeURIComponent(globals.currentDir));
  },

  prepareFileList: function(list1, list2 = null) {
    if(Array.isArray(list1) && Array.isArray(list2)) {
      if(list1.length !== list2.length) {
        return false;
      }

      var retstr = "";
      for(var i = 0; i < list1.length; i++) {
        retstr += ("files1[" + i + "]=" + encodeURIComponent(list1[i]) + "&files2[" + i + "]=" + encodeURIComponent(list2[i]) + "&");
      }
      return (retstr.slice(0, -1));
    }

    if(Array.isArray(list1)) {
      var retstr = "";
      for(var i = 0; i < list1.length; i++) {
        retstr += ("files[" + i + "]=" + encodeURIComponent(list1[i]) + "&");
      }
      return (retstr.slice(0, -1));
    }

    if(typeof list1 === "string") {
      return ("file=" + encodeURIComponent(list1));
    }

    return false;
  },

  newDirs: function(items) {
    api.call("newdir", ["vytvoření nových složek"], api.prepareFileList(items));
  },

  newFiles: function(items) {
    api.call("newfile", ["vytvoření nových textových souborů"], api.prepareFileList(items));
  },

  uploadFiles: function(fd, errorDesc, progressCallback) {
    api.call("upload", errorDesc, fd, null, progressCallback);
  },

  deleteFiles: function(items) {
    api.call("deletefile", ["smazání souborů"], api.prepareFileList(items));
  },

  deleteFolders: function(items) {
    api.call("deletedir", ["smazání složek"], api.prepareFileList(items));
  },

  rename: function(old_names, new_names) {
    api.call("rename", ["přejmenování souborů nebo složek"], api.prepareFileList(old_names, new_names));
  },

  move: function(destdir, old_names, new_names) {
    api.call("move", ["přesunutí souborů nebo složek"], (api.prepareFileList(old_names, new_names) + "&todir=" + encodeURIComponent(destdir)));
  },

  copyFiles: function(destdir, old_names, new_names) {
    api.call("copyfile", ["kopírování souborů"], (api.prepareFileList(old_names, new_names) + "&todir=" + encodeURIComponent(destdir)));
  }
}
