import React from 'react';
import styles from './page.module.css';

const OrderDetails = ({ cart, customerName, customerPhone, orderNotes, totalPrice, onBack }) => (
    <div className={styles.orderDetails}>
        <div className={styles.cartPageHeader}>
            <button className={styles.cartBackBtn} onClick={onBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>
            <h3 className={styles.cartPageTitle}>Detail Pesanan</h3>
            <div style={{ width: '24px' }}></div>
        </div>

        <div className={styles.paymentDetails}>
            <p><strong>Nama:</strong> {customerName}</p>
            <p><strong>No. WA:</strong> {customerPhone}</p>
            <p><strong>Catatan:</strong> {orderNotes || 'Tidak ada catatan'}</p>
        </div>

        <div className={styles.cartItemsList}>
            {Object.keys(cart).length > 0 ? (
                Object.values(cart).map((item) => (
                    <div className={styles.cartListItem} key={item.id}>
                        <div className={styles.cartItemView}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', margin: '20px 0', color: 'white' }}>Keranjangmu masih kosong.</p>
            )}
        </div>

        <div className={styles.checkoutSection}>
            <p className={styles.totalAmount}>
                <strong>Total:</strong> Rp {totalPrice.toLocaleString('id-ID')}
            </p>
        </div>
    </div>
);

export default OrderDetails;