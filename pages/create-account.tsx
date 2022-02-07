import React from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit } from '../components/ui/Form'
import { jsx, css } from '@emotion/react';

const CreateAccount: NextPage = () => {
    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align:center;
                        margin-top: 5rem;
                `}
                >Create Account</h1>
                <Form>
                    <Field>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Your name'
                            name='name'
                        />
                    </Field>
                    <Field>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Your email'
                            name='email'
                        />
                    </Field>
                    <Field>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Your password'
                            name='password'
                        />
                    </Field>
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
