<?php
class RouterHandler extends Handler {
  private const DIR_NOCHECK_EXCEPTIONS = array("dirlist", "sessionrenew", "serversettings");
  private const DISABLED_HANDLERS = array("Handler", "RouterHandler");
  private $handler;

  private function zjistiHandler() {
    $handlerName = ucwords($_GET["a"]) . "Handler";
    if(!in_array($handlerName, self::DISABLED_HANDLERS, TRUE) && class_exists($handlerName)) {
      $this->handler = $handlerName;
      return TRUE;
    }
    return FALSE;
  }

  private function kontroly() {
    if(!PHPConfigChecker::kontrola()) {
      $this->JsonChyba("php_config_error");
    }

    if($_SERVER["REQUEST_METHOD"] !== "POST") {
      $this->JsonChyba("invalid_http_method");
    }

    if(!CSRFChecker::kontrola()) {
      $this->JsonChyba("csrf_error");
    }

    if(empty($_GET["a"]) || empty($_POST["dir"]) || !is_string($_GET["a"]) || !is_string($_POST["dir"])) {
      $this->JsonChyba("missing_params");
    }

    if(strlen($_GET["a"]) > 16 || preg_match('/^([a-z]+)$/', $_GET["a"]) !== 1 || !$this->zjistiHandler()) {
      $this->JsonChyba("unknown_action");
    }

    if(!in_array($_GET["a"], self::DIR_NOCHECK_EXCEPTIONS, TRUE) && ($chyba = PathChecker::kontrolaSlozky($_POST["dir"]))) {
      $this->JsonChyba($chyba);
    }
  }

  public function zpracuj($slozka_null) {
    $this->kontroly();

    $handler = new $this->handler();
    $handler->zpracuj($_POST["dir"]);

    // sem by se program nikdy nemel dostat - pouze pro pripad spatne naprogramovaneho handleru
    $this->JsonChyba("script_not_ended");
  }
}
