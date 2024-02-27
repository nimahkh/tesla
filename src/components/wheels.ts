import { store } from "../store";

export function updateWheels() {
  function handleUpdateWheel(variant: "nineteen" | "twentyone") {
    const wheel_sizes = {
      nineteen: 19,
      twentyone: 21,
    };
    store.setState({ wheel_size: wheel_sizes[variant] });
  }

  return { handleUpdateWheel };
}
