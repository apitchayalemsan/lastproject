import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form ,Dropdown} from 'react-bootstrap';
import './Profile.css'; // Import CSS สำหรับการปรับแต่งเพิ่มเติม
import { BiCog } from 'react-icons/bi';

export default function Profile() {
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        role: '',
        id: '' // รหัสเกษตรกรหรือรหัสผู้รับซื้อ
    });

    const [showModal, setShowModal] = useState(false); // สถานะการแสดง Modal
    const [farmerData, setFarmerData] = useState({
        farmer_id: '',
        first_name: '',
        last_name: '',
        nickname: '', // เพิ่มชื่อเล่น
        phone_number: '',
        email: '',
        address: '',
        province: '',
        postal_code: '',
    });

    // ดึงข้อมูลโปรไฟล์จาก localStorage
    useEffect(() => {
        const firstName = localStorage.getItem('first_name');
        const lastName = localStorage.getItem('last_name');
        const roleId = localStorage.getItem('role_id');
        const farmer_id = localStorage.getItem('farmer_id'); // ดึง farmer_id
        const buyer_id = localStorage.getItem('buyer_id'); // ดึง buyer_id (สมมุติว่ามี)

        const id = roleId === '1' ? buyer_id : farmer_id;
        const role = roleId === '1' ? 'Buyer' : 'Farmer';

        setUserProfile({
            firstName,
            lastName,
            role,
            id
        });
    }, []);

    const handleShowModal = () => {
        setShowModal(true); // เปิด Modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // ปิด Modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFarmerData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // ฟังก์ชันบันทึกข้อมูลเกษตรกร พร้อมส่ง user_id ด้วย
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user_id = localStorage.getItem('user_id'); // ดึง user_id จาก localStorage

        const updatedFarmerData = {
            ...farmerData,
            user_id: user_id, // เพิ่ม user_id เข้าไปในข้อมูลที่ส่ง
            name: `${farmerData.first_name} ${farmerData.last_name}` // สร้าง name จาก first_name และ last_name
        };

        try {
            const response = await fetch('http://localhost:8080/api/farmers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFarmerData), // ส่งข้อมูลเกษตรกรในรูปแบบ JSON
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Farmer data saved:', data);
                handleCloseModal(); // ปิด Modal หลังจากบันทึก
                // อาจอัปเดตสถานะหรือรีเซ็ตข้อมูลฟอร์มที่นี่
            } else {
                console.error('Error saving farmer data:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

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
        {userProfile.role === 'Farmer' ? (
            <Dropdown.Item href="/farmerHome">หน้าแรก</Dropdown.Item>
        ) : (
            <Dropdown.Item href="/home">หน้าแรก</Dropdown.Item>
        )}
        <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

        </nav>
            <Row className="justify-content-center" style={{padding:'30px'}}>
                <Col md={6}>
                    <Card className="profile-card shadow-lg">
                        <Card.Body>
                            <div className="text-center">
                                <img 
                                    src="https://via.placeholder.com/150" 
                                    alt="User Profile" 
                                    className="profile-img rounded-circle mb-3"
                                />
                                <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                                <p className="text-muted">{userProfile.role}</p>
                            </div>
                            <hr />
                            <div className="profile-info">
                                <p><strong>ชื่อ:</strong> {userProfile.firstName}</p>
                                <p><strong>นามสกุล:</strong> {userProfile.lastName}</p>
                                <p><strong>บทบาท:</strong> {userProfile.role}</p>
                            </div>
                            {/* <Button 
                                variant="primary" 
                                onClick={handleShowModal}
                                style={{ display: userProfile.role === 'Farmer' ? 'block' : 'none' }} // แสดงปุ่มเฉพาะเกษตรกร
                            >
                                จัดการข้อมูลเกษตรกร
                            </Button> */}

                            <Button 
                                // variant="primary" 
                                onClick={handleShowModal}
                                style={{
                                    background:'#997950',
                                    // display: userProfile.role === 'Farmer' ? 'block' : 'none',
                                     
                                    fontSize: '16px', 
                                    fontWeight: 'bold', 
                                    padding: '15px 20px', 
                                    display: userProfile.role === 'Farmer' ? 'block' : 'none' 
                                }} 
                            >
                                <BiCog style={{ marginRight: '5px' }} /> {/* Settings icon */}
                                จัดการข้อมูลเกษตรกร
                            </Button>

                            {/* Modal สำหรับจัดการข้อมูลเกษตรกร */}
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>จัดการข้อมูลเกษตรกร</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit}>
                                        {/* <Form.Group controlId="farmer_id">
                                            <Form.Label>รหัสเกษตรกร</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="farmer_id" 
                                                value={farmerData.farmer_id}
                                                onChange={handleInputChange} 
                                                required 
                                            />
                                        </Form.Group> */}
                                        <Form.Group controlId="first_name">
                                            <Form.Label>ชื่อจริง</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="first_name" 
                                                value={farmerData.first_name}
                                                onChange={handleInputChange} 
                                                required 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="last_name">
                                            <Form.Label>นามสกุล</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="last_name" 
                                                value={farmerData.last_name}
                                                onChange={handleInputChange} 
                                                required 
                                            />
                                        </Form.Group>
                                        {/* <Form.Group controlId="nickname">
                                            <Form.Label>ชื่อเล่น</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="nickname" 
                                                value={farmerData.nickname}
                                                onChange={handleInputChange} 
                                            />
                                        </Form.Group> */}
                                        <Form.Group controlId="phone_number">
                                            <Form.Label>หมายเลขโทรศัพท์</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="phone_number" 
                                                value={farmerData.phone_number}
                                                onChange={handleInputChange} 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="email">
                                            <Form.Label>อีเมล</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                name="email" 
                                                value={farmerData.email}
                                                onChange={handleInputChange} 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="address">
                                            <Form.Label>ที่อยู่</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="address" 
                                                value={farmerData.address}
                                                onChange={handleInputChange} 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="province">
                                            <Form.Label>จังหวัด</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="province" 
                                                value={farmerData.province}
                                                onChange={handleInputChange} 
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="postal_code">
                                            <Form.Label>รหัสไปรษณีย์</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="postal_code" 
                                                value={farmerData.postal_code}
                                                onChange={handleInputChange} 
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            บันทึกข้อมูล
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        {/* </Container> */}
        </div>
    );
}
















/////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from 'react';
// import { Container, Row, Col, Card ,Button} from 'react-bootstrap';
// import './Profile.css'; // Import CSS สำหรับการปรับแต่งเพิ่มเติม

// export default function Profile() {
//     const [userProfile, setUserProfile] = useState({
//         firstName: '',
//         lastName: '',
//         role: '',
//         id: '' // รหัสเกษตรกรหรือรหัสผู้รับซื้อ
//     });

//     useEffect(() => {
//         const firstName = localStorage.getItem('first_name');
//         const lastName = localStorage.getItem('last_name');
//         const roleId = localStorage.getItem('role_id');
//         const farmer_id = localStorage.getItem('farmer_id'); // ดึง farmer_id
//         const buyer_id = localStorage.getItem('buyer_id'); // ดึง buyer_id (สมมุติว่ามี)

//         // เพิ่ม console.log เพื่อตรวจสอบค่าที่ดึงมา
//         console.log("firstName:", firstName);
//         console.log("lastName:", lastName);
//         console.log("roleId:", roleId);
//         console.log("farmer_id:", farmer_id);
//         console.log("buyer_id:", buyer_id);

//         // กำหนดค่า id ตามบทบาท
//         const id = roleId === '1' ? buyer_id : farmer_id;

//         // แปลง role_id เป็นชื่อบทบาท
//         const role = roleId === '1' ? 'Buyer' : 'Farmer'; // ถ้าต้องการเพิ่มบทบาทอื่นให้เพิ่มที่นี่

//         setUserProfile({
//             firstName,
//             lastName,
//             role,
//             id // ตั้งค่า id ตามบทบาท
//         });
//     }, []);

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-center">
//                 <Col md={6}>
//                     <Card className="profile-card shadow-lg">
//                         <Card.Body>
//                             <div className="text-center">
//                                 <img 
//                                     src="https://via.placeholder.com/150" 
//                                     alt="User Profile" 
//                                     className="profile-img rounded-circle mb-3"
//                                 />
//                                 <h3>{userProfile.firstName} {userProfile.lastName}</h3>
//                                 <p className="text-muted">{userProfile.role}</p>
//                             </div>
//                             <hr />
//                             <div className="profile-info">
//                                 <p><strong>ชื่อ:</strong> {userProfile.firstName}</p>
//                                 <p><strong>นามสกุล:</strong> {userProfile.lastName}</p>
//                                 <p><strong>บทบาท:</strong> {userProfile.role}</p>
//                                 {/* <p><strong>รหัส:</strong> {userProfile.id ? userProfile.id : 'ไม่มีข้อมูล'}</p> แสดงรหัสเกษตรกรหรือรหัสผู้รับซื้อ */}
//                             </div>
//                             <Button variant="primary" >
//                                     จัดการข้อมูลเกษตรกร
//                                 </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }








// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button, Modal, Form, Dropdown } from 'react-bootstrap';
// import './Profile.css'; // Import CSS สำหรับการปรับแต่งเพิ่มเติม
// import { BiCog } from 'react-icons/bi';

// export default function Profile() {
//     const [userProfile, setUserProfile] = useState({
//         firstName: '',
//         lastName: '',
//         role: '',
//         id: '', // รหัสเกษตรกรหรือรหัสผู้รับซื้อ
//         farmer_id: '' // เพิ่ม farmer_id
//     });

//     const [showModal, setShowModal] = useState(false); // สถานะการแสดง Modal
//     const [farmerData, setFarmerData] = useState({
//         farmer_id: '',
//         first_name: '',
//         last_name: '',
//         nickname: '', // เพิ่มชื่อเล่น
//         phone_number: '',
//         email: '',
//         address: '',
//         province: '',
//         postal_code: '',
//     });

//     // ดึงข้อมูลโปรไฟล์จาก localStorage
//     useEffect(() => {
//         const firstName = localStorage.getItem('first_name');
//         const lastName = localStorage.getItem('last_name');
//         const roleId = localStorage.getItem('role_id');
//         const farmer_id = localStorage.getItem('farmer_id'); // ดึง farmer_id
//         const buyer_id = localStorage.getItem('buyer_id'); // ดึง buyer_id (สมมุติว่ามี)

//         const id = roleId === '1' ? buyer_id : farmer_id;
//         const role = roleId === '1' ? 'Buyer' : 'Farmer';

//         setUserProfile({
//             firstName,
//             lastName,
//             role,
//             id,
//             farmer_id // ตั้งค่า farmer_id
//         });

//         // ตั้งค่า farmer_id ใน state ของฟอร์มโดยอัตโนมัติ
//         if (farmer_id) {
//             setFarmerData((prevData) => ({
//                 ...prevData,
//                 farmer_id: farmer_id // ตั้งค่า farmer_id อัตโนมัติจาก localStorage
//             }));
//         }
//     }, []);

//     const handleShowModal = () => {
//         setShowModal(true); // เปิด Modal
//     };

//     const handleCloseModal = () => {
//         setShowModal(false); // ปิด Modal
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFarmerData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     // ฟังก์ชันบันทึกข้อมูลเกษตรกร พร้อมส่ง user_id ด้วย
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const user_id = localStorage.getItem('user_id'); // ดึง user_id จาก localStorage

//         const updatedFarmerData = {
//             ...farmerData,
//             user_id: user_id, // เพิ่ม user_id เข้าไปในข้อมูลที่ส่ง
//             name: `${farmerData.first_name} ${farmerData.last_name}` // สร้าง name จาก first_name และ last_name
//         };

//         try {
//             const response = await fetch('http://localhost:8080/api/farmers', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updatedFarmerData), // ส่งข้อมูลเกษตรกรในรูปแบบ JSON
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Farmer data saved:', data);
//                 handleCloseModal(); // ปิด Modal หลังจากบันทึก
//                 // อาจอัปเดตสถานะหรือรีเซ็ตข้อมูลฟอร์มที่นี่
//             } else {
//                 console.error('Error saving farmer data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Network error:', error);
//         }
//     };

//     return (
//         <div>
//             <nav className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//                 <button type="button" className="btn btn-secondary btn-lg ms-auto">ติดต่อเรา</button>
//                 <Dropdown align="end">
//                     <Dropdown.Toggle
//                         as="a"
//                         href="#"
//                         variant="secondary"
//                         id="dropdown-basic"
//                         className="bi bi-person-circle"
//                         style={{ color: 'black', fontSize: '40px', marginInline: '30px' }}
//                     >
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                         {userProfile.role === 'Farmer' ? (
//                             <Dropdown.Item href="/farmerHome">หน้าแรก</Dropdown.Item>
//                         ) : (
//                             <Dropdown.Item href="/home">หน้าแรก</Dropdown.Item>
//                         )}
//                         <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </nav>
//             <Row className="justify-content-center" style={{ padding: '30px' }}>
//                 <Col md={6}>
//                     <Card className="profile-card shadow-lg">
//                         <Card.Body>
//                             <div className="text-center">
//                                 <img 
//                                     src="https://via.placeholder.com/150" 
//                                     alt="User Profile" 
//                                     className="profile-img rounded-circle mb-3"
//                                 />
//                                 <h3>{userProfile.firstName} {userProfile.lastName}</h3>
//                                 <p className="text-muted">{userProfile.role}</p>
//                             </div>
//                             <hr />
//                             <div className="profile-info">
//                                 <p><strong>ชื่อ:</strong> {userProfile.firstName}</p>
//                                 <p><strong>นามสกุล:</strong> {userProfile.lastName}</p>
//                                 <p><strong>บทบาท:</strong> {userProfile.role}</p>
//                                 <p><strong>รหัสเกษตรกร:</strong> {userProfile.farmer_id}</p> {/* แสดงรหัสเกษตรกร */}
//                                 <p><strong>รหัสผู้ใช้:</strong> {localStorage.getItem('user_id') || ''}</p> {/* แสดง user_id */}
//                             </div>

//                             <Button 
//                                 onClick={handleShowModal}
//                                 style={{
//                                     background: '#997950',
//                                     fontSize: '16px', 
//                                     fontWeight: 'bold', 
//                                     padding: '15px 20px', 
//                                     display: userProfile.role === 'Farmer' ? 'block' : 'none' 
//                                 }} 
//                             >
//                                 <BiCog style={{ marginRight: '5px' }} /> {/* Settings icon */}
//                                 จัดการข้อมูลเกษตรกร
//                             </Button>

//                             {/* Modal สำหรับจัดการข้อมูลเกษตรกร */}
//                             <Modal show={showModal} onHide={handleCloseModal}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>จัดการข้อมูลเกษตรกร</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <Form onSubmit={handleSubmit}>
//                                         <Form.Group controlId="farmer_id">
//                                             <Form.Label>รหัสเกษตรกร</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="farmer_id" 
//                                                 value={farmerData.farmer_id} // ค่า farmer_id จะแสดงอัตโนมัติ
//                                                 onChange={handleInputChange} 
//                                                 readOnly // ล็อกฟิลด์นี้เพื่อให้ผู้ใช้ไม่สามารถแก้ไขได้
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="user_id">
//                                             <Form.Label>รหัสผู้ใช้</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 value={localStorage.getItem('user_id') || ''} // แสดง user_id จาก localStorage
//                                                 readOnly 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="first_name">
//                                             <Form.Label>ชื่อจริง</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="first_name" 
//                                                 value={farmerData.first_name}
//                                                 onChange={handleInputChange} 
//                                                 required 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="last_name">
//                                             <Form.Label>นามสกุล</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="last_name" 
//                                                 value={farmerData.last_name}
//                                                 onChange={handleInputChange} 
//                                                 required 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="phone_number">
//                                             <Form.Label>หมายเลขโทรศัพท์</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="phone_number" 
//                                                 value={farmerData.phone_number}
//                                                 onChange={handleInputChange} 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="email">
//                                             <Form.Label>อีเมล</Form.Label>
//                                             <Form.Control 
//                                                 type="email" 
//                                                 name="email" 
//                                                 value={farmerData.email}
//                                                 onChange={handleInputChange} 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="address">
//                                             <Form.Label>ที่อยู่</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="address" 
//                                                 value={farmerData.address}
//                                                 onChange={handleInputChange} 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="province">
//                                             <Form.Label>จังหวัด</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="province" 
//                                                 value={farmerData.province}
//                                                 onChange={handleInputChange} 
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="postal_code">
//                                             <Form.Label>รหัสไปรษณีย์</Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="postal_code" 
//                                                 value={farmerData.postal_code}
//                                                 onChange={handleInputChange} 
//                                             />
//                                         </Form.Group>
//                                         <Button type="submit" className="mt-3" variant="primary">
//                                             บันทึกข้อมูล
//                                         </Button>
//                                     </Form>
//                                 </Modal.Body>
//                             </Modal>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// }
