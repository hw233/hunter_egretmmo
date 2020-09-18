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
    var ArenaWholeAward = (function (_super) {
        __extends(ArenaWholeAward, _super);
        function ArenaWholeAward() {
            var _this = _super.call(this) || this;
            _this.type = 1;
            _this.list = [];
            _this.skinName = "resource/skins/arena/ArenaWholeAwardSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        ArenaWholeAward.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnDayRank.addEventListener(tap, this.onBtnDayRank, this);
            this.btnYeserday.addEventListener(tap, this.onBtnYeserday, this);
            this.btnOne.addEventListener(tap, this.onBtnOne, this);
            this.btnOneSelf.addEventListener(tap, this.onBtnOneSelf, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.awardUp, this);
        };
        ArenaWholeAward.prototype.setInfo = function (father) {
            this.father = father;
            this.loadInfo();
        };
        /**点击不同按钮显示不同顶部信息 */
        ArenaWholeAward.prototype.loadInfoBtn = function () {
            var rankShow = this.type == 3 /* rankReward */ || this.type == 4 /* selfRankReward */;
            var swasonShow = this.type == 1 /* dailyReward */ || this.type == 2 /* seasonReward */;
            this.Group1.visible = swasonShow;
            this.Group2.visible = rankShow;
        };
        /**加载信息 */
        ArenaWholeAward.prototype.loadInfo = function () {
            this.loadInfoTop();
            this.loadInfoList();
        };
        /**加载顶部信息 */
        ArenaWholeAward.prototype.loadInfoTop = function () {
            if (this.father.myInfo != null) {
                var level = zj.singLecraft.GetLevel(this.father.myInfo.craft_score);
                var info = zj.singLecraft.InstanceScore(level);
                this.imgGrade.source = zj.cachekey(info.icon_num, this);
                this.labelJifen.text = zj.Helper.StringFormat(this.father.myInfo.craft_score);
                if (this.type == 3 /* rankReward */) {
                    this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.order, this.father.myInfo.craft_rank);
                    this.imgMyRankWorld.visible = true;
                    this.imgMyRankServer.visible = false;
                }
                else {
                    this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.order, this.father.myInfo.craft_rank_self);
                    this.imgMyRankWorld.visible = false;
                    this.imgMyRankServer.visible = true;
                }
            }
            else {
                this.imgGrade.source = null;
                this.labelJifen.text = zj.TextsConfig.TextsConfig_Pk.norank.score;
                this.labelRank.text = zj.TextsConfig.TextsConfig_Pk.norank.rangking;
            }
            if (this.type == 1 /* dailyReward */) {
                var time = Math.floor((zj.CommonConfig.singlecraft_state_duration[2] - 86400 * 6) / 3600);
                this.labelAwardRushTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.award_fresh[1], time));
            }
            else {
                this.labelAwardRushTime.text = zj.TextsConfig.TextsConfig_Pk.award_fresh[2];
            }
        };
        /**加载list信息 */
        ArenaWholeAward.prototype.loadInfoList = function () {
            var _this = this;
            var score = zj.CommonConfig.singlecraft_init_score; //初始积分
            var rank = 0;
            if (this.father.myInfo.craft_score != null) {
                score = this.father.myInfo.craft_score;
                if (this.type == 3 /* rankReward */) {
                    rank = this.father.myInfo.craft_rank;
                }
                else if (this.type == 4 /* selfRankReward */) {
                    rank = this.father.myInfo.craft_rank_self;
                }
            }
            this.list = zj.singLecraft.RewardGoods(this.type, this.father.index);
            var forcusIndex = zj.singLecraft.GetLevel(score);
            if (this.type == 3 /* rankReward */) {
                forcusIndex = 0;
                for (var k in this.list) {
                    if (this.list.hasOwnProperty(k)) {
                        var v = this.list[k];
                        if (rank >= v.min && rank <= v.max) {
                            forcusIndex = Number(k);
                        }
                    }
                }
            }
            else if (this.type == 4 /* selfRankReward */) {
                forcusIndex = 0;
                for (var k in this.list) {
                    if (this.list.hasOwnProperty(k)) {
                        var v = this.list[k];
                        if (rank >= v.min && rank <= v.max) {
                            forcusIndex = Number(k);
                        }
                    }
                }
            }
            egret.Tween.get(this.listAward).to({ alpha: 0 }, 100).call(function () {
                _this.scroller.stopAnimation();
                _this.listAward.scrollV = 0;
                var array = new eui.ArrayCollection();
                if (_this.type == 1 /* dailyReward */ || _this.type == 2 /* seasonReward */) {
                    for (var j = 0; j < _this.list.length; j++) {
                        var data = new zj.ArenaWholeAwardItemData();
                        data.index = _this.list.length - j + 1;
                        data.info = _this.list[_this.list.length - j - 1];
                        data.forcus = (forcusIndex == _this.list.length - j + 1);
                        data.father = _this;
                        array.addItem(data);
                    }
                    _this.listAward.dataProvider = array;
                    _this.listAward.itemRenderer = zj.ArenaWholeAwardItem;
                }
                else {
                    for (var j = 0; j < _this.list.length; j++) {
                        var data = new zj.ArenaWholeAwardItemBData();
                        data.index = j;
                        data.info = _this.list[j];
                        data.forcur = (forcusIndex == j);
                        data.father = _this;
                        array.addItem(data);
                    }
                    _this.listAward.dataProvider = array;
                    _this.listAward.itemRenderer = zj.ArenaWholeAwardItemB;
                }
                _this.listAward.scrollV = 0;
            }).to({ alpha: 1 }, 150);
        };
        /**日常奖励 */
        ArenaWholeAward.prototype.onBtnDayRank = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamSel_png"); //将按钮颜色变亮 
            this.type = 1 /* dailyReward */;
            this.loadInfoBtn();
            this.loadInfo();
        };
        /**赛季奖励 */
        ArenaWholeAward.prototype.onBtnYeserday = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnYeserday, "ui_arena_ButtonNumTeamSel_png"); //将按钮颜色变亮 
            this.type = 2 /* seasonReward */;
            this.loadInfoBtn();
            this.loadInfo();
        };
        /**世界排名奖励 */
        ArenaWholeAward.prototype.onBtnOne = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonWorldAwardSel_png"); //将按钮颜色变亮 
            this.type = 3 /* rankReward */;
            this.loadInfoBtn();
            this.loadInfo();
        };
        /**本服排名奖励 */
        ArenaWholeAward.prototype.onBtnOneSelf = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonServerAwardSel_png"); //将按钮颜色变亮 
            this.type = 4 /* selfRankReward */;
            this.loadInfoBtn();
            this.loadInfo();
        };
        /**将所有按钮颜色变暗 */
        ArenaWholeAward.prototype.btnColour = function () {
            zj.Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamNor_png");
            zj.Set.ButtonBackgroud(this.btnYeserday, "ui_arena_ButtonNumTeamNor_png");
            zj.Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonWorldAwardNor_png");
            zj.Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonServerAwardNor_png");
        };
        /**奖励详情 */
        ArenaWholeAward.prototype.awardParticulars = function (xy, cx, cy, info) {
            if (Math.floor(info.goodsId / 1000) == 195) {
            }
            else {
                var ui = this.getChildByName("UI");
                if (ui) {
                    return;
                }
                var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
                commonDesSkill.name = "UI";
                this.addChild(commonDesSkill);
            }
        };
        /**抬起移除奖励详情界面 */
        ArenaWholeAward.prototype.awardUp = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        /**关闭弹窗*/
        ArenaWholeAward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ArenaWholeAward;
    }(zj.Dialog));
    zj.ArenaWholeAward = ArenaWholeAward;
    __reflect(ArenaWholeAward.prototype, "zj.ArenaWholeAward");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeAward.js.map