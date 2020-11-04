import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ReduxHookPage() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, [dispatch]);
  return (
    <div>
      <p>{count}</p>
      <p onClick={add}>add</p>
    </div>
  );
}
