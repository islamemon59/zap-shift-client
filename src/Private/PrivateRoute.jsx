import React from 'react';
import AuthHook from '../Hooks/AuthHook/AuthHook';
import Loader from '../Pages/Home/Shared/Loader/Loader';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = AuthHook()

    if(loading){
        return <Loader></Loader>
    }

    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;