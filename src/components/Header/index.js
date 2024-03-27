import {Link} from 'react-router-dom'
import './index.css'

const Header = props => (
  <nav className="NavCont">
    <Link to="/">
      <img
        className="WebsiteLogo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </nav>
)

export default Header
