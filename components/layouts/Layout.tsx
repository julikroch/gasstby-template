import React from 'react';
import Link from 'next/link';

const Layout = (props: any) => {
    return (
        <>
            <nav className="nav">
                <Link href="/">Inicio</Link>
                <Link href="/nosotros">Nosotros</Link>
            </nav>
            <main>
                {props.children}
            </main>
        </>
    )
};

export default Layout;
