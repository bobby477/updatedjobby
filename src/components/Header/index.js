import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const logout = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  const backToHome = () => {
    const {history} = props

    history.replace('/')
  }
  return (
    <ul className="header-container">
      <Link className="btn2" onClick={backToHome} to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="links-container">
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/jobs" className="links">
          Jobs
        </Link>
      </div>
      <button className="Logout-button" onClick={logout}>
        Logout
      </button>
    </ul>
  )
}

export default withRouter(Header)
