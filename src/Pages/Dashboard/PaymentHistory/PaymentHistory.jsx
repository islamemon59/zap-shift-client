import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AuthHook from '../../../Hooks/AuthHook/AuthHook';
import UseAxiosSecure from '../../../Hooks/AxiosSecure/UseAxiosSecure';
import Loader from '../../Home/Shared/Loader/Loader';

const PaymentHistory = () => {
    const {user} = AuthHook()
    const axiosSecure = UseAxiosSecure()
    const {isLoading, data: payments = []} = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`payment/history?email=${user?.email}`)
            console.log(data);
            return data;
        }
    })
    console.log(payments);
    if(isLoading){
        return <Loader></Loader>
    }
    return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">💳 My Payment History</h2>

      <table className="table table-zebra w-full text-sm md:text-base">
        <thead className="bg-base-200">
          <tr>
            <th>No</th>
            <th>Parcel ID</th>
            <th>Amount</th>
            <th>Txn ID</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td className="truncate">{payment.parcelId}</td>
              <td>${payment.amount}</td>
              <td className="truncate">{payment.transactionId}</td>
              <td>
                <span
                  className={`badge ${
                    payment.status === "succeeded" ? "badge-success" : "badge-error"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className='text-[13px]'>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {history.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No payment history found.</p>
      )}
    </div>
    );
};

export default PaymentHistory;