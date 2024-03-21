"use client"
import React, { useState } from 'react'
import styles from './Register.module.css'
import configuration from './configuration.json'
import { Input } from '@/common/reusableComponents/Input'
import { Textarea } from '@/common/reusableComponents/Textarea'
import { Select } from '@/common/reusableComponents/Select'
import { validateInputControl, validteForm } from '@/common/validations/validations'
const Register = () => {
    const [inputControls, setInutControls] = useState(configuration)
    const handleChange = (eve) => {
        validateInputControl(eve, inputControls, setInutControls)
    }
    const handleRegister = () => {
        const isInvalidForm = validteForm(inputControls, setInutControls)
        if (isInvalidForm) return;
        alert("send req for registrarion")
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
                    <button onClick={handleRegister} className='btn btn-primary'>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register
