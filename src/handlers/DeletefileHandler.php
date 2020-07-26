<?php
class DeletefileHandler extends Handler {
  public function zpracuj($slozka) {
    try {
      $mf = new MultiFile();
      $files = $mf->ziskejNazvy(array("file_must_exist", $slozka));
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    foreach($files as $item) {
      if(!unlink($slozka . "/" . $item)) {
        $this->JsonChyba("unknown_error", array("filename" => $item));
      }
    }

    $this->JsonUspech();
  }
}
