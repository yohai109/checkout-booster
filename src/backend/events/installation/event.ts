import { auth } from '@wix/essentials';
import { collections } from '@wix/data';
import { appInstances } from '@wix/app-management';
import { CHECKOUT_COLLECTION_ID, SETTINGS_COLLECTION_ID } from '../../consts';

appInstances.onAppInstanceInstalled(() => {
  auth.elevate(collections.createDataCollection)({
    _id: SETTINGS_COLLECTION_ID,
    displayName: "Carbon Offset Settings",
    fields: [
      { key: 'title', type: collections.Type.TEXT },
      { key: 'amount', type: collections.Type.NUMBER },
      { key: 'color', type: collections.Type.TEXT },
      { key: 'iconColor', type: collections.Type.TEXT },
    ],
    permissions: {
      insert: collections.Role.ANYONE,
      read: collections.Role.ANYONE,
      remove: collections.Role.ANYONE,
      update: collections.Role.ANYONE,
    },
    plugins: [{
      type: collections.PluginType.SINGLE_ITEM,
      singleItemOptions: {
        singleItemId: "SINGLE_ITEM_ID"
      },
    }],
  });

  auth.elevate(collections.createDataCollection)({
    _id: CHECKOUT_COLLECTION_ID,
    displayName: "Carbon Offset Checkout",
    fields: [
      { key: 'checkoutId', type: collections.Type.TEXT },
      { key: 'shouldAdd', type: collections.Type.BOOLEAN },
    ],
    permissions: {
      insert: collections.Role.ANYONE,
      read: collections.Role.ANYONE,
      remove: collections.Role.ANYONE,
      update: collections.Role.ANYONE,
    },
  });
});
