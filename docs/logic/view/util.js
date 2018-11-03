function Util()
{
  this.buildIcon = function(type, label, altClass)
  {
    if (label == undefined) { label = type; }
    let labelElem = label != null ? `title="${label}" ` : ``;
    let iconClass = altClass == undefined ? 'article-icon' : altClass;
    return `<i ${labelElem}class="${main.util.getIcon(type)} textIcon ${iconClass}"></i>`;
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
        case 'true': icon = 'fas fa-check'; break;
        case 'false': icon = 'fas fa-times'; break;
      }
    return icon;
  }

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