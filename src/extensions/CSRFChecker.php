<?php
class CSRFChecker implements BasicCheckerIface {
  public static function kontrola() {
    return ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_SESSION["mf_csrfhash"]) && !empty($_POST["csrfhash"]) && is_string($_POST["csrfhash"]) && $_POST["csrfhash"] === $_SESSION["mf_csrfhash"]);
  }
}
