import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgencyComponent } from '../models';
import AgencyComponentProcessingTime from './agency_component_processing_time';
import ContactInformation from './contact_information';
import ProgressBar from './progress_bar';
import domify from '../util/request_form/domify';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      tabControls: ['Request directions', 'Agency information'],
    };
    this.handleClickTab = this.handleClickTab.bind(this);
    this.renderTabControls = this.renderTabControls.bind(this);
    this.renderTabControl = this.renderTabControl.bind(this);
  }

  handleClickTab(index, event) {
    event.preventDefault();
    this.setState({
      selectedTab: index,
    });
  }

  renderTabControl(name, index) {
    const key = `tab-control_${index}`;
    const className = (index === this.state.selectedTab) ? 'tab_active' : '';
    return (
      <li
        key={key}
        className={className}
      >
        <a
          role="tab"
          tabIndex="0"
          onClick={this.handleClickTab.bind(this, index)}
        >
          {name}
        </a>
      </li>
    );
  }

  renderTabControls() {
    const tabControls = this.state.tabControls.map((name, index) => (
      this.renderTabControl(name, index)
    ));
    return (
      tabControls
    );
  }
  render() {
    const agencyComponent = this.props.agencyComponent.toJS();
    const requestForm = this.props.requestForm;

    return (
      <aside className="sidebar print-hide">
        <ul className="sidebar_tab-controls">
          { this.renderTabControls() }
        </ul>
        <div className="sidebar_tabs">
          <section className={this.state.selectedTab === 0 ? 'tab_active panel_dark-color' : 'panel_dark-color'}>
            <h3>{ agencyComponent.agency.name }</h3>
            <h2>{ agencyComponent.title }</h2>
            <section>
              <ProgressBar sections={requestForm.sections} />
            </section>
            <section>
              <h2>Tips for submitting</h2>
              <ul className="submission-help_tips">
                <li>
                  <h4>The person to reach out to about your FOIA request is:</h4>
                  <ContactInformation agencyComponent={agencyComponent} />
                  <p>
                    You can ask FOIA personnel about anything related to your
                    request, including if what you’re asking for is clear.
                    You can also reach out to follow up on your request after
                    it’s been submitted.
                  </p>
                </li>
                <li>
                  <h4>The description of records you are requesting is
                    very important.</h4>
                  <p className="submission-help_description">Be sure your
                    request is clear and as specific as as possible.</p>
                </li>
                <li>
                  <h4>Do research before you file.</h4>
                  <p className="submission-help_research">Sometime records and
                    information you’re looking for  is already public. You can
                    find out by reaching out to the agency you’re interested in
                    or by visiting their website or their FOIA library.</p>
                </li>
              </ul>
            </section>
          </section>
          <section className={this.state.selectedTab === 1 ? 'tab_active panel_light-color' : 'panel_light-color'}>
            <h3>{ agencyComponent.agency.name }</h3>
            <h2>{ agencyComponent.title }</h2>
            { agencyComponent.request_data_year &&
              <section className="submission-help_processing-time">
                <AgencyComponentProcessingTime agencyComponent={agencyComponent} />
              </section>
            }
            <section className="submission-help_agency-mission">
              <h4>Agency mission</h4>
              <p>{ domify(AgencyComponent.agencyMission(agencyComponent)) }</p>
            </section>
            <section className="submission-help_contact">
              <h4>Contact</h4>
              <ContactInformation agencyComponent={agencyComponent} />
            </section>
          </section>
        </div>
      </aside>
    );
  }
}

Tabs.propTypes = {
  agencyComponent: PropTypes.instanceOf(AgencyComponent).isRequired,
  requestForm: PropTypes.object.isRequired,
};

export default Tabs;
