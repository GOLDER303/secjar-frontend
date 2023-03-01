import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
    return (
        <nav className="site-bar">
            <ul>
                <li>
                    <Link to={"/home"}>Home</Link>
                </li>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
