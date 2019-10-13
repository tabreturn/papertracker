# webscript-papertracker

Gamified music &amp; tech teaching tool

An educational platform for engaging 14–140 year-olds with music, technology, and game design. The focus is on providing entertaining challenges inexpensively, that promote creative problem solving, collaborative work, and programming using visual apparatus.

[demo](https://papertracker.cmp.ac.nz/)

---

## step 1: place tiles

<img src="presentation/assets/step_1.gif" width="500" />

## step 2: take photo

<img src="presentation/assets/step_2.gif" width="500" />

## step 3: simulation

<img src="presentation/assets/step_3.gif" width="500" />

---

## run

* create virtual environment: `python -m venv env`
* activate virtual environment: `source env/bin/activate`
* install flask packages: `pip install flask`
* set environment variables: `export FLASK_APP=run.py`
* for debug mode: `export FLASK_DEBUG=1`
* run the server: `flask run`
* open website in browser: `http://localhost:5000`

## features:

- [x] theme
- [x] opencv detect from 2 images
- [x] opencv detect tile grid coordinates
- [ ] flask to tile coordinates
- [ ] place tiles (after above point)
- [ ] working 'step' buttons (app proceeds though each step)
- [ ] mobile interface testing & enhancements
- [ ] add tile collision rule(s)
- [ ] json load for demo (so that phone updates the 'server' preview)
- [ ] step button should stop running simulation
- [ ] step (and step backward?) key input
- [ ] server-side grid and tile detection?
- [ ] splash/instruction screen?

## bugs:

- [x] photo preview wider, i.e. for tablet (viewport units?)
- [x] background/ansi text to have 'upward fade' (in addition to 'melt')
- [ ] convert to single page app
 - [ ] camera and fullscreen should be prompted on splash/instructions page
 - [ ] re-snap button must not reload the page
- [x] style focus outline (orange 2px?)
- [ ] background disappears on full-screen
- [ ] tone stutter (after multiple plays)
