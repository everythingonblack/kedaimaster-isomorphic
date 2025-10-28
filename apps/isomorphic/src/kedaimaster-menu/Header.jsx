import styles from './page.module.css';

const Header = () => (
    <header className={styles.header}>
        <h1>THE HOREE CAFE</h1>
        <img src="https://api.kedaimaster.com/uploads/1756146060964.png" alt="Logo Kafe" className={styles.logo} />
    </header>
);

export default Header;