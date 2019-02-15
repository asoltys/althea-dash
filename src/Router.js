import React, { useEffect } from "react";

import {
  Billing,
  Frontpage,
  AdvancedSettings,
  RouterSettings,
  NetworkSettings,
  Payments
} from "./pages";

let routes = {
  dashboard: <Frontpage />,
  "router-settings": <RouterSettings />,
  "network-settings": <NetworkSettings />,
  billing: <Billing />,
  payments: <Payments />,
  advanced: <AdvancedSettings />
};

export default ({ page, setPage }) => {
  const getPage = () => {
    let page = window.location.hash.substr(1);
    setPage(page);
  };

  useEffect(() => {
    getPage();
    window.addEventListener("hashchange", getPage, false);
  }, []);

  if (routes[page]) return routes[page];
  else return <Frontpage />;
};