var multiInput = {
  getTextNodes: function(id) {
    var values = [];
    var nodes = document.getElementById(id).childNodes;
    for(var i = 0; i < nodes.length; i++) {
      if(nodes[i].tagName !== undefined && nodes[i].tagName.toLowerCase() === "input" && nodes[i].type.toLowerCase() === "text" && nodes[i].className.indexOf("intmf-multiinput") !== -1) {
        values.push(nodes[i]);
      }
    }
    return values;
  },

  getTextValues: function(id) {
    var values = [];
    var nodes = multiInput.getTextNodes(id);
    for(var i = 0; i < nodes.length; i++) {
      values.push(nodes[i].value.trim());
    }
    return values;
  },

  addText: function(id, custPlaceHolder, prefillVal, ret) {
    custPlaceHolder = (custPlaceHolder === undefined) ? null : custPlaceHolder;
    prefillVal = (prefillVal === undefined) ? "" : prefillVal;
    ret = (ret === undefined) ? false : ret;

    var placeholder = (custPlaceHolder ? custPlaceHolder : ('Název ' + (multiInput.getTextNodes(id).length + 1) + '...'));

    if(ret) { // return the HTML code of textbox instead of appending it to HTML (good for static, unchangeable amount of textboxes)
      return ('<input type="text" class="intmf-multiinput form-control mb-1" placeholder="' + placeholder + '" value="' + prefillVal + '">');
    }

    var tb = document.createElement("input");
    tb.type = "text";
    tb.className = "intmf-multiinput form-control mb-1";
    tb.placeholder = placeholder;
    tb.value = prefillVal;
    document.getElementById(id).appendChild(tb);
  },

  removeText: function(id) {
    var nodes = multiInput.getTextNodes(id);
    if(nodes.length > 1) {
      nodes[0].parentNode.removeChild(nodes[nodes.length - 1]);
    }
  },

  giveAdditionBtn: function(id) {
    return '<button class="intmf-hold mr-1 btn btn-success" onclick="multiInput.addText(\'' + id + '\');">Přidat políčko</button>';
  },

  giveRemovalBtn: function(id) {
    return '<button class="intmf-hold ml-1 btn btn-danger" onclick="multiInput.removeText(\'' + id + '\');">Odebrat políčko</button>';
  },

  giveChangeNameBoxHTML: function(id, items) {
    var html = "";
    for(var i = 0; i < items.length; i++) {
      var oldname = tools.xssFilter(items[i]);
      html += ('<div class="mt-1 mf-break-all"><b>' + (i + 1) + '.</b> <span class="font-italic">' + oldname + "</span></div>" + multiInput.addText(id, ("Nové jméno pro " + oldname), oldname, true));
    }
    return html;
  },

  giveFolderSelector: function(id, thisDir, items) {
    var list = [];
    if(thisDir) {
      list.push(["./", "./ <i>(do této složky)</i>"]);
    }
    if(globals.currentDir.indexOf("/") !== -1) {
      list.push(["../", "../ <i>(o úroveň výš)</i>"]);
    }

    var tm = new TreeManager(globals.dirTree);
    var dirs = dirListManager.sort(tm.getDirContents(globals.currentDir)).folders;
    for(var i = 0; i < dirs.length; i++) {
      var name = tools.xssFilter(dirs[i].name);
      if(items.indexOf(name) === -1) { // pre-fixing the "dir_to_same_dir" problem
        list.push([name, name]);
      }
    }

    if(!list || !list.length) {
      return '<div class="alert alert-danger mt-3">Žádné možné cílové složky nebyly nalezeny! Vytvořte nějakou a zkuste to prosím znovu!</div>';
    }

    var html = '<div class="form-check mt-1 mb-1" id="' + id + '">';
    for(var i = 0; i < list.length; i++) {
      html += '<input type="radio" name="multidir-group" class="intmf-hold form-check-input mb-1" value="' + list[i][0] + '" onchange="uiManager.setActionDialogHold(true);"><span class="mf-break-all mf-dirselect-text" onclick="multiInput.selectMultiDirViaText();">' + list[i][1] + "</span><br>";
    }
    html += '</div>';

    return html;
  },

  getDestDir: function(id) {
    var nodes = document.getElementById(id).childNodes;
    for(var i = 0; i < nodes.length; i++) {
      if(nodes[i] && nodes[i].tagName && nodes[i].tagName.toLowerCase() === "input" && nodes[i].type.toLowerCase() === "radio" && nodes[i].name === "multidir-group" && nodes[i].checked) {
        return (nodes[i].value.trim());
      }
    }
    return false;
  },

  selectMultiDirViaText: function() {
    var cb = event.target.previousElementSibling;
    if(cb && cb.tagName && cb.tagName.toLowerCase() === "input" && cb.type.toLowerCase() === "radio" && cb.name === "multidir-group" && !cb.checked) {
      cb.click();
    }
  }
}
