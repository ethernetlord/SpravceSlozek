<?php
class PathChecker implements PathCheckerIface {
  private const MAIN_FORBIDDEN_CHARS = array("\\", "//", "..", "<", ">", "javascript:", '"', "'", "&", ":", "|", "?", "*", "\x7F", "`");

  private static function korenovaSlozkaExistuje($cesta) {
    $rd = explode("/", $cesta)[0];
    foreach(Settings::ROOT_DIRS as $item) {
      if($rd === $item["name"]) {
        return TRUE;
      }
    }

    return FALSE;
  }

  private static function korenovaSlozkaReadOnly($cesta) {
    $rd = explode("/", $cesta)[0];
    foreach(Settings::ROOT_DIRS as $item) {
      if($rd === $item["name"]) {
        return ($item["readonly"] ? "root_dir_read_only" : FALSE);
      }
    }

    return "root_dir_not_exists";
  }

  private static function obecnaKontrola($nazev) {
    if(empty($nazev)) {
      return "name_blank";
    }

    if(strlen($nazev) > 250) {
      return "name_too_long";
    }

    $nazev = strtolower($nazev);

    // v nazvech nepovolit ASCII ridici znaky
    for($i = 0; $i <= 31; $i++) {
      if(substr_count($nazev, chr($i)) !== 0) {
        return "name_forbidden";
      }
    }

    // \\, //, .. - path/directory traversal
    // <, >, javascript:, ", ', & - XSS
    // :, |, ?, * - zakazane znaky na Windows (+ nekdete dalsi ze skupin vyse)
    // \x7F - kontrolni znaky ("prvni skupina" na zacatku "ASCII abecedy" se kontroluje vyse)
    if(substr($nazev, 0, 1) === "." || str_replace(PathChecker::MAIN_FORBIDDEN_CHARS, "", $nazev) !== $nazev) {
      return "name_forbidden";
    }

    return FALSE;
  }

  public static function kontrolaSlozky($slozka) {
    if($chyba = self::obecnaKontrola($slozka)) {
      return $chyba;
    }

    if(substr($slozka, 0, 1) === "/" || substr($slozka, -1) === "/" || strpos($slozka, "./") !== FALSE) {
      return "name_forbidden";
    }

    if(!self::korenovaSlozkaExistuje($slozka)) {
      return "root_dir_not_exists";
    }

    $ok = FALSE;
    foreach(Settings::ROOT_DIRS as $item) {
      $item = $item["name"];
      $rp = realpath($item);
      if(substr($slozka, 0, strlen($item)) === $item && substr(realpath($slozka), 0, strlen($rp)) === $rp) {
        $ok = TRUE;
        break;
      }
    }
    if(!$ok) {
      return "root_dir_not_exists";
    }

    $rd = explode("/", $slozka)[0];
    if(!is_dir($rd) || !is_readable($rd) || !is_writable($rd)) {
      return "root_dir_not_exists";
    }

    if(!is_dir($slozka) || !is_readable($slozka) || !is_writable($slozka)) {
      return "dir_not_exists";
    }

    return FALSE;
  }

  public static function kontrolaZobrazovanehoSouboru($nazev) {
    if($chyba = self::obecnaKontrola($nazev)) {
      return $chyba;
    }

    if(strpos($nazev, "/") !== FALSE) {
      return "name_forbidden";
    }

    return FALSE;
  }

  public static function kontrolaSouboru($nazev, $slozka) {
    if($chyba = self::kontrolaZobrazovanehoSouboru($nazev)) {
      return $chyba;
    }

    $nazev = strtolower($nazev);
    if(substr($nazev, 0, 8) === "mf_lock_" || stripos(pathinfo($nazev, PATHINFO_EXTENSION), "ph") !== FALSE) {
      return "name_forbidden_extension";
    }

    if($chyba = self::korenovaSlozkaReadOnly($slozka)) {
      return $chyba;
    }

    return FALSE;
  }

  public static function kontrolaZmenySlozky($aktualni_slozka, $nova_slozka, $zakazat_aktualni_slozku) { // urceno pro kopirovani, presouvani

    if($zakazat_aktualni_slozku) {
      if(($chyba = self::kontrolaSlozky($aktualni_slozka . "/" . $nova_slozka, FALSE)) && $nova_slozka !== "../") {
        return $chyba;
      }
    } else {
      if(($chyba = self::kontrolaSlozky($aktualni_slozka . "/" . $nova_slozka, FALSE)) && $nova_slozka !== "../" && $nova_slozka !== "./") {
        return $chyba;
      }
    }

    if($nova_slozka === "../" && (!self::korenovaSlozkaExistuje($aktualni_slozka) || substr_count($aktualni_slozka, "/") === 0)) {
      return "name_forbidden";
    }

    return FALSE;
  }

  public static function existuje($mod, $cesta) {
    switch($mod) {
      case "file_must_exist":
        return (!is_file($cesta) || !is_readable($cesta) || !is_writable($cesta)) ? "file_not_exists" : FALSE;
      case "file_must_not_exist":
        return (is_file($cesta)) ? "file_exists" : FALSE;
      case "folder_must_exist":
        return (!is_dir($cesta) || !is_readable($cesta) || !is_writable($cesta)) ? "folder_not_exists" : FALSE;
      case "folder_must_not_exist":
        return (is_dir($cesta)) ? "folder_exists" : FALSE;
      case "must_exist":
        return (!file_exists($cesta) || !is_readable($cesta) || !is_writable($cesta)) ? "not_exists" : FALSE;
      case "must_not_exist":
        return (file_exists($cesta)) ? "exists" : FALSE;
      default:
        throw new Exception("Neplatny mod kontroly (ne)existence souboru!");
    }
  }

  public static function kontrolaPriponySouboru($nazev) {
    if(!Settings::EDITOR_ALLOWED_EXTS["do_check"]) {
      return TRUE;
    }

    return (preg_match('/^(' . implode('|', Settings::EDITOR_ALLOWED_EXTS["allowed_exts"]) . ')$/', strtolower(pathinfo($nazev, PATHINFO_EXTENSION))) === 1);
  }

  public static function kontrolaSlozkyDoStejneSlozky($stary_nazev, $nova_slozka) {
    if($stary_nazev === $nova_slozka) {
        return TRUE;
    }

    return FALSE;
  }
}
