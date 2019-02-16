import React from 'react';
import { Menu, Icon, Button } from 'element-react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, handleSignOut }) => (
  <Menu mode="horizontal" theme="dark" defaultActive="1">
    <div className="nav-container">
      {/* App title / Icon */}
      <Menu.Item index="1">
        <NavLink to="/" className="nav-link">
          <span className="app-title">
            <img
              className="app-icon"
              src="https://icon.now.sh/account_balance/f90"
              alt="App Icon"
            />
            AmplifyAgora
          </span>
        </NavLink>
      </Menu.Item>

      {/* Navbar Items */}
      <div className="nav-items">
        <Menu.Item index="2">
          <span className="app-user">Hello, {user.username}</span>
        </Menu.Item>
        <Menu.Item index="3">
          <NavLink className="nav-link" to="/profile">
            <Icon name="setting" />
            Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item index="4">
          <Button onClick={handleSignOut} type="warning">
            Sign Out
          </Button>
        </Menu.Item>
      </div>
    </div>
  </Menu>
);

export default Navbar;
