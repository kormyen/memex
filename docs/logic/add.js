function Add()
{
  this.overlay = null;
  this.display = null;
  this.grid = null;

  this.elementList = [];
  this.keys = null;
  var parent = this;

  // STATE
  this.enabledOverlay = false;
  this.addedTitle = false
  this.addedDate = false
  this.addedPerson = false
  this.addedSource = false
  this.addedProject = false
  this.addedType = false
  this.addedLink = false
  this.addedTags = false
  this.addedNote = false
  this.addedQuote = false
  this.addedTerms = false
  this.addedProgress = false

  this.install = function()
  {
    this.grid = document.getElementById("grid");
    this.overlay = document.getElementById("overlay");
      
    this.setupElement('Title', 'TITLE');
    this.setupElement('Date', 'DATE');
    this.setupElement('Type', 'TYPE');

    this.setupElement('Link', 'LINK');
    this.setupElement('Person', 'PERS');
    this.setupElement('Source', 'SRCE');
    this.setupElement('Project', 'PROJ');
    this.setupElement('Tags', 'TAGS');
    this.setupElement('Progress', 'PROG');
    this.setupElement('Note', 'NOTE'); // long
    this.setupElement('Quote', 'QOTE'); // long
    this.setupElement('Terms', 'TERM'); // long
    // DONE
    // REVI
    this.keys = Object.keys(this.elementList);

    // SETUP
    this.overlay.innerHTML = '';
    let content = `<div class="content">`

    // ESCAPE
    content += `<div class="content-menu">`;
    content += `<a href="javascript:void(0);" id="escape">`;
    content += `<div class="content-menu-option">`;
    content += `<b>Esc</b>`;
    content += `</div>`;
    content += `</a>`;
    content += `</div>`;

    // FORM
    content += `<form>`;
    for (var i = 0; i < this.keys.length; i++)
    {
      content += `<div class="row">
                    <div class="key" id="key${this.elementList[this.keys[i]].key}">${this.elementList[this.keys[i]].desc}</div>
                    <input placeholder="${this.elementList[this.keys[i]].key}" id="${this.elementList[this.keys[i]].key}">
                  </div>`;
    }
    content += `</form>`;

    // DISPLAY
    content += `<div class="display" id="display">`;
    content += `</div>`;

    content += `</div>`;
    this.overlay.innerHTML += content;

    this.display = document.getElementById("display");

    for (var i = 0; i < this.keys.length; i++)
    {
      this.elementList[this.keys[i]].elem = document.getElementById(this.elementList[this.keys[i]].key);
      this.elementList[this.keys[i]].elem.oninput = this.onElemChanged;
      this.elementList[this.keys[i]].elem.onfocus = this.onElemFocus;
      this.elementList[this.keys[i]].elem.onblur = this.onElemBlur;
      this.elementList[this.keys[i]].elemKey = document.getElementById("key" + this.elementList[this.keys[i]].key);
    }
  }

  this.setupElement = function(key, desc)
  {
    this.elementList[key] = { key: key, desc: desc, added: false};
  }

  this.onElemChanged = function(e)
  {
  }

  this.onElemFocus = function(e)
  {
    for (var i = 0; i < parent.keys.length; i++)
    {
      if (e.target.id == parent.elementList[parent.keys[i]].key)
      {
        if (!parent.elementList[parent.keys[i]].added)
        {
          parent.elementList[parent.keys[i]].added = true;
          parent.elementList[parent.keys[i]].elemKey.style.visibility = "visible";
        }
        break;
      }
    }
  }

  this.onElemBlur = function(e)
  {
    for (var i = 0; i < parent.keys.length; i++)
    {
      if (e.target.id == parent.elementList[parent.keys[i]].key)
      {
        if (parent.elementList[parent.keys[i]].elem.value == '' && parent.elementList[parent.keys[i]].added)
        {
          parent.elementList[parent.keys[i]].added = false;
          parent.elementList[parent.keys[i]].elemKey.style.visibility = "hidden";
        }
        break;
      }
    }
  }

  this.show = function()
  {
    this.setOverlay(true);

    var date = new Date();
    var dateString = "1" + date.getFullYear()
                    + "-" + ("0"+(date.getMonth()+1)).slice(-2) 
                    + "-" + ("0" + date.getDate()).slice(-2);
    this.elementList['Date'].elem.value = dateString;
    this.elementList['Date'].added = true;
    this.elementList['Date'].elemKey.style.visibility = "visible";

    setTimeout(function()
    { 
      parent.elementList['Title'].elem.focus();
    }, 100);
  }

  this.setOverlay = function(value)
  {
    if (value && !this.enabledOverlay)
    {
      overlay.style.opacity = '1';
      overlay.style.zIndex  = '1000';
      this.enabledOverlay = true;
      setTimeout(function()
      {
        this.grid.innerHTML = '';
        this.grid.style.height = 0;
      }, 200);
    }
    else if (!value && this.enabledOverlay)
    {
      overlay.style.opacity = '0';
      setTimeout(function()
      {
        overlay.style.zIndex  = '-100';
      }, 200);
      this.enabledOverlay = false;
    }
  }
}

document.onkeydown = function(evt) 
{
  evt = evt || window.event;
  if (!evt.ctrlKey)
  {
    var isEscape = false;
    var isA = false;
    
    if ("key" in evt)
    {
      isEscape = (evt.key == "Escape" || evt.key == "Esc");
    }
    else
    {
      isEscape = (evt.keyCode == 27);
    }
    isA = (evt.keyCode == 65);
    
    if (isEscape)
    {
      if (main.queryCur == 'add')
      {
        main.load(main.queryPrev);
      }
    }
    else if (isA && main.queryCur != 'add')
    {
      main.load('add');
    }
  }
};