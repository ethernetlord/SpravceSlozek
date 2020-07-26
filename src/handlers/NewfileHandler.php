<?php
class NewfileHandler extends Handler {
  public function zpracuj($slozka) {
    try {
      $mf = new MultiFile();
      $files = $mf->ziskejNazvy(array("must_not_exist", $slozka));
      $mf->zkontrolujPripony($files);
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    foreach($files as $item) {
      if(!touch($slozka . "/" . $item)) {
        $this->JsonChyba("unknown_error", array("filename" => $item));
      }
    }

    $this->JsonUspech();
  }
}
