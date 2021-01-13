import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPicker from 'react-day-picker';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { dynamicDateFormatterFromDate, dynamicDateFormatterToDate } from '../../utils/commonMethods';
import 'react-day-picker/lib/style.css';

class DayPickerWithRangeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      isFromDayPickerOpen: false,
      isToDayPickerOpen: false,
      selectedFromDay: null,
      selectedToDay: null,
      formattedDate: null,
    };
    this.toDayPickerRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isFromDayPickerOpen: isPrevFromDayPickerOpen,
    } = prevState;
    const {
      isFromDayPickerOpen,
    } = this.state;
    if (isPrevFromDayPickerOpen !== isFromDayPickerOpen) {
      this.getFormattedDate();
    }
  }

  // showFromMonth() {
  //   const { from, to } = this.state;
  //   if (!from) {
  //     return;
  //   }
  //   if (moment(to).diff(moment(from), 'months') < 2) {
  //     this.to.getDayPicker().showMonth(from);
  //   }
  // }

  // handleFromChange(from) {
  //   // Change the from date and focus the "to" input field
  //   this.setState({ from });
  // }

  // handleToChange(to) {
  //   this.setState({ to }, this.showFromMonth);
  // }

  showFromDayPicker = () => {
    this.setState({
      isFromDayPickerOpen: true,
      isToDayPickerOpen: false,
    })
  }

  showToDayPicker = () => {
    this.setState({
      isFromDayPickerOpen: false,
      isToDayPickerOpen: true,
    })
  }

  moveFocusOnToDayPicker = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return
    } else {
      this.setState({
        isToDayPickerOpen: true,
        isFromDayPickerOpen: false,
        selectedFromDay: day,
      }, () => {
        this.toDayPickerRef.current.focus()
      })
    }
  }

  handleToDayClick = (day, modifiers = {} ) => {
    if (modifiers.disabled) {
      return;
    } else {
      this.setState({
        selectedToDay: day,
      }, this.getFormattedDate);
    }
  }

  getFormattedDate = () => {
    const {
      selectedFromDay,
      selectedToDay,
      isFromDayPickerOpen,
      isToDayPickerOpen
    } = this.state;
    const requiredFromDateParams = {
      selectedFromDay,
      isFromDayPickerOpen,
      formatDate,
      moment
    }
    const requiredToDateParams = {
      selectedToDay,
      isToDayPickerOpen,
      formatDate,
      moment
    }
    const dynamicFormattedFromDate = dynamicDateFormatterFromDate(requiredFromDateParams);
    const dynamicFormattedToDate = dynamicDateFormatterToDate(requiredToDateParams);
    this.setState({
      formattedFromDate: dynamicFormattedFromDate,
      formattedToDate: dynamicFormattedToDate
    });
  }

  render() {
    const {
      isFromDayPickerOpen,
      isToDayPickerOpen,
      selectedFromDay,
      selectedToDay,
      formattedFromDate,
      formattedToDate,
    } = this.state;

    const modifiers = { start: selectedFromDay, end: selectedToDay };
    const customModifiersStyles = {
      start: {
        background: 'green',
        color: 'white',
        borderRadius: '0px',
      },
      end: {
        background: 'green',
        color: 'white',
        borderRadius: '0px',
      }
    } 
    return (
      <div className="container mt-3">
        <h3>Day Picker With Date Range</h3>
        <br />
        <div className="InputFromTo">
          <input
            type="text"
            onFocus={this.showFromDayPicker}
            value={formattedFromDate}
            placeholder="From"
          />
          <div className="calendar-section">
            <img src="calendar.jpg" width="20px" height="25px" />
          </div>

          <input
            type="text"
            onFocus={this.showToDayPicker}
            value={formattedToDate}
            ref={this.toDayPickerRef}
            placeholder="To"
          />
          <div className="calendar-section">
            <img src="calendar.jpg" width="20px" height="25px" />
          </div>
          {
            isFromDayPickerOpen && (
              <div className="outer-from-section">
                <div className="from-section">
                  <DayPicker
                    placeholder="From"
                    format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    selectedDays={[selectedFromDay, { selectedFromDay, selectedToDay }]}
                    disabledDays={ {after: selectedToDay }}
                    toMonth={selectedToDay}
                    modifiers={modifiers}
                    modifiersStyles={customModifiersStyles}
                    numberOfMonths={2}
                    onDayClick={(day) => this.moveFocusOnToDayPicker(day)}
                  /> 
                </div>
              </div>
            )
          }
          {
            isToDayPickerOpen && (
              <div className="InputFromTo-to">
                <DayPicker
                  placeholder="To"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  selectedDays={[selectedFromDay, { selectedFromDay, selectedToDay }]}
                  disabledDays={{ before: selectedFromDay }}
                  modifiers={modifiers}
                  modifiersStyles={customModifiersStyles}
                  month={selectedFromDay}
                  fromMonth={selectedFromDay}
                  numberOfMonths={2}
                  onDayClick={(day) => this.handleToDayClick(day)}
                />
            </div>
            )
          }
          {/* <Helmet>
            <style>
              {`
                .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                  background-color: #f0f8ff !important;
                  color: #4a90e2;
                }
                .InputFromTo .DayPicker-Day {
                  border-radius: 0 !important;
                }
                .InputFromTo .DayPicker-Day--start {
                  border-top-left-radius: 50% !important;
                  border-bottom-left-radius: 50% !important;
                }
                .InputFromTo .DayPicker-Day--end {
                  border-top-right-radius: 50% !important;
                  border-bottom-right-radius: 50% !important;
                }
                .InputFromTo .DayPickerInput-Overlay {
                  width: 550px;
                }
                .InputFromTo-to .DayPickerInput-Overlay {
                  margin-left: -198px;
                }
              `}
            </style>
          </Helmet> */}
        </div>
      </div>
    );
  }
}
export default DayPickerWithRangeTest;