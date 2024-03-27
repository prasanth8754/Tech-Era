import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  onSuccessFulResponse = formatedCourseData => {
    this.setState({
      courseDetails: formatedCourseData,
      apiStatus: apiStatusConstants.success,
    })
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const formatedCourseData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.onSuccessFulResponse(formatedCourseData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {id, name, imageUrl, description} = courseDetails

    return (
      <div className="CardCont">
        <div className="Card">
          <img className="CardImg" src={imageUrl} alt={name} />
          <div>
            <h1 className="Heading">{name}</h1>
            <p className="Para1">{description}</p>
          </div>
        </div>
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

export default CourseItemDetails
