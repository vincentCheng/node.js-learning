// 传递文件
const http = require("http");
const fs = require("fs");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  res.on("end", () => {
    console.log("File upload completed");
  });
});

req.on("error", (error) => {
  console.error(error);
});

// Replace the file path with your actual file path
const filePath = "/path/to/your/file.png";

// Create a readable stream from the file
const readStream = fs.createReadStream(filePath);

// Pipe the readable stream to the request object
readStream.pipe(req);

// Listen for errors on the read stream
readStream.on("error", (error) => {
  console.error(error);
});

req.end();
