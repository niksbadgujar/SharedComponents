// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import { DateUtils } from "react-day-picker";
import {
  getDisabledDateRange,
  getDaysAhead,
  getPastDateRange,
  getDDMMYYYYDate,
  getDDMMMYYDate,
  // getDisabledDateFromToday,
} from "../../utils/commonMethods";
import moment from "moment";
// import CustomInput from '../DayPickerInput/CustomInput/CustomInput';
import YearMonthForm from "../DayPickerInput/YearMonthComponent/YearMonthForm";

import "react-day-picker/lib/style.css";
import "../../styles/dayPickerInput.style.css";
import CalendarSVG from "./CalendarSvg";

const DatePicker = (props) => {
  const [daysTobeDisabled, setDisabledDays] = useState([]);
  const [month, setMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const dayPickerInputRef = useRef();
  const dayPickerRef = useRef();

  useEffect(() => {
    getDisabledDates();
  }, []);

  const getDisabledDateFromToday = (
    date,
    disableNextDaysFromToday,
    bankHolidayDates
  ) => {
    const selectedDate = date;
    selectedDate.setDate(date.getDate() + disableNextDaysFromToday);
    checkNextEnabledDate(selectedDate, bankHolidayDates);
  };

  const checkNextEnabledDate = (selectedDate, bankHolidayDates) => {
    let newSelectedDate = new Date(
      new Date(selectedDate).getFullYear(),
      new Date(selectedDate).getMonth(),
      new Date(selectedDate).getDate()
    );
    const daysOfHoliday = bankHolidayDates.map((obj) =>
      obj.setHours(0, 0, 0, 0)
    );
    const isDayDisabled = daysOfHoliday.includes(
      newSelectedDate.setHours(0, 0, 0, 0)
    );

    const isWeekend =
      newSelectedDate.getDay() === 6 || newSelectedDate.getDay() === 0;

    if (isDayDisabled || isWeekend) {
      newSelectedDate.setDate(newSelectedDate.getDate() + 1);
      checkNextEnabledDate(newSelectedDate, bankHolidayDates);
    } else {
      setSelectedDate(newSelectedDate);
    }
  };

  const getDisabledDates = () => {
    const {
      futureDisabledDaysCount = 0,
      holidayDates = [],
      isPastDaysDisabled,
      isWeekendDisabled,
      isHolidayDisabled,
      startDaysAheadFromToday,
      startDaysAheadFromTomorrow,
      pastEnableDayCount = 0,
      isMinDateAutoComputed = false,
      disableNextDaysFromToday = 0,
    } = props;

    const maximumDisabledDate = getDisabledDateRange(
      new Date(),
      futureDisabledDaysCount
    );

    const minimumDisabledDate = getPastDateRange(
      new Date(),
      pastEnableDayCount
    );

    const disabledNextDaysFromToday = getDisabledDateRange(
      new Date(),
      disableNextDaysFromToday
    );

    // const disabledNextDaysFromToday1 = getDisabledDateFromToday(
    //   new Date(),
    //   disableNextDaysFromToday,
    //   holidayDates
    // );
    // console.log("disabledNextDaysFromToday1 - ", disabledNextDaysFromToday1);

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

    if (disableNextDaysFromToday !== 0) {
      const disabledNextDaysFromToday1 = getDisabledDateFromToday(
        new Date(),
        disableNextDaysFromToday,
        holidayDates
      );
      disabledDays = [
        ...disabledDays,
        {
          before: selectedDate,
          // before: disabledNextDaysFromToday,
        },
      ];
      console.log("disabledNextDaysFromToday1 - ", disabledNextDaysFromToday1);
      // setSelectedDate(disabledNextDaysFromToday1);
      // setMonth(disabledNextDaysFromToday1);

      // setSelectedDate(disabledNextDaysFromToday);
      // setMonth(disabledNextDaysFromToday);
    }

    // if (pastEnableDayCount !== 0 && disableNextDaysFromToday !== 0) {
    //   disabledDays = [
    //     ...disabledDays,
    //     {
    //       before: disabledNextDaysFromToday,
    //     },
    //   ];
    // }

    if (
      pastEnableDayCount !== 0 &&
      !startDaysAheadFromTomorrow &&
      !startDaysAheadFromToday &&
      isMinDateAutoComputed
    ) {
      disabledDays = [
        ...disabledDays,
        {
          before: minimumDisabledDate,
        },
      ];
    }

    // if (pastEnableDayCount !== 0 && !isMinDateAutoComputed) {
    //   disabledDays = [
    //     ...disabledDays,
    //     {
    //       before: minimumDisabledDate,
    //     },
    //   ];
    // }

    // if (startDaysAheadFromToday) {
    //   disabledDays = [
    //     ...disabledDays,
    //     {
    //       after: maximumDisabledDate,
    //       before: getDaysAhead(1),
    //     },
    //   ];
    //   setSelectedDate(getDaysAhead(1)); // set selected date one day ahead
    // }

    // if (startDaysAheadFromTomorrow) {
    //   disabledDays = [
    //     ...disabledDays,
    //     {
    //       after: maximumDisabledDate,
    //       before: getDaysAhead(2),
    //     },
    //   ];
    //   setSelectedDate(getDaysAhead(2)); // set selected date two days ahead
    // }

    // if (!isMinDateAutoComputed && minDate !== null || minDate !== '') {
    //   disabledDays = [...disabledDays, {
    //     after: maximumDisabledDate,
    //     before: minDate
    //   }]
    // }
    setDisabledDays(disabledDays);
  };

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    } else {
      setSelectedDate(day);
    }
  };

  const handleDayChange = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    } else {
      setSelectedDate(day);
    }
  };

  const handleYearMonthChange = useCallback((month) => {
    setMonth(month);
  }, []);

  const changeFormatToSlash = () => {
    setIsDayPickerOpen(true);
  };

  const changeFormatToDash = () => {
    setIsDayPickerOpen(false);
  };

  const getDayPickerInputValue = () => {
    if (dayPickerInputRef.current !== undefined) {
      if (isDayPickerOpen) {
        return getDDMMYYYYDate(selectedDate);
      } else {
        if (
          moment(new Date()).format("DD/MM/YYYY") ===
          moment(selectedDate).format("DD/MM/YYYY")
        ) {
          return "Now";
        }
        return getDDMMMYYDate(selectedDate);
      }
    }
  };

  const handleTodayClicked = (day, modifiers) => {
    const { disableNextDaysFromToday = 0 } = props;
    const currentDateMonthAfterDisable = getDisabledDateRange(
      new Date(),
      disableNextDaysFromToday
    );
    if (modifiers.disabled) {
      return;
    } else {
      if (disableNextDaysFromToday !== 0) {
        setSelectedDate(currentDateMonthAfterDisable);
        setMonth(currentDateMonthAfterDisable);
      }
    }
  };

  const handleFocusToDayPicker = () => {
    const targetRef = dayPickerInputRef.current;
    targetRef.focus();
  };

  const customModifiers = {
    disabledDays: daysTobeDisabled,
    currentDate: new Date(selectedDate),
    weekends: daysTobeDisabled.filter(
      (obj) => Object.keys(obj)[0] === "daysOfWeek"
    ),
  };

  const customModifiersStyles = {
    disabledDays: {
      color: "#9e9e9e",
      borderRadius: "2px",
    },
    currentDate: {
      color: "white",
      backgroundColor: "#cc070b",
      borderRadius: "2px",
    },
    weekends: {
      color: "#d60505",
    },
  };

  const {
    customClassName = "",
    placeholder = "",
    formatToBeShown = "",
    todayButtonText = "",
  } = props;

  return (
    <>
      <div className="" style={{ padding: "15px" }}>
        <h3>Day Picker Input</h3>
        <>
          <br />
          {
            <>
              <DayPickerInput
                value={getDayPickerInputValue()}
                inputProps={{
                  ref: dayPickerInputRef,
                }}
                ref={dayPickerRef}
                dayPickerProps={{
                  month: month,

                  disabledDays: daysTobeDisabled,
                  fromMonth: new Date(), // to be based on min date
                  toMonth: new Date(
                    new Date().getFullYear() + 1,
                    new Date().getMonth(),
                    new Date().getDay() - 1
                  ),
                  tabIndex: 5,
                  captionElement: ({ date, localeUtils }) => (
                    <YearMonthForm
                      date={date}
                      localeUtils={localeUtils}
                      onChange={handleYearMonthChange}
                    />
                  ),
                  modifiers: customModifiers,
                  modifiersStyles: customModifiersStyles,
                  className: customClassName,
                  todayButton: todayButtonText,
                  onDayClick: (day, modifiers) =>
                    handleDayClick(day, modifiers),
                  onTodayButtonClick: (day, modifiers) =>
                    handleTodayClicked(day, modifiers),
                }}
                onDayChange={(day, modifiers) =>
                  handleDayChange(day, modifiers)
                }
                onDayPickerShow={() => changeFormatToSlash()}
                onDayPickerHide={() => changeFormatToDash()}
                formatDate={formatDate}
                parseDate={parseDate}
                format={formatToBeShown}
                placeholder={placeholder}
                // placeholder={`${formatDate(new Date())}`}
              />

              {/* <div className="calendar-section" onClick={handleFocusToDayPicker}> 
                <img src="calendar.jpg" width="20px" height="25px" alt="calendar" />
              </div> */}

              <div
                className="calendar-section"
                onClick={handleFocusToDayPicker}
              >
                <CalendarSVG />
              </div>
            </>
          }
        </>
      </div>
    </>
  );
};
export default DatePicker;
