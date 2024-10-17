// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Spinner, Nav, Dropdown, Navbar, Button } from 'react-bootstrap';
// import { Pie } from 'react-chartjs-2';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function Results() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterType, setFilterType] = useState('today'); // State for filter type

//   const location = useLocation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/getHistory'); // Update with your API endpoint
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching purchase history:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to determine grade based on percentage
//   const getGrade = (percentage) => {
//     if (percentage >= 30) {
//       return 'A';
//     } else if (percentage > 20) {
//       return 'B';
//     } else {
//       return 'C';
//     }
//   };

//   // Initial grade counts
//   const grades = {
//     A: 0,
//     B: 0,
//     C: 0,
//   };

//   // Filter data based on the selected filter type
//   const filteredData = data.filter(item => {
//     const date = new Date(item.date); // Assuming item.date is in a recognized date format
//     const today = new Date();

//     if (filterType === 'today') {
//       return date.toDateString() === today.toDateString(); // Filter for today
//     } else if (filterType === 'month') {
//       return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear(); // Filter for this month
//     }
//     return false;
//   });

//   // Count the grades based on the filtered data
//   filteredData.forEach(item => {
//     const grade = getGrade(item.percentage); // Assuming item.percentage contains the percentage value
//     grades[grade]++;
//   });

//   // Calculate total items for percentage calculation
//   const totalItems = grades.A + grades.B + grades.C;

//   // Create data for Pie chart, converting counts to percentages
//   const chartData = {
//     labels: ['A', 'B', 'C'],
//     datasets: [
//       {
//         data: [
//           (grades.A / totalItems) * 100, // Convert count to percentage
//           (grades.B / totalItems) * 100,
//           (grades.C / totalItems) * 100,
//         ],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // If the data is still loading, show a spinner
//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   return (
//     <div> 
//       {/* Navbar */}
//       <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//           <Container>
//               <Nav className="me-auto"></Nav>
//               <Nav>
//                   {/* <Nav.Link href="#contact">ติดต่อเรา</Nav.Link> */}
//                   <Dropdown align="end">
//                       <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                           ผู้รับซื้อ
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                           <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
//                           <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                       </Dropdown.Menu>
//                   </Dropdown>
//               </Nav>
//           </Container>
//       </Navbar>

//       {/* Main Content */}
//       <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//           <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//               <Nav.Link href="home" className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}>หน้าแรก</Nav.Link>
//               <Nav.Link href="processbuy" className={`text-white ${location.pathname === '/processbuy' ? 'active' : ''}`}>รับซื้อน้ำยางพารา</Nav.Link>
//               <Nav.Link href="history" className={`text-white ${location.pathname === '/history' ? 'active' : ''}`}>ประวัติการรับซื้อ</Nav.Link>
//               <Nav.Link href="daily" className={`text-white ${location.pathname === '/daily' ? 'active' : ''}`}>จัดการข้อมูลรับซื้อรายวัน</Nav.Link>
//               <Nav.Link href="results" className={`text-white ${location.pathname === '/results' ? 'active' : ''}`}>แสดงผลการรับซื้อ</Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col xs={10} style={{ padding: '0px' }}>
//           <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>แสดงผลการรับซื้อ</h5>
//           </nav>

//           {/* Filter Selection Buttons */}
//           <div className="p-1 text-center">
//             <Button variant={filterType === 'today' ? 'primary' : 'secondary'} onClick={() => setFilterType('today')}>
//               แสดงผลวันนี้
//             </Button>
//             <Button variant={filterType === 'month' ? 'primary' : 'secondary'} onClick={() => setFilterType('month')}>
//               แสดงผลเดือนนี้
//             </Button>
//           </div>

//           {/* Main Graph Area */}
//           <Col>
//             <Container className="p-4">
//               <Row className="justify-content-center align-items-center" style={{ height: '70vh' ,backgroundColor: '#F5F5F5', height: '80vh', paddingRight: '70px',borderRadius: '30px'  }}>
//                 <Col className="d-flex justify-content-center">
//                   <div style={{ width: '400px', height: '400px' }}>
//                     <Pie 
//                       data={chartData} 
//                       options={{
//                         responsive: true,
//                         plugins: {
//                           tooltip: {
//                             callbacks: {
//                               label: (context) => {
//                                 const label = context.label || '';
//                                 const value = context.raw || 0;
//                                 return `${label}: ${value.toFixed(2)}%`; // Show percentage with 2 decimal places
//                               },
//                             },
//                           },
//                         },
//                       }} 
//                     />
//                   </div>
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//         </Col>
//       </Row>
//       </Container>
//     </div>
//   );
// }





// //////////////////////////////////////////////////////////////////////////////




// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Spinner, Nav, Dropdown, Navbar, Button } from 'react-bootstrap';
// import { Pie } from 'react-chartjs-2';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faChartPie } from '@fortawesome/free-solid-svg-icons';

// // Register chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function Results() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterType, setFilterType] = useState('today'); // State for filter type
//   const [startDate, setStartDate] = useState(new Date()); // Start date for custom range
//   const [endDate, setEndDate] = useState(new Date()); // End date for custom range

//   const location = useLocation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/getHistory'); // Update with your API endpoint
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching purchase history:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to determine grade based on percentage
//   const getGrade = (percentage) => {
//     if (percentage >= 30) {
//       return 'A';
//     } else if (percentage >= 20) {
//       return 'B';
//     } else {
//       return 'C';
//     }
//   };

//   // Initial grade counts
//   const grades = {
//     A: 0,
//     B: 0,
//     C: 0,
//   };

//   // Filter data based on the selected filter type
//   const filteredData = data.filter(item => {
//     const date = new Date(item.date); // Assuming item.date is in a recognized date format
//     const today = new Date();

//     if (filterType === 'today') {
//       return date.toDateString() === today.toDateString(); // Filter for today
//     } else if (filterType === 'month') {
//       return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear(); // Filter for this month
//     } else if (filterType === 'custom') {
//       return date >= startDate && date <= endDate; // Filter for custom date range
//     }
//     return false;
//   });

//   // Count the grades based on the filtered data
//   filteredData.forEach(item => {
//     const grade = getGrade(item.percentage); // Assuming item.percentage contains the percentage value
//     grades[grade]++;
//   });

//   // Calculate total items for percentage calculation
//   const totalItems = grades.A + grades.B + grades.C;

//   // Create data for Pie chart, converting counts to percentages
//   const chartData = {
//     labels: ['A', 'B', 'C'],
//     datasets: [
//       {
//         data: [
//           (grades.A / totalItems) * 100, // Convert count to percentage
//           (grades.B / totalItems) * 100,
//           (grades.C / totalItems) * 100,
//         ],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // If the data is still loading, show a spinner
//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   return (
//     <div> 
//       {/* Navbar */}
//       <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
//           <Container>
//               <Nav className="me-auto"></Nav>
//               <Nav>
//                   <Dropdown align="end">
//                       <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                           ผู้รับซื้อ
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                           <Dropdown.Item href="Profile">ข้อมูลส่วนตัว</Dropdown.Item>
//                           <Dropdown.Item href="/">ออกจากระบบ</Dropdown.Item>
//                       </Dropdown.Menu>
//                   </Dropdown>
//               </Nav>
//           </Container>
//       </Navbar>

//       {/* Main Content */}
//       <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col xs={2} style={{ backgroundColor: '#B2A08D', height: '100vh', padding: '0' }}>
//           <Nav className="flex-column p-3" style={{ height: '100%' }} activeKey={location.pathname}>
//               <Nav.Link href="home" className={`text-white ${location.pathname === '/home' ? 'active' : ''}`}>
//                 {/* <FontAwesomeIcon icon={faHome} />  */}
//                 หน้าแรก
//               </Nav.Link>
//               <Nav.Link href="processbuy" className={`text-white ${location.pathname === '/processbuy' ? 'active' : ''}`}>
//                 {/* <FontAwesomeIcon icon={faChartPie} /> */}
//                  รับซื้อน้ำยางพารา
//               </Nav.Link>
//               <Nav.Link href="history" className={`text-white ${location.pathname === '/history' ? 'active' : ''}`}>
//                 ประวัติการรับซื้อ
//               </Nav.Link>
//               <Nav.Link href="daily" className={`text-white ${location.pathname === '/daily' ? 'active' : ''}`}>
//                 จัดการข้อมูลรับซื้อรายวัน
//               </Nav.Link>
//               <Nav.Link href="results" className={`text-white ${location.pathname === '/results' ? 'active' : ''}`}>
//                 แสดงผลการรับซื้อ
//               </Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col xs={10} style={{ padding: '0px' }}>
//           <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
//             <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>แสดงผลการรับซื้อ</h5>
//           </nav>

//           {/* Filter Selection Buttons */}
//           <div className="p-1 text-center" >
//             <Button style={{marginRight:'30px'}} variant={filterType === 'today' ? 'primary' : 'secondary'} onClick={() => setFilterType('today')}>
//               แสดงผลวันนี้
//             </Button>
//             <Button style={{marginRight:'0px'}} variant={filterType === 'month' ? 'primary' : 'secondary'} onClick={() => setFilterType('month')}>
//               แสดงผลเดือนนี้
//             </Button>
//             <Button style={{marginLeft:'30px'}} variant={filterType === 'custom' ? 'primary' : 'secondary'} onClick={() => setFilterType('custom')}>
//               แสดงผลช่วงเวลาที่กำหนด
//             </Button>
//           </div>

//           {/* Date Picker for custom range */}
//           {filterType === 'custom' && (
//             <div className="p-1 text-center">
//               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//               <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
//             </div>
//           )}

//           {/* Main Graph Area */}
//           <Col>
//             <Container className="p-4">
//               <Row className="justify-content-center align-items-center" style={{ height: '70vh' ,backgroundColor: '#F5F5F5', paddingRight: '70px', borderRadius: '30px' }}>
//                 <Col className="d-flex justify-content-center">
//                   <div style={{ width: '400px', height: '400px' }}>
//                     <Pie 
//                       data={chartData} 
//                       options={{
//                         responsive: true,
//                         plugins: {
//                           tooltip: {
//                             callbacks: {
//                               label: (context) => {
//                                 const label = context.label || '';
//                                 const value = context.raw || 0;
//                                 return `${label}: ${value.toFixed(2)}%`; // Show percentage with 2 decimal places
//                               },
//                             },
//                           },
//                         },
//                       }} 
//                     />
//                   </div>
//                   {/* <div className="text-center mt-3" style={{padding:'10px'}}>
//                   <p>จำนวนเกรด A: {grades.A} รายการ</p>
//                   <p>จำนวนเกรด B: {grades.B} รายการ</p>
//                   <p>จำนวนเกรด C: {grades.C} รายการ</p>
//                   </div> */}
                //     <div className="text-center mt-3" style={{ padding: '10px' }}>
                //   <p style={{ color: 'rgba(75, 192, 192, 1)' }}>จำนวนเกรด A: {grades.A} รายการ</p>
                //   <p style={{ color: 'rgba(54, 162, 235, 1)' }}>จำนวนเกรด B: {grades.B} รายการ</p>
                //   <p style={{ color: 'rgba(255, 206, 86, 1)' }}>จำนวนเกรด C: {grades.C} รายการ</p>
                // </div>
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//         </Col>
//       </Row>
//       </Container>
//     </div>
//   );
// }






import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Spinner, Nav, Dropdown, Navbar, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartPie } from '@fortawesome/free-solid-svg-icons';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Results() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('today'); // State for filter type
  const [startDate, setStartDate] = useState(new Date()); // Start date for custom range
  const [endDate, setEndDate] = useState(new Date()); // End date for custom range
  const [totalWeight, setTotalWeight] = useState(0); // State to store total weight

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getHistory'); // Update with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to determine grade based on percentage
  const getGrade = (percentage) => {
    if (percentage >= 30) {
      return 'A';
    } else if (percentage >= 20) {
      return 'B';
    } else {
      return 'C';
    }
  };

  // Initial grade counts
  const grades = {
    A: 0,
    B: 0,
    C: 0,
  };

  // Filter data based on the selected filter type
  const filteredData = data.filter(item => {
    const date = new Date(item.date); // Assuming item.date is in a recognized date format
    const today = new Date();

    if (filterType === 'today') {
      return date.toDateString() === today.toDateString(); // Filter for today
    } else if (filterType === 'month') {
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear(); // Filter for this month
    } else if (filterType === 'custom') {
      return date >= startDate && date <= endDate; // Filter for custom date range
    }
    return false;
  });

  // Count the grades based on the filtered data
  filteredData.forEach(item => {
    const grade = getGrade(item.percentage); // Assuming item.percentage contains the percentage value
    grades[grade]++;
  });

  // Calculate total items for percentage calculation
  const totalItems = grades.A + grades.B + grades.C;

  // Calculate total weight
  useEffect(() => {
    const total = filteredData.reduce((acc, item) => acc + item.weight, 0); // Assuming item.weight contains the weight
    setTotalWeight(total); // Set total weight in state
  }, [filteredData]);

  // Create data for Pie chart, converting counts to percentages
  const chartData = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [
          (grades.A / totalItems) * 100, // Convert count to percentage
          (grades.B / totalItems) * 100,
          (grades.C / totalItems) * 100,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // If the data is still loading, show a spinner
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div> 
      {/* Navbar */}
      <Navbar className="navbar border-bottom border-body" style={{ backgroundColor: '#997950' }} data-bs-theme="dark">
          <Container>
              <Nav className="me-auto"></Nav>
              <Nav>
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

      {/* Main Content */}
      <Container fluid>
      <Row>
        {/* Sidebar */}
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

        {/* Main Content */}
        <Col xs={10} style={{ padding: '0px' }}>
          <nav style={{ backgroundColor: '#5F4B3B', padding: '10px' }}>
            <h5 style={{ color: '#FFFFFF', textAlign: 'center', margin: '0' }}>แสดงผลการรับซื้อ</h5>
          </nav>

          {/* Filter Selection Buttons */}
          <div className="p-1 text-center" >
            <Button style={{marginRight:'30px'}} variant={filterType === 'today' ? 'primary' : 'secondary'} onClick={() => setFilterType('today')}>
              แสดงผลวันนี้
            </Button>
            <Button style={{marginRight:'0px'}} variant={filterType === 'month' ? 'primary' : 'secondary'} onClick={() => setFilterType('month')}>
              แสดงผลเดือนนี้
            </Button>
            <Button style={{marginLeft:'30px'}} variant={filterType === 'custom' ? 'primary' : 'secondary'} onClick={() => setFilterType('custom')}>
              แสดงผลช่วงเวลาที่กำหนด
            </Button>
          </div>

          {/* Date Picker for custom range */}
          {filterType === 'custom' && (
            <div className="p-1 text-center">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
          )}

          {/* Main Graph Area */}
          <Col>
            <Container className="p-4">
              <Row className="justify-content-center align-items-center" style={{ height: '70vh' ,backgroundColor: '#F5F5F5', paddingRight: '70px', borderRadius: '30px' }}>
                <Col className="d-flex justify-content-center">
                  <div style={{ width: '400px', height: '400px' }}>
                    <Pie 
                      data={chartData} 
                      options={{
                        responsive: true,
                        plugins: {
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                const label = context.label || '';
                                return label + ': ' + context.raw.toFixed(2) + '%'; // Display percentage with 2 decimals
                              }
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="text-center mt-3" style={{ padding: '10px' }}>
                  <p style={{ color: 'rgba(75, 192, 192, 1)' }}>จำนวนเกรด A: {grades.A} รายการ</p>
                  <p style={{ color: 'rgba(54, 162, 235, 1)' }}>จำนวนเกรด B: {grades.B} รายการ</p>
                  <p style={{ color: 'rgba(255, 206, 86, 1)' }}>จำนวนเกรด C: {grades.C} รายการ</p>
                </div>
                </Col>
              {/* </Row> */}
              
              {/* Display total weight summary */}
              <Row className="justify-content-center mt-3">
                <h4>ซื้อน้ำยางพาราทั้งหมด: {totalWeight} กิโลกรัม</h4>
              </Row>
              </Row>
            </Container>
          </Col>
        </Col>
      </Row>
      </Container>
    </div>
  );
}
