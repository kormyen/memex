function View()
{
  this.nav = null;
  this.container = null;
  this.grid = null;
  this.overlay = null;

  this.msnry = null;
  var parent = this;

  this.install = function(nav, container, grid, overlay)
  {
    this.nav = nav;
    this.container = container;
    this.grid = grid;
    this.overlay = overlay;

    if (SETTINGS.USEMASONRY)
    {
      this.msnry = new Masonry('main', 
      {
        itemSelector: 'article',
        columnWidth: 350,
        gutter: 20,
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }

  this.display = function(db)
  {
    if (window.showAdd !== undefined && window.showAdd)
    {
      main.add.setOverlay(false);
    }

    // BUILD
    let dbKeys = Object.keys(db);
    let i = 0;
    let contentHtml = '';
    while (i < dbKeys.length) 
    {
      contentHtml += this.buildArticle(db, dbKeys[i]);
      i++;
    }
    this.grid.innerHTML = contentHtml;

    // LAYOUT
    if (SETTINGS.USEMASONRY)
    {
      this.msnry.reloadItems();
      this.msnry.layout();

      if (SETTINGS.MASONRYCOMPLETE || SETTINGS.MASONRYPROGRESS)
      {
        let imgLoad = imagesLoaded( this.container );
        if (!SETTINGS.MASONRYPROGRESS)
        {
          // When all images finish: redo mansonry layout
          imgLoad.on( 'always', function() { parent.msnry.layout(); } );
        }
        else
        {
          // As images load one by one: redo masonry layout
          imgLoad.on( 'progress', function() { parent.msnry.layout(); } );
        }
      }
    }
  }

  this.buildArticle = function(db, key)
  {
    let value = db[key];
    let itemClass = "article";
    if (SETTINGS.WIDEARTICLE)
    {
      if (this.isDefined(value.WIDE) && value.WIDE)
      {
        itemClass += " article-wide";
      }
      else if (this.isDefined(value.QOTE))
      {
        if (Array.isArray(value.QOTE) && value.QOTE.length > SETTINGS.AUTOWIDETRIGGER)
        {
          itemClass += " article-wide";
        } 
      }
    }

    let onclickImage = ``;
    let entryIsImageType = (SETTINGS.SHOWIMAG && this.isType(value.TYPE, 'image'));
    if (entryIsImageType)
    {
      itemClass += " article-image";
      onclickImage = `onclick="main.view.handleImageClick(event, this, '${value.FILE}');"
        style="cursor: pointer;"`;
    }

    // ARTICLE
    let entry = `<article class="${itemClass}" id="${SETTINGS.ARTICLEIDBASE + value.DIID}">`;
    if (this.isDefined(value.LINK))
    {
      var idUrl = "url";
      if (this.isDefined(value.SEEN) && value.SEEN === "true")
      {
        idUrl = "urlseen";
      }

      // LINK START
      if (SETTINGS.SHOWLINK && !this.isObject(value.LINK))
      {
        // If this item has only one link then make the whole title the link
        entry += `<a class="article-link" href="${String(value.LINK)}" id="${idUrl}">`;
      }
    }

    // UPPER CONTENT START
    if (SETTINGS.SHOWUPPER)
    {
      let upperClass = 'article-containerupper';
      if (entryIsImageType)
      {
        upperClass = 'article-containerupper-image';
      }
      entry += `<div class="${upperClass}" ${onclickImage}>`;

      // TITLE
      if (SETTINGS.SHOWTITLE)
      {
        entry += `<header class="article-title">${key.to_properCase()}</header>`;
      }

      // LINK END
      if (SETTINGS.SHOWLINK && this.isDefined(value.LINK))
      {
        if (this.isObject(value.LINK))
        {
          for (let l = 0; l < value.LINK.length; l++)
          {
            entry += `<a class="article-link" href="${String(value.LINK[l])}" id="${idUrl}">`;
            entry += `<div class="article-linkcontainer"><div class="article-linkicon">${this.buildIcon('link')}</div><div class="article-linktitle">${this.extractRootDomain(value.LINK[l])}</div></div></a>`;
          }
        }
        else
        {
          entry += `<div class="article-linkcontainer"><div class="article-linkicon">${this.buildIcon('link')}</div><div class="article-linktitle">${this.extractRootDomain(value.LINK)}</div></div></a>`;
        }
      }

      // TYPE
      if (SETTINGS.SHOWTYPE && this.isDefined(value.TYPE))
      {

        entry += `<div class="article-typecontainer">`;
        for (let tc = 0; tc < value.TYPE.length; tc++)
        {
          entry += `<a class="article-type" href='#type-${value.TYPE[tc]}'>`;
          entry += this.buildIcon(value.TYPE[tc], value.TYPE[tc], 'article-typeicon');
          entry += `</a>`;
        }
        entry += `</div>`;
      }

      // UPPER CONTENT END
      entry += `</div>`;
    }

    // LOWER CONTENT START
    if (SETTINGS.SHOWLOWER)
    {
      let lowerClass = 'article-containerlower';
      if (entryIsImageType)
      {
        lowerClass = 'article-containerlower-image';
      }
      entry += `<div class="${lowerClass}" ${onclickImage}>`;

      // TIME
      if (SETTINGS.SHOWDATE && this.isDefined(value.DATE))
      {
        entry += this.doRow('date', value.DATE);
      }

      // AUTHOR
      if (SETTINGS.SHOWAUTH && this.isDefined(value.AUTH))
      {
        for (var i = 0; i < value.AUTH.length; i++)
        {
          entry += this.doRow('author', value.AUTH[i].to_properCase());
        }
      }

      // TAGS
      if (SETTINGS.SHOWTAGS && this.isDefined(value.TAGS))
      {
        let content = '';
        for (var i = 0; i < value.TAGS.length; i++)
        {
          content += `<a class="article-taglink" href="#tag-${value.TAGS[i]}">${value.TAGS[i]}</a>`;
          if (i + 1 !== value.TAGS.length)
          {
            content += `, `;
          }
        };
        entry += this.doRow('tags', content);
      }

      // PROJECT
      if (SETTINGS.SHOWPROJ && this.isDefined(value.PROJ))
      {
        let content = '';
        for (var i = 0; i < value.PROJ.length; i++)
        {
          content += `<a class="article-taglink" href="#proj-${value.PROJ[i]}">${value.PROJ[i].to_properCase()}</a>`;
          if (i + 1 != value.PROJ.length)
          {
            content += `, `;
          }
        }
        entry += this.doRow('project', content);
      }

      // TERM
      if (SETTINGS.SHOWTERM && this.isDefined(value.TERM))
      {
        entry += this.doMultilineFormatting('term', value.TERM);
      }

      // NOTE
      if (SETTINGS.SHOWNOTE && this.isDefined(value.NOTE))
      {
        entry += this.doMultilineFormatting('note', value.NOTE);
      }

      // QUOTE
      if (SETTINGS.SHOWQOTE && this.isDefined(value.QOTE))
      {
        entry += this.doMultilineFormatting('quote', value.QOTE);
      }

      // PROGRESS
      if (SETTINGS.SHOWPROG && this.isDefined(value.PROG))
      {
        entry += this.doRow('progress', value.PROG);
      }
      
      // IMAGE - for non-image-type-entry
      if (SETTINGS.SHOWIMAG 
        && !this.isType(value.TYPE, 'image')
        && this.isDefined(value.FILE)
        && this.isImage(value.FILE))
      {
        entry += `<div class="image">`;
        entry += `<img class="article-img" src="content/media/${value.FILE}" onclick="lightbox.load('content/media/${value.FILE}')">`;
        entry += `</div>`;
      }

      // FILE
      if (SETTINGS.SHOWFILE && this.isDefined(value.FILE))
      {
        if (this.isObject(value.FILE))
        {
          for (var i = 0; i < value.FILE.length; i++) 
          {
            entry += this.doRow('file', `<a class="article-file-link" href="content/media/${value.FILE[i]}">${value.FILE[i]}</a>`, 'article-file');
          }
        }
        else
        {
          // single
          entry += this.doRow('file', `<a class="article-file-link" href="content/media/${value.FILE}">${value.FILE}</a>`, 'article-file');
        }
      }

      // LOWER CONTENT END
      entry += `</div>`;
    }

    // IMAGE - for image-type-entry
    if (entryIsImageType
        && this.isDefined(value.FILE)
        && this.isImage(value.FILE))
    {
      entry += `<div class="image">`;
      if (SETTINGS.SHOWOVERLAY)
      {
        entry += `<div class="image-overlay"></div>`;
      }
      entry += `<img class="article-image-img" src="content/media/${value.FILE}">`;
      entry += `</div>`;
    }

    entry += `</article>`;
    return entry;
  }

  this.doRow = function(type, content, extraClass)
  {
    return `<div class="article-row${extraClass != undefined ? ' '+extraClass : ''}">
    ${type != undefined ? this.buildIcon(type) : ''}
    <div class="article-rowtext">${content}</div>
    </div>`;
  }

  this.stats = function(value)
  {
    let navContent = ``;
    if (window.showAdd !== undefined && window.showAdd)
    {
      // ADD
      navContent += `<div class="nav-itemgroup">`;
      navContent += `<a href='#add' class="nav-item">`;
      navContent += `<b>a</b>dd`;
      navContent += `</a>`;
      navContent += `</div>`;
    }

    // TOTAL
    navContent += `<div class="nav-itemgroup">`;
    navContent += `<a href='#' class="nav-item">`;
    navContent += `<div class="nav-itemcount">${value.total}</div>`;
    navContent += `<i title="all" class="nav-itemicon fas fa-asterisk"></i>`;
    navContent += `</a>`;
    navContent += `</div>`;

    // DONE
    if (SETTINGS.SHOWDONE)
    {
      navContent += `<div class="nav-itemgroup">`;
      navContent += `<a href='#done-true' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${value.done}</div>`;
      navContent += `<i title="done" class="nav-itemicon fas fa-check"></i>`;
      navContent += `</a>`;
      navContent += `<a href='#done-false' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${value.total - value.done}</div>`;
      navContent += `<i title="to do" class="nav-itemicon fas fa-times"></i>`;
      navContent += `</a>`;
      navContent += `</div>`;
    }

    navContent += `<div class="nav-itemgroup">`;
    for (let ty = 0; ty < Math.min(value.types.length, SETTINGS.STATSNUMTYPE); ty++) 
    {
      const type = value.types[ty][0];
      const count = value.types[ty][1];
      const icon = this.getIcon(type);
      navContent += `<a href='#type-${type}' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${count}</div>`;
      navContent += `<i title="${type}" class="nav-itemicon ${icon}"></i>`;
      navContent += `</a>`;
    }
    navContent += `</div>`;

    // TERM
    navContent += `<div class="nav-itemgroup">`;
    if (value.terms > 0)
    {
      navContent += `<a href='#term' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${value.terms}</div>`;
      navContent += `<i title="terms" class="nav-itemicon fas fa-ribbon"></i>`;
      navContent += `</a>`;
    }
    navContent += `</div>`;

    // TAGS
    navContent += `<div class="nav-itemgroup">`;
    if (value.tags.length > 0)
    {
      navContent += `<div class="nav-tagcontainer">`;
      navContent += `<i title="tags" class="nav-tagicon fas fa-tag"></i>`;
      for (var t = 0; t < Math.min(value.tags.length, SETTINGS.STATSNUMTAGS); t++) 
      {
        navContent += `<a class="nav-tag" href='#tag-${value.tags[t][0]}'>`;
        navContent += `<div class="nav-tagcount">${value.tags[t][1]}</div>`;
        navContent += `<div class="nav-taglabel">${value.tags[t][0]}</div>`;
        navContent += `</a>`;
      }
      navContent += `</div>`;
    }
    navContent += `</div>`;
    this.nav.innerHTML = navContent;
  }

  this.handleImageClick = function(e, element, file)
  {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target == element)
    {
      // If user is clicking given element, or element's background... 
      // as opposed to an element's child content, then do lightbox.
      // This stops lightbox from happening when clicking on tags, file etc
      lightbox.load(`content/media/${file}`);
    }
  }

  this.doMultilineFormatting = function(type, data)
  {
    let result = '';
    if (Array.isArray(data))
    {
      for (var i in data)
      {
        if (data[i].substring(0, 2) == "> ")
        {
          // New item
          if (data[i].includes(": "))
          {
            let titleSplit = data[i].substring(2).split(': '); // .substring(2) removes the "> "
            for (var e = 0; e < titleSplit.length; e++) 
            {
              titleSplit[e] = titleSplit[e].trim();
            }
            result += this.doRow(type, `<b>${titleSplit[0]}</b>: ${titleSplit[1]}`);
          }
          else
          {
            result += this.doRow(type, data[i].substring(2));
          }
        }
        else if (data[i].substring(0, 2) === "& ")
        {
          // New line in current item
          result += this.doRow(null, data[i].substring(2));
        }
        else if (data[i].substring(0, 2) == "- ")
        {
          // Bullet point
          result += this.doRow('dash', data[i].substring(2));
        }
        else
        {
          // Handle unformatted
          result += this.doRow(type, data[i]);
        }
      }
    }
    else
    {
      // Handle not array
      result += this.doRow(type, data);
    }
    return result;
  }

  this.buildIcon = function(type, label, altClass)
  {
    if (label == undefined) { label = type; }
    let labelElem = label != null ? `title="${label}" ` : ``;
    let iconClass = altClass == undefined ? 'article-icon' : altClass;
    return `<i ${labelElem}class="${this.getIcon(type)} textIcon ${iconClass}"></i>`;
  }

  this.getIcon = function(type)
  {
    let icon = '';
    switch (type) 
    {
        case 'article': icon = 'far fa-newspaper'; break;
        case 'podcast': icon = 'fas fa-podcast'; break;
        case 'video': icon = 'fas fa-tv'; break;
        case 'list': icon = 'fas fa-file-alt'; break;
        case 'book': icon = 'fas fa-book-open'; break;
        case 'game': icon = 'fas fa-gamepad'; break;
        case 'service': icon = 'fas fa-server'; break;
        case 'lecture': icon = 'fas fa-chalkboard-teacher'; break;
        case 'quote': icon = 'fas fa-comment'; break;
        case 'tool': icon = 'fas fa-wrench'; break;
        case 'music': icon = 'fas fa-music'; break;
        case 'image': icon = 'fas fa-image'; break;
        case 'encyclopedia': icon = 'fas fa-globe'; break;
        case 'term': icon = 'fas fa-ribbon'; break;
        case 'note': icon = 'fas fa-sticky-note'; break;
        case 'date': icon = 'fas fa-clock'; break;
        case 'author': icon = 'fas fa-user'; break;
        case 'tags': icon = 'fas fa-tag'; break;
        case 'project': icon = 'fas fa-leaf'; break;
        case 'progress': icon = 'fas fa-clock'; break;
        case 'file': icon = 'fas fa-folder-open'; break;
        case 'dash': icon = 'fas fa-caret-right'; break;
        case 'link': icon = 'fas fa-link'; break;
      }
    return icon;
  }

  // HELPER
  this.isDefined = function(value)
  {
    return (typeof value !== 'undefined');
  }

  this.isObject = function(value)
  {
    return (typeof value == 'object');
  }

  this.isImage = function(filename)
  {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename);
  }

  this.isType = function(typeArray, value)
  {
    if (this.isDefined(typeArray))
    {
      for (var i = 0; i < typeArray.length; i++)
      {
        if (typeArray[i] == value)
        {
          return true;
        }
      }
    }
    return false;
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

    // extracting the root domain here
    // if there is a subdomain 
    if (arrLen > 2) 
    {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2)
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