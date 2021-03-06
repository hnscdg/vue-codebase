function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.exp = exp;
    this.vm = vm;
    // get the new value of this.vm.data["name"] (beebo)
    // add it to the Dep
    this.value = this.get();
}

Watcher.prototype = {
    update: function () { this.run(); },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;
        var value = this.vm.data[this.exp];
        Dep.target = null;
        return value;
    }
}