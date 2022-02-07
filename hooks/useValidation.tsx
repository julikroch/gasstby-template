import React, { useState, useEffect } from "react";

const useValidation = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [errors, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    const handleOnChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const validationErrors = validate(values)
        setError(validationErrors)
        setSubmitForm(true)
    }

    useEffect(() => {
        if (submitForm) {
            const noErrors: boolean = Object.keys(errors).length === 0;
            if (noErrors) {
                fn();
            }
            setSubmitForm(false)
        }
    }, [errors]);

    return {
        values,
        errors,
        submitForm,
        handleOnChange,
        handleSubmit
    }
};

export default useValidation;
