// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Table, Navbar, Nav, Dropdown } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';

// export default function แสดงข้อมูลสวนยางพารา() {
//     const location = useLocation();
//     const [plantationData, setPlantationData] = useState([]);

//     // Fetching plantation data from the API
//     useEffect(() => {
//         fetch('http://localhost:8080/api/getRubberPlantData')
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);  // เพิ่มบรรทัดนี้
//                 setPlantationData(data);
//             })

//             .catch((error) => console.error('Error fetching plantation data:', error));
//     }, []);

//     return (
//         <div style={{ backgroundColor: '#E0E0E0' }}>
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand>แสดงข้อมูลสวนยางพารา</Navbar.Brand>
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

//             <Container fluid>
//                 <Row>
//                     <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//                         <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//                             <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/FarmerHome' ? 'active' : ''}`}>
//                                 หน้าแรก
//                             </Nav.Link>
//                             <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>
//                                 ข้อมูลการขายน้ำยางพารา
//                             </Nav.Link>
//                             <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>
//                                 จัดการข้อมูลสวนยางพารา
//                             </Nav.Link>
//                             <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>
//                                 ค้นหาสถานที่รับซื้อ
//                             </Nav.Link>
//                             <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>
//                                 แสดงข้อมูลสวนยางพารา
//                             </Nav.Link>
//                         </Nav>
//                     </Col>

//                     <Col xs={10} style={{ padding: '0px' }}>
//                         <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ข้อมูลสวนยางพารา</h5>
//                         </div>

//                         <Container className="mt-4">
//                             {plantationData.length > 0 ? (
//                                 <Table striped bordered hover>
//                                     <thead>
//                                         <tr>
//                                             <th>บ้านเลขที่</th>
//                                             <th>farmer_id</th>
//                                             <th>หมู่ที่</th>
//                                             <th>ตำบล</th>
//                                             <th>อำเภอ</th>
//                                             <th>จังหวัด</th>
//                                             {/* <th>พื้นที่</th> */}
//                                             <th>อายุยางพารา</th>
//                                             {/* <th>วันที่ใส่ปุ๋ย</th>
//                                             <th>ชนิดของปุ๋ย</th> */}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {plantationData.map((plantation, index) => (
//                                             <tr key={index}>
//                                                 <td>{plantation.HouseNo}</td>
//                                                 <td>{plantation.farmer_id}</td>
//                                                 <td>{plantation.VillageNo}</td>
//                                                 <td>{plantation.Tambon}</td>
//                                                 <td>{plantation.SubArea}</td>
//                                                 <td>{plantation.Province}</td>
//                                                 {/* <td>{plantation.RubberArea}</td> */}
//                                                 <td>{plantation.RubberAge}</td>
//                                                 {/* <td>{plantation.fertilizeDate}</td>
//                                                 <td>{plantation.fertilizerType}</td> */}
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             ) : (
//                                 <p>ไม่มีข้อมูลสวนยางพาราที่จะแสดง</p>
//                             )}
//                         </Container>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }











// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Table, Navbar, Nav, Dropdown } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';

// export default function แสดงข้อมูลสวนยางพารา() {
//     const location = useLocation();
//     const [plantationData, setPlantationData] = useState([]);
    
//     // เปลี่ยนค่า farmerId ให้ตรงกับ farmer_id ของผู้ใช้ที่ล็อกอิน
//     const farmerId = 'F0005'; 

//     // Fetching plantation data from the API
//     useEffect(() => {
//         fetch('http://localhost:8080/api/getRubberPlantData')
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);  // เพิ่มบรรทัดนี้
//                 setPlantationData(data);
//             })
//             .catch((error) => console.error('Error fetching plantation data:', error));
//     }, []);

//     // กรองข้อมูลให้แสดงเฉพาะ farmer_id ที่ล็อกอินอยู่
//     const filteredData = plantationData.filter(plantation => plantation.farmer_id === farmerId);

//     return (
//         <div style={{ backgroundColor: '#E0E0E0' }}>
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     {/* <Navbar.Brand>แสดงข้อมูลสวนยางพารา</Navbar.Brand> */}
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
//                             <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/FarmerHome' ? 'active' : ''}`}>
//                                 หน้าแรก
//                             </Nav.Link>
//                             <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>
//                                 ข้อมูลการขายน้ำยางพารา
//                             </Nav.Link>
//                             <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>
//                                 จัดการข้อมูลสวนยางพารา
//                             </Nav.Link>
//                             <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>
//                                 ค้นหาสถานที่รับซื้อ
//                             </Nav.Link>
//                             <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>
//                                 แสดงข้อมูลสวนยางพารา
//                             </Nav.Link>
//                         </Nav>
//                     </Col>

//                     <Col xs={10} style={{ padding: '0px' }}>
//                         <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ข้อมูลสวนยางพารา</h5>
//                         </div>

//                         <Container className="mt-4">
//                             {filteredData.length > 0 ? (
//                                 <Table striped bordered hover>
//                                     <thead>
//                                         <tr>
//                                             <th>บ้านเลขที่</th>
//                                             <th>farmer_id</th>
//                                             <th>หมู่ที่</th>
//                                             <th>ตำบล</th>
//                                             <th>อำเภอ</th>
//                                             <th>จังหวัด</th>
//                                             {/* <th>พื้นที่</th> */}
//                                             <th>อายุยางพารา</th>
//                                             {/* <th>วันที่ใส่ปุ๋ย</th>
//                                             <th>ชนิดของปุ๋ย</th> */}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredData.map((plantation, index) => (
//                                             <tr key={index}>
//                                                 <td>{plantation.HouseNo}</td>
//                                                 <td>{plantation.farmer_id}</td>
//                                                 <td>{plantation.VillageNo}</td>
//                                                 <td>{plantation.Tambon}</td>
//                                                 <td>{plantation.SubArea}</td>
//                                                 <td>{plantation.Province}</td>
//                                                 {/* <td>{plantation.RubberArea}</td> */}
//                                                 <td>{plantation.RubberAge}</td>
//                                                 {/* <td>{plantation.fertilizeDate}</td>
//                                                 <td>{plantation.fertilizerType}</td> */}
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             ) : (
//                                 <p>ไม่มีข้อมูลสวนยางพาราที่จะแสดง</p>
//                             )}
//                         </Container>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }







// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Table, Navbar, Nav, Dropdown } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';

// export default function แสดงข้อมูลสวนยางพารา() {
//     const location = useLocation();
//     const [plantationData, setPlantationData] = useState([]);

//     // ดึงค่า farmerId จาก state ที่ส่งมาจากหน้าเข้าสู่ระบบ
//     const farmerId = location.state?.farmerId || localStorage.getItem('farmer_id'); // ใช้ localStorage เป็นทางเลือก

//     // Fetching plantation data from the API
//     useEffect(() => {
//         fetch(`http://localhost:8080/api/getRubberPlantData/${farmerId}`) // เพิ่ม farmerId เข้าไปใน URL
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log('ข้อมูลสวนยางพาราที่ดึงมา:', data);
//                 setPlantationData(data);
//             })
//             .catch((error) => console.error('Error fetching plantation data:', error));
//     }, [farmerId]);
    

//     return (
//         <div style={{ backgroundColor: '#E0E0E0' }}>
//             <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand>แสดงข้อมูลสวนยางพารา</Navbar.Brand>
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

//             <Container fluid>
//                 <Row>
//                     <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//                         <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//                             <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/FarmerHome' ? 'active' : ''}`}>
//                                 หน้าแรก
//                             </Nav.Link>
//                             <Nav.Link href="ข้อมูลการขายน้ำยางพารา" className={`text-white ${location.pathname === '/ข้อมูลการขายน้ำยางพารา' ? 'active' : ''}`}>
//                                 ข้อมูลการขายน้ำยางพารา
//                             </Nav.Link>
//                             <Nav.Link href="จัดการข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/จัดการข้อมูลสวนยางพารา' ? 'active' : ''}`}>
//                                 จัดการข้อมูลสวนยางพารา
//                             </Nav.Link>
//                             <Nav.Link href="ค้นหาสถานที่รับซื้อ" className={`text-white ${location.pathname === '/ค้นหาสถานที่รับซื้อ' ? 'active' : ''}`}>
//                                 ค้นหาสถานที่รับซื้อ
//                             </Nav.Link>
//                             <Nav.Link href="แสดงข้อมูลสวนยางพารา" className={`text-white ${location.pathname === '/แสดงข้อมูลสวนยางพารา' ? 'active' : ''}`}>
//                                 แสดงข้อมูลสวนยางพารา
//                             </Nav.Link>
//                         </Nav>
//                     </Col>

//                     <Col xs={10} style={{ padding: '0px' }}>
//                         <div style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//                             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ข้อมูลสวนยางพารา</h5>
//                         </div>

//                         <Container className="mt-4">
//                             {plantationData.length > 0 ? (
//                                 <Table striped bordered hover>
//                                     <thead>
//                                         <tr>
//                                             <th>บ้านเลขที่</th>
//                                             <th>farmer_id</th>
//                                             <th>หมู่ที่</th>
//                                             <th>ตำบล</th>
//                                             <th>อำเภอ</th>
//                                             <th>จังหวัด</th>
//                                             <th>พื้นที่</th>
//                                             <th>อายุยางพารา</th>
//                                             <th>วันที่ใส่ปุ๋ย</th>
//                                             <th>ชนิดของปุ๋ย</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {plantationData.map((plantation, index) => (
//                                             <tr key={index}>
//                                                 <td>{plantation.HouseNo}</td>
//                                                 <td>{plantation.farmer_id}</td>
//                                                 <td>{plantation.VillageNo}</td>
//                                                 <td>{plantation.Tambon}</td>
//                                                 <td>{plantation.SubArea}</td>
//                                                 <td>{plantation.Province}</td>
//                                                 <td>{plantation.RubberArea}</td>
//                                                 <td>{plantation.RubberAge}</td>
//                                                 <td>{plantation.fertilizeDate}</td>
//                                                 <td>{plantation.fertilizerType}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             ) : (
//                                 <p>ไม่มีข้อมูลสวนยางพาราที่จะแสดง</p>
//                             )}
//                         </Container>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function แสดงข้อมูลสวนยางพารา() {
    const location = useLocation();
    // const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [farmerId, setFarmerId] = useState(null);
    const [plantationData, setPlantationData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('user_id');

    // Fetch Farmer ID based on user ID
    useEffect(() => {
        if (!userId) {
            setError('User ID not found in localStorage');
            setLoading(false);
            return;
        }

        const fetchFarmerId = async () => {
            setLoading(true);
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

    // Fetch Plantation Data based on Farmer ID
    useEffect(() => {
        fetch(`http://localhost:8080/api/getRubberPlantData/${farmerId}`) // เพิ่ม farmerId เข้าไปใน URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('ข้อมูลสวนยางพาราที่ดึงมา:', data);
                setPlantationData(data);
            })
            .catch((error) => console.error('Error fetching plantation data:', error));
    }, [farmerId]);
    

    return (
        <div style={{ backgroundColor: '#E0E0E0' }}>
            <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>แสดงข้อมูลสวนยางพารา</Navbar.Brand>
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link href="#contact">ติดต่อเรา</Nav.Link>
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

            <Container fluid>
                <Row>
                    <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
                        <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
                            <Nav.Link href="FarmerHome" className={`text-white ${location.pathname === '/FarmerHome' ? 'active' : ''}`}>
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
                            <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>ข้อมูลสวนยางพารา</h5>
                        </div>

                        <Container className="mt-4">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            {plantationData.length > 0 ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>farmer_id</th>
                                            {/* <th>บ้านเลขที่</th> */}
                                            <th>ชื่อสวนยาง</th>
                                            <th>หมู่ที่</th>
                                            <th>ตำบล</th>
                                            <th>อำเภอ</th>
                                            <th>จังหวัด</th>
                                            <th>พื้นที่</th>
                                            <th>อายุยางพารา</th>
                                            {/* <th>วันที่ใส่ปุ๋ย</th>
                                            <th>ชนิดของปุ๋ย</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plantationData.map((plantation, index) => (
                                            <tr key={index}>
                                                <td>{plantation.farmer_id}</td>
                                                <td>{plantation.HouseNo}</td>
                                                <td>{plantation.VillageNo}</td>
                                                <td>{plantation.Tambon}</td>
                                                <td>{plantation.SubArea}</td>
                                                <td>{plantation.Province}</td>
                                                <td>{plantation.RubberArea}</td>
                                                <td>{plantation.RubberAge}</td>
                                                {/* <td>{plantation.fertilizeDate}</td>
                                                <td>{plantation.fertilizerType}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                !loading && <p>ไม่มีข้อมูลสวนยางพาราที่จะแสดง</p>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
