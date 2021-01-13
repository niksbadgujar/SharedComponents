import React, { PureComponent } from "react";
import DatePicker from "./DatePicker";

class DayPickerInputParent extends PureComponent {
  render() {
    const pastEnableDayCount = 7;
    const futureDisabledDaysCount = 45;
    const bankHolidayDates = [
      new Date(2021, 0, 15),
      new Date(2021, 0, 5),
      new Date(2021, 0, 1),
      new Date(2021, 0, 25),
      new Date(2021, 0, 20),
    ];

    // If start working date is empty then start date will be considered based on other ahead days flags
    // let startWorkingDate = null;
    let startWorkingDate = new Date();
    // startWorkingDate.setDate(new Date().getDate() + 3)
    const customClassName = "";
    const placeholder = "DD/MM/YYYY";
    const FORMAT = "DD/MM/yyyy";
    const todayButtonText = "Today";
    const disableNextDaysFromToday = 3; // Tested with - 3 , 4, 6, 10
    return (
      <>
        <div className="container">
          <div className="day-picker-outer">
            <DatePicker
              isPastDaysDisabled={false}
              futureDisabledDaysCount={futureDisabledDaysCount}
              pastEnableDayCount={pastEnableDayCount}
              holidayDates={bankHolidayDates}
              disableNextDaysFromToday={disableNextDaysFromToday}
              isWeekendDisabled={true}
              isHolidayDisabled={true}
              isMinDateAutoComputed={true}
              // startDaysAheadFromToday={false} // pass number here...
              // startDaysAheadFromTomorrow={false}
              customClassName={customClassName}
              placeholder={placeholder}
              formatToBeShown={FORMAT}
              todayButtonText={todayButtonText}
            />
            <hr />
          </div>
          <br />
        </div>
      </>
    );
  }
}

export default DayPickerInputParent;
