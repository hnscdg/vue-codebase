
function SelfVue(data, el, exp) {
    var self = this;
    this.data = data;

    Object.keys(data).forEach((key) => {
        self.proxyKeys(key); // 绑定代理属性
    });

    observe(data); // 对属性设置监听
    el.innerHTML = this.data[exp];
    console.log(`main.js parameter: ${this.data[exp]}`);

    new Watcher(this, exp, function(value) {
        console.log(`main.js watch value: ${value}`);
        el.innerHTML = value;
    });
    return this;
}

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