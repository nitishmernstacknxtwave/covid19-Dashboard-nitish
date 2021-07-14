import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'

class About extends Component {
  state = {isLoading: true, faqData: []}

  componentDidMount() {
    this.getLastUpdate()
    this.getAbout()
  }

  getLastUpdate = async () => {
    const url = 'https://api.covid19india.org/v4/min/data.min.json'
    const response = await fetch(url)
    const fetchedData = await response.json()
    const fetchedDate = fetchedData.TT
    this.setState({fetchedDate})
  }

  getAbout = async () => {
    const url = 'https://api.covid19india.org/website_data.json'
    const response = await fetch(url)
    const fetchedData = await response.json()
    const faqDetails = fetchedData.faq

    this.setState({faqData: faqDetails, isLoading: false})
  }

  getDate = () => {
    const {fetchedDate} = this.state

    let updatedDate
    if (fetchedDate !== undefined) {
      const a = new Date(fetchedDate.meta.last_updated)

      updatedDate = a.toString().slice(0, 15)
    }

    return updatedDate
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading, faqData} = this.state

    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="about-details-container">
            <h1 className="about-heading">About</h1>
            <p className="about-paragraph">{`Last update on ${this.getDate()}`}</p>
            <p className="vaccine">COVID-19 vaccine ready for distribution</p>
            <div>
              <p className="question">{faqData[0].question}</p>
              <p className="answer">{faqData[0].answer}</p>
            </div>
            <div>
              <p className="question">{faqData[1].question}</p>
              <p className="answer">{faqData[1].answer}</p>
            </div>
            <div>
              <p className="question">{faqData[2].question}</p>
              <p className="answer">{faqData[2].answer}</p>
            </div>
            <div>
              <p className="question">{faqData[3].question}</p>
              <p className="answer">{faqData[3].answer}</p>
            </div>
            <div>
              <p className="question">{faqData[4].question}</p>
              <p className="answer">{faqData[4].answer}</p>
            </div>
            <div>
              <p className="question">{faqData[5].question}</p>
              <p className="answer">{faqData[5].answer}</p>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default About
