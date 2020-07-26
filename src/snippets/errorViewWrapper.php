<div class="intmf-view container" id="errorViewWrapper" style="display: none;">
  <div class="row">
    <div class="col-12 mt-5 text-center">
      <div class="alert alert-danger" id="errorView">
        <h1 class="font-weight-bold">Chyba</h1>
        <p>Při zpracování vašeho požadavku nastala chyba.</p>
        <ul class="mf-ul-smallmargin text-left">
          <li>akce: <span class="font-weight-bold" id="errorView-action"></span></li>
          <li>kód chyby: <span class="font-weight-bold" id="errorView-code"></span></li>
          <li>popis chyby: <span class="font-weight-bold" id="errorView-humanreadable"></span></li>
          <li>možné řešení: <span class="font-weight-bold" id="errorView-solution"></span></li>
          <li style="display: none;" title="= soubory, u nichž se projevila chyba">ovlivněné soubory: <span class="mf-break-all font-weight-bold" id="errorView-files"></span></li>
          <li title="= je možné, že se provedla část vyžádané akce">nejasný stav: <span class="font-weight-bold" id="errorView-unwanted"></span></li>
        </ul>
      </div>
    </div>
  </div>
</div>
