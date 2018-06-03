import config from './config';
import http from './http';
import Cart from './models/Cart';
import Product from './models/Product';
import Store from './models/Store';
import Storage from './storage';
import Modal from './ui/Modal';
import utils from './utils';

class SelzClient {
    constructor(props) {
        this.env = !utils.is.empty(props.env) ? props.env : '';
        this.store = new Store(props.store);
        this.colors = utils.is.object(props.colors) ? props.colors : {};
        this.forceTab = utils.is.boolean(props.forceTab) ? props.forceTab : false;

        if (!this.store.hasId && !this.store.hasUrl) {
            throw Error('Store is required to create a client');
        }

        this.storage = new Storage();

        this.modal = new Modal(this.colors, this.env, this.forceTab);
    }

    /**
     * Get the Store by URL
     */
    getStore() {
        return new Promise((resolve, reject) => {
            // Already set
            if (this.store.hasId) {
                resolve(this.store.id);
                return;
            }

            // Cached
            const cached = this.storage.getStore(this.store.url);
            if (!utils.is.empty(cached)) {
                resolve(this.store);
                return;
            }

            // URL or domain are required
            if (!this.store.hasUrl) {
                reject(new Error('Url is required for user lookup'));
                return;
            }

            http
                .get(config.urls.store(this.env, this.store.url))
                .then(store => {
                    this.setStore(store);
                    resolve(this.store);
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Set the store details
     * @param {Object} store
     */
    setStore(store) {
        if (!utils.is.object(store)) {
            return;
        }

        Object.assign(this.store, store);

        this.storage.setStore(this.store.url, this.store);
    }

    /**
     * Get product data
     * @param {string} url - Short or full URL for a product
     */
    getProduct(url) {
        return new Promise((resolve, reject) => {
            http
                .get(config.urls.product(this.env, url))
                .then(json => {
                    if (!this.store.hasId) {
                        this.setStore(json.store);
                    }

                    resolve(new Product(this, json));
                })
                .catch(reject);
        });
    }

    /**
     * Get all products
     */
    getProducts(query = '', page = 1) {
        return new Promise((resolve, reject) => {
            this.getStore()
                .then(() => {
                    http
                        .get(config.urls.products(this.env, this.store.id, query, page < 1 ? 1 : page))
                        .then(json => {
                            resolve(json.map(p => new Product(this, p)));
                        })
                        .catch(reject);
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Create a new shopping cart
     * @param {string} currency - ISO currency code
     * @param {string} [discount] - Discount code
     */
    createCart(currency, discount) {
        return new Promise((resolve, reject) => {
            if (utils.is.empty(currency)) {
                reject(new Error('currency is required'));
                return;
            }

            this.getStore()
                .then(() => {
                    const currencyCode = currency.toUpperCase();

                    http
                        .post(config.urls.createCart(this.env, this.store.id), {
                            currency: currencyCode,
                            discount: !utils.is.empty(discount) ? discount : null,
                        })
                        .then(json => {
                            const cart = new Cart(this, json);

                            // Store reference to cart id for later
                            this.storage.setCart(this.store.id, currencyCode, cart);

                            resolve(cart);
                        })
                        .catch(error => reject(error));
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Get a shopping cart or create one if needed
     * @param {string} currency - The shopping cart ISO currency code
     */
    getCartId(currency) {
        return new Promise((resolve, reject) => {
            if (!utils.is.currencyCode(currency)) {
                reject(new Error('A valid currency code is required'));
                return;
            }

            this.getStore()
                .then(() => {
                    const currencyCode = currency.toUpperCase();
                    const currentCart = this.storage.getCart(this.store.id, currencyCode);

                    // Create cart if it doesn't exist
                    if (utils.is.empty(currentCart)) {
                        this.createCart(currencyCode)
                            .then(cart => resolve(cart.id))
                            .catch(error => reject(error));
                    } else {
                        resolve(currentCart.id);
                    }
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Get a shopping cart
     * @param {string} input - The shopping cart ISO currency code or cart ID
     */
    getCart(input) {
        return new Promise((resolve, reject) => {
            const isCurrency = utils.is.currencyCode(input);
            const isObjectId = utils.is.objectId(input);

            if (!isCurrency && !isObjectId) {
                reject(new Error('A valid currency code or cart id are required'));
                return;
            }

            if (isCurrency) {
                const currencyCode = input.toUpperCase();

                this.getCartId(currencyCode)
                    .then(id => {
                        if (utils.is.empty(id)) {
                            reject(new Error(`Could not find matching cart for currency code '${currencyCode}'`));
                            return;
                        }

                        this.getCart(id)
                            .then(cart => {
                                // Set store
                                if (!this.store.hasId) {
                                    this.setStore(cart.store);
                                }

                                resolve(cart);
                            })
                            .catch(error => reject(error));
                    })
                    .catch(error => reject(error));
            } else {
                http
                    .get(config.urls.getCart(this.env, input))
                    .then(json => {
                        const activeId = this.getActiveCart();
                        const cart = new Cart(this, json, json.id === activeId);

                        // Set store
                        if (!this.store.hasId) {
                            this.setStore(cart.store);
                        }

                        resolve(cart);
                    })
                    .catch(error => reject(error));
            }
        });
    }

    /**
     * Get all current carts
     */
    getCarts(validate = true) {
        return new Promise((resolve, reject) => {
            this.getStore()
                .then(() => {
                    const carts = this.storage.getCarts(this.store.id);

                    if (utils.is.empty(carts)) {
                        resolve(null);
                        return;
                    }

                    // Check the carts still exist in the server
                    if (validate) {
                        const ids = Object.keys(carts).map(currency => carts[currency].id);

                        http
                            .get(config.urls.checkCarts(this.env, ids.join(',')))
                            .then(json => {
                                // Remove non existant carts
                                Object.entries(json).forEach(([id, exists]) => {
                                    if (!exists) {
                                        const currency = Object.keys(carts).find(c => carts[c].id === id);
                                        delete carts[currency];
                                    }
                                });

                                // Set active to first if none exist
                                const currencies = Object.keys(carts);
                                if (currencies.length && !currencies.some(currency => carts[currency].active)) {
                                    currencies.forEach(currency => {
                                        const cart = carts[currency];
                                        cart.active = cart.id === carts[currencies[0]].id;
                                    });
                                }

                                // Update storage
                                this.storage.setCarts(this.store.id, carts);

                                resolve(carts);
                            })
                            .catch(error => reject(error));
                    } else {
                        resolve(carts);
                    }
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Set the active cart based on currency
     * @param {string} input - The shopping cart ISO currency code or cart ID
     */
    setActiveCart(input) {
        return new Promise((resolve, reject) => {
            const isCurrency = utils.is.currencyCode(input);
            const isObjectId = utils.is.objectId(input);

            if (!isCurrency && !isObjectId) {
                reject(new Error('A valid currency or cart id are required'));
                return;
            }

            this.getStore()
                .then(() => {
                    this.getCarts(false).then(data => {
                        const carts = data;

                        // No carts
                        if (utils.is.empty(carts)) {
                            resolve(null);
                            return;
                        }

                        if (isCurrency) {
                            const currencyCode = input.toUpperCase();
                            const currencies = Object.keys(carts);

                            // Bail if not included
                            if (!currencies.includes(currencyCode)) {
                                reject(new Error(`No carts for ${currencyCode}`));
                                return;
                            }

                            // Set active
                            currencies.forEach(code => {
                                carts[code].active = code === currencyCode;
                            });
                        } else {
                            // Set active
                            Object.keys(carts).forEach(code => {
                                const cart = carts[code];
                                cart.active = cart.id === input;
                            });
                        }

                        // Store again
                        this.storage.setCarts(this.store.id, carts);

                        resolve(carts);
                    });
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Get the current active cart
     */
    getActiveCart(fetch = false) {
        return new Promise((resolve, reject) => {
            this.getStore()
                .then(() => {
                    const carts = this.storage.getCarts(this.store.id);

                    if (!Object.keys(carts).length) {
                        resolve(null);
                        return;
                    }

                    const actives = Object.keys(carts).filter(c => carts[c].active);

                    if (!actives.length) {
                        resolve(null);
                        return;
                    }

                    const active = carts[actives[0]];

                    if (!fetch) {
                        resolve(active.id);
                        return;
                    }

                    this.getCart(active.id)
                        .then(cart => resolve(cart))
                        .catch(error => reject(error));
                })
                .catch(error => reject(error));
        });
    }

    /**
     * Add a product to a cart
     * @param {string} id - The cart ID
     * @param {object} product - The product details
     */
    addToCart(id, product) {
        return new Promise((resolve, reject) => {
            if (!utils.is.objectId(id)) {
                reject(new Error('A valid id is required'));
                return;
            }

            if (utils.is.empty(product)) {
                reject(new Error('A valid product is required'));
                return;
            }

            http
                .post(config.urls.addToCart(this.env, id), product)
                .then(json => {
                    const cart = new Cart(this, json, true);

                    // Set store
                    if (!this.store.hasId) {
                        this.setStore(cart.store);
                    }

                    // Set the active cart
                    this.setActiveCart(cart.id)
                        .then(() => {
                            resolve(cart);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    /**
     * Update an items quantity in the shopping cart
     * @param {string} id - The shopping cart ID
     * @param {string} index - The shopping cart item quid
     * @param {number} quantity - Desired quantity
     */
    updateCartItemQuantity(id, index, quantity = 1) {
        return new Promise((resolve, reject) => {
            if (!utils.is.objectId(id)) {
                reject(new Error('A valid id is required'));
                return;
            }

            if (utils.is.empty(index)) {
                reject(new Error('A valid index is required'));
                return;
            }

            http
                .post(config.urls.updateCartItemQuantity(this.env, id), { index, quantity })
                .then(json => {
                    const cart = new Cart(this, json, true);

                    // Set store
                    if (!this.store.hasId) {
                        this.setStore(cart.store);
                    }

                    // Set the active cart
                    this.setActiveCart(cart.id)
                        .then(() => {
                            resolve(cart);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    /**
     * Remove a product from a cart
     * @param {string} id - The shopping cart id
     * @param {string} index - The shopping cart item guid
     */
    removeFromCart(id, index) {
        return new Promise((resolve, reject) => {
            if (!utils.is.objectId(id)) {
                reject(new Error('A valid id is required'));
                return;
            }

            if (utils.is.empty(index)) {
                reject(new Error('A valid index is required'));
                return;
            }

            http
                .post(config.urls.removeFromCart(this.env, id), { index })
                .then(json => {
                    const cart = new Cart(this, json, true);

                    // Set the active cart
                    this.setActiveCart(cart.id)
                        .then(() => {
                            resolve(cart);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
}

export default SelzClient;
