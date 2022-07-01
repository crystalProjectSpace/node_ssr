'use strict'

const { PATHES, MIME_TYPES, DEFAULT_MIME_TYPE, NOT_FOUND, LOCALHOST, NODE_PORT, DEFAULT_ENCODING } = require('./ssr/backend_const.js')
const http = require('http')
const { readFile } = require('fs')
const path = require('path')
const { handleGet, handlePost, parseURL } = require('./ssr/backend_api.js')

const MIME_HTML = MIME_TYPES.get('.html')
/**
*
*/
const fileRespond = function(response, path, contentType = MIME_HTML) {
	readFile(path, function(err, content) {
        if(err) {
            switch (err.code) {
                case NOT_FOUND: {
                    readFile(`./pages/${PATHES.NOT_FOUND}`, function(_err, content) {
                        response.writeHead(404, { 'Content-type': MIME_HTML })
                        response.end(content, DEFAULT_ENCODING)
                    })
                    break;
                }
                default: {
                    response.writeHead(500)
                    response.end(`Internal error: ${err.code}`)
                }
            }
        } else {
            response.writeHead(200, { 'Content-type': contentType })
            response.end(content, DEFAULT_ENCODING)
        }
    })
}
/**
*
*/
const requestHandler = function(request, response) {
    let filePath, extName
	
    if(request.url === PATHES.ROOT) {
        filePath = `./pages/${PATHES.DEFAULT}`
        extName = '.html'
		fileRespond(response, filePath)
	} else {
		const parsedURL = parseURL(request.url)
		if(parsedURL.api) {
			const method = request.method
			switch(method) {
				case 'POST': handlePost(request, response, parsedURL); break;
				case 'GET': handleGet(request, response, parsedURL); break;
				default: console.log('no handlers to unknown request method'); break;
			}
		} else {
			extName = String(path.extname(request.url)).toLowerCase()
			filePath = `./${request.url}`
			const contentType = MIME_TYPES.get(extName) || DEFAULT_MIME_TYPE
			fileRespond(response, filePath, contentType)
		}
    }
}

const server = http.createServer(requestHandler)

server.listen(NODE_PORT)
console.log(`node server running on http://${LOCALHOST}:${NODE_PORT}/`)