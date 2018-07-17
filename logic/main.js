function Main()
{
  // REFERENCE
  this.db = null;
  this.msnry = null;
  this.grid = null;
  this.menu = null;

  // SETTINGS
  this.useMasonry = true;
  this.divNamePre = 'item';

  // MAIN
  this.install = function()
  {
    this.db = new DataWrap(DATABASE);
    this.db.install();

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

    this.displayStats(this.db.getStats());
  }

  this.start = function()
  {
    this.load(window.document.location.hash == "" ? 'home' : window.document.location.hash);
  }

  this.load = function(target = "home")
  {
    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target
    target = target.trim() == "" ? "home" : target

    if (target === '')
    {
      window.history.replaceState(undefined, undefined, "#" + target)
    }
    else 
    {
      // window.location.hash = target.to_url()
      window.location.hash = target;
    }

    var entries = this.db.filter(target);

    // DISPLAY
    this.grid.innerHTML = '';
    this.displayEntries(entries);
    
    // LAYOUT
    if (this.useMasonry)
    {
      this.msnry.reloadItems();
      this.msnry.layout();
    }

    // this.displayStats(this.db.getStats(entries));
  }

  this.displayStats = function(stats)
  {
    // DISPLAY
    let menuContent = ``;
    
    // TYPE
    menuContent += `<a href='#home'>`;
    menuContent += `<div class="menu-item">`;
    menuContent += `<div class="count">${stats.total}</div>`;
    menuContent += `<i class="fas fa-asterisk"></i>`;
    menuContent += `</div>`;
    menuContent += `</a>`;

    if (typeof stats.types['article'] !== 'undefined')
    {
      menuContent += `<a href='#type-article'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['article']}</div>`;
      menuContent += `<i class="far fa-newspaper"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['podcast'] !== 'undefined')
    {
      menuContent += `<a href='#type-podcast'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['podcast']}</div>`;
      menuContent += `<i class="fas fa-podcast"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['video'] !== 'undefined')
    {
      menuContent += `<a href='#type-video'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['video']}</div>`;
      menuContent += `<i class="fas fa-tv"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['list'] !== 'undefined')
    {
      menuContent += `<a href='#type-list'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['list']}</div>`;
      menuContent += `<i class="fas fa-file-alt"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['book'] !== 'undefined')
    {
      menuContent += `<a href='#type-book'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['book']}</div>`;
      menuContent += `<i class="fas fa-book-open"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['game'] !== 'undefined')
    {
      menuContent += `<a href='#type-game'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['game']}</div>`;
      menuContent += `<i class="fas fa-gamepad"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['service'] !== 'undefined')
    {
      menuContent += `<a href='#type-service'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['service']}</div>`;
      menuContent += `<i class="fas fa-server"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['lecture'] !== 'undefined')
    {
      menuContent += `<a href='#type-lecture'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['lecture']}</div>`;
      menuContent += `<i class="fas fa-chalkboard-teacher"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['quote'] !== 'undefined')
    {
      menuContent += `<a href='#type-quote'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['quote']}</div>`;
      menuContent += `<i class="fas fa-comment"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['tool'] !== 'undefined')
    {
      menuContent += `<a href='#type-tool'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['tool']}</div>`;
      menuContent += `<i class="fas fa-wrench"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }
    if (typeof stats.types['music'] !== 'undefined')
    {
      menuContent += `<a href='#type-music'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.types['music']}</div>`;
      menuContent += `<i class="fas fa-music"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }

    // TERM
    if (stats.terms > 0)
    {
      // menuContent += `<div class="menu-item-space"></div>`;
      menuContent += `<a href='#term'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${stats.terms}</div>`;
      menuContent += `<i class="fas fa-ribbon"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }

    // TAGS
    if (stats.tags.length > 0)
    {
      menuContent += `<div class="menu-tag-container">`;
      menuContent += `<i class="fas fa-tag"></i>`;
      for (var t = 0; t < stats.tags.length; t++) 
      {
        menuContent += `<a href='#tag-${stats.tags[t][0]}'>`;
        menuContent += `<div class="menu-tag">`;
        // menuContent += `<i class="fas fa-tag textIcon"></i>`;
        menuContent += `<div class="menu-tag-count">${stats.tags[t][1]}</div>`;
        menuContent += `<div class="menu-tag-label">${stats.tags[t][0]}</div>`;
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