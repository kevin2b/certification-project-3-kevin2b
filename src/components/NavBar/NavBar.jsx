import { Link } from "react-router";

function NavBar(){
  return (
    <nav>
      <Link to="/"> Home</Link>
      {` | `}
      <Link to="/shop"> Shop </Link>
      {` | `}
      <Link to="/about"> About </Link>
      {` | `}
      <Link to="/cart"> Cart </Link>
    </nav>
  )
}

export default NavBar;
