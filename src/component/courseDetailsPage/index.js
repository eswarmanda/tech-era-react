import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../header'
import './index.css'

const apiSatusConstents = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {
    courseData: '',
    apiStatus: apiSatusConstents.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatus: apiSatusConstents.progress})

    const courseApi = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(courseApi)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        courseData: data.course_details,
        apiStatus: apiSatusConstents.success,
      })
    } else {
      this.setState({apiStatus: apiSatusConstents.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h2>Oops! Something Went Wrong</h2>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderCourseDetailView = () => {
    const {courseData} = this.state
    return (
      <div className="main">
        <div className="course-card">
          <img
            className="img-card"
            src={courseData.image_url}
            alt={courseData.name}
          />
          <div>
            <h1>{courseData.name}</h1>
            <p>{courseData.description}</p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderLoaderView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSwitchView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiSatusConstents.progress:
        return this.renderLoaderView()
      case apiSatusConstents.success:
        return this.renderCourseDetailView()
      case apiSatusConstents.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderSwitchView()}
      </>
    )
  }
}
export default CourseDetails
