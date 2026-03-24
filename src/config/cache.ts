import NodeCache from "node-cache";

// General API response cache (5 min TTL)
export const apiCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});

// Product cache (10 min TTL)
export const productCache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  useClones: false,
});

// Inventory cache (5 min TTL)
export const inventoryCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});

export function clearAllCaches(): void {
  apiCache.flushAll();
  productCache.flushAll();
  inventoryCache.flushAll();
}
