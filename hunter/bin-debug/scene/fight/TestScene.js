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
    var TestScene = (function (_super) {
        __extends(TestScene, _super);
        function TestScene() {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.arr = [];
            _this.arrIndex = 0;
            _this.dbArr = [];
            _this.sceneSp = new egret.Sprite();
            _this.addChild(_this.sceneSp);
            _this.sp = new egret.Sprite();
            _this.sp.touchEnabled = true;
            _this.sceneSp.addChild(_this.sp);
            _this.sp.graphics.beginFill(0xff0000, 0.3);
            _this.sp.graphics.drawRect(0, 0, zj.UIManager.StageWidth, zj.UIManager.StageHeight);
            _this.sp.graphics.endFill();
            _this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickHandler, _this);
            _this.uiSp = new egret.Sprite();
            _this.addChild(_this.uiSp);
            _this.count = egret.$hashCount;
            _this.tttt = egret.setInterval(_this.timer, _this, 1000);
            var button = new egret.Sprite();
            button.touchEnabled = true;
            _this.uiSp.addChild(button);
            button.graphics.beginFill(0x000000);
            button.graphics.drawRect(0, 0, 100, 50);
            button.graphics.endFill();
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeHandler, _this);
            return _this;
        }
        TestScene.prototype.closeHandler = function () {
            egret.clearInterval(this.tttt);
            zj.StageSceneManager.Instance.clearScene();
        };
        TestScene.prototype.timer = function () {
            var newCount = egret.$hashCount;
            var diff = newCount - this.count;
            this.count = newCount;
            console.log("！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！" + diff);
        };
        TestScene.prototype.Init = function () {
            this.arr = zj.FightLoading.getInstance().resArr;
        };
        TestScene.prototype.clickHandler = function (e) {
            var spx = zj.HunterSpineX(1, 1, null, this.arr[this.arrIndex])[0];
            spx.ChangeAction(0);
            spx.SetPosition(e.localX, e.localY);
            this.sceneSp.addChild(spx.spine);
            this.dbArr.push(spx);
            this.arrIndex++;
            if (this.arrIndex >= this.arr.length) {
                this.arrIndex = 0;
            }
        };
        TestScene.prototype.OnLoading = function (num) {
        };
        TestScene.prototype.OnExit = function () {
            while (this.dbArr.length > 0) {
                var spine = this.dbArr[0];
                zj.clearSpine(spine.spine);
                this.dbArr.splice(0, 1);
                spine.spine = null;
                spine = null;
            }
            this.dbArr.length = 0;
        };
        return TestScene;
    }(zj.Scene));
    zj.TestScene = TestScene;
    __reflect(TestScene.prototype, "zj.TestScene");
})(zj || (zj = {}));
//# sourceMappingURL=TestScene.js.map