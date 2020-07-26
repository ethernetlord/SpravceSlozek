<div class="intmf-view container" id="uploadViewWrapper" style="display: none;">
  <div class="row">
    <div class="col-12 text-center mt-5">
      <div class="intmf-upload-view" id="uploadView" style="display: none;">
        <h2 class="font-weight-bold">Nahrát soubory</h2>
        <br>
        <p>
          Vyberte prosím soubory, které chcete na server nahrát.<br>
          Soubory budou nahrány do aktuální složky, tedy <b id="uploadView-currentDir"></b>.<br>
          Maximálně můžete najednou nahrát <b id="uploadView-maxfiles"></b> souborů a součet jejich velikostí nesmí přesahovat <b id="uploadView-maxsize"></b>.
        </p>
        <form id="uploadView-fileform" onsubmit="return false;">
          <input type="file" class="intmf-hold" name="uploadedFiles[]" id="uploadView-fileselect" multiple>
        </form>
        <br><br>
        <button class="intmf-hold btn btn-success btn-lg" id="uploadView-runbtn" onclick="uploadManager.runUpload();">Nahrát</button>
      </div>

      <div class="intmf-upload-view" id="uploadView-progress" style="display: none;">
        <h2 class="font-weight-bold">Soubory se nahrávají...</h2>
        <br>
        <p>
          Počkejte prosím, než se dokončí nahrávání Vašich souborů...<br>
          Neopouštejte prosím tuto stránku před dokončením, nebo dojde k přerušení nahrávání!
        </p>
        <br>
        <div>
          <p class="h3 font-weight-bold" id="uploadView-progress-percentage">0%</h3>
          <p><span class="font-weight-bold" id="uploadView-progress-loaded"><i>(spouštění...)</i></span> / <span class="font-weight-bold" id="uploadView-progress-total"><i>(spouštění...)</i></span></p>
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" id="uploadView-progress-bar" style="width: 0%;"></div>
          </div>
        </div>
        <br>
        <div class="btn-group-toggle">
          <label class="btn btn-danger">
            <input type="checkbox" autocomplete="off" id="uploadView-progress-cancel" onchange="uploadManager.cancelWait();"><span id="uploadView-progress-cancelText">Zrušit nahrávání</span>
          </label>
        </div>
      </div>

      <div class="intmf-upload-view" id="uploadView-done" style="display: none;">
        <h2 class="font-weight-bold">Soubory se zpracovávají...</h2>
        <br>
        <p>
          Samotný přenos souborů na server byl dokončen!<br>
          Teď je ještě nutné počkat na to, než se soubory zpracují a zapíšou na serveru na disk...<br>
          Stále platí, že byste něměli opuštět tuto stránku, jinak by mohlo dojít k nepředvídatelným chybám!<br>
          <br>
          Po úplném dokončení budete automaticky přesměrováni na zobrazení obsahu složky.
        </p>
      </div>

      <div class="intmf-upload-view" id="uploadView-aborted" style="display: none;">
        <h2 class="font-weight-bold">Nahrávání bylo zrušeno!</h2>
        <br>
        <p>
          Nahrávání bylo předčasně ukončeno.<br>
          Na serveru by se neměly projevit žádné změny.<br>
          Můžete se vrátit tlačítkem &quot;Zpět&quot; v pravém dolním rohu a pokračovat v práci.
        </p>
      </div>

    </div>
  </div>
</div>
