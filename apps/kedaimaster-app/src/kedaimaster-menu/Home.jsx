import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import CategoryNav from './CategoryNav';
import MenuSection from './MenuSection';
import { menuItemsData } from './data/menuData';

const Home = ({ cart, handleAddToCart, handleIncreaseQuantity, handleDecreaseQuantity }) => {
  const [activeCategory, setActiveCategory] = useState('semua');

  const filteredMenuItems = activeCategory === 'semua'
    ? menuItemsData
    : menuItemsData.filter(item => item.category === activeCategory); // Assuming menuItemsData will have a category field

  return (
    <main className="main-content">
      <MusicPlayer />
      <CategoryNav activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      <MenuSection
        menuItems={filteredMenuItems}
        cart={cart}
        onAddToCart={handleAddToCart}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
      />
    </main>
  );
};

export default Home;