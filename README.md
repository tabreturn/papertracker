# webscript-papertracker

Gamified music &amp; tech teaching tool

An educational platform for engaging 14–140 year-olds with music, technology, and game design. The focus is on providing entertaining challenges inexpensively, that promote creative problem solving, collaborative work, and programming using visual apparatus.

## Step 1: Place Tiles

<img src="step_1.gif" width="400" />

## Step 2: Take Photo

![](step_2.gif)

## Step 3: Simulation

![](step_3.gif)

---

## run

* create virtual environment: `python -m venv env`
* activate virtual environment: `source env/bin/activate`
* install flask packages: `pip install flask`
* set environment variables: `export FLASK_APP=run.py`
* for debug mode: `export FLASK_DEBUG=1`
* run the server: `flask run`
* open website in browser: `http://localhost:5000`

## to-do:

* ~~animated presentation~~
* client-side board simulation
  * ~~rewrite piece rules~~
  * ~~remove pulse if it passes the border~~
  * ~~add sounds ([tonejs integration?](https://tonejs.github.io/))~~
  * ~~wingding / font-awesome / sprite solution~~
  * ~~add column & row numbers?~~
  * add tile collision rule(s)
  * responsive?
  * step (and step backward?) key input
  * ~~preload audio samples~~
  * fix tone stutter (after multiple plays)
  * ...
* ~~scaffold flask~~
* client-photo submission
* server-side grid and tile detection
* ...
