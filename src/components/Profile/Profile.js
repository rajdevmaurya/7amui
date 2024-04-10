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
import { useDispatch } from 'react-redux'
import { Modal } from '@/common/reusableComponents/Modal'
import { useRouter } from 'next/navigation'
const Profile = () => {
    const [inputControls, setInutControls] = useState(configuration)
    const [isShowModal, setIsShowModal] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        async function getUsersById() {
            try {
                dispatch({ type: "LOADER", payload: true })
                const res = await ServerCall.sendGetReq(`std/get-user-by-id?id=${Cookies.getCookie("id")}`)
                const userInfo = res?.data?.[0];
                const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
                clonedInputControls?.forEach((obj) => {
                    obj.value = userInfo[obj.name]
                })
                setInutControls(clonedInputControls)
            } catch (e) {
                console.error("Profile", e)
            } finally {
                dispatch({ type: "LOADER", payload: false })
            }

        }
        getUsersById();
    }, [])


    const handleChange = (eve) => {
        validateInputControl(eve, inputControls, setInutControls)
    }

    const handleTerminate = () => {
        setIsShowModal(true);
    }
    const handleUpdate = () => {
        const [isFormInvalid, dataObj] = validteForm(inputControls, setInutControls)
        if (isFormInvalid) { return }
        dispatch({ type: "LOADER", payload: true })
        ServerCall.sendPutReq(`std/update-std/${Cookies.getCookie("id")}`, { data: dataObj })
            .then((res) => {
                const { acknowledged, modifiedCount } = res.data;
                if (acknowledged && modifiedCount) {
                    dispatch({
                        type: "TOASTER",
                        payload: { isShowToaster: true, message: "Successfully Updated", bgColor: "green" }
                    })
                } else {
                    dispatch({
                        type: "TOASTER",
                        payload: { isShowToaster: true, message: "Not Updated", bgColor: "yellow" }
                    })
                }
            })
            .catch((res) => {
                console.log('catch', res)
                dispatch({
                    type: "TOASTER",
                    payload: { isShowToaster: true, message: "Something went wrong.", bgColor: "red" }
                })
            })
            .finally(() => {
                dispatch({ type: "LOADER", payload: false })

            })
    }
    const fnOK = async () => {
        try {
            setIsShowModal(false)
            const res = await ServerCall.sendDeleteReq(`std/delete-student?id=${Cookies.getCookie('id')}`)
            console.log(res);
            const { acknowledged, deletedCount } = res?.data;
            if (acknowledged && deletedCount) {
                dispatch({
                    type: "TOASTER",
                    payload: { isShowToaster: true, message: "Successfully Terminated", bgColor: "green" }
                })
                Cookies.clearCookies();
                dispatch({ type: "LOGOUT" })
                router.push('/login')
            } else {
                dispatch({
                    type: "TOASTER",
                    payload: { isShowToaster: true, message: "Not Terminated", bgColor: "info" }
                })
            }
        } catch (e) {
            dispatch({
                type: "TOASTER",
                payload: { isShowToaster: true, message: "Something went wrong", bgColor: "red" }
            })
        } finally {

        }


    }
    const fnClose = () => {
        setIsShowModal(false)
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
            {isShowModal && <Modal text="R u sure..." isShowOk={true} fnOK={fnOK} fnClose={fnClose} />}
        </div>
    )
}

export default Profile
