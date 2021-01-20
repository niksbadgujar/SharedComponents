// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import DayPicker from "react-day-picker";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import "../../styles/dayPicker.style.css";
import {
  getDisabledDateRange,
  getDaysAhead,
  getYearsList,
  dynamicDateFormatter,
} from "../../utils/commonMethods";
import moment from "moment";

const YearMonthForm = (props) => {
  const { date, localeUtils, onChange } = props;

  const fromYear = new Date().getFullYear();
  const months = localeUtils.getMonths();
  const yearsList = getYearsList(fromYear, 11); // Accepts 2 Params - (fromYear, toHowManyYears)

  const handleChange = (e) => {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption" tabIndex={2}>
      <select
        className="month-year-dropdown"
        name="month"
        onChange={handleChange}
        value={date.getMonth()}
        tabIndex={3}
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        className="month-year-dropdown"
        name="year"
        onChange={handleChange}
        value={date.getFullYear()}
        tabIndex={4}
      >
        {yearsList.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
};

const DatePicker = (props) => {
  const dayPickerRef = useRef();
  const inputBoxRef = useRef();
  const [daysTobeDisabled, setDisabledDays] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [isDayPickerOpen, setToggleDayPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    getDisabledDates();
  }, []);

  useEffect(() => {
    getFormattedDate();
    adjustTabIndex();
  }, [isDayPickerOpen]);

  const getDisabledDates = () => {
    const {
      futureDisabledDaysCount = 0,
      holidayDates = [],
      isPastDaysDisabled,
      isWeekendDisabled,
      isHolidayDisabled,
      startDaysAheadFromToday,
      startDaysAheadFromTomorrow,
      minDate = null,
    } = props;

    const maximumDisabledDate = getDisabledDateRange(
      new Date(),
      futureDisabledDaysCount
    );

    let disabledDays = [];

    if (isHolidayDisabled) {
      holidayDates.map((eachDate) => {
        disabledDays = [...disabledDays, eachDate];
      });
    }

    if (isWeekendDisabled) {
      disabledDays = [
        ...disabledDays,
        {
          daysOfWeek: [0, 6],
        },
      ];
    }

    if (isPastDaysDisabled) {
      disabledDays = [
        ...disabledDays,
        {
          before: new Date(),
        },
      ];
    }

    if (futureDisabledDaysCount !== 0) {
      disabledDays = [
        ...disabledDays,
        {
          after: maximumDisabledDate,
        },
      ];
    }

    if (startDaysAheadFromToday) {
      disabledDays = [
        ...disabledDays,
        {
          after: maximumDisabledDate,
          before: getDaysAhead(1),
        },
      ];
    }

    if (startDaysAheadFromTomorrow) {
      disabledDays = [
        ...disabledDays,
        {
          after: maximumDisabledDate,
          before: getDaysAhead(2),
        },
      ];
    }

    if (minDate !== null || minDate !== "") {
      disabledDays = [
        ...disabledDays,
        {
          after: maximumDisabledDate,
          before: minDate,
        },
      ];
    }
    setDisabledDays(disabledDays);
  };

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDate(day);
    setTimeout(() => {
      hideDayPicker();
    }, 400);
  };

  const getFormattedDate = () => {
    const requiredParams = {
      selectedDate,
      isDayPickerOpen,
      formatDate,
      moment,
    };
    const dynamicFormattedDate = dynamicDateFormatter(requiredParams);
    setFormattedDate(dynamicFormattedDate);
  };

  const handleYearMonthChange = (month) => {
    setMonth(month);
  };

  const adjustTabIndex = () => {
    if (isDayPickerOpen) {
      const nextButton = document.getElementsByClassName(
        "DayPicker-NavButton DayPicker-NavButton--next"
      )[0];
      if (nextButton !== undefined) {
        nextButton.tabIndex = 7;
      }
      const dateBox = ReactDOM.findDOMNode(dayPickerRef.current);
      if (dateBox !== undefined && isDayPickerOpen) {
        dateBox.tabIndex = 8;
        dateBox.addEventListener("blur", (event) => {
          event.preventDefault();
          dateBox.blur = hideDayPicker();
        });
      }
    }
  };

  const showDayPicker = () => {
    setToggleDayPicker(true);
  };

  const hideDayPicker = () => {
    setToggleDayPicker(false);
  };

  const handleChange = (event) => {
    const { target: { value = "" } = {} } = event;
    setFormattedDate(value);
    setSelectedDate(value);
  };

  const toggleDayPicker = () => {
    setToggleDayPicker(!isDayPickerOpen);
  };

  const customModifiers = {
    disabledDays: daysTobeDisabled,
    currentDate: selectedDate,
  };

  const customModifiersStyles = {
    disabledDays: {
      color: "#9e9e9e",
      borderRadius: "2px",
    },
    currentDate: {
      color: "yellow",
      backgroundColor: "green",
      borderRadius: "2px",
    },
  };

  const { customClassName = "" } = props;

  return (
    <>
      <div className="" style={{ padding: "15px" }}>
        <h3>Day Picker Customised (Without DayPicker Input)</h3>
        <br />
        <>
          <input
            type="text"
            className="custom-input"
            value={formattedDate}
            onChange={(event) => handleChange(event)}
            tabIndex={1}
            onFocus={() => showDayPicker()}
            onClick={() => showDayPicker()}
            ref={inputBoxRef}
          />

          <div className="calendar-section">
            <img
              src="calendar.jpg"
              width="20px"
              height="25px"
              onClick={toggleDayPicker}
            />
          </div>

          <br />
          {isDayPickerOpen && (
            <DayPicker
              ref={dayPickerRef}
              selectedDays={new Date(selectedDate)}
              disabledDays={daysTobeDisabled}
              captionElement={({ date, localeUtils }) => (
                <YearMonthForm
                  date={date}
                  localeUtils={localeUtils}
                  onChange={handleYearMonthChange}
                />
              )}
              fromMonth={new Date()}
              toMonth={
                new Date(
                  new Date().getFullYear() + 1,
                  new Date().getMonth(),
                  new Date().getDay() - 1
                )
              }
              month={month}
              onDayClick={handleDayClick}
              formatDate={formatDate}
              parseDate={parseDate}
              tabIndex={5}
              modifiers={customModifiers}
              modifiersStyles={customModifiersStyles}
              className={customClassName}
            />
          )}
        </>
      </div>
    </>
  );
};

export default DatePicker;
