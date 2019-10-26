# PaperTracker

*Gamified music &amp; tech teaching tool*

An educational platform for engaging 14–140 year-olds with music, technology, and game design. The focus is on providing entertaining challenges inexpensively, that promote creative problem solving, collaborative work, and programming using visual apparatus.

[live demo](https://papertracker.cmp.ac.nz/)

---

## step 1: place tiles

<img src="presentation/assets/step_1.gif" width="400" />

## step 2: take photo

<img src="presentation/assets/step_2.gif" width="400" />

## step 3: simulation

<img src="presentation/assets/step_3.gif" width="400" />

---

## run

1. cd to *webserver* directory
2. create virtual environment: `python -m venv env`
3. activate virtual environment: `source env/bin/activate`
4. install packages: `pip install -r requirements.txt`
5. set environment variables: `export FLASK_APP=run.py`
6. for flask debug mode: `export FLASK_DEBUG=1`
7. run the server: `flask run`
8. open website in browser: `http://localhost:5000`

## features

**alpha**
- [x] opencv detect tile grid coordinates
- [x] flask to return tile coordinates
- [x] place tiles (after above step)
- [x] re-snap option if invalid json data
- [x] run mp3 samples on tone.js player
- [x] preload tone.js samples
- [x] universal config (for js, python, etc. from a single file)
- [ ] monitor interface (to observe what the user sees on their phone on another screen)
- [ ] add pulse collision rule(s)
- [ ] preloader to wait for photo processing and samples preload before revealing board

**beta**
- [ ] cache audio (service worker?)
- [ ] server-side markerless grid (and tile) detection?
- [ ] orientable (horizontal/vertical) tiles?

## bugs

- [ ] (TEST) simultaneous sessions (server prefixes images names?)

---

Created by Andre Mūrnieks, Jon He, Radek Rudnicki, Tristan Bunn.
