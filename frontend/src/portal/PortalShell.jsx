import { useEffect, useState } from 'react';
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  LogOut,
  Menu,
  PanelLeft,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { usePortalAuth } from '../contexts/portalAuth.context';
import { customerNav, corporateNav } from './portalNav';
import logo from '../assets/ZuariLogo.png';
import './portal.css';

export default function PortalShell({
  children,
  type = 'customer',
  title,
  subtitle,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = usePortalAuth();

  const corporate = type === 'corporate';
  const navItems = corporate ? corporateNav : customerNav;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === 'Escape') {
        setSearchOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentItem =
    navItems.find((item) => location.pathname === item.path) ||
    navItems.find(
      (item) =>
        item.path !== '/customer/dashboard' &&
        item.path !== '/corporate/dashboard' &&
        location.pathname.startsWith(item.path)
    );

  const handleLogout = () => {
    logout();
    navigate(corporate ? '/portal/corporate/login' : '/portal/customer/login');
  };

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`portal-app ${
        corporate ? 'portal-app-corporate' : 'portal-app-customer'
      } ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
    >
      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <button
          className="portal-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`portal-sidebar ${
          mobileOpen ? 'mobile-sidebar-open' : ''
        }`}
      >
        <div className="portal-sidebar-inner">

          {/* LOGO */}
          <div className="portal-brand">
            <Link to="/" className="portal-brand-link">
              <img
                src={logo}
                alt="Zuari Insurance Brokers"
                className="portal-logo"
              />
            </Link>

            <button
              className="portal-mobile-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {/* PORTAL IDENTITY */}
          <div className="portal-identity">
            <div className="portal-identity-icon">
              <ShieldCheck size={17} />
            </div>

            <div className="portal-identity-copy">
              <span>{corporate ? 'CORPORATE' : 'CUSTOMER'}</span>
              <strong>Portal</strong>
            </div>

            <span className="portal-live-dot" />
          </div>

          {/* COLLAPSE */}
          <button
            className="portal-sidebar-toggle"
            onClick={() => setSidebarOpen((value) => !value)}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {/* NAVIGATION */}
          <div className="portal-nav-section">
            <div className="portal-nav-heading">
              <span>WORKSPACE</span>
            </div>

            <nav className="portal-nav">
              {navItems.map((item) => {
                const active =
                  location.pathname === item.path ||
                  (item.path !== '/customer/dashboard' &&
                    item.path !== '/corporate/dashboard' &&
                    location.pathname.startsWith(item.path));

                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`portal-nav-item ${
                      active ? 'active' : ''
                    }`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <span className="portal-nav-icon">
                      {Icon && <Icon size={18} strokeWidth={1.8} />}
                    </span>

                    <span className="portal-nav-label">
                      {item.label}
                    </span>

                    {active && (
                      <span className="portal-nav-active-line" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* SIDEBAR BOTTOM */}
          <div className="portal-sidebar-bottom">

            <div className="portal-demo-status">
              <div className="portal-demo-status-icon">
                <span />
              </div>

              <div className="portal-demo-status-copy">
                <strong>Demo Environment</strong>
                <span>Prototype mode</span>
              </div>
            </div>

            <button
              className="portal-signout"
              onClick={handleLogout}
              title={!sidebarOpen ? 'Sign out' : undefined}
            >
              <LogOut size={17} />

              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="portal-main">

        {/* ================= TOPBAR ================= */}
        <header className="portal-topbar">

          <div className="portal-topbar-left">

            <button
              className="portal-menu-button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div className="portal-breadcrumbs">
              <Link to="/">Zuari</Link>

              <ChevronRight size={14} />

              <span>
                {corporate ? 'Corporate Portal' : 'Customer Portal'}
              </span>

              {currentItem && (
                <>
                  <ChevronRight size={14} />
                  <strong>{currentItem.label}</strong>
                </>
              )}
            </div>
          </div>

          <div className="portal-topbar-center">

            <button
              className="portal-command-search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={17} />

              <span>
                Search policies, claims, documents...
              </span>

              <kbd>
                <Command size={12} /> K
              </kbd>
            </button>
          </div>

          <div className="portal-topbar-right">

            {/* STATUS */}
            <div className="portal-topbar-status">
              <span />
              <span>All systems operational</span>
            </div>

            {/* NOTIFICATIONS */}
            <button
              className="portal-icon-button"
              title="Notifications"
            >
              <Bell size={19} />
              <span className="portal-notification-dot" />
            </button>

            {/* PROFILE */}
            <div className="portal-profile-wrapper">

              <button
                className={`portal-profile ${
                  profileOpen ? 'open' : ''
                }`}
                onClick={() => setProfileOpen((value) => !value)}
              >
                <div className="portal-avatar">
                  {(user?.name || 'U')
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="portal-profile-info">
                  <strong>{user?.name || 'Portal User'}</strong>
                  <span>
                    {corporate
                      ? user?.designation || 'Corporate Employee'
                      : 'Policyholder'}
                  </span>
                </div>

                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="portal-profile-menu">

                  <div className="portal-profile-menu-header">
                    <div className="portal-avatar large">
                      {(user?.name || 'U')
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {user?.name || 'Portal User'}
                      </strong>

                      <span>
                        {user?.email ||
                          (corporate
                            ? 'Corporate Employee'
                            : 'Customer')}
                      </span>
                    </div>
                  </div>

                  <div className="portal-profile-divider" />

                  <Link
                    to={
                      corporate
                        ? '/corporate/dashboard'
                        : '/customer/dashboard'
                    }
                    onClick={() => setProfileOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button onClick={handleLogout}>
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="portal-content">

          {/* PAGE HEADER */}
          {(title || subtitle) && (
            <section className="portal-page-heading">

              <div className="portal-page-heading-main">

                <div className="portal-page-eyebrow">
                  <span className="portal-eyebrow-line" />
                  {corporate
                    ? 'CORPORATE BENEFITS'
                    : 'MY INSURANCE'}
                </div>

                {title && (
                  <h1>{title}</h1>
                )}

                {subtitle && (
                  <p>{subtitle}</p>
                )}
              </div>

              <div className="portal-page-heading-meta">
                <div className="portal-secure-badge">
                  <ShieldCheck size={15} />
                  Demo workspace
                </div>
              </div>
            </section>
          )}

          {/* DASHBOARD / PAGE */}
          <div className="portal-content-inner">
            {children}
          </div>
        </main>

        {/* ================= SEARCH COMMAND MODAL ================= */}
        {searchOpen && (
          <div
            className="portal-search-overlay"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="portal-search-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="portal-search-header">
                <Search size={19} />

                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search your portal..."
                />

                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="portal-search-results">

                {filteredNav.length > 0 ? (
                  <>
                    <div className="portal-search-section-title">
                      NAVIGATION
                    </div>

                    {filteredNav.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="portal-search-result"
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <span>
                            {Icon && (
                              <Icon
                                size={17}
                                strokeWidth={1.8}
                              />
                            )}
                          </span>

                          <div>
                            <strong>{item.label}</strong>
                            <small>Open module</small>
                          </div>

                          <ChevronRight size={16} />
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <div className="portal-search-empty">
                    <Search size={30} />
                    <strong>No results found</strong>
                    <span>
                      Try searching for policies, claims or documents.
                    </span>
                  </div>
                )}
              </div>

              <div className="portal-search-footer">
                <span>
                  <kbd>ESC</kbd> Close
                </span>

                <span>
                  <kbd>↵</kbd> Open
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}