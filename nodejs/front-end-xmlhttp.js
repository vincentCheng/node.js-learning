const xhr = new XMLHttpRequest();
xhr.open("POST", "/api/users");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({ id: 3, name: "小王", age: 24 }));
