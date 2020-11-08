/**
 * selfvue definition
 * @param {obserer data} data 
 * @param {dom element} el 
 * @param {expression, name in here} exp 
 */
function SelfVue(options) {
    var self = this;
    this.vm = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach((key) => {
        // bind property, get name value and set it
        self.proxyKeys(key); 
    });

    // set data as observer
    observe(this.data);

    // modify to change the compile the dynamic dom
    new Compile(options.el, this.vm)

    options.mounted.call(this); // 所有事情处理好后执行mounted函数
    // // this.data["name"] = 'hello world'
    // // set innerHTML vaule is "hello world"
    // // this command is used for compile dom value
    // el.innerHTML = this.data[exp];
    // console.log(`main.js parameter: ${this.data[exp]}`);

    // // build an instance of watcher
    // new Watcher(this, exp, function(value) {
    //     console.log(`main.js watch value: ${value}`);
    //     el.innerHTML = value;
    // });

    // return this;
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