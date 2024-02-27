import { ACHeater } from './ac_heater';
import { store } from '../store';

jest.mock('../store', () => ({
    store: {
        state: {
            isAc: false,
            acIsOn: false,
            isHeat: false,
            heatIsOn: false,
        },
        setState(newState: any) {
            this.state = { ...this.state, ...newState };
        },
        getState() {
            return this.state;
        },
    }
}));

describe('ACHeater functionality', () => {
    test('enableAC sets isAc to true', () => {
        const acHeater = ACHeater();
        acHeater.enableAC();
        expect(store.getState().isAc).toBe(true);
    });

    test('turnOnAc sets acIsOn to true', () => {
        const acHeater = ACHeater();
        acHeater.turnOnAc();
        expect(store.getState().acIsOn).toBe(true);
    });

    test('turnOffAc sets acIsOn to false', () => {
        const acHeater = ACHeater();
        acHeater.turnOffAc();
        expect(store.getState().acIsOn).toBe(false);
    });

    test('disableAC sets isAc and acIsOn to false', () => {
        const acHeater = ACHeater();
        acHeater.disableAC();
        expect(store.getState()).toEqual(expect.objectContaining({
            isAc: false,
            acIsOn: false,
        }));
    });

    test('enableHeater sets isHeat to true', () => {
        const acHeater = ACHeater();
        acHeater.enableHeater();
        expect(store.getState().isHeat).toBe(true);
    });

    test('turnOnHeater sets heatIsOn to true', () => {
        const acHeater = ACHeater();
        acHeater.turnOnHeater();
        expect(store.getState().heatIsOn).toBe(true);
    });

    test('turnOffHeater sets heatIsOn to false', () => {
        const acHeater = ACHeater();
        acHeater.turnOffHeater();
        expect(store.getState().heatIsOn).toBe(false);
    });

    test('disableHeater sets isHeat and heatIsOn to false', () => {
        const acHeater = ACHeater();
        acHeater.disableHeater();
        expect(store.getState()).toEqual(expect.objectContaining({
            isHeat: false,
            heatIsOn: false,
        }));
    });

    test('handleUpdateSpeed updates speed in the store', () => {
        const acHeater = ACHeater();
        acHeater.handleUpdateSpeed('fast');
        expect(store.getState().speed).toBe('fast');
    });
});
