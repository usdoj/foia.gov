import { expect } from 'chai';
import sinon from 'sinon';

import currentDate from '../../util/current_date';

describe('current_date', () => {
  const { getCurrentDate } = currentDate;

  let clock;

  afterEach(() => {
    if (clock) {
      clock.restore();
      clock = null;
    }
  });

  it('zero-pads a single-digit day of month', () => {
    // June 7, 2026
    clock = sinon.useFakeTimers(new Date(2026, 5, 7).getTime());
    expect(getCurrentDate('-')).to.equal('2026-06-07');
  });

  it('zero-pads single-digit month and day together', () => {
    // January 5, 2026
    clock = sinon.useFakeTimers(new Date(2026, 0, 5).getTime());
    expect(getCurrentDate('-')).to.equal('2026-01-05');
  });

  it('leaves a two-digit day unchanged', () => {
    // June 15, 2026
    clock = sinon.useFakeTimers(new Date(2026, 5, 15).getTime());
    expect(getCurrentDate('-')).to.equal('2026-06-15');
  });
});
