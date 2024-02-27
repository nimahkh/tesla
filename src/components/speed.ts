import { store } from "../store";

export function updateSpeed() {
  function handleUpdateSpeed(value: string) {
    store.setState({ speed: value });
  }

  return { handleUpdateSpeed };
}
