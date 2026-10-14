import { Link } from "react-router";

import logo from "../assets/ZuariLogo.png";
import AppStore from "../assets/app_store-removebg-preview.png";
import Play from "../assets/PlayStore.png";
import Irdai from "../assets/irdai.png";
import PoddarLogo from "../assets/PoddarLogo.png";

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="19"
    height="19"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.6v8h2.9Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="19"
    height="19"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.4"
      cy="6.7"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="19"
    height="19"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M5.1 8.1A1.9 1.9 0 1 0 5.1 4.3a1.9 1.9 0 0 0 0 3.8ZM3.5 9.6h3.2V20H3.5V9.6Zm5.2 0h3.1V11h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V20h-3.2v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H8.7V9.6Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="zuari-footer">

      <div className="zuari-footer-glow" />

      <div className="zuari-footer-container">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="zuari-footer-main">

          {/* BRAND */}
<div className="zuari-footer-brand">

  <div className="zuari-footer-logos">

    <Link
      to="/"
      className="zuari-footer-logo-link"
    >
      <img
        src={logo}
        alt="Zuari Insurance Brokers"
        className="zuari-footer-logo"
      />
    </Link>

    <span className="zuari-footer-logo-link zuari-footer-partner-logo">
      <img
        src={PoddarLogo}
        alt="Poddar - Saroj Poddar Group"
        className="zuari-footer-logo"
      />
    </span>

  </div>

  {/* SOCIAL */}
  <div className="zuari-footer-social">

              <span>Follow us</span>

              <a
                href="#"
                aria-label="Facebook"
                className="zuari-social facebook"
              >
                <FacebookIcon />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="zuari-social instagram"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.linkedin.com/company/zuari-insurance-brokers-ltd/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="zuari-social linkedin"
              >
                <LinkedInIcon />
              </a>

            </div>

            {/* APP DOWNLOAD */}
            <div className="zuari-app-download">

              <p>Get the Zuari experience on mobile</p>

              <div className="zuari-app-buttons">

                <a
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={AppStore}
                    alt="Download on the App Store"
                  />
                </a>

                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Play}
                    alt="Get it on Google Play"
                  />
                </a>

              </div>

            </div>

          </div>


          {/* COMPANY */}
          <div className="zuari-footer-column">

            <span className="zuari-footer-column-label">
              COMPANY
            </span>

            <h3>
              About Zuari
            </h3>

            <ul>

              <li>
                <Link to="/about">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/career">
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/privacy">
                  Privacy Notice
                </Link>
              </li>

              <li>
                <Link to="/privacy#grievance-redressal">
                  Grievance Redressal
                </Link>
              </li>

            </ul>

          </div>


          {/* SERVICES */}
          <div className="zuari-footer-column">

            <span className="zuari-footer-column-label">
              SERVICES
            </span>

            <h3>
              Insurance Solutions
            </h3>

            <ul>

              <li>
                <Link to="/solutions">
                  Corporate Insurance
                </Link>
              </li>

              <li>
                <Link to="/solutions">
                  Employee Benefits
                </Link>
              </li>

              <li>
                <Link to="/solutions">
                  Health Insurance
                </Link>
              </li>

              <li>
                <Link to="/solutions">
                  Life Insurance
                </Link>
              </li>

              <li>
                <Link to="/solutions">
                  Risk Management
                </Link>
              </li>

            </ul>

          </div>


          {/* CONTACT */}
          <div className="zuari-footer-column contact">

            <span className="zuari-footer-column-label">
              CONTACT
            </span>

            <h3>
              Get in touch
            </h3>

            <a href="mailto:wecare@zuariinsurance.in">
              wecare@zuariinsurance.in
            </a>

            <a href="tel:01145494500">
              011-45494500
            </a>

            <div className="zuari-footer-office">

              <strong>
                Registered Office
              </strong>

              <p>
                8th Floor, Tower-A, Global Business Park,
                Sector-26, M.G Road,
                Gurgaon-122002, Haryana
              </p>

            </div>

            <div className="zuari-footer-office">

              <strong>
                Corporate Office
              </strong>

              <p>
                A-32, First Floor, Mohan Cooperative
                Industrial Estate, Mathura Road,
                Badarpur, New Delhi-110044
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            TRUST BAR
        ===================================================== */}

        <div className="zuari-footer-trust">

          <div className="zuari-footer-trust-copy">

            <span>
              IRDAI REGISTERED BROKING ENTITY
            </span>

            <strong>
              Insurance products are offered and serviced
              by Zuari Insurance Brokers Limited.
            </strong>

            <p>
              CIN: U66010HR2003PLC137044
            </p>

            <p>
              IRDAI Broking License Registration Code:
              318 · License category: Direct (Life & General)
            </p>

            <p>
              License validity till 12-12-2026.
            </p>

          </div>

          <img
            src={Irdai}
            alt="IRDAI"
            className="zuari-irdai"
          />

        </div>


        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <div className="zuari-footer-bottom">

          <span>
            © {new Date().getFullYear()} Zuari Insurance Brokers Limited
          </span>

          <div>
            <Link to="/privacy">
              Privacy
            </Link>

            <span>·</span>

            <Link to="/contact">
              Support
            </Link>

            <span>·</span>

            <Link to="/login">
              Portal Login
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;