import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';
import { requestActions } from '../actions';
import NotFoundPage from './not_found';

class ChiefFoiaOfficersCouncilBasePage extends Component {
  static getStores() {
    return [chiefFOIAOfficersCouncilStore];
  }

  static calculateState() {
    const {
      title,
      body,
      status,
    } = chiefFOIAOfficersCouncilStore.getState();

    return {
      title,
      body,
      status,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    requestActions.fetchCFOCouncilCommitteeData(id);
  }

  render() {
    const {
      title,
      body,
      status,
    } = this.state;
    const notFound = status === 404 || status === 500;

    return (
      !notFound
        ? (
          <div className={'chief-foia-officers-council-page-detail cfoc-page'}>
            <p>Hello World.</p>
          </div>
        )
        : (
          <NotFoundPage />
        )
    );
  }
}

ChiefFoiaOfficersCouncilBasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

ChiefFoiaOfficersCouncilBasePage.defaultProps = {
  match: {
    params: {},
  },
};


export default withRouter(Container.create(ChiefFoiaOfficersCouncilBasePage, {
  withProps: true,
}));

