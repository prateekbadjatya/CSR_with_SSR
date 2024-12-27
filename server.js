const http = require('http');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Hello = require('./HelloComponent'); // Import the Hello component

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Render the React component to HTML
        const html = ReactDOMServer.renderToString(React.createElement(Hello));

        // Send the HTML content with script tags for React and ReactDOM
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <head>
                <title>Server-Side Rendered React</title>
                <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
            </head>
            <body>
                <div id="app">${html}</div>
                <script src="/client.bundle.js"></script>
            </body>
            </html>
        `);
    } else if (req.url === '/client.bundle.js') {
        // Serve the client bundle JavaScript file
        fs.readFile(path.join(__dirname, 'client.bundle.js'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        });
    } else {
        // Handle other routes or requests
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
