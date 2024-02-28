import { updateTemperature } from "./temperature";
import { store } from "../store";
import { describe, expect, test, vi } from 'vitest'

vi.mock("../store", () => ({
  store: {
    state: {},
    setState(newState: any) {
      this.state = { ...this.state, ...newState };
    },
    getState() {
      return this.state;
    },
  },
}));

describe("updateTemperature functionality", () => {
  test("handleUpdateTemperature updates temperature in the store", () => {
    const temperatureUpdater = updateTemperature();
    temperatureUpdater.handleUpdateTemperature("25");
    expect(store.getState().temprature).toBe("25");
  });
});
