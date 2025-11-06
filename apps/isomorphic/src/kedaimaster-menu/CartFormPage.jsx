import React from 'react';
import styles from './page.module.css';

/**
 * Komponen reusable untuk form di dalam CartFAB.
 * Bisa menampung banyak input lewat props `fields` atau langsung pakai children.
 */
const CartFormPage = ({
  icon,
  title = 'Detail Pesanan',
  description,
  fields = [],
  onSubmit,
  onBack,
  buttonText = 'Lanjut',
  children,
  isLoading = false,
}) => {
  return (
    <div className={styles.cartFormPage}>
      {/* Header */}
      <div className={styles.cartPageHeader}>
        {onBack ? (
          <button className={styles.cartBackBtn} onClick={onBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        ) : (
          <div style={{ width: '24px' }} />
        )}

        <h3 className={styles.cartPageTitle}>{title}</h3>
        <div style={{ width: '24px' }} />
      </div>

      {/* Form */}
      <form
        className={styles.customerForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
      >
        {icon && (
          <img className={styles.icon} src={icon} alt="icon" />
        )}
        {description && (
          <label >{description}</label>
        )}

        {/* Jika fields ada, render otomatis */}
        {fields.length > 0 &&
          fields.map((field, i) => (
            <div className={styles.formGroup} key={i}>
              {field.label && <label htmlFor={field.id}>{field.label}</label>}
              <input
                id={field.id || `input-${i}`}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                required={field.required ?? true}
              />
            </div>
          ))}

        {/* Kalau anak dikasih manual */}
        {children}

        <button type="submit" className={styles.cartActionButton}>
          {isLoading ? <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
            : buttonText}
        </button>
      </form>
    </div>
  );
};

export default CartFormPage;
