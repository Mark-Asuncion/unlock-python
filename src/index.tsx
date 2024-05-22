import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import Root from './Module/App';
import Login from './Module/Login';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, redirect, RouterProvider, } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from "react-dotenv";
import Tutorial from './Module/Tutorial';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/tutorial/:id",
        element: <Tutorial />
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
document.body.classList.add("bg-gray-100")

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={env.OAUTH_CLIENTID}>
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
