function TreeManager(tree) {
  this.tree = tree;

  this.getDirContents = function(path) {
    if(!path || !path.length || typeof this.tree !== "object" || !this.tree.hasOwnProperty("folders")) {
      return false;
    }
    var tokens = (typeof path === "string") ? path.split("/") : path;
    var tempTree = this.tree;
    for(var i = 0; i < tokens.length; i++) {
      for(var j = 0; j < tempTree.folders.length; j++) {
        if(tempTree.folders[j].name === tokens[i]) {
          tempTree = tempTree.folders[j];
          break;
        } else if(j === (tempTree.folders.length - 1)) {
          return false;
        }
      }
    }
    return tempTree;
  },

  this.getFileProperties = function(path) {
    var dir = path.split("/");
    var file = dir.pop();
    var contents = this.getDirContents(dir);
    if(contents === false) {
      return false;
    }
    for(var i = 0; i < contents.files.length; i++) {
      if(contents.files[i].name === file) {
        return contents.files[i];
      }
    }
    return false;
  }
}
