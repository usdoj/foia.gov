import 'test/setup';
import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import FoiaReportFormSectionThree from '../../components/foia_report_form_section_three';
import { reportActions } from '../../actions/report';

describe('Foia Report Form ', () => {
  describe('Fiscal Years form component', () => {
    let formElement;
    const fiscalYearsData = List(['2020', '2019', '2018']);
    const defaultSelectedFiscalYears = ['2019'];
    const mockClickEvent = {
      preventDefault: () => {},
    };

    beforeEach(() => {
      formElement = shallow((
        <FoiaReportFormSectionThree
          fiscalYears={fiscalYearsData}
          selectedFiscalYears={defaultSelectedFiscalYears}
        />
      ));

      sinon.spy(reportActions, 'updateSelectedFiscalYears');
    });

    afterEach(() => {
      reportActions.updateSelectedFiscalYears.restore();
    });

    it('displays the provided fiscal year options.', () => {
      const rendered = formElement.render();
      expect(rendered.find('input[type=checkbox]')).to.have.length(fiscalYearsData.count());
      fiscalYearsData.forEach((fiscalYear) => {
        expect(rendered.find(`input[value='${fiscalYear}']`).length).to.equal(1);
      });
    });

    it('checks the currently selected options.', () => {
      expect(formElement.render().find('input[value="2020"]:checked').length).to.equal(0);
      expect(formElement.render().find('input[value="2019"]:checked').length).to.equal(1);
    });

    it('can select all options', () => {
      const expectedArgument = [...fiscalYearsData];
      formElement
        .findWhere((el) => el.type() === 'a' && el.text().includes('Select All'))
        .simulate('click', mockClickEvent);
      expect(reportActions.updateSelectedFiscalYears.calledWith(expectedArgument)).to.be.true;
    });

    it('can deselect all options', () => {
      const expectedArgument = [];
      formElement
        .findWhere((el) => el.type() === 'a' && el.text().includes('Select None'))
        .simulate('click', mockClickEvent);
      expect(reportActions.updateSelectedFiscalYears.calledWith(expectedArgument)).to.be.true;
    });
  });
});
