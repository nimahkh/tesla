export function isIE11() {
    return !!window.MSInputMethodContext && !!(document as any).documentMode;
}

export function handStepperE11(type: 'up' | 'down', elementDom: HTMLInputElement): string {
    if (elementDom) {
        const currentValue = parseInt(elementDom.value, 10);
        const step = parseInt(elementDom.step, 10) || 1; 
        const min = parseInt(elementDom.min, 10);
        const max = parseInt(elementDom.max, 10);

        let newValue = currentValue;
        if (type === 'up') {
            newValue = currentValue + step <= max ? currentValue + step : max;
        } else {
            newValue = currentValue - step >= min ? currentValue - step : min;
        }

        elementDom.value = newValue.toString();
    }
    return elementDom?.value;
}
