// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import { formatDate, parseDate } from "react-day-picker/moment";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "../../styles/dayPickerWithRange.style.css";
import {
  getDisabledDateRange,
  getDaysAhead,
  getDDMMMYYDate,
  getDDMMYYYYDate,
  getPastDateRange,
} from "../../utils/commonMethods";
import CalendarSVG from "../DayPickerInput/CalendarSvg";

const ButtonSection = (props) => {
  const { handleClearClick, handleApplyClick, date } = props;
  const { date: currentMonthDate } = date;
  const month = new Date(currentMonthDate).toLocaleString("default", {
    month: "long",
  });
  const year = new Date(currentMonthDate).getFullYear();
  return (
    <>
      <div className="heading-section">
        <h4>{`${month} ${year}`}</h4>
      </div>
      <div className="button-section">
        <input
          type="button"
          className="btn-clear"
          value="Clear Selection"
          onClick={handleClearClick}
        />

        <input
          type="button"
          value="Apply"
          className="btn-apply"
          onClick={handleApplyClick}
        />
      </div>
    </>
  );
};

const DayPickerWithRange = (props) => {
  const fromInputRef = useRef();
  const toInputRef = useRef();
  const toInputDayPickerRef = useRef();
  const fromInputDayPickerRef = useRef();

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [isFromDayPickerOpen, setIsFromDayPickerOpen] = useState(false);
  const [isToDayPickerOpen, setIsToDayPickerOpen] = useState(false);

  const [daysTobeDisabled, setDisabledDays] = useState([]);
  const [range, setRange] = useState([]);

  useEffect(() => {
    if (to !== undefined) {
      showFromMonth();
    }
  }, [to]);

  useEffect(() => {
    getDisabledDays();
  }, []);

  const showFromMonth = () => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      if (
        toInputDayPickerRef.current.getDayPicker() !== null ||
        toInputDayPickerRef.current.getDayPicker() !== undefined
      ) {
        toInputDayPickerRef.current.getDayPicker().showMonth(from);
      }
    }
  };

  const getDisabledDays = () => {
    const {
      futureDisabledDaysCount = 0,
      holidayDates = [],
      isPastDaysDisabled,
      isWeekendDisabled,
      isHolidayDisabled,
      startDaysAheadFromToday,
      startDaysAheadFromTomorrow,
      minDate = null,
      pastEnableDayCount = 0,
      isMinDateAutoComputed = false,
    } = props;

    const maximumDisabledDate = getDisabledDateRange(
      new Date(),
      futureDisabledDaysCount
    );

    const minimumDisabledDate = getPastDateRange(
      new Date(),
      pastEnableDayCount
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
    setDisabledDays(disabledDays);
  };

  const handleFromChange = (from, modifiers) => {
    if (modifiers.disabled) {
      return false;
    } else {
      setFrom(from);
    }
  };

  const handleToChange = (to, modifiers) => {
    if (modifiers.disabled) {
      return false;
    } else {
      setTo(to);
    }
  };

  const handleFromDayClick = (day, modifiers) => {
    // const range = DateUtils.addDayToRange(day, {from, to});
    // setRange(range)
    if (modifiers.disabled) {
      return false;
    } else {
      setFrom(day);
      toInputRef.current.focus();
    }
  };

  const handleToDayClick = (day, modifiers) => {
    if (modifiers.disabled) {
      return false;
    } else {
      setTo(day);
      // const range = DateUtils.addDayToRange(day);
      toInputRef.current.focus();
    }
  };

  const changeFromFormatToSlash = () => {
    setIsFromDayPickerOpen(true);
  };

  const changeFromFormatToDash = () => {
    setIsFromDayPickerOpen(false);
  };

  const changeToFormatToSlash = () => {
    setIsToDayPickerOpen(true);
  };

  const changeToFormatToDash = () => {
    setIsToDayPickerOpen(false);
  };

  const daysOfHoliday = daysTobeDisabled.filter(
    (obj) =>
      Object.keys(obj)[0] !== "before" &&
      Object.keys(obj)[0] !== "after" &&
      Object.keys(obj)[0] !== "before" &&
      Object.keys(obj)[1] !== "after" &&
      Object.keys(obj)[1] !== "before" &&
      Object.keys(obj)[0] !== "daysOfWeek"
  );

  const weekends = daysTobeDisabled.filter(
    (obj) => Object.keys(obj)[0] === "daysOfWeek"
  );

  const modifiers = {
    start: from,
    end: to,
    holidays: daysOfHoliday,
    weekends: weekends,
    selectedDays: [from, { from, to }],
  };

  const customModifierStyles = {
    holidays: {
      color: "#f57f06",
    },
    weekends: {
      color: "#d60505",
    },
    selectedDays: {
      backgroundColor: "#2e908c",
      color: "#FFFFFF",
    },
  };

  const getFromInputValue = () => {
    if (isFromDayPickerOpen) {
      return getDDMMYYYYDate(from);
    } else {
      // if (moment(new Date()).format("DD/MM/YYYY") === moment(from).format("DD/MM/YYYY")) {
      //   return 'Now';
      // }
      return getDDMMMYYDate(from);
    }
  };

  const getToInputValue = () => {
    if (isToDayPickerOpen) {
      return getDDMMYYYYDate(to);
    } else {
      // if (moment(new Date()).format("DD/MM/YYYY") === moment(to).format("DD/MM/YYYY")) {
      //   return 'Now';
      // }
      return getDDMMMYYDate(to);
    }
  };

  const handleFocusOnFromPicker = () => {
    fromInputRef.current.focus();
  };

  const handleFocusOnToPicker = () => {
    toInputRef.current.focus();
  };

  const { formatToBeShown = "" } = props;

  const handleClearSelection = () => {
    setFrom("");
    setTo("");
    setRange([{ from: "", to: "" }]);
  };

  const handleApplyClick = () => {
    setRange([{ from, to }]);
  };

  console.log("range - ", range);

  return (
    <div className="container mt-3">
      <h3>Day Picker With Date Range</h3>
      <br />
      <div className="InputFromTo">
        <DayPickerInput
          inputProps={{
            ref: fromInputRef,
          }}
          ref={fromInputDayPickerRef}
          value={getFromInputValue()}
          placeholder="dd/mm/yyyy"
          format={formatToBeShown}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: [...daysTobeDisabled, { after: to }],
            modifiers,
            modifiersStyles: customModifierStyles,
            numberOfMonths: 1,
            onDayClick: (day, modifiers) => handleFromDayClick(day, modifiers),
            tabIndex: 2,
            captionElement: (date) => (
              <ButtonSection
                handleClearClick={handleClearSelection}
                handleApplyClick={handleApplyClick}
                date={date}
              />
            ),
          }}
          onDayChange={(day, modifiers) => handleFromChange(day, modifiers)}
          onDayPickerShow={() => changeFromFormatToSlash()}
          onDayPickerHide={() => changeFromFormatToDash()}
        />
        <div className="calendar-section" onClick={handleFocusOnFromPicker}>
          <CalendarSVG />
        </div>
        <span className="InputFromTo-to">
          <DayPickerInput
            inputProps={{
              ref: toInputRef,
            }}
            ref={toInputDayPickerRef}
            // value={to}
            value={getToInputValue()}
            placeholder="dd/mm/yyyy"
            format={formatToBeShown}
            formatDate={formatDate}
            parseDate={parseDate}
            hideOnDayClick={false}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: [...daysTobeDisabled, { before: from }],
              modifiers,
              modifiersStyles: customModifierStyles,
              month: from,
              fromMonth: from !== "" ? from : undefined,
              // toMonth: to,
              numberOfMonths: 1,
              tabIndex: 4,
              onDayClick: (day, modifiers) => handleToDayClick(day, modifiers),
              captionElement: (date) => (
                <ButtonSection
                  handleClearClick={handleClearSelection}
                  handleApplyClick={handleApplyClick}
                  date={date}
                />
              ),
            }}
            onDayChange={(to, modifiers) => handleToChange(to, modifiers)}
            onDayPickerShow={() => changeToFormatToSlash()}
            onDayPickerHide={() => changeToFormatToDash()}
          />
          <div className="calendar-section" onClick={handleFocusOnToPicker}>
            <CalendarSVG />
          </div>
          {/* {(isFromDayPickerOpen || isToDayPickerOpen) && (
            <ButtonSection
              handleClearClick={handleClearSelection}
              handleApplyClick={handleApplyClick}
            />
          )} */}
        </span>
      </div>
    </div>
  );
};
export default DayPickerWithRange;
