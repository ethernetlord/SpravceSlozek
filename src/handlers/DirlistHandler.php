<?php
class DirlistHandler extends Handler {
  private function rekurzivniSkenStromuSlozek($slozka) {
    $holy_nazev_slozky = explode("/", $slozka);
    $navrat = array(
      "folders" => array(),
      "files" => array(),
      "name" => end($holy_nazev_slozky),
      "last_mod" => filemtime($slozka)
    );

    foreach(scandir($slozka) as $item) {
      $cesta = $slozka . "/" . $item;
      if(!PathChecker::kontrolaZobrazovanehoSouboru($item)) {
        if(is_file($cesta)) {
          $navrat["files"][] = array(
            "name" => $item,
            "last_mod" => filemtime($cesta),
            "size" => filesize($cesta)
          );
        } else if(is_dir($cesta)) {
          $navrat["folders"][] = $this->rekurzivniSkenStromuSlozek($cesta);
        }
      }
    }

    return $navrat;
  }

  public function zpracuj($slozka) {
    // $slozka ignorovana

    $vracenyJSON = array();
    foreach(Settings::ROOT_DIRS as $item) {
      $item = $item["name"];
      if(is_dir($item) && is_readable($item) && is_writable($item)) {
        $vlozit = $this->rekurzivniSkenStromuSlozek($item);
        $vlozit["disk_total_space"] = disk_total_space($item);
        $vlozit["disk_free_space"] = disk_free_space($item);
        $vracenyJSON["folders"][] = $vlozit;
      }
    }

    if(empty($vracenyJSON)) {
      $this->JsonChyba("no_rootdirs");
    }

    $this->JsonUspech($vracenyJSON);
  }
}
