'use strict'

const GET = 'GET'
const POST = 'POST'

const ENDPOINTS = {
	ARTICLE_ITEM: {
		method: GET,
		path: '/api/page'
	},
	ARTICLE_LIST: {
		method: GET,
		path: '/api/list'
	}
} 

const apiPostHandler = function(path, payload) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
				
		request.open('POST', path, true);
		request.setRequestHeader('Content-Type','application/json');
				
		request.onreadystatechange = function()	{
			if(this.readyState === 4 && this.status === 200){            
				resolve(JSON.parse(this.responseText));
			}	
		}
		request.send(JSON.stringify(payload));
	})
}
			
const apiGetHandler = function(path, id) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
				
		request.open('GET', `${path}/${id}`, true);
		request.setRequestHeader('Content-Type','application/json');
				
		request.onreadystatechange = function()	{
			if(this.readyState === 4 && this.status === 200){            
				resolve(JSON.parse(this.responseText));
			}	
		}
		request.send(null);
	})
}

const generateApiHandlers = function(apiMap) {
	const apiEntries = Object
		.entries(apiMap)
		.map(([apiKey, props]) => {
			const { method, path } = props
			return method === GET
				? [ apiKey, id => apiGetHandler(path, id)]
				: [ apiKey, payload => apiPostHandler(path, payload) ]
		})
		
	return Object.fromEntries(apiEntries)
}

export const API_HANDLERS = generateApiHandlers(ENDPOINTS)