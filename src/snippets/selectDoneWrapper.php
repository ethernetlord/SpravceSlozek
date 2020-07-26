<div class="intmf-view container" id="selectDoneWrapper" style="display: none;">
  <div class="row">
    <div class="col-12 text-center mt-5">
      <h2 class="font-weight-bold" id="selectDone-title"></h2>
      <br>
      <p id="selectDone-subtitle"></p>
      <br>
      <div>
        <button class="intmf-hold mf-filedetails-btn-sm btn btn-success mb-1" onclick="selectBoxes.autoSelect_selectAll();"><img class="mr-2" src="img/check-all.png">Vybrat vše</button>
        <button class="intmf-hold mf-filedetails-btn-sm btn btn-warning mb-1" onclick="selectBoxes.autoSelect_invertSelection();"><img class="mr-2" src="img/check-invert.png">Invertovat výběr</button>
        <button class="intmf-hold mf-filedetails-btn-sm btn btn-danger mb-1" onclick="selectBoxes.autoSelect_deselectAll();"><img class="mr-2" src="img/check-none.png">Zrušit výběr</button>
      </div>
      <br>
      <div>
        <a id="selectDone-archive" title="Zarchivuje, volitelně zkomprimuje a nabídne stažení." class="btn btn-danger font-weight-bold mf-filedetails-btn-lg text-center mb-1" href="" onclick="return uiManager.checkHold();"><img class="mt-2 mb-2" src="img/archive.png"><br>Archiv</a>
      </div>
      <br>
      <div>
        <button id="selectDone-delete" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/trash.png">Smazat</button>
        <button id="selectDone-rename" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/pencil.png">Přejmenovat</button>
        <button id="selectDone-move" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/move.png">Přesunout</button>
        <button id="selectDone-copy" class="intmf-hold mf-filedetails-btn-sm btn btn-dark mb-1" onclick="return false;"><img class="mr-2" src="img/copy.png">Kopírovat</button>
      </div>
      <br>
      <div class="text-left">
        <span class="font-weight-bold" id="selectDone-list-title"></span>
        <br>
        <ol class="font-italic" id="selectDone-list">

        </ol>
      </div>
    </div>
  </div>
</div>
