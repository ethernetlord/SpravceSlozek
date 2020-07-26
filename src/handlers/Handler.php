<?php
abstract class Handler {
  public function JsonUspech($data = array()) {
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(array_merge(array("success" => TRUE), $data), 0, 1024);
    exit(0);
  }

  public function JsonChyba($duvod, $data = array()) {
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(array_merge(array("success" => FALSE, "reason" => $duvod), $data), 0, 1024);
    exit(0);
  }

  abstract public function zpracuj($slozka);
}
