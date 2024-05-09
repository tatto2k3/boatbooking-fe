import React, { useEffect, useState } from "react";
import "./SearchTicket.css";
import { useNavigate } from 'react-router-dom';

const SearchTicket = () => {
    const navigate = useNavigate();
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [schedule, setSchedule] = useState("");

    const [searchInfo, setSearchInfo] = useState({
        numId: '',
        schedule: '',
        departureDay: ''
    });

    const handleShowInfo = async (event) => {
        event.preventDefault();
        console.log(searchInfo);
        try {
            const response = await fetch(`http://localhost:8080/api/tickets/search?name=${searchInfo.tenKhachHang}`);
            const data = await response.json();
            console.log("Data from API:", data);
            navigate('/ticket-review', { state: { selectedCustomerInfo: data } });
        } catch (error) {
            console.error("Error fetching ticket details:", error);
        }
    };

    const handleSelectSchedule = (e) => {
        setSelectedSchedule(e.target.value);
        setSchedule(e.target.value);
    }

    const provinces = [
        "Phan Thiết - Phú Quý",
        "Phú Quý - Phan Thiết"
    ]


    return (
        <div className="container2">
        <div className="text-insertSearch">
            <h1 >TRA CỨU VÉ TÀU</h1>
        </div>

        <div className="inforSearch">
            <form className="form-signin2" onSubmit={handleShowInfo}>
                <div className="mb-3 row text-xl-center">
                    <label htmlFor="inputTicketCode" className="col-sm-2 col-form-label">CCCD</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-controlSearchTicket"
                            id="inputNumId"
                            value={searchInfo.numId}
                            onChange={(e) => setSearchInfo({ ...searchInfo, numId: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-3 row text-center">
                    <label htmlFor="inputFullname" className="col-sm-2 col-form-label">Chuyến đi</label>
                    <div className="col-sm-10">
                        <select 
                            className="form-control"
                            id="scheduleInput"   
                            onChange={handleSelectSchedule}
                        >
                            <option value="">Chọn chuyến</option>
                            {provinces.map((province, index) => (
                                <option key={index} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-3 row text-xl-center">
                    <label htmlFor="inputDay" className="col-sm-2 col-form-label">Ngày khởi hành</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            className="form-controlSearchTicket"
                            id="inputDay"
                            value={searchInfo.departureDay}
                            onChange={(e) => setSearchInfo({ ...searchInfo, departureDay: e.target.value })}
                        />
                    </div>
                </div>
                <div className="row text-xl-center">
                    <div className="col-sm-10">
                        <button
                            type="submit"
                            className="btn search"
                            id="btnSearch"
                        >
                            Tìm
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    );
};
export default SearchTicket;