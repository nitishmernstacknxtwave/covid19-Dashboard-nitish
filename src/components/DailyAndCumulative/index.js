import {Component} from 'react'

import {Line, Bar} from 'react-chartjs-2'

import {format} from 'date-fns'

import './index.css'

class DailyAndCumulative extends Component {
  state = {daily: true}

  componentDidMount() {
    this.renderDailyAndCumulativeData()
  }

  getActiveCount = active => {
    if (active < 0) {
      return 0
    }
    return active
  }

  renderDailyAndCumulativeData = async () => {
    const {id} = this.props
    const response = await fetch(
      'https://api.covid19india.org/v4/min/timeseries.min.json',
    )
    const fetchedData = await response.json()
    const data = fetchedData[id].dates

    const keys = Object.keys(data)

    const confirmedArray = []
    const recoveredArray = []
    const activeArray = []
    const deceasedArray = []
    const testedArray = []
    const vaccinatedOneArray = []
    const vaccinatedTwoArray = []
    const getLabelsSet = []
    keys.forEach(item =>
      getLabelsSet.push(format(new Date(item), 'MMM Y').toString()),
    )
    const getDatesSet = []
    keys.forEach(item =>
      getDatesSet.push(format(new Date(item), 'd MMM').toString()),
    )
    const datesLabels = getDatesSet.reverse().splice(0, 10)

    const dateCountConfirmedArray = []
    const dateCountRecoveredArray = []
    const dateCountDeceasedArray = []
    const dateCountActiveArray = []
    datesLabels.reverse().forEach(label => {
      keys.forEach(item => {
        if (format(new Date(item), 'd MMM').toString() === label) {
          if (format(new Date(item), 'y').toString() === '2021') {
            dateCountConfirmedArray.push(data[item].delta.confirmed)
            if (
              Number.isNaN(data[item].delta.deceased) ||
              data[item].delta.deceased === undefined
            ) {
              dateCountDeceasedArray.push(0)
            } else {
              dateCountDeceasedArray.push(data[item].delta.deceased)
            }
            if (
              Number.isNaN(data[item].delta.recovered) ||
              data[item].delta.recovered === undefined ||
              data[item].delta.recovered < 0
            ) {
              dateCountRecoveredArray.push(0)
            } else {
              dateCountRecoveredArray.push(data[item].delta.recovered)
            }
            dateCountActiveArray.push(
              this.getActiveCount(
                data[item].total.confirmed -
                  data[item].total.recovered -
                  data[item].total.deceased,
              ),
            )
          }
        }
      })
    })
    const labels = [...new Set(getLabelsSet)]
    const lastDate = keys[keys.length - 1]

    labels.forEach(label => {
      keys.forEach(item => {
        if (format(new Date(item), 'MMM Y').toString() === label) {
          if (
            format(new Date(item), 'd').toString() ===
              new Date(
                new Date(item).getFullYear(),
                new Date(item).getMonth() + 1,
                0,
              )
                .getDate()
                .toString() &&
            item !== lastDate
          ) {
            deceasedArray.push(data[item].total.deceased)
            confirmedArray.push(data[item].total.confirmed)
            recoveredArray.push(data[item].total.recovered)
            vaccinatedOneArray.push(
              (data[item].total.confirmed / data[item].total.tested).toFixed(2),
            )
            if (
              Number.isNaN(data[item].total.vaccinated1) ||
              data[item].total.vaccinated1 === undefined
            ) {
              vaccinatedTwoArray.push(0)
            } else {
              vaccinatedTwoArray.push(data[item].total.vaccinated1)
            }

            testedArray.push(data[item].total.tested)
            activeArray.push(
              data[item].total.confirmed -
                data[item].total.recovered -
                data[item].total.deceased,
            )
          }
          if (item === lastDate) {
            deceasedArray.push(data[item].total.deceased)
            confirmedArray.push(data[item].total.confirmed)
            recoveredArray.push(data[item].total.recovered)
            vaccinatedOneArray.push(
              (data[item].total.confirmed / data[item].total.tested).toFixed(2),
            )
            if (
              Number.isNaN(data[item].total.vaccinated1) ||
              data[item].total.vaccinated1 === undefined
            ) {
              vaccinatedTwoArray.push(0)
            } else {
              vaccinatedTwoArray.push(data[item].total.vaccinated1)
            }

            testedArray.push(data[item].total.tested)
            activeArray.push(
              data[item].total.confirmed -
                data[item].total.recovered -
                data[item].total.deceased,
            )
          }
        }
      })
    })
    labels.splice(10, 1)
    const totalData = {
      labels,
      datasets: [
        {
          label: 'Confirmed',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FF073A',
          color: '#FF073A',
          borderColor: '#FF073A',
          borderWidth: 2,
          pointHoverBorderColor: '#ffffff',
          data: confirmedArray,
        },
      ],
    }
    const totalData1 = {
      labels,
      datasets: [
        {
          label: 'Total Active',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#007BFF',
          color: '#007BFF',
          borderColor: '#007BFF',
          borderWidth: 2,
          pointHoverBorderColor: '#ffffff',
          data: activeArray,
        },
      ],
    }

    const totalData2 = {
      labels,
      datasets: [
        {
          label: 'Recovered',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#27A243',
          color: '#27A243',
          borderColor: '#27A243',
          borderWidth: 2,
          pointHoverBorderColor: '#ffffff',
          data: recoveredArray,
        },
      ],
    }

    const totalData3 = {
      labels,
      datasets: [
        {
          label: 'Deceased',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#6C757D',
          color: '#6C757D',
          borderColor: '#6C757D',
          borderWidth: 2,
          pointHoverBorderColor: '#ffffff',
          data: deceasedArray,
        },
      ],
    }
    const totalData4 = {
      labels,
      datasets: [
        {
          label: 'Tested',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#9673B9',
          color: '#9673B9',
          borderColor: '#9673B9',
          pointHoverBorderColor: '#ffffff',
          borderWidth: 2,
          data: testedArray,
        },
      ],
    }
    const totalData5 = {
      labels,
      datasets: [
        {
          label: 'Test Positivity Ratio (confirmed/tested)',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FD7E14',
          color: '#FD7E14',
          borderColor: '#FD7E14',
          pointHoverBorderColor: '#ffffff',
          borderWidth: 2,
          data: vaccinatedOneArray,
        },
      ],
    }
    const totalData6 = {
      labels,
      datasets: [
        {
          label: 'Total Vaccinated',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#F95581',
          color: '#F95581',
          borderColor: '#F95581',
          borderWidth: 2,
          pointHoverBorderColor: '#ffffff',
          data: vaccinatedTwoArray,
        },
      ],
    }

    const totalData7 = {
      labels: datesLabels,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: false,
          backgroundColor: '#9A0E31',
          color: '#9A0E31',
          borderColor: '#9A0E31',
          borderWidth: 2,
          data: dateCountConfirmedArray,
        },
      ],
    }
    const totalData8 = {
      labels: datesLabels,
      datasets: [
        {
          label: 'Active Cases',
          fill: false,
          backgroundColor: '#0A4FA0',
          color: '#0A4FA0',
          borderColor: '#0A4FA0',
          borderWidth: 2,
          borderRadius: 2,
          data: dateCountActiveArray,
        },
      ],
    }
    const totalData9 = {
      labels: datesLabels,
      datasets: [
        {
          label: 'Recovered Cases',
          fill: false,
          backgroundColor: '#216837',
          color: '#216837',
          borderColor: '#216837',
          borderWidth: 2,
          data: dateCountRecoveredArray,
        },
      ],
    }
    const totalData10 = {
      labels: datesLabels,
      datasets: [
        {
          label: 'Deceased Cases',
          fill: false,
          backgroundColor: '#474C57',
          color: '#474C57',
          borderColor: '#474C57',
          borderWidth: 2,
          data: dateCountDeceasedArray,
        },
      ],
    }

    this.setState({
      totalData,
      totalData1,
      totalData2,
      totalData3,
      totalData4,
      totalData5,
      totalData6,
      totalData7,
      totalData8,
      totalData9,
      totalData10,
    })
  }

  getDaily = () => {
    const {daily} = this.state
    if (daily === false) {
      this.setState({daily: true})
    }
  }

  getCumulative = () => {
    const {daily} = this.state
    if (daily === true) {
      this.setState({daily: false})
    }
  }

  render() {
    const {
      daily,
      totalData,
      totalData1,
      totalData2,
      totalData3,
      totalData4,
      totalData5,
      totalData6,
      totalData7,
      totalData8,
      totalData9,
      totalData10,
    } = this.state
    console.log(totalData)
    return (
      <div className="trends-container">
        <h1 className="spread-heading">Spread Trends</h1>
        <div className="toggles">
          <button className="btn" type="button" onClick={this.getDaily}>
            Daily
          </button>
          <button className="btn" type="button" onClick={this.getCumulative}>
            Cumulative
          </button>
        </div>
        {daily ? (
          <div className="charts-container">
            <p className="type-description">Daily</p>
            <div className="red chart">
              <Bar
                data={totalData7}
                options={{
                  title: {
                    display: true,
                    text: 'Confirmed Cases',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="blue chart">
              <Bar
                data={totalData8}
                options={{
                  title: {
                    display: true,
                    text: 'Confirmed Cases',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="green chart">
              <Bar
                data={totalData9}
                options={{
                  title: {
                    display: true,
                    text: 'Confirmed Cases',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="grey chart">
              <Bar
                data={totalData10}
                options={{
                  title: {
                    display: true,
                    text: 'Confirmed Cases',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="charts-container">
            <p className="type-description">Cumulative</p>
            <div className="chart red">
              <Line
                data={totalData}
                options={{
                  title: {
                    display: true,
                    text: 'Average Confirmed per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="blue chart">
              <Line
                data={totalData1}
                options={{
                  title: {
                    display: true,
                    text: 'Average Active per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="green chart">
              <Line
                data={totalData2}
                options={{
                  title: {
                    display: true,
                    text: 'Average Recovered per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="grey chart">
              <Line
                data={totalData3}
                options={{
                  title: {
                    display: true,
                    text: 'Average Deceased per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="voilet chart">
              <Line
                data={totalData4}
                options={{
                  title: {
                    display: true,
                    text: 'Average Tested per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="pink chart">
              <Line
                data={totalData5}
                options={{
                  title: {
                    display: true,
                    text: 'Test Positivity per Month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div className="light-pink chart">
              <Line
                data={totalData6}
                options={{
                  title: {
                    display: true,
                    text: 'Average Vaccinated ( One Dose) per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default DailyAndCumulative
