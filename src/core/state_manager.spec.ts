import StateManager from "./state_manager";

describe("StateManager without IE11 considerations", () => {
  let stateManager: StateManager<{ count: number; nested: { value: boolean } }>;

  beforeEach(() => {
    stateManager = new StateManager<{
      count: number;
      nested: { value: boolean };
    }>({
      count: 0,
      nested: { value: true },
    });
  });

  test("initial state is set correctly", () => {
    expect(stateManager.getState()).toEqual({
      count: 0,
      nested: { value: true },
    });
  });

  test("setState updates the state correctly", () => {
    stateManager.setState({ count: 10 });
    expect(stateManager.getState().count).toBe(10);
  });

  test("setState updates nested state correctly", () => {
    stateManager.setState({ nested: { value: false } });
    expect(stateManager.getState().nested.value).toBe(false);
  });

  test("subscribers are notified on state change", () => {
    const subscriberMock = jest.fn();
    stateManager.subscribe(subscriberMock);

    stateManager.setState({ count: 5 });
    expect(subscriberMock).toHaveBeenCalledWith({
      count: 5,
      nested: { value: true },
    });
  });
});
