"use client";
import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const GlobalStateProvider = (props: Props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default GlobalStateProvider;
