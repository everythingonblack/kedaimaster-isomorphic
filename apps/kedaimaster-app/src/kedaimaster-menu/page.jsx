// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './page.css';

import Header from './Header';
import Categories from './Categories';
import MenuList from './MenuList';
import CartFAB from './CartFAB';
import DeleteModal from './DeleteModal';
import MusicPlayer from './MusicPlayer';

// Data menu bisa dipindahkan ke file terpisah (misal: src/data/menu.js)
const menuItemsData = [
  { id: 'espresso-01', name: 'Espresso', price: 10000, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80' },
  { id: 'hormix-coffee-02', name: 'Hormix Coffe', price: 15000, image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
  { id: 'caramel-coffee-03', name: 'Caramel Coffe', price: 18000, description: 'Latte manis dengan sirup karamel dan whipped cream, cocok untuk bersantai.', image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
  { id: 'butterscotch-coffee-04', name: 'Butterschoth Coffe', price: 18000, description: 'Rasa manis gurih dari butterscotch yang berpadu sempurna dengan kopi pilihan.', image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
  { id: 'tubruk-robusta-05', name: 'Kopi Tubruk Robusta', price: 5000, image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
  { id: 'hazelnut-coffee-06', name: 'Hazelnut Coffe', price: 18000, description: 'Nikmati aroma kacang hazelnut yang khas dalam secangkir latte hangat.', image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
  { id: 'americano-07', name: 'Americano', price: 13000, description: 'Espresso yang diencerkan dengan air panas, menghasilkan kopi hitam ringan.', image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
  { id: 'tubruk-gayo-08', name: 'Kopi Tubruk Gayo', price: 7000, image: 'https://i.ibb.co/23qrs29D/Gemini-Generated-Image-g164fkg164fkg164.png' },
];

const App = () => {
  // Semua state dan logika utama tetap di sini
  const [cart, setCart] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Efek untuk localStorage
  useEffect(() => {
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