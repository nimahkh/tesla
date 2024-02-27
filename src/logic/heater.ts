import { ACHeater } from '../components/ac_heater.ts';
import { updateTemperature } from '../components/temperature.ts';
import { fetchData } from '../api/data/fetchData.ts';
import { handleStepperButton } from './stepper.ts';
import { isIE11, handStepperE11 } from '../utilities/ie11.ts';

function handleEnableHeater() {
    enableHeaterIfHeatOrACIsOn();
    enableHeaterOrACText('heater');
}

function handleEnableAC() {
    enableACIfAcIsOrHeaterOn();
    enableHeaterOrACText('ac');
}

function enableHeaterIfHeatOrACIsOn() {
    if (!ACHeater().getState().heatIsOn && !ACHeater().getState().acIsOn) return;
    const heater_inner = document.getElementsByClassName('speed-heater-inner')?.[0] as HTMLElement;
    if (ACHeater().getState().acIsOn) {
        ACHeater().turnOnHeater();
    }
    heater_inner?.classList.add('heat-on');
    heater_inner?.classList.remove('ac-on');
}

function enableACIfAcIsOrHeaterOn() {
    if (!ACHeater().getState().acIsOn && !ACHeater().getState().heatIsOn) return;
    if (ACHeater().getState().heatIsOn) {
        ACHeater().turnOnAc();
    }
    const heater_inner = document.getElementsByClassName('speed-heater-inner')?.[0] as HTMLElement;
    heater_inner?.classList.remove('heat-on');
    heater_inner?.classList.add('ac-on');
}

function enableHeaterOrACText(type: 'heater' | 'ac') {
    const ac_off = document.getElementById('ac-off');
    const ac_on = document.getElementById('ac-on');
    const heat_off = document.getElementById('heat-off');
    const heat_on = document.getElementById('heat-on');

    const isHeatOn = ACHeater().getState().heatIsOn;
    const isAcOn = ACHeater().getState().acIsOn;
    if (type === 'heater') {
        ac_off?.classList.add('hidden');
        ac_on?.classList.add('hidden');
        heat_on?.classList.add('hidden');
        if (isHeatOn || isAcOn) {
            heat_on?.classList.remove('hidden');
        }
        else {
            heat_off?.classList.remove('hidden');
        }
    } else {
        heat_off?.classList.add('hidden');
        heat_on?.classList.add('hidden');
        ac_on?.classList.add('hidden');
        if (isHeatOn || isAcOn) {
            ac_on?.classList.remove('hidden');
        }
        else {
            ac_off?.classList.remove('hidden');
        }
    }
}

function handleACHeaterByTemperature(temperature: string) {
    const heater = document.getElementById('heater');
    const ac = document.getElementById('ac');
    if (temperature <= '10') {
        heater?.classList.remove('hidden');
        handleEnableHeater();
        ACHeater().disableAC();
        ACHeater().enableHeater();
        ac?.classList.add('hidden');
    } else {
        heater?.classList.add('hidden');
        handleEnableAC();
        ACHeater().disableHeater();
        ACHeater().enableAC();
        ac?.classList.remove('hidden');
    }
}

export function handleTemperature(type: 'up' | 'down') {
    const TemperatureDOM = document.querySelector('#temperature') as HTMLInputElement;
    let Temperature = '';

    if (isIE11()) {
        Temperature = handStepperE11(type, TemperatureDOM);
    }
    else {
        if (type === 'up') {
            TemperatureDOM?.stepUp();
        } else {
            TemperatureDOM?.stepDown();
        }
        Temperature = TemperatureDOM?.value;
    }
    updateTemperature().handleUpdateTemperature(Temperature);
    handleStepperButton('temperature', { value: Temperature, min: -10, max: 40 });
    handleACHeaterByTemperature(Temperature);
    fetchData();
}

export function handleAcHeater() {
    const heater_inner = document.getElementsByClassName('speed-heater-inner')?.[0] as HTMLElement;
    const heatOff = document.getElementById('heat-off');
    const heatOn = document.getElementById('heat-on');
    const acOff = document.getElementById('ac-off');
    const acOn = document.getElementById('ac-on');
    if (ACHeater().getState().isHeat) {
        ACHeater().enableHeater();
        ACHeater().disableAC();
        if (!ACHeater().getState().heatIsOn) {
            ACHeater().turnOnHeater();
        } else {
            ACHeater().turnOffHeater();
        }
        heater_inner?.classList.remove('ac-on');
        if (ACHeater().getState().heatIsOn) {
            heater_inner?.classList.add('heat-on');
            heatOff?.classList.add('hidden');
            heatOn?.classList.remove('hidden');
        } else {
            heater_inner?.classList.remove('heat-on');
            heatOn?.classList.add('hidden');
            heatOff?.classList.remove('hidden');
        }
    }
    if (ACHeater().getState().isAc) {
        ACHeater().enableAC();
        ACHeater().disableHeater();
        if (!ACHeater().getState().acIsOn) {
            ACHeater().turnOnAc();
        } else {
            ACHeater().turnOffAc();
        }
        heater_inner?.classList.remove('heat-on');
        heatOff?.classList.add('hidden');
        heatOn?.classList.add('hidden');
        if (ACHeater().getState().acIsOn) {
            heater_inner?.classList.add('ac-on');
            acOff?.classList.add('hidden');
            acOn?.classList.remove('hidden');
        } else {
            heater_inner?.classList.remove('ac-on');
            acOn?.classList.add('hidden');
            acOff?.classList.remove('hidden');
        }
    }
    fetchData();
}
