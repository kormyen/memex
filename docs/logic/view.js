function View()
{
  this.msnry = null;
  this.overlay = null;
  this.container = null;
  this.grid = null;
  this.menu = null;
  var parent = this;
    
  const SETTINGS = {
    STATSNUMTAGS: 5,
    STATSNUMTYPE: 10,
    WIDEGRIDITEM: true,
    USEMASONRY: true,
    GRIDITEMIDBASE: 'item',
    SHOWUPPER: true,
    SHOWTITLE: true,
    SHOWTYPE: true,
    SHOWLINK: true,
    SHOWLOWER: true,
    SHOWTAGS: true,
    SHOWNOTE: true,
    SHOWQOTE: true,
    SHOWTERM: true,
    SHOWPROG: true,
    SHOWIMAG: true,
    SHOWOVERLAY: true
  }

  this.install = function()
  {
    this.overlay = document.getElementById("overlay");
    this.container = document.getElementById("container");
    this.grid = document.getElementById("grid");
    this.menu = document.getElementById("menu");

    if (SETTINGS.USEMASONRY)
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

  this.display = function(db)
  {
    if (window.showAdd != undefined && window.showAdd)
    {
      main.add.setOverlay(false);
    }

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
    if (SETTINGS.USEMASONRY)
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
    if (SETTINGS.WIDEGRIDITEM)
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

    if (SETTINGS.SHOWIMAG)
    {
      if (typeof value.TYPE !== 'undefined' && value.TYPE == 'image')
      {
        itemClass += " grid-item-image";
      }
    }

    let entry = ``;

    // ITEM DIV
    entry += `<div class="${itemClass}" id="${SETTINGS.GRIDITEMIDBASE + value.DIID}">`;

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
      if (SETTINGS.SHOWLINK)
      {
        entry += `<a href="${String(value.LINK)}" id="${idUrl}" class="link">`;
      }
    }

    // UPPER CONTENT START
    if (SETTINGS.SHOWUPPER)
    {
      entry += `<div class="grid-item-upper-content">`;

      // TITLE
      if (SETTINGS.SHOWTITLE)
      {
        entry += `<div class="title">${key.to_properCase()}</div>`;
      }

      // LINK END
      if (SETTINGS.SHOWLINK)
      {
        if (typeof value.LINK !== 'undefined')
        {
          entry += `<div class="link-line"><i class="fas fa-link textIcon"></i><div class="link-title">${this.extractRootDomain(value.LINK)}</div></div></a>`;
        }
      }

      // TYPE
      if (SETTINGS.SHOWTYPE)
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
    if (SETTINGS.SHOWLOWER)
    {
      entry += `<div class="grid-item-lower-content">`;

      // TAGS
      if (SETTINGS.SHOWTAGS)
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
      if (SETTINGS.SHOWNOTE)
      {
        if (typeof value.NOTE !== 'undefined')
        {
          entry += `<div class="note"><i class="fas fa-sticky-note textIcon"></i>${value.NOTE}</div>`;
        }
      }

      // QUOTE
      if (SETTINGS.SHOWQOTE)
      {
        if (typeof value.QOTE !== 'undefined')
        {
          entry += `<div class="quote"><i class="fas fa-comment textIcon"></i>${value.QOTE}</div>`;
        }
      }

      // TERM
      if (SETTINGS.SHOWTERM)
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
      if (SETTINGS.SHOWPROG)
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
    if (SETTINGS.SHOWIMAG)
    {
      if (typeof value.TYPE !== 'undefined' && value.TYPE == 'image')
      {
        if (typeof value.FILE !== 'undefined')
        {
          entry += `<div class="image">`;
          if (SETTINGS.SHOWOVERLAY)
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

  this.stats = function(value)
  {
    let menuContent = ``;
    
    if (window.showAdd != undefined && window.showAdd)
    {
      // ADD
      menuContent += `<a href='#add'>`;
      menuContent += `<div class="menu-item"><b>a</b>dd</div>`;
      menuContent += `</a>`;

      menuContent += `<div class="menu-spacer"></div>`;
    }

    // TYPE
    menuContent += `<a href='#'>`;
    menuContent += `<div class="menu-item">`;
    menuContent += `<div class="count">${value.total}</div>`;
    menuContent += `<i class="fas fa-asterisk"></i>`;
    menuContent += `</div>`;
    menuContent += `</a>`;

    for (var ty = 0; ty < Math.min(value.types.length, SETTINGS.STATSNUMTYPE); ty++) 
    {
      if (value.types[ty][0] == 'article')
      {
        menuContent += `<a href='#type-article'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="far fa-newspaper"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'podcast')
      {
        menuContent += `<a href='#type-podcast'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-podcast"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'video')
      {
        menuContent += `<a href='#type-video'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-tv"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'list')
      {
        menuContent += `<a href='#type-list'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-file-alt"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'book')
      {
        menuContent += `<a href='#type-book'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-book-open"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'game')
      {
        menuContent += `<a href='#type-game'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-gamepad"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'service')
      {
        menuContent += `<a href='#type-service'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-server"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'lecture')
      {
        menuContent += `<a href='#type-lecture'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-chalkboard-teacher"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'quote')
      {
        menuContent += `<a href='#type-quote'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-comment"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'tool')
      {
        menuContent += `<a href='#type-tool'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-wrench"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'music')
      {
        menuContent += `<a href='#type-music'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-music"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'image')
      {
        menuContent += `<a href='#type-image'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-image"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'encyclopedia')
      {
        menuContent += `<a href='#type-encyclopedia'>`;
        menuContent += `<div class="menu-item">`;
        menuContent += `<div class="count">${value.types[ty][1]}</div>`;
        menuContent += `<i class="fas fa-globe"></i>`;
        menuContent += `</div>`;
        menuContent += `</a>`;
      }
    }

    menuContent += `<div class="menu-spacer"></div>`;

    // TERM
    if (value.terms > 0)
    {
      // menuContent += `<div class="menu-item-space"></div>`;
      menuContent += `<a href='#term'>`;
      menuContent += `<div class="menu-item">`;
      menuContent += `<div class="count">${value.terms}</div>`;
      menuContent += `<i class="fas fa-ribbon"></i>`;
      menuContent += `</div>`;
      menuContent += `</a>`;
    }

    menuContent += `<div class="menu-spacer"></div>`;

    // TAGS
    if (value.tags.length > 0)
    {
      menuContent += `<div class="menu-tag-container">`;
      menuContent += `<i class="fas fa-tag"></i>`;
      for (var t = 0; t < Math.min(value.types.length, SETTINGS.STATSNUMTAGS); t++) 
      {
        menuContent += `<a href='#tag-${value.tags[t][0]}'>`;
        menuContent += `<div class="menu-tag">`;
        // menuContent += `<i class="fas fa-tag textIcon"></i>`;
        menuContent += `<div class="menu-tag-count">${value.tags[t][1]}</div>`;
        menuContent += `<div class="menu-tag-label">${value.tags[t][0]}</div>`;
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