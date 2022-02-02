import Link from 'next/link';
import React from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import Button from '../ui/Button'

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: "Robot Slab", serif;
    margin-right: 2rem;
`

const Header = () => {

    const user = false

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div>
                    <Link href={'/'}>
                        <Logo>P</Logo>
                    </Link>
                    <Search />
                    <Navigation />
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {user ? (
                        <>
                            <p
                                css={css`
                                    margin-right: 2rem;
                                `}
                            >Hi, Julian</p>
                            <Button bgColor={true} textColor={true}>Log out</Button>
                        </>
                    ) : (
                        <>
                            <Link href={"/"}>
                                <Button bgColor={true} textColor={true}>Login</Button>
                            </Link>
                            <Link href={"/"}>
                                <Button>Create Account</Button>
                            </Link>
                        </>)
                    }
                </div>
            </HeaderContainer>
        </header>
    );
};

export default Header;
