import React, { useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'flux/utils';
import wizardPages from '../components/wizard_pages';
import { useWizard } from '../stores/wizard_store';
import AppContainer from '../components/wizard_layout_app_container';
import agencyComponentStore from '../stores/agency_component';
import { requestActions } from '../actions';

/**
 * Real page component
 */
function WizardPage({ flatList }) {
  // Start loading UI stuff...
  const { actions, activity } = useWizard();

  useEffect(() => {
    actions.initLoad();
  }, []);

  useEffect(() => {
    if (flatList.length > 0) {
      actions.setFlatList(flatList);
    }
  }, [flatList]);

  // Scroll to top whenever page changes
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      // NOOP
    }
  }, [activity]);

  const ActivePageComponent = wizardPages[activity.type];

  return (
    <AppContainer>
      <ActivePageComponent />
    </AppContainer>
  );
}

WizardPage.propTypes = {
  flatList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Wrapper to load flatList from the agency model. Component needed because there's
 * no hooks version of Container.create().
 */
class WizardPageWrapper extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    return {
      flatList: agencyComponentStore.getState().flatList,
    };
  }

  componentDidMount() {
    // Fetch the data to make flatList available.
    requestActions.fetchAgencyFinderData();
  }

  render() {
    return (
      // @ts-ignore
      <WizardPage flatList={this.state.flatList} />
    );
  }
}

WizardPageWrapper.propTypes = {};

export default Container.create(WizardPageWrapper);
