import './index.css'
import Header from '../header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h2>Page Not Found</h2>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </>
)
export default NotFound
