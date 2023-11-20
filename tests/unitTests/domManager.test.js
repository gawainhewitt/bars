const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const DomManager = require("../../domManager");

describe("setInitialClass", () => {
  it("initialises elements with correct class", () => {
    const domManager = new DomManager();

    const elementNames = [
      "startscreen",
      "topbox",
      "bottombox",
      "optionstop",
      "optionsmiddle",
      "optionsbottom",
      "backbutton"
    ];

    const chordNameDivs = ["zero", "one", "two"];

    const chordNames = ["chord0name", "chord1name", "chord2name"];

    const stringContainers = [
      "stringscontainer0",
      "stringscontainer1",
      "stringscontainer2"
    ];

    const rightspaces = [
      "chordzerorightspace",
      "chordonerightspace",
      "chordtworightspace"
    ];

    domManager.setInitialClass();

    for (const name of elementNames) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual(name);
    }

    for (const name of chordNameDivs) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual(`${name} flex`);
    }

    for (const name of chordNames) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual("chordname");
    }

    for (let i = 0; i < stringContainers.length; i++) {
      const element = document.querySelector(`#${stringContainers[i]}`);
      expect(element.className).toEqual(
        `stringscontainer chord${i}colour flex`
      );
    }

    for (let chord = 0; chord < 3; chord++) {
      for (let string = 0; string < 10; string++) {
        const element = document.querySelector(`#c${chord}s${string}`);
        expect(element.className).toEqual("string");
      }
    }

    for (let i = 0; i < rightspaces.length; i++) {
      const element = document.querySelector(`#${rightspaces[i]}`);
      expect(element.className).toEqual(`rightspace chord${i}colour flex`);
    }

    const optionscreen = document.querySelector("#optionscreen");
    expect(optionscreen.className).toEqual("invisible");

    const chordBackgroundColours = [
      "chord0colour",
      "chord1colour",
      "chord2colour"
    ];
    const optionsChordBlocks = [
      [
        "optionstopchordname",
        "optionstopchordkey",
        "optionstopchordchordtype",
        "optionstopchordstate"
      ],
      [
        "optionsmiddlechordname",
        "optionsmiddlechordkey",
        "optionsmiddlechordchordtype",
        "optionsmiddlechordstate"
      ],
      [
        "optionsbottomchordname",
        "optionsbottomchordkey",
        "optionsbottomchordchordtype",
        "optionsbottomchordstate"
      ]
    ];
    for (let i = 0; i < optionsChordBlocks.length; i++) {
      for (let j = 0; j < optionsChordBlocks[i].length; j++) {
        const element = document.querySelector(`#${optionsChordBlocks[i][j]}`);
        expect(element.className).toEqual(
          `${chordBackgroundColours[i]} chordname flexcolumn`
        );
      }
    }
    const chordType = ["chord0type", "chord1type", "chord2type"];

    for (const name of chordType) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual("chordtype");
    }
  });
});

describe("setViewHeight", () => {
  const domManager = new DomManager();
  it("sets viewheight to viewport", () => {
    let vh = window.innerHeight * 0.01;

    domManager.setViewHeight();

    let cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--vh");

    expect(cssVariableValue).toEqual(`${vh}px`);
  });
});

describe("switchChords", () => {
  const domManager = new DomManager();
  const chordBlockClasses = ["zero", "one", "two"];
  const button = 0;
  domManager.setInitialClass();

  it("changes class to invisible when it is visible", () => {
    domManager.switchChords(button, false);

    expect(
      document.querySelector(`#${chordBlockClasses[button]}`).className
    ).toEqual(`${chordBlockClasses[button]} invisible`);
  });
  it("changes class to visible when it is invisible", () => {
    domManager.switchChords(button, true);

    expect(
      document.querySelector(`#${chordBlockClasses[button]}`).className
    ).toEqual(`${chordBlockClasses[button]} flex`);
  });
});

describe("optionsVisible", () => {
  const domManager = new DomManager();

  it("change to visible class", () => {
    domManager.optionsVisible();

    expect(document.querySelector("#optionscreen").className).toEqual(
      "optionscreen"
    );
  });
});

describe("optionsInvisible", () => {
  const domManager = new DomManager();

  it("change to invisible class", () => {
    domManager.optionsInvisible();

    expect(document.querySelector("#optionscreen").className).toEqual(
      "invisible"
    );
  });
});

describe("showStart", () => {
  const domManager = new DomManager();
  it("sets load screen to start text", () => {
    domManager.setInitialClass();
    domManager.showStart();
    expect(document.querySelector("#infotext").innerHTML)
      .toEqual(`<h1>Lines</h1> <br>
    <p>To play:  <br>
    touch or click screen, <br>
    or use QWERTY keys<br>
    on a keyboard<br><br>
    On Apple devices,<br>
    turn off silent mode</p><br><br>`);
  });

  describe("showOptions", () => {
    const domManager = new DomManager();
    it("shows about screen", () => {
      domManager.setInitialClass();
      domManager.showOptions();
      expect(document.querySelector("#startscreen").className).toEqual(
        "startscreen"
      );
    });
  });

  describe("hideStart", () => {
    const domManager = new DomManager();
    it("hides start screen", () => {
      domManager.setInitialClass();
      domManager.hideStart();
      expect(document.querySelector("#startscreen").className).toEqual(
        "invisible"
      );
    });
  });
});

describe("changeChordName", () => {
  const domManager = new DomManager();
  it("changes displayed chord name", () => {
    const whichChord = 0;
    const name = "D#";
    domManager.setInitialClass();
    domManager.changeChordName(whichChord, name);

    expect(document.querySelector(`#chord${whichChord}name`).innerHTML).toEqual(
      name
    );
  });
});

describe("changeChordType", () => {
  const domManager = new DomManager();
  it("changes displayed chord name", () => {
    const whichChord = 0;
    const name = "minor";
    domManager.setInitialClass();
    domManager.changeChordType(whichChord, name);

    expect(document.querySelector(`#chord${whichChord}type`).innerHTML).toEqual(
      name
    );
  });
});
