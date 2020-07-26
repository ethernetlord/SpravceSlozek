<?php
class SingleFile implements SingleFileIface {
  protected function kontrola($nazev, $slozka, $spravovany) {
    return ($spravovany) ? (PathChecker::kontrolaSouboru($nazev, $slozka)) : (PathChecker::kontrolaZobrazovanehoSouboru($nazev));
  }

  public function ziskejNazev($existence = array(FALSE, ""), $spravovany = TRUE) {
    if(empty($_POST["file"]) || !is_string($_POST["file"])) {
      throw new FileException("missing_params");
    }

    if($chyba = $this->kontrola($_POST["file"], $existence[1], $spravovany)) {
      throw new FileException($chyba, array("filename" => $_POST["file"]));
    }

    if($existence[0] && ($chyba = PathChecker::existuje($existence[0], $existence[1] . "/" . $_POST["file"]))) {
      throw new FileException($chyba, array("filename" => $_POST["file"]));
    }

    return $_POST["file"];
  }

  public function zkontrolujPriponu($nazev) {
    if(!PathChecker::kontrolaPriponySouboru($nazev)) {
      throw new FileException("text_extension_forbidden", array("filename" => $nazev));
    }
  }

  public function ziskejNovouSlozku($aktualni_slozka, $zakazat_aktualni_slozku) {
    if(empty($_POST["todir"]) || !is_string($_POST["todir"])) {
      throw new FileException("missing_params");
    }

    if($chyba = PathChecker::kontrolaZmenySlozky($aktualni_slozka, $_POST["todir"], $zakazat_aktualni_slozku)) {
      throw new FileException("newdir_" . $chyba);
    }

    return $_POST["todir"];
  }
}
