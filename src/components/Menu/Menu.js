import React, { useReducer, useState } from 'react'
import styles from './Menu.module.css'
import { data, menuItems } from './configuration.json'
import Link from 'next/link'
import { Cookies } from '@/common/api/Cookies'
import { appStore } from '@/redux/store/appStore'
import { Modal } from '@/common/reusableComponents/Modal'
import { useRouter } from 'next/navigation'


export const Menu = () => {
    // const [menuItems, setMenuItems]=useState([])
    /*
        useEffect(()=>{
            cosnt res=await ServerCall.sendGetReq("get-menuitems")
            setMenuItems(res.data)
        },[])
    */
    const [isShowModal, setIsShowModal] = useState(false)

    const [isMobileView, setIsMobileView] = useState(document?.body?.offsetWidth < 700);
    const [left, setLeft] = useState(-150)
    const [selMenuItem, setSelMenuItem] = useState(location?.pathname?.slice(1) || 'home')

    const router = useRouter();

    let timeoutId;
    window.addEventListener("resize", () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            const deviceWidth = document?.body?.offsetWidth;
            setIsMobileView(deviceWidth < 700)
        }, 100)
    })
    const hanldleMobileMenuBtnClick = () => {
        setLeft(left === -150 ? 0 : -150)
    }
    const handleMenuItemClick = (menuItem) => {
        console.log(menuItem)
        setSelMenuItem(menuItem)
    }
    const handleLogout = () => {
        setIsShowModal(true);
    }
    return (<>
        {isMobileView && <button onClick={hanldleMobileMenuBtnClick} className={styles.mobileMenuBtn}><span></span><span></span><span></span></button>}
        <ul style={{ left: left }} className={`px-0 py-0 mx-0 my-0 ${isMobileView ? styles.mobileMenu : styles.menu}`}>
            {
                menuItems?.map(({ id, link, text }, ind) => {
                    return <li className={id === selMenuItem ? styles.active : "'"} onClick={() => handleMenuItemClick(id)} key={`li_${ind}`}><Link href={link}>{text}</Link></li>
                })
            }
            <li className='text-white cursor-pointer' onClick={handleLogout}>Logout</li>
        </ul>
        {isShowModal && <Modal text="R u sure..." isShowOk={true} fnOK={() => {
            Cookies.clearCookies();
            appStore.dispatch({ type: "LOGOUT" })
            router.push('/login')
        }} fnClose={() => setIsShowModal(false)} />}
    </>
    )
}

