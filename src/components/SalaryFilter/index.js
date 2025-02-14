const SalaryFilter = props => {
  const {sal, fun2} = props

  const {label} = sal

  const salary = () => {
    fun2(label)
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
      <label>{sal.label}</label>
    </div>
  )
}

export default SalaryFilter
