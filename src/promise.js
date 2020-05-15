function Promise(executor) {
    const self = this;
    self.onResolvedCallback = [];

    function resolve(value) {
        setTimeout(() => {
            self.data = value;
            self.onResolvedCallback.forEach(callback => callback(value))
        })
    }
}

Promise.prototype.then = function(onResolved) {
    const self = this;
    return new Promise(resolve => {
        self.onResolvedCallback.push(function() {
            const result = self.data;
            if (result instanceof Promise) {
                result.then(resolve);
            } else {
                resolve(result)
            }
        });
    })
    
}

export {};