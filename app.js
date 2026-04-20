const http = require('http');
const { json } = require('stream/consumers');

const users = [
  { id: 1, name: 'john', age: 24 },
  { id:2, name: 'raghul', age: 25 },
  { id:3, name: 'iqbal', age:25 }
]

const server = http.createServer((req, res) => {
  //GET
  if(req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, {
      "content-type" : "application/json"
    })
    res.end(JSON.stringify(users));
  } 

  //GET BY ID
  if(req.url.startsWith('/users') && req.method === 'GET') {
    const id = req.url.split('/')[2];
    const user = users.find(u => u.id == id);
    if(!user){
      res.writeHead(404, {"content-type" : "application/json"})
      res.end(JSON.stringify({ Message: "User not found" }))
    }
    res.writeHead(200, {
      "content-type" : "application/json"
    })
    return res.end(JSON.stringify(users));
  }

  //POST
  if(req.url === '/users' && req.method === 'POST') {

    let body = '';

    req.on('data', collect => {
      body += collect
      users.push(JSON.parse(body))
      res.writeHead(200, {"content-type" : "application/json"})
      res.end(JSON.stringify(users));
    })
  }

  //PUT
  if(req.url.startsWith('/users/') && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    let body = '';

    req.on('data', collect => {
      body += collect
    });

    req.on('end', () => {
      const data = JSON.parse(body);
      const index = users.findIndex(u => u.id == id);

      users[index] = { ...users[index], ...data };
      res.writeHead(200, { "content-type": "application/json"});
      res.end(JSON.stringify(users[index]));
    });
  }

  //DELETE
  if(req.url.startsWith('/users/') && req.method === 'DELETE') {
    const id = req.url.split('/')[2];

    const index = users.findIndex(u => u.id == id);

    if (index === -1) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    const deletedUser = users.splice(index, 1);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(deletedUser[0]));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
})
