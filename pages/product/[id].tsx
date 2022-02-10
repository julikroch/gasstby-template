import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import { Error404 } from '../../components/layout/Error404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

const ProductContainer = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {

    const [product, setProduct] = useState<any>({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState<any>({});
    const [consultDb, setConsultDb] = useState(true);

    const router = useRouter();
    const { query: { id } } = router;

    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultDb) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if (product.exists) {
                    setProduct(product.data());
                    setConsultDb(false);
                } else {
                    setError(true);
                    setConsultDb(false);
                }
            }
            getProduct();
        }
    }, [id]);

    if (Object.keys(product).length === 0 && !error) return 'Loading...';

    const { comments, creationDate, description, company, name, url, imageUrl, votes, userCreator, hasVoted } = product;

    const voteProduct = () => {
        if (!user) {
            return router.push('/login')
        }

        const newTotal = votes + 1;

        if (hasVoted.includes(user.uid)) return;

        const newHasVoted = [...hasVoted, user.uid];

        firebase.db.collection('productos').doc(id).update({
            votos: newTotal,
            haVotado: newHasVoted
        })

        setProduct({
            ...product,
            votes: newTotal
        })

        setConsultDb(true);
    }

    const changeComment = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const isCreator = id => {
        if (userCreator.id == id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();

        if (!user) router.push('/login')

        comment.userId = user.uid;
        comment.userName = user.displayName;

        const newComments = [...comments, comment];

        firebase.db.collection('products').doc(id).update({
            comments: newComments
        })

        setProduct({
            ...product,
            comments: newComments
        })

        setConsultDb(true);
    }

    const canDelete = () => {
        if (!user) return false;

        if (userCreator.id === user.uid) true
    }

    const deleteProduct = async () => {

        if (!user) router.push('/login')

        if (userCreator.id !== user.uid) router.push('/')

        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <>
                {error ? <Error404 /> : (
                    <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{name} </h1>

                        <ProductContainer>
                            <div>
                                <p>Published: {formatDistanceToNow(new Date(creationDate), { locale: es })} </p>
                                <p>By: {userCreator.nombre} de {company} </p>
                                <img src={imageUrl} />
                                <p>{description}</p>

                                {user && (
                                    <>
                                        <h2>Add your comment</h2>
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <Field>
                                                <input
                                                    type="text"
                                                    name="message"
                                                    onChange={changeComment}
                                                />
                                            </Field>
                                            <InputSubmit
                                                type="submit"
                                                value="Add comment"
                                            />
                                        </form>
                                    </>
                                )}

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comments</h2>

                                {comments.length === 0 ? "No comments yet" : (
                                    <ul>
                                        {comments.map((comment: any, i: number) => (
                                            <li
                                                key={`${comment.userId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comment.message}</p>
                                                <p>Written by:
                                                    <span
                                                        css={css`
                                                            font-weight:bold;
                                                        `}
                                                    >
                                                        {''} {comment.userName}
                                                    </span>
                                                </p>
                                                {isCreator(comment.userId) && <ProductCreator>Is creator</ProductCreator>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <aside>
                                <Button
                                    target="_blank"
                                    bgColor={true}
                                    href={url}
                                >Visit URL</Button>

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                        text-align: center;
                                    `}>{votes} Votes</p>

                                    {user && (
                                        <Button
                                            onClick={voteProduct}
                                        >
                                            Vote
                                        </Button>
                                    )}
                                </div>
                            </aside>
                        </ProductContainer>

                        {canDelete() &&
                            <Button
                                onClick={deleteProduct}
                            >Delete Product</Button>
                        }
                    </div>
                )}
            </>
        </Layout>
    );
}

export default Product;