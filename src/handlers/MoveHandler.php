<?php
class MoveHandler extends Handler {
  public function zpracuj($slozka) {
    try {
      $mf2d = new MultiFile2D();
      $newdir = $mf2d->ziskejNovouSlozku($slozka, TRUE);
      $files = $mf2d->ziskejNazvy2D(array(array("must_exist", $slozka), array("must_not_exist", $slozka . "/" . $newdir)), $newdir);
    } catch(FileException $e) {
      $this->JsonChyba($e->getMessage(), $e->getDalsiData());
    }

    foreach($files[0] as $i => $old_name) {
      $new_name = $files[1][$i];
      if(!rename($slozka . "/" . $old_name, $slozka . "/" . $newdir . "/" . $new_name)) {
        $this->JsonChyba("unknown_error", array("dimension" => 0, "filename1" => $old_name, "filename2" => $new_name));
      }
    }

    $this->JsonUspech();
  }
}
