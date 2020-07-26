<?php
class SaveeditedfileHandler extends Handler {
  private $slozka;

  private function ziskejZapisovanaData() {
    if(!isset($_POST["fileContent"]) || !is_string($_POST["fileContent"])) {
      $this->JsonChyba("missing_params");
    }

    $data = rawurldecode($_POST["fileContent"]);
    $data_size = strlen($data);
    if((disk_free_space($this->slozka) - $data_size) < Settings::MIN_FREE_SPACE) {
      $this->JsonChyba("disk_space_too_low");
    }
    if($data_size > Settings::MAX_EDIT_SIZE) {
      $this->JsonChyba("editor_too_big");
    }

    return $data;
  }

  public function zpracuj($slozka) {
    $this->slozka = $slozka;
    try {
      $sf = new SingleFile();
      $nazev = $sf->ziskejNazev(array("file_must_exist", $slozka), TRUE);
      $sf->zkontrolujPriponu($nazev);
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    if(file_put_contents($slozka . "/" . $nazev, $this->ziskejZapisovanaData(), LOCK_EX) === FALSE) {
      $this->JsonChyba("unknown_error", array("filename" => $nazev));
    }

    $this->JsonUspech();
  }
}
