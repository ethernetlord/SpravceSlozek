var dirListManager = {
  refreshDirList: function(callback) {
    callback = (callback === undefined) ? null : callback;

    api.call("dirlist", ["získání stromu složek"], null, function(json) {
      if(!json || !json.folders || !json.folders.length) {
        errorManager.viewError("no_rootdirs", ["získání stromu složek"], json);
        return;
      }
      globals.dirTree = json;
      globals.prevDirTree = json;
      searchManager.lastSearchInDir = null;
      if(typeof callback === "function") {
        callback();
      } else {
        dirListManager.viewDirList(); // will use full name of object everytime, because we are calling "static" function
      }
    });
  },

  rootDirSelector: function() {
    if(!globals.dirTree || !globals.dirTree.folders || !globals.dirTree.folders.length) {
      errorManager.viewError("no_rootdirs", ["získání stromu složek"], json);
      return;
    }

    tools.removeQueryStringParam("dir"); // removing because it is invalid, otherwide we wouldn't be selecting new directory
    var rootDirList = document.getElementById("selectRootDir");
    rootDirList.innerHTML = "";
    for(var i = 0; i < globals.dirTree.folders.length; i++) {
      rootDirList.innerHTML += '<button class="intmf-hold list-group-item list-group-item-action list-group-item-primary font-weight-bold btn btn-primary font-weight-bold mb-1" \
      onclick="dirListManager.rootDirSelected(\'' + globals.dirTree.folders[i].name + '\');">' + tools.xssFilter(tools.slashDir(globals.dirTree.folders[i].name)) + '</button>';
    }
    uiManager.setHold(true, ["intmf-nvhold", "navbarHeld"]);
    uiManager.changeTitle("Výběr kořenové složky");
    uiManager.changeView("selectRootDir");
  },

  rootDirSelected: function(name) {
    uiManager.setHold(false, ["intmf-nvhold", "navbarHeld"]);
    uiManager.changeView("dirList");
    dirListManager.changeDir(name);
  },

  viewDirList: function() {
    if(globals.currentDir === false) {
      dirListManager.rootDirSelector();
      return;
    }

    var currDir = false;
    if(document.getElementById("dirList-searchBox").value === "") {
      var tm = new TreeManager(globals.dirTree);
      currDir = tm.getDirContents(globals.currentDir);
    } else {
      currDir = dirListManager.search();
    }

    if(currDir === false) {
      dirListManager.rootDirSelector();
      return;
    }
    currDir = dirListManager.sort(currDir);

    var dirList_html = '<button class="intmf-hold mf-break-all list-group-item list-group-item-action list-group-item-secondary py-1 font-weight-bold font-italic" onclick="dirListManager.upDir();">\
    <input type="checkbox" class="mf-list-checkbox form-check-inline float-left invisible">\
    <img class="mf-list-icon float-left mr-2" src="' + tools.getBackIcon() + '">../ (o úroveň výš)</button>';

    var folder_iconpath = tools.getDirFileType("iconpath");
    for(var i = 0; i < currDir.folders.length; i++) {
      dirList_html += '<li class="list-group-item list-group-item-action list-group-item-secondary py-1">\
      <input type="checkbox" class="intmf-dir-selectors mf-list-checkbox form-check-inline float-left" value="' + tools.xssFilter(currDir.folders[i].name) + '" onchange="selectBoxes.select(false);">\
      <a title="Zobrazit informace o složce" class="intmf-hold float-right" onclick="return uiManager.checkHold();" href="javascript:fileDetailsManager.viewFolderDetails(\'' + tools.xssFilter(tools.absolutePath(currDir.folders[i].name)) + '\');"><img class="mf-list-icon mf-list-righticon float-right" src="img/info.png"></a>\
      <a class="intmf-hold mf-break-all mf-listitem-a font-weight-bold" onclick="return uiManager.checkHold();" href="javascript:dirListManager.changeDir(\'' + tools.xssFilter(tools.absolutePath(currDir.folders[i].name)) + '\');">\
      <img class="mf-list-icon float-left mr-2" src="' + folder_iconpath + '">' + tools.xssFilter(currDir.folders[i].name) + '\
      </a></li>';
    }

    for(var i = 0; i < currDir.files.length; i++) {
      dirList_html += '<li class="list-group-item list-group-item-action list-group-item-secondary py-1">\
      <input type="checkbox" class="intmf-file-selectors mf-list-checkbox form-check-inline float-left" value="' + tools.xssFilter(currDir.files[i].name) + '" onchange="selectBoxes.select(true);">\
      <a title="Stáhnout soubor" class="intmf-hold float-right" href="' + tools.xssFilter(tools.absolutePath(currDir.files[i].name)) + '" target="_blank" download><img class="mf-list-icon mf-list-righticon float-right" src="img/download-black.png"></a>\
      <span class="d-none d-xl-inline mr-3 float-right">' + tools.convertUnixTime(currDir.files[i].last_mod, false, false) + '</span>\
      <span class="d-none d-xl-inline mr-3 float-right">' + tools.convertSize(currDir.files[i].size, 0) + '</span>\
      <a title="Zobrazit informace o souboru" class="intmf-hold mf-break-all mf-listitem-a font-weight-bold" onclick="return uiManager.checkHold();" href="javascript:fileDetailsManager.viewFileDetails(\'' + tools.xssFilter(tools.absolutePath(currDir.files[i].name)) + '\');">\
      <img class="mf-list-icon float-left mr-2" src="' + tools.getFileType(currDir.files[i].name, "iconpath") + '">' + tools.xssFilter(currDir.files[i].name) + '\
      </a></li>';
    }

    document.getElementById("dirList").innerHTML = dirList_html;



    uiManager.changeTitle("Obsah složky " + tools.xssFilter(tools.slashDir(globals.currentDir)));
    uiManager.changeView("dirList");
  },

  changeDir: function(path) {
    globals.currentDir = path;
    if(path !== false) {
      tools.setQueryStringParam("dir", path);
    }
    dirListManager.viewDirList();
  },

  upDir: function() {
    var splitted = globals.currentDir.split("/");
    splitted.pop();
    dirListManager.changeDir((splitted.length) ? splitted.join("/") : false);
  },

  initView: function() {
    var path = tools.getQueryStringParam("dir");
    var tm = new TreeManager(globals.dirTree);
    if(path !== false && tm.getDirContents(path) !== false) {
      dirListManager.rootDirSelected(path);
    } else {
      dirListManager.viewDirList(); // it will call dirListManager.rootDirSelector() if needed
    }
  },

  search: function() {
    var value = document.getElementById("dirList-searchBox").value.toLowerCase();

    var tm = new TreeManager(globals.dirTree);
    var tree = tm.getDirContents(globals.currentDir);
    if(tree === false) {
      dirListManager.rootDirSelector();
      return;
    }
    new_tree = tools.copyObject(tree);
    new_tree.folders = [];
    new_tree.files = [];

    for(var i = 0; i < tree.folders.length; i++) {
      if(tree.folders[i].name.toLowerCase().indexOf(value) !== -1) {
        new_tree.folders.push(tree.folders[i]);
      }
    }
    for(var i = 0; i < tree.files.length; i++) {
      if(tree.files[i].name.toLowerCase().indexOf(value) !== -1) {
        new_tree.files.push(tree.files[i]);
      }
    }

    return new_tree;
  },

  sort: function(dir) {
    var sortByName = function(item1, item2) {
      item1 = item1.name.toLowerCase();
      item2 = item2.name.toLowerCase();

      // special sort for items with numeric names
      var item1_num = parseInt(item1);
      var item2_num = parseInt(item2);
      if(!isNaN(item1_num) && !isNaN(item2_num)) {
        return (item1_num - item2_num);
      }

      // if the names are textual, compare them using localeCompare() and return the result
      return item1.localeCompare(item2);
    }

    var sortBySize = function(item1, item2) {
      return (item1.size - item2.size);
    }

    var sortByLastMod = function(item1, item2) {
      return (item1.last_mod - item2.last_mod);
    }

    dir = tools.copyObject(dir);
    var way = tools.selectorValue(document.getElementById("dirList-sortSelect"));

    switch(way.slice(0, 4)) {
      case "name":
        dir.folders.sort(sortByName);
        dir.files.sort(sortByName);
        break;

      case "size":
        dir.folders.sort(sortByName); // because folders have no size; possible other options: sort by item count, total file size
        dir.files.sort(sortBySize);
        break;

      case "last":
        dir.folders.sort(sortByLastMod);
        dir.files.sort(sortByLastMod);
        break;
    }

    if(way.slice(-4) === "desc") {
      dir.folders.reverse();
      dir.files.reverse();
    }

    return dir;
  },

  clearSearchBox: function() {
    if(event.target.value !== "") {
      event.target.value = "";
      dirListManager.viewDirList();
    }
  }
}
