import React from 'react';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>MyApp</div>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '15px',
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <a
            href="/"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '16px',
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '16px',
            }}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '16px',
            }}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
