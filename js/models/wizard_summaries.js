import { summary } from '../util/wizard_helpers';

/**
 * Default summary that shows user their query plus resources found by the model.
 */
export const defaultSummary = summary();

/**
 * Summary if the intent model returns stateOrLocalFlow.
 */
export const stateLocalSummary = summary('m49');

export const stateOrLocalFlow = 'State or Local';
