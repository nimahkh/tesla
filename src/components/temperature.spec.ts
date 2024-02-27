import { updateTemperature } from './temperature';
import { store } from '../store';

jest.mock('../store', () => ({
    store: {
        state: {},
        setState(newState: any) {
            this.state = { ...this.state, ...newState };
        },
        getState() {
            return this.state;
        },
    }
}));

describe('updateTemperature functionality', () => {
    test('handleUpdateTemperature updates temperature in the store', () => {
        const temperatureUpdater = updateTemperature();
        temperatureUpdater.handleUpdateTemperature('25');
        expect(store.getState().temprature).toBe('25');
    });
});
