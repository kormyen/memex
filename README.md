**Memex** is a [personal knowledge base](https://scholar.colorado.edu/csci_techreports/931/).

A bookmarks and notes application to help with storage and overview.

[Live web version here](https://kormyen.github.io/memex/)

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

#### Data

Stored in a human-readable, flat-file database called [Indental](https://wiki.xxiivv.com/#indental) which is made by Devine Lu Linvega

- [docs/content/data.ndtl](docs/content/data.ndtl)

#### Live Examples

- [Kormyen's Memex](https://kormyen.github.io/memex/) (this repo)
- [Shinestrength's Portfolio](http://www.shinestrength.xyz/) [(repo)](https://github.com/shinestrength/memex)
- Dotcli's Memex [(repo)](https://github.com/dotcli/memex)

#### Web Development
```
git clone git@github.com:kormyen/memex.git
cd memex
open Memex\docs\index.html in browser
```

The web content is isolated in a folder to seperate it from app/Electron content. 

The folder is called 'docs' so that the 'Github Pages' feature can host it, another folder name doesn't seem supported.

#### App Development
```
git clone git@github.com:kormyen/memex.git
cd memex
npm install
npm start
```

#### Dependencies

- App builder: [Electron](https://electronjs.org/)
- Database parser: [Indental](https://wiki.xxiivv.com/#indental)
- Template parser: [Runic](https://wiki.xxiivv.com/#runic)
- Grid layout: [Masonry](https://masonry.desandro.com/)
- Theming: [Themes](https://github.com/hundredrabbits/Themes)

#### Thanks

Thanks to Devine Lu Linvega ([Oscean](https://github.com/XXIIVV/Oscean)), Josh Avanier ([Log](https://github.com/joshavanier/log)), Rekka Bell ([kokorobot](https://github.com/rekkabell/kokorobot)), Alexey Botkov ([Legacy](https://github.com/nomand/Legacy)), Seena Burns ([Isolate](https://github.com/seenaburns/isolate)), Hundred Rabbits ([Ecosystem](https://github.com/hundredrabbits))

---

Hamish MacDonald

**[Twitter](https://twitter.com/kormyen)** &middot; **[Home](https://kor.nz)**