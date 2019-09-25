const https = require('https');

const HOSTNAME = 'api.culqi.com';

const PATHS = {
    cards: 'cards',
    charges: 'charges',
    customers: 'customers',
    plans: 'plans',
    subscriptions: 'subscriptions',
    tokens: 'tokens'
};

class Culqi {

    /**
     *
     * @param secret_key
     * @param opts
     */
    constructor (secret_key, opts) {
        this.secret_key = secret_key;

        this.opts = Object.assign({
            version: 'v2',
            hostname: HOSTNAME
        }, opts || {});
    }

    /**
     *
     * @param verb GET|POST|PATCH|DELETE
     * @param path Array
     * @param data Object
     * @param callback Function
     * @private
     */
    _request(verb, path, data, callback) {
        path.unshift(this.opts.version);
        path.unshift('');

        if ( typeof data == 'function' ) {
            callback = data;
            data = null;
        }

        var req = https.request({
            hostname: this.opts.hostname,
            path: path.join('/'),
            method: verb,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.secret_key,
            }
        }, res => {
            res.on('data', d => {
                var response = JSON.parse(d.toString());
                if( response && response.object == 'error' ) {
                    callback(response);
                } else {
                    callback(null, response);
                }
            })
        });

        req.on('error', callback);
        data && req.write(JSON.stringify(data));
        req.end();
    }

    /* Plans */
    createPlan (data, fn) {
        this._request('POST', [PATHS.plans], data, fn);
    }
    getPlan (id, fn) {
        this._request('GET', [PATHS.plans, id], fn);
    }
    getPlans (fn) {
        this._request('GET', [PATHS.plans], fn);
    }
    updatePlan (id, data, fn) {
        this._request('PATCH', [PATHS.plans, id], data, fn);
    }
    deletePlan (id, fn) {
        this._request('DELETE', [PATHS.plans, id], fn);
    }

    /* Tokens */
    createToken (data, fn) {
        this._request('POST', [PATHS.tokens], data, fn);
    }
    getTokens (data, fn) {
        this._request('GET', [PATHS.tokens], fn);
    }
    getToken (data, fn) {
        this._request('GET', [PATHS.tokens], fn);
    }
    updateToken (id, data, fn) {
        this._request('PATCH', [PATHS.tokens, id], data, fn);
    }

    /* Cards */
    createCard (data, fn) {
        this._request('POST', [PATHS.cards], data, fn);
    }
    getCard (id, fn) {
        this._request('GET', [PATHS.cards, id], fn);
    }
    getCards (fn) {
        this._request('GET', [PATHS.cards], fn);
    }
    updateCard (id, data, fn) {
        this._request('PATCH', [PATHS.cards, id], data, fn);
    }
    deleteCard (id, fn) {
        this._request('DELETE', [PATHS.cards, id], fn);
    }

    /* Subscriptions */
    createSubscription (data, fn) {
        this._request('POST', [PATHS.subscriptions], data, fn);
    }
    getSubscription (id, fn) {
        this._request('GET', [PATHS.subscriptions, id], fn);
    }
    getSubscriptions (fn) {
        this._request('GET', [PATHS.subscriptions], fn);
    }
    updateSubscription (id, data, fn) {
        this._request('PATCH', [PATHS.subscriptions, id], data, fn);
    }
    deleteSubscription (id, fn) {
        this._request('DELETE', [PATHS.subscriptions, id], fn);
    }

    /* Customers */
    createCustomer (data, fn) {
        this._request('POST', [PATHS.customers], data, fn);
    }
    getCustomer (id, fn) {
        this._request('GET', [PATHS.customers, id], fn);
    }
    getCustomers (fn) {
        this._request('GET', [PATHS.customers], fn);
    }
    updateCustomer (id, data, fn) {
        this._request('PATCH', [PATHS.customers, id], data, fn);
    }
    deleteCustomer (id, fn) {
        this._request('DELETE', [PATHS.customers, id], fn);
    }

    /* Charges */
    createCharge (data, fn) {
        this._request('POST', [PATHS.charges], data, fn);
    }
    getCharge (id, fn) {
        this._request('GET', [PATHS.charges, id], fn);
    }
    getCharges (fn) {
        this._request('GET', [PATHS.charges], fn);
    }
    updateCharge (id, data, fn) {
        this._request('PATCH', [PATHS.charges, id], data, fn);
    }
    captureCharge (id, fn) {
        this._request('DELETE', [PATHS.charges, id, 'capture'], fn);
    }
}

module.exports = Culqi;