import React, { useEffect, useState } from "react";
import './PortAdd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemSanBay = () => {
    const [id, setId] = useState("");
    const [port_name, setPortName] = useState("");
    const [port_place, setPortPlace] = useState("");

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid sanbay data");
            return;
        }

        const sanbayData = {
            id: id,
            port_name: port_name,
            port_place: port_place,
        };
        try {
            const sanbayResponse = await fetch("http://localhost:8080/api/v1/auth/ports", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(sanbayData),
            });
            if (!sanbayResponse.ok) {
                const sanbayError = await sanbayResponse.json();
                console.error("Sanbay error:", sanbayError);
                alert("Failed to add sanbay");
                return;
            }

            alert("Sanbay added successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                <h2>Thêm cảng tàu khách</h2>
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
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="port_name" className="form-label">Tên cảng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="port_name"
                                placeholder="Tên cảng"
                                value={port_name}
                                onChange={(e) => setPortName(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="port_place" className="form-label">Địa điểm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="port_place"
                                placeholder="Địa điểm"
                                value={port_place}
                                onChange={(e) => setPortPlace(e.target.value)}
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
export default ThemSanBay;