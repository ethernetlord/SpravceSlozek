var fab = {
  hide: function(hide) {
    document.getElementById("fab").style.display = ((hide) ? "none" : "block");
  },

  changeFAB: function(css_class, image, title, where, callback) {
    var fabBtn = document.getElementById("fab");
    fab.hide(false);

    // css_class
    var cl = fabBtn.classList;
    for(var i = 0; i < cl.length; i++) {
      if(cl[i].substr(0, 4) === "btn-") {
        cl.remove(cl[i]);
      }
    }
    cl.add("btn-" + css_class);

    fabBtn.style.backgroundImage = 'url("img/' + image + '.png")'; // image
    fabBtn.title = title; // title
    fabBtn.removeAttribute("onclick");

    // where
    if(where !== null) {
      fabBtn.setAttribute("onclick", "uiManager.changeView('" + where + "');"); // where
    }

    // callback
    if(callback !== null) {
      fabBtn.onclick = function() {
        if(where !== null) {
          uiManager.changeView(where);
        }
        callback();
      }
    }
  },

  changeFAB_goBack: function(where, callback) {
    callback = (callback === undefined) ? null : callback;

    fab.changeFAB("dark", "back", "Zpět", where, callback);
  },

  changeFAB_dirTree: function() {
    fab.changeFAB("primary", "folder", "Informace o aktuální složce", null, function() {
      dirTreeManager.viewDirTree();
    });
  },

  changeFAB_fileSelect: function() {
    fab.changeFAB("success", "check", "Provést akci s vybranými položkami", null, function() {
      selectBoxes.displayView();
    });
  }
}
