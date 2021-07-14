import {Component} from 'react'

import Loader from 'react-loader-spinner'
import District from '../District'
import DailyAndCumulative from '../DailyAndCumulative'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class CovidStateDetails extends Component {
  state = {
    statesData: {},
    selectedStat: 'confirmed',
    isLoading: true,
  }

  componentDidMount() {
    this.getDistrictState()
  }

  getDistrictState = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const fetchedData = await response.json()
    const stateData = fetchedData[id]
    this.setState({statesData: stateData, isLoading: false})
  }

  getStatData = () => {
    const {statesData, selectedStat} = this.state
    const distDataList = statesData.districts
    const newDistNamesList = Object.keys(distDataList)

    const formatData = newDistNamesList.map(each => ({
      districtName: each,
      cases: distDataList[each].total[selectedStat],
    }))

    formatData.sort((a, b) => b.cases - a.cases)

    const activeCases = newDistNamesList.map(each => ({
      districtName: each,
      cases:
        distDataList[each].total.confirmed -
        distDataList[each].total.recovered -
        distDataList[each].total.deceased,
    }))
    activeCases.sort((a, b) => b.cases - a.cases)

    if (selectedStat === 'active') {
      return activeCases
    }
    return formatData
  }

  renderDistrict = () => {
    const {selectedStat} = this.state
    const districtData = this.getStatData()
    return (
      <ul className="top-stats">
        {districtData.map(district => (
          <District
            district={district}
            key={district.districtName}
            selectedStat={selectedStat}
          />
        ))}
      </ul>
    )
  }

  getName = id => {
    const statesName = statesList.find(each => each.state_code === id)

    return statesName.state_name
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getDate = () => {
    const {isLoading, statesData} = this.state
    let updatedDate
    if (isLoading !== true) {
      const a = new Date(statesData.meta.last_updated)

      updatedDate = a.toString().slice(0, 15)
    }
    return updatedDate
  }

  getNumberFormat = confirmed =>
    new Intl.NumberFormat('en-IN').format(confirmed)

  getStats = confirmed => {
    let confirmedStats
    if (confirmed !== undefined) {
      confirmedStats = this.getNumberFormat(confirmed)
    }
    return confirmedStats
  }

  getTested = (statesData, tested) => {
    const {isLoading} = this.state
    let stats
    if (isLoading !== true) {
      stats = this.getStats(statesData.total[tested])
    }
    return stats
  }

  getActiveCasesStat = () => {
    const {isLoading, statesData} = this.state
    let active
    if (isLoading !== true) {
      active =
        statesData.total.confirmed -
        statesData.total.recovered -
        statesData.total.deceased
    }
    return active
  }

  getConfirm = () => {
    this.setState({selectedStat: 'confirmed'})
  }

  getActiveCasesStat = () => {
    this.setState({selectedStat: 'active'})
  }

  getRecover = () => {
    this.setState({selectedStat: 'recovered'})
  }

  getDeceased = () => {
    this.setState({selectedStat: 'deceased'})
  }

  renderColors = () => {
    const {selectedStat} = this.state
    let styling
    switch (selectedStat) {
      case 'deceased':
        styling = 'stat-5'
        break
      case 'recovered':
        styling = 'stat-4'
        break
      case 'active':
        styling = 'stat-3'
        break
      default:
        styling = 'stat-2'
    }
    return styling
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {isLoading, statesData, selectedStat} = this.state

    const testedStats = this.getTested(statesData, 'tested')
    const confirmedStats = this.getTested(statesData, 'confirmed')
    const recoveredStats = this.getTested(statesData, 'recovered')
    const deceasedStats = this.getTested(statesData, 'deceased')
    const active = this.getActiveCasesStat() > 0 ? this.getActiveCasesStat() : 0
    const activeStats = this.getNumberFormat(active)
    const red = selectedStat === 'confirmed' ? 'red' : null
    const blue = selectedStat === 'active' ? 'blue' : null
    const green = selectedStat === 'recovered' ? 'green' : null
    const grey = selectedStat === 'deceased' ? 'grey' : null
    const statStyle = this.renderColors()

    const updatedDate = this.getDate()
    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            <div className="state-details-container">
              <div className="latest-updates">
                <h1 className="state-Heading">{this.getName(id)}</h1>
                <p className="last-update">{`Last Updated on ${updatedDate}`}</p>
              </div>
              <div className="tests-container">
                <p className="tested">Tested</p>
                <p className="total-tested">{testedStats}</p>
              </div>
            </div>
            <div className="total-container">
              <ul
                className={`${red} ul-c status-container confirmed`}
                onClick={this.getConfirm}
              >
                <h1 className="state confirm-color">Confirmed</h1>
                <img
                  src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625812051/Group_ii3koq.png"
                  alt="checkMark"
                  className="group-img"
                />
                <p className="cases-number confirm-color">{confirmedStats}</p>
              </ul>
              <ul
                className={`${blue} status-container ul-c active`}
                onClick={this.getActiveCasesStat}
              >
                <h1 className="state active-color">Active</h1>
                <img
                  src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625827716/protection_1_eimdm6.png"
                  alt="protectionMark"
                  className="group-img"
                />
                <p className="cases-number active-color">{activeStats}</p>
              </ul>
              <ul
                className={`${green} status-container ul-c recovered`}
                onClick={this.getRecover}
              >
                <h1 className="state recovered-color">Recovered</h1>
                <img
                  src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625827809/recovered_1_kwfs5o.png"
                  alt="recoveredMark"
                  className="group-img"
                />
                <p className="cases-number recovered-color">{recoveredStats}</p>
              </ul>
              <ul
                className={`${grey} status-container ul-c deceased`}
                onClick={this.getDeceased}
              >
                <h1 className="state deceased-color">Deceased</h1>
                <img
                  src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625828054/breathing_1_fvx13c.png"
                  alt="breathingMark"
                  className="group-img"
                />
                <p className="cases-number deceased-color">{deceasedStats}</p>
              </ul>
            </div>
            <div className="top-dist-container">
              <p className={`${statStyle} top`}>Top Districts</p>
              {this.renderDistrict()}
            </div>
            <DailyAndCumulative id={id} key={id} />
          </>
        )}
      </>
    )
  }
}

export default CovidStateDetails
