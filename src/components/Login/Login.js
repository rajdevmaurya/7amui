"use client"

import React from 'react'
import styles from './Login.module.css'
import { Input } from '@/common/reusableComponents/Input'
import inputControls from './configuration.json'
const Login = () => {

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            {
                inputControls.map((obj, ind, oa) => {
                    return <Input key={`Input_${ind}`} {...obj} />
                })
            }

            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Login
