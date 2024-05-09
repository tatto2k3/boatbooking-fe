import React, { useState } from "react";
import './BoatAdd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemMayBay = () => {
    const [id, setId] = useState("");
    const [boatName, setBoatName] = useState("");
    const [num_seat, setNumSeat] = useState("");
    const [num_bed, setNumBed] = useState("");

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid plane data");
            return;
        }

        const planeData = {
            id: id,
            name: boatName ,
            num_seat: num_seat,
            num_bed: num_bed,  
        };
        console.log(planeData);
        try {
        const planeResponse = await fetch("http://localhost:8080/api/v1/admin/boats", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(planeData),
        });
            console.log(planeResponse);
            if (!planeResponse.ok) {
                const planeError = await planeResponse.json();
                console.error("Boat error:", planeError);
                console.log(planeResponse);
                alert("Failed to add boat");
                return;
            }
            
            alert("Boat added successfully");
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
                <h2>Thêm tàu khách</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="maMayBay" className="form-label">Mã tàu khách</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Mã tàu khách"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="typeofplane" className="form-label">Tên tàu khách</label>
                            <input
                                type="text"
                                className="form-control"
                                id="boatName"
                                placeholder="Tên tàu khách"
                                value={boatName}
                                onChange={(e) => setBoatName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="businessCapacity" className="form-label">Số lượng ghế ngồi</label>
                            <input
                                type="number"
                                className="form-control"
                                id="num_seat"
                                placeholder="Số lượng ghế ngồi"
                                value={num_seat}
                                onChange={(e) => setNumSeat(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="economyCapacity" className="form-label">Số lượng giường nằm</label>
                            <input
                                type="number"
                                className="form-control"
                                id="num_bed"
                                placeholder="Số lượng giường nằm"
                                value={num_bed}
                                onChange={(e) => setNumBed(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="/admin/boat" className="text-decoration-underline-mk">Quay lại trang dành cho tàu khách</a>
            </div>
        </div>
    );
}

export default ThemMayBay;
