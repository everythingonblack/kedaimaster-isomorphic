// src/components/Categories.jsx
import React from 'react';
import styles from './page.module.css';

const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  return (
    <section className={styles.categories}>
      
  <a href="#" className={styles.categoryItem}         onClick={() => handleCategoryClick('semua')}>
        <div className={`${styles.categoryIcon} ${styles.iconSemua}`}></div>
        <span>semua</span>
      </a>
      
      
      {categories?.map((category) => (
        <a
          href="#"
          key={category.id}
          className={`${styles.categoryItem} ${activeCategory === category.id ? styles.active : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <img src={category.imageUrl} alt={category.name} className={styles.categoryIcon} />
          <span>{category.name}</span>
        </a>
      ))}
    </section>
  );
};

export default Categories;