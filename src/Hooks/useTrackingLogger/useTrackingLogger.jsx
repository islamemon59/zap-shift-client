import React from 'react';
import UseAxiosSecure from '../AxiosSecure/UseAxiosSecure';

const useTrackingLogger = () => {
    const axiosSecure = UseAxiosSecure()

    const logTracking = async ({tracking_id, status, details, location, updated_by}) => {
        try{
            const payload = {
                tracking_id,
                status,
                details,
                location,
                updated_by,
            }
            await axiosSecure.post("trackings", payload)
        } catch(err){
            console.log(err.message);
        }
    }
    return {logTracking}
};

export default useTrackingLogger;