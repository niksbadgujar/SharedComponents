// @ts-nocheck
import React, { Component, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import DatePickerWithRange from "./DayPickerWithRange/DayPickerWithRange";
// import DatePickerWithRangeTest from './DayPickerWithRange/DatePickerWithRangeTest';
import ParentComponent from "./DayPickerCustomised/ParentComponent";
import DayPickerInputParent from "./DayPickerInput/DayPickerInputParent";
import Header from "./Header";
import WithRangeParent from "./DayPickerWithRange/WithRangeParent";
// import TimeZonePicker from "./TimeZonePicker/TimeZonePicker";
import TimeZonePicker from "./TimeZonePicker/TimeZonePickerFunctional";
import CardParent from "./CardComponent/CardParent";
import Dropdown from "./DropdownUsingRebass/Dropdown";
import DropdownParent from "./Dropdown/DropdownParent";
import DropdownIndex from "./DropdownUsingRebass/DropdownIndex";
import FlexBox from "./FlexBoxDesign/FlexBox";

const DropdownIndexLazyLoaded = lazy(() =>
  import("./DropdownUsingRebass/DropdownIndex")
);

class MainComponent extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/simpleDayPicker" component={ParentComponent} />
          <Route path="/dayPickerInput" component={DayPickerInputParent} />

          {/* <Route path="/dayPickerWithRange" component={DatePickerWithRange}  /> */}
          <Route path="/dayPickerWithRange" component={WithRangeParent} />
          <Route path="/timeZonePicker" component={TimeZonePicker} />
          <Route path="/cardComponent" component={CardParent} />
          <Route path="/dropdownComponent" component={DropdownParent} />
          <Route path="/flex-box" component={FlexBox} />
          <Suspense fallback={<div>Loading...</div>}>
            <Route
              path="/dropdown-rebass"
              component={DropdownIndexLazyLoaded}
            />
          </Suspense>


          {/* <Route path="/dayPickerWithRangeTest" component={DatePickerWithRangeTest}  /> */}
        </Switch>
      </>
    );
  }
}

export default MainComponent;
