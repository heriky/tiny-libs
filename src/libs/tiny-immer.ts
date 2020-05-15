export default {};

class Store<T> {

    value: T;
    
    copy: T;

    modified: boolean = false;

    constructor(value: T) {
        this.value = value;
        this.copy = value;
    }

    set(k: keyof T, v: T[keyof T]) {
        if (!this.modified) {
            this.copy = this.deepClone(v);
            this.modified = true;
        }
        this.copy[k] = v;
    }

    get(k: keyof T) {
        return this.modified ? this.copy[k] : this.value[k];
    }

    deepClone(v: any) {
        if (typeof v === 'object') return JSON.parse(JSON.stringify(v));
        return v;
    }

}

export function produce<T extends object>(value: T, callback: (draft: T)=> void) {
    const store = new Store(value);

    const STORE_FLAG = '@@store_flag@@';

    const proxy = new Proxy(store, {
        get(target: Store<T>, prop: keyof T) {
            return prop === STORE_FLAG ? target : target.get(prop);
        },
        set(target: Store<T>, prop: keyof T, value: T[keyof T]) {
            target.set(prop, value);
            return true;
        }
    });


    callback(proxy as T); // 把proxy当成T来使用，便于类型推导

    type ProxyType = Store<T> & { [STORE_FLAG]: Store<T> };
    const proxyStore = (proxy as ProxyType)[STORE_FLAG];

    return proxyStore.modified ? proxyStore.copy : proxyStore.value;
}

produce({ name: 'hankang', age: 12 }, draft => {
    draft.name = 'adfa';
    draft.age =90;
});