// src/components/Footer/MyFooter.jsx
import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter() {
  const author = "Wizz";
  const email = "quocphde180518@fpt.edu.vn";
  const linkGithub = "https://github.com/phWiz-2412/FALL2025_FER202"; // 🔹 sửa link này theo repo thật của bạn

  return (
    <footer className="app-footer">
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved</p>
      <Button
        variant="link"
        href={linkGithub}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        My Link Github: Movie Management Project
      </Button>
    </footer>
  );
}

export default MyFooter;
