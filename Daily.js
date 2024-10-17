// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useState, useEffect } from 'react';
// import { Container, Row, Col, Navbar, Nav, Table, Modal, Form, Button, Alert, Dropdown } from 'react-bootstrap';
// import axios from 'axios';
// import moment from 'moment';
// import { FaPlus } from 'react-icons/fa'; // นำเข้าไอคอนบวกจาก Font Awesome
// import { useLocation } from 'react-router-dom';
// import './Processbuy.css'; // นำเข้าไฟล์ CSS

// export default function Daily() {
//     const location = useLocation();
//     const [data, setData] = useState([]);
//     const [date, setDate] = useState('');
//     const [buyer, setBuyer] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [status, setStatus] = useState('Open','Close');
//     const [sellerId, setSellerId] = useState(''); // Store seller ID
//     const [showModal, setShowModal] = useState(false);
//     const [showSellerModal, setShowSellerModal] = useState(false);
//     const [alert, setAlert] = useState('');
//     const [sellerName, setSellerName] = useState('');
//     const [sellers, setSellers] = useState([]); // Store list of sellers

//     useEffect(() => {
//         fetchData();
//         fetchSellers();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/getDailyData');
//             console.log('Fetched data:', response.data);
//             const formattedData = response.data.map(entry => ({
//                 ...entry,
//                 date: moment(entry.date).format('YYYY-MM-DD')
//             }));
//             setData(formattedData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const fetchSellers = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/getSellers'); // Add this endpoint
//             setSellers(response.data);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };

//     const handleAddEntry = async () => {
//         const newEntry = {
//             date,
//             buyer,
//             price,
//             quantity,
//             status,
//             sellerId
//         };

//         try {
//             await axios.post('http://localhost:8080/api/addDailyData', newEntry);
//             fetchData(); // Refresh data after adding
//             setAlert('Data added successfully!');
//         } catch (error) {
//             console.error('Error adding data:', error);
//             setAlert('Error adding data. Please try again.');
//         } finally {
//             setShowModal(false);
//         }
//     };

//     const handleAddSeller = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/addSellerData', { sellerName });
//             setSellerId(response.data.sellerId); // Save new seller ID
//             setAlert('Seller added successfully!');
//             fetchSellers(); // Refresh seller list
//         } catch (error) {
//             console.error('Error adding seller:', error);
//             setAlert('Error adding seller. Please try again.');
//         } finally {
//             setShowSellerModal(false);
//         }
//     };

//     return (
//         // <Container fluid>
//         <div>
//             {/* Navbar */}
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     {/* <Navbar.Brand>Daily</Navbar.Brand> */}
//                     <Nav className="me-auto"></Nav>
//                     <Nav>
//                         <Nav.Link href="#contact">ติดต่อเรา</Nav.Link>
//                         <Dropdown align="end">
//                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                                 ผู้รับซื้อ
//                             </Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
//                                 <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             {/* Sidebar */}
//             <Container fluid>
//             <Row>
//                 <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//                             <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//                                 <Nav.Link 
//                                     href="home" 
//                                     className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}
//                                 >
//                                     หน้าแรก
//                                 </Nav.Link>
//                                 <Nav.Link 
//                                     href="processbuy" 
//                                     className={`text-white ${location.pathname === '/processbuy' ? 'active' : ''}`}
//                                 >
//                                     รับซื้อน้ำยางพารา
//                                 </Nav.Link>
//                                 <Nav.Link 
//                                     href="history" 
//                                     className={`text-white ${location.pathname === '/history' ? 'active' : ''}`}
//                                 >
//                                     ประวัติการรับซื้อ
//                                 </Nav.Link>
//                                 <Nav.Link 
//                                     href="daily" 
//                                     className={`text-white ${location.pathname === '/daily' ? 'active' : ''}`}
//                                 >
//                                     จัดการข้อมูลรับซื้อรายวัน
//                                 </Nav.Link>
//                                 <Nav.Link 
//                                     href="results" 
//                                     className={`text-white ${location.pathname === '/results' ? 'active' : ''}`}
//                                 >
//                                     แสดงผลการรับซื้อ
//                                 </Nav.Link>
//                             </Nav>
//                         </Col>

//                     {/* Content Section */}
//                     <Col xs={10} style={{ padding: '0px' }}>
//                         <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>จัดการข้อมูลรับซื้อรายวัน</h5>
//                         </div>
      

//                 {/* Main Content */}
//                 <Col xs={20}  style={{ padding: '30px' }}>
//                     <Button variant="primary" className="my-3" onClick={() => setShowModal(true)} style={{ marginBottom: '20px',backgroundColor: '#a1702b', width: '180px', height: '70px',borderRadius: '15px'  }}>  <FaPlus style={{ marginRight: '8px' }} /> {/* ใส่ไอคอน */}คลิกเพื่อเพิ่มข้อมูล</Button>
//                     {/* <Button variant="secondary" className="my-3" onClick={() => setShowSellerModal(true)}>เพิ่มผู้ขาย</Button> */}
//                     {alert && <Alert variant="info">{alert}</Alert>}
//                     <Table striped bordered hover className="mt-3">
//                         <thead>
//                             <tr>
//                                 <th>วันที่</th>
//                                 <th>Buyer</th>
//                                 <th>ราคาซื้อวันนี้</th>
//                                 <th>ปริมาณที่รับซื้อ</th>
//                                 <th>สถานะ</th>
//                                 {/* <th>Seller</th> */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.length > 0 ? (
//                                 data.map((entry, index) => (
//                                     <tr key={index}>
//                                         <td>{entry.date}</td>
//                                         <td>{entry.buyer}</td>
//                                         <td>{entry.price}</td>
//                                         <td>{entry.quantity}</td>
//                                         <td>{entry.status}</td>
//                                         {/* <td>{entry.sellerName}</td> Display seller name */}
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr><td colSpan="6">No data available</td></tr>
//                             )}
//                         </tbody>
//                     </Table>

//                     <Button variant="secondary" className="my-3" onClick={() => setShowSellerModal(true)}>เพิ่มผู้ขาย</Button>

//                     {/* Modal for adding new entry */}
//                     <Modal show={showModal} onHide={() => setShowModal(false)}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>เพิ่มข้อมูล</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <Form>
//                                 <Form.Group controlId="formDate">
//                                     <Form.Label>วัน/เดือน/ปี</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         value={date}
//                                         onChange={e => setDate(e.target.value)}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formBuyer">
//                                     <Form.Label>Buyer</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={buyer}
//                                         onChange={e => setBuyer(e.target.value)}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formPrice">
//                                     <Form.Label>ราคา รับซื้อวันนี้</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         value={price}
//                                         onChange={e => setPrice(e.target.value)}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formQuantity">
//                                     <Form.Label>ประมาณที่รับซื้อ</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={quantity}
//                                         onChange={e => setQuantity(e.target.value)}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formStatus">
//                                     <Form.Label>สถานะ</Form.Label>
//                                     <Form.Control
//                                         as="select"
//                                         value={status}
//                                         onChange={e => setStatus(e.target.value)}
//                                     >
//                                         <option>เปิด</option>
//                                         <option>ปิด</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Form>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setShowModal(false)}>ปิด</Button>
//                             <Button variant="primary" onClick={handleAddEntry}>บันทึก</Button>
//                         </Modal.Footer>
//                     </Modal>

//                     {/* Modal for adding new seller */}
//                     <Modal show={showSellerModal} onHide={() => setShowSellerModal(false)}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>เพิ่มผู้ขาย</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                         <Form.Group controlId="formSellerId">
//                                     <Form.Label>รหัสผู้ขาย</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={sellerId}
//                                         onChange={e => setSellerId(e.target.value)}
//                                     />
                                    
//                                 </Form.Group>
                            
//                             <Form>
//                                 <Form.Group controlId="formSellerName">
//                                     <Form.Label>ชื่อผู้ขาย</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={sellerName}
//                                         onChange={e => setSellerName(e.target.value)}
//                                     />
//                                 </Form.Group>
//                             </Form>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setShowSellerModal(false)}>ปิด</Button>
//                             <Button variant="primary" onClick={handleAddSeller}>บันทึก</Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </Col>
//                 </Col>
//             </Row>
//         </Container>
//         </div>
//     );
// }

// //////////////////////////////////////////////







// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useState, useEffect } from 'react';
// import { Container, Row, Col, Navbar, Nav, Table, Modal, Form, Button, Alert, Dropdown } from 'react-bootstrap';
// import axios from 'axios';
// import moment from 'moment';
// import { FaPlus } from 'react-icons/fa'; // นำเข้าไอคอนบวกจาก Font Awesome
// import { useLocation } from 'react-router-dom';
// import './Processbuy.css'; // นำเข้าไฟล์ CSS

// export default function Daily() {
//     const location = useLocation();
//     const [data, setData] = useState([]);
//     const [date, setDate] = useState('');
//     const [buyer, setBuyer] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [status, setStatus] = useState('เปิด'); // Set initial status as "เปิด"
//     const [showModal, setShowModal] = useState(false);
//     const [alert, setAlert] = useState('');

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/getDailyData');
//             console.log('Fetched data:', response.data);
//             const formattedData = response.data.map(entry => ({
//                 ...entry,
//                 date: moment(entry.date).format('YYYY-MM-DD')
//             }));
//             setData(formattedData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleAddEntry = async () => {
//         const translatedStatus = status === 'เปิด' ? 'Open' : 'Closed'; // Translate to English for backend
//         const newEntry = {
//             date,
//             buyer,
//             price,
//             quantity,
//             status: translatedStatus
//         };

//         try {
//             await axios.post('http://localhost:8080/api/addDailyData', newEntry);
//             fetchData(); // Refresh data after adding
//             setAlert('Data added successfully!');
//         } catch (error) {
//             console.error('Error adding data:', error);
//             setAlert('Error adding data. Please try again.');
//         } finally {
//             setShowModal(false);
//         }
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     <Nav className="me-auto"></Nav>
//                     <Nav>
//                         <Nav.Link href="#contact">ติดต่อเรา</Nav.Link>
//                         <Dropdown align="end">
//                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                                 ผู้รับซื้อ
//                             </Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
//                                 <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             {/* Sidebar */}
//             <Container fluid>
//                 <Row>
//                     <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//                         <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//                             <Nav.Link 
//                                 href="home" 
//                                 className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}
//                             >
//                                 หน้าแรก
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="processbuy" 
//                                 className={`text-white ${location.pathname === '/processbuy' ? 'active' : ''}`}
//                             >
//                                 รับซื้อน้ำยางพารา
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="history" 
//                                 className={`text-white ${location.pathname === '/history' ? 'active' : ''}`}
//                             >
//                                 ประวัติการรับซื้อ
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="daily" 
//                                 className={`text-white ${location.pathname === '/daily' ? 'active' : ''}`}
//                             >
//                                 จัดการข้อมูลรับซื้อรายวัน
//                             </Nav.Link>
//                             <Nav.Link 
//                                 href="results" 
//                                 className={`text-white ${location.pathname === '/results' ? 'active' : ''}`}
//                             >
//                                 แสดงผลการรับซื้อ
//                             </Nav.Link>
//                         </Nav>
//                     </Col>

//                     {/* Content Section */}
//                     <Col xs={10} style={{ padding: '0px' }}>
//                         <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>จัดการข้อมูลรับซื้อรายวัน</h5>
//                         </div>

//                         {/* Main Content */}
//                         <Col xs={20} style={{ padding: '30px' }}>
//                             <Button 
//                                 variant="primary" 
//                                 className="my-3" 
//                                 onClick={() => setShowModal(true)} 
//                                 style={{ marginBottom: '20px', backgroundColor: '#a1702b', width: '180px', height: '70px', borderRadius: '15px' }}>
//                                 <FaPlus style={{ marginRight: '8px' }} /> {/* ใส่ไอคอน */}
//                                 คลิกเพื่อเพิ่มข้อมูล
//                             </Button>
//                             {alert && <Alert variant="info">{alert}</Alert>}
//                             <Table striped bordered hover className="mt-3">
//                                 <thead>
//                                     <tr>
//                                         <th>วันที่</th>
//                                         <th>Buyer</th>
//                                         <th>ราคาซื้อวันนี้</th>
//                                         <th>ปริมาณที่รับซื้อ</th>
//                                         <th>สถานะ</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {data.length > 0 ? (
//                                         data.map((entry, index) => (
//                                             <tr key={index}>
//                                                 <td>{entry.date}</td>
//                                                 <td>{entry.buyer}</td>
//                                                 <td>{entry.price}</td>
//                                                 <td>{entry.quantity}</td>
//                                                 <td>{entry.status === 'Open' ? 'เปิด' : 'ปิด'}</td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr><td colSpan="6">No data available</td></tr>
//                                     )}
//                                 </tbody>
//                             </Table>

//                             {/* Modal for adding new entry */}
//                             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>เพิ่มข้อมูล</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <Form>
//                                         <Form.Group controlId="formDate">
//                                             <Form.Label>วัน/เดือน/ปี</Form.Label>
//                                             <Form.Control
//                                                 type="date"
//                                                 value={date}
//                                                 onChange={e => setDate(e.target.value)}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="formBuyer">
//                                             <Form.Label>Buyer</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 value={buyer}
//                                                 onChange={e => setBuyer(e.target.value)}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="formPrice">
//                                             <Form.Label>ราคา รับซื้อวันนี้</Form.Label>
//                                             <Form.Control
//                                                 type="number"
//                                                 value={price}
//                                                 onChange={e => setPrice(e.target.value)}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="formQuantity">
//                                             <Form.Label>ประมาณที่รับซื้อ</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 value={quantity}
//                                                 onChange={e => setQuantity(e.target.value)}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="formStatus">
//                                             <Form.Label>สถานะ</Form.Label>
//                                             <Form.Control
//                                                 as="select"
//                                                 value={status}
//                                                 onChange={e => setStatus(e.target.value)}
//                                             >
//                                                 <option value="เปิด">เปิด</option>
//                                                 <option value="ปิด">ปิด</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                     </Form>
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="secondary" onClick={() => setShowModal(false)}>ปิด</Button>
//                                     <Button variant="primary" onClick={handleAddEntry}>บันทึก</Button>
//                                 </Modal.Footer>
//                             </Modal>
//                         </Col>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }







import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Table, Modal, Form, Button, Alert, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './Processbuy.css';

export default function Daily() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [buyer, setBuyer] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('เปิด'); 
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // ใช้วันที่ปัจจุบันเป็นวันที่เลือกเริ่มต้น

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getDailyData');
            console.log('Fetched data:', response.data);
            const formattedData = response.data.map(entry => ({
                ...entry,
                date: moment(entry.date).format('YYYY-MM-DD')
            }));
            setData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddEntry = async () => {
        const translatedStatus = status === 'เปิด' ? 'Open' : 'Closed'; 
        const newEntry = {
            date,
            buyer,
            price,
            quantity,
            status: translatedStatus
        };

        try {
            await axios.post('http://localhost:8080/api/addDailyData', newEntry);
            fetchData(); 
            setAlert('Data added successfully!');
        } catch (error) {
            console.error('Error adding data:', error);
            setAlert('Error adding data. Please try again.');
        } finally {
            setShowModal(false);
        }
    };

    // ฟังก์ชันกรองข้อมูลตามวันที่เลือก
    const filteredData = data.filter(entry => entry.date === selectedDate);

    return (
        <div>
            <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {/* <Nav.Link href="#contact">ติดต่อเรา</Nav.Link> */}
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                ผู้รับซื้อ
                            </Dropdown.Toggle>
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
                    <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
                        <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
                            <Nav.Link href="home" className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}>
                                หน้าแรก
                            </Nav.Link>
                            <Nav.Link href="processbuy" className={`text-white ${location.pathname === '/processbuy' ? 'active' : ''}`}>
                                รับซื้อน้ำยางพารา
                            </Nav.Link>
                            <Nav.Link href="history" className={`text-white ${location.pathname === '/history' ? 'active' : ''}`}>
                                ประวัติการรับซื้อ
                            </Nav.Link>
                            <Nav.Link href="daily" className={`text-white ${location.pathname === '/daily' ? 'active' : ''}`}>
                                จัดการข้อมูลรับซื้อรายวัน
                            </Nav.Link>
                            <Nav.Link href="results" className={`text-white ${location.pathname === '/results' ? 'active' : ''}`}>
                                แสดงผลการรับซื้อ
                            </Nav.Link>
                        </Nav>
                    </Col>

                    <Col xs={10} style={{ padding: '0px' }}>
                        <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
                            <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>จัดการข้อมูลรับซื้อรายวัน</h5>
                        </div>

                        <Col xs={20} style={{ padding: '30px' }}>
                            <Form.Group controlId="formDate" style={{ marginBottom: '20px' }}>
                                <Form.Label>เลือกวันที่</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                />
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                className="my-3" 
                                onClick={() => setShowModal(true)} 
                                style={{ marginBottom: '20px', backgroundColor: '#a1702b', width: '180px', height: '70px', borderRadius: '15px' }}>
                                <FaPlus style={{ marginRight: '8px' }} />
                                คลิกเพื่อเพิ่มข้อมูล
                            </Button>
                            {alert && <Alert variant="info">{alert}</Alert>}
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th>วันที่</th>
                                        <th>Buyer</th>
                                        <th>ราคาซื้อวันนี้</th>
                                        <th>ปริมาณที่รับซื้อ</th>
                                        <th>สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.date}</td>
                                                <td>{entry.buyer}</td>
                                                <td>{entry.price}</td>
                                                <td>{entry.quantity}</td>
                                                <td>{entry.status === 'Open' ? 'เปิด' : 'ปิด'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5">ไม่มีข้อมูล</td></tr>
                                    )}
                                </tbody>
                            </Table>

                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>เพิ่มข้อมูล</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formDate">
                                            <Form.Label>วัน/เดือน/ปี</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBuyer">
                                            <Form.Label>Buyer</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={buyer}
                                                onChange={e => setBuyer(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formPrice">
                                            <Form.Label>ราคา รับซื้อวันนี้</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={price}
                                                onChange={e => setPrice(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formQuantity">
                                            <Form.Label>ประมาณที่รับซื้อ</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formStatus">
                                            <Form.Label>สถานะ</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={status}
                                                onChange={e => setStatus(e.target.value)}
                                            >
                                                <option value="เปิด">เปิด</option>
                                                <option value="ปิด">ปิด</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>ปิด</Button>
                                    <Button variant="primary" onClick={handleAddEntry}>บันทึก</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
