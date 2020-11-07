
function SelfVue(data, el, exp) {
    this.data = data;
    observe(data); // 对属性设置监听
    el.innerHTML = this.data[exp];
    console.log(`main.js parameter: ${this.data[exp]}`);
    console.log(this);
    new Watcher(this, exp, function(value) {
        console.log(`main.js ${value}`);
        el.innerHTML = value;
    });
    return this;
}