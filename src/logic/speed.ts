import { fetchData } from '../api/data/fetchData.ts';
import { updateSpeed } from '../components/speed.ts';
import { handleStepperButton } from './stepper.ts';

export function handleSpeed(type: 'up' | 'down') {
    const speedDom = document.querySelector('#speed') as HTMLInputElement;
    if (type === 'up') {
        speedDom?.stepUp();
    } else {
        speedDom?.stepDown();
    }
    const speed = speedDom?.value;
    updateSpeed().handleUpdateSpeed(speed);
    handleStepperButton('speed', { value: speed, min: 70, max: 140 });
    fetchData();
}

