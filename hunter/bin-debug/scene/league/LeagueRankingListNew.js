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
    // 公会-公会排行榜
    // lizhengqiang
    // 20181227
    var LeagueRankingListNew = (function (_super) {
        __extends(LeagueRankingListNew, _super);
        function LeagueRankingListNew() {
            var _this = _super.call(this) || this;
            _this.arrLeagueBase = [];
            _this.rankType = message.ELeagueRankType.RANK_TYPE_LEVEL; // 公会排行类型（1：按等级RANK_TYPE_LEVEL，2：按总战力RANK_TYPE_POWER，3：按段位RANK_TYPE_DAN）
            _this.myLeagueRank = 0; // 本公会排名
            _this.isOpen = false;
            _this.start = 0;
            _this.numEach = 20;
            _this.skinName = "resource/skins/league/LeagueRankingListNewSkin.exml";
            _this.scrollerLeagueRanking.addEventListener(eui.UIEvent.CHANGE_END, _this.onScrollerEnd, _this);
            _this.btnUnionLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUnionLevel, _this);
            _this.btnUnionRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUnionRank, _this);
            _this.btnUnionStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUnionStrength, _this);
            _this.btnUnionSort.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUnionSort, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClose, _this);
            _this.init();
            return _this;
        }
        LeagueRankingListNew.prototype.init = function () {
            this.groupSort.visible = false;
            this.rankInfo();
        };
        LeagueRankingListNew.prototype.rankInfo = function () {
            var _this = this;
            this.start = 0;
            this.arrLeagueBase = [];
            zj.Game.PlayerLeagueSystem.leagueRankInfo(this.rankType, this.start, this.numEach).then(function (resp) {
                // if (resp.body.info.length == 0) {
                // 	toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
                // }
                _this.start = _this.start + resp.body.info.length;
                _this.arrLeagueBase = _this.arrLeagueBase.concat(resp.body.info);
                _this.myLeagueRank = resp.body.league_rank;
                _this.loadList();
                _this.setMyleagueInfo();
            });
        };
        LeagueRankingListNew.prototype.setMyleagueInfo = function () {
            if (zj.Game.PlayerInfoSystem.LeagueId == 0) {
                this.groupMyUnion.visible = false;
                this.lbMyUnion.visible = true;
            }
            else {
                var info = zj.Game.PlayerLeagueSystem.BaseInfo;
                // 排名
                if (this.myLeagueRank == 0) {
                    this.lbLeagueNo.text = zj.TextsConfig.TextsConfig_Rank.noRank;
                }
                else {
                    this.lbLeagueNo.text = this.myLeagueRank.toString();
                }
                // 公会名称
                this.lbLeagueName.text = info.name;
                // 等级
                this.lbLeagueLevel.text = info.level.toString();
                // 人数
                this.lbMemberNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.memberDesRank, info.curNum, zj.TableLevel.Item(info.level).league_people);
                if (info.curNum >= zj.TableLevel.Item(info.level).league_people) {
                    this.lbMemberNum.textColor = zj.ConstantConfig_Common.Color.red;
                }
                // 段位
                var starPath = zj.PlayerLeagueSystem.GetSegment(info.match_score)[4];
                if (starPath != "") {
                    this.imgStar.source = zj.cachekey(starPath, this);
                }
                else {
                    this.imgStar.visible = false;
                }
                // 总战力
                this.lbLeaderStrength.text = (Math.floor(info.battle_value / 10000)).toString() + "万";
                // 会长
                this.lbLeaderName.text = info.leaderName;
            }
        };
        LeagueRankingListNew.prototype.loadList = function () {
            this.arrCollection = new eui.ArrayCollection();
            var rankNo = 1;
            for (var _i = 0, _a = this.arrLeagueBase; _i < _a.length; _i++) {
                var v = _a[_i];
                this.arrCollection.addItem({ "rankNo": rankNo, "leagueBase": v, "father": this });
                rankNo += 1;
            }
            this.lstLeagueRanking.itemRenderer = zj.LeagueRankingListItemNewIR;
            this.lstLeagueRanking.dataProvider = this.arrCollection;
        };
        LeagueRankingListNew.prototype.onScrollerEnd = function () {
            var _this = this;
            if (this.lstLeagueRanking.scrollV + this.scrollerLeagueRanking.height >= this.lstLeagueRanking.contentHeight) {
                if (this.arrLeagueBase.length < 100) {
                    zj.Game.PlayerLeagueSystem.leagueRankInfo(this.rankType, this.start, this.numEach).then(function (resp) {
                        if (resp.body.info.length == 0) {
                            // toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
                            return;
                        }
                        _this.start = _this.start + resp.body.info.length;
                        _this.arrLeagueBase = _this.arrLeagueBase.concat(resp.body.info);
                        var arrCollection = new eui.ArrayCollection();
                        var rankNo = 1;
                        for (var _i = 0, _a = _this.arrLeagueBase; _i < _a.length; _i++) {
                            var v = _a[_i];
                            arrCollection.addItem({ "rankNo": rankNo, "leagueBase": v, "father": _this });
                            rankNo += 1;
                        }
                        if (arrCollection.source.length == 0)
                            return;
                        _this.arrCollection.replaceAll(arrCollection.source);
                    });
                }
            }
        };
        // 排序选项展开
        LeagueRankingListNew.prototype.sortAnimationOpen = function () {
            var _this = this;
            egret.Tween.get(this.groupSort)
                .call(function () { _this.isOpen = true; _this.groupSort.visible = true; })
                .to({ scaleY: 1 }, 500, egret.Ease.backOut);
        };
        // 排序选项关闭
        LeagueRankingListNew.prototype.sortAnimationClose = function () {
            var _this = this;
            egret.Tween.get(this.groupSort)
                .to({ scaleY: 0.2 }, 400, egret.Ease.backIn)
                .call(function () { _this.isOpen = false; _this.groupSort.visible = false; });
        };
        // 按钮换肤
        LeagueRankingListNew.prototype.changeButtonSkin = function (type) {
            var index = type * 2 - 2;
            var arrIcon = [
                "ui_union_rankinglist_ButtonUnionLevelSortNor_png",
                "ui_union_rankinglist_ButtonUnionLevelSortSel_png",
                "ui_union_rankinglist_ButtonUnionZhanliSortNor_png",
                "ui_union_rankinglist_ButtonUnionZhanliSortSel_png",
                "ui_union_rankinglist_ButtonUnionRankSortNor_png",
                "ui_union_rankinglist_ButtonUnionRankSortSel_png",
            ];
            if (index < 0 && index + 1 > arrIcon.length)
                return;
            // 正常
            var image = this.btnUnionSort.getChildAt(0);
            image.source = zj.cachekey(arrIcon[index], this);
            // 按下 
            if (this.btnUnionSort.skin == null && this.btnUnionSort.skin.states == null && this.btnUnionSort.skin.states[1].overrides.length < 1)
                return;
            var property = this.btnUnionSort.skin.states[1].overrides[0];
            if (property.name == "source") {
                property.value = arrIcon[index + 1];
            }
        };
        // 按等级
        LeagueRankingListNew.prototype.onBtnUnionLevel = function () {
            this.sortAnimationClose();
            if (this.rankType == message.ELeagueRankType.RANK_TYPE_LEVEL)
                return;
            this.rankType = message.ELeagueRankType.RANK_TYPE_LEVEL;
            this.changeButtonSkin(this.rankType);
            this.rankInfo();
        };
        // 按段位
        LeagueRankingListNew.prototype.onBtnUnionRank = function () {
            this.sortAnimationClose();
            if (this.rankType == message.ELeagueRankType.RANK_TYPE_DAN)
                return;
            this.rankType = message.ELeagueRankType.RANK_TYPE_DAN;
            this.changeButtonSkin(this.rankType);
            this.rankInfo();
        };
        // 按总战力
        LeagueRankingListNew.prototype.onBtnUnionStrength = function () {
            this.sortAnimationClose();
            if (this.rankType == message.ELeagueRankType.RANK_TYPE_POWER)
                return;
            this.rankType = message.ELeagueRankType.RANK_TYPE_POWER;
            this.changeButtonSkin(this.rankType);
            this.rankInfo();
        };
        // 当前公会排序
        LeagueRankingListNew.prototype.onBtnUnionSort = function () {
            if (this.isOpen) {
                this.sortAnimationClose();
            }
            else {
                this.sortAnimationOpen();
            }
            this.isOpen = !this.isOpen;
        };
        LeagueRankingListNew.prototype.onClose = function (e) {
            var groupSortWorld = this.groupSort.localToGlobal();
            groupSortWorld.x -= zj.Game.UIManager.x;
            var groupSortRect = new egret.Rectangle(groupSortWorld.x, groupSortWorld.y, this.groupSort.width, this.groupSort.height);
            if (groupSortRect.contains(e.stageX, e.stageY) == false && this.isOpen) {
                this.sortAnimationClose();
            }
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
        LeagueRankingListNew.prototype.managePop = function (msg, point) {
            var tmp = this.getChildByName("Chat_UserPopB");
            if (tmp)
                this.removeChild(tmp);
            var pop = new zj.Chat_UserPopB();
            pop.name = "Chat_UserPopB";
            pop.setMsgInfo(msg);
            pop.y = point.y - pop.height / 2 + 10;
            pop.horizontalCenter = 0;
            this.addChild(pop);
        };
        LeagueRankingListNew.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueRankingListNew;
    }(zj.Dialog));
    zj.LeagueRankingListNew = LeagueRankingListNew;
    __reflect(LeagueRankingListNew.prototype, "zj.LeagueRankingListNew");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueRankingListNew.js.map