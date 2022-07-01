'use strict'

const { DEFAULT_ENCODING } = require('./backend_const.js')
const { createNode } = require('./node_handler.js')
const fsPromises = require('fs').promises

const PAGE_HANDLE = async id => {
    const data = await fsPromises.readFile(`./data/note_${id}.json`, { encoding: DEFAULT_ENCODING})
    const pageJson = JSON.parse(data)
    return JSON.stringify({ msg: createNode(pageJson.content)});
}

const LIST_HANDLE = async () => {
    const data = await fsPromises.readdir(`./data`, { encoding: DEFAULT_ENCODING})
    const acquireFileStats = data.map(name => fsPromises.stat(`./data/${name}`))
    const stats = await Promise.all(acquireFileStats)
    const fileData = stats.map((s, i) => {
        const { size, birthtime } = s
        const name = data[i]
        const id = (name.split('.')[0]).split('_').pop()
        const birthDateTime = new Date(birthtime)
        return {
            size: `${(size / 1024).toFixed(2)} kB`,
            datetime: `${birthDateTime.toLocaleDateString()} ${birthDateTime.toLocaleTimeString()}`,
            name,
            id
        }
    })

    return JSON.stringify({ msg: fileData});
}

module.exports = {
    REQUEST_GET_MAP: new Map([
        ['page', PAGE_HANDLE],
        ['list', LIST_HANDLE]
    ]),
    DEFAULT_GET_HANDLE: () => JSON.stringify({ msg: 'unknown handler' })
}