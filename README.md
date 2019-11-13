# PaperTracker

*Gamified music &amp; tech teaching tool*

An educational platform for engaging 14–140 year-olds with music, technology, and game design. The focus is on providing entertaining challenges inexpensively, that promote creative problem solving, collaborative work, and programming using visual apparatus.

[live demo](https://papertracker.cmp.ac.nz/)

<a href="https://github.com/tabreturn/webscript-papertracker/raw/master/printables/tiles%2Bboard.pdf" download='tiles+board.pdf'>
  printable board & tiles download
</a>

---

# how it works

## step 1: place tiles

<img src="presentation/assets/step_1.gif" width="400" />

## step 2: take photo

<img src="presentation/assets/step_2.gif" width="400" />

## step 3: simulation

<img src="presentation/assets/step_3.gif" width="400" />

---

# screenshots

<img src="presentation/assets/screenshot_1.png" width="400" />

<img src="presentation/assets/screenshot_2.png" width="400" />

<img src="presentation/assets/screenshot_3.png" width="400" />



---

## run

1. cd to *webserver* directory
2. copy/rename the *config_sample.py* file to *config.py*
3. create virtual environment: `python -m venv env`
4. activate virtual environment: `source env/bin/activate`
5. install packages: `pip install -r requirements.txt`
6. set environment variables: `export FLASK_APP=run.py`
7. for flask debug mode: `export FLASK_DEBUG=1`
8. run the server: `flask run`
9. open website in browser: `http://localhost:5000`

On subsequent runs, leave out steps 2, 3, 5.

## features

**alpha**
- [x] opencv detect tile grid coordinates
- [x] flask to return tile coordinates
- [x] place tiles (after above step)
- [x] re-snap option if invalid json data
- [x] run mp3 samples on tone.js player
- [x] preload tone.js samples
- [x] universal config (for js, python, etc. from a single file)
- [x] generate session id using python?
- [x] monitor interface (to observe what the user sees on their phone on another screen)
- [x] add matomo config to config.py
- [x] add pulse collision rule(s)
- [x] run button to become reset/rerun button once clicked
- [ ] test <input ...capture=camera" />
- [ ] collision symbol/indication?
- [ ] different sound per colour (i.e. red pulse plays a different hihat than a green pulse)
- [ ] random tile that gives an event a 50% chance of occurring (must be used with another half-tile)

**beta**
- [ ] cache audio (service worker?)
- [ ] markerless grid (and tile) detection?
- [ ] orientable (horizontal/vertical) tiles?

## bugs

- [x] pulses moving north survive collisions
- [ ] match the board colour with the print?
- [ ] disregard tiles outside of the grid
- [ ] (TEST) simultaneous sessions (server prefixes images names?)
- [ ] use rear camera on tablets

---

Created by Andre Mūrnieks, Jon He, Radek Rudnicki, Tristan Bunn.
