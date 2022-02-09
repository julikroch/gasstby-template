import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'
import { jsx, css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import firebase from '../firebase';
import loginValidation from '../validation/loginValidation'

const INITIAL_STATE = {
    email: '',
    password: ''
}

const CreateAccount: NextPage = () => {

    const [error, setError] = useState('');

    const router = useRouter()

    const { values, errors, handleSubmit, handleOnChange, handleBlur } = useValidation(INITIAL_STATE, loginValidation, login)

    const { email, password } = values

    async function login() {
        try {
            await firebase.firebaseLogin(email, password)
            router.push('/')
        } catch (error) {
            console.error('Error trying to login', error.message)
            setError(error.message)
        }
    }

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align:center;
                        margin-top: 5rem;
                    `}
                >Login</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Field>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Your email'
                            name='email'
                            value={email}
                            onChange={handleOnChange}
                            onBlur={handleBlur}
                        />
                    </Field>

                    {errors.email && <Error>{errors.email}</Error>}

                    <Field>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Your password'
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            onBlur={handleBlur}
                        />
                    </Field>

                    {errors.password && <Error>{errors.password}</Error>}

                    {error && <Error>{error}</Error>}

                    <InputSubmit
                        type="submit"
                        value="Login"
                    />
                </Form>
            </>
        </Layout>
    )
}

export default CreateAccount
