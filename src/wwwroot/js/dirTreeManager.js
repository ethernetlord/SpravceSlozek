var dirTreeManager = {
  viewDirTree: function() {
    var splitted = globals.currentDir.split("/");

    var tm = new TreeManager(globals.dirTree);
    var curdir = tm.getDirContents(globals.currentDir);
    var rootdir = tm.getDirContents(splitted[0]);

    document.getElementById("dirTree-icon").src = tools.getDirFileType("iconpath");
    document.getElementById("dirTree-name").innerHTML = tools.xssFilter(splitted.slice(-1)[0]);

    document.getElementById("dirTree-path").innerHTML = tools.xssFilter(tools.slashDir(globals.currentDir));
    document.getElementById("dirTree-lastmod").innerHTML = tools.convertUnixTime(curdir.last_mod, true, true);
    document.getElementById("dirTree-itemcount").innerHTML = dirTreeManager.getDirTotalItems(curdir);
    document.getElementById("dirTree-itemsize").innerHTML = dirTreeManager.getDirFilesTotalSize(curdir);
    document.getElementById("dirTree-diskfree").innerHTML = tools.convertSize(rootdir.disk_free_space);
    document.getElementById("dirTree-disktotal").innerHTML = tools.convertSize(rootdir.disk_total_space);

    document.getElementById("dirTree-tree").innerHTML = '<ul><li>' + (splitted[0] === globals.currentDir ? tools.xssFilter(splitted[0]) : '<a href="javascript:dirListManager.changeDir(\'' + tools.xssFilter(splitted[0]) + '\');">' + tools.xssFilter(splitted[0]) + '</a>') + '</li>' + dirTreeManager.recursiveDirTreeGenerator(tm, splitted[0]) + "</ul>";

    fab.changeFAB_goBack("dirList");
    uiManager.changeTitle("Informace o aktuální složce");
    uiManager.changeView("dirTree");
  },

  recursiveDirTreeGenerator: function(tm, dir) {
    var content = tm.getDirContents(dir);
    var html = "<ul>";
    for(var i = 0; i < content.folders.length; i++) {
      var nextdir = content.folders[i].name;
      var nextdirpath = dir + "/" + nextdir;
      var link = '<a href="javascript:dirListManager.changeDir(\'' + tools.xssFilter(nextdirpath) + '\');">' + tools.xssFilter(nextdir) + '</a>';
      html += ("<li>" + ((globals.currentDir === nextdirpath) ? tools.xssFilter(nextdir) : link) + "</li>" + dirTreeManager.recursiveDirTreeGenerator(tm, nextdirpath));
    }
    return (html + "</ul>");
  },

  getDirFilesTotalSize: function(dir) {
    var totalsize = 0;
    for(var i = 0; i < dir.files.length; i++) {
      totalsize += dir.files[i].size;
    }
    return tools.convertSize(totalsize);
  },

  getDirTotalItems: function(dir) {
    return (dir.folders.length + dir.files.length) + (' <i class="font-weight-normal">(' + dir.folders.length + " " + tools.czechEngineNumbering(dir.folders.length, "složka") + ", " + dir.files.length + " " + tools.czechEngineNumbering(dir.files.length, "soubor") + ")</i>");
  }
}
