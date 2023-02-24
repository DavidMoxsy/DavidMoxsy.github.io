import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import "fa-icons";

const Header = () => {
  return (
    <header>
      <div className="header_nav-area">
        <Link to="/" className="header_logo">
          <fa-icon class="fa fa-home" color="#black" size="40px"></fa-icon>
        </Link>
        <Navbar />
        <p className="header_nombre">Luis González Zúñiga</p>
      </div>
    </header>
  );
};

export default Header;
