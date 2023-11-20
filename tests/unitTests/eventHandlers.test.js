const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");
const EventHandlers = require("../../eventHandlers");
const BarsSoundControl = require("../../barsSoundControl");
const DomManager = require("../../domManager");

jest.mock("../../barsSoundControl");
jest.mock("../../eventBinders");
jest.mock("../../domManager");

beforeEach(() => {
  EventBinders.mockClear();
  BarsSoundControl.mockClear();
  DomManager.mockClear();
});

describe("constructor", () => {
  test("sets up class instances correctly", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    expect(eventHandlers.barsSoundControl).toBeInstanceOf(BarsSoundControl);
    expect(eventHandlers.eventBinders).toBeInstanceOf(EventBinders);
  });

  it("calls setUpSampler", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockBarsSoundControlInstance = BarsSoundControl.mock.instances[0];

    expect(mockBarsSoundControlInstance.setUpSampler).toHaveBeenCalledWith(
      eventHandlers.displayStartButton
    );
  });
});

describe("switchChords", () => {
  test("switchcords toggles css display", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockdomManager = DomManager.mock.instances[0];

    eventHandlers.switchChords(1, document.querySelector("#onechordbutton"));

    expect(mockdomManager.switchChords).toHaveBeenCalled();
  });
});

describe("enterOptionScreen", () => {
  test("makes option screen visible", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockdomManager = DomManager.mock.instances[0];

    eventHandlers.enterOptionScreen();

    expect(mockdomManager.optionsVisible).toHaveBeenCalled();
  });
});

describe("leaveOptionScreen", () => {
  test("makes option screen visible", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockdomManager = DomManager.mock.instances[0];

    eventHandlers.leaveOptionScreen();

    expect(mockdomManager.optionsInvisible).toHaveBeenCalled();
  });
});

describe("displayStartButton", () => {
  test("calls bindStartScreen", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockEventBinders = EventBinders.mock.instances[0];

    eventHandlers.displayStartButton();

    expect(mockEventBinders.bindStartScreen).toHaveBeenCalledWith(
      eventHandlers.start
    );
  });
});

describe("start", () => {
  test("calls barsSoundcontrol.startAudio", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();

    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockBarsSoundControlInstance = BarsSoundControl.mock.instances[0];

    eventHandlers.start();

    expect(mockBarsSoundControlInstance.startAudio).toHaveBeenCalled();
  });
  test("hides start screen", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockdomManagerInstance = DomManager.mock.instances[0];

    eventHandlers.start();

    expect(mockdomManagerInstance.hideStart).toHaveBeenCalled();
  });
});

describe("aboutScreen", () => {
  const barsSoundControl = new BarsSoundControl();
  const eventBinders = new EventBinders();
  const domManager = new DomManager();
  const eventHandlers = new EventHandlers(
    eventBinders,
    barsSoundControl,
    domManager
  );

  const mockdomManagerInstance = DomManager.mock.instances[0];

  eventHandlers.aboutScreen();

  expect(mockdomManagerInstance.showOptions).toHaveBeenCalled();
});

describe("stringIsPlucked", () => {
  test("calls playNote if type is mouse && mouseDown && in main screen", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );
    const optionscreen = document.querySelector("#optionscreen");
    optionscreen.className = "invisible";
    const mockBarsSoundControlInstance = BarsSoundControl.mock.instances[0];

    const myMock = {
      preventDefault: jest.fn()
    };

    eventHandlers.registerMouseDown(myMock);
    eventHandlers.stringIsPlucked("mouse", "stringMock");

    expect(mockBarsSoundControlInstance.playNote).toHaveBeenCalledWith(
      "stringMock"
    );

    eventHandlers.registerMouseUp();

    eventHandlers.stringIsPlucked("mouse", "stringMock");

    expect(mockBarsSoundControlInstance.playNote).toHaveBeenCalledTimes(1);
  });
  test("calls playNote if type is not mouse", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const mockBarsSoundControlInstance = BarsSoundControl.mock.instances[0];

    eventHandlers.stringIsPlucked("touch", "stringMock2");

    expect(mockBarsSoundControlInstance.playNote).toHaveBeenCalledWith(
      "stringMock2"
    );
  });
});

describe("disableSelect", () => {
  test("calls parameter.preventDefault", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const myMock = {
      preventDefault: jest.fn()
    };

    eventHandlers.disableSelect(myMock);

    expect(myMock.preventDefault).toHaveBeenCalled();
  });
});

describe("handleKeyDown and handleKeyUp", () => {
  it("plays a note when a key is pressed", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const myMock = {
      code: "KeyA"
    };

    const spy = jest.spyOn(eventHandlers, "stringIsPlucked");

    eventHandlers.chordState[1] = true;

    eventHandlers.handleKeyDown(myMock);

    expect(spy).toHaveBeenCalledWith("key", { chord: 1, string: 0 });
  });
  it("note does not repeat when held down", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const myMock = {
      code: "KeyD"
    };

    const spy = jest.spyOn(eventHandlers, "stringIsPlucked");

    eventHandlers.chordState[1] = true;

    eventHandlers.handleKeyDown(myMock);
    eventHandlers.handleKeyDown(myMock);

    expect(spy).toHaveBeenCalledWith("key", { chord: 1, string: 2 });
    expect(spy).toHaveBeenCalledTimes(1);

    eventHandlers.handleKeyUp(myMock);

    eventHandlers.handleKeyDown(myMock);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe("keyMenu", () => {
  it("changes key", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const myMock = {
      srcElement: { id: "goatsbaa", value: "much" }
    };

    const mockDomManagerInstance = DomManager.mock.instances[0];
    const mockBarsSoundControlInstance = BarsSoundControl.mock.instances[0];

    eventHandlers.keyMenu(myMock);

    expect(mockDomManagerInstance.changeChordName).toHaveBeenCalledWith(
      myMock.srcElement.id[6],
      myMock.srcElement.value
    );
    expect(mockBarsSoundControlInstance.chooseRoot).toHaveBeenCalledWith(
      myMock.srcElement.id[6],
      myMock.srcElement.value
    );
  });
});

describe("chordMenu", () => {
  it("changes chord", () => {
    const barsSoundControl = new BarsSoundControl();
    const eventBinders = new EventBinders();
    const domManager = new DomManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      barsSoundControl,
      domManager
    );

    const myMock = {
      srcElement: { id: "goatsbaa", value: "much" }
    };

    const mockDomManagerInstance = DomManager.mock.instances[0];
    const mockBarsSoundControlInstance = BarsSoundControl.mock.instances[0];

    eventHandlers.chordMenu(myMock);

    expect(mockDomManagerInstance.changeChordType).toHaveBeenCalledWith(
      myMock.srcElement.id[6],
      myMock.srcElement.value
    );
    expect(mockBarsSoundControlInstance.chooseChord).toHaveBeenCalledWith(
      myMock.srcElement.id[6],
      myMock.srcElement.value
    );
  });
});

// it("plays a note when screen touched", () => {
//   jest.mock("../../eventHandlers", () => {
//     const originalModule = jest.requireActual("../../eventHandlers");

//     return {
//       __esModule: true,
//       ...originalModule,
//       showElement: jest.fn()
//     };
//   });

//   const barsSoundControl = new BarsSoundControl();
//   const eventBinders = new EventBinders();
// const domManager = new DomManager(); //
// const eventHandlers = new EventHandlers(
//   eventBinders,
//   barsSoundControl,
//   domManager
// );

//   // const stringPosition = document
//   //   .querySelector("#c0s0")
//   //   .getBoundingClientRect();

//   // console.log(stringPosition);

//   const mockTouch = {
//     identifier: "sportPants",
//     clientX: 0,
//     clientY: 0,
//     preventDefault: jest.fn(),
//     changedTouches: [{ identifier: "sportPants", clientX: 0, clientY: 0 }]
//   };

//   eventHandlers.handleTouchStart(mockTouch);
// });

// can't find a way to test further as document.elementFromPoint ends up being
// called - and there is no layout in JSDOM, so this feature is not implemented
// and therefore I can't test
