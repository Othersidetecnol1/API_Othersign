require("dotenv").config();
const axios = require("axios");

const API_URL = "https://graph.facebook.com/v24.0/me?fields=id,name";
const API_TOKEN = process.env.META_ACCESS_TOKEN;

if (!API_TOKEN) {
  console.error("❌ META_ACCESS_TOKEN não encontrado no .env");
  process.exit(1);
}

async function testarAPI() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    console.log("✅ Status:", response.status);
    console.log("📦 Resposta da Meta:");
    console.log(response.data);

  } catch (error) {
    console.error("❌ Erro ao chamar API da Meta");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Erro:", error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testarAPI();
