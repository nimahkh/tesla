import { type Data, store } from "../../store";
import {updateResult} from "../../components/calculator.ts"
import Metrics100D from './metric-100D.json';
import MetricsP100D from './metric-P100D.json';

export interface HighwayData {
    kmh: number;
    kilometers: number;
}

interface CarDataSet {
    temp: number;
    wheelsize: number;
    ac: string;
    hwy: HighwayData[];
}

export function fetchData() {
    const res_100D = lookupCarData(store.getState(), Metrics100D);
    const res_P100D = lookupCarData(store.getState(), MetricsP100D)
    updateResult(res_100D, res_P100D);
}

function lookupCarData(state: Data, carDataSet: CarDataSet[]): HighwayData | undefined {
    const dataset = carDataSet.find(data =>
        data.temp === parseInt(state.temprature) &&
        data.wheelsize === state.wheel_size &&
        (state.acIsOn ? data.ac === "on" : data.ac === "off")
    );

    if (dataset) {
        return dataset.hwy.find(hwyData => hwyData.kmh === parseInt(state.speed));
    }

    return undefined;
}
