import React, { useState, useEffect } from "react";

const useValidation = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrors: boolean = Object.keys(error).length === 0;

            if (noErrors) {
                fn();
            }
            setSubmitForm(false)
        }
    }, [error]);

    const handleChange = (e: any) => {
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

    return {
        values,
        error,
        submitForm,
        handleSubmit,
        handleChange
    }
};

export default useValidation;
