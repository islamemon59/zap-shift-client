import React from 'react';
import logo from '../../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex justify-center items-center'>
            <img className='mb-4' src={logo} alt="logo" />
            <p className='text-3xl -ml-3 font-extrabold'>Profast</p>
        </div>
    );
};

export default ProFastLogo;