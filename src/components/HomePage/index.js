import {Component} from 'react'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class HomePage extends Component {
  state = {topRatedList: [], status: apiStatus.initial}
  componentDidMount() {
    this.getTopratedBooks()
  }
  getTopratedBooks = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {history} = this.props
    if (jwtToken === undefined) {
      history.replace('/')
    } else {
      const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        console.log(data.books)
        this.setState({status: apiStatus.success, topRatedList: data.books})
      } else {
        this.setState({status: apiStatus.failure})
      }
    }
  }
  renderTopRatedBookdetails = () => {
    const {topRatedList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
    }
    return (
      <>
        <div className="slider-container">
          <Slider {...settings}>
            {topRatedList.map(eachbook => (
              <div className="list-item-book2">
                <img
                  src={eachbook.cover_pic}
                  className="book-image"
                  alt={eachbook.title}
                />
                <h1 className="heading">{eachbook.title}</h1>
                <h1 className="para">{eachbook.author_name}</h1>
              </div>
            ))}
          </Slider>
        </div>
      </>
    )
  }
  renderHomepage = () => {
    return <>{this.renderTopRatedBookdetails()}</>
  }
  renderLoader = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  renderFindYourBooks = () => {
    return (
      <>
        <div className="heading-container">
          <h1 className="heading-homepage">Find Your Next Favorite Books?</h1>
        </div>
        <div className="para-container">
          <p className="para-homepage">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
        </div>
      </>
    )
  }
  onClicktoRetry = () => {
    this.getTopratedBooks()
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

  renderPage = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.success:
        return this.renderHomepage()
      default:
        return null
    }
  }
  onClicktoGoBookShelve = () => {
    const {history} = this.props
    history.replace('/shelf')
  }
  render() {
    const {status} = this.state
    return (
      <>
        <div className="homepage-container">
          <Header />
          {this.renderFindYourBooks()}
          <div className="toprated-container">
            <div className="top-section">
              <h1 className="topratedheading">Top Rated Books</h1>
              <button
                className="finbutton"
                onClick={this.onClicktoGoBookShelve}
              >
                Find Books
              </button>
            </div>
            {this.renderPage()}
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default HomePage
