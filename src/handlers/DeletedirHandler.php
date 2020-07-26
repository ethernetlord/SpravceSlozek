<?php
class DeletedirHandler extends Handler {
  private function kontrolaPrazdnoty($aktualni_slozka, $dirs) {
    foreach($dirs as $item) {
      if(count(array_diff(scandir($aktualni_slozka . "/" . $item), array(".", ".."))) !== 0) {
        $this->JsonChyba("deletedir_not_empty", array("filename" => $item));
      }
    }
  }

  public function zpracuj($slozka) {
    try {
      $mf = new MultiFile();
      $dirs = $mf->ziskejNazvy(array("folder_must_exist", $slozka));
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    $this->kontrolaPrazdnoty($slozka, $dirs);

    foreach($dirs as $item) {
      if(!rmdir($slozka . "/" . $item)) {
        $this->JsonChyba("unknown_error", array("filename" => $item));
      }
    }

    $this->JsonUspech();
  }
}
