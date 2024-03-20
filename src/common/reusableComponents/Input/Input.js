import React from 'react'

const Input = ({ label, errMsg, type, isShowError, name, value, handleChange }) => {

    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <label>{label}:</label>
            </div>
            <div className='col-sm-3'>
                <input value={value} name={name} onChange={handleChange} className='form-control' type={type} />
            </div>
            <div className='col-sm-4'>
                {isShowError && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Input
