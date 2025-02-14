import './index.css'

import {BsStarFill} from 'react-icons/bs'

const Skills = props => {
  const {content} = props

  return (
    <li className="li-order">
      <img src={content.image_url} className="img2" alt={content.name} />
      <h1>{content.name}</h1>
    </li>
  )
}

export default Skills
