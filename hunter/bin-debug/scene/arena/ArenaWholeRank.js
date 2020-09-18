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
    var ArenaWholeRank = (function (_super) {
        __extends(ArenaWholeRank, _super);
        function ArenaWholeRank() {
            var _this = _super.call(this) || this;
            _this.list = [];
            /**list数据源 */
            _this.array = new eui.ArrayCollection();
            _this.skinName = "resource/skins/arena/ArenaWholeRankSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        ArenaWholeRank.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnDayRank.addEventListener(tap, this.onBtnDayRank, this);
            this.btnOneSelf.addEventListener(tap, this.onBtnOneSelf, this);
            this.btnOne.addEventListener(tap, this.onBtnOne, this);
            this.btnEachServer.addEventListener(tap, this.onBtnEachServer, this);
            this.onBtnDayRank();
        };
        ArenaWholeRank.prototype.setInfo = function (father, type) {
            if (type == 1) {
                this.group1.visible = false;
                this.GroupFirst.visible = false;
                this.groupWorldElite.visible = false;
            }
            this.father = father;
        };
        /**今日排名 */
        ArenaWholeRank.prototype.onBtnDayRank = function () {
            if (this.type == 1 /* todayRanking */) {
                return;
            }
            ;
            this.type = 1 /* todayRanking */;
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamSel_png"); //将按钮颜色变亮 
            this.GroupRanking.visible = true;
            this.req(4);
            this.listScroller.visible = true;
        };
        /**昨日排名 */
        ArenaWholeRank.prototype.onBtnOneSelf = function () {
            if (this.type == 2 /* yesterdayRanking */) {
                return;
            }
            ;
            this.type = 2 /* yesterdayRanking */;
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonNumTeamSel_png"); //将按钮颜色变亮 
            this.GroupRanking.visible = true;
            this.req(2);
            this.listScroller.visible = true;
        };
        /**天下第一 */
        ArenaWholeRank.prototype.onBtnOne = function () {
            if (this.type == 3 /* worldFirst */) {
                return;
            }
            ;
            this.type = 3 /* worldFirst */;
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonNumTeamSel_png"); //将按钮颜色变亮 
            this.GroupFirst.visible = true;
            this.listScroller.visible = false;
            this.req(3);
        };
        /**世界精英 */
        ArenaWholeRank.prototype.onBtnEachServer = function () {
            if (this.type == 4 /* worldElite */) {
                return;
            }
            ;
            this.type = 4 /* worldElite */;
            this.btnColour();
            zj.Set.ButtonBackgroud(this.btnEachServer, "ui_arena_ButtonWordBossSel_png"); //将按钮颜色变亮 
            this.groupWorldElite.visible = true;
            this.listScroller.visible = true;
            this.eachServerRankReq();
        };
        /**世界精英的协议 */
        ArenaWholeRank.prototype.eachServerRankReq = function () {
            var _this = this;
            zj.Game.PlayerArenaSystem.craftElitesRankList()
                .then(function (roles) {
                _this.list = [];
                var data = _this.setEathServerItems(roles);
                _this.list = zj.Table.DeepCopy(data);
                _this.loadWorldList();
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ArenaWholeRank.prototype.setEathServerItems = function (item) {
            var msg = [];
            for (var k in item) {
                if (item.hasOwnProperty(k)) {
                    var v = item[k];
                    for (var kk in v.group_name) {
                        if (v.group_name.hasOwnProperty(kk)) {
                            var vv = v.group_name[kk];
                            var serverId = zj.singLecraft.decodeGroupName(vv, "&", false);
                            var serverName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(vv, "&", false), zj.singLecraft.decodeGroupName(vv, "&", true));
                            var serverData = {};
                            for (var i = 0; i < 3; i++) {
                                if (v.roles[i] != 0 && v.roles[i] != null) {
                                    serverData[v.roles[i].craft_rank_self] = v.roles[i];
                                }
                                else {
                                    Object.keys(serverData).push("0");
                                }
                            }
                            msg.push({ serverId: serverId, serverName: serverName, serverData: serverData });
                        }
                    }
                }
            }
            zj.Table.Sort(msg, function (a, b) {
                a[0].toString < b[0].toStrimg;
            });
            return msg;
        };
        /**将所有按钮颜色变暗所有组隐藏 */
        ArenaWholeRank.prototype.btnColour = function () {
            zj.Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamNor_png");
            zj.Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonNumTeamNor_png");
            zj.Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonNumTeamNor_png");
            zj.Set.ButtonBackgroud(this.btnEachServer, "ui_arena_ButtonWordBossNor_png");
            this.GroupFirst.visible = false;
            this.GroupRanking.visible = false;
            this.groupWorldElite.visible = false;
            this.imgTip.source = zj.cachekey(zj.UIConfig.UIConfig_Pk.tips[this.type], this);
        };
        /**关闭弹窗*/
        ArenaWholeRank.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**加载天下第一页信息 */
        ArenaWholeRank.prototype.oneSetInfo = function () {
            var table = [];
            for (var i = 1; i <= 3; i++) {
                var tbl = {};
                for (var k in this.list) {
                    if (this.list.hasOwnProperty(k)) {
                        var v = this.list[k];
                        if (v.craft_rank == i) {
                            tbl = v;
                            break;
                        }
                    }
                }
                table.push(tbl);
            }
            for (var i = 0; i < 3; i++) {
                if (table[i] != null) {
                    var groupName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(table[i].group_name, "&", false), zj.singLecraft.decodeGroupName(table[i].group_name, "&", true));
                    var path = zj.PlayerItemSystem.ItemPath(table[i].pic);
                    this["imgIcon" + (i + 1)].source = zj.cachekey(path, this);
                    this["labelPlayerName" + (i + 1)].text = table[i].role_name;
                    this["labelPlayerQu" + (i + 1)].text = groupName;
                    this["labelPlayerJiFen" + (i + 1)].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.battlePoints, table[i].craft_score);
                }
                else {
                    var path = zj.PlayerItemSystem.ItemPath(140001);
                    this["imgIcon" + (i + 1)].source = zj.cachekey(path, this);
                    this["labelPlayerName" + (i + 1)].text = zj.TextsConfig.TextsConfig_Pk.norank.name;
                    this["labelPlayerQu" + (i + 1)].text = zj.TextsConfig.TextsConfig_Pk.norank.qu;
                    this["labelPlayerJiFen" + (i + 1)].text = zj.TextsConfig.TextsConfig_Pk.norank.score;
                }
            }
        };
        ArenaWholeRank.prototype.decodeGroupName = function (str, strchar, bafather) {
            if (str == null) {
                return;
            }
            // let jsonstr = Helper.d
        };
        ArenaWholeRank.prototype.req = function (type) {
            var _this = this;
            zj.Game.PlayerArenaSystem.craftRankList(type - 1)
                .then(function (roles) {
                _this.list = [];
                _this.list = zj.Table.DeepCopy(roles);
                if (type == 3) {
                    _this.oneSetInfo();
                }
                else {
                    _this.loadList();
                }
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ArenaWholeRank.prototype.loadList = function () {
            var _this = this;
            var score = (this.father.myInfo.craft_score != null) ? this.father.myInfo.craft_score : -1;
            var title = (this.father.myInfo.titleId != null) ? this.father.myInfo.titleId : 160001;
            var level = (score == -1) ? 0 : (zj.singLecraft.GetLevel(score) - 1);
            var groupStr = (this.father.myInfo.groupName != null) ? this.father.myInfo.groupName : zj.Device.gameserver.name;
            var titleName = zj.TableItemTitle.Item(title).name;
            var titlelogo = zj.TableItemTitle.Item(title).logo;
            var strRank = "";
            if (this.type == 1 || this.type == 2) {
                if (this.father.myInfo.craft_rank != null) {
                    strRank = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.order, this.father.myInfo.craft_rank);
                }
                else {
                    strRank = zj.TextsConfig.TextsConfig_Pk.norank.rank;
                }
            }
            else {
            }
            var strLevel = (this.type == 1 && level != 0) ? zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.level, zj.TextsConfig.TextsConfig_Common.numCH[Number(level) - 1]) : zj.TextsConfig.TextsConfig_Pk.norank.level;
            var strScore = (this.type == 1 && score != -1) ? zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.score, score) : zj.TextsConfig.TextsConfig_Pk.norank.score;
            this.labelChangehao.visible = (title == 160001);
            this.imgTitle.visible = (title != 160001);
            if (title != 160001) {
                this.imgTitle.source = zj.cachekey(titlelogo, this);
            }
            this.labelRank.text = strRank;
            this.labelPlayerName.text = zj.Game.PlayerInfoSystem.BaseInfo.name;
            this.labelQu.text = groupStr;
            this.labelGrade.text = strLevel;
            this.labelJiFen.text = strScore;
            this.labelChangehao.text = titleName;
            this.iconGroup.source = zj.cachekey(zj.UIConfig.UIConfig_Pk.Grade[this.type], this);
            this.iconNum.source = zj.cachekey(zj.UIConfig.UIConfig_Pk.Num[this.type], this);
            zj.Table.Sort(this.list, function (a, b) { return a.craft_self < b.craft_rank; });
            var myInfo = [];
            for (var k in this.list) {
                if (this.list.hasOwnProperty(k)) {
                    var v = this.list[k];
                    if (v.role_id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                        myInfo.push(v);
                    }
                }
            }
            // setInfoMyInfo();
            var a = function () {
                var level = zj.singLecraft.GetLevel(myInfo[0].craft_score);
                var levelStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.level, zj.TextsConfig.TextsConfig_Common.numCH[level - 1] || 0);
                var groupStr = "";
                if (myInfo[0].group_name != "") {
                    groupStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(myInfo[0].group_name, "&", false), zj.singLecraft.decodeGroupName(myInfo[0].group_name, "&", true));
                }
                if (_this.type == 1 || _this.type == 2) {
                    _this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.order, myInfo[0].craft_rank);
                }
                _this.labelPlayerName.text = myInfo[0].role_name;
                _this.labelQu.text = groupStr;
                _this.labelGrade.text = levelStr;
                _this.labelJiFen.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.score, myInfo[0].craft_score);
                if (myInfo[0].title_id == 0) {
                    _this.labelChangehao.text = zj.TextsConfig.TextsConfig_Pk.rank.noTitile;
                    _this.imgTitle.visible = false;
                }
                else {
                    _this.labelChangehao.visible = myInfo[0].title_id == 160001;
                    _this.imgTitle.visible = myInfo[0].title_id != 160001;
                    var name_1 = zj.TableItemTitle.Item(myInfo[0].title_id).name;
                    var logo = zj.TableItemTitle.Item(myInfo[0].title_id).logo;
                    _this.labelChangehao.text = name_1;
                    if (myInfo[0].title_id != 160001) {
                        _this.imgTitle.source = zj.cachekey(logo, _this);
                    }
                }
            };
            if (myInfo.length > 0) {
                a();
            }
            ;
            var b = function () {
                var canMove = Object.keys(_this.list).length > 6;
                var num = Object.keys(_this.list).length > 100 && 100 || Object.keys(_this.list).length;
                egret.Tween.get(_this.listRank).to({ alpha: 0 }, 100).call(function () {
                    _this.listScroller.stopAnimation();
                    _this.listRank.scrollV = 0;
                    _this.array.removeAll(); // this.alpha
                    // this.listScroller
                    for (var i = 0; i < num; i++) {
                        var data = new zj.ArenaWholeRankPlayerItemData();
                        data.index = i;
                        data.info = _this.list[i];
                        data.father = _this;
                        _this.array.addItem(data);
                    }
                    _this.listRank.dataProvider = _this.array;
                    _this.listRank.itemRenderer = zj.ArenaWholeRankPlayerItem;
                    _this.listRank.scrollV = 0;
                }).to({ alpha: 1 }, 200);
            };
            b();
        };
        /**加载世界list */
        ArenaWholeRank.prototype.loadWorldList = function () {
            var canMove = Object.keys(this.list).length > 6;
            this.array.removeAll();
            for (var i = 0; i < Object.keys(this.list).length; i++) {
                var data = new zj.ArenaWholeRankPlayerSelfItemData();
                data.index = i;
                data.info = this.list[i];
                this.array.addItem(data);
            }
            this.listRank.dataProvider = this.array;
            this.listRank.itemRenderer = zj.ArenaWholeRankPlayerSelfItem;
        };
        return ArenaWholeRank;
    }(zj.Dialog));
    zj.ArenaWholeRank = ArenaWholeRank;
    __reflect(ArenaWholeRank.prototype, "zj.ArenaWholeRank");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeRank.js.map