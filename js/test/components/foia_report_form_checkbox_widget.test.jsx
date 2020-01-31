import 'test/setup';
import React from 'react';
import { render } from 'enzyme';
import FoiaReportFormCheckboxWidget from '../../components/foia_report_form_checkbox_widget';

describe('Foia Report Form Checkbox Widget', () => {
  let checkedElement;
  let uncheckedElement;
  const checkedOptionValue = '123';
  const uncheckedOptionValue = '456';
  const onChangeHandler = sinon.spy();

  beforeEach(() => {
    checkedElement = render((
      <FoiaReportFormCheckboxWidget
        checked
        value={checkedOptionValue}
        onChange={onChangeHandler}
      />
    ));

    uncheckedElement = render((
      <FoiaReportFormCheckboxWidget
        checked={false}
        value={uncheckedOptionValue}
        onChange={onChangeHandler}
      />
    ));
  });

  it('should set id, name, and value attributes based on the value prop.', () => {
    expect(checkedElement.find(`#${checkedOptionValue}`).length).to.equal(1);
    expect(checkedElement.find(`[name='${checkedOptionValue}']`).length).to.equal(1);
    expect(checkedElement.find(`[value='${checkedOptionValue}']`).length).to.equal(1);
  });

  it('should set the checked attribute based on the checked prop.', () => {
    expect(checkedElement.find(':checked').length).to.equal(1);
    expect(uncheckedElement.find(':checked').length).to.equal(0);
  });

  it('should set a custom label based on the options.label prop.', () => {
    const expectedLabel = 'This is a custom label';
    const elementWithCustomLabel = render((
      <FoiaReportFormCheckboxWidget
        checked
        value={checkedOptionValue}
        onChange={onChangeHandler}
        options={{ label: expectedLabel }}
      />
    ));
    expect(elementWithCustomLabel.text()).to.equal(expectedLabel);
  });

  it('should set a fallback label based on the value prop.', () => {
    expect(checkedElement.text()).to.equal(checkedOptionValue);
  });
});
