var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 邮件信息系统
    // lizhengqiang
    // 20190505
    var PlayerMailSystem = (function () {
        function PlayerMailSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.mailboxInfo = null;
        }
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数
        PlayerMailSystem.Decompress = function (data) {
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(data, para);
            return inflate.decompress();
        };
        // 解压MailInfoZip信息
        PlayerMailSystem.DecompressMailInfo = function (data) {
            if (data.length == 0)
                return null;
            var plain = PlayerMailSystem.Decompress(data);
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var mailInfo = new message.MailInfoZip();
            if (!mailInfo.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return mailInfo;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerMailSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MAIL_BOX_INFO_CHANGE, this.onMailBoxInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_MAIL_STATE, this.onNoticeMailState, this);
        };
        PlayerMailSystem.prototype.uninit = function () {
            this.mailboxInfo = null;
        };
        PlayerMailSystem.prototype.onMailBoxInfoChange = function (ev) {
            this.mailboxInfo = ev.data;
            zj.Tips.SetTipsOfMail();
        };
        PlayerMailSystem.prototype.onNoticeMailState = function (ev) {
            var request = ev.data;
            if (!request)
                return;
            this.mailboxInfo = request.body.mailBoxs;
            zj.Tips.SetTipsOfMail();
        };
        PlayerMailSystem.prototype.getMailList = function (boxType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GetMailListRequest();
                request.body.box_type = boxType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.mailboxInfo = response.body.mailBoxs;
                    var mailInfo = PlayerMailSystem.DecompressMailInfo(response.body.mails);
                    resolve({ mails: mailInfo == null ? null : mailInfo.mails, mailBoxs: response.body.mailBoxs });
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerMailSystem.prototype.getMailDetail = function (boxType, mailIds) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GetMailDetailRequest();
                request.body.box_type = boxType;
                request.body.mailIds = mailIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerMailSystem.prototype.saveAttachment = function (type, mailIds) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SaveAttachmentRequest();
                request.body.type = type;
                request.body.mailIds = mailIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerMailSystem.prototype.sendRoleMail = function (type, toId, toName, title, content) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SendRoleMailRequest();
                request.body.type = type;
                request.body.to_id = toId;
                request.body.to_name = toName;
                request.body.title = title;
                request.body.content = content;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerMailSystem;
    }());
    zj.PlayerMailSystem = PlayerMailSystem;
    __reflect(PlayerMailSystem.prototype, "zj.PlayerMailSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerMailSystem.js.map