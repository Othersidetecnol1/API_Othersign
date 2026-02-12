require("dotenv").config();

const { getAdAccounts } = require("./src/services/MetaAdsService");

(async () => {
  try {
    const accounts = await getAdAccounts();
    console.log("📊 Contas de anúncio:");
    console.log(JSON.stringify(accounts, null, 2));
  } catch (error) {
    console.error("❌ Erro no teste");

    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
})();
