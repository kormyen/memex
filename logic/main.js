function Main()
{
  // REFERENCE
  this.database = null;
  this.keys = null;
  this.msnry = null;
  this.grid = null;
  this.menu = null;

  // SETTINGS
  this.useMasonry = true;
  this.divNamePre = 'item';
  this.statsNumTags = 10;

  // MAIN
  this.install = function()
  {
    this.database = new Indental(DATABASE).parse();
    this.keys = Object.keys(this.database);
    this.processDatabase();

    this.grid = document.getElementById("grid");
    this.menu = document.getElementById("menu");

    if (this.useMasonry)
    {
      this.msnry = new Masonry( '.grid', {
        itemSelector: '.grid-item',
        columnWidth: 350,
        gutter: 20,
        fitWidth: true,
        transitionDuration: 0,
      });
    }

    this.displayStats(this.database);
  }

  this.start = function()
  {
    this.load(window.document.location.hash == "" ? 'home' : window.document.location.hash);
  }

  this.load = function(target = "home")
  {
    console.log('load');

    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target
    target = target.trim() == "" ? "home" : target

    if(target === '')
    {
      window.history.replaceState(undefined, undefined, "#" + target)
    }
    else 
    {
      // window.location.hash = target.to_url()
      window.location.hash = target;
    }

    var tempDatabase = {}

    if (target == 'home')
    {
      console.log('Display \'home\'');
      tempDatabase = this.database;
    }
    else if (target == 'term')
    {
      console.log('Display \'terms\'');

      for (i = 0; i < this.keys.length; i++) 
      { 
        let value = this.database[this.keys[i]];
        if (typeof value.TERM !== 'undefined')
        {
          tempDatabase[this.keys[i]] = this.database[this.keys[i]];
        }
      }
    }
    else
    {
      var splitTarget = target.split("-");
      console.log('split: ' + splitTarget[0]);

      if (splitTarget[0] == 'tag')
      {
        // TAG
        console.log('Display tag \'' + splitTarget[1] + '\'');

        for (i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (typeof value.TAGS !== 'undefined')
          {
            for (var t = 0; t < value.TAGS.length; t++)
            {
              if (value.TAGS[t] == splitTarget[1])
              {
                tempDatabase[this.keys[i]] = this.database[this.keys[i]];
              }
            }
          }
        }
      }
      else if (splitTarget[0] == 'type')
      {
        // TYPE
        console.log('Display type \'' + splitTarget[1] + '\'');

        var tempDatabase = {}
        for (i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (typeof value.TYPE !== 'undefined')
          {
            if (value.TYPE == splitTarget[1])
            {
              tempDatabase[this.keys[i]] = this.database[this.keys[i]];
            }
          }
        }
      }
    }

    // DISPLAY
    this.grid.innerHTML = '';
    this.displayEntries(tempDatabase);
    
    if (this.useMasonry)
    {
      this.msnry.reloadItems();
      this.msnry.layout();
    }

    // this.displayStats(tempDatabase);
  }

  this.processDatabase = function()
  {
    for (i = 0; i < this.keys.length; i++) 
    { 
      let value = this.database[this.keys[i]];

      // TAGS
      if (typeof value.TAGS !== 'undefined')
      {
        var tags = value.TAGS.split(",");

        for (var t = 0; t < tags.length; t++)
        {
          tags[t] = tags[t].trim().toLowerCase();
        }

        this.database[this.keys[i]].TAGS = tags;
      }

      // TERMS
      if (typeof value.TERM !== 'undefined')
      {
        let termRunic = new Runic(value.TERM).raw;
        let formattedTerms = [];

        for (var t = 0; t < termRunic.length; t++) 
        {
          term = termRunic[t].substr(2).split(':');
          for (var e = 0; e < term.length; e++) 
          {
            term[e] = term[e].trim();
          }
          formattedTerms.push(term);
        }

        this.database[this.keys[i]].TERM = formattedTerms;
      }

      this.database[this.keys[i]].DIID = i;
    }
    console.log(this.database);
  }

  this.missing = function(target)
  {
    console.warn(`Could not find ${target}.`);
    //this.el.innerHTML = `<page><p>Could not find page ${target}</p></page>`;
  }

  this.touch = function(target)
  {
    console.log('touch');

    var link = target.getAttribute("href") ? target.getAttribute("href") : target.parentNode.getAttribute("href")

    if(!link){ return; }
    if(link.substr(0,1) != "#"){ return; }

    this.load(link.substr(1,link.length-1));
  }

  //document.addEventListener('mouseup',  (e)=>{ this.touch(e.target); e.preventDefault(); });

  this.displayStats = function(db)
  {
    // CALCULATE
    let dbKeys = Object.keys(db);
    let types = {};
    let tags = {};
    let terms = 0;
    let i = 0;
    while (i < dbKeys.length) 
    {
      // TYPE
      if (typeof db[dbKeys[i]].TYPE !== 'undefined')
      {
        if (typeof types[db[dbKeys[i]].TYPE] !== 'undefined')
        {
          types[db[dbKeys[i]].TYPE] ++;
        }
        else
        {
          types[db[dbKeys[i]].TYPE] = 1;
        }
      }

      // TAGS
      if (typeof db[dbKeys[i]].TAGS !== 'undefined')
      {
        for (var t = 0; t < db[dbKeys[i]].TAGS.length; t++) 
        {
          if (typeof tags[db[dbKeys[i]].TAGS[t]] !== 'undefined')
          {
            tags[db[dbKeys[i]].TAGS[t]] ++;
          }
          else
          {
            tags[db[dbKeys[i]].TAGS[t]] = 1;
          }
        }
      }

      // TERM
      if (typeof db[dbKeys[i]].TERM !== 'undefined')
      {
        terms += db[dbKeys[i]].TERM.length;
      }

      i++;
    }

    // SORT TAGS, TAKE TOP 5
    // Create items array
    var items = Object.keys(tags).map(function(key) {
      return [key, tags[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    tags = items.slice(0, this.statsNumTags);
    console.log(tags);



    // DISPLAY
    let menuContent = ``;
    
    // TYPE
    menuContent += `<a href='#home'>`;
    menuContent += `<div class="menu-item">`;
    menuContent += `<div class="count">${this.keys.length}</div>`;
    menuContent += `<i class="fas fa-asterisk"></i>`;
    menuContent += `</div>`;
    menuContent += `</a>`;

    if (typeof types['article'] !== 'undefined')
    {
      menuContent += `<a href='#type-article'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['article']}</div>`;
      menuContent += `<i class="far fa-newspaper"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['podcast'] !== 'undefined')
    {
      menuContent += `<a href='#type-podcast'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['podcast']}</div>`;
      menuContent += `<i class="fas fa-podcast"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['video'] !== 'undefined')
    {
      menuContent += `<a href='#type-video'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['video']}</div>`;
      menuContent += `<i class="fas fa-tv"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['list'] !== 'undefined')
    {
      menuContent += `<a href='#type-list'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['list']}</div>`;
      menuContent += `<i class="fas fa-file-alt"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['book'] !== 'undefined')
    {
      menuContent += `<a href='#type-book'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['book']}</div>`;
      menuContent += `<i class="fas fa-book-open"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['game'] !== 'undefined')
    {
      menuContent += `<a href='#type-game'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['game']}</div>`;
      menuContent += `<i class="fas fa-gamepad"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['service'] !== 'undefined')
    {
      menuContent += `<a href='#type-service'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['service']}</div>`;
      menuContent += `<i class="fas fa-server"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['lecture'] !== 'undefined')
    {
      menuContent += `<a href='#type-lecture'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['lecture']}</div>`;
      menuContent += `<i class="fas fa-chalkboard-teacher"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['quote'] !== 'undefined')
    {
      menuContent += `<a href='#type-quote'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['quote']}</div>`;
      menuContent += `<i class="fas fa-comment"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['tool'] !== 'undefined')
    {
      menuContent += `<a href='#type-tool'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['tool']}</div>`;
      menuContent += `<i class="fas fa-wrench"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof types['music'] !== 'undefined')
    {
      menuContent += `<a href='#type-music'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${types['music']}</div>`;
      menuContent += `<i class="fas fa-music"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }

    // TERM
    if (terms > 0)
    {
      // menuContent += `<div class="menu-item-space"></div>`;
      menuContent += `<a href='#term'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${terms}</div>`;
      menuContent += `<i class="fas fa-ribbon"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }

    // TAGS
    if (tags.length > 0)
    {
      menuContent += `<div class="menu-tag-container">`;
      menuContent += `<i class="fas fa-tag"></i>`;
      for (var t = 0; t < tags.length; t++) 
      {
        menuContent += `<a href='#tag-${tags[t][0]}'>`;
        menuContent += `<div class="menu-tag">`;
        // menuContent += `<i class="fas fa-tag textIcon"></i>`;
        menuContent += `<div class="menu-tag-count">${tags[t][1]}</div>`;
        menuContent += `<div class="menu-tag-label">${tags[t][0]}</div>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      menuContent += `</div>`;
    }

    this.menu.innerHTML = ``;
    this.menu.innerHTML += menuContent;
  }

  this.displayEntries = function(db)
  {
    var dbKeys = Object.keys(db);
    var i = 0;
    while (i < dbKeys.length) 
    {
      this.buildEntry(db, dbKeys[i]);
      i++;
    }
  }

  this.buildEntry = function(db, key)
  {
    let value = db[key];

    let entry = `<div class="grid-item" id="${this.divNamePre + db[key].DIID}">`;
    entry += `<div class="title">${key.to_properCase()}</div>`;

    // LINK
    if (typeof value.LINK !== 'undefined')
    {
      var idUrl = "url";
      if (typeof value.SEEN !== 'undefined')
      {
        if (value.SEEN == "true")
        {
          idUrl = "urlseen";
        }
      }
      entry += `<div class="link"><i class="fas fa-link textIcon"></i><a href="${String(value.LINK)}" id="${idUrl}">${this.extractRootDomain(value.LINK)}</a></div>`;
    }

    // TYPE
    if (typeof value.TYPE !== 'undefined')
    {
      entry += `<div id="type">`;
      entry += `<a href='#type-${String(value.TYPE)}'>`;
      if (value.TYPE == 'article')
      {
        entry += `<i class="far fa-newspaper"></i>`;
      }
      else if (value.TYPE == 'podcast')
      {
        entry += `<i class="fas fa-podcast"></i>`;
      }
      else if (value.TYPE == 'video')
      {
        entry += `<i class="fas fa-tv"></i>`;
      }
      else if (value.TYPE == 'list')
      {
        entry += `<i class="fas fa-file-alt"></i>`;
      }
      else if (value.TYPE == 'book')
      {
        entry += `<i class="fas fa-book-open"></i>`;
      }
      else if (value.TYPE == 'game')
      {
        entry += `<i class="fas fa-gamepad"></i>`;
      }
      else if (value.TYPE == 'service')
      {
        entry += `<i class="fas fa-server"></i>`;
      }
      else if (value.TYPE == 'lecture')
      {
        entry += `<i class="fas fa-chalkboard-teacher"></i>`;
      }
      else if (value.TYPE == 'quote')
      {
        entry += `<i class="fas fa-comment"></i>`;
      }
      else if (value.TYPE == 'tool')
      {
        entry += `<i class="fas fa-wrench"></i>`;
      }
      else if (value.TYPE == 'music')
      {
        entry += `<i class="fas fa-music"></i>`;
      }
       
      entry += `</a>`;
      entry += `</div>`;
    }

    // TAGS
    if (typeof value.TAGS !== 'undefined')
    {
      entry += `<div class="tags"><i class="fas fa-tag textIcon"></i>`;
      for (var i = 0; i < value.TAGS.length; i++)
      {
        entry += `<a href=#tag-${value.TAGS[i]}>${value.TAGS[i]}</a>`;
        if (i+1 != value.TAGS.length)
        {
          entry += `, `;
        }
      };
      entry += `</div>`;
    }

    // NOTE
    if (typeof value.NOTE !== 'undefined')
    {
      entry += `<div class="note"><i class="fas fa-sticky-note textIcon"></i>${value.NOTE}</div>`;
    }

    // QUOTE
    if (typeof value.QOTE !== 'undefined')
    {
      entry += `<div class="quote"><i class="fas fa-comment textIcon"></i>${value.QOTE}</div>`;
    }

    // TERM
    if (typeof value.TERM !== 'undefined')
    {
      for (var i = 0; i < value.TERM.length; i++) 
      {
        entry += `<div class="term"><i class="fas fa-ribbon textIcon"></i><b>${value.TERM[i][0]}</b>: ${value.TERM[i][1]}</div>`;
      }
    }

    // PROGRESS
    if (typeof value.PROG !== 'undefined')
    {
      entry += `<div class="prog"><i class="fas fa-clock textIcon"></i>${value.PROG}</div>`;
    }

    entry += `</div>`;

    this.grid.innerHTML += entry;
  }

  String.prototype.to_url = function()
  {
    return this.toLowerCase().replace(/ /g,"+").replace(/[^0-9a-z\+]/gi,"").trim();
  }

  String.prototype.to_properCase = function()
  {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractRootDomain = function(url)
  {
    var domain = this.extractHostname(url),
    splitArr = domain.split('.'),
    arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) 
    {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2)
      {
        //this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractHostname = function(url)
  {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
}

// var detectBackOrForward = function(onBack, onForward)
// {
//   hashHistory = [window.location.hash];
//   historyLength = window.history.length;

//   return function()
//   {
//     var hash = window.location.hash, length = window.history.length;
//     if (hashHistory.length && historyLength == length) {
//       if (hashHistory[hashHistory.length - 2] == hash) {
//         hashHistory = hashHistory.slice(0, -1);
//         onBack();
//       } else {
//         hashHistory.push(hash);
//         onForward();
//       }
//     } else {
//       hashHistory.push(hash);
//       historyLength = length;
//     }
//   }
// };

// window.addEventListener("hashchange", detectBackOrForward(
//   function() { console.log("back"); main.load(); },
//   function() { console.log("forward"); main.load(); }
// ));

window.addEventListener("hashchange", navigate );

function navigate()
{
    main.load(window.document.location.hash);
}