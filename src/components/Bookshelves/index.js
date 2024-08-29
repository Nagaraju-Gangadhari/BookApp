import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsSearch} from 'react-icons/bs'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class Bookshelves extends Component {
  state = {
    activeBookList: bookshelvesList[0].value,
    searchInput: '',
    isLoading: apiStatus.initial,
    bookshelfList: [],
    activeLabel: bookshelvesList[0].label,
  }
  componentDidMount() {
    this.getBookshelfresults()
  }
  getBookshelfresults = async () => {
    this.setState({isLoading: apiStatus.loading})
    const {activeBookList, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookList}&search=${searchInput}`
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
        this.setState({bookshelfList: data.books, isLoading: apiStatus.success})
      } else {
        this.setState({isLoading: apiStatus.failure})
      }
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }
  onClicktosetActivetab = event => {
    const updatedLabel = bookshelvesList.filter(
      each => each.value === event.target.value,
    )
    this.setState(
      {activeBookList: event.target.value, activeLabel: updatedLabel[0].label},
      this.getBookshelfresults,
    )
  }
  onChangetoInputText = event => {
    this.setState({searchInput: event.target.value})
  }
  onSubmission = event => {
    event.preventDefault()
    const {searchInput} = this.state
    this.setState({searchInput: searchInput}, this.getBookshelfresults)
  }
  onClicktoRetry = () => {
    this.getBookshelfresults()
  }
  renderNovideoView = () => {
    const {searchInput, activeLabel} = this.state
    return (
      <>
        <div className='head-input'>
          <h1 className='heading-bb'>{activeLabel} Books</h1>
          <form className='xxxx' onSubmit={this.onSubmission}>
            <input
              type='search'
              className='input-book'
              id='inputelement'
              onChange={this.onChangetoInputText}
              placeholder='Search'
              value={searchInput}
            />
            <label htmlFor='inputelement' className='label'>
              <button
                className='button'
                type='submit'
                testid='searchButton'
                onClick={this.setTheSearchInput}
              >
                <BsSearch className='search' />
              </button>
            </label>
          </form>
        </div>
        <div className='failure-view'>
          <img
            src='https://res.cloudinary.com/dl7gkovef/image/upload/v1724849665/Asset_1_1_b60dpj.png'
            className='failure'
            alt='no books'
          />
          <p className='heading-failure'>
            Your search for {searchInput} did not find any matches.
          </p>
        </div>
      </>
    )
  }
  renderrightSection = () => {
    const {bookshelfList, activeLabel, searchInput} = this.state
    if (bookshelfList.length < 1) {
      return <>{this.renderNovideoView()}</>
    }
    return (
      <>
        <div className='head-input'>
          <h1 className='heading-bb'>{activeLabel} Books</h1>
          <form className='xxxx' onSubmit={this.onSubmission}>
            <input
              type='search'
              className='input-book'
              id='inputelement'
              onChange={this.onChangetoInputText}
              placeholder='Search'
              value={searchInput}
            />
            <label htmlFor='inputelement' className='label'>
              <button
                className='button'
                type='submit'
                testid='searchButton'
                onClick={this.setTheSearchInput}
              >
                <BsSearch className='search' />
              </button>
            </label>
          </form>
        </div>
        <ul className='list-container-book'>
          {bookshelfList.map(eachbook => (
            <li className='list-book-item' key={eachbook.id}>
              <Link to={`books/${eachbook.id}`} className='link-item'>
                <div>
                  <img
                    src={eachbook.cover_pic}
                    className='cover-pic'
                    alt={eachbook.title}
                  />
                </div>
                <div className='detaisl'>
                  <h1 className='head-title'>{eachbook.title}</h1>
                  <p className='para-author'>{eachbook.author_name}</p>
                  <p className='rating'>
                    Avg Rating <BsFillStarFill className='star' />
                    {eachbook.rating}
                  </p>
                  <p className='last2'>
                    Status:<span className='span'>{eachbook.read_status}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
  renderLoader = () => {
    return (
      <div className='loader-container' testid='loader'>
        <Loader type='TailSpin' color='#0284C7' height={50} width={50} />
      </div>
    )
  }
  renderFailureView = () => {
    return (
      <div className='failure-view'>
        <img
          src='https://res.cloudinary.com/dl7gkovef/image/upload/v1724827737/Group_7522_m8fmxp.png'
          className='failure'
          alt='failure view'
        />
        <p className='heading-failure'>
          Something went wrong. Please try again
        </p>
        <button className='failure-button' onClick={this.onClicktoRetry}>
          Try Again
        </button>
      </div>
    )
  }
  renderBookshelvePage = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatus.success:
        return this.renderLeftsection()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }
  renderLeftsection = () => {
    const {isLoading} = this.state
    return (
      <>
        <div className='section'>
          <div className='left-section'>
            <h1 className='heading-book'>Bookshelves</h1>
            <ul className='list-container-bookshelve'>
              {bookshelvesList.map(each => (
                <li className='list-item-bookshelf' key={each.id}>
                  <div className='contain'>
                    <button
                      className='list-button'
                      onClick={this.onClicktosetActivetab}
                      value={each.value}
                    >
                      {each.label}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='right-section'>
            {isLoading === apiStatus.failure
              ? this.renderFailureView()
              : this.renderrightSection()}
          </div>
        </div>
      </>
    )
  }
  render() {
    return (
      <>
        <div className='bookshelf-container'>
          <Header />
          {this.renderBookshelvePage()}
          <div className='footer'>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default Bookshelves
