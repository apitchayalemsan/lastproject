// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Nav, Dropdown, Navbar, Table, Spinner, Form } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';


// export default function ค้นหาสถานที่รับซื้อ() {
//     const location = useLocation();
//     const [locations, setLocations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [statusFilter, setStatusFilter] = useState('ทั้งหมด'); // เพิ่ม state สำหรับการกรอง

//     // Fetch data เมื่อหน้าเว็บโหลด
//     useEffect(() => {
//         fetch('http://localhost:8080/api/getDailyData') // แก้ URL ให้ตรงกับ backend ของคุณ
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setLocations(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error.message);
//                 setLoading(false);
//             });
//     }, []);

//     // ฟังก์ชันสำหรับกรองข้อมูลตามสถานะ
//     const filterLocations = () => {
//         if (statusFilter === 'ทั้งหมด') {
//             return locations;
//         }
//         return locations.filter(location => location.status === statusFilter);
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     {/* <Navbar.Brand>ค้นหาสถานที่รับซื้อ</Navbar.Brand> */}
//                     <Nav className="me-auto"></Nav>
//                     <Nav>
//                         <Nav.Link href="#contact">ติดต่อเรา</Nav.Link>
//                         <Dropdown align="end">
//                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                                 เกษตรกร
//                             </Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
//                                 <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             {/* Sidebar and Main Content */}
//             <Container fluid>
//             <Row>
 
//                 <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//                         <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//                             <Nav.Link 
//                                 href="FarmerHome" 
//                                 className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}
//                             >
//                                 หน้าแรก
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="ข้อมูลการขายน้ำยางพารา" 
//                                 className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}
//                             >
//                                 ข้อมูลการขายน้ำยางพารา
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="จัดการข้อมูลสวนยางพารา" 
//                                 className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}
//                             >
//                                 จัดการข้อมูลสวนยางพารา
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="ค้นหาสถานที่รับซื้อ" 
//                                 className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}
//                             >
//                                 ค้นหาสถานที่รับซื้อ
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="แสดงข้อมูลสวนยางพารา" 
//                                 className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}
//                             >
//                                 แสดงข้อมูลสวนยางพารา
//                             </Nav.Link>
//                         </Nav>
//                     </Col>

//                 {/* Main Content */}
//                 <Col xs={10} style={{ padding: '0px' }}>
//                     {/* Header */}
//                     <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                         <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ค้นหาสถานที่รับซื้อ</h5>
//                     </nav>

//                     {/* Filter Form */}
//                     <Container className="mt-3">
//                         <Form>
//                             <Form.Group as={Row}>
//                                 <Form.Label column sm={2}>
//                                     ค้นหาสถานะร้าน:
//                                 </Form.Label>
//                                 <Col sm={4}>
//                                     <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                                         <option value="ทั้งหมด">ทั้งหมด</option>
//                                         <option value="Open">เปิด</option>
//                                         <option value="Closed">ปิด</option>
//                                     </Form.Select>
//                                 </Col>
//                             </Form.Group>
//                         </Form>
//                     </Container>

//                     {/* Results Table */}
//                     <Container className="mt-5">
//                         {loading ? (
//                             <Spinner animation="border" />
//                         ) : error ? (
//                             <p>เกิดข้อผิดพลาด: {error}</p>
//                         ) : filterLocations().length > 0 ? (
//                             <Table striped bordered hover>
//                                 <thead>
//                                     <tr>
//                                         <th>วันที่</th>
//                                         <th>ผู้รับซื้อ</th>
//                                         <th>ราคาซื้อวันนี้</th>
//                                         <th>ปริมาณที่รับซื้อ</th>
//                                         {/* <th>ปริมาณที่ต้องการ</th> */}
//                                         <th>สถานะ</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filterLocations().map((location, index) => (
//                                         <tr key={index}>
//                                             {/* <td>{location.date}</td> */}
//                                             <td>{new Date(location.date).toLocaleDateString('th-TH')}</td>
//                                             <td>{location.buyer}</td>
//                                             <td>{location.price}</td>
//                                             <td>{location.quantity}</td>
//                                             {/* <td>{location.requiredQty}</td> */}
//                                             {/* <td>{location.status}</td> */}
//                                             <td>{location.status === 'Open' ? 'เปิด' : location.status === 'Closed' ? 'ปิด' : location.status}</td>

//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                         ) : (
//                             <p>ไม่มีข้อมูลสำหรับการค้นหา</p>
//                         )}
//                     </Container>
//                 </Col>
//             </Row>
//             </Container>
//         </div>
//     );
// }









import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Dropdown, Navbar, Table, Spinner, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function ค้นหาสถานที่รับซื้อ() {
    const location = useLocation();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('ทั้งหมด'); // State สำหรับกรองสถานะ
    const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]); // กำหนดวันที่เริ่มต้นเป็นวันนี้

    // Fetch data เมื่อหน้าเว็บโหลด
    useEffect(() => {
        fetch('http://localhost:8080/api/getDailyData') // แก้ URL ให้ตรงกับ backend ของคุณ
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setLocations(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // ฟังก์ชันสำหรับกรองข้อมูลตามสถานะและวันที่
    const filterLocations = () => {
        return locations.filter(location => {
            const statusMatch = statusFilter === 'ทั้งหมด' || location.status === statusFilter;
            const dateMatch = new Date(location.date).toLocaleDateString('th-TH') === new Date(dateFilter).toLocaleDateString('th-TH');
            return statusMatch && dateMatch;
        });
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {/* <Nav.Link href="#contact">ติดต่อเรา</Nav.Link> */}
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                เกษตรกร
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
                                <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

            {/* Sidebar and Main Content */}
            <Container fluid>
                <Row>
                    <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
                        <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
                            <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}>หน้าแรก</Nav.Link>
                            <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>ข้อมูลการขายน้ำยางพารา</Nav.Link>
                            <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>จัดการข้อมูลสวนยางพารา</Nav.Link>
                            <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>ค้นหาสถานที่รับซื้อ</Nav.Link>
                            <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>แสดงข้อมูลสวนยางพารา</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Main Content */}
                    <Col xs={10} style={{ padding: '0px' }}>
                        {/* Header */}
                        <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
                            <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ค้นหาสถานที่รับซื้อ</h5>
                        </nav>

                        {/* Filter Form */}
                        <Container className="mt-3">
                            <Form>
                                {/* <Form.Group as={Row}>
                                    <Form.Label column sm={2}>ค้นหาสถานะร้าน:</Form.Label>
                                    <Col sm={4}>
                                        <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                            <option value="ทั้งหมด">ทั้งหมด</option>
                                            <option value="Open">เปิด</option>
                                            <option value="Closed">ปิด</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group> */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm={1}>เลือกวันที่:</Form.Label>
                                    <Col sm={4}>
                                        <Form.Control type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Container>

                        {/* Results Table */}
                        <Container className="mt-5">
                            {loading ? (
                                <Spinner animation="border" />
                            ) : error ? (
                                <p>เกิดข้อผิดพลาด: {error}</p>
                            ) : filterLocations().length > 0 ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>วันที่</th>
                                            <th>ผู้รับซื้อ</th>
                                            <th>ราคาซื้อวันนี้</th>
                                            <th>ปริมาณที่รับซื้อ</th>
                                            <th>สถานะ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterLocations().map((location, index) => (
                                            <tr key={index}>
                                                <td>{new Date(location.date).toLocaleDateString('th-TH')}</td>
                                                <td>{location.buyer}</td>
                                                <td>{location.price}</td>
                                                <td>{location.quantity}</td>
                                                <td>{location.status === 'Open' ? 'เปิด' : location.status === 'Closed' ? 'ปิด' : location.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>ไม่มีข้อมูลสำหรับการค้นหา</p>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
