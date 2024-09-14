import { auth } from '@wix/essentials';
import { items } from '@wix/data';
import { additionalFees } from '@wix/ecom/service-plugins/context';
import { CHECKOUT_COLLECTION_ID, SETTINGS_COLLECTION_ID, DEFAULT_SETTING } from '../../../consts';
import type { Settings } from '../../../../types';

const getCheckoutDataFromCollection = async (ecomId: string) => {
  try {
    const { data } = await auth.elevate(items.getDataItem)(
      ecomId,
      { dataCollectionId: CHECKOUT_COLLECTION_ID },
    );

    return data;
  } catch (error) { }
};

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    const checkoutData = await getCheckoutDataFromCollection(request.purchaseFlowId ?? '');

    if (checkoutData?.shouldAdd) {
      const settingsCollection = await auth.elevate(items.queryDataItems)({
        dataCollectionId: SETTINGS_COLLECTION_ID,
      }).find();

      const settingsData = settingsCollection.items[0]?.data as Settings;

      return {
        additionalFees: [{
          name: 'Carbon Offset',
          code: 'carbon-offset-fee',
          price: `${settingsData.amount ?? DEFAULT_SETTING.amount}`,
        }],
        currency: metadata.currency!,
      };
    } else {
      return {
        additionalFees: [],
        currency: metadata.currency!,
      };
    };
  },
});
