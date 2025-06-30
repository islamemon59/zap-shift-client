/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { user } = AuthHook();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { parcelId } = useParams();
  const axiosSecure = UseAxiosSecure();
  console.log(parcelId);

  const {
    data: parcelInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcel/${parcelId}`);
      return data;
    },
  });

  console.log(parcelInfo);

  if (isLoading) {
    return;
  }

  const amount = parcelInfo?.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast(<p className="text-error">${error?.message}</p>);
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
    }

    // Create Payment Intent
    const { data } = await axiosSecure.post("create-payment-intent", {
      amountInCents,
      parcelId,
    });
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        console.log(result);
        const paymentData = {
          parcelId,
          userEmail: user.email,
          amount,
          currency: result.paymentIntent.currency,
          paymentMethod: result.paymentIntent.payment_method,
          status: result.paymentIntent.status,
          transactionId: result.paymentIntent.id,
        };

        const { data } = await axiosSecure.post("payments", paymentData);
        console.log(data);
        card.clear();
        if (data.insertedId) {
          Swal.fire({
            title: "Payment Successful",
            icon: "success",
            draggable: true,
          });

          refetch();
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-6 rounded-xl shadow-md border border-gray-200 max-w-md mx-auto space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-primary">
          Complete Your Payment
        </h2>

        <div className="p-4 border rounded-md bg-base-200">
          <label className="label">
            <span className="label-text font-medium">Card Details</span>
          </label>
          <div className="bg-white px-3 py-2 rounded border border-gray-300">
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-secondary text-primary-content w-full"
          disabled={!stripe}
        >
          💳 Pay ${amount}
        </button>

        {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
        {/* {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )} */}
      </form>
    </div>
  );
};

export default PaymentForm;
