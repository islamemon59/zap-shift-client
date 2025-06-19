import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../Pages/Home/Shared/Header/Header';
import Footer from '../../Pages/Home/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;