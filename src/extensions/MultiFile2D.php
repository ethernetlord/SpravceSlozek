<?php
class MultiFile2D extends SingleFile implements MultiFile2DIface {
  public function ziskejNazvy2D($existence = array(array(FALSE, ""), array(FALSE, "")), $nova_slozka = FALSE) {
    if(empty($_POST["files1"]) || empty($_POST["files2"]) || !is_array($_POST["files1"]) || !is_array($_POST["files2"])) {
      throw new FileException("missing_params");
    }

    if(count($_POST["files1"]) !== count($_POST["files2"])) {
      throw new FileException("bad_2d_array");
    }

    $returnArray = array(array(), array());
    for($i = 0; $i < 2; $i++) {
      foreach($_POST["files" . ($i + 1)] as $j => $item) {
        if($chyba = $this->kontrola($item, $existence[$i][1], TRUE)) {
          throw new FileException($chyba, array("dimension" => ($i + 1), "filename1" => $_POST["files1"][$j], "filename2" => $_POST["files2"][$j]));
        }

        if($existence[$i][0] && ($chyba = PathChecker::existuje($existence[$i][0], $existence[$i][1] . "/" . $item))) {
          throw new FileException($chyba, array("dimension" => ($i + 1), "filename1" => $_POST["files1"][$j], "filename2" => $_POST["files2"][$j]));
        }

        if($nova_slozka !== FALSE) {
          if(PathChecker::kontrolaSlozkyDoStejneSlozky($_POST["files1"][$j], $nova_slozka)) {
            throw new FileException("newdir_dir_to_same_dir", array("dimension" => 1, "filename1" => $_POST["files1"][$j], "filename2" => $_POST["files2"][$j]));
          }
        }

        $returnArray[$i][] = $item;
      }
    }

    return $returnArray;
  }
}
