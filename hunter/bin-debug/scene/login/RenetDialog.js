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
    // 进主城前加载失败弹框
    // 翟伟利 
    // 创建于2020.1.4
    var RenetDialog = (function (_super) {
        __extends(RenetDialog, _super);
        function RenetDialog(stage) {
            var _this = _super.call(this) || this;
            _this.rootStage = null;
            _this.isShow = false;
            _this.rootStage = stage;
            _this.isShow = false;
            _this.initUI();
            _this.rect_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            _this.lbLog.text = "";
            _this.onAddStage();
            return _this;
        }
        RenetDialog.prototype.initUI = function () {
            // 参考 RenetDialogSkin.exml
            // 大背景半透
            var rect = new eui.Rect();
            rect.fillColor = 0;
            rect.strokeColor = 0;
            rect.fillAlpha = 0;
            rect.touchEnabled = true;
            rect.left = 0;
            rect.top = 0;
            rect.right = 0;
            rect.bottom = 0;
            this.addChild(rect);
            this.rectBack = rect;
            // 中间UI区group
            var group = new eui.Group();
            group.width = 440;
            group.height = 200;
            group.horizontalCenter = "0";
            group.verticalCenter = "0";
            this.addChild(group);
            // 中间UI区域白底儿
            rect = new eui.Rect();
            rect.fillColor = 0xffffff;
            rect.strokeColor = 0;
            rect.ellipseWidth = 10;
            rect.ellipseHeight = 10;
            rect.left = 0;
            rect.top = 0;
            rect.right = 0;
            rect.bottom = 0;
            group.addChild(rect);
            // UI区域灰线Y坐标
            var line = 120;
            // UI区域中间灰线
            rect = new eui.Rect();
            rect.height = 2;
            rect.y = line;
            rect.fillColor = 0x565859;
            rect.fillAlpha = 0.3;
            rect.strokeAlpha = 0;
            rect.left = 0;
            rect.right = 0;
            group.addChild(rect);
            // UI区域上方提示文字
            var label = new eui.Label();
            label.height = line;
            label.size = 25;
            label.verticalAlign = "middle";
            label.textAlign = "center";
            label.textColor = 0x8a8e8e;
            label.left = 0;
            label.right = 0;
            label.text = "网络加载超时，请检查网络后重试";
            group.addChild(label);
            this.lbMsg = label;
            // UI区域下方按钮文字
            label = new eui.Label();
            label.height = group.height - line;
            label.size = 28;
            label.verticalAlign = "middle";
            label.textAlign = "center";
            label.textColor = 0x004AFF;
            label.left = 0;
            label.right = 0;
            label.bottom = 0;
            label.text = "重试";
            group.addChild(label);
            this.lbBtn = label;
            // UI区域下方按钮
            var groupBtn = new eui.Group();
            groupBtn.height = group.height - line;
            groupBtn.left = 0;
            groupBtn.right = 0;
            groupBtn.bottom = 0;
            group.addChild(groupBtn);
            this.rect_ok = groupBtn;
            // 左下角log（用于输出提示类型或打点）
            label = new eui.Label();
            label.size = 18;
            label.left = 4;
            label.bottom = 4;
            label.textColor = 0xffffff;
            this.addChild(label);
            this.lbLog = label;
        };
        RenetDialog.prototype.onAddStage = function () {
            this.rectBack.fillAlpha = 0;
            egret.Tween.get(this.rectBack).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
        };
        RenetDialog.prototype.setLog = function (str) {
            this.lbLog.text = str;
        };
        RenetDialog.prototype.setBtnStr = function (str) {
            this.lbBtn.text = str;
        };
        RenetDialog.prototype.setMsgStr = function (str) {
            this.lbMsg.text = str;
        };
        RenetDialog.prototype.show = function (callbackOk) {
            this.callbackOk = callbackOk;
            if (!this.isShow) {
                this.width = this.rootStage.stageWidth;
                this.height = this.rootStage.stageHeight;
                this.rootStage.addChild(this);
                this.isShow = true;
            }
        };
        RenetDialog.prototype.close = function () {
            // this.rect_ok.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.isShow = false;
        };
        RenetDialog.prototype.onBtnOK = function () {
            this.close();
            if (this.callbackOk) {
                this.callbackOk();
                this.callbackOk = null;
            }
        };
        return RenetDialog;
    }(eui.Component));
    zj.RenetDialog = RenetDialog;
    __reflect(RenetDialog.prototype, "zj.RenetDialog");
})(zj || (zj = {}));
//# sourceMappingURL=RenetDialog.js.map