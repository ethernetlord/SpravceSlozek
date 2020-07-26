var tools = {
  archiveSelector: '<select id="prepareArchive-archiveSelector"><option value="none">tar</option><option value="gzip">tar.gz</option><option value="bzip2">tar.bz2</option><option value="xz">tar.xz</option></select>',

  convertSize: function(size, decplaces, fixed) {
    decplaces = (decplaces === undefined) ? 2 : decplaces;
    fixed = (fixed === undefined) ? false : fixed;

    if(isNaN(size) || size < 0) {
      return "0 B";
    }
    var ext = " B";
    switch(true) {
      case (size >= 1000000000):
        size /= 1000;
        ext = " GB";
      case (size >= 1000000):
        size /= 1000;
        if(ext === " B") ext = " MB";
      case (size >= 1000):
        size /= 1000;
        if(ext === " B") ext = " kB";
    }
    if(fixed) {
      return (size.toFixed(decplaces) + ext).replace(".", ",");
    }
    decplaces = Math.pow(10, decplaces);
    return ((Math.round(size * decplaces) / decplaces) + ext).replace(".", ",");
  },

  convertUnixTime: function(timestamp, returnSeconds, czechFormat) {
    returnSeconds = (returnSeconds === undefined) ? true : returnSeconds;
    czechFormat = (czechFormat === undefined) ? false : czechFormat;

    var d = new Date(timestamp * 1000);
    if(czechFormat) {
      return d.getDate() + ". " + (d.getMonth() + 1) + ". " + d.getFullYear() + " " + d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2) + ((returnSeconds) ? (":" + ("0" + d.getSeconds()).slice(-2)) : "");
    }
    return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ((returnSeconds) ? (":" + ("0" + d.getSeconds()).slice(-2)) : "");
  },

  xssFilter: function(string) {
    return string.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;").replace(/\</g, "&lt;").replace(/\>/, "&gt;").replace(/\&/g, "&amp;").replace(/javascript\:/g, "");
  },

  getFileType: function(filename, returnWhat) {
    var descriptors = (function(ext) {
        switch (ext) {
          case "jpg": case "jpeg": case "bmp": case "gif": case "png": case "tif": case "tiff": case "svg": case "psd": case "xcf": case "heic": case "heif":
				    return ["image", serverSettings.apacheIconsPath + "image2.png", "obrázkový soubor"];
			    case "mp3": case "wav": case "wma": case "flac": case "ogg": case "aac": case "m4a":
				    return ["sound", serverSettings.apacheIconsPath + "sound2.png", "zvukový soubor"];
			    case "mp4": case "avi": case "vmw": case "flv": case "webm": case "mkv": case "3gp": case "m4v": case "mov":
				    return ["video", serverSettings.apacheIconsPath + "movie.png", "video soubor"];
			    case "zip": case "rar": case "7z":
				    return ["archive", serverSettings.apacheIconsPath + "compressed.png", "archiv souborů"];
			    case "tar": case "gz": case "bz2": case "xz": case "z": case "tgz": case "tbz2": case "txz": case "tz":
				    return ["unixarchive", serverSettings.apacheIconsPath + "tar.png", "unixový archiv souborů"];
			    case "txt":
            return ["textfile", serverSettings.apacheIconsPath + "text.png", "textový soubor"];
			    case "xml": case "wml": case "log": case "csv": case "tsv": case "json": case "sql":
				    return ["database", serverSettings.apacheIconsPath + "quill.png", "databáze"];
			    case "pdf":
				    return ["pdf", serverSettings.apacheIconsPath + "pdf.png", "soubor Portable Document Format"];
          case "doc": case "docx": case "rtf": case "odt":
				    return ["document", serverSettings.apacheIconsPath + "text.png", "dokument"];
          case "xls": case "xlsx": case "ods":
				    return ["spreadsheet", serverSettings.apacheIconsPath + "index.png", "tabulka"];
			    case "ppt": case "pptx": case "odp":
				    return ["presentation", serverSettings.apacheIconsPath + "world1.png", "prezentace"];
			    case "htm": case "html": case "xhtml": case "rss":
				    return ["webpage", serverSettings.apacheIconsPath + "layout.png", "webová stránka"];
			    case "php": case "php5": case "phtml": case "asp": case "aspx": case "jsp":
				    return ["webscript", serverSettings.apacheIconsPath + "patch.png", "webový skript"];
			    case "css": case "js": case "c": case "cpp": case "py": case "pyc": case "java": case "h": case "hpp": case "class": case "vb":
				    return ["sourcecode", serverSettings.apacheIconsPath + "c.png", "zdrojový kód"];
			    case "exe": case "bin": case "jar": case "vbs": case "com":
				    return ["executable", serverSettings.apacheIconsPath + "comp.blue.png", "spustitelný soubor"];
			    case "msi": case "dmg": case "rpm": case "deb": case "appimage": case "apk": case "cab":
				    return ["installer", serverSettings.apacheIconsPath + "burst.png", "instalační balíček"];
			    case "bat": case "sh": case "bash": case "cmd":
				    return ["script", serverSettings.apacheIconsPath + "script.png", "skript"];
			    case "eml":
				    return ["email", serverSettings.apacheIconsPath + "layout.png", "e-mail"];
			    case "lnk": case "ini": case "sys": case "tmp": case "bak": case "ico": case "cur": case "ani": case "dmp": case "drv": case "pak": case "dll": case "cfg":
				    return ["system", serverSettings.apacheIconsPath + "alert.red.png", "systémový soubor"];
			    default:
				    if(ext === "") {
					    return ["other", serverSettings.apacheIconsPath + "unknown.png", "neznámý typ souboru"];
				    } else {
					    return ["other", serverSettings.apacheIconsPath + "unknown.png", "soubor " + ext.toUpperCase()];
            }
				 }
      }
    )(filename.split(".").pop().toLowerCase());

    switch(returnWhat) {
      case "all":
        return {filter: descriptors[0], iconpath: descriptors[1], desc: descriptors[2]};
      case "filter":
        return descriptors[0];
      case "iconpath":
        return descriptors[1];
      case "desc":
        return descriptors[2];
    }
  },

  getDirFileType: function(returnWhat) {
    // basically useless, just for consistency
    var descriptors = {
      filter: "folder",
      iconpath: (serverSettings.apacheIconsPath + "folder.png"),
      desc: "složka"
    }

    switch(returnWhat) {
      case "all":
        return descriptors;
      case "filter": case "iconpath": case "desc":
        return descriptors[returnWhat];
    }
  },

  viewableFileType: function(filename, preview) {
    preview = (preview === undefined) ? false : preview;

    var ext = filename.split(".").pop().toLowerCase();
    switch(ext) {
      case "jpg": case "jpeg": case "png": case "gif": case "svg":
        return "image";
      case "mp3": case "wav": case "ogg": case "flac": case "m4a":
        return "audio";
      case "mp4": case "webm":
        return "video";
      case "txt": case "htm": case "html": case "css": case "js": case "xml": case "xhtml": case "log": case "csv": case "tsv": case "json": case "php": case "php5": case "php7": case "phps":
        return (preview ? false : "text");
      case "pdf":
        return (preview ? false : "pdf");
    }
    return false;
  },

  getBackIcon: function() {
    // again, just for consistency
    return (serverSettings.apacheIconsPath + "back.png");
  },

  copyObject: function(obj) {
    // nasty, but works in IE
    return JSON.parse(JSON.stringify(obj));
  },

  slashDir: function(name) {
    // just in case I needed to change this behaviour
    return ("/" + name + "/");
  },

  absolutePath: function(name) {
    return (globals.currentDir + "/" + name);
  },

  getQueryStringParam: function(name) {
    var params = location.search.substr(1).split("&");
    for(var i = 0; i < params.length; i++) {
      var splitted = params[i].split("=");
      if(decodeURIComponent(splitted[0]) === name) {
        return decodeURIComponent(splitted[1]);
      }
    }
    return false;
  },

  setQueryStringParam: function(name, value) {
    var toSet = "";
    var params = location.search.substr(1).split("&");
    for(var i = 0; i < params.length; i++) {
      if(params[i] !== "") {
        var splitted = params[i].split("=");
        toSet += (((decodeURIComponent(splitted[0]) === name) ? (splitted[0] + "=" + value) : (splitted[0] + "=" + splitted[1])) + "&");
      }
    }
    if(tools.getQueryStringParam(name) === false) {
      toSet += (name + "=" + value + "&");
    }
    history.replaceState(null, null, "?" + toSet.slice(0, -1));
  },

  removeQueryStringParam: function(name) {
    var toSet = "";
    var params = location.search.substr(1).split("&");
    for(var i = 0; i < params.length; i++) {
      if(params[i] !== "") {
        var splitted = params[i].split("=");
        if(decodeURIComponent(splitted[0]) !== name) {
          toSet += (splitted[0] + "=" + splitted[1] + "&");
        }
      }
    }
    history.replaceState(null, null, "?" + toSet.slice(0, -1));
  },

  czechEngine: function(items_length, items_type) {
    switch(items_type) {
      case "soubor":
        if(items_length === 1) return "soubor";
        return "soubory";

      case "složka":
        if(items_length === 1) return "složku";
        return "složky";

      case "oboje":
        if(items_length === 1) return "soubor nebo složku";
        return "soubory nebo složky";
    }
  },

  czechEngineNumbering: function(items_length, items_type, folder_singular_end) {
    folder_singular_end = (folder_singular_end === undefined) ? "a" : folder_singular_end;

    switch(items_type) {
      case "soubor":
        if(items_length === 1) return "soubor";
        if(items_length > 4 || items_length === 0) return "souborů";
        return "soubory";

      case "složka":
        if(items_length === 1) return ("složk" + folder_singular_end);
        if(items_length > 4 || items_length === 0) return "složek";
        return "složky";

      case "oboje":
        if(items_length === 1) return ("soubor nebo složk" + folder_singular_end);
        if(items_length > 4 || items_length === 0) return "souborů nebo složek";
        return "soubory nebo složky";
    }
  },

  upperCaseFirst: function(string) {
    return (string[0].toUpperCase() + string.substr(1));
  },

  selectorValue: function(elem) {
    return elem.options[elem.selectedIndex].value;
  }
}
