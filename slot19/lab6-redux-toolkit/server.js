const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/payments", (req, res, next) => {
  const amount = req.body.amount;
  if (amount > 1000) {
    return res.status(402).json({
      message: "Not enough balance"
    });
  }
  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running with middleware on 3001");
});
