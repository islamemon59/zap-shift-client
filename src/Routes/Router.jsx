import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import Loader from "../Pages/Home/Shared/Loader/Loader";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../Private/PrivateRoute";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MyParcel from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        hydrateFallbackElement: <Loader />,
        loader: () => fetch("./coverageData.json"),
      },
      {
        path: "beARider",
        hydrateFallbackElement: <Loader />,
        loader: () => fetch("./coverageData.json"),
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
      {
        path: "sendParcel",
        hydrateFallbackElement: <Loader />,
        loader: () => fetch("./coverageData.json"),
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/myParcel",
        Component: MyParcel,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "/dashboard/paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/trackParcel",
        Component: TrackParcel,
      },
      {
        path: "/dashboard/pendingRiders",
        Component: PendingRiders,
      },
      {
        path: "/dashboard/activeRiders",
        Component: ActiveRiders,
      },
    ],
  },
]);
