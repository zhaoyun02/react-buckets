import React, { Component } from "react";
// import store from "../store";
import store from "../store";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unSubscribe && this.unSubscribe();
  }
  addNum = () => {
    store.dispatch({ type: "ADD" });
  };
  addNum2 = () => {
    store.dispatch({ type: "ADD2" });
  };
  // asyncAddNum = () => {
  //   setTimeout(() => {
  //     store.dispatch({ type: "ADD" });
  //   }, 1000);
  // };
  asyncAddNum = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
      }, 1000);
    });
  };
  render() {
    return (
      <div>
        <p>{store.getState().count}</p>
        <p onClick={this.addNum}>add</p>
        <p>{store.getState().count2}</p>
        <p onClick={this.addNum2}>add</p>
        {/* <p onClick={this.asyncAddNum}>asyncAdd</p> */}
      </div>
    );
  }
}
