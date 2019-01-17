function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _typeof$1(t){return(_typeof$1="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t)})(t)}function _classCallCheck$1(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties$1(t,e){for(var n,r=0;r<e.length;r++)(n=e[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}function _createClass$1(t,e,n){return e&&_defineProperties$1(t.prototype,e),n&&_defineProperties$1(t,n),t}function _defineProperty$1(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function _slicedToArray$1(t,e){return _arrayWithHoles$1(t)||_iterableToArrayLimit$1(t,e)||_nonIterableRest$1()}function _arrayWithHoles$1(t){if(Array.isArray(t))return t}function _iterableToArrayLimit$1(t,e){var n,r=[],i=!0,o=!1;try{for(var c,a=t[Symbol.iterator]();!(i=(c=a.next()).done)&&(r.push(c.value),!e||r.length!==e);i=!0);}catch(t){o=!0,n=t}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return r}function _nonIterableRest$1(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var getConstructor=function(t){return null==t?null:t.constructor},instanceOf=function(t,e){return!!(t&&e&&t instanceof e)},isArray=function(t){return Array.isArray(t)},isObject=function(t){return getConstructor(t)===Object},isNumber=function(t){return getConstructor(t)===Number&&!Number.isNaN(t)},isString=function(t){return getConstructor(t)===String},isBoolean=function(t){return getConstructor(t)===Boolean},isFunction=function(t){return getConstructor(t)===Function},isNullOrUndefined=function(t){return null==t},isObjectId=function(t){return isString(t)&&/^[a-f\d]{24}$/i.test(t)},isCurrencyCode=function(t){return isString(t)&&/^[A-z]{3}$/.test(t)},isEmpty=function(t){return isNullOrUndefined(t)||(isString(t)||isArray(t))&&!t.length||isObject(t)&&!Object.keys(t).length},isUrl=function(t){var e=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1];if(instanceOf(t,window.URL))return!0;var n=t;e||/^https?:\/\/*/.test(t)||(n="http://".concat(t));try{return!isEmpty(new URL(n).hostname)}catch(t){return!1}},is={array:isArray,object:isObject,number:isNumber,string:isString,boolean:isBoolean,function:isFunction,nullOrUndefined:isNullOrUndefined,objectId:isObjectId,currencyCode:isCurrencyCode,url:isUrl,empty:isEmpty},getBase=function(t){return"https://".concat(is.empty(t)?"sdk.selz.com":"".concat(t,"/sdk"),"/")},config={urls:{product:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"products/find?url=").concat(e)},products:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"",i=4<arguments.length&&void 0!==arguments[4]?arguments[4]:1;return"".concat(getBase(t),"products/all/").concat(e,"?q=").concat(n,"&c=").concat(r,"&p=").concat(i)},categories:function(t,e){return"".concat(getBase(t),"categories/").concat(e)},store:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return is.number(e)?"".concat(getBase(t),"store/find/").concat(e):"".concat(getBase(t),"store/find?url=").concat(e)},createCart:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"cart/create/").concat(e)},getCart:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"cart/").concat(e)},checkCarts:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"cart/verify?ids=").concat(e)},addToCart:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"cart/add/").concat(e)},updateCartItemQuantity:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"cart/updateitemquantity/").concat(e)},removeFromCart:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return"".concat(getBase(t),"cart/remove/").concat(e)}}},client=null,ProductUrls=function t(e){_classCallCheck$1(this,t),Object.assign(this,e)},ProductImage=function t(e){_classCallCheck$1(this,t),Object.assign(this,e)},ProductMedia=function t(e){_classCallCheck$1(this,t),Object.assign(this,e),this.cover=new ProductImage(e.cover)},ProductFile=function t(e){_classCallCheck$1(this,t),Object.assign(this,e)},ProductVariant=function t(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";_classCallCheck$1(this,t),Object.assign(this,e),this.selected=e.id===n},ProductVariantAttributeOption=function t(e,n){_classCallCheck$1(this,t),this.id=e,this.label=n},ProductVariantAttribute=function t(e){_classCallCheck$1(this,t),Object.assign(this,e),this.options=Object.keys(e.options).map(function(t){return new ProductVariantAttributeOption(t,e.options[t])})},Product=function(){function t(e,n){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";if(_classCallCheck$1(this,t),is.object(n)){if(client=e,Object.assign(this,n),this.store=client.store,is.object(n.urls)&&(this.urls=new ProductUrls(n.urls)),is.object(n.media)&&(this.media=new ProductMedia(n.media)),is.array(n.images)&&(this.images=n.images.map(function(t){return new ProductImage(t)})),is.array(n.files)&&(this.files=n.files.map(function(t){return new ProductFile(t)})),n.has_variants){var i=is.empty(r)?n.variants[0].id:r;this.variants=n.variants.map(function(t){return new ProductVariant(t,i)})}n.has_variant_attributes&&(this.variant_attributes=n.variant_attributes.map(function(t){return new ProductVariantAttribute(t)}))}}return _createClass$1(t,[{key:"selected_variant",get:function(){return is.empty(this.variants)?null:this.variants.find(function(t){return t.selected})}}]),t}(),client$1=null,CartItem=function t(e,n){_classCallCheck$1(this,t),this.cartId=n,Object.assign(this,e),this.product=new Product(client$1,e.product,e.variant_id)},Cart=function(){function t(e,n){var r=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2];_classCallCheck$1(this,t),null===n||(client$1=e,Object.assign(this,n),this.store=client$1.store,this.active=r,this.items=Array.from(n.items).map(function(t){return new CartItem(t,n.id)}))}return _createClass$1(t,[{key:"add",value:function(t){return client$1.addToCart(this.id,t)}},{key:"remove",value:function(t){return client$1.removeFromCart(this.id,t)}}]),t}(),Category=function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;_classCallCheck$1(this,t),is.object(e)&&Object.assign(this,e)},Store=function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;_classCallCheck$1(this,t),is.object(e)&&Object.assign(this,e)};function replaceAll(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";return t.replace(new RegExp(e.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),"g"),n.toString())}function toTitleCase(){return(0<arguments.length&&void 0!==arguments[0]?arguments[0]:"").toString().replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})}function toPascalCase(){var t=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:"").toString();return t=replaceAll(t,"-"," "),t=replaceAll(t,"_"," "),replaceAll(t=toTitleCase(t)," ","")}var buildFormData=function(){var t,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=1<arguments.length?arguments[1]:void 0,r=2<arguments.length?arguments[2]:void 0,i=n||new FormData;return is.object(e)?(Object.keys(e).forEach(function(n){t=r?"".concat(r,"[").concat(n,"]"):n,"object"!==_typeof$1(e[n])||e[n]instanceof File?i.append(toPascalCase(t),e[n]):buildFormData(e[n],i,n)}),i):i};function extend(){for(var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length,n=Array(1<e?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];if(!n.length)return t;var i=n.shift();return is.object(i)?(Object.keys(i).forEach(function(e){is.object(i[e])?(!Object.keys(t).includes(e)&&Object.assign(t,_defineProperty$1({},e,{})),extend(t[e],i[e])):Object.assign(t,_defineProperty$1({},e,i[e]))}),extend.apply(void 0,[t].concat(n))):t}function parseJSON(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(e,n){try{e(JSON.parse(t))}catch(t){n(t)}})}var defaults={type:"GET",body:{},responseType:"json"};function fetch(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=extend({},defaults,e),r=n.type,i=n.body,o=n.responseType;return new Promise(function(e,n){try{var c=new XMLHttpRequest;if(!("withCredentials"in c)){var a=new Error("No CORS support");throw a.request=c,a}var s=function(){var t=new Error(c.status);t.request=c,n(t)};c.addEventListener("load",function(){var t=c.response;return 400<=c.status?void s():void("json"===o?parseJSON(t).then(function(t){if(t.success)e(t.data);else{var r=new Error("Request failed");r.errors=t.errors,n(r)}}).catch(n):e(t))}),c.addEventListener("error",s),c.open(r,t,!0),"json"!==o&&(c.responseType=o),c.send(buildFormData(i))}catch(t){n(t)}})}var queue={},http={get:function(t){if(!Object.keys(queue).includes(t)){queue[t]=fetch(t);var e=function(){delete queue[t]};queue[t].then(e).catch(e)}return queue[t]},post:function(t){return fetch(t,{type:"POST",body:1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}})}};function dedupe(t){return is.array(t)?t.filter(function(e,n){return t.indexOf(e)===n}):t}function parseUrl(t){var e=t;/^https?:\/\/*/.test(t)||(e="http://".concat(t));try{return new URL(e)}catch(t){return null}}var storage=new Map,getKey=function(t){if(null===t)return null;var e=parseUrl(t);return null===e?null:"".concat(e.host).concat(e.pathname).replace(/\/$/,"")},Storage=function(){function t(e){_classCallCheck$1(this,t),this.config=Object.assign({keys:{root:"selz-js-sdk",carts:"carts",stores:"stores"},ttl:3600,schema:new Date("2018-07-02").getTime()},e),this.purge()}return _createClass$1(t,[{key:"get",value:function(e){var n=storage.get(this.config.keys.root);if(t.supported){var r=window.localStorage.getItem(this.config.keys.root);is.empty(r)||(n=JSON.parse(r))}return is.empty(n)?null:is.empty(e)?n:Object.keys(n).includes(e)?n[e]:null}},{key:"set",value:function(e,n){var r=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],i=this.get()||{};if(i[e]=r&&Object.keys(i).includes(e)?extend(i[e],n):n,storage.set(this.config.keys.root,i),t.supported){i.schema=this.config.schema;try{window.localStorage.setItem(this.config.keys.root,JSON.stringify(i))}catch(t){}}}},{key:"purge",value:function(){var t=this.get();if(!is.empty(t)){if(+t.schema!==this.config.schema)return void window.localStorage.removeItem(this.config.keys.root);var e=this.get(this.config.keys.stores)||[];is.empty(e)||this.set(this.config.keys.stores,e.filter(function(t){var e=+t.ttl;return 0<e&&e>Date.now()}))}}},{key:"getCarts",value:function(t){var e=this.get(this.config.keys.carts)||{};return is.empty(e)?null:is.number(t)?Object.keys(e).includes(t.toString())?e[t.toString()]:null:e}},{key:"getCart",value:function(t,e){var n=this.getCarts(t);return is.empty(n)?null:is.string(e)?Object.keys(n).includes(e.toUpperCase())?n[e.toUpperCase()]:null:n}},{key:"setCart",value:function(t,e,n){this.set(this.config.keys.carts,_defineProperty$1({},t,_defineProperty$1({},e.toUpperCase(),{id:n.id,active:n.active})),!0)}},{key:"setCarts",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.set(this.config.keys.carts,_defineProperty$1({},t,e))}},{key:"getStore",value:function(t){var e=null;if(!is.number(t)&&!is.url(t))return null;var n=this.get(this.config.keys.stores)||[];if(is.number(t))e=n.find(function(e){return is.object(e.data)&&e.data.id===t});else if(is.url(t)){var r=getKey(t);if(null===r)return null;e=n.find(function(t){return is.array(t.urls)&&t.urls.includes(r)})}if(!is.object(e))return null;var i=+e.ttl;return 0<i&&i<Date.now()?(this.purge(),null):new Store(e.data)}},{key:"setStore",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,n=getKey(e),r=this.get(this.config.keys.stores)||[],i=null;is.empty(r)||(i=r.find(function(e){return e.data.id===t.id}));var o=Date.now()+this.config.ttl;if(is.object(i)){if(Object.assign(i,{data:t,ttl:o}),null!==n){is.array(i.urls)?i.urls.push(n):i.urls=[n];var c=dedupe(i.urls);Object.assign(i,{urls:c})}}else{var a={data:t,ttl:o};null!==n&&Object.assign(a,{urls:[n]}),r.push(a)}this.set(this.config.keys.stores,r)}}],[{key:"supported",get:function(){if(!window.localStorage)return!1;try{return window.localStorage.setItem("___test","___test"),window.localStorage.removeItem("___test"),!0}catch(t){return!1}}}]),t}(),Client=function(){function t(e){_classCallCheck$1(this,t);var n=e.env,r=e.store;if(this.env=is.empty(n)?"":n,this.store=r,!is.url(r)&&!is.number(r))throw Error("A store ID or URL is required to create a client");this.storage=new Storage}return _createClass$1(t,[{key:"getStoreId",value:function(){var t=this;return new Promise(function(e,n){return is.number(t.store)?void e(t.store):t.store instanceof Store?void e(t.store.id):(!is.url(t.store)&&n(new Error("Url is required for user lookup")),void t.getStore().then(function(t){e(t.id)}).catch(n))})}},{key:"getStore",value:function(){var t=this;return new Promise(function(e,n){if(is.number(t.store)||is.url(t.store)){var r=t.storage.getStore(t.store);if(null!==r&&r instanceof Store)return void e(r)}if(t.store instanceof Store)e(t.store);else{var i=config.urls.store(t.env,t.store);http.get(i).then(function(n){t.setStore(n),e(t.store)}).catch(n)}})}},{key:"setStore",value:function(t){if(is.object(t)){var e=is.url(this.store)?this.store:null;this.store=new Store(t),this.storage.setStore(this.store,e)}}},{key:"getProduct",value:function(t){var e=this;return new Promise(function(n,r){http.get(config.urls.product(e.env,t)).then(function(t){e.store instanceof Store||e.setStore(t.store),n(new Product(e,t))}).catch(r)})}},{key:"getProducts",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1;return new Promise(function(i,o){t.getStoreId().then(function(c){http.get(config.urls.products(t.env,c,is.empty(e)?"":e,is.objectId(n)?n:"",!is.number(r)||1>r?1:r)).then(function(e){i(Object.assign({},e,{products:e.products.map(function(e){return new Product(t,e)})}))}).catch(o)}).catch(o)})}},{key:"getCategories",value:function(){var t=this;return new Promise(function(e,n){t.getStoreId().then(function(r){http.get(config.urls.categories(t.env,r)).then(function(t){e(Object.assign({},t,{categories:t.categories.map(function(t){return new Category(t)})}))}).catch(n)}).catch(n)})}},{key:"createCart",value:function(t,e){var n=this;return new Promise(function(r,i){return is.empty(t)?void i(new Error("currency is required")):void n.getStoreId().then(function(o){var c=t.toUpperCase();http.post(config.urls.createCart(n.env,o),{currency:c,discount:is.empty(e)?null:e}).then(function(t){var e=new Cart(n,t);n.storage.setCart(o,c,e),r(e)}).catch(i)}).catch(i)})}},{key:"getCartId",value:function(t){var e=this;return new Promise(function(n,r){return is.currencyCode(t)?void e.getStoreId().then(function(i){var o=t.toUpperCase(),c=e.storage.getCart(i,o);is.empty(c)?e.createCart(o).then(function(t){return n(t.id)}).catch(r):n(c.id)}).catch(r):void r(new Error("A valid currency code is required"))})}},{key:"getCart",value:function(t){var e=this;return new Promise(function(n,r){var i=is.currencyCode(t),o=is.objectId(t);if(i||o)if(i){var c=t.toUpperCase();e.getCartId(c).then(function(t){return is.empty(t)?void r(new Error("Could not find matching cart for currency code '".concat(c,"'"))):void e.getCart(t).then(function(t){e.setStore(t.store),n(t)}).catch(r)}).catch(r)}else http.get(config.urls.getCart(e.env,t)).then(function(t){var r=e.getActiveCart(),i=new Cart(e,t,t.id===r);e.setStore(i.store),n(i)}).catch(r);else r(new Error("A valid currency code or cart id are required"))})}},{key:"getCarts",value:function(){var t=this,e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];return new Promise(function(n,r){t.getStoreId().then(function(i){var o=t.storage.getCarts(i);if(is.empty(o))n(null);else if(e){var c=Object.keys(o).map(function(t){return o[t].id});http.get(config.urls.checkCarts(t.env,c.join(","))).then(function(e){Object.entries(e).forEach(function(t){var e=_slicedToArray$1(t,2),n=e[0];if(!e[1]){var r=Object.keys(o).find(function(t){return o[t].id===n});delete o[r]}}),t.storage.setCarts(i,o),Object.values(o).find(function(t){return t.active})?n(o):t.setActiveCart().then(n).catch(r)}).catch(r)}else n(o)}).catch(r)})}},{key:"setActiveCart",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return new Promise(function(n,r){t.getStoreId().then(function(i){t.getCarts(!1).then(function(o){var c=o;if(is.empty(c))n(null);else{if(is.currencyCode(e)){var a=e.toUpperCase(),s=Object.keys(c);if(!s.includes(a))return void r(new Error("No carts for ".concat(a)));s.forEach(function(t){c[t].active=t===a})}else{var u=is.objectId(e)?e:c[Object.keys(c)[0]].id;Object.keys(c).forEach(function(t){var e=c[t];e.active=e.id===u})}t.storage.setCarts(i,c),n(c)}})}).catch(r)})}},{key:"getActiveCart",value:function(){var t=this,e=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0];return new Promise(function(n,r){t.getStoreId().then(function(i){var o=t.storage.getCarts(i);if(Object.keys(o).length){var c=Object.values(o).find(function(t){return t.active});return c?e?void t.getCart(c.id).then(n).catch(r):void n(c.id):void n(null)}n(null)}).catch(r)})}},{key:"addToCart",value:function(t,e){var n=this;return new Promise(function(r,i){return is.objectId(t)?is.empty(e)?void i(new Error("A valid product is required")):void http.post(config.urls.addToCart(n.env,t),e).then(function(t){var e=new Cart(n,t,!0);n.setStore(e.store),n.setActiveCart(e.id).then(function(){r(e)}).catch(i)}).catch(i):void i(new Error("A valid id is required"))})}},{key:"updateCartItemQuantity",value:function(t,e){var n=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1;return new Promise(function(i,o){return is.objectId(t)?is.empty(e)?void o(new Error("A valid index is required")):void http.post(config.urls.updateCartItemQuantity(n.env,t),{index:e,quantity:r}).then(function(t){var e=new Cart(n,t,!0);n.setStore(e.store),n.setActiveCart(e.id).then(function(){i(e)}).catch(o)}).catch(o):void o(new Error("A valid id is required"))})}},{key:"removeFromCart",value:function(t,e){var n=this;return new Promise(function(r,i){return is.objectId(t)?is.empty(e)?void i(new Error("A valid index is required")):void http.post(config.urls.removeFromCart(n.env,t),{index:e}).then(function(t){if(is.empty(t))n.getCarts().then(function(){return r(null)}).catch(i);else{var e=new Cart(n,t,!0);n.setActiveCart(e.id).then(function(){r(e)}).catch(i)}}).catch(i):void i(new Error("A valid id is required"))})}}]),t}();document.addEventListener("DOMContentLoaded",function(){function t(t,e){var n=document.createElement("details"),i=document.createElement("summary");i.innerHTML=t,n.appendChild(i);var o=document.createElement("div"),c=document.createElement("pre");c.classList.add("prettyprint"),c.innerHTML=JSON.stringify(e,null,4),o.appendChild(c),n.appendChild(o),r.appendChild(n),window.prettyPrint()}function e(e,n){return n instanceof Error?t("".concat(e," (error)"),{error:n.toString()}):t("".concat(e," (failed)"),n)}function n(n){(function(e){return new Promise(function(n,r){return window.cart?void n(window.cart):void i.getCart(e).then(function(e){t("Get cart",e),window.cart=e,n(e)}).catch(function(t){return r(t)})})})(n.currency_code).then(function(r){var i=null;"string"==typeof n.variant&&n.variant.length?i=n.variant:n.variants&&n.variants.length&&(i=n.variants[0].id),r.add({id:n.id,quantity:2,variant_id:i}).then(function(e){t("Add to cart",e),window.cart=e}).catch(function(t){return e("Add to cart",t)})}).catch(function(t){return e("Get cart",t)})}var r=document.getElementById("output"),i=new Client({store:"local.sampotts.me",env:"local-selz.com"});window.client=i,t("Client",i),i.getProduct("http://selz.co/1MaSYRU").then(function(e){t("Product",e),window.product=e,n(e)}).catch(function(t){return e("Product",t)})});
//# sourceMappingURL=scripts.js.map
