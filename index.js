const querystring = require('querystring')
const readPostData = (request, cb) => {
	let data = ''
	request.on('data', d => data += d)
	request.on('end', () => {
		let type = request.headers['content-type']
		if(type.indexOf('urlencoded') >= 0) {
			// application/x-www-form-urlencoded
			cb(querystring.parse(data))
		} else if(type.indexOf('form-data') >= 0) {
			// multipart/form-data
			cb(data) // TODO
		} else if(type.indexOf('plain') >= 0) {
			// text/plain
			let obj = {}
			data.split('\r\n').map(x => {
				let splitX = x.split('=')
				return [splitX[0], splitX.slice(1).join('=')]
			}).map(x => obj[x[0]] = x[1])
			cb(obj)
		} else if(type.indexOf('json') >= 0) {
			// application/json
			try {
				cb(JSON.parse(data))
			} catch(e) {
				cb(undefined)
			}
		} else {
			// other
			cb(data)
		}
	})
}
module.exports = readPostData
