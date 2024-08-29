import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showErrorMsg: '', showSubmitError: false}
  onChangesearchInput = event => {
    this.setState({username: event.target.value})
  }
  onChangesearchpassword = event => {
    this.setState({password: event.target.value})
  }
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, showErrorMsg: errorMsg})
  }
  onSubmission = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {username, password, showErrorMsg, showSubmitError} = this.state
    return (
      <>
        <div className="bgcontainer">
          <div>
            <img
              src="https://res.cloudinary.com/dl7gkovef/image/upload/v1724768086/Rectangle_1467_flxk4h.png"
              className="login-image"
              alt="website login"
            />
          </div>

          <div className="form-container">
            <img
              src="https://res.cloudinary.com/dl7gkovef/image/upload/v1724766600/Group_7731_b0jajk.png"
              className="logo"
              alt="login website logo"
            />
            <form onSubmit={this.onSubmission}>
              <div className="input-label">
                <label htmlFor="userInput" className="label">
                  Username*
                </label>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={this.onChangesearchInput}
                  id="userInput"
                />
              </div>
              <div className="input-label">
                <label htmlFor="userPassword" className="label">
                  Password*
                </label>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={this.onChangesearchpassword}
                  id="userPassword"
                />
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
            {showSubmitError && <p className="error-message">{showErrorMsg}</p>}
          </div>
        </div>
      </>
    )
  }
}
export default LoginPage
