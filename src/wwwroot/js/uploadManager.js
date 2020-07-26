var uploadManager = {
  changeUploadView: function(name) {
    var elems = document.getElementsByClassName("intmf-upload-view");
    for(var i = 0; i < elems.length; i++) {
      elems[i].style.display = ((elems[i].id === name) ? "block" : "none");
    }
  },

  viewUploader: function() {
    var runbtn = document.getElementById("uploadView-runbtn");
    var cancelbtn = document.getElementById("uploadView-progress-cancel");

    document.getElementById("uploadView-currentDir").innerHTML = tools.xssFilter(tools.slashDir(globals.currentDir));
    document.getElementById("uploadView-fileselect").value = "";
    document.getElementById("uploadView-maxfiles").innerHTML = serverSettings.maxUploadCount;
    document.getElementById("uploadView-maxsize").innerHTML = tools.convertSize(serverSettings.maxUploadSize);
    runbtn.innerHTML = "Nahrát";
    runbtn.disabled = false;

    document.getElementById("uploadView-progress-percentage").innerHTML = "0%";
    document.getElementById("uploadView-progress-loaded").innerHTML = "<i>(spouštění...)</i>";
    document.getElementById("uploadView-progress-total").innerHTML = "<i>(spouštění...)</i>";
    document.getElementById("uploadView-progress-bar").style.width = "0%";
    document.getElementById("uploadView-progress-cancelText").innerHTML = "Zrušit nahrávání";
    cancelbtn.checked = false;
    cancelbtn.disabled = false;

    fab.changeFAB_goBack("dirList");
    uploadManager.changeUploadView("uploadView");
    uiManager.changeTitle("Nahrát soubory");
    uiManager.changeView("uploadView");
  },

  runUpload: function() {
    var runbtn = document.getElementById("uploadView-runbtn");
    runbtn.innerHTML = "Spouštění...";
    runbtn.disabled = true;

    var errorDesc = ["nahrání souborů"];
    var files = document.getElementById("uploadView-fileselect");

    if(!files || !files.files || !files.files.length) {
      errorManager.viewError("upload_no_files", errorDesc);
      return;
    }
    if(files.files.length > serverSettings.maxUploadCount) {
      errorManager.viewError("upload_no_files", errorDesc);
      return;
    }

    var totalsize = 0;
    for(var i = 0; i < files.files.length; i++) {
      totalsize += files.files[i].size;
    }
    if(totalsize > serverSettings.maxUploadSize) {
      errorManager.viewError("upload_too_big", errorDesc);
      return;
    }

    // TODO: do more checks on the client side (e.g. disk_free_space);
    // maybe even elsewhere than only in this upload handler (e.g. move, rename, copy, ... - name validity checks etc.)

    var fd = new FormData(document.getElementById("uploadView-fileform"));
    api.uploadFiles(fd, errorDesc, uploadManager.progressFunc);
  },

  progressFunc: function(xhr) {
    if(event.loaded >= event.total) {
      uiManager.changeTitle("Nahrávání souborů: počkejte prosím...");
      uploadManager.changeUploadView("uploadView-done");
    } else {
      if(document.getElementById("uploadView-progress-cancel").checked) {
        xhr.abort();
        uiManager.changeView("uploadView");
        uiManager.changeTitle("Nahrávání souborů zrušeno!");
        uploadManager.changeUploadView("uploadView-aborted");
        return;
      }
      var percentage = (Math.round((event.loaded / event.total) * 100) + "%");
      document.getElementById("uploadView-progress-percentage").innerHTML = percentage;
      document.getElementById("uploadView-progress-loaded").innerHTML = tools.convertSize(event.loaded, 2, true);
      document.getElementById("uploadView-progress-total").innerHTML = tools.convertSize(event.total, 2, true);
      document.getElementById("uploadView-progress-bar").style.width = percentage;
      uiManager.changeTitle("Nahrávání souborů: " + percentage);
      uploadManager.changeUploadView("uploadView-progress");
    }
  },

  cancelWait: function() {
    event.target.disabled = true;
    document.getElementById("uploadView-progress-cancelText").innerHTML = "Rušení, počkejte prosím...";
  }
}
