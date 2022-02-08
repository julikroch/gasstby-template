import React from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'
import { jsx, css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import createAccountValidation from '../validation/createAccountValidation';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const CreateAccount: NextPage = () => {

    const { values, errors, handleSubmit, handleOnChange, handleBlur } = useValidation(INITIAL_STATE, createAccountValidation, createAccount)

    const { name, email, password } = values

    function createAccount() {
        alert('Creating account')
    }

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align:center;
                        margin-top: 5rem;
                    `}
                >Create Account</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Field>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Your name'
                            name='name'
                            value={name}
                            onChange={handleOnChange}
                            onBlur={handleBlur}
                        />
                    </Field>

                    {errors.name && <Error>{errors.name}</Error>}

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

                    <InputSubmit
                        type="submit"
                        value="Create Account"
                    />
                </Form>
            </>
        </Layout>
    )
}

export default CreateAccount
