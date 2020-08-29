<?php
class ServersettingsHandler extends Handler {
  public function zpracuj($slozka) {
    // $slozka ignorovana

    // stejna data jako v JavaScriptovem objektu serverSettings definovanem v wwwroot/index.php
    $info = array(
      "program_version" => Settings::PROGRAM_VERSION,
      "api_url" => Settings::API_URL,
      "apache_icons_path" => Settings::APACHE_ICONS_PATH,
      "editor_allowed_exts" => (Settings::EDITOR_ALLOWED_EXTS["do_check"] ? Settings::EDITOR_ALLOWED_EXTS["allowed_exts"] : NULL),
      "min_free_space" => Settings::MIN_FREE_SPACE,
      "max_upload_size" => Settings::MAX_UPLOAD_SIZE,
      "max_upload_count" => Settings::MAX_UPLOAD_COUNT,
      "max_edit_size" => Settings::MAX_EDIT_SIZE,
      "session_renew_interval" => Settings::SESSION_RENEW_INTERVAL,
      "archive_download_url" => (Settings::ARCHIVE_DOWNLOADS["allowed"] ? Settings::ARCHIVE_DOWNLOADS["download_url"] : NULL)
    );

    $this->JsonUspech(array("server_settings" => $info));
  }
}
