namespace zj {

/**
 * @author chen xi
 * 
 * @date 2018-11-23
 * 
 * @class 猎人升级
 */
export class HunterUpLevel extends Dialog {
    private mainNode: eui.Group;
    private gBottom: eui.Group;
    private head: eui.Group;
    private btnClose: eui.Button;
    private gTop: eui.Group;
    private spriteHeroFrame: eui.Image;
    private spriteHeroHead: eui.Image;
    private labelLevel: eui.Label;
    private spriteBarExpBg: eui.Image;
    private spriteExpBar: eui.Image;
    private labelExpNum: eui.Label;
    private btnLevel: eui.Button;
    private btnLevelX: eui.Button;
    private lableLevelNum: eui.Label;
    private spriteLevel: eui.Image;
    private spriteHunterLevelMax: eui.Image;
    private btnGoUpGrade: eui.Button;
    private gInfo: eui.Group;
    private gInfor: eui.Group;
    /**悬浮框显示 */
    private labelTip: eui.Label;
    private listExpPill: eui.List;
    private generalId: number = 0;
    private callback: Function = null;
    private thisObj: any = null;
    /**最大武将等级*/
    private maxGeneralLevel: number;
    /**当前段位最大等级 */
    private maxStepLevel: number;
    /**经验当前值 */
    private rankCurrent: number;
    /**经验最大值 */
    private rankCrest: number;
    public itemId = null;
    private itemList: Array<HunterUpLevelItemData> = [];
    /**计算经验道具数量用 */
    private propList: Array<message.GoodsInfo> = [];
    /**刷新数据用 */
    private propSend: Array<message.GoodsInfo> = [];
    /**服务器发协议用 */
    private propGoods: Array<message.GoodsInfo> = [];
    /**子项道具图片ID */
    private PROP_INDEX = [30001, 30002, 30003, 30004];
    private MAXLEVEL = 60;
    private LEVELSHOW = 0;
    public popItem: HunterUpLevelItem;
    /**长按道具使用需要的时间*/
    private time: number = 0;
    /**判断长按是否开始 */
    public visStart: boolean = false;
    /**判断长按是否结束 */
    public visOver: boolean = false;

    /**虚假等级 */
    private falseLevel: number;
    /**战力 */
    private oldBattleValue: number;
    /**解决升多级或升一级时动画执行 */
    private viscartoon: boolean = true;
    public canTeach: boolean = false;
    private groupTeach: eui.Group;
    private array: eui.ArrayCollection = new eui.ArrayCollection();
    //判断使用道具是点击list列表还是点击升级按钮
    private vislevel: boolean = false;
    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterUpLevelSkin.exml";
        this.init();
    }

    private init() {
        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.btnLevel.addEventListener(tap, this.onBtnLevel, this);
        this.btnLevelX.addEventListener(tap, this.onBtnLevelX, this);
        this.btnGoUpGrade.addEventListener(tap, this.onBtnGoUpGrade, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }, this);
        this.spriteExpBar.mask = this.spriteBarExpBg;
        for (let i = 0; i < 4; i++) {
            let propfore = new message.GoodsInfo();
            propfore.goodsId = this.PROP_INDEX[i];
            this.propGoods.push(propfore);

            let propone = new message.GoodsInfo();
            propone.goodsId = this.PROP_INDEX[i];
            propone.count = 0;
            this.propSend.push(propone);

            let propThree = new message.GoodsInfo();
            propThree.goodsId = this.PROP_INDEX[i];
            propThree.count = 0;
            this.propList.push(propThree);
        }
    }

    /**主循环 */
    private update() {
        if (this.visOver == false) return;

        if (this.visStart == true) {
            this.time++;
            if (this.time > 3) {
                if (this.falseLevel >= this.maxStepLevel) {
                    this.visStart = false;
                } else {
                    this.rankCurrent += Number((PlayerItemSystem.Table(this.PROP_INDEX[this.itemId]) as any).general_exp);//当前经验加使用道具获得的经验

                    //加道具使用量
                    this.itemList[this.itemId].count++;
                    this.propSend[this.itemId].count++;

                    //刷新数据
                    this.setPropUseOne();
                    this.countProgressbar();

                    //计算进度条
                    this.labelExpNum.text = this.rankCurrent + "/" + this.rankCrest;
                    let generalLevel = this.falseLevel;
                    let generalInfo = PlayerHunterSystem.Table(this.generalId);
                    let levelString = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.Upgrade_NameLv, generalInfo.general_name, generalLevel, this.maxStepLevel);
                    this.labelLevel.text = levelString;
                    this.spriteBarExpBg.x = this.spriteExpBar.x - this.spriteBarExpBg.width + this.spriteBarExpBg.width * this.rankCurrent / this.rankCrest;

                    //道具动画
                    this.runShow();
                    this.time = 0;
                }
            }
        } else {
            this.setPropUseEnd(this.itemId);
            this.visOver = false;
        }
    }

    /**计算进度条 */
    private countProgressbar() {
        if (this.rankCurrent > this.rankCrest) {
            this.rankCurrent -= this.rankCrest;
            this.falseLevel++;
            this.rankCrest = TableLevel.Item(this.falseLevel).general_exp[0];
            // let [expNow, expNext,_] = PlayerHunterSystem.Exp(this.generalId);
            // let experienceString;
            // if (this.falseLevel == this.maxGeneralLevel && this.rankCrest == this.rankCurrent) {
            //     experienceString = TextsConfig.TextsConfig_HeroMain.level_max;
            //     this.labelExpNum.text = experienceString;
            // }
            this.countProgressbar();
        }
    }

    /**悬浮框缓动动画 */
    private runAni() {
        let off = 4 + 2 * Math.random();
        egret.Tween.get(this.gInfor)
            .to({ y: off }, (2.5 - 0.5 * Math.random()) * 1000, egret.Ease.sineInOut)
            .to({ y: -off }, (2.5 - 0.5 * Math.random()) * 1000, egret.Ease.sineInOut)
            .wait(0.5 * Math.random() * 1000)
            .call(() => {
                this.runAni();
            }, this);
    }

    private item_list: Array<HunterUpLevelItem> = [];

    private getItemList() {
        for (let i = 0; i < 4; i++) {
            let item = this.listExpPill.getElementAt(i) as HunterUpLevelItem;
            this.item_list.push(item);
        }
    }

    /**加载列表 */
    private loadList() {
        for (let i = 0; i < 4; i++) {
            let data = new HunterUpLevelItemData();
            data.index = i;
            data.count = 0;
            data.iconId = this.PROP_INDEX[i];
            data.father = this;
            this.array.addItem(data);
            this.itemList.push(data);
        }


        this.listExpPill.dataProvider = this.array;
        this.listExpPill.itemRenderer = HunterUpLevelItem;
        this.listExpPill.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBtnList, this);
    }

    public setInfo(generalId: number, cb: Function, thisObj: any) {
        this.generalId = generalId;
        this.callback = cb;
        this.thisObj = thisObj;
        this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
        let hunter = Game.PlayerHunterSystem.queryHunter(generalId);
        this.falseLevel = Game.PlayerHunterSystem.queryHunter(generalId).level;
        if (hunter.break_level != 0 && hunter.level >= 60) {
            let [_, levelNext] = PlayerHunterSystem.GetBreakHunterLevel(hunter.break_level);
            this.maxGeneralLevel = 60 + levelNext;
            this.maxStepLevel = this.maxGeneralLevel;
        } else {
            this.maxGeneralLevel = TableGeneralStep.Item(CommonConfig.general_max_quality).max_level;
            this.maxStepLevel = PlayerHunterSystem.GetStep(generalId).max_level;
        }
        this.loadList();
        this.refreshInfo();
        this.SetInfoTeach();
    }

    /**点击列表相应 */
    private onBtnList(e: eui.ItemTapEvent) {
        /**判断武将当前等级是否小于最大等级 */
        if (Game.PlayerHunterSystem.queryHunter(this.generalId).level < this.maxStepLevel) {
            if (Game.PlayerItemSystem.itemCount(this.PROP_INDEX[e.itemIndex]) == 0) {
                loadUI(Common_OutPutDialog)
                    .then((dialog: Common_OutPutDialog) => {
                        dialog.setInfo(this.PROP_INDEX[e.itemIndex], this, () => {
                            this.refreshInfo();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                this.itemId = e.itemIndex;
                this.vislevel = false;
                this.popItem = this.listExpPill.getElementAt(e.itemIndex) as HunterUpLevelItem;
                if (this.visOver == false) {
                    for (let i = 0; i < 4; i++) {
                        this.itemList[i].count = 0;
                    }
                    this.itemList[e.itemIndex].count += 1;
                    this.setPropUseEnd(e.itemIndex);
                    this.itemList[e.itemIndex].count = 0;
                }
            }
        } else {
            toast_warning(TextsConfig.TextsConfig_Error.step_level_max);

        }
    }

    private SetInfoTeach() {
        let generalInfo = TableBaseGeneral.Item(this.generalId % CommonConfig.general_id_to_index_multiple);
        //可升级
        let hunter = Game.PlayerHunterSystem.queryHunter(this.generalId);
        let generalLevel = hunter.level;
        let cond2 = generalLevel < this.maxStepLevel;
        this.canTeach = cond2;
    }

    /**刷新信息*/
    private refreshInfo() {

        /**显示头像边框 */
        let framePath = PlayerHunterSystem.Frame(this.generalId);
        this.spriteHeroFrame.source = cachekey(framePath, this);

        /**显示头像 */
        let headPath = PlayerHunterSystem.Head(this.generalId);
        if(Device.isReviewSwitch && Util.isWxMiniGame()) {
            this.spriteHeroHead.source = cachekey("wx_" + headPath, this);
        }else{
            this.spriteHeroHead.source = cachekey(headPath, this);
        }

        /**获取武将信息*/
        let hunter = Game.PlayerHunterSystem.queryHunter(this.generalId);

        /**武将等级 */
        let levelString;
        let generalLevel = hunter.level;
        let generalInfo = PlayerHunterSystem.Table(this.generalId);
        levelString = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.Upgrade_NameLv, generalInfo.general_name, generalLevel, this.maxStepLevel);
        this.labelLevel.text = levelString;

        /**武将经验值 */
        let [expNow, expNext, _] = PlayerHunterSystem.Exp(this.generalId);
        let experienceString;
        if (generalLevel == this.maxGeneralLevel && expNow == expNext) {
            experienceString = TextsConfig.TextsConfig_HeroMain.level_max;
        } else {
            experienceString = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.Upgrade_Exp, expNow, expNext);
        }
        this.labelExpNum.text = experienceString;

        /**显示进度条 */
        let [nexpNow, nexpNext] = experienceString.split("/");
        this.rankCurrent = Number(nexpNow);
        this.rankCrest = Number(nexpNext);
        this.spriteBarExpBg.x = this.spriteExpBar.x - this.spriteBarExpBg.width + this.spriteBarExpBg.width * this.rankCurrent / this.rankCrest;

        /**等级判断 */
        let b_max: boolean;
        /**猎人突破等级上限 */
        let stepLevel: number;
        if (hunter.break_level != CommonConfig.general_max_break) {
            stepLevel = PlayerHunterSystem.GetBreakHunterLevel(hunter.break_level + 1)[1];
        } else {
            stepLevel = PlayerHunterSystem.GetBreakHunterLevel(hunter.break_level)[1];
        }
        if (hunter.level < 60) {
            b_max = hunter.level >= this.maxGeneralLevel;//当前武将等级是否大于最大武将等级
        } else {
            b_max = (hunter.level >= this.MAXLEVEL + stepLevel) || (hunter.level >= this.MAXLEVEL + stepLevel);
        }           //当前武将等级>=60级+突破等级上线                 //突破等级>= 60级+突破等级上限  

        /**最大武将等级>当前武将等级 并且 最大武将等级不等于突破等级 */
        let toTopLevel = (this.maxStepLevel > hunter.level) && (this.maxStepLevel != hunter.break_level);
        /**武将等级是否大于等于0 */
        let blevel = generalLevel >= this.LEVELSHOW;
        if (b_max) {
            this.gInfo.visible = false;//前往进阶按钮与说明悬浮框
            this.btnLevel.visible = false;//升一级按钮
            this.btnLevelX.visible = false;//升多级按钮
            this.lableLevelNum.visible = false;//升多级按钮上数字
            this.spriteLevel.visible = false;//长按道具图标可连续使用图片
            this.spriteHunterLevelMax.visible = true;//已满级图片
        } else if (hunter.level >= 60 && this.maxGeneralLevel >= 60) {
            if (toTopLevel) {
                this.gInfo.visible = false;
                this.btnLevel.visible = blevel;
                this.btnLevelX.visible = blevel;
                this.lableLevelNum.visible = blevel;
                this.spriteLevel.visible = !blevel;
                this.spriteHunterLevelMax.visible = false;
            } else {
                this.gInfo.visible = true;
                this.runAni();
                this.btnLevel.visible = false;
                this.btnLevelX.visible = false;
                this.lableLevelNum.visible = false;
                this.spriteLevel.visible = false;
                this.btnGoUpGrade.visible = false;//前往进阶按钮
                this.spriteHunterLevelMax.visible = false;
                this.labelTip.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.GradeAndBreak, hunter.break_level + 1, this.MAXLEVEL + stepLevel));
            }
        } else {
            if (toTopLevel) {
                this.gInfo.visible = false;
                this.btnLevel.visible = blevel;
                this.btnLevelX.visible = blevel;
                this.lableLevelNum.visible = blevel;
                this.spriteLevel.visible = !blevel;
            } else {
                this.gInfo.visible = true;
                this.runAni();
                this.btnLevel.visible = false;
                this.btnLevelX.visible = false;
                this.labelExpNum.visible = true;//进度条上显示的当前经验值与最大经验值
                this.spriteLevel.visible = false;
                console.log(PlayerHunterSystem.GetStep(this.generalId).general_step);

                let [step, level] = PlayerHunterSystem.UpLevelNeedGrade(PlayerHunterSystem.GetStep(this.generalId).general_step);
                this.labelTip.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.GradeAndLevel, step, level));
                console.log(Helper.StringFormat("<color>r=8059647,g=8059647,b=8059647</color><text>初级猎人</text>"))
            }
            this.spriteHunterLevelMax.visible = false;
        }

        /**虚假等级刷新 */
        this.falseLevel = Game.PlayerHunterSystem.queryHunter(this.generalId).level;

        /**升多级按钮上数字*/
        let maxlevel: number = 0;
        if (this.maxStepLevel - Game.PlayerHunterSystem.queryHunter(this.generalId).level >= 5) {
            maxlevel = 5;
        } else {
            maxlevel = this.maxStepLevel - Game.PlayerHunterSystem.queryHunter(this.generalId).level;
        }
        this.lableLevelNum.text = String(maxlevel);
    }

    /**关闭弹窗*/
    private onBtnClose() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.close(UI.HIDE_TO_TOP);
    }

    /**升一级*/
    private onBtnLevel() {
        this.getItemList();
        if (Game.PlayerHunterSystem.queryHunter(this.generalId).level < this.maxStepLevel) {
            this.itemList = this.countExperienceProp(this.rankCrest - this.rankCurrent);
            if (this.itemList[0].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[0]) &&
                this.itemList[1].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[1]) &&
                this.itemList[2].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[2]) &&
                this.itemList[3].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[3])) {
                if (this.itemList[0].count == 0 && this.itemList[1].count == 0 && this.itemList[2].count == 0 && this.itemList[3].count == 0) {
                    toast_warning(TextsConfig.TextsConfig_Error.upgrade_not_enough);
                    return;
                }
                for (let j = 0; j < 4; j++) {
                    if (this.itemList[j].count != 0) {
                        this.setPropUseEnd(j);
                        this.itemId = j;
                        this.vislevel = true;
                        this.popItem = this.listExpPill.getElementAt(j) as HunterUpLevelItem;
                        this.itemList[j].count = 0;
                    }
                }

            }
        }
        this.viscartoon = false;
    }

    /**计算经验道具 */
    private countExperienceProp(experience) {
        //k 前数组下标 v 前数组物品编号
        let prop = Table.InitF(this.PROP_INDEX, (_, v: number) => {
            let goodsId = v;
            let count = 0;
            let index = PlayerItemSystem.Count(v);
            let showType = 0;
            let overdueTime = 0;
            let a = (PlayerItemSystem.Table(v) as any);
            let experience = Number(a.general_exp);
            return { "goodsId": goodsId, "count": count, "index": index, "showType": showType, "overdueTime": overdueTime, "experience": experience };
        });

        let bFull = false;
        let count = 0;
        for (let k in prop) {
            if (prop.hasOwnProperty(k)) {
                let v = prop[k];
                for (let i = 0; i < v.index; i++) {
                    let j = v[i];
                    if (v.experience + count <= experience) {
                        v.count = v.count + 1;
                        count = count + v.experience;
                    } else {
                        v.count = v.count + 1;
                        bFull = true;
                    }
                    if (bFull) {
                        break;
                    }
                }
            }
            if (bFull) {
                break;
            }
        }
        for (let k = 0; k < prop.length; k++) {
            let v = prop[k];
            v.index = 0;
            v.experience = null;
        }
        return prop;
    }

    /**升多级*/
    private onBtnLevelX() {
        if (Game.PlayerHunterSystem.queryHunter(this.generalId).level < this.maxStepLevel) {
            let maxLevel = Math.min(this.maxStepLevel, this.maxGeneralLevel);
            let [experienceNow, experienceNext] = PlayerHunterSystem.ExpFive(this.generalId, maxLevel);
            this.itemList = this.countExperienceProp(experienceNext - experienceNow);
            if (this.itemList[0].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[0]) &&
                this.itemList[1].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[1]) &&
                this.itemList[2].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[2]) &&
                this.itemList[3].count <= Game.PlayerItemSystem.itemCount(this.PROP_INDEX[3])) {
                if (this.itemList[0].count == 0 && this.itemList[1].count == 0 && this.itemList[2].count == 0 && this.itemList[3].count == 0) {
                    toast_warning(TextsConfig.TextsConfig_Error.upgrade_not_enough);
                    return;
                }
                for (let j = 0; j < 4; j++) {
                    if (this.itemList[j].count != 0) {
                        this.setPropUseEnd(j);
                        this.itemId = j;
                        this.vislevel = true;
                        this.popItem = this.listExpPill.getElementAt(j) as HunterUpLevelItem;
                        this.itemList[j].count = 0;
                    }
                }

            }
        }
        this.viscartoon = false;
    }

    /**前往进阶*/
    private onBtnGoUpGrade() {
        if (this.callback) {
            this.callback.call(this.thisObj, false, true);
        }
        this.close(UI.HIDE_TO_TOP);
    }

    /**发送请求 */
    private setPropUseEnd(itemId) {
        if (this.itemList[itemId].count != 0) {
            for (let i = 0; i < 4; i++) {
                this.propGoods[i].count = 0;
            }
            if (this.visOver == false) {
                this.propSend[itemId].count += this.itemList[itemId].count;
            }
            this.propGoods[itemId].count = this.itemList[itemId].count;
            this.requsteExperienceUpdate();
        }
    }

    /**刷新list子类信息 */
    private setPropUseOne() {

        //声音
        Game.SoundManager.playEffect("ui_wujiang_shengji_mp3", 500);
        //刷新数字
        if (this.vislevel == true) {
            for (let i = 0; i < 4; i++) {
                this.popItem = this.listExpPill.getElementAt(i) as HunterUpLevelItem;
                if (this.popItem) {
                    this.popItem.setInfoUsed(this.propSend[i].count);
                    if (this.visOver == false) {
                        this.popItem.updateView(this.popItem.data);
                    } else {
                        this.popItem.labelNum.text = String(Number(this.popItem.labelNum.text) - 1);
                    }
                }
            }
        } else {
            if (this.popItem) {
                this.popItem.setInfoUsed(this.propSend[this.itemId].count);
                if (this.visOver == false) {
                    this.popItem.updateView(this.popItem.data);
                } else {
                    this.popItem.labelNum.text = String(Number(this.popItem.labelNum.text) - 1);
                }
                // 动画
                this.runShow();
            }
        }

        /**升多级按钮上数字*/
        let maxlevel: number = 0;
        if (this.maxStepLevel - Game.PlayerHunterSystem.queryHunter(this.generalId).level >= 5) {
            maxlevel = 5;
        } else {
            maxlevel = this.maxStepLevel - Game.PlayerHunterSystem.queryHunter(this.generalId).level;
        }
        this.lableLevelNum.text = String(maxlevel);
    }

    /**动画 */
    private runShow() {
        if (this.viscartoon == false) {
            this.viscartoon = true;
            return;
        }
        let img = new egret.Bitmap;
        img.texture = RES.getRes(String(this.popItem.getSpriteIcon().source));
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height / 2;
        img.x = this.mainNode.x + this.gBottom.x + this.itemId * 178 + 50 + img.width / 2;
        img.y = this.mainNode.y + this.gBottom.y + 25 + img.height / 2;
        this.addChild(img);
        egret.Tween.get(img).wait(100).to({ scaleX: 0.3, scaleY: 0.3, x: this.mainNode.x + this.gTop.x + this.head.x + this.spriteHeroHead.x + 40, y: this.mainNode.y + this.gTop.y + this.head.y + this.spriteHeroHead.y + 30 }, this.itemId * 50 + 200)
            .to({ scaleX: 3, scaleY: 3, alpha: 0 }, 200).call(() => { this.removeChild(img) });
    }

    /**该向服务器发协议了*/
    private requsteExperienceUpdate() {
        let level = Game.PlayerHunterSystem.queryHunter(this.generalId).level;
        let oldValue = this.oldBattleValue;
        let p = Game.PlayerHunterSystem.requsteExperienceUpdate(this.generalId, this.propGoods);
        p.then(() => {
            if (this.callback) {
                this.callback.call(this.thisObj, true, false);
            }
            this.refreshInfo();
            this.setPropUseOne();
            this.array.refresh();
            let newValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            if (level != Game.PlayerHunterSystem.queryHunter(this.generalId).level) {
                this.promptLevel(oldValue, newValue);
            }
        });
        p.catch((reason) => {
            toast(reason);
        })
    }

    /**提示升级成功 */
    private promptLevel(oldValue: number, newValue: number) {
        let source = cachekey(UIConfig.UIConfig_Hunter.common_hint[5], this);
        let image = new eui.Image(source);
        Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
            armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
            }, this)
            // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            //     armatureDisplay.animation.stop();
            //     armatureDisplay.animation.reset();
            //     armatureDisplay.armature.dispose();
            //     armatureDisplay.dbClear();
            //     armatureDisplay.dispose(true);
            //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
            // }, null);
            armatureDisplay.animation.play("000_tishi", 1);
            armatureDisplay.x = this.gTop.width * 0.5;
            armatureDisplay.y = this.gTop.height * 0.3;
            this.gTop.addChild(armatureDisplay);

            CommonTipBmfont.promptBattleValue(oldValue, newValue);

            if (this.callback) this.callback();
        });
    }
}

}