import {
  getYearsList,
} from '../../../utils/commonMethods';

const YearMonthForm = (props) => {
  const {
    date,
    localeUtils,
    onChange,
  } = props;

  const fromYear = (new Date()).getFullYear();
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
        tabIndex={3}>
        {
          months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))
        }
      </select>
      <select
        className="month-year-dropdown"
        name="year"
        onChange={handleChange}
        value={date.getFullYear()}
        tabIndex={4}>
        {
          yearsList.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))
        }
      </select>
    </form>
  );
}

export default YearMonthForm;