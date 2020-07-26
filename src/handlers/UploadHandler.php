<?php
class UploadHandler extends Handler {
  private $slozka;

  private function kontrola() {
    if(empty($_FILES["uploadedFiles"]["name"]) || !is_array($_FILES["uploadedFiles"]["name"])) {
      $this->JsonChyba("missing_params");
    }
    if(count($_FILES["uploadedFiles"]["name"]) > Settings::MAX_UPLOAD_COUNT) {
      $this->JsonChyba("upload_too_many_files");
    }

    $total_size = array_sum($_FILES["uploadedFiles"]["size"]);
    if((disk_free_space($this->slozka) - $total_size) < Settings::MIN_FREE_SPACE) {
      $this->JsonChyba("disk_space_too_low");
    }
    if($total_size > Settings::MAX_UPLOAD_SIZE) {
      $this->JsonChyba("upload_too_big");
    }

    foreach($_FILES["uploadedFiles"]["tmp_name"] as $i => $tmp_name) {
      $filename = basename($_FILES["uploadedFiles"]["name"][$i]);

      if(!is_uploaded_file($tmp_name) || $_FILES["uploadedFiles"]["error"][$i] !== 0) {
        $this->JsonChyba("upload_server_error", array("filename" => $filename));
      }
      if($chyba = PathChecker::kontrolaSouboru($filename, $this->slozka)) {
        $this->JsonChyba($chyba, array("filename" => $filename));
      }
      if($chyba = PathChecker::existuje("must_not_exist", $this->slozka . "/" . $filename)) {
        $this->JsonChyba($chyba, array("filename" => $filename));
      }
    }
  }

  public function zpracuj($slozka) {
    $this->slozka = $slozka;
    $this->kontrola();

    foreach($_FILES["uploadedFiles"]["tmp_name"] as $i => $tmp_name) {
      $filename = basename($_FILES["uploadedFiles"]["name"][$i]);

      if(!move_uploaded_file($tmp_name, $this->slozka . "/" . $filename)) {
        $this->JsonChyba("unknown_error", array("filename" => $filename));
      }
    }

    $this->JsonUspech();
  }
}
