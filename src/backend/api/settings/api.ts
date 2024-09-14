import { getDataFromCollection, upsertDataToCollection } from '../../database';
import { SETTINGS_COLLECTION_ID, DEFAULT_SETTING } from '../../consts';
import type { Settings } from '../../../types';

export async function GET(req: Request) {
  const settingsCollection = await getDataFromCollection({
    dataCollectionId: SETTINGS_COLLECTION_ID,
  });

  const settingsData = settingsCollection.items[0]?.data as Settings;
  const settings: Settings = {
    title: settingsData?.title || DEFAULT_SETTING.title,
    amount: settingsData?.amount || DEFAULT_SETTING.amount,
    color: settingsData?.color || DEFAULT_SETTING.color,
    iconColor: settingsData?.iconColor || DEFAULT_SETTING.iconColor,
  };

  return new Response(JSON.stringify(settings));
};

export async function POST(req: Request) {
  const settingsData = await req.json() as Settings;

  try {
    await upsertDataToCollection({
      dataCollectionId: SETTINGS_COLLECTION_ID,
      item: {
        _id: 'SINGLE_ITEM_ID',
        data: settingsData,
      },
    });

    return new Response('Success');
  } catch (error) {
    return new Response('Error');
  };
};
