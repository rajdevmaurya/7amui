import React from 'react'

const Select = ({ label, errMsg, isShowError, name, value, handleChange, options }) => {

    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <label>{label}:</label>
            </div>
            <div className='col-sm-3'>
                <select name={name} value={value} className='form-control' onChange={handleChange}>
                    {
                        options.map((val, ind) => {
                            return <option key={`option_${ind}`}>{val}</option>
                        })
                    }
                </select>
            </div>
            <div className='col-sm-4'>
                {isShowError && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Select
