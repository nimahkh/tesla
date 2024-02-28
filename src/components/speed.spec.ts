import { updateSpeed } from "./speed";
import { store } from "../store";
import { describe, beforeEach, expect, test, vi } from 'vitest'

vi.mock("../store", () => ({
  store: {
    setState: vi.fn(),
  },
}));

describe("updateSpeed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("handleUpdateSpeed updates the speed in the store", () => {
    const { handleUpdateSpeed } = updateSpeed();
    const newSpeed = "100";

    handleUpdateSpeed(newSpeed);

    expect(store.setState).toHaveBeenCalledWith({ speed: newSpeed });
  });
});
