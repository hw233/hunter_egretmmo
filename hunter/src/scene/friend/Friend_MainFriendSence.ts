namespace zj {
//Friend_MainFriendSence
//wangshenzhuo
// 2019/03/21
export class Friend_MainFriendSence extends Scene {

    public imageBackground: eui.Image;
    public buttonFriend: eui.Button;
    public buttonEnemy: eui.Button;
    public buttonClose: eui.Button;
    public labelTextCnt: eui.Label;
    public labelTextPower: eui.Label;
    public buttonAdd: eui.Button;
    public buttonApply: eui.Button;
    public buttonSend: eui.Button;
    public buttonGet: eui.Button;
    public imageTipApply: eui.Image;
    public listTableView: eui.List;
    public imageNoFriend: eui.Image;
    public imageTipFriend: eui.Image;
    public imageTipGet: eui.Image;
    public groupMain: eui.Group;
    public imageRect: eui.Image;
    private groupShow: eui.Group;

    public relationType: number;

    public buttonNames = [];
    public relationMap = [];
    public roleIds_get = [];
    public roleIds_send = [];

    public scrollerInfo: eui.Scroller;
    public moveLocation: number = 0;		//列表下拉移动位置
    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;

    public first: boolean;
    public focusCur: number;
    public focusLast: number;
    public popYY: number;
    public newpower: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/friend/Friend_MainFriendSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSend, this);
        this.buttonGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGet, this);
        this.buttonApply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonApply, this);
        this.buttonFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonFriend, this);
        this.buttonEnemy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonEnemy, this);
        this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAdd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchUplistTable, this);
        Game.EventManager.on(GameEvent.FRIEND_TOPPOP_REMOVE, this.touchUplistTable, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.FRIEND_TOPPOP_REMOVE, this.touchUplistTable, this);
        }, null);
        this.imageRect.visible = false;
        this.imageTipGet.visible = false;
        this.imageTipApply.visible = false;
        if (this.width >= 1344) {
            this.imageBackground.scaleX = this.width / 1334;
        }

    }

    public init() {
        this.openMode();
        this.buttonNames = ["Friend", "Enemy"];
        this.ButtonDelegate(this.buttonNames[0]);
        this.first = true;
        this.buttonEnemy.enabled = true;
        this.buttonFriend.enabled = false;
    }

    public openMode() {
        this.imageBackground.visible = true;
        this.groupShow.anchorOffsetX = 0;
        this.groupShow.anchorOffsetY = this.groupShow.height / 2;
        this.groupShow.x = (UIManager.StageWidth - this.groupShow.width) / 2 + this.groupShow.anchorOffsetX;
        this.groupShow.y = (UIManager.StageHeight - this.groupShow.height) / 2 + this.groupShow.anchorOffsetY;
        this.groupShow.scaleX = 0;
        this.groupShow.scaleY = 0;
        egret.Tween.get(this.groupShow).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        // this.groupMain.sca
    }

    private ButtonDelegate(name) {
        this.relationType = StringConfig_TagType.friend[name];
        PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
            setTimeout(() => {
                this.SetInfo()
            }, 200)
        }).catch(reason => { });


    }

    public SetInfo() {
        this.LoadList();
        this.SetDes();
        // this.SetButtonState();
    }
    public SetRoleIds() {
        this.roleIds_get = [];
        this.roleIds_send = [];
        for (let i = 0; i < this.relationMap.length; i++) {
            if (this.relationMap[i].canReward && this.relationMap[i].isReward == false) {
                this.roleIds_get.push(this.relationMap[i].roleInfo.id);
            }
            if (Game.PlayerRelateSystem.givepower()[this.relationMap[i].roleInfo.id] == null) {
                this.roleIds_send.push(this.relationMap[i].roleInfo.id);
            }
        }
    }

    public SetDes() {
        let des = TextsConfig.TextConfig_Relation.mainDes1[this.relationType - 1];
        this.labelTextCnt.text = Helper.StringFormat(des, this.relationMap.length, PlayerVIPSystem.Level().relation_count);
        this.labelTextPower.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.mainDes2, Game.PlayerVIPSystem.vipInfo.rewardPower, PlayerVIPSystem.Level().reward_power);

        this.imageTipFriend.visible = false;

        this.imageTipApply.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND, 2);
        if (Game.PlayerRelateSystem.relateResp.applys.length == 0) {
            this.imageTipApply.visible = false;
        } else {
            this.imageTipApply.visible = true;
        }
        // this.imageTipGet.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND, 1);
    }

    public LoadList(data_only?) {
        if (this.relationType == StringConfig_TagType.friend[this.buttonNames[0]]) {
            this.relationMap = PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, PlayerRelateSystemSORT.MAIN);
            if (this.relationMap.length == 0) {
                this.imageNoFriend.visible = true;
            } else {
                this.imageNoFriend.visible = false;
            }
            this.SetRoleIds();
        } else if (this.relationType == StringConfig_TagType.friend[this.buttonNames[1]]) {
            this.relationMap = PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_ENEMY, PlayerRelateSystemSORT.MAIN);
            this.imageNoFriend.visible = false;
        }

        if (data_only) {
            return;
        }
        this.imageTipGet.visible = false;
        this.listTableView.selectedIndex = -1; // 默认选中
        this.listTableView.itemRenderer = Friend_MainFriendItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < this.relationMap.length; i++) {
            let data = new Friend_MainFriendItemData();
            data.father = this;
            data.index = i;
            this.TableViewItem.addItem(data);
        }

        this.listTableView.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.listTableView.selectedIndex;

        this.scrollerInfo.viewport = this.listTableView;
        this.scrollerInfo.validateNow();
        this.scrollerInfo.viewport.scrollV = this.moveLocation;

        this.focusCur = 0;
        this.focusLast = this.focusCur;
        this.first = false;
    }

    public onlistTableView() {
        if (this.TableViewIndex != this.listTableView.selectedIndex) {
            this.TableViewItem.itemUpdated(this.TableViewItem.source[this.TableViewIndex]);
            this.TableViewItem.itemUpdated(this.TableViewItem.source[this.listTableView.selectedIndex]);
            this.TableViewIndex = this.listTableView.selectedIndex;
        }

        let pop = this.groupMain.getChildByName("pop");
        if (pop) {
            this.groupMain.removeChild(pop);
        } else {

            this.friendpop();
        }
    }

    private friendpop() {

        let pop = new Friend_MyFriendPop();
        pop.name = "pop";
        this.groupMain.addChild(pop);
        this.imageRect.visible = true;
        this.popYY = 200 + 100 * this.TableViewIndex - this.moveLocation;
        if (this.popYY + pop.height / 2 > this.groupMain.y + this.groupMain.height) {
            this.popYY = this.groupMain.y + this.groupMain.height / 2;
        }
        pop.SetInfo(this.relationMap[this.TableViewIndex], this, this.TableViewIndex, this.groupMain.width / 2 - pop.width / 2, this.popYY);
        this.scrollerInfo.viewport = this.listTableView;
        this.scrollerInfo.validateNow();
        this.moveLocation = this.scrollerInfo.viewport.scrollV;
    }

    public touchUplistTable() {
        let pop = this.groupMain.getChildByName("pop");
        if (pop) {
            this.groupMain.removeChild(pop);
            this.imageRect.visible = false
        }
    }

    private SetButtonState() {
        for (const k in this.buttonNames) {
            const v = this.buttonNames[k];
            if (Number(k) == this.relationType) {
                this["button" + v].touchEnabled = false;
            } else {
                this["button" + v].touchEnabled = true;
            }
        }
    }

    private onButtonFriend() {
        Game.PlayerRelateSystem.relationInfo();
        this.ButtonDelegate(this.buttonNames[0]);
        this.buttonEnemy.enabled = true;
        this.buttonFriend.enabled = false;
    }

    private onButtonEnemy() {
        Game.PlayerRelateSystem.relationInfo();
        this.ButtonDelegate(this.buttonNames[1]);
        this.buttonEnemy.enabled = false;
        this.buttonFriend.enabled = true;
    }

    private onButtonAdd() {
        loadUI(Friend_AddFriend)
            .then((dialog: Friend_AddFriend) => {
                dialog.Init();
                dialog.SetFather(this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonGet() {
        this.newpower = Game.PlayerInfoSystem.BaseInfo.power;
        if (this.relationType == message.ERelationType.RELATION_TYPE_FRIEND) {
            if (this.roleIds_get.length == 0) {
                toast_warning(TextsConfig.TextsConfig_Friend.canGetNone);
            } else {
                PlayerRelateSystem.RelationRewardPower_Req(this.roleIds_get)
                    .then((data: any) => {
                        let a = this.relationMap.length;
                        setTimeout(() => {
                            for (let i = 0; i < this.relationMap.length; i++) {
                                this.relationMap[i].canReward = false;
                            }
                            // Tips.SetTipsOfId(Tips.TAG.FRIEND, 1);
                            // this.imageTipGet.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND, 1);
                            this.SetInfo();
                            Common_Tip.AddTip(TextsConfig.TextsConfig_Friend.getSuccess, this.height, this.width);
                            setTimeout(() => {
                                let powerDt = Game.PlayerInfoSystem.BaseInfo.power - this.newpower;
                                Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Friend.getPower, powerDt), this.height, this.width);
                            }, 1000)
                        }, 800)
                    })
                    .catch(reason => { });
            }
        } else {
            toast_success(TextsConfig.TextsConfig_Friend.getOnly);
        }
        this.SetInfo();
    }


    private onButtonSend() {
        if (this.relationType == message.ERelationType.RELATION_TYPE_FRIEND) {
            if (PlayerRelateSystem.Count(message.ERelationType.RELATION_TYPE_FRIEND) == 0) {
                toast_warning(TextsConfig.TextsConfig_Friend.noFriend);
            } else if (this.roleIds_send.length == 0) {
                toast_warning(TextsConfig.TextsConfig_Friend.canSendNone);
            } else {
                PlayerRelateSystem.RelationGivePower_Req(this.roleIds_send)
                    .then((data: any) => {
                        setTimeout(() => {
                            this.SetRoleIds();
                            this.SetInfo();
                        }, 800);

                    }).catch(reason => { toast_warning(reason) });
            }
        } else {
            toast_success(TextsConfig.TextsConfig_Friend.sendOnly);
        }
        this.SetInfo();
    }

    private onButtonApply() {
        PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
            loadUI(Friend_Application)
                .then((dialog: Friend_Application) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.SetInfo();
                    dialog.SetFather(this);
                });
        }).catch(reason => { toast_warning(reason) });
    }

    private onButtonClose() {
        PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
            // if (this.imageTipApply.visible == true || this.imageTipGet.visible == true) {
            //     Game.PlayerRelateSystem.TipFirend = true;
            // } else {
            //     Game.PlayerRelateSystem.TipFirend = false;
            // }
            this.closeMode();
        })
    }

    public closeMode() {
        this.groupShow.anchorOffsetX = 0;
        this.groupShow.anchorOffsetY = this.groupShow.height / 2;
        this.groupShow.x = (UIManager.StageWidth - this.groupShow.width) / 2 + this.groupShow.anchorOffsetX;
        this.groupShow.y = (UIManager.StageHeight - this.groupShow.height) / 2 + this.groupShow.anchorOffsetY;
        this.groupShow.scaleX = 1;
        this.groupShow.scaleY = 1;
        egret.Tween.get(this.groupShow).to({ scaleX: 0.1, scaleY: 0.1 } , 250 , egret.Ease.backIn).call(()=>{
            this.close();
        })
    }

}

}