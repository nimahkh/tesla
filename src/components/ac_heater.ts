import { store } from "../store";

export function ACHeater() {
    function handleUpdateSpeed(value: string) {
        store.setState({ speed: value });
    };

    function getState(): { isAc: boolean, acIsOn: boolean, isHeat: boolean, heatIsOn: boolean } {
        const state = store.getState();
        return {
            isAc: state.isAc,
            acIsOn: state.acIsOn,
            isHeat: state.isHeat,
            heatIsOn: state.heatIsOn
        }
    }

    function enableHeater() {
        store.setState({ isHeat: true });
    }

    function turnOnHeater() {
        store.setState({ heatIsOn: true });
    }

    function turnOffHeater() {
        store.setState({ heatIsOn: false });
    }

    function disableHeater() {
        store.setState({ heatIsOn: false, isHeat: false});
    }

    function enableAC() {
        store.setState({ isAc: true });
    }

    function turnOnAc() {
        store.setState({ acIsOn: true });
    }

    function turnOffAc() {
        store.setState({ acIsOn: false });
    }

    function disableAC() {
        store.setState({ acIsOn: false, isAc: false});
    }

    return { handleUpdateSpeed, getState, enableAC, enableHeater, disableHeater, disableAC, turnOnAc, turnOnHeater, turnOffHeater, turnOffAc }
}
