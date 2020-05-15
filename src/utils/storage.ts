
interface Agent {
    getItem(key: string): string | null;
    setItem(key: string, v: string): void;
    removeItem(key: string): void;
}

class Storage {
    constructor(private agent: Agent, private storageKey: string) {
        this.agent.setItem(storageKey, '{}');
    }

    get storage() {
        try {
            const str = this.agent.getItem(this.storageKey) ?? 'null';
            return JSON.parse(str);
        } catch (error) {
            throw Error('错误的存储格式');
        }
    }

    set storage(v) {
        this.agent.setItem(this.storageKey, JSON.stringify(v));
    }

    get(key?: string) { // { value, expires  }
        if (typeof key !== 'string') {
            return this.storage;
        } 

        const { value, expires } = this.storage?.[key] ?? {};

        // 不设置过期时间的情况
        if ([0, null, undefined, ''].includes(expires)) return value;
    
        // 设置了过期时间，但是过期了
        if (new Date(expires).getTime() < Date.now()) {
            this.remove(key);
            return null;
        }
        return value;
    }

    set(value: any, key: string = '', expires: number | Date = 0) {
        const wrappedData = {
            value,
            expires: typeof expires === 'number' ? Date.now() + expires : expires.getTime()
        }

        let savedData = null;
        if (key) {
            this.storage[key] = wrappedData;
            savedData = this.storage;
        } else {
            savedData = wrappedData;
        }

        this.storage = key ? (savedData[key] = wrappedData, savedData) : savedData;
    }

    remove(key: string) {
        this.storage[key] = null;
        this.agent.setItem(this.storageKey, JSON.stringify(this.storage));
    }

    clear() {
        this.agent.removeItem(this.storageKey);
    }
}

export function createStorage(storageKey: string, agent: Agent = window.localStorage) {
    return new Storage(agent, storageKey);
}