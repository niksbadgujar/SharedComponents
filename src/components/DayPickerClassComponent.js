// @ts-nocheck
/*
  Put this whole code in DayPickerComponent.js file 
  
  This is written using class based component structure
*/

import React, { PureComponent } from "react";
import DayPicker from "react-day-picker";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import "../styles/dayPicker.style.css";
import {
  getDateRange,
  getDaysAhead,
  getYearsList,
  dynamicDateFormatter,
} from "../utils/commonMethods";
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

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.cancelButtonRef = React.createRef();

    this.state = {
      selectedDate: "",
      month: null,
      daysTobeDisabled: [],
      isDayPickerOpen: false,
      formattedDate: null,
    };
  }

  componentDidMount() {
    this.getDisabledDates();
    this.setKeyEventForCloseButton();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isDayPickerOpen: prevIsDayPickerOpen } = prevState;
    const { isDayPickerOpen } = this.state;

    if (prevIsDayPickerOpen !== isDayPickerOpen) {
      this.getFormattedDate();
    }
  }

  setKeyEventForCloseButton = () => {
    let closeButton = this.cancelButtonRef.current;
    closeButton.addEventListener("keyup", (event) => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        closeButton.click();
      }
    });
  };

  getDisabledDates = () => {
    const {
      futureDisabledDaysCount = 0,
      holidayDates = [],
      isPastDaysDisabled,
      isWeekendDisabled,
      isHolidayDisabled,
      startDaysAheadFromToday,
      startDaysAheadFromTomorrow,
      minDate = null,
    } = this.props;

    const maximumDisabledDate = getDateRange(
      new Date(),
      futureDisabledDaysCount
    );

    let daysTobeDisabled = [];

    if (isHolidayDisabled) {
      holidayDates.map((eachDate) => {
        daysTobeDisabled = [...daysTobeDisabled, eachDate];
      });
    }

    if (isWeekendDisabled) {
      daysTobeDisabled = [
        ...daysTobeDisabled,
        {
          daysOfWeek: [0, 6],
        },
      ];
    }

    if (isPastDaysDisabled) {
      daysTobeDisabled = [
        ...daysTobeDisabled,
        {
          before: new Date(),
        },
      ];
    }

    if (futureDisabledDaysCount !== 0) {
      daysTobeDisabled = [
        ...daysTobeDisabled,
        {
          after: maximumDisabledDate,
        },
      ];
    }

    if (startDaysAheadFromToday) {
      daysTobeDisabled = [
        ...daysTobeDisabled,
        {
          after: maximumDisabledDate,
          before: getDaysAhead(1),
        },
      ];
    }

    if (startDaysAheadFromTomorrow) {
      daysTobeDisabled = [
        ...daysTobeDisabled,
        {
          after: maximumDisabledDate,
          before: getDaysAhead(2),
        },
      ];
    }

    if (minDate !== null || minDate !== "") {
      daysTobeDisabled = [
        ...daysTobeDisabled,
        {
          after: maximumDisabledDate,
          before: minDate,
        },
      ];
    }

    this.setState({
      daysTobeDisabled,
    });
  };

  handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState(
      {
        selectedDate: day,
      },
      () => {
        setTimeout(() => {
          this.hideDayPicker();
        }, 400);
      }
    );
  };

  getFormattedDate = () => {
    const { selectedDate = "", isDayPickerOpen } = this.state;

    const requiredParams = {
      selectedDate,
      isDayPickerOpen,
      formatDate,
      moment,
    };
    const dynamicFormattedDate = dynamicDateFormatter(requiredParams);

    this.setState({
      formattedDate: dynamicFormattedDate,
    });
  };

  handleYearMonthChange = (month) => {
    this.setState({
      month,
    });
  };

  adjustTabIndex = () => {
    const { isDayPickerOpen } = this.state;
    if (isDayPickerOpen) {
      document.getElementsByClassName(
        "DayPicker-NavButton DayPicker-NavButton--next"
      )[0].tabIndex = 7;

      let dateBox = document.getElementsByClassName("DayPicker")[0];
      let wrapper = document.getElementsByClassName("DayPicker-wrapper")[0];
      const monthDropdown = document.getElementsByClassName(
        "month-year-dropdown"
      )[0];
      const yearDropdown = document.getElementsByClassName(
        "month-year-dropdown"
      )[1];

      const inputBox = document.getElementsByClassName("custom-input")[0];
      // const inputBox = inputBoxRef.current;

      if (dateBox !== undefined && isDayPickerOpen) {
        dateBox.tabIndex = 9;
        dateBox.addEventListener("blur", (event) => {
          event.preventDefault();
          dateBox.blur = this.hideDayPicker();
        });

        // Checking if clicked outside input box and day picker box
        document.addEventListener("click", (event) => {
          if (
            !dateBox.contains(event.target) &&
            !inputBox.contains(event.target) &&
            !wrapper.contains(event.target)
          ) {
            this.hideDayPicker();
          }
        });
      }
    }
  };

  showDayPicker = () => {
    this.setState(
      {
        isDayPickerOpen: true,
      },
      this.adjustTabIndex
    );
  };

  hideDayPicker = () => {
    this.setState(
      {
        isDayPickerOpen: false,
      },
      this.adjustTabIndex
    );
  };

  resetDate = () => {
    this.setState({
      formattedDate: "",
      selectedDate: "",
      isDayPickerOpen: false,
    });
  };

  handleChange = () => {
    // Restrict user tp type
    this.setState({
      formattedDate: "",
    });
  };

  render() {
    const {
      selectedDate = "",
      daysTobeDisabled = [],
      month,
      isDayPickerOpen = false,
      formattedDate = "",
    } = this.state;

    const { customClassName = "" } = this.props;

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

    return (
      <>
        <div className="" style={{ padding: "15px" }}>
          <h3>Day Picker</h3>
          <>
            <input
              type="text"
              className="custom-input"
              value={formattedDate}
              onChange={() => this.handleChange()}
              tabIndex={1}
              onFocus={() => this.showDayPicker()}
              onClick={() => this.showDayPicker()}
            />
            <span
              id="close"
              role="button"
              ref={this.cancelButtonRef}
              className="close-icon"
              onClick={this.resetDate}
              tabIndex={8}
            ></span>

            <br />
            {isDayPickerOpen && (
              <DayPicker
                selectedDays={new Date(selectedDate)}
                disabledDays={daysTobeDisabled}
                captionElement={({ date, localeUtils }) => (
                  <YearMonthForm
                    date={date}
                    localeUtils={localeUtils}
                    onChange={this.handleYearMonthChange}
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
                onDayClick={this.handleDayClick}
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
  }
}

export default DatePicker;
