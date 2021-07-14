import './index.css'

const District = props => {
  const {district} = props
  const {districtName, cases} = district

  const nanResolve = () => {
    let res
    if (Number.isNaN(cases) !== true && cases !== undefined) {
      res = new Intl.NumberFormat('en-IN').format(cases)
    } else {
      res = 'No Report'
    }
    return res
  }
  const report = nanResolve() === 'No Report' ? 'report' : null
  return (
    <li className="district1">
      <p className={`${report} district-cases`}>{nanResolve(cases)}</p>
      <p className="district-name">{districtName}</p>
    </li>
  )
}

export default District
