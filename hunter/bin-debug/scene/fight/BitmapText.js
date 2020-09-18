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
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        function BitmapText() {
            var _this = _super.call(this) || this;
            _this.imageMap = {};
            _this.bitWidth = 0;
            _this.bitmapArr = [];
            _this.init();
            return _this;
        }
        BitmapText.prototype.init = function () {
            this.image = new egret.Bitmap();
            //this.addChild(this.image);
        };
        BitmapText.prototype.setData = function (url, txt) {
            if (txt === void 0) { txt = "0123456789"; }
            var texture = RES.getRes(url);
            var width = texture.textureWidth;
            var height = texture.textureHeight;
            this.image.texture = texture;
            var arr = txt.split("");
            this.bitWidth = width / arr.length;
            var rect = new egret.Rectangle(0, 0, this.bitWidth, height);
            for (var i = 0; i < arr.length; i++) {
                rect.x = i * this.bitWidth;
                var rt = new egret.RenderTexture;
                rt.drawToTexture(this.image, rect);
                this.imageMap[arr[i]] = rt;
            }
            this.image = null;
            for (var i = 0; i < 10; i++) {
                var img = new egret.Bitmap();
                this.bitmapArr.push(img);
            }
        };
        BitmapText.prototype.clearImage = function () {
            // for(let key in this.imageMap){
            // 	let img = this.imageMap[key];
            // 	img.x=0;
            // 	if(img.stage){
            // 		this.removeChild(img);
            // 	}
            // }
        };
        Object.defineProperty(BitmapText.prototype, "setText", {
            set: function (num) {
                this.removeChildren();
                var arr = num.split("");
                for (var i = 0; i < arr.length; i++) {
                    var img = this.bitmapArr[i];
                    img.texture = this.imageMap[arr[i]];
                    this.addChild(img);
                    img.x = i * this.bitWidth;
                }
            },
            enumerable: true,
            configurable: true
        });
        return BitmapText;
    }(egret.Sprite));
    zj.BitmapText = BitmapText;
    __reflect(BitmapText.prototype, "zj.BitmapText");
})(zj || (zj = {}));
//# sourceMappingURL=BitmapText.js.map