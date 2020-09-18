var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    // UI元素管理
    // guoshanhe
    // 2018.11.1
    // 通用提示(白色，可以为富文本)
    // 测试toast
    // toast('Hello world,Hello world,Hello world,<font color=0xff0000><b>Hello world</font>\n,Hello world,Hello world');
    function toast(msg) {
        if (msg) {
            zj.Game.UIManager.toast(msg);
            console.info("[TOAST] " + msg);
        }
    }
    zj.toast = toast;
    // 警告提示
    function toast_warning(msg) {
        zj.Game.SoundManager.playEffect("ui_tishicuowu_mp3", 100);
        toast("<font color=0xff0000>" + msg + "</font>");
    }
    zj.toast_warning = toast_warning;
    // 成功提示
    function toast_success(msg) {
        zj.Game.SoundManager.playEffect("ui_tishichenggong_mp3", 100);
        toast("<font color=0x00ff00>" + msg + "</font>");
    }
    zj.toast_success = toast_success;
    // 缓存资源key(相当于给资源加引用，防止被其他地方释放)
    function cachekey(key, ui) {
        return zj.Game.UIManager.cacheKey(key, ui);
    }
    zj.cachekey = cachekey;
    // 缓存资源keys(相当于给资源加引用，防止被其他地方释放)
    function cachekeys(keys, ui) {
        return zj.Game.UIManager.cacheKeys(keys, ui);
    }
    zj.cachekeys = cachekeys;
    // 创建UI元素(马上返回)
    // UI对象马上返回，资源异步加载
    function newUI(typeT) {
        return zj.Game.UIManager.newUI(typeT);
    }
    zj.newUI = newUI;
    // 加载UI元素
    // 加载资源失败的情况下也会创建出来，资源将延迟动态加载
    function loadUI(typeT, isHideWaiting, outTime) {
        return zj.Game.UIManager.loadUI(typeT, isHideWaiting, outTime);
    }
    zj.loadUI = loadUI;
    // UI元素基类
    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            var _this = _super.call(this) || this;
            _this.cachedGroupNames = {}; // 缓存的临时资源组名
            _this.cachedResKeys = {}; // 使用到的资源key列表
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.close, _this);
            return _this;
        }
        UI.prototype.onStageResize = function () { };
        UI.prototype.close = function (animation) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
            if (this.parent)
                this.parent.removeChild(this);
            zj.Game.UIManager.removeCacheResouce(this); // 移除UI缓存资源到待释放队列
        };
        UI.SHOW_FROM_LEFT = "show_from_left"; // 从左向右滑
        UI.SHOW_FROM_RIGHT = "show_from_right"; // 从右向左滑
        UI.SHOW_FROM_TOP = "show_from_top"; // 向上向下滑
        UI.SHOW_FROM_BOTTON = "show_from_botton"; // 从底向上滑
        UI.SHOW_FILL_OUT = "show_fill_out"; // 从小变大
        UI.HIDE_TO_TOP = "hide_to_top"; // 向上滑动消失
        UI.HIDE_TO_BOTTON = "hide_to_botton"; // 向下滑动消失
        UI.HIDE_TO_LEFT = "hide_to_left"; // 向左滑动消失
        UI.HIDE_TO_RIGHT = "hide_to_right"; // 向右滑动消失
        UI.HIDE_TRAIL_OFF = "hide_trail_off"; // 变小并消失
        return UI;
    }(eui.Component));
    zj.UI = UI;
    __reflect(UI.prototype, "zj.UI");
    // UI场景元素基类
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            return _super.call(this) || this;
        }
        // 场景进入栈顶
        // 1. 刚放进去时
        // 2. 上层场景弹出，该场景被弹到栈顶时
        Scene.prototype.onEntryTopScene = function () {
            // nothing
        };
        // 场景离开栈顶
        // 1. 从舞台移除
        // 2. 压入新场景
        Scene.prototype.onLeaveTopScene = function () {
            // nothing
        };
        // 显示场景
        Scene.prototype.show = function (animation) {
            zj.Game.UIManager.pushScene(this, animation);
        };
        // 关闭场景
        Scene.prototype.close = function (animation) {
            if (zj.Game.UIManager.topScene() != this)
                return;
            var sceneName = egret.getQualifiedClassName(this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
            zj.Game.UIManager.popScene(animation);
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_SCENE, { typeName: sceneName });
        };
        return Scene;
    }(UI));
    zj.Scene = Scene;
    __reflect(Scene.prototype, "zj.Scene");
    // UI对话框元素基类
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            return _super.call(this) || this;
        }
        /**
         * 是否全屏(全屏则隐藏最上层scene（scene.visible=false），非全屏，则显示最上层scene)
         * 全屏的Dialog，重写此函数，返回true
         */
        Dialog.prototype.isFullScreen = function () {
            return false;
        };
        Dialog.prototype.onEntryTopDialog = function () {
            // nothing
        };
        // 场景离开栈顶
        Dialog.prototype.onLeaveTopDialog = function () {
            // nothing
        };
        // 显示对话框
        Dialog.prototype.show = function (animation) {
            zj.Game.UIManager.pushDialog(this, animation);
            return this;
        };
        // 关闭对话框
        Dialog.prototype.close = function (animation) {
            var dialogName = egret.getQualifiedClassName(this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
            zj.Game.UIManager.popDialog(this, animation);
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_DIALOG, { typeName: dialogName });
        };
        return Dialog;
    }(UI));
    zj.Dialog = Dialog;
    __reflect(Dialog.prototype, "zj.Dialog");
    var UIManager = (function (_super) {
        __extends(UIManager, _super);
        function UIManager() {
            var _this = _super.call(this) || this;
            // 适配刘海屏
            _this.left_mask = null;
            _this.right_mask = null;
            _this.top_mask = null;
            _this.bottom_mask = null;
            _this.backround_img = null; // 底图
            _this.scenes = new Array(); // 场景栈
            _this.sceneGroup = new eui.Group(); // 场景容器
            _this.dialogs = new Array(); // 对话框栈
            _this.dialogGroup = new eui.Group(); // 对话框容器
            _this.animationGroup = new eui.Group; // 特殊动画场景容器
            _this.toastGroup = new eui.Group(); // 消息通知列表
            _this.netLoadingUI = null; // 网络消息发送等待动画页
            _this.netLoadingCount = 0; // 同时调用的次数
            _this.groupTeachUI = new eui.Group();
            _this.groupStory = new eui.Group();
            _this.groupTeachHand = new eui.Group();
            _this.maskRect = new eui.Image(); // 全屏遮罩层
            _this.maskCount = 0; // 遮罩计数
            _this.maskAttachedObj = null; // 遮罩点击事件映射到的后端对象(传递一次事件后即自动解除)
            _this.isMaskAttachedObjTapEvent = true; // 事件类型
            _this.animationCount = 0; // 执行动画的UI数量
            _this.uiNewList = new Array(); // 正在创建的UI名字栈
            _this.uiCacheList = new Array(); // UI资源缓存管理
            _this.uiDestroyList = new Array(); // 等待释放的UI资源
            _this.loadingGroupCount = 0; // 当前正在加载资源组的数量
            _this.pendingLoadGroups = {}; // 等待加载的资源组(因为同一个组正在加载时再次调用loadgroup无效)
            return _this;
        }
        Object.defineProperty(UIManager.prototype, "AnimationGroup", {
            // 获取特殊动画场景或提示类UI容器
            get: function () {
                return this.animationGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "IsAnimation", {
            // 是否正在执行UI动画
            get: function () {
                if (this.animationCount < 0)
                    console.error("animationCount error");
                return this.animationCount > 0;
            },
            enumerable: true,
            configurable: true
        });
        // 调整舞台，适配刘海屏
        UIManager.prototype.fixStage = function () {
            UIManager.Stage = this.stage;
            UIManager.StageHeight = this.stage.stageHeight;
            UIManager.StageWidth = this.stage.stageWidth;
            console.log("stage wxh", UIManager.StageWidth, UIManager.StageHeight);
            //toast(`stage ${UIManager.StageWidth} x ${UIManager.StageHeight}`);
            // if (egret.Capabilities.runtimeType != egret.RuntimeType.RUNTIME2) {
            this.resetMask();
            var rateMax = 18 / 9; // 适配最大比例2
            var rateMin = 960 / 640; // 适配最大比例1.5
            var currRate = this.stage.stageWidth / this.stage.stageHeight; // 当前屏幕宽高比例
            if (egret.Capabilities.os == "iOS")
                rateMax = 18 / 9; // 苹果18/9，其他平台18/9
            // native环境采用原生方式适配刘海屏
            if (currRate > rateMax) {
                var width = this.stage.stageHeight * rateMax;
                var left_mask_width = (this.stage.stageWidth - width) / 2;
                var right_mask_width = left_mask_width;
                if (window['XiaoMiQGamePlatform'] && zj.platform instanceof window['XiaoMiQGamePlatform'] && currRate >= 2.16) {
                    width = this.stage.stageWidth * 0.96;
                    left_mask_width = this.stage.stageWidth * 0.04;
                    right_mask_width = 0;
                }
                UIManager.StageWidth = width;
                console.log("fix stage wxh", width, UIManager.StageHeight);
                //toast(`fix stage ${width} x ${UIManager.StageHeight}`);
                if (this.left_mask == null) {
                    this.left_mask = zj.Util.getMaskImgBlack(left_mask_width, this.stage.stageHeight);
                    this.stage.addChildAt(this.left_mask, this.stage.getChildIndex(this) + 1);
                }
                this.left_mask.width = left_mask_width;
                this.left_mask.height = this.stage.stageHeight;
                this.left_mask.x = 0;
                this.left_mask.visible = true;
                if (this.right_mask)
                    this.right_mask.visible = false;
                if (right_mask_width > 0) {
                    if (this.right_mask == null) {
                        this.right_mask = zj.Util.getMaskImgBlack(right_mask_width, this.stage.stageHeight);
                        this.stage.addChildAt(this.right_mask, this.stage.getChildIndex(this) + 1);
                    }
                    this.right_mask.width = right_mask_width;
                    this.right_mask.height = this.stage.stageHeight;
                    this.right_mask.x = this.stage.stageWidth - right_mask_width;
                    this.right_mask.visible = true;
                }
                this.width = UIManager.StageWidth;
                this.height = UIManager.StageHeight;
                this.x = left_mask_width;
                this.y = 0;
            }
            else if (currRate < rateMin) {
                var height = this.stage.stageWidth / rateMin;
                var mask_height = (this.stage.stageHeight - height) / 2;
                UIManager.StageHeight = height;
                console.log("fix stage wxh", UIManager.StageWidth, height);
                //toast(`fix stage ${UIManager.StageWidth} x ${height}`);
                if (this.top_mask == null) {
                    this.top_mask = zj.Util.getMaskImgBlack(UIManager.StageWidth, mask_height);
                    this.stage.addChildAt(this.top_mask, this.stage.getChildIndex(this) + 1);
                }
                this.top_mask.width = UIManager.StageWidth;
                this.top_mask.height = mask_height;
                this.top_mask.y = 0;
                this.top_mask.visible = true;
                if (this.bottom_mask == null) {
                    this.bottom_mask = zj.Util.getMaskImgBlack(UIManager.StageWidth, mask_height);
                    this.stage.addChildAt(this.bottom_mask, this.stage.getChildIndex(this) + 1);
                }
                this.bottom_mask.width = UIManager.StageWidth;
                this.bottom_mask.height = mask_height;
                this.bottom_mask.y = this.stage.stageHeight - mask_height;
                this.bottom_mask.visible = true;
                this.width = UIManager.StageWidth;
                this.height = UIManager.StageHeight;
                this.x = (this.stage.stageWidth - this.width) / 2;
                this.y = (this.stage.stageHeight - this.height) / 2;
            }
            else {
                this.width = UIManager.StageWidth;
                this.height = UIManager.StageHeight;
                this.x = this.y = 0;
            }
        };
        UIManager.prototype.resetMask = function () {
            if (this.left_mask) {
                this.left_mask.visible = false;
            }
            if (this.right_mask) {
                this.right_mask.visible = false;
            }
            if (this.top_mask) {
                this.top_mask.visible = false;
            }
            if (this.bottom_mask) {
                this.bottom_mask.visible = false;
            }
        };
        UIManager.prototype.init = function () {
            var _this = this;
            UIManager.InitFrameRate = this.stage.frameRate;
            console.log("init frame rate is :" + this.stage.frameRate);
            this.fixStage();
            // 场景管理容器
            this.sceneGroup.width = UIManager.StageWidth;
            this.sceneGroup.height = UIManager.StageHeight;
            this.sceneGroup.touchEnabled = false;
            this.addChild(this.sceneGroup);
            // 底图
            this.backround_img = new eui.Image();
            this.backround_img.source = "ui_Manager_Background_jpg";
            this.backround_img.percentWidth = 100;
            this.backround_img.percentHeight = 100;
            this.backround_img.visible = false;
            this.sceneGroup.addChild(this.backround_img);
            // 对话框管理容器
            this.dialogGroup.width = UIManager.StageWidth;
            this.dialogGroup.height = UIManager.StageHeight;
            this.dialogGroup.touchEnabled = false;
            this.addChild(this.dialogGroup);
            // 特殊动画场景容器
            this.animationGroup.width = UIManager.StageWidth;
            this.animationGroup.height = UIManager.StageHeight;
            this.animationGroup.touchEnabled = false;
            this.addChild(this.animationGroup);
            //布局toast
            var vLayout = new eui.VerticalLayout();
            vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            this.toastGroup.layout = vLayout;
            this.toastGroup.width = UIManager.StageWidth;
            this.toastGroup.touchEnabled = false;
            this.toastGroup.touchChildren = false;
            this.addChild(this.toastGroup);
            // 全屏遮罩层
            this.maskRect = zj.Util.getMaskImgBlack(this.width, this.height);
            this.maskRect.alpha = 0;
            this.maskRect.visible = false;
            this.addChild(this.maskRect);
            // 新手引导管理容器
            this.groupTeachUI.width = UIManager.StageWidth;
            this.groupTeachUI.height = UIManager.StageHeight;
            this.groupTeachUI.touchEnabled = false;
            this.addChild(this.groupTeachUI);
            this.groupTeachHand.width = UIManager.StageWidth;
            this.groupTeachHand.height = UIManager.StageHeight;
            this.groupTeachHand.touchEnabled = false;
            this.addChild(this.groupTeachHand);
            // 剧情对话显示容器
            this.groupStory.width = UIManager.StageWidth;
            this.groupStory.height = UIManager.StageHeight;
            this.groupStory.touchEnabled = false;
            this.addChild(this.groupStory);
            // 监测并调整UI大小
            this.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
            // 遮罩层传递事件
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (!_this.isMaskAttachedObjTapEvent)
                    return;
                var obj = _this.maskAttachedObj;
                _this.maskAttachedObj = null;
                if (obj)
                    obj.dispatchEvent(event);
            }, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
                if (_this.isMaskAttachedObjTapEvent)
                    return;
                var obj = _this.maskAttachedObj;
                if (obj)
                    obj.dispatchEvent(event);
            }, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_END, function (event) {
                if (_this.isMaskAttachedObjTapEvent)
                    return;
                var obj = _this.maskAttachedObj;
                _this.maskAttachedObj = null;
                if (obj)
                    obj.dispatchEvent(event);
            }, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_CANCEL, function (event) {
                if (_this.isMaskAttachedObjTapEvent)
                    return;
                var obj = _this.maskAttachedObj;
                _this.maskAttachedObj = null;
                if (obj)
                    obj.dispatchEvent(event);
            }, this);
            // 监听浏览器的回退操作事件
            /*if (window["history"] && 'pushState' in window.history) {
                window.history.pushState({}, "title", "#");
                window.addEventListener("popstate", () => {
                    window.history.pushState({}, "title", "#");
                    if (this.dialogs.length > 0) {
                        this.popDialog();
                        return;
                    }
                    this.popScene();
                });
            }*/
            // 监听native的回退操作事件
            egret.ExternalInterface.addCallback("native_backButtonPressed", function (message) {
                if (_this.dialogs.length > 0) {
                    _this.popDialog();
                    return;
                }
                _this.popScene();
            });
        };
        /**向新手引导容器中添加显示对象 */
        UIManager.prototype.pushTeachUI = function (teachUI) {
            this.groupTeachUI.addChild(teachUI);
        };
        Object.defineProperty(UIManager.prototype, "GroupTeachUI", {
            /**获取新手引导容器 */
            get: function () {
                return this.groupTeachUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "GroupStory", {
            get: function () {
                return this.groupStory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "GroupTeachHand", {
            get: function () {
                return this.groupTeachHand;
            },
            enumerable: true,
            configurable: true
        });
        // 遮罩UI层
        UIManager.prototype.maskAllUIs = function () {
            this.maskRect.visible = ++this.maskCount > 0; //!!(++this.maskCount);
        };
        // 解除UI层遮罩
        UIManager.prototype.unmaskAllUIs = function () {
            if (this.maskCount <= 0)
                return;
            this.maskRect.visible = --this.maskCount > 0; //!!(--this.maskCount);
        };
        // 设置遮罩层绑定的后端UI对象(传递一次事件后即自动解除)
        UIManager.prototype.setMaskAttachedTapObj = function (obj) {
            if (zj.Game.TeachSystem.curPart == 3001) {
                if (obj == this.maskObj)
                    return;
            }
            this.maskAttachedObj = obj;
            this.maskObj = obj;
            this.isMaskAttachedObjTapEvent = true;
        };
        UIManager.prototype.setMaskAttachedTouchObj = function (obj) {
            this.maskAttachedObj = obj;
            this.isMaskAttachedObjTapEvent = false;
        };
        UIManager.prototype.onStageResize = function () {
            this.fixStage();
            this.sceneGroup.width = UIManager.StageWidth;
            this.sceneGroup.height = UIManager.StageHeight;
            this.dialogGroup.width = UIManager.StageWidth;
            this.dialogGroup.height = UIManager.StageHeight;
            this.animationGroup.width = UIManager.StageWidth;
            this.animationGroup.height = UIManager.StageHeight;
            this.toastGroup.width = UIManager.StageWidth;
            this.groupTeachUI.width = UIManager.StageWidth;
            this.groupTeachUI.height = UIManager.StageHeight;
            this.maskRect.width = UIManager.StageWidth;
            this.maskRect.height = UIManager.StageHeight;
            for (var i = 0; i < this.scenes.length; i++) {
                this.scenes[i].width = UIManager.StageWidth;
                this.scenes[i].height = UIManager.StageHeight;
                this.scenes[i].onStageResize();
            }
            for (var i = 0; i < this.dialogs.length; i++) {
                this.dialogs[i].width = UIManager.StageWidth;
                this.dialogs[i].height = UIManager.StageHeight;
                this.dialogs[i].onStageResize();
            }
            for (var i = 0; i < this.groupStory.numChildren; ++i) {
                var item = this.groupStory.getChildAt(i);
                if (item instanceof UI) {
                    item.width = UIManager.StageWidth;
                    item.height = UIManager.StageHeight;
                    item.onStageResize();
                }
            }
        };
        UIManager.prototype.openWaitingUI = function () {
            if (this.netLoadingUI == null) {
                this.netLoadingUI = new zj.NetLoading();
            }
            if (++this.netLoadingCount == 1) {
                this.addChild(this.netLoadingUI);
            }
        };
        UIManager.prototype.closeWaitingUI = function () {
            if (this.netLoadingCount <= 0) {
                console.warn("关闭loading次数过多");
                return;
            }
            if (--this.netLoadingCount == 0) {
                this.removeChild(this.netLoadingUI);
                // 加事件
            }
        };
        UIManager.prototype.isOpendWaitingUI = function () {
            return this.netLoadingCount > 0;
        };
        UIManager.prototype.removeTweenAll = function () {
            this.toastGroup.removeChildren();
            egret.Tween.removeAllTweens();
        };
        // private toastPos: egret.Point = new egret.Point();
        UIManager.prototype.toast = function (msg) {
            if (msg == "<font color=0xff0000>请等待片刻(19909)</font>" || msg == "<font color=0xff0000>游戏服务通用错误码(10000)</font>") {
                return;
            }
            var toastUI = new zj.ToastUI(msg);
            toastUI.horizontalCenter = "0";
            this.toastGroup.addChild(toastUI);
            this.toastGroup.bottom = UIManager.StageHeight / 2 + 30;
            toastUI.onStart();
            // let content: eui.Label = new eui.Label();
            // let back: eui.Image = new eui.Image("toast_backround_png");
            // let backW = 688;
            // let backH = 65;
            // let toast: eui.Group = new eui.Group();
            // toast.width = UIManager.StageWidth;
            // toast.height = backH;
            // toast.addChild(back);
            // toast.addChild(content);
            // toast.touchEnabled = false;
            // toast.touchChildren = false;
            // content.fontFamily = 'Microsoft Yahei'; // 
            // content.size = 24;
            // content.height = 36;
            // content.width = toast.width;
            // content.lineSpacing = 8;
            // content.verticalAlign = "middle";
            // content.textAlign = egret.HorizontalAlign.CENTER;
            // content.textFlow = Util.RichText(msg);
            // // content.horizontalCenter = UIManager.StageWidth / 4;
            // content.x = toast.width / 4;
            // content.verticalCenter = "0";
            // egret.Tween.get(content)
            //     .to({ x: 0 }, 200, egret.Ease.sineOut)
            //     .call(()=>{
            //         egret.Tween.removeTweens(content);
            //         content.horizontalCenter = "0";
            //     });
            // // back.horizontalCenter = -UIManager.StageWidth / 4;
            // back.x = toast.width / 4 - backW / 2;
            // back.verticalCenter = "0";
            // egret.Tween.get(back)
            //     .to({ x: toast.width / 2 - backW / 2 }, 200, egret.Ease.sineOut)
            //     .call(()=>{
            //         egret.Tween.removeTweens(back);
            //         back.horizontalCenter = "0";
            //     });
            // toast.horizontalCenter = "0";
            // this.toastGroup.addChild(toast);
            // this.toastGroup.bottom = UIManager.StageHeight / 2 - toast.height / 2;
            // egret.Tween.get(toast)
            //     .wait(2000)
            //     .call(() => {
            //         egret.Tween.removeTweens(toast);
            //         this.toastGroup.localToGlobal(toast.x, toast.y, this.toastPos);
            //         this.toastGroup.removeChild(toast);
            //         toast.x = this.toastPos.x;
            //         toast.y = this.toastPos.y - this.y;
            //         this.addChild(toast);
            //         egret.Tween.get(toast)
            //             .to({ y: toast.y - 100, alpha: 0 }, 500, egret.Ease.circIn)
            //             .call(() => { 
            //                 egret.Tween.removeTweens(toast);
            //                 this.removeChild(toast);
            //             });
            //     });
        };
        UIManager.prototype.findUIName = function (ui) {
            for (var i = 0; i < this.uiCacheList.length; i++) {
                var obj = this.uiCacheList[i];
                for (var j = 0; j < obj.uis.length; j++) {
                    if (obj.uis[j] == ui)
                        return obj.uiName;
                }
            }
            for (var i = 0; i < this.uiDestroyList.length; i++) {
                var obj = this.uiDestroyList[i];
                for (var j = 0; j < obj.uis.length; j++) {
                    if (obj.uis[j] == ui)
                        return obj.uiName;
                }
            }
            if (this.uiNewList.length > 0)
                return this.uiNewList[this.uiNewList.length - 1];
            return "ui";
        };
        UIManager.prototype.checkLoadGroup = function (ui) {
            var _this = this;
            // 资源状态， 0：未加载，1：正加载，2：加载完成
            // 统计正在加载的资源数量
            var count = 0;
            for (var k in ui.cachedResKeys) {
                if (ui.cachedResKeys[k] == 1) {
                    count++;
                }
            }
            if (count != 0)
                return Promise.resolve({}); // 该组正在加载中，需等待
            count = 0;
            var array = [];
            for (var k in ui.cachedResKeys) {
                array.push(k);
                if (ui.cachedResKeys[k] == 0) {
                    ui.cachedResKeys[k] = 1;
                    count++;
                }
            }
            if (count == 0)
                return Promise.resolve({}); // 没有新增需要加载的资源
            var groupName = this.findUIName(ui) + "_" + ui.hashCode;
            if (!ui.cachedGroupNames.hasOwnProperty(groupName)) {
                ui.cachedGroupNames[groupName] = 0;
                //console.log("[RESOURCE] 创建资源组 " + groupName);
            }
            if (!RES.createGroup(groupName, array, true)) {
                console.error("重置资源组失败:", groupName);
            }
            return new Promise(function (resolve, reject) {
                _this.loadingGroupCount++;
                zj.Game.RESGroupManager.loadGroup(groupName, 10)
                    .then(function () {
                    if (_this.loadingGroupCount > 0)
                        _this.loadingGroupCount--;
                    for (var k in ui.cachedResKeys) {
                        if (ui.cachedResKeys[k] == 1)
                            ui.cachedResKeys[k] = 2; // 转为加载完成状态
                    }
                    _this.checkLoadGroup(ui)
                        .then(function () { return resolve({}); })
                        .catch(function () { return resolve({}); });
                })
                    .catch(function () {
                    if (_this.loadingGroupCount > 0)
                        _this.loadingGroupCount--;
                    for (var k in ui.cachedResKeys) {
                        if (ui.cachedResKeys[k] == 1)
                            ui.cachedResKeys[k] = 2; // 转为加载完成状态
                    }
                    _this.checkLoadGroup(ui)
                        .then(function () { return resolve({}); })
                        .catch(function () { return resolve({}); });
                });
            });
        };
        UIManager.prototype.cacheKeys = function (keys, ui) {
            if (!keys) {
                return Promise.resolve({});
            }
            while (ui) {
                if (ui instanceof Dialog || ui instanceof Scene)
                    break;
                if (ui == ui.parent || ui.parent == null) {
                    ui = null;
                    break;
                }
                ui = ui.parent;
            }
            if (!ui)
                ui = this.topDialog();
            if (!ui)
                ui = this.topScene();
            if (ui == null) {
                toast_warning("没有找到可供缓存资源的UI");
                return Promise.resolve({});
            }
            var count = 0;
            for (var i = 0; i < keys.length; i++) {
                if ((typeof keys[i] != "string") || !RES.hasRes(keys[i])) {
                    console.warn("资源配置表中没有key: " + keys[i]);
                    continue;
                }
                if (ui.cachedResKeys.hasOwnProperty(keys[i]))
                    continue;
                ui.cachedResKeys[keys[i]] = 0; // 未加载状态
                count++;
            }
            if (count == 0)
                return Promise.resolve({});
            return this.checkLoadGroup(ui);
        };
        UIManager.prototype.cacheKey = function (key, ui) {
            if (key) {
                while (ui) {
                    if (ui instanceof Dialog || ui instanceof Scene)
                        break;
                    if (ui == ui.parent || ui.parent == null) {
                        ui = null;
                        break;
                    }
                    ui = ui.parent;
                }
                if (!ui)
                    ui = this.topDialog();
                if (!ui)
                    ui = this.topScene();
                if (ui == null) {
                    toast_warning("没有找到可供缓存资源的UI");
                    return key;
                }
                if ((typeof key != "string") || !RES.hasRes(key)) {
                    console.warn("资源配置表中没有key: " + key);
                    return key;
                }
                if (ui.cachedResKeys.hasOwnProperty(key))
                    return key;
                ui.cachedResKeys[key] = 0; // 未加载状态
                this.checkLoadGroup(ui);
            }
            return key;
        };
        UIManager.prototype.createUI = function (uiClassType, typeT) {
            try {
                if (uiClassType) {
                    this.uiNewList.push(uiClassType);
                }
                var ui = new typeT();
                if (this.uiNewList.length > 0)
                    this.uiNewList.length = this.uiNewList.length - 1; // 去掉最后一个
                return ui;
            }
            catch (e) {
                this.uiNewList = []; // 清空
                var str = zj.LANG("创建UI失败：") + uiClassType;
                toast(str);
                // toast(e);
                zj.Util.printExcepteion(e);
            }
            // return null;
        };
        // 创建UI元素(马上返回)
        // UI对象马上返回，资源异步加载
        UIManager.prototype.newUI = function (typeT) {
            var _this = this;
            if (typeT == null || typeT == undefined)
                return null;
            if (!('prototype' in typeT))
                return this.createUI("", typeT);
            if (!('__class__' in typeT.prototype))
                return this.createUI("", typeT);
            var uiClassType = typeT.prototype.__class__;
            var array = uiClassType.split(".");
            uiClassType = array[array.length - 1];
            if (zj.UIResource.hasOwnProperty(uiClassType) && zj.UIResource[uiClassType].length > 0) {
                if (!RES.createGroup(uiClassType, zj.UIResource[uiClassType], true)) {
                    toast(zj.LANG("创建UI资源组失败：") + uiClassType);
                    var ui_1 = this.createUI(uiClassType, typeT);
                    this.addCacheResouce(ui_1, uiClassType); // UI资源添加到缓存管理
                    return ui_1;
                }
                // 异步加载资源
                this.loadingGroupCount++;
                zj.Game.RESGroupManager.loadGroup(uiClassType, 100)
                    .then(function () { if (_this.loadingGroupCount > 0)
                    _this.loadingGroupCount--; })
                    .catch(function () {
                    if (_this.loadingGroupCount > 0)
                        _this.loadingGroupCount--;
                    toast(zj.LANG("UI资源加载失败：") + uiClassType);
                });
            }
            var ui = this.createUI(uiClassType, typeT);
            this.addCacheResouce(ui, uiClassType); // UI资源添加到缓存管理
            return ui;
        };
        UIManager.prototype.loadUIResouce = function (typeT, isHideWaiting) {
            var _this = this;
            if (typeT == null || typeT == undefined)
                return null;
            if (!('prototype' in typeT))
                return Promise.reject("not suppert");
            if (!('__class__' in typeT.prototype))
                return Promise.reject("not suppert");
            var uiClassType = typeT.prototype.__class__;
            var array = uiClassType.split(".");
            uiClassType = array[array.length - 1];
            if (!isHideWaiting)
                this.openWaitingUI(); // 显示wait动画
            return new Promise(function (resolve, reject) {
                if (!zj.UIResource.hasOwnProperty(uiClassType) || zj.UIResource[uiClassType].length == 0 || !RES.createGroup(uiClassType, zj.UIResource[uiClassType], true)) {
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    resolve();
                    return;
                }
                zj.Game.RESGroupManager.loadGroup(uiClassType, 100)
                    .then(function () {
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    resolve();
                    return;
                })
                    .catch(function () {
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    resolve();
                    return;
                });
            });
        };
        // 加载UI元素
        // 加载资源失败的情况下也会创建出来，资源将延迟动态加载
        UIManager.prototype.loadUI = function (typeT, isHideWaiting, outTime) {
            var _this = this;
            if (typeT == null || typeT == undefined)
                return null;
            if (!('prototype' in typeT))
                return Promise.reject("not suppert");
            if (!('__class__' in typeT.prototype))
                return Promise.reject("not suppert");
            var uiClassType = typeT.prototype.__class__;
            // 判断顶层UI如果和此UI为同一界面，则不创建
            var ui = this.topDialog() || this.topScene();
            if (ui && egret.getQualifiedClassName(ui) == uiClassType) {
                if (ui.visible && ui.alpha > 0) {
                    console.log("ui repeat: " + uiClassType);
                    return Promise.reject("ui repeat: " + uiClassType);
                }
                else {
                    ui.close();
                }
            }
            var array = uiClassType.split(".");
            uiClassType = array[array.length - 1];
            console.log("\n\nloadUI: " + uiClassType + "\n\n");
            if (!isHideWaiting)
                this.openWaitingUI(); // 显示wait动画
            return new Promise(function (resolve, reject) {
                if (!zj.UIResource.hasOwnProperty(uiClassType) || zj.UIResource[uiClassType].length == 0) {
                    var ui_2 = _this.createUI(uiClassType, typeT);
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    if (!ui_2) {
                        var str = zj.LANG("创建UI失败1：") + uiClassType;
                        toast(str);
                        reject(str);
                        return;
                    }
                    _this.addCacheResouce(ui_2, uiClassType); // UI资源添加到缓存管理
                    resolve(ui_2);
                    return;
                }
                if (!RES.createGroup(uiClassType, zj.UIResource[uiClassType], true)) {
                    toast(zj.LANG("创建UI资源组失败：") + uiClassType);
                    var ui_3 = _this.createUI(uiClassType, typeT);
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    if (!ui_3) {
                        var str = zj.LANG("创建UI失败2：") + uiClassType;
                        toast(str);
                        reject(str);
                        return;
                    }
                    resolve(ui_3);
                    return;
                }
                var timeout_id = -1;
                _this.loadingGroupCount++;
                zj.Game.RESGroupManager.loadGroup(uiClassType, 100)
                    .then(function () {
                    if (timeout_id == -2)
                        return; // 已经超时返回了
                    egret.clearTimeout(timeout_id);
                    if (_this.loadingGroupCount > 0)
                        _this.loadingGroupCount--;
                    // toast(LANG("UI资源加载成功：") + uiClassType);
                    var ui = _this.createUI(uiClassType, typeT);
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    if (!ui) {
                        var str = zj.LANG("创建UI失败3：") + uiClassType;
                        // toast(str);
                        reject(str);
                        return;
                    }
                    _this.addCacheResouce(ui, uiClassType); // UI资源添加到缓存管理
                    resolve(ui);
                    return;
                })
                    .catch(function () {
                    if (timeout_id == -2)
                        return; // 已经超时返回了
                    egret.clearTimeout(timeout_id);
                    if (_this.loadingGroupCount > 0)
                        _this.loadingGroupCount--;
                    toast(zj.LANG("UI资源加载失败：") + uiClassType);
                    var ui = _this.createUI(uiClassType, typeT);
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    if (!ui) {
                        var str = zj.LANG("创建UI失败4：") + uiClassType;
                        toast(str);
                        reject(str);
                        return;
                    }
                    _this.addCacheResouce(ui, uiClassType); // UI资源添加到缓存管理
                    resolve(ui);
                    return;
                });
                outTime = outTime > 0 ? outTime : 3000;
                // 设置超时机制
                timeout_id = egret.setTimeout(function () {
                    timeout_id = -2;
                    // toast(LANG("创建UI资源组超时：") + uiClassType);
                    var ui = _this.createUI(uiClassType, typeT);
                    if (!isHideWaiting)
                        _this.closeWaitingUI();
                    if (!ui) {
                        var str = zj.LANG("创建UI失败5：") + uiClassType;
                        toast(str);
                        reject(str);
                        return;
                    }
                    resolve(ui);
                    return;
                }, _this, outTime);
            });
        };
        // 压入一个会话框的动画播放完成后回调
        UIManager.prototype.pushDialogCall = function (dialog, isSkipFull) {
            var rect = dialog.getChildByName("__rect_back");
            if (rect) {
                rect.width = UIManager.StageWidth * 2;
                rect.height = UIManager.StageHeight * 2;
                rect.horizontalCenter = "0";
                rect.verticalCenter = "0";
            }
            // this.maskRect.visible = !!(--this.maskCount);
            this.unmaskAllUIs();
            this.animationCount--;
            dialog.onEntryTopDialog();
            // 压入全屏dialog，隐藏上层scene
            if (!isSkipFull && dialog.isFullScreen()) {
                var top_scene = this.topScene();
                if (top_scene) {
                    top_scene.visible = false;
                }
            }
        };
        // 向会话框栈压入一个会话框
        UIManager.prototype.pushDialog = function (dialog, animation) {
            if (dialog == null)
                return;
            // 判断顶层的dialog跟刚压入的dialog属于同一个UI，则返回
            var topDialog = this.topDialog();
            if (topDialog && (egret.getQualifiedClassName(topDialog) == egret.getQualifiedClassName(dialog))) {
                console.log("dialog repeat: " + egret.getQualifiedClassName(topDialog));
                return;
            }
            dialog.width = UIManager.StageWidth;
            dialog.height = UIManager.StageHeight;
            dialog.anchorOffsetX = 0;
            dialog.anchorOffsetY = 0;
            dialog.x = 0;
            dialog.y = 0;
            this.dialogs.push(dialog);
            this.dialogGroup.addChild(dialog);
            // 添加背景
            var rect_back = zj.Util.getMaskImgBlack(30, 30);
            rect_back.name = "__rect_back";
            rect_back.alpha = 0;
            egret.Tween.get(rect_back).to({ alpha: 0.5 }, 1000, egret.Ease.sineIn);
            dialog.addChildAt(rect_back, 0);
            this.animationCount++;
            this.maskAllUIs();
            // this.maskRect.visible = !!(++this.maskCount); // 遮罩，不允许点击
            if (animation == UI.SHOW_FROM_TOP) {
                zj.Game.SoundManager.playEffect("ui_erji_jiemian_mp3", 100);
                rect_back.width = UIManager.StageWidth;
                rect_back.height = UIManager.StageHeight * 1.5;
                rect_back.x = 0;
                rect_back.y = -UIManager.StageHeight * 0.5;
                dialog.y = -UIManager.StageHeight;
                egret.Tween.get(dialog).to({ y: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushDialogCall, this, [dialog]);
            }
            else if (animation == UI.SHOW_FROM_BOTTON) {
                zj.Game.SoundManager.playEffect("ui_erji_jiemian_mp3", 100);
                rect_back.width = UIManager.StageWidth;
                rect_back.height = UIManager.StageHeight * 1.5;
                rect_back.x = 0;
                rect_back.y = 0;
                dialog.y = UIManager.StageHeight;
                egret.Tween.get(dialog).to({ y: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushDialogCall, this, [dialog]);
            }
            else if (animation == UI.SHOW_FROM_LEFT) {
                rect_back.width = UIManager.StageWidth * 1.5;
                rect_back.height = UIManager.StageHeight;
                rect_back.x = -UIManager.StageWidth * 0.5;
                rect_back.y = 0;
                dialog.x = -UIManager.StageWidth;
                egret.Tween.get(dialog).to({ x: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushDialogCall, this, [dialog]);
            }
            else if (animation == UI.SHOW_FROM_RIGHT) {
                rect_back.width = UIManager.StageWidth * 1.5;
                rect_back.height = UIManager.StageHeight;
                rect_back.x = 0;
                rect_back.y = 0;
                dialog.x = UIManager.StageWidth;
                egret.Tween.get(dialog).to({ x: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushDialogCall, this, [dialog]);
            }
            else if (animation == UI.SHOW_FILL_OUT) {
                zj.Game.SoundManager.playEffect("ui_yiji_jiemian_mp3", 100);
                rect_back.width = UIManager.StageWidth;
                rect_back.height = UIManager.StageHeight;
                rect_back.x = 0;
                rect_back.y = 0;
                dialog.x = UIManager.StageWidth / 2;
                dialog.y = UIManager.StageHeight / 2;
                dialog.anchorOffsetX = UIManager.StageWidth / 2;
                dialog.anchorOffsetY = UIManager.StageHeight / 2;
                dialog.scaleX = 0;
                dialog.scaleY = 0;
                egret.Tween.get(dialog).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut)
                    .call(this.pushDialogCall, this, [dialog]);
            }
            else {
                rect_back.width = UIManager.StageWidth;
                rect_back.height = UIManager.StageHeight;
                rect_back.x = 0;
                rect_back.y = 0;
                this.pushDialogCall(dialog, true);
            }
            egret.Tween.get(dialog).wait(400).call(function () { zj.Game.EventManager.event(zj.GameEvent.SHOW_DIALOG, { typeName: egret.getQualifiedClassName(dialog) }); });
        };
        // 弹出一个会话框的动画播放完成后回调
        UIManager.prototype.popDialogCall = function (dialog) {
            dialog.onLeaveTopDialog();
            this.dialogGroup.removeChild(dialog);
            this.removeCacheResouce(dialog);
            this.unmaskAllUIs();
            // this.maskRect.visible = !!(--this.maskCount);
            this.animationCount--;
        };
        // 弹出栈顶的会话框
        UIManager.prototype.popDialog = function (dialog, animation) {
            if (this.dialogs.length <= 0)
                return;
            if (dialog == null || dialog == undefined) {
                dialog = this.dialogs.pop();
            }
            else {
                for (var i = 0; i < this.dialogs.length; i++) {
                    if (this.dialogs[i] == dialog) {
                        this.dialogs.splice(i, 1);
                        break;
                    }
                }
            }
            if (dialog.parent == undefined || dialog.parent == null)
                return;
            if (dialog.parent != this.dialogGroup) {
                //toast("该对话框不在UIManager分组，请检查");
                return;
            }
            // 弹出全屏dialog，显示最上层scene
            var top_scene = this.topScene();
            if (top_scene) {
                if (dialog.isFullScreen()) {
                    top_scene.visible = true;
                }
            }
            // else {
            //     animation = null;
            // }
            var rect_back = dialog.getChildByName("__rect_back");
            if (rect_back && rect_back.parent)
                rect_back.parent.removeChild(rect_back);
            dialog.anchorOffsetX = 0;
            dialog.anchorOffsetY = 0;
            dialog.x = 0;
            dialog.y = 0;
            this.animationCount++;
            this.maskAllUIs();
            // this.maskRect.visible = !!(++this.maskCount); // 遮罩，不允许点击
            if (animation == UI.HIDE_TO_TOP) {
                zj.Game.SoundManager.playEffect("ui_jiemian_guanbi_mp3", 100);
                egret.Tween.get(dialog).to({ y: -UIManager.StageHeight }, 400, egret.Ease.backIn)
                    .call(this.popDialogCall, this, [dialog]);
            }
            else if (animation == UI.HIDE_TO_BOTTON) {
                zj.Game.SoundManager.playEffect("ui_jiemian_guanbi_mp3", 100);
                egret.Tween.get(dialog).to({ y: UIManager.StageHeight }, 400, egret.Ease.backIn)
                    .call(this.popDialogCall, this, [dialog]);
            }
            else if (animation == UI.HIDE_TO_LEFT) {
                egret.Tween.get(dialog).to({ x: -UIManager.StageHeight }, 400, egret.Ease.backIn)
                    .call(this.popDialogCall, this, [dialog]);
            }
            else if (animation == UI.HIDE_TO_RIGHT) {
                egret.Tween.get(dialog).to({ x: UIManager.StageHeight }, 400, egret.Ease.backIn)
                    .call(this.popDialogCall, this, [dialog]);
            }
            else if (animation == UI.HIDE_TRAIL_OFF) {
                zj.Game.SoundManager.playEffect("ui_jiemian_guanbi_mp3", 100);
                dialog.x = UIManager.StageWidth / 2;
                dialog.y = UIManager.StageHeight / 2;
                dialog.anchorOffsetX = UIManager.StageWidth / 2;
                dialog.anchorOffsetY = UIManager.StageHeight / 2;
                egret.Tween.get(dialog).to({ scaleX: 0, scaleY: 0 }, 400, egret.Ease.sineIn)
                    .call(this.popDialogCall, this, [dialog]);
            }
            else {
                this.popDialogCall(dialog);
                // if (!top_scene) {
                //     SceneManager.instance.EnterMainCityNew();
                // }
            }
        };
        UIManager.prototype.pushSceneCall = function (scene, top_scene) {
            this.backround_img.visible = false;
            top_scene.visible = false;
            top_scene.onLeaveTopScene();
            scene.onEntryTopScene();
            this.unmaskAllUIs();
            // this.maskRect.visible = !!(--this.maskCount);
            this.animationCount--;
            this.notifyTeachPushUI(scene);
        };
        // 向列表里插入一个scene
        UIManager.prototype.insterScene = function (scene, idx) {
            if (scene == null)
                return;
            var isLast = idx >= this.scenes.length;
            if (isLast) {
                this.pushScene(scene);
            }
            else {
                scene.width = UIManager.StageWidth;
                scene.height = UIManager.StageHeight;
                scene.anchorOffsetX = 0;
                scene.anchorOffsetY = 0;
                scene.x = 0;
                scene.y = 0;
                this.scenes.splice(idx, 0, scene);
                this.sceneGroup.addChildAt(scene, idx);
                scene.visible = false;
            }
        };
        // 向场景栈压入一个场景
        UIManager.prototype.pushScene = function (scene, animation) {
            if (scene == null)
                return;
            scene.width = UIManager.StageWidth;
            scene.height = UIManager.StageHeight;
            scene.anchorOffsetX = 0;
            scene.anchorOffsetY = 0;
            scene.x = 0;
            scene.y = 0;
            var top_scene = null;
            if (this.scenes.length > 0) {
                top_scene = this.scenes[this.scenes.length - 1];
                top_scene.anchorOffsetX = 0;
                top_scene.anchorOffsetY = 0;
                top_scene.x = 0;
                top_scene.y = 0;
            }
            this.scenes.push(scene);
            this.sceneGroup.addChild(scene);
            if (!top_scene) {
                scene.onEntryTopScene();
                this.notifyTeachPushUI(scene);
                return;
            } // 不需要动画
            top_scene.visible = false;
            this.backround_img.visible = true;
            this.animationCount++;
            this.maskAllUIs();
            // this.maskRect.visible = !!(++this.maskCount); // 遮罩，不允许点击
            if (animation == UI.SHOW_FROM_TOP) {
                zj.Game.SoundManager.playEffect("ui_erji_jiemian_mp3", 100);
                scene.y = -UIManager.StageHeight;
                egret.Tween.get(scene).to({ y: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ y: UIManager.StageHeight }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FROM_BOTTON) {
                zj.Game.SoundManager.playEffect("ui_erji_jiemian_mp3", 100);
                scene.y = UIManager.StageHeight;
                egret.Tween.get(scene).to({ y: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ y: -UIManager.StageHeight }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FROM_LEFT) {
                scene.x = -UIManager.StageWidth;
                egret.Tween.get(scene).to({ x: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ x: UIManager.StageWidth }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FROM_RIGHT) {
                scene.x = UIManager.StageWidth;
                egret.Tween.get(scene).to({ x: 0 }, 400, egret.Ease.backOut)
                    .call(this.pushSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ x: -UIManager.StageWidth }, 400, egret.Ease.sineOut;
            }
            else if (animation == UI.SHOW_FILL_OUT) {
                zj.Game.SoundManager.playEffect("ui_xiao_jiemian_mp3", 100);
                scene.x = UIManager.StageWidth / 2;
                scene.y = UIManager.StageHeight / 2;
                scene.anchorOffsetX = UIManager.StageWidth / 2;
                scene.anchorOffsetY = UIManager.StageHeight / 2;
                scene.scaleX = 0;
                scene.scaleY = 0;
                egret.Tween.get(scene).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut)
                    .call(this.pushSceneCall, this, [scene, top_scene]);
            }
            else {
                this.pushSceneCall(scene, top_scene);
            }
        };
        /**新手引导打开场景通知 */
        UIManager.prototype.notifyTeachPushUI = function (scene) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_SCENE, { typeName: egret.getQualifiedClassName(scene) });
        };
        UIManager.prototype.popSceneCall = function (scene, top_scene) {
            this.backround_img.visible = false;
            scene.visible = true;
            top_scene.onLeaveTopScene();
            this.sceneGroup.removeChild(top_scene);
            scene.onEntryTopScene();
            this.removeCacheResouce(top_scene);
            this.unmaskAllUIs();
            // this.maskRect.visible = !!(--this.maskCount);
            this.animationCount--;
        };
        // 删除一个scene（任何位置的）
        UIManager.prototype.removeScene = function (scene) {
            if (scene == null)
                return;
            var idx = this.scenes.indexOf(scene);
            if (idx >= 0) {
                var isTop = scene == this.topScene();
                this.scenes.splice(idx, 1);
                scene.onLeaveTopScene();
                this.sceneGroup.removeChild(scene);
                this.removeCacheResouce(scene);
                if (isTop) {
                    var scene_1 = this.topScene();
                    if (scene_1) {
                        scene_1.visible = true;
                        scene_1.onEntryTopScene();
                    }
                }
            }
        };
        // 弹出栈顶的场景
        UIManager.prototype.popScene = function (animation) {
            if (this.scenes.length == 0)
                return;
            if (this.scenes.length == 1) {
                var s = this.scenes[0];
                this.scenes.pop();
                s.onLeaveTopScene();
                this.sceneGroup.removeChild(s);
                this.removeCacheResouce(s);
                // 由于整个游戏只能有一个跑图场景，所以进入战斗场景时，主城会被移除，所以当上层UI都关闭时，需要重新加载进入主城
                zj.SceneManager.instance.EnterMainCityNew();
                return;
            }
            var top_scene = this.scenes[this.scenes.length - 1];
            top_scene.anchorOffsetX = 0;
            top_scene.anchorOffsetY = 0;
            top_scene.x = 0;
            top_scene.y = 0;
            this.scenes.pop();
            var scene = this.scenes[this.scenes.length - 1];
            scene.anchorOffsetX = 0;
            scene.anchorOffsetY = 0;
            scene.x = 0;
            scene.y = 0;
            // scene.visible = true;
            this.backround_img.visible = true;
            this.animationCount++;
            this.maskAllUIs();
            // this.maskRect.visible = !!(++this.maskCount); // 遮罩，不允许点击
            if (animation == UI.HIDE_TO_TOP) {
                zj.Game.SoundManager.playEffect("ui_jiemian_guanbi_mp3", 100);
                // scene.y = UIManager.StageHeight;
                // egret.Tween.get(scene).to({ y: 0 }, 400, egret.Ease.sineOut);
                egret.Tween.get(top_scene).to({ y: -UIManager.StageHeight }, 400, egret.Ease.backIn)
                    .call(this.popSceneCall, this, [scene, top_scene]);
            }
            else if (animation == UI.HIDE_TO_BOTTON) {
                zj.Game.SoundManager.playEffect("ui_jiemian_guanbi_mp3", 100);
                // scene.y = -UIManager.StageHeight;
                // egret.Tween.get(scene).to({ y: 0 }, 400, egret.Ease.sineOut);
                egret.Tween.get(top_scene).to({ y: UIManager.StageHeight }, 400, egret.Ease.backIn)
                    .call(this.popSceneCall, this, [scene, top_scene]);
            }
            else if (animation == UI.HIDE_TO_LEFT) {
                // scene.x = UIManager.StageWidth;
                // egret.Tween.get(scene).to({ x: 0 }, 400, egret.Ease.sineOut);
                egret.Tween.get(top_scene).to({ x: -UIManager.StageWidth }, 400, egret.Ease.backIn)
                    .call(this.popSceneCall, this, [scene, top_scene]);
            }
            else if (animation == UI.HIDE_TO_RIGHT) {
                // scene.x = -UIManager.StageWidth;
                // egret.Tween.get(scene).to({ x: 0 }, 400, egret.Ease.sineOut);
                egret.Tween.get(top_scene).to({ x: UIManager.StageWidth }, 400, egret.Ease.backIn)
                    .call(this.popSceneCall, this, [scene, top_scene]);
            }
            else if (animation == UI.HIDE_TRAIL_OFF) {
                zj.Game.SoundManager.playEffect("ui_jiemian_guanbi_mp3", 100);
                top_scene.x = UIManager.StageWidth / 2;
                top_scene.y = UIManager.StageHeight / 2;
                top_scene.anchorOffsetX = UIManager.StageWidth / 2;
                top_scene.anchorOffsetY = UIManager.StageHeight / 2;
                top_scene.scaleX = 1;
                top_scene.scaleY = 1;
                egret.Tween.get(top_scene).to({ scaleX: 0, scaleY: 0 }, 400, egret.Ease.sineIn)
                    .call(this.popSceneCall, this, [scene, top_scene]);
            }
            else {
                this.popSceneCall(scene, top_scene);
            }
        };
        // 压入一个场景入栈的同时，把原栈顶场景出栈
        UIManager.prototype.switchScene = function (scene, animation) {
            if (scene == null)
                return;
            scene.width = UIManager.StageWidth;
            scene.height = UIManager.StageHeight;
            scene.anchorOffsetX = 0;
            scene.anchorOffsetY = 0;
            scene.x = 0;
            scene.y = 0;
            var top_scene = null;
            if (this.scenes.length > 0) {
                top_scene = this.scenes[this.scenes.length - 1];
                this.scenes.pop();
                top_scene.anchorOffsetX = 0;
                top_scene.anchorOffsetY = 0;
                top_scene.x = 0;
                top_scene.y = 0;
            }
            this.scenes.push(scene);
            this.sceneGroup.addChild(scene);
            if (!top_scene) {
                scene.onEntryTopScene();
                this.notifyTeachPushUI(scene);
                return;
            } // 不需要动画
            top_scene.visible = false;
            this.backround_img.visible = true;
            this.animationCount++;
            this.maskAllUIs();
            // this.maskRect.visible = !!(++this.maskCount); // 遮罩，不允许点击
            if (animation == UI.SHOW_FROM_TOP) {
                zj.Game.SoundManager.playEffect("ui_erji_jiemian_mp3", 100);
                scene.y = -UIManager.StageHeight;
                egret.Tween.get(scene).to({ y: 0 }, 400, egret.Ease.sineOut)
                    .call(this.popSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ y: UIManager.StageHeight }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FROM_BOTTON) {
                zj.Game.SoundManager.playEffect("ui_erji_jiemian_mp3", 100);
                scene.y = UIManager.StageHeight;
                egret.Tween.get(scene).to({ y: 0 }, 400, egret.Ease.sineOut)
                    .call(this.popSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ y: -UIManager.StageHeight }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FROM_LEFT) {
                scene.x = -UIManager.StageWidth;
                egret.Tween.get(scene).to({ x: 0 }, 400, egret.Ease.sineOut)
                    .call(this.popSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ x: UIManager.StageWidth }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FROM_RIGHT) {
                scene.x = UIManager.StageWidth;
                egret.Tween.get(scene).to({ x: 0 }, 400, egret.Ease.sineOut)
                    .call(this.popSceneCall, this, [scene, top_scene]);
                // egret.Tween.get(top_scene).to({ x: -UIManager.StageWidth }, 400, egret.Ease.sineOut);
            }
            else if (animation == UI.SHOW_FILL_OUT) {
                zj.Game.SoundManager.playEffect("ui_xiao_jiemian_mp3", 100);
                scene.x = UIManager.StageWidth / 2;
                scene.y = UIManager.StageHeight / 2;
                scene.anchorOffsetX = UIManager.StageWidth / 2;
                scene.anchorOffsetY = UIManager.StageHeight / 2;
                scene.scaleX = 0;
                scene.scaleY = 0;
                egret.Tween.get(scene).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.sineOut)
                    .call(this.popSceneCall, this, [scene, top_scene]);
            }
            else {
                this.popSceneCall(scene, top_scene);
            }
        };
        // 获取栈顶对话框
        UIManager.prototype.topDialog = function () {
            if (this.dialogs.length <= 0) {
                zj.Game.EventManager.event(zj.GameEvent.NUMBER_OF_DIALOG, { count: 0 });
                return null;
            }
            return this.dialogs[this.dialogs.length - 1];
        };
        // 获取栈顶场景
        UIManager.prototype.topScene = function () {
            if (this.scenes.length <= 0)
                return null;
            return this.scenes[this.scenes.length - 1];
        };
        UIManager.prototype.getScene = function (idx) {
            if (idx < this.scenes.length) {
                return this.scenes[idx];
            }
            return null;
        };
        // 栈中的对话框数量
        UIManager.prototype.dialogCount = function () {
            return this.dialogs.length;
        };
        // 场景栈中的场景数量
        UIManager.prototype.sceneCount = function () {
            return this.scenes.length;
        };
        UIManager.prototype.popAllUIs = function () {
            zj.StageSceneManager.Instance.clearScene();
            this.groupTeachUI.removeChildren();
            // while (this.maskRect.visible) this.unmaskAllUIs();
            while (zj.Game.UIManager.dialogCount() > 0)
                zj.Game.UIManager.popDialog();
            while (zj.Game.UIManager.sceneCount() > 1)
                zj.Game.UIManager.popScene();
            zj.Game.UIManager.removeScene(this.topScene());
            this.maskRect.visible = false;
            this.maskCount = 0;
        };
        // 弹出所有场景和对话框,并返回主城
        UIManager.prototype.popAllScenesAndDialogs = function (func) {
            if (func === void 0) { func = null; }
            this.popAllUIs();
            zj.SceneManager.instance.EnterMainCityNew(func);
        };
        UIManager.prototype.popAllDialogs = function () {
            while (zj.Game.UIManager.dialogCount() > 0)
                zj.Game.UIManager.popDialog();
        };
        // 添加资源缓存
        UIManager.prototype.addCacheResouce = function (ui, uiName) {
            // 如果在待释放资源列表中，则移到缓存队列中
            for (var i = 0; i < this.uiDestroyList.length; i++) {
                var obj = this.uiDestroyList[i];
                if (obj.uiName == uiName) {
                    this.uiDestroyList.splice(i, 1);
                    obj.uis.push(ui);
                    this.uiCacheList.push(obj);
                    this.printUIResourceStates(); // 打印
                    return;
                }
            }
            // 如果在缓存队列，则添加
            for (var i = 0; i < this.uiCacheList.length; i++) {
                var obj = this.uiCacheList[i];
                if (obj.uiName == uiName) {
                    obj.uis.push(ui);
                    this.printUIResourceStates(); // 打印
                    return;
                }
            }
            // 新增一条记录
            this.uiCacheList.push({ uiName: uiName, uis: [ui], groupNames: [] });
            this.printUIResourceStates(); // 打印
        };
        // 删除资源缓存
        UIManager.prototype.removeCacheResouce = function (ui) {
            var has_removed = false;
            for (var i = 0; (i < this.uiCacheList.length) && !has_removed; i++) {
                var obj = this.uiCacheList[i];
                for (var j = 0; j < obj.uis.length; j++) {
                    if (obj.uis[j] == ui) {
                        for (var k in ui.cachedGroupNames) {
                            obj.groupNames.push(k);
                        }
                        ui.cachedGroupNames = {};
                        ui.cachedResKeys = {};
                        obj.uis.splice(j, 1);
                        has_removed = true;
                        break;
                    }
                }
                if (obj.uis.length == 0) {
                    // 移到待释放队列中
                    this.uiCacheList.splice(i, 1);
                    this.uiDestroyList.push(obj);
                    break;
                }
                if (has_removed)
                    break;
            }
            if (!has_removed) {
                // 可能是没有用newUI或loadUI，但是调用了pushScene或pushDialog的情况
                var key = "ui_" + ui.hashCode;
                if (RES.hasRes(key) && RES.isGroupLoaded(key)) {
                    zj.Util.destroyRes(key, false);
                    // console.log(`[RESOURCE] 释放[${key}]`);
                    return;
                }
            }
            // 待释放资源超过最大值，释放最早的资源
            while ((this.uiDestroyList.length > UIManager.UIMaxDestroy) && (this.loadingGroupCount == 0)) {
                var obj = this.uiDestroyList[0];
                this.uiDestroyList.shift();
                if (zj.UIResource.hasOwnProperty(obj.uiName) && zj.UIResource[obj.uiName].length > 0) {
                    zj.Util.destroyRes(obj.uiName, false);
                    // console.log(`[RESOURCE] 释放[${obj.uiName}]`);
                }
                for (var i = 0; i < obj.groupNames.length; i++) {
                    zj.Util.destroyRes(obj.groupNames[i], false);
                    // console.log(`[RESOURCE] 释放[${obj.groupNames[i]}]`);
                }
            }
            this.printUIResourceStates(); // 打印
        };
        // 打印资源面板状态列表
        UIManager.prototype.printUIResourceStates = function () {
            // let str = "[RESOURCE] 待释放[";
            // for (let i = 0; i < this.uiDestroyList.length; i++) {
            //     let obj: any = this.uiDestroyList[i];
            //     str += obj.uiName;
            //     str += ",";
            // }
            // str += "], 缓存中[";
            // for (let i = 0; i < this.uiCacheList.length; i++) {
            //     let obj: any = this.uiCacheList[i];
            //     str += obj.uiName;
            //     str += ",";
            // }
            // str += "]";
            // console.log(str);
        };
        UIManager.StageWidth = 0;
        UIManager.StageHeight = 0;
        UIManager.Stage = null;
        UIManager.InitFrameRate = 30; // 初始运行帧率
        UIManager.UIMaxDestroy = 10; // 保留的最大待释放UI资源数
        return UIManager;
    }(eui.Group));
    zj.UIManager = UIManager;
    __reflect(UIManager.prototype, "zj.UIManager");
})(zj || (zj = {}));
//# sourceMappingURL=UIManager.js.map