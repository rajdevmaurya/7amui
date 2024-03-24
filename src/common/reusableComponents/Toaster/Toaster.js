import React, { useEffect } from 'react'
import styles from './Toaster.module.css'
import { useDispatch } from 'react-redux'
const Toaster = ({ msg, bgcolor }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: "TOASTER",
                payload: { isShowToaster: false, message: "", bgColor: "" }
            })
        }, 3000)
    }, [])
    return (
        <div style={{ background: bgcolor }} className={styles.toaster}>
            {msg}
        </div>
    )
}

export default Toaster
