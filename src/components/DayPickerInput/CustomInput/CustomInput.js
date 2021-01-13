import { useRef } from 'react';
import moment from 'moment';

const CustomInput = (props) => {
  const {
    value,
    onFocus,
    onBlur,
    placeholder,
    formatToBeShown,
  } = props;
  const inputBoxRef = useRef();
  let formattedDate;
  if (document.activeElement === inputBoxRef.current) {
    if (value === '') {
      formattedDate = '';
    } else {
      formattedDate = moment(value).format(formatToBeShown)
    }
  } else {
    if (value === '') {
      formattedDate = '';
    } else {
      if (new Date(value).toLocaleDateString() === new Date().toLocaleDateString()) {
        formattedDate = "Now"
      } else {
        formattedDate = moment(value).format("DD-MMM-YY")
      }
    }
  }

  return (
    <>
      <input
        type="text"
        ref={inputBoxRef}
        onBlur={onBlur}
        onFocus={onFocus}
        value={formattedDate}
        tabIndex={1}
        className="custom-daypicker-input"
        placeholder={placeholder}
      />
      <div className="calendar-section" onClick={onFocus}>
        <img src="calendar.jpg" width="20px" height="25px" alt="calendar" />
      </div>
    </>
  )
}

export default CustomInput;