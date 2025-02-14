import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

class Home extends Component {
  FindJob = () => {
    const {history} = this.props

    history.replace('/jobs')
  }
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="title-card">
          <h1 className="head">Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="job-button" onClick={this.FindJob}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
