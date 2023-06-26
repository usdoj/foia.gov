import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { addUrlProps, configureUrlQuery, UrlQueryParamTypes } from 'react-url-query';
import { createBrowserHistory } from 'history';

import { requestActions } from 'actions';
import LandingComponent from '../components/landing';
import agencyComponentStore from '../stores/agency_component';

const urlPropsQueryConfig = {
  typeQueryString: { type: UrlQueryParamTypes.string, queryParam: 'type' },
  idQueryString: { type: UrlQueryParamTypes.string, queryParam: 'id' },
};
const history = createBrowserHistory({
  basename: '/',
});
configureUrlQuery({ history });

class LandingPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const {
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    } = agencyComponentStore.getState();

    return {
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    };
  }

  componentDidMount() {
    // If there is any agency data, assume all the data is fetched.
    if (this.state.agencies.size) {
      return;
    }

    // Pre-fetch the list of agencies and components for typeahead
    requestActions.fetchAgencyFinderData();

    // Pre-fetch any component indicated by query strings.
    if (this.props.typeQueryString === 'component') {
      requestActions.fetchAgencyComponent(this.props.idQueryString)
        .then(requestActions.receiveAgencyComponent);
    }
  }

  render() {
    const {
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    } = this.state;
    const {
      idQueryString,
      typeQueryString,
      onChangeUrlQueryParams,
    } = this.props;

    return (
      <LandingComponent
        agencyFinderDataComplete={agencyFinderDataComplete}
        agencyFinderDataProgress={agencyFinderDataProgress}
        idQueryString={idQueryString}
        typeQueryString={typeQueryString}
        onChangeUrlQueryParams={onChangeUrlQueryParams}
      />
    );
  }
}

LandingPage.propTypes = {
  idQueryString: PropTypes.string,
  typeQueryString: PropTypes.string,
  onChangeUrlQueryParams: PropTypes.func.isRequired,
};

LandingPage.defaultProps = {
  idQueryString: null,
  typeQueryString: null,
};

export default addUrlProps({ urlPropsQueryConfig })(Container.create(LandingPage));
