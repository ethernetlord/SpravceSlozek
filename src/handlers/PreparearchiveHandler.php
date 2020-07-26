<?php
class PreparearchiveHandler extends Handler {
  private function ziskejTypKomprese() {
    if(empty($_POST["compression"]) || !is_string($_POST["compression"])) {
      $this->JsonChyba("missing_params");
    }

    // vrati parametr pro tar, ktery se pouziva pro zvoleni vybraneho algoritmu
    switch($_POST["compression"]) {
      case "none":
        return "";

      case "gzip":
        return "z";

      case "bzip2":
        return "j";

      case "xz":
        return "J";

      default:
        $this->JsonChyba("archive_invalid_compression_type");
    }
  }

  private function zkontrolujFunkcnostTaru() {
    if(stripos(php_uname("s"), "win") !== FALSE) {
      $this->JsonChyba("archive_unsupported_os");
    }

    if(!function_exists("shell_exec") || !function_exists("popen")) {
      $this->JsonChyba("archive_cannot_execute_commands");
    }

    if(!shell_exec("which " . Settings::ARCHIVE_DOWNLOADS["tar_program_name"])) {
      $this->JsonChyba("archive_no_archiving_program");
    }
  }

  public function zpracuj($slozka) {
    if(!Settings::ARCHIVE_DOWNLOADS["allowed"]) {
      $this->JsonChyba("archive_downloads_denied");
    }

    $this->zkontrolujFunkcnostTaru();

    try {
      $mf = new MultiFile();
      $files = $mf->ziskejNazvy(array("must_exist", $slozka), FALSE);
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }



    // tar -c[zjJ]f/dev/stdout [file] ... 2>&1
    $command_str = (Settings::ARCHIVE_DOWNLOADS["tar_program_name"] . " -Hustar -c" . $this->ziskejTypKomprese() . "f/dev/stdout");
    foreach($files as $item) {
      $command_str .= (" " . escapeshellarg($slozka . "/" . $item));
    }
    $command_str .= " 2>&1";



    if(empty($_SESSION["mf_prepared_archives"])) {
      $_SESSION["mf_prepared_archives"] = array();
    }

    if(count($_SESSION["mf_prepared_archives"]) > Settings::ARCHIVE_DOWNLOADS["max_archives_per_session"]) {
      $this->JsonChyba("archive_too_many_archives_in_session");
    }



    do {
      $archive_id = md5(random_bytes(64));
    } while(isset($_SESSION["mf_prepared_archives"][$archive_id]));

    $archive_name = ("SpravceSlozek_archive_" . date("Y-m-d_H-i-s"));

    $_SESSION["mf_prepared_archives"][$archive_id] = array($_POST["compression"], $archive_name, $command_str);



    $this->JsonUspech(array("archive_id" => $archive_id));
  }
}
