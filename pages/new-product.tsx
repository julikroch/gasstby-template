import React, { useState, useContext } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'
import { jsx, css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import createProductsValidation from '../validation/createProductsValidation';
import { FirebaseContext } from '../firebase';
import { FileUploader } from 'react-firebase-file-uploader'

const INITIAL_STATE = {
    name: '',
    company: '',
    image: '',
    url: '',
    description: ''
}

const NewProduct: NextPage = () => {

    // state de las imagenes
    const [imageName, setImageName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState<any>(0);
    const [imageUrl, setImageUrl] = useState('');

    const [error, setError] = useState('');

    const { values, errors, handleSubmit, handleOnChange, handleBlur } = useValidation(INITIAL_STATE, createProductsValidation, createProduct)

    const { name, company, image, url, description } = values

    const router = useRouter()

    const { user, firebase } = useContext(FirebaseContext)

    async function createProduct() {
        if (!user) {
            return router.push('/')
        }

        const product = {
            name,
            company,
            url,
            description,
            votes: 0,
            comments: [],
            creationDate: Date.now(),
            userCreator: {
                id: user.uid,
                name: user.displayName
            },
            hasVoted: []
        }

        firebase.db('products').add(product)
        return router.push('/')
    }

    const handleUploadStart = () => {
        setProgress(0);
        setUploading(true);
    }

    const handleProgress = (progress: any) => setProgress({ progress });

    const handleUploadError = error => {
        setUploading(error);
        console.error(error);
    };

    const handleUploadSuccess = name => {
        setProgress(100);
        setUploading(false);
        setImageName(name)
        firebase?.storage?.ref("products").child(name).getDownloadURL()
            .then(url => {
                console.log(url);
                setImageUrl(url);
            });
    };

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

                        {errors.company && <Error>{errors.company}</Error>}

                        <Field>
                            <label htmlFor='company'>Image</label>
                            <FileUploader
                                accept='image/*'
                                id='image'
                                name='image'
                                value={image}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                randomizeFilename
                                storageRef={firebase.storage.ref('products')}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSucces={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </Field>

                        <Field>
                            <label htmlFor='url'>URL</label>
                            <input
                                type='text'
                                id='url'
                                name='url'
                                placeholder='Product URL'
                                value={url}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        {errors.url && <Error>{errors.url}</Error>}

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

                        {errors.description && <Error>{errors.description}</Error>}
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
