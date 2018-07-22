# Memex

Memex is a simple open-source bookmarks and notes application to help with storage and overview

[Live web version here](https://kormyen.github.io/memex/)

<img src='https://raw.githubusercontent.com/kormyen/memex/master/PREVIEW.jpg' width="600"/>

Memex has two modes:

- standalone application for bookmark and note cataloging
- read-only static 'sever-less' website for sharing with sorting and filtering

Memex supports:

- links
- images
- notes
- quotes
- terms
- tags
- filting

## Data

Data is stored in a human-readable, flat-file database format called [Indental](https://wiki.xxiivv.com/#indental) which is made by Devine Lu Linvega

- [docs/content/data.ndtl](docs/content/data.ndtl)

## Dependencies

- App builder: [Electron](https://electronjs.org/)
- Database parser: [Indental](https://wiki.xxiivv.com/#indental)
- Template parser: [Runic](https://wiki.xxiivv.com/#runic)
- Grid layout: [Masonry](https://masonry.desandro.com/)