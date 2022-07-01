'use strict'

const TEXT = 'text'

const setAttributes = function(attributeList) {
	return Object
		.entries(attributeList)
		.reduce((attrs, entry) => `${attrs} ${entry[0]}="${entry[1]}"`, '')
}

const createNode = function(node) {
	const { tag, children, classList, attributeList } = node
	if (tag === TEXT) return createElementaryNode(tag, [], [], children[0])
	if (children.length === 0) return createElementaryNode(tag, classList, attributeList)
	
	const childNodes = children.map(childNode => createNode(childNode)).join('')
	const classes = (classList || []).join(' ')
	const attributes = setAttributes(attributeList || {})
	
	return `<${tag} class="${classes}" ${attributes}>${childNodes}</${tag}>`
}

const createElementaryNode = function(tag, classList, attributeList, content) {
	if(tag === TEXT) return content
	const classes = (classList || []).join(' ')
	const attributes = setAttributes(attributeList || {})
	return `<${tag} class="${classes}" ${attributes}/>`
}

module.exports = {
	createNode,
	TEXT
}