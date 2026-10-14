import { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import {
  Link,
  useNavigate,
} from 'react-router';

import toast from 'react-hot-toast';

import {
  demoCorporateLogin,
  demoCustomerLogin,
} from '../services/demoAuth.api';

import { usePortalAuth } from '../contexts/portalAuth.context';

import './portal.css';

import logo from '../assets/ZuariLogo.png';


const demoCustomer = {
  id: 'CUST10001',
  email: 'customer@zuari-demo.com',
  password: 'Zuari@123',
};


const demoCorporate = {
  corporateId: 'CORP10001',
  employeeId: 'EMP10001',
  email: 'employee@zuari-demo.com',
  password: 'Zuari@123',
};


export default function PortalLogin({
  type = 'customer',
}) {

  const corporate = type === 'corporate';

  const navigate = useNavigate();

  const { login } = usePortalAuth();


  const [identifier, setIdentifier] =
    useState('');

  const [corporateId, setCorporateId] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  const fillDemo = () => {

    if (corporate) {

      setCorporateId(
        demoCorporate.corporateId
      );

      setIdentifier(
        demoCorporate.employeeId
      );

      setPassword(
        demoCorporate.password
      );

    } else {

      setIdentifier(
        demoCustomer.id
      );

      setPassword(
        demoCustomer.password
      );

    }
  };


  const submit = async (event) => {

    event.preventDefault();

    setLoading(true);

    try {

      const response = corporate
        ? await demoCorporateLogin(
            corporateId,
            identifier,
            password
          )
        : await demoCustomerLogin(
            identifier,
            password
          );


      login(response.user);


      toast.success(
        `Welcome back, ${response.user.name}`
      );


      navigate(
        corporate
          ? '/corporate/dashboard'
          : '/customer/dashboard'
      );

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        'Unable to sign in. Please check your demo credentials.'
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <main className="portal-login-page">

      <div
        className={`portal-login-shell ${
          corporate ? 'corporate' : ''
        }`}
      >

        {/* LEFT */}

        <section className="portal-login-intro">

          <Link
            to="/"
            className="portal-login-logo"
          >
            <img
              src={logo}
              alt="Zuari Insurance Brokers"
            />
          </Link>


          <Link
            to="/login"
            className="portal-back-link"
          >
            <ArrowLeft size={16} />
            Back to portal selection
          </Link>


          <span className="portal-kicker">

            {corporate ? (
              <Building2 size={16} />
            ) : (
              <UserRound size={16} />
            )}

            {corporate
              ? 'CORPORATE PORTAL'
              : 'CUSTOMER PORTAL'}

          </span>


          <h1>
            {corporate
              ? 'Your organization, connected.'
              : 'Your insurance, simplified.'}
          </h1>


          <p>
            {corporate
              ? 'Manage employee benefits, policies, claims and renewals through one connected workspace.'
              : 'Manage policies, claims, renewals and documents from one simple insurance workspace.'}
          </p>


          <div className="portal-login-points">

            <div>
              <span>✓</span>
              Live policy visibility
            </div>

            <div>
              <span>✓</span>
              Faster claims assistance
            </div>

            <div>
              <span>✓</span>
              Documents available in one place
            </div>

          </div>

        </section>


        {/* FORM */}

        <section className="portal-login-card">

          <div className="portal-login-card-header">

            <div className="portal-login-card-icon">
              <ShieldCheck size={23} />
            </div>

            <span className="portal-eyebrow">
              DEMO ACCESS
            </span>

            <h2>
              {corporate
                ? 'Employee Login'
                : 'Customer Login'}
            </h2>

            <p>
              Enter your demo credentials to
              access the portal.
            </p>

          </div>


          <form
            onSubmit={submit}
            className="portal-form"
          >

            {corporate && (
              <label>

                <span>
                  Corporate ID
                </span>

                <div className="portal-input-wrap">

                  <Building2 size={17} />

                  <input
                    value={corporateId}
                    onChange={(e) =>
                      setCorporateId(
                        e.target.value
                      )
                    }
                    placeholder="CORP10001"
                    required
                  />

                </div>

              </label>
            )}


            <label>

              <span>
                {corporate
                  ? 'Employee ID / Email'
                  : 'Customer ID / Email'}
              </span>

              <div className="portal-input-wrap">

                <Mail size={17} />

                <input
                  value={identifier}
                  onChange={(e) =>
                    setIdentifier(
                      e.target.value
                    )
                  }
                  placeholder={
                    corporate
                      ? 'EMP10001'
                      : 'CUST10001'
                  }
                  required
                />

              </div>

            </label>


            <label>

              <span>
                Password
              </span>

              <div className="portal-input-wrap">

                <KeyRound size={17} />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  className="portal-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </label>


            <button
              type="submit"
              disabled={loading}
              className="portal-submit"
            >

              {loading
                ? 'Signing in…'
                : 'Enter Portal'}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          <button
            type="button"
            onClick={fillDemo}
            className="portal-demo-fill"
          >
            Fill demo credentials
          </button>


          <div className="portal-credential-card">

            <strong>
              Demo credentials
            </strong>

            {corporate ? (
              <>
                <span>
                  Corporate ID: CORP10001
                </span>

                <span>
                  Employee ID: EMP10001
                </span>

                <span>
                  Password: Zuari@123
                </span>
              </>
            ) : (
              <>
                <span>
                  Customer ID: CUST10001
                </span>

                <span>
                  Password: Zuari@123
                </span>
              </>
            )}

          </div>

        </section>

      </div>

    </main>
  );
}