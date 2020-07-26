<?php
class NewdirHandler extends Handler {
  public function zpracuj($slozka) {
    try {
      $mf = new MultiFile();
      $dirs = $mf->ziskejNazvy(array("must_not_exist", $slozka));
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    foreach($dirs as $item) {
      if(!mkdir($slozka . "/" . $item)) {
        $this->JsonChyba("unknown_error", array("filename" => $item));
      }
    }

    $this->JsonUspech();
  }
}
