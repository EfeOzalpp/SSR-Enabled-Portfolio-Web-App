// src/components/NavMenu.tsx
const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <div className="nav-left">
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
        >
          <circle cx="50" cy="50" r="48" fill="#ffffff" />
          <text x="50%" y="55%" textAnchor="middle" fill="#121212" fontSize="36" fontWeight="bold" fontFamily="sans-serif">EÖ</text>
        </svg>
      </div>

      <div className="nav-right">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-svg"
        >
          <path d="M9 19V6h3v13H9z" />
          <path d="M16 19V10h3v9h-3z" />
        </svg>

        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-svg"
        >
          <path d="M16 8a6 6 0 00-12 0c0 2.67 2.34 5.33 4 7 1.66-1.67 4-4.33 4-7z" />
          <path d="M12 14s1.5 2 3 2 3-2 3-2" />
        </svg>
      </div>
    </nav>
  );
};

export default NavMenu;
