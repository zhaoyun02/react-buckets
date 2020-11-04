export default function combineReducers(reducers) {
  // console.log(reducers);
  return function combination(state = {}, action) {
    let nextState = {}; //存储新值
    let hasChanged = false; //记录数据是否变化
    // 遍历reducers对象，分别执行reduce，匹配到action则修改，否则返回default 并赋值给nextState[key]
    for (let key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }
    // 比较数据到长度是否变化
    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
    //数据变化返回新值，反之旧值
    return hasChanged ? nextState : state;
  };
}
