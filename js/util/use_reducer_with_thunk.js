/**
 * To be replaced with some Zustand pattern.
 */

import { useReducer } from 'react';

function useReducerWithThunk(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const customDispatch = (action) => {
    if (typeof action === 'function') {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };
  return [state, customDispatch];
}

export default useReducerWithThunk;
