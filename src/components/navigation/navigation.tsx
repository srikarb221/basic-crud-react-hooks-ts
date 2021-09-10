import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: FC = () => {
    return (
        <header>
            <nav className={"navbar navbar-expand-lg shadow-lg fixed-top"} style={{ backgroundColor: "teal" }}>
                <div className="container">
                    <div className="navbar-brand fs-4" style={{ color: "#d2f3f3" }}>Basic CRUD</div>
                    <ul className="navbar-nav">
                        <li className="nav-item me-5">
                            <NavLink to="/" className="fs-5 text-decoration-none" style={{ color: "whitesmoke" }}>All Users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/create" className="fs-5 text-decoration-none" style={{ color: "whitesmoke" }}>Create a User</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navigation;