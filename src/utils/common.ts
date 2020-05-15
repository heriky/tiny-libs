/**
 * 以下情况都判定为空
 * null、undefined、{}、[]、[undefined, null]
 * @param v 
 */
export function isEmpty(v: any): boolean {
    return v === undefined || 
        v === null || 
        (typeof v === 'string' && v.trim() === '') ||
        (Object.prototype.toString.apply(v) === '[object Object]' && JSON.stringify(v) === '{}') ||
        (Array.isArray(v) && v.every(item => isEmpty(item)));
}

/**
 * 以下情况都会被剪枝
 * 对象的情况：{ a: [], b: {}, c: null, d: undefined, e: [null, undefined] }
 * 数组的情况: [], [null, undefined, { a: null, b: undefined }]
 * @param v 
 */
export function shake(v: any) {
    if (Object.prototype.toString.call(v) === '[object Object]') {
        return Object.entries(v).reduce((acc, [key, value]) => {
            return isEmpty(value) ? acc : { ...acc, [key]: value };
        }, {});
    }
    if (Array.isArray(v)) {
        return v.filter(item => !isEmpty(item));
    }
    if (typeof v === 'string') {
        return v.trim();
    }
    return v;
}