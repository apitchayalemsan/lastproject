import React from 'react';
import {  Dropdown, } from 'react-bootstrap';

export default function FarmerHome() {
    // return <h2>Welcome to the Farmer Home Page!</h2>;


    return (
        <div>
            <nav className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <button type="button" className="btn btn-secondary btn-lg ms-auto">ติดต่อเรา</button>
                {/* <a href="Profile"className="bi bi-person-circle" style={{ color: 'Black', fontSize: '40px', marginInline: '30px' }}></a> */}
                <Dropdown align="end">
            <Dropdown.Toggle
                as="a"
                href="#"
                variant="secondary"
                id="dropdown-basic"
                className="bi bi-person-circle"
                style={{ color: 'black', fontSize: '40px', marginInline: '30px' }}
            >
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/profile">ข้อมูลส่วนตัว</Dropdown.Item>
                <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            </nav>

            <div className="p-3 mb-2 text-white" style={{ backgroundColor: '#D2B48C' }}>
                {/* <div className="container d-flex flex-column justify-content-center align-items-center mt-5"> */}
                <div className="container d-flex flex-column justify-content-center align-items-center mt-5"  style={{ backgroundColor: '#DCDCDC', width: '100%', height: '500px', borderRadius: '10px' }}>
                <h4 className="text-center mb-4" style={{backgroundColor: '#996633', border: '2px solid #000', padding: '10px', borderRadius: '10px' }}>ยินดีต้อนรับเข้าสู่หน้าเว็บไซต์ของเกษตรกร</h4>
                    <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                        <div className="col-md-3 d-flex justify-content-center">
                            <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                <img src="images/ประวัติการรับซื้อ.png" className="card-img-top" alt="รับซื้อน้ำยางพารา" />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <a href="ข้อมูลการขายน้ำยางพารา" className="btn btn-primary mt-3">ข้อมูลการขายน้ำยางพารา</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center">
                            <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                <img src="images/ตั้งค่า.png" className="card-img-top" alt="ประวัติการรับซื้อ" />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <a href="จัดการข้อมูลสวนยางพารา" className="btn btn-primary mt-3">จัดการข้อมูลสวนยางพารา</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center">
                            <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                <img src="images/ค้นหา.png" className="card-img-top" alt="จัดการข้อมูลรับซื้อรายวัน" />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <a href="ค้นหาสถานที่รับซื้อ" className="btn btn-primary mt-3">ค้นหาสถานที่รับซื้อ</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center">
                            <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                <img src="images/สวนยาง.webp" className="card-img-top" alt="แสดงผลการรับซื้อ" />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <a href="แสดงข้อมูลสวนยางพารา" className="btn btn-primary mt-3">แสดงข้อมูลสวนยางพารา</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );

}





