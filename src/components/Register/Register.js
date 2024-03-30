"use client"
import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import configuration from './configuration.json'
import { Input } from '@/common/reusableComponents/Input'
import { Textarea } from '@/common/reusableComponents/Textarea'
import { Select } from '@/common/reusableComponents/Select'
import { validateInputControl, validteForm, resetForm } from '@/common/validations/validations'
import Link from 'next/link'
import { ServerCall } from '@/common/api/ServerCall'
import { appStore } from '@/redux/store/appStore'

const Register = () => {
    const [inputControls, setInutControls] = useState(configuration)

    const handleChange = (eve) => {
        validateInputControl(eve, inputControls, setInutControls)
    }
    const handleRegister = () => {
        const [isInvalidForm, dataObj] = validteForm(inputControls, setInutControls)
        if (isInvalidForm) return;
        appStore.dispatch({ type: "LOADER", payload: true })
        ServerCall.sendPostReq("std/reg-std", { data: dataObj })
            .then((res) => {
                const { acknowledged, insertedId } = res?.data
                if (acknowledged && insertedId) {
                    resetForm(inputControls, setInutControls)
                    appStore.dispatch({
                        type: "TOASTER",
                        payload: { isShowToaster: true, message: "Successfully Inserted", bgColor: "green" }
                    })
                } else {

                }
            })
            .catch((res) => {
                console.error("Register", res.data);
            })
            .finally(() => {
                appStore.dispatch({ type: "LOADER", payload: false })

            })
    }
    return (
        <div className='container-fluid'>
            <h3 className='my-3 text-center'>Register</h3>
            {
                inputControls.map((obj, index) => {
                    switch (obj.tag) {
                        case 'input':
                            return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
                        case 'select':
                            return <Select key={`select_${index}`} {...obj} handleChange={handleChange} />
                        case 'textarea':
                            return <Textarea key={`ta_${index}`} {...obj} handleChange={handleChange} />

                    }
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={handleRegister} className='btn btn-primary me-3'>Register</button>
                    <Link href="/login">To Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
