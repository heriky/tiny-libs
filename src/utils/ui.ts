
/**
 * 添加滚动事件，在滚动阶段和停止滚动阶段
 * 
 */
export const useScroll = (() => {
    let timer: any = null;
    type Cb = (e: Event) => void;

    return function(node: HTMLElement, onScroll: Cb, onStop: Cb) {
        const handler = (e: Event) => {
            onScroll(e);
    
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
    
            const t1 = node.scrollTop;
            timer.current = setTimeout(() => {
                const t2 = node.scrollTop;
                if (t1 === t2) {
                    console.log('停止滚动');
                    onStop(e);
                }
            }, 500);
        }

        node.addEventListener('scroll', handler);

        return () => {
            node.removeEventListener('scroll', handler);
        }
    }
})();

export function clickOutside(el: HTMLElement, callback: (e: Event) => void) {
    const handler = (e: Event) => {
        if (!el.contains(e.target as HTMLElement)) {
            callback(e);
        }
    }
    document.addEventListener('click', handler);
    return () => {
        document.removeEventListener('click', handler);
    }
}