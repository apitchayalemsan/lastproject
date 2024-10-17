import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, Row, Col, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure this path is correct
import logo from './logo.png'; // Path to your logo image
import backgroundImage from './assets/background-image.jpg';
import md5 from 'md5';

export default function Signup() {
    const [validated, setValidated] = useState(false);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [villageNo, setVillageNo] = useState("");
    const [tumbon, setTumbon] = useState("");
    const [subArea, setSubArea] = useState("");
    const [province, setProvince] = useState("");
    const [roleId, setRoleId] = useState("");
    const [error, setError] = useState(""); // Error state

    let navigate = useNavigate(); // Hook for navigation

    const onSignup = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if (userPwd !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            await doSignup();
        }

        setValidated(true);
    }

//  const doSignup = async () => {
//     const Password = md5(userPwd); // Hash the password
    
//     try {
//         const response = await fetch("http://localhost:8080/signup", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 user_id: userId,
//                 user_name: userName,
//                 user_pwd: Password, // ส่ง Password ที่ถูกแปลงแล้ว
//                 first_name: firstName,
//                 last_name: lastName,
//                 houseNo: houseNo,
//                 villageNo: villageNo,
//                 tumbon: tumbon,
//                 sub_area: subArea,
//                 province: province,
//                 role_id: roleId
//             })
//         });

//         const data = await response.json();

//         // Check if signup was successful
//         if (response.ok) {
//             navigate("/"); // Redirect to login page after signup
//         } else {
//             setError(data.message || "Signup failed");
//         }
//     } catch (error) {
//         console.error("Error during signup:", error);
//         setError("An error occurred during signup. Please try again.");
//     }
// }


const doSignup = async () => {
    const Password = md5(userPwd); // Hash the password

    try {
        const response = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                user_name: userName,
                user_pwd: Password, // Send hashed password
                first_name: firstName,
                last_name: lastName,
                houseNo: houseNo,
                villageNo: villageNo,
                tumbon: tumbon,
                sub_area: subArea,
                province: province,
                role_id: roleId
            })
        });

        const data = await response.json();

        // Check if the signup was successful
        if (response.ok) {
            if (roleId === "2") {
                console.log("Farmer signup successful!");
            } else {
                console.log("Buyer signup successful!");
            }
            navigate("/"); // Redirect to the login page after successful signup
        } else {
            // Set an error message if the signup failed
            setError(data.message || "Signup failed");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        setError("An unexpected error occurred during signup. Please try again.");
    }
};

    

    return (
        // <Container className='signup-container d-flex align-items-center justify-content-center min-vh-100'>
         <Container fluid>
            <div className='signup-container' style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className='signup-form p-1 rounded shadow' >
                <div className='text-center '>
                    <h5 className='mb-1'>ลงทะเบียนเข้าสู่ระบบ</h5>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form noValidate validated={validated} onSubmit={onSignup}  style={{ height: '100%', }}>
                    <Row className="mb-1">
                        {/* <Form.Group as={Col} md={6} controlId="validateUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="User ID"
                                onChange={(e) => setUserId(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a User ID.
                            </Form.Control.Feedback>
                        </Form.Group> */}
                        <Form.Group as={Col} md={6} controlId="validateUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="User Name"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a User Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    {/* </Row> */}
                    {/* <Row className="mb-3"> */}
                        <Form.Group as={Col} md={6} controlId="validatePassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setUserPwd(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validateConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please confirm your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={6} controlId="validateFirstName">
                            <Form.Label>ชื่อจริง</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="ชื่อจริง"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validateLastName">
                            <Form.Label>นามสกุล</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="นามสกุล"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={6} controlId="validateHouseNo">
                            <Form.Label>บ้านเลขที่</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="บ้านเลขที่"
                                onChange={(e) => setHouseNo(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your house number.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validateVillageNo">
                            <Form.Label>หมู่ที่</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="หมู่ที่"
                                onChange={(e) => setVillageNo(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your village number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={6} controlId="validateTumbon">
                            <Form.Label>ตำบล</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="ตำบล"
                                onChange={(e) => setTumbon(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your Tumbon.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validateSubArea">
                            <Form.Label>อำเภอ</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="อำเภอ"
                                onChange={(e) => setSubArea(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your sub area.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={6} controlId="validateProvince">
                            <Form.Label>จังหวัด</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="จังหวัด"
                                onChange={(e) => setProvince(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide your province.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validateRoleId">
                            <Form.Label>Role ID</Form.Label>
                            <Form.Select
                                required
                                onChange={(e) => setRoleId(e.target.value)}
                            >
                                <option value="">เลือกบทบาท</option>
                                <option value="1">ผู้ซื้อ</option>
                                <option value="2">เกษตรกร</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please provide your role ID.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <div  className="d-grid gap-1">
                            <Button className="btn-primary" type="submit">Sign Up</Button>
                            <Button className="btn-secondary" type="button" onClick={() => navigate("/")}>Login</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </Container>
    );
}
