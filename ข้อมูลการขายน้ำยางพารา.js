import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Dropdown, Navbar, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for date picker
import './Sidebar.css';

export default function ข้อมูลการขายน้ำยางพารา() {
    const location = useLocation();
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [farmerId, setFarmerId] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const userId = localStorage.getItem('user_id');

    function calculateGrade(percentage) {
        if (percentage >= 30) {
            return 'A';
        } else if (percentage >= 20) {
            return 'B';
        } else {
            return 'C';
        }
    }

    useEffect(() => {
        if (!userId) {
            setError('User ID not found in localStorage');
            setLoading(false);
            return;
        }

        const fetchFarmerId = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/getFarmerId', {
                    params: { userId }
                });
                if (response.data.length > 0) {
                    setFarmerId(response.data[0].farmer_id);
                } else {
                    setError('Farmer ID not found for this user');
                }
            } catch (error) {
                setError('Error fetching farmer ID');
            } finally {
                setLoading(false);
            }
        };

        fetchFarmerId();
    }, [userId]);

    useEffect(() => {
        if (!farmerId) return;

        const fetchHistoryData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/history', {
                    params: { farmerId }
                });
                setHistoryData(response.data);
            } catch (error) {
                setError('Error fetching history data');
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryData();
    }, [farmerId]);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setStartDate(today);
        setEndDate(today);
    }, []);
    

    // Filter history data based on selected date range
    const filteredData = historyData.filter(item => {
        const date = new Date(item.date);
        return date >= startDate && date <= endDate;
    });

    return (
        <div>
            {/* Navbar */}
            <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {/* <Nav.Link href="#contact">ติดต่อเรา</Nav.Link> */}
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">เกษตรกร</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
                                <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
                        <Nav className="flex-column p-3" style={{ height: '100%', overflowY: 'auto' }} activeKey={location.pathname}>
                            <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/FarmerHome' ? 'active' : ''}`}>หน้าแรก</Nav.Link>
                            <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>ข้อมูลการขายน้ำยางพารา</Nav.Link>
                            <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>จัดการข้อมูลสวนยางพารา</Nav.Link>
                            <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>ค้นหาสถานที่รับซื้อ</Nav.Link>
                            <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>แสดงข้อมูลสวนยางพารา</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Main Content */}
                    <Col xs={10} style={{ padding: '0px', height: '700px', overflowY: 'auto' }}>
                        <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
                            <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ข้อมูลการขายยางพารา</h5>
                        </nav>

                        <Container className="mt-4">
                            <div className="d-flex justify-content-around flex-wrap mb-3">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    className="form-control m-2"
                                    placeholderText="เลือกวันที่เริ่มต้น"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    className="form-control m-2"
                                    placeholderText="เลือกวันที่สิ้นสุด"
                                />
                                {/* <Button
                                    variant="outline-danger"
                                    size="lg"
                                    className="m-2"
                                    onClick={() => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        setStartDate(today);
                                        setEndDate(today);
                                    }}
                                >
                                    วันนี้
                                </Button> */}
                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    className="m-2"
                                    onClick={() => {
                                        const yesterday = new Date();
                                        yesterday.setDate(yesterday.getDate() - 1);
                                        yesterday.setHours(0, 0, 0, 0);
                                        setStartDate(yesterday);
                                        setEndDate(yesterday);
                                    }}
                                >
                                    เมื่อวาน
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    className="m-2"
                                    onClick={() => {
                                        const sevenDaysAgo = new Date();
                                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                                        setStartDate(sevenDaysAgo);
                                        setEndDate(new Date());
                                    }}
                                >
                                    7 วันที่ผ่านมา
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    className="m-2"
                                    onClick={() => {
                                        const startOfMonth = new Date();
                                        startOfMonth.setDate(1);
                                        setStartDate(startOfMonth);
                                        setEndDate(new Date());
                                    }}
                                >
                                    เดือนนี้
                                </Button>
                            </div>

                            <h6>ข้อมูลประวัติการขายน้ำยาง</h6>

                            {loading ? (
                                <div className="text-center my-5">
                                    <span className="spinner-border text-primary" role="status"></span>
                                    <p>กำลังโหลดข้อมูล...</p>
                                </div>
                            ) : error ? (
                                <p className="text-danger">{error}</p>
                            ) : filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <Row key={index} className="mt-3">
                                        <Col md={10} style={{ paddingLeft: '200px' }}>
                                            <Card className="mb-3 shadow-sm" style={{ borderRadius: '30px', backgroundColor: '#f8f9fa', paddingLeft: '80px' }}>
                                                <Card.Body>
                                                    <Card.Title>รหัสเกษตรกร: {item.farmer_id}</Card.Title>
                                                    <Card.Title>เกษตรกร: {item.farmer_name}</Card.Title>
                                                    <Card.Text>วันที่ขาย: {new Date(item.date).toLocaleDateString('th-TH')}</Card.Text>
                                                    <Card.Text>ปริมาณน้ำยางสด: {item.weight} กก.</Card.Text>
                                                    <Card.Text>% DRC เฉลี่ย: {item.percentage}%</Card.Text>
                                                    <Card.Text>ยางแห้ง: {item.dryRubber} กก.</Card.Text>
                                                    <Card.Text>ราคาที่รับซื้อ: {item.price} บาท</Card.Text>
                                                    <Card.Text>เกรด: {calculateGrade(item.percentage)}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <p className="text-center">ไม่พบข้อมูลในช่วงเวลาที่เลือก</p>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}












// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Nav, Dropdown, Navbar, Button, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for date picker
// import './Sidebar.css';


// export default function ข้อมูลการขายน้ำยางพารา() {
//     const location = useLocation();
//     const [historyData, setHistoryData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [farmerId, setFarmerId] = useState(null);
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const userId = localStorage.getItem('user_id');

//     function calculateGrade(percentage) {
//         if (percentage >= 30) {
//             return 'A';
//         } else if (percentage > 20) {
//             return 'B';
//         } else {
//             return 'C';
//         }
//     }

//     useEffect(() => {
//         if (!userId) {
//             setError('User ID not found in localStorage');
//             setLoading(false);
//             return;
//         }

//         const fetchFarmerId = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/getFarmerId', {
//                     params: { userId }
//                 });
//                 if (response.data.length > 0) {
//                     setFarmerId(response.data[0].farmer_id);
//                 } else {
//                     setError('Farmer ID not found for this user');
//                 }
//             } catch (error) {
//                 setError('Error fetching farmer ID');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFarmerId();
//     }, [userId]);

//     useEffect(() => {
//         if (!farmerId) return;

//         const fetchHistoryData = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get('http://localhost:8080/api/history', {
//                     params: { farmerId }
//                 });
//                 setHistoryData(response.data);
//             } catch (error) {
//                 setError('Error fetching history data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchHistoryData();
//     }, [farmerId]);

//     // Filter history data based on selected date range
//     const filteredData = historyData.filter(item => {
//         const date = new Date(item.date);
//         return date >= startDate && date <= endDate;
//     });

//     return (
//         <div>
//             {/* Navbar */}
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     {/* <Navbar.Brand>ข้อมูลการขายยางพารา</Navbar.Brand> */}
//                     <Nav className="me-auto"></Nav>
//                     <Nav>
//                         <Nav.Link href="#contact">ติดต่อเรา</Nav.Link>
//                         <Dropdown align="end">
//                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">เกษตรกร</Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
//                                 <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             <Container fluid>
//             <Row>
//                 {/* Sidebar */}
//                 <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//                     <Nav className="flex-column p-3" style={{ height: '100%',overflowY: 'auto' }} activeKey={location.pathname}>
//                         <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/FarmerHome' ? 'active' : ''}`}>หน้าแรก</Nav.Link>
//                         <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>ข้อมูลการขายน้ำยางพารา</Nav.Link>
//                         <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>จัดการข้อมูลสวนยางพารา</Nav.Link>
//                         <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>ค้นหาสถานที่รับซื้อ</Nav.Link>
//                         <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>แสดงข้อมูลสวนยางพารา</Nav.Link>
//                     </Nav>
//                 </Col>

//                 {/* Main Content */}
//                 <Col xs={10} style={{ padding: '0px' , height: '700px', overflowY: 'auto' }}>
//                     <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                         <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ข้อมูลการขายยางพารา</h5>
//                     </nav>

//                     <Container className="mt-4">
//                         <div className="d-flex justify-content-around flex-wrap mb-3">
//                             <DatePicker
//                                 selected={startDate}
//                                 onChange={(date) => setStartDate(date)}
//                                 selectsStart
//                                 startDate={startDate}
//                                 endDate={endDate}
//                                 className="form-control m-2"
//                                 placeholderText="เลือกวันที่เริ่มต้น"
//                             />
//                             <DatePicker
//                                 selected={endDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 selectsEnd
//                                 startDate={startDate}
//                                 endDate={endDate}
//                                 minDate={startDate}
//                                 className="form-control m-2"
//                                 placeholderText="เลือกวันที่สิ้นสุด"
//                             />
//                             <Button
//                                 variant="outline-danger"
//                                 size="lg"
//                                 className="m-2"
//                                 onClick={() => {
//                                     setStartDate(new Date());
//                                     setEndDate(new Date());
//                                 }}
//                             >
//                                 วันนี้
//                             </Button>
//                             <Button
//                                 variant="outline-danger"
//                                 size="lg"
//                                 className="m-2"
//                                 onClick={() => {
//                                     const yesterday = new Date();
//                                     yesterday.setDate(yesterday.getDate() - 1);
//                                     setStartDate(yesterday);
//                                     setEndDate(yesterday);
//                                 }}
//                             >
//                                 เมื่อวาน
//                             </Button>
//                             <Button
//                                 variant="outline-danger"
//                                 size="lg"
//                                 className="m-2"
//                                 onClick={() => {
//                                     const sevenDaysAgo = new Date();
//                                     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//                                     setStartDate(sevenDaysAgo);
//                                     setEndDate(new Date());
//                                 }}
//                             >
//                                 7 วันที่ผ่านมา
//                             </Button>
//                             <Button
//                                 variant="outline-danger"
//                                 size="lg"
//                                 className="m-2"
//                                 onClick={() => {
//                                     const startOfMonth = new Date();
//                                     startOfMonth.setDate(1);
//                                     setStartDate(startOfMonth);
//                                     setEndDate(new Date());
//                                 }}
//                             >
//                                 เดือนนี้
//                             </Button>
//                         </div>
                        

//                         <h6>ข้อมูลประวัติการขายน้ำยาง</h6>

//                         {loading ? (
//                             <div className="text-center my-5">
//                                 <span className="spinner-border text-primary" role="status"></span>
//                                 <p>กำลังโหลดข้อมูล...</p>
//                             </div>
//                         ) : error ? (
//                             <p className="text-danger">{error}</p>
//                         ) : filteredData.length > 0 ? (
//                             filteredData.map((item, index) => (
                                
//                                 <Row key={index} className="mt-3">
//                                     <Col md={10} style={{paddingLeft:'200px'}} >
//                                         <Card className="mb-3 shadow-sm" style={{ borderRadius: '30px', backgroundColor: '#f8f9fa' ,paddingLeft:'80px' }}>
//                                             <Card.Body>
//                                                 <Card.Title>รหัสเกษตรกร: {item.farmer_id}</Card.Title>
//                                                 <Card.Title>เกษตรกร: {item.farmer_name}</Card.Title>
//                                                 {/* <Card.Text>วันที่ขาย: {item.date}</Card.Text> */}
//                                                 <Card.Text>วันที่ขาย: {new Date(item.date).toLocaleDateString('th-TH')}</Card.Text>

//                                                 <Card.Text>ปริมาณน้ำยางสด: {item.weight} กก.</Card.Text>
//                                                 <Card.Text>% DRC เฉลี่ย: {item.percentage}%</Card.Text>
//                                                 <Card.Text>ยางแห้ง: {item.dryRubber}กก. </Card.Text>
//                                                 <Card.Text>ราคาที่รับซื้อ: {item.price} บาท/กก.</Card.Text>
//                                                 <Card.Text>เกรดยาง: {calculateGrade(item.percentage)}</Card.Text>
//                                                 <Card.Text>เงินสุทธิ: {item.totalPrice} บาท</Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                     </Col>
//                                 </Row>
                                
//                             ))
//                         ) : (
//                             <p>ไม่มีข้อมูลการขายน้ำยาง</p>
//                         )}
//                     </Container>
//                 </Col>
//             </Row>
//             </Container>
//         </div>
//     );
// }
