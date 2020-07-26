var fileDetailsManager = {
  viewDetails: function(path, isFile, goBack_where) {
    var tm = new TreeManager(globals.dirTree);
    var props = (isFile ? tm.getFileProperties(path) : tm.getDirContents(path));

    var dir = path.split("/");
    var file = dir.pop();
    var funcNamePart = (isFile ? "File" : "Folder");

    document.getElementById("fileDetails-icon").src = (isFile ? tools.getFileType(file, "iconpath") : tools.getDirFileType("iconpath"));
    document.getElementById("fileDetails-name").innerHTML = tools.xssFilter(file);
    document.getElementById("fileDetails-type").innerHTML = (isFile ? tools.getFileType(file, "desc") : tools.getDirFileType("desc"));

    document.getElementById("fileDetails-dir").innerHTML = tools.xssFilter(tools.slashDir(dir.join("/")));
    document.getElementById("fileDetails-size").parentNode.style.display = (isFile ? "list-item" : "none");
    document.getElementById("fileDetails-size").innerHTML = (isFile ? tools.convertSize(props.size) : "");
    document.getElementById("fileDetails-lastmod").innerHTML = tools.convertUnixTime(props.last_mod, true, true);

    document.getElementById("fileDetails-itemcount").parentNode.style.display = (isFile ? "none" : "list-item");
    document.getElementById("fileDetails-itemcount").innerHTML = (isFile ? "" : dirTreeManager.getDirTotalItems(props));
    document.getElementById("fileDetails-itemsize").parentNode.style.display = (isFile ? "none" : "list-item");
    document.getElementById("fileDetails-itemsize").innerHTML = (isFile ? "" : dirTreeManager.getDirFilesTotalSize(props));

    document.getElementById("fileDetails-view").style.display = ((isFile && tools.viewableFileType(file)) ? "inline-block" : "none");
    document.getElementById("fileDetails-view").href = tools.xssFilter(path);
    document.getElementById("fileDetails-download").style.display = (isFile ? "inline-block" : "none");
    document.getElementById("fileDetails-download").href = tools.xssFilter(path);
    document.getElementById("fileDetails-preview").style.display = ((isFile && tools.viewableFileType(file, true)) ? "inline-block" : "none");
    document.getElementById("fileDetails-preview").href = "javascript:fileDetailsManager.filePreview('" + tools.xssFilter(path) + "');";
    document.getElementById("fileDetails-edit").style.display = ((isFile && editorManager.isEditable(file, props.size)) ? "inline-block" : "none");
    document.getElementById("fileDetails-edit").href = "javascript:editorManager.enterEditor('" + tools.xssFilter(path) + "');";
    document.getElementById("fileDetails-archive").style.display = (serverSettings.archiveDownloadsAllowed ? "inline-block" : "none");
    document.getElementById("fileDetails-archive").href = ("javascript:fileDetailsManager.prepare" + funcNamePart + "Archive('" + tools.xssFilter(path) + "');");

    document.getElementById("fileDetails-delete").setAttribute("onclick", "fileDetailsManager.delete" + funcNamePart + "('" + tools.xssFilter(path) + "');");
    document.getElementById("fileDetails-rename").setAttribute("onclick", "fileDetailsManager.rename" + funcNamePart + "('" + tools.xssFilter(path) + "');");
    document.getElementById("fileDetails-move").setAttribute("onclick", "fileDetailsManager.move" + funcNamePart + "('" + tools.xssFilter(path) + "');");
    document.getElementById("fileDetails-copy").style.display = (isFile ? "inline-block" : "none");
    document.getElementById("fileDetails-copy").setAttribute("onclick", "fileDetailsManager.copyFile('" + tools.xssFilter(path) + "');");

    fileDetailsManager.resetHash();
    if(isFile) {
      var hash_btns = document.getElementsByClassName("intmf-hash-buttons");
      for(var i = 0; i < hash_btns.length; i++) {
        hash_btns[i].setAttribute("onclick", "fileDetailsManager.hashFile('" + (hash_btns[i].innerHTML.toLowerCase()) + "', '" + tools.xssFilter(tools.absolutePath(file)) + "');");
      }
    }
    document.getElementById("fileDetails-hash").parentNode.style.display = (isFile ? "block" : "none");

    fab.changeFAB_goBack(goBack_where);
    uiManager.changeTitle("Informace o " + (isFile ? "souboru" : "složce") + " " + tools.xssFilter(file));
    uiManager.changeView("fileDetails");
  },

  viewFileDetails: function(path) {
    fileDetailsManager.viewDetails(path, true, "dirList");
  },

  viewFolderDetails: function(path) {
    fileDetailsManager.viewDetails(path, false, "dirList");
  },

  viewFileDetails_fromSearch: function(path) {
    fileDetailsManager.viewDetails(path, true, "searchView");
  },

  viewFolderDetails_fromSearch: function(path) {
    fileDetailsManager.viewDetails(path, false, "searchView");
  },

  filePreview: function(path) {
    path = tools.xssFilter(path);
    var filename = path.split("/").pop();
    var display_type = tools.viewableFileType(filename, true);
    if(!display_type) {
      return;
    }

    $("#previewDialog").on("hidden.bs.modal", function() {
      fileDetailsManager.resetPreviewDialog();
    });

    document.getElementById("previewDialog-title").innerHTML = tools.xssFilter(filename);
    var body = document.getElementById("previewDialog-body");
    switch(display_type) {
      case "image":
        body.innerHTML = '<img class="img-thumbnail img-fluid" src="' + path + '">';
        break;

      case "audio":
        body.innerHTML = '<audio class="mf-preview-media" controls preload="metadata" src="' + path + '"></audio>';
        break;

      case "video":
        body.innerHTML = '<video class="mf-preview-media" controls preload="metadata" src="' + path + '"></video>';
        break;
    }

    document.getElementById("previewDialog-open").click();
  },

  resetPreviewDialog: function() {
    document.getElementById("previewDialog-body").innerHTML = "";
  },

  resetHash: function() {
    var all_hash_btns = document.getElementsByClassName("intmf-hash-buttons");
    for(var i = 0; i < all_hash_btns.length; i++) {
      all_hash_btns[i].classList.remove("active");
    }
    document.getElementById("fileDetails-hash").innerHTML = "";
  },

  hashFile: function(algo, filename) {
    fileDetailsManager.resetHash();

    var algo = event.target.innerHTML.toLowerCase();
    event.target.classList.add("active");

    api.call("hashfile", ["získání hashe souboru"], (api.prepareFileList(filename.split("/").pop()) + "&algo=" + algo), function(json) {
      document.getElementById("fileDetails-hash").innerHTML = tools.xssFilter(json.hash);
    });
  },

  deleteFile: function(path) {
    actionDialogManager.deleteFiles([path.split("/").pop()]);
  },

  renameFile: function(path) {
    actionDialogManager.rename([path.split("/").pop()], "soubor");
  },

  moveFile: function(path) {
    actionDialogManager.move([path.split("/").pop()], "soubor");
  },

  copyFile: function(path) {
    actionDialogManager.copyFiles([path.split("/").pop()]);
  },

  prepareFileArchive: function(path) {
    actionDialogManager.prepareArchive([path.split("/").pop()], "soubor");
  },

  deleteFolder: function(path) {
    actionDialogManager.deleteFolders([path.split("/").pop()]);
  },

  renameFolder: function(path) {
    actionDialogManager.rename([path.split("/").pop()], "složka");
  },

  moveFolder: function(path) {
    actionDialogManager.move([path.split("/").pop()], "složka");
  },

  prepareFolderArchive: function(path) {
    actionDialogManager.prepareArchive([path.split("/").pop()], "složka");
  }
}
