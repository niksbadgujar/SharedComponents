import moment from 'moment';

const CustomToInput = (props) => {
  const {
    value,
    onFocus,
    onBlur,
    toInputRef,
  } = props;
  let formattedDate;
  if (document.activeElement === toInputRef.current) {
    if (value === '') {
      formattedDate = '';
    } else {
      formattedDate = moment(value).format("MM/DD/yyyy")
    }
  } else {
    if (value === '') {
      formattedDate = '';
    } else {
      formattedDate = moment(value).format("DD-MMM-YY")
    }
  }

  return (
    <>
      <input
        type="text"
        ref={toInputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        value={formattedDate}
        tabIndex={3}
        placeholder="To"
        className="custom-daypicker-input"
      />
      <div className="calendar-section" >
        <img src="calendar.jpg" width="20px" height="25px" />
      </div>
    </>
  )
}

export default CustomToInput;