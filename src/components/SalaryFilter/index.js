const SalaryFilter = props => {
  const {sal, fun2} = props

  const {salaryRangeId} = sal

  const salary = () => {
    fun2(salaryRangeId)
  }

  return (
    <div>
      <input
        type="radio"
        value={sal.label}
        id={sal.label}
        name="salary"
        onClick={salary}
      />
      <label for={sal.label}>{sal.label}</label>
    </div>
  )
}

export default SalaryFilter
