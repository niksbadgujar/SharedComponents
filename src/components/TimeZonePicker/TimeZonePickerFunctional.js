import React, { useEffect, useRef, useState } from "react";
import serviceMethods from "../../utils/serviceMethods";

const TimeZonepicker = (props) => {
  const [stateZones, setStateZones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const [convertedDate, setConvertedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const stateZoneRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      timer();
    }, 1000);
    fetchLiveTime();
  }, []);

  const timer = () => {
    setCurrentCount((currentCount) => currentCount + 1);
  };

  const fetchLiveTime = () => {
    serviceMethods
      .getTimeStamps()
      .then((response) => {
        const { data: { status = "", zones = [] } = {} } = response;
        if (status === "OK") {
          setStateZones(zones);
          stateZoneRef.current = zones;
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("error - ", error);
      });
  };

  useEffect(() => {
    if (currentCount % 10 === 0 && currentCount !== 0) {
      // Setting new timestamp after every 5 seconds
      const updatedZone = stateZones.map((obj) => ({
        ...obj,
        timestamp: obj.timestamp + 10,
      }));
      setStateZones(updatedZone);
    }
  }, [currentCount]);

  useEffect(() => {
    const prevZones = stateZoneRef.current;
    if (
      stateZones.length !== 0 &&
      prevZones !== stateZones &&
      selectedValue !== ""
    ) {
      const { timestamp } = stateZones.filter(
        (obj) => obj.zoneName === selectedValue
      )[0];
      getLiveDate(timestamp);
    }
  }, [stateZones, selectedValue]);

  const handleTimeZoneChange = (event) => {
    const { target: { value = "" } = {} } = event;
    if (value !== "") {
      const selectedZone = stateZones.filter(
        (eachZone) => eachZone.zoneName === value
      )[0];
      const { timestamp = 0 } = selectedZone;
      setSelectedValue(value);
      getLiveDate(timestamp);
    } else {
      setConvertedDate("");
      setSelectedValue("");
    }
  };

  const getLiveDate = (timestamp) => {
    if (timestamp !== 0) {
      const newDate = new Date(timestamp * 1000 + 1);
      const convertedDate = newDate.toUTCString();
      setConvertedDate(convertedDate);
    }
  };

  return (
    <>
      <div className="" style={{ padding: "15px" }}>
        <h3>Time Zone Picker</h3>

        <div className="time-zone-picker">
          <select
            onChange={(event) => handleTimeZoneChange(event)}
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
};

export default TimeZonepicker;
