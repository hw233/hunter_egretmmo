namespace zj {
    // 邮件 Mail_Main
    // lizhengqiang
    // 20190505
    export class Mail_Main extends Dialog {
        private imgBackground: eui.Image;
        public groupMail: eui.Button;
        private btnTagSys: eui.Button;
        private imgNodeTip1: eui.Image;
        private btnTagLetter: eui.Button;
        private imgNodeTip2: eui.Image;
        private btnTagPk: eui.Button;
        private imgNodeTip3: eui.Image;
        private btnClose: eui.Button;
        private lstTableViewList: eui.List;
        private lbCount: eui.Label;
        private btnRead: eui.Button;
        private btnGet: eui.Button;
        private groupTips: eui.Group;
        private groupPk: eui.Group;
        private groupSwitch: eui.Group;
        private imgHook0: eui.Image;

        private timer: egret.Timer;

        private buttons = null;
        private spriteTips = null;

        public mailType: number = null;
        private mailData: Array<message.MailInfo> = null;
        private itemId: number = null;

        private arrCollection: eui.ArrayCollection = null;

        private MAIL_INDEX = [
            message.MailType.MAIL_TYPE_SYSTEM,
            message.MailType.MAIL_TYPE_NORMAL,
            message.MailType.MAIL_TYPE_PVP,
        ];

        private uiItem = {
            [message.MailType.MAIL_TYPE_SYSTEM]: Mail_SysItem,
            [message.MailType.MAIL_TYPE_NORMAL]: Mail_LetterItem,
            [message.MailType.MAIL_TYPE_PVP]: MailReportItem,
        };

        private groupMailX: number;
        private groupMailY: number;


        public constructor() {
            super();
            this.skinName = "resource/skins/mail/Mail_MainSkin.exml";
            this.btnTagSys.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagSys, this);
            this.btnTagLetter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagLetter, this);
            this.btnTagPk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTagPk, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.groupSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSwitch, this);
            this.btnRead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRead, this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SERVER_NOTICE_MAIL_STATE, this.mailNoticeVisit, this);

                if (this.timer) this.timer.stop();
            }, null);
            if (this.imgBackground) {
                if (this.imgBackground.width < UIManager.StageWidth) {
                    this.imgBackground.width = UIManager.StageWidth;
                }
            }
            if (Device.isReviewSwitch) {
                this.btnClose.x = 665;
            }
        }

        public init() {
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
            let anchorOffsetX = 0;
            let anchorOffsetY = 0;
            let x = this.groupMailX + anchorOffsetX;
            let y = this.groupMailY + anchorOffsetY;
            this.groupMail.alpha = 0;
            this.imgBackground.alpha = 0;
            egret.Tween.get(this.imgBackground).to({ alpha: 1 }, 100);
            egret.Tween.get(this.groupMail).to({ x: x, y: y, anchorOffsetX: anchorOffsetX, anchorOffsetY: anchorOffsetY, alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 50);

            this.groupTips.visible = false;
            this.lbCount.text = "";
            for (let v of this.spriteTips) {
                v.visible = false;
            }

            this.groupPk.visible = false;
            this.setInfoPkHook();

            Game.EventManager.on(GameEvent.SERVER_NOTICE_MAIL_STATE, this.mailNoticeVisit, this);

            this.setInfoTips();
            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoTips, this);
            this.timer.start();

            // 默认选中
            this.setMailType(1);
        }

        public isFullScreen() {
            return true;
        }

        private setMailType(index: number) {
            this.mailType = this.MAIL_INDEX[index - 1];
            this.setSelectButton(index);
            this.setSetNodePk();
            this.reqMailList(this.mailType);
        }

        private setSelectButton(index: number) {
            for (const k in this.buttons) {
                this.buttons[k].enabled = (Number(k) + 1 != index);
                this.buttons[k].currentState = Number(k) + 1 == index ? "down" : "up";
            }
        }

        private setInfoTips() {
            for (const k in this.spriteTips) {
                if (Number(k) + 1 != 3) {
                    this.spriteTips[k].visible = Tips.GetTipsOfMail(this.MAIL_INDEX[k]);
                } else {
                    let bSelect = Tips.GetSaveBool(Tips.SAVE.MAIL_PK, false);
                    this.spriteTips[k].visible = (Tips.GetTipsOfMail(this.MAIL_INDEX[k]) && !bSelect);
                }
            }
        }

        private setMailIsOpen() {
            if (!this.mailData) return;
            this.setMailIsRead();
            this.setInfoPlayerMailBoxCount();

            // open mail ui
            let info = this.mailData[this.itemId - 1];
            let count = yuan3(info.attachment.length > 0, 1, 0);

            let anchorOffsetX = this.groupMail.width / 2;
            let anchorOffsetY = this.groupMail.height / 2;
            let x = this.groupMailX + anchorOffsetX;
            let y = this.groupMailY + anchorOffsetY;
            egret.Tween.get(this.groupMail).to({ x: x, y: y, anchorOffsetX: anchorOffsetX, anchorOffsetY: anchorOffsetY, scaleX: 0.9, scaleY: 0.9, }, 150);

            switch (this.mailType) {
                case message.MailType.MAIL_TYPE_SYSTEM:
                    {
                        switch (count) {
                            case 0:
                                {
                                    loadUI(Mail_Sys)
                                        .then((dailog: Mail_Sys) => {
                                            dailog.show(UI.SHOW_FROM_TOP);
                                            dailog.setFather(this);
                                            dailog.setInfo(info);
                                        });
                                }
                                break;
                            case 1:
                                {
                                    loadUI(Mail_SysAttach)
                                        .then((dailog: Mail_SysAttach) => {
                                            dailog.show(UI.SHOW_FROM_TOP);
                                            dailog.setFather(this);
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
                                    loadUI(Mail_Letter)
                                        .then((dailog: Mail_Letter) => {
                                            dailog.show(UI.SHOW_FROM_TOP);
                                            dailog.setFather(this);
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
                                    loadUI(MailReport)
                                        .then((dailog: MailReport) => {
                                            dailog.show(UI.SHOW_FROM_TOP);
                                            dailog.setInfo(info, this, () => {
                                                egret.Tween.get(this.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
                                            });
                                        });
                                }
                                break;
                        }
                    }
                    break;
            }
        }

        private setMailIsRead() {
            if (!this.mailData) return;
            let mail: message.MailInfo = Table.FindV(this.mailData, this.itemId - 1);
            if (!mail.is_read) {
                let item = this.lstTableViewList.selectedItem;
                item["callFunctionName"] = "read";
                this.arrCollection.itemUpdated(item);
                mail.is_read = true;
                Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount = Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount - 1;
                Tips.SetTipsOfMail();
            }
        }

        private setMailIsGet() {
            if (!this.mailData) return;
            let mail: message.MailInfo = Table.FindV(this.mailData, this.itemId - 1);
            if (!mail.is_attachment) {
                let item = this.lstTableViewList.selectedItem;
                item["callFunctionName"] = "get";
                this.arrCollection.itemUpdated(item);
                mail.is_attachment = true;
                Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward = Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward - 1;
                Tips.SetTipsOfMail();
            }
        }

        private setInfoPlayerMailBoxCount() {
            if (!this.mailData) return;
            let count1: number = 0;
            let count2: number = 0;
            for (const v of this.mailData) {
                count1 = count1 + yuan3(v.is_read, 0, 1);
                count2 = count2 + yuan3(((v.attachment.length == 0) || (v.attachment.length > 0 && v.is_attachment)), 0, 1);
            }
            Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount = count1;
            Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward = count2;
        }

        private setSetNodePk() {
            this.groupPk.visible = (this.mailType == message.MailType.MAIL_TYPE_PVP);
        }


        private setInfoPkHook() {
            let bSelect = Tips.GetSaveBool(Tips.SAVE.MAIL_PK, false);
            this.imgHook0.visible = bSelect;
        }

        private onClickSwitch() {
            let bSelect = Tips.GetSaveBool(Tips.SAVE.MAIL_PK, false);
            Tips.SetSaveBool(Tips.SAVE.MAIL_PK, !bSelect);

            this.setInfoPkHook();
        }

        private setInfoData() {
            if (!this.mailData) return;
            // this.mailData = this.mailData.filter((mail) => {
            //     return (mail.content_type != "client_mail_tower_reward" &&
            //         mail.content_type != "client_mail_tower_max_reward" &&
            //         mail.content_type != "client_mail_permit_reward")
            // });
            for (let v of this.mailData) {
                v.title = Set.DecodeJson(v.title, null);
                v.content = Set.DecodeJson(Lang.chatContent(v), null);
            }
        }

        private setInfoList = () => {
            if (!this.mailData) {
                this.lstTableViewList.visible = false;
                return;
            }
            this.arrCollection = new eui.ArrayCollection();
            let id: number = 1;
            for (let v of this.mailData) {
                this.arrCollection.addItem({ info: v, father: this, index: id });
                id = id + 1;
            }

            this.lstTableViewList.visible = true;
            this.lstTableViewList.dataProvider = this.arrCollection;
            this.lstTableViewList.itemRenderer = this.uiItem[this.mailType];
        }

        private setInfoCount(count?: number) {
            let tmp = count != undefined ? count : this.mailData == null ? 0 : this.mailData.length;
            let strCount = Helper.StringFormat("%s%d", TextsConfig.TextsConfig_Mail.count, tmp);
            this.lbCount.text = strCount;

            this.groupTips.visible = (tmp == 0);
        }

        private setSelect(tag: number) {
            if (!this.mailData) return;
            this.itemId = tag;

            this.setMailIsOpen();

            this.reqMailDetail(this.mailType, this.mailData[this.itemId - 1].mailId);
        }

        private onBtnTagSys() {
            this.setMailType(1);
        }

        private onBtnTagLetter() {
            this.setMailType(2);
        }

        private onBtnTagPk() {
            this.setMailType(3);
        }


        private onBtnRead() {
            if (!this.mailData) {
                toast_warning(LANG(TextsConfig.TextsConfig_Error.mail_read));
                return;
            }

            let mailIds: string[] = [];

            if (this.mailData)
                for (const v of this.mailData) {
                    if (!v.is_read) {
                        mailIds.push(v.mailId);
                    }
                }
            if (mailIds.length > 0) {
                this.reqMailRead(mailIds);
            } else {
                toast_warning(LANG(TextsConfig.TextsConfig_Error.mail_read));
            }
        }

        private onBtnGet() {
            if (!this.mailData) {
                toast_warning(LANG(TextsConfig.TextsConfig_Error.mail_attach));
                return;
            }

            let mailIds: string[] = [];
            for (const v of this.mailData) {
                if (!v.is_attachment && v.attachment.length > 0) {
                    mailIds.push(v.mailId);
                }
            }
            if (mailIds.length > 0) {
                this.reqMailGetAttach(mailIds);
            } else {
                toast_warning(LANG(TextsConfig.TextsConfig_Error.mail_attach));
            }
        }

        private mailNoticeVisit(ev: egret.Event) {
            this.reqMailList(this.mailType);
        }

        private reqMailList(mailType: number) {
            Game.PlayerMailSystem.getMailList(mailType).then((msg) => {
                Tips.SetTipsOfId(Tips.TAG.MAIL);

                this.mailData = msg["mails"];
                this.setInfoData();
                this.setInfoList();
                this.setInfoCount();
            });
        }

        private reqMailDetail(mailType: number, mailId: string) {
            Game.PlayerMailSystem.getMailDetail(mailType, [mailId]);
        }

        private reqMailRead(ids: string[]) {
            if (!this.mailData) return;
            Game.PlayerMailSystem.getMailDetail(this.mailType, ids).then(() => {
                Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReadCount = 0;
                for (let v of this.mailData) {
                    v.is_read = true;
                }
                this.setInfoList();
                Tips.SetTipsOfMail();
            });
        }

        private reqMailGetAttach(ids: string[]) {
            if (!this.mailData) return;
            Game.PlayerMailSystem.saveAttachment(this.mailType, ids).then((gameInfo: message.GameInfo) => {
                Game.PlayerMailSystem.mailboxInfo[this.mailType - 1].unReward = 0;
                for (let v of this.mailData) {
                    v.is_attachment = true;
                }
                Tips.SetTipsOfMail();

                let goods = PlayerItemSystem.MergeItem(gameInfo.getGoods);
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(goods);
                        dialog.setCB(this.setInfoList);
                    });
            });
        }

        private onBtnClose() {
            let anchorOffsetX = 0;
            let anchorOffsetY = 0;
            let x = this.groupMailX + anchorOffsetX;
            let y = this.groupMailY + anchorOffsetY;
            egret.Tween.get(this.imgBackground).to({ alpha: 0 }, 100);
            egret.Tween.get(this.groupMail).to({ x: x, y: y, anchorOffsetX: anchorOffsetX, anchorOffsetY: anchorOffsetY, scaleX: 1.1, scaleY: 1.1 }, 50).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 200).call(() => {
                this.close();
            });
            // this.close(UI.HIDE_TO_TOP);
        }
    }
}