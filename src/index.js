import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { Provider } from "react-redux";
import { Provider } from "./kreactredux/kReactRedux";
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10

// // 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));
// // expected output: 15

// function f1(arg) {
//   console.log("f1", arg + 1);
//   return arg + 1;
// }
// function f2(arg) {
//   console.log("f2", arg + 2);
//   return arg + 2;
// }
// function f3(arg) {
//   console.log("f3", arg + 3);
//   return arg + 3;
// }

// // step1: 啰嗦
// f1("omg");
// f2("omg");
// f3("omg");

// // step2 洋葱 不太便于维护
// f1(f2(f3("omg")));

// //step3
// let res = compose(f1,f2,f3)("omg");
// let res = compose(f1, f2, f3);

// console.log("res", res); //sy-log

// 返回一个函数
// function compose(...funcs) {
//   // console.log(funcs);
//   if (funcs.length === 0) {
//     return (arg) => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   // func:[f1,f2,f3]
//   // return funcs.reduce((a, b) => (...args) => a(b(...args))); //等同下面代码
//   return funcs.reduce((a, b) => {
//     console.log(a, b);
//     return (...args) => {
//       console.log(args);
//       return a(b(...args));
//     };
//   });
// }
