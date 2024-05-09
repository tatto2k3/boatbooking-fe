import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./SeatBooking.css";
import axios from "axios";
import { useSearch } from '../../CustomHooks/SearchContext';
export default function SeatBooking() {
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, seatIdComeback, setSeatIdComeback, luggaeId, setLuggageId] = useSearch();
    const [seat, setSeat] = useState([]);
    const [activeSeatId, setActiveSeatId] = useState(null);
    const [activeButton, setActiveButton] = useState("Depart");
    const [currentStatus, setCurrentStatus] = useState("depart");
    const [bookedSeats, setBookedSeats] = useState([]);
    localStorage.setItem('seatId', seatId);
    localStorage.setItem('seatIdComeback', seatIdComeback);
    console.log('Seat ID', localStorage.getItem('seatId'));
    console.log('Seat ID Comeback', localStorage.getItem('seatIdComeback'));
    console.log(activeButton);
    useEffect(() => {
        // Fetch data from the API using Axios
        axios.get('http://localhost:8080/api/v1/auth/seats/all')
            .then(response => {
                setSeat(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const scheduleIDOneWay = localStorage.getItem('scheduleIDOneWay');
    const scheduleIDComeback = localStorage.getItem('scheduleIDComeback');
    const tripType = localStorage.getItem('tripType');

    useEffect(() => {
        if (tripType === "roundTrip") {
            if (currentStatus === "depart") {
                axios.get(`http://localhost:8080/api/v1/auth/tickets/searchSeatID/${scheduleIDOneWay}`)
                    .then(response => {
                        setBookedSeats(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            } else if (currentStatus === "arrive") {
                axios.get(`http://localhost:8080/api/v1/auth/tickets/searchSeatID/${scheduleIDComeback}`)
                    .then(response => {
                        setBookedSeats(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
        else {
            axios.get(`http://localhost:8080/api/v1/auth/tickets/searchSeatID/${scheduleIDOneWay}`)
            .then(response => {
                setBookedSeats(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [currentStatus]);
    
    const isSeatBooked = (seatId) => {
        return bookedSeats.includes(seatId);
    };
    
    const handleSeatClick = (seat) => {
        if (tripType === "roundTrip") {
            console.log('active', activeButton);
            console.log('seat', isSeatBooked(seat.id));
            if (activeButton === "Depart" && isSeatBooked(seat.id) != true) {
                setSeatId(seat.id);
                setActiveSeatId(seat.id);
            }
            else if (activeButton === "Arrive" && isSeatBooked(seat.id) != true){
                console.log('hello: ',seat.id);
                setSeatIdComeback(seat.id);
                setActiveSeatId(seat.id);
            }
        }
        else if (tripType === "oneWay") {
            if (isSeatBooked(seat.id) != true) {
                setSeatId(seat.id);
                setActiveSeatId(seat.id);
            }
        }

    }

    const handleButtonClick = (buttonType) => {
        setCurrentStatus(buttonType.toLowerCase());
        setActiveButton(buttonType);
    };


    return (
        <Paper className="seat-paper">
            {
                tripType === "roundTrip" && (
                    <div className="button_change">
                        <button
                            className={`custom-button-search depart-button ${activeButton === 'Depart' ? 'active-button' : ''}`}
                            onClick={() => 
                                handleButtonClick('Depart')
                            }
                        >
                            Depart
                        </button>

                        <button
                            className={`custom-button-search arrive-button ${activeButton === 'Arrive' ? 'active-button' : ''}`}
                            onClick={() => 
                                handleButtonClick('Arrive')
                            }
                        >
                            Arrive
                        </button>
                    </div>
                )
            }
            <div className="plane-wrapper">
                <div className="plane-body">
                    <div className="seat-body">
                    <Grid container spacing={2} className='seat-grid'>
                        {
                            seat.map((seat, index) => (
                                <Grid item md={0.6} key={index}>
                                    <div 
                                        className={`seat-item ${isSeatBooked(seat.id) == true ? 'booked' : (seat.id === activeSeatId ? 'seat-item active' : 'seat-item')}`}
                                        onClick={() => {
                                            handleSeatClick(seat);
                                            
                                        }}
                                        >
                                        {seat.id}
                                    </div>
                                </Grid>

                            ))
                        }
                    </Grid>
                    </div>
                </div>
                <div className="plane-head">
                    <img src="/Images/planeeeee.png" />
                </div>
            </div>
        </Paper>
    )
}