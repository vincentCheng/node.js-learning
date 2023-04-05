const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const port = 3000;

const server = http.createServer((req, res) => {
  /**
   * 解析url
   */
  const urlObject = url.parse(req.url);
  const { pathname } = urlObject;
  const str = JSON.stringify(urlObject);
  //   console.log(req);
  //   const reqStr = JSON.stringify(req);
  //   const resStr = JSON.stringify(res);

  // api开头的是API请求
  if (pathname.startsWith("/api")) {
    // 再判断路由
    if (pathname === "/api/users") {
      // 获取HTPP动词
      const { method } = req;

      if (method === "GET") {
        // 返回数据
        const resData = [
          {
            id: 1,
            name: "小明",
            age: 18,
          },
          {
            id: 2,
            name: "小红",
            age: 19,
          },
        ];

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(resData));

        return;
      } else if (method === "POST") {
        // 注意数据传过来可能有多个chunk
        // 我们需要拼接这些chunk
        let postData = "";
        req.on("data", (chunk) => {
          postData = postData + chunk;
        });

        req.on("end", () => {
          // 数据传完后往db.txt插入内容
          fs.appendFile(path.join(__dirname, "db.txt"), postData, () => {
            res.end(postData); // 数据写完后将数据再次返回
          });
        });

        res.statusCode = 200;

        return;
      }
    }
  } else {
    const extName = path.extname(pathname);
    console.log(`pathname ${pathname}`);

    if (".jpeg" === extName) {
      // fs模块读取文件
      fs.readFile(`.${pathname}`, (err, data) => {
        res.setHeader("Content-Type", "image/jpeg");
        res.write(data);
        res.end();
      });
    }

    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`urlObject ${str}`);
  //   res.end(`urlObject ${str}, reqStr ${reqStr}, resStr ${resStr}`);
});

server.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
