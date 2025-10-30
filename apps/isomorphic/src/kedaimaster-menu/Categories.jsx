// src/components/Categories.jsx
import React from 'react';
import styles from './page.module.css';

const Categories = () => {
  return (
    <section className={styles.categories}>
      <a href="#" className={styles.categoryItem}>
        <div className={`${styles.categoryIcon} ${styles.iconSemua}`}></div>
        <span>semua</span>
      </a>
      <a href="#" className={styles.categoryItem}>
        <div className={`${styles.categoryIcon} ${styles.iconCoffe}`}></div>
        <span>coffee</span>
      </a>
      <a href="#" className={styles.categoryItem}>
        <div className={`${styles.categoryIcon} ${styles.iconDrink}`}></div>
        <span>drink</span>
      </a>
      <a href="#" className={styles.categoryItem}>
        <div className={`${styles.categoryIcon} ${styles.iconSnack}`}></div>
        <span>snack</span>
      </a>
    </section>
  );
};

export default Categories;