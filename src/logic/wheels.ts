
import { updateWheels } from '../components/wheels.ts';
import { fetchData } from '../api/data/fetchData.ts';

const wheelClassMap = {
    nineteen: {
        left: 'wheel-left-nineteen',
        right: 'wheel-right-nineteen',
    },
    twentyone: {
        left: 'wheel-left-twentyone',
        right: 'wheel-right-twentyone',
    },
};

export function handleToggleWheels(variant: 'nineteen' | 'twentyone') {
    const wheelsDom = document.querySelectorAll('.wheel_item');
    wheelsDom.forEach(element => {
        element.classList.remove('active');
    });

    const wheelDom = document.getElementById(variant);
    wheelDom?.classList.add('active');

    handleChangeWheels(variant);
}

function updateWheelClass(wheelId: string, newClass: string) {
    const wheel = document.getElementById(wheelId);
    if (!wheel) return;

    const allWheelClasses = ['wheel-left-nineteen', 'wheel-right-nineteen', 'wheel-left-twentyone', 'wheel-right-twentyone'];

    allWheelClasses.forEach(cls => {
        if (cls !== newClass) {
            wheel.classList.remove(cls);
        }
    });

    if (!wheel.classList.contains(newClass)) {
        wheel.classList.add(newClass);
    }
}

function handleChangeWheels(variant: 'nineteen' | 'twentyone') {
    updateWheelClass('wheel_left', wheelClassMap[variant].left);
    updateWheelClass('wheel_right', wheelClassMap[variant].right);
    updateWheels().handleUpdateWheel(variant);
    fetchData();
}

