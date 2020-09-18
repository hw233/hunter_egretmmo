var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 资源加载控制类
    // 翟伟利 
    // 创建于2020.1.7
    var LoadControler = (function () {
        function LoadControler(keys, callFinish, callProgress) {
            this.callFinish = callFinish;
            this.callProgress = callProgress;
            this.isStart = false;
            this.initDatas(keys);
        }
        LoadControler.prototype.initDatas = function (keys) {
            if (!this.isStart) {
                this.resKeys = keys;
            }
            else {
                console.log("已开始加载则不能重置加载列表");
            }
        };
        LoadControler.prototype.addDatas = function (keys) {
            if (keys && keys.length > 0) {
                this.resKeys = this.resKeys.concat(keys);
            }
        };
        LoadControler.prototype.onStart = function () {
            if (!this.isStart) {
                if (this.resKeys && this.resKeys.length > 0) {
                    this.loadIdx = 0;
                    this.isStart = true;
                    this.loadRes();
                }
                else {
                    if (this.callFinish) {
                        this.callFinish();
                    }
                }
            }
        };
        LoadControler.prototype.loadRes = function () {
            this.reLoadNum = 2;
            this.load();
        };
        LoadControler.prototype.load = function () {
            var _this = this;
            if (this.loadIdx < this.resKeys.length) {
                var self_1 = this;
                var key_1 = this.resKeys[this.loadIdx];
                RES.getResAsync(key_1)
                    .then(function (data) {
                    if (_this.callProgress) {
                        _this.callProgress(key_1, self_1.loadIdx);
                    }
                    self_1.loadIdx++;
                    self_1.loadRes();
                })
                    .catch(function (e) {
                    if (--_this.reLoadNum < 0) {
                        Main.renetDialog.show(function () {
                            self_1.loadRes();
                        });
                    }
                    else {
                        _this.load();
                    }
                });
            }
            else {
                if (this.callFinish) {
                    this.callFinish();
                }
            }
        };
        return LoadControler;
    }());
    zj.LoadControler = LoadControler;
    __reflect(LoadControler.prototype, "zj.LoadControler");
})(zj || (zj = {}));
//# sourceMappingURL=LoadControler.js.map