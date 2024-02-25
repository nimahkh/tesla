import { store } from "../store";

export function updateTemperature() {
    function handleUpdateTemperature(value: string) {
        store.setState({ temprature: value });
    };

    return { handleUpdateTemperature }
}
