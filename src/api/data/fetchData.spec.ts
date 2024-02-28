import { store } from "../../store";

import Metrics100D from "./metric-100D.json";
import MetricsP100D from "./metric-P100D.json";
import { describe, beforeEach, expect, test, vi } from 'vitest'

vi.mock("../../components/calculator", () => ({
    updateResult: vi.fn(),
}));

describe("fetchData integration test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("correctly processes data from JSON files based ac status", () => {
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

        vi.spyOn(store, "getState").mockImplementation(() => testState);

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

    test("correctly processes data from JSON files based on heat status", () => {
        const testState = {
            temprature: "20",
            wheel_size: 19,
            acIsOn: false,
            speed: "100",
            isAc: false,
            isHeat: true,
            heatIsOn: false,
            result: {
                _100d: { kmh: 0, kilometers: 0 },
                _p100d: { kmh: 0, kilometers: 0 },
            },
        };

        vi.spyOn(store, "getState").mockImplementation(() => testState);

        const expected100DResult = Metrics100D.find(
            (data) =>
                data.temp === parseInt(testState.temprature) &&
                data.wheelsize === testState.wheel_size &&
                (testState.heatIsOn ? data.ac === "on" : data.ac === "off"),
        )?.hwy.find((hwyData) => hwyData.kmh === parseInt(testState.speed));

        const expectedP100DResult = MetricsP100D.find(
            (data) =>
                data.temp === parseInt(testState.temprature) &&
                data.wheelsize === testState.wheel_size &&
                (testState.heatIsOn ? data.ac === "on" : data.ac === "off"),
        )?.hwy.find((hwyData) => hwyData.kmh === parseInt(testState.speed));

        expect(expected100DResult).toEqual({ kmh: 100, kilometers: 594 });
        expect(expectedP100DResult).toEqual({ kmh: 100, kilometers: 572 });
    });
});
