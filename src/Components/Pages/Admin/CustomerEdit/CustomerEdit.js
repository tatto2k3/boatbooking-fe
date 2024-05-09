import React, { useState, useEffect } from "react";
import './CustomerEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const SuaKhachHang = () => {
    const location = useLocation();
    const [selectedCustomerInfo, setSelectedCustomerInfo] = useState(location.state?.selectedCustomerInfo || []);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState('');

    const provinces = [
        'Hà Nội',
        'Hồ Chí Minh',
        'Đà Nẵng',
        'Hải Phòng',
        'An Giang',
        'Bà Rịa-Vũng Tàu',
        'Bạc Liêu',
        'Bắc Giang',
        'Bắc Kạn',
        'Bắc Ninh',
        'Bến Tre',
        'Bình Định',
        'Bình Dương',
        'Bình Phước',
        'Bình Thuận',
        'Cà Mau',
        'Cao Bằng',
        'Đắk Lắk',
        'Đắk Nông',
        'Điện Biên',
        'Đồng Nai',
        'Đồng Tháp',
        'Gia Lai',
        'Hà Giang',
        'Hà Nam',
        'Hà Tĩnh',
        'Hải Dương',
        'Hậu Giang',
        'Hòa Bình',
        'Hưng Yên',
        'Khánh Hòa',
        'Kiên Giang',
        'Kon Tum',
        'Lai Châu',
        'Lâm Đồng',
        'Lạng Sơn',
        'Lào Cai',
        'Long An',
        'Nam Định',
        'Nghệ An',
        'Ninh Bình',
        'Ninh Thuận',
        'Phú Thọ',
        'Quảng Bình',
        'Quảng Nam',
        'Quảng Ngãi',
        'Quảng Ninh',
        'Quảng Trị',
        'Sóc Trăng',
        'Sơn La',
        'Tây Ninh',
        'Thái Bình',
        'Thái Nguyên',
        'Thanh Hóa',
        'Thừa Thiên-Huế',
        'Tiền Giang',
        'Trà Vinh',
        'Tuyên Quang',
        'Vĩnh Long',
        'Vĩnh Phúc',
        'Yên Bái'
    ];

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    useEffect(() => {
        console.log("Selected customer info in SuaKhachHang useEffect:", selectedCustomerInfo);
        // Các thao tác khác với selectedCustomerInfo
    }, [selectedCustomerInfo]);

    const [customerInfo, setCustomerInfo] = useState({
        id: '',
        name: '',
        CCCD: '',
        address: '',
        birth: '',
        email: ''
    });

    useEffect(() => {
        if (selectedCustomerInfo != null) {
            // Nếu có thông tin khách hàng được chọn, cập nhật customerInfo
            setCustomerInfo({
                id: selectedCustomerInfo.id || '',
                name: selectedCustomerInfo.name || '',
                CCCD: selectedCustomerInfo.num_id || '',
                address: selectedCustomerInfo.address || '',
                birth: selectedCustomerInfo.birth || '',
                email: selectedCustomerInfo.email || '',
            });
        }
    }, [selectedCustomerInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setCustomerInfo({
            ...customerInfo,
            [id]: value,
        });
    };
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {
           
            if (!customerInfo || !customerInfo.id) {
                alert("Khách hàng không được tìm thấy");
                return;
            }

            const updatedData = {
                id: customerInfo.id,
                name: customerInfo.name,
                num_id: customerInfo.CCCD,
                birth: customerInfo.birth,
                email: customerInfo.email,
                address: customerInfo.address
            };

          
            if (!updatedData.id) {
                alert("CId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch(`http://localhost:8080/api/v1/admin/customers/${updatedData.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                // Xử lý lỗi
                const errorMessage = await response.text();
                throw new Error(JSON.stringify(errorMessage));
            }
            console.log(updatedData);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);

        } catch (err) {
            // Xử lý lỗi
            alert(err.message);
        }
    };



    return (
        <div className="container-fluid">
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Sửa khách hàng thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Sửa thông tin khách hàng</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="maKhachHang" className="form-label">Mã khách hàng</label>
                            <input                             
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Mã khách hàng"
                                value={customerInfo.id}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="tenKhachHang" className="form-label">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Tên khách hàng"
                                value={customerInfo.name}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="CCCD" className="form-label">CCCD</label>
                            <input
                                type="number"
                                className="form-control"
                                id="CCCD"
                                placeholder="CCCD"
                                value={customerInfo.CCCD}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-4">
                            <label htmlFor="diemTichLuy" className="form-label">Ngày sinh</label>
                            <input
                                type="text"
                                className="form-control"
                                id="birth"
                                placeholder="Ngày sinh"
                                value={customerInfo.birth}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={customerInfo.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="col-4">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            {/* <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Địa chỉ"
                                value={customerInfo.address}
                                onChange={handleChange}
                            /> */}
                            <select className="form-select" id="address" value={customerInfo.address}
                                onChange={handleChange}
                            >
                            <option value="" disabled>Chọn tỉnh</option>
                            {provinces.map((province, index) => (
                                <option key={index} value={province}>
                                    {province}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave} >Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./customer" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default SuaKhachHang;
