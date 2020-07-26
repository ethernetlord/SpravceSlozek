<div class="intmf-view container" id="dirListWrapper" style="display: none;">
  <div class="row">
    <div class="col-12">
      <div class="form-inline mt-3">
        <input type="text" class="form-control w-75" id="dirList-searchBox" placeholder="Prohledat tuto složku..." onkeyup="dirListManager.viewDirList();" ondblclick="dirListManager.clearSearchBox();" onfocus="dirListManager.clearSearchBox();">
        <select class="form-control w-25" id="dirList-sortSelect" onchange="dirListManager.viewDirList();">
          <option value="name-asc">Jméno (vzestupně)</options>
          <option value="name-desc">Jméno (sestupně)</options>
          <option value="size-asc">Velikost (vzestupně)</options>
          <option value="size-desc">Velikost (sestupně)</options>
          <option value="lastmod-asc">Datum poslední změny (vzestupně)</options>
          <option value="lastmod-desc">Datum poslední změny (sestupně)</options>
        </select>
      </div>
      <div class="list-group mt-1" id="dirList">
        
      </div>
    </div>
  </div>
</div>
