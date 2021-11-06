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
      meetings: [],
      meeting_agenda: [],
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
            meetings: data.meetings,
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
            status: payload.status,
          });
        } else {
          Object.assign(this.state, {
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
