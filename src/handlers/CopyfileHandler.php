<?php
class CopyfileHandler extends Handler {
  private function kontrolaVelikosti($aktualni_slozka, $files) {
    $total_size = 0;

    foreach($files[0] as $item) {
      $totalsize += filesize($aktualni_slozka . "/" . $item);
    }

    if((disk_free_space($aktualni_slozka) - $total_size) < Settings::MIN_FREE_SPACE) {
      $this->JsonChyba("disk_space_too_low");
    }
  }

  public function zpracuj($slozka) {
    try {
      $mf2d = new MultiFile2D();
      $newdir = $mf2d->ziskejNovouSlozku($slozka, FALSE);
      $files = $mf2d->ziskejNazvy2D(array(array("file_must_exist", $slozka), array("must_not_exist", $slozka . "/" . $newdir)), $newdir);
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    $this->kontrolaVelikosti($slozka, $files);

    foreach($files[0] as $i => $old_name) {
      $new_name = $files[1][$i];
      if(!copy($slozka . "/" . $old_name, $slozka . "/" . $newdir . "/" . $new_name)) {
        $this->JsonChyba("unknown_error", array("dimension" => 0, "filename1" => $old_name, "filename2" => $new_name));
      }
    }

    $this->JsonUspech();
  }
}
