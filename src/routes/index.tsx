import Auth from "@/layout/Auth/Auth";
import Dashboard from "@/layout/Dasboard/Dashboard";
import About from "@/pages/About";

import ChangePassword from "@/pages/ChangePassword";
import Chat from "@/pages/Chat";

import DashboardHome from "@/pages/DashboardHome";
import FAQPage from "@/pages/FAQ";
import ForgetPassword from "@/pages/ForgetPassword";
import Login from "@/pages/Login";
import MakeAdmin from "@/pages/MakeAdmin";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Profile from "@/pages/Profile";
import Slider from "@/pages/Slider";

import SetNewPassword from "@/pages/SetNewPassword";
import Settings from "@/pages/Settings";
import UserDetails from "@/pages/UserDetails";

import Notification from "@/pages/Notification";
import Packages from "@/pages/Packages";
import PromoCode from "@/pages/PromoCode";
import PurchasedPackageList from "@/pages/PurchasedList";
import ScheduleRecord from "@/pages/ScheduleRecord";
import TermsAndCondition from "@/pages/TermsAndCondition";
import TrainingArticle from "@/pages/TrainingArticle";
import TrainingProgram from "@/pages/TrainingProgram";
import VerifyEmail from "@/pages/VerifyEmail";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/user-details",
        element: <UserDetails />,
      },
      {
        path: "/schedule-record",
        element: <ScheduleRecord />,
      },
      {
        path: "/purchase-list",
        element: <PurchasedPackageList />,
      },
      {
        path: "/training-program",
        element: <TrainingProgram />,
      },
      {
        path: "/training-articles",
        element: <TrainingArticle />,
      },

      {
        path: "/manages/promo-code",
        element: <PromoCode />,
      },
      {
        path: "/manages/packages",
        element: <Packages />,
      },

      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/make-admin",
        element: <MakeAdmin />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/slider",
        element: <Slider />,
      },
      {
        path: "/settings/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/about",
        element: <About />,
      },
      {
        path: "/settings/faq",
        element: <FAQPage />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/verify/:email",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/set-new-password/:email",
        element: <SetNewPassword />,
      },
    ],
  },
]);

export default router;
