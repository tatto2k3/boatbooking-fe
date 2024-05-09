import React, { useEffect, useState } from "react";
import './ScheduleAdd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemChuyenBay = () => {
    const [id, setId] = useState("");
    const [boat_name, setBoatName] = useState("");
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureDay, setDepartureDay] = useState("");
    const [price, setOriginalPrice] = useState("");
    const [boatList, setBoatList] = useState([]);
    const [selectedBoat, setSelectedBoat] = useState('');
    const [portList, setPortList] = useState([]);
    const [selectedPortFromLocation, setSelectedPortFromLocation] = useState('');
    const [selectedPortToLocation, setSelectedPortToLocation] = useState('');

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    useEffect(() => {
        fetchBoatList();
        fetchPortList();
    },[])
    
    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid customer data");
            return;
        }

        const flightData = {
            id: id,
            boat_name: boat_name,
            fromLocation: fromLocation ,
            toLocation: toLocation,  
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureDay: departureDay,
            price: price,
        };
        try {
        const flightResponse = await fetch("http://localhost:8080/api/v1/auth/schedule", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(flightData),
        });
            if (!flightResponse.ok) {
                const flightError = await flightResponse.json();
                console.error("Flight error:", flightError);
                alert("Failed to add flight");
                return;
            }

            alert("flight added successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const fetchBoatList = async() => {
        fetch('http://localhost:8080/api/v1/admin/boats', {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch boat list');
                }
                return response.json();
            })
            .then(data => {
                setBoatList(data);
            })
            .catch(error => {
                console.error('Error fetching boat list:', error);
            });
    }
    const fetchPortList = async() => {
        fetch('http://localhost:8080/api/v1/auth/ports', {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch port list');
                }
                return response.json();
            })
            .then(data => {
                setPortList(data);
            })
            .catch(error => {
                console.error('Error fetching port list:', error);
            });
    }

    const handlSelectBoat = (e) => {
        setSelectedBoat(e.target.value);
        setBoatName(e.target.value);
    }
    const handleFromLocation = (e) => {
        setSelectedPortFromLocation(e.target.value);
        setFromLocation(e.target.value);
    }

    const handleToLocation = (e) => {
        setSelectedPortToLocation(e.target.value);
        setToLocation(e.target.value);
    }

    const isValidData = () => {
        return (
            id.trim() !== ""
        );
    };

    return (
        <div className="container-fluid">
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm chuyến tàu</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="maChuyenBay" className="form-label">Mã chuyến tàu</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Mã chuyến tàu"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="maMayBay" className="form-label">Tên tàu</label>
                            <select 
                                className="form-control"
                                id="boat_name"   
                                onChange={handlSelectBoat}
                            >
                                <option value="">Chọn tàu</option>
                                {boatList.map((boat) => (
                                    <option key={boat.id} value={boat.name}>{boat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-4">
                            <label htmlFor="fromLocation" className="form-label">Điểm đi</label>
                            <select 
                                className="form-control"
                                id="fromLocation"   
                                onChange={handleFromLocation}
                            >
                                <option value="">Chọn điểm đi</option>
                                {portList.map((port) => (
                                    <option key={port.id} value={port.port_place}>{port.port_place}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="toLocation" className="form-label">Điểm đến</label>
                            <select 
                                className="form-control"
                                id="toLocation"   
                                onChange={handleToLocation}
                            >
                                <option value="">Chọn điểm đến</option>
                                {portList.map((port) => (
                                    <option key={port.id} value={port.port_place}>{port.port_place}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-4">
                            <label htmlFor="departureTime" className="form-label">Giờ đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="departureTime"
                                placeholder="Giờ đi"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="arrivalTime" className="form-label">Giờ đến</label>
                            <input
                                type="text"
                                className="form-control"
                                id="arrivalTime"
                                placeholder="Giờ đến"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="departureDay" className="form-label">Ngày đi</label>
                            <input
                                type="date"
                                className="form-control"
                                id="departureDay"
                                placeholder="Ngày đi"
                                value={departureDay}
                                onChange={(e) => setDepartureDay(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="originalPrice" className="form-label">Giá vé</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Giá vé"
                                value={price}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./schedule" className="text-decoration-underline-mk">Quay lại trang dành cho lịch hoạt động</a>
            </div>
        </div>
    );
}

export default ThemChuyenBay;
