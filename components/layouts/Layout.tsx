import React from 'react';
import Link from 'next/link';
import Header from './Header';


const Layout = (props: any) => {
    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
        </>
    )
};

export default Layout;
