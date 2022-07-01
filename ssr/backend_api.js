'use strict'

const { REQUEST_GET_MAP, DEFAULT_GET_HANDLE } = require('./backend_get.js')
const { MIME_TYPES, DEFAULT_ENCODING } = require('./backend_const.js')

const REQUEST_GET_CACHE = new Map()

const MIME_JSON = MIME_TYPES.get('.json')

/**
*
*/
const parseURL = function(url){
	const tokens = url.split('/').filter(Boolean)
	const root = tokens[0]
	if(root === 'api') return { api: true, group: tokens[1], id: tokens[2] }
	return { file: true, folder: tokens[1], name: tokens[2] }
}
/**
 * 
*/
const handlePost = function(request, response, parsedURL) {
	let payload = ''
	request.on('data', chunk => { payload += chunk })
	request.on('end', () => {
		const { testVal } = JSON.parse(payload)
		const apiResponse = handleApiTest(Number(testVal))
		
		response.writeHead(200, { 'Content-type': MIME_JSON })
		response.end(apiResponse, DEFAULT_ENCODING)
	})
}
/**
 * @description обработка get-запросов
*/
const handleGet = async function(request, response, parsedURL) {
	const { group, id } = parsedURL
	const signature = `${group}_${id}`
	const cached = REQUEST_GET_CACHE.get(signature)
	if(cached) {
		response.writeHead(200, { 'Content-type': MIME_JSON })
		response.end(cached, DEFAULT_ENCODING)
	} else {
		const handle = REQUEST_GET_MAP.get(group) || DEFAULT_GET_HANDLE
		const apiResponse = await handle(id)
		REQUEST_GET_CACHE.set(signature, apiResponse)
		response.writeHead(200, { 'Content-type': MIME_JSON })
		response.end(apiResponse, DEFAULT_ENCODING)
	}
}

module.exports = {
    handlePost,
    handleGet,
    parseURL
}