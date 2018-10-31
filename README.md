[**Live web version here**](https://kormyen.github.io/memex/)

**Memex** is a [personal knowledge base](https://scholar.colorado.edu/csci_techreports/931/).

A bookmarks and notes application to help with storage and overview.

<img src='https://raw.githubusercontent.com/kormyen/memex/master/PREVIEW.jpg'/>

Memex has two modes:

1. **website** that is read-only and 'sever-less' for easy sharing
2. **standalone** application for bookmark and note cataloging

Memex supports:

- filtering
- tags
- images
- notes
- quotes
- terms
- links
- author
- files
- projects
- [themes](https://github.com/hundredrabbits/Themes)

To change theme simply drag a theme svg file onto the Memex app/webpage. 

Theme files and more information can be found [here](https://github.com/hundredrabbits/Themes).

### Live Examples

- [Kormyen's Memex](https://kormyen.github.io/memex/) (this repo)
- [Shinestrength's Portfolio](http://www.shinestrength.xyz/) [(repo)](https://github.com/shinestrength/memex)
- Dotcli's Memex [(repo)](https://github.com/dotcli/memex)

### Data

[docs/content/data.ndtl](docs/content/data.ndtl)

Stored in a human-readable, flat-file database called [Indental](https://wiki.xxiivv.com/#indental) which is made by Devine Lu Linvega

### Settings

[docs/content/settings.js](docs/content/settings.js)

- STATSNUMTAGS = max limit of tags to show in menu
- STATSNUMTYPE = max limit of types to show in menu
- WIDEGRIDITEM = allow wide entries (manually set by `WIDE : true` or automatic long `NOTES`)
- AUTOWIDETRIGGER = automaticly wide entry if it has more QOTE entries this number
- USEMASONRY = enable [Masonry](https://masonry.desandro.com/) layout library usage
- MASONRYPROGRESS = Masonry re-layout as images load (true), or only once all images complete (false)
- GRIDITEMIDBASE = CSS name prefix
- SHOWUPPER = toggle display of upper entry elements
- SHOWTITLE = toggle display of entry title
- SHOWAUTH = toggle display of entry author
- SHOWTYPE = toggle display of entry type
- SHOWLINK = toggle display of entry link
- SHOWLOWER = toggle display of lower entry elements
- SHOWTAGS = toggle display of entry tags
- SHOWPROJ = toggle display of entry project
- SHOWNOTE = toggle display of entry notes
- SHOWQOTE = toggle display of entry quotes
- SHOWTERM = toggle display of entry terms
- SHOWDONE = toggle display of menu done (tick/cross)
- SHOWPROG = toggle display of entry progress notes
- SHOWIMAG = toggle display of entry image
- SHOWFILE = toggle display of entry file
- SHOWOVERLAY = toggle display of dark overlay on hover of image type entry

### Web Development
```
git clone git@github.com:kormyen/memex.git
cd memex
open Memex\docs\index.html in browser
```

The web content is isolated in a folder to seperate it from app/Electron content. 

The folder is called 'docs' so that the 'Github Pages' feature can host it, another folder name doesn't seem supported.

### App Development
```
git clone git@github.com:kormyen/memex.git
cd memex
npm install
npm start
```

### Dependencies

- App builder: [Electron](https://electronjs.org/)
- Database parser: [Indental](https://wiki.xxiivv.com/#indental)
- Template parser: [Runic](https://wiki.xxiivv.com/#runic)
- Grid layout: [Masonry](https://masonry.desandro.com/)
- Theming: [Themes](https://github.com/hundredrabbits/Themes)

### Thanks

- Devine Lu Linvega ([Oscean](https://github.com/XXIIVV/Oscean))
- Rekka Bell ([kokorobot](https://github.com/rekkabell/kokorobot))
- Hundred Rabbits ([Ecosystem](https://github.com/hundredrabbits))
- Josh Avanier ([Log](https://github.com/joshavanier/log))
- Alexey Botkov ([Legacy](https://github.com/nomand/Legacy))
- Seena Burns ([Isolate](https://github.com/seenaburns/isolate))

---

Hamish MacDonald

**[Twitter](https://twitter.com/kormyen)** &middot; **[Home](https://kor.nz)**