var selectBoxes = {
  getBoxes: function(what) {
    switch(what) {
      case "files":
        return document.getElementsByClassName("intmf-file-selectors");
      case "folders":
        return document.getElementsByClassName("intmf-dir-selectors");
      case "all":
        return document.querySelectorAll(".intmf-file-selectors, .intmf-dir-selectors");
    }
  },

  getSelectedBoxes: function() {
    var boxes = selectBoxes.getBoxes("all");
    var selectedBoxes = [];
    for(var i = 0; i < boxes.length; i++) {
      if(boxes[i].checked) {
        selectedBoxes.push(boxes[i]);
      }
    }
    return selectedBoxes;
  },

  getSelectedFileNames: function(what) {
    return selectBoxes.getSelectedBoxes().map(function(item) {
      return item.value;
    });
  },

  iterBoxes: function(what, apply_fun) {
    var boxes = selectBoxes.getBoxes(what);
    for(var i = 0; i < boxes.length; i++) {
      apply_fun(boxes[i]);
    }
  },

  checkIfAtLeastOneChecked: function(what) {
    what = (what === undefined) ? "all" : what;

    var boxes = selectBoxes.getBoxes(what);
    for(var i = 0; i < boxes.length; i++) {
      if(boxes[i].checked) {
        return true;
      }
    }
    return false;
  },

  getSelectedType: function() {
    var files = selectBoxes.checkIfAtLeastOneChecked("files");
    var folders = selectBoxes.checkIfAtLeastOneChecked("folders");
    if(files && folders) {
      return "all";
    }
    if(files) {
      return "files";
    }
    if(folders) {
      return "folders";
    }
    return null;
  },

  select: function(is_file) {
    /*selectBoxes.iterBoxes((is_file ? "folders" : "files"), function(node) {
      node.disabled = true;
    });*/

    selectBoxes.rescanSelection();
  },

  rescanSelection: function() {
    if(selectBoxes.checkIfAtLeastOneChecked()) {
      fab.changeFAB_fileSelect();
    } else {
      /*selectBoxes.iterBoxes("all", function(node) {
        node.disabled = false;
      });*/
      fab.changeFAB_dirTree();
    }
  },

  autoSelect_selectAll: function(goBack) {
    goBack = (goBack === undefined) ? true : goBack;

    selectBoxes.iterBoxes(selectBoxes.getSelectedType(), function(node) {
      if(!node.checked) {
        node.click();
      }
    });
    if(goBack) {
      selectBoxes.goBackToDirList();
    }
  },

  autoSelect_invertSelection: function(goBack) {
    goBack = (goBack === undefined) ? true : goBack;

    selectBoxes.iterBoxes(selectBoxes.getSelectedType(), function(node) {
      node.click();
    });
    if(goBack) {
      selectBoxes.goBackToDirList();
    }
  },

  autoSelect_deselectAll: function(limitToCurrentlySelectedType, goBack) {
    limitToCurrentlySelectedType = (limitToCurrentlySelectedType === undefined) ? false : limitToCurrentlySelectedType;
    goBack = (goBack === undefined) ? true : goBack;

    selectBoxes.iterBoxes((limitToCurrentlySelectedType ? selectBoxes.getSelectedType() : "all"), function(node) {
      if(node.checked) {
        node.click();
      }
    });
    if(goBack) {
      selectBoxes.goBackToDirList();
    }
  },

  displayView: function() {
    var type = selectBoxes.getSelectedType();
    var names = selectBoxes.getSelectedFileNames();

    var len = names.length;
    var titleSelectionType = null;
    var czechFunctionsTypeArg = null;
    switch(type) {
      case "files":
        titleSelectionType = "souborů";
        czechFunctionsTypeArg = "soubor";
        break;

      case "folders":
        titleSelectionType = "složek";
        czechFunctionsTypeArg = "složka";
        break;

      case "all":
        titleSelectionType = "souborů nebo složek";
        czechFunctionsTypeArg = "oboje";
        break;
    }
    var list = document.getElementById("selectDone-list");

    document.getElementById("selectDone-title").innerHTML = "Výběr " + titleSelectionType;
    document.getElementById("selectDone-subtitle").innerHTML = "Vybrali jste <b>" + len + " " + tools.czechEngineNumbering(len, czechFunctionsTypeArg, "u") + "</b> ve složce <b>" + tools.xssFilter(tools.slashDir(globals.currentDir)) + "</b>.";

    document.getElementById("selectDone-list-title").innerHTML = "Seznam vybraných " + titleSelectionType + ":";
    list.innerHTML = "";
    for(var i = 0; i < len; i++) {
      list.innerHTML += ('<li class="mf-break-all">' + tools.xssFilter(names[i]) + "</li>");
    }

    var funcNamePart = tools.upperCaseFirst(type);
    document.getElementById("selectDone-archive").style.display = (serverSettings.archiveDownloadURL ? "inline-block" : "none");
    document.getElementById("selectDone-archive").href = "javascript:selectBoxes.prepare" + funcNamePart + "Archive();";

    document.getElementById("selectDone-delete").style.display = (type === "all" ? "none" : "inline-block");
    document.getElementById("selectDone-delete").setAttribute("onclick", "selectBoxes.delete" + funcNamePart + "();");
    document.getElementById("selectDone-rename").setAttribute("onclick", "selectBoxes.rename" + funcNamePart + "();");
    document.getElementById("selectDone-move").setAttribute("onclick", "selectBoxes.move" + funcNamePart + "();");
    document.getElementById("selectDone-copy").style.display = (type === "files" ? "inline-block" : "none");
    document.getElementById("selectDone-copy").setAttribute("onclick", "selectBoxes.copyFiles();");

    fab.changeFAB_goBack(null, selectBoxes.goBackToDirList);
    uiManager.changeTitle("Výběr " + titleSelectionType);
    uiManager.changeView("selectDone");
  },

  goBackToDirList: function() {
    uiManager.changeView("dirList");
  },

  deleteFiles: function() {
    actionDialogManager.deleteFiles(selectBoxes.getSelectedFileNames());
  },

  deleteFolders: function() {
    actionDialogManager.deleteFolders(selectBoxes.getSelectedFileNames());
  },

  renameFiles: function() {
    actionDialogManager.rename(selectBoxes.getSelectedFileNames(), "soubor");
  },

  renameFolders: function() {
    actionDialogManager.rename(selectBoxes.getSelectedFileNames(), "složka");
  },

  renameAll: function() {
    actionDialogManager.rename(selectBoxes.getSelectedFileNames(), "oboje");
  },

  moveFiles: function() {
    actionDialogManager.move(selectBoxes.getSelectedFileNames(), "soubor");
  },

  moveFolders: function() {
    actionDialogManager.move(selectBoxes.getSelectedFileNames(), "složka");
  },

  moveAll: function() {
    actionDialogManager.move(selectBoxes.getSelectedFileNames(), "oboje");
  },

  copyFiles: function() {
    actionDialogManager.copyFiles(selectBoxes.getSelectedFileNames());
  },

  prepareFilesArchive: function() {
    actionDialogManager.prepareArchive(selectBoxes.getSelectedFileNames(), "soubor");
  },

  prepareFoldersArchive: function() {
    actionDialogManager.prepareArchive(selectBoxes.getSelectedFileNames(), "složka");
  },

  prepareAllArchive: function() {
    actionDialogManager.prepareArchive(selectBoxes.getSelectedFileNames(), "oboje");
  }
}
