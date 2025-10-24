// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './page.css';
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
    // Optionally re-fetch products or perform other actions after a successful transaction
    // For now, we'll just reset the cart and close the FAB
    setCart({});
    // If you want to re-fetch products after a transaction, you can call fetchProducts here
    // fetchProducts();
  };

  if (loading) {
    return <div className="mobile-container">Loading menu...</div>;
  }

  if (error) {
    return <div className="mobile-container">Error: {error.message}</div>;
  }

  return (
    <>
      <div className="mobile-container">
        <Header />
        <main className="main-content">
          <MusicPlayer />
          <Categories />
          <MenuList
            menuItems={menuItemsData}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
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
    </>
  );
};

export default App;