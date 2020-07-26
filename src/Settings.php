<?php
class Settings {
  public const PROGRAM_VERSION = "1.5";

  public const APACHE_ICONS_PATH = "/icons/";
  public const BACK_URL = "../";
  public const API_URL = "api.php";

  // nazvy slozek NESMI obsahovat lomitko ani na zacatku, ani na konci, stejne jako zadne podretezce, ktere souviseji s pozici v adresarove strukture ("..", "./" apod.)
  // pokud potrebujete prejit do slozky mimo webroot, pouzijte symlink, jehoz jmeno uvedete do tohoto pole
  // v takovem pripade se rovnez ujistete, zda-li vas webovy server symlinky povoluje (jinak nebude mozne soubory stahovat a zobrazovat)
  public const ROOT_DIRS = array(
    array(
      "name" => "uploads",
      "readonly" => FALSE
    )
  );

  public const MIN_FREE_SPACE = 1073741824; // 1 GiB
  public const MAX_UPLOAD_SIZE = 350000000; // 350 MB
  public const MAX_UPLOAD_COUNT = 20;
  public const MAX_EDIT_SIZE = 10000000; // 10 MB

  // prvni prvek znaci, ze chceme pripony souboru v editoru kontrolovat a v dalsim prvku jsou povolene pripony pripadne vyjmenovany
  public const EDITOR_ALLOWED_EXTS = array(
    "do_check" => TRUE,
    "allowed_exts" => array("txt", "htm", "html", "css", "js", "xml", "xhtml", "log", "csv", "tsv", "json")
  );

  public const SESSION_RENEW_INTERVAL = 300; // 5 min; interval v sekundach, kdy se bude volat dummy API endpoint, aby nevyprsela PHP Session pri delsi neaktivite --> odstranuje problemy s kontrolou CSRF

  // nema efekt, pokud bezi tento program na Windows
  public const ARCHIVE_DOWNLOADS = array(
    "allowed" => TRUE,
    "download_url" => "archive_download.php",
    "tar_program_name" => "tar",
    "max_archives_per_session" => 256
  );
}

/*
----- SpravceSlozek -----
Autor: EthernetLord
  Webove stranky: https://ethernetlord.eu/
  Git repozitar: https://github.com/ethernetlord/SpravceSlozek
  E-mail: kontakt (_ZAVINAC_) ethernetlord (_TECKA_) eu



Licencovano pod GNU GPLv3

SpravceSlozek - web-interface based file manager (personal cloud)
Copyright (C) 2020  EthernetLord
https://ethernetlord.eu/ - https://github.com/ethernetlord

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.



Dalsi licence patrici pouzitym projektum najdete v souboru LICENSE.txt.
*/
