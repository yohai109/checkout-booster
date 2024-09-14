import React, { type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { LeafIcon } from './leaf-icon';
import type { Settings } from '../types'

type Props = {
  settings: Settings;
  ecomId?: string;
  checkoutId?: string;
  checked?: boolean;
  refreshCheckout?: () => void;
};

export const CarbonOffset: FC<Props> = ({
  settings,
  ecomId,
  checkoutId,
  checked = false,
  refreshCheckout,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <input
          type='checkbox'
          defaultChecked={checked}
          onChange={async (e) => {
            if (ecomId) {
              await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/checkout`, {
                method: 'POST',
                body: JSON.stringify({
                  ecomId,
                  checkoutId,
                  shouldAdd: e.target.checked,
                }),
              });

              refreshCheckout?.();
            };
          }}
        />
        <p
          style={{
            color: settings.color,
            fontSize: '18px',
            fontFamily: 'Avenir',
          }}
        >
          {settings.title}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'yellow'
        }}
      >
        <LeafIcon
          color={settings.iconColor}
        />
        <p
          style={{
            color: settings.color,
            fontSize: '18px',
            fontFamily: 'Avenir',
            fontWeight: 'bold'
          }}
        >
          {`$${settings.amount}`}
        </p>
      </div>
    </div>
  );
};
