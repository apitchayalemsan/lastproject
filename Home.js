import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Nav, Dropdown, Navbar, Button, Card } from 'react-bootstrap';
// import FarmerHome from "./Farmerhome";

export default function Home() {
    if (localStorage.getItem("access_token")) {
        console.log(localStorage.getItem("access_token"));

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
                    <div className="container d-flex flex-column justify-content-center align-items-center mt-5"  style={{ backgroundColor: '#DCDCDC', width: '100%', height: '500px', borderRadius: '10px' }}>
                    <h4 className="text-center mb-4" style={{backgroundColor: '#996633', border: '2px solid #000', padding: '10px', borderRadius: '10px' }}>
                         ยินดีต้อนรับเข้าสู่หน้าเว็บไซต์ของผู้รับซื้อน้ำยางสด</h4>

                        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                            <div className="col-md-3 d-flex justify-content-center">
                                <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                    <img src="images/รับซื้อ1.webp" className="card-img-top" alt="รับซื้อน้ำยางพารา" />
                                    {/* images/รับซื้อ.png  */}
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <a href="Processbuy" className="btn btn-primary mt-3">รับซื้อน้ำยางพารา</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                    <img src="images/ประวัติการรับซื้อ.png " className="card-img-top" alt="ประวัติการรับซื้อ" />
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <a href="History" className="btn btn-primary mt-3">ประวัติการรับซื้อ</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                    <img src="images/ตั้งค่า.png" className="card-img-top" alt="จัดการข้อมูลรับซื้อรายวัน" />
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <a href="daily" className="btn btn-primary mt-3">จัดการข้อมูลรับซื้อรายวัน</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <div className="card" style={{ width: '100%', border: '2px solid #333' }}> 
                                    <img src="images/pie chart1.png" className="card-img-top" alt="แสดงผลการรับซื้อ" />
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <a href="results" className="btn btn-primary mt-3">แสดงผลการรับซื้อ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    // const getComponentByRole = ()=> {
    //     if (localStorage.getItem("role_id") ==1) {
    //         return (<FarmerHome/>)
    //     }
    // }


    // return (
    //     <Navigate to="/" replace />
    // );


    if (localStorage.getItem("access_token")) {
        console.log(localStorage.getItem("access_token"));
        // render home content
    } else {
        return <Navigate to="/" replace />;
    }
}




