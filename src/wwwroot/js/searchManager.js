var searchManager = {
  lastSearchInDir: null,

  viewSearch: function() {
    document.getElementById("searchView-currentDir").innerHTML = tools.xssFilter(tools.slashDir(globals.currentDir));

    if(globals.currentDir !== searchManager.lastSearchInDir) {
      document.getElementById("searchView-resultsList").innerHTML = "";
      document.getElementById("searchView-resultsStats").innerHTML = "";
      document.getElementById("searchView-noResultsMsg").style.display = "none";
    }

    searchManager.searchOptionUpdated();

    // those functions are called in the changeViewCallback() function (due to too many entry points to this view --> one "central" callback, less bugs)
    //fab.changeFAB_goBack("dirList");
    //uiManager.changeTitle("Pokročilé vyhledávání");

    uiManager.changeView("searchView");
  },

  searchOptionUpdated: function() {
    searchManager.folderNotes_updateVisibility();
    document.getElementById("searchView-emptySearchExpNote").style.display = (document.getElementById("searchView-searchExp").value ? "none" : "inline-block");

    searchManager.checkSearchEligibility();
  },

  optionRegex_updateCaseSensitivity: function() {
    var cs = document.getElementById("searchView-option-caseSensitivity");
    //var re_checked = document.getElementById("searchView-option-regex").checked;

    cs.disabled = event.target.checked;
    cs.checked = event.target.checked;
  },

  folderNotes_updateVisibility: function() {
    var sort_by_select = document.getElementById("searchView-sortSelect");
    var sort_by = sort_by_select.options[sort_by_select.selectedIndex].value;

    var typefilter_folder = document.querySelector('input.intmf-search-typefilter[type="checkbox"][value="folder"]').checked;
    var sizefilter_from = document.getElementById("searchView-sizeFilter-from").value;
    var sizefilter_to = document.getElementById("searchView-sizeFilter-to").value;

    document.getElementById("searchView-sort-folderNote").style.display = ((typefilter_folder && sort_by === "size") ? "block" : "none");
    document.getElementById("searchView-sizeFilter-folderNote").style.display = ((typefilter_folder && (sizefilter_from !== "" || sizefilter_to !== "")) ? "block" : "none");
  },

  checkSearchEligibility: function() {
    var searchbtn = document.getElementById("searchView-searchButton");

    var filters_ok = false;
    var filters = document.getElementsByClassName("intmf-search-typefilter");
    for(var i = 0; i < filters.length; i++) {
      if(filters[i].checked) {
        filters_ok = true;
        break;
      }
    }

    var size_from = document.getElementById("searchView-sizeFilter-from").value.replace(/\,/g, ".").trim();
    var size_to = document.getElementById("searchView-sizeFilter-to").value.replace(/\,/g, ".").trim();
    var date_from = document.getElementById("searchView-dateFilter-fromDate").value.trim();
    var date_to = document.getElementById("searchView-dateFilter-toDate").value.trim();
    var time_from = document.getElementById("searchView-dateFilter-fromTime").value.trim();
    var time_to = document.getElementById("searchView-dateFilter-toTime").value.trim();
    var datetime_from = (date_from + " " + time_from).trim();
    var datetime_to = (date_to + " " + time_to).trim();

    var size_from_num = parseFloat(size_from) * Math.pow(1000, document.getElementById("searchView-sizeFilter-fromUnit").selectedIndex);
    var size_to_num = parseFloat(size_to) * Math.pow(1000, document.getElementById("searchView-sizeFilter-toUnit").selectedIndex);
    var datetime_from_num = new Date(datetime_from).getTime();
    var datetime_to_num = new Date(datetime_to).getTime();

    if(globals.dirTree && globals.dirTree.folders && filters_ok && (!size_from || (!isNaN(size_from_num) && size_from_num >= 0)) && (!size_to || (!isNaN(size_to_num) && size_to_num >= 0)) && (!size_from || !size_to || size_from_num <= size_to_num) && (!datetime_from || !isNaN(datetime_from_num)) && (!datetime_to || !isNaN(datetime_to_num)) && (!datetime_from || !datetime_to || datetime_from_num <= datetime_to_num)) {
      searchbtn.disabled = false;
      return true;
    }

    searchbtn.disabled = true;
    return false;
  },

  typeFilters_select: function(what) {
    var filters = document.getElementsByClassName("intmf-search-typefilter");

    for(var i = 0; i < filters.length; i++) {
      if(!filters[i].disabled) {
        switch(what) {
          case "all":
            // click()ing is needed, because the onchange() event isn't fired if we only change the checked property
            if(!filters[i].checked) filters[i].click();
            break;

          case "invert":
            filters[i].click();
            break;

          case "none":
            if(filters[i].checked) filters[i].click();
            break;
        }
      }
    }
  },

  clear: function() {
    // ~ search bar
    var s_exp = document.getElementById("searchView-searchExp");
    s_exp.value = "";
    s_exp.dispatchEvent(new Event("change"));


    // ~ first panel
    var s_select = document.getElementById("searchView-sortSelect");
    s_select.selectedIndex = 3;
    s_select.dispatchEvent(new Event("change"));

    var s_sortdir = document.getElementsByName("search_view-sort_direction");
    for(var i = 0; i < s_sortdir.length; i++) {
      s_sortdir[i].disabled = false;
    }
    if(!s_sortdir[0].checked) s_sortdir[0].click();



    // ~ second panel
    document.getElementById("searchView-typeFilter-selectAll").click();

    document.getElementById("searchView-sizeFilter-fromClearBtn").click();
    document.getElementById("searchView-sizeFilter-toClearBtn").click();

    document.getElementById("searchView-dateFilter-fromClearBtn").click();
    document.getElementById("searchView-dateFilter-toClearBtn").click();


    // ~ third panel
    // 2D array: option name, default checked state
    [["recursive", true], ["regex", false], ["caseSensitivity", false]].forEach(function(opt) {
      var s_opt_cb = document.getElementById("searchView-option-" + opt[0]);
      s_opt_cb.disabled = false;
      if(s_opt_cb.checked !== opt[1]) s_opt_cb.click(); // click()ing is needed due to firing the onclick event
    });

    var s_opt_expval = document.getElementsByName("search_view-exp_validity");
    for(var i = 0; i < s_opt_expval.length; i++) {
      s_opt_expval[i].disabled = false;
    }
    if(!s_opt_expval[0].checked) s_opt_expval[0].click();


    // ~ results
    document.getElementById("searchView-resultsList").innerHTML = "";
    document.getElementById("searchView-resultsStats").innerHTML = "";
    document.getElementById("searchView-noResultsMsg").style.display = "none";


    searchManager.checkSearchEligibility();
  },

  filter_clear: function(what, type) {
    if(what === "size") {
      var size_box = document.getElementById("searchView-sizeFilter-" + type);
      size_box.value = "";
      size_box.dispatchEvent(new Event("change")); // js doesn't fire onchange event on manual value change
      document.getElementById("searchView-sizeFilter-" + type + "Unit").selectedIndex = 2;

    } else {
      var date_box = document.getElementById("searchView-dateFilter-" + type + "Date");
      date_box.value = "";
      date_box.dispatchEvent(new Event("change"));
      var time_box = document.getElementById("searchView-dateFilter-" + type + "Time");
      time_box.value = "";
      time_box.dispatchEvent(new Event("change"));

    }
  },

  search: function() {
    // in case of a bug
    if(!searchManager.checkSearchEligibility()) return;

    var opts = searchManager.search_fetchOptions();

    var results = searchManager.search_getResults(opts);
    searchManager.search_filterResults(opts, results); // no need to return results back because JS passes objects by reference
    searchManager.search_sortResults(opts, results);

    searchManager.search_displayResults(results);

  },

  search_fetchOptions: function() {
    // ~ first panel helper
    var sort_select = document.getElementById("searchView-sortSelect");

    var sort_direction_radios = document.getElementsByName("search_view-sort_direction");
    var sort_direction = null;
    for(var i = 0; i < sort_direction_radios.length; i++) {
      if(sort_direction_radios[i].checked) {
        sort_direction = sort_direction_radios[i].value;
        break;
      }
    }


    // ~ second panel helper
    var filter_types_cb = document.getElementsByClassName("intmf-search-typefilter");
    var filter_types = {};
    for(var i = 0; i < filter_types_cb.length; i++) {
      filter_types[filter_types_cb[i].value] = filter_types_cb[i].checked;
    }

    var filter_sizes = {};
    // 2D array: size limit side, it's default value if not entered
    [["from", 0], ["to", Number.MAX_VALUE]].forEach(function(item) {
      var num = document.getElementById("searchView-sizeFilter-" + item[0]).value.replace(/\,/g, ".").trim();
      var unit = document.getElementById("searchView-sizeFilter-" + item[0] + "Unit").selectedIndex;
      filter_sizes[item[0]] = (num ? (parseFloat(num) * Math.pow(1000, unit)) : item[1]);
    });

    var filter_datetimes = {};
    [["from", Number.MIN_VALUE], ["to", Number.MAX_VALUE]].forEach(function(item) {
      var date = document.getElementById("searchView-dateFilter-" + item[0] + "Date").value.trim();
      var time = document.getElementById("searchView-dateFilter-" + item[0] + "Time").value.trim();
      var datetime = (date + " " + time).trim();
      filter_datetimes[item[0]] = (datetime ? Math.floor(new Date(datetime).getTime() / 1000) : item[1]);
    });
    if(filter_datetimes["to"] !== Number.MAX_VALUE) {
      filter_datetimes["to"] += 59; // to match the whole minute (input type time cannot enter seconds)
    }


    // ~ third panel helper
    var exp_validity_range_radios = document.getElementsByName("search_view-exp_validity");
    var exp_validity_range = null;
    for(var i = 0; i < exp_validity_range_radios.length; i++) {
      if(exp_validity_range_radios[i].checked) {
        exp_validity_range = exp_validity_range_radios[i].value;
        break;
      }
    }


    return {
      expression: document.getElementById("searchView-searchExp").value,
      sort_by: sort_select.options[sort_select.selectedIndex].value,
      sort_direction: sort_direction,
      filter_types: filter_types,
      filter_size_from: filter_sizes["from"],
      filter_size_to: filter_sizes["to"],
      filter_datetime_from: filter_datetimes["from"],
      filter_datetime_to: filter_datetimes["to"],
      option_recursive: document.getElementById("searchView-option-recursive").checked,
      option_regex: document.getElementById("searchView-option-regex").checked,
      option_case_sensitive: document.getElementById("searchView-option-caseSensitivity").checked,
      expression_validity_range: exp_validity_range
    };
  },

  search_getResults: function(opts) {
    var found = {folders: [], files: []};
    var exp = (opts.option_regex ? new RegExp(opts.expression) : (opts.option_case_sensitive ? opts.expression : opts.expression.toLowerCase()));
    var tm = new TreeManager(globals.dirTree);


    var match_fn = function(fullpath, is_dir) {
      fullpath = "/" + fullpath;

      var match_path = null;
      switch(opts.expression_validity_range) {
        case "name":
          match_path = fullpath.split("/").pop();
          break;

        case "fullpath":
          match_path = fullpath;
          break;

        case "path": // relative path to currentDir
          match_path = fullpath.slice(globals.currentDir.length + 2);
          break;
      }

      if(is_dir) {
        match_path += "/";
      }
      if(!opts.option_case_sensitive) {
        match_path = match_path.toLowerCase();
      }

      return (opts.option_regex ? exp.test(match_path) : match_path.indexOf(exp) !== -1);
    }

    var recursive_search_fn = function(dir) {
      var ct = tm.getDirContents(dir);

      for(var i = 0; i < ct.files.length; i++) {
        var fullpath = dir + "/" + ct.files[i].name;
        if(match_fn(fullpath, false)) {
          var type_descriptors = tools.getFileType(ct.files[i].name, "all");
          found.files.push({
            dir: dir,
            fullpath: fullpath,
            name: ct.files[i].name,
            size: ct.files[i].size,
            lastmod: ct.files[i].last_mod,
            ext: ct.files[i].name.split(".").pop(),
            type: type_descriptors.filter,
            iconpath: type_descriptors.iconpath,
            typedesc: type_descriptors.desc
          });
        }
      }

      var dir_type_descriptors = tools.getDirFileType("all");
      for(var i = 0; i < ct.folders.length; i++) {
        var fullpath = dir + "/" + ct.folders[i].name;
        if(match_fn(fullpath, true)) {
          found.folders.push({
            dir: dir,
            fullpath: fullpath,
            name: ct.folders[i].name,
            size: (ct.folders.length + ct.files.length),
            lastmod: ct.folders[i].last_mod,
            ext: ct.folders[i].name.split(".").pop(), // even dirs can have extensions, although it's unlikely
            type: dir_type_descriptors.filter,
            iconpath: dir_type_descriptors.iconpath,
            typedesc: dir_type_descriptors.desc
          });
        }
        if(opts.option_recursive) {
          recursive_search_fn(fullpath);
        }
      }
    }


    recursive_search_fn(globals.currentDir);

    return found;
  },

  search_filterResults: function(opts, results) {
    var filtered_folders = [];
    if(opts.filter_types.folder) {
      for(var i = 0; i < results.folders.length; i++) {
        var lastmod = results.folders[i].lastmod;
        if(opts.filter_datetime_from <= lastmod && opts.filter_datetime_to >= lastmod) {
          filtered_folders.push(results.folders[i]);
        }
      }
    }
    results.folders = filtered_folders;

    var filtered_files = [];
    for(var i = 0; i < results.files.length; i++) {
      var filesize = results.files[i].size;
      var lastmod = results.files[i].lastmod;
      if(opts.filter_types[results.files[i].type] && opts.filter_size_from <= filesize && opts.filter_size_to >= filesize && opts.filter_datetime_from <= lastmod && opts.filter_datetime_to >= lastmod) {
        filtered_files.push(results.files[i]);
      }
    }
    results.files = filtered_files;
  },

  search_sortResults: function(opts, results) {
    var sortFn_str = function(item1, item2) {
      item1 = item1[opts.sort_by];
      item2 = item2[opts.sort_by];

      var item1_num = parseFloat(item1);
      var item2_num = parseFloat(item2);
      if(!isNaN(item1_num) && !isNaN(item2_num)) {
        return (item1_num - item2_num);
      }

      return item1.localeCompare(item2);
    }

    var sortFn_num = function(item1, item2) {
      return (item1[opts.sort_by] - item2[opts.sort_by]);
    }

    switch(opts.sort_by) {
      // case "none":
      //   break;
      case "dir": case "fullpath": case "name": case "ext": case "type":
        results.folders.sort(sortFn_str);
        results.files.sort(sortFn_str);
        break;

      case "size": case "lastmod":
        results.folders.sort(sortFn_num);
        results.files.sort(sortFn_num);
        break;
    }

    if(opts.sort_direction === "desc" && opts.sort_by !== "none") {
      results.folders.reverse();
      results.files.reverse();
    }
  },

  search_displayResults: function(results) {
    var shorten_path = function(path) {
      if(path.length <= 50) return path;

      return (path.slice(0, 47) + "...");
    }

    var results_czech_engine = function(count) {
      if(count === 1) return "výsledek";
      if(count > 4 || count === 0) return "výsledků";
      return "výsledky";
    }

    searchManager.lastSearchInDir = globals.currentDir;

    var results_list_elem = document.getElementById("searchView-resultsList");
    var results_stats_elem = document.getElementById("searchView-resultsStats");
    var noresults_msg_elem = document.getElementById("searchView-noResultsMsg");

    if(results.folders.length || results.files.length) {
      results_list_elem.style.display = "block";
      results_stats_elem.style.display = "block";
      noresults_msg_elem.style.display = "none";
    } else {
      results_list_elem.style.display = "none";
      results_stats_elem.style.display = "none";
      noresults_msg_elem.style.display = "block";
      return;
    }

    var total_results_count = (results.folders.length + results.files.length);
    var folders_count_string = (results.folders.length + " " + tools.czechEngineNumbering(results.folders.length, "složka"));
    var files_count_string = (results.files.length + " " + tools.czechEngineNumbering(results.files.length, "soubor"));
    results_stats_elem.innerHTML = (total_results_count + " " + results_czech_engine(total_results_count) + " (" + folders_count_string + ", " + files_count_string + ")");

    var results_html = "";
    for(var i = 0; i < results.folders.length; i++) {
      results_html += '<li class="list-group-item list-group-item-action list-group-item-secondary py-1">\
      <a class="intmf-hold float-right" onclick="return uiManager.checkHold();" href="javascript:fileDetailsManager.viewFolderDetails_fromSearch(\'' + tools.xssFilter(results.folders[i].fullpath) + '\');">\
      <img class="mf-list-icon mf-list-righticon float-right" src="img/info.png"></a>\
      <span class="d-none d-xl-inline mr-3 float-right">' + tools.xssFilter(shorten_path(tools.slashDir(results.folders[i].dir))) + '</span>\
      <a class="intmf-hold mf-break-all mf-listitem-a font-weight-bold" onclick="return uiManager.checkHold();" href="javascript:dirListManager.changeDir(\'' + tools.xssFilter(results.folders[i].fullpath) + '\');">\
      <img class="mf-list-icon float-left mr-2" src="' + results.folders[i].iconpath + '">' + tools.xssFilter(results.folders[i].name) + '\
      </a></li>';
    }
    for(var i = 0; i < results.files.length; i++) {
      results_html += '<li class="list-group-item list-group-item-action list-group-item-secondary py-1">\
      <a class="intmf-hold float-right" href="' + tools.xssFilter(results.files[i].fullpath) + '" target="_blank" download><img class="mf-list-icon mf-list-righticon float-right" src="img/download-black.png"></a>\
      <span class="d-none d-xl-inline mr-3 float-right">' + tools.xssFilter(shorten_path(tools.slashDir(results.files[i].dir))) + '</span>\
      <a class="intmf-hold mf-break-all mf-listitem-a font-weight-bold" onclick="return uiManager.checkHold();" href="javascript:fileDetailsManager.viewFileDetails_fromSearch(\'' + tools.xssFilter(results.files[i].fullpath) + '\');">\
      <img class="mf-list-icon float-left mr-2" src="' + results.files[i].iconpath + '">' + tools.xssFilter(results.files[i].name) + '\
      </a></li>';
    }

    results_list_elem.innerHTML = results_html;
  }
}
