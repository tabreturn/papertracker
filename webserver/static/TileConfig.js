/**
 * JSON configuration file for half-tiles.
 * Instruments must be named beginning with an A_
 * The arrow symbol is always 49 (as in DetectTiles.py).
 */

export default
// python config (DetectTiles.py) reads from line 9 -- do not move!
{
  "arrows": {
    "N": "<img src='./static/theme/arrow-n.svg' />",
    "S": "<img src='./static/theme/arrow-s.svg' />",
    "W": "<img src='./static/theme/arrow-w.svg' />",
    "E": "<img src='./static/theme/arrow-e.svg' />"
  },

  "colors": {
    "yellow":  [25, "#FFFF00"],
    "magenta": [26, "#FF00FF"],
    "red":     [27, "#FF0000"],
    "green":   [28, "#00FF00"]
  },

  "instruments": {
    "A_hat":   [20, "<img src='./static/samples/hihat.svg' />",  ["sample", "./static/samples/hihat2.mp3"] ],
    "A_kick1": [21, "<img src='./static/samples/kick1.svg' />",  ["sample", "./static/samples/kick1.mp3"] ],
    "A_kick2": [22, "<img src='./static/samples/kick2.svg' />",  ["sample", "./static/samples/snare3.mp3"] ],
    "A_keys":  [23, "<img src='./static/samples/keys.svg' />",   ["sample", "./static/samples/keys.mp3"] ],
    "A_stab1": [30, "<img src='./static/samples/keys.svg' />",   ["synth", {
        "oscillator" : {"type":"amtriangle", "harmonicity":0.5, "modulationType":"sine"},
        "envelope"   : {"attackCurve":"exponential", "attack":0.05, "decay":0.2, "sustain":0.2, "release":1.5},
        "portamento" : 0.05	},
      "A3", "8n"] ],
    "A_stab2": [31, "<img src='./static/samples/keys.svg' />",   ["synth", {}, "A6", "8n"] ]
  }
}
