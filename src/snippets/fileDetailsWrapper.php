<div class="intmf-view container" id="fileDetailsWrapper" style="display: none;">
  <div class="row">
    <div class="col-12 text-center">
      <div class="mt-5 text-center d-inline-block" id="fileDetails">
        <h3 class="mf-break-all mb-2"><img id="fileDetails-icon" class="mf-filedetails-icon mr-2"><span id="fileDetails-name"></span></h3>
        <br>
        <h5 id="fileDetails-type" class="mb-3 font-italic"></h5>
        <br>
        <div>
          <ul class="mf-ul-smallmargin text-left">
            <li>Adresář: <span class="mf-break-all font-weight-bold" id="fileDetails-dir"></span></li>
            <li>Velikost: <span class="font-weight-bold" id="fileDetails-size"></span></li>
            <li>Datum změny: <span class="font-weight-bold" id="fileDetails-lastmod"></span></li>
            <li>Počet položek: <span class="font-weight-bold" id="fileDetails-itemcount"></span></li>
            <li>Velikost souborů: <span class="font-weight-bold" id="fileDetails-itemsize"></span></li>
          </ul>
        </div>
        <div>
          <a id="fileDetails-preview" class="btn btn-secondary font-weight-bold mf-filedetails-btn-lg text-center mb-1" href=""><img class="mt-2 mb-2" src="img/image.png"><br>Náhled</a>
          <a id="fileDetails-view" class="btn btn-primary font-weight-bold mf-filedetails-btn-lg text-center mb-1" href="" target="_blank"><img class="mt-2 mb-2" src="img/monitor.png"><br>Zobrazit</a>
          <a id="fileDetails-download" class="btn btn-info font-weight-bold mf-filedetails-btn-lg text-center mb-1" href="" target="_blank" download><img class="mt-2 mb-2" src="img/download.png"><br>Stáhnout</a>
          <a id="fileDetails-edit" class="btn btn-secondary font-weight-bold mf-filedetails-btn-lg text-center mb-1" href="" onclick="return uiManager.checkHold();"><img class="mt-2 mb-2" src="img/edit.png"><br>Editovat</a>
          <a id="fileDetails-archive" title="Zarchivuje, volitelně zkomprimuje a nabídne stažení." class="btn btn-danger font-weight-bold mf-filedetails-btn-lg text-center mb-1" href="" onclick="return uiManager.checkHold();"><img class="mt-2 mb-2" src="img/archive.png"><br>Archiv</a>
        </div>
        <br>
        <div>
          <button id="fileDetails-delete" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/trash.png">Smazat</button>
          <button id="fileDetails-rename" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/pencil.png">Přejmenovat</button>
          <button id="fileDetails-move" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/move.png">Přesunout</button>
          <button id="fileDetails-copy" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/copy.png">Kopírovat</button>
        </div>
        <br>
        <div class="mt-4">
          <h5>Kontrolní součet</h5>
          <div class="btn-group flex-wrap">
            <button class="intmf-hold intmf-hash-buttons btn btn-warning" onclick="return false;">CRC32</button>
            <button class="intmf-hold intmf-hash-buttons btn btn-warning" onclick="return false;">MD5</button>
            <button class="intmf-hold intmf-hash-buttons btn btn-warning" onclick="return false;">SHA1</button>
            <button class="intmf-hold intmf-hash-buttons btn btn-warning" onclick="return false;">SHA256</button>
            <button class="intmf-hold intmf-hash-buttons btn btn-warning" onclick="return false;">SHA512</button>
          </div>
          <small class="mf-break-all d-block mt-2 mb-2" id="fileDetails-hash"></small>
        </div>
      </div>
    </div>
  </div>
</div>
