import React, { PureComponent } from "react";
import DayPickerWithRange from "./DayPickerWithRange";

class WithRangeParent extends PureComponent {
  render() {
    const pastEnableDayCount = 0;
    const futureDisabledDaysCount = 45;
    const bankHolidayDates = [
      new Date(2021, 0, 15),
      new Date(2021, 0, 5),
      new Date(2021, 0, 25),
      new Date(2021, 0, 20),
    ];

    // If start working date is empty then start date will be considered based on other ahead days flags
    // let startWorkingDate = null;
    let startWorkingDate = new Date();
    // startWorkingDate.setDate(new Date().getDate() + 3)
    const customClassName = "";
    const placeholder = "Now";
    // const FORMAT = "DD-MMM-YY";
    const FORMAT = "DD/MM/yyyy";

    return (
      <>
        <div className="container">
          <div className="day-picker-outer">
            <DayPickerWithRange
              isPastDaysDisabled={false}
              futureDisabledDaysCount={futureDisabledDaysCount}
              pastEnableDayCount={pastEnableDayCount}
              holidayDates={bankHolidayDates}
              isWeekendDisabled={true}
              isHolidayDisabled={true}
              isMinDateAutoComputed={true}
              startDaysAheadFromToday={false}
              startDaysAheadFromTomorrow={false}
              customClassName={customClassName}
              placeholder={placeholder}
              formatToBeShown={FORMAT}
            />
            <hr />
          </div>
          <br />
        </div>
      </>
    );
  }
}

export default WithRangeParent;
