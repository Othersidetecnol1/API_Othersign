const fs = require('fs');
const path = require('path');

const CACHE_TIME = 5 * 60 * 1000; // 5 minutos

class CacheService {

  static getCacheKey(adAccountId, level, period) {
    return `meta-${adAccountId}-${level}-${period}.json`;
  }

  static readCache(key) {
    try {
      const filePath = path.join(__dirname, '../cache', key);

      if (!fs.existsSync(filePath)) return null;

      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  static writeCache(key, data) {
    const payload = {
      timestamp: Date.now(),
      data
    };

    const filePath = path.join(__dirname, '../cache', key);

    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
  }

  static isCacheValid(cache) {
    if (!cache) return false;

    const now = Date.now();
    return now - cache.timestamp < CACHE_TIME;
  }
}

module.exports = CacheService;
