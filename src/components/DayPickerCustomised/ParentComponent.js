import React, { PureComponent } from 'react'
import DayPickerComponent from './DayPickerComponent';

class ParentComponent extends PureComponent {

  render() {
    const futureDisabledDaysCount = 45;
    const bankHolidayDates = [
      new Date(2021,0,15),
      new Date(2021,0,5),
      new Date(2021,0,25),
      new Date(2021,0,20)
    ]

    // If start working date is empty then start date will be considered based on other ahead days flags
    let startWorkingDate = null;
    // let startWorkingDate = new Date();
    // startWorkingDate.setDate(new Date().getDate() + 3)
    const customClassName = 'custom-daypicker';

    return (
      <>
        <div className="container">
          <div className="day-picker-outer">
            <DayPickerComponent
              isPastDaysDisabled={true}
              futureDisabledDaysCount={futureDisabledDaysCount}
              holidayDates={bankHolidayDates}
              isWeekendDisabled={true}
              isHolidayDisabled={true}
              minDate={startWorkingDate}
              startDaysAheadFromToday={true}
              startDaysAheadFromTomorrow={false}
              customClassName={customClassName}
            />
            <hr />
          </div>

          <br />
        </div>
      </>
    )
  }
}

export default ParentComponent;