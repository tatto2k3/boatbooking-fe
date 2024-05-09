import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './BoatEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const SuaMayBay = () => {
    const location = useLocation();
    const [selectedPlaneInfo, setSelectedPlaneInfo] = useState(location.state?.selectedboatInfo || []);

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    useEffect(() => {
    }, [selectedPlaneInfo]);

    const [planeInfo, setPlaneInfo] = useState({
        id: '',
        name: '',
        num_bed: 0,
        num_seat: 0,
        
    });

    useEffect(() => {
        console.log(selectedPlaneInfo);
        if (selectedPlaneInfo != null) {
            setPlaneInfo({
                id: selectedPlaneInfo.id || '',
                name: selectedPlaneInfo.name || '',
                num_bed: selectedPlaneInfo.num_bed || 0,
                num_seat: selectedPlaneInfo.num_seat || 0,             
            });
        }
    }, [selectedPlaneInfo]);
    

    const handleChange = (e) => {
        const { id, value } = e.target;

        setPlaneInfo({
            ...planeInfo,
            [id]: value,
        });
    };

    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!planeInfo || !planeInfo.id) {
                alert("Tàu khách không được tìm thấy");
                return;
            }

            const updatedData = {
                id: planeInfo.id,
                name: planeInfo.name,
                num_seat: planeInfo.num_seat,
                num_bed: planeInfo.num_bed
                
            };

            if (!updatedData.id) {
                alert("PlId là bắt buộc");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/admin/boats/${updatedData.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(JSON.stringify(errorMessage));
            }

            alert("tàu khách đã được cập nhật");

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
                <h2>Sửa thông tin tàu khách</h2>
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
                                value={planeInfo.id}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="typeofplane" className="form-label">Loại tàu khách</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Loại tàu khách"
                                value={planeInfo.name}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="businessCapacity" className="form-label">Số giường</label>
                            <input
                                type="text"
                                className="form-control"
                                id="num_bed"
                                placeholder="Sức chứa khoang thương gia"
                                value={planeInfo.num_bed}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="economyCapacity" className="form-label">Số ghế</label>
                            <input
                                type="text"
                                className="form-control"
                                id="num_seat"
                                placeholder="Sức chứa khoang thường"
                                value={planeInfo.num_seat}
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
                <a href="/admin/boat" className="text-decoration-underline-mk">Quay lại trang dành cho tàu khách</a>
            </div>
        </div>
    );
}

export default SuaMayBay;
