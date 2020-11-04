// import { createStore, applyMiddleware, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "../kredux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// 定义修改store state的规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}
function count2Reducer(state = 0, action) {
  switch (action.type) {
    case "ADD2":
      return state + 2;
    case "MINUS2":
      return state - action.payload || 2;
    default:
      return state;
  }
}
function logger({ dispatch, getState }) {
  return (next) => {
    console.log("logger next", next);
    return (action) => {
      console.log("logger action", action);
      console.log("++++++++++++++++++++++++++"); //sy-log

      console.log(action.type + "执行了！！！"); //sy-log

      const prevState = getState();
      console.log("prev state", prevState); //sy-log

      // todo     next就是dispatch
      const returnValue = next(action);

      const nextState = getState();
      console.log("prev state", nextState); //sy-log

      console.log("++++++++++++++++++++++++++"); //sy-log

      return returnValue;
    };
  };
}

function thunk({ dispatch, getState }) {
  return (next) => {
    // console.log("thunk next", next);
    return (action) => {
      console.log("thunk action", action);
      // action 数据类型是对象or函数
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      //这个next相当于其他中间件的返回值 例如：logger返回的 action => {}
      return next(action);
    };
  };
}
const store = createStore(
  combineReducers({ count: countReducer, count2: count2Reducer }),
  applyMiddleware(thunk)
);
export default store;
