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