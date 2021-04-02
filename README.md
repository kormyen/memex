[**Live web version here**](https://kormyen.github.io/memex/)

**Memex** is a [personal knowledge base](https://scholar.colorado.edu/csci_techreports/931/).

A bookmarks and notes tool to help with storage and overview.

Read-only and 'sever-less' for easy sharing.

<img src='https://raw.githubusercontent.com/kormyen/memex/master/PREVIEW.jpg'/>

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
- themes

To change theme simply drag a [theme svg file](https://github.com/hundredrabbits/Themes/tree/master/themes) onto the Memex webpage

More information on themes can be found [here](https://github.com/hundredrabbits/Themes)

### Examples

- [Kormyen's Memex](https://kormyen.github.io/memex/) - this repo
- [Shinestrength's Portfolio](http://www.shinestrength.xyz/) - [repo](https://github.com/shinestrength/memex)
- Dotcli's Memex - [repo](https://github.com/dotcli/memex)

### Dev
```
git clone git@github.com:kormyen/memex.git
```

Then open `memex/index.html` in any web browser

### Data

[memex/content/data.ndtl](content/data.ndtl)

Stored in a human-readable, flat-file database called [Indental](https://wiki.xxiivv.com/#indental) which is made by Devine Lu Linvega

### Settings

[memex/content/settings.js](content/settings.js)

| Setting  | Description |
|            ---: | :---                                                                                                |
|    STATSNUMTAGS | max limit of tags to show in menu                                                                   |
|    STATSNUMTYPE | max limit of types to show in menu                                                                  |
|     LOADANIMNUM | threshold number of articles in query/displayed to trigger loading animation to display             |
|     WIDEARTICLE | allow wide entries (`WIDE : true`)                                                                  |
| AUTOWIDETRIGGER | automatically wide entry if it has more QOTE entries than this number                               |
|      USEMASONRY | enable [masonry](https://masonry.desandro.com/) layout library usage                                |
| MASONRYPROGRESS | masonry re-layout as images load (true), or only once all images complete (false)                   |
|   ARTICLEIDBASE | CSS name prefix                                                                                     |
|       SHOWUPPER | toggle display of upper entry element(s)                                                            |
|       SHOWTITLE | toggle display of entry title                                                                       |
|        SHOWAUTH | toggle display of entry author(s)                                                                   |
|        SHOWTYPE | toggle display of entry type(s)                                                                     |
|        SHOWLINK | toggle display of entry link(s)                                                                     |
|       SHOWLOWER | toggle display of lower entry element(s)                                                            |
|        SHOWTAGS | toggle display of entry tag(s)                                                                      |
|        SHOWPROJ | toggle display of entry project(s)                                                                  |
|        SHOWNOTE | toggle display of entry notes                                                                       |
|        SHOWQOTE | toggle display of entry quote(s)                                                                    |
|        SHOWTERM | toggle display of entry term(s)                                                                     |
|        SHOWDONE | toggle display of menu done (tick/cross)                                                            |
|        SHOWPROG | toggle display of entry progress notes                                                              |
|        SHOWIMAG | toggle display of entry image                                                                       |
|        SHOWFILE | toggle display of entry file(s)                                                                     |
|     SHOWOVERLAY | toggle display of dark overlay shown when hovering image type entries to improve text readability   |

### Dependencies

- Database parser: [Indental](https://wiki.xxiivv.com/#indental)
- Theming: [Themes](https://github.com/hundredrabbits/Themes)
- Grid layout: [Masonry](https://masonry.desandro.com/)
- Icons: [Font Awesome](https://fontawesome.com/)

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