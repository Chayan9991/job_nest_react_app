import React from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes/routing.jsx";
import './App.css';
import {ThemeProvider} from "@/components/theme-provider.jsx";

const App = () => {

    return  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
    </ThemeProvider>
    //Routing

};

export default App;