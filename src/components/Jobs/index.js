import './index.css'

import {Component} from 'react'

import Header from '../Header'

import JobFilter from '../JobFilter'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import JobList from '../JobList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const states = {
  render: 'render',
  load: 'load',
  fail: 'fail',
  empty: 'empty',
}

class Jobs extends Component {
  state = {
    stages: states.load,
    employeementType: [],
    salaryRange: '',
    searchValue: '',
    jobData: [],
    user: {},
  }
  componentDidMount() {
    this.getJobs()
    this.userDetails()
  }

  userDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    const data = await response.json()

    const {profile_details} = data

    const newData = {
      name: profile_details.name,
      profileImageUrl: profile_details.profile_image_url,
      shortBio: profile_details.short_bio,
    }

    this.setState({user: newData})
  }
  getJobs = async () => {
    const {employeementType, salaryRange, searchValue} = this.state

    const newD = employeementType.join()

    

    const url = `https://apis.ccbp.in/jobs?employment_type=${newD}&minimum_package=${salaryRange}&search=${searchValue}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const {jobs} = data

      if (jobs.length === 0) {
        return this.setState({stages: states.empty})
      }
      const updated = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({stages: states.render, jobData: updated})
    } else {
      this.setState({stages: states.fail})
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

  emp = () => (
    <div className="nojob">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderFunction = () => {
    const {jobData, user} = this.state

    return (
      <ul className="unorderjobs">
        {jobData.map(each => (
          <JobList content={each} key={each.id} />
        ))}
      </ul>
    )
  }

  checkState = () => {
    const {stages} = this.state

    switch (stages) {
      case states.render:
        return this.renderFunction()

      case states.load:
        return this.loaderFunction()

      case states.fail:
        return this.fail()
      case states.empty:
        return this.emp()
      default:
        return null
    }
  }

  updatedEmp = employmentTypeId => {
    this.setState(
      pre => ({employeementType: [...pre.employeementType, employmentTypeId]}),
      this.getJobs,
    )
  }

  updatedSalary = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobs)
  }

  requiredJob = event => {
    this.setState({searchValue: event.target.value})
  }

  find = () => {
    this.getJobs()
  }

  render() {
    const {user, searchValue} = this.state

    return (
      <div className="job-container">
        <Header />
        <div className="jobs">
          <div className="filter">
            <JobFilter
              employee={employmentTypesList}
              salary={salaryRangesList}
              funcemployee={this.updatedEmp}
              funsalary={this.updatedSalary}
              userData={user}
            />
          </div>
          <div className="jobList">
            <div className="searchbox">
              <input
                type="search"
                placeholder="search"
                className="search"
                onChange={this.requiredJob}
                value={searchValue}
              />

              <button
                type="button"
                data-testid="searchButton"
                onClick={this.find}
                className="btn"
              >
                <BsSearch className="icon" />
              </button>
            </div>
            <div className="jobs-container">{this.checkState()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
