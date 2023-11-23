class BarsSoundControl {
  constructor(Tone) {
    this.Tone = Tone;
    this.strings = ["C3", "F3", "G3", "A3"];
    this.octave = "3";
    
    this.chordArray = [
      ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5", "C6"],
      ["F3", "A3", "C4", "F4", "A4", "C5", "F5", "A5", "C6", "F6"],
      ["G3", "B3", "D4", "G4", "B4", "D5", "G5", "B5", "D6", "G6"],
      ["A3", "C4", "E4", "A4", "C5", "E5", "A5", "C6", "E6", "A6"]
    ];

    // prettier-ignore
    this.allTheNotes =  [
     "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
     "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
     "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
     "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
     "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
     "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8"];

    this.chords = {
      major: [0, 4, 7, 12, 16, 19, 24, 28, 31, 36],
      minor: [0, 3, 7, 12, 15, 19, 24, 27, 31, 36],
      dom7: [0, 4, 7, 10, 12, 16, 19, 22, 24, 28],
      maj7: [0, 4, 7, 11, 12, 16, 19, 23, 24, 28],
      min7: [0, 3, 7, 10, 12, 15, 19, 22, 24, 27]
    };

    this.chordType = "major";

    this.noteOffset = [7, 5, 0, 0];
  }

  chooseRoot(chordPosition, rootNote) {

    console.log(`chooseRoot ${chordPosition} ${rootNote}`)
    // this.chords[this.chordType[chordPosition]];

    // // prettier-ignore
    // const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    // for (let whichNote = 0; whichNote < notes.length; whichNote++) {
    //   if (notes[whichNote] === rootNote)
    //     this.noteOffset[chordPosition] = whichNote;
    // }

    // this.setChord(chordPosition);

    this.strings[chordPosition] = rootNote + this.octave;
  }

  chooseChord(chordPosition, chordType) {
    this.chordType = chordType;
    console.log(`this is the end of the chord button ${chordType}`)
    this.setChord(chordPosition); ///// this is where the chord button ends up
  }

  setChord(chordPosition) {
    for (let note = 0; note < this.strings.length; note++) {
      // this.chordArray[chordPosition][note] = // need to sort this for chords to strings i think
      //   this.allTheNotes[
      //     this.chords[this.chordType][note] +
      //       this.noteOffset[chordPosition]
      //   ];
    }
  }

  startAudio() {
    this.Tone.start();
    console.log("Audio Started");
  }

  setUpSampler(callback) {
    this.sampler = new this.Tone.Sampler({
      urls: {
        B2: "42242__timkahn__c_s-cello-b3.flac",
        B4: "42244__timkahn__c_s-cello-b5.flac"
      },
      baseUrl: "/sounds/",
      onload: () => {
        callback();
      },
      onerror: (e) => {
        console.log(e);
        document.querySelector("#startbutton").innerHTML =
          "Error loading samples, try again";
      }
    });

    this.reverb = new this.Tone.Reverb({
      decay: 3,
      predelay: 0,
      wet: 0.5
    }).toDestination();

    this.sampler.connect(this.reverb);

    this.sampler.set({
      release: 8,
      volume: -6
    });
  }

  setUpSynth() {
    const envFreq = 4000;
    const cutoffFreq = 1;
    const ampEnv = {
      a : 1,
      d : 1,
      s : 0.6,
      r : 2
    }
    const filterEnv = {
      a : 1,
      d : 1,
      s : 0.6,
      r : 5
    }
    this.chorus = new this.Tone.Chorus(4, 1, 0.1).start().connect(this. reverb);
    this.synth = new this.Tone.PolySynth(
      { voice:  this.Tone.DuoSynth, // try duosynth to mix square and triangle - also look at looping on the sampler again
        maxPolyphony: 8,
        options: {  "vibratoAmount" : 0.2 ,
                    "vibratoRate" : 2 ,
                    "harmonicity" : 2.02 ,
                    "voice0" : {
                      "volume" : -22 ,
                      "portamento" : 0 ,
                      "oscillator" : {
                        "type" : "square"
                      },
                      "filter": {
                        "Q": 0,
                        "rolloff": -12,
                        "type": "lowpass",
                        "frequency": cutoffFreq
                      },
                      "filterEnvelope" : {
                        "attack" : filterEnv.a ,
                        "decay" : filterEnv.d ,
                        "sustain" : filterEnv.s ,
                        "release" : filterEnv.r,
                        "octaves" : -0.2,
                        "baseFrequency" : envFreq
                      }
                      ,
                      "envelope" : {
                        "attack" : ampEnv.a ,
                        "decay" : ampEnv.d ,
                        "sustain" : ampEnv.s ,
                        "release" : ampEnv.r
                      }
                    }
                    ,
                    "voice1" : {
                      "volume" : -28 ,
                      "portamento" : 0 ,
                      "oscillator" : {
                        "type" : "sawtooth"
                      },
                      "filter": {
                          "Q": 0,
                          "rolloff": -12,
                          "type": "lowpass",
                          "frequency": cutoffFreq
                      },
                      "filterEnvelope" : {
                        "attack" : filterEnv.a ,
                        "decay" : filterEnv.d ,
                        "sustain" : filterEnv.s ,
                        "release" : filterEnv.r,
                        "octaves" : -0.2,
                        "baseFrequency" : envFreq
                      }
                      ,
                      "envelope" : {
                        "attack" : ampEnv.a ,
                        "decay" : ampEnv.d,
                        "sustain" : ampEnv.s,
                        "release" : ampEnv.r                     
                      }
                    } 
                  }
      }).connect(this.chorus);
  }

  pluckNote(whichString) {
    this.sampler.triggerAttack(
      this.strings[whichString],
      this.Tone.now()
    );
  }

  bowNote(whichString) {
    this.synth.triggerAttack(
      this.strings[whichString.string],
      this.Tone.now()
    );
  }

  stopNote(string) {
    console.log("synth stopped");
    this.synth.triggerRelease(
      this.strings[string],
      this.Tone.now()
    )
  }
}

module.exports = BarsSoundControl;
