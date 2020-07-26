# SpravceSlozek

SpravceSlozek je open-source webová aplikace, která umožňuje na server nahrávat soubory a následně je spravovat. Aplikace byla vyvíjena pro použití jako **osobní cloud**.

Backend je naprogramovaný v PHP 7 (bez použití frameworků), frontend v JavaScriptu a se serverovou částí komunikuje pomocí JSON API (XHR). Aplikace funguje ve všech moderních webových prohlížečích, včetně Internet Exploreru 11.


---


## Schopnosti
* nahrávání souborů na server a jejich stahování
* základní operace – mazání, přejmenovávání, přesouvání, kopírování
* stahování skupin souborů nebo celých složek ve volitelně komprimovaných archivech tar
* náhledy obrázkových, audio a video souborů
* vytváření a editace plaintextových souborů přímo ve webovém rozhraní
* výpočet kontrolních součtů (hashů) u souborů na serveru
* pokročilé vyhledávání a filtrování souborů, včetně možnosti rekurzivního prohledání celého stromu složek
* plně responzivní uživatelské rozhraní pro pohodlné používání na mobilních zařízeních
* možnost označení složky jako pouze pro čtení na straně serveru


---


## Zprovoznění
Serverová část musí podporovat HTTPS a doporučuje se použití Unix-like operačního systému (Linux, \*BSD) a webového serveru Apache (z důvodu implicitní dostupnosti [ikon](https://www.apache.org/icons/) a podpory souborů ``.htaccess``). Je zároveň nutné používat PHP ve verzi 7 nebo vyšší.

Nastavení aplikace se nachází v souboru **src/Settings.php** a jestliže budu v následujících bodech referovat na určitou možnost, bude ji možné změnit právě tam.

1. Ujistěte se, že jsou na URL ``https://<vas-server>/icons/`` k dispozici ikony, které budou používány ve výpisu složky. Ověřit to lze například tak, že zkusíte, zda-li se úspěšně načte URL ``https://<vas-server>/icons/README.html`` . Většina instalací serveru Apache by měla mít tyto ikony implicitně dostupné. Chcete-li URL pro přístup k ikonám změnit, můžete tak učinit pomocí možnosti *APACHE_ICONS_PATH*.

2. Přizpůsobte si vaše nastavení v souboru ``Settings.php``. Například možnost *MAX_UPLOAD_SIZE* upravuje maximální velikost souborů nahraných v jedné "dávce" v bajtech, možnost *MAX_UPLOAD_COUNT* upravuje maximální počet souborů v oné dávce a možnost *MAX_EDIT_SIZE* maximální velikost editovaného textového souboru (rovněž v bajtech). Mezi další možnosti, které by vás mohly zajímat, patří *BACK_URL* (určuje, kam směřuje tlačítko "Zpět" na horním panelu) a *ROOT_DIRS* (mění názvy kořenových složek a to, zda-li do nich lze zapisovat; ve výchozím stavu nastavena již předvytvořená prázdná složka ``uploads``, nacházející se v adresáři ``src/wwwroot``).

3. Ujistěte se, že možnosti *post_max_size*, *upload_max_filesize* a *max_file_uploads*, které ovlivňují maximální velikost odesílaných dat na server, resp. velikost a počet souborů, ve vašem **php.ini** mají nastavené hodnoty stejné nebo větší, jako Vámi nastavené údaje v souboru ``Settings.php``. V případě, že tomu tak nebude, po načtení webové aplikace budete dostávat chybu ``php_config_error``. Jestliže používáte službu PHP-FPM, bude ji po nastavení správných hodnot nutné restarovat.

4. Jesliže chcete využívat funkci stahování archivů, ujistěte se, zda-li jsou na vašem serveru nainstalovány programy ``which`` a ``tar`` a zda-li jsou dostupné v některém z adresářů v enviromnent proměnné ``$PATH``. Na serverech používajících OS Windows není tato funkcionalita dostupná. Podmožnosti v *ARCHIVE_DOWNLOADS* umožnují tuto funkcionalitu dále nastavovat.

5. Ujistěte se, že je váš webový server dostupný po HTTPS. Po nešifrovaném HTTP není možné webovou aplikaci používat. Pokud chcete získat univerzálně validní certifikát, použijte například službu [Let's Encrypt](https://letsencrypt.org/).

6. **Nastavte si autentizaci!** Webová aplikace sama o sobě žádné možnosti autentizace nenabízí a jistě nechcete, aby měl **k úložišti přístup úplně kdokoliv z internetu a bez hesla!** K regulaci přístupu lze použít například *HTTP Basic Authentification*, který je podporován všemi běžnými webovými servery a prohlížeči. U serveru Apache vložte do vašeho souboru ``.htaccess`` nebo do konfigurace webserveru například toto:
```
<Directory "/cesta/k/vasemu/webu/">
      AuthType Basic
      AuthName "Authentication is required to access this server."
      AuthUserFile "/cesta/k/vasemu/.htpasswd"
      Require valid-user
</Directory>
```
... kde nahradíte cesty těmi správnými pro váš web či pouze samotnou webovou aplikaci, pokud chcete omezit přístup pouze k ní.

7. Nahrajte obsah složky **src** z tohoto repozitáře na váš server. Aplikace nemusí být přímo v rootu domény. Z webu by měla být dostupná pouze složka **src/wwwroot** a její podsložky! Ve zmiňovaných složkách jsou již předpřipravené soubory ``.htaccess``, ale jestliže nepoužíváte webový server Apache, nebudou funkční a bude nutné omezit přístup způsobem, který je správný pro váš webserver. V každém případě doporučuji omezení přístupu ozkoušet!

8. Ke složce **src/wwwroot/uploads** a k veškerému jejímu obsahu musí mít uživatelský účet, pod nímž běží webový server (resp. PHP), přístup jak ke čtení, tak k **zápisu**. Vlastnictví a přístupová práva k oné složce lze na Unix-like OS změnit například takto (spouštějte jako ``root``, uzpůsobte název uživatele, skupiny a cesty ke složkám vašemu serverovému nasazení; účet ``www-data`` existuje např. na Linuxových distribucích založených na Debianu):
```
chown www-data:www-data src/wwwroot/uploads
chmod 0755 src/wwwroot/uploads
```

9. Aplikace by nyní měla být funkční. Je-li to tak žádoucí, ověřte, zda-li je přístup k ní zaheslovaný (či jinak omezený) a můžete ji začít používat!


---


## Autor
Vytvořil **EthernetLord** v roce 2020. Všechna práva vyhrazena.
* Webové stránky: https://ethernetlord.eu/
* GitHub: @ethernetlord (https://github.com/ethernetlord)
* Twitter: @ethernetlordcz (https://twitter.com/ethernetlordcz)


---


## Licence
Tento projekt používá jako svou licenci **GNU GPLv3**.

V projektu *SpravceSlozek* jsou dále využity projekty *Bootstrap*, *jQuery* a *Open Iconic* (ikony), které jsou distribuovány pod **licencí MIT**.

Všechny výše zmíněné licence jsou obsaženy v souboru [LICENSE](LICENSE) v kořenovém adresáři tohoto repozitáře a dalších souborech.


---


## Přispívání
Chcete-li mě upozornit na nějaké chyby, opravit je, přidat novou funkcionalitu nebo cokoliv zlepšit, neváhejte vytvořit issue či pull request zde na GitHubu.
