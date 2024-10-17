const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const router = express.Router();



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/image', express.static('images'));

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectdatabase' //database name
});



app.get('/', (req, res) => {
    res.send('Hello World by Express!')
});

// Get all users
app.get('/user', (req, res) => {
    pool.query("SELECT * FROM user", function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

// Get a specific user by ID
app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query("SELECT * FROM user WHERE user_id = ?", [userId], function (error, results, field) {
        if (error) throw error;
        res.json(results);
    });
});

// Add a new user
//Signup
// app.post('/signup', (req, res) => {
//     const input = req.body;
//     pool.query("INSERT INTO user (user_id, user_name, user_pwd, first_name, last_name, houseNo, villageNo, tumbon, sub_area, province, role_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
//         [
//             input.user_id,
//             input.user_name,
//             input.user_pwd,
//             input.first_name,
//             input.last_name,
//             input.houseNo,
//             input.villageNo,
//             input.tumbon,
//             input.sub_area,
//             input.province,
//             input.role_id
//         ], function (error, results, fields) {
//             if (error) throw error;
//             res.json(results);
//         });
// });


app.post('/signup', async (req, res) => {
    const {
        user_id, user_name, user_pwd, first_name, last_name,
        houseNo, villageNo, tumbon, sub_area, province, role_id
    } = req.body;

    // Insert user into the user table
    const userQuery = `INSERT INTO user (user_id, user_name, user_pwd, first_name, last_name, houseNo, villageNo, tumbon, sub_area, province, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    try {
        const result = pool.query(userQuery, [user_id, user_name, user_pwd, first_name, last_name, houseNo, villageNo, tumbon, sub_area, province, role_id]);

        // If the user is a farmer (role_id = 2), also insert them into the farmers table
        if (role_id === "2") {
            const farmerQuery = `INSERT INTO farmers (farmer_id, first_name, last_name, province) VALUES (?, ?, ?, ?)`;
            pool.query(farmerQuery, [result.insertId, first_name, last_name, province]);
        }

        res.json({ affectedRows: result.affectedRows });

    } catch (error) {
        res.status(500).json({ message: "Signup failed", error });
    }
});


// Authentication request
app.post("/api/authen_request", (req, res) => {
    const sql = "SELECT * FROM user WHERE MD5(user_name) = ?";
    pool.query(sql, [req.body.username], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            if (results.length) {
                var payload = { username: req.body.username };
                var secretKey = "MySecretKey";
                const authToken = jwt.sign(payload, secretKey);
                response = {
                    result: true,
                    data: {
                        auth_token: authToken
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }
        res.json(response);
    });
});

// Access request
app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_Signature;
    const authToken = req.body.auth_token;
    var decoded = jwt.verify(authToken, "MySecretKey");

    if (decoded) {
        const query = "SELECT a.user_id, a.user_name, a.first_name, a.last_name, a.role_id, b.role_name " +
            "FROM user a JOIN role b ON a.role_id = b.role_id WHERE MD5(CONCAT(user_name, '&', user_pwd))= ?";
        pool.query(query, [authenSignature], (error, results) => {
            var response;
            if (error) {
                response = {
                    result: false,
                    message: error.message
                };
            } else {
                if (results.length) {
                    var payload = {
                        user_id: results[0].user_id,
                        username: results[0].user_name,
                        first_name: results[0].first_name,
                        last_name: results[0].last_name,
                        role_id: results[0].role_id,
                        role_name: results[0].role_name
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response = { result: true, data: { access_token: accessToken, account_info: payload } };
                } else {
                    response = { result: false, message: "Username หรือ Password ไม่ถูกต้อง" };
                }
            }
            res.json(response);
        });
    }
});

// // User login
// app.post("/login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     pool.query("SELECT * FROM user WHERE user_name = ? AND user_pwd = MD5(?)", [username, password], function (error, results, fields) {
//         if (error) {
//             res.json({
//                 result: false,
//                 message: error.message
//             });
//         } else if (results.length) {
//             res.json({
//                 result: true
//             });
//         } else {
//             res.json({
//                 result: false,
//                 message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง"
//             });
//         }
//     });
// });


// User login
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query("SELECT * FROM user WHERE user_name = ? AND user_pwd = MD5(?)", [username, password], function (error, results, fields) {
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        } else if (results.length) {
            const user = results[0]; // สมมติว่าผลลัพธ์จะมีเพียงแถวเดียวเมื่อ username และ password ตรงกัน
            res.json({
                result: true,
                data: {
                    user_id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role_id: user.role_id, // ส่ง role_id กลับมาด้วย
                    role_name: user.role_name, // สมมติว่ามี role_name อยู่ในฐานข้อมูล
                    access_token: "some_generated_token_here" // สมมติว่ามีการสร้าง access token
                }
            });
        } else {
            res.json({
                result: false,
                message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง"
            });
        }
    });
});





app.post('/api/saveForm', (req, res) => {
    const { date, farmer, price, weight, percentage, dryRubber, totalPrice } = req.body;

    // ตรวจสอบว่ารับข้อมูลอะไรจาก frontend
    console.log('Received data from frontend:', req.body);

    if (!date || !farmer || !price || !weight || !percentage || !dryRubber || !totalPrice) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    const sql = `
        INSERT INTO history (date, farmer_id, farmer_name, price, weight, percentage, dryRubber, totalPrice) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // บันทึกทั้ง farmer.value และ farmer.label
    pool.query(sql, [date, farmer.value, farmer.label, price, weight, percentage, dryRubber, totalPrice], (err, result) => {
        if (err) {
            console.error('Error saving form data:', err);  // ดูรายละเอียดของ error
            res.status(500).send({ message: 'Error saving form data' });
            return;
        }
        res.send({ message: 'Form data saved successfully!' });
    });
});






// app.post('/api/saveForm', (req, res) => {
//     const { date, farmerId, price, weight, percentage, dryRubber, totalPrice } = req.body;

//     console.log(req.body); // ตรวจสอบข้อมูลที่ได้รับ

//     const query = 'INSERT INTO history (date, farmerId, price, weight, percentage, dryRubber, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)';

//     pool.query(query, [date, farmerId, price, weight, percentage, dryRubber, totalPrice], (err) => {
//         if (err) {
//             console.error('Error saving form data:', err);
//             return res.status(500).send(`Error saving form data: ${err.message}`);
//         }
//         res.send('Form data saved successfully');
//     });
// });




// Get form data
app.get('/api/getHistory', (req, res) => {
    const query = 'SELECT * FROM history';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.status(200).json(results);
    });
});



// Save price
app.post('/api/savePrice', async (req, res) => {
    const { date, price } = req.body;

    const query = 'INSERT INTO price_history (date, price) VALUES (?, ?)';
    pool.query(query, [date, price], (err, result) => {
        if (err) {
            console.error('Error saving price:', err);
            res.status(500).send('Error saving price');
            return;
        }
        res.status(201).send('Price saved successfully');
    });
});

// Get price history
app.get('/api/getPriceHistory', (req, res) => {
    const query = 'SELECT * FROM price_history ORDER BY date ASC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching price history:', err);
            res.status(500).send('Error fetching price history');
            return;
        }
        res.status(200).json(results);
    });
});




// Delete form data by ID
app.delete('/api/deleteForm/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM history WHERE id = ?'; // เปลี่ยนให้ตรงกับ primary key ของตาราง
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Error deleting data');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('No record found');
            return;
        }
        res.status(200).send('Data deleted successfully');
    });
});




// ฟังก์ชันการแปลงวันที่
const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        throw new Error('Invalid date format');
    }

    // Convert Thai Buddhist year to Gregorian year
    const gregorianYear = year - 543;

    return `${gregorianYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

///update แก้ไข
app.put('/api/updateForm/:id', (req, res) => {
    const { id } = req.params;
    let updatedData = req.body;
    

    // ตรวจสอบและแปลงวันที่ 
    if (updatedData.date) {
        try {
            updatedData.date = formatDate(updatedData.date);
        } catch (error) {
            console.error('Date format error:', error);
            return res.status(400).json({ message: 'Invalid date format', error: error.message });
        }
    }

    // ตรวจสอบข้อมูลที่ได้รับ
    console.log('Updated Data:', updatedData);

    // สร้างคอลัมน์และค่าจาก updatedData
    const columns = Object.keys(updatedData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updatedData);

    // เพิ่ม ID เป็นค่าที่สุดท้ายใน array
    values.push(id);

    // สร้างคำสั่ง SQL สำหรับการอัปเดตข้อมูล
    const sql = `UPDATE history SET ${columns} WHERE id = ?`;

    // ตรวจสอบคำสั่ง SQL ที่สร้างขึ้น
    console.log('SQL:', sql);
    console.log('Values:', values);

    // คำสั่ง SQL เพื่ออัปเดตข้อมูล
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: 'Error updating data', error: err });
        }
        console.log('Update Results:', results);
        res.json({ message: 'Data updated successfully', results });
    });
});




// Fetch daily data
app.get('/api/getDailyData', (req, res) => {
    pool.query('SELECT * FROM daily_data', (err, results) => {
      if (err) {
        console.error('Error fetching daily data:', err);
        res.status(500).json({ error: 'Error fetching data' });
        return;
      }
      res.json(results);
    });
  });
  
  // Add daily data
  app.post('/api/addDailyData', (req, res) => {
    const { date, buyer, price, quantity, status } = req.body;
    const query = 'INSERT INTO daily_data (date, buyer, price, quantity, status) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [date, buyer, price, quantity, status], (err, results) => {
      if (err) {
        console.error('Error adding daily data:', err);
        res.status(500).json({ error: 'Error adding data' });
        return;
      }
      res.json({ message: 'Data added successfully!' });
    });
  });




// Fetch sellers
app.get('/api/getSellers', (req, res) => {
    pool.query('SELECT * FROM sellers', (err, results) => {
      if (err) {
        console.error('Error fetching sellers:', err);
        res.status(500).json({ error: 'Error fetching sellers' });
        return;
      }
      res.json(results);
    });
  });
  
// Add seller
app.post('/api/addSellerData', (req, res) => {
    const { sellerName } = req.body;
    const query = 'INSERT INTO sellers (sellerName) VALUES (?)';
    pool.query(query, [sellerName], (err, results) => {
        if (err) {
            console.error('Error adding seller:', err);
            res.status(500).json({ error: 'Error adding seller' });
            return;
        }
        res.json({ sellerId: results.insertId, message: 'Seller added successfully!' });
    });
});


// Get all farmers
// app.get('/api/getFarmers', (req, res) => {
//     pool.query('SELECT * FROM farmers ', (err, results) => {
//         if (err) {
//             console.error('Error fetching farmers:', err);
//             res.status(500).json({ error: 'Error fetching farmers' });
//             return;
//         }
//         res.json(results);
//     });
// });


// API สำหรับเพิ่มข้อมูลเกษตรกร
app.post('/api/farmers', (req, res) => {
    const { farmer_id, first_name, last_name, name, phone_number, email, address, province, postal_code, user_id } = req.body;

    // ตรวจสอบว่าชื่อมีค่าหรือไม่
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const query = `
        INSERT INTO farmers (farmer_id, first_name, last_name, name, phone_number, email, address, province, postal_code, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, [farmer_id, first_name, last_name, name, phone_number, email, address, province, postal_code, user_id], (error, results) => {
        if (error) {
            console.error('Error inserting farmer data:', error);
            return res.status(500).json({ error: 'Error inserting farmer data' });
        }
        res.status(201).json({ message: 'Farmer data saved successfully', id: results.insertId });
    });
});







app.get('/api/getFarmerId', (req, res) => {
    const userId = req.query.userId;

    // ตรวจสอบว่า userId ถูกส่งมาไหม
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    // เปลี่ยนแปลงคำสั่ง SQL เพื่อค้นหาข้อมูลเกษตรกรตาม userId
    pool.query('SELECT * FROM farmers WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching farmer ID:', err);
            return res.status(500).json({ error: 'Error fetching farmer ID' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No farmer found for this userId' });
        }

        res.json(results);
    });
});



// Route เพื่อดึงข้อมูลจาก daily_data
// app.get('/api/daily_data', (req, res) => {
//     const query = 'SELECT * FROM daily_data';

//     pool.query(query, (error, results) => {
//         if (error) {
//             console.error('Error fetching data: ', error);
//             return res.status(500).json({ error: 'Error fetching data' });
//         }
//         res.json(results); // ส่งผลลัพธ์ข้อมูลกลับไปที่ frontend
//     });
// });




// API to get list of fertilizers
app.get('/api/getFertilizers', (req, res) => {
    const query = 'SELECT FertID, Type_Fertilize FROM fertilize';
    
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching fertilizers:', error);
            return res.status(500).json({ error: 'Failed to fetch fertilizers' });
        }
        res.json(results);
    });
});


app.get('/api/getRubberPlantData/:farmer_id', (req, res) => {
    const farmerId = req.params.farmer_id; // รับค่า farmer_id จาก URL parameter

    const query = 'SELECT * FROM rubbergarden WHERE farmer_id = ?';
    pool.query(query, [farmerId], (err, result) => {
        if (err) {
            console.error('Error fetching plantation data:', err);
            res.status(500).send('Error fetching plantation data');
            return;
        }
        res.json(result); // ส่งข้อมูลกลับไปที่ frontend
    });
});


app.get('/api/getRubberPlantData', (req, res) => {
    const query = 'SELECT * FROM rubbergarden'; 

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(results);
        }
    });
});





// API to save rubber garden data
// app.post('/api/saveRubberPlantData', (req, res) => {
//     const {
//         houseNo,
//         villageNo,
//         tambon,
//         subArea,
//         province,
//         rubberArea,
//         rubberAge,
//         fertilizeDate,
//         fertilizerType
//     } = req.body;

//     // Insert data into rubbergarden table
//     const query = `
//         INSERT INTO rubbergarden (HouseNo, VillageNo, Tambon, SubArea, Province, RubberArea, RubberAge)
//         VALUES (?, ?, ?, ?, ?, ?,?)`;

//     const values = [houseNo, villageNo, tambon, subArea, province, rubberArea, rubberAge];

//     pool.query(query, values, (error, results) => {
//         if (error) {
//             console.error('Error saving rubber garden data:', error);
//             return res.status(500).json({ error: 'Failed to save rubber garden data' });
//         }

//         // Get the last inserted garden ID
//         const gardenID = results.insertId;

//         // Insert into fertilizer application
//         const fertilizeQuery = `
//             INSERT INTO fertilizerapplication (GardenID, FertilizeDate, FertilizeID)
//             VALUES (?, ?, ?)`;
//         const fertilizeValues = [gardenID, fertilizeDate, fertilizerType];

//         pool.query(fertilizeQuery, fertilizeValues, (error) => {
//             if (error) {
//                 console.error('Error saving fertilizer data:', error);
//                 return res.status(500).json({ error: 'Failed to save fertilizer data' });
//             }
//             res.json({ message: 'Data saved successfully' });
//         });
//     });
// });


app.post('/api/saveRubberPlantData', (req, res) => {
    const {
        farmerId,
        houseNo,
        villageNo,
        tambon,
        subArea,
        province,
        rubberArea,
        rubberAge,
        fertilizeDate,
        fertilizerType
    } = req.body;

    // Validate input
    if (!farmerId || !houseNo || !villageNo || !tambon || !subArea || !province || !rubberArea || !rubberAge) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert data into rubbergarden table
    const query = `
        INSERT INTO rubbergarden (HouseNo, VillageNo, Tambon, SubArea, Province, RubberArea, RubberAge, farmer_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [houseNo, villageNo, tambon, subArea, province, rubberArea, rubberAge, farmerId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error saving rubber garden data:', error);
            return res.status(500).json({ error: 'Failed to save rubber garden data', details: error.message });
        }

        // Get the last inserted garden ID
        const gardenID = results.insertId;

        // Insert into fertilizer application
        // const fertilizeQuery = `
        //     INSERT INTO maintenance (GardenID, Fertilize_Date, FertID)
        //     VALUES (?, ?, ?)`;
        // const fertilizeValues = [gardenID, fertilizeDate, fertilizerType];

        // pool.query(fertilizeQuery, fertilizeValues, (error) => {
        //     if (error) {
        //         console.error('Error saving fertilizer data:', error);
        //         return res.status(500).json({ error: 'Failed to save fertilizer data', details: error.message });
        //     }
        //     res.json({ message: 'Data saved successfully' });
        // });
    });
});





// สร้าง API endpoint เพื่อดึงข้อมูลจากตาราง History
app.get('/api/history', (req, res) => {
    const query = 'SELECT * FROM history WHERE farmer_id = ?';
    const farmerId = req.query.farmerId; // รับค่า farmerId จาก query string
  
    pool.query(query, [farmerId], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(result); // ส่งข้อมูลไปที่ client
    });
  });




//   app.get('/api/getUserData', (req, res) => {
//     const user_id = req.query.user_id;
  
//     if (!user_id) {
//       return res.status(400).json({ error: 'User ID is required' });
//     }
  
//     const query = 'SELECT * FROM user WHERE user_id = ?';
//     pool.query(query, [user_id], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: 'Database query error' });
//       }
  
//       res.json(results);
//     });
//   });
  

// API to get farmers
app.get('/api/farmers', (req, res) => {
    const sql = 'SELECT * FROM farmers';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching farmers:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


