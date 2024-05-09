import React, { useState, useEffect } from "react";
import './SuaMaGiamGia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const SuaMaGiamGia = () => {
    const location = useLocation();
    const [selectedDiscountInfo, setSelectedDiscountInfo] = useState(location.state?.selectedDiscountInfo || []);

    useEffect(() => {
        console.log("Selected discount info in SuaKhachHang useEffect:", selectedDiscountInfo);
        // Các thao tác khác với selecteddiscountInfo
    }, [selectedDiscountInfo]);

    const [discountInfo, setDiscountInfo] = useState({
        dId: '',
        dName: '',
        dStart: '',
        dFinish: '',
        dPercent: 0
    });

    useEffect(() => {
        if (selectedDiscountInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật discountInfo
            setDiscountInfo({
                dId: selectedDiscountInfo[0]?.dId || '',
                dName: selectedDiscountInfo[0]?.dName || '',
                dStart: selectedDiscountInfo[0]?.dStart || '',
                dFinish: selectedDiscountInfo[0]?.dFinish || '',
                dPercent: selectedDiscountInfo[0]?.dPercent || 0
            });
        }
    }, [selectedDiscountInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setDiscountInfo({
            ...discountInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!discountInfo || !discountInfo.dId) {
                alert("Khuyến mãi không được tìm thấy");
                return;
            }

            const updatedData = {
                dId: discountInfo.dId,
                dName: discountInfo.dName,
                dStart: discountInfo.dStart,
                dFinish: discountInfo.dFinish,
                dPercent: discountInfo.dPercent
            };

          
            if (!updatedData.dId) {
                alert("DId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('api/discount/UpdateDiscount', {
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

            alert("Khuyến mãi đã được cập nhật");

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
                <h2>Sửa thông tin khuyến mãi</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="dId" className="form-label">Mã khuyến mãi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dId"
                                placeholder="Mã khuyến mãi"
                                value={discountInfo.dId}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="dName" className="form-label">Tên khuyến mãi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dName"
                                placeholder="Tên khuyến mãi"
                                value={discountInfo.dName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="dStart" className="form-label">Ngày bắt đầu</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dStart"
                                placeholder="Ngày bắt đầu"
                                value={discountInfo.dStart}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="dFinish" className="form-label">Ngày kết thúc</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dFinish"
                                placeholder="Ngày kết thúc"
                                value={discountInfo.dFinish}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="dPercent" className="form-label">Phần trăm</label>
                            <input
                                type="number"
                                className="form-control"
                                id="dPercent"
                                placeholder="Phần trăm"
                                value={discountInfo.dPercent}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave} >Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./MaGiamGia" className="text-decoration-underline-mk">Quay lại trang dành cho khuyến mãi</a>
            </div>
        </div>
    );
}

export default SuaMaGiamGia;
