const EmployeeFilter = props => {
  const {emp, func1} = props

  const {employmentTypeId} = emp

  const funcEmpId = () => {
    func1(employmentTypeId)
  }

  return (
    <div>
      <input
        type="checkbox"
        value={emp.label}
        id={emp.employmentTypeId}
        onClick={funcEmpId}
      />
      <label for={emp.employmentTypeId}>{emp.label}</label>
    </div>
  )
}

export default EmployeeFilter
