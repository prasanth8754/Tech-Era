import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="BgCont">
    <Header />
    <div className="FailureCont">
      <img
        className="NotFoundImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="Heading2">Page Not Found</h1>
      <p className="Para2">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
