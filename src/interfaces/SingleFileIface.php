<?php
interface SingleFileIface {
  public function ziskejNazev($existence = array(FALSE, ""), $spravovany = TRUE);
  public function zkontrolujPriponu($nazev);
  public function ziskejNovouSlozku($aktualni_slozka, $zakazat_aktualni_slozku);
}
