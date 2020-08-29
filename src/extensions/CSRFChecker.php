<?php
class CSRFChecker implements BasicCheckerIface {
  public static function kontrola() {
    return (!empty($_SERVER["HTTP_X_SPRAVCESLOZEK_API"]) && strtolower($_SERVER["HTTP_X_SPRAVCESLOZEK_API"]) === "authorized-request");
  }
}
