export const getDisabledDateRange = (date, futureDisabledDaysCount) => {
  const selectedDate = new Date(Number(date));
  selectedDate.setDate(date.getDate() + futureDisabledDaysCount);
  return selectedDate;
};

export const getDisabledDateFromToday = (
  date,
  disableNextDaysFromToday,
  bankHolidayDates
) => {
  console.log("disableNextDaysFromToday count - ", disableNextDaysFromToday);
  const selectedDate = date;
  selectedDate.setDate(date.getDate() + disableNextDaysFromToday);

  // const enabledDate = checkNextEnabledDate(
  //   selectedDate.setDate(date.getDate() + disableNextDaysFromToday),
  //   bankHolidayDates
  // );
  console.log("selectedDate before - ", selectedDate);
  const enabledDate = checkNextEnabledDate(selectedDate, bankHolidayDates);
  console.log("enabledDate - ", enabledDate);
  return enabledDate;

  // const newSelectedDate = new Date(
  //   new Date(selectedDate).getFullYear(),
  //   new Date(selectedDate).getMonth(),
  //   new Date(selectedDate).getDate()
  // );

  // const daysOfHoliday = bankHolidayDates.map((obj) => obj.setHours(0, 0, 0, 0));
  // const isDayDisabled = daysOfHoliday.includes(
  //   newSelectedDate.setHours(0, 0, 0, 0)
  // );

  // const isWeekend =
  //   newSelectedDate.getDay() === 6 || newSelectedDate.getDay() === 0;

  // if (isDayDisabled || isWeekend) {
  //   selectedDate.setDate(selectedDate.getDate() + 1);
  //   getDisabledDateFromToday(selectedDate, 1, bankHolidayDates);
  // } else {
  //   console.log("selectedDate ELSE - ", selectedDate);
  //   return selectedDate.setDate(selectedDate.getDate() - 1);
  // }

  // console.log("selectedDate OUTSIDE - ", selectedDate);
  // return selectedDate;
};

const checkNextEnabledDate = (selectedDate, bankHolidayDates) => {
  let newSelectedDate = new Date(
    new Date(selectedDate).getFullYear(),
    new Date(selectedDate).getMonth(),
    new Date(selectedDate).getDate()
  );
  const daysOfHoliday = bankHolidayDates.map((obj) => obj.setHours(0, 0, 0, 0));
  const isDayDisabled = daysOfHoliday.includes(
    newSelectedDate.setHours(0, 0, 0, 0)
  );

  const isWeekend =
    newSelectedDate.getDay() === 6 || newSelectedDate.getDay() === 0;

  if (isDayDisabled || isWeekend) {
    newSelectedDate.setDate(newSelectedDate.getDate() + 1);
    checkNextEnabledDate(newSelectedDate, bankHolidayDates);
    // return false;
  } else {
    console.log("newSelectedDate - ", newSelectedDate);
    return newSelectedDate;
  }
};

export const getPastDateRange = (date, pastEnableDayCount) => {
  const selectedDate = new Date(Number(date));
  selectedDate.setDate(date.getDate() - pastEnableDayCount);
  return selectedDate;
};

export const getDaysAhead = (noOfDays) => {
  const daysAhead = new Date();
  daysAhead.setDate(daysAhead.getDate() + noOfDays);
  console.log("daysAhead check - ", daysAhead);
  return daysAhead;
};

export const formatDate = (selectedDate) => {
  if (selectedDate !== null) {
    const formattedDate = selectedDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "-");
    return formattedDate;
  }
};

export const getYearsList = (fromYear, toHowManyYears) => {
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const years = range(fromYear, fromYear + toHowManyYears, 1);
  return years;
};

export const dynamicDateFormatter = (params) => {
  const { selectedDate, isDayPickerOpen, formatDate, moment } = params;
  let formattedDate;
  if (selectedDate === "") {
    return (formattedDate = "");
  } else {
    if (!isDayPickerOpen) {
      if (!isNaN(Date.parse(selectedDate))) {
        return (formattedDate = formatDate(selectedDate));
      } else {
        return (formattedDate = "");
      }
    } else {
      if (!isNaN(Date.parse(selectedDate))) {
        let formattedDate = moment(selectedDate).format("DD-MMM-YY");
        return formattedDate;
      } else {
        return (formattedDate = "");
      }
    }
  }
};

export const dynamicDateFormatterFromDate = (params) => {
  const { selectedFromDay, isFromDayPickerOpen, formatDate, moment } = params;
  let formattedDate;
  if (selectedFromDay === "") {
    return (formattedDate = "");
  } else {
    if (!isFromDayPickerOpen) {
      if (!isNaN(Date.parse(selectedFromDay))) {
        return (formattedDate = formatDate(selectedFromDay));
      } else {
        return (formattedDate = "");
      }
    } else {
      if (!isNaN(Date.parse(selectedFromDay))) {
        let formattedDate = moment(selectedFromDay).format("DD-MMM-YY");
        return formattedDate;
      } else {
        return (formattedDate = "");
      }
    }
  }
};

export const dynamicDateFormatterToDate = (params) => {
  const { selectedToDay, isToDayPickerOpen, formatDate, moment } = params;
  let formattedDate;
  if (selectedToDay === "") {
    return (formattedDate = "");
  } else {
    if (!isToDayPickerOpen) {
      if (!isNaN(Date.parse(selectedToDay))) {
        return (formattedDate = formatDate(selectedToDay));
      } else {
        return (formattedDate = "");
      }
    } else {
      if (!isNaN(Date.parse(selectedToDay))) {
        let formattedDate = moment(selectedToDay).format("DD-MMM-YY");
        return formattedDate;
      } else {
        return (formattedDate = "");
      }
    }
  }
};

// --------------------------------------------------------------------------------------------------------------

const getSlashFormattedDate = (dateObject) => {
  const todayTime = new Date(dateObject);
  const month = todayTime.getMonth() + 1;
  const day = todayTime.getDate();
  const year = todayTime.getFullYear();
  const formattedDate = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`;
  return formattedDate;
};

const getDashFormattedDate = (dateObject) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const myDate = new Date(dateObject);
  const currentMonth = month[myDate.getMonth()];
  const str = `${
    myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate()
  }-${currentMonth}-${myDate.getFullYear()}`;
  return str;
};

export const getDDMMYYYYDate = (dateToBePassed) => {
  if (
    dateToBePassed !== undefined &&
    typeof dateToBePassed.getMonth !== "function"
  ) {
    if (dateToBePassed.includes("/")) {
      const dateParts = dateToBePassed.split("/");
      const dateObject = new Date(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0]
      );
      return getSlashFormattedDate(dateObject);
    }
  } else {
    if (dateToBePassed !== undefined) {
      return getSlashFormattedDate(dateToBePassed);
    }
  }
};

export const getDDMMMYYDate = (dateToBePassed) => {
  if (
    dateToBePassed !== undefined &&
    typeof dateToBePassed.getMonth !== "function"
  ) {
    if (dateToBePassed.includes("/")) {
      const dateParts = dateToBePassed.split("/");
      const dateObject = new Date(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0]
      );
      return getDashFormattedDate(dateObject);
    }
  } else {
    if (dateToBePassed !== undefined) {
      return getDashFormattedDate(dateToBePassed);
    }
  }
  return "";
};
