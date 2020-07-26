<?php
class PHPConfigChecker implements BasicCheckerIface {
  public static function kontrola() {
    $max_pocet = (int) trim(ini_get("max_file_uploads"));
    $post_max_size = strtoupper(trim(ini_get("post_max_size")));
    $upload_max_size = strtoupper(trim(ini_get("upload_max_filesize")));

    $last_pms = substr($post_max_size, -1);
    $last_ums = substr($upload_max_size, -1);

    $post_max_size = (int) rtrim($post_max_size, "GMK");
    $upload_max_size = (int) rtrim($upload_max_size, "GMK");

    if($max_pocet === 0 || $post_max_size === 0 || $upload_max_size === 0) {
      return FALSE;
    }

    switch($last_pms) {
      case "G":
        $post_max_size *= 1024;
      case "M":
        $post_max_size *= 1024;
      case "K":
        $post_max_size *= 1024;
    }
    switch($last_ums) {
      case "G":
        $upload_max_size *= 1024;
      case "M":
        $upload_max_size *= 1024;
      case "K":
        $upload_max_size *= 1024;
    }

    return ($max_pocet >= Settings::MAX_UPLOAD_COUNT && $post_max_size >= Settings::MAX_UPLOAD_SIZE && $upload_max_size >= Settings::MAX_UPLOAD_SIZE);
  }
}
