// Minimal static file server for local preview/testing.
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;

// Basic content-type map for the files used by this landing page.
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

http.createServer((req, res) => {
  // Default the root URL to the landing page file.
  const safeUrl = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(root, decodeURIComponent(safeUrl));

  // Block directory traversal outside the current project folder.
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    // Return a simple 404 when the requested file is missing.
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    // Serve the requested file with the closest matching content type.
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
