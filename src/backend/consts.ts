import type { Settings } from "../types";

export const SETTINGS_COLLECTION_ID = 'carbon-offset-settings';
export const CHECKOUT_COLLECTION_ID = 'carbon-offset-checkout';
export const DEFAULT_SETTING: Settings = {
  title: 'Make it carbon neutral',
  amount: 2,
  color: '#000000',
  iconColor: '#000000',
};
