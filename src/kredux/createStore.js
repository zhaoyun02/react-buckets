export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // enhancer是applyMiddleware返回的函数
    // enhancer用于加强dispatch，所以将createStore当参数为了获取dispatch
    return enhancer(createStore)(reducer);
  }
  let currentState;
  // 保存用户的订阅函数
  let cbs = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    // 更新当前的state
    currentState = reducer(currentState, action);
    // 执行订阅函数
    cbs.forEach((cb) => cb());
  }
  //订阅
  function subscribe(cb) {
    //保存
    cbs.push(cb);
    //返回取消订阅的函数 清空可用splice filter
    return () => {
      cbs = [];
    };
  }
  //默认执行一次，展示默认数据
  dispatch({ type: "XXXXX" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
