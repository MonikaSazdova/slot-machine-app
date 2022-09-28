const axios = require("axios");
let userId;

export async function createSession() {

  try {
    const response = await axios.get("http://localhost:8000/");
    console.log("response create session ", response);
    userId = response.data.id;
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function rollSession() {
  const response = await axios.get(`http://localhost:8000/roll/${userId}`);
  console.log("response roll session ", response);
  return response.data;
}

export async function cashOutSession() {
    const response = await axios.get(`http://localhost:8000/cash-out/${userId}`);
    console.log("response cash out ", response);
    return response.data;
  }