function Lightbox()
{
  this.container = null;
  this.img = null;

  this.install = function(container, prefix)
  {
    this.container = container;
    
    let back = document.createElement('div');
    back.className = prefix + '-back';
    this.addEvent(back, 'click', function(){ lightbox.close(); });
    this.container.appendChild(back);

    this.img = document.createElement('img');
    this.img.className = prefix + '-img';
    this.addEvent(this.img, 'click', function(){ lightbox.close(); });
    this.container.appendChild(this.img);
  }

  this.load = function(file)
  {
    this.img.src = file;
  	this.container.style.display = 'block';
  }

  this.close = function()
  {
  	if (this.container.style.display != 'none')
  	{
  		this.container.style.display = 'none';
  	}
  }

  this.handle = function(element, file)
  {
    this.addEvent(element, 'click', function(){ lightbox.load(file); });
  }

  this.addEvent = function(element, evnt, funct)
  {
    if (element.attachEvent)
    {
      return element.attachEvent('on'+evnt, funct);
    }
    else
    {
      return element.addEventListener(evnt, funct, false);
    }
  }
}