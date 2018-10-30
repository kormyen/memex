function Lightbox()
{
  this.container = null;
  this.item = null;

  this.install = function()
  {
    this.container = document.getElementById("lightbox");
    this.container.innerHTML += `<div class="lightbox-back" onclick="main.lightbox.close()"></div>`;
    this.container.innerHTML += `<div id="lightbox-item" class="lightbox-item"></div>`;
    this.item = document.getElementById("lightbox-item");
  }

  this.load = function(file)
  {
  	this.item.innerHTML = `<img class="lightbox-img" src="${file}" onclick="main.lightbox.close()">`;
  	this.container.style.display = 'block';
  }

  this.close = function()
  {
  	if (this.container.style.display != 'none')
  	{
  		this.container.style.display = 'none';
  	}
  }
}