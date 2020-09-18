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
    /**
     * @author xing li wei
     *
     * @date 2019-3-25
     *
     * @class 新手狂欢
     */
    var ActivityNovice = (function (_super) {
        __extends(ActivityNovice, _super);
        function ActivityNovice() {
            var _this = _super.call(this) || this;
            /**按钮列表数据源 */
            _this.array = new eui.ArrayCollection();
            /**顶部按钮列表数据源 */
            _this.array1 = new eui.ArrayCollection();
            /**第几天*/
            _this.btnIndex = 1;
            _this.noviceType = zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL;
            _this.missionGift = [];
            _this.skinName = "resource/skins/activity/ActivityNoviceSkin.exml";
            _this.imgBar.mask = _this.imgBarMask;
            //虚拟布局
            _this.listViewTag.useVirtualLayout = false;
            _super.prototype.setType.call(_this, _this.noviceType);
            _super.prototype.init.call(_this);
            _this.init();
            for (var i = 1; i <= 7; i++) {
                var a = [];
                for (var j = 1; j <= 4; j++) {
                    a.push(zj.TableMissionGift.Table()[(j + "0" + i)]);
                }
                _this.missionGift.push(a);
            }
            return _this;
        }
        ActivityNovice.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.groupLight1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight1, this);
            this.groupLight2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight2, this);
            this.groupLight3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight3, this);
            this.groupLight4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupLight4, this);
            this.loadBtnList();
            this.setBtnList();
            this.setList(1);
            this.loadPmgressbarInfo();
        };
        /**加载头部礼包类型按钮 */
        ActivityNovice.prototype.loadBtnList = function () {
            this.array1.removeAll();
            for (var i = 0; i < 3; i++) {
                var data = new zj.ActivityNoviceTagData();
                data.index = i;
                data.father = this;
                this.array1.addItem(data);
            }
            this.listViewTag.dataProvider = this.array1;
            this.listViewTag.itemRenderer = zj.ActivityNoviceTag;
            this.listViewTag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListViewTag, this);
        };
        ActivityNovice.prototype.setType = function (a) {
        };
        /**任务列表list */
        ActivityNovice.prototype.setList = function (type) {
            var _this = this;
            if (type != 2) {
                var array = new eui.ArrayCollection();
                var a = function (index, array) {
                    var length = _this.data[index - 1].dataInfo.length; //this.typeId - 1 + ((this.btnIndex - 1) * 2)
                    for (var i = 0; i < length; i++) {
                        var data = new zj.ActivityNoviceItemData();
                        data.index = i;
                        data.TypeId = index;
                        data.type = _this.data[index - 1].typeInfo.sub_type;
                        data.father = _this;
                        array.addItem(data);
                    }
                };
                if (this.btnIndex == 1 && this.typeId == 1) {
                    a(1, array);
                }
                else if (this.btnIndex == 1 && this.typeId == 2) {
                    a(2, array);
                }
                else if (this.btnIndex == 2 && this.typeId == 1) {
                    a(3, array);
                }
                else if (this.btnIndex == 2 && this.typeId == 2) {
                    a(4, array);
                    a(5, array);
                }
                else if (this.btnIndex == 3 && this.typeId == 1) {
                    a(6, array);
                }
                else if (this.btnIndex == 3 && this.typeId == 2) {
                    a(7, array);
                    a(8, array);
                }
                else if (this.btnIndex == 4 && this.typeId == 1) {
                    a(9, array);
                    a(10, array);
                }
                else if (this.btnIndex == 4 && this.typeId == 2) {
                    a(11, array);
                }
                else if (this.btnIndex == 5 && this.typeId == 1) {
                    a(12, array);
                }
                else if (this.btnIndex == 5 && this.typeId == 2) {
                    a(13, array);
                    a(14, array);
                    a(15, array);
                }
                else if (this.btnIndex == 6 && this.typeId == 1) {
                    a(16, array);
                    a(17, array);
                    a(18, array);
                }
                else if (this.btnIndex == 6 && this.typeId == 2) {
                    a(19, array);
                }
                else if (this.btnIndex == 7 && this.typeId == 1) {
                    a(20, array);
                    a(21, array);
                }
                else if (this.btnIndex == 7 && this.typeId == 2) {
                    a(22, array);
                    a(23, array);
                }
                // array
                var array1 = new eui.ArrayCollection();
                var aa = [];
                var bb = [];
                for (var i = 0; i < array.length; i++) {
                    var missionId = this.data[array.source[i].TypeId - 1].mission.missionId % 1000000 % 100 - 1;
                    if (array.source[i].index < missionId || (array.source[i].index <= missionId && array.source[i].index == this.data[array.source[i].TypeId - 1].dataInfo.length - 1 && this.data[array.source[i].TypeId - 1].mission.isFinish)) {
                        aa.push(array.source[i]);
                    }
                    else {
                        bb.push(array.source[i]);
                    }
                }
                for (var i = 0; i < bb.length; i++) {
                    array1.addItem(bb[i]);
                }
                for (var i = 0; i < aa.length; i++) {
                    array1.addItem(aa[i]);
                }
                this.listViewItem.dataProvider = array1;
                this.listViewItem.itemRenderer = zj.ActivityNoviceItem;
            }
            else {
                var array = new eui.ArrayCollection();
                var length_1 = this.missionGift[this.btnIndex - 1];
                for (var i = 0; i < length_1.length; i++) {
                    var data = new zj.ActivityNoviceItemBData();
                    data.index = i;
                    data.info = length_1[i];
                    data.father = this;
                    array.addItem(data);
                }
                var array1 = new eui.ArrayCollection();
                var aa = [];
                var bb = [];
                var _loop_1 = function (i) {
                    var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, function (k, v) {
                        return v == length_1[i].index;
                    });
                    if (vis) {
                        aa.push(array.source[i]);
                    }
                    else {
                        bb.push(array.source[i]);
                    }
                };
                for (var i = 0; i < length_1.length; i++) {
                    _loop_1(i);
                }
                for (var i = 0; i < bb.length; i++) {
                    array1.addItem(bb[i]);
                }
                for (var i = 0; i < aa.length; i++) {
                    array1.addItem(aa[i]);
                }
                this.listViewItem.dataProvider = array1;
                this.listViewItem.itemRenderer = zj.ActivityNoviceItemB;
            }
            this.array.refresh();
        };
        /**加载第几天按钮 */
        ActivityNovice.prototype.setBtnList = function () {
            this.array.removeAll();
            for (var i = 1; i <= 7; i++) {
                var data = new zj.ActivityNoviceBtnItmData();
                data.index = i;
                data.father = this;
                this.array.addItem(data);
            }
            this.listbtn.dataProvider = this.array;
            this.listbtn.itemRenderer = zj.ActivityNoviceBtnItm;
            this.listbtn.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListbtn, this);
        };
        ActivityNovice.prototype.onListViewTag = function (e) {
            this.typeId = e.itemIndex + 1;
            if (e.itemIndex == 2) {
                this.setList(2);
            }
            else {
                this.array.refresh();
                this.setList(e.itemIndex);
            }
            this.array1.refresh();
        };
        /**点击第几天按钮 */
        ActivityNovice.prototype.onListbtn = function (e) {
            if (zj.Helper.day() < e.itemIndex + 1) {
                zj.toast_warning("第" + (e.itemIndex + 1) + "天开启");
                return;
            }
            this.btnIndex = e.itemIndex + 1;
            this.array1.refresh();
            this.array.refresh();
            this.setList(this.typeId - 1);
        };
        /**奖励详情 */
        ActivityNovice.prototype.awardParticulars = function (xy, cx, cy, info) {
            var dialogDrop = this.getChildByName("UI");
            if (dialogDrop) {
                return;
            }
            var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            if (zj.PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                commonDesSkill.reSetGeneral();
            }
            commonDesSkill.name = "UI";
            this.addChild(commonDesSkill);
        };
        /**抬起移除奖励详情界面 */
        ActivityNovice.prototype.up = function () {
            var dialogDrop = this.getChildByName("UI");
            if (dialogDrop) {
                this.removeChild(dialogDrop);
            }
        };
        /**加载右上进度条及其礼包相关信息 */
        ActivityNovice.prototype.loadPmgressbarInfo = function () {
            for (var i = 1; i <= 4; i++) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] >= i) {
                    this["imgGet" + i].visible = true;
                    this["imgbg" + i].visible = true;
                    this["labelTag" + i].textColor = 0x8E5308;
                }
                else {
                    this["imgGet" + i].visible = false;
                    this["imgbg" + i].visible = false;
                    this["labelTag" + i].textColor = 0xFFFFFF;
                }
            }
            this.labeljindu.text = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken.toString();
            var scx = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken / 100 <= 1 ? zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken / 100 : 1;
            this.imgBarMask.width = 239 * scx;
            // this.imgyiwancheng.visible = false;
            // this.imglabelBg.visible = false;
            for (var i = 1; i <= 4; i++) {
                var table = zj.TableMissionReward.Item(i);
                this["imgBg" + i].visible = false;
                var source = zj.PlayerItemSystem.ItemConfig(table.reward_goods[0]);
                this["GoodsIcon" + i].source = zj.cachekey(source.path, this);
                this["labelCont" + i].text = table.reward_count[i];
                zj.Helper.SetImageFilterColor(this["GoodsIcon" + i]);
                var index = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] || 0;
                if (index < i && (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken) >= table.condition) {
                    this["imgBg" + i].visible = true;
                    this["imgGet" + i].visible = true;
                    this["imgGet" + i].source = "ui_acitivity_serverseven_canget_png";
                    zj.Helper.SetImageFilterColor(this["GoodsIcon" + i]);
                    // this.imgyiwancheng.visible = true;
                    // this.imglabelBg.visible = true;
                }
                else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] >= i) {
                    zj.Helper.SetImageFilterColor(this["GoodsIcon" + i], "gray");
                    this["imgBg" + i].visible = false;
                    this["imgGet" + i].source = "ui_acitivity_serverseven_get_png";
                }
            }
        };
        ActivityNovice.prototype.ongroupLight1 = function (e) {
            this.bthGift(e, 1);
        };
        ActivityNovice.prototype.ongroupLight2 = function (e) {
            this.bthGift(e, 2);
        };
        ActivityNovice.prototype.ongroupLight3 = function (e) {
            this.bthGift(e, 3);
        };
        ActivityNovice.prototype.ongroupLight4 = function (e) {
            this.bthGift(e, 4);
        };
        ActivityNovice.prototype.bthGift = function (e, index) {
            var _this = this;
            var table = zj.TableMissionReward.Item(index);
            var index1 = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward[zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward.length - 1] || 0;
            if (index1 < index && (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.getNewToken) >= table.condition) {
                this.missionNew(index).then(function (gameInfo) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(gameInfo.getGoods);
                        dialog.show();
                    });
                    _this.loadPmgressbarInfo();
                }).catch(function () {
                });
                return;
            }
            var info = new message.GoodsInfo();
            info.goodsId = table.reward_goods[0];
            info.count = table.reward_count[0];
            this.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
        };
        ActivityNovice.prototype.isFullScreen = function () {
            return true;
        };
        ActivityNovice.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivityNovice.prototype.a = function () {
            function greeter(person) {
                return "Hello, " + person.firstName + " " + person.lastName;
            }
            var user = { firstName: "Jane", lastName: "User" };
            document.body.innerHTML = greeter(user);
        };
        ActivityNovice.prototype.missionNew = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionNewRequest();
                request.body.mission_type = 4;
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        return ActivityNovice;
    }(zj.noviceBase));
    zj.ActivityNovice = ActivityNovice;
    __reflect(ActivityNovice.prototype, "zj.ActivityNovice");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNovice.js.map