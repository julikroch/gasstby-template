import Link from 'next/link';
import React from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <Search />
                    <Navigation />
                </div>
                <div>
                    <p>Hi, Julian</p>
                    <button type="button">Log out</button>
                    <Link href={"/"}>Login</Link>
                    <Link href={"/"}>Create Account</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
