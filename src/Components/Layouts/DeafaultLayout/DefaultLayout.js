import React from 'react';
import Booking from '../BKP/Booking';
import Container from '@mui/material/Container';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Slide from '../Slide/Slide';
import "./DefaultLayout.css";

export default function DefaultLayout({ children }) {
    

    return (
        <>
            <Header />
            <div className="body-main">
                <div className="slide">
                    <Slide />
                </div>
                <Booking />
                <div className="Booking-Main-Body">
                    <Container
                        maxWidth="lg"
                        className="custom-container"
                    >
                        {children}
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
}
