class BarsSoundControl {
  constructor(Tone) {
    this.Tone = Tone;
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

    this.chordType = ["major", "major", "major", "minor"];

    this.noteOffset = [7, 5, 0, 0];
  }

  chooseRoot(chordPosition, rootNote) {
    this.chords[this.chordType[chordPosition]];

    // prettier-ignore
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    for (let whichNote = 0; whichNote < notes.length; whichNote++) {
      if (notes[whichNote] === rootNote)
        this.noteOffset[chordPosition] = whichNote;
    }

    this.setChord(chordPosition);
  }

  chooseChord(chordPosition, chordType) {
    this.chordType[chordPosition] = chordType;
    this.setChord(chordPosition);
  }

  setChord(chordPosition) {
    for (
      let note = 0;
      note < this.chords[this.chordType[chordPosition]].length;
      note++
    ) {
      this.chordArray[chordPosition][note] =
        this.allTheNotes[
          this.chords[this.chordType[chordPosition]][note] +
            this.noteOffset[chordPosition]
        ];
    }
  }

  startAudio() {
    this.Tone.start();
    console.log("Audio Started");
  }

  setUpSampler(callback) {
    this.sampler = new this.Tone.Sampler({
      urls: {
        C4: "Harp-C4.mp3"
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

  playNote(whichString) {
    this.sampler.triggerAttack(
      this.chordArray[whichString.chord][whichString.string],
      this.Tone.now()
    );
  }
}

module.exports = BarsSoundControl;
