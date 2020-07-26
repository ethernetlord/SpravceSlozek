<div class="intmf-view container" id="searchViewWrapper" style="display: none;">
  <div class="row mt-3">
    <div class="col-12 text-center">
      <h2 class="font-weight-bold">Pokročilé vyhledávání</h2>

      <p>Vyhledávání budou prováděna v aktuální složce, tedy <b class="mf-break-all" id="searchView-currentDir"></b>.</p>

      <input type="text" class="form-control w-100 mt-4" id="searchView-searchExp" placeholder="Vyhledávaný výraz" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">

      <small id="searchView-emptySearchExpNote" style="display: none;">Jestliže nezadáte žádný vyhledávací výraz, budou vyhledány všechny soubory, které vyhovují zvoleným filtrům, nehledě na jejich názvy.</small>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-md-4 mt-3 mb-3">
      <h6 class="font-weight-bold">Řazení výsledků</h6>

      <select class="form-control" id="searchView-sortSelect" onchange="searchManager.searchOptionUpdated();">
        <option value="none">Neřadit</option>
        <option value="dir">Složka nálezu</option>
        <option value="fullpath">Cesta</option>
        <option value="name" selected>Název</option>
        <option value="size">Velikost</option>
        <option value="lastmod">Datum poslední změny</option>
        <option value="ext">Přípona</option>
        <option value="type">Typ položky</option>
      </select>

      <div class="form-check form-check-inline">
        <input type="radio" name="search_view-sort_direction" class="form-check-input" value="asc" onchange="searchManager.searchOptionUpdated();" checked>
        <label class="form-check-label">Vzestupně</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" name="search_view-sort_direction" class="form-check-input" value="desc" onchange="searchManager.searchOptionUpdated();">
        <label class="form-check-label">Sestupně</label>
      </div>

      <small class="mt-2" id="searchView-sort-folderNote" style="display: none;">Jako kritérium pro řazení složek podle velikosti je považován počet položek v nich obsažený.</small>
    </div>

    <div class="col-md-4 mt-3 mb-3">
      <h6 class="font-weight-bold">Filtrování</h6>

      <details class="mt-2 mb-2">
        <summary>Podle typu</summary>

        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="folder" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Složky</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="image" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Obrázky</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="sound" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Hudba</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="video" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Videa</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="archive" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Archivy</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="unixarchive" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Unixové archivy</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="textfile" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Textové soubory</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="database" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Databáze a záznamy</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="pdf" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Soubory PDF</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="document" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Dokumenty</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="spreadsheet" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Tabulky</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="presentation" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Prezentace</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="webpage" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Webové stránky</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="webscript" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Webové skripty</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="sourcecode" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Zdrojové kódy</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="executable" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Spustitelné soubory</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="installer" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Instalační balíčky</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="script" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Skripty</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="email" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">E-maily</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="system" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Systémové soubory</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input intmf-search-typefilter" value="other" onchange="searchManager.searchOptionUpdated();" checked>
          <label class="form-check-label">Ostatní</label>
        </div>

        <div class="text-center">
          <button class="mf-filedetails-btn-sm btn btn-success" id="searchView-typeFilter-selectAll" title="Vybrat vše" onclick="searchManager.typeFilters_select('all');"><img src="img/check-all.png"></button>
          <button class="mf-filedetails-btn-sm btn btn-warning" title="Invertovat výběr" onclick="searchManager.typeFilters_select('invert');"><img src="img/check-invert.png"></button>
          <button class="mf-filedetails-btn-sm btn btn-danger" title="Zrušit výběr" onclick="searchManager.typeFilters_select('none');"><img src="img/check-none.png"></button>
        </div>
      </details>

      <details class="mt-2 mb-2">
        <summary>Podle velikosti souboru</summary>

        <div class="form-group">
          <label class="d-inline-block">Od</label>
          <input type="text" class="form-control d-inline-block w-50" id="searchView-sizeFilter-from" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">
          <select class="form-control d-inline-block w-25" id="searchView-sizeFilter-fromUnit" onchange="searchManager.searchOptionUpdated();">
            <option>B</option>
            <option>kB</option>
            <option selected>MB</option>
            <option>GB</option>
          </select>
          <button class="btn btn-sm btn-danger font-weight-bold" id="searchView-sizeFilter-fromClearBtn" onclick="searchManager.filter_clear('size', 'from');">X</button>
        </div>
        <div class="form-group">
          <label class="d-inline-block">Do</label>
          <input type="text" class="form-control d-inline-block w-50" id="searchView-sizeFilter-to" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">
          <select class="form-control d-inline-block w-25" id="searchView-sizeFilter-toUnit" onchange="searchManager.searchOptionUpdated();">
            <option>B</option>
            <option>kB</option>
            <option selected>MB</option>
            <option>GB</option>
          </select>
          <button class="btn btn-sm btn-danger font-weight-bold" id="searchView-sizeFilter-toClearBtn" onclick="searchManager.filter_clear('size', 'to');">X</button>
        </div>

        <small class="mt-2" id="searchView-sizeFilter-folderNote" style="display: none;">Tento filtr je pro složky ignorován.</small>
      </details>

      <details class="mt-2 mb-2">
        <summary>Podle data poslední změny</summary>

        <div class="form-group">
          <label class="d-inline-block">Od</label>
          <!-- using those two instead of single datetime-local because firefox doesn't support it -->
          <input type="date" class="form-control d-inline-block w-50" id="searchView-dateFilter-fromDate" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">
          <input type="time" class="form-control d-inline-block w-25" id="searchView-dateFilter-fromTime" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">
          <button class="btn btn-sm btn-danger font-weight-bold" id="searchView-dateFilter-fromClearBtn" onclick="searchManager.filter_clear('date', 'from');">X</button>
        </div>
        <div class="form-group">
          <label class="d-inline-block">Do</label>
          <input type="date" class="form-control d-inline-block w-50" id="searchView-dateFilter-toDate" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">
          <input type="time" class="form-control d-inline-block w-25" id="searchView-dateFilter-toTime" onchange="searchManager.searchOptionUpdated();" onkeyup="searchManager.searchOptionUpdated();">
          <button class="btn btn-sm btn-danger font-weight-bold" id="searchView-dateFilter-toClearBtn" onclick="searchManager.filter_clear('date', 'to');">X</button>
        </div>
      </details>
    </div>

    <div class="col-md-4 mt-3 mb-3">
      <h6 class="font-weight-bold">Další možnosti</h6>

      <div class="form-check" title="Nebude prohledávat pouze aktuální složku, ale i všechny podsložky a tak dále.">
        <input type="checkbox" class="form-check-input" id="searchView-option-recursive" onchange="searchManager.searchOptionUpdated();" checked>
        <label class="form-check-label">Prohledávat rekurzivně</label>
      </div>
      <div class="form-check" title="Umožňuje specifikovat pokročilejší vyhledávací výraz pomocí JavaScript kompatibilních regulárních výrazů.">
        <input type="checkbox" class="form-check-input" id="searchView-option-regex" onchange="searchManager.optionRegex_updateCaseSensitivity(); searchManager.searchOptionUpdated();">
        <label class="form-check-label">Hledat dle regulárního výrazu</label>
      </div>
      <div class="form-check" title="Při porovnávání názvů položek bude hledět na velikost písmen v jejich názvech a ve vámi zadaném vyhledávacím výrazu.">
        <input type="checkbox" class="form-check-input" id="searchView-option-caseSensitivity" onchange="searchManager.searchOptionUpdated();">
        <label class="form-check-label">Hledět na velikost písmen</label>
      </div>

      <div class="mt-2">Výraz platí:</div>
      <div class="form-check form-check-inline">
        <input type="radio" name="search_view-exp_validity" class="form-check-input" value="name" onchange="searchManager.searchOptionUpdated();" checked>
        <label class="form-check-label" title="např.:&#010;- současná složka: /uploads/abc/&#010;- srovnávaná položka: /uploads/abc/def/soubor.txt&#010;- výraz platí pro: soubor.txt">Jen pro název</label>
      </div>
      <div class="form-check form-check-inline" title="">
        <input type="radio" name="search_view-exp_validity" class="form-check-input" onchange="searchManager.searchOptionUpdated();" value="fullpath">
        <label class="form-check-label" title="např.:&#010;- současná složka: /uploads/abc/&#010;- srovnávaná položka: /uploads/abc/def/soubor.txt&#010;- výraz platí pro: /uploads/abc/def/soubor.txt">Pro celou cestu</label>
      </div>
      <div class="form-check form-check-inline" title="">
        <input type="radio" name="search_view-exp_validity" class="form-check-input" onchange="searchManager.searchOptionUpdated();" value="path">
        <label class="form-check-label" title="např.:&#010;- současná složka: /uploads/abc/&#010;- srovnávaná položka: /uploads/abc/def/soubor.txt&#010;- výraz platí pro: def/soubor.txt">Pro cestu za aktuální složkou</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12 text-right">
      <button class="intmf-hold mf-search-btn-sm btn btn-danger m-1" id="searchView-clearButton" onclick="searchManager.clear();" title="Veškerým možnostem u pokročilého vyhledávání budou vráceny výchozí hodnoty."><img src="img/check-none.png" class="mr-2 mb-1">Výchozí</button>
      <button class="intmf-hold mf-search-btn-sm btn btn-lg btn-dark m-1" id="searchView-searchButton" onclick="searchManager.search();"><img src="img/search.png" class="mr-2 mb-1">Hledat</button>
    </div>
  </div>

  <div class="row">
    <div class="col-12 mt-3">
      <div id="searchView-resultsStats"></div>
      <div class="list-group" id="searchView-resultsList">

      </div>

      <div class="text-center font-weight-bold" id="searchView-noResultsMsg" style="display: none;">
        Nebyly nalezeny žádné výsledky.
      </div>
    </div>
  </div>

</div>
