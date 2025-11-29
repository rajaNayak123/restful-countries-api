import http from 'http';

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {

});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});