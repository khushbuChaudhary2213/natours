function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/img/logo-green.png" alt="natour logo" />
      </div>

      <ul className="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download Apps </a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Career</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <p className="footer__copyright">&copy; by Khushbu Chaudhary</p>
    </footer>
  );
}

export default Footer;
