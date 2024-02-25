export function handleStepperButton(DOMKey: string, config: { value: string, min: number, max: number }) {
    const upButton = document.querySelector(`#${DOMKey}-up`);
    const downButton = document.querySelector(`#${DOMKey}-down`);
    if (config.value === config.min.toString()) {
        downButton?.setAttribute('disabled', 'true');
    } else {
        downButton?.removeAttribute('disabled');
    }
    if (config.value === config.max.toString()) {
        upButton?.setAttribute('disabled', 'true');
    } else {
        upButton?.removeAttribute('disabled');
    }
}
