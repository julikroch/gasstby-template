import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'
import { jsx, css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import createAccountValidation from '../validation/createAccountValidation';
import firebase from '../firebase';

const INITIAL_STATE = {
    name: '',
    company: '',
    image: '',
    url: '',
    description: ''
}


const NewProduct: NextPage = () => {

    const [error, setError] = useState('');

    const router = useRouter()

    const { values, errors, handleSubmit, handleOnChange, handleBlur } = useValidation(INITIAL_STATE, createAccountValidation, createAccount)

    const { name, company, image, url, description } = values

    async function createAccount() {

    }

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align:center;
                        margin-top: 5rem;
                    `}
                >New product</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <fieldset>
                        <legend>General Information</legend>

                        <Field>
                            <label htmlFor='name'>Product Name</label>
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
                            <label htmlFor='company'>Company</label>
                            <input
                                type='text'
                                id='company'
                                placeholder='Company'
                                name='company'
                                value={company}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                            />
                        </Field>


                        <Field>
                            <label htmlFor='company'>Image</label>
                            <input
                                type='file'
                                id='image'
                                name='image'
                                value={image}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                            />
                        </Field>


                        <Field>
                            <label htmlFor='url'>URL</label>
                            <input
                                type='text'
                                id='url'
                                name='url'
                                value={url}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                    </fieldset>

                    <fieldset>
                        <legend>About your product</legend>
                        <Field>
                            <label htmlFor='description'>Product Description</label>
                            <input
                                type='text'
                                id='description'
                                name='description'
                                value={description}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                            />
                        </Field>
                    </fieldset>


                    {error && <Error>{error}</Error>}

                    <InputSubmit
                        type="submit"
                        value="Create Product"
                    />
                </Form>
            </>
        </Layout>
    )
}

export default NewProduct
