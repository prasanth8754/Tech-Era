import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="route-link">
      <li className="ListCont">
        <img className="CourseImg" src={logoUrl} alt={name} />
        <p className="CourseName">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
