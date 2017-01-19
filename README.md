# node-post-parser
A simple library for parsing POST data
## How to use
```js
const parsePost = require('node-post-parser')
// Later on...
parsePost(request, (postData) => {
    // Do something with the data
}
```
## What is supported
* application/x-www-form-urlencoded
* text/plain
* application/json
Other data types return the POST data as a string
## TODO
* multipart/form-data support
* Various performance improvements (if performance becomes a problem)
* Handle file uploads better