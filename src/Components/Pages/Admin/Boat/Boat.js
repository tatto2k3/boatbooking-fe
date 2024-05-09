import React from "react";
import './Boat.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Boat = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [boats, setboats] = useState([]);
    const [selectedboats, setSelectedboats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = boats.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleClick = () => {
        navigate('/admin/boat-add');
    };
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/admin/boats", {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                setboats(responseJson);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [])




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/admin/boats" , {
                    method: 'GET',
                    headers: headers
                });
                const data = await response.json();
                setboats(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleCheckboxChange = (boatId) => {
        if (selectedboats.includes(boatId)) {
            // Nếu đã chọn thì hủy chọn
            setSelectedboats([]);
        } else {
            // Nếu chưa chọn thì chọn
            setSelectedboats([boatId]);
        }
    };



    const handleShowInfo = async () => {
        console.log(selectedboats);
        try {
            if (selectedboats.length > 0) {
                const response = await fetch(`http://localhost:8080/api/v1/admin/boats/${selectedboats.join(',')}`, {
                    method: 'GET',
                    headers: headers
                });
                const data = await response.json();

                
                navigate('/admin/boat-edit', { state: { selectedboatInfo: data } });
            } else {
                console.log("No boats selected.");
            }
        } catch (error) {
            console.error("Error fetching boat details:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure to delete this boat")) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/v1/admin/boats/${selectedboats.join(',')}`, {
                    data: selectedboats, 
                    headers: headers
                });

                if (response.status === 200) {
                    const updatedboats = boats.filter(boat => !selectedboats.includes(boat.id));
                    setboats(updatedboats);
                    setSelectedboats([]);
                    toast.success('boats deleted successfully');

                } else {
                    toast.error('Failed to delete boats');
                }
            } catch (error) {
                toast.error('Error deleting boats: ' + error.message);
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
                const response = await fetch(`/api/boat/Searchboats?searchKeyword=${searchKeyword}`);
                const data = await response.json();
                setboats(data);
            } catch (error) {
                console.error("Error searching customers:", error);
            }
        }
        else {
            try {
                const response = await fetch("/api/boat/Getboats");
                const data = await response.json();
                setboats(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    return (
        <div className="col-md-12 main">
  <div className="mt-md-6">
    <div className="navbar d-flex justify-content-between align-items-center">
      <h2 className="main-name mb-0">Thông tin tàu khách</h2>
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
                            <input
                                className="form-control"
                                placeholder="Tìm kiếm ..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
        </span>
        <span className="second">Filters <i className="bi bi-chevron-compact-down" /></span>
      </div>
    </div>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th />
          <th>Mã tàu</th>
          <th>Tên tàu</th>
          <th>Số giường</th>
          <th>Số ghế</th>
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
                                checked={selectedboats.includes(item.id)}
                            />
                        </td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.num_bed}</td>
                        <td>{item.num_seat}</td>
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
                    {[...Array(Math.ceil(boats.length / itemsPerPage)).keys()].map((number) => (
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
export default Boat;