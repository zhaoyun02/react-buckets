export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    // mid(midApi) => 中间件是一个函数，返回值是一个函数形如: next => action => {}
    const midwareChains = middlewares.map((mid) => mid(midApi));
    // compose 返回的结果是函数,这个函数会根据传参数的类型来决定如何操作，是函数则执行函数，是对象则指定嵌套的内容
    dispatch = compose(...midwareChains)(dispatch);
    console.log(dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

// 聚合函数：函数执行的结果当作另一个函数的参数 若func = 【f1,f2,f3】,则返回结果因该是f1的执行结果，
// 只不过在applyMiddleware中，f1的返回结果是哥函数，这就是扩展出来的dispatch
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
//   return funcs.reduce((a, b) => {
//     console.log(a);
//     console.log(b);
//     return (...args) => {
//       console.log(args);
//       return a(b(...args));
//     };
//   });
}
