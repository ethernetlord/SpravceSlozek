<?php
class FileException extends Exception implements FileExceptionIface {
  protected $dalsi_data;

  public function __construct($zprava, $dalsi_data = array()) {
    $this->dalsi_data = $dalsi_data;
    parent::__construct($zprava);
  }

  public function getDalsiData() {
    return $this->dalsi_data;
  }
}
