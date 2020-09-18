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
     * @author
     *
     * @date 2019-1-25
     *
     * @class 战报界面
     */
    var MailMainReport = (function (_super) {
        __extends(MailMainReport, _super);
        function MailMainReport() {
            var _this = _super.call(this) || this;
            _this.itemId = null;
            _this.mailType = null;
            _this.mailType1 = null;
            _this.mailData = [];
            _this.MAIL_INDEX = [
                message.MailType.MAIL_TYPE_SYSTEM,
                message.MailType.MAIL_TYPE_NORMAL,
                message.MailType.MAIL_TYPE_LADDER,
                message.MailType.MAIL_TYPE_WONDERLAND,
                message.MailType.MAIL_TYPE_SINGLECRAFT
            ];
            /**未读邮件*/
            _this.mailBoxInfo = [];
            /**战报数据源 */
            _this.listSkillData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/arena/MailMainReportSkin.exml";
            _this.init();
            return _this;
        }
        MailMainReport.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnRead.addEventListener(tap, this.onBtnRead, this);
            //监听服务器发协议之后执行
            //this.reqMailList(this.mailType);
        };
        MailMainReport.prototype.loadFrom = function (father, mailType) {
            this.mailType1 = mailType;
            this.setInfo(mailType);
            this.setButtonTurn();
            this.labelTip.visible = mailType == zj.TableEnum.Enum.Mail.WONDERLAND;
            this.btnTurn.visible = mailType == zj.TableEnum.Enum.Mail.WONDERLAND;
        };
        MailMainReport.prototype.setInfo = function (mailType) {
            this.setMailType(mailType);
        };
        MailMainReport.prototype.setMailType = function (mailType) {
            this.mailType = this.MAIL_INDEX[mailType - 1];
            this.reqMailList(this.mailType);
        };
        /**子类调用 */
        MailMainReport.prototype.setSelect = function (index) {
            this.itemId = index;
            this.setMailIsOpen();
            this.reqMailDetail(this.mailType, [this.mailData[this.itemId].mailId]);
        };
        MailMainReport.prototype.reqMailDetail = function (mailType, mailId) {
            var _this = this;
            zj.Game.PlayerArenaSystem.getMailDetail(this.mailType, mailId)
                .then(function () {
                _this.setInfoList();
            })
                .catch(function (reason) {
            });
        };
        ;
        MailMainReport.prototype.setMailIsOpen = function () {
            var _this = this;
            this.setMailIsRead();
            this.setInfoPlayerMailBoxCount();
            var info = this.mailData[this.itemId];
            zj.loadUI(zj.MailReport)
                .then(function (dialog) {
                dialog.setInfo(info, _this, function () {
                    _this.loadFrom(null, _this.mailType1);
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MailMainReport.prototype.setMailIsRead = function () {
            var mail = zj.Table.FindV(this.mailData, this.itemId);
            if (!mail.is_read) {
                // this._item_list[self._item_id]:SetInfoRead()
                mail.is_read = true;
                zj.Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount = zj.Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount - 1;
                zj.Tips.SetTipsOfId(zj.Tips.TAG.MAIL, 1);
            }
        };
        MailMainReport.prototype.setInfoPlayerMailBoxCount = function () {
            var count1 = 0;
            var count2 = 0;
            for (var k in this.mailData) {
                if (this.mailData.hasOwnProperty(k)) {
                    var v = this.mailData[k];
                    count1 = count1 + zj.yuan3(v.is_read, 0, 1);
                    count2 = count2 + zj.yuan3((v.attachment.length == 0) || (v.attachment.length > 0 && v.is_attachment), 0, 1);
                }
            }
            zj.Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount = count1;
            zj.Game.PlayerMailSystem.mailboxInfo[this.mailType].unReward = count2;
            zj.Tips.SetTipsOfId(zj.Tips.TAG.MAIL, 1);
        };
        MailMainReport.prototype.reqMailList = function (mailType) {
            var _this = this;
            zj.Game.PlayerArenaSystem.getMailList(mailType)
                .then(function (resolve) {
                _this.mailBoxInfo = resolve[0];
                // Tips.SetTipsOfId(Tips.TAG.MAIL, 1);
                zj.Game.PlayerMailSystem.mailboxInfo = resolve[0];
                _this.mailData = resolve[1];
                _this.setInfoData();
                _this.setInfoCount();
                _this.setInfoList();
            })
                .catch(function (reason) {
                //toast(reason) ;   这里返回值有错误
            });
        };
        MailMainReport.prototype.setInfoData = function () {
            var time = null;
            for (var v in this.mailData) {
                if (this.mailData.hasOwnProperty(v)) {
                    var k = this.mailData[v];
                    k.title = zj.Set.DecodeJson(k.title, null);
                    k.content = zj.Set.DecodeJson(zj.Lang.chatContent(k), null);
                }
            }
        };
        /**加载邮件列表 */
        MailMainReport.prototype.setInfoList = function () {
            this.listSkillData.removeAll();
            for (var i = 0; i < this.mailData.length; i++) {
                var data = new zj.MailReportItemData();
                data.index = i;
                data.info = this.mailData[i];
                data.father = this;
                this.listSkillData.addItem(data);
            }
            this.listView.dataProvider = this.listSkillData;
            this.listView.itemRenderer = zj.MailReportItem;
        };
        MailMainReport.prototype.setInfoCount = function (count) {
            count = count || this.mailData.length;
            var strCount = zj.Helper.StringFormat("%s", count);
            this.labelCount.text = strCount;
            this.labelTips.visible = count == 0;
        };
        /**点击全部阅读*/
        MailMainReport.prototype.onBtnRead = function () {
            var mailIds = [];
            for (var k in this.mailData) {
                if (this.mailData.hasOwnProperty(k)) {
                    var v = this.mailData[k];
                    if (!v.is_read) {
                        mailIds.push(v.mailId);
                    }
                }
            }
            if (mailIds.length > 0) {
                this.reqMailRead(mailIds);
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.mail_read);
            }
        };
        MailMainReport.prototype.setButtonTurn = function () {
        };
        /**将未读邮件全部设为已读 */
        MailMainReport.prototype.reqMailRead = function (ids) {
            var _this = this;
            zj.Game.PlayerArenaSystem.getMailDetail(this.mailType, ids)
                .then(function () {
                _this.mailBoxInfo[_this.mailType].unReadCount = 0;
                zj.Game.PlayerMailSystem.mailboxInfo[_this.mailType].unReadCount = 0;
                for (var k in _this.mailData) {
                    if (_this.mailData.hasOwnProperty(k)) {
                        var v = _this.mailData[k];
                        v.is_read = true;
                    }
                }
                _this.setInfoList();
                zj.Tips.SetTipsOfId(zj.Tips.TAG.MAIL, 1);
            })
                .catch(function (reason) {
                // toast(reason);
            });
        };
        /**关闭弹窗*/
        MailMainReport.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return MailMainReport;
    }(zj.Dialog));
    zj.MailMainReport = MailMainReport;
    __reflect(MailMainReport.prototype, "zj.MailMainReport");
})(zj || (zj = {}));
//# sourceMappingURL=MailMainReport.js.map