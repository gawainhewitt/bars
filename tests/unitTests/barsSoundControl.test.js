const BarsSoundControl = require("../../barsSoundControl");

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
  const barsSoundControl = new BarsSoundControl(FakeTone);
  it("console logs 'Audio Started' once audio is started", async () => {
    const logSpy = jest.spyOn(console, "log");

    await barsSoundControl.startAudio();

    expect(logSpy).toHaveBeenCalledWith("Audio Started");
  });
});

describe("setUpSampler", () => {
  const barsSoundControl = new BarsSoundControl(FakeTone);
  it("creates sampler", () => {
    barsSoundControl.setUpSampler();

    expect(barsSoundControl.sampler).toBeInstanceOf(FakeTone.Sampler);
  });
  it("creates reverb", () => expect(barsSoundControl.reverb).toEqual("blah"));
  it("connect's sampler to reverb", () =>
    expect(barsSoundControl.sampler.connect()).toEqual("daschunds rule!"));
});

describe("playNote", () => {
  const barsSoundControl = new BarsSoundControl(FakeTone);

  it("plays a note", () => {
    barsSoundControl.setUpSampler();

    barsSoundControl.playNote({ chord: 0, string: 3 });
    expect(barsSoundControl.sampler.theNote).toEqual("G4");
  });
});

describe("chooseRoot", () => {
  const barsSoundControl = new BarsSoundControl(FakeTone);

  it("sets root note of chord", () => {
    const topChord = 0;
    const rootNoteF = "F";
    const fChord = ["F3", "A3", "C4", "F4", "A4", "C5", "F5", "A5", "C6", "F6"];

    barsSoundControl.chooseRoot(topChord, rootNoteF);

    expect(barsSoundControl.chordArray[topChord]).toEqual(fChord);

    const middleChord = 1;
    const rootNoteC = "C";
    const cChord = ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5", "C6"];

    barsSoundControl.chooseRoot(middleChord, rootNoteC);

    expect(barsSoundControl.chordArray[middleChord]).toEqual(cChord);
  });
});

describe("chooseChord", () => {
  const barsSoundControl = new BarsSoundControl(FakeTone);

  it("sets type of chord", () => {
    const bottomChord = 2;
    const chordType = "minor";

    barsSoundControl.chooseChord(bottomChord, chordType);

    expect(barsSoundControl.chordType[bottomChord]).toEqual(chordType);
  });
});
