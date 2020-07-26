var uiManager = {
  changeViewCallback: function(name, callback, doPredefinedCallback) {
    if(callback !== null) {
      callback();
      if(!doPredefinedCallback) {
        return;
      }
    }

    switch(name) {
      case "dirList":
        selectBoxes.rescanSelection();
        if(globals.currentDir !== false) {
          uiManager.changeTitle("Obsah složky " + tools.xssFilter(tools.slashDir(globals.currentDir)));
        }
        break;

      case "selectRootDir":
        fab.hide(true);
        break;

      case "searchView":
        fab.changeFAB_goBack("dirList");
        uiManager.changeTitle("Pokročilé vyhledávání");
        break;
    }

    uiManager.changeNavbar((name === "editor" ? "editor" : "hlavni"));
  },

  changeView: function(name, callback, doPredefinedCallback) {
    callback = (callback === undefined) ? null : callback;
    doPredefinedCallback = (doPredefinedCallback === undefined) ? true : doPredefinedCallback;

    var elems = document.getElementsByClassName("intmf-view");
    for(var i = 0; i < elems.length; i++) {
      elems[i].style.display = ((elems[i].id === (name + "Wrapper")) ? "block" : "none");
    }
    uiManager.changeViewCallback(name, callback, doPredefinedCallback);
  },

  changeNavbar: function(name, callback = null) {
    callback = (callback === undefined) ? null : callback;

    var elems = document.getElementsByClassName("intmf-navbar");
    for(var i = 0; i < elems.length; i++) {
      elems[i].style.display = ((elems[i].id === ("navbar-" + name)) ? "flex" : "none");
    }

    if(callback !== null) {
      callback();
    }
  },

  changeTitle: function(to) {
    to = (to === undefined) ? "SpravceSlozek" : to;

    to = tools.xssFilter(to);
    document.title = to;
    document.getElementById("navbar-title").innerHTML = to;
  },

  checkHold: function(what = "allActionsHeld") {
    return !(globals[what]);
  },

  setHold: function(to, what) {
    what = (what === undefined) ? ["intmf-hold", "allActionsHeld"] : what;

    var elems = document.getElementsByClassName(what[0]);

    globals[what[1]] = to;
    for(var i = 0; i < elems.length; i++) {
      var tn = elems[i].tagName.toLowerCase();
      if(tn === "button" || tn === "input") { // because we are adding this class to links too, for now only for future use
        elems[i].disabled = to;
      }
    }
  },

  setActionDialogHold: function(to) {
    document.getElementById("actionDialog-yes").disabled = !to;
  },

  programInfoDialog_prepare: function() {
    document.getElementById("programInfoDialog-version").innerHTML = tools.xssFilter(serverSettings.programVersion);
  },

  programInfoDialog_show: function() {
    document.getElementById("programInfoDialog-open").click();
  }
}
