'use strict'

import { API_HANDLERS } from './front-api.js'
  
const getPage = API_HANDLERS['ARTICLE_ITEM']
const getPageList = API_HANDLERS['ARTICLE_LIST']

const navItem = function(item) {
    const { size, name, datetime } = item
    return `
<span class="menu-item__name">${name}</span>
<span class="menu-item__details">
    <span class="menu-item__details-prop">${size}</span>
    <span class="menu-item__details-prop">${datetime}</span>
</span>
    `
}

const navMenu = function(socket, items, converter, handle = null) {
    const menuObj = `
<nav class="menu__nav">
    <menu class="menu-list">
        ${items.map(i => '<li class="menu-item" data-id="' + i.id + '">' + converter(i) + '</li>')}        
    </menu>
</nav>    
    `
    socket.innerHTML = menuObj
    if (handle) {
        const menuLinks = socket.querySelectorAll('.menu-item')
        menuLinks.forEach(l => {
            const itemId = Number(l.dataset.id)
            l.addEventListener('click', () => { handle(itemId) })
        })
    }
}

const renderArticle = articleSocket => async articleId => {
    const { msg } = await getPage(Number(articleId))
    articleSocket.innerHTML = msg
}

export const pageInit = async function() {
    const articleSocket = document.getElementById('socket-1')
    const menuSocket = document.getElementById('socket-2')

    const { msg } = await getPageList()
    const articleNavHandle = renderArticle(articleSocket)
    navMenu(menuSocket, msg, navItem, articleNavHandle)
}