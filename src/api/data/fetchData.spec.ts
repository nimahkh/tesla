import { store } from "../../store";

import * as Metrics100D from "./metric-100D.json";
import * as MetricsP100D from "./metric-P100D.json";

jest.mock("../../components/calculator", () => ({
  updateResult: jest.fn(),
}));

describe("fetchData integration test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("correctly processes data from JSON files based on store state", () => {
    const testState = {
      temprature: "20",
      wheel_size: 19,
      acIsOn: true,
      speed: "100",
      isAc: false,
      isHeat: false,
      heatIsOn: false,
      result: {
        _100d: { kmh: 0, kilometers: 0 },
        _p100d: { kmh: 0, kilometers: 0 },
      },
    };

    jest.spyOn(store, "getState").mockImplementation(() => testState);

    const expected100DResult = Metrics100D.find(
      (data) =>
        data.temp === parseInt(testState.temprature) &&
        data.wheelsize === testState.wheel_size &&
        (testState.acIsOn ? data.ac === "on" : data.ac === "off"),
    )?.hwy.find((hwyData) => hwyData.kmh === parseInt(testState.speed));

    const expectedP100DResult = MetricsP100D.find(
      (data) =>
        data.temp === parseInt(testState.temprature) &&
        data.wheelsize === testState.wheel_size &&
        (testState.acIsOn ? data.ac === "on" : data.ac === "off"),
    )?.hwy.find((hwyData) => hwyData.kmh === parseInt(testState.speed));

    expect(expected100DResult).toEqual({ kmh: 100, kilometers: 551 });
    expect(expectedP100DResult).toEqual({ kmh: 100, kilometers: 531 });
  });
});
