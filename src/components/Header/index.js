import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onclicktoLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="link-item">
          <img
            src="https://res.cloudinary.com/dl7gkovef/image/upload/v1724766600/Group_7731_b0jajk.png"
            className="logo-homepage"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="list-container">
        <li className="list-item">
          <Link className="link-item" to="/">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link className="link-item" to="/shelf">
            Bookshelves
          </Link>
        </li>
        <li className="list-item">
          <button className="button-logout" onClick={onclicktoLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
