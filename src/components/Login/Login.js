"use client"

import React, { useState } from 'react'
import styles from './Login.module.css'
import { Input } from '@/common/reusableComponents/Input'
import inputControls from './configuration.json'
import Link from 'next/link'
import { validateInputControl, validteForm } from '@/common/validations/validations'
import { useDispatch } from 'react-redux'
import { ServerCall } from '@/common/api/ServerCall'
import { Cookies } from '@/common/api/Cookies'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [inputControlsArr, setInputControlsArr] = useState(inputControls)
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogin = async () => {
        try {
            const [isInvalidForm, dataObj] = validteForm(inputControlsArr, setInputControlsArr)
            if (isInvalidForm) {
                return;
            }
            dispatch({ type: "LOADER", payload: true })
            const res = await ServerCall.sendPostReq("std/login", { data: dataObj })
            if (res.data?.length) {
                console.log(res.data[0])
                Cookies.setCookie("token", res?.data?.[0]?.token)
                dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: res.data[0] } })
                router.push("/")
            } else {
                dispatch({ type: "TOASTER", payload: { isShowToaster: true, message: "Please check entered uid or password", bgColor: "red" } })

            }
        } catch (e) {
            console.error(e);
            dispatch({ type: "TOASTER", payload: { isShowToaster: true, message: e.message, bgColor: "red" } })
        }
        finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    const handleChange = (eve) => {
        validateInputControl(eve, inputControlsArr, setInputControlsArr)
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            {
                inputControlsArr.map((obj, ind, oa) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }

            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={handleLogin} className='btn btn-primary me-3'>Login</button>
                    <Link href="/register">To Register</Link>
                </div>
            </div>

        </div>
    )
}

export default Login
