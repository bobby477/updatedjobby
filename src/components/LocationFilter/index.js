const LocationFilter = props => {
  const {loc, func3} = props

  const {locationTypeId} = loc

  const funcEmpId = () => {
    func3(locationTypeId)
  }

  return (
    <div>
      <input
        type="checkbox"
        value={loc.label}
        id={loc.locationTypeId}
        onClick={funcEmpId}
      />
      <label for={loc.locationTypeId}>{loc.label}</label>
    </div>
  )
}

export default LocationFilter
