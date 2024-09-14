import { auth } from '@wix/essentials';
import { items } from '@wix/data';
import { checkout } from '@wix/ecom';
import { CHECKOUT_COLLECTION_ID } from '../../consts';

checkout.onCheckoutCompleted(({ data }) => {
  auth.elevate(items.removeDataItem)(
    data.checkout?.purchaseFlowId ?? '',
    { dataCollectionId: CHECKOUT_COLLECTION_ID },
  );
});
