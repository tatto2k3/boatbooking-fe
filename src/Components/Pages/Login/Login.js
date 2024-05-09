import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import  { useAuth } from '../../Layouts/Header/AuthService';

const Login = () => {
    const [account, setAccount] = useState({ email: '', password: '' });
    const { login, setAvatar } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(account);
    
        const response = await fetch('http://localhost:8080/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            console.log('Response Data:', responseData);
    
            // Lưu trữ thông tin người dùng vào localStorage
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('email', account.email);
            
            // Set avatar in the context
            setAvatar(responseData.avatar);
            console.log("Email login:", localStorage.getItem('email'));
            
            console.log('Login success!');
            navigate("/admin/boat");
        } else {
            console.error('Login failed!');
            alert("Login failed");
        }
    };
    

    return (
        <div className="container">
            <div className="text-insertLogin">
                <h1>Đăng nhập tài khoản</h1>
            </div>
                <div className="inforLogin">
                    <form className="form-signin" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="col-form-label">Email</label>
                            <input
                                type="email"
                                className="form-controlLogin"
                                id="inputEmail"
                                name="email"
                                placeholder=""
                                required
                                value={account.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="col-form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-controlLogin"
                                id="inputPassword"
                                name="password"
                                placeholder=""
                                required
                                value={account.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-block" id="btnLogin">Đăng nhập</button>
                        </div>
                        <div className="mb-3 d-flex justify-content-between bottom-text">
                            <a href="#">Quên mật khẩu ?</a>
                            <a href="/sign-up">Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>

    );
};

export default Login;
