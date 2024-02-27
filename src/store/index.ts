import SatateManager from "../core/state_manager.ts";

export type Data = {
  wheel_size: number;
  temprature: string;
  speed: string;
  isAc: boolean;
  acIsOn: boolean;
  isHeat: boolean;
  heatIsOn: boolean;
  result: {
    _100d: {
      kmh: number;
      kilometers: number;
    };
    _p100d: {
      kmh: number;
      kilometers: number;
    };
  };
};

const data: Data = {
  wheel_size: 19,
  temprature: "-10",
  speed: "70",
  isAc: false,
  acIsOn: false,
  isHeat: true,
  heatIsOn: false,
  result: {
    _100d: { kmh: 0, kilometers: 0 },
    _p100d: { kmh: 0, kilometers: 0 },
  },
};

export const store = new SatateManager(data);
store.setState(data);
