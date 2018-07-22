function View()
{
  // REFERENCE
  this.msnry = null;
  this.grid = null;
  this.menu = null;
  var parent = this;
  
  // SETTINGS
  this.statsNumTags = 5;
  this.statsNumTypes = 10;
  this.doDoubleWide = false;

  this.useMasonry = true;
  this.divNamePre = 'item';

  this.showUpper = true;
  this.showTitle = true;
  this.showType = true;
  this.showLink = true;

  this.showLower = true;
  this.showTags = true;
  this.showNotes = true;
  this.showQuote = true;
  this.showTerm = true;
  this.showProgress = true;
  this.showImage = true;
  this.showOverlay = true;

  this.install = function()
  {
    this.grid = document.getElementById("grid");
    this.menu = document.getElementById("menu");

    if (this.useMasonry)
    {
      this.msnry = new Masonry('.grid', 
      {
        itemSelector: '.grid-item',
        columnWidth: 350,
        gutter: 20,
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }

  this.doEntries = function(db)
  {
    // BUILD
    this.grid.innerHTML = '';
    this.grid.innerHTML += "<div class='grid-sizer'></div>"; 
    var dbKeys = Object.keys(db);
    var i = 0;
    while (i < dbKeys.length) 
    {
      this.buildEntry(db, dbKeys[i]);
      i++;
    }

    // LAYOUT
    if (this.useMasonry)
    {
      this.msnry.reloadItems();
      this.msnry.layout();
    }

    var imgLoad = imagesLoaded( container );
    // When all images finish: redo mansonry layout
    imgLoad.on( 'always', function() { parent.msnry.layout(); } );
  }

  this.buildEntry = function(db, key)
  {
    let value = db[key];

    let itemClass = "grid-item";
    if (this.doDoubleWide)
    {
      if (typeof value.WIDE !== 'undefined' && value.WIDE)
      {
        itemClass += " grid-item--width2";
      }
      else if (typeof value.QOTE !== 'undefined')
      {
        if (Array.isArray(value.QOTE) && value.QOTE.length > 4)
        {
          itemClass += " grid-item--width2";
        } 
      }
    }

    if (this.showImage)
    {
      if (typeof value.TYPE !== 'undefined' && value.TYPE == 'image')
      {
        itemClass += " grid-item-image";
      }
    }

    let entry = ``;

    // ITEM DIV
    entry += `<div class="${itemClass}" id="${this.divNamePre + value.DIID}">`;

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

      // LINK START
      if (this.showLink)
      {
        entry += `<a href="${String(value.LINK)}" id="${idUrl}" class="link">`;
      }
    }

    // UPPER CONTENT START
    if (this.showUpper)
    {
      entry += `<div class="grid-item-upper-content">`;

      // TITLE
      if (this.showTitle)
      {
        entry += `<div class="title">${key.to_properCase()}</div>`;
      }

      // LINK END
      if (this.showLink)
      {
        if (typeof value.LINK !== 'undefined')
        {
          entry += `<div class="link-line"><i class="fas fa-link textIcon"></i><div class="link-title">${this.extractRootDomain(value.LINK)}</div></div></a>`;
        }
      }

      // TYPE
      if (this.showType)
      {
        if (typeof value.TYPE !== 'undefined')
        {
          entry += `<a href='#type-${String(value.TYPE)}'>`;
          entry += `<div class="type">`;

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
          else if (value.TYPE == 'image')
          {
            entry += `<i class="fas fa-image"></i>`;
          }
          else if (value.TYPE == 'encyclopedia')
          {
            entry += `<i class="fas fa-globe"></i>`;
          }
           
          entry += `</div>`;
          entry += `</a>`;
        }
      }

      // UPPER CONTENT END
      entry += `</div>`;
    }

    // LOWER CONTENT START
    if (this.showLower)
    {
      entry += `<div class="grid-item-lower-content">`;

      // TAGS
      if (this.showTags)
      {
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
      }

      // NOTE
      if (this.showNotes)
      {
        if (typeof value.NOTE !== 'undefined')
        {
          entry += `<div class="note"><i class="fas fa-sticky-note textIcon"></i>${value.NOTE}</div>`;
        }
      }

      // QUOTE
      if (this.showQuote)
      {
        if (typeof value.QOTE !== 'undefined')
        {
          entry += `<div class="quote"><i class="fas fa-comment textIcon"></i>${value.QOTE}</div>`;
        }
      }

      // TERM
      if (this.showTerm)
      {
        if (typeof value.TERM !== 'undefined')
        {
          for (var i = 0; i < value.TERM.length; i++) 
          {
            entry += `<div class="term"><i class="fas fa-ribbon textIcon"></i><b>${value.TERM[i][0]}</b>: ${value.TERM[i][1]}</div>`;
          }
        }
      }

      // PROGRESS
      if (this.showProgress)
      {
        if (typeof value.PROG !== 'undefined')
        {
          entry += `<div class="prog"><i class="fas fa-clock textIcon"></i>${value.PROG}</div>`;
        }
      }

      // LOWER CONTENT END
      entry += `</div>`;
    }

    // IMAGE
    if (this.showImage)
    {
      if (typeof value.TYPE !== 'undefined' && value.TYPE == 'image')
      {
        if (typeof value.FILE !== 'undefined')
        {
          entry += `<div class="image">`;
          if (this.showOverlay)
          {
            entry += `<div class="image-overlay"></div>`;
          }
          entry += `<img src="content/media/${value.FILE}">`;
          entry += `</div>`;
        }
      }
    }

    entry += `</div>`;

    this.grid.innerHTML += entry;
  }

  this.doStats = function(stats)
  {
    let menuContent = ``;
    
    // TYPE
    menuContent += `<a href='#home'>`;
    menuContent += `<div class="menu-item">`;
    menuContent += `<div class="count">${stats.total}</div>`;
    menuContent += `<i class="fas fa-asterisk"></i>`;
    menuContent += `</div>`;
    menuContent += `</a>`;

    for (var ty = 0; ty < Math.min(stats.types.length, this.statsNumTypes); ty++) 
    {
      if (stats.types[ty][0] == 'article')
      {
        menuContent += `<a href='#type-article'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="far fa-newspaper"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'podcast')
      {
        menuContent += `<a href='#type-podcast'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-podcast"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'video')
      {
        menuContent += `<a href='#type-video'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-tv"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'list')
      {
        menuContent += `<a href='#type-list'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-file-alt"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'book')
      {
        menuContent += `<a href='#type-book'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-book-open"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'game')
      {
        menuContent += `<a href='#type-game'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-gamepad"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'service')
      {
        menuContent += `<a href='#type-service'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-server"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'lecture')
      {
        menuContent += `<a href='#type-lecture'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-chalkboard-teacher"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'quote')
      {
        menuContent += `<a href='#type-quote'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-comment"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'tool')
      {
        menuContent += `<a href='#type-tool'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-wrench"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'music')
      {
        menuContent += `<a href='#type-music'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-music"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'image')
      {
        menuContent += `<a href='#type-image'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-image"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (stats.types[ty][0] == 'encyclopedia')
      {
        menuContent += `<a href='#type-encyclopedia'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${stats.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-globe"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
    }

    menuContent += `<div class="menu-spacer"></div>`;

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

    menuContent += `<div class="menu-spacer"></div>`;

    // TAGS
    if (stats.tags.length > 0)
    {
      menuContent += `<div class="menu-tag-container">`;
      menuContent += `<i class="fas fa-tag"></i>`;
      for (var t = 0; t < Math.min(stats.types.length, this.statsNumTags); t++) 
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

  // HELPER
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

    // extracting the root domain here
    // if there is a subdomain 
    if (arrLen > 2) 
    {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2)
      {
        // this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractHostname = function(url)
  {
    var hostname;
    // find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
}