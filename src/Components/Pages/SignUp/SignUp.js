import React, {useState } from 'react';
import "./SignUp.css";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        if (!isValidData()) {
            alert("Invalid email data");
            return;
        }
    
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }
    
        try {
            const accountData = {
                email: email,
                password: password,
                full_name: name,
            };
    
            const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountData),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Response Data:', responseData);
                window.location.href = '/sign-in';
            } else {
                const errorData = await response.json(); // Đọc dữ liệu lỗi từ response
                console.error('Registration failed:', errorData.message); // Log thông tin lỗi
                alert('Registration failed: ' + errorData.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration');
        }
    };
    

    const isValidData = () => {
        return (
            email.trim() !== ""
        );
    };
    return (
        <div className="container">
            <div className="text-insertSignUp">
                <h1>Tạo tài khoản mới</h1>
            </div>
                <div className="inforSignUp">
                    <form className="form-signin1" >
                        <div className="mb-6">
                            <label htmlFor="inputEmail" className="col-form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inputEmail" className="col-form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inputPassword" className="col-form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inputPassword" className="col-form-label">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder=""
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <button type="submit" className="btn btn-primary btn-block" id="btnLogin1" onClick={handleSave}>Tạo tài khoản</button>
                        </div>
                        
                        <div className="mb-3 d-flex justify-content-between">
                            <a href="/sign-in">Đã có tài khoản ?</a>
                        </div>
                    </form>
                </div>
            </div>
    );
}
