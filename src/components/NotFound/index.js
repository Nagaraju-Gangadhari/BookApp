import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dl7gkovef/image/upload/v1724855541/Group_7484_lyyocu.png"
        alt="not found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found,
        <br />
        Please go back to the homepage.
      </p>
      <button className="button">
        <Link to="/" className="link-item">Go Back to Home</Link> 
      </button>
    </div>
  )
}

export default NotFound
