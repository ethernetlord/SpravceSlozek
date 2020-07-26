<?php
/*
----- SpravceSlozek -----
Autor: EthernetLord
  Webove stranky: https://ethernetlord.eu/
  Git repozitar: https://github.com/ethernetlord/SpravceSlozek
  E-mail: kontakt (_ZAVINAC_) ethernetlord (_TECKA_) eu



Licencovano pod GNU GPLv3

SpravceSlozek - web-interface based file manager (personal cloud)
Copyright (C) 2020  EthernetLord
https://ethernetlord.eu/ - https://github.com/ethernetlord

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.



Dalsi licence patrici pouzitym projektum najdete v souboru LICENSE.txt.
*/

ini_set('display_errors', 0);
require_once("../Settings.php");
session_set_cookie_params(0, "/", "", TRUE, TRUE); // 0 = do konce prohlizeni
session_start();
if(empty($_SESSION["mf_csrfhash"])) {
  $_SESSION["mf_csrfhash"] = sha1(random_bytes(64));
}
?>
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta charset="UTF-8">
  <title>SpravceSlozek</title>
  <meta name="googlebot" content="nosnippet,noarchive">
  <meta name="robots" content="noindex,nofollow">
  <link rel="stylesheet" type="text/css" href="libs/bootstrap-4.3.1.min.css">
  <!-- DEPLOYMENT PROCESS STYLESHEET HOOK START -->
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <!-- DEPLOYMENT PROCESS STYLESHEET HOOK END -->
</head>
<body>

<!-- DEPLOYMENT PROCESS SNIPPET DIALOG HOOK START -->

<?php require_once("../snippets/programInfoDialog.php"); ?>

<?php require_once("../snippets/actionDialog.php"); ?>

<?php require_once("../snippets/previewDialog.php"); ?>

<?php require_once("../snippets/archiveDownloadLinkDialog.php"); ?>

<!-- DEPLOYMENT PROCESS SNIPPET DIALOG HOOK END -->

<button class="intmf-hold mf-fab btn rounded-circle" id="fab" style="display: none;"></button>

<nav class="navbar navbar-expand-md bg-dark navbar-dark">
  <a class="intmf-hold intmf-nvhold mf-break-all mf-break-all-force navbar-brand" id="navbar-title" href="javascript:dirListManager.refreshDirList();" onclick="return (uiManager.checkHold() && uiManager.checkHold('navbarHeld') && !editorManager.isUnsaved());" ondblclick="uiManager.programInfoDialog_show();" title="Aktualizovat obsah složky (dvojklik: informace o programu)">SpravceSlozek</a>

  <button class="navbar-toggler" data-toggle="collapse" data-target="#navbar">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbar">
    <ul class="intmf-navbar navbar-nav ml-auto" id="navbar-hlavni">
      <li class="nav-item">
        <button class="intmf-hold intmf-nvhold mf-no-break btn btn-secondary m-1 mf-textshadow" onclick="searchManager.viewSearch();"><img src="img/search.png" class="mr-1 mf-navbar">Hledat</button>
      </li>

      <li class="nav-item dropdown">
        <button class="intmf-hold intmf-nvhold mf-no-break btn btn-info m-1 mf-textshadow dropdown-toggle" data-toggle="dropdown"><img src="img/plus.png" class="mr-1 mf-navbar">Nový...</button>
        <div class="dropdown-menu">
          <span><a class="intmf-hold intmf-nvhold dropdown-item" href="javascript:actionDialogManager.newFiles();" onclick="return (uiManager.checkHold() && uiManager.checkHold('navbarHeld'));"><img src="img/file.png" class="mf-navbar-dropdown-icon mr-1">Nový soubor</a></span>
          <span><a class="intmf-hold intmf-nvhold dropdown-item" href="javascript:actionDialogManager.newDirs();" onclick="return (uiManager.checkHold() && uiManager.checkHold('navbarHeld'));"><img src="img/folder-black.png" class="mf-navbar-dropdown-icon mr-1">Nová složka</a></span>
        </div>
      </li>

      <li class="nav-item">
        <button class="intmf-hold intmf-nvhold mf-no-break btn btn-success m-1 mf-textshadow" onclick="uploadManager.viewUploader();"><img src="img/upload.png" class="mr-1 mf-navbar">Nahrát</button>
      </li>

      <li class="nav-item">
        <a href="<?= Settings::BACK_URL ?>" onclick="return (uiManager.checkHold() && uiManager.checkHold('navbarHeld'));"><button class="intmf-hold intmf-nvhold mf-no-break btn btn-primary m-1 mf-textshadow"><img src="img/back.png" class="mr-1 mf-navbar">Zpět</button></a>
      </li>
    </ul>

    <ul class="intmf-navbar navbar-nav ml-auto" id="navbar-editor" style="display: none;">
      <li class="nav-item">
        <button class="intmf-hold intmf-nvhold mf-no-break btn btn-info m-1 mf-textshadow" onclick="editorManager.save();" id="editor-save"><img src="img/hard-drive.png" class="mr-1 mf-navbar">Uložit</button>
      </li>

      <li class="nav-item">
        <button class="intmf-hold intmf-nvhold mf-no-break btn btn-secondary m-1 mf-textshadow" onclick="editorManager.exitEditor();"><img src="img/back.png" class="mr-1 mf-navbar">Konec editace</button>
      </li>
    </ul>
  </div>
</nav>

<!-- DEPLOYMENT PROCESS SNIPPET WRAPPER HOOK START -->

<?php require_once("../snippets/loadingViewWrapper.php"); ?>

<?php require_once("../snippets/errorViewWrapper.php"); ?>

<?php require_once("../snippets/fileDetailsWrapper.php"); ?>

<?php require_once("../snippets/dirListWrapper.php"); ?>

<?php require_once("../snippets/selectRootDirWrapper.php"); ?>

<?php require_once("../snippets/uploadViewWrapper.php"); ?>

<?php require_once("../snippets/dirTreeWrapper.php"); ?>

<?php require_once("../snippets/selectDoneWrapper.php"); ?>

<?php require_once("../snippets/searchViewWrapper.php"); ?>

<?php require_once("../snippets/editorWrapper.php"); ?>

<!-- DEPLOYMENT PROCESS SNIPPET WRAPPER HOOK END -->

<br><br><br><br><br>

<script>
var serverSettings = {
  programVersion: "<?= Settings::PROGRAM_VERSION ?>",
  apiUrl: "<?= Settings::API_URL ?>",
  apacheIconsPath: "<?= Settings::APACHE_ICONS_PATH ?>",
  editorAllowedExts: <?= (Settings::EDITOR_ALLOWED_EXTS["do_check"]) ? ('["' . implode('", "', Settings::EDITOR_ALLOWED_EXTS["allowed_exts"]) . '"]') : "false" ?>,
  minFreeSpace: <?= Settings::MIN_FREE_SPACE ?>,
  maxUploadSize: <?= Settings::MAX_UPLOAD_SIZE ?>,
  maxUploadCount: <?= Settings::MAX_UPLOAD_COUNT ?>,
  maxEditSize: <?= Settings::MAX_EDIT_SIZE ?>,
  sessionRenewInterval: <?= Settings::SESSION_RENEW_INTERVAL ?>,
  archiveDownloadsAllowed: <?= (Settings::ARCHIVE_DOWNLOADS["allowed"]) ? "true" : "false" ?>,
  archiveDownloadURL: <?= (Settings::ARCHIVE_DOWNLOADS["allowed"] ? ('"' . Settings::ARCHIVE_DOWNLOADS["download_url"] . '"') : "null") ?>
}
var globals = {
  currentDir: false,
  dirTree: false,
  prevDirTree: false,
  allActionsHeld: false,
  navbarHeld: false,
  editorHasChanged: false,
  editorPath: false
}
function safeCSRF(data) {
  // loose comparison; matches undefined too
  if(data == null) {
    data = "";
  }
  if(data instanceof FormData) {
    data.append("csrfhash", "<?= $_SESSION["mf_csrfhash"] ?>");
  } else {
    data += "&csrfhash=<?= $_SESSION["mf_csrfhash"] ?>";
  }
  return data;
}

window.onload = function() {
  uiManager.changeTitle();
  dirListManager.refreshDirList(function() {
    dirListManager.initView();
  });
  setInterval(function() {
    api.renewSession();
  }, 1000 * serverSettings.sessionRenewInterval);
  uiManager.programInfoDialog_prepare();
}
</script>
<!-- DEPLOYMENT PROCESS SCRIPT HOOK START -->
<script src="js/tools.js"></script>
<script src="js/api.js"></script>
<script src="js/fab.js"></script>
<script src="js/uiManager.js"></script>
<script src="js/errorManager.js"></script>
<script src="js/actionDialogManager.js"></script>
<script src="js/TreeManager.js"></script>
<script src="js/dirListManager.js"></script>
<script src="js/fileDetailsManager.js"></script>
<script src="js/uploadManager.js"></script>
<script src="js/dirTreeManager.js"></script>
<script src="js/multiInput.js"></script>
<script src="js/selectBoxes.js"></script>
<script src="js/searchManager.js"></script>
<script src="js/editorManager.js"></script>
<!-- DEPLOYMENT PROCESS SCRIPT HOOK END -->
<script src="libs/jquery-3.4.1.min.js"></script>
<script src="libs/bootstrap-4.3.1.bundle.min.js"></script>
</body>
</html>
