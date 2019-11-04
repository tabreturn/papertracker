/**
 * JSON configuration file for half-tiles.
 * Instruments must be named beginning with an A_
 * The arrow symbol is always 49 (as in DetectTiles.py).
 */

export default
// python config (DetectTiles.py) reads from line 9 -- do not move!
{
  "arrows": {
    "N": "<img src='./static/samples/N.svg' />",
    "S": "<img src='./static/samples/S.svg' />",
    "W": "<img src='./static/samples/W.svg' />",
    "E": "<img src='./static/samples/E.svg' />"
  },

  "colors": {
    "yellow":  [25, "#FFFF00"],
    "magenta": [26, "#FF00FF"],
    "red":     [27, "#FF0000"],
    "green":   [28, "#00FF00"]
  },

  "instruments": {
    "A_hat":   [20, "<img src='./static/samples/hihat.svg' />",  ["sample", "./static/samples/hihat.mp3"] ],
    "A_kick1": [21, "<img src='./static/samples/kick1.svg' />",  ["sample", "./static/samples/kick1.mp3"] ],
    "A_kick2": [22, "<img src='./static/samples/kick2.svg' />",  ["sample", "./static/samples/kick2.mp3"] ],
    "A_stab1": [23, "<img src='./static/samples/synth.svg' />",  ["synth", {
        "oscillator" : {"type":"amtriangle", "harmonicity":0.5, "modulationType":"sine"},
        "envelope"   : {"attackCurve":"exponential", "attack":0.05, "decay":0.2, "sustain":0.2, "release":1.5},
        "portamento" : 0.05	},
      "A3", "8n"] ],
    "A_stab2": [24, "<img src='./static/samples/synth.svg' />",  ["synth", {}, "A6", "8n"] ]
  }
}
