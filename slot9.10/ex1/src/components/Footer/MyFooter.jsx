import React from "react";
import "./Footer.css";

export default function MyFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <p className="mb-1 fw-semibold">Author: Wizz</p>
          <p className="mb-1 small">Created by: quocphai180518@fpt.edu.vn</p>
          <p className="mb-1 small">&copy; 2025 Wizz. All rights reserved.</p>
        </div>

        <a
          href="https://github.com/phWiz-2412/FALL2025_FER202"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
            viewBox="0 0 24 24"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.64 10.61.56.1.76-.24.76-.53 0-.26-.01-.95-.02-1.87-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1.0 1.72 2.64 1.22 3.29.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.2 1.15-2.98-.12-.28-.5-1.4.11-2.92 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 2.83-.38c.96.01 1.93.13 2.83.38 2.15-1.45 3.1-1.15 3.1-1.15.61 1.52.23 2.64.11 2.92.72.78 1.15 1.76 1.15 2.98 0 4.3-2.61 5.25-5.1 5.53.4.35.77 1.05.77 2.11 0 1.53-.01 2.76-.01 3.14 0 .29.19.64.77.53C20.3 20.88 23.5 16.69 23.5 11.75 23.5 5.48 18.52.5 12 .5z"/></svg>
          My Link Github: Movie Management Project
        </a>
      </div>
    </footer>
  );
}
