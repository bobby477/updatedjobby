import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {name: '', password: '', errorMsg: ''}

  nameChange = event => {
    this.setState({name: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  successfull = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  login = async event => {
    event.preventDefault()

    const {name, password} = this.state

    const userDetails = {username: name, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)

    const data = await response.json()

    if (response.ok === true) {
      this.successfull(data.jwt_token)
    } else if (data.status_code === 400) {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const cookie = Cookies.get('jwt_token')

    if (cookie !== undefined) {
      return <Redirect to="/" />
    }

    const {errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login">
          <div className="logo-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>

          <form onSubmit={this.login} className="form-container">
            <label for="name">USERNAME</label>
            <input
              id="name"
              type="text"
              placeholder="Username"
              onChange={this.nameChange}
            />
            <label for="pass">PASSWORD</label>
            <input
              id="pass"
              type="password"
              placeholder="Placeword"
              onChange={this.passwordChange}
            />
            <button type="Submit" className="login-btn">
              Login
            </button>
            <p className="red-para">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
