import {
  createBrowserRouter,
  Navigate,
} from "react-router";

import Homepage from "./pages/Homepage";
import Solutionpage from "./pages/Solutionpage";
import Contactpage from "./pages/Contactpage";
import Aboutpage from "./pages/Aboutpage";
import Privacypage from "./pages/Privacypage";
import Careerpage from "./pages/Careerpage";

import PortalSelection from "./portal/PortalSelection";
import PortalLogin from "./portal/PortalLogin";
import CustomerDashboard from "./portal/CustomerDashboard";
import CorporateDashboard from "./portal/CorporateDashboard";
import PortalModulePage from "./portal/PortalModulePage";

import { usePortalAuth } from "./contexts/portalAuth.context";

import ComingSoonPage from "./pages/ComingSoonPage";

// Set to true when the portal login is ready to go live
const PORTAL_LIVE = false;

function ProtectedRoute({
  type,
  children,
}) {
  const {
    user,
  } = usePortalAuth();

  if (!user) {
    return (
      <Navigate
        to={
          type === "corporate"
            ? "/portal/corporate/login"
            : "/portal/customer/login"
        }
        replace
      />
    );
  }

  if (
    type === "corporate" &&
    user.role !== "corporate_employee"
  ) {
    return (
      <Navigate
        to="/portal/corporate/login"
        replace
      />
    );
  }

  if (
    type === "customer" &&
    user.role !== "customer"
  ) {
    return (
      <Navigate
        to="/portal/customer/login"
        replace
      />
    );
  }

  return children;
}


export const router =
  createBrowserRouter([

    /* =====================================================
       PUBLIC WEBSITE
    ===================================================== */

    {
      path: "/",
      element: <Homepage />,
    },

    {
      path: "/solutions",
      element: <Solutionpage />,
    },

    {
      path: "/contact",
      element: <Contactpage />,
    },

    {
      path: "/about",
      element: <Aboutpage />,
    },

    {
      path: "/privacy",
      element: <Privacypage />,
    },

    {
      path: "/career",
      element: <Careerpage />,
    },


    /* =====================================================
       PORTAL ENTRY
    ===================================================== */
    {
      path: "/login",
      element: PORTAL_LIVE ? <PortalSelection /> : <ComingSoonPage />,
    },

    {
      path: "/portal",
      element: PORTAL_LIVE ? <PortalSelection /> : <ComingSoonPage />,
    },

    {
      path: "/portal/customer/login",
      element: PORTAL_LIVE
        ? <PortalLogin type="customer" />
        : <ComingSoonPage portal="customer" />,
    },

    {
      path: "/portal/corporate/login",
      element: PORTAL_LIVE
        ? <PortalLogin type="corporate" />
        : <ComingSoonPage portal="corporate" />,
    },


    /* =====================================================
       CUSTOMER DASHBOARD
    ===================================================== */

    {
      path: "/customer/dashboard",
      element: (
        <ProtectedRoute
          type="customer"
        >
          <CustomerDashboard />
        </ProtectedRoute>
      ),
    },


    {
      path: "/customer/:module",
      element: (
        <ProtectedRoute
          type="customer"
        >
          <PortalModulePage
            type="customer"
          />
        </ProtectedRoute>
      ),
    },


    /* =====================================================
       CORPORATE DASHBOARD
    ===================================================== */

    {
      path: "/corporate/dashboard",
      element: (
        <ProtectedRoute
          type="corporate"
        >
          <CorporateDashboard />
        </ProtectedRoute>
      ),
    },


    {
      path: "/corporate/:module",
      element: (
        <ProtectedRoute
          type="corporate"
        >
          <PortalModulePage
            type="corporate"
          />
        </ProtectedRoute>
      ),
    },


    /* =====================================================
       FALLBACK
    ===================================================== */

    {
      path: "*",
      element: (
        <Navigate
          to="/"
          replace
        />
      ),
    },

  ]);