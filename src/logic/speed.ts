import { fetchData } from "../api/data/fetchData.ts";
import { updateSpeed } from "../components/speed.ts";
import { handleStepperButton } from "./stepper.ts";
import { handStepperE11, isIE11 } from "../utilities/ie11";

export function handleSpeed(type: "up" | "down") {
  let speed = "";
  const speedDom = document.querySelector("#speed") as HTMLInputElement;
  if (isIE11()) {
    speed = handStepperE11(type, speedDom);
  } else {
    if (type === "up") {
      speedDom?.stepUp();
    } else {
      speedDom?.stepDown();
    }
    speed = speedDom?.value;
  }
  updateSpeed().handleUpdateSpeed(speed);
  handleStepperButton("speed", { value: speed, min: 70, max: 140 });
  fetchData();
}
