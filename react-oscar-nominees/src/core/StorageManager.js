class StorageManager {
    constructor(method) {
        this.method = {
            local: localStorage,
            session: sessionStorage
        }[method];
    }

    setObject(key, object) {
        this.method.setItem(key, JSON.stringify(object));
    }

    getObject(key) {
        return JSON.parse(this.method.getItem(key));
    }

    // clearObject(key) {
    //     return this.method.clear(key);
    // }

    hasKey(key) {
        return this.method.getItem(key) !== null;
    }
}

export default StorageManager;
