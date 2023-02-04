import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/blockchain" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cube"> Blockchain </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/validate" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="check">Validate</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/validators" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="check-double">Validators</CDBSidebarMenuItem>
            </NavLink>
            <br></br><br></br>
            <NavLink exact to="/wallet" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="wallet">Wallet</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="arrow-right"> Logout </CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Daniel Sadler &copy;
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default NavBar;