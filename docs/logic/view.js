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
    SHOWAUTH: true,
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
    console.log('display ' + db)

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
        itemClass += " grid-itemwide";
      }
      else if (typeof value.QOTE !== 'undefined')
      {
        if (Array.isArray(value.QOTE) && value.QOTE.length > 4)
        {
          itemClass += " grid-itemwide";
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

      // AUTHOR
      if (SETTINGS.SHOWAUTH)
      {
        if (typeof value.AUTH !== 'undefined')
        {
          entry += `<div class="auth"><i class="fas fa-user textIcon"></i>${value.AUTH}</div>`;
        }
      }

      // TAGS
      if (SETTINGS.SHOWTAGS)
      {
        if (typeof value.TAGS !== 'undefined')
        {
          entry += `<div class="tags"><i class="fas fa-tag textIcon"></i>`;
          for (var i = 0; i < value.TAGS.length; i++)
          {
            entry += `<a href="#tag-${value.TAGS[i]}">${value.TAGS[i]}</a>`;
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
          entry += this.buildArrayElement(value.NOTE, "note", "fas fa-sticky-note textIcon");
        }
      }

      // QUOTE
      if (SETTINGS.SHOWQOTE)
      {
        if (typeof value.QOTE !== 'undefined')
        {
          entry += this.buildArrayElement(value.QOTE, "quote", "fas fa-comment textIcon");
        }
      }

      // TERM
      if (SETTINGS.SHOWTERM)
      {
        if (typeof value.TERM !== 'undefined')
        {
          entry += this.buildArrayElement(value.TERM, "term", "fas fa-ribbon textIcon");
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
      menuContent += `<div class="menu-itemgroup">`;
      menuContent += `<a href='#add' class="menu-item">`;
      menuContent += `<b>a</b>dd`;
      menuContent += `</a>`;
      menuContent += `</div>`;
    }

    // TOTAL
    menuContent += `<div class="menu-itemgroup">`;
    menuContent += `<a href='#' class="menu-item">`;
    menuContent += `<div class="menu-itemcount">${value.total}</div>`;
    menuContent += `<i class="menu-itemicon fas fa-asterisk"></i>`;
    menuContent += `</a>`;
    menuContent += `</div>`;

    // DONE
    menuContent += `<div class="menu-itemgroup">`;

    menuContent += `<a href='#done-true' class="menu-item">`;
    menuContent += `<div class="menu-itemcount">${value.done}</div>`;
    menuContent += `<i class="menu-itemicon fas fa-check"></i>`;
    menuContent += `</a>`;

    menuContent += `<a href='#done-false' class="menu-item">`;
    menuContent += `<div class="menu-itemcount">${value.total - value.done}</div>`;
    menuContent += `<i class="menu-itemicon fas fa-times"></i>`;
    menuContent += `</a>`;

    menuContent += `</div>`;
    menuContent += `<div class="menu-itemgroup">`;
    for (var ty = 0; ty < Math.min(value.types.length, SETTINGS.STATSNUMTYPE); ty++) 
    {
      if (value.types[ty][0] == 'article')
      {
        menuContent += `<a href='#type-article' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon far fa-newspaper"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'podcast')
      {
        menuContent += `<a href='#type-podcast' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-podcast"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'video')
      {
        menuContent += `<a href='#type-video' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-tv"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'list')
      {
        menuContent += `<a href='#type-list' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-file-alt"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'book')
      {
        menuContent += `<a href='#type-book' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-book-open"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'game')
      {
        menuContent += `<a href='#type-game' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-gamepad"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'service')
      {
        menuContent += `<a href='#type-service' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-server"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'lecture')
      {
        menuContent += `<a href='#type-lecture' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-chalkboard-teacher"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'quote')
      {
        menuContent += `<a href='#type-quote' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-comment"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'tool')
      {
        menuContent += `<a href='#type-tool' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-wrench"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'music')
      {
        menuContent += `<a href='#type-music' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-music"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'image')
      {
        menuContent += `<a href='#type-image' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-image"></i>`;
        menuContent += `</a>`;
      }
      else if (value.types[ty][0] == 'encyclopedia')
      {
        menuContent += `<a href='#type-encyclopedia' class="menu-item">`;
        menuContent += `<div class="menu-itemcount">${value.types[ty][1]}</div>`;
        menuContent += `<i class="menu-itemicon fas fa-globe"></i>`;
        menuContent += `</a>`;
      }
    }
    menuContent += `</div>`;
    
    // TERM
    menuContent += `<div class="menu-itemgroup">`;
    if (value.terms > 0)
    {
      // menuContent += `<div class="menu-item-space"></div>`;
      menuContent += `<a href='#term' class="menu-item">`;
      menuContent += `<div class="menu-itemcount">${value.terms}</div>`;
      menuContent += `<i class="menu-itemicon fas fa-ribbon"></i>`;
      menuContent += `</a>`;
    }

    menuContent += `</div>`;

    // TAGS
    menuContent += `<div class="menu-itemgroup">`;
    if (value.tags.length > 0)
    {
      menuContent += `<div class="menu-tagcontainer">`;
      menuContent += `<i class="menu-tagicon fas fa-tag"></i>`;
      for (var t = 0; t < Math.min(value.types.length, SETTINGS.STATSNUMTAGS); t++) 
      {
        menuContent += `<a class="menu-tag" href='#tag-${value.tags[t][0]}'>`;
        // menuContent += `<i class="fas fa-tag textIcon"></i>`;
        menuContent += `<div class="menu-tagcount">${value.tags[t][1]}</div>`;
        menuContent += `<div class="menu-taglabel">${value.tags[t][0]}</div>`;
        menuContent += `</a>`;
      }
      menuContent += `</div>`;
    }
    menuContent += `</div>`;

    this.menu.innerHTML = ``;
    this.menu.innerHTML += menuContent;
  }

  this.buildArrayElement = function(data, className, iconName)
  {
    let result = '';
    if (Array.isArray(data))
    {
      for (var i in data)
      {
        if (data[i] == "& ")
        {
          // blank line, do nothing
        }
        else if (data[i].substring(0, 2) == "> ")
        {
          // New item
          if (data[i].includes(": "))
          {
            let titleSplit = data[i].substring(2).split(': '); // .substring(2) removes the "> "
            for (var e = 0; e < titleSplit.length; e++) 
            {
              titleSplit[e] = titleSplit[e].trim();
            }
            result += `<div class="${className}"><i class="${iconName}"></i><b>${titleSplit[0]}</b>: ${titleSplit[1]}</div>`;
          }
          else
          {
            result += `<div class="${className}"><i class="${iconName}"></i>${data[i].substring(2)}</div>`;
          }
        }
        else if (data[i].substring(0, 2) == "& ")
        {
          // New line in current item
          result += `<div class="${className}">${data[i].substring(2)}</div>`;
        }
        else
        {
          // Handle unformatted
          result += `<div class="${className}"><i class="${iconName}"></i>${data[i]}</div>`;
        }
      }
    }
    else
    {
      // Handle not array
      result += `<div class="${className}"><i class="${iconName}"></i>${data}</div>`;
    }
    return result;
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

    if (url.indexOf("://") > -1)
    {
      hostname = url.split('/')[2];
    }
    else
    {
      hostname = url.split('/')[0];
    }

    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
}