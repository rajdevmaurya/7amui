"use client"
import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { Input } from '@/common/reusableComponents/Input'
import { Textarea } from '@/common/reusableComponents/Textarea'
import { Select } from '@/common/reusableComponents/Select'
import configuration from './configuration.json'
import { validateInputControl, validteForm, resetForm } from '@/common/validations/validations'
import { ServerCall } from '@/common/api/ServerCall'
import { Cookies } from '@/common/api/Cookies'

const Profile = () => {
    const [inputControls, setInutControls] = useState(configuration)

    useEffect(() => {
        async function getUsersById() {
            const res = await ServerCall.sendGetReq(`std/get-user-by-id?id=${Cookies.getCookie("id")}`)
            const userInfo = res?.data?.[0];
            const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
            clonedInputControls?.forEach((obj) => {
                obj.value = userInfo[obj.name]
            })
            setInutControls(clonedInputControls)
        }
        getUsersById();
    }, [])


    const handleChange = (eve) => {
        validateInputControl(eve, inputControls, setInutControls)
    }

    const handleTerminate = () => {

    }
    const handleUpdate = () => {

    }
    return (
        <div className='container-fluid'>
            <h3 className='my-3 text-center'>Profile</h3>
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
                    <button onClick={handleUpdate} className='btn btn-primary me-3'>Update </button>
                    <button onClick={handleTerminate} className='btn btn-primary me-3'>Terminate</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
