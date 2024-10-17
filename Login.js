import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import './Login.css'; //    เชื่อม CSS 
// import logo from './logo.png'; // Path to your logo image
import backgroundImage from './assets/background-image.jpg'; // Import background image
import './Signup'

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // กำหนด state สำหรับ error


    let navigate = useNavigate(); // เรียกใช้ useNavigate() เพื่อให้ได้ฟังก์ชัน navigate ที่ถูกต้อง
    


    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if(form.checkValidity()=== false){
            event.stopPropagation();
        }else{
            doLogin();
        }
    }



    const getAuthenToken = async() =>{
        const response = await fetch(
            "http://localhost:8080/api/authen_request",
            {
                method: "POST",
                headers:{
                    Accept:"application/json",

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: md5(username)
                })
            }
        );

        const data = await response.json();

        console.log(data);
    }

    const getAccessToken = async (authToken) => {
        var baseString = username + "&" + md5(password);
        var authenSignature = md5(baseString);

        const response = await fetch(
            "http://localhost:8080/api/access_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    authen_signature: authenSignature,
                    auth_token: authToken
                })
            }
        );

        const data = await response.json();
        return data;
    };


    // const doLogin = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8080/login", {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 username: username,
    //                 password: password,
    //             }),
    //         });
    
    //         const data = await response.json();
            
    //         if (data.result) {
    //             const userInfo = data.data || {};
                
    //             // เก็บข้อมูล user ใน localStorage
    //             localStorage.setItem("user_id", userInfo.user_id);
    //             localStorage.setItem("farmer_id", userInfo.farmer_id); // เก็บ farmer_id
    //             localStorage.setItem("username", username);
    //             localStorage.setItem("first_name", userInfo.first_name);
    //             localStorage.setItem("last_name", userInfo.last_name);
    //             localStorage.setItem("role_id", userInfo.role_id);
    
    //             // Navigate ไปยังหน้า home ของ user หรือ farmer
    //             if (userInfo.role_id === 1) {
    //                 navigate("/home", { replace: true });
    //             } else if (userInfo.role_id === 2) {
    //                 navigate("/farmerhome", { replace: true });
    //             }
    //         } else {
    //             setError("Invalid username or password");
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         setError("An error occurred during login.");
    //     }
    // };
    


    const doLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            const data = await response.json();
            console.log("Full API Response:", data);
            
            if (data.result) {
                const userInfo = data.data || {};
                const token = userInfo.access_token;
            
                if (!token || !userInfo.user_id) {
                    setError("Invalid response structure from the server.");
                    return;
                }
            
                localStorage.setItem("access_token", token);
                localStorage.setItem("user_id", userInfo.user_id);
                localStorage.setItem("username", username);
                localStorage.setItem("first_name", userInfo.first_name);
                localStorage.setItem("last_name", userInfo.last_name);
                localStorage.setItem("role_id", userInfo.role_id);
                localStorage.setItem("id", userInfo.id);
                
            
                // Navigate based on the role
                if (userInfo.role_id === 1) {
                    navigate("/home", { replace: true });
                } else if (userInfo.role_id === 2) {
                    navigate("/farmerhome", { replace: true });
                } else {
                    setError("Role not recognized.");
                }
            } else {
                setError("Invalid username or password");
            }
            
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred during login.");
        }
    };

    const goToSignup = () => {
        navigate("signup");
    };


    return (
        <div className='login-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='login-container d-flex align-items-center justify-content-center min-vh-100'>
            <div className='login-form'>
                <div className='text-center mb-4'>
                    {/* <img src={logo} alt="Logo" className="logo" /> */}
                    <h2>Login</h2>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form noValidate validated={validated} onSubmit={onLogin}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validateUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอก Username
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validatePassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอก Password
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <div className="d-grid gap-2">
                            <Button className="btn-primary" type="submit">Login</Button>
                            {/* <Button className="btn-outline-primary"  disabled>Signup</Button> */}
                            <Button className="btn-outline-primary" type="button" onClick={goToSignup}>Signup</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </div>
        </div>
            );

}




