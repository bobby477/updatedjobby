import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import {BsStarFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {BsBagFill} from 'react-icons/bs'

import {BsBoxArrowUpRight} from 'react-icons/bs'

import SimilarJob from '../SimilarJob'

import Skills from '../Skills'

import './index.css'

const states = {
  render: 'render',
  load: 'load',
  fail: 'fail',
}

class SelectedJob extends Component {
  state = {start: states.load, list: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props

    const {params} = match

    const {id} = params

    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      this.setState({start: states.render, list: data})
    } else {
      this.setState({start: states.fail})
    }
  }

  loaderFunction = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  fail = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button>Retry</button>
    </div>
  )

  rendFunction = () => {
    const {list} = this.state

    const {job_details, similar_jobs} = list

    const {skills, life_at_company} = job_details

    return (
      <>
        <div className="licontainer">
          <div className="logo-container">
            <img
              src={job_details.company_logo_url}
              className="logoimg"
              alt="job details company logo"
            />
            <div>
              <h1 className="head">{job_details.title}</h1>
              <div className="star">
                <BsStarFill className="bs" />
                <p>{job_details.rating}</p>
              </div>
            </div>
          </div>

          <div className="location-container">
            <div className="location-card">
              <div className="location-align">
                <FaMapMarkerAlt />
                <p>{job_details.location}</p>
              </div>
              <div className="location-align">
                <BsBagFill />
                <p>{job_details.employment_type}</p>
              </div>
            </div>
            <p>{job_details.package_per_annum}</p>
          </div>
          <hr />
          <div>
            <div className="desc">
              <h2>Description</h2>
              <a href={job_details.company_website_url}>
                Visit <BsBoxArrowUpRight />
              </a>
            </div>
            <p>{job_details.job_description}</p>
          </div>
          <div>
            <h1>Skills</h1>

            <ul className="unorder-container">
              {skills.map(each => (
                <Skills content={each} />
              ))}
            </ul>
          </div>
          <div>
            <h1>Life at Company</h1>
            <div className="company-container">
              <p className="incpara">{life_at_company.description}</p>
              <img src={life_at_company.image_url} alt="life at company" />
            </div>
          </div>
        </div>
        <div className="white-head">
          <h1>Similar Jobs</h1>
          <div className="unorder-container2">
            {similar_jobs.map(each => (
              <SimilarJob content={each} key={each.id} />
            ))}
          </div>
        </div>
      </>
    )
  }
  checkState = () => {
    const {start} = this.state

    switch (start) {
      case states.render:
        return this.rendFunction()
      case states.load:
        return this.loaderFunction()

      case states.fail:
        return this.fail()

      default:
        return null
    }
  }
  render() {
    return (
      <div className="selected-container">
        <Header />
        <div className="main">{this.checkState()}</div>
      </div>
    )
  }
}

export default SelectedJob
