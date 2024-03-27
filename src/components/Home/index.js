import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseList()
  }

  onSuccessfulResponse = formatedCourseList => {
    this.setState({
      courseList: formatedCourseList,
      apiStatus: apiStatusConstants.success,
    })
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const formatedCourseList = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))

      this.onSuccessfulResponse(formatedCourseList)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getCourseList()
  }

  renderSuccessView = () => {
    const {courseList} = this.state

    return (
      <div className="Cont">
        <h1 className="Heading">Courses</h1>
        <ul className="UlCont">
          {courseList.map(eachItem => (
            <CourseItem courseDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="FailureCont" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#4656a1"
        height={50}
        width={50}
        radius={9}
      />
    </div>
  )

  renderFailureView = () => (
    <div className="FailureCont">
      <img
        className="FailureImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="Heading2">Oops! Something Went Wrong</h1>
      <p className="Para2">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="Button" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    const renderActiveView = () => {
      switch (apiStatus) {
        case apiStatusConstants.success:
          return this.renderSuccessView()
        case apiStatusConstants.loading:
          return this.renderLoadingView()
        case apiStatusConstants.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return (
      <div className="BgCont">
        <Header />
        {renderActiveView()}
      </div>
    )
  }
}

export default Home
