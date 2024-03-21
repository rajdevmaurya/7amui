export const regExp = {
    "REQUIRED": (val) => {
        const exp = /\S/
        if (!exp.test(val)) {
            return "Please Enter value";
        }
    },
    "EMAIL": (val) => {
        const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!exp.test(val)) {
            return "Please Enter valid email";
        }
    },
    "MIN5CHARS": (val) => {
        const exp = /\S{5,}/
        if (!exp.test(val)) {
            return "Should Min 5 chars";
        }
    }

}

const setErrorMsg = (criteria, value, inputControlObj) => {
    for (let i = 0; i < criteria?.length; i++) {
        const regExFn = regExp[criteria[i]]
        const errMsg = regExFn(value)
        if (errMsg) {
            inputControlObj.errMsg = errMsg
            inputControlObj.isShowError = true
            break;
        }
    }
}
export const validateInputControl = (eve, inputControlsArr, setInputControlsArr) => {
    const { name, value } = eve?.target
    const clonedinputControlsArr = JSON.parse(JSON.stringify(inputControlsArr))
    const inputControlObj = clonedinputControlsArr.find((obj) => {
        return obj.name === name
    })
    inputControlObj.isShowError = false;
    inputControlObj.value = value;
    const { criteria } = inputControlObj;
    setErrorMsg(criteria, value, inputControlObj)
    setInputControlsArr(clonedinputControlsArr)
}

export const validteForm = (inputControlsArr, setInputControlsArr) => {
    const clonedinputControlsArr = JSON.parse(JSON.stringify(inputControlsArr))
    clonedinputControlsArr.forEach((inputControlObj) => {
        const { value, criteria } = inputControlObj
        inputControlObj.errMsg = "";
        inputControlObj.isShowError = false;
        setErrorMsg(criteria, value, inputControlObj)
    })
    const isFormInvalid = clonedinputControlsArr.some((obj) => {
        return obj.errMsg
    })
    setInputControlsArr(clonedinputControlsArr)
    return isFormInvalid
}