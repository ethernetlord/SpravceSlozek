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

function getArchiveProperties($compression) {
  switch($compression) {
    case "none":
      return array(".tar", "application/x-tar", "ustar", 257);

    case "gzip":
      return array(".tar.gz", "application/gzip", "\x1F\x8B", 0);

    case "bzip2":
      return array(".tar.bz2", "application/x-bzip2", "BZh", 0);

    case "xz":
      return array(".tar.xz", "application/x-xz", "\xFD\x37\x7A\x58\x5A\x00", 0);

    default:
      http_response_code(500);
      exit();
  }
}

if(empty($_GET["archiveID"]) || !is_string($_GET["archiveID"]) || preg_match('/^([0-9a-f]{32})$/', $_GET["archiveID"]) !== 1) {
  http_response_code(400);
  exit();
}
$archive_id = $_GET["archiveID"];

ini_set('display_errors', 0);
session_set_cookie_params(0, "/", "", TRUE, TRUE); // 0 = do konce prohlizeni
session_start();

if(!isset($_SESSION["mf_prepared_archives"][$archive_id])) {
  http_response_code(404);
  exit();
}


// format: array(compression_type, filename, command);
$archive_entry = $_SESSION["mf_prepared_archives"][$archive_id];

session_write_close();

// format: array(file_extension, content_type, magic_number, magic_number_offset);
$archive_props = getArchiveProperties($archive_entry[0]);



$tar_proc = popen($archive_entry[2], "rb");
if(!$tar_proc) {
  http_response_code(500);
  exit();
}

$data_part = fread($tar_proc, 16384);
if(!is_string($data_part) || substr($data_part, $archive_props[3], strlen($archive_props[2])) !== $archive_props[2]) {
  pclose($tar_proc);
  http_response_code(500);
  exit();
}

header('Content-Disposition: attachment; filename="' . $archive_entry[1] . $archive_props[0] . '"');
header('Content-Type: ' . $archive_props[1]);

echo $data_part;



while($data_part = fread($tar_proc, 1048576)) {
  echo $data_part;
}



pclose($tar_proc);
