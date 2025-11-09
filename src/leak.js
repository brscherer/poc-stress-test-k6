const express = require("express");

const app = express();
const cache = [];

app.get("/data", (req, res) => {
  const payload = Buffer.alloc(1024 * 50, "x"); // 50KB
  cache.push(payload); // never released
  res.json({ ok: true, cacheSize: cache.length });
});

app.get("/metrics", (req, res) => {
  const mem = process.memoryUsage(); // bytes
  // convert to MB for convenience
  const toMB = (b) => Math.round((b / 1024 / 1024) * 100) / 100;
  res.json({
    rss: mem.rss,
    rssMB: toMB(mem.rss),
    heapTotal: mem.heapTotal,
    heapTotalMB: toMB(mem.heapTotal),
    heapUsed: mem.heapUsed,
    heapUsedMB: toMB(mem.heapUsed),
    external: mem.external,
    externalMB: toMB(mem.external),
    arrayBuffers: mem.arrayBuffers,
    arrayBuffersMB: toMB(mem.arrayBuffers),
    cacheSize: cache.length
  });
});

app.get("/metrics-prom", (req, res) => {
  const mem = process.memoryUsage();
  res.set("Content-Type", "text/plain");
  res.send(
    [
      `node_memory_rss_bytes ${mem.rss}`,
      `node_memory_heap_total_bytes ${mem.heapTotal}`,
      `node_memory_heap_used_bytes ${mem.heapUsed}`,
      `node_memory_external_bytes ${mem.external}`,
      `node_memory_arraybuffers_bytes ${mem.arrayBuffers}`,
      `leak_demo_cache_size ${cache.length}`
    ].join("\n")
  );
});

app.listen(4000, () => console.log("Memory leak demo on port 4000"));
