namespace zj {
// 全局事件管理器
// 接受全局事件注册、发布、广播
// 相当于MVC框架中的中介器角色
// guoshanhe
// 2018.11.5

export class EventManager extends egret.EventDispatcher {

    public constructor() {
        super();
    }

    // 发送事件
    public event(type: string, data: Object = null): void {
        let e = new egret.Event(type);
        e.data = data;
        this.dispatchEvent(e);
    }

    // 监听事件
    public on(type: string, listener: Function, thisObject: any): void {
        this.addEventListener(type, listener, thisObject);
        if (thisObject instanceof egret.DisplayObject) {
            let display = <egret.DisplayObject>thisObject;
            display.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
                this.removeEventListener(type, listener, thisObject);
            }, thisObject);
        }
    }

    // 取消监听事件
    public off(type: string, listener: Function, thisObject: any): void {
        this.removeEventListener(type, listener, thisObject);
    }

    // 最多只接受一次事件(自动取消监听事件)
    public once(type: string, listener: Function, thisObject: any): void {
        this.once(type, listener, thisObject);
        if (thisObject instanceof egret.DisplayObject) {
            let display = <egret.DisplayObject>thisObject;
            display.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
                this.removeEventListener(type, listener, thisObject);
            }, null);
        }
    }
}
}