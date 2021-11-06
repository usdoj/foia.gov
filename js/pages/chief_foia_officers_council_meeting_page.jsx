import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';
import { requestActions } from '../actions';
import CFOCPageMeetingDetailComponent from '../components/cfoc_page_meeting_detail';
import NotFoundPage from './not_found';

class ChiefFoiaOfficersCouncilMeetingPage extends Component {
  static getStores() {
    return [chiefFOIAOfficersCouncilStore];
  }

  static calculateState() {
    const {
      title,
      body,
      meeting_heading,
      meeting_agenda,
      status,
    } = chiefFOIAOfficersCouncilStore.getState();

    return {
      title,
      body,
      meeting_heading,
      meeting_agenda,
      status,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    requestActions.fetchCFOCouncilMeetingData(id);
  }

  render() {
    const {
      title,
      body,
      meeting_heading,
      meeting_agenda,
      status,
    } = this.state;
    const notFound = status === 404;

    return (
      !notFound
        ? (
          <div className="chief-foia-officers-council-meeting-detail">
            <CFOCPageMeetingDetailComponent
              title={title}
              body={body}
              heading={meeting_heading}
              agenda={meeting_agenda}
            />
          </div>
        )
        : (
          <NotFoundPage />
        )
    );
  }
}

ChiefFoiaOfficersCouncilMeetingPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

ChiefFoiaOfficersCouncilMeetingPage.defaultProps = {
  match: {
    params: {},
  },
};


export default withRouter(Container.create(ChiefFoiaOfficersCouncilMeetingPage, {
  withProps: true,
}));

