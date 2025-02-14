const EmployeeFilter = props => {
  const {emp, func1} = props

  const {label} = emp

  const funcEmpId = () => {
    func1(label)
  }

  return (
    <div>
      <input
        type="checkbox"
        value={emp.label}
        id={emp.employmentTypeId}
        onClick={funcEmpId}
      />
      <label>{emp.label}</label>
    </div>
  )
}

export default EmployeeFilter
