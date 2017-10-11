import React, { Component } from 'react';


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
    return (
      <div className="sidebar">
        <ul className="sidebar_tab-controls">
          { this.renderTabControls() }
        </ul>
        <div className="sidebar_tabs">
          <section className={this.state.selectedTab === 0 ? 'tab_active' : ''}>
            <h3>Department of Justice</h3>
            <h2>Federal Bureau of Investigation</h2>
            <section>
              <ul className="sidebar_progress-bar">
                <li>
                  <a className="step_active" href="">
                    <span>Requester contact</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Request description</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Supporting documentation</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Processing fees</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Delivery method</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Submission and confirmation</span>
                  </a>
                </li>
              </ul>
            </section>
            <section>
              <h2>Tips for submitting</h2>
              <ul className="submission-help_tips">
                <li>
                  <h5>The person to reach out to about your FOIA request is:</h5>
                  <p className="submission-help_poc">Dennis Argall, Public Liason</p>
                  <p className="submission-help_phone">540-868-4516</p>
                  <p className="submission-help_email">
                    <a href="mailto:foiarequest@ic.fbi.gov">
                      foiarequest@ic.fbi.gov
                    </a>
                  </p>
                  <p>You can ask FOIA personnel about anything related to your
                  request, including whether what you’re asking for is clear.
                  You can also reach out to follow up on your request after
                  it’s been submitted.</p>
                </li>
                <li>
                  <h5>The description of records you are requesting is
                    very important.</h5>
                  <p className="submission-help_description">Be sure your
                    request is clear and as specific as as possible.</p>
                </li>
                <li>
                  <h5>Do research before you file.</h5>
                  <p className="submission-help_research">Sometime records and
                    information you’re looking for  is already public. You can
                    find out by reaching out to the agency you’re interested in
                    or by visiting their website or their FOIA reading room.</p>
                </li>
              </ul>
            </section>
          </section>
          <section className={this.state.selectedTab === 1 ? 'tab_active' : ''}>
            <h3>Department of Justice</h3>
            <h2>Federal Bureau of Investigation</h2>
            <section className="submission-help_processing-time">
              <h5>Median processing time</h5>
              <p>15 working days for simple requests</p>
              <p>187 working days for complex requests</p>
            </section>
            <section className="submission-help_agency-mission">
              <h5>Agency mission</h5>
              <p>As an intelligence-driven and a threat-focused national
                security organization with both intelligence and law enforcement
                responsibilities, the mission of the FBI is to protect and
                defend the United States against terrorist and foreign
                intelligence threats, to uphold and enforce the criminal laws of
                the United States, and to provide leadership and criminal justice
                services to federal, state, municipal, and international agencies
                and partners.</p>
            </section>
            <section>
              <h5 className="submission-help_first-party-requests">
                First party requests
              </h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor.</p>
              <h5 className="submission-help_expedited processing">
                Expedited processing
              </h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor.</p>
            </section>
            <section className="submission-help_contact">
              <h5>Contact</h5>
              <p className="submission-help_website">fbi.gov</p>
              <p className="submission-help_poc">Dennis Argall, Public Liason</p>
              <p className="submission-help_phone">540-868-4516</p>
              <p className="submission-help_email">
                <a href="mailto:foiarequest@ic.fbi.gov">foiarequest@ic.fbi.gov</a>
              </p>
              <address className="submission-help_mailing">
                <p>David M. Hardy</p>
                <p>Chief, Record/Information Dissemination Section,
                  Records Management Division</p>
                <p>170 Marcel Drive</p>
                <p>Winchester, VA 22602-4843</p>
              </address>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default Tabs;
