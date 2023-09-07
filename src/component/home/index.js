import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../header'
import './index.css'

const apiSatusConstents = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiSatusConstents.initial, dataList: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiSatusConstents.progress})
    const url = `https://apis.ccbp.in/te/courses`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        apiStatus: apiSatusConstents.success,
        dataList: data.courses,
      })
    } else {
      this.setState({apiStatus: apiSatusConstents.failure})
    }
  }

  onClickRetry = () => {
    this.getCourses()
  }

  renderLoaderView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderListView = () => {
    const {dataList} = this.state
    return (
      <div className="courses-card">
        <h1>Courses</h1>
        <ul className="ul-card">
          {dataList.map(eachItem => (
            <Link
              to={`/courses/${eachItem.id}`}
              className="link"
              key={eachItem.id}
            >
              <li key={eachItem.id} className="list-item">
                <img
                  className="logo"
                  src={eachItem.logo_url}
                  alt={eachItem.name}
                />
                <p>{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
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

  renderSwitchView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiSatusConstents.progress:
        return this.renderLoaderView()
      case apiSatusConstents.success:
        return this.renderListView()
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
export default Home
