// 传递json数据
const http = require("http");
// const fs = require("fs");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
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
// const filePath = "/path/to/your/file.png";

const data = { id: 3, name: "小王", age: 24 };

req.write(JSON.stringify(data));

req.end();
