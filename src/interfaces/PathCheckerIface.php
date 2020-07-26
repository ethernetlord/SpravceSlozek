<?php
interface PathCheckerIface {
  public static function kontrolaSlozky($nazev_slozky);
  public static function kontrolaZobrazovanehoSouboru($nazev_souboru);
  public static function kontrolaSouboru($nazev_souboru, $slozka);
  public static function kontrolaZmenySlozky($aktualni_slozka, $nova_slozka, $zakazat_do_aktualni_slozky);
  public static function existuje($mod, $cesta);
  public static function kontrolaPriponySouboru($nazev_souboru);
}
