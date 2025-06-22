import Lottie from 'lottie-react';
import React from 'react';
import loader from '../../../../loader.json'

const Loader = () => {
    return (
        <div className=''>
            <Lottie style={{width: "100px"}} animationData={loader} loop={true}></Lottie>
        </div>
    );
};

export default Loader;