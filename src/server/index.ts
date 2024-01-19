import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  // aquí es donde servirás tus archivos estáticos
  console.log(req.url);
  const filePath = '.' + req.url;

  // lee el archivo
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // enviar un mensaje de error al cliente
      res.statusCode = 404;
      res.end('File not found');
    } else {
      // enviar el archivo al cliente
      res.end(data);
    }
  });
});
server.listen(4500, () => {
  console.log(`Serving static files at http://localhost:4500`);
});