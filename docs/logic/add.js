if (window.showAdd != undefined && window.showAdd)
{
  const { ipcRenderer } = nodeRequire('electron');

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
        
      this.setupElement('Title', 'TITLE', 'upper');
      this.setupElement('Date', 'DATE', 'lower');
      this.setupElement('Type', 'TYPE', 'lower');
      this.setupElement('Link', 'LINK', 'url');
      this.setupElement('Person', 'PERS', 'text');
      this.setupElement('Source', 'SRCE', 'title');
      this.setupElement('Project', 'PROJ', 'text');
      this.setupElement('Tags', 'TAGS', 'tags');
      this.setupElement('Progress', 'PROG', 'text');
      this.setupElement('Note', 'NOTE', 'text'); // long
      this.setupElement('Quote', 'QOTE', 'quote'); // long
      this.setupElement('Terms', 'TERM', 'quote'); // long
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

      // ENTER
      content += `<div class="content-enter">`;
      content += `<a href="javascript:void(0);" id="enter">`;
      content += `<div class="content-menu-option">`;
      content += `<b>Enter</b>`;
      content += `</div>`;
      content += `</a>`;
      content += `</div>`;
      
      content += `</div>`;

      this.overlay.innerHTML += content;

      document.getElementById("escape").onclick = function()
      {
        console.log('escape onclick');
        main.add.close();
      }

      this.display = document.getElementById("display");

      document.getElementById("enter").addEventListener('click', 
      () => 
      {
        console.log('called write');
        let content = this.display.innerHTML.replace(/\s?(<br\s?\/?>)\s?/g, "\r\n"); // replace line breaks
        content = content.replace(/&nbsp;/g, ' '); // replace tabs/spaces
        // var content = content.replace(/\u00a0/g, ' ');
        ipcRenderer.send('write', "\r\n" + "\r\n" + content);
        this.setOverlay(false);
        this.clearForm();
      });

      for (var i = 0; i < this.keys.length; i++)
      {
        this.elementList[this.keys[i]].elem = document.getElementById(this.elementList[this.keys[i]].key);
        this.elementList[this.keys[i]].elem.oninput = this.onElemChanged;
        this.elementList[this.keys[i]].elem.onfocus = this.onElemFocus;
        this.elementList[this.keys[i]].elem.onblur = this.onElemBlur;
        this.elementList[this.keys[i]].elemKey = document.getElementById("key" + this.elementList[this.keys[i]].key);
      }
      setTimeout(function()
      { 
        parent.setupData();
      }, 100);
    }

    this.clearForm = function()
    {
      for (var i = 0; i < this.keys.length; i++)
      {
        this.elementList[this.keys[i]].elem.value = '';
      }
    }

    this.setupElement = function(key, desc, type)
    {
      this.elementList[key] = { key: key, desc: desc, type: type, added: false};
    }

    this.onElemChanged = function(e)
    {
      // TODO: Autocomplete tags, type 
      parent.setupData();
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

    this.setupData = function()
    {
      let value = '';
      for (var i = 0; i < parent.keys.length; i++)
      {
        if (parent.elementList[parent.keys[i]].key == 'Title')
        {
          if (parent.elementList[parent.keys[i]].elem.value != '')
          {
            value += parent.elementList[parent.keys[i]].elem.value.toUpperCase();
          }
          else
          {
            value += 'TITLE';
          }
        }
        else if (parent.elementList[parent.keys[i]].elem.value != '')
        {
          value += '<br>';
          value += '&nbsp;&nbsp;';
          value += parent.elementList[parent.keys[i]].desc.toUpperCase() + ' : ';

          if (parent.elementList[parent.keys[i]].type == 'lower')
          {
            value += parent.elementList[parent.keys[i]].elem.value.toLowerCase();
          }
          else if (parent.elementList[parent.keys[i]].type == 'text')
          {
            value += parent.elementList[parent.keys[i]].elem.value;
          }
          else if (parent.elementList[parent.keys[i]].type == 'url')
          {
            // TODO: validate
            value += parent.elementList[parent.keys[i]].elem.value;
          }
          else if (parent.elementList[parent.keys[i]].type == 'tags')
          {
            // TODO: Format
            value += parent.elementList[parent.keys[i]].elem.value;
          }
          else if (parent.elementList[parent.keys[i]].type == 'quote')
          {
            // TODO: Format
            value += parent.elementList[parent.keys[i]].elem.value;
          }
          else if (parent.elementList[parent.keys[i]].type == 'title')
          {
            value += parent.elementList[parent.keys[i]].elem.value.toProperCase();
          }
          else if (parent.elementList[parent.keys[i]].type == 'upper')
          {
            value += parent.elementList[parent.keys[i]].elem.value.toLowerCase();
          }
        }
      }
      parent.display.innerHTML = value;
    }

    this.show = function()
    {
      console.log('add.show');

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

    this.close = function()
    {
      console.log('close. prev: ' + main.queryPrev);
      main.load(main.queryPrev);
      this.grid.style.display = "block";
      this.setOverlay(false);
    }

    this.setOverlay = function(value)
    {
      console.log('add.setOverlay ' + value);

      if (value && !this.enabledOverlay)
      {
        overlay.style.opacity = '1';
        overlay.style.zIndex  = '1000';
        this.enabledOverlay = true;
        // setTimeout(function()
        // {
        //   this.grid.innerHTML = '';
        //   this.grid.style.height = 0;
        // }, 200);
        this.grid.style.display = "none";
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

  String.prototype.toProperCase = function ()
  {
      return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  document.onkeydown = function(evt) 
  {
    console.log('onkeydown');
    console.log(evt);

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
          console.log('did it');
          this.close();
        }
      }
      else if (isA && main.queryCur != 'add')
      {
        main.load('add');
      }
    }
  };
}