const { getMe } = require("./services/metaService");

async function start() {
  try {
    const me = await getMe();
    console.log("✅ Meta conectada:");
    console.log(me);
  } catch (error) {
    console.error("❌ Erro ao iniciar aplicação");

    if (error.response) { 
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

start();