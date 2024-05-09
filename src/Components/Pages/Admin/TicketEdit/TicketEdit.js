import React, { useState, useEffect } from "react";
import './TicketEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaVe = () => {
    const location = useLocation();
    const [selectedTicketInfo, setSelectedTicketInfo] = useState(location.state?.selectedTicketInfo || []);

    useEffect(() => {
        console.log("Selected Ticket info in SuaKhachHang useEffect:", selectedTicketInfo);
        // Các thao tác khác với selectedTicketInfo
    }, [selectedTicketInfo]);

    const [ticketInfo, setTicketInfo] = useState({
        tId: '',
        cccd: '',
        name: '',
        flyId: '',
        kgId: '',
        seatId: '',
        foodId: '',
        ticketPrice: '',
        mail: '',
        disId: ''
    });

    useEffect(() => {
        if (selectedTicketInfo != null) {
            setTicketInfo({
                id: selectedTicketInfo.id || '',
                seatId: selectedTicketInfo.seatId || '',
                sid: selectedTicketInfo.sid || '',
                cid: selectedTicketInfo.cid || '',
            });
        }
    }, [selectedTicketInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setTicketInfo({
            ...ticketInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!ticketInfo || !ticketInfo.tId) {
                alert("Vé không được tìm thấy");
                return;
            }

            const updatedData = {
                tId: ticketInfo.tId,
                cccd: ticketInfo.cccd,
                name: ticketInfo.name,
                flyId: ticketInfo.flyId,
                kgId: ticketInfo.kgId,
                foodId: ticketInfo.foodId,
                seatId: ticketInfo.seatId,
                mail: ticketInfo.mail,
                ticketPrice: ticketInfo.ticketPrice,
                disId: ticketInfo.disId
            };


            if (!updatedData.tId) {
                alert("TId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('api/ticket/UpdateTicket', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                // Xử lý lỗi
                const errorMessage = await response.text();
                throw new Error(JSON.stringify(errorMessage));
            }

            alert("Vé đã được cập nhật");

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
                <h2>Sửa thông tin vé</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="foodId" className="form-label">Mã vé</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Mã vé"
                                value={ticketInfo.id}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="ticketPrice" className="form-label">Mã khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cid"
                                placeholder="Mã khách hàng"
                                value={ticketInfo.cid}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="sid" className="form-label">Mã chuyến đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sid"
                                placeholder="Mã chuyến đi"
                                value={ticketInfo.sid}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="seatId" className="form-label">Mã ghế ngồi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="seatId"
                                placeholder="Mã khuyến mãi"
                                value={ticketInfo.seatId}
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
                <a href="./ticket" className="text-decoration-underline-mk">Quay lại trang dành cho vé</a>
            </div>
        </div>
    );
}

export default SuaVe;
