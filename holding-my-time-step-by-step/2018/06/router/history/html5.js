/*
* @Author: gaopeng
* @Email:  gaopeng_hdu@163.com
* @Date:   2018-06-30 10:54:40
* @Last Modified by:   gaopeng
* @Last Modified time: 2018-06-30 11:01:20
*/

'use strict';
import { Base, match } from './base';

export class HTML5History extends Base {
	constructor(router) {
		super(router);
		window.addEventListener('popstate', () => {
			this.transitionTo(getLocation());
		})
	}

	push (location) {
	    const targetRoute = match(location, this.router.routes);

	    this.transitionTo(targetRoute, () => {
	      	changeUrl(this.router.base, this.current.fullPath);
	    })
  	}

  	replaceState(location) {
  		const targetRoute = match(location, this.router.routes);
  		this.transitionTo(targetRoute, () => {
	      	changeUrl(this.router.base, this.current.fullPath, true);
	    })
  	}

  	go (n) {
    	window.history.go(n);
  	}

  	getCurrentLocation () {
    	return getLocation(this.router.base);
  	}
}

function getLocation(base = '') {
	let path = window.location.pathname;
	if (base && path.indexOf(base) === 0) {
		path = path.slice(base.length)
	}
	return (path || '/') + window.location.search + window.location.hash
}

function changeUrl(base, path, replace) {
	if (replace) {
		window.history.replaceState({}, '', (base + path).replace(/\/\//g, '/'));
	} else {
		window.history.pushState({}, '', (base + path).replace(/\/\//g, '/'));
	}
};