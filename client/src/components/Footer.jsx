function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/img/logo-green.png" alt="natour logo" />
      </div>

      <ul className="footer__nav">
        <li>
          <a href="/about">About us</a>
        </li>
        <li>
          <a href="/download">Download Apps </a>
        </li>
        <li>
          <a href="/becomeguide">Become a guide</a>
        </li>
        <li>
          <a href="/career">Career</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>

      <p className="footer__copyright">&copy; by Khushbu Chaudhary</p>
    </footer>
  );
}

export default Footer;
