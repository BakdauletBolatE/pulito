import React,{ useState } from "react";
import validateField from './validate';

const useForm = (form,login) =>{
    const [values,setValues] = useState(form);

    const [errors,setErrors] = useState(form);

    const handleChangeForm = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: validateField(e.target.name,e.target.value)
        })
    }


    const checkAllField = (form) => {
        Object.keys(form).map(function(objectKey, index) {
            let value = form[objectKey];
            console.log(value)
            console.log(objectKey)
            setErrors({
                ...errors,
                [objectKey]: validateField(objectKey,value)
            })
            console.log(errors)
        });
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        login(values.email,values.password)
    }


    return {values, handleChangeForm, handleSubmitForm,errors};

}
export default useForm;