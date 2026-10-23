import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import logo from "../assets/ZuariLogo.png";
import poddarLogo from "../assets/PoddarLogo.png";

const nav = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About Us",
  },
  {
    to: "/solutions",
    label: "Solutions",
  },
  {
    to: "/contact",
    label: "Contact Us",
  },
  {
    to: "/career",
    label: "Career",
  },
];
export function Navbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setLoginOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-[#dbe4ee]/80 bg-white/90 shadow-[0_8px_30px_rgba(7,27,54,0.06)] backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-md"
        }
      `}
    >

      {/* =====================================================
          DESKTOP / MAIN NAV
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[76px]
          max-w-[1440px]
          items-center
          justify-between
          px-6
          lg:px-10
        "
      >

        {/* LOGO */}

        <Link
          to="/"
          className="
            group
            flex
            shrink-0
            items-center
          "
        >
          <img
            src={logo}
            alt="Zuari Insurance Brokers"
            className="
              h-[48px]
              w-auto
              object-contain
              transition-transform
              duration-300
              group-hover:scale-[1.02]
            "
          />
        </Link>


        {/* NAVIGATION */}

        <nav
          className="
            hidden
            items-center
            gap-1
            md:flex
          "
        >

          {nav.map((item) => {

            const active =
              location.pathname === item.to ||
              location.pathname.startsWith(
                `${item.to}/`
              );

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  relative
                  rounded-full
                  px-4
                  py-2.5
                  text-[13px]
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    active
                      ? "bg-[#edf4fc] text-[#1769e0]"
                      : "text-[#53677f] hover:bg-[#f3f7fb] hover:text-[#10233f]"
                  }
                `}
              >
                {item.label}

                {active && (
                  <span
                    className="
                      absolute
                      bottom-[3px]
                      left-1/2
                      h-[2px]
                      w-4
                      -translate-x-1/2
                      rounded-full
                      bg-[#1769e0]
                    "
                  />
                )}
              </Link>
            );
          })}

        </nav>


        {/* RIGHT SIDE */}

        <div
          className="
            hidden
            items-center
            gap-3
            md:flex
          "
        >
                    {/* PODDAR LOGO */}
          <img
            src={poddarLogo}
            alt="Saroj Poddar Group"
            className="h-9 w-auto object-contain"
          />
          <span className="h-6 w-px bg-[#dce5ef]" aria-hidden="true" />


          {/* LOGIN */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setLoginOpen(
                  (value) => !value
                )
              }
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-4
                py-2.5
                text-[13px]
                font-semibold
                transition-all
                ${
                  loginOpen
                    ? "bg-[#edf4fc] text-[#1769e0]"
                    : "text-[#53677f] hover:bg-[#f3f7fb] hover:text-[#10233f]"
                }
              `}
            >
              Log in
              <ChevronDown
                size={15}
                className={`
                  transition-transform
                  ${
                    loginOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>


            {loginOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+10px)]
                  w-[280px]
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#dce5ef]
                  bg-white
                  p-2
                  shadow-[0_25px_70px_rgba(7,27,54,0.14)]
                "
              >

                <div
                  className="
                    border-b
                    border-[#edf1f5]
                    px-3
                    pb-3
                    pt-2
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-[#8293a8]
                    "
                  >
                    <ShieldCheck
                      size={14}
                      className="text-[#1769e0]"
                    />

                    Portal Access
                  </div>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#8290a1]
                    "
                  >
                    Select the workspace you want
                    to access.
                  </p>
                </div>


                <Link
                  to="/portal/customer/login"
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    rounded-[14px]
                    p-3
                    transition
                    hover:bg-[#f3f7fc]
                  "
                >

                  <span
                    className="
                      grid
                      h-10
                      w-10
                      shrink-0
                      place-items-center
                      rounded-xl
                      bg-[#eaf3ff]
                      text-[#1769e0]
                    "
                  >
                    <ShieldCheck size={18} />
                  </span>

                  <span className="flex-1">
                    <strong
                      className="
                        block
                        text-[12px]
                        font-bold
                        text-[#152a45]
                      "
                    >
                      Customer Portal
                    </strong>

                    <small
                      className="
                        mt-0.5
                        block
                        text-[10px]
                        text-[#8998aa]
                      "
                    >
                      Policies, claims & documents
                    </small>
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-[#a2afbd]"
                  />
                </Link>


                <Link
                  to="/portal/corporate/login"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-[14px]
                    p-3
                    transition
                    hover:bg-[#f3f7fc]
                  "
                >

                  <span
                    className="
                      grid
                      h-10
                      w-10
                      shrink-0
                      place-items-center
                      rounded-xl
                      bg-[#edf4fc]
                      text-[#0b4f9e]
                    "
                  >
                    <ShieldCheck size={18} />
                  </span>

                  <span className="flex-1">
                    <strong
                      className="
                        block
                        text-[12px]
                        font-bold
                        text-[#152a45]
                      "
                    >
                      Corporate Portal
                    </strong>

                    <small
                      className="
                        mt-0.5
                        block
                        text-[10px]
                        text-[#8998aa]
                      "
                    >
                      Employee benefits & policies
                    </small>
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-[#a2afbd]"
                  />
                </Link>

              </div>
            )}

          </div>


          {/* CONTACT BUTTON */}

          <Link
            to="/contact"
            className="
              inline-flex
              h-[43px]
              items-center
              justify-center
              rounded-full
              bg-[#071b36]
              px-5
              text-[12px]
              font-bold
              text-white
              shadow-[0_10px_25px_rgba(7,27,54,0.16)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#1769e0]
              hover:shadow-[0_15px_30px_rgba(23,105,224,0.22)]
            "
          >
            Get in Touch
          </Link>

        </div>


        {/* MOBILE MENU */}

        <button
          type="button"
          className="
            grid
            h-10
            w-10
            place-items-center
            rounded-xl
            text-[#10233f]
            transition
            hover:bg-[#edf3fa]
            md:hidden
          "
          onClick={() =>
            setOpen(
              (value) => !value
            )
          }
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE NAV
      ===================================================== */}

      {open && (
        <div
          className="
            border-t
            border-[#dfe7f0]
            bg-white/95
            px-5
            pb-5
            pt-3
            shadow-[0_20px_40px_rgba(7,27,54,0.08)]
            backdrop-blur-xl
            md:hidden
          "
        >

          <nav className="flex flex-col gap-1">

            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-[13px]
                  font-semibold
                  text-[#53677f]
                  transition
                  hover:bg-[#f2f6fb]
                  hover:text-[#1769e0]
                "
              >
                {item.label}
              </Link>
            ))}


            <div
              className="
                mt-3
                border-t
                border-[#edf1f5]
                pt-3
              "
            >

              <div
                className="
                  mb-2
                  px-4
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#8a9aac]
                "
              >
                Portal Access
              </div>

              <Link
                to="/portal/customer/login"
                className="
                  block
                  rounded-xl
                  px-4
                  py-3
                  text-[13px]
                  font-semibold
                  text-[#10233f]
                  hover:bg-[#f2f6fb]
                "
              >
                Customer Portal
              </Link>

              <Link
                to="/portal/corporate/login"
                className="
                  block
                  rounded-xl
                  px-4
                  py-3
                  text-[13px]
                  font-semibold
                  text-[#10233f]
                  hover:bg-[#f2f6fb]
                "
              >
                Corporate Portal
              </Link>

            </div>


            <Link
              to="/contact"
              className="
                mt-3
                flex
                h-11
                items-center
                justify-center
                rounded-full
                bg-[#071b36]
                text-[12px]
                font-bold
                text-white
              "
            >
              Get in Touch
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}