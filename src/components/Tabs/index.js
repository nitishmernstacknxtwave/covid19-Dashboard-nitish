import './index.css'
import {Link} from 'react-router-dom'

const Tabs = () => (
  <div className="tabs-container">
    <Link to="/">
      <button className="btn" type="button">
        Home
      </button>
    </Link>
    <Link to="/about">
      <button className="btn" type="button">
        About
      </button>
    </Link>
  </div>
)

export default Tabs
