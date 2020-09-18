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
    //Common_ChangeIcon 个性装扮
    //yuqingchao
    //2019.07.12
    zj._count_per_row = 4;
    zj.HeadIcon = 1;
    zj.FrameIcon = 2;
    zj.CommonFrameType = 1;
    zj.VipFrameType = 2;
    zj.ActivityFrameType = 3;
    zj.NumLevel = 1000;
    var Common_ChangeIcon = (function (_super) {
        __extends(Common_ChangeIcon, _super);
        function Common_ChangeIcon() {
            var _this = _super.call(this) || this;
            _this.idMap = null;
            _this.COUNT_PER_ROW = 4;
            _this.picId = 0;
            _this.vis = false;
            _this.CB = null;
            _this.beforeUsedPicFrame = 0;
            _this.totalFrameListID = 0;
            _this.focusFrameCur = 0;
            _this.idFrameRet = 0;
            _this.frameIdMap = [[], [], []];
            _this.mapIndex = 0;
            _this.FRAMETYPE = {
                NORMAL: 0,
                VIP: 1,
                ACTIVITY: 2,
            };
            _this.skinName = "resource/skins/common/Common_ChangeIconSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnHead.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHeadOK, _this);
            _this.btnFrame.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFrame, _this);
            _this.btnHeadOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.btnFrameOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFrameOK, _this);
            zj.Game.EventManager.on("COMMON_CHANGE_ICON_SETPICID", _this.setPicId, _this);
            Common_ChangeIcon.index = 1;
            Common_ChangeIcon.picType1 = null;
            _this.onBtnHeadOK();
            var a = new egret.Event(null);
            a.data = zj.Game.PlayerInfoSystem.BaseInfo.picId;
            _this.setPicId(a);
            return _this;
        }
        Common_ChangeIcon.prototype.setCB = function (cb, frame) {
            this.CB = cb;
        };
        //头像
        Common_ChangeIcon.prototype.onBtnHeadOK = function () {
            this.btnHead.currentState = "down";
            this.btnFrame.currentState = "up";
            this.groupHead.visible = true;
            this.groupFrame.visible = false;
            this.loadList(1);
        };
        //头像框
        Common_ChangeIcon.prototype.onBtnFrame = function () {
            this.btnFrame.currentState = "down";
            this.btnHead.currentState = "up";
            this.groupFrame.visible = true;
            this.groupHead.visible = false;
            this.LoadFrameSet();
            this.loadList(3);
        };
        Common_ChangeIcon.prototype.loadList = function (picType) {
            Common_ChangeIcon.picType1 = picType;
            Common_ChangeIcon.iconChange = true;
            if (picType == zj.TableEnum.TableIconListState.GENERAL) {
                this.loadListGENERAL();
                this.scrollerInfo.viewport = this.lstTableViewItem;
                this.scrollerInfo.validateNow();
                this.scrollerInfo.viewport.scrollV = 0;
            }
            else if (picType == zj.TableEnum.TableIconListState.LEAGUE) {
            }
            else if (picType == 3) {
                this.loadListFrame();
                this.scrollerInfo.viewport = this.lstTableViewItem;
                this.scrollerInfo.validateNow();
                this.scrollerInfo.viewport.scrollV = 0;
            }
        };
        Common_ChangeIcon.prototype.itemRendererFunction = function (source) {
            if (source.listType == "1") {
                return zj.Common_ChangeIconTitleIR;
            }
            else if (source.listType == "2") {
                return zj.Common_ChangeIconNoneIR;
            }
            else if (source.listType == "3") {
                return zj.Common_ChangeIconContentIR;
            }
        };
        Common_ChangeIcon.prototype.itemRendererFunction1 = function (source) {
            if (source.listType == "1") {
                return zj.Common_ChangeIconTitleIR;
            }
            else if (source.listType == "2") {
                return zj.Common_ChangeIconNoneIR;
            }
            else if (source.listType == "3") {
                return zj.Common_ChangeIconContentIR;
            }
        };
        Common_ChangeIcon.prototype.loadListGENERAL = function () {
            this.idMap = [];
            this.lbTipUser.text = zj.TextsConfig.TextsConfig_User.text_pic_str;
            var picIdsNormal = zj.PlayerItemSystem.GetNormalPic(1);
            var picIdsHigh = zj.PlayerItemSystem.GetHighPic();
            var picIds_trans = zj.PlayerItemSystem.GetTransPic();
            var ICONTYPE = {
                NORMAL: 1,
                HIGH: 2,
                TRANS: 3,
            };
            // let idMap = [];
            //主角
            this.idMap[ICONTYPE.NORMAL] = picIdsNormal;
            //变身头像
            this.idMap[ICONTYPE.HIGH] = picIds_trans;
            //高级头像
            this.idMap[ICONTYPE.TRANS] = picIdsHigh;
            var arrayCollection = new eui.ArrayCollection();
            var index1 = 0;
            for (var i = 0; i < 3; i++) {
                arrayCollection.addItem({ "listType": "1", "iconType": zj.TableEnum.TableIconListState.GENERAL, "father": this, "titleType": i + 1, "changeWidth": true });
                for (var j = 0; j < Math.ceil(this.idMap[i + 1].length / this.COUNT_PER_ROW); j++) {
                    var arr = [];
                    var indexArr = [];
                    for (var jk = 0; jk < 4; jk++) {
                        var index = j * 4 + jk;
                        if (index >= this.idMap[i + 1].length) {
                            break;
                        }
                        indexArr.push(index1 += 1);
                        arr.push(this.idMap[i + 1][index]);
                    }
                    arrayCollection.addItem({ "listType": "3", "iconType": zj.TableEnum.TableIconListState.GENERAL, "picIds": arr, "index": indexArr, "father": this, "i": i, "j": j });
                }
            }
            this.lstTableViewItem.itemRendererFunction = this.itemRendererFunction1;
            this.lstTableViewItem.dataProvider = arrayCollection;
        };
        Common_ChangeIcon.prototype.loadListFrame = function () {
            var arrayCollection = new eui.ArrayCollection();
            var index1 = 0;
            for (var i = this.FRAMETYPE.NORMAL; i < this.FRAMETYPE.ACTIVITY + 1; i++) {
                //添加标题
                if (this.frameIdMap[i].length == 0) {
                }
                else {
                    arrayCollection.addItem({ "listType": "1", "iconType": 3, "father": this, "titleType": i + 1, "changeWidth": true });
                    for (var j = 0; j < Math.ceil(this.frameIdMap[i].length / this.COUNT_PER_ROW); j++) {
                        var arr = [];
                        var indexArr = [];
                        for (var jk = 0; jk < 4; jk++) {
                            var index = j * 4 + jk;
                            if (index >= this.frameIdMap[i].length) {
                                break;
                            }
                            indexArr.push(index1 += 1);
                            arr.push(this.frameIdMap[i][index]);
                        }
                        arrayCollection.addItem({ "listType": "3", "iconType": 3, "picIds": arr, "index": indexArr, "father": this, "i": i, "j": j });
                    }
                }
            }
            this.lstTableViewItem.itemRendererFunction = this.itemRendererFunction;
            this.lstTableViewItem.dataProvider = arrayCollection;
        };
        Common_ChangeIcon.prototype.LoadFrameSet = function () {
            var indexFrameMap = [];
            var info = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.itemFrame + ".json");
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.vipWeal + ".json");
            var chargeList = [];
            for (var kk in tbl) {
                var vv = tbl[kk];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= vv.sum) {
                    chargeList.push(vv);
                }
            }
            var frameMap = [];
            this.frameIdMap = [[], [], []];
            for (var k in chargeList) {
                var v = chargeList[k];
                if (chargeList[k].picFrame_id == 0) {
                    chargeList[k].picFrame_id = 150001;
                }
                frameMap.push(chargeList[k].picFrame_id);
            }
            var sortFunc = function (a, b) { info[a].order < info[b].order; };
            frameMap.sort(sortFunc);
            for (var k in frameMap) {
                var v = frameMap[k];
                var frame = 0;
                frame = v;
                if (this.GetInPart(info[v].order) == zj.CommonFrameType) {
                    this.frameIdMap[this.FRAMETYPE.NORMAL].push(frame);
                }
                else if (this.GetInPart(info[v].order) == zj.VipFrameType) {
                    this.frameIdMap[this.FRAMETYPE.VIP].push(frame);
                }
                else {
                    this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
                }
            }
            for (var k in info) {
                var v = info[k];
                var frame = 0;
                frame = Number(k);
                if (this.GetInPart(info[k].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
                    for (var kk in zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                        var vv = zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds[kk];
                        if (frame == vv.key && vv.value > Date.parse(zj.Game.Controller.serverNow().toString())) {
                            this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
                            this.frameIdMap[this.FRAMETYPE.ACTIVITY].sort(sortFunc);
                        }
                    }
                }
            }
            for (var k in info) {
                var v = info[k];
                var frame = 0;
                frame = Number(k);
                var toCheck = true;
                if (this.GetInPart(info[k].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length == 0) {
                    this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
                    this.frameIdMap[this.FRAMETYPE.ACTIVITY].sort(sortFunc);
                }
                else if (this.GetInPart(info[k].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
                    for (var kk in zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                        var vv = zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds[kk];
                        if (frame == vv.key && vv.value < Date.parse(zj.Game.Controller.serverNow().toString()) && toCheck) {
                            this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
                            toCheck = false;
                        }
                        else {
                            if (toCheck) {
                                var hasFrameIdList = [];
                                for (var kkk in zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                                    var vvv = zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds[kkk];
                                    if (vvv.value > Date.parse(zj.Game.Controller.serverNow().toString()) + 1) {
                                        hasFrameIdList.push(vvv.key);
                                    }
                                }
                                hasFrameIdList.sort(sortFunc);
                                if (!zj.Table.VIn(hasFrameIdList, frame)) {
                                    this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
                                    toCheck = false;
                                }
                            }
                        }
                    }
                }
            }
            var header_pic_id = "" + zj.Game.PlayerInfoSystem.BaseInfo.picId;
            var header_pic_frame = "" + zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
            var item_pic = zj.TableItemPic.Item(header_pic_id);
            if (item_pic) {
                this.imgPlayerIcon.source = zj.cachekey(item_pic.path, this);
            }
            var item_frame = zj.TableItemPicFrame.Item(header_pic_frame);
            if (item_frame) {
                this.imgFrame.source = zj.cachekey(item_frame.path, this);
            }
            this.totalFrameListID = 0;
            var find = false;
            for (var i = 0; i < this.frameIdMap.length; i++) {
                for (var k = 0; k < this.frameIdMap[i].length; k++) {
                    if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != this.frameIdMap[i][k] && !find) {
                        this.totalFrameListID = this.totalFrameListID + 1;
                    }
                    else {
                        find = true;
                    }
                }
            }
            this.focusFrameCur = this.totalFrameListID;
            this.FreshFrameFocus(this.focusFrameCur, zj.Game.PlayerInfoSystem.BaseInfo.picFrameId);
            this.btnGet.visible = false;
            this.btnFrameOK.visible = false;
        };
        Common_ChangeIcon.prototype.FreshFrameFocus = function (index, id) {
            this.idFrameRet = id;
            this.focusFrameCur = index;
            this.SetFrameInfo();
        };
        Common_ChangeIcon.prototype.SetFrameInfo = function () {
            if (this.beforeUsedPicFrame != null && this.beforeUsedPicFrame != zj.Game.PlayerInfoSystem.BaseInfo.picFrameId) {
                this.beforeUsedPicFrame = zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
                this.LoadFrameSet();
            }
            ;
            var path_frame = zj.TableItemPicFrame.Item(this.idFrameRet);
            var info = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.itemFrame + ".json");
            var isGet = true;
            if (this.GetInPart(info[this.idFrameRet].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length == 0) {
                isGet = false;
            }
            else if (this.GetInPart(info[this.idFrameRet].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
                var hasFrameIdList = [];
                for (var k in zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                    var v = zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds[k];
                    if (v.value > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                        hasFrameIdList.push(v.key);
                    }
                }
                if (!zj.Table.VIn(hasFrameIdList, this.idFrameRet)) {
                    isGet = false;
                }
            }
            var curTime = 0;
            if (this.GetInPart(info[this.idFrameRet].order) != zj.ActivityFrameType) {
                curTime = info[this.idFrameRet].overdue_time;
            }
            else if (isGet) {
                for (var k in zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                    var v = zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds[k];
                    if (v.key == this.idFrameRet) {
                        curTime = v.value - Date.parse(zj.Game.Controller.serverNow().toString()) / 1000;
                    }
                }
            }
            var ret = Math.floor(curTime / ((3600 * 24) * 365));
            if (ret > 1) {
                this.lbWordsFrameTime.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_User.frameTime);
            }
            else {
                this.lbWordsFrameTime.textFlow = zj.Util.RichText(this.upToTime(curTime));
            }
            this.lbWordsFrameTitle.text = info[this.idFrameRet].name;
            this.lbWordsFrameMessage.text = info[this.idFrameRet].extra;
            this.beforeUsedPicFrame = zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
            this.imgFrame.source = zj.cachekey(path_frame.path, this);
            this.btnFrameOK.visible = isGet && this.idFrameRet != zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
            this.btnGet.visible = !isGet;
        };
        Common_ChangeIcon.prototype.upToTime = function (time) {
            var str;
            var day = Math.floor(time / 86400);
            var hour = Math.floor((time % 86400) / 3600);
            var min = Math.floor(((time % 86400) % 3600) / 60);
            var sec = ((time % 86400) % 3600) / 60 / 60;
            if (day == 0) {
                if (hour == 0) {
                    if (min == 0) {
                        if (sec == 0) {
                            str = zj.TextsConfig.TextsConfig_Gift.upToTime2[4];
                        }
                        else {
                            str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime2[3], 1);
                        }
                    }
                    else {
                        str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime2[3], min);
                    }
                }
                else {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime2[2], hour, min);
                }
            }
            else {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime2[1], day, hour, min);
            }
            return str;
        };
        Common_ChangeIcon.prototype.freshFocus = function (id) {
            var mapRole_id = zj.TableItemPic.Item(id).mapRole_id;
            var bodySpxtbl = zj.TableMapRole.Item(mapRole_id);
            if (bodySpxtbl != null) {
                var bodySpxId = bodySpxtbl.body_spx_id;
                var scale = bodySpxtbl.spine_scale;
                if (bodySpxId != -1) {
                    var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.hunter_ani_spine + ".json");
                    this.addAnimatoin(tbl[bodySpxId].atlas, tbl[bodySpxId].ani_name, 0, this.groupAni);
                    this.groupAni.scaleX = this.groupAni.scaleY = scale;
                }
            }
        };
        //添加龙骨动画
        Common_ChangeIcon.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                _this.groupAni.removeChildren();
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.8;
                display.scaleY = 0.8;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        Common_ChangeIcon.prototype.onBtnConfirm = function () {
            if (this.CB != null)
                this.CB(this.picId, false);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_ChangeIcon.prototype.onBtnFrameOK = function () {
            if (this.CB != null)
                this.CB(this.picId, true);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_ChangeIcon.prototype.onBtnGet = function () {
            var _this = this;
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(_this.idFrameRet, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Common_ChangeIcon.prototype.setPicId = function (ev) {
            this.picId = ev.data;
            if (this.groupHead.visible == true) {
                this.freshFocus(Number(this.picId));
            }
            else if (this.groupFrame.visible == true) {
                this.FreshFrameFocus(this.focusFrameCur, this.picId);
            }
        };
        Common_ChangeIcon.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_ChangeIcon.prototype.FreshFocus = function (index, id, vis) {
            this.idRet = id;
            this.vis = vis;
        };
        Common_ChangeIcon.prototype.GetInPart = function (num) {
            return num / zj.NumLevel - num / zj.NumLevel % 1;
        };
        Common_ChangeIcon.index = 1;
        Common_ChangeIcon.iconChange = false;
        return Common_ChangeIcon;
    }(zj.Dialog));
    zj.Common_ChangeIcon = Common_ChangeIcon;
    __reflect(Common_ChangeIcon.prototype, "zj.Common_ChangeIcon");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ChangeIcon.js.map