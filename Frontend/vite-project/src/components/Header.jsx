const navItems = ["Overview", "Datasets", "Pipelines", "Docs"];

const Header = () => {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#home" aria-label="AI Model Trainer home">
          <span className="brand__dot" aria-hidden="true" />
          <span className="brand__name">AI Model Trainer</span>
        </a>

        <nav className="header__nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item} href="#" className="header__link">
              {item}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button className="button button--ghost" type="button">
            Sign In
          </button>
          <button className="button" type="button">
            Start Training
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
