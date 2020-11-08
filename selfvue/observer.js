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