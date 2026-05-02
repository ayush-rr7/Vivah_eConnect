// import http from 'k6/http';
// import { check, sleep } from 'k6';

// export const options = {
//   vus: 1,
//   duration: '2s',
// };

// // const BASE_URL = 'http://localhost:3002';
// const BASE_URL = 'https://vivah-econnect.vercel.app/';

// export default function () {

//   // ✅ LOGIN (correct endpoint)
//   let loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
//     email: 'abcx22@gmail.com',
//     password: 'abcd'
//   }), {
//     headers: { 'Content-Type': 'application/json' },
//   });

//   console.log("LOGIN:", loginRes.status, loginRes.body);

//   check(loginRes, {
//     'login success': (res) => res.status === 200,
//   });

//   let token = loginRes.json('token'); // adjust if needed

//   sleep(1);

//   // ✅ GET PROFILES
//   let profilesRes = http.get(`${BASE_URL}/api/user1`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log("PROFILES:", profilesRes.status);

//   check(profilesRes, {
//     'profiles fetched': (res) => res.status === 200,
//   });

//   sleep(1);

//   // ✅ SEND CONNECTION REQUEST
//   let connectionRes = http.post(`${BASE_URL}/connection/request`, JSON.stringify({
//     senderProfileId: '',
//     receiverProfileId: ''
//   }), {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log("CONNECTION:", connectionRes.status, connectionRes.body);

//   check(connectionRes, {
//     'connection sent': (res) => res.status === 200,
//   });

//   sleep(1);
// }