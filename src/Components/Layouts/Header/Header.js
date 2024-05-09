import React from 'react';
import { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo2.PNG'
import avatar from '../../../assets/avatar.svg'; // Import your avatar image
import AuthService, { useAuth } from './AuthService';

export default function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const { isLoggedIn, logout } = useAuth();  // Add state for login status
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        // You can use the isLoggedIn state directly here if needed
    }, [isLoggedIn]);


    return (
        <header>
            <div className='navbar'>
                <img className='img-logo' src={logo} alt="Logo" />

                <ul className='navbar-links'>
                    <li><a href='/' className='a-header'>Trang chủ</a></li>
                    <li><a href='/search-ticket'className='a-header'>Tra cứu</a></li>
                    <li><a href='/explore'className='a-header'>Khám phá</a></li>
                    <li><a href='/about-us'className='a-header' >Về chúng tôi</a></li>
                </ul>
                <div className='navbar-login'>
                <a href='/sign-in' className='a-header'>Đăng nhập</a>
                <a href='/sign-up'className='a-header'>Đăng ký</a>
                </div>
            </div>
        </header>
    )
}