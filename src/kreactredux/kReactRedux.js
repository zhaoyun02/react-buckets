import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
// import { bindActionCreators } from "redux";

// 1.创建context来传递store
const Context = React.createContext();

// 2.Provider包裹子组件，接收store
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => (
  props
) => {
  let mapStates = {};
  let mapDispatch = {};
  // 函数组件forceUpdate
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // 获取相同到store
  const store = useContext(Context);
  const { getState, dispatch, subscribe } = store;
  // 执行mapStateToProps，参数是所有到state,根据用户到解构返回对应到state
  mapStates = mapStateToProps(getState());
  mapDispatch = { dispatch };
  // 第二个参数到类型 Obj ｜ Fun
  if (typeof mapDispatchToProps === "object") {
    mapDispatch = bindActionCreators(mapDispatchToProps, dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    mapDispatch = mapDispatchToProps(dispatch);
  }

  // useLayoutEffect在dom渲染到浏览器后没有延迟，直接执行，useEffect会有延迟
  // 订阅行为需立刻执行所以不能用useEffect
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => forceUpdate());
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribe]);
  return <Component {...props} {...mapStates} {...mapDispatch} />;
};

// const bindActionCreator = (creator, dispatch) => {
//   return () => dispatch(creator());
// };

export const bindActionCreators = (creators, dispatch) => {
  const res = {};
  for (let key in creators) {
    const creator = creators[key];
    // res[key] = bindActionCreator(creator, dispatch);
    res[key] = (...args) => dispatch(creator(...args));
  }
  return res;
};
//-------------------------------HOOKS---------------------------------
const useStore = () => {
  const store = useContext(Context);
  return store;
};
// 强制更新到操作
const useForceUpdate = () => {
  const [, setstate] = useState(0);
  const update = useCallback(() => {
    setstate((prve) => prve + 1);
  }, []);
  return update;
};
export const useSelector = (callback) => {
  const store = useStore();
  const { getState, subscribe } = store;
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribe, forceUpdate]);
  return callback(getState());
};

export const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};
