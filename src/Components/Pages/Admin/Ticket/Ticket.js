import React, { useEffect, useState } from "react";
import './Ticket.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ve = () => {
    const [tickets, setTickets] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleClick = () => {
        navigate('/admin/ticket-add');
    };

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/tickets",{
                    method: 'GET',
                    headers: headers
                });
                const data = await response.json();
                console.log(data);
                setTickets(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleCheckboxChange = (ticketId) => {
        if (selectedTickets.includes(ticketId)) {
            // Nếu đã chọn thì hủy chọn
            setSelectedTickets([]);
        } else {
            // Nếu chưa chọn thì chọn
            setSelectedTickets([ticketId]);
        }
    };



    const handleShowInfo = async () => {
        try {
            if (selectedTickets.length > 0) {
                const response = await fetch(`http://localhost:8080/api/v1/auth/tickets/${selectedTickets.join(',')}`);
                const data = await response.json();

                // Chuyển hướng sang trang sửa khách hàng và truyền thông tin khách hàng
                navigate('/admin/ticket-edit', { state: { selectedTicketInfo: data } });
            } else {
                console.log("No Tickets selected.");
            }
        } catch (error) {
            console.error("Error fetching Ticket details:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure to delete this Ticket")) {
            try {
                const response = await axios.delete('http://localhost:44430/api/ticket', {
                    data: selectedTickets, // Pass the array as data
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                

                if (response.status === 200) {
                    const updatedTickets = tickets.filter(ticket => !selectedTickets.includes(ticket.id));

                    // Cập nhật state để tái render bảng
                    setTickets(updatedTickets);

                    // Xóa danh sách khách hàng đã chọn
                    setSelectedTickets([]);
                    toast.success('Tickets deleted successfully');

                } else {
                    toast.error('Failed to delete Tickets');
                }
            } catch (error) {
                toast.error('Error deleting Tickets: ' + error.message);
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
                const response = await fetch(`/api/ticket/SearchTickets?searchKeyword=${searchKeyword}`);
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Error searching tickets:", error);
            }
        }
        else {
            try {
                const response = await fetch("/api/ticket/GetTickets");
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    return (
        <div className="col-md-12 main">
        <div className="mt-md-6">
          <div className="navbar d-flex justify-content-between align-items-center">
            <h2 className="main-name mb-0">Thông tin vé</h2>
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
                <th>Mã vé</th>
                <th>Mã khách hàng</th>
                <th>Mã chuyến tàu</th>
                <th>Mã ghế ngồi</th>
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
                                        checked={selectedTickets.includes(item.id)}
                                    />
                                </td>
                                <td>{item.id}</td>
                                <td>{item.cid}</td>
                                <td>{item.sid}</td>
                                <td>{item.seatId}</td>
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
                    {[...Array(Math.ceil(tickets.length / itemsPerPage)).keys()].map((number) => (
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
export default Ve;