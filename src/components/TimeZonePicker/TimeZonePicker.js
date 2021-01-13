// @ts-nocheck
import React from "react";
import serviceMethods from "../../utils/serviceMethods";

class TimeZonepicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateZones: [],
      isLoading: true,
      convertedDate: "",
      selectedValue: "",
      currentCount: 0,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.intervalId = setInterval(this.timer.bind(this), 1000);
    this.fetchLiveTime();
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentCount: prevCount } = prevState;
    const { currentCount, stateZones = [] } = this.state;
    if (
      currentCount !== prevCount &&
      currentCount % 5 === 0 &&
      currentCount !== 0
    ) {
      // Updating timestamp every 5 seconds
      const updatedZone = stateZones.map((obj) => ({
        ...obj,
        timestamp: obj.timestamp + 5,
      }));
      this.setState(
        {
          stateZones: updatedZone,
        },
        () => {
          this.setUpdatedDate();
        }
      );
    }
  }

  fetchLiveTime = () => {
    serviceMethods
      .getTimeStamps()
      .then((response) => {
        const { data: { status = "", zones = [] } = {} } = response;
        if (status === "OK") {
          this.setState({
            stateZones: zones,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error - ", error);
      });
  };

  setUpdatedDate = () => {
    const { selectedValue = "", stateZones = [] } = this.state;
    if (stateZones.length !== 0 && selectedValue !== "") {
      const newTimeStamp = stateZones.filter(
        (obj) => obj.zoneName === selectedValue
      )[0].timestamp;
      this.getLiveDate(newTimeStamp);
    }
  };

  handleTimeZoneChange = (event) => {
    const { target: { value = "" } = {} } = event;
    if (value !== "") {
      const selectedZone = this.state.stateZones.filter(
        (eachZone) => eachZone.zoneName === value
      )[0];
      const { timestamp = 0 } = selectedZone;
      this.setState({
        selectedValue: value,
      });
      this.getLiveDate(timestamp);
    } else {
      this.setState({
        selectedValue: "",
        convertedDate: "",
      });
    }
  };

  getLiveDate = (timestamp = 0) => {
    if (timestamp !== 0) {
      const newDate = new Date(timestamp * 1000 + 1);
      const convertedDate = newDate.toUTCString();
      this.setState({
        convertedDate: convertedDate,
      });
    }
  };

  render() {
    const { isLoading = false, stateZones = [], convertedDate } = this.state;
    return (
      <>
        <div className="" style={{ padding: "15px" }}>
          <h3>Time Zone Picker</h3>

          <div className="time-zone-picker">
            <select
              onChange={(event) => this.handleTimeZoneChange(event)}
              disabled={isLoading}
              style={{ cursor: "pointer" }}
            >
              {isLoading === true ? (
                <option value="">Loading..</option>
              ) : (
                <>
                  <option value="">Select Zone</option>
                  {stateZones.map((eachZone, index) => (
                    <option key={`${index}-${eachZone.countryCode}`}>
                      {eachZone.zoneName}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="converted-date-section">
            <p>{convertedDate}</p>
          </div>
        </div>
      </>
    );
  }
}

export default TimeZonepicker;
