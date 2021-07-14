import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1626037039/Group_7484_js8o9q.png"
      className="nf-image"
      alt="notFound"
    />
    <h1 className="nf-heading">PAGE NOT FOUND</h1>
    <p className="sorry-text">
      We are sorry the page you have requested could not be found
      <br />
      Please got back to the home page
    </p>
    <Link to="/">
      <button className="home-btn" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
