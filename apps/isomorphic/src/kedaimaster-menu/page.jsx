// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { getAllProducts } from '../kedaimaster-api/productsApi.js';

import Header from './Header';
import Categories from './Categories';
import MenuList from './MenuList';
import CartFAB from './CartFAB';
import DeleteModal from './DeleteModal';
import MusicPlayer from './MusicPlayer';

const App = () => {
  const [cart, setCart] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [menuItemsData, setMenuItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setMenuItemsData(products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price?.unitPrice || 0, // Default to 0 if unitPrice is undefined
          image: product.imageUrl,
          description: product.description || '',
        })));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Handler untuk memodifikasi state cart
  const handleAddToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: { ...item, quantity: 1 }
    }));
  };

  const handleIncreaseQuantity = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: { ...prevCart[itemId], quantity: prevCart[itemId].quantity + 1 }
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    const currentItem = cart[itemId];
    if (currentItem.quantity > 1) {
      setCart(prevCart => ({
        ...prevCart,
        [itemId]: { ...prevCart[itemId], quantity: prevCart[itemId].quantity - 1 }
      }));
    } else {
      setItemToDelete(currentItem);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteItem = () => {
    if (itemToDelete) {
      const newCart = { ...cart };
      delete newCart[itemToDelete.id];
      setCart(newCart);
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleResetCart = () => {
    setCart({});
  };

  const handleTransactionComplete = () => {
    setCart({});
    // fetchProducts(); // Uncomment if you want to re-fetch products
  };

  if (loading) {
    return <div className={styles.mobileContainer}>Loading menu...</div>;
  }

  if (error) {
    return <div className={styles.mobileContainer}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.mobileContainer}>
        <Header />
        <main className={styles.mainContent}>
          <MusicPlayer />
          <Categories />
          <MenuList
            menuItems={menuItemsData}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
          
      <div className="
    h-[46px]
    text-center
">©KEDAIMASTER.COM</div>
        </main>
      </div>

      <CartFAB
        cart={cart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onResetCart={handleResetCart}
        isDeleteModalOpen={isDeleteModalOpen}
        onTransactionComplete={handleTransactionComplete}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        item={itemToDelete}
        onConfirm={confirmDeleteItem}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default App;