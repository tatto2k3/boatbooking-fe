import React, { useEffect, useState } from 'react';
import "./SearchPage.css";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import RangeSlider from './NewFolder/RangeSlider';
import AirplanemodeInactiveOutlinedIcon from '@mui/icons-material/AirplanemodeInactiveOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TicketResult from './TicketResult/TicketResult';
import { useSearch } from '../../CustomHooks/SearchContext';
import Loading from '../../LoadingAnimation/Loading';
import axios from "axios";
import Button from '@mui/material/Button';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import { useNavigate } from 'react-router-dom';
export default function SearchPage() {
    const [value, setValue] = React.useState([1, 300]);
    const [minPrice, setMinPrice] = useState(value[0]);
    const [maxPrice, setMaxPrice] = useState(value[1]);
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();
    const [activeTimeLine, setActiveTimeLine] = useState(null);
    const [activeButton, setActiveButton] = useState('Depart');
    const [selectedItem, setSelectedItem] = useState(0);
    const [scheduleDTime, setScheduleDTime] = useState('');
    const [scheduleATime, setScheduleATime] = useState('');
    const [scheduleBName, setScheduleBName] = useState('');



    const handleItemClick = async (index) => {
        let selectedName = "";
        if (selectedItem === index) {
            setSelectedItem(0); 
            setScheduleBName('');
        } else {
            setSelectedItem(index); 
            if (index === 1) selectedName = "Superdong 1";
            else if (index === 2) selectedName = "Superdong 2";
            else if (index === 3) selectedName = "Phu Quy Express";
            else if (index === 4) selectedName = "Chan Kha Express";
            else selectedName = "Trung Trac Express";
            setScheduleBName(selectedName);
        }
    
        await new Promise(resolve => setTimeout(resolve, 0));

        axios.get(`http://localhost:8080/api/v1/auth/schedule/search-time?fromLocation=${searchInfo.FromLocation}&toLocation=${searchInfo.ToLocation}&departureTime=${scheduleDTime}&arrivalTime=${scheduleATime}&departureDay=${searchInfo.DepartTime}&boatName=${selectedName}`)
        .then(res => {
            setSearchResult(res.data)
            setIsLoading(false);
        })
        .catch(error => console.log(error));
        console.log(index);
        console.log(selectedName);
    
    };
    
    console.log(departFlight)
    const handleTimeLineClick = (label, depatureTime, arrivalTime) => {
        console.log(depatureTime);
        setActiveTimeLine(label);
        setScheduleATime(arrivalTime);
        setScheduleDTime(depatureTime);
        queryAPI(depatureTime, arrivalTime);
    };
    const navigate = useNavigate();
    const handleTicketClick = (flight) => {
        if (tripType === "roundTrip") {
            if (activeButton === "Depart") {
                console.log(flight)
                setDepartFlight(flight);
                localStorage.setItem('scheduleIDOneWay', flight.id);
                localStorage.setItem('boat_nameOneWay', flight.boat_name);
                localStorage.setItem('port_nameOneWay', flight.port_name);
                localStorage.setItem('fromLocationOneWay', flight.fromLocation);
                localStorage.setItem('toLocationOneWay', flight.toLocation);
                localStorage.setItem('departureDayOneWay', flight.departureDay);
                localStorage.setItem('departureTimeOneWay', flight.departureTime);
                localStorage.setItem('arrivalTimeOneWay', flight.arrivalTime);
                localStorage.setItem('priceOneWay', flight.price);
                setActiveButton("Arrive");
                setIsLoading(true);
                axios.get(`http://localhost:8080/api/v1/auth/schedule/search?fromLocation=${searchInfo.ToLocation}&toLocation=${searchInfo.FromLocation}&departureDay=${searchInfo.ComeBackTime}`)
                                    .then(res => {
                                        setSearchResult(res.data)
                                        setIsLoading(false);
                                        console.log(searchResult);
                                    })
                                    
                                    .catch(error => console.log(error));
            }
            else {
                setArriveFlight(flight)
                console.log(flight);
                localStorage.setItem('scheduleIDComeback', flight.id);
                localStorage.setItem('boat_nameComeback', flight.boat_name);
                localStorage.setItem('port_nameComeback', flight.port_name);
                localStorage.setItem('fromLocationComeback', flight.fromLocation);
                localStorage.setItem('toLocationComeback', flight.toLocation);
                localStorage.setItem('departureDayComeback', flight.departureDay);
                localStorage.setItem('departureTimeComeback', flight.departureTime);
                localStorage.setItem('arrivalTimeComeback', flight.arrivalTime);
                localStorage.setItem('priceComeback', flight.price);
                navigate("/ticket");
            }
        }
        else if (tripType === "oneWay") {
            localStorage.setItem('scheduleIDOneWay', flight.id);
            localStorage.setItem('boat_nameOneWay', flight.boat_name);
            localStorage.setItem('port_nameOneWay', flight.port_name);
            localStorage.setItem('fromLocationOneWay', flight.fromLocation);
            localStorage.setItem('toLocationOneWay', flight.toLocation);
            localStorage.setItem('departureDayOneWay', flight.departureDay);
            localStorage.setItem('departureTimeOneWay', flight.departureTime);
            localStorage.setItem('arrivalTimeOneWay', flight.arrivalTime);
            localStorage.setItem('priceOneWay', flight.price);
            console.log(flight)
            setDepartFlight(flight);
            navigate("/ticket");
        }
    };

    function convertUSDToVND(usdAmount, exchangeRate = 23000) {
        const vndAmount = usdAmount * exchangeRate;
        return vndAmount;
    }
    function HandleReset() {
        setIsLoading(true);
        setActiveTimeLine(null);
        axios.get(`http://localhost:8080/api/v1/auth/schedule/search?fromLocation=${searchInfo.FromLocation}&toLocation=${searchInfo.ToLocation}
                                &departureDay=${searchInfo.DepartTime}`)
            .then(res => {
                setSearchResult(res.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }
    console.log(searchResult)
    function queryAPI(depatureTime, arrivalTime) {
        console.log(scheduleBName);
        if (searchInfo.FromLocation != null && searchInfo.ToLocation != null && searchInfo.DepartTime != null && searchInfo.ComeBackTime != null) {
            if (activeButton === "Depart") {
                setIsLoading(true);
                axios.get(`http://localhost:8080/api/v1/auth/schedule/search-time?fromLocation=${searchInfo.FromLocation}&toLocation=${searchInfo.ToLocation}&departureTime=${depatureTime}&arrivalTime=${arrivalTime}
                                &departureDay=${searchInfo.DepartTime}&boatName=${scheduleBName}`)
                    .then(res => {
                        setSearchResult(res.data)
                        setIsLoading(false);

                    })
                    .catch(error => console.log(error));
            }
            else {
                setIsLoading(true);
                axios.get(`http://localhost:8080/api/v1/auth/schedule/search?fromLocation=${searchInfo.ToLocation}&toLocation=${searchInfo.FromLocation}&departureTime=${depatureTime}&arrivalTime=${arrivalTime}
                                    &departureDay=${searchInfo.ComeBackTime}`)
                    .then(res => {
                        setSearchResult(res.data)
                        setIsLoading(false);
                    })
                    .catch(error => console.log(error));
            }
        }
    }
    return (<Grid container spacing={2}>
        <Grid item md={4}>
            < Paper className="custom-paper">
                <div className="filter_header">
                    <h5 className="filter_header_left" >
                        Bộ lọc
                    </h5>
                    <h6 className="filter_header_right" onClick={() => HandleReset()}>
                        Tải lại
                    </h6>
                </div>
                <div className="filter-main">
                    <div className="filter-main-header">
                        Giờ khởi hành
                    </div>
                    <div className="filter-wrapper">
                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Morning' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Morning', '00:00', '11:59')}>
                                    <div className="filter-icon">
                                        <LightModeOutlinedIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi sáng
                                    </div>
                                    <span className="filter-time-detail">
                                        00:00 - 11:59
                                    </span>
                                </div>

                            </Grid>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Night' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Night', '18:00', '23:59')}>
                                    <div className="filter-icon">
                                        <DarkModeIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi tối
                                    </div>
                                    <span className="filter-time-detail">
                                        18:00 - 23:59
                                    </span>
                                </div>

                            </Grid>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Afternoon' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Afternoon', '15:00', '17:59')}>
                                    <div className="filter-icon">
                                        <WbTwilightOutlinedIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi chiều
                                    </div>
                                    <span className="filter-time-detail">
                                        15:00 - 17:59
                                    </span>
                                </div>

                            </Grid>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Noon' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Noon', '12:00', '14:59')}>
                                    <div className="filter-icon">
                                        <LightModeOutlinedIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi trưa
                                    </div>
                                    <span className="filter-time-detail">
                                        12:00 - 14:59
                                    </span>
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                    {/*Price*/}
                    <div className="Price">
                        <div className="filter-main-header m-top-10">
                            Tàu
                        </div>
                        
                        <div className="Price-Wrapper">
                            <Grid container spacing={2}>
                                <Grid key={1} item sm={6}>
                                    <div
                                        className={`max-price ${selectedItem === 1 ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(1)}
                                    >
                                        <p>Superdong 1</p>
                                    </div>
                                </Grid>
                                <Grid key={2} item sm={6}>
                                    <div
                                        className={`max-price ${selectedItem === 2 ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(2)}
                                    >
                                        <p>Superdong 2</p>
                                    </div>
                                </Grid>
                                <Grid key={3} item sm={6}>
                                    <div
                                        className={`max-price ${selectedItem === 3 ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(3)}
                                    >
                                        <p>Phú Quý Express</p>
                                    </div>
                                </Grid>
                                <Grid key={4} item sm={6}>
                                    <div
                                        className={`max-price ${selectedItem === 4 ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(4)}
                                    >
                                        <p>Chấn Kha Express</p>
                                    </div>
                                </Grid>
                                <Grid key={5} item sm={6}>
                                    <div
                                        className={`max-price ${selectedItem === 5 ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(5)}
                                    >
                                        <p>Trưng Trắc Express</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </ Paper>
        </Grid>
        <Grid item md={8}>
            <div className="sort_header">
                {searchResult.flight && searchResult.flight.length > 0 && searchResult.flight[0] && (
                    <div className="search-result-header">
                        <h6>
                            Chúng tôi có {searchResult.total_flight} vé từ {searchResult.flight[0].fromLocation} đến {searchResult.flight[0].toLocation}
                        </h6>
                        {
                            tripType === "roundTrip" && (
                                <div>
                                    <Button variant={activeButton === 'Depart' ? 'contained' : 'outlined'} size="large" startIcon=
                                        {<FlightTakeoffOutlinedIcon />} color="success" className="custom-button-search" >
                                        Điểm đi
                                    </Button>
                                    <Button variant={activeButton === 'Arrive' ? 'contained' : 'outlined'} size="large"
                                        startIcon={<FlightLandOutlinedIcon />} className="custom-button-search" >
                                        Điểm đến
                                    </Button>
                                </div>
                            )
                        }

                    </div>

                )}
            </div>
            <div className="ticker-result-wrapper">
                {
                    !isLoading ? (
                        searchResult.flight && searchResult.flight.length > 0 ? (
                            <div>
                                {searchResult.flight.map((fl, index) => {
                                    const originalPrice = parseFloat(fl.price);
                                    console.log(originalPrice)

                                    if (!isNaN(originalPrice) && originalPrice >= convertUSDToVND(minPrice) && originalPrice <= convertUSDToVND(maxPrice)) {
                                        return (
                                            <TicketResult key={index} index={index} flight={fl} handleClick={() => handleTicketClick(fl)} />
                                        );
                                    } else {

                                        return (<div></div>);
                                    }
                                })}
                            </div>
                        ) : (
                            <div className="flights-not-found">
                                <p className="flights-not-found-text">Không tìm thấy chuyến bay phù hợp</p>
                                <AirplanemodeInactiveOutlinedIcon className="air-plane-miss-icon" />
                            </div>
                        )
                    ) : (
                        <div className="loading-icons">
                            <Loading />
                        </div>
                    )
                }
            </div>
        </Grid>
    </Grid>
    )
}