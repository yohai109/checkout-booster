import { upsertDataToCollection, safelyGetItemFromCollection } from '../../database';
import { CHECKOUT_COLLECTION_ID } from '../../consts';

export async function GET(req: Request) {
  const ecomId = new URL(req.url).searchParams.get('ecomId') as string;
  const checkoutData = await safelyGetItemFromCollection({
    itemId: ecomId,
    dataCollectionId: CHECKOUT_COLLECTION_ID,
  });

  return new Response(JSON.stringify(checkoutData ?? {}));
};

export async function POST(req: Request) {
  const { ecomId, checkoutId, shouldAdd } = await req.json();

  try {
    await upsertDataToCollection({
      dataCollectionId: CHECKOUT_COLLECTION_ID,
      item: {
        _id: ecomId,
        data: {
          checkoutId,
          shouldAdd,
        },
      },
    });

    return new Response('Success');
  } catch (error) {
    console.log(error)
    return new Response('Error')
  };
};