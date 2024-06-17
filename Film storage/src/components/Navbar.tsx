import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li className="navbar-item text-light" style={{color:'white'}}>Hello, {user.username} ({user.role})</li>
            <li className="navbar-item text-light" style={{color:'white'}} onClick={logout}><Link to="/">Logout</Link></li>
            {user.role === 'admin' && <li className="navbar-item"><Link to="/admin-panel">Admin</Link></li>}
          </>
        ) : (
          <>
            <li className="navbar-item"><Link to="/login">Login</Link></li>
            <li className="navbar-item"><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
