<?php
class MultiFile extends SingleFile implements MultiFileIface {
  public function ziskejNazvy($existence = array(FALSE, ""), $spravovany = TRUE) {
    if(empty($_POST["files"]) || !is_array($_POST["files"])) {
      throw new FileException("missing_params");
    }

    $returnArray = array();
    foreach($_POST["files"] as $item) {
      if($chyba = $this->kontrola($item, $existence[1], $spravovany)) {
        throw new FileException($chyba, array("filename" => $item));
      }

      if($existence[0] && ($chyba = PathChecker::existuje($existence[0], $existence[1] . "/" . $item))) {
        throw new FileException($chyba, array("filename" => $item));
      }

      $returnArray[] = $item;
    }

    return $returnArray;
  }

  public function zkontrolujPripony($soubory) {
    foreach($soubory as $item) {
      if(!PathChecker::kontrolaPriponySouboru($item)) {
        throw new FileException("text_extension_forbidden", array("filename" => $item));
      }
    }
  }
}
