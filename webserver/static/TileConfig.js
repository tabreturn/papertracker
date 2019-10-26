/**
 * JSON configuration file for half-tiles.
 * Instruments must be named beginning with an A_
 * The arrow symbol is always 49 (as in DetectTiles.py).
 */

export default
// python config (DetectTiles.py) reads from line 9 -- do not move!
{
  "arrows": {
    "N": "↑",
    "S": "↓",
    "W": "←",
    "E": "→"
  },

  "colors": {
    "yellow":  [25, "#FFFF00"],
    "magenta": [26, "#FF00FF"],
    "red":     [27, "#FF0000"],
    "green":   [28, "#00FF00"]
  },

  "instruments": {
    "A_hat": [20, "ѻ", ["sample", "./static/samples/hihat.mp3"] ],
    "A_kick1": [21, "Ô", ["sample", "./static/samples/kick1.mp3"] ],
    "A_kick2": [22, "Ö", ["sample", "./static/samples/kick2.mp3"] ],
    "A_stab1": [23, "🎹",["synth", {
        "oscillator" : {"type":"amtriangle", "harmonicity":0.5, "modulationType":"sine"},
        "envelope"   : {"attackCurve":"exponential", "attack":0.05, "decay":0.2, "sustain":0.2, "release":1.5},
        "portamento" : 0.05	},
      "A3", "8n"] ],
    "A_stab2": [24, "🎹", ["synth", {}, "A6", "8n"] ]
  }
}
