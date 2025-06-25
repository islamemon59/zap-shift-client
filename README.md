# 📦 ParcelSwift – Parcel Delivery Web Application

ParcelSwift is a full-featured parcel delivery platform that allows users to create delivery orders, calculate delivery costs, and manage shipments across all 64 districts in Bangladesh. It supports role-based access for customers, delivery personnel, and admins to ensure a smooth and secure experience.

## 🔗 Live Site

[Visit ParcelSwift Live](https://your-live-site-link.com)

## 🚀 Features

- 📋 **Parcel Booking Form:** Dynamic form to enter parcel, sender, and receiver information with real-time delivery cost calculation.
- 🔐 **Authentication & Authorization:** Firebase Auth handles user login and signup. Protected routes ensure access control based on roles.
- 🗺️ **District-wide Coverage:** Users can select from all 64 districts of Bangladesh for sender and receiver addresses.
- 💰 **Dynamic Delivery Cost:** Delivery cost is automatically calculated based on parcel weight and distance.
- 💳 **Stripe Integration:** Secure payment system with Stripe; after successful payment, `payment_status` is updated to `"paid"` and stored in a dedicated payment history collection.
- 📂 **Admin Dashboard:** Admins can view and manage all parcels and payment histories, sorted by the latest entries.

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with native MongoDB driver)
- **Authentication:** Firebase Authentication
- **Payment Gateway:** Stripe
- **State & Data Management:** Axios, React Hook Form
- **Security:** JWT (JSON Web Token), CORS

## 📁 Project Structure

- `client/` – React front-end with form handling, protected routes, and Stripe Elements
- `server/` – Express backend with REST APIs for parcel creation, payment handling, and admin controls
- `collections:`  
  - `parcelCollection` – Stores all parcel orders  
  - `paymentHistory` – Stores payment method, transaction ID, ISO date, and related data

## 💡 Future Improvements

- 🗂️ Filter and sort options for parcel tracking  
- 🔔 Notification system for delivery status updates  
- 📱 PWA support for mobile users

---

