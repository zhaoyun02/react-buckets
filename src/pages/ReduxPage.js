import React, { Component } from "react";
// import store from "../store";
import store from "../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//装饰器是HOC
@connect(
  //mapStatetoProps
  (state) => ({ count: state.count }),
  //mapDispatchToProps object || function
  // {
  //   add: () => ({
  //     type: "ADD",
  //   }),
  // }
  //dispatch 函数共存写法
  (dispatch) => {
    //1.这种写法繁琐
    // const add = () => dispatch({ type: "ADD" });
    // const minus = () => dispatch({ type: "MINUS" });
    // return { dispatch, add };
    //2.根据bindActionCreators写
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  }
)
class ReduxPage extends Component {
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unSubscribe && this.unSubscribe();
  }
  addNum = () => {
    this.props.dispatch({ type: "ADD" });
  };
  addNum2 = () => {
    store.dispatch({ type: "ADD2" });
  };
  asyncAddNum = () => {
    setTimeout(() => {
      store.dispatch({ type: "ADD" });
    }, 1000);
  };
  asyncAddNum = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
      }, 1000);
    });
  };
  render() {
    console.log(this.props);
    const { count, add } = this.props;
    return (
      <div>
        <p>************react-redux***************</p>
        <h1>{count}</h1>
        <p onClick={this.addNum}>通过dispatch->add</p>
        <p onClick={add}>通过映射函数->add</p>
        <p>***************************</p>
        {/* <p>{store.getState().count}</p>
        <p onClick={this.addNum}>add</p>
        <p>{store.getState().count2}</p>
        <p onClick={this.addNum2}>add</p>
        <p onClick={this.asyncAddNum}>asyncAdd</p> */}
      </div>
    );
  }
}
export default ReduxPage;
