var editorManager = {
  isEditable: function(filename, size) {
    if(size != null && size < serverSettings.maxEditSize && (serverSettings.editorAllowedExts === false || serverSettings.editorAllowedExts.indexOf(filename.split(".").pop().toLowerCase()) !== -1)) {
      return true;
    }

    return false;
  },

  error: function(type, error_vars, additional_data) {
    additional_data = (additional_data === undefined) ? {} : additional_data;

    // wrapper method for future use
    errorManager.viewError(type, error_vars, additional_data);
  },

  fetchFile: function(path, callback) {
    uiManager.setHold(true);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
        uiManager.setHold(false);
        if(this.status === 200) {
          if(this.responseText.length > serverSettings.maxEditSize) {
            editorManager.error("editor_too_big");
            return;
          }

          callback(path, this.responseText);
        } else {
          editorManager.error("editor_http_error");
        }
      }
    }
    xhr.open("GET", path + ("?cachebreaker=" + Math.random()), true);
    xhr.send();
  },

  enableSave: function(to) {
    document.getElementById("editor-save").disabled = !to;
  },

  enterEditor: function(path) {
    globals.editorPath = false;
    fab.hide(true);
    document.getElementById("editor-textarea").value = "";

    editorManager.fetchFile(path, editorManager.enterEditorCallback);
  },

  enterEditorCallback: function(path, response) {
    document.getElementById("editor-textarea").value = response;

    globals.editorPath = path;
    uiManager.changeTitle("Úprava souboru " + tools.xssFilter(path.split("/").pop()));
    uiManager.changeView("editor");
    editorManager.setUnsaved(false);
  },

  exitEditor: function() {
    if(!editorManager.isUnsaved()) {
      editorManager.exitEditorCallback();
      return;
    }

    actionDialogManager.discardChangesEditor(globals.editorPath);
  },

  exitEditorCallback: function() {
    dirListManager.refreshDirList();
    editorManager.setUnsaved(false);
  },

  save: function() {
    var filename = globals.editorPath.split("/").pop();
    var contents = encodeURIComponent(document.getElementById("editor-textarea").value);

    api.call("saveeditedfile", ["uložení zeditovaného souboru"], (api.prepareFileList(filename) + "&fileContent=" + contents), function(json) {
      editorManager.saveCallback();
    });
  },

  saveCallback: function() {
    editorManager.setUnsaved(false);
  },

  isUnsaved: function() {
    return globals.editorHasChanged;
  },

  scanUnsaved: function() {
    editorManager.enableSave(globals.editorHasChanged);
  },

  setUnsaved: function(to) {
    globals.editorHasChanged = to;
    editorManager.scanUnsaved();
  }
}
