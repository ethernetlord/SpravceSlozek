var actionDialogManager = {
  dialogSet: function(title, body, yes_text, yes_callback, no_text, no_callback) {
    no_text = (no_text === undefined) ? "Zrušit" : no_text; // treating default arguments like this because IE
    no_callback = (no_callback === undefined) ? null : no_callback;

    document.getElementById("actionDialog-title").innerHTML = title; // title
    document.getElementById("actionDialog-body").innerHTML = body; // body

    // yes_callback / yes_text
    var yes_btn = document.getElementById("actionDialog-yes");
    if(typeof yes_callback === "string") {
      yes_btn.setAttribute("onclick", yes_callback + " actionDialogManager.successClose();");
    } else {
      yes_btn.onclick = (function() {
        yes_callback();
        actionDialogManager.successClose();
      });
    }
    yes_btn.innerHTML = yes_text;

    // no_callback
    var no_btn = document.getElementById("actionDialog-no");
    if(no_callback === null) {
      no_btn.removeAttribute("onclick");
    } else if(typeof no_callback === "string") {
      no_btn.setAttribute("onclick", no_callback);
    } else {
      no_btn.onclick = no_callback;
    }
    no_btn.innerHTML = no_text;

    document.getElementById("actionDialog-open").click();
  },

  successClose: function() {
    var no_btn = document.getElementById("actionDialog-no");
    no_btn.removeAttribute("onclick");
    no_btn.click();
  },

  newDirs: function() {
    var title = "Nová složka";
    var body = 'Zadejte názvy nových složek, které chcete vytvořit: <div class="mt-1 mb-3"><div class="mb-2" id="newDirs-multiinput"></div>' + multiInput.giveAdditionBtn('newDirs-multiinput') + multiInput.giveRemovalBtn("newDirs-multiinput") + '</div>Složky budou vytvořeny v aktuální složce, tedy <b class="mf-break-all">' + tools.xssFilter(tools.slashDir(globals.currentDir)) + "</b>.";
    var yes_callback = (function() {
      api.newDirs(multiInput.getTextValues("newDirs-multiinput"));
    });

    actionDialogManager.dialogSet(title, body, "Vytvořit", yes_callback, "Zrušit");
    uiManager.setActionDialogHold(true);
    multiInput.addText("newDirs-multiinput");
  },

  newFiles: function() {
    var allowed_exts = "";
    if(serverSettings.editorAllowedExts !== false) {
      allowed_exts += "<br>Povolené přípony jsou: ";
      for(var i = 0; i < serverSettings.editorAllowedExts.length; i++) {
        if(i === (serverSettings.editorAllowedExts.length - 1)) {
          allowed_exts = allowed_exts.slice(0, -2);
          allowed_exts += (" a <b>." + serverSettings.editorAllowedExts[i] + "</b>.");
        } else {
          allowed_exts += ("<b>." + serverSettings.editorAllowedExts[i] + "</b>, ");
        }
      }
    }

    var title = "Nový soubor";
    var body = 'Zadejte názvy nových <b>textových souborů</b>, které chcete vytvořit: <div class="mt-1 mb-3"><div class="mb-2" id="newFiles-multiinput"></div>' + multiInput.giveAdditionBtn('newFiles-multiinput') + multiInput.giveRemovalBtn("newFiles-multiinput") + '</div>Soubory budou vytvořeny v aktuální složce, tedy <b class="mf-break-all">' + tools.xssFilter(tools.slashDir(globals.currentDir)) + "</b> a budete je následně moci naplnit obsahem pomocí editoru.<br>" + allowed_exts;
    var yes_callback = (function() {
      api.newFiles(multiInput.getTextValues("newFiles-multiinput"));
    });

    actionDialogManager.dialogSet(title, body, "Vytvořit", yes_callback, "Zrušit");
    uiManager.setActionDialogHold(true);
    multiInput.addText("newFiles-multiinput");
  },

  genericDelete: function(items, isFile) { // "items" must be an array!!
    if(!Array.isArray(items)) {
      return;
    }

    var len = items.length;
    var type = (isFile ? "soubor" : "složka");
    var list_html = "";
    for(var i = 0; i < items.length; i++) {
      list_html += '<li class="mf-break-all font-weight-bold"><i class="font-weight-normal">' + tools.xssFilter(items[i]) + '</i></li>';
    }

    var title = "Smazat " + tools.czechEngine(len, type);
    var body = "Opravdu chcete smazat <b>" + len + " " + tools.czechEngineNumbering(len, type, "u") + '</b>?<br><ol class="mf-ol-smallmargin">' + list_html + "</ol>Tato akce je nevratná!";
    if(!isFile) body += "<br>Složka musí být prázdná, jinak nebude moci být smazána!";

    var yes_callback = (isFile ? (function() {
      api.deleteFiles(items);
    }) : (function() {
      api.deleteFolders(items);
    }));

    actionDialogManager.dialogSet(title, body, "Ano, smazat", yes_callback, "Ne, nemazat");
    uiManager.setActionDialogHold(true);
  },

  deleteFiles: function(items) {
    actionDialogManager.genericDelete(items, true);
  },

  deleteFolders: function(items) {
    actionDialogManager.genericDelete(items, false);
  },

  rename: function(items, what) { // what = soubor, složka
    if(!Array.isArray(items) || !what) {
      return;
    }

    var len = items.length;
    var renameBoxes = multiInput.giveChangeNameBoxHTML("rename-multiinput", items);

    var title = "Přejmenovat " + tools.czechEngine(len, what);
    var body = "Budete přejmenovávat <b>" + len + " " + tools.czechEngineNumbering(len, what, "u") + '</b>.<br>' + ((what === "složka") ? "" : '<b>Přípony zadejte</b> i do nových názvů souborů, jestliže je nechcete měnit!<br>') + '<div class="mt-3 mb-2" id="rename-multiinput">' + renameBoxes + '</div>';
    var yes_callback = (function() {
      api.rename(items, multiInput.getTextValues("rename-multiinput"));
    });

    actionDialogManager.dialogSet(title, body, "Přejmenovat", yes_callback, "Zrušit");
    uiManager.setActionDialogHold(true);
  },

  move: function(items, what) {
    if(!Array.isArray(items) || !what) {
      return;
    }

    var len = items.length;
    var renameBoxes = multiInput.giveChangeNameBoxHTML("move-multiinput", items);
    var czechPart = tools.czechEngine(len, what);

    var title = "Přesunout " + czechPart;
    var body = "Budete přesouvat <b>" + len + " " + tools.czechEngineNumbering(len, what, "u") + "</b>. Budete-li " + czechPart + " chtít před přesunem přejmenovat, můžete tak učinit níže.<br>" + multiInput.giveFolderSelector("move-multidir", false, items) + '<details class="mt-3"><summary class="font-weight-bold">Přejmenovat ' + czechPart + '</summary>' + ((what === "složka") ? "" : '<b>Přípony zadejte</b> i do nových názvů souborů, jestliže je nechcete měnit!<br>') + '<div class="mt-3 mb-1" id="move-multiinput">' + renameBoxes + '</div></details>';
    var yes_callback = (function() {
      api.move(multiInput.getDestDir("move-multidir"), items, multiInput.getTextValues("move-multiinput"));
    });

    actionDialogManager.dialogSet(title, body, "Přesunout", yes_callback, "Zrušit");
    uiManager.setActionDialogHold(false);
  },

  copyFiles: function(items) {
    if(!Array.isArray(items)) {
      return;
    }

    var len = items.length;
    var renameBoxes = multiInput.giveChangeNameBoxHTML("copy-multiinput", items);
    var czechPart = tools.czechEngine(len, "soubor");

    var title = "Kopírovat " + czechPart;
    var body = "Budete kopírovat <b>" + len + " " + tools.czechEngineNumbering(len, "soubor", "u") + "</b>. Budete-li " + czechPart + " chtít před kopírováním přejmenovat, můžete tak učinit níže.<br>" + multiInput.giveFolderSelector("copy-multidir", true, items) + '<details class="mt-3"><summary class="font-weight-bold">Přejmenovat ' + czechPart + '</summary><b>Přípony zadejte</b> i do nových názvů souborů, jestliže je nechcete měnit!<br><div class="mt-3 mb-1" id="copy-multiinput">' + renameBoxes + '</div></details>';
    var yes_callback = (function() {
      api.copyFiles(multiInput.getDestDir("copy-multidir"), items, multiInput.getTextValues("copy-multiinput"));
    });

    actionDialogManager.dialogSet(title, body, "Kopírovat", yes_callback, "Zrušit");
    uiManager.setActionDialogHold(false);
  },

  discardChangesEditor: function(path) {
    if(!path) {
      return;
    }

    var title = "Zahodit změny?";
    var html = 'Opravdu chcete zahodit neuložené změny souboru <b class="mf-break-all">' + tools.xssFilter(path.split("/").pop()) + "</b>?<br>Změny budou trvale ztraceny!";
    var yes_callback = (function() {
      editorManager.exitEditorCallback();
    });

    actionDialogManager.dialogSet(title, html, "Ano, zahodit", yes_callback, "Ne, nezahazovat");
    uiManager.setActionDialogHold(true);
  },

  prepareArchive: function(items, what) {
    if(!Array.isArray(items) || !what) {
      return;
    }

    var len = items.length;
    var czechPart = tools.czechEngineNumbering(len, what, "u");

    var title = "Vytvořit archiv ze " + czechPart;
    var body = "Budete tvořit archiv obsahující <b>" + len + " " + czechPart + '</b>.<br><div class="mt-2">Formát archivu: ' + tools.archiveSelector + "</div>";
    var yes_callback = (function() {
      api.call("preparearchive", ["příprava archivu"], (api.prepareFileList(items) + "&compression=" + tools.selectorValue(document.getElementById("prepareArchive-archiveSelector"))), function(json) {
        actionDialogManager.showArchiveDownloadLink(len, czechPart, json.archive_id);
      });
    });

    actionDialogManager.dialogSet(title, body, "Připravit archiv", yes_callback, "Zrušit");
    uiManager.setActionDialogHold(true);
  },

  showArchiveDownloadLink: function(len, czechPart, archive_id) {
    document.getElementById("archiveDownloadLinkDialog-itemDesc").innerHTML = len + " " + czechPart;
    document.getElementById("archiveDownloadLinkDialog-link").href = serverSettings.archiveDownloadURL + "?archiveID=" + archive_id;

    document.getElementById("archiveDownloadLinkDialog-open").click();
  }
}
