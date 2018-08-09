**Memex** is a bookmarks and notes application to help with storage and overview

[Live web version here](https://kormyen.github.io/memex/)

<img src='https://raw.githubusercontent.com/kormyen/memex/master/PREVIEW.jpg' width="600"/>

Memex has two modes:

1. **website** that is read-only and 'sever-less' for easy sharing
2. **standalone** application for bookmark and note cataloging

Memex supports:

- filtering
- links
- images
- notes
- quotes
- terms
- tags

#### Data

Stored in a human-readable, flat-file database called [Indental](https://wiki.xxiivv.com/#indental) which is made by Devine Lu Linvega

- [docs/content/data.ndtl](docs/content/data.ndtl)

#### Development
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

Thanks to Devine Lu Linvega ([Oscean](https://github.com/XXIIVV/Oscean)), Josh Avanier ([Log](https://github.com/joshavanier/log)), Rekka Bell ([kokorobot](https://github.com/rekkabell/kokorobot)), Alexey Botkov ([Legacy](https://github.com/nomand/Legacy)), Seena Burns ([Isolate](https://github.com/seenaburns/isolate))

---

Hamish MacDonald

**[Twitter](https://twitter.com/kormyen)** &middot; **[Home](https://kor.nz)**