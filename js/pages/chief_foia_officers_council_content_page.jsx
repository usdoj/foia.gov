import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';
import { requestActions } from '../actions';
import CFOCPageContentComponent from '../components/cfoc_page_content';
import NotFoundPage from './not_found';

class ChiefFoiaOfficersCouncilContentPage extends Component {
  static getStores() {
    return [chiefFOIAOfficersCouncilStore];
  }

  static calculateState() {
    const {
      title,
      body,
      hasData,
      status,
    } = chiefFOIAOfficersCouncilStore.getState();

    return {
      title,
      body,
      hasData,
      status,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    requestActions.fetchCFOCouncilPageData(id);
  }

  componentDidUpdate() {
    // Run the external link script after data is fetched
    // eslint-disable-next-line no-undef
    runExtlink();
  }

  render() {
    const {
      title,
      body,
      hasData,
      status,
    } = this.state;
    const notFound = status === 404 || status === 500 || hasData === false;

    return (
      !notFound
        ? (
          <div className="chief-foia-officers-council-content-detail cfoc-page">
            <CFOCPageContentComponent title={title} body={body} />
          </div>
        )
        : (
          <NotFoundPage />
        )
    );
  }
}

ChiefFoiaOfficersCouncilContentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

ChiefFoiaOfficersCouncilContentPage.defaultProps = {
  match: {
    params: {},
  },
};

export default withRouter(Container.create(ChiefFoiaOfficersCouncilContentPage, {
  withProps: true,
}));
