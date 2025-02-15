import './index.css'

import SalaryFilter from '../SalaryFilter'

import EmployeeFilter from '../EmployeeFilter'

import LocationFilter from '../LocationFilter'

const JobFilter = props => {
  const {
    salary,
    employee,
    funcemployee,
    userData,
    funsalary,
    location,
    funcloc,
  } = props

  const empch = employmentTypeId => {
    funcemployee(employmentTypeId)
  }

  const sal = salaryRangeId => {
    funsalary(salaryRangeId)
  }

  const locc = locationTypeId => {
    funcloc(locationTypeId)
  }

  return (
    <div className="filter-container">
      <div className="profile-container">
        <img
          src={userData.profileImageUrl}
          className="profile-img"
          alt="profile"
        />
        <h1 className="profilehead">{userData.name}</h1>
        <p className="profilepara">{userData.shortBio}</p>
      </div>
      <hr />
      <div>
        <h1 className="filter-head">Type of Employment</h1>
        <div className="unorder">
          {employee.map(each => (
            <EmployeeFilter
              emp={each}
              key={each.employmentTypeId}
              func1={empch}
            />
          ))}
        </div>
      </div>
      <hr />
      <div>
        <h1 className="filter-head">Salary Range</h1>
        <div className="unorder">
          <form>
            {salary.map(each => (
              <SalaryFilter sal={each} key={each.salaryRangeId} fun2={sal} />
            ))}
          </form>
        </div>
      </div>
      <hr />
      <div>
        <h1 className="filter-head">Location</h1>
        <div className="unorder">
          {location.map(each => (
            <LocationFilter loc={each} key={each.locationTypeId} func3={locc} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobFilter
