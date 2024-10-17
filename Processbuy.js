import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, Dropdown, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import './Processbuy.css'; // นำเข้าไฟล์ CSS
import PriceChart from './PriceChart.js';
import moment from 'moment';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton,} from '@mui/material';


export default function Processbuy() {
    const [price, setPrice] = useState('');
    const [firstField, setFirstField] = useState('');
    const [weight, setWeight] = useState('');
    const [percentage, setPercentage] = useState('');
    const [dryRubber, setDryRubber] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const [farmer, setFarmer] = useState('');
    const [farmers, setFarmers] = useState([]); // State for farmers

    const [seller, setSeller] = useState('');
    const [sellers, setSellers] = useState([]); // State for sellers
    const [formData, setFormData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const location = useLocation();

//สมมุติ
// const [searchTerm, setSearchTerm] = useState('');

// const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

// const handleChange = selectedOption => {
//     setFarmer(selectedOption);
// };


const handleChange = (selectedOption) => {
    setFarmer(selectedOption); // เก็บทั้ง label และ value
    console.log('Selected farmer_id:', selectedOption.value); // farmer_id ที่ถูกเลือก
};



useEffect(() => {
    const fetchFarmers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/farmers');
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
        }
    };

    fetchFarmers();
}, []);

    
// ฟังก์ชันสำหรับแปลงข้อมูล farmers ให้เป็นรูปแบบที่ react-select ใช้
// const farmerOptions = farmers.map(f => ({
//     value: f.farmerId,
//     label: f.name
// }));    

const farmerOptions = farmers.map(farmer => ({
    label: farmer.name,  // ชื่อเกษตรกร
    value: farmer.farmer_id  // farmer_id
}));


    useEffect(() => {
        fetchFormData();
        fetchPriceHistory();
        // fetchSellers(); // Fetch sellers data on component mount
        fetchFarmers(); //
    }, []);

    const fetchPriceHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getPriceHistory');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching price history:', error);
        }
    };

    const fetchFormData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getHistory');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };


    ///ที่เพิ่ม
    // const fetchSellers = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/getFarmers');
    //         setSellers(response.data);
    //     } catch (error) {
    //         console.error('Error fetching sellers:', error);
    //     }
    // };

    const fetchFarmers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/farmers');
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
        }
    };

    

    useEffect(() => {
        const savedPrice = localStorage.getItem('price');
        if (savedPrice) {
            setPrice(savedPrice);
            setFirstField(savedPrice);
        }
    }, []);

    const handleSavePrice = async () => {
        setFirstField(price);
        localStorage.setItem('price', price);

        const date = new Date().toLocaleDateString('en-CA');
        try {
            await axios.post('http://localhost:8080/api/savePrice', { date, price });
            console.log('Price saved successfully');
        } catch (error) {
            console.error('Error saving price to database:', error.response ? error.response.data : error.message);
        }
    };

    const handleCalculate = () => {
        const dryWeight = (parseFloat(weight) * parseFloat(percentage)) / 100;
        setDryRubber(dryWeight.toFixed(2));

        const total = dryWeight * parseFloat(price);
        setTotalPrice(total.toFixed(2));
    };

    const handleSaveForm = async () => {
        const newEntry = {
            date: new Date().toLocaleDateString('en-CA'),
            seller, // seller is now the sellerId
            farmer,
            price: firstField,
            weight,
            percentage,
            dryRubber,
            totalPrice
        };

        try {
            await axios.post('http://localhost:8080/api/saveForm', newEntry);
            const updatedFormData = [...formData, newEntry];
            setFormData(updatedFormData);
            localStorage.setItem('formData', JSON.stringify(updatedFormData));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.error('Error saving form data:', error.response ? error.response.data : error.message);
        }
    };
    

    // const handleSaveForm = async () => {
    //     const formData = {
    //         date: new Date().toLocaleDateString('en-CA'),
    //         farmer,
    //         price,
    //         weight,
    //         percentage,
    //         dryRubber,
    //         totalPrice
    //     };
    
    //     console.log('Sending form data:', formData);
    
    //     try {
    //         const response = await fetch('http://localhost:8080/api/saveForm', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Error saving form data');
    //         }
    
    //         const result = await response.json();
    //         console.log('Form data saved successfully:', result);
    //     } catch (error) {
    //         console.error('Error saving form data:', error);
    //     }
    // };
    
    
    
    

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');
        printWindow.document.write('</head><body >');
        printWindow.document.write(document.getElementById('printableContent').innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        // <Container fluid>
             <div> 
            {/* Navbar */}
            <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <Container>
                    {/* <Navbar.Brand>Processbuy</Navbar.Brand> */}
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

            {/* Sidebar */}
            <Container fluid>
            <Row>
            <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
                        <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
                            <Nav.Link 
                                href="home" 
                                className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}
                            >
                                หน้าแรก
                            </Nav.Link>
                            <Nav.Link 
                                href="processbuy" 
                                className={`text-white ${location.pathname === '/processbuy' ? 'active' : ''}`}
                            >
                                รับซื้อน้ำยางพารา
                            </Nav.Link>
                            <Nav.Link 
                                href="history" 
                                className={`text-white ${location.pathname === '/history' ? 'active' : ''}`}
                            >
                                ประวัติการรับซื้อ
                            </Nav.Link>
                            <Nav.Link 
                                href="daily" 
                                className={`text-white ${location.pathname === '/daily' ? 'active' : ''}`}
                            >
                                จัดการข้อมูลรับซื้อรายวัน
                            </Nav.Link>
                            <Nav.Link 
                                href="results" 
                                className={`text-white ${location.pathname === '/results' ? 'active' : ''}`}
                            >
                                แสดงผลการรับซื้อ
                            </Nav.Link>
                        </Nav>
                    </Col>

                {/* Main Content */}
                <Col xs={10} style={{ padding: '0px' }}>
                    <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
                        <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>รับซื้อน้ำยางพารา</h5>
                    </nav>


                {/* Main Content */}
                <Col xs={12} style={{ padding: '20px',paddingLeft: '80px' ,paddingRight: '80px'}}>
                
                    {showAlert && <Alert variant="success">บันทึกข้อมูลเรียบร้อยแล้ว</Alert>}
                    <Form>
                        <Row className="mb-3" style={{ backgroundColor: '#D3D3D3', borderRadius: '10px',height: '100px' }}>
                            <Col xs={6}>
                                <Form.Group controlId="price">
                                    <Form.Label><h5>ราคารับซื้อวันนี้</h5></Form.Label>
                                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} >
                                <Form style={{}}>&nbsp;</Form>
                                <div>
                                    <Button variant="secondary" className="me-2" onClick={handleSavePrice}>บันทึก</Button>
                                    <Button variant="danger" onClick={() => setShowChart(true)}>แสดงกราฟ</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>

                    <h6>กรุณากรอกข้อมูลการรับซื้อน้ำยางสดเพื่อนำไปคำนวณราคา</h6>
                    <Form className="printableArea">
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>วัน/เดือน/ปี</Form.Label>
                                <Form.Control type="text" placeholder="ว/ด/ป" readOnly value={new Date().toLocaleDateString()} />
                            </Col>
                            <Col>
                                {/* <Form.Label>ชื่อผู้ขาย</Form.Label>
                                <Form.Control as="select" value={seller} onChange={(e) => setSeller(e.target.value)}>
                                    <option value="">เลือกผู้ขาย</option>
                                    {sellers.map(s => (
                                        <option key={s.sellerId} value={s.sellerId}>
                                            {s.sellerName}
                                        </option>
                                    ))}
                                </Form.Control> */}

                                {/* <Form.Label>ชื่อเกษตรกร</Form.Label>
                                <Form.Control as="select" value={farmer} onChange={(e) => setFarmer(e.target.value)}>
                                    <option value="">เลือกเกษตรกร</option>
                                    {farmers.map(f => (
                                        <option key={f.farmerId} value={f.farmerId}>
                                            {f.name}
                                        </option>
                                    ))}
                                </Form.Control> */}

                                {/* <Form.Label>ชื่อเกษตรกร</Form.Label>
                                <Select
                                    options={farmerOptions}
                                    value={farmerOptions.find(option => option.value === farmer)}
                                    onChange={(selectedOption) => setFarmer(selectedOption ? selectedOption.value : '')}
                                    placeholder="เลือกเกษตรกร"
                                /> */}


                                {/* <label>ชื่อเกษตรกร</label> */}
                                {/* <Form.Label>ชื่อเกษตรกร</Form.Label>
                                <Select
                                    value={farmer}
                                    onChange={handleChange}
                                    options={farmerOptions}
                                    placeholder="เลือกเกษตรกร"
                                    isSearchable
                                /> */}

                            <Form.Label>ชื่อเกษตรกร</Form.Label>
                            <Select
                                value={farmer}
                                onChange={handleChange}
                                options={farmerOptions}
                                placeholder="เลือกเกษตรกร"
                                isSearchable
                            />


                            </Col>
                            {/* <Col>
                                <Form.Label>ราคา(บาท.)</Form.Label>
                                <Form.Control type="text" placeholder="ราคา" value={firstField} readOnly />
                            </Col> */}
                            <Col>
                                <Form.Label>ราคา (บาท)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="ราคา" 
                                    value={firstField} 
                                    readOnly 
                                    style={{ backgroundColor: 'lightgray' }} // แสดงให้เห็นว่าเป็นช่องที่อ่านได้อย่างเดียว
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>น้ำหนัก(กก.)</Form.Label>
                                <Form.Control type="text" placeholder="น้ำหนัก(กก.)" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Label>เปอร์เซ็น(%)</Form.Label>
                                <Form.Control type="text" placeholder="เปอร์เซ็น" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                            </Col>
                            {/* <Col>
                                <Form.Label>ยางแห้ง(กก.)</Form.Label>
                                <Form.Control type="text" placeholder="ยางแห้ง(กก.)" value={dryRubber} readOnly />
                            </Col> */}
                        </Row>

                        <Col xs={6} className="d-flex align-items-end">
                            <Button variant="secondary" onClick={handleCalculate}>คิดเงิน</Button>
                        </Col>

                        <Row>
                        <Col>
                            <Form.Label>ยางแห้ง(กก.)</Form.Label>
                                <Form.Control type="text" placeholder="ยางแห้ง(กก.)" value={dryRubber} readOnly style={{ backgroundColor: 'lightgray' }}  />
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="totalPrice">
                                    <Form.Label>ราคารวมทั้งหมด</Form.Label>
                                    <Form.Control type="text" placeholder="ราคารวมทั้งหมด" value={totalPrice} readOnly  style={{ backgroundColor: 'lightgray' }} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="d-flex align-items-end">
                                <Button style={{marginRight:'50px'}} variant="secondary" onClick={handleSaveForm}>บันทึก</Button>
                                {/* <Button style={{marginLeft:'50px'}} variant="primary" className="mt-3" onClick={() => setShowPrintModal(true)}>พิมพ์</Button> */}
                                <IconButton
                                 style={{color: '#a1702b',border: '5px solid #a1702b',borderRadius: '10px',width: '60px',height: '40px' }}
                                variant="primary" 
                                className="mt-3" 
                                onClick={() => setShowPrintModal(true)}
                                >
                                <PrintIcon style={{ color: '#a1702b' }} /> {/* แสดงไอคอนพิมพ์ */}
                                </IconButton>
                            </Col>
                        </Row>
                    </Form>

                    {/* <Button variant="primary" className="mt-3" onClick={() => setShowPrintModal(true)}>พิมพ์</Button> */}

                    {/* Print Modal */}
                    <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>ผลลัพธ์การคำนวณ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="printableContent">
                                <h6>ผลลัพธ์การคำนวณ</h6>
                                <p>วันที่: {new Date().toLocaleDateString()}</p>
                                {/* <p>ชื่อผู้ขาย: {sellers.find(s => s.sellerId === seller)?.sellerName || 'N/A'}</p> */}
                                {/* <p>ชื่อเกษตรกร: {farmers.find(f => f.farmerId === farmer)?.name || 'N/A'}</p> */}
                                <p>ชื่อเกษตรกร: {farmer?.label || 'N/A'}</p>
                                <p>ราคารับซื้อวันนี้: {price} บาท</p>
                                <p>น้ำหนัก: {weight} กก.</p>
                                <p>เปอร์เซ็น: {percentage}%</p>
                                <p>ยางแห้ง: {dryRubber} กก.</p>
                                <p>ราคารวมทั้งหมด: {totalPrice} บาท</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowPrintModal(false)}>ปิด</Button>
                            <Button variant="primary" onClick={handlePrint}>พิมพ์</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Chart Modal */}
                    <Modal show={showChart} onHide={() => setShowChart(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>กราฟแสดงราคา</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PriceChart data={formData} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowChart(false)}>ปิด</Button>
                        </Modal.Footer>
                    </Modal>
                    
                </Col>
                </Col>
            </Row>
            </Container>
            </div>
            
    //    </Container>
        
    );
}


// /////////////////////////////////////////////////////





