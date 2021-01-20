// @ts-nocheck
import React, { Component } from "react";
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
import SingleAccount from "./DropdownUsingRebass/SingleAccount";
import { Accordion } from "./Dropdown/Accordion/Accordion";
import DropdownParent from "./Dropdown/DropdownParent";
import FlexBox from './FlexBoxDesign/FlexBox';

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

          <Route path="/accordion" component={Accordion} />
          <Route path="/dropdown-rebass" component={Dropdown} />
          <Route path="/single-account" component={SingleAccount} />
          <Route path="/flex-box" component={FlexBox} />

          {/* <Route path="/dayPickerWithRangeTest" component={DatePickerWithRangeTest}  /> */}
        </Switch>
      </>
    );
  }
}

export default MainComponent;
