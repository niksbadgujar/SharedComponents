import moment from 'moment';

const CustomFromInput = (props) => {
  const {
    value,
    onFocus,
    onBlur,
    fromInputBox,
  } = props;
  let formattedDate;
  if (document.activeElement === fromInputBox.current) {
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
        ref={fromInputBox}
        onBlur={onBlur}
        onFocus={onFocus}
        value={formattedDate}
        tabIndex={1}
        placeholder="From"
        className="custom-daypicker-input"
      />
      <div className="calendar-section"  >
        <img src="calendar.jpg" width="20px" height="25px" />
      </div>
    </>
  )
}

export default CustomFromInput;