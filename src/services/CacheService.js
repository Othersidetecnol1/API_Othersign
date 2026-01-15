const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, '../cache/meta-insights.json');

exports.readCache = () => {
  try {
    const data = fs.readFileSync(cachePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

exports.writeCache = (newData) => {
  const payload = {
    updatedAt: new Date().toISOString(),
    data: newData
  };

  fs.writeFileSync(
    cachePath,
    JSON.stringify(payload, null, 2)
  );
};

exports.isCacheValid = (cacheData, minutes = 15) => {
  if (!cacheData.updatedAt) return false;

  const lastUpdate = new Date(cacheData.updatedAt);
  const now = new Date();

  const diffMs = now - lastUpdate;
  const diffMinutes = diffMs / 1000 / 60;

  return diffMinutes < minutes;
};

