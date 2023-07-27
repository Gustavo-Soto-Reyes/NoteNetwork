import * as http from 'http';
import * as cors from 'cors';
// import * as admin from 'firebase-admin';
import { addDoc, collection } from "firebase/firestore"
import { FIRESTORE_DB } from './firebaseConfig';

const testItems = [
  { id: 1, name:"The Beetles" , uri: "https://therake.imgix.net/wp-content/uploads/2018/11/beatles-feature-edit.jpg?ixlib=js-3.6.0&w=996&h=711&fit=crop&auto=format&s=721936bd6d3fd05a9493827dea94f786" },
  { id: 2,name:"Rihanna", uri:"https://akns-images.eonline.com/eol_images/Entire_Site/2012911/300.Rihanna.jc.101012.jpeg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top" },
  { id: 3,name:"Ed Sheeran Band", uri: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png" },
  { id: 4,name:"Beyonce Band", uri: "https://i.pinimg.com/originals/95/8f/4b/958f4b1ddcf3814de7a14adb752c547b.jpg" },
  { id: 5, name:"Ariana Grande Band", uri: "https://pyxis.nymag.com/v1/imgs/848/851/4305fb42b7d9f5533ac9b8cb054c42f500-ariana-grande-album-review.rsquare.w700.jpg" },
  { id: 6,name:"Lynard Skynard", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZNetLpqzZ2v_u0t3ul6t5czo91Ae8zZ5Og&usqp=CAU" },
  { id: 7,name:"The Eagles", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToONzuPZahfzQXrss9j4IsTgDn1THHuWkl_g&usqp=CAU" },
  { id: 8, name:"Muse", uri: "https://i.insider.com/5bafa35de55aa815388b4567?width=1300&format=jpeg&auto=webp" },
  { id: 9, name:"Frank Sinatra", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHRnZSlxqNQQDy0jz2njOmti2LAGcu-CcIA&usqp=CAU" },
  { id: 10,name:"The Rocket Scientists", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GWNwrCGcL0_H1s5bCDZ5Q2H3wKvNRxRVmQ&usqp=CAU" },
  { id: 13,name:"Alicia Keys Group", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XMVJWvTFLmyreLG3zIYZUq9o3rS1OvUnzw&usqp=CAU" },
  { id: 14, name:"Shakira's Band", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5JV-6yYrSy0POFEV-WyMR5giLvTsZq7T4EQ&usqp=CAU" },    
]

const server = http.createServer((req, res) => {
  cors()(req, res, () => {
    if (req.url === '/api/createuser' && req.method === 'POST') {
      handleCreateUser(req, res);
    } else if (req.url === '/api/items' && req.method === 'GET') {
      handleGetItems(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  });
});

interface createUserRequest {
  name: string,
  email: string,
  password: string,
  user: string
}

const handleGetItems = async (req: http.IncomingMessage, res: http.ServerResponse) =>{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(testItems));
}

const handleCreateUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    let body = '';

    // Read the request data (the user information) as it comes in chunks
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // When all the request data is received, proceed to save the user data to Firebase
    req.on('end', async () => {
      // Parse the received JSON data containing the user's name, email, and age
      const req:createUserRequest = JSON.parse(body);

      addDoc(collection(FIRESTORE_DB, 'users'), req);

      // Respond with a 200 status and a JSON message indicating success
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created successfully' }));
    });
  } catch (error) {
    // If an error occurs during the process, handle it and respond with a 500 status and an error JSON message
    console.error('Error creating user:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to create user' }));
  }
};

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});