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
     * @date 2019-5-6
     *
     * @class 猎人特训父类
     */
    var weekActBase = (function (_super) {
        __extends(weekActBase, _super);
        function weekActBase() {
            var _this = _super.call(this) || this;
            /**猎人特训类型 */
            _this.noviceType = 1;
            _this.typeId = 1;
            _this.update = -1;
            _this.update1 = -1;
            _this.update2 = -1;
            _this.update3 = -1;
            _this.updatetime = -1;
            if (_this.imgbg) {
                if (_this.imgbg.width < zj.UIManager.StageWidth) {
                    _this.imgbg.width = zj.UIManager.StageWidth;
                }
            }
            _this.init();
            return _this;
        }
        weekActBase.prototype.init = function () {
        };
        weekActBase.prototype.SetType = function (type) {
            this.noviceType = type;
            this.weekTable = zj.Game.PlayerMissionSystem.itemMissionWeek(type);
            this.payAward = zj.Game.PlayerMissionSystem.getWeekAwardPay(this.noviceType, 0);
            this.freeAward = zj.Game.PlayerMissionSystem.getWeekAwardPay(this.noviceType, 1)[0];
            this.ButtonGetFree.enabled = (this.freeAward.canBuyTimes - this.freeAward.buyTimes > 0);
            this.SpriteFreeAwardTips.visible = (this.freeAward.canBuyTimes - this.freeAward.buyTimes > 0);
            this.LabelFreeAwardNum.text = ("x" + this.freeAward.goods[0].count);
            this.missionType = message.MissionType.MISSION_TYPE_WEEK;
            this.initAfterSetType();
        };
        weekActBase.prototype.initAfterSetType = function () {
            //设置活动底部时间
            var leftTime = zj.Game.PlayerMissionSystem.missionActive.missionWeekStart + this.weekTable.duration * 3600 * 24 - zj.Game.Controller.curServerTime;
            var day = Math.floor(leftTime / 3600 / 24);
            var hour = Math.floor(leftTime / 3600 % 24);
            var min = Math.floor(leftTime / 60 % 60);
            this.labelTime.textFlow = zj.Util.RichText("<text>距离活动结束还有</text><color>r:255,g:208,b:2</color><text>" + day + "</text><text>天</text><color>r:255,g:208,b:2</color><text>" + hour + "</text><text>小时</text><color>r:255,g:208,b:2</color><text>" + min + "</text><text>分</text>");
            this.labelTime1.visible = false;
            this.labelTime2.visible = false;
            this.labelTime3.visible = false;
            this.setInfoData();
            this.loadListViewTag();
            this.setList();
            this.setInfoType();
            this.setSelectType();
            this.updatetime = egret.setInterval(this.setProcessTime, this, 0);
        };
        /**任务list */
        weekActBase.prototype.setList = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.data[this.typeId - 1]._ROW_ITEM; i++) {
                var data = new zj.ActivityWeekMissionItemData();
                data.index = i;
                data.typeId = this.typeId;
                data.father = this;
                array.addItem(data);
            }
            this.TableViewItem.dataProvider = array;
            this.TableViewItem.itemRenderer = zj.ActivityWeekMissionItem;
        };
        /**按钮list */
        weekActBase.prototype.loadListViewTag = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < 4; i++) {
                var data = new zj.ActivityWeekMissionTagData();
                data.index = i;
                data.father = this;
                array.addItem(data);
            }
            this.TableViewTag.dataProvider = array;
            this.TableViewTag.itemRenderer = zj.ActivityWeekMissionTag;
        };
        weekActBase.prototype.SetInfoItem = function () {
            var _this = this;
            this.cb1 = function () {
                for (var i = 0; i < _this.TableViewItem.dataProvider.length; i++) {
                    var item = _this.TableViewItem.getElementAt(i);
                    if (item != null) {
                        item.setInfoTag(_this.typeId);
                        if (i == 3) {
                            egret.clearInterval(_this.update1);
                            _this.update1 = -1;
                            return;
                        }
                    }
                }
            };
            this.update1 = egret.setInterval(this.Update1, this, 0);
        };
        weekActBase.prototype.setInfoType = function () {
            var _this = this;
            this.cb = function () {
                for (var i = 0; i < 4; i++) {
                    var item = _this.TableViewTag.getElementAt(i);
                    if (item != null) {
                        item.setInfoTag();
                        if (i == 3) {
                            egret.clearInterval(_this.update);
                            _this.update = -1;
                            return;
                        }
                    }
                }
            };
            this.update = egret.setInterval(this.Update, this, 0);
        };
        weekActBase.prototype.setSelectType = function (tag) {
            var _this = this;
            if (tag != null) {
                tag += 1;
            }
            this.typeId = tag || this.typeId || 1;
            this.cb2 = function () {
                for (var i = 0; i < 4; i++) {
                    var item = _this.TableViewTag.getElementAt(i);
                    if (item != null) {
                        item.setSelect(item.data.index + 1 == _this.typeId);
                        if (i == 3) {
                            egret.clearInterval(_this.update2);
                            _this.update2 = -1;
                            return;
                        }
                    }
                }
            };
            this.update2 = egret.setInterval(this.Update2, this, 0);
        };
        weekActBase.prototype.Update = function () {
            this.cb();
        };
        weekActBase.prototype.Update1 = function () {
            this.cb1();
        };
        weekActBase.prototype.Update2 = function () {
            this.cb2();
        };
        weekActBase.prototype.Update3 = function () {
            this.cb3();
        };
        weekActBase.prototype.SetInfoButton = function (tag) {
            if (this.typeId != 4 && tag == 3) {
                this.setSelectType(tag);
                this.setListAward();
                this.NodeFreeAward.visible = false;
                this.SpriteTitleGift.visible = true;
            }
            else if (this.typeId == 4 && tag != 3) {
                this.setSelectType(tag);
                this.setList();
                this.NodeFreeAward.visible = true;
                this.SpriteTitleGift.visible = false;
            }
            else {
                this.setSelectType(tag);
                this.setInfoItem();
            }
        };
        weekActBase.prototype.setListAward = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.payAward.length; i++) {
                var data = new zj.ActivityWeekMissionGiftItemData();
                data.index = i;
                data.payAward = this.payAward[i];
                data.father = this;
                array.addItem(data);
            }
            this.TableViewItem.dataProvider = array;
            this.TableViewItem.itemRenderer = zj.ActivityWeekMissionGiftItem;
        };
        weekActBase.prototype.setInfoItem = function () {
            var _this = this;
            this.cb3 = function () {
                for (var i = 0; i < 5; i++) {
                    var item = _this.TableViewItem.getElementAt(i);
                    if (item != null) {
                        item.setInfoTag(_this.typeId);
                        if (i == 4) {
                            egret.clearInterval(_this.update3);
                            _this.update3 = -1;
                            return;
                        }
                    }
                }
            };
            this.update3 = egret.setInterval(this.Update3, this, 0);
        };
        /**子项调刷新 */
        weekActBase.prototype.setInfoReward = function () {
            this.setInfoData();
            this.setInfoType();
            this.setInfoItem();
        };
        /**一直刷新活动的时间 */
        weekActBase.prototype.setProcessTime = function () {
            //设置活动底部时间
            var leftTime = zj.Game.PlayerMissionSystem.missionActive.missionWeekStart + this.weekTable.duration * 3600 * 24 - zj.Game.Controller.curServerTime;
            var day = Math.floor(leftTime / 3600 / 24);
            var hour = Math.floor(leftTime / 3600 % 24);
            var min = Math.floor(leftTime / 60 % 60);
            this.labelTime1.text = day.toString();
            this.labelTime2.text = hour.toString();
            this.labelTime3.text = min.toString();
        };
        weekActBase.prototype.setInfoData = function () {
            var _this = this;
            var thisOne = this;
            var a = [];
            for (var i = 0; i < 3; i++) {
                for (var k in zj.Game.PlayerMissionSystem.missionMap) {
                    if (zj.Game.PlayerMissionSystem.missionMap.hasOwnProperty(k)) {
                        var v = zj.Game.PlayerMissionSystem.missionMap[k];
                        if (this.weekTable.mission_types[i] == Number(k)) {
                            a.push({
                                index: Number(k),
                                value: v
                            });
                        }
                    }
                }
            }
            var data = zj.Table.initi(a, function (k, v) {
                if (_this.isSubTypeCurType(Number(v.index))) {
                    var type_1 = zj.Game.PlayerMissionSystem.itemSubType(Number(v.index));
                    var data_ = { mission: null, typeInfo: null, _ROW_ITEM: null, index: null, dataInfo: null, sort: null, lock: null, state: null, finishs: null, finish: null };
                    data_.mission = v.value;
                    data_.typeInfo = type_1;
                    //计算任务数量
                    data_._ROW_ITEM = 0;
                    while (true) {
                        data_._ROW_ITEM = data_._ROW_ITEM + 1;
                        var missionInfo = zj.Game.PlayerMissionSystem.itemInfo(type_1.start_id + data_._ROW_ITEM);
                        if (missionInfo == null) {
                            break;
                        }
                    }
                    data_.index = zj.Table.Init(data_._ROW_ITEM, function (i) {
                        return type_1.start_id + i;
                    });
                    data_.dataInfo = zj.Table.Init(data_._ROW_ITEM, function (i) {
                        return zj.Game.PlayerMissionSystem.itemInfo(type_1.start_id + i);
                        // return i + 1;
                    });
                    data_.sort = zj.Table.FindK(_this.weekTable.mission_types, v.index);
                    return data_;
                }
                else {
                    return null;
                }
            });
            data.sort(function (a, b) {
                return a.sort - b.sort;
            });
            var _loop_1 = function (k_1) {
                var v_1 = data[Number(k_1)];
                var now = v_1.mission.missionId % 10;
                var value = v_1.mission.value;
                var condition = v_1.dataInfo[now - 1].condition;
                var valueGen = this_1.missionProgress(v_1.mission.valueEx, Math.floor(v_1.dataInfo[now - 1].condition / 10000));
                //是否开放
                v_1.lock = false;
                //状态
                v_1.state = zj.Table.Init(v_1._ROW_ITEM, function (i) {
                    if (zj.Game.PlayerMissionSystem.itemMissionWeekValNormalType(_this.weekTable.mission_types[k_1])) {
                        if ((i + 1) < now) {
                            return zj.TableEnum.Enum.NoviceState.OVER;
                        }
                        else if ((i + 1) == now && value < condition) {
                            return zj.TableEnum.Enum.NoviceState.OPEN;
                        }
                        else if ((i + 1) == now && value >= condition && !v_1.mission.isFinish) {
                            return zj.TableEnum.Enum.NoviceState.REWARD;
                        }
                        else if ((i + 1) == now && value >= condition && v_1.mission.isFinish) {
                            return zj.TableEnum.Enum.NoviceState.OVER;
                        }
                        else if ((i + 1) > now) {
                            return zj.TableEnum.Enum.NoviceState.LOCK;
                        }
                        else {
                            return zj.TableEnum.Enum.NoviceState.ERROR;
                        }
                    }
                    else {
                        if (v_1.mission.valueEx.length != 0) {
                            var enum1 = zj.TableEnum.Enum.NoviceState;
                            if ((i + 1) < now) {
                                return enum1.OVER;
                            }
                            else if ((i + 1) == now && valueGen < condition % 10000) {
                                return enum1.OPEN;
                            }
                            else if ((i + 1) == now && valueGen >= condition % 10000 && !v_1.mission.isFinish) {
                                return enum1.REWARD;
                            }
                            else if ((i + 1) == now && valueGen >= condition % 10000 && v_1.mission.isFinish) {
                                return enum1.OVER;
                            }
                            else if ((i + 1) > now) {
                                return enum1.LOCK;
                            }
                            else {
                                return enum1.ERROR;
                            }
                        }
                        else {
                            return zj.TableEnum.Enum.NoviceState.OPEN;
                        }
                    }
                });
                //进度文字
                v_1.finish = zj.Table.Init(v_1._ROW_ITEM, function (i) {
                    var str = null;
                    if (zj.Game.PlayerMissionSystem.itemMissionWeekValNormalType(_this.weekTable.mission_types[k_1])) {
                        str = v_1.mission.value;
                    }
                    else {
                        str = v_1.mission.valueEx;
                    }
                    return str;
                });
                v_1.finishs = zj.Table.Init(v_1._ROW_ITEM, function (i) {
                    return v_1.dataInfo[i].condition;
                });
            };
            var this_1 = this;
            for (var k_1 in data) {
                _loop_1(k_1);
            }
            this.data = data;
        };
        weekActBase.prototype.missionProgress = function (tableCur, type) {
            var ret = 0;
            for (var i in tableCur) {
                if (tableCur.hasOwnProperty(i)) {
                    var v = tableCur[i];
                    if (Math.floor(v / 10000) == type) {
                        ret = v % 10000;
                    }
                }
            }
            return ret;
        };
        ;
        weekActBase.prototype.isSubTypeCurType = function (index) {
            return zj.Table.FindK(this.weekTable.mission_types, index) != -1;
        };
        weekActBase.prototype.btnGetFree = function () {
            var _this = this;
            this.MissionWeekMallReqBody(this.freeAward.id)
                .then(function (getGoods) {
                _this.freeAward.buyTimes += 1;
                var goods = zj.Table.DeepCopy(getGoods);
                var hero = zj.Table.FindR(goods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero[0].goodsId, null, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(goods);
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        }, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(goods);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                var vis = (_this.freeAward.canBuyTimes - _this.freeAward.buyTimes > 0);
                _this.ButtonGetFree.enabled = vis;
                _this.SpriteFreeAwardTips.visible = vis;
            }).catch(function () {
            });
        };
        weekActBase.prototype.MissionWeekMallReqBody = function (id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionWeekMallRequest();
                request.body.index = id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo.getGoods);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false, true);
            });
        };
        /**子项点击跳转 */
        weekActBase.prototype.btnGo = function () {
            var call = zj.Game.PlayerMissionSystem.itemMissionWeekJump(this.weekTable.mission_types[this.typeId - 1]);
            if (call != null) {
                this.btnClose();
                call();
            }
            else {
                this.btnClose();
            }
        };
        /**奖励详情 */
        weekActBase.prototype.awardParticulars = function (xy, cx, cy, info) {
            var ui = this.getChildByName("UI");
            if (ui) {
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
        weekActBase.prototype.up = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        weekActBase.prototype.btnClose = function () {
            if (this.update != -1) {
                egret.clearInterval(this.update);
            }
            if (this.update1 != -1) {
                egret.clearInterval(this.update1);
            }
            if (this.update2 != -1) {
                egret.clearInterval(this.update2);
            }
            if (this.update3 != -1) {
                egret.clearInterval(this.update3);
            }
            egret.clearInterval(this.updatetime);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return weekActBase;
    }(zj.Scene));
    zj.weekActBase = weekActBase;
    __reflect(weekActBase.prototype, "zj.weekActBase");
})(zj || (zj = {}));
//# sourceMappingURL=weekActBase.js.map