import React from "react";
import './Schedule.css';
import { useState, useEffect } from 'react';
import moment from "moment";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const ChuyenBay = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [chuyenbays, setChuyenbays] = useState([]);
    const [selectedChuyenbays, setSelectedChuyenbays] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chuyenbays.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleClick = () => {
        navigate('/admin/schedule-add');
    };

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/schedule/all" , {
                    method: 'GET',
                    headers: headers
                });
                const data = await response.json();
                setChuyenbays(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleCheckboxChange = (chuyenbayId) => {
        if (selectedChuyenbays.includes(chuyenbayId)) {
            // Nếu đã chọn thì hủy chọn
            setSelectedChuyenbays([]);
        } else {
            // Nếu chưa chọn thì chọn
            setSelectedChuyenbays([chuyenbayId]);
        }
    };



    const handleShowInfo = async () => {
        try {
            if (selectedChuyenbays.length > 0) {
                const response = await fetch(`http://localhost:8080/api/v1/auth/schedule/${selectedChuyenbays.join(',')}`);
                const data = await response.json();

                // Chuyển hướng sang trang sửa khách hàng và truyền thông tin khách hàng
                navigate('/admin/schedule-edit', { state: { selectedChuyenbayInfo: data } });
            } else {
                console.log("No chuyenbays selected.");
            }
        } catch (error) {
            console.error("Error fetching chuyenbay details:", error);
        }
    };

    const handleDelete = async () => {
        if (selectedChuyenbays.length > 0) {
            if (window.confirm("Are you sure to delete this chuyenbay")) {
                try {
                    const response = await axios.delete(`http://localhost:8080/api/v1/auth/schedule/${selectedChuyenbays.join(',')}`, {
                        data: selectedChuyenbays, 
                        headers: headers, 
                    });

                    if (response.status === 200) {
                        const updatedChuyenbays = chuyenbays.filter(chuyenbay => !selectedChuyenbays.includes(chuyenbay.id));
                        setChuyenbays(updatedChuyenbays);
                        setSelectedChuyenbays([]);
                        toast.success('chuyenbays deleted successfully');

                    } else {
                        toast.error('Failed to delete chuyenbays');
                    }
                } catch (error) {
                    toast.error('Error deleting chuyenbays: ' + error.message);
                }
            }
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    const handleSearch = async () => {
        if (searchKeyword != "") {
            try {
                const response = await fetch(`/api/chuyenbay/SearchChuyenbays?searchKeyword=${searchKeyword}`);
                const data = await response.json();
                setChuyenbays(data);
            } catch (error) {
                console.error("Error searching customers:", error);
            }
        }
        else {
            try {
                const response = await fetch("/api/chuyenbay/GetChuyenbays");
                const data = await response.json();
                setChuyenbays(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    return (
        <div className="col-md-12 main">
        <div className="mt-md-6">
          <div className="navbar d-flex justify-content-between align-items-center">
            <h2 className="main-name mb-0">Thông tin chuyến bay</h2>
            {/* Actions: Đổi mật khẩu và Xem thêm thông tin */}
            <div className="dropdown">
              <a className="d-flex align-items-center dropdown-toggle" href="#" role="button" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="bi bi-person-circle" /> 
              </a>
              {/* Dropdown menu */}
              <div className="dropdown-menu" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="password_KhachHang.html">Đổi mật khẩu</a>
                <a className="dropdown-item" href="profile_KhachHang.html">Xem thêm thông tin</a>
              </div>
            </div>
          </div>
          {/*thanh tìm kiếm với bộ lọc*/}
          <div className="find mt-5">
            <div className="d-flex w-100 justify-content-start align-items-center">
              <i className="bi bi-search" />
              <span className="first">
                <input className="form-control" placeholder="Tìm kiếm ..." />
              </span>
              <span className="second">Filters <i className="bi bi-chevron-compact-down" /></span>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
              <th/>
                <th>Mã chuyến tàu</th>
                <th>Tên tàu</th>
                <th>Điểm đi</th>
                <th>Điểm đến</th>
                <th>Giờ đi</th>
                <th>Giờ đến</th>
                <th>Ngày đi</th>
                <th>Giá tiền</th>
              </tr>
            </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td contentEditable="true" className="choose">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(item.id)}
                                        checked={selectedChuyenbays.includes(item.id)}
                                    />
                                </td>
                                <td>{item.id}</td>
                                <td>{item.boat_name}</td>
                                <td>{item.fromLocation}</td>
                                <td>{item.toLocation}</td>
                                <td>{item.departureTime}</td>
                                <td>{item.arrivalTime}</td>
                                <td>{item.departureDay}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
            </tbody>
          </table>
          {/*3 nut bam*/}
          <div className="d-flex justify-content-end my-3">
                    <button className="btn btn-primary mr-2" id="btnThem" onClick={handleClick}>Thêm</button>
                    <button className="btn btn-danger mr-2" id="btnXoa" onClick={handleDelete}>Xóa</button>
                    <button className="btn btn-warning" id="btnSua" onClick={handleShowInfo}>Sửa</button>
          </div>
                <ul className="pagination justify-content-center">
                    <li className="page-item ">
                        <a className="page-link" tabIndex={-1} onClick={() => paginate(currentPage - 1)}>Previous</a>
                    </li>
                    {[...Array(Math.ceil(chuyenbays.length / itemsPerPage)).keys()].map((number) => (
                        <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <a className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" onClick={() => paginate(currentPage + 1)}>Next</a>
                    </li>
                </ul>
        </div>
      </div>
      
    );
}
export default ChuyenBay;