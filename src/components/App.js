import React, { Component } from "react";
import AltheaNav from "./Nav";
import Frontpage from "./Frontpage";
import Neighbors from "./Neighbors";
import RouterSettings from "./RouterSettings";
import NetworkSettings from "./NetworkSettings";
import Payments from "./Payments";
import NoConnection from "./NoConnection";
import CameraUI from "./CameraUI";
import { actions, connect } from "../store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBan,
  faGlobeAmericas,
  faMinusCircle,
  faQrcode,
  faRoute,
  faSignal,
  faSitemap,
  faSync
} from "@fortawesome/free-solid-svg-icons";

library.add(faBan);
library.add(faGlobeAmericas);
library.add(faMinusCircle);
library.add(faRoute);
library.add(faQrcode);
library.add(faSignal);
library.add(faSitemap);
library.add(faSync);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    this.onHashChange();
    window.addEventListener("hashchange", this.onHashChange, false);
    actions.getSettings();
    actions.getInfo();
    this.timer = setInterval(actions.getVersion, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onHashChange = () => {
    let page = window.location.hash.substr(1);
    this.setState({ current: page });
    actions.changePage(page);
  };

  render() {
    let { current } = this.state;
    let container = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };

    let main = {
      width: "100%",
      maxWidth: 750,
      padding: 10
    };

    return (
      <React.Fragment>
        <div className="App">
          <AltheaNav current={current} />
          <NoConnection />
          <div style={container}>
            <div style={main}>
              <Page />
            </div>
          </div>
        </div>
        <CameraUI />
      </React.Fragment>
    );
  }
}

const Page = connect(["page"])(({ state, t }) => {
  switch (state.page) {
    case "router-settings":
      return <RouterSettings />;
    case "network-settings":
      return <NetworkSettings />;
    case "neighbors":
      return <Neighbors />;
    case "payments":
      return <Payments />;
    default:
      return <Frontpage />;
  }
});

export default App;
