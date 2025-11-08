// src/components/Categories.jsx
import React, { useMemo } from 'react';
import styles from './page.module.css';

const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // sort categories alphabetically by name
  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }, [categories]);

  // generate warna bergradasi dari hijau ke berbagai warna
  const categoryColors = useMemo(() => {
    const colors = {};
    if (!sortedCategories || sortedCategories.length === 0) return colors;

    const startHue = 120; // hijau
    const endHue = 360; // akhir spektrum
    const step = (endHue - startHue) / sortedCategories.length;

    sortedCategories.forEach((category, index) => {
      const hue = startHue + step * index;
      colors[category.id] = `hsla(${hue}, 80%, 60%, 0.2)`; // transparan 20%
    });

    return colors;
  }, [sortedCategories]);

  return (
    <section className={styles.categories}>
      {/* "Semua" category */}
      <div
        className={styles.categoryItem}
        onClick={() => handleCategoryClick('semua')}
      >
        <div
          className={`${styles.categoryIcon} ${styles.iconSemua}`}
          style={{
            backgroundImage: `url('https://sixro-gun.sgp1.cdn.digitaloceanspaces.com/kedaimaster/sparkles_semua.png')`,
            backgroundColor:
              activeCategory === 'semua' ? '#6aff74' : 'rgb(0 236 255 / 20%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <span>semua</span>
      </div>

      {/* Category list */}
      {sortedCategories.map((category) => (
        <div
          key={category.id}
          className={`${styles.categoryItem} ${
            activeCategory === category.id ? styles.active : ''
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div
            className={styles.categoryIcon}
            style={{
              backgroundColor:
                activeCategory === category.id
                  ? '#6aff74'
                  : categoryColors[category.id],
              backgroundImage: category.imageUrl
                ? `url(${category.imageUrl})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <span>{category.name}</span>
        </div>
      ))}
    </section>
  );
};

export default Categories;
