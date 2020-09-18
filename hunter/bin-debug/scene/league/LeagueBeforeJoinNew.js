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
    // 公会-加入公会
    // lizhengqiang
    // 20181213
    var LeagueBeforeJoinNew = (function (_super) {
        __extends(LeagueBeforeJoinNew, _super);
        function LeagueBeforeJoinNew() {
            var _this = _super.call(this) || this;
            _this.arrCollection = new eui.ArrayCollection();
            _this.arrSearch = [];
            _this.isBatch = false;
            _this.start = 0;
            _this.numEach = 20;
            _this.skinName = "resource/skins/league/LeagueBeforeJoinNewSkin.exml";
            _this.scrollerLeague.addEventListener(eui.UIEvent.CHANGE_END, _this.onScrollerEnd, _this);
            _this.btnSearchName.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSearchName, _this);
            _this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChange, _this);
            _this.btnFast.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFast, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_BEFORE_JOIN_CLOSE, _this.onBtnClose, _this);
            _this.init();
            return _this;
        }
        ;
        LeagueBeforeJoinNew.prototype.init = function () {
            this.txtName.skinName = "resource/skins/common/TextInputSkin.exml";
            this.txtName.textDisplay.textColor = 0x411A03;
            this.txtName.promptDisplay.textColor = 0x958672;
            this.txtName.promptDisplay.size = 16;
            this.txtName.inputType = egret.TextFieldType.INPUT;
            this.txtName.prompt = zj.TextsConfig.TextConfig_Input.joinLeagueName;
            this.search();
        };
        LeagueBeforeJoinNew.prototype.search = function () {
            var _this = this;
            this.start = 0;
            this.arrSearch = [];
            zj.Game.PlayerLeagueSystem.leagueSearch(0, this.txtName.text, this.start, this.numEach, this.isBatch).then(function (info) {
                // if (info.length == 0) {
                // 	toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
                // }
                _this.start = _this.start + info.length;
                _this.arrSearch = info;
                _this.loadList();
            });
        };
        LeagueBeforeJoinNew.prototype.loadList = function () {
            this.arrCollection.removeAll();
            for (var _i = 0, _a = this.arrSearch; _i < _a.length; _i++) {
                var v = _a[_i];
                this.arrCollection.addItem({ "leagueBase": v, "father": this });
            }
            this.lstLeague.itemRenderer = zj.LeagueBeforeJoinItemNewIR;
            this.lstLeague.dataProvider = this.arrCollection;
        };
        LeagueBeforeJoinNew.prototype.onScrollerEnd = function () {
            var _this = this;
            if (this.lstLeague.scrollV + this.scrollerLeague.height >= this.lstLeague.contentHeight) {
                zj.Game.PlayerLeagueSystem.leagueSearch(0, this.txtName.text, this.start, this.numEach, this.isBatch).then(function (info) {
                    if (info.length == 0) {
                        // toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
                        return;
                    }
                    _this.start = _this.start + info.length;
                    _this.arrSearch = _this.arrSearch.concat(info);
                    var arrCollection = new eui.ArrayCollection();
                    for (var _i = 0, _a = _this.arrSearch; _i < _a.length; _i++) {
                        var v = _a[_i];
                        arrCollection.addItem({ "leagueBase": v, "father": _this });
                    }
                    if (arrCollection.source.length == 0)
                        return;
                    _this.arrCollection.replaceAll(arrCollection.source);
                });
            }
        };
        // 搜索
        LeagueBeforeJoinNew.prototype.onBtnSearchName = function () {
            if (this.txtName.text == "") {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_Input.joinLeagueName));
            }
            else {
                this.isBatch = false;
                this.search();
            }
        };
        // 换一批
        LeagueBeforeJoinNew.prototype.onBtnChange = function () {
            this.isBatch = true;
            this.search();
        };
        // 一键加入
        LeagueBeforeJoinNew.prototype.onBtnFast = function () {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueApplyQuick().then(function (resp) {
                zj.loadUI(zj.LeagueHomeScene).then(function (scene) {
                    zj.toast_success(zj.LANG(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.quick_success, resp.info.name)));
                    _this.onBtnClose();
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            });
        };
        LeagueBeforeJoinNew.prototype.managePop = function (msg, point) {
            var tmp = this.getChildByName("Chat_UserPopB");
            if (tmp)
                this.removeChild(tmp);
            var pop = new zj.Chat_UserPopB();
            pop.name = "Chat_UserPopB";
            pop.setMsgInfo(msg);
            pop.x = point.x - pop.width / 2 + 50;
            pop.y = point.y - pop.height / 2 + 10;
            this.addChild(pop);
        };
        LeagueBeforeJoinNew.prototype.onClose = function (e) {
            var tmp = this.getChildByName("Chat_UserPopB");
            if (tmp) {
                var world = tmp["groupAdaptBoard"].localToGlobal();
                world.x -= zj.Game.UIManager.x;
                var rect = new egret.Rectangle(world.x, world.y, tmp["groupAdaptBoard"].width, tmp["groupAdaptBoard"].height);
                if (rect.contains(e.stageX, e.stageY) == false) {
                    this.removeChild(tmp);
                }
            }
        };
        LeagueBeforeJoinNew.prototype.onBtnClose = function () {
            this.close();
        };
        return LeagueBeforeJoinNew;
    }(zj.Dialog));
    zj.LeagueBeforeJoinNew = LeagueBeforeJoinNew;
    __reflect(LeagueBeforeJoinNew.prototype, "zj.LeagueBeforeJoinNew");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBeforeJoinNew.js.map