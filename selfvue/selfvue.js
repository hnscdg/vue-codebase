/**
 * selfvue definition
 * @param {obserer data} data 
 * @param {dom element} el 
 * @param {expression, name in here} exp 
 */
function SelfVue(data, el, exp) {
    var self = this;
    this.data = data;

    Object.keys(data).forEach((key) => {
        // bind property, get name value and set it
        self.proxyKeys(key); 
    });

    // set data as observer
    observe(data);

    // this.data["name"] = 'hello world'
    // set innerHTML vaule is "hello world"
    // this command is used for compile dom value
    el.innerHTML = this.data[exp];
    console.log(`main.js parameter: ${this.data[exp]}`);

    // build an instance of watcher
    new Watcher(this, exp, function(value) {
        console.log(`main.js watch value: ${value}`);
        el.innerHTML = value;
    });

    return this;
}

// proxy set and get, make some improvement
SelfVue.prototype = {
    proxyKeys: function(key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        })
    }
}