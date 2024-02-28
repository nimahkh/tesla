import { updateSpeed } from "./speed";
import { store } from "../store";

jest.mock("../store", () => ({
  store: {
    setState: jest.fn(),
  },
}));

describe("updateSpeed", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("handleUpdateSpeed updates the speed in the store", () => {
    const { handleUpdateSpeed } = updateSpeed();
    const newSpeed = "100";

    handleUpdateSpeed(newSpeed);

    expect(store.setState).toHaveBeenCalledWith({ speed: newSpeed });
  });
});
