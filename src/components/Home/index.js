import {Component} from 'react'
import Loader from 'react-loader-spinner'

import SearchInput from '../SearchInput'
import StateWise from '../StateWise'

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

class Home extends Component {
  state = {
    totalData: {},
    covidData: {},
    statesName: [],
    inputSearch: '',
    isFocused: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getStatesList()
  }

  getStatesList = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const fetchedData = await response.json()
    this.setState({covidData: fetchedData})
    this.setState({totalData: fetchedData.TT.total})

    const states = Object.keys(fetchedData)
    this.setState({statesName: states, isLoading: false})
  }

  changeInputSearch = event => {
    const {value} = event.target
    const {inputSearch} = this.state
    this.setState({inputSearch: value})
    if (inputSearch === '') {
      this.setState({isFocused: true})
    }
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

  sortAscending = () => {
    const {statesName} = this.state
    this.setState({statesName: statesName.sort()})
  }

  reverseSort = () => {
    const {statesName} = this.state
    this.setState({statesName: statesName.reverse()})
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {
      inputSearch,
      isFocused,
      statesName,
      totalData,
      covidData,
      isLoading,
    } = this.state
    const stateNames = statesName.filter(each => each !== 'TT')

    const {confirmed, recovered, deceased} = totalData
    const confirmedStats = this.getStats(confirmed)

    const recoveredStats = this.getStats(recovered)
    const activeStats = this.getStats(confirmed - recovered - deceased)
    const deceasedStats = this.getStats(deceased)

    const stateList = statesList.filter(
      eachState =>
        eachState.state_code[0]
          .toLowerCase()
          .includes(inputSearch.toLowerCase()) ||
        eachState.state_name
          .toLowerCase()
          .startsWith(inputSearch.toLowerCase()),
    )
    return (
      <>
        <div className="input-search-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
            alt="search-icon"
            className="search-icon"
          />
          <input
            type="search"
            placeholder="Enter the State"
            value={inputSearch}
            className="search-input"
            onChange={this.changeInputSearch}
          />
        </div>
        {isFocused && (
          <ul className="state-container">
            {stateList.map(eachState => (
              <SearchInput statesList={eachState} key={eachState.state_code} />
            ))}
          </ul>
        )}

        {!isFocused && (
          <>
            {isLoading ? (
              this.renderLoader()
            ) : (
              <>
                <div className="total-container">
                  <div className="status-container confirmed">
                    <h1 className="state confirm-color">Confirmed</h1>
                    <img
                      src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625812051/Group_ii3koq.png"
                      alt="checkMark"
                      className="group-img"
                    />
                    <p className="cases-number confirm-color">
                      {confirmedStats}
                    </p>
                  </div>
                  <div className="status-container active">
                    <h1 className="state active-color">Active</h1>
                    <img
                      src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625827716/protection_1_eimdm6.png"
                      alt="protectionMark"
                      className="group-img"
                    />
                    <p className="cases-number active-color">{activeStats}</p>
                  </div>
                  <div className="status-container recovered">
                    <h1 className="state recovered-color">Recovered</h1>
                    <img
                      src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625827809/recovered_1_kwfs5o.png"
                      alt="recoveredMark"
                      className="group-img"
                    />
                    <p className="cases-number recovered-color">
                      {recoveredStats}
                    </p>
                  </div>
                  <div className="status-container deceased">
                    <h1 className="state deceased-color">Deceased</h1>
                    <img
                      src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625828054/breathing_1_fvx13c.png"
                      alt="breathingMark"
                      className="group-img"
                    />
                    <p className="cases-number deceased-color">
                      {deceasedStats}
                    </p>
                  </div>
                </div>
                <div className="container-state">
                  <div className="state-wise-container">
                    <div className="categories">
                      <div className="state-ui">
                        <h1 className="states-heading">States/UT</h1>
                        <img
                          src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625829600/sort_ffbmsj.png"
                          className="sort"
                          alt="asc"
                          onClick={this.sortAscending}
                        />
                        <img
                          src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625829714/sort1_ujsiru.png"
                          className="sort"
                          alt="desc"
                          onClick={this.reverseSort}
                        />
                      </div>
                      <h1 className="states-heading">Confirm</h1>
                      <h1 className="states-heading">Active</h1>
                      <h1 className="states-heading">Recovered</h1>
                      <h1 className="states-heading">Deceased</h1>
                      <h1 className="states-heading">Population</h1>
                    </div>
                    <hr className="hr-line" />
                    <ul className="ul-type">
                      {stateNames.map(state => (
                        <StateWise
                          covidData={covidData}
                          state={state}
                          key={state}
                          statesList={statesList}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    )
  }
}

export default Home
