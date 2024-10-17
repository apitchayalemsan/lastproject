// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, Navbar, Nav, Dropdown } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';


// export default function จัดการข้อมูลสวนยางพารา() {
//     const location = useLocation();

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === 'rubberAge') {
//             // คำนวณจำนวนปีที่ปลูกจากปีที่เลือก
//             const currentYear = new Date().getFullYear() + 543; // ปีปัจจุบันใน พ.ศ.
//             const years = currentYear - value; // จำนวนปีที่ปลูก
//             setFormData(prevData => ({
//                 ...prevData,
//                 rubberAge: value,
//                 rubberAgeYears: years // เก็บจำนวนปีที่ปลูก
//             }));
//         } else {
//             setFormData(prevData => ({
//                 ...prevData,
//                 [name]: value
//             }));
//         }
//     };

//     // State สำหรับเก็บค่าจากฟอร์ม
//     const [formData, setFormData] = useState({
//         houseNo: '',
//         villageNo: '',
//         tambon: '',
//         subArea: '',
//         province: '',
//         rubberArea: '',
//         rubberAge: '',
//         fertilizeDate: '',
//         fertilizerType: '',

//         rubberAge: '',
//         rubberAgeYears: 0 // สถานะใหม่สำหรับเก็บจำนวนปี
//     });

//     const [fertilizers, setFertilizers] = useState([]);

//     // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงในฟอร์ม
//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setFormData((prevData) => ({
//     //         ...prevData,
//     //         [name]: value,
//     //     }));
//     // };

//     // ดึงข้อมูลชนิดของปุ๋ยจากดาต้าเบส
//     useEffect(() => {
//         fetch('http://localhost:8080/api/getFertilizers')
//             .then((response) => response.json())
//             .then((data) => setFertilizers(data))
//             .catch((error) => console.error('Error fetching fertilizers:', error));
//     }, []);

    // // ฟังก์ชันสำหรับบันทึกข้อมูล
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // ส่งข้อมูลไปยัง API ของคุณ
    //     fetch('http://localhost:8080/api/saveRubberPlantData', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             alert('บันทึกข้อมูลสำเร็จ');
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };

//     return (
//         <div style={{ backgroundColor: '#E0E0E0' }}>
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand></Navbar.Brand>
//                     <Nav className="me-auto"></Nav>
//                     <Nav>
//                         {/* <Nav.Link href="#contact">ติดต่อเรา</Nav.Link> */}
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

//             <Container fluid>
//                 <Row>            
//                     <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
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

//                     <Col xs={10} style={{ padding: '0px' }}>
//                         <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>จัดการข้อมูลสวนยางพารา</h5>
//                         </div>

//                         <Container className="mt-4">
//                             <div className="p-4 mb-4" style={{ backgroundColor: '#D3D3D3', borderRadius: '10px' }}>
//                                 <h6 style={{ backgroundColor: '#5F4B3B', color: '#FFFFFF', padding: '10px', textAlign: 'center' }}>ข้อมูลสวนยางพารา</h6>
//                                 <Form onSubmit={handleSubmit}>
//                                     <Form.Group as={Row} className="mb-3" controlId="formHouseNo">
//                                         <Form.Label column sm="3">บ้านเลขที่</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="houseNo"
//                                                 value={formData.houseNo}
//                                                 onChange={handleChange}
//                                                 placeholder="ระบุบ้านเลขที่"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     <Form.Group as={Row} className="mb-3" controlId="formVillageNo">
//                                         <Form.Label column sm="3">หมู่ที่</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="villageNo"
//                                                 value={formData.villageNo}
//                                                 onChange={handleChange}
//                                                 placeholder="ระบุหมู่ที่"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     <Form.Group as={Row} className="mb-3" controlId="formTambon">
//                                         <Form.Label column sm="3">ตำบล</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="tambon"
//                                                 value={formData.tambon}
//                                                 onChange={handleChange}
//                                                 placeholder="ระบุตำบล"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     <Form.Group as={Row} className="mb-3" controlId="formSubArea">
//                                         <Form.Label column sm="3">อำเภอ</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="subArea"
//                                                 value={formData.subArea}
//                                                 onChange={handleChange}
//                                                 placeholder="ระบุอำเภอ"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     <Form.Group as={Row} className="mb-3" controlId="formProvince">
//                                         <Form.Label column sm="3">จังหวัด</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="province"
//                                                 value={formData.province}
//                                                 onChange={handleChange}
//                                                 placeholder="ระบุจังหวัด"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     <Form.Group as={Row} className="mb-3" controlId="formRubberArea">
//                                         <Form.Label column sm="3">พื้นที่</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="rubberArea"
//                                                 value={formData.rubberArea}
//                                                 onChange={handleChange}
//                                                 placeholder="พื้นที่"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     <Form.Group as={Row} className="mb-3" controlId="formRubberAge">
//                                         <Form.Label column sm="3">อายุยางพารา</Form.Label>
//                                         <Col sm="9">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="rubberAge"
//                                                 value={formData.rubberAge}
//                                                 onChange={handleChange}
//                                                 placeholder="ระบุอายุยางพารา"
//                                             />
//                                         </Col>
//                                     </Form.Group>

//                                     {/* <Form>
//                                                 <Form.Group as={Row} className="mb-3" controlId="formRubberAge">
//                                                     <Form.Label column sm="3">ปีที่ปลูก</Form.Label>
//                                                     <Col sm="9">
//                                                         <Form.Select
//                                                             name="rubberAge"
//                                                             value={formData.rubberAge}
//                                                             onChange={handleChange}
//                                                         >
//                                                             <option value="">เลือกปีที่ปลูก</option>
                                                            
//                                                             {Array.from({ length: 200 }, (_, index) => {
//                                                                 const year = new Date().getFullYear() + 543 - index; 
//                                                                 return (
//                                                                     <option key={year} value={year}>
//                                                                         {year}
//                                                                     </option>
//                                                                 );
//                                                             })}
//                                                         </Form.Select>
//                                                     </Col>
//                                                 </Form.Group>
                                                
//                                                 <Form.Group as={Row} className="mb-3">
//                                                     <Form.Label column sm="3">จำนวนปีที่ปลูก</Form.Label>
//                                                     <Col sm="9">
//                                                         <Form.Control
//                                                             type="text"
//                                                             value={formData.rubberAgeYears}
//                                                             readOnly 
//                                                         />
//                                                     </Col>
//                                                 </Form.Group>
//                                             </Form> */}


//                                     {/* Section 2: ข้อมูลการใส่ปุ๋ย */}
//                                     <div className="p-4" style={{ backgroundColor: '#A9A9A9', borderRadius: '10px' }}>
//                                         <h6 style={{ backgroundColor: '#5F4B3B', color: '#FFFFFF', padding: '10px', textAlign: 'center' }}>ข้อมูลการใส่ปุ๋ย</h6>
//                                         <Form.Group as={Row} className="mb-3" controlId="formFertilizeDate">
//                                             <Form.Label column sm="3">วันที่ใส่ปุ๋ย</Form.Label>
//                                             <Col sm="9">
//                                                 <Form.Control
//                                                     type="date"
//                                                     name="fertilizeDate"
//                                                     value={formData.fertilizeDate}
//                                                     onChange={handleChange}
//                                                 />
//                                             </Col>
//                                         </Form.Group>

//                                         <Form.Group as={Row} className="mb-3" controlId="formFertilizerType">
//                                             <Form.Label column sm="3">ชนิดของปุ๋ย</Form.Label>
//                                             <Col sm="9">
//                                                 <Form.Control
//                                                     as="select"
//                                                     name="fertilizerType"
//                                                     value={formData.Type_Fertilize}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">เลือกชนิดของปุ๋ย</option>
//                                                     {fertilizers.map((fertilizer, index) => (
//                                                         <option key={index} value={fertilizer.FertilizeID}>
//                                                             {fertilizer.Type_Fertilize}
//                                                         </option>
//                                                     ))}
//                                                 </Form.Control>
//                                             </Col>
//                                         </Form.Group>
//                                     </div>

//                                     <div className="text-center mt-3">
//                                         <Button type="submit" variant="primary">บันทึก</Button>
//                                     </div>
//                                 </Form>
//                             </div>
//                         </Container>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }














import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function จัดการข้อมูลสวนยางพารา() {
    const location = useLocation();
    const [farmerId, setFarmerId] = useState(null);
    const [formData, setFormData] = useState({
        houseNo: '',
        villageNo: '',
        tambon: '',
        subArea: '',
        province: '',
        rubberArea: '',
        rubberAge: '',
        fertilizeDate: '',
        fertilizerType: '',
        rubberAgeYears: 0
    });
    const [fertilizers, setFertilizers] = useState([]);
    const [error, setError] = useState('');
    const userId = localStorage.getItem('user_id');

    // Fetch farmer ID based on userId
    useEffect(() => {
        if (!userId) {
            setError('User ID not found in localStorage');
            return;
        }
        const fetchFarmerId = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/getFarmerId', { params: { userId } });
                setFarmerId(response.data[0]?.farmer_id || null);
            } catch {
                setError('Error fetching farmer ID');
            }
        };
        fetchFarmerId();
    }, [userId]);

    // Fetch fertilizer options
    useEffect(() => {
        const fetchFertilizers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/getFertilizers');
                setFertilizers(response.data);
            } catch {
                console.error('Error fetching fertilizers');
            }
        };
        fetchFertilizers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'selectedYear') {
            const currentYear = new Date().getFullYear() + 543;
            const plantingYear = value;
            const years = currentYear - plantingYear; // Calculate the age of the rubber trees
            setFormData(prev => ({
                ...prev,
                selectedYear: plantingYear,  // Store the selected year for display
                rubberAge: years              // Store the calculated age for saving
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const payload = { farmerId, ...formData };
    //     axios.post('http://localhost:8080/api/saveRubberPlantData', payload)
    //         .then(() => alert('บันทึกข้อมูลสำเร็จ'))
    //         .catch(() => setError('Error saving rubber plantation data'));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { farmerId, ...formData };
        
        console.log('Submitting data:', payload); // Log the payload for debugging
        
        fetch('http://localhost:8080/api/saveRubberPlantData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // แปลง payload เป็น JSON ก่อนส่ง
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error saving rubber plantation data, status: ' + response.status);
            }
            return response.json(); // แปลง response เป็น JSON
        })
        .then(() => {
            alert('บันทึกข้อมูลสำเร็จ');
            // คุณสามารถ reset form หรือทำ action อื่นๆ ได้ตามต้องการ
        })
        .catch((error) => {
            console.error('Error saving rubber plantation data:', error); // Log the error for debugging
            setError('Error saving rubber plantation data');
        });
    };
    

    // // ฟังก์ชันสำหรับบันทึกข้อมูล
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const payload = { farmerId, ...formData };
        
    //     console.log('Submitting data:', payload); // Log the payload for debugging

    //     // ส่งข้อมูลไปยัง API ของคุณ
    //     fetch('http://localhost:8080/api/saveRubberPlantData', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             alert('บันทึกข้อมูลสำเร็จ');
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };
    

    return (
        <div style={{ backgroundColor: '#E0E0E0' }}>
            <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <Container>
                    <Navbar.Brand></Navbar.Brand>
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary">เกษตรกร</Dropdown.Toggle>
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
                        <Nav className="flex-column p-3" activeKey={location.pathname}>
                            <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}>
                                หน้าแรก
                            </Nav.Link>
                            <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>
                                ข้อมูลการขายน้ำยางพารา
                            </Nav.Link>
                            <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>
                                จัดการข้อมูลสวนยางพารา
                            </Nav.Link>
                            <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>
                                ค้นหาสถานที่รับซื้อ
                            </Nav.Link>
                            <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>
                                แสดงข้อมูลสวนยางพารา
                            </Nav.Link>
                        </Nav>
                    </Col>

                    <Col xs={10} style={{ padding: '0px' }}>
                        <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
                            <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>จัดการข้อมูลสวนยางพารา</h5>
                        </div>

                        <Container className="mt-4">
                            <div className="p-4 mb-4" style={{ backgroundColor: '#D3D3D3', borderRadius: '10px' }}>
                                <h6 style={{ backgroundColor: '#5F4B3B', color: '#FFFFFF', padding: '10px', textAlign: 'center' }}>ข้อมูลสวนยางพารา</h6>
                                <Form onSubmit={handleSubmit}>
                                    {/* Form fields */}
                                    <Form.Group as={Row} className="mb-3" controlId="formHouseNo">
                                        <Form.Label column sm="3">บ้านเลขที่</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="ระบุบ้านเลขที่" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formVillageNo">
                                        <Form.Label column sm="3">หมู่ที่</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="villageNo" value={formData.villageNo} onChange={handleChange} placeholder="ระบุหมู่ที่" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formTambon">
                                        <Form.Label column sm="3">ตำบล</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="tambon" value={formData.tambon} onChange={handleChange} placeholder="ระบุตำบล" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formSubArea">
                                        <Form.Label column sm="3">อำเภอ</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="subArea" value={formData.subArea} onChange={handleChange} placeholder="ระบุอำเภอ" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formProvince">
                                        <Form.Label column sm="3">จังหวัด</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="province" value={formData.province} onChange={handleChange} placeholder="ระบุจังหวัด" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formRubberArea">
                                        <Form.Label column sm="3">พื้นที่สวนยาง (ไร่)</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="rubberArea" value={formData.rubberArea} onChange={handleChange} placeholder="ระบุพื้นที่สวนยาง" />
                                        </Col>
                                    </Form.Group>
                                    {/* <Form.Group as={Row} className="mb-3" controlId="formRubberAge">
                                        <Form.Label column sm="3">ปีที่ปลูกยาง</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" name="rubberAge" value={formData.rubberAge} onChange={handleChange} placeholder="ระบุปีที่ปลูกยาง" />
                                        </Col>
                                    </Form.Group> */}
                                    <Form.Group as={Row} className="mb-3" controlId="formRubberAge">
                                        <Form.Label column sm="3">ปีที่ปลูกยาง</Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                as="select"
                                                name="selectedYear"
                                                value={formData.selectedYear}  // Use selectedYear for displaying the selected year
                                                onChange={handleChange}
                                            >
                                                <option value="">เลือกปีที่ปลูกยาง</option>
                                                {Array.from({ length: 100 }, (_, index) => {
                                                    const year = new Date().getFullYear() + 543 - index;
                                                    return (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    {/* <Form.Group as={Row} className="mb-3" controlId="formFertilize_Date">
                                        <Form.Label column sm="3">วันที่ใส่ปุ๋ย</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="date" name="Fertilize_Date" value={formData.Fertilize_Date} onChange={handleChange} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formFertilizerType">
                                        <Form.Label column sm="3">ประเภทปุ๋ย</Form.Label>
                                        <Col sm="9">
                                            <Form.Control as="select" name="fertilizerType" value={formData.fertilizerType} onChange={handleChange}>
                                                <option value="">เลือกประเภทปุ๋ย</option>
                                                {fertilizers.map(fertilizer => (
                                                    <option key={fertilizer.FertID} value={fertilizer.Type_Fertilize}>{fertilizer.Type_Fertilize}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group> */}
                                   <Button 
                                    variant="primary" 
                                    type="submit" 
                                    style={{ display: 'block', width: '200px', margin: '0 auto' }}>
                                    บันทึกข้อมูล
                                </Button>
                                </Form>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
}
