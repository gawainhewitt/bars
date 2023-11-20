const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const EventBinders = require("../../eventBinders");
const EventHandlers = require("../../eventHandlers");
const BarsSoundControl = require("../../barsSoundControl");
const DomManager = require("../../domManager");

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

describe("setup", () => {
  const eventBinders = new EventBinders();
  const barsSoundControl = new BarsSoundControl(FakeTone);
  const domManager = new DomManager();
  const eventHandlers = new EventHandlers(
    eventBinders,
    barsSoundControl,
    domManager
  );

  it("creates instance of class EventBinders", () =>
    expect(eventBinders).toBeInstanceOf(EventBinders));
  it("creates instance of class BarsSoundControl", () =>
    expect(barsSoundControl).toBeInstanceOf(BarsSoundControl));
  it("creates instance of class EventHandlers", () =>
    expect(eventHandlers).toBeInstanceOf(EventHandlers));
  test("eventHandlers has eventBinders injected", () =>
    expect(eventHandlers.eventBinders).toBeInstanceOf(EventBinders));
  test("eventHandlers has barsSoundControl injected", () =>
    expect(eventHandlers.barsSoundControl).toBeInstanceOf(BarsSoundControl));
});
