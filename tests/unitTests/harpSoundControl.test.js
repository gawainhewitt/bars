const HarpSoundControl = require("../../harpSoundControl");

const FakeTone = {
  start: async function () {
    setTimeout(() => {}, 200);
  },
  Sampler: class {
    constructor(params) {}
    connect = () => {
      return "daschunds rule!";
    };
    set = () => {};
    triggerAttack = (note, time) => {
      this.theNote = note;
    };
  },
  Reverb: class {
    constructor(params) {}
    toDestination = () => {
      return "blah";
    };
  },
  now: () => {}
};

describe("startAudio", () => {
  const harpSoundControl = new HarpSoundControl(FakeTone);
  it("console logs 'Audio Started' once audio is started", async () => {
    const logSpy = jest.spyOn(console, "log");

    await harpSoundControl.startAudio();

    expect(logSpy).toHaveBeenCalledWith("Audio Started");
  });
});

describe("setUpSampler", () => {
  const harpSoundControl = new HarpSoundControl(FakeTone);
  it("creates sampler", () => {
    harpSoundControl.setUpSampler();

    expect(harpSoundControl.sampler).toBeInstanceOf(FakeTone.Sampler);
  });
  it("creates reverb", () => expect(harpSoundControl.reverb).toEqual("blah"));
  it("connect's sampler to reverb", () =>
    expect(harpSoundControl.sampler.connect()).toEqual("daschunds rule!"));
});

describe("playNote", () => {
  const harpSoundControl = new HarpSoundControl(FakeTone);

  it("plays a note", () => {
    harpSoundControl.setUpSampler();

    harpSoundControl.playNote({ chord: 0, string: 3 });
    expect(harpSoundControl.sampler.theNote).toEqual("G4");
  });
});

describe("chooseRoot", () => {
  const harpSoundControl = new HarpSoundControl(FakeTone);

  it("sets root note of chord", () => {
    const topChord = 0;
    const rootNoteF = "F";
    const fChord = ["F3", "A3", "C4", "F4", "A4", "C5", "F5", "A5", "C6", "F6"];

    harpSoundControl.chooseRoot(topChord, rootNoteF);

    expect(harpSoundControl.chordArray[topChord]).toEqual(fChord);

    const middleChord = 1;
    const rootNoteC = "C";
    const cChord = ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5", "C6"];

    harpSoundControl.chooseRoot(middleChord, rootNoteC);

    expect(harpSoundControl.chordArray[middleChord]).toEqual(cChord);
  });
});

describe("chooseChord", () => {
  const harpSoundControl = new HarpSoundControl(FakeTone);

  it("sets type of chord", () => {
    const bottomChord = 2;
    const chordType = "minor";

    harpSoundControl.chooseChord(bottomChord, chordType);

    expect(harpSoundControl.chordType[bottomChord]).toEqual(chordType);
  });
});
