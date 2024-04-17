import React from 'react'
import styles from './Header.module.css';

const Header = () => {
    return (
        <div data-testid="headingDiv" className={`text-center bg-primary text-white ${styles.header}`}>
            End to End Application
        </div>
    )
}

export default Header
