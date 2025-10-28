// src/components/CartFAB.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

const CartFAB = ({ cart, onIncreaseQuantity, onDecreaseQuantity, onResetCart, isDeleteModalOpen }) => {
    const [isCartExpanded, setIsCartExpanded] = useState(false);
    const [isEditingCart, setIsEditingCart] = useState(false);
    const [cartPage, setCartPage] = useState(1);
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Pilih Metode');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [orderNotes, setOrderNotes] = useState('');
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

    const cartFabRef = useRef(null);
    const paymentDropdownRef = useRef(null);

    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (cartFabRef.current && !cartFabRef.current.contains(event.target) && !isDeleteModalOpen) {
                setIsCartExpanded(false);
                setCartPage(1);
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
        onResetCart();
        setIsCartExpanded(false);
        setCartPage(1);
        setCustomerName('');
        setCustomerPhone('');
        setOrderNotes('');
    };

    const renderPage1 = () => (
        <div className={`${styles.cartPage1} ${cartPage === 1 ? styles.active : ''}`}>
            <div className={styles.cartSummary} onClick={() => totalItems > 0 && setIsCartExpanded(!isCartExpanded)}>
                <span className={styles.cartItemsCount}>{totalItems} item</span>
                <div className={styles.cartTotalDisplay}>
                    <span className={styles.cartTotalPrice}>Rp {totalPrice.toLocaleString('id-ID')}</span>
                    <svg viewBox="0 0 34 34" style={{ fill: 'white', height: '30px' }}><path d="M9.79175 24.75C8.09591 24.75 6.72383 26.1375 6.72383 27.8333C6.72383 29.5292 8.09591 30.9167 9.79175 30.9167C11.4876 30.9167 12.8751 29.5292 12.8751 27.8333C12.8751 26.1375 11.4876 24.75 9.79175 24.75ZM0.541748 0.0833435V3.16668H3.62508L9.17508 14.8679L7.09383 18.645C6.84717 19.0767 6.70842 19.5854 6.70842 20.125C6.70842 21.8208 8.09591 23.2083 9.79175 23.2083H28.2917V20.125H10.4392C10.2234 20.125 10.0538 19.9554 10.0538 19.7396L10.1001 19.5546L11.4876 17.0417H22.973C24.1292 17.0417 25.1467 16.4096 25.6709 15.4538L31.1901 5.44834C31.3134 5.23251 31.3751 4.97043 31.3751 4.70834C31.3751 3.86043 30.6813 3.16668 29.8334 3.16668H7.03217L5.583 0.0833435H0.541748ZM25.2084 24.75C23.5126 24.75 22.1405 26.1375 22.1405 27.8333C22.1405 29.5292 23.5126 30.9167 25.2084 30.9167C26.9042 30.9167 28.2917 29.5292 28.2917 27.8333C28.2917 26.1375 26.9042 24.75 25.2084 24.75Z"></path></svg>
                </div>
            </div>
            <div className={styles.cartPageHeader}>
                <h3 className={styles.cartPageTitle}>Detail Pesanan</h3>
                {totalItems > 0 && <button className={styles.editAllBtn} onClick={() => { setIsCheckout(false); setIsEditingCart(!isEditingCart) }}>{isEditingCart ? 'Selesai' : 'Edit'}</button>}
            </div>
            <div
                className={`${styles.cartItemsList} ${isEditingCart ? styles.isEditing : ''}`}
            >
                {Object.keys(cart).length > 0 ? Object.values(cart).map(item => (
                    <div className={styles.cartListItem} key={item.id}>
                        <div className={styles.cartItemView}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                        <div className={styles.cartItemEdit}>
                            <span>{item.name}</span>
                            <div className={styles.quantityControlCart}>
                                <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
                            </div>
                        </div>
                    </div>
                )) : <p style={{ textAlign: 'center', margin: '20px 0', color: 'white' }}>Keranjangmu masih kosong.</p>}
            </div>
            <div className={styles.checkoutSection}>
                <div className={`${styles.checkoutOption} ${isCheckOut ? styles.transitionActive : ''}`}>
                    <span className={styles.label}>Metode Pembayaran</span>
                    <div className={`${styles.dropdown} ${isPaymentDropdownOpen ? styles.open : ''}`} ref={paymentDropdownRef}>
                        <button className={styles.dropdownToggle} onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}>
                            <span className={styles.selectedPaymentMethod}>{selectedPaymentMethod}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </button>
                        <ul className={styles.dropdownMenu}>
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
                    className={styles.cartActionButton}
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
        <div className={`${styles.cartPage2} ${cartPage === 2 ? styles.active : ''}`}>
            <div className={styles.cartPageHeader}>
                <button className={styles.cartBackBtn} onClick={() => setCartPage(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h3 className={styles.cartPageTitle}>Detail Pesanan</h3>
                <div style={{ width: '24px' }}></div>
            </div>
            <form className={styles.customerForm} onSubmit={(e) => { e.preventDefault(); setCartPage(3); }}>
                <div className={styles.formGroup}>
                    <img className={styles.icon} src="https://i.ibb.co.com/SDCy0bq1/bingung.png" alt="icon" />
                    <label htmlFor="customer-name">Orderannya atas nama siapa nih?</label>
                    <input type="text" id="customer-name" placeholder="Masukkan nama Anda" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </div>
                <button type="submit" className={styles.cartActionButton}>Lanjut</button>
            </form>
        </div>
    );

    const renderPage3 = () => (
        <div className={`${styles.cartPage3} ${cartPage === 3 ? styles.active : ''}`}>
            <div className={styles.cartPageHeader}>
                <button className={styles.cartBackBtn} onClick={() => setCartPage(2)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h3 className={styles.cartPageTitle}>Detail Pesanan</h3>
                <div style={{ width: '24px' }}></div>
            </div>
            <form className={styles.customerForm} onSubmit={(e) => { e.preventDefault(); setCartPage(4); }}>
                <div className={styles.formGroup}>
                    <img className={styles.icon} src="https://i.ibb.co.com/4Z3FpCX2/hubungi.png" alt="icon" />
                    <label htmlFor="customer-phone">Kita bakal hubungi kalo pesananmu dah siap</label>
                    <input type="tel" id="customer-phone" placeholder="Masukkan nomor WhatsApp mu" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
                </div>
                <button type="submit" className={styles.cartActionButton}>Lanjut</button>
            </form>
        </div>
    );

    const renderPage4 = () => (
        <div className={`${styles.cartPage4} ${cartPage === 4 ? styles.active : ''}`}>
            <div className={styles.cartPageHeader}>
                <button className={styles.cartBackBtn} onClick={() => setCartPage(3)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <h3 className={styles.cartPageTitle}>Detail Pesanan</h3>
                <div style={{ width: '24px' }}></div>
            </div>
            <form className={styles.customerForm} onSubmit={(e) => { e.preventDefault(); setCartPage(5); }}>
                <div className={styles.formGroup}>
                    <img className={styles.icon} src="https://i.ibb.co.com/Kc4Kc5Ss/catat.png" alt="icon" />
                    <label htmlFor="order-notes">Ada catatan tambahan?</label>
                    <input type="text" id="order-notes" placeholder="Contoh: jangan pake es" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} />
                </div>
                <button type="submit" className={styles.cartActionButton}>Pesan</button>
            </form>
        </div>
    );

    const renderPage5 = () => (
        <div className={`${styles.cartPage5} ${cartPage === 5 ? styles.active : ''}`}>
            {showCancelConfirmation ? (
                <>
                    <div className={styles.cartPageHeader}>
                        <button className={styles.cartBackBtn} onClick={() => setShowCancelConfirmation(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </button>
                        <h3 className={styles.cartPageTitle}>Konfirmasi</h3>
                        <div style={{ width: '24px' }}></div>
                    </div>
                    <div className={styles.paymentDetails}>
                        <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                            Mau batalkan pesanan ini?
                        </p>
                    </div>
                    <button
                        className={styles.cartActionButton}
                        style={{ marginBottom: '15px' }}
                        onClick={() => {
                            setShowCancelConfirmation(false);
                            setCartPage(4);
                        }}
                    >
                        Ya, Batalkan Pesanan
                    </button>
                    <button
                        className={styles.cartActionButton}
                        onClick={() => {
                            setShowCancelConfirmation(false);
                        }}
                    >
                        Tidak
                    </button>
                </>
            ) : (
                <>
                    <div className={styles.cartPageHeader}>
                        <h3 className={styles.cartPageTitle}>Pembayaran {selectedPaymentMethod}</h3>
                        <div style={{ lineHeight: '2.2', height: '35px' }} onClick={() => setShowCancelConfirmation(true)}>Batalkan</div>
                    </div>
                    <div className={styles.paymentDetails}>
                        {selectedPaymentMethod === 'QRIS' ? (
                            <>
                                <p>Silakan pindai kode QRIS di bawah ini</p>
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=...`} alt="QR Code" />
                                <p className={styles.totalAmount}>Total: Rp {totalPrice.toLocaleString('id-ID')}</p>
                            </>
                        ) : (
                            <>
                                <p>Silakan lakukan pembayaran di kasir sebesar</p>
                                <p className={styles.totalAmount}>Rp {totalPrice.toLocaleString('id-ID')}</p>
                                <p>atas nama <span>{customerName}</span></p>
                            </>
                        )}
                    </div>
                    <button className={styles.cartActionButton} onClick={handleFinishOrder}>
                        {selectedPaymentMethod === 'QRIS' ? 'Saya Sudah Bayar' : 'Lihat detail pesanan'}
                    </button>
                </>
            )}
        </div>
    );

    return (
        <div
            ref={cartFabRef}
            className={`${styles.cartFab} ${totalItems === 0 ? styles.hidden : ''} ${isCartExpanded ? styles.expanded : ''}`}
        >
            <div className={styles.cartExpandedContent}>
                <div
                    className={styles.cartPageSlider}
                    style={{ transform: `translateX(-${(cartPage - 1) * 100}%)` }}
                >
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