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
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Private/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoute from "../Private/RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import BaRiderLandingPage from "../Pages/Dashboard/BeARider/BaRiderLandingPage";
import ErrorPage from "../Pages/Home/Shared/ErrorPage/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Story from "../Pages/AboutUs/Story/Story";
import Mission from "../Pages/AboutUs/Mission/Mission";
import Success from "../Pages/AboutUs/Success/Success";
import TeamOthers from "../Pages/AboutUs/Team&Others/TeamOthers";
import Profile from "../Pages/Dashboard/Profile/Profile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import PricingCalculator from "../Pages/PricingCalculator/PricingCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        hydrateFallbackElement: <Loader />,
        loader: () => fetch("./coverageData.json"),
      },
      {
        path: "beARiderLandingPage",
        loader: () => fetch("./topAgents.json"),
        element: (
          <PrivateRoute>
            <BaRiderLandingPage/>
          </PrivateRoute>
        ),
      },
      {
        path: "beARider",
        hydrateFallbackElement: <Loader />,
        loader: () => fetch("./coverageData.json"),
        element: (
          <PrivateRoute>
            <BeARider/>
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
      {
        path: "aboutUs",
        Component: AboutUs,
        children: [
          {
            path: "/aboutUs/story",
            Component: Story
          },
          {
            path: "/aboutUs/mission",
            Component: Mission
          },
          {
            path: "/aboutUs/success",
            Component: Success
          },
          {
            path: "/aboutUs/team",
            Component: TeamOthers
          },
        ]
      },
      {
        path: "pricing",
        Component: PricingCalculator
      }
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
      {
        path: "updateProfile",
        Component: UpdateProfile,
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
        index: true,
        Component: DashboardHome
      },
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
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-rider",
        Component: AssignRider,
      },
      {
        path: "/dashboard/activeRiders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/pendingDeliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries></PendingDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "/dashboard/completedDeliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "/dashboard/myEarnings",
        element: (
          <RiderRoute>
            <MyEarnings></MyEarnings>
          </RiderRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute>
          <Profile/>
        </PrivateRoute>
      },
    ],
  },
  {
    path: "forbidden",
    Component: Forbidden,
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);
