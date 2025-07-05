import React from 'react';
import error from '../../../../assets/Error.png'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex justify-center items-center flex-col'>
            <img src={error} alt="error-404" />
            <Link to="/" className='text-lg btn btn-secondary text-primary-content'>Go Home</Link>
        </div>
    );
};

export default ErrorPage;