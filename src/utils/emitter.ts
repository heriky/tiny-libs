type EventHandler = (event?: any) => void;
type EventHandlerList = Array<EventHandler>;
type EventHandlerMap = {
    [type: string]: EventHandlerList;
};

export default function pubSub(all: EventHandlerMap) {
    all = all || {};

    return {
        on(type: string, handler: EventHandler) {
            // (all[type] || all[type] = []).push(handler);
            (all[type] || (all[type] = [])).push(handler);
        },
        off(type: string, handler: EventHandler) {
            if (all[type]) {
                all[type].splice(all[type].indexOf(handler), 1);
            }
        },
        emit(type: string, evt: any) {
            (all[type] || []).forEach(handler => {
                handler(evt);
            })
        }
    };
}