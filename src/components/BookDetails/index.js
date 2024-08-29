import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import Footer from '../Footer'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class BookDetails extends Component {
  state = {isLoading: apiStatus.initial, bookItem: []}
  componentDidMount() {
    this.getBookDetails()
  }
  getBookDetails = async () => {
    this.setState({isLoading: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    if (jwtToken !== undefined) {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        this.setState({
          bookItem: data.book_details,
          isLoading: apiStatus.success,
        })
      } else {
        this.setState({isLoading: apiStatus.failure})
      }
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  renderBookItem = () => {
    const {bookItem} = this.state
    const {
      about_author,
      about_book,
      author_name,
      cover_pic,
      read_status,
      rating,
      title,
    } = bookItem
    return (
      <>
        <div className="topside">
          <img src={cover_pic} className="image-book" alt={title} />
          <div className="sectiontwo">
            <h1 className="head-title2">{title}</h1>
            <p className="para-author2">{author_name}</p>
            <p className="rating2">
              Avg Rating <BsFillStarFill className="star2" />
              {rating}
            </p>
            <p className="last2">
              Status:<span className="span">{read_status}</span>
            </p>
          </div>
        </div>
        <hr className="line" />
        <div className="bottom">
          <>
            <h1 className="abouthead">About Author</h1>
            <p className="aboutpara">{about_author}</p>
          </>
          <>
            <h1 className="abouthead">About Book</h1>
            <p className="aboutpara">{about_book}</p>
          </>
        </div>
      </>
    )
  }
  renderLoader = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  onClicktoRetry = () => {
    this.getBookDetails()
  }
  renderFailureView = () => {
    return (
      <div className="failure-view">
        <img
          src="https://res.cloudinary.com/dl7gkovef/image/upload/v1724827737/Group_7522_m8fmxp.png"
          className="failure"
          alt="failure view"
        />
        <p className="heading-failure">
          Something went wrong. Please try again
        </p>
        <button className="failure-button" onClick={this.onClicktoRetry}>
          Try Again
        </button>
      </div>
    )
  }
  renderBookDetailPage = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatus.success:
        return this.renderBookItem()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }
  render() {
    return (
      <>
        <div className="bookshelf-container">
          <Header />
          {this.renderBookDetailPage()}
          <div className="footer">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default BookDetails
