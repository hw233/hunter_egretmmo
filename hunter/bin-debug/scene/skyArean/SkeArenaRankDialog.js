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
    // SkeArenaRankDialog（天空竞技场排行榜）
    // hexiaowei
    // 20019/02/23
    var SkeArenaRankDialog = (function (_super) {
        __extends(SkeArenaRankDialog, _super);
        function SkeArenaRankDialog() {
            var _this = _super.call(this) || this;
            _this.rankType = null;
            _this.RANK_TYPE = zj.ConstantConfig_UI_Config.RANK_TYPE;
            _this.RANK_NUM = 49;
            _this.rankUser = null;
            _this.skinName = "resource/skins/skyArean/SkeArenaRankSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        SkeArenaRankDialog.prototype.loadFrom = function (father, index) {
            this.father = father;
            this.imageRankTip.source = zj.cachekey(zj.UIConfig.UIConfig_Tower.rankTitle[index], this);
            this.reqRankBefore(index);
        };
        SkeArenaRankDialog.prototype.reqRankBefore = function (index) {
            var _this = this;
            this.rankType = this.RANK_TYPE[index];
            var start = 0;
            var count = zj.CommonConfig.rank_list_max - 1;
            this.ReqRankVisit(this.rankType, start, count)
                .then(function (data) {
                for (var k in data.rankItemsInfo) {
                    var v = data.rankItemsInfo[k];
                    if (k == data.rankItemsInfo.length) {
                        _this.rankUser = v.rank;
                    }
                }
                var m = data.rankItemsInfo;
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        SkeArenaRankDialog.prototype.ReqRankVisit = function (rankType, start, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RankItemInfoRequest();
                request.body.type = 4;
                request.body.start = start;
                request.body.num = num;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        var m = zj.Game.ConfigManager.getAone2CodeReason(response.header.result);
                        return;
                    }
                    // 解压RankItemsZip 信息
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.itemsZip, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.RankItemsZip();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        SkeArenaRankDialog.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return SkeArenaRankDialog;
    }(zj.Dialog));
    zj.SkeArenaRankDialog = SkeArenaRankDialog;
    __reflect(SkeArenaRankDialog.prototype, "zj.SkeArenaRankDialog");
})(zj || (zj = {}));
//# sourceMappingURL=SkeArenaRankDialog.js.map