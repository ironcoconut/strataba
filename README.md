# Installation and Setup

0.	Make sure dependencies are installed (<code>mongoDB</code>, <code>npm install</code>...).
1.	Copy <code>config.sample.json</code> to <code>config.json</code> and fill out the required info in the file.
2.	Run <code>node load-mock-data.js</code> to setup the mongodb.
3.	Run <code>node server.js</code> to run the server.
4.	Navigate to <code>http://localhost:1212/api/{model-name}</code> to view the mock data.
5.	Current models are in <code>./server.js</code> in the module variable.
