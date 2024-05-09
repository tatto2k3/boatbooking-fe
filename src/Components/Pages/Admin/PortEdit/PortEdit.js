import React, { useEffect, useState } from "react";
import './PortEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaSanBay = () => {
    const location = useLocation();
    const [selectedSanbayInfo, setSelectedSanbayInfo] = useState(location.state?.selectedSanbayInfo || []);

    useEffect(() => {
        console.log("Selected Sanbay info in SuaKhachHang useEffect:", selectedSanbayInfo);
    }, [selectedSanbayInfo]);

    const [SanbayInfo, setSanbayInfo] = useState({
        id: '',
        port_name: '',
        port_place: '',
    });

    useEffect(() => {
        if (selectedSanbayInfo != null) {
            setSanbayInfo({
                id: selectedSanbayInfo.id || '',
                port_name: selectedSanbayInfo.port_name || '',
                port_place: selectedSanbayInfo.port_place || '',
            });
        }
    }, [selectedSanbayInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setSanbayInfo({
            ...SanbayInfo,
            [id]: value,
        });
    };
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!SanbayInfo || !SanbayInfo.id) {
                alert("Sân bay không được tìm thấy");
                return;
            }

            const updatedData = {
                id: SanbayInfo.id,
                port_name: SanbayInfo.port_name,
                port_place: SanbayInfo.port_place,
            };


            if (!updatedData.id) {
                alert("AirportId là bắt buộc");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/auth/ports/${updatedData.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(JSON.stringify(errorMessage));
            }

            alert("Sân bay đã được cập nhật");

        } catch (err) {
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
                <h2>Sửa thông tin cảng tàu khách</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="id" className="form-label">Mã cảng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Mã cảng"
                                value={SanbayInfo.id}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="port_name" className="form-label">Tên cảng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="port_name"
                                placeholder="Tên cảng"
                                value={SanbayInfo.port_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="port_place" className="form-label">Địa điểm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="port_place"
                                placeholder="Địa điểm"
                                value={SanbayInfo.port_place}
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
                <a href="./port" className="text-decoration-underline-mk">Quay lại trang dành cho cảng tàu khách</a>
            </div>
        </div>
    );
}
export default SuaSanBay;