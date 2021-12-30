/*
 * Chief FOIA Officers Council Store.
 *
 * Stores a single FOIA request and manages the FOIA request form.
 */

import { Store } from 'flux/utils';
import { types } from '../actions';
import dispatcher from '../util/dispatcher';

class ChiefFOIAOfficersCouncilStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      title: '',
      body: '',
      meeting_heading: '',
      committees: [],
      meetingsUpcoming: [],
      meetingsPast: [],
      attachments: [],
      workingGroups: [],
      meeting_agenda: [],
      hasData: null,
      status: null,
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.REQUEST_CFO_COUNCIL_RECEIVE : {
        const data = payload.councilData;
        if (Object.values(data).length) {
          Object.assign(this.state, {
            title: data.title,
            body: data.body,
            committees: data.committees,
            meetingsUpcoming: data.meetings.upcoming,
            meetingsPast: data.meetings.past,
            hasData: true,
          });
        } else {
          Object.assign(this.state, {
            hasData: false,
          });
        }
        this.__emitChange();
        break;
      }
      case types.REQUEST_CFOC_MEETING_RECEIVE: {
        const data = payload.meetingData;

        if (Object.values(data).length) {
          Object.assign(this.state, {
            title: data.meeting_title,
            body: data.meeting_body,
            meeting_heading: data.meeting_heading,
            meeting_agenda: data.meeting_agenda,
            hasData: true,
            status: payload.status,
          });
        } else {
          Object.assign(this.state, {
            hasData: false,
            status: payload.status,
          });
        }
        this.__emitChange();
        break;
      }
      case types.REQUEST_CFOC_COMMITTEE_RECEIVE: {
        const data = payload.committeeData;

        if (Object.values(data).length) {
          Object.assign(this.state, {
            title: data.committee_title,
            body: data.committee_body,
            attachments: data.committee_attachments,
            working_groups: data.working_groups,
            hasData: true,
            status: payload.status,
          });
        } else {
          Object.assign(this.state, {
            hasData: false,
            status: payload.status,
          });
        }
        this.__emitChange();
        break;
      }
      case types.REQUEST_CFOC_PAGE_RECEIVE: {
        const data = payload.pageData;

        if (Object.values(data).length) {
          Object.assign(this.state, {
            title: data.page_title,
            body: data.page_body,
            attachments: data.page_attachments,
            hasData: true,
            status: payload.status,
          });
        } else {
          Object.assign(this.state, {
            hasData: false,
            status: payload.status,
          });
        }
        this.__emitChange();
        break;
      }
      default: {
        break;
      }
    }
  }
}

const chiefFOIAOfficersCouncilStore = new ChiefFOIAOfficersCouncilStore(dispatcher);
export default chiefFOIAOfficersCouncilStore;

export {
  ChiefFOIAOfficersCouncilStore,
};
