import './index.css'
import {BsStarFill} from 'react-icons/bs'
const SimilarJob = props => {
  const {content} = props

  return (
    <div className="licontainer">
      <div className="logo-container">
        <img
          src={content.company_logo_url}
          className="logoimg"
          alt="similar job company logo"
        />
        <div>
          <h1 className="head">{content.title}</h1>
          <div className="star">
            <BsStarFill className="bs" />
            <p>{content.rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Description</h2>
        <p>{content.job_description}</p>
        <p>location</p>
      </div>
    </div>
  )
}

export default SimilarJob
