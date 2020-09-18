// 通信通道
// guoshanhe
// 2018.11.5

namespace zj {
	
	export class AoneTransfer {
		// 成员变量
		private socket: egret.WebSocket; // websocket对象
		private callback_this: any; // 连接打开与关闭回调函数的上下文指针
        private callback_opened: (event: egret.Event) => void; // 连接打开回调
        private callback_closed: (event: egret.Event) => void; // 连接关闭回调
        private notify_handlers: Object = {};  // 通知消息ID与处理方法的对应表
        private sendding: Array<aone.AoneRequest>; // 已发送等待回复或超时的消息列表
        private dispatching: Array<aone.AoneRequest>; // 接收到的未注册handler正在等待调度的通知消息列表
        private sequnce: number; // 递增序号
        private timer: egret.Timer; // 定时器
        
        // 构造函数
        public constructor() {
            this.socket = null;
            this.callback_this = null;
            this.callback_opened = null;
            this.callback_closed = null;
            this.sendding = new Array<aone.AoneRequest>();
            this.dispatching = new Array<aone.AoneRequest>();
            this.sequnce = 0;
            this.timer = null;
        }

        // 设置服务端通知消息的处理方法
        // id: 通知消息的消息ID
        // handler: 通知消息的处理方法，置null表示删除
        // thisObject: 通知消息的处理方法上下文指针
        public setNotifyHandler(id:number, handler:(msg: aone.AoneMessage)=>void, thisObject?:any) {
            if (handler) {
                this.notify_handlers[id] = { thisObject: thisObject, handler: handler };
            } else {
                delete this.notify_handlers[id];
            }
        }

        // 获取一个缓存的通知消息
        // 服务端发送的通知消息，未注册处理handler方法的部分将入队列，由业务部分自取
        public getNotifyMessage(): aone.AoneRequest {
            let msg = this.dispatching.shift();
            if (msg == null || msg == undefined) return null;
            return msg;
        }

        // 连接是否已打开成功
        public get isConnected(): boolean {
            return (this.socket && this.socket.connected);
        }
        
        // 打开与服务端连接
        // url: 全地址。如ws://echo.websocket.org:80 或 wss://echo.websocket.org
        // callback_opened: 连接成功时的回调方法
        // callback_closed: 连接被关闭时回调方法
        // thisObject: 事件回调处理方法上下文指针
        public open(url: string, callback_opened?: (event: egret.Event) => void, callback_closed?: (event: egret.Event) => void, thisObject?: any) {
            console.log(url);
            if(this.socket && this.socket.connected) return true;
            
            this.close();

            this.callback_opened = callback_opened;
            this.callback_closed = callback_closed;
            this.callback_this = thisObject;
            
    		this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY; // 二进制协议格式
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            try {
                this.socket.connectByUrl(url);
            } catch (e) {
                console.warn(e);
                toast(LANG("连接失败"));
                this.close();
                return;
            }
            
            // 定时检测超时消息
            this.timer = new egret.Timer(500, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
            this.timer.start();
		}
		
		// 关闭与服务端连接
		public close() {
            if (this.socket == null) return;

            this.socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.close();
            this.socket = null;
            if (this.timer) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.update, this);
                this.timer.stop();
                this.timer = null;
            }

            // 未收到回复的消息均按超时处理
            for (let i = 0; i < this.sendding.length; i++) {
                let msg = this.sendding[i];
                if (msg.header.ext.has_net_loading) Game.UIManager.closeWaitingUI();
                if(msg.header.ext.callback_timeout) {
                    msg.header.ext.callback_timeout.call(msg.header.ext.callback_this, msg);
                } else {
                    toast(`请求超时: ${msg.header.id}`);
                }
            }
            this.sendding = new Array<aone.AoneRequest>();
            this.dispatching = new Array<aone.AoneRequest>();
		}
		
		// 发送消息
		// msg: 要发送的请求消息
		// thisObject: 回调时的上下文指针
		// callback_response: 对应的回复消息处理方法
		// callback_timeout: 消息处理超时的处理方法
        // isQuietLoading: true时网络请求有loading转圈
        // isQuietToast: true时如果返回消息result非0则弹toast提示
        public send(msg: aone.AoneRequest, 
                    callback_response?: (req: aone.AoneRequest, resp: aone.AoneResponse) => void, 
                    callback_timeout?: (req: aone.AoneRequest) => void, 
                    thisObject?: any, 
                    isQuietLoading?: boolean,
                    isQuietToast?: boolean): boolean {
            if(!msg) {
                console.warn("invalid aonetransfer parameter 'msg', 'msg' is null");
                return false;
            }
            if(!this.socket || !this.socket.connected) return false;
            msg.header.sequence = ++this.sequnce;
            msg.header.ext = {}
            let encoder = new aone.BinaryEncoder();
            if (!msg.to_bytes(encoder)) return false;
            this.socket.writeBytes(new egret.ByteArray(encoder.buffer), 0, encoder.length);
            this.socket.flush();
            //console.log(`[${egret.getTimer() / 1000}] websocket send msg: ${JSON.stringify(msg)}`);

            msg.header.ext.response_timeout = egret.getTimer() + 6000; // 超时6秒
            msg.header.ext.callback_response = callback_response;
            msg.header.ext.callback_timeout = callback_timeout;
            msg.header.ext.callback_this = thisObject;
            msg.header.ext.has_net_loading = !isQuietLoading;
            msg.header.ext.has_error_toast = !isQuietToast;
            this.sendding.push(msg);
            if (msg.header.ext.has_net_loading) Game.UIManager.openWaitingUI();
            return true;
        }
		
        // 连接打开成功的回调
        private onSocketOpen(event: egret.Event) {
            console.info("socket opened");
            if(this.callback_opened) {
                let callback_opened = this.callback_opened;
                this.callback_opened = null;
                callback_opened.call(this.callback_this, event);
            } else {
                toast("连接已打开");
            }
        }

        // 连接关闭时的回调
        private onSocketClose(event: egret.Event) {
            console.error("socket closed");
            this.close();
            if(this.callback_closed) {
                let callback_closed = this.callback_closed;
                this.callback_closed = null;
                callback_closed.call(this.callback_this, event);
            } else {
                toast("连接已关闭");
            }
        }

        // 连接错误时的回调
        private onSocketError(event: egret.IOErrorEvent) {
            console.error("socket io error");
            this.close();
            if(this.callback_closed) {
                let callback_closed = this.callback_closed;
                this.callback_closed = null;
                callback_closed.call(this.callback_this, event);
            } else {
                toast("连接已关闭");
            }
        }
		
        // 收到消息时的回调
        private onReceiveMessage(event: egret.ProgressEvent) {
            let bytes = new egret.ByteArray();
            this.socket.readBytes(bytes, 0);
            let decoder = new aone.BinaryDecoder(new Uint8Array(bytes.buffer, 0, bytes.bytesAvailable));
            decoder.read_fixuint32(); // 跳过消息长度
            let id: number = decoder.read_fixuint32(); // 消息ID
            let msg: any = aone.MessageFactory.getInstance().create(id);
            if (msg == null) {
                console.warn("unknown message id: " + id);
                return;
            }
            decoder.set_position(0);
            if (!msg.parse_bytes(decoder)) {
                console.warn("message parse_bytes fail, id: " + id);
                return;
            }
            //console.log(`[${egret.getTimer() / 1000}] websocket recv msg: ${JSON.stringify(msg)}`);
            
            if(msg.header.id % 2 == 1) { // 如果是一个回复消息
                for(let i = 0; i < this.sendding.length; i++) {
                    let request = this.sendding[i];
                    if(request.header.sequence == msg.header.sequence) {
                        this.sendding.splice(i,1);  // 删除
                        if (request.header.ext.has_net_loading) Game.UIManager.closeWaitingUI();
                        if (msg.header.result != 0) {
                            if (request.header.ext.has_error_toast) toast_warning(`${Game.ConfigManager.getAone2CodeReason(msg.header.result)}(${msg.header.result})`);
                            SceneManager.instance.dealCodeError(msg.header.result);
                        } else {
                            if (msg.header.id != message.LoginGameserverResponse.ID && msg.header.id != message.ReconnectResponse.ID && msg["body"] && msg.body["gameInfo"]) Game.Controller.onUpdateGameInfo(msg.body.gameInfo); // 统一更新gameinfo
                            // 统一更新副本怪物
                            if (msg.header.id == 28003 && msg["body"] && msg.body["stageInfo"]) PlayerStageSystem.depressData(msg.body.stageInfo)
                        }
                        if(request.header.ext.callback_response) {
                            request.header.ext.callback_response.call(request.header.ext.callback_this, request, <aone.AoneResponse>msg);  // 回调处理
                        }
                        break;
                    }
                }
            } else if(msg.header.id % 2 == 0) { // 如果是一个通知消息
                if(this.notify_handlers.hasOwnProperty(msg.header.id)) {
                    this.notify_handlers[msg.header.id].handler.call(this.notify_handlers[msg.header.id].thisObject, <aone.AoneMessage>msg);
                } else {
                    console.warn("Unhandle notify message: " + msg.header.id);
                    this.dispatching.push(msg); // 未注册处理函数的通知消息列表
                }
            }
        }

        // 检测超时请求
        private update() {
            let now = egret.getTimer();
            for (let i = 0; i < this.sendding.length; i++) {
                let msg = this.sendding[i];
                if(msg.header.ext.response_timeout <= now) {
                    this.sendding.splice(i--,1);  // 删除
                    if (msg.header.ext.has_net_loading) Game.UIManager.closeWaitingUI();
                    if(msg.header.ext.callback_timeout) {
                        msg.header.ext.callback_timeout.call(msg.header.ext.callback_this, msg);
                    } else {
                        toast("请求超时: " + msg.header.id);
                    }
                }
            }
        }
	}
}
