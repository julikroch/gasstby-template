import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <Link href={"/"}>Home</Link>
            <Link href={"/second-link"}>Second Link</Link>
            <Link href={"/third-link"}>Third Link</Link>
        </nav>
    )
};

export default Navigation;
