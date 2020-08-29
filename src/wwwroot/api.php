<?php
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

ini_set('display_errors', 0); // toto ma byt v produkci 0

// zkontroluj, zda-li bezi jako webova aplikace a ne v CLI modu
if(php_sapi_name() === "cli" || !isset($_SERVER["REMOTE_ADDR"])) {
  http_response_code(500); // pro jistotu
  echo "Tato instance nebezi jako webova aplikace! Nelze pokracovat!";
  exit(1);
}

// zkontroluj pritomnost potrebnych modulu a funkci
if(!function_exists("preg_match") || !function_exists("spl_autoload_register")) {
  http_response_code(500);
  echo "Chybi potrebne moduly PHP! Nelze pokracovat!";
  exit(1);
}

// zkontroluj pritomnost HTTPS
if($_SERVER["HTTPS"] !== "on") {
  http_response_code(500);
  echo "Tuto webovou aplikaci nelze provozovat pres nezabezpecene spojeni! Nelze pokracovat!";
  exit(1);
}

// DEPLOY PROCESS AUTOLOADER HOOK START
// nadefinuj autoloader pro tridy
spl_autoload_register(function($trida) {
  if(preg_match('/Handler$/', $trida)) {
    require_once('../handlers/' . $trida . ".php");
  } else if(preg_match('/Iface$/', $trida)) {
    require_once('../interfaces/' . $trida . ".php");
  } else {
    require_once('../extensions/' . $trida . ".php");
  }
});
// DEPLOY PROCESS AUTOLOADER HOOK END

// trida s nastavenim se nacita velice brzy v programu
require_once("../Settings.php");

// spust sessionku
session_set_cookie_params(0, "/", "", TRUE, TRUE); // 0 = do konce prohlizeni
session_start();

// instanciuj smerovac a nech ho pracovat
$router = new RouterHandler();
$router->zpracuj(NULL);
