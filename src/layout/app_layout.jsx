import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "@/components/header.jsx";
import Footer from "@/components/footer.jsx";

const AppLayout = () => {
    return (
        <div className=''>
           <div className="grid-background"></div>
            <div className="min-h-screen px-5 sm:px-25 overflow-x-hidden">
                <Header/>
                <Outlet/>
            </div>
            <Footer/>
        </div>

    );
};

export default AppLayout;