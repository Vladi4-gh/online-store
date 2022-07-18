import React from 'react';
import styles from './styles.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <a className={styles['author']} href="https://github.com/Vladi4-gh">
        GitHub Vladi4-gh, 2022
      </a>
      <a className={styles['rss-logo']} href="https://rs.school/js/"></a>
    </footer>
  );
};
