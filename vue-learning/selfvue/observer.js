/**
 * 
 * @param {*} data 
 * @param {*} key 
 * @param {*} val 
 * 属性以及子属性循环遍历的实现
 */
function defineReactive(data, key, val) {
    observe(val); // recursion all the property
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() { 
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val; 
        },
        set: function(newVal) {
            if(val == newVal) { return; } 
            val = newVal;
            console.log(`observer.js set the new value: ${newVal}`);
            dep.notify();
        }
    });

};

Dep.target = null;

/**
 * 
 * @param {*} data
 * 循环遍历子属性 
 */
function observe(data) {
    if(!data || typeof data !== 'object') { return; }

    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
    });
};


/**
 * 定义订阅器Dep
 */
function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) { this.subs.push(sub); },
    notify: function() {
        this.subs.forEach((sub) => { sub.update() });
    }
}


// var libary = {
//     book1: { a: 1},
//     book2: ''
// };
// observe(libary);

// libary.book1.name = 'vue book 1';
// libary.book2 = 'vue book 2';

// console.log(libary.book1.name);
// console.log(libary.book2);