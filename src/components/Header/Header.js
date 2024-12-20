import React from 'react'
import styles from './Header.module.css';

const Header = () => {
    return (
        <div data-testid="headingDiv" className={`text-left bg-success text-white ${styles.header}`}>
            Echo Healthcare
        </div>
    )
}

export default Header
