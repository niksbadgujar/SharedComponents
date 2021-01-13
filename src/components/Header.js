// @ts-nocheck
import React from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar dark expand="md">
        <div className="container">
          <Nav navbar>
            <NavItem>
              <NavLink className="nav-link" to="/dayPickerInput">
                Day Picker Input
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/simpleDayPicker">
                Day Picker Customised
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/dayPickerWithRange">
                Day Picker With Range
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/timeZonePicker">
                Time Zone Picker
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/cardComponent">
                Card Component
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/dropdownComponent">
                Dropdown
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/accordion">
                Accordion
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/dropdown-rebass">
                Dropdown-Rebass
              </NavLink>
            </NavItem>

            {/* <NavItem>
              <NavLink className="nav-link" to="/dayPickerWithRangeTest">
                Day Picker With Range Customised
              </NavLink>
            </NavItem> */}
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
