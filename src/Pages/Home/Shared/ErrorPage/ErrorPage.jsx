import React from 'react';
import error from '../../../../assets/Error.png'

const ErrorPage = () => {
    return (
        <div className='min-h-screen'>
            <img src={error} alt="error-404" />
        </div>
    );
};

export default ErrorPage;