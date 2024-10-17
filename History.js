import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Form, Table, Button,Dropdown,Nav,Modal } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Edit, Delete, Search, } from '@mui/icons-material';
import { IconButton,} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
// import Select from 'react-select';

export default function History() {
    const [price, setPrice] = useState('');
    const [firstField, setFirstField] = useState('');
    const [weight, setWeight] = useState('');
    const [percentage, setPercentage] = useState('');
    const [dryRubber, setDryRubber] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [farmer, setFarmer] = useState('');
    const [formData, setFormData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFarmer, setSelectedFarmer] = useState('');
    const [editingEntry, setEditingEntry] = useState(null);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const [farmers, setFarmers] = useState([]);
    const [filteredFarmers, setFilteredFarmers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



    const location = useLocation();

    const [historyData, setHistoryData] = useState([]);



    useEffect(() => {
        const fetchHistoryData = async () => {
            if (selectedFarmer) {
                try {
                    const response = await fetch(`/api/history?farmerId=${selectedFarmer}`); // Adjust the endpoint accordingly
                    const data = await response.json();
                    setHistoryData(data);
                } catch (error) {
                    console.error('Error fetching history data:', error);
                }
            } else {
                setHistoryData([]); // Clear history if no farmer is selected
            }
        };
    
        fetchHistoryData();
    }, [selectedFarmer]);
    
    


    useEffect(() => {
        // Fetch farmers from the backend
        const fetchFarmers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/farmers');
                setFarmers(response.data);
                setFilteredFarmers(response.data); // Initialize filtered farmers
            } catch (error) {
                console.error('Error fetching farmers:', error);
            }
        };

        fetchFarmers(); // Call the fetch function when component mounts
    }, []);

    // Handle search input
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter farmers based on search term
        const filtered = farmers.filter(farmer => 
            farmer.name.toLowerCase().includes(term)
        );
        setFilteredFarmers(filtered);
    };
    


    useEffect(() => {
        const savedPrice = localStorage.getItem('price');
        if (savedPrice) {
            setPrice(savedPrice);
            setFirstField(savedPrice);
        }

        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getHistory');
            const dataWithFormattedDates = response.data.map(entry => ({
                ...entry,
                date: new Date(entry.date).toLocaleDateString('th-TH')
            }));
            setFormData(dataWithFormattedDates);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleSavePrice = () => {
        setFirstField(price);
        localStorage.setItem('price', price);
    };

    const calculateValues = (weight, percentage, price) => {
        const dryWeight = (parseFloat(weight) * parseFloat(percentage)) / 100;
        const total = dryWeight * parseFloat(price);
        return {
            dryRubber: dryWeight.toFixed(2),
            totalPrice: total.toFixed(2)
        };
    };

    const handleCalculate = () => {
        const { dryRubber, totalPrice } = calculateValues(weight, percentage, price);
        setDryRubber(dryRubber);
        setTotalPrice(totalPrice);
    };

    const handleSaveForm = async () => {
        const { dryRubber, totalPrice } = calculateValues(weight, percentage, firstField);
        const newEntry = {
            date: new Date().toLocaleDateString('th-TH'),
            farmer,
            price: firstField,
            weight,
            percentage,
            dryRubber,
            totalPrice
        };

        try {
            await axios.post('http://localhost:8080/api/saveForm', newEntry);
            setFormData([...formData, newEntry]);
        } catch (error) {
            console.error('Error saving form data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/deleteForm/${id}`);
            setFormData(formData.filter(entry => entry.id !== id));
        } catch (error) {
            console.error('Error deleting form data:', error);
        }
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setPrice(entry.price);
        setWeight(entry.weight);
        setPercentage(entry.percentage);
        const { dryRubber, totalPrice } = calculateValues(entry.weight, entry.percentage, entry.price);
        setDryRubber(dryRubber);
        setTotalPrice(totalPrice);
        setFarmer(entry.farmer);
    };

    const handleUpdate = async () => {
        const { dryRubber, totalPrice } = calculateValues(weight, percentage, firstField);
        const updatedEntry = {
            ...editingEntry,
            price: firstField,
            weight,
            percentage,
            dryRubber,
            totalPrice,
            farmer
        };

        try {
            await axios.put(`http://localhost:8080/api/updateForm/${editingEntry.id}`, updatedEntry);
            setFormData(formData.map(entry => entry.id === editingEntry.id ? updatedEntry : entry));
            setEditingEntry(null);
        } catch (error) {
            console.error('Error updating form data:', error);
        }
    };

    const handlePrint = (entry) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(`<h3>Date: ${entry.date}</h3>`);
        printWindow.document.write(`<p>Farmer: ${entry.farmer_name}</p>`);
        printWindow.document.write(`<p>Weight (kg): ${entry.weight}</p>`);
        printWindow.document.write(`<p>Percentage (%): ${entry.percentage}</p>`);
        printWindow.document.write(`<p>Dry Rubber (kg): ${entry.dryRubber}</p>`);
        printWindow.document.write(`<p>Total Price (THB): ${entry.totalPrice}</p>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const filterData = () => {
        return formData.filter(entry => {
            const entryDate = entry.date;
            const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('th-TH');
            const isDateMatch = selectedDate ? entryDate === formattedSelectedDate : true;
            const isFarmerMatch = selectedFarmer ? entry.farmer === selectedFarmer : true;
            return isDateMatch && isFarmerMatch;
        });
    };

    // const farmers = [...new Set(formData.map(entry => entry.farmer))];

    return (
        <div>


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

                    <Col xs={10} style={{ padding: '0px' }}>
                    <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
                        <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ประวัติการรับซื้อ</h5>
                    </nav>


            {/* <h3 className="mt-3">History</h3> */}
            <Form>
                <Row className="mb-3" style={{ fontSize: '15px', width: '90%', margin: '0 auto' }}>
                    <Col>
                        <Form.Label></Form.Label>
                        <Form.Control
                            type="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                        />
                    </Col>

                    {/* <Col>
                    <Form.Label>ชื่อเกษตรกร</Form.Label>
                            <Select
                                value={farmer}
                                onChange={handleChange}
                                options={farmerOptions}
                                placeholder="เลือกเกษตรกร"
                                isSearchable
                            />
                    </Col> */}
    

        <Col>
            <Form.Label> </Form.Label>
            <Form.Control
                type="text"
                placeholder="ค้นหาเกษตรกร..."
                value={searchTerm}
                onChange={handleSearch} 
            />
            <Form.Select
                value={selectedFarmer}
                onChange={e => setSelectedFarmer(e.target.value)} 
                style={{ marginTop: '10px' }} 
            >
                <option value="">ทั้งหมด</option>
                {filteredFarmers.map((farmer, index) => (
                    <option key={index} value={farmer.id}>{farmer.name}</option>
                ))}
            </Form.Select>
        </Col>


        </Row>
            </Form>

            {/* Edit Form */}
            {editingEntry && (
                <div>
                    <h3>Edit Entry</h3>
                    <Form>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={firstField}
                                onChange={e => setFirstField(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight (kg)</Form.Label>
                            <Form.Control
                                type="number"
                                value={weight}
                                onChange={e => {
                                    setWeight(e.target.value);
                                    handleCalculate();
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPercentage">
                            <Form.Label>Percentage (%)</Form.Label>
                            <Form.Control
                                type="number"
                                value={percentage}
                                onChange={e => {
                                    setPercentage(e.target.value);
                                    handleCalculate();
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFarmer">
                            <Form.Label>Farmer</Form.Label>
                            <Form.Control
                                type="text"
                                value={farmer}
                                onChange={e => setFarmer(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDryRubber">
                            <Form.Label>Dry Rubber (kg)</Form.Label>
                            <Form.Control
                                type="text"
                                value={dryRubber}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="formTotalPrice">
                            <Form.Label>Total Price (THB)</Form.Label>
                            <Form.Control
                                type="text"
                                value={totalPrice}
                                readOnly
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                        <Button variant="secondary" onClick={() => setEditingEntry(null)}>Cancel</Button>
                    </Form>
                </div>
            )}

{/* <Table striped bordered hover className="mt-3"> */}
<Table striped bordered hover size="sm" className="mt-3 small" style={{ fontSize: '15px', width: '90%', margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>Farmer</th>
                        <th>น้ำหนัก(กก.)</th>
                        <th>เปอร์เซ็น(%)</th>
                        <th>ยางแห้ง(กก.)</th>
                        <th>ราคารวมทั้งหมด</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData().map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.farmer_name}</td>
                            <td>{entry.weight}</td>
                            <td>{entry.percentage}</td>
                            <td>{entry.dryRubber}</td>
                            <td>{entry.totalPrice}</td>
                            <td>
                                {/* <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleEdit(entry)}
                                >
                                    Edit
                                </Button> */}
                                {/* <Button
                                    variant="danger"
                                    className="me-2"
                                    onClick={() => handleDelete(entry.id)}
                                >
                                    Delete
                                </Button> */}
                                                        
                            {/* <Button
                            variant="secondary"
                            onClick={() => {
                                setShowPrintModal(true);  // เปิด Modal
                                setSelectedEntry(entry);  // เก็บ entry ที่ต้องการพิมพ์
                            }}
                            className="icon-button"
                        >
                            <i className="bi bi-printer"></i> 
                        </Button> */}


                                {/* <Button variant="primary" className="mt-3" onClick={() => setShowPrintModal(true)}>พิมพ์</Button> */}
                    <IconButton     style={{color: '#a1702b',border: '2px solid #a1702b',borderRadius: '10px',width: '30px',height: '40px' }}onClick={() => {setSelectedEntry(entry);setShowPrintModal(true);}}>
                            <PrintIcon />
                    </IconButton>


                  <IconButton style={{ color: 'red', border: '2px solid red',borderRadius: '10px',width: '30px', height: '40px',marginLeft: '10px' }}  onClick={() => {const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?");
        if (confirmDelete) {
            handleDelete(entry.id);
        }
    }}>
                    <Delete />
                  </IconButton>
                


                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)} size="lg" >
                    <Modal.Header closeButton>
                        <Modal.Title>ผลลัพธ์การคำนวณ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div id="printableContent">
                            <h6>ผลลัพธ์การคำนวณ</h6>
                            <p>วันที่: {selectedEntry?.date}</p>
                            <p>ราคารับซื้อวันนี้: {selectedEntry?.price}</p>
                            <p>ชื่อเกษตรกร: {selectedEntry?.farmer_name}</p>
                            <p>น้ำหนัก: {selectedEntry?.weight} กก.</p>
                            <p>เปอร์เซ็น: {selectedEntry?.percentage}%</p>
                            <p>ยางแห้ง: {selectedEntry?.dryRubber} กก.</p>
                            <p>ราคารวมทั้งหมด: {selectedEntry?.totalPrice} บาท</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPrintModal(false)}>
                            ปิด
                        </Button>
                        <Button variant="primary" onClick={() => handlePrint(selectedEntry)}>
                            พิมพ์
                        </Button>
                    </Modal.Footer>
                </Modal>
        {/* </Container> */}
        </Col>
        </Row>
        </Container>
        </div>
    );
}

