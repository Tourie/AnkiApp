"use strict";

import Utils from "./js/services/utils.js"

import UnauthorizedHeader from "./views/components/header-unauthorized.js"
import Header from "./views/components/header.js"

import Home from "./views/pages/Home.js"
import EditSet from "./views/pages/EditSet.js"
import Login from "./views/pages/Login.js"
import Registration from "./views/pages/Registration.js"
import MySets from "./views/pages/MySets.js"

import Error404 from "./views/pages/Error404.js"
import NewSet from "./views/pages/NewSet.js";
import Delete from "./views/components/delete.js";

const routes = {
    '/'             : Home,
    '/login'        : Login,
    '/registration' : Registration,
    '/my-sets'      : MySets,
    '/new-set'      : NewSet,

    '/my-sets/:id' : EditSet,
    '/delete-set/:id': Delete
};

const router = async () => {

    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    
    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    if (localStorage.getItem('userId') === null) {
        if (parsedURL != '/login' && parsedURL != '/registration' && parsedURL != '/') {
            page = Home;
        }
        header.innerHTML = await UnauthorizedHeader.render();
        await UnauthorizedHeader.after_render();
    }
    else {
        header.innerHTML = await Header.render();
        await Header.after_render();
    }
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);