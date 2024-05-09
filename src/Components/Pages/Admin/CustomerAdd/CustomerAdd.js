import React, { useState } from "react";
import './CustomerAdd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemKhachHang = () => {
    const [id, setMaKhachHang] = useState("");
    const [numId, setCCCD] = useState("");
    const [fullname, setTenKhachHang] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid customer data");
            return;
        }

        

        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };

        const customerData = {
            id: id,
            name: fullname,
            num_id: numId,
            address: address,  
            email: email,
            birth: birth,
        };
        try {
        const customerResponse = await fetch("http://localhost:8080/api/v1/admin/customers", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(customerData),
        });
        console.log("Cus:", customerResponse);
            if (!customerResponse.ok) {
                const customerError = await customerResponse.json();
                console.error("Customer error:", customerError);
                alert("Failed to add customer");
                return;
            }
            else {setShowSuccessMessage(true);
                setMaKhachHang("");
                setCCCD("");
                setTenKhachHang("");
                setAddress("");
                setBirth("");
                setEmail("");
                setTimeout(() => setShowSuccessMessage(false), 3000);
            }
            
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
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Thêm khách hàng thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm khách hàng</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="maKhachHang" className="form-label">Mã khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="maKhachHang"
                                placeholder="Mã khách hàng"
                                value={id}
                                onChange={(e) => setMaKhachHang(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="tenKhachHang" className="form-label">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullname"
                                placeholder="Tên khách hàng"
                                value={fullname}
                                onChange={(e) => setTenKhachHang(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="CCCD" className="form-label">CCCD</label>
                            <input
                                type="text"
                                className="form-control"
                                id="CCCD"
                                placeholder="CCCD"
                                value={numId}
                                onChange={(e) => setCCCD(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-4">
                            <label htmlFor="email" className="form-label">Ngày sinh</label>
                            <input
                                type="text"
                                className="form-control"
                                id="birth"
                                placeholder="Ngày sinh"
                                value={birth}
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            {/* <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Địa chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            /> */}

                            <select className="form-select" value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./KhachHang" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default ThemKhachHang;
