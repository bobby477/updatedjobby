import {Link} from 'react-router-dom'

import {BsStarFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {BsBagFill} from 'react-icons/bs'

import './index.css'

const JobList = props => {
  const {content} = props

  const {id} = content

  return (
    <Link to={`/jobs/${id}`} className="linkcontainer">
      <li className="licontainer">
        <div className="logo-container">
          <img
            src={content.companyLogoUrl}
            className="logoimg"
            alt="company logo"
          />
          <div>
            <h1 className="head">{content.title}</h1>
            <div className="star">
              <BsStarFill className="bs" />
              <p>{content.rating}</p>
            </div>
          </div>
        </div>

        <div className="location-container">
          <div className="location-card">
            <div className="location-align">
              <FaMapMarkerAlt />
              <p>{content.location}</p>
            </div>
            <div className="location-align">
              <BsBagFill />
              <p>{content.employmentType}</p>
            </div>
          </div>
          <p>{content.packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <h2>Description</h2>
          <p>{content.jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobList
