import Lottie from 'lottie-react';
import React from 'react';
import loader from '../../../../loader.json'

const Loader = () => {
    return (
        <div>
            <Lottie animationData={loader} loop={true}></Lottie>
        </div>
    );
};

export default Loader;