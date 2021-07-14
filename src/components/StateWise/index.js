import {Component} from 'react'
import './index.css'

class StateWise extends Component {
  // eslint-disable-next-line consistent-return
  getName = () => {
    const {statesList, state} = this.props

    const statesName = statesList.find(each => each.state_code === state)
    if (statesName !== undefined) {
      return statesName.state_name
    }
  }

  render() {
    const {covidData, state} = this.props
    const active =
      covidData[state].total.confirmed -
        covidData[state].total.recovered -
        covidData[state].total.deceased >
      0
        ? covidData[state].total.confirmed -
          covidData[state].total.recovered -
          covidData[state].total.deceased
        : 0

    return (
      <li className="each-state-stats">
        <p className="state-name">{this.getName()}</p>
        <p className="stat stat-2">{covidData[state].total.confirmed}</p>
        <p className="stat stat-3">{active}</p>
        <p className="stat stat-4">{covidData[state].total.recovered}</p>
        <p className="stat stat-5">{covidData[state].total.deceased}</p>
        <p className="stat stat-6">{covidData[state].meta.population}</p>
      </li>
    )
  }
}
export default StateWise
