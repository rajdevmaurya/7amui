import React, { Fragment } from 'react'

const Input = ({ label, errMsg, type, isShowError, values, name, value, options, handleChange }) => {
    const fnPrepareInputControls = () => {
        switch (type) {
            case 'text':
            case 'password':
            case 'number':
                return <input value={value} name={name} onChange={handleChange} className='form-control' type={type} />
            case 'radio':
                return <div>
                    {
                        options.map((val, ind) => {
                            return <Fragment key={`div_${ind}`}><input checked={values[ind] === value} onChange={handleChange} value={values[ind]} type={type} name={name} /><span className='ms-2 me-3'>{val}</span></Fragment>
                        })
                    }
                </div>
            case 'checkbox':
                return <div>
                    {
                        options.map((val, ind) => {
                            return <Fragment key={`div_${ind}`}><input checked={value.includes(values[ind])} onChange={handleChange} value={values[ind]} type={type} name={name} /><span className='ms-2 me-3'>{val}</span></Fragment>
                        })
                    }
                </div>


        }
    }
    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <label>{label}:</label>
            </div>
            <div className='col-sm-3'>
                {fnPrepareInputControls()}
            </div>
            <div className='col-sm-4'>
                {isShowError && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Input
