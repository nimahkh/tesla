import { HighwayData } from "../api/data/fetchData";

type PropsData = HighwayData | undefined;
export function updateResult(res_100D: PropsData, res_P100D: PropsData): void {
    const _100d_km = document.getElementById('_100d_km');
    const _p100d_km = document.getElementById('_p100d_km');

    if (_100d_km) {
        _100d_km.innerText = res_100D?.kilometers.toString() || 'N/A';
    }
    if (_p100d_km) {
        _p100d_km.innerText = res_P100D?.kilometers.toString() || 'N/A';
    }
}
