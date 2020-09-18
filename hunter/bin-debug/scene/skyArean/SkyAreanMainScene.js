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
    //SkyAreanMainScene
    //wangshenzhuo
    //天空竞技场
    // 2019/02/23
    var SkyAreanMainScene = (function (_super) {
        __extends(SkyAreanMainScene, _super);
        function SkyAreanMainScene() {
            var _this = _super.call(this) || this;
            _this.LayerlastIndex = 0;
            _this.skinName = "resource/skins/skyArean/SkyAreanMainSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            if (_this.width >= 1344) {
                _this.imgBackBoard2.scaleX = _this.width / 1334;
            }
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAdd, _this);
            _this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonTipInfo, _this);
            _this.buttonChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChange, _this);
            /**监听体力变化 */
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.Update, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.Init();
            return _this;
        }
        SkyAreanMainScene.prototype.SetInfo = function () {
        };
        SkyAreanMainScene.prototype.Init = function () {
            this.floorInfo = zj.PlayerTowerSystem.floorInfo();
            this.SetInfoList();
            this.SetRankList();
            this.setFloorInfo();
            this.Update();
            this.buttonAward(zj.PlayerTowerSystem.floorInfo()[0].length - zj.Game.PlayerTowerSystem.towerInfo.towerCur);
        };
        /**加载排行List */
        SkyAreanMainScene.prototype.SetRankList = function () {
            var _this = this;
            zj.Game.PlayerArenaSystem.rankItemInfo(4, 0, zj.CommonConfig.rank_list_max - 1).then(function (body) {
                // console.log("--- body = ", body);
                var lastIndex = body.rankItemsInfo.length - 1;
                var value = body.rankItemsInfo[lastIndex].value;
                // this.labelValue.text = "当前层数：" + (value);
                var itemsInfo = (body.rankItemsInfo);
                if (itemsInfo.length == 0)
                    return;
                var rank = itemsInfo[lastIndex].rank;
                if (rank == 0) {
                    _this.imgRank.visible = true;
                    _this.labelRank.visible = false;
                }
                else {
                    _this.imgRank.visible = false;
                    _this.labelRank.visible = true;
                    _this.labelRank.text = rank.toString();
                }
                //知道自己排名后加载排名奖励
                _this.setjiangli(rank);
                var info = zj.Game.PlayerInfoSystem.BaseInfo;
                _this.playerName.text = info.name;
                _this.playerFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(info.picFrameId), _this);
                _this.playerIcon.source = zj.cachekey(zj.TableItemPic.Item(info.picId).path, _this);
                _this.labelPlayerTier.text = "第" + value + "层";
                itemsInfo.splice(lastIndex, 1);
                var array = new eui.ArrayCollection();
                for (var i = 0; i < itemsInfo.length; i++) {
                    var data = new zj.SkeArenaRankItemData();
                    data.index = 4;
                    data.info = itemsInfo[i];
                    array.addItem(data);
                }
                _this.listRanking.dataProvider = array;
                _this.listRanking.itemRenderer = zj.SkeArenaRankItem;
            });
        };
        /**排名奖励 */
        SkyAreanMainScene.prototype.setjiangli = function (n) {
            var info;
            this.labelaward.visible = false;
            if (n == 0) {
                this.labelaward.visible = true;
                return;
            }
            else if (n == 1 || n == 2 || n == 3) {
                info = zj.TableTowerRankReward.Item(n);
            }
            else if (n >= 4 && n <= 20) {
                info = zj.TableTowerRankReward.Item(4);
            }
            else if (n >= 21 && n <= 100) {
                info = zj.TableTowerRankReward.Item(5);
            }
            var goods = [];
            for (var i = 0; i < info.tower_rank_good_id.length; i++) {
                var a = new message.GoodsInfo();
                a.goodsId = info.tower_rank_good_id[i];
                a.count = info.tower_rank_good_count[i];
                goods.push(a);
            }
            var array = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.SkyAreanMainAwardItemData();
                data.father = this;
                data.index = i;
                data.good = goods[i];
                data.goodsId = goods[i].goodsId;
                array.addItem(data);
            }
            this.listRankingAward.dataProvider = array;
            this.listRankingAward.itemRenderer = zj.SkyAreanMainAwardItem;
        };
        SkyAreanMainScene.prototype.SetFloorInfo = function (index) {
            var floor_info = zj.PlayerTowerSystem.Item(index);
            var feature = null;
            var bodySpxId = null;
            var scale = null;
            feature = floor_info.feature[zj.Game.PlayerInstanceSystem.MonsterTowerIndex % 2];
            bodySpxId = zj.TableMapRole.Item(floor_info.boss_roleId[zj.Game.PlayerInstanceSystem.MonsterTowerIndex % 2]).body_spx_id;
            scale = zj.TableMapRole.Item(floor_info.boss_roleId[zj.Game.PlayerInstanceSystem.MonsterTowerIndex % 2]).spine_scale;
            var reward = [];
            for (var k in floor_info.reward_good_id) {
                var v = floor_info.reward_good_id[k];
                var good_1 = new message.GoodsInfo;
                good_1.goodsId = v;
                good_1.showType = floor_info.reward_good_show_type[k];
                good_1.count = floor_info.reward_good_count[k];
                reward.push(good_1);
            }
            var a = zj.PlayerTowerSystem.floorInfo()[0][index - 1];
            var good = new message.GoodsInfo;
            good.goodsId = a.first_reward[0][0];
            good.count = a.first_reward[0][1];
            reward.push(good);
            //第几层
            this.labelTier.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Tower.floor, index);
            this.SetFloorReward(reward);
            //boss技能
            this.listBossSkill.selectedIndex = 0; // 默认选中
            this.listBossSkill.itemRenderer = zj.WantedSecondStartItem; //
            var startItem = new eui.ArrayCollection();
            for (var i = 0; i < feature.length; i++) {
                var boosTalent = new zj.WantedSecondStartItemData();
                boosTalent.father = this;
                boosTalent.index = i;
                boosTalent.talent = feature[i];
                startItem.addItem(boosTalent);
            }
            this.listBossSkill.dataProvider = startItem;
        };
        // //掉落
        SkyAreanMainScene.prototype.SetFloorReward = function (goods) {
            //     //掉落奖励
            this.listPassAward.selectedIndex = 0; // 默认选中
            this.listPassAward.itemRenderer = zj.SkyAreanMainAwardItem; //
            var skyAreanItem = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.SkyAreanMainAwardItemData();
                data.father = this;
                data.index = i;
                data.good = goods[i];
                data.goodsId = goods[i].goodsId;
                skyAreanItem.addItem(data);
            }
            this.listPassAward.dataProvider = skyAreanItem;
        };
        SkyAreanMainScene.prototype.Update = function () {
            var str = "";
            if (zj.Game.PlayerInfoSystem.Power > 100000) {
                if (((zj.Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((zj.Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                }
                else {
                    str += (zj.Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            }
            else {
                str += zj.Game.PlayerInfoSystem.Power.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", str, (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            this.labelGemstone.text = str_energy;
        };
        SkyAreanMainScene.prototype.SetInfoList = function () {
            var floorsInfo = [];
            floorsInfo = this.floorInfo[0];
            this.liatLayer.selectedIndex = floorsInfo.length - zj.Game.PlayerTowerSystem.towerInfo.towerCur; // 默认选中
            if (this.liatLayer.selectedIndex <= 0) {
                this.liatLayer.selectedIndex = 0;
            }
            this.liatLayer.itemRenderer = zj.SkyAreanMainItem;
            this.LayerlastItem = new eui.ArrayCollection();
            floorsInfo.sort(function (a, b) { return b.id - a.id; });
            floorsInfo.splice(0, 0, null);
            for (var i = 0; i < Math.floor((floorsInfo.length) / 2) + 1; i++) {
                var data = new zj.SkyAreanMainItemData();
                data.father = this;
                data.index = (floorsInfo.length) / 2 - 1 - i;
                data.info = floorsInfo[1 + i * 2];
                data.info1 = floorsInfo[i * 2];
                data.father = this;
                this.LayerlastItem.addItem(data);
            }
            this.liatLayer.dataProvider = this.LayerlastItem;
            this.LayerlastIndex = this.liatLayer.selectedIndex;
            this.scrollerInfo.viewport = this.liatLayer;
            this.scrollerInfo.validateNow();
            var index = (this.LayerlastIndex) * (229 / 2) - 70;
            if (index > 0) {
                this.scrollerInfo.viewport.scrollV = index;
            }
            else {
                this.scrollerInfo.viewport.scrollV = 0;
            }
        };
        //点击竞技场层主
        SkyAreanMainScene.prototype.buttonAward = function (index) {
            if (this.LayerlastIndex == index) {
                return;
            }
            if (this.LayerlastIndex != index) {
                this.LayerlastItem.itemUpdated(this.LayerlastItem.source[this.LayerlastIndex]);
                this.LayerlastItem.itemUpdated(this.LayerlastItem.source[this.liatLayer.selectedIndex]);
                this.LayerlastIndex = index;
            }
            this.setFloorInfo();
            this.SetInfo();
        };
        SkyAreanMainScene.prototype.setFloorInfo = function () {
            var floorsInfo = [];
            floorsInfo = zj.PlayerTowerSystem.floorInfo()[0];
            floorsInfo.sort(function (a, b) { return b.id - a.id; });
            var index = floorsInfo[this.LayerlastIndex].id;
            this.SetFloorInfo(index);
        };
        SkyAreanMainScene.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //长按 技能 详情
        SkyAreanMainScene.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() != 0) {
                return;
            }
            if (ev.data.info.talent) {
                var show = zj.TipManager.ShowTalent(ev.data.info.talent, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "Talenttouch";
                this.addChild(show);
            }
            else if (ev.data.info) {
                var show = zj.TipManager.ShowProp(ev.data.info.good || ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "Talenttouch";
                this.addChild(show);
            }
            else {
                var show = zj.TipManager.ShowProp(ev.data, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "Talenttouch";
                this.addChild(show);
            }
        };
        // 长按 技能 抬起
        SkyAreanMainScene.prototype.removeShow = function () {
            var show = this.getChildByName("Talenttouch");
            if (show) {
                this.removeChild(show);
            }
        };
        /**规则说明 */
        SkyAreanMainScene.prototype.onButtonTipInfo = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.init(zj.RuleConfig.tower);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**体力 */
        SkyAreanMainScene.prototype.onButtonAdd = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //跳转战斗
        SkyAreanMainScene.prototype.onButtonChange = function () {
            if (zj.PlayerTowerSystem.floorInfo()[0].length - this.LayerlastIndex > zj.Game.PlayerTowerSystem.towerInfo.towerCur) {
                zj.toast_warning("未解锁");
                return;
            }
            else if (zj.PlayerTowerSystem.floorInfo()[0].length - this.LayerlastIndex < zj.Game.PlayerTowerSystem.towerInfo.towerCur) {
                zj.toast_warning("已挑战");
                return;
            }
            var formate_type = 5;
            var floor = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
            this.MobsInfo_Visit()
                .then(function (msg) {
                zj.Game.PlayerTowerSystem.towerType = 1;
                zj.Game.PlayerInstanceSystem.curInstanceType = 5;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(floor);
                });
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        SkyAreanMainScene.prototype.MobsInfo_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var formate_type = 5;
                var floor = zj.Game.PlayerTowerSystem.towerInfo.towerCur; //第几层
                var request = new message.MobsInfoRequest();
                request.body.battleType = formate_type;
                request.body.mobsId = floor;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return SkyAreanMainScene;
    }(zj.Scene));
    zj.SkyAreanMainScene = SkyAreanMainScene;
    __reflect(SkyAreanMainScene.prototype, "zj.SkyAreanMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=SkyAreanMainScene.js.map