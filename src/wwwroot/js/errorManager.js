var errorManager = {
  fabhide_codes: ["no_rootdirs", "php_config_error", "csrf_error"],

  getErrorMetadata: function(code) {
    switch(code) {
      case "http_error":
        return ["Při posílání HTTP požadavku na API nastala chyba.", "Zkontrolujte připojení k internetu a zkuste to prosím znovu.", true];

      case "invalid_json":
        return ["Server vrátil neplatnou odpověď, která nebyla ve formátu JSON.", "Kontaktujte prosím správce serveru.", true];

      case "no_rootdirs":
        return ["Server nevrátil žádné kořenové složky, ve kterých by se daly spravovat soubory.", "Kontaktujte prosím správce serveru.", false];

      case "php_config_error":
        return ["Server se soubory byl špatně nakonfingurován.", "Kontaktujte prosím správce serveru.", false];

      case "csrf_error":
        return ["Váš prohlížeč odeslal na server neplatný bezpečnostní token.", "Aktualizujte stránku a zkuste to prosím znovu.", false];

      case "missing_params":
        return ["V požadavku na API chyběly nějaké parametry.", "Kontaktujte prosím vývojáře této aplikace.", false];

      case "unknown_action":
        return ["V požadavku na API byla specifikována neplatná akce.", "Kontaktujte prosím vývojáře této aplikace.", false];

      case "script_not_ended":
        return ["Skript nebyl správně ukončen.", "Kontaktujte prosím vývojáře této aplikace.", true];

      case "name_blank":
        return ["Jméno spravoveného souboru nebo složky je prázdné!", "Zadejte nějaké jméno a zkuste to prosím znovu.", false];

      case "name_too_long":
        return ["Cesta k aktuální složce nebo jméno spravovaného souboru nebo složky je příliš dlouhé!", "Zadejte jméno, které má méně než 250 znaků nebo přejděte do složky, která má celkovou cestu kratší než 250 znaků a zkuste to prosím znovu!", false];

      case "name_forbidden":
        return ["Jméno spravovaného souboru nebo složky obsahuje některé z nepovolených podřetězců!", 'Zadejte jméno, které neobsahuje žádný podřezězec z: &quot;\\&quot;, &quot;/&quot;, &quot;..&quot;, &quot;&lt;&quot;, &quot;&gt;&quot;, &quot;javascript:&quot;, &apos;&quot;&apos;, &quot;&apos;&quot;, &quot;&amp;&quot;, &quot;:&quot;, &quot;|&quot;, &quot;?&quot;, &quot;*&quot;, &quot;`&quot, kontrolních ASCII znaků (0x00 až 0x1F a 0x7F) a nezačíná na &quot;.&quot; a zkuste to prosím znovu!', false];

      case "root_dir_not_exists":
        return ["Kořenová složka, ve které se snažíte operovat, neexistuje!", "Kontaktujte prosím správce serveru.", false];

      case "root_dir_read_only":
        return ["Kořenová složka, ve které se snažíte provést změnu, je označená jako pouze pro čtení!", "Přejděte do jiné složky, kde máte právo pro zápis nebo kontaktujte správce serveru v případě, že si myslíte, že je toto chyba.", false];

      case "dir_not_exists":
        return ["Složka, ve které se snažíte operovat, neexistuje!", "Aktualizujte prosím stránku a ujistěte se, že složka stále existuje a pokud ano, tak to zkuste prosím znovu.", false];

      case "name_forbidden_extension":
        return ["Soubor nebo složka, který se snažíte spravovat, má zakázanou příponu nebo předponu názvu!", "Zvolte prosím takový název, který nezačíná na &quot;mf_lock_&quot; a jehož přípona nezačíná na &quot;.ph&quot; a zkuste to prosím znovu!", false];

      case "text_extension_forbidden":
        return ["Nový textový soubor, který se snažíte vytvořit nebo editovat, má zakázanou příponu!", "Zadejte takové jméno, jehož přípona je jednou z <i>." + (serverSettings.editorAllowedExts.join(", .")) + "</i> a zkuste to prosím znovu!", false];

      case "bad_2d_array":
        return ["Váš počítač poslal na API neplatnou dvojici polí!", "Kontaktujte prosím vývojáře této aplikace.", false];

      case "newdir_name_blank":
        return ["Složka, do které se snažíte soubor nebo složku přesunout nebo zkopírovat, má prázné jméno!", "Vyberte prosím takovou složku, která má jméno neprázdné a zkuste to prosím znovu.", false];

      case "newdir_name_too_long":
        return ["Složka, do které se snažíte soubor nebo složku přesunout nebo zkopírovat, má moc dlouhé jméno!", "Vyberte prosím takovou složku, která má jméno kratší než 250 znaků a zkuste to prosím znovu.", false];

      case "newdir_name_forbidden":
        return ["Složka, do které se snažíte soubor nebo složku přesunout nebo zkopírovat, má ve jméně podřetězec, který je nepovolený!", 'Vyberte takovou novou složku, jejíž jméno neobsahuje žádný podřezězec z: &quot;\\&quot;, &quot;/&quot;, &quot;&lt;&quot;, &quot;&gt;&quot;, &quot;javascript:&quot;, &apos;&quot;&apos;, &quot;&apos;&quot;, &quot;&amp;&quot; a nezačíná na &quot;.&quot; a zkuste to prosím znovu!', false];

      case "newdir_root_dir_not_exists":
        return ["Kořenová složka složky, do které se snažíte soubor nebo složku přesunout nebo zkopírovat, neexistuje!", "Kontaktujte prosím správce serveru.", false];

      case "newdir_dir_not_exists":
        return ["Složka, do které se snažíte soubor nebo složku přesunout nebo zkopírovat, neexistuje!", "Aktualizujte prosím stránku a ujistěte se, že cílová složka stále existuje a pokud ano, tak to zkuste prosím znovu.", false];

      case "newdir_dir_to_same_dir":
        return ["Snažíte se přesunout nebo zkopírovat složku do té samé složky, se kterou se provádí akce!", "Vyberte prosím jinou složku a zkuste to prosím znovu.", false];

      case "invalid_hash_algo":
        return ["Algoritmus, kterým chcete soubor hashovat, není platný nebo povolený!", "Kontaktujte prosím vývojáře této aplikace.", false];

      case "disk_space_too_low":
        return ["Při nahrávání nebo editaci souborů jste překročili minimum místa, které musí být na disku volného!", "Zmenšete soubory tak, aby na disku zbývalo nejméně " + tools.convertSize(serverSettings.minFreeSpace) + " a zkuste to prosím znovu!", false];

      case "editor_too_big":
        return ["Velikost editovaného souboru přesáhla maximální hranici!", "Zmenšete prosím obsah editovaného souboru tak, aby nepřesahoval velikost " + tools.convertSize(serverSettings.maxEditSize) + " a zkuste to prosím znovu!", false];

      case "upload_no_files":
        return ["Nevybrali jste žádné soubory k nahrání!", "Zvolte prosím nejméně jeden soubor a zkuste nahrávání spustit znovu!", false];

      case "upload_too_many_files":
        return ["Nahráváte příliš mnoho souborů!", "Zajistěte prosím, abyste na server nenahrávali více jak " + serverSettings.maxUploadCount + " najednou a zkuste to prosím znovu!", false];

      case "upload_too_big":
        return ["Na server nahráváte soubory, jejichž celková velikost přesahuje maximální povolený limit!", "Nahrejte prosím takové soubory, kde součet jejich velikostí nepřesahuje " + globals.convertSize(serverSettings.maxUploadSize) + " a zkuste to prosím znovu!", false];

      case "upload_server_error":
        return ["Při nahrávání souborů na server nastala neznámá chyba!", "Zkuste prosím nahrát soubory na server znovu a pokud bude chybový stav přetrvávat, kontaktujte správce serveru.", false];

      case "deletedir_not_empty":
        return ["Složka, kterou jste chtěli smazat, není prázdná!", "Vyprázdněte danou složku a pokuste se o smazání znovu.", false];

      case "archive_downloads_denied":
        return ["Na serveru bylo zakázáno tvoření a stahování archivů.", "Kontaktujte prosím správce serveru se žádostí o povolení této funkcionality.", false];

      case "archive_invalid_compression_type":
        return ["Vámi vybraný formát archivu je neplatný!", "Vyberte jiný formát archivu a zkuste to prosím znovu nebo kontaktujte správce serveru v případě, že se domníváte, že je toto chyba.", false];

      case "archive_unsupported_os":
        return ["Archiv nebylo možné připravit, protože server běží na nepodporovaném operačním systému.", "Kontaktujte prosím správce serveru.", false];

      case "archive_cannot_execute_commands":
        return ["Archiv nebylo možné připravit, protože je na serveru zakázáno přímé spouštění konzolových příkazů.", "Kontaktujte prosím správce serveru.", false];

      case "archive_no_archiving_program":
        return ["Archiv nebylo možné připravit, protože na serveru není potřebný archivační program.", "Kontaktujte prosím správce serveru.", false];

      case "archive_too_many_archives_in_session":
        return ["Archiv nebylo možné připravit, protože jste ve vašem aktuálním sezení vytvořili již příliš mnoho archivů!", "Restartujte váš prohlížeč a pokud bude problém přetrvávat, vymažte ve vašem prohlížeči cookies či použijte dočasně jiný prohlížeč.", false];

      case "file_not_exists":
        return ["Soubor, který spravujete, neexistuje!", "Ujistěte se, že soubor, který spravujete existuje a máte dostatečná opravnění a zkuste to prosím znovu!", false];

      case "file_exists":
        return ["Soubor, který se snažíte vytvořit, již existuje!", "Ujistěte se, že soubor, který se snažíte vytvořit, neexistuje a zkuste to prosím znovu!", false];

      case "folder_not_exists":
        return ["Složka, kterou spravujete, neexistuje!", "Ujistěte se, že složka, kterou spravujete existuje a máte dostatečná opravnění a zkuste to prosím znovu!", false];

      case "folder_exists":
        return ["Složka, kterou se snažíte vytvořit, již existuje!", "Ujistěte se, že složka, kterou se snažíte vytvořit, neexistuje a zkuste to prosím znovu!", false];

      case "not_exists":
        return ["Soubor nebo složka, kterou spravujete, neexistuje!", "Ujistěte se, že soubor nebo složka, kterou spravujete existuje a máte dostatečná opravnění a zkuste to prosím znovu!", false];

      case "exists":
        return ["Soubor nebo složka, kterou se snažíte vytvořit, již existuje!", "Ujistěte se, že soubor nebo složka, kterou se snažíte vytvořit, neexistuje a zkuste to prosím znovu!", false];

      case "unknown_error":
        return ["Při spravování souboru nebo složky server vykázal neznámou chybu.", "Zkuste to prosím znovu a pokud bude chyba přetrvávat, kontaktujte prosím správce serveru.", true];

      default:
        return ["<i>(neznámá chyba)</i>", "Kontaktujte prosím vývojáře této aplikace, aby přidal definici a řešení chyby, vyjádřenou interním kódem vyobrazeným výše.", true];
    }
  },

  getAffectedFiles: function(json) {
    if(json.hasOwnProperty("filename1") && json.hasOwnProperty("filename2")) {
      if(!json.hasOwnProperty("dimension")) {
        return false;
      }

      if(json.dimension === 1) {
        return ("<i>" + tools.xssFilter(json.filename1) + "</i> ---> " + tools.xssFilter(json.filename2));
      }
      if(json.dimension === 2) {
        return (tools.xssFilter(json.filename1) + " ---> <i>" + tools.xssFilter(json.filename2) + "</i>");
      }

      return (tools.xssFilter(json.filename1) + " ---> " + tools.xssFilter(json.filename2));
    }

    if(json.hasOwnProperty("filename")) {
      return tools.xssFilter(json.filename);
    }

    return false;
  },

  viewError: function(code, error_vars, additional_data) {
    additional_data = (additional_data === undefined) ? {} : additional_data;

    var metadata = errorManager.getErrorMetadata(code);
    var affected_files = errorManager.getAffectedFiles(additional_data);

    document.getElementById("errorView-action").innerHTML = tools.xssFilter(error_vars[0]);
    document.getElementById("errorView-code").innerHTML = tools.xssFilter(code);
    document.getElementById("errorView-humanreadable").innerHTML = metadata[0];
    document.getElementById("errorView-solution").innerHTML = metadata[1];
    document.getElementById("errorView-unwanted").innerHTML = ((metadata[2]) ? "ANO" : "ne");

    var aff_files_display = document.getElementById("errorView-files");
    if(affected_files === false) {
      aff_files_display.parentNode.style.display = "none";
    } else {
      aff_files_display.parentNode.style.display = "list-item";
      aff_files_display.innerHTML = affected_files;
    }

    selectBoxes.autoSelect_deselectAll(false, false);
    if(errorManager.fabhide_codes.indexOf(code) !== -1) {
      fab.hide(true);
    } else {
      fab.changeFAB_goBack("dirList", function() {
        uiManager.setHold(false, ["intmf-nvhold", "navbarHeld"]);
      });
    }

    uiManager.setHold(true, ["intmf-nvhold", "navbarHeld"]);
    uiManager.changeTitle("Chyba!");
    uiManager.changeView("errorView");
  }
}
