import React, { type FC } from 'react';
import styles from './plugin-skeleton.module.css';

export const PluginSkeleton: FC = () => {
  return (
    <div className={styles.skeleton} style={{ width: '100%', height: '24px' }}></div>
  );
};
