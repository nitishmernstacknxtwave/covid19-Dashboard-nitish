import {Link} from 'react-router-dom'

import './index.css'

const Navbar = () => (
  <nav className="navbar-container">
    <div className="container">
      <Link to="/" className="img-link">
        <img
          src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625723673/COVID19INDIA_tvtxet.png"
          alt="logo"
          className="covid-logo"
        />
      </Link>

      <ul className="nav-items">
        <li>
          <Link to="/" className="nav-home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-about">
            About
          </Link>
        </li>
      </ul>
      <div className="addQ-container">
        <Link to="/tabs">
          <img
            className="addQueue"
            src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625949520/add-to-queue_1_n0hju7.png"
            alt="addQueue"
          />
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
