import React from 'react'

const Input = ({ label, errMsg, type }) => {
    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <label>{label}:</label>
            </div>
            <div className='col-sm-3'>
                <input className='form-control' type={type} />
            </div>
            <div className='col-sm-4'>
                <b className='text-danger'>{errMsg}</b>
            </div>
        </div>
    )
}

export default Input
