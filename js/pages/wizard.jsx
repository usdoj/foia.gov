import React, { useMemo } from 'react';
import wizardPages, { WizardCtx } from '../components/wizard_pages';
import useReducerWithThunk from '../util/use_reducer_with_thunk';

const initState = {
  loading: false,
  page: 'One',
};

function reducer(state, action) {
  switch (action.type) {
    case 'API_CALL':
      return { ...state, loading: true };
    case 'API_SUCCESS':
      return {
        ...state,
        loading: false,
        page: state.page === 'One' ? 'Two' : 'Three',
      };
    default:
      return state;
  }
}

function WizardPage() {
  // To be replaced by Zustand store hooks
  const [state, dispatch] = useReducerWithThunk(reducer, initState);

  const ctxValue = useMemo(() => ({
    loading: state.loading,
    callApi() {
      dispatch(async () => {
        dispatch({ type: 'API_CALL' });
        // Delay
        setTimeout(() => dispatch({ type: 'API_SUCCESS' }), 1e3);
      });
    },
  }), [state]);
  const ActivePageComponent = wizardPages[state.page];

  return (
    <WizardCtx.Provider value={ctxValue}>
      <div className="usa-grid usa-section-dark">
        <div className="usa-width-one-whole">
          <ActivePageComponent />
        </div>
      </div>
    </WizardCtx.Provider>
  );
}

WizardPage.propTypes = {};

WizardPage.defaultProps = {};

export default WizardPage;
