// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlug, FaDollarSign, FaShareAlt, FaCogs } from 'react-icons/fa';
import { IoChatbubbleOutline } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import logo from './img/electric_bolt_42dp_EA33F7.png';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Superpage" className="logo-img" />
        <span className="logo-text">Superpage</span> 
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <IoChatbubbleOutline /> AI Chat
          </Link>
        </li>
        <li>
          <Link to="/members">
            <RiGroupLine /> Members
          </Link>
        </li>
        <li>
          <Link to="/integrations">
            <FaPlug /> Integrations
          </Link>
        </li>
        <li>
          <Link to="/pricing-plans">
            <FaDollarSign /> Pricing Plans
          </Link>
        </li>
        <li>
          <Link to="/refer-friends">
            <FaShareAlt /> Refer Friends
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCogs /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
