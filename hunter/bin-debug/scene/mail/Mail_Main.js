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
    // 邮件 Mail_Main
    // lizhengqiang
    // 20190505
    var Mail_Main = (function (_super) {
        __extends(Mail_Main, _super);
        function Mail_Main() {
            var _this = _super.call(this) || this;
            _this.buttons = null;
            _this.spriteTips = null;
            _this.mailType = null;
            _this.mailData = null;
            _this.itemId = null;
            _this.arrCollection = null;
            _this.MAIL_INDEX = [
                message.MailType.MAIL_TYPE_SYSTEM,
                message.MailType.MAIL_TYPE_NORMAL,
                message.MailType.MAIL_TYPE_PVP,
            ];
            _this.uiItem = (_a = {},
                _a[message.MailType.MAIL_TYPE_SYSTEM] = zj.Mail_SysItem,
                _a[message.MailType.MAIL_TYPE_NORMAL] = zj.Mail_LetterItem,
                _a[message.MailType.MAIL_TYPE_PVP] = zj.MailReportItem,
                _a);
            _this.setInfoList = function () {
                if (!_this.mailData) {
                    _this.lstTableViewList.visible = false;
                    return;
                }
                _this.arrCollection = new eui.ArrayCollection();
                var id = 1;
                for (var _i = 0, _a = _this.mailData; _i < _a.length; _i++) {
                    var v = _a[_i];
                    _this.arrCollection.addItem({ info: v, father: _this, index: id });
                    id = id + 1;
                }
                _this.lstTableViewList.visible = true;
                _this.lstTableViewList.dataProvider = _this.arrCollection;
                _this.lstTableViewList.itemRenderer = _this.uiItem[_this.mailType];
            };
            _this.skinName = "resource/skins/mail/Mail_MainSkin.exml";
            _this.btnTagSys.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTagSys, _this);
            _this.btnTagLetter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTagLetter, _this);
            _this.btnTagPk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTagPk, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.groupSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickSwitch, _this);
            _this.btnRead.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRead, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_MAIL_STATE, _this.mailNoticeVisit, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            if (_this.imgBackground) {
                if (_this.imgBackground.width < zj.UIManager.StageWidth) {
                    _this.imgBackground.width = zj.UIManager.StageWidth;
                }
            }
            if (zj.Device.isReviewSwitch) {
                _this.btnClose.x = 665;
            }
            return _this;
            var _a;
        }
        Mail_Main.prototype.init = function () {
            this.groupMailX = this.groupMail.x;
            this.groupMailY = this.groupMail.y;
            this.buttons = [
                this.btnTagSys,
                this.btnTagLetter,
                this.btnTagPk,
            ];
            this.spriteTips = [
                this.imgNodeTip1,
                this.imgNodeTip2,
                this.imgNodeTip3,
            ];
            //打开时缓动动画
            var anchorOffsetX = 0;
            var anchorOffsetY = 0;
            var x = this.groupMailX + anchorOffsetX;
            var y = this.groupMailY + anchorOffsetY;
            this.groupMail.alpha = 0;
            this.imgBackground.alpha = 0;
            egret.Tween.get(this.imgBackground).to({ alpha: 1 }, 100);
            egret.Tween.get(this.groupMail).to({ x: x, y: y, anchorOffsetX: anchorOffsetX, anchorOffsetY: anchorOffsetY, alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 50);
            this.groupTips.visible = false;
            this.lbCount.text = "";
            for (var _i = 0, _a = this.spriteTips; _i < _a.length; _i++) {
                var v = _a[_i];
                v.visible = false;
            }
            this.groupPk.visible = false;
            this.setInfoPkHook();
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_MAIL_STATE, this.mailNoticeVisit, this);
            this.setInfoTips();
            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoTips, this);
            this.timer.start();
            // 默认选中
            this.setMailType(1);
        };
        Mail_Main.prototype.isFullScreen = function () {
            return true;
        };
        Mail_Main.prototype.setMailType = function (index) {
            this.mailType = this.MAIL_INDEX[index - 1];
            this.setSelectButton(index);
            this.setSetNodePk();
            this.reqMailList(this.mailType);
        };
        Mail_Main.prototype.setSelectButton = function (index) {
            for (var k in this.buttons) {
                this.buttons[k].enabled = (Number(k) + 1 != index);
                this.buttons[k].currentState = Number(k) + 1 == index ? "down" : "up";
            }
        };
        Mail_Main.prototype.setInfoTips = function () {
            for (var k in this.spriteTips) {
                if (Number(k) + 1 != 3) {
                    this.spriteTips[k].visible = zj.Tips.GetTipsOfMail(this.MAIL_INDEX[k]);
                }
                else {
                    var bSelect = zj.Tips.GetSaveBool(zj.Tips.SAVE.MAIL_PK, false);
                    this.spriteTips[k].visible = (zj.Tips.GetTipsOfMail(this.MAIL_INDEX[k]) && !bSelect);
                }
            }
        };
        Mail_Main.prototype.setMailIsOpen = function () {
            var _this = this;
            if (!this.mailData)
                return;
            this.setMailIsRead();
            this.setInfoPlayerMailBoxCount();
            // open mail ui
            var info = this.mailData[this.itemId - 1];
            var count = zj.yuan3(info.attachment.length > 0, 1, 0);
            var anchorOffsetX = this.groupMail.width / 2;
            var anchorOffsetY = this.groupMail.height / 2;
            var x = this.groupMailX + anchorOffsetX;
            var y = this.groupMailY + anchorOffsetY;
            egret.Tween.get(this.groupMail).to({ x: x, y: y, anchorOffsetX: anchorOffsetX, anchorOffsetY: anchorOffsetY, scaleX: 0.9, scaleY: 0.9, }, 150);
            switch (this.mailType) {
                case message.MailType.MAIL_TYPE_SYSTEM:
                    {
                        switch (count) {
                            case 0:
                                {
                                    zj.loadUI(zj.Mail_Sys)
                                        .then(function (dailog) {
                                        dailog.show(zj.UI.SHOW_FROM_TOP);
                                        dailog.setFather(_this);
                                        dailog.setInfo(info);
                                    });
                                }
                                break;
                            case 1:
                                {
                                    zj.loadUI(zj.Mail_SysAttach)
                                        .then(function (dailog) {
                                        dailog.show(zj.UI.SHOW_FROM_TOP);
                                        dailog.setFather(_this);
                                        dailog.setInfo(info);
                                    });
                                }
                                break;
                        }
                    }
                    break;
                case message.MailType.MAIL_TYPE_NORMAL:
                    {
                        switch (count) {
                            case 0:
                                {
                                    zj.loadUI(zj.Mail_Letter)
                                        .then(function (dailog) {
                                        dailog.show(zj.UI.SHOW_FROM_TOP);
                                        dailog.setFather(_this);
                                        dailog.setInfo(info);
                                    });
                                }
                                break;
                        }
                    }
                    break;
                case message.MailType.MAIL_TYPE_PVP:
                    {
                        switch (count) {
                            case 0:
                                {
                                    zj.loadUI(zj.MailReport)
                                        .then(function (dailog) {
                                        dailog.show(zj.UI.SHOW_FROM_TOP);
                                        dailog.setInfo(info, _this, function () {
                                            egret.Tween.get(_this.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
                                        });
                                    });
                                }
                                break;
                        }
                    }
                    break;
            }
        };
        Mail_Main.prototype.setMailIsRead = function () {
            if (!this.mailData)
                return;
            var mail = zj.Table.FindV(this.mailData, this.itemId - 1);
            if (!mail.is_read) {
                var item = this.lstTableViewList.selectedItem;
                item["callFunctionName"] = "read";
                this.arrCollection.itemUpdated(item);
                mail.is_read = true;
                zj.Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount = zj.Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount - 1;
                zj.Tips.SetTipsOfMail();
            }
        };
        Mail_Main.prototype.setMailIsGet = function () {
            if (!this.mailData)
                return;
            var mail = zj.Table.FindV(this.mailData, this.itemId - 1);
            if (!mail.is_attachment) {
                var item = this.lstTableViewList.selectedItem;
                item["callFunctionName"] = "get";
                this.arrCollection.itemUpdated(item);
                mail.is_attachment = true;
                zj.Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward = zj.Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward - 1;
                zj.Tips.SetTipsOfMail();
            }
        };
        Mail_Main.prototype.setInfoPlayerMailBoxCount = function () {
            if (!this.mailData)
                return;
            var count1 = 0;
            var count2 = 0;
            for (var _i = 0, _a = this.mailData; _i < _a.length; _i++) {
                var v = _a[_i];
                count1 = count1 + zj.yuan3(v.is_read, 0, 1);
                count2 = count2 + zj.yuan3(((v.attachment.length == 0) || (v.attachment.length > 0 && v.is_attachment)), 0, 1);
            }
            zj.Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount = count1;
            zj.Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward = count2;
        };
        Mail_Main.prototype.setSetNodePk = function () {
            this.groupPk.visible = (this.mailType == message.MailType.MAIL_TYPE_PVP);
        };
        Mail_Main.prototype.setInfoPkHook = function () {
            var bSelect = zj.Tips.GetSaveBool(zj.Tips.SAVE.MAIL_PK, false);
            this.imgHook0.visible = bSelect;
        };
        Mail_Main.prototype.onClickSwitch = function () {
            var bSelect = zj.Tips.GetSaveBool(zj.Tips.SAVE.MAIL_PK, false);
            zj.Tips.SetSaveBool(zj.Tips.SAVE.MAIL_PK, !bSelect);
            this.setInfoPkHook();
        };
        Mail_Main.prototype.setInfoData = function () {
            if (!this.mailData)
                return;
            // this.mailData = this.mailData.filter((mail) => {
            //     return (mail.content_type != "client_mail_tower_reward" &&
            //         mail.content_type != "client_mail_tower_max_reward" &&
            //         mail.content_type != "client_mail_permit_reward")
            // });
            for (var _i = 0, _a = this.mailData; _i < _a.length; _i++) {
                var v = _a[_i];
                v.title = zj.Set.DecodeJson(v.title, null);
                v.content = zj.Set.DecodeJson(zj.Lang.chatContent(v), null);
            }
        };
        Mail_Main.prototype.setInfoCount = function (count) {
            var tmp = count != undefined ? count : this.mailData == null ? 0 : this.mailData.length;
            var strCount = zj.Helper.StringFormat("%s%d", zj.TextsConfig.TextsConfig_Mail.count, tmp);
            this.lbCount.text = strCount;
            this.groupTips.visible = (tmp == 0);
        };
        Mail_Main.prototype.setSelect = function (tag) {
            if (!this.mailData)
                return;
            this.itemId = tag;
            this.setMailIsOpen();
            this.reqMailDetail(this.mailType, this.mailData[this.itemId - 1].mailId);
        };
        Mail_Main.prototype.onBtnTagSys = function () {
            this.setMailType(1);
        };
        Mail_Main.prototype.onBtnTagLetter = function () {
            this.setMailType(2);
        };
        Mail_Main.prototype.onBtnTagPk = function () {
            this.setMailType(3);
        };
        Mail_Main.prototype.onBtnRead = function () {
            if (!this.mailData) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Error.mail_read));
                return;
            }
            var mailIds = [];
            if (this.mailData)
                for (var _i = 0, _a = this.mailData; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (!v.is_read) {
                        mailIds.push(v.mailId);
                    }
                }
            if (mailIds.length > 0) {
                this.reqMailRead(mailIds);
            }
            else {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Error.mail_read));
            }
        };
        Mail_Main.prototype.onBtnGet = function () {
            if (!this.mailData) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Error.mail_attach));
                return;
            }
            var mailIds = [];
            for (var _i = 0, _a = this.mailData; _i < _a.length; _i++) {
                var v = _a[_i];
                if (!v.is_attachment && v.attachment.length > 0) {
                    mailIds.push(v.mailId);
                }
            }
            if (mailIds.length > 0) {
                this.reqMailGetAttach(mailIds);
            }
            else {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Error.mail_attach));
            }
        };
        Mail_Main.prototype.mailNoticeVisit = function (ev) {
            this.reqMailList(this.mailType);
        };
        Mail_Main.prototype.reqMailList = function (mailType) {
            var _this = this;
            zj.Game.PlayerMailSystem.getMailList(mailType).then(function (msg) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.MAIL);
                _this.mailData = msg["mails"];
                _this.setInfoData();
                _this.setInfoList();
                _this.setInfoCount();
            });
        };
        Mail_Main.prototype.reqMailDetail = function (mailType, mailId) {
            zj.Game.PlayerMailSystem.getMailDetail(mailType, [mailId]);
        };
        Mail_Main.prototype.reqMailRead = function (ids) {
            var _this = this;
            if (!this.mailData)
                return;
            zj.Game.PlayerMailSystem.getMailDetail(this.mailType, ids).then(function () {
                zj.Game.PlayerMailSystem.mailboxInfo[_this.mailType - 1].unReadCount = 0;
                for (var _i = 0, _a = _this.mailData; _i < _a.length; _i++) {
                    var v = _a[_i];
                    v.is_read = true;
                }
                _this.setInfoList();
                zj.Tips.SetTipsOfMail();
            });
        };
        Mail_Main.prototype.reqMailGetAttach = function (ids) {
            var _this = this;
            if (!this.mailData)
                return;
            zj.Game.PlayerMailSystem.saveAttachment(this.mailType, ids).then(function (gameInfo) {
                zj.Game.PlayerMailSystem.mailboxInfo[_this.mailType - 1].unReward = 0;
                for (var _i = 0, _a = _this.mailData; _i < _a.length; _i++) {
                    var v = _a[_i];
                    v.is_attachment = true;
                }
                zj.Tips.SetTipsOfMail();
                var goods = zj.PlayerItemSystem.MergeItem(gameInfo.getGoods);
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(goods);
                    dialog.setCB(_this.setInfoList);
                });
            });
        };
        Mail_Main.prototype.onBtnClose = function () {
            var _this = this;
            var anchorOffsetX = 0;
            var anchorOffsetY = 0;
            var x = this.groupMailX + anchorOffsetX;
            var y = this.groupMailY + anchorOffsetY;
            egret.Tween.get(this.imgBackground).to({ alpha: 0 }, 100);
            egret.Tween.get(this.groupMail).to({ x: x, y: y, anchorOffsetX: anchorOffsetX, anchorOffsetY: anchorOffsetY, scaleX: 1.1, scaleY: 1.1 }, 50).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 200).call(function () {
                _this.close();
            });
            // this.close(UI.HIDE_TO_TOP);
        };
        return Mail_Main;
    }(zj.Dialog));
    zj.Mail_Main = Mail_Main;
    __reflect(Mail_Main.prototype, "zj.Mail_Main");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_Main.js.map