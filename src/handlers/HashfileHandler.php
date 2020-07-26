<?php
class HashfileHandler extends Handler {
  private function zkontrolujAlgo() {
    if(empty($_POST["algo"]) || !is_string($_POST["algo"])) {
      $this->JsonChyba("missing_params");
    }

    if(preg_match('/^(crc32|md5|sha1|sha256|sha512)$/', $_POST["algo"]) !== 1) {
      $this->JsonChyba("invalid_hash_algo");
    }

    return $_POST["algo"];
  }

  public function zpracuj($slozka) {
    try {
      $sf = new SingleFile();
      $nazev = $sf->ziskejNazev(array("file_must_exist", $slozka), FALSE); // musi existovat, neni spravovany
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    $hash = @hash_file($this->zkontrolujAlgo(), $slozka . "/" . $nazev);
    if($hash === FALSE) {
      $this->JsonChyba("unknown_error", array("filename" => $filename));
    }

    $this->JsonUspech(array("hash" => $hash));
  }
}
