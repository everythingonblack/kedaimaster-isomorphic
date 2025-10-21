// src/components/CartFAB.jsx
import React, { useState, useEffect, useRef } from 'react';

const CartFAB = ({ cart, onIncreaseQuantity, onDecreaseQuantity, onResetCart, isDeleteModalOpen }) => {
    // State khusus untuk UI komponen ini
    const [isCartExpanded, setIsCartExpanded] = useState(false);
    const [isEditingCart, setIsEditingCart] = useState(false);
    const [cartPage, setCartPage] = useState(1);
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Pilih Metode');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    const cartFabRef = useRef(null);
    const paymentDropdownRef = useRef(null);

    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tambahkan ini di bagian atas komponen fungsional Anda, bersama state lainnya
    const [showCancelConfirmation, setShowCancelConfirmation] = React.useState(false);

    // Efek untuk menutup keranjang saat klik di luar
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (cartFabRef.current && !cartFabRef.current.contains(event.target) && !isDeleteModalOpen) {
                setIsCartExpanded(false);
                setCartPage(1); // Reset ke halaman 1 saat ditutup
            }
            if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target)) {
                setIsPaymentDropdownOpen(false);
            }
        };

        if (isCartExpanded || isPaymentDropdownOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isCartExpanded, isPaymentDropdownOpen, isDeleteModalOpen]);

    // Reset state saat keranjang dikosongkan
    useEffect(() => {
        if (totalItems === 0) {
            setIsCartExpanded(false);
            setCartPage(1);
            setIsCheckout(false);
            setSelectedPaymentMethod('Pilih Metode');
        }
    }, [totalItems]);


    const handleFinishOrder = () => {
        alert(`Terima kasih telah memesan, ${customerName}! Pesanan akan segera kami proses.`);
        onResetCart(); // Panggil fungsi dari App.js
        setIsCartExpanded(false);
        setCartPage(1);
        setCustomerName('');
        setCustomerPhone('');
        setOrderNotes('');
    }

    // Render method dipecah untuk kejelasan
    const renderPage1 = () => (
        <div className={`cart-page-1 ${cartPage === 1 ? 'active' : ''}`}>
            {/* ... JSX untuk Halaman 1 ... */}
            {/* Ganti handleDecreaseQuantity -> onDecreaseQuantity, dll */}
            {/* Contoh: */}
            <div className="cart-summary" onClick={() => totalItems > 0 && setIsCartExpanded(!isCartExpanded)}>
                <span className="cart-items-count">{totalItems} item</span>
                <div className="cart-total-display">
                    <span className="cart-total-price">Rp {totalPrice.toLocaleString('id-ID')}</span>
                    <svg viewBox="0 0 34 34" style={{ fill: 'white', height: '30px' }}><path d="M9.79175 24.75C8.09591 24.75 6.72383 26.1375 6.72383 27.8333C6.72383 29.5292 8.09591 30.9167 9.79175 30.9167C11.4876 30.9167 12.8751 29.5292 12.8751 27.8333C12.8751 26.1375 11.4876 24.75 9.79175 24.75ZM0.541748 0.0833435V3.16668H3.62508L9.17508 14.8679L7.09383 18.645C6.84717 19.0767 6.70842 19.5854 6.70842 20.125C6.70842 21.8208 8.09591 23.2083 9.79175 23.2083H28.2917V20.125H10.4392C10.2234 20.125 10.0538 19.9554 10.0538 19.7396L10.1001 19.5546L11.4876 17.0417H22.973C24.1292 17.0417 25.1467 16.4096 25.6709 15.4538L31.1901 5.44834C31.3134 5.23251 31.3751 4.97043 31.3751 4.70834C31.3751 3.86043 30.6813 3.16668 29.8334 3.16668H7.03217L5.583 0.0833435H0.541748ZM25.2084 24.75C23.5126 24.75 22.1405 26.1375 22.1405 27.8333C22.1405 29.5292 23.5126 30.9167 25.2084 30.9167C26.9042 30.9167 28.2917 29.5292 28.2917 27.8333C28.2917 26.1375 26.9042 24.75 25.2084 24.75Z"></path></svg>
                </div>
            </div>
            <div className="cart-page-header">
                <h3 className="cart-page-title">Detail Pesanan</h3>
                {totalItems > 0 && <button id="edit-all-btn" onClick={() => { setIsCheckout(false); setIsEditingCart(!isEditingCart) }}>{isEditingCart ? 'Selesai' : 'Edit'}</button>}
            </div>
            <div id="cart-items-list" className={isEditingCart ? 'is-editing' : ''}>
                {Object.keys(cart).length > 0 ? Object.values(cart).map(item => (
                    <div className="cart-list-item" key={item.id}>
                        <div className="cart-item-view">
                            <span>{item.quantity}x {item.name}</span>
                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="cart-item-edit">
                            <span>{item.name}</span>
                            <div className="quantity-control-cart">
                                <button className="decrease-quantity-cart" onClick={() => onDecreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="increase-quantity-cart" onClick={() => onIncreaseQuantity(item.id)}>+</button>
                            </div>
                        </div>
                    </div>
                )) : <p style={{ textAlign: 'center', margin: '20px 0', color: 'white' }}>Keranjangmu masih kosong.</p>}
            </div>
            <div className="checkout-section">
                <div className={`checkout-option ${isCheckOut ? 'transition-active' : ''}`}>
                    <span className="label">Metode Pembayaran</span>
                    <div className={`dropdown ${isPaymentDropdownOpen ? 'open' : ''}`} ref={paymentDropdownRef}>
                        <button className="dropdown-toggle" onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}>
                            <span id="selected-payment-method">{selectedPaymentMethod}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={() => { setSelectedPaymentMethod('QRIS'); setIsPaymentDropdownOpen(false); }}>
                                <img src="https://iconlogovector.com/uploads/images/2024/03/lg-65ffda68a47ee-QRIS.webp" alt="QRIS" /><span>QRIS</span>
                            </li>
                            <li onClick={() => { setSelectedPaymentMethod('Tunai'); setIsPaymentDropdownOpen(false); }}>
                                <img src="https://static.vecteezy.com/system/resources/previews/002/368/708/non_2x/cash-icon-free-vector.jpg" alt="Tunai" /><span>Tunai</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <button
                    className="cart-action-button"
                    onClick={() => {
                        if (!isCheckOut) { setIsCheckout(true); return; }
                        if (selectedPaymentMethod === 'Pilih Metode') {
                            alert('Silakan pilih metode pembayaran terlebih dahulu.');
                            return;
                        }
                        setCartPage(2);
                    }}
                >
                    {isCheckOut ? 'Checkout' : 'Lanjutkan ke Pembayaran'}
                </button>
            </div>
        </div>
    );

    const renderPage2 = () => (
        <div className={`cart-page-2 ${cartPage === 2 ? 'active' : ''}`}>
            <div className="cart-page-header">
                <button className="cart-back-btn" onClick={() => setCartPage(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h3 className="cart-page-title">Detail Pesanan</h3>
                <div style={{ width: '24px' }}></div>
            </div>
            <form className="customer-form" onSubmit={(e) => { e.preventDefault(); setCartPage(3); }}>
                <div className="form-group">
                    <img className="icon" src="https://i.ibb.co.com/SDCy0bq1/bingung.png" alt="icon" />
                    <label htmlFor="customer-name">Orderannya atas nama siapa nih?</label>
                    <input type="text" id="customer-name" placeholder="Masukkan nama Anda" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </div>
                <button type="submit" className="cart-action-button">Lanjut</button>
            </form>
        </div>
    );

    // Buat renderPage3, renderPage4, renderPage5 dengan cara yang sama...

    const renderPage3 = () => (
        <div className={`cart-page-3 ${cartPage === 3 ? 'active' : ''}`}>
            <div className="cart-page-header">
                <button className="cart-back-btn" onClick={() => setCartPage(2)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h3 className="cart-page-title">Detail Pesanan</h3>
                <div style={{ width: '24px' }}></div>
            </div>
            <form className="customer-form" onSubmit={(e) => { e.preventDefault(); setCartPage(4); }}>
                <div className="form-group">
                    <img className="icon" src="https://i.ibb.co.com/4Z3FpCX2/hubungi.png" alt="icon" />
                    <label htmlFor="customer-phone">Kita bakal hubungi kalo pesananmu dah siap</label>
                    <input type="tel" id="customer-phone" placeholder="Masukkan nomor WhatsApp mu" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
                </div>
                <button type="submit" className="cart-action-button">Lanjut</button>
            </form>
        </div>
    );

    const renderPage4 = () => (
        <div className={`cart-page-4 ${cartPage === 4 ? 'active' : ''}`}>
            <div className="cart-page-header">
                <button className="cart-back-btn" onClick={() => setCartPage(3)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h3 className="cart-page-title">Detail Pesanan</h3>
                <div style={{ width: '24px' }}></div>
            </div>
            <form className="customer-form" onSubmit={(e) => { e.preventDefault(); setCartPage(5); }}>
                <div className="form-group">
                    <img className="icon" src="https://i.ibb.co.com/Kc4Kc5Ss/catat.png" alt="icon" />
                    <label htmlFor="order-notes">Ada catatan tambahan?</label>
                    <input type="text" id="order-notes" placeholder="Contoh: jangan pake es" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} />
                </div>
                <button type="submit" className="cart-action-button">Pesan</button>
            </form>
        </div>
    );

const renderPage5 = () => (
    <div className={`cart-page-5 ${cartPage === 5 ? 'active' : ''}`}>
        {showCancelConfirmation ? (
            /* ============================================= */
            /* === TAMPILAN KETIKA MINTA KONFIRMASI BATAL === */
            /* ============================================= */
            <>
                <div className="cart-page-header">
                    {/* Tombol kembali di sini akan membatalkan pembatalan */}
                    <button className="cart-back-btn" onClick={() => setShowCancelConfirmation(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <h3 className="cart-page-title">Konfirmasi</h3>
                    <div style={{ width: '24px' }}></div>
                </div>
                {/* Kita gunakan class yang sudah ada seperti 'payment-details' atau 'customer-form' agar stylenya sama */}
                <div className="payment-details">
                    <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                        Mau batalkan pesanan ini?
                    </p>
                </div>
                {/* Tombol aksi untuk mengkonfirmasi pembatalan */}
                <button 
                    className="cart-action-button"
                    style={{marginBottom: '15px'}}
                    onClick={() => {
                        setShowCancelConfirmation(false); // Reset state
                        setCartPage(4); // Kembali ke page 4
                    }}
                >
                    Ya, Batalkan Pesanan
                </button>
                <button 
                    className="cart-action-button" 
                    onClick={() => {
                        setShowCancelConfirmation(false); // Reset state
                    }}
                >
                    Tidak
                </button>
            </>
        ) : (
            /* ============================================= */
            /* ===      TAMPILAN NORMAL HALAMAN 5         === */
            /* ============================================= */
            <>
                <div className="cart-page-header">
                    <h3 className="cart-page-title">Pembayaran {selectedPaymentMethod}</h3>
                    <div style={{ lineHeight: '2.2', height: '35px' }} onClick={()=>setShowCancelConfirmation(true)}>Batalkan</div>
                </div>
                <div className="payment-details">
                    {selectedPaymentMethod === 'QRIS' ? (
                        <>
                            <p>Silakan pindai kode QRIS di bawah ini</p>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=...`} alt="QR Code" />
                            <p className="total-amount">Total: Rp {totalPrice.toLocaleString('id-ID')}</p>
                        </>
                    ) : (
                        <>
                            <p>Silakan lakukan pembayaran di kasir sebesar</p>
                            <p className="total-amount">Rp {totalPrice.toLocaleString('id-ID')}</p>
                            <p>atas nama <span>{customerName}</span></p>
                        </>
                    )}
                </div>
                <button className="cart-action-button" onClick={handleFinishOrder}>
                    {selectedPaymentMethod === 'QRIS' ? 'Saya Sudah Bayar' : 'Lihat detail pesanan'}
                </button>
            </>
        )}
    </div>
);


    return (
        <div ref={cartFabRef} className={`cart-fab ${totalItems === 0 ? 'hidden' : ''} ${isCartExpanded ? 'expanded' : ''}`}>
            <div className="cart-expanded-content">
                <div className="cart-page-slider" style={{ transform: `translateX(-${(cartPage - 1) * 100}%)` }}>
                    {renderPage1()}
                    {renderPage2()}
                    {renderPage3()}
                    {renderPage4()}
                    {renderPage5()}
                </div>
            </div>
        </div>
    );
};

export default CartFAB;