import { menuItems } from "../../menuItems";
import MenuItems from "../menuItems/MenuItems";

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar_menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
