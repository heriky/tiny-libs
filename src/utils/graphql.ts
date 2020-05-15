import { shake, isEmpty } from './common';

function ql(rawData: any): string {
    const data = shake(rawData);
    if (Object.prototype.toString.apply(data) === '[object Object]') {
        return `{${Object.entries(data).map(([k, v]) => `${k}:${ql(v)}`).join(',')}}`;
    }
    if (Array.isArray(data)) {
        return `[${data.map(item => ql(item)).join(',')}]`;
    }

    if (typeof data === 'string') return `"${data}"`;

    return data;
}

/**
 *
 * @param {*} data 条件数据
 * @param {action: string, taskName: string, queryStr: string} config ql生成配置
 */
export function genQl(action: string, taskName: string, data: object | null, queryStr: string = '') {
    const rs = Object.entries(data ?? {}).map(([key, value]) => {
        const qlStr = ql(value);
        return `${key}:${qlStr}`;
    }).join(',');

    const queryField = queryStr.split('\n').flatMap((item: string) => item.split(',').filter(it => it.trim())).join(',');
    const dataField = isEmpty(rs) ? '' : `(${rs})`;

    return `${action}{${taskName}${dataField}${queryField}}`
}