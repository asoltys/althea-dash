import { initStore } from "react-stateful";
import FakeBackend from "../libs/backend";

const backend = new FakeBackend("url");

const store = {
  initialState: {
    page: "",
    wifiSettings: [],
    neighborData: [],
    info: { balance: 0 }
  },
  actions: {
    changePage: (_, page) => ({ page: page }),
    getWifiSettings: async ({ state }) => {
      return { wifiSettings: await backend.getWifiSettings() };
    },
    saveWifiSetting: async ({ state, setState }, setting) => {
      setState({
        wifiSettings: state.wifiSettings.map(s => {
          if (s.device_name === setting.device_name) {
            return setting;
          }
          return s;
        })
      });
      await backend.setWifiSettings(setting);
    },
    getNeighborData: async ({ state }) => {
      return { neighborData: await backend.getNeighborData() };
    },
    getInfo: async () => {
      return { info: await backend.getInfo() };
    }
  }
};

export const {
  Provider,
  Consumer,
  actions,
  getState,
  connect,
  subscribe
} = initStore(store);
