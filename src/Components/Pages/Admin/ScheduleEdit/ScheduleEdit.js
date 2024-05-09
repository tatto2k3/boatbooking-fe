import React, { useState, useEffect } from "react";
import './ScheduleEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaChuyenBay = () => {
    const location = useLocation();
    const [selectedChuyenbayInfo, setSelectedChuyenbayInfo] = useState(location.state?.selectedChuyenbayInfo || []);
    const [boatList, setBoatList] = useState([]);
    const [selectedBoat, setSelectedBoat] = useState('');
    const [portList, setPortList] = useState([]);
    const [selectedPortFromLocation, setSelectedPortFromLocation] = useState('');
    const [selectedPortToLocation, setSelectedPortToLocation] = useState('');

    useEffect(() => {
        console.log("Selected chuyenbay info in SuaKhachHang useEffect:", selectedChuyenbayInfo);
        // Các thao tác khác với selectedchuyenbayInfo
    }, [selectedChuyenbayInfo]);

    const [chuyenbayInfo, setChuyenbayInfo] = useState({
        id: '',
        boat_name: '',
        fromLocation: '',
        toLocation: '',
        departureTime: '',
        arrivalTime: '',
        departureDay: '',
        price : 0
    });

    useEffect(() => {
        if (selectedChuyenbayInfo != null) {
            setChuyenbayInfo({
                id: selectedChuyenbayInfo.id || '',
                boat_name: selectedChuyenbayInfo.boat_name || '',
                fromLocation: selectedChuyenbayInfo.fromLocation || '',
                toLocation: selectedChuyenbayInfo.toLocation || '',
                departureTime: selectedChuyenbayInfo.departureTime || '',
                arrivalTime: selectedChuyenbayInfo.arrivalTime || '',
                departureDay: selectedChuyenbayInfo.departureDay || '',
                price: selectedChuyenbayInfo.price || 0
            });
        }
    }, [selectedChuyenbayInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setChuyenbayInfo({
            ...chuyenbayInfo,
            [id]: value,
        });
    };

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    useEffect(() => {
        fetchBoatList();
        fetchPortList();
    },[])

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


    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!chuyenbayInfo || !chuyenbayInfo.id) {
                alert("Khách hàng không được tìm thấy");
                return;
            }

            const updatedData = {
                id: chuyenbayInfo.id,
                boat_name: chuyenbayInfo.boat_name,
                fromLocation: chuyenbayInfo.fromLocation,
                toLocation: chuyenbayInfo.toLocation,
                departureTime: chuyenbayInfo.departureTime,
                arrivalTime: chuyenbayInfo.arrivalTime,
                departureDay: chuyenbayInfo.departureDay,
                price: chuyenbayInfo.price,
            };


            if (!updatedData.id) {
                alert("CId là bắt buộc");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/auth/schedule/${updatedData.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                // Xử lý lỗi
                const errorMessage = await response.text();
                throw new Error(JSON.stringify(errorMessage));
            }

            alert("Lịch hoạt động đã được cập nhật");

        } catch (err) {
            // Xử lý lỗi
            alert(err.message);
        }
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
                <h2>Sửa thông tin lịch hoạt động</h2>
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
                                value={chuyenbayInfo.id}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="maMayBay" className="form-label">Tên tàu</label>
                            <select 
                                className="form-control"
                                id="boat_name"   
                                onChange={handleChange}
                            >
                                <option value="">{chuyenbayInfo.boat_name}</option>
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
                                onChange={handleChange}
                            >
                                <option value="">{chuyenbayInfo.fromLocation}</option>
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
                                onChange={handleChange}
                            >
                                <option value="">{chuyenbayInfo.toLocation}</option>
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
                                value={chuyenbayInfo.departureTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="arrivalTime" className="form-label">Giờ đến</label>
                            <input
                                type="text"
                                className="form-control"
                                id="arrivalTime"
                                placeholder="Giờ đến"
                                value={chuyenbayInfo.arrivalTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="departureDay" className="form-label">Ngày đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="departureDay"
                                placeholder="Ngày đi"
                                value={chuyenbayInfo.departureDay}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="originalPrice" className="form-label">Giá vé</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Giá vé"
                                value={chuyenbayInfo.price}
                                onChange={handleChange}
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

export default SuaChuyenBay;
