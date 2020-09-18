namespace zj {
    export class onTouchAddStep extends egret.EventDispatcher {
        public constructor() {
            super();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                Teach.addTeaching();
            }, this);
        }
    }

    /**副本跳转猎人 */
    export class onTouchToHero extends egret.EventDispatcher {
        public constructor(cb?: () => void) {
            super();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                loadUI(HunterMainScene)
                    .then((scene: HunterMainScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        if (cb) {
                            cb();
                            cb = null;
                        }
                    });
                Teach.addOperateTeachStep();
            }, this);
        }
    }

    /**
     * 新手引导主逻辑
     * created by Lian Lei
     */
    export class Teach_diff {
        private static _ID_XIAOJIE = 10032;
        private static _ID_WUTONG = 10053;
        private static _ID_SACI = 10006;
        private static _ID_KATE = 10005;
        private static _ID_KULAPIKA = 10034;
        private static _ID_BANZANG = 10008;


        /**教学操作 */
        public static OperateTeach(roleType_: number, curPart_: number, curStep_: number, leaderX_: number) {
            Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
            console.log("——————————————————新手引导ID + step:  " + "curPart:" + curPart_ + ", curStep:" + curStep_ + "——————————————————————");
            if (curPart_ == 3013) { // 通关1-4，小杰，进阶
                if (curStep_ < 6) {
                    Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) {
                    let ui: any;
                    if (zj.Game.UIManager.topDialog() == null) {
                        ui = zj.Game.UIManager.topScene();
                    }
                    else {
                        ui = zj.Game.UIManager.topDialog();
                    }
                    if (egret.getQualifiedClassName(ui) != "zj.HunterMainScene") {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (PlayerHunterSystem.GetGeneralId(ui['generalId']) != this._ID_XIAOJIE) return;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) { // 点击详情
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['rectMask'].visible = true;
                    if (ui['btnMainDetail'].visible) {
                        setTimeout(function () {
                            Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        }, 400);
                        setTimeout(function () {
                            ui['rectMask'].visible = false;
                            Teach.openUiName = "zj.HunterDetail";
                            return;
                        }, 700);
                    }
                    else {
                        return;
                    }
                }
                else if (curStep_ == 8) { // 详情界面出现
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) { // 锁定框
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 200);
                }
                else if (curStep_ == 10) { // 点击安装羁绊卡
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true
                        return;
                    }
                    let generalsMap: { [id: number]: message.GeneralInfo } = zj.Game.PlayerHunterSystem.allHuntersMap();
                    if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](3) == true) {
                        if (ui['btnFate3'].enabled) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFate3'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate3']);
                            Teach.addOnceEvent((<eui.Button>ui['btnFate3']));
                        }
                        else {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFate3'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate3']);
                            Teach.addOnceEvent((<eui.Button>ui['btnFate3']));
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(12);
                    }
                }
                else if (curStep_ == 11) { //聚焦激活按钮
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true
                        return;
                    }
                    setTimeout(function () {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnActive']);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnActive'], true, true, false, 1, 0.7, false, false);
                        Teach.addOnceEvent(ui['btnActive']);
                    }, 100);
                }
                else if (curStep_ == 12) { // 点击安装羁绊卡2
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true
                        return;
                    }
                    let generalsMap: { [id: number]: message.GeneralInfo } = zj.Game.PlayerHunterSystem.allHuntersMap();
                    if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](4) == true) {
                        if (ui['btnFate4'].enabled) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFate4'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate4']);
                            Teach.addOnceEvent((<eui.Button>ui['btnFate4']));
                        }
                        else {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFate4'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate4']);
                            Teach.addOnceEvent((<eui.Button>ui['btnFate4']));
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(14);
                    }
                }
                else if (curStep_ == 13) { // 聚焦激活按钮
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true
                        return;
                    }
                    setTimeout(function () {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnActive']);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnActive'], true, true, false, 1, 0.7, false, false);
                        Teach.addOnceEvent(ui['btnActive']);
                    }, 100);
                }
                else if (curStep_ == 14) { // 对话
                    Teach.addMask();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 15) { // 点击进阶按钮
                    // Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    Teach.addMask();
                    setTimeout(function () {
                        let generalsMap: { [id: number]: message.GeneralInfo } = zj.Game.PlayerHunterSystem.allHuntersMap();
                        if (generalsMap[ui['generalId']].step < 1 && ui['btnPromtion'].enabled == true && zj.Game.PlayerInfoSystem.BaseInfo.money >= Number(ui['labelGold'].text)) {
                            Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnPromtion'], true, true, false, 1, 0.7, false, false, true);
                            if (ui['btnPromtion'].enabled) {
                                Teach.addOnceEvent(ui['btnPromtion']);
                            }
                            else {
                                ui['btnPromtion'].once(egret.TouchEvent.TOUCH_TAP, () => {
                                    Teach.setOperateTeachStep(22);
                                }, null);
                            }
                        }
                        else {
                            Teach.removeMask();
                            Teach.SaveTeachPart();
                            Teach.SaveTeachPartLocal(curPart_);
                            Teach.setOperateTeachStep(21);
                        }
                    }, 300);
                }
                else if (curStep_ == 16) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 17) { // 锁定进阶界面
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterUpAdvanced");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterUpAdvanced";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }

                    if (ui['groupAttributes'].visible == true) {
                        setTimeout(function () {
                            Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['mainGroup'], true, true, false, 0, 0.7, false, false, true);
                            ui.once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                                Teach.addOperateTeachStep();
                            }, null);
                        }, 200);
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 18) { // 技能点
                    zj.Game.UIManager.GroupTeachUI.removeChildren();
                    Teach.setOperateTeachStep(21);
                }
                else if (curStep_ == 19) { // 自动关闭
                    Teach.delTouchTipSpx();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    Teach.removeMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterMainScene");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeSceneName = "zj.HunterMainScene";
                        return;
                    }
                }
                else if (curStep_ == 21) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(true);
                }
            }
            else if (curPart_ == 1003) { // 格斗场 攻打 上阵
                if (curStep_ < 4) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER, "zj.ArenaMainScene", "btnHunterCambatfield", "rectHunterCambatfield");
                }
                else if (curStep_ == 4) { // 点击本服格斗场进入按钮
                    let [ui, bLoading] = Teach.GetDstUI("zj.ArenaMainScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.ArenaMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnLadder'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnLadder']);
                    Teach.addOnceEvent(ui['btnLadder']);
                }
                else if (curStep_ == 5) { //聚焦列表
                    let [ui, bLoading] = Teach.GetDstUI("zj.ArenaLadder");
                    if (bLoading) {
                        Teach.openDialogName = "zj.ArenaLadder";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['scroll'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 500);
                }
                else if (curStep_ == 6) { // 点击比试
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['getitemList']();
                    if (ui['rivalItems'].length == 0) return;
                    // 是否有攻打次数 是否在冷却中
                    let info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_LADDER];
                    if (ui['buttonState'] != ArenaMainButtonState.ButtonBuy && info != null && info.leftTime > 0) {
                        Teach.SaveTeachPart();
                        Teach.EndCurPart(false);
                        Teach.SaveTeachPartLocal(curPart_);
                    }
                    else {
                        let item = ui['rivalItems'][ui['rivalItems'].length - 1];
                        if (item['btnFight'].visible) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(item['btnFight'], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(item['btnFight']);
                            Teach.addOnceEvent(item['btnFight']);
                        }
                        else {
                            Teach.setOperateTeachStep(18);
                        }
                    }
                }
                else if (curStep_ == 7) { // 上阵界面
                    let ui: any = zj.Game.UIManager.topDialog();
                    Teach.openDialogName = "zj.CommonFormatePveMain";
                    return;
                }
                else if (curStep_ == 8) { // 上阵
                    Teach.addOperateTeachStep();
                }

                else if (curStep_ == 9) {
                    Teach.addOperateTeachStep();
                }

                else if (curStep_ == 10) {
                    Teach.addOperateTeachStep();
                }

                else if (curStep_ == 11) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) { // 聚焦列表
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    Teach.addMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.teachingNow = false;
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        setTimeout(function () {
                            ui['down']['getItemList']();
                            Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                            Teach.Format_ClickIdx(1, null, null);
                        }, 1000);
                    }
                }
                else if (curStep_ == 14) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        Teach.Format_ClickIdx(2, null, null);
                    }, 300);
                }

                else if (curStep_ == 15) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        Teach.Format_ClickIdx(3, null, null);
                    }, 300);
                }

                else if (curStep_ == 16) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        Teach.Format_ClickIdx(4, null, null);
                    }, 300);
                }
                else if (curStep_ == 17) { // 开始战斗
                    let ui: any = zj.Game.UIManager.topDialog(); // CommonFormatePveMain
                    if (zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals[0] == 0) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupFight'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonFight']);
                        Teach.addOnceEvent(ui['ButtonFight']);
                    }
                }
                else if (curStep_ == 18) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1004) { //格斗场商店
                if (curStep_ == 0) { // 打开聚焦武将列表
                    Teach.removeMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.ArenaLadder");
                    if (bLoading) {
                        Teach.openDialogName = "zj.ArenaLadder";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listGeneral'], true, true, false, 0, 0.7, false, false, false, false, [0.7, 0.7]);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 1) { // 聚焦援护列表
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.setOperateTeachStep(14);
                }
                else if (curStep_ == 2) { // 聚焦调整阵容按钮
                    let ui: any = zj.Game.UIManager.topDialog(); // ArenaLadder
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFormat'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFormat']);
                    Teach.addOnceEvent(ui['btnFormat']);
                }
                else if (curStep_ == 3) { // 等待打开上阵界面 聚焦拥有武将列表
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonFormationPvpArena");
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listTableViewMine'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 4) { // 聚焦上阵列表
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupAll'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 5) { // 聚焦确认阵容 
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnConfirimTean'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnConfirimTean']);
                    Teach.addOnceEvent(ui['btnConfirimTean'])
                }
                else if (curStep_ == 6) { // 确认阵容
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.ArenaLadder");
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    if (ui['btnRule'].visible == false) {
                        Teach.setOperateTeachStep(11);
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnRule'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnRule']);
                        Teach.addOnceEvent(ui['btnRule']);
                    }
                }
                else if (curStep_ == 8) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.Common_RuleDialog");
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupView'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 9) { // 聚焦关闭
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btClose']);
                }
                else if (curStep_ == 10) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) { //打开
                    let [ui, bLoading] = Teach.GetDstUI("zj.ArenaLadder");
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnShop'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnShop']);
                    Teach.addOnceEvent(ui['btnShop']);
                }
                else if (curStep_ == 12) { // 聚焦列表
                    let [ui, bLoading] = Teach.GetDstUI("zj.ShopMallDialog");
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listGoods'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 13) { // 聚焦演武币
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) { // 结束
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1005) { // 公会
                if (curStep_ < 4) {
                    // 因为日常任务有跳转 如果网络不好的情况 会导致网络回来打开公会界面延迟
                    // if (GameCommon.IsLock("Net")) return;
                    if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0) {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.EndCurPart(true);
                    }
                    else {
                        if (zj.Game.UIManager.topDialog() == null) {
                            Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, ["zj.LeagueChooseScene", "zj.LeagueMain"], "btnUnion", "rectUnion");
                        }
                        else {
                            Teach.removeMask();
                            Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                            Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }
                }
                else if (curStep_ == 4) { // 聚焦列表
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.LeagueChooseScene") {
                        Teach.ProcTeachStory()
                    }
                    else {
                        Teach.openSceneName = "zj.LeagueChooseScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) { // 打开
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1007) { // 进入贪婪之岛 兑换
                Teach.removeMask();
                Teach.SaveTeachPart();
                Teach.SaveTeachPartLocal(curPart_);
                Teach.EndCurPart(false);
                // Teach.GoWonderland(curStep_, true, (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isSceneMobs || zj.Teach.isDone(zj.teachBattle.teachPartID_WONDER_NPC)), 1, 1007);
            }
            else if (curPart_ == 6003) { // 仙境,和平仙境 采果子+兑换
                // if (curStep_ == 0) {
                //     let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.WonderLandChoose";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (zj.Game.PlayerWonderLandSystem.wonderlandId != 1) {
                //         Teach.setOperateTeachStep(17);
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 1) {
                //     Teach.addMask();
                //     let hasClick = Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isCollectFruit, function (k, v) {
                //         return v == zj.Game.PlayerWonderLandSystem.wonderlandId;
                //     });
                //     if (hasClick) { // --采集过去兑换
                //         Teach.setOperateTeachStep(6);
                //     }
                //     else {
                //         let scene = StageSceneManager.Instance.GetCurScene();
                //         scene.goNearTree();
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 2) {
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                //         Teach.needIsEndAni = true;
                //         return;
                //     }
                //     let tree = scene.getNearTree();
                //     let rect = tree.getVisibleRt();
                //     let xywh: { x: number, y: number, width: number, height: number } = { // 贪婪之岛 圈npc特殊处理
                //         x: rect.x,
                //         y: rect.y - rect.height,
                //         width: rect.width,
                //         height: rect.height
                //     };
                //     Teach.removeMask();
                //     if (Teach.isHaveTip() == true) Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                //     scene.once(egret.TouchEvent.TOUCH_END, () => {
                //         // Teach.bAsyncContinue = true;
                //         Teach.addOperateTeachStep();
                //     }, null);
                // }
                // else if (curStep_ == 3) { // 采果子协议
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     Teach.setStopTeachUpdata(true);
                //     Teach.setTeaching(true);
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 4) { // 确认领取
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.CommonGetDialog";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                //     zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                //     Teach.addOnceEvent(ui['btnClose']);
                // }
                // else if (curStep_ == 5) { // 引导对话
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(ui) != "zj.WonderLandChoose") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(ui);
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                //         Teach.needIsEndAni = true;
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 6) { // 仙境 走向果实兑换者
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     scene.goToNpc(1035);
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 7) { // 聚焦果实兑换者
                //     Teach.addMask();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                //         Teach.needIsEndAni = true;
                //         return;
                //     }
                //     let npc = scene.getNpcById(1035);
                //     if (npc == null) {
                //         Teach.SaveTeachPart(true, teachBattle.teachPartID_WONDER_NPC)
                //         Teach.SaveTeachPart()
                //         Teach.SaveTeachPartLocal(6003);
                //         Teach.setOperateTeachStep(15)
                //     }
                //     else {
                //         let rect = npc.getVisibleRt();
                //         let xywh: { x: number, y: number, width: number, height: number } = { // 贪婪之岛 圈npc特殊处理
                //             x: rect.x,
                //             y: rect.y - rect.height,
                //             width: rect.width,
                //             height: rect.height
                //         };
                //         Teach.removeMask();
                //         if (Teach.isHaveTip() == true) Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                //         scene.once(egret.TouchEvent.TOUCH_END, () => {
                //             Teach.delTouchTipSpx();
                //         }, null);
                //         Teach.openDialogName = "zj.ExchangeMainSence";
                //         return;
                //     }
                // }
                // else if (curStep_ == 8) { // 判断兑换,聚焦对应左侧列表
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.ExchangeMainSence");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.ExchangeMainSence";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 9) {
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let [canConvert, button_name] = ui['CheckTeach'](10001);
                //     if (!canConvert) {
                //         Teach.delTouchTipSpx();
                //         Teach.SaveTeachPart(false, teachBattle.teachPartID_WONDER_NPC)
                //         Teach.SaveTeachPartLocal(6003);
                //         Teach.SaveTeachPart(false, 1007);
                //         Teach.SaveTeachPartLocal(1007);
                //         Teach.setOperateTeachStep(15)
                //     }
                //     else {
                //         if (button_name == null) {
                //             Teach.addOperateTeachStep();
                //         }
                //         else {
                //             if (Teach.isHaveTip() == true) Teach._reuse_rect(ui[button_name], true, true, false, 1, 0.7, false, false);
                //             zj.Game.UIManager.setMaskAttachedTapObj(ui[button_name]);
                //             Teach.addOnceEvent(ui[button_name]);
                //         }
                //     }
                // }
                // else if (curStep_ == 10) { // 聚焦对应子项
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let index = ui['FindIndexById'](10001);
                //     if (index == null) {
                //         Teach.delTouchTipSpx();
                //         Teach.SaveTeachPart(true, teachBattle.teachPartID_WONDER_NPC);
                //         Teach.SaveTeachPart();
                //         Teach.SaveTeachPartLocal(curPart_);
                //         Teach.setOperateTeachStep(15);
                //     }
                //     else {
                //         (<eui.Scroller>ui['scrollerGoods']).scrollPolicyV = eui.ScrollPolicy.OFF;
                //         ui['getItemList']();
                //         if (ui['itemList'][index]) {
                //             if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][index], true, true, false, 1, 0.7, false, false);
                //             zj.Game.UIManager.setMaskAttachedTapObj(ui['listGood']);
                //             Teach.addOnceEvent(ui['listGood']);
                //         }
                //     }
                // }
                // else if (curStep_ == 11) { // 聚焦兑换按钮
                //     Teach.addMask();
                //     let dialog: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     let ui = dialog['groupRight'].getChildByName('rightui');
                //     if (ui == null) {
                //         Teach.openUiName = "zj.ExchangeMainRight";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonExchange'], true, true, false, 1, 0.7, false, false, true);
                //     zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonExchange']);
                //     Teach.addOnceEvent(ui['buttonExchange']);
                // }
                // else if (curStep_ == 12) { // 等待动画结束
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.CommonGetDialog";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     Teach.SaveTeachPart(true, teachBattle.teachPartID_WONDER_NPC);
                //     Teach.delTouchTipSpx();
                //     Teach.SaveTeachPart();
                //     Teach.SaveTeachPartLocal(curPart_);
                //     Teach.SaveTeachPart(null, 1007);
                //     Teach.SaveTeachPartLocal(1007);
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 13) { // 获得物品
                //     Teach.addMask();
                //     let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                //     if (bLoading) {
                //         Teach.openDialogName = "zj.CommonGetDialog";
                //         Teach.isNeedOpenAddStep = false;
                //         return;
                //     }
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['lstItem'], true, true, false, 0, 0.7, false, false);
                //     zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                // }
                // else if (curStep_ == 14) { // 领取
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                //     zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                //     // Teach.addOnceEvent(ui['btnClose']);
                //     Teach.closeDialogName = "zj.CommonGetDialog";
                //     return;
                // }
                // else if (curStep_ == 15) { // 关闭兑换
                //     Teach.addMask();
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.ExchangeMainSence") {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }
                //     Teach.addMask();
                //     setTimeout(function () {
                //         if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonReturn'], true, true, false, 1, 0.7, false, false);
                //         zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonReturn']);
                //         // Teach.addOnceEvent(ui['buttonReturn']);
                //         Teach.addOnceEvent(ui);
                //     }, 200);
                // }
                // else if (curStep_ == 16) { // 
                //     let ui: any = zj.Game.UIManager.topDialog();
                //     ui['onButtonClsse']();
                //     Teach.addOperateTeachStep();
                // }
                // else if (curStep_ == 17) { // 对话
                //     let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                //     if (bLoading) {
                //         Teach.removeMask();
                //         Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                //         Teach.isNeedCloseAddStep = false;
                //         return;
                //     }

                //     Teach.ProcTeachStory();
                //     if (Story.isFinish()) {
                //         Story.bFinish = false;
                //         Teach.addOperateTeachStep();
                //     }
                // }
                // else if (curStep_ == 18) {
                //     Teach.removeMask();
                //     Teach.delTouchTipSpx();
                //     let scene = StageSceneManager.Instance.GetCurScene();
                //     Teach.SaveTeachPart(false, 1007);
                //     Teach.SaveTeachPart(false, 6003);
                //     Teach.SaveTeachPartLocal(1007);
                //     Teach.SaveTeachPartLocal(6003);
                //     if (zj.Game.PlayerWonderLandSystem.wonderlandId == 1 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                //         Teach.removeMask();
                //         scene.WonderlandEnter_Req(2);
                //     }
                //     Teach.removeMask();
                //     Teach.delTouchTipSpx();
                //     Teach.EndCurPart(false);
                // }
                Teach.removeMask();
                Teach.delTouchTipSpx();
                Teach.SaveTeachPart();
                Teach.SaveTeachPartLocal(curPart_);
                Teach.EndCurPart(false);
            }
            else if (curPart_ == 1008) { // 第一次猜拳
                if (curStep_ == 0) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        Teach.openDialogName = "zj.MoraMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }

                    ui['SetTeach']();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) { // 我方配置
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (ui['group3'].visible == true) {
                        Teach.setOperateTeachStep(11);
                        return;
                    }
                    else if (zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != null && zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != 0) {
                        Teach.setOperateTeachStep(14);
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listMy'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 2) { // 敌方配置
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listEnemy'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 3) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (ui['group3'].visible == true) {
                        Teach.setOperateTeachStep(11);
                    }
                    else if (zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != null && zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != 0) {
                        Teach.setOperateTeachStep(14);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 4) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonStartMora'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonStartMora']);
                    Teach.addOnceEvent(ui['buttonStartMora']);
                }
                else if (curStep_ == 5) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui['group3'].visible == false || ui['buttonGetAward'].enabled == false) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep()
                }
                else if (curStep_ == 6) { // 查看结果列表
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 7) { // 重新猜拳
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui['buttonMoraAgain'].enabled) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonMoraAgain'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonMoraAgain']);
                        Teach.addOnceEvent(ui['buttonMoraAgain']);
                    }
                    else {
                        Teach.setOperateTeachStep(11)
                    }
                }
                else if (curStep_ == 8) { // 等待动画结束
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) { // 查看结果列表
                    Teach.addMask();
                    let ui = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 10) { // 查看奖励列表
                    Teach.addMask();
                    let ui = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listAward'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 11) { // 领取奖励
                    Teach.addMask();
                    let ui = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonGetAward'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonGetAward']);
                    Teach.addOnceEvent(ui['buttonGetAward']);
                }
                else if (curStep_ == 12) { // 聚焦获得奖励
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonGetDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) { // 点击关闭
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.CommonGetDialog") {
                        Teach.openDialogName = "zj.CommonGetDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.setStopTeachUpdata(true);
                    Teach.setTeaching(true);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 14) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainScene") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonViewAward'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonViewAward']);
                    Teach.addOnceEvent(ui['buttonViewAward']);
                }
                else if (curStep_ == 15) {
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.MoraMainAwardDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.MoraMainAwardDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listViewList'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 350);
                }
                else if (curStep_ == 16) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.MoraMainAwardDialog") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                    Teach.addOnceEvent(ui['buttonClose']);
                }
                else if (curStep_ == 17) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.MoraMainScene");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                    Teach.addOnceEvent(ui['buttonClose']);
                }
                else if (curStep_ == 20) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1009) { // 升到16级 贪婪之岛pk
                Teach.GoWonderland(curStep_, true, (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isSceneMobs || Teach.isDone(teachBattle.teachPartID_WONDER_1)), 4, 1009);
            }
            else if (curPart_ == 6001) { // 接1009，引导打怪
                if (curStep_ == 0) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                    if (bLoading) {
                        Teach.openDialogName = "zj.WonderLandChoose";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) { // 有怪直接打怪
                    let scene = StageSceneManager.Instance.GetCurScene();
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isSceneMobs) {
                        Teach.setOperateTeachStep(18);
                    }
                    else if (scene.getNearMob() == null) {
                        scene.goNearTree();
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 2) {
                    let scene = StageSceneManager.Instance.GetCurScene();
                    if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    let tree = scene.getNearTree();
                    let rect = tree.getVisibleRt();
                    let xywh: { x: number, y: number, width: number, height: number } = { // 贪婪之岛 圈npc特殊处理
                        x: rect.x,
                        y: rect.y - rect.height,
                        width: rect.width,
                        height: rect.height
                    };
                    Teach.removeMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                    scene.once(egret.TouchEvent.TOUCH_END, () => {
                        Teach.delTouchTipSpx();
                        Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 3) {
                    Teach.addMask();
                    let scene = StageSceneManager.Instance.GetCurScene();
                    scene.collectNearTree();
                    Teach.setStopTeachUpdata(true);
                    Teach.setTeaching(true);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 4) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.WonderLandChoose") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let hasClick = Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isCollectFruit, function (k, v) {
                        return v == zj.Game.PlayerWonderLandSystem.wonderlandId;
                    });
                    if (hasClick && ui['btnFruit'].visible == false) {
                        // 已经使用过果子，就不再出果子了，直接去打怪
                        Teach.setOperateTeachStep(9);
                    }
                    else {
                        // 没使用过果子，等待引导使用果子
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) { // 点击果子
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    Teach.addMask();
                    Teach.addOperateTeachStep()
                }
                else if (curStep_ == 7) {
                    Teach.addMask();
                    Teach.addOperateTeachStep()
                }
                else if (curStep_ == 8) {
                    Teach.addMask();
                    Teach.addOperateTeachStep()
                }
                else if (curStep_ == 9) { // 走向怪
                    Teach.addMask();
                    let scene = StageSceneManager.Instance.GetCurScene();
                    let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    scene.goNearMob();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 点击怪
                    Teach.addMask();
                    let scene = StageSceneManager.Instance.GetCurScene();
                    if (scene.playerLeader.state != zj.TableEnum.TableEnumBaseState.State_None) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    // 没有怪再走一遍流程
                    if (scene.getNearMob() == null) {
                        Teach.setOperateTeachStep(1);
                    }
                    else {
                        let tree = scene.getNearMob();
                        let rect = tree.getVisibleRt();
                        let xywh: { x: number, y: number, width: number, height: number } = { // 贪婪之岛 圈npc特殊处理
                            x: rect.x,
                            y: rect.y - rect.height,
                            width: rect.width,
                            height: rect.height
                        };
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_rect(xywh, true, true, false, 0, 0.7, false, false, true);
                        scene.once(egret.TouchEvent.TOUCH_END, () => {
                            // Teach.bAsyncContinue = true;
                            Teach.delTouchTipSpx();
                            Teach.addOperateTeachStep();
                        }, null);
                    }
                }
                else if (curStep_ == 11) { // 打怪协议
                    Teach.SaveTeachPart(false, teachBattle.teachPartID_WONDER_ENTER_1);
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.SaveTeachPart(false, teachBattle.teachPartID_WONDER_ENTER_3);
                    Teach.SaveTeachPartLocal(teachBattle.teachPartID_WONDER_ENTER_3);

                    Teach.SaveTeachPart(false, 1009);
                    Teach.SaveTeachPart(false, 6001);
                    Teach.SaveTeachPartLocal(1009);
                    Teach.SaveTeachPartLocal(6001);

                    if (Device.fastBattleSwitch) {
                        // 快速战斗开启
                        Teach.setOperateTeachStep(18);
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) { // 获得奖励，保存
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonGetDialog") {
                            Teach.addMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['lstItem'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }
                        else if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.LeagueWarPop") {
                            Teach.addMask();
                            Teach.setOperateTeachStep(15);
                        }
                        else {
                            Teach.openDialogName = "zj.LeagueWarPop" || "zj.CommonGetDialog";
                            Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }, 500);
                }
                else if (curStep_ == 13) { // 点击关闭
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonGetDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) { // 调用关闭方法
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['onBtnClose']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 15) { // 聚焦列表
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.LeagueWarPop") {
                            if (ui['isEndL'] && ui['isEndR']) {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.6, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                            }
                            else {
                                Teach.needIsEndAni = true;
                                return;
                            }
                        }
                        else if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonGetDialog") {
                            Teach.setOperateTeachStep(12);
                        }
                    }, 500);
                }
                else if (curStep_ == 16) { // 关闭战斗
                    Teach.addMask();
                    let ui = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.LeagueWarPop") {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonSwitch'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonSwitch']);
                        Teach.addOnceEvent(ui['ButtonSwitch']);
                    }
                    else if (egret.getQualifiedClassName(ui) == "zj.CommonGetDialog") {
                        Teach.setOperateTeachStep(13);
                    }

                }
                else if (curStep_ == 17) { // 点击关闭
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 18) { // 等待界面出现
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.WonderLandChoose") {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 19) { // 对话
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 20) { // 保存结束
                    Teach.addMask();
                    let scene = StageSceneManager.Instance.GetCurScene();
                    let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }

                    if (zj.Game.PlayerWonderLandSystem.wonderlandId == 1 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                        zj.Game.PlayerWonderLandSystem.wonderlandId = 3;
                        Teach.removeMask();
                        scene.WonderlandEnter_Req(3);
                    }
                    Teach.SaveTeachPart(false, 1009);
                    Teach.SaveTeachPart(false, 6001);
                    Teach.SaveTeachPartLocal(1009);
                    Teach.SaveTeachPartLocal(6001);
                    Teach.EndCurPart(false);
                    SceneManager.teachId = null;
                }
            }
            else if (curPart_ == 1010) { // 第一次钓鱼
                if (curStep_ == 0) { // 钓鱼状态
                    let [ui, bLoading] = Teach.GetDstUI("zj.FishingMain")
                    if (bLoading) {
                        Teach.openDialogName = "zj.FishingMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui == null) {
                        Teach.openDialogName = "zj.FishingMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (PlayerVIPSystem.Level().league_fishing == zj.Game.PlayerVIPSystem.vipInfo.league_fishing && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                        // 无钓鱼次数且可下竿（退出）
                        Teach.setOperateTeachStep(4);
                    }
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) > 0) {
                        // 钓鱼中(退出)
                        Teach.setOperateTeachStep(4);
                    }
                    else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length != 0) {
                        // 可领取(领取，退出)
                        Teach.setOperateTeachStep(5);
                    }
                    else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                        // 可下杆（刷新，下杆，退出）
                        if (CommonConfig.league_fishing_free_refresh > zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.fishing_refresh) {
                            // 免费
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFresh'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFresh'])
                            Teach.addOnceEvent(ui['btnFresh']);
                        }
                        else {
                            // 收费
                            let cost = CommonConfig.league_fishing_refresh_money;
                            if (zj.Game.PlayerInfoSystem.BaseInfo.money >= cost) {
                                //  金钱足够（聚焦刷新）
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFresh'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFresh'])
                                Teach.addOnceEvent(ui['btnFresh']);
                            }

                            else {
                                //  金币不足（下杆）
                                Teach.setOperateTeachStep(2);
                            }
                        }
                    }
                    else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0) {
                        // 可收杆（收杆，领奖，退出）
                        Teach.setOperateTeachStep(6);
                    }
                }
                else if (curStep_ == 2) { // 下杆
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnPush'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnPush']);
                    Teach.addOnceEvent(ui['btnPush']);
                }
                else if (curStep_ == 3) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 4) { // 关闭界面
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                        Teach.addOnceEvent(ui['btnClose']);
                    }, 200);
                }
                else if (curStep_ == 5) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
                else if (curStep_ == 6) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.FishingMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (ui['btnPull'].visible == false || ui['btnPull'].enabled == false) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnPull'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnPull']);
                    Teach.addOnceEvent(ui['btnPull']);
                }
                else if (curStep_ == 7) { // 等待动画完成
                    let [ui, bLoading] = Teach.GetDstUI("zj.FishingEnd")
                    if (bLoading) {
                        Teach.openDialogName = "zj.FishingEnd";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['btnGet'].visible == false) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep()
                }
                else if (curStep_ == 8) {
                    // 聚焦收了或者奖励翻倍
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.FishingMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let cost = CommonConfig.refresh_double_token(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.refresh_double_time + 1);
                    if (zj.Game.PlayerInfoSystem.BaseInfo.token >= cost) {
                        // 可以翻倍
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnDouble'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnDouble']);
                        Teach.addOnceEvent(ui['btnDouble']);
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnGet'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnGet']);
                        Teach.addOnceEvent(ui['btnGet']);
                    }
                }
                else if (curStep_ == 9) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getDefinitionByName(ui) != "zj.FishingMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.setOperateTeachStep(4);
                }
            }
            else if (curPart_ == 1011) { // 升至18级，天空竞技场
                if (curStep_ < 4) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui != null) {
                        Teach.removeMask()
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER, "zj.SkyAreanMainScene", "btnSkyArena", "rectSkyArena");
                }
                else if (curStep_ == 4) { // 对话
                    let [ui, bLoading] = Teach.GetDstUI("zj.SkyAreanMainScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.SkyAreanMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    let ui = Game.UIManager.topScene() as SkyAreanMainScene;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['scrollerPassAward'], true, true, false, 0, 0.7, false, false, false, false, [0.8, 0.8]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 6) {
                    Teach.addMask();
                    let ui = Game.UIManager.topScene() as SkyAreanMainScene;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonChange'], true, true, false, 0, 0.7, false, false, false, true);
                    Game.UIManager.setMaskAttachedTapObj(ui['buttonChange']);
                    ui['buttonChange'].once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.delTouchTipSpx();
                        Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 7) { // 保存
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1015) { // 升至28级，流星街
                if (curStep_ < 4) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED, "zj.WantedSecondMeteorstanceScene", "btnMeteorStreet", "rectMeteorStreet");
                }
                else if (curStep_ == 4) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) { // 等待界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.WantedSecondMeteorstanceScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.WantedSecondMeteorstanceScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) { // 聚焦boss列表
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listSelectedBoss'], true, true, false, 0, 0.7, false, false, false, false, [0.7, 0.7]);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 600);
                }
                else if (curStep_ == 7) { // 聚焦层级列表
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listBoss'], true, true, false, 0, 0.7, false, false, false, false, [0.8, 0.8]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 8) { // 聚焦右侧
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false, false, false, [0.85, 0.85]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 9) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 结束
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1016) { // 升至24级，流星街第三关卡
                if (curStep_ < 4) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED, "zj.WantedSecondMeteorstanceScene", "btnMeteorStreet", "rectMeteorStreet");
                }
                if (curStep_ == 4) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) { // 等待界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.WantedSecondMeteorstanceScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.WantedSecondMeteorstanceScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) { //聚焦到第四个关卡
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['itemList'][3] == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][3], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listSelectedBoss']);
                        Teach.addOnceEvent(ui['listSelectedBoss']);
                    }, 500);

                }
                else if (curStep_ == 7) { // 聚焦奖励
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listBossAward'], true, true, false, 1, 0.7, false, false, false, false, [0.8, 0.8]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 8) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) { // 结束
                    Teach.removeMask();
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1019) { // 首次召唤完宠物
                if (curStep_ == 0) {
                    Teach.setOperateTeachStep(6)
                }
                else if (curStep_ == 1) { // 介绍
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) { // 点击进化
                    let ui: any = zj.Game.UIManager.topScene();
                    if (zj.Game.PlayerAdviserSystem.petMap[ui['index']].step >= CommonConfig.pet_step_max) {
                        Teach.setOperateTeachStep(5);
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnControlShow'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnControlShow']);
                        Teach.addOnceEvent(ui['btnControlShow']);
                    }
                }
                else if (curStep_ == 3) { // 查看界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.PetEvolution");
                    if (bLoading) {
                        Teach.openDialogName = "zj.PetEvolution";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 4) { // 介绍
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        Teach.ProcTeachStory();
                    }, 200);
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        ui['onBtnclose']();
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) { // 聚焦休息按钮
                    let [top, bLoading] = Teach.GetDstUI("zj.PetMainScene");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(top['btnRest'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(top['btnRest']);
                    Teach.addOnceEvent(top['btnRest']);
                }
                else if (curStep_ == 6) {
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1021) { // 升至36级, 开启装备介绍
                if (curStep_ < 6) { // 跳转到猎人
                    let generals = zj.Game.PlayerHunterSystem.queryAllHunters();
                    generals.sort((a, b) => {
                        return b.level - a.level;
                    });
                    Teach.LevelUpToHero(curStep_, generals[0].general_id, null, true);
                }
                else if (curStep_ == 6) { // 聚焦详情
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['rectMask'].visible = true;
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                    }, 400);
                    setTimeout(function () {
                        ui['rectMask'].visible = false;
                        Teach.openUiName = "zj.HunterDetail";
                        return;
                    }, 700);
                }
                else if (curStep_ == 7) { // 点击收藏
                    Teach.delTouchTipSpx();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (scene['btnCollection'].visible) {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(scene['btnCollection'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(scene['btnCollection']);
                            Teach.addOnceEvent(scene['btnCollection']);
                        }, 300);

                    }
                }
                else if (curStep_ == 8) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("collection");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 11) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("collection");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listAttribute'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("collection");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupActivation'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 13) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("collection");
                    let generalId = ui['generalId'];
                    let equipId = zj.Game.PlayerHunterSystem.Table(generalId).equip_info[0];
                    let equipInfo = TableGeneralEquip.Item(equipId);
                    let bEquip = Table.FindF(zj.Game.PlayerHunterSystem.queryHunter(generalId).equipInfo, function (_k, _v) {
                        return _v.equipId == equipId;
                    });
                    let canEquip = equipInfo.compose_money <= PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                    if (zj.Game.PlayerHunterSystem.queryHunter(generalId).level >= CommonConfig.general_equip_one_openlevel) {
                        if (!bEquip) {
                            if (canEquip) {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnCompound'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnCompound']);
                                Teach.addOnceEvent(ui['btnCompound']);
                            }
                            else {
                                Teach.setOperateTeachStep(21);
                            }
                        }
                        else {
                            Teach.setOperateTeachStep(17);
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(21);
                    }
                }
                else if (curStep_ == 14) { // 等待出现动画
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterCollectPopStep");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterCollectPopStep";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 15) { // 等待回到猎人界面
                    let [ui, bLoading] = Teach.Dst_Hero();
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) { // 介绍
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("collection");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach']);
                    Teach.addOnceEvent(ui['groupTeach']);
                }
                else if (curStep_ == 17) { // 点击强化
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("collection");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnIntensify'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnIntensify']);
                    Teach.addOnceEvent(ui['btnIntensify']);
                }
                else if (curStep_ == 18) { // 等待强化界面出现
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterCollectionStrength");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterCollectionStrength";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 20) { // 点击强化
                    let ui: any = zj.Game.UIManager.topDialog();
                    let bMax = !ui['groupUpLevel'].visible;
                    let equipId = PlayerHunterSystem.Table(ui['generalId']).equip_info[ui['index']];
                    let equipTbl = TableGeneralEquip.Item(equipId);
                    let level = zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).equipInfo[ui['_id']].level;
                    let needGoods = equipTbl.uplevel_goods[level] || [];
                    let needCounts = equipTbl.uplevel_count[level] || [];
                    let needMoney = equipTbl.uplevel_money[level] || 0;
                    let canUpLevel = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY) >= needMoney;

                    for (let [k, v] of HelpUtil.GetKV(needGoods)) {
                        let itemSet = PlayerItemSystem.Set(needGoods[k]) as any;
                        if (itemSet.Count < needCounts[k]) {
                            canUpLevel = false;
                        }
                    }
                    if (bMax) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        if (canUpLevel) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnIntensify'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnIntensify']);
                            Teach.addOnceEvent(ui['btnIntensify']);
                        }
                        else {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnIntensify'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }
                    }
                }
                else if (curStep_ == 21) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1020) { // 升至36级, 开启黑暗大陆遗迹
                if (curStep_ < 4) {
                    Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2, "zj.DarkLandHomeScene", "btnDarkContinent", "rectDarkContinent");
                }
                else if (curStep_ == 4) {
                    let [top, bLoading] = Teach.GetDstUI("zj.DarkLandHomeScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.DarkLandHomeScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 6) { // 聚焦遗迹
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 1, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        ui.once(egret.TouchEvent.TOUCH_END, () => {
                            Teach.setOperateTeachStep(8);
                            Teach.delTouchTipSpx();
                        }, null);
                    }, 400);

                }
                else if (curStep_ == 7) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) {
                    let [top, bLoading] = Teach.GetDstUI("zj.RelicMain");
                    if (bLoading) {
                        Teach.openSceneName = "zj.RelicMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 10) {
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['itemList'][ui['teachOpenIndex']] == null) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['teachOpenIndex'] != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][ui['teachOpenIndex']]['imageBossPic'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['imageBossPic'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                }
                else if (curStep_ == 11) { // 聚焦奖励
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['teachOpenIndex'] != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][ui['teachOpenIndex']]['buttonAward'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemList'][ui['teachOpenIndex']]['buttonAward']);
                        Teach.addOnceEvent(ui['itemList'][ui['teachOpenIndex']]['buttonAward']);
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['buttonAward'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemList'][0]['buttonAward']);
                        Teach.addOnceEvent(ui['itemList'][0]['buttonAward']);
                    }
                }
                else if (curStep_ == 12) { // 奖励界面出现
                    let [top, bLoading] = Teach.GetDstUI("zj.RelicAwardMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.RelicAwardMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 14) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listTableView1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 15) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listTableView2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 16) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['onButtonClose']();
                    let [top, bLoading] = Teach.GetDstUI("zj.RelicMain");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = "zj.RelicAwardMain";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.setOperateTeachStep(22);
                }
                else if (curStep_ == 17) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 22) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['teachOpenIndex'] != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][ui['teachOpenIndex']], true, true, false, 0, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listTableView']);
                        Teach.addOnceEvent(ui['listTableView']);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 23) { // 对话
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 24) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 1017) { // 山贼讨伐

                if (curStep_ < 4) {
                    Teach.addMask();
                    Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2, "zj.DarkLandHomeScene", "btnDarkContinent", "rectDarkContinent");
                }
                else if (curStep_ == 4) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.DarkLandHomeScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.DarkLandHomeScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['SetTeachOpen']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 5) {
                    let ui: any = zj.Game.UIManager.topScene();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        ui['SetTeachClose']();
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 6) { // 聚焦列表
                    let ui: any = zj.Game.UIManager.topScene();
                    let button_name = null;
                    button_name = ui['SetTeach'](5);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui[button_name], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                    ui.once(egret.TouchEvent.TOUCH_END, () => {
                        ui['onGroupEnd5']();
                        Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 7) { // 自动增加
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) { // 自动增加
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) { // 自动增加
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 自动增加
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) { // 等待山贼界面出现
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_GroupFightMain");
                    if (bLoading) {
                        Teach.openSceneName = "zj.HXH_GroupFightMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) { // 点击难度
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonLevel'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonLevel']);
                    Teach.addOnceEvent(ui['buttonLevel']);
                }
                else if (curStep_ == 14) { // 展示列表
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['groupYinCang'].alpha == 1) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listTableView'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                }
                else if (curStep_ == 15) { // 回缩列表 聚焦评论
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['listAniClose']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) { // 聚焦奖励
                    let ui: any = zj.Game.UIManager.topScene();
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonDropList'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonDropList']);
                        Teach.addOnceEvent(ui['buttonDropList']);
                    }, 200);
                }
                else if (curStep_ == 17) { // 等待奖励界面出现 聚焦列表
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_GroupFightDropInfo");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HXH_GroupFightDropInfo";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listViewDrop'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 18) { //回到主界面 判断次数
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_GroupFightMain");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = "zj.HXH_GroupFightDropInfo";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let times: any = Table.FindR(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime, function (_k, _v) {
                        return _k == PlayerGroupFightSystem.fightGroupExt - 1;
                    })[0];
                    // let times: number = 1;

                    for (let [k, v] of HelpUtil.GetKV(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime)) {
                        if (k == PlayerGroupFightSystem.fightGroupExt) {
                            times = PlayerGroupFightSystem.fightGroupExt - 1;
                            break;
                        }
                    }
                    if (times == null) {
                        times = 0;
                    }
                    else {
                        times = times.value;
                    }

                    times = 0;

                    if (times >= 1) {
                        // 次数足够
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonChallenge'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonChallenge']);
                        Teach.addOnceEvent(ui['buttonChallenge']);
                    }
                    else {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.EndCurPart(false);
                    }
                }
                else if (curStep_ == 19) { // 等待界面出现 介绍boss信息
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_GroupFightFormate");
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    ui['SetTeach']();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 20) { // 聚焦我的阵容
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 21) {
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonSet1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 22) {// 聚焦助阵阵容
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach3'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 23) {// 聚焦选择队伍按钮
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonSet3'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 24) { // 等待类型切换聚焦按钮区域
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['uiState'] == 2) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupBoss1'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                }
                else if (curStep_ == 25) {// 聚焦列表
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listFriendTeam'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 26) { //判断是否有好友
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['getItemList']();
                    if (ui['getListAllFri'][0] == null) { // 第一项为空
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonSet3'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonSet3']);
                        Teach.addOnceEvent(ui['buttonSet3']);
                    }
                    else {
                        let hasBeenUsed = Table.FindF(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed, function (_k, _v) {
                            return _v == ui['getListAllFri'][0]['dataItem'].info.baseInfo.id;
                        });
                        if (hasBeenUsed) { // 已用
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonSet3'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonSet3']);
                            Teach.addOnceEvent(ui['buttonSet3']);
                        }
                        else if (ui['getListAllFri'].bSelected) { // 选中
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui.ButtonSet3, true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonSet3']);
                            Teach.addOnceEvent(ui['buttonSet3']);
                        }
                        else {
                            let useTime = zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed.length;
                            let allTime = PlayerVIPSystem.Level().assist_time;
                            if (useTime >= allTime) {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonSet3'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonSet3']);
                                Teach.addOnceEvent(ui['buttonSet3']);
                            }
                            else {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['getListAllFri'][0]['buttonUse'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['getListAllFri'][0]['buttonUse']);
                                Teach.addOnceEvent(ui['getListAllFri'][0]['buttonUse']);
                            }
                        }
                    }
                }
                else if (curStep_ == 27) {// 点击选择队伍按钮
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 28) { // 等待类型切换聚焦开始
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui.uiState == 1) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonfight'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonfight']);
                        Teach.addOnceEvent(ui['buttonfight']);
                    }
                }
                else if (curStep_ == 29) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_GroupFightCombat")
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    ui['SetTeach']();
                    if (ui['buttonChange1'].visible) {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 30) { // 全屏对话
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 31) { // 聚焦转换按钮
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonChange1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonChange1']);
                    Teach.addOnceEvent(ui['buttonChange1']);
                }
                else if (curStep_ == 32) { // 聚焦开始
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonCombat'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['buttonCombat']);
                    Teach.addOnceEvent(ui['buttonCombat']);
                }
                else if (curStep_ == 33) { // 保存结束
                    Teach.SaveTeachPart();
                    Teach.EndCurPart(false);
                    Teach.SaveTeachPartLocal(curPart_);
                }
            }
            else if (curPart_ == 4001) { // 演示关卡
                // -- 切换会主界面，保存进度

                // 去掉演示关特殊处理
                if (Game.TeachSystem.isEndCommonAnimation == null || Game.TeachSystem.isEndCommonAnimation == false) {
                    Teach.needIsEndAni = true;
                    return;
                }
                else if (Game.TeachSystem.isEndCommonAnimation == true) {
                    Teach.setStopTeachUpdata(true);
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(true);
                    Teach.teachingNow = false;
                    SceneManager.instance.EnterMainCityNew();
                }
            }
            else if (curPart_ == 3001) { // 进入酒馆招募萨茨和梧桐
                if (curStep_ < 4) {
                    Teach.addMask();
                    Teach.LevelUpToBuild(curStep_, 0, "zj.TavernScene", "btnPub", "rectPub");
                }
                else if (curStep_ == 4) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.TavernScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.TavernScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.TavernScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.TavernScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['setGroupVisible'](3);

                    let find_KULAPIKA = Table.FindF(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_k, _v) {
                        return PlayerHunterSystem.GetGeneralId(_v.general_id) == this._ID_WUTONG;
                    });
                    if (find_KULAPIKA/* || zj.Game.PlayerInfoSystem.BaseInfo.soda < 1*/) { //酷拉皮卡已招募 或 无苏打水
                        Teach.setOperateTeachStep(13);
                        return;
                    }
                    else if (zj.Game.PlayerInfoSystem.BaseInfo.soda >= 1) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeachSoda'], true, true, false, 1, 0.7, false, false, true);
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeachSoda'], true, true, false, 1, 0.7, false, false, true);
                        ui['groupTeachSoda'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            ui['reqFindHero'](4, 1);
                        });
                    }
                }
                else if (curStep_ == 6) { // 预留步骤
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['_teach_pop']) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 7) { // 多苏打水点击喝一杯
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['group5'].visible) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnDrinkOneSoda']);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnDrinkOneSoda'], true, true, false, 1, 0.7, false, false);
                    }
                }
                else if (curStep_ == 8) { // -- 喝一杯响应
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['onBtnDrinkOneSoda']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) { //-- 单一苏打水展示武将界面
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    if (scene.getChildByName("getGeneral") != null) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.openUiName = "getGeneral";
                        return;
                    }
                }
                else if (curStep_ == 10) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("getGeneral");
                    if (ui == null || ui == undefined) {
                        Teach.openUiName = "getGeneral";
                        return;
                    }
                    if (ui['imageHunLevel'].visible == false) {
                        Teach.needIsEndAni = true;
                        return;
                    }

                    console.log("——————————————————————————" + "新手引导剧情对话bFinish: " + Story.bFinish + "——————————————————————————");

                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 11) {
                    let scene: any = zj.Game.UIManager.topScene();// 酒馆
                    if (scene.getChildByName("getGeneral") != null) { // 解锁猎人界面
                        let ui: any = scene.getChildByName("getGeneral");
                        ui['onGroupParent']();
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 12) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.TavernGet")
                    if (bLoading) {
                        Teach.openDialogName = "zj.TavernGet";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['rectOk'], true, true, false, 1, 0.7, false, false);
                    let btn = (<eui.Button>ui['btnClose']);
                    Teach.closeDialogName = "zj.TavernGet";
                    return;
                }
                else if (curStep_ == 13) { // 回到酒馆界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.TavernScene")
                    if (bLoading) {
                        Teach.openSceneName = "zj.TavernScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['setGroupVisible'](2);
                    let find_BANZANG = Table.FindF(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_k, _v) {
                        return PlayerHunterSystem.GetGeneralId(_v.general_id) == this._ID_SACI;
                    });
                    if (find_BANZANG || !(zj.Game.PlayerInfoSystem.BaseInfo.beer > 0 || zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer == false)) {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(20);
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 14) {
                    let ui: any = zj.Game.UIManager.topScene();
                    let aa = ui.getChildByName("tavernmask");
                    if (aa != null) {
                        ui.removeChild(aa);
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeachSoda'], true, true, false, 1, 0.7, false, false, true);
                }
                else if (curStep_ == 15) {
                    Teach.addMask();
                    Teach.SaveTeachPart();
                    let scene: any = zj.Game.UIManager.topScene();
                    if (scene.getChildByName("getGeneral") == null) {
                        Teach.openUiName = "getGeneral";
                        return;
                    }
                    else {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("getGeneral");
                    if (ui == null || ui == undefined) {
                        Teach.openUiName = "getGeneral";
                        return;
                    }
                    if (ui['imageHunLevel'].visible == false) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    console.log("——————————————————————————" + "新手引导剧情对话bFinish: " + Story.bFinish + "——————————————————————————");
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 17) {
                    let scene: any = zj.Game.UIManager.topScene();// 酒馆
                    if (scene.getChildByName("getGeneral") != null) { // 解锁猎人界面
                        let ui: any = scene.getChildByName("getGeneral");
                        ui['onGroupParent']();
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 18) { // -- 关闭寻访界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.TavernGet");
                    if (bLoading) {
                        Teach.openDialogName = "zj.TavernGet";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['rectOk'], true, true, false, 1, 0.7, false, false);
                    let btn = (<eui.Button>ui['btnClose']);
                    Teach.closeDialogName = "zj.TavernGet";
                    return;
                }
                else if (curStep_ == 19) { // -- 等待对话
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.TavernScene")
                    if (bLoading) {
                        Teach.openSceneName = "zj.TavernScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) { //-- 对话、
                    Teach.addMask();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 21) { // -- 关闭酒馆界面
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    let aa = ui.getChildByName("tavernmask");
                    if (aa != null) {
                        ui.removeChild(aa);
                    }
                    setTimeout(function () {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnReturn']);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnReturn'], true, true, false, 1, 0.7, false, false);
                        let btn = <eui.Button>ui['btnReturn'];
                        Teach.closeSceneName = "zj.TavernScene";
                        return;
                    }, 200);
                }
                else if (curStep_ == 22) { //-- 保存
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(true);
                }
            }
            else if (curPart_ == 3002) { // 进入副本
                if (curStep_ < 6) {
                    Teach.LevelUpToInstance(curStep_, null);
                }
                else if (curStep_ == 6) { // 副本移动动画演示
                    let [ui, bLoading] = Teach.GetDstUI(SceneManager.adventureClassStr);
                    Teach.addMask();
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();

                    // ui['SetTeach']();
                    // if (ui['ani_end']) {
                    //     ui['ani_end'] = false;
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     // return;
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                }
                else if (curStep_ == 7) { // 全图对话
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 8) { // 播放动画
                    // Teach.addMask();
                    // let ui: any = zj.Game.UIManager.topScene();
                    // ui['TeachNewAreaUnLockAni'](zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) { // 等待动画结束
                    // Teach.addMask();
                    // let ui: any = zj.Game.UIManager.topScene();
                    // // if (ui['topShadow'].visible == false) {
                    // if (ui['isAniEnd'] == true) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else { // 等待对话结束回调事件
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 选择关卡
                    // Teach.addMask();
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui.SetMapCanTouch(false);
                    ui['btnCloseTop'].enabled = false;
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button((ui.sceneMap as SceneMapTiledAdventure).getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                        Teach.openUiName = "zj.AdventureDialog";
                        return;
                    }, 700);
                    (ui.sceneMap as SceneMapTiledAdventure).getAdventureById(1).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                }
                else if (curStep_ == 11) { // 选择关卡
                    Teach.addMask();
                    // let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    // ui['isLock'][0] = false;
                    // // if (ui['topShadow'].visible == false) {
                    // if (ui['isAniEnd'] == true) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) { //打开预览界面
                    let adventureMapScene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI
                    // adventureMapScene['isLock'][0] = true;
                    adventureMapScene.SetMapCanTouch(true);
                    adventureMapScene['btnCloseTop'].enabled = true;
                    if (adventureMapScene == null) {
                        Teach.openSceneName = SceneManager.adventureClassStr
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (adventureMapScene.dialogInfo.parent.visible == false) {
                        Teach.openUiName = "zj.AdventureDialog"
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (adventureMapScene.dialogInfo.parent.visible == true) {
                        let ui: any = adventureMapScene.dialogInfo;
                        Teach.addMask();
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['scrollerAdventure'], true, true, false, 0, 0.7, false, false, false, false, [1.2, 1.2]);
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 13) { // 锁定第一项
                    let adventure = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (!adventure.dialogInfo.parent.visible) return;
                    (<eui.Scroller>adventure.dialogInfo['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(adventure.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[0], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                    if (adventure.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[1]) {
                        (<eui.Scroller>adventure.dialogInfo['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.ON;
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 14) { //选中挑战
                    Teach.addMask();
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (scene.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[1]) {
                        setTimeout(function () {
                            Teach.removeMask();
                            zj.Game.UIManager.setMaskAttachedTapObj(scene.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[1].btnDekaron);
                            if (Teach.isHaveTip() == true) Teach._reuse_button(scene.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[0].btnDekaron, true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                            Teach.addOnceEvent(scene.dialogInfo.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 0)[0].btnDekaron);
                        }, 200);
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 15) { //上阵界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonFormatePveMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonFormatePveMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) { // 聚焦所有
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 17) { // 聚焦敌人
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['down'].scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupDown'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 200);
                }
                else if (curStep_ == 19) { // 聚焦上阵武将
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) { // 上阵
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['down']['getItemList']();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        Teach.Format_ClickIdx(1, null, this._ID_XIAOJIE);
                    }
                    else {
                        Teach.openDialogName = "zj.CommonFormatePveMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 21) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        Teach.Format_ClickIdx(2, null, this._ID_WUTONG);
                    }
                }
                else if (curStep_ == 22) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                        Teach.Format_ClickIdx(3, null, this._ID_SACI);
                    }
                }
                else if (curStep_ == 23) {
                    for (let i = 0; i < Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL - 1].generals.length - 1; i++) {
                        if (Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL - 1].generals[i] == 0) {
                            Teach.setOperateTeachStep(20);
                            return;
                        }
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 24) { // 开始战斗
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui == null || egret.getQualifiedClassName(ui) != "zj.CommonFormatePveMain") {
                        Teach.openDialogName = "zj.CommonFormatePveMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['down'].scroller.scrollPolicyH = eui.ScrollPolicy.ON;
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonFight']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupFight'], true, true, false, 1, 0.7, false, false);
                    ui['ButtonFight'].once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX) }, null);
                    Teach.closeDialogName = "zj.CommonFormatePveMain";
                    return;
                }
                else if (curStep_ == 25) { // 保存
                    // Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 4002) { // -- 战斗1-1，3V3释放技能和连招，输入战队名字
                if (curStep_ == 0) { //等技能cd
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        Teach.openSceneName = "zj.StageSceneFightNormal";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];
                    if (ui['ButtonSend'] != null) { // 屏蔽聊天
                        ui['ButtonSend'].enabled = false;
                    }

                    if (fightScene['isWin']()) {
                        Teach.addOperateTeachStep();
                        return;
                    }

                    if (fightScene['eStageState'] == 2) { // 第二关
                        Teach.setOperateTeachStep(17);
                        return;
                    }

                    let bTag: boolean = false;
                    let general_id: number = 0;
                    for (let [k, v] of HelpUtil.GetKV(ui.tableRoles)) {
                        if (v['isHandleCdOk']() == true && v['isPlaySkillLegeal']() == true && fightScene['checkAllEnemyDead']() == false) {
                            bTag = true;
                            general_id = v['eTeamNum'] + 1;
                            break;
                        }
                    }

                    if (bTag) {
                        fightScene['pauseAll']();
                        Teach.origChild = ui['tableTouch'][general_id];
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['tableTouch'][general_id], true, true, false, 1, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        // (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                        //     Teach.addTeaching();
                        // }, null);
                    }
                    else {
                        Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 1) {
                    Teach.addMask();
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 2) { // 释放技能中
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    if (fightScene['isWin']()) { // 胜利了 直接跳到下一步
                        Teach.addOperateTeachStep();
                        return;
                    }

                    if (fightScene['eStageState'] == 2) { // 第二关
                        Teach.setOperateTeachStep(17);
                        return;
                    }

                    // 技能好了发招
                    let bTag = false;
                    let general_id = 0;
                    for (let [k, v] of HelpUtil.GetKV(ui.tableRoles)) {
                        if (v['isHandleCdOk']() == true && v['isPlaySkillLegeal']() == true && fightScene['checkAllEnemyDead']() == false) {
                            bTag = true;
                            general_id = v['eTeamNum'] + 1;
                            break;
                        }
                    }

                    if (bTag) {
                        Teach.setLimitOperate(true);
                        Teach.setLimitOperate(false);
                        fightScene['pauseAll']();
                        Teach.origChild = ui['tableTouch'][general_id];
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['tableTouch'][general_id], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        }, 150);
                        // (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                        //     Teach.addTeaching();
                        // }, null);
                    }
                    else {
                        Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 3) {
                    Teach.addMask();
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 4) { // 无双
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    // 限制操作
                    Teach.setLimitOperate(true);
                    if (fightScene['isWin']()) { // 胜利了，直接跳到下一步
                        Teach.setOperateTeachStep(8);
                        return;
                    }
                    if (fightScene['eStageState'] == 2) {
                        Teach.setOperateTeachStep(17);
                        return;
                    }

                    if (fightScene.comboLv >= 4 && fightScene['comboEffect']['isTeach']() == true) {  // 触发无双1
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 5) {
                    Teach.PauseAddStep();
                }
                else if (curStep_ == 6) {
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(fightScene['comboEffect']['spriteBg'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep()); // 聚焦无双
                    }, 200);
                }
                else if (curStep_ == 7) {
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 8) { // 释放技能中
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    if (fightScene['isWin']()) { // 胜利了，直接跳到下一步
                        Teach.addOperateTeachStep();
                        return;
                    }
                    if (fightScene.eStageState == 2) { // 第二关
                        Teach.setOperateTeachStep(17);
                        return;
                    }

                    // 技能好了发招
                    let bTag = false;
                    let general_id = 0;
                    for (let [k, v] of HelpUtil.GetKV(ui['tableRoles'])) {
                        if (v['isHandleCdOk']() == true && v['isPlaySkillLegeal']() == true && fightScene['checkAllEnemyDead']() == false) {
                            bTag = true;
                            general_id = v['eTeamNum'] + 1;
                            break;
                        }
                    }
                    if (bTag) {
                        Teach.setLimitOperate(true);
                        Teach.setLimitOperate(false);
                        fightScene['pauseAll']();
                        Teach.origChild = ui['tableTouch'][general_id];
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['tableTouch'][general_id], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                        }, 150);
                        // (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                        //     Teach.addTeaching();
                        // }, null);
                    }
                    else {
                        Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 9) {
                    Teach.addMask();
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 10) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 14) { // 第一局结束
                    Teach.removeMask();
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    if (fightScene['eStageState'] == 1 && fightScene['checkAllFriendIsState'](zj.TableEnum.TableEnumOtherState.OtherState_None)) {
                        if (Gmgr.Instance.bPause == false) {
                            setTimeout(function () {
                                fightScene['pauseAll']();
                                Teach.setOperateTeachStep(15);
                            }, 1000);
                        }
                        else if (fightScene['eStageState'] == 2) {
                            Teach.setOperateTeachStep(17);
                        }
                    }
                    else {
                        Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 15) { // 对话
                    let fightScene: any = zj.Game.UIManager.topScene();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) { // 恢复
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 17) { // 第二局开始
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    fightScene['resumeAll']();
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    if (ui['ButtonSend'] != null) {
                        ui['ButtonSend'].enabled = false;
                    }
                    if (fightScene['isWin']()) { // 胜利了 直接跳到下一步
                        Teach.addOperateTeachStep();
                        return;
                    }

                    let key: number;
                    for (let k in fightScene['tableAllys']) {
                        if (PlayerHunterSystem.GetGeneralId(Number(k)) == this._ID_XIAOJIE) {
                            key = Number(k);
                        }
                    }

                    if (key == null) { // 判断有小杰
                        Teach.setOperateTeachStep(20); // 跳转结束
                        return;
                    }

                    // 凯特上场
                    let ret = fightScene['tableAllys'][key];
                    let blood = ret['getHp']() / ret['getMaxHp']();

                    if (ret['relySupportRole'] == null) { // 无援护
                        Teach.setOperateTeachStep(20);
                        return;
                    }

                    if (blood <= 0.3 || ret['getRage']() == ret['relySupportRole']['getSupportConsume']()) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.skillCdEnd = true;
                        return;
                    }
                }
                else if (curStep_ == 18) { // 选中凯特
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    let auto: boolean = true; // 是否在自动战斗
                    if (Gmgr.Instance.bFightAuto == false) {
                        if (ui['autoAni'] != null) {
                            auto = false;
                        }
                    }
                    else {
                        if (ui['autoAni'] != null) {
                            auto = true;
                        }
                    }
                    let general_index = null;
                    for (let [k, v] of HelpUtil.GetKV(ui['tableRoles'])) {
                        if (PlayerHunterSystem.GetGeneralId(k) == this._ID_XIAOJIE) {
                            general_index = v['eTeamNum'] + 1;
                        }
                    }
                    Teach.origChild = ui['tableHead']['general_index'];
                    if (!auto) {
                        let key: number;
                        for (let k in fightScene['tableAllys']) {
                            if (PlayerHunterSystem.GetGeneralId(Number(k)) == this._ID_XIAOJIE) {
                                key = Number(k);
                            }
                        }
                        // 凯特上场
                        let ret = fightScene.tableAllys[key];
                        if (ret['getRage']() == ret['relySupportRole']['getSupportConsume']()) {
                            fightScene['pauseAll']();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['tableSupportHead'][general_index], true, true, false, 1, 0.7, false, false);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['tableSupportHead'][general_index]);
                            zj.Game.UIManager.setMaskAttachedTouchObj(ui);
                            (<Fight_RoleMsg>ui).once(egret.TouchEvent.TOUCH_END, () => {
                                Teach.addTeaching();
                            }, null);
                            // Teach.setOperateTeachStep(22);
                        }
                        else {
                            Teach.setOperateTeachStep(21);
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(21);
                    }
                }
                else if (curStep_ == 19) { // 恢复
                    Teach.removeMask();
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 20) { // 第二场结束
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 22) { // 判断首杀
                    let mobInfo = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].mobsMap[100001];
                    let get_first = false;
                    if (mobInfo != null) {
                        get_first = mobInfo.firstReward;// 首杀
                    }

                    if (get_first) {
                        // 获得首杀
                        Teach.setOperateTeachStep(24); // 升级    
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 23) { // 首杀界面
                    let ui = zj.Game.UIManager.topDialog();
                    if (ui == null) {
                        Teach.openDialogName = ["zj.Common_FirstBlood", "zj.BattleEnd_Lose"];
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    else {
                        if (egret.getQualifiedClassName(ui) == "zj.BattleEnd_Lose") {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonGoOn'], true, false, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonGoOn']);
                            ui['ButtonGoOn'].once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                                Teach.SaveTeachPart();
                                Teach.SaveTeachPartLocal(curPart_);
                                Teach.EndCurPart(true);
                            }, null)
                        }
                        else if (egret.getQualifiedClassName(ui) == "zj.Common_FirstBlood") {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['rectOk'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnOk']);
                            Teach.closeDialogName = "zj.Common_FirstBlood";
                            return;
                        }
                    }
                }
                else if (curStep_ == 24) { // 升级界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonLevelUp2");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonLevelUp2";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonLevelUp2") {
                        if (zj.Game.PlayerInfoSystem.BaseInfo.level != 1 && zj.Game.PlayerInfoSystem.BaseInfo.level != 2 && egret.getQualifiedClassName(zj.Game.UIManager.topDialog) != "zj.CommonLevelUp2") {
                            Teach.addOperateTeachStep();
                            return;
                        }
                        Teach.removeMask();
                        Teach.closeDialogName = "zj.CommonLevelUp2";
                        return;
                    }
                }
                else if (curStep_ == 25) { // 聚焦结算
                    Teach.removeMask();
                    let [ui, bLoading] = Teach.Dst_BattleEnd();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 26) { // 聚焦结算关闭按钮
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonGoOn'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonGoOn']);
                    Teach.closeDialogName = "zj.BattleEnd_Win";
                    return;
                }
                else if (curStep_ == 27) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 28) { // 引导回主城
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(true);
                }
            }
            else if (curPart_ == 3003) { // 攻打1-2
                if (curStep_ < 6) { // 进入副本
                    Teach.LevelUpToInstance(curStep_, curPart_);
                }
                else if (curStep_ == 6) { // 判断当前列表是否为第一关
                    let [top, bLoading] = Teach.GetDstUI(SceneManager.adventureClassStr);
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let ui = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui.SetMapCanTouch(false);
                    if (ui.dialogInfo.parent.visible == false) { // 无右侧列表
                        Teach.setOperateTeachStep(10);
                    }
                    else {
                        if (Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID == 1) { // 当前为第一关
                            Teach.setOperateTeachStep(13);
                        }
                        else {
                            Teach.addOperateTeachStep();
                        }
                    }
                }
                else if (curStep_ == 7) { // 关闭关卡按钮
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (scene == null) {
                        Teach.openSceneName = SceneManager.adventureClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let ui = scene.dialogInfo;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnCloseAdventure']);
                }
                else if (curStep_ == 8) {
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    let ui = scene.dialogInfo;
                    let btn = (<eui.Button>ui['btnCloseAdventure']);
                    Teach.addOnceEvent(btn);
                }
                else if (curStep_ == 9) { // 等待完全退出 
                    // let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI
                    // ui['SetTeachMoveBack']();
                    // if (ui['ani_end']) {
                    //     Teach.addOperateTeachStep()
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { //选择第一关
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['SetMapCanTouch'](false);
                    ui['btnCloseTop'].enabled = false;
                    Teach.removeMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button((ui.sceneMap as SceneMapTiledAdventure).getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                    Teach.openUiName = "zj.AdventureDialog";
                    (ui.sceneMap as SceneMapTiledAdventure).getAdventureById(1).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                    return;
                }
                else if (curStep_ == 11) { // 选择第一关
                    let ui: any = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    // if (ui['topShadow'].visible == false) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) { //等待动画结束
                    // let ui: any = zj.Game.UIManager.topScene();
                    // if (ui['topShadow'].visible == false) {
                    //     Teach.addOperateTeachStep();
                    // }
                    // else {
                    //     Teach.needIsEndAni = true;
                    //     return;
                    // }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) { // 判断1-2是否展开
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    scene.SetMapCanTouch(true);
                    scene['btnCloseTop'].enabled = true;
                    let ui = scene.dialogInfo;
                    if (ui == null || ui.parent.visible != true) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    (<eui.Scroller>ui['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0]) {
                        if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[1]) { // 展开
                            Teach.addOperateTeachStep();
                        }
                        else {
                            if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0]['imgMask'] == false) { // 第二项可以点
                                (<eui.Scroller>ui['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.OFF;
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                                Teach.addOnceEvent((<eui.List>ui['listAdventure']));
                            }
                            else {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                                Teach.addOnceEvent((<eui.List>ui['listAdventure']));
                            }
                        }
                    }
                }
                else if (curStep_ == 14) { // 聚焦挑战按钮
                    Teach.addMask();
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (scene.dialogInfo.parent.visible == false) {
                        Teach.setOperateTeachStep(13);
                        return;
                    }
                    let ui = scene.dialogInfo;
                    (<eui.Scroller>ui['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.ON;
                    if (ui.parent.visible == true && ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[1]) {
                        setTimeout(function () {
                            Teach.removeMask();
                            zj.Game.UIManager.setMaskAttachedTapObj(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0].btnDekaron);
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0].btnDekaron, true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                            Teach.addOnceEvent(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, 1)[0].btnDekaron);
                        }, 200);
                    }
                }
                else if (curStep_ == 15) { // 上阵界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonFormatePveMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonFormatePveMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonConfirm") {
                        Teach.EndCurPart(false);
                        Teach.SaveTeachPartLocal(curPart_);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 16) { // 选中援护列表
                    let ui: any = zj.Game.UIManager.topDialog();
                    egret.Tween.get(ui).wait(200).call(() => {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['encircle'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    });
                }
                else if (curStep_ == 17) { // 上阵
                    // Teach.Format_ClickIdx(1, this._ID_KATE, this._ID_XIAOJIE);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    // Teach.Format_ClickIdx(2, this._ID_KATE, this._ID_XIAOJIE);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    // Teach.Format_ClickIdx(3, this._ID_KATE, this._ID_XIAOJIE);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) { // 选中小杰援护
                    // zj.Game.TeachSystem.isTimerOpen = true;
                    let fightScene: any = zj.Game.UIManager.topScene();
                    let key = -1; // 判断是否有小杰
                    for (let [k, v] of HelpUtil.GetKV(zj.Game.PlayerFormationSystem.bootCamp)) {
                        if (PlayerHunterSystem.GetGeneralId(v.generalId) == this._ID_XIAOJIE) {
                            key = k;
                        }
                    }
                    if (key == -1) { // 小杰没上阵开始战斗
                        Teach.setOperateTeachStep(23);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 21) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 22) { // 手动关闭界面
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 23) {
                    // Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonFormatePveMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonFormatePveMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupFight'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonFight']);
                    (<eui.Button>ui['ButtonFight']).addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.addTeaching();
                    }, null);
                }
                else if (curStep_ == 24) {
                    // Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3005) { // 安装羁绊卡
                Teach.ActivatePartner(curStep_, 1, this._ID_XIAOJIE, false, true);
            }
            else if (curPart_ == 4003) { // 战斗1-3，快速战斗
                if (curStep_ == 0) {
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        Teach.openSceneName = "zj.StageSceneFightNormal";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    // 屏蔽聊天
                    if (ui['ButtonSend'] != null) {
                        ui['ButtonSend'].enabled = false;
                    }

                    // 胜利了 直接跳到下一步
                    if (fightScene['isWin']()) {
                        Teach.addOperateTeachStep();
                        return;
                    }
                    fightScene['pauseAll']();

                    if (Gmgr.Instance.bFightAuto) {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonAuto'], true, true, false, 0, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonAuto']);
                        }, 280);
                    }
                    else {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonAuto'], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonAuto']);
                        }, 280);
                    }
                }
                else if (curStep_ == 1) {
                    Teach.removeMask();
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        Teach.openSceneName = "zj.StageSceneFightNormal";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];

                    if (ui['speedActioning'] == false) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 0, 0.7, false, false);
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 1, 0.7, false, false);
                    }
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 2) {
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 3) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3017) { // 通关1-4，小杰，技能教学

                if (curStep_ < 6) { // 跳转武将
                    Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) { // 聚焦详情
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    scene['rectMask'].visible = true;
                    let ui: any = scene.getChildByName("detail");
                    if (ui != null && ui.alpha == 1) {
                        scene['rectMask'].visible = false;
                        Teach.isShowHunter = true;
                        Teach.addOperateTeachStep();
                    }
                    else {
                        setTimeout(function () {
                            Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(scene['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        }, 400);
                        setTimeout(function () {
                            scene['rectMask'].visible = false;
                            Teach.addOnceEvent((<eui.Button>scene['btnMainDetail']));
                        }, 700);
                    }
                }
                else if (curStep_ == 7) { // 点击技能
                    Teach.removeMask();
                    let [ui, bLoading] = Teach.Dst_Hero();
                    if (bLoading) {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let skill = ui.getChildByName("skill");
                    if (skill == null && skill.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (PlayerHunterSystem.GetGeneralId(ui['generalId']) == this._ID_XIAOJIE && ui['gRightSideBar'].visible) {
                        if (Teach.isShowHunter) { // 如果当前界面是猎人详情界面 直接选中技能
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnSkill'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnSkill']);
                            Teach.addOnceEvent(ui['btnSkill']);
                        }
                        else { // 如果当前界面不是猎人详情界面 延迟200毫秒选中技能
                            setTimeout(function () {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnSkill'], true, true, false, 1, 0.7, false, false);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnSkill']);
                                Teach.addOnceEvent(ui['btnSkill']);
                            }, 200);
                        }
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 8) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 聚焦技能列表
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    ui['SelectSkill'](1);
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupMain'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 11) { // 聚焦升级框 
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene") return;
                    let ui: any = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) { // 点击升级
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene") return;
                    let ui: any = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['btnUpLevel'].visible && zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).skill_num >= 1) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnUpLevel'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnUpLevel']);
                        Teach.addOnceEvent(ui['btnUpLevel']);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) { // 聚焦属性
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 15) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("skill");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    ui['getItemList']();
                    if (ui['itemList'][3] == null) {
                        Teach.setOperateTeachStep(19);
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 17) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) { // 聚焦退出
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 21) {
                    let ui: any = Game.UIManager.topDialog();
                    if (ui != null) {
                        if (egret.getQualifiedClassName(ui) == "zj.HunterUpAdvanced") {
                            ui['onBtnClose']();
                            Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    let scene: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(scene['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(scene['btnClose']);
                    // Teach.addOnceEvent(scene['btnClose']);
                    Teach.closeSceneName = "zj.HunterMainScene";
                    return;
                }
                else if (curStep_ == 23) { // 到副本聚焦到第一关 主城结束
                    let hunterui: any = Game.UIManager.topDialog();
                    if (hunterui != null) {
                        if (egret.getQualifiedClassName(hunterui) == "zj.HunterUpAdvanced") {
                            hunterui['onBtnClose']();
                        }
                    }
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI([SceneManager.adventureClassStr, SceneManager.mainCityClassStr]);
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr || SceneManager.mainCityClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }

                    let topUI: SceneMapTiledAdventureUI = (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.adventureClassStr) ? (Game.UIManager.topScene() as SceneMapTiledAdventureUI) : null;
                    if (topUI != null) {
                        topUI.SetMapCanTouch(false);
                        topUI['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(() => {
                            if (Teach.isHaveTip() == true) Teach._reuse_button((topUI.sceneMap as SceneMapTiledAdventure).getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(() => { topUI.sceneMap['topShadow'].visible = false; });
                        (topUI.sceneMap as SceneMapTiledAdventure).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                        Teach.openUiName = "zj.AdventureDialog";
                        Teach.isNeedOpenAddStep = true;
                        return;
                    }
                    else if (SceneManager.instance.isMainCityScene()) {
                        Teach.setOperateTeachStep(25);
                    }
                    else {
                        Teach.removeMask();
                        Teach.setOperateTeachStep(25);
                    }
                }
                else if (curStep_ == 24) { // 主动点开第一关
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui.SetMapCanTouch(true);
                    if (ui.dialogInfo && ui.dialogInfo.visible == true) {
                        ui['btnCloseTop'].enabled = true;
                        Teach.setOperateTeachStep(25);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 25) { // 结束
                    Teach.removeMask();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3007) { // 通关1-6，小杰，吃经验道具
                if (curStep_ < 6) {
                    Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) { //点击加经验
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene") {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let ui: any = scene.getChildByName("hero");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnUpLevel'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnUpLevel']);
                        // Teach.addOnceEvent(ui['btnUpLevel']);
                        Teach.openDialogName = "zj.HunterUpLevel";
                        ui['btnUpLevel'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            // Teach.DoOperateTeach();
                            Teach.delTouchTipSpx();
                        }, null);
                    }, 500);
                }
                else if (curStep_ == 7) { // 聚焦经验条
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterUpLevel");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterUpLevel";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        ui['groupTeach'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Teach.delTouchTipSpx();
                        }, null);
                    }, 300);
                }
                else if (curStep_ == 8) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    let itemTbl = [30001, 30002, 30003, 30004];
                    let indexTag = -1;
                    for (let i = 0; i < itemTbl.length; i++) {
                        if (PlayerItemSystem.Count(itemTbl[i]) > 0) {
                            indexTag = i;
                            if (indexTag >= 1) {
                                break;
                            }
                        }
                    }
                    if (ui['canTeach'] != true || indexTag == -1) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        ui['getItemList']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['item_list'][indexTag]['HeroLevelPop'], true, true, false, 1, 0.7, false, false, true);
                        Teach.addOnceEvent(ui['listExpPill']);
                    }
                }
                else if (curStep_ == 9) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    // Teach.addOnceEvent(ui['btnClose']);
                    Teach.closeDialogName = "zj.HunterUpLevel";
                    return;
                }
                else if (curStep_ == 10) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    let scene = zj.Game.UIManager.topScene(); //HunterMainScene
                    zj.Game.UIManager.setMaskAttachedTapObj(scene['btnClose']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(scene['btnClose'], true, true, false, 1, 0.7, false, false);
                    // Teach.addOnceEvent(scene['btnClose']);
                    Teach.closeSceneName = "zj.HunterMainScene";
                    return;
                }
                else if (curStep_ == 12) { // 到副本界面聚焦到第一关 主城结束
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI([SceneManager.adventureClassStr, SceneManager.mainCityClassStr]);
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr || SceneManager.mainCityClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let topUI: SceneMapTiledAdventureUI = (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.adventureClassStr) ? (Game.UIManager.topScene() as SceneMapTiledAdventureUI) : null;
                    if (topUI != null) {
                        topUI.sceneMap['topShadow'].visible = true;
                        topUI.SetMapCanTouch(false);
                        topUI['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(() => {
                            if (Teach.isHaveTip() == true) Teach._reuse_button((topUI.sceneMap as SceneMapTiledAdventure).getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(() => { topUI.sceneMap['topShadow'].visible = false; });
                        (topUI.sceneMap as SceneMapTiledAdventure).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX) }, null);
                        Teach.openUiName = "zj.AdventureDialog";
                        return;
                    }
                    else if (egret.getQualifiedClassName(topUI) == "zj.HunterMainScene") {
                        Teach.setOperateTeachStep(14);
                    }
                    else {
                        Teach.removeMask();
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) {
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui.SetMapCanTouch(true);
                    if (ui['btnCloseTop'].enabled == false) {
                        ui['btnCloseTop'].enabled = true;
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 14) {
                    // 第一次自由操作
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 9001 || curPart_ == 9002 || curPart_ == 9003 || curPart_ == 9004 || curPart_ == 9005 || curPart_ == 9006 || curPart_ == 9007 || curPart_ == 9008 || curPart_ == 9009) { // 副本每个岛屿结束后播放动画
                // 新区域解锁
                // let graph = 100 + curPart_ % 10;
                // Teach.AddAreaAnimation(curStep_, graph);
                Teach.removeMask();
                Teach.SaveTeachPart();
                Teach.SaveTeachPartLocal();
                Teach.EndCurPart(false);
            }
            else if (curPart_ == 3008 || curPart_ == 3014 || curPart_ == 3020) { // 3014通关1-7，领取副本宝箱，雷欧力碎片 3020副本进度3-7，领取雷欧力
                let pass = 100001;
                if (curPart_ == 3014) {
                    pass = 100007;
                }
                else if (curPart_ == 3020) {
                    pass = 100021
                }
                Teach.GetBox(curStep_, false, pass, curPart_);
            }
            else if (curPart_ == 8005) { // 召唤半藏，伙伴介绍
                if (curStep_ < 5) {
                    Teach.addMask();
                    if (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.adventureClassStr) {
                        Teach.setOperateTeachStep(14);
                    }
                    else if (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.mainCityClassStr) {
                        Teach.setOperateTeachStep(16);
                    }
                    // Teach.LevelUpToBtn(curStep_, "btnHunter", "zj.HunterMainScene", true);
                }
                else if (curStep_ == 5) { // 判断是否在武将界面里面
                    Teach.addMask();
                    let [scene, bLoading] = Teach.Dst_Hero();
                    if (bLoading) {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }

                    let ui: any = scene.getChildByName("hunterHero");

                    if (ui == null) {
                        console.log("++++++++++++++++++++++++HunterHeroList加载中++++++++++++++++++++++++++");;
                        Teach.needIsEndAni = true;
                        return;
                    }

                    setTimeout(function () {
                        console.log("++++++++++++++++++++++++HunterHeroList加载成功++++++++++++++++++++++++++");
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnFragment'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFragment']);
                        Teach.addOnceEvent(ui['btnFragment']);
                    }, 1000);
                }
                else if (curStep_ == 6) { // 点击雷欧力头像
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterHero");
                    if (ui['currentListType'] != HunterHeroListType.Fragment) {
                        Teach.needIsEndAni = true;
                        return;
                    }

                    let soulId = TableBaseGeneral.Item(this._ID_BANZANG);
                    setTimeout(function () {
                        scene.getChildByName("hunterHero")['getItemList']();
                    }, 500);

                    // if (ui['itemList'][0] == null || ui['itemList'][0] == undefined) return;
                    setTimeout(function () {
                        scene.getChildByName("hunterHero")['listFragment'].scrollEnabled = false;
                        if (Teach.isHaveTip() == true) Teach._reuse_button(scene.getChildByName("hunterHero")['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                        Teach.addOnceEvent((<eui.List>ui['listFragment']));
                    }, 600);
                }
                else if (curStep_ == 7) { // 聚焦右侧
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterHero");
                    ui['listFragment'].scrollEnabled = true;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 8) { // 是否可招募 点击招募
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterHero"); // 左边碎片ui
                    let ui1: any = scene.getChildByName("hero"); // 右边招募ui
                    if (ui == null || ui1 == null) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui1['groupCallHunter'].visible == false) {
                        Teach.setOperateTeachStep(13);
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui1['groupCallHunter'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui1['groupCallHunter']);
                    Teach.addOnceEvent(ui1['groupCallHunter']);
                }
                else if (curStep_ == 9) { // 等待寻访界面
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetGeneral");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CommonGetGeneral";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['imgHunterLevel'].visible) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 10) {
                    // Teach.addOperateTeachStep();
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach']);
                    Teach.addOnceEvent(ui['groupTeach']);
                }
                else if (curStep_ == 11) { // 关闭寻访界面
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['onClose']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 12) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    // let [ui, bLoading] = Teach.GetDstUI("zj.HunterMainScene");
                    // if (bLoading) return;
                    let ui: any = Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    // Teach.addOnceEvent(ui['btnClose']);
                    ui['btnClose'].once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.delTouchTipSpx();
                    }, null);
                    Teach.closeSceneName = "zj.HunterMainScene";
                    return;
                }
                else if (curStep_ == 14) {
                    let [ui, bLoading] = Teach.GetDstUI([SceneManager.adventureClassStr, SceneManager.mainCityClassStr]);
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr || SceneManager.mainCityClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let adventure = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (adventure.sceneMap.isOpenAniRun) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    // let topUI: any = zj.Game.UIManager.topScene();
                    let topUI: SceneMapTiledAdventureUI = (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.adventureClassStr) ? (Game.UIManager.topScene() as SceneMapTiledAdventureUI) : null;
                    if (topUI && SceneManager.instance.isAdventureScene(topUI)) {
                        Teach.addMask();
                        topUI.SetMapCanTouch(false);
                        (topUI.sceneMap as SceneMapTiledAdventure).moveMapToArea(2, () => {
                            if (Teach.isHaveTip() == true) Teach._reuse_button((topUI.sceneMap as SceneMapTiledAdventure).getAdventureById(2), true, true, false, 1, 0.7, false, false, true);
                            (topUI.sceneMap as SceneMapTiledAdventure).getAdventureById(2).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                            Teach.openUiName = "zj.AdventureDialog";
                            return;
                        }, this);
                    }
                    else if (SceneManager.instance.isMainCityScene()) {
                        Teach.setOperateTeachStep(16);
                    }
                }
                else if (curStep_ == 15) { // 主动点开第二关
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    scene.SetMapCanTouch(true);
                    if (!SceneManager.instance.isAdventureScene(scene)) {
                        Teach.openSceneName = SceneManager.adventureClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 16) {
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 3015 || curPart_ == 3019) { // 通关2-7，领取副本宝箱
                let pass = 100001;
                if (curPart_ == 3019) {
                    pass = 100014;
                }
                Teach.GetBox(curStep_, true, pass, curPart_);
            }
            else if (curPart_ == 2001) { // 改名
                if (curStep_ == 0) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    Teach.setStopTeachUpdata(true);
                    Teach.setTeaching(true);
                    Teach.removeMask();
                    loadUI(Dialog_Name)
                        .then((dailog: Dialog_Name) => {
                            dailog.show();
                        });
                }
                else if (curStep_ == 2) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8023) { // 上阵半藏
                if (curStep_ == 0) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    Teach.openDialogName = "zj.CommonFormatePveMain";
                    return;
                }
                else if (curStep_ == 1) {
                    Teach.addMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui['down']['getItemList']();
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (PlayerHunterSystem.GetGeneralId(Teach.generals[0]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[1]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[2]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[3]) == 10005) {
                            Teach.setOperateTeachStep(5);
                        }
                        else {
                            Teach.Format_ClickIdx(1, null, this._ID_KATE);
                        }
                    }, 500);
                }

                else if (curStep_ == 2) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui['down']['getItemList']();
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (PlayerHunterSystem.GetGeneralId(Teach.generals[0]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[1]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[2]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[3]) == 10005) {
                            Teach.setOperateTeachStep(5);
                        }
                        else {
                            Teach.Format_ClickIdx(2, null, this._ID_KATE);
                        }
                    }, 500);
                }

                else if (curStep_ == 3) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui['down']['getItemList']();
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (PlayerHunterSystem.GetGeneralId(Teach.generals[0]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[1]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[2]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[3]) == 10005) {
                            Teach.setOperateTeachStep(5);
                        }
                        else {
                            Teach.Format_ClickIdx(3, null, this._ID_KATE);
                        }
                    }, 500);
                }

                else if (curStep_ == 4) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        ui['down']['getItemList']();
                        Teach.generals = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1].generals;
                        if (PlayerHunterSystem.GetGeneralId(Teach.generals[0]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[1]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[2]) == 10005 || PlayerHunterSystem.GetGeneralId(Teach.generals[3]) == 10005) {
                            Teach.setOperateTeachStep(5);
                        }
                        else {
                            Teach.Format_ClickIdx(4, null, this._ID_KATE);
                        }
                    }, 500);
                }
                else if (curStep_ == 5) { // 保存
                    // zj.Game.TeachSystem.isTimerOpen = true;
                    Teach.removeMask();
                    Teach.delTouchTipSpx();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 2005) { // 猎人碎片满20个，引导升星
                if (curStep_ < 6) {
                    Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, null, null);
                }
                else if (curStep_ == 6) { // 点击升星
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hero");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['btnUpStar'].enabled) {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnUpStar'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnUpStar']);
                            // Teach.addOnceEvent(ui['btnUpStar']);
                            Teach.openDialogName = "zj.HunterUpStar";
                            ui['btnUpStar'].once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                            }, null);
                        }, 500);
                    }
                    else {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(25);
                    }
                }
                else if (curStep_ == 7) { // 聚焦右侧主武将
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterUpStar");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterUpStar";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['TeachFindMet']();
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupRight'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['groupRight']);
                        Teach.addOnceEvent(ui['groupRight']);
                    }, 300);
                }
                else if (curStep_ == 8) { // 聚焦左侧列表
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.HunterUpStar") {
                        Teach.openDialogName = "zj.HunterUpStar";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupLeft'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupLeft']);
                    Teach.addOnceEvent(ui['groupLeft']);
                }
                else if (curStep_ == 9) { // 判断小杰星级
                    // let ui: any = zj.Game.UIManager.topDialog();
                    // if (zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star != 3) {
                    //     Teach.SaveTeachPart();
                    //     Teach.SaveTeachPartLocal(curPart_);
                    //     Teach.setOperateTeachStep(25);
                    // }
                    // else {
                    //     Teach.addOperateTeachStep();
                    // }
                    Teach.setOperateTeachStep(25);
                }
                else if (curStep_ == 10) { // 第一个蘑菇材料
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui['indexTbl'][0] != null) {
                        (<eui.Scroller>ui['scrollerHero']).scrollPolicyV = eui.ScrollPolicy.OFF;
                        ui['getItemList']();
                        ui['listHeros'].selectedIndex = ui['indexTbl'][0];
                        let types = ui['itemList'][ui['indexTbl'][0]].type;
                        if (types != 2 && types != 4 && types != 6) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][ui['indexTbl'][0]], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listHeros']);
                            // Teach.addOnceEvent(ui['listHeros']);
                            ui['listHeros'].once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                                Teach.addOperateTeachStep();
                            }, null);
                        }
                        else {
                            Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 11) { // 第二个蘑菇材料
                    // Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui['indexTbl'][1] != null) {
                        ui['getItemList']();
                        ui['listHeros'].selectedIndex = ui['indexTbl'][1];
                        let types = ui['itemList'][ui['indexTbl'][1]].type;
                        if (types != 2 && types != 4 && types != 6) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][ui['indexTbl'][1]], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listHeros']);
                            ui['listHeros'].once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                                Teach.addOperateTeachStep();
                            }, null);
                        }
                        else {
                            Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 12) { // 第三个蘑菇材料
                    // Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui['indexTbl'][2] != null) {
                        ui['getItemList']();
                        ui['listHeros'].selectedIndex = ui['indexTbl'][2];
                        let types = ui['itemList'][ui['indexTbl'][2]].type;
                        if (types != 2 && types != 4 && types != 6) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][ui['indexTbl'][2]], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listHeros']);
                            // Teach.addOnceEvent(ui['listHeros']);
                            ui['listHeros'].once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                                Teach.addOperateTeachStep();
                            }, null);
                        }
                        else {
                            Teach.addOperateTeachStep();
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(13);
                    }
                }
                else if (curStep_ == 13) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    let met_tbl = [];
                    ui['getItemList']();
                    for (let [k, v] of HelpUtil.GetKV(ui['indexTbl'])) {
                        let types = ui['itemList'][v].type;
                        if (types != 4 && types != 6) {
                            met_tbl.push(v);
                        }
                    }
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    // if (met_tbl.length == zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star && zj.Game.PlayerInfoSystem.BaseInfo.money >= 1000) {
                    //     Teach.setOperateTeachStep(16); // 成功
                    // }
                    // else {
                    //     Teach.addOperateTeachStep(); // 失败
                    // }
                    let count: number = 0;
                    for (let i = 0; i < zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star; i++) {
                        if (ui['materialGeneralIdList'][i] != 0 && ui['materialGeneralIdList'][i] != -1) {
                            count += 1;
                        }
                    }
                    if (count == zj.Game.PlayerHunterSystem.queryHunter(ui['generalId']).star && zj.Game.PlayerInfoSystem.BaseInfo.money >= 1000) {
                        Teach.setOperateTeachStep(16); // 满足升星条件
                    }
                    else {
                        Teach.addOperateTeachStep(); // 不满足升星条件
                    }

                }
                else if (curStep_ == 14) { // 失败
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['rectAddStar'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAddStar']);
                    // Teach.addOnceEvent(ui['btnAddStar']);
                    ui['btnAddStar'].once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.delTouchTipSpx();
                        Teach.removeMask();
                        Teach.addOperateTeachStep();
                    }, null);
                }
                else if (curStep_ == 15) {
                    Teach.setOperateTeachStep(25);
                }
                else if (curStep_ == 16) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['rectAddStar'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAddStar']);
                    ui['btnAddStar'].once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.delTouchTipSpx();
                    }, null);
                    // Teach.addOnceEvent(ui['btnAddStar']);
                    Teach.openDialogName = "zj.HunterUpStarSuccess";
                    return;
                }
                else if (curStep_ == 17) { // 升星成功
                    let [top, bLoading] = Teach.GetDstUI("zj.HunterUpStarSuccess");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterUpStarSuccess";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (top['animationEnd'] == true) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 18) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 19) { // 升星成功对话界面
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog(); // 升星成功界面
                    ui['touchClose']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 20) { // 等待回到升星界面
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterUpStar");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = "zj.HunterUpStarSuccess";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    (<eui.Scroller>ui['scrollerHero']).scrollPolicyV = eui.ScrollPolicy.ON;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {  // 退出升星
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnReturn'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnReturn']);
                    Teach.addOnceEvent(ui['btnReturn']);
                }
                else if (curStep_ == 22) { // 退出猎人
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 23) { // 到副本界面聚焦第一关,主城结束
                    Teach.addMask();
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI([SceneManager.adventureClassStr, SceneManager.mainCityClassStr]);
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr || SceneManager.mainCityClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }

                    let topUI: SceneMapTiledAdventureUI = (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.adventureClassStr) ? (Game.UIManager.topScene() as SceneMapTiledAdventureUI) : null;
                    if (topUI != null) {
                        topUI.SetMapCanTouch(false);
                        topUI['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(() => {
                            if (Teach.isHaveTip() == true) Teach._reuse_button((topUI.sceneMap as SceneMapTiledAdventure).getAdventureById(2), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(() => { topUI.sceneMap['topShadow'].visible = false; });
                        (topUI.sceneMap as SceneMapTiledAdventure).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                        Teach.openUiName = "zj.AdventureDialog";
                        Teach.isNeedOpenAddStep = true;
                        return;
                    }
                    else if (egret.getQualifiedClassName(ui) == "zj.HunterMainScene") {
                        Teach.setOperateTeachStep(25);
                    }
                    else {
                        Teach.removeMask();
                        Teach.setOperateTeachStep(25);
                    }
                }
                else if (curStep_ == 24) {
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui['SetMapCanTouch'](true);
                    ui['btnCloseTop'].enabled = true;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 25) {
                    Teach.delTouchTipSpx();
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8006) { // 通关2-6，卡片安装和强化
                if (curStep_ < 6) { // 跳转卡片界面
                    Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, true, null);
                }
                else if (curStep_ == 6) { // 聚焦详情
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(ui) != "zj.HunterMainScene") {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['rectMask'].visible = true;
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        ui['btnMainDetail'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Teach.delTouchTipSpx();
                        }, null);
                    }, 400);
                    setTimeout(function () {
                        ui['rectMask'].visible = false;
                        Teach.openUiName = "zj.HunterDetail";
                        // Teach.isNeedOpenAddStep = false;
                        return;
                    }, 700);
                    // Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) { // 锁定框
                    // Teach.delTouchTipSpx();
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(scene['btnCard'], true, true, false, 1, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTapObj(scene['btnCard']);
                        // Teach.openUiName = "zj.HunterCardMain";
                        return;
                    }, 300);
                }
                else if (curStep_ == 8) { // 自动增加步骤
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 锁定大界面
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupMain'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 11) { // 锁定第一项
                    Teach.addMask();
                    let rect = new eui.Rect(UIManager.StageWidth, UIManager.StageHeight, 0x00ff00);
                    rect.name = "maskHero";
                    rect.alpha = 0;
                    zj.Game.UIManager.pushTeachUI(rect);

                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    ui['getItemList']();
                    ui['listCard'].scrollEnabled = false;
                    if (ui['itemList'][0]['groupLock'].visible) { // 不可点击跳转结束
                        Teach.removeMask();
                        let mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHero");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(24);
                    }
                    else if (ui['itemList'][0]['groupGetCard'].visible) { // 第一项有卡
                        Teach.removeMask();
                        let mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHero");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(24);
                    }
                    else if (ui['itemList'][0]['groupDontGet'].visible) { // 第一项可以添加卡
                        // Teach.removeMask();
                        Teach.addMask();
                        let mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHero");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['groupAll'], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                            // Teach.addOnceEvent(ui['listCard']);
                            // ui['listCard'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            //     Teach.delTouchTipSpx();
                            // }, null);
                        }, 300);
                    }
                }
                else if (curStep_ == 12) {
                    Teach.addMask();
                    // Teach.addOperateTeachStep();
                    Teach.setOperateTeachStep(14)
                }
                else if (curStep_ == 13) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterCardEmptyPopDialog");
                    // Teach.addOperateTeachStep();
                    Teach.openUiName = "zj.HunterCardEmptyPopDialog";
                    return;
                }
                else if (curStep_ == 14) { // 聚焦第一项
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterCardEmptyPopDialog"); // HunterCardEmptyPopDialog
                    if (ui == null || ui == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    (ui['scrollerCardBag'] as eui.Scroller).scrollPolicyV = eui.ScrollPolicy.OFF;
                    Teach.addMask();
                    ui['getItemList']();
                    if (ui['itemList'][0] == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }

                    if (ui['itemList'][0].data.info.id == null) { // 没有卡直接保存退出
                        Teach.removeMask();
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(24);
                    }
                    else {
                        egret.Tween.get(ui).wait(400).call(() => {
                            // Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCardBag']);
                            // Teach.addOnceEvent(ui['listCardBag']);
                        });
                    }
                }
                else if (curStep_ == 15) { // 等待右侧界面出现,聚焦右侧
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterCardEmptyPopDialog");
                    (ui['scrollerCardBag'] as eui.Scroller).scrollPolicyV = eui.ScrollPolicy.ON;
                    egret.Tween.get(ui).wait(500).call(() => {
                        if (ui['isEnd']) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupRight'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }
                        else {
                            Teach.needIsEndAni = true;
                            return;
                        }
                    });
                }
                else if (curStep_ == 16) { // 聚焦点击安装
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterCardEmptyPopDialog");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnInstall'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnInstall']);
                    Teach.addOnceEvent(ui['btnInstall']);
                }
                else if (curStep_ == 17) { // 等待界面返回 聚焦第一项
                    let top: any = zj.Game.UIManager.topScene();
                    let ui: any = top.getChildByName("card");
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['groupAll'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 18) { // 保存
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    ui['listCard'].scrollEnabled = true;
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) { // 聚焦退出
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 20) { // 退出
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['onBtnClose']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 22) { // 到副本界面聚焦第一关,主城结束
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI([SceneManager.adventureClassStr, SceneManager.mainCityClassStr]);
                    if (bLoading) {
                        Teach.openSceneName = SceneManager.adventureClassStr || SceneManager.mainCityClassStr;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }

                    let topUI: SceneMapTiledAdventureUI = (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.adventureClassStr) ? (Game.UIManager.topScene() as SceneMapTiledAdventureUI) : null;
                    if (topUI != null) {
                        topUI.SetMapCanTouch(false);
                        topUI['btnCloseTop'].enabled = false;
                        egret.Tween.get(ui).wait(450).call(() => {
                            if (Teach.isHaveTip() == true) Teach._reuse_button((topUI.sceneMap as SceneMapTiledAdventure).getAdventureById(2), true, true, false, 1, 0.7, false, false, true);
                        }).wait(300).call(() => { topUI.sceneMap['topShadow'].visible = false; });
                        (topUI.sceneMap as SceneMapTiledAdventure).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                        Teach.openUiName = "zj.AdventureDialog";
                        Teach.isNeedOpenAddStep = true;
                        return;
                    }
                    else if (egret.getQualifiedClassName(ui) == "zj.HunterMainScene") {
                        Teach.setOperateTeachStep(24);
                    }
                    else {
                        Teach.removeMask();
                        Teach.setOperateTeachStep(24);
                    }
                }
                else if (curStep_ == 23) { // 主动点开第一关
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui.SetMapCanTouch(true);
                    ui['btnCloseTop'].enabled = true;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 24) { // 结束
                    Teach.removeMask();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8022) { // 卡片升星强化教学2
                if (curStep_ < 6) {
                    if (Game.TeachSystem.playAreaAnimate) {
                        Teach.removeMask();
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.LevelUpToHero(curStep_, this._ID_XIAOJIE, true, null);
                }
                else if (curStep_ == 6) { // 聚焦详情
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(ui) != "zj.HunterMainScene") {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    ui['rectMask'].visible = true;
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                        ui['btnMainDetail'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Teach.delTouchTipSpx();
                        }, null);
                    }, 400);
                    setTimeout(function () {
                        ui['rectMask'].visible = false;
                        Teach.openUiName = "zj.HunterDetail";
                        // Teach.isNeedOpenAddStep = false;
                        return;
                    }, 700);
                }
                else if (curStep_ == 7) { // 锁定框
                    // Teach.delTouchTipSpx();
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("detail");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(scene['btnCard'], true, true, false, 1, 0.7, false, false, true);
                    // zj.Game.UIManager.setMaskAttachedTapObj(scene['btnCard']);
                    // Teach.addOnceEvent(scene['btnCard']);
                }
                else if (curStep_ == 8) { // 自动增加步骤
                    Teach.addMask();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 锁定第一项
                    Teach.addMask();
                    let rect = new eui.Rect(UIManager.StageWidth, UIManager.StageHeight, 0x00ff00);
                    rect.name = "maskHeroCard";
                    rect.alpha = 0;
                    zj.Game.UIManager.pushTeachUI(rect);

                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    ui['listCard'].scrollEnabled = false;
                    ui['getItemList']();
                    if (ui['itemList'][0] == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['itemList'][0]['groupLock'].visible) { // 不可点击跳转结束
                        Teach.removeMask();
                        let mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHeroCard");
                        if (mask != null) {
                            zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        }
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(25);
                    }
                    else if (ui['itemList'][0]['groupGetCard'].visible) { // 第一项有卡
                        Teach.setOperateTeachStep(15);
                    }
                    else if (ui['itemList'][0]['groupDontGet'].visible) { // 第一项可以添加卡
                        // Teach.addMask();
                        // setTimeout(function () {
                        //     Teach.removeMask();
                        //     let mask = zj.Game.UIManager.GroupTeachUI.getChildByName("maskHeroCard");
                        //     if (mask != null) {
                        //         zj.Game.UIManager.GroupTeachUI.removeChild(mask);
                        //     }
                        //     if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                        //     zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                        //     Teach.addOnceEvent(ui['listCard']);
                        // }, 500);

                        zj.Game.UIManager.GroupTeachUI.removeChildren();
                        Teach.addMask();
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['groupAll'], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                            // Teach.addOnceEvent(ui['listCard']);
                            // ui['listCard'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            //     Teach.delTouchTipSpx();
                            // }, null);
                        }, 300);
                    }
                }
                else if (curStep_ == 11) { // 聚焦第一项
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterCardEmptyPopDialog"); // HunterCardEmptyPopDialog
                    if (ui == null || ui == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    (ui['scrollerCardBag'] as eui.Scroller).scrollPolicyV = eui.ScrollPolicy.OFF;
                    Teach.addMask();
                    ui['getItemList']();
                    if (ui['itemList'][0] == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }

                    if (ui['itemList'][0].data.info.id == null) { // 没有卡直接保存退出
                        Teach.removeMask();
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(24);
                    }
                    else {
                        egret.Tween.get(ui).wait(400).call(() => {
                            // Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                            // zj.Game.UIManager.setMaskAttachedTapObj(ui['listCardBag']);
                            // Teach.addOnceEvent(ui['listCardBag']);
                        });
                    }
                }
                else if (curStep_ == 12) { // 聚焦点击安装
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("hunterCardEmptyPopDialog");
                    (ui['scrollerCardBag'] as eui.Scroller).scrollPolicyV = eui.ScrollPolicy.ON;
                    egret.Tween.get(ui).wait(500).call(() => {
                        if (ui['isEnd']) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnInstall'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnInstall']);
                            Teach.addOnceEvent(ui['btnInstall']);
                        }
                        else {
                            Teach.needIsEndAni = true;
                            return;
                        }
                    });
                }
                else if (curStep_ == 13) { // 等待界面返回聚焦第一项
                    let top: any = zj.Game.UIManager.topScene();
                    let ui: any = top.getChildByName("card");
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['groupAll'], true, true, false, 0, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                        // Teach.addOnceEvent(ui['listCard']);
                        ui['listCard'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Teach.delTouchTipSpx();
                            Teach.setOperateTeachStep(16);
                            return;
                        }, null);
                        Game.UIManager.GroupTeachUI.once(egret.TouchEvent.TOUCH_TAP, () => {
                            Teach.delTouchTipSpx();
                            Teach.setOperateTeachStep(16);
                            return;
                        }, null);
                    }, 300);
                }
                else if (curStep_ == 14) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene.getChildByName("card");
                    ui['getItemList']();
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0]['groupAll'], true, true, false, 0, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                        Teach.addOnceEvent(ui['listCard']);
                        ui['listCard'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Teach.delTouchTipSpx();
                        }, null);
                    }, 300);
                }
                else if (curStep_ == 15) { // 第一项点击
                    let top: any = zj.Game.UIManager.topScene();
                    let ui: any = top.getChildByName("card");
                    let CARD_UI_TYPE: {
                        LOCK: 1,
                        NOCARD: 2,
                        CARD: 3,
                    };
                    ui['getItemList']();
                    if (ui['itemList'][0].data.cardInfo == null || ui['itemList'][0].data.cardInfo == undefined) { // 第一项无卡
                        Teach.setOperateTeachStep(10);
                    }
                    else {
                        // Teach.addMask();
                        zj.Game.UIManager.GroupTeachUI.removeChildren();
                        Teach.removeMask();
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['listCard']);
                            Teach.addOnceEvent(ui['listCard']);
                        }, 500);
                    }
                }
                else if (curStep_ == 16) { // 等待界面弹出 升级和升星
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterCardPopDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterCardPopDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach']);
                        Teach.addOnceEvent(ui['groupTeach']);
                    }, 500);

                }
                else if (curStep_ == 17) { // 聚焦去强化
                    let ui: any = zj.Game.UIManager.topDialog(); // HunterCardPopDialog
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnStrengthen'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnStrengthen']);
                    // Teach.addOnceEvent(ui['btnStrengthen']);
                    Teach.openDialogName = "zj.CardStrengthenMain";
                    return;
                }
                else if (curStep_ == 18) { // 等待强化界面出现 聚焦强化界面
                    let [top, bLoading] = Teach.GetDstUI("zj.CardStrengthenMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CardStrengthenMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(top['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(top['groupTeach']);
                    Teach.addOnceEvent(top['groupTeach']);
                }
                else if (curStep_ == 19) { // 聚焦强化按钮，铜钱不足继续引导 
                    let dialog: any = zj.Game.UIManager.topDialog(); // CardStrengthenMain
                    let ui: any = dialog['groupNodeAdd'].getChildByName("cardStrengthen");
                    if (ui == null) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['groupUpLevel'].visible) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupUpLevel'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(22);
                    }
                }
                else if (curStep_ == 20) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) { // 全屏对话
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    // Teach.addOnceEvent(ui['btnClose']);
                    Teach.closeDialogName = "zj.CardStrengthenMain";
                    return;
                }
                else if (curStep_ == 23) { // 等待卡片信息界面还原
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterCardPopDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterCardPopDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnUpStar'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnUpStar']);
                        Teach.addOnceEvent(ui['btnUpStar']);
                    }, 300);
                }
                else if (curStep_ == 24) { // 等待升星界面出现
                    let [ui, bLoading] = Teach.GetDstUI("zj.CardUpStarNewDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CardUpStarNewDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupRight'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 25) { // 结束
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8002) { // 拥有一个卡包 并且在主城界面
                if (curStep_ < 5) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.LevelUpToBtn(curStep_, "btnCard", "zj.CardMainScene");
                }
                else if (curStep_ == 5) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.CardMainScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.CardMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnCardBag'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnCardBag']);
                        Teach.addOnceEvent(ui['btnCardBag']);
                    }, 300);
                }
                else if (curStep_ == 6) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) { // 界面出来 聚焦卡包列表
                    let scene: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.CardMainScene") {
                        Teach.openSceneName = "zj.CardMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let ui: any = scene['groupCenter'].getChildByName("cardBag");
                    if (ui == null || ui.alpha != 1) {
                        Teach.openUiName = "zj.CardBag";
                        return;
                    }
                }
                else if (curStep_ == 8) { // 聚焦第一项
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['groupCenter'].getChildByName("cardBag");
                    // let index = ui['_teachIndex'] == null ? 1 : ui['_teachIndex'];
                    let index = 1;
                    ui["getItemList"]();
                    if (ui['itemList'][index - 1] == null) {
                        // Teach.setOperateTeachStep(12);
                        Teach.needIsEndAni = true;
                        return;
                    }
                    else {
                        ui['listCardBag'].selectedIndex = (index - 1);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][index - 1], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listCardBag']);
                        Teach.addOnceEvent(ui['listCardBag']);
                    }
                }
                else if (curStep_ == 9) { // 等待动作结束聚焦开启卡包按钮
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['groupCenter'].getChildByName("cardBag");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnOpenCard'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnOpenCard']);
                    Teach.addOnceEvent(ui['btnOpenCard']);
                }
                else if (curStep_ == 10) {
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.CardBagPopDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.CardBagPopDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['btnGetCard'].alpha == 1) {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        if (ui['btnGetCard'].enabled == true && ui['btnGetCard'].alpha == 1) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                            ui.once(egret.TouchEvent.TOUCH_TAP, () => {
                                Teach.delTouchTipSpx();
                            }, null);
                        }
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 11) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.CardBagPopDialog") {
                        Teach.openDialogName = "zj.CardBagPopDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnGetCard'], true, true, false, 1, 0.7, false, false);
                    // zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnGetCard'])
                    Teach.addOnceEvent(ui['btnGetCard']);
                }
                else if (curStep_ == 12) {
                    let ui: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(ui) == "zj.CardMainScene") {
                        if (zj.Game.UIManager.GroupTeachUI.getChildByName(ConstantConfig_Teach.Tag.LayerUp.toString()) != null) {
                            Teach.delTouchTipSpx();
                        }
                    }
                    Teach.removeMask();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8007) { // 通关2-7，教学挑战副本
                if (curStep_ < 6) { // 进入副本
                    if (Game.UIManager.topDialog() != null) {
                        Teach.closeDialogName = egret.getQualifiedClassName(Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.LevelUpToInstance(curStep_, curPart_);
                }
                else if (curStep_ == 6) {
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (SceneManager.instance.isAdventureScene(ui)) {
                        Teach.ProcTeachStory()
                        if (Story.isFinish()) {
                            Story.bFinish = false;
                            Teach.addOperateTeachStep();
                            Teach.setOperateTeachStep(7);
                        }
                    }
                }
                else if (curStep_ == 7) { // 判断当前手否有列表为第二关
                    let topUI = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    topUI.SetMapCanTouch(false);
                    if (topUI.dialogInfo.parent.visible == false) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.setOperateTeachStep(10);
                    }
                }
                else if (curStep_ == 8) {
                    Teach.addMask();
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI
                    if (Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID >= 1) {
                        ui.SetMapCanTouch(false);
                        ui['btnCloseTop'].enabled = false;
                        (ui.sceneMap as SceneMapTiledAdventure).moveMapToArea(1, () => {
                            if (Teach.isHaveTip() == true) Teach._reuse_button((ui.sceneMap as SceneMapTiledAdventure).getAdventureById(1), true, true, false, 1, 0.7, false, false, true);
                            (ui.sceneMap as SceneMapTiledAdventure).once(egret.TouchEvent.TOUCH_TAP, () => {
                                Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                                Teach.addMask();
                            }, null);
                            Teach.openUiName = "zj.AdventureDialog";
                            Teach.isNeedOpenAddStep = true;
                            return;
                        }, null);
                    }
                    else { // 未达成条件
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.setOperateTeachStep(19);
                    }
                }
                else if (curStep_ == 9) { // 第二关点击
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    ui.SetMapCanTouch(true);
                    if (ui['btnCloseTop'].enabled == false) ui['btnCloseTop'].enabled = true;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 10) { // 打开预览界面
                    Teach.delTouchTipSpx();
                    let complete2 = Game.PlayerInstanceSystem.ElitePackCanChallenge(1);
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    if (!scene.dialogInfo.parent.visible) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (complete2[0]) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(scene.dialogInfo['tagBtn1'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                        zj.Game.UIManager.setMaskAttachedTapObj(scene.dialogInfo['tagBtn1']);
                        Teach.addOnceEvent(scene.dialogInfo['tagBtn1']);
                    }
                    else {
                        Teach.setOperateTeachStep(19);
                    }
                }
                else if (curStep_ == 11) { // 等待界面完成，聚焦列表
                    let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    let ui: any = scene.dialogInfo;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['scrollerAdventure'], true, true, false, 0, 0.7, false, false, false, false, [1.2, 1.2]);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) {
                    Teach.setOperateTeachStep(18);
                }
                else if (curStep_ == 13) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listElite'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 14) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnDrop'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnDrop']);
                    Teach.addOnceEvent(ui['btnDrop']);
                }
                else if (curStep_ == 15) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_InstanceEliteDropInfo")
                    if (bLoading) return;
                    if (zj.Game.UIManager.IsAnimation) return;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupAll'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupAll']);
                    Teach.addOnceEvent(ui['groupAll']);
                }
                else if (curStep_ == 16) {
                    let ui = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 17) {
                    if (zj.Game.UIManager.IsAnimation) return;
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 18) {
                    Teach.addMask();
                    let top = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    top.SetMapCanTouch(false);
                    let ui = top.dialogInfo;
                    if (ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE, 0)[0]) {
                        (<eui.Scroller>ui['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.OFF;
                        Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui.getItem(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE, 0)[0], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 19) { // 保存
                    let top = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    top.SetMapCanTouch(true);
                    let ui = top.dialogInfo;
                    (<eui.Scroller>ui['scrollerAdventure']).scrollPolicyV = eui.ScrollPolicy.ON;
                    Teach.SaveTeachPart();
                    Teach.EndCurPart(false);
                    Teach.SaveTeachPartLocal(curPart_);
                }
            }
            else if (curPart_ == 8008) { // 副本进度2-7，执照教学
                if (curStep_ < 5) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (!SceneManager.instance.isMainCityScene()) {
                        Teach.removeMask();
                        Teach.closeSceneName = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.LevelUpToBtn(curStep_, "btnLisence", "zj.licenseMain");
                }
                else if (curStep_ == 5) { // 等待打开界面
                    Teach.openDialogName = "zj.licenseMain";
                    return;
                }
                else if (curStep_ == 6) { // 对话全屏
                    Teach.ProcTeachStory()
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) { // 聚焦列表
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.openDialogName = "zj.licenseMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['listInfo'].visible) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 8) {
                    let ui = zj.Game.UIManager.topDialog();
                    ui['getItemListInfo']();
                    if (ui['itemListInfo'][0] != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListInfo'][0]['btnTransfer'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 9) { // 第一项领取s
                    let ui = zj.Game.UIManager.topDialog();
                    ui['getItemListInfo']();
                    if (ui['itemListInfo'][0] != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListInfo'][0]['btnPlayer'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][0]['btnPlayer']);
                        Teach.addOnceEvent(ui['itemListInfo'][0]['btnPlayer']);
                    }
                    else {
                        Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 10) { // 等待恭喜获得界面
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.openDialogName = "zj.CommonGetDialog";
                    return;
                }
                else if (curStep_ == 11) { // 回到猎人执照界面,聚焦右侧
                    Teach.removeMask();
                    let [top, bLoading] = Teach.GetDstUI("zj.licenseMain");
                    if (bLoading) {
                        Teach.closeDialogName = "zj.CommonGetDialog";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.CommonGetDialog") {
                        Teach.closeDialogName = "zj.CommonGetDialog";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(top['groupTeach2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 12) { // 全屏对话
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 13) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8010) { // 通关4-7，探索副本
                if (curStep_ < 6) {
                    // let topScene = zj.Game.UIManager.topScene()
                    // if (SceneManager.instance.isAdventureScene(topScene)) { // 最上层scene是冒险
                    //     if (Story.bFinish != true) Story.playStory(curPart_, 2);
                    //     if (Story.isFinish()) {
                    //         Story.bFinish = false;
                    //         Teach.setOperateTeachStep(7);
                    //     }
                    // }
                    // else {
                    //     Teach.LevelUpToInstance(curStep_, curPart_);
                    // }
                    Teach.setOperateTeachStep(24);
                }
                else if (curStep_ == 6) { // 判断当前是否有列表为第三关
                    let [top, bLoading] = Teach.GetDstUI(SceneManager.adventureClassStr);
                    if (bLoading) return;
                    top['SetMapCanTouch'](false);

                    if (top['groupDialog'].numChildren == 0) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 7) { // 聚焦第4个地区
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topScene();
                    ui['topShadow'].visible = true;
                    ui['SetAreaLockInfo']();
                    ui['SetMapCanTouch'](false);
                    egret.Tween.get(ui).wait(300).call(() => {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['imgMapSelect4'], true, true, false, 1, 0.7, false, false, true);
                    }).wait(300).call(() => {
                        ui['topShadow'].visible = false;
                    });
                    // ui.once(egret.TouchEvent.TOUCH_TAP, () => {
                    //     Teach.delTouchTipSpx();
                    // }, null)
                    Teach.openUiName = "zj.HXH_InstanceDialog";
                    return;

                }
                else if (curStep_ == 8) {
                    let ui: any = zj.Game.UIManager.topScene();
                    // ui['isLock'][3] = false;
                    ui['SetMapCanTouch'](true);
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    let scene: any = zj.Game.UIManager.topScene();
                    if (scene['groupDialog'].alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(scene['groupRightButton3'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(scene['btnSearch']);
                        Teach.addOnceEvent(scene['btnSearch']);
                    }, 300);
                }
                else if (curStep_ == 10) { // 等待界面完成，聚焦列表
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listSearch'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 350);
                }
                else if (curStep_ == 11) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0] != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListSearch'][0], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listSearch']);
                        Teach.addOnceEvent(ui['listSearch']);
                    }
                    else {
                        Teach.setOperateTeachStep(24);
                    }
                }
                else if (curStep_ == 12) {
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0]['btnSetLineup'].enabled) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListSearch'][0]['btnSetLineup'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListSearch'][0]['btnSetLineup']);
                        Teach.addOnceEvent(ui['itemListSearch'][0]['btnSetLineup']);
                    }
                    else {
                        Teach.setOperateTeachStep(24);
                    }
                }
                else if (curStep_ == 13) { // 出现上阵界面 聚焦上方列表
                    Teach.addMask();
                    let [ui, bLoading] = Teach.GetDstUI("zj.HXH_InstanceTeam");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HXH_InstanceTeam";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listFormat'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 14) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listHero'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 15) { // 上阵第一个
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['getTeachIndex']();
                    if (ui['_getIndex'][0] == null) {
                        // Teach.addOperateTeachStep();
                        Teach.needIsEndAni = true;
                        return;
                    }
                    else {
                        ui['getHunterList']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['_hunterList'][ui['_getIndex'][0]], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listHero']);
                        Teach.addOnceEvent(ui['listHero']);
                    }
                }
                else if (curStep_ == 16) { // 上阵第二个
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['getTeachIndex']();
                    if (ui['_getIndex'][1] == null) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        ui['getHunterList']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['_hunterList'][ui['_getIndex'][1]], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listHero']);
                        Teach.addOnceEvent(ui['listHero']);
                    }
                }
                else if (curStep_ == 17) { // 上阵第三个
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['getTeachIndex']();
                    if (ui['_getIndex'][2] == null) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        ui['getHunterList']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['_hunterList'][ui['_getIndex'][2]], true, true, false, 1, 0.7, false, false, true);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['listHero']);
                        Teach.addOnceEvent(ui['listHero']);
                    }
                }
                else if (curStep_ == 18) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 19) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnOk'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnOk']);
                    // Teach.addOnceEvent(ui['btnOk']);
                    Teach.closeDialogName = "zj.HXH_InstanceTeam";
                    return;
                }
                else if (curStep_ == 20) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 21) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    ui['getITemListSearch']();
                    let power = ui['itemListSearch'][0].tblInfo.consume_power;
                    if (ui['itemListSearch'][0]['btnStart'].visible && PlayerItemSystem.Resource(message.EResourceType.RESOURCE_POWER) >= power) {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListSearch'][0]['btnStart'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListSearch'][0]['btnStart']);
                            Teach.addOnceEvent(ui['itemListSearch'][0]['btnStart']);
                        }, 300);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 22) { // 聚焦第一项
                    Teach.addMask();
                    let dialog: any = zj.Game.UIManager.topDialog();
                    if (dialog != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(dialog);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0]['btnStart'].visible) {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListSearch'][0]['groupUI'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                        }, 1800);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 23) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui: any = scene['dialog'];
                    ui['getITemListSearch']();
                    if (ui['itemListSearch'][0]['btnStart'].visible) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListSearch'][0]['groupUI'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 24) {
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8003) { // 介绍公会副本
                if (curStep_ == 0) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.LeagueInstanceMain");
                    if (bLoading) {
                        Teach.openSceneName = "zj.LeagueInstanceMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['groupBoss1'].getChildByName("item1") != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupBoss1'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        Teach.setOperateTeachStep(7);
                    }
                }
                else if (curStep_ == 2) { // 锁定挑战次数
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 3) { // 锁定刷新
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach2'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui);
                    Teach.addOnceEvent(ui);
                }
                else if (curStep_ == 4) { // 锁定奖励预览
                    let ui: any = zj.Game.UIManager.topScene();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnViewAward'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnViewAward']);
                    Teach.addOnceEvent(ui['btnViewAward']);
                }
                else if (curStep_ == 5) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.LeagueInstanceViewAward");
                    if (bLoading) {
                        Teach.openDialogName = "zj.LeagueInstanceViewAward";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8004) { // 介绍公会boss
                if (curStep_ == 0) {
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.LeagueBossFighting") {
                        let [ui, bLoading] = Teach.GetDstUI("zj.LeagueBossFighting");
                        if (bLoading) {
                            Teach.openDialogName = "zj.LeagueBossFighting";
                            Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }
                    else if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.LeagueBossInfo") {
                        let [ui, bLoading] = Teach.GetDstUI("zj.LeagueBossInfo");
                        if (bLoading) {
                            Teach.openSceneName = "zj.LeagueBossInfo";
                            Teach.isNeedOpenAddStep = false;
                            return;
                        }
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 1) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8009) { // 猎人执照满足第一次考试
                if (curStep_ < 5) {
                    Teach.LevelUpToBtn(curStep_, "btnLisence", "zj.licenseMain");
                }
                else if (curStep_ == 5) { // 锁定界面
                    let [top, bLoading] = Teach.GetDstUI("zj.licenseMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.licenseMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (ui['groupExamination'].visible) {
                        if (ui['groupTalk1'].visible) {
                            Teach.setOperateTeachStep(11); // 可以考试
                        }
                        else {
                            Teach.addOperateTeachStep(); // 领取奖励
                        }
                    }
                    else {
                        Teach.addOperateTeachStep(); // 领取奖励
                    }
                }
                else if (curStep_ == 7) { // 第一项领奖
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    if (ui['teachNotGetTbl'][0]) { // 第一项可领奖
                        ui['getItemListInfo']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListInfo'][0]['btnPlayer'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][0]['btnPlayer']);
                        Teach.addOnceEvent(ui['itemListInfo'][0]['btnPlayer']);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 8) { // 第二项领奖
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let dialog = Table.FindF(ui['teachNotGetTbl'], function (_k, _v) {
                        return (_k < 1) && (_v == true);
                    });
                    if (ui['teachNotGetTbl'][1]) {
                        ui['getItemListInfo']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListInfo'][1]['btnPlayer'], true, !dialog, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][1]['btnPlayer']);
                        Teach.addOnceEvent(ui['itemListInfo'][1]['btnPlayer']);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 9) { // 第三项领奖
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let dialog = Table.FindF(ui['teachNotGetTbl'], function (_k, _v) {
                        return (_k < 2) && (_v == true);
                    });
                    if (ui['teachNotGetTbl'][2]) {
                        ui['getItemListInfo']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListInfo'][2]['btnPlayer'], true, !dialog, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][2]['btnPlayer']);
                        Teach.addOnceEvent(ui['itemListInfo'][2]['btnPlayer']);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 10) { // 第二项领奖
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    let dialog = Table.FindF(ui['teachNotGetTbl'], function (_k, _v) {
                        return (_k < 3) && (_v == true);
                    });
                    if (ui['teachNotGetTbl'][1]) { // 第一项可领奖
                        ui['getItemListInfo']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListInfo'][3]['btnPlayer'], true, !dialog, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['itemListInfo'][3]['btnPlayer']);
                        Teach.addOnceEvent(ui['itemListInfo'][3]['btnPlayer']);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 11) { // 进入考场保存
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.SaveTeachPart(false, 8009);
                    Teach.SaveTeachPartLocal(curPart_);
                    setTimeout(function () {
                        if (ui['groupExamination'].visible) {
                            if (ui['groupTalk1'].visible) {
                                if (egret.getQualifiedClassName(ui) == "zj.licenseMain") {
                                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnHunterExamination'], true, true, false, 1, 0.7, false, false);
                                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnHunterExamination']);
                                    Teach.addOnceEvent(ui['btnHunterExamination']);
                                }
                            }
                            else {
                                Teach.setOperateTeachStep(14);
                            }
                        }
                        else {
                            Teach.setOperateTeachStep(14);
                        }
                    }, 300);
                }
                else if (curStep_ == 12) { // 等待执照界面出现
                    let [top, bLoading] = Teach.GetDstUI("zj.licenseExamination");
                    if (bLoading) {
                        Teach.openDialogName = "zj.licenseExamination";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 13) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 14) {
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8011) { // 首次进入公会介绍
                if (curStep_ == 0) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.LeagueHomeScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.LeagueHomeScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();

                }
                else if (curStep_ == 1) { // 介绍
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8012) { // 念兽介绍
                if (curStep_ < 5) {
                    // if (zj.Game.UIManager.topDialog() != null) {
                    //     Teach.removeMask();
                    //     Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                    //     Teach.isNeedCloseAddStep = false;
                    //     return;
                    // }
                    // Teach.addMask();
                    // Teach.LevelUpToBtn(curStep_, "btnPet", "zj.PetMainScene");
                    Teach.setOperateTeachStep(7);
                }
                else if (curStep_ == 5) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.PetMainScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.PetMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 6) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8013) { // 念兽召唤
                if (curStep_ < 5) {
                    // Teach.LevelUpToBtn(curStep_, "btnPet", "zj.PetMainScene");
                    Teach.setOperateTeachStep(7);
                }
                else if (curStep_ == 5) { // 聚焦念兽列表可召唤项
                    Teach.addMask();
                    let [top, bLoading] = Teach.GetDstUI("zj.PetMainScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.PetMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let index: number | boolean;
                    index = PlayerAdviserSystem.Haves();
                    if (index == false) {
                        Teach.setOperateTeachStep(7);
                    }
                    else {
                        let ui: any = zj.Game.UIManager.topScene();
                        let findk;
                        for (let [k, v] of HelpUtil.GetKV(ui['info'])) {
                            if (v.adviser_id == index) {
                                findk = Number(k);
                                break;
                            }
                        }
                        if (findk == null) {
                            Teach.setOperateTeachStep(7);
                            return;
                        }
                        ui['listAdviser'].selectedIndex = findk;
                        ui['getItemList']();

                        setTimeout(function () {
                            if (ui['itemList'][findk]['btnPetName'].enabled) {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][findk], true, true, false, 1, 0.7, false, false, true);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['listAdviser']);
                                Teach.addOnceEvent(ui['listAdviser']);
                            }
                            else {
                                if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][findk], true, true, false, 1, 0.7, false, false, true);
                                zj.Game.UIManager.setMaskAttachedTapObj(ui['listAdviser']);
                                Teach.addOnceEvent(ui['listAdviser']);
                            }
                        }, 1000);
                    }
                }
                else if (curStep_ == 6) {
                    let scene: any = zj.Game.UIManager.topScene();
                    let ui = scene['groupProperty'].getChildByName("DontGet");
                    if (ui == null) {
                        Teach.openUiName = "zj.PetDontGet";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (ui['btnAddFragment'] == null) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnAddFragment'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAddFragment']);
                        Teach.addOnceEvent(ui['btnAddFragment']);
                    }
                }
                else if (curStep_ == 7) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.delTouchTipSpx();
                    Teach.removeMask();
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8018) { // 猎人合成
                if (curStep_ < 5) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    Teach.LevelUpToBtn(curStep_, "btnHunter", "zj.HunterMainScene");
                }
                else if (curStep_ == 5) {
                    let [top, bLoading] = Teach.GetDstUI("zj.HunterMainScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let ui: any = top.getChildByName("hunterHero");
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnCompound'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnCompound']);
                        Teach.addOnceEvent(ui['btnCompound']);
                    }, 300);
                }
                else if (curStep_ == 6) { // 等待界面出现 聚焦左侧   
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterCompound");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterCompound";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupleft'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupleft']);
                    Teach.addOnceEvent(ui['groupleft']);
                }
                else if (curStep_ == 7) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupRight'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupRight']);
                    Teach.addOnceEvent(ui['groupRight']);
                }
                else if (curStep_ == 8) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach3'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach3']);
                    Teach.addOnceEvent(ui['groupTeach3']);
                }
                else if (curStep_ == 9) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['getItemListMaterial']();
                    if (ui['itemListMaterial'][0] == undefined) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    if (ui['itemListMaterial'][0].data.id != null) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemListMaterial'][0], true, true, false, 1, 0.7, false, false, true);
                        Teach.addOnceEvent(ui['listMaterial']);
                    }
                    else {
                        Teach.setOperateTeachStep(12);
                    }
                }
                else if (curStep_ == 10) { // 等待HunterBreakPopDialog
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterBreakPopDialog");
                    if (bLoading) {
                        Teach.openDialogName = "zj.HunterBreakPopDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['listHunter'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 11) { // 关闭pop
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    Teach.addOnceEvent(ui['btnClose']);
                }
                else if (curStep_ == 12) {
                    let [ui, bLoading] = Teach.GetDstUI("zj.HunterCompound");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnConpound'], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }, 300);
                }
                else if (curStep_ == 13) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8014) { // 猎人觉醒
                if (curStep_ == 0) {
                    let scene: any = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(scene) != "zj.HunterMainScene") {
                        Teach.openSceneName = "zj.HunterMainScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    let ui: any = scene.getChildByName("awaken");
                    if (ui == null || ui.alpha != 1) {
                        Teach.needIsEndAni = true;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8015) { // 领取执照
                if (curStep_ < 5) {
                    Teach.addMask();
                    setTimeout(function () {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.licenseMain") {
                            Teach.setOperateTeachStep(5);
                        }
                        else {
                            Teach.LevelUpToBtn(curStep_, "btnLisence", "zj.licenseMain");
                        }
                    }, 300);
                }
                else if (curStep_ == 5) {
                    let [top, bLoading] = Teach.GetDstUI("zj.licenseMain");
                    if (bLoading) {
                        Teach.openDialogName = "zj.licenseMain";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 6) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) { // 领取执照
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.licenseMain") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (ui['groupExamination'].visible) {
                        if (ui['groupTalk2'].visible) {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnGetLicence'], true, true, false, 1, 0.7, false, false);
                            zj.Game.UIManager.setMaskAttachedTapObj(ui['btnGetLicence']);
                            Teach.addOnceEvent(ui['btnGetLicence']);
                        }
                        else {
                            Teach.setOperateTeachStep(11);
                        }
                    }
                    else {
                        Teach.setOperateTeachStep(11);
                    }
                }
                else if (curStep_ == 8) { // 等待界面出现
                    let [top, bLoading] = Teach.GetDstUI("zj.licenseHunterUpStar");
                    if (bLoading) {
                        Teach.openDialogName = "zj.licenseHunterUpStar";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (top['aniEnd']) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.needIsEndAni = true;
                        return;
                    }
                }
                else if (curStep_ == 9) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 10) {
                    let ui: any = zj.Game.UIManager.topDialog();
                    ui['onClose']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 11) {
                    Teach.SaveTeachPart(false, 8015);
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8016) { // 图鉴
                if (curStep_ == 0) { // 获取界面
                    let [top, bLoading] = Teach.GetDstUI("zj.HeroesPokedexScene");
                    if (bLoading) {
                        Teach.openSceneName = "zj.HeroesPokedexScene";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['currPageIndex'] != 5) {
                        ui['HunterGroup5']();
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 2) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 3) {
                    let ui: any = zj.Game.UIManager.topScene();
                    let index: number;
                    for (let [k, v] of HelpUtil.GetKV(ui['retMap'])) {
                        if (PlayerHunterSystem.GetGeneralId(v.generalInfo.general_id) == this._ID_XIAOJIE) {
                            index = Number(k);
                            break;
                        }
                    }
                    if (index != null) {
                        ui['listType0'].selectedIndex = index;
                        ui['getItemList']();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 0, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                    }
                    else {
                        Teach.setOperateTeachStep(9);
                    }
                }
                else if (curStep_ == 4) { // 点击小杰
                    let ui: any = zj.Game.UIManager.topScene();
                    let index: number;
                    for (let [k, v] of HelpUtil.GetKV(ui['retMap'])) {
                        if (PlayerHunterSystem.GetGeneralId(v.generalInfo.general_id) == this._ID_XIAOJIE) {
                            index = Number(k);
                            break;
                        }
                    }
                    ui['getItemList']();
                    (<eui.Scroller>ui['scorllertype']).scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['itemList'][0], true, true, false, 1, 0.7, false, false, true);
                    Teach.addOnceEvent(ui['listType0']);
                }
                else if (curStep_ == 5) { // 等待界面出现
                    let ui: any = zj.Game.UIManager.topScene();
                    let dialog: any = ui.getChildByName("HeroesPokedexInfo");
                    if (ui != null && ui.scaleX == 1 && ui.scaleY == 1) {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.openUiName = "zj.HeroesPokedexInfo";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 6) {
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 7) {
                    let ui: any = zj.Game.UIManager.topScene();
                    let dialog: any = ui.getChildByName("HeroesPokedexInfo");
                    if (Teach.isHaveTip() == true) Teach._reuse_button(dialog['btnClose'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(dialog['btnClose'])
                    Teach.addOnceEvent(dialog['btnClose']);
                }
                else if (curStep_ == 8) {
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 9) {
                    let ui: any = zj.Game.UIManager.topScene();
                    (<eui.Scroller>ui['scorllertype']).scrollPolicyV = eui.ScrollPolicy.ON;
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['groupTeach1'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 10) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8017) { // 双色球
                if (curStep_ == 0) { // 获取界面
                    Teach.addMask();
                    let [top, bLoading] = Teach.GetDstUI("zj.DoubleColorSence");
                    if (bLoading) {
                        Teach.openDialogName = "zj.DoubleColorSence";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) == "zj.DoubleColorSence") {
                        Teach.addOperateTeachStep();
                    }
                    else {
                        Teach.openDialogName = "zj.DoubleColorSence";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (curStep_ == 1) { // 全屏对话
                    Teach.addMask();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 2) { // 点击预览奖励
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (egret.getQualifiedClassName(ui) != "zj.DoubleColorSence") {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(ui);
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnAwardView'], true, true, false, 1, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnAwardView']);
                    Teach.addOnceEvent(ui['btnAwardView']);
                }
                else if (curStep_ == 3) { // 等待界面出现
                    Teach.addMask();
                    let [top, bLoading] = Teach.GetDstUI("zj.DoubleColorViewAward")
                    if (bLoading) {
                        Teach.openDialogName = "zj.DoubleColorViewAward";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 4) { //全屏对话
                    Teach.addMask();
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.addOperateTeachStep();
                    }
                }
                else if (curStep_ == 5) {
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                        Teach.addOnceEvent(ui['btnClose']);
                    }, 200);
                }
                else if (curStep_ == 6) {
                    Teach.addMask();
                    let [top, bLoading] = Teach.GetDstUI("zj.DoubleColorSence");
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 7) { // 聚焦
                    Teach.addMask();
                    let ui: any = zj.Game.UIManager.topDialog();
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnOK'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                }
                else if (curStep_ == 8) { // 保存
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 4004) { // VIP或者15级引导3倍速战斗
                if (curStep_ == 0) {
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        Teach.openSceneName = "zj.StageSceneFightNormal";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];
                    if (ui['ButtonSend'] != null) { // 屏蔽聊天
                        ui['ButtonSend'].enabled = false;
                    }
                    if (fightScene['isWin']()) {
                        Teach.addOperateTeachStep();
                        return;
                    }
                    fightScene['pauseAll']();
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        Teach.openSceneName = "zj.StageSceneFightNormal";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];
                    if (Gmgr.Instance.bakeSpeedIndex == 1 || Gmgr.Instance.bakeSpeedIndex == 2) {
                        setTimeout(function () {
                            if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 0, 0.7, false, false, true);
                            Teach.addOnceEvent(ui['ButtonSpeed']);
                        }, 300);
                    }
                    else {
                        Teach.setOperateTeachStep(3);
                    }
                }
                else if (curStep_ == 2) {
                    let fightScene: any = zj.Game.UIManager.topScene();
                    if (fightScene == null) {
                        Teach.openSceneName = "zj.StageSceneFightNormal";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (fightScene['mainmenu'] == null) {
                        Teach.openFightUiName = "zj.Fight_Main";
                        return;
                    }
                    if (fightScene['mainmenu']['roleMsg'] == null) {
                        Teach.openFightUiName = "zj.Fight_RoleMsg";
                        return;
                    }
                    let ui: any = fightScene['mainmenu']['roleMsg'];
                    if (Gmgr.Instance.bakeSpeedIndex == 2) {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['ButtonSpeed'], true, true, false, 0, 0.7, false, false, true);
                        // zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonSpeed']);
                        Teach.addOnceEvent(ui['ButtonSpeed']);
                    }
                    else {
                        Teach.setOperateTeachStep(3);
                    }
                }
                else if (curStep_ == 3) {
                    Teach.ResumeAddStep();
                }
                else if (curStep_ == 4) {
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8024) { // 展示首充
                if (curStep_ == 0) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addOperateTeachStep();
                }
                else if (curStep_ == 1) {
                    loadUI(HXH_FirstChargeMainNew).then((scene: HXH_FirstChargeMainNew) => {
                        scene.show();
                        Teach.removeMask();
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.EndCurPart(false);
                        Teach.delTouchTipSpx();
                    });
                }
            }
            else if (curPart_ == 8025) { // 展示新手礼包A
                let gifts = PlayerGiftSystem.ShowInCity();
                if (gifts.length == 0) {
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal(curPart_);
                    Teach.EndCurPart(false);
                }
            }
            else if (curPart_ == 8026) { // 点击社交
                if (curStep_ == 0) {
                    if (SceneManager.instance.isMainCityScene()) {
                        Teach.addMask();
                        let ui = Game.UIManager.topScene() as MainCityUI;
                        // Game.UIManager.setMaskAttachedTapObj(ui.sceneUI['btnFriend']);
                        if (Teach.isHaveTip() == true) {
                            Teach.removeMask();
                            // Game.UIManager['maskRect'].visible = false;
                            // Game.UIManager['maskCount'] = 0;
                            Teach._reuse_button(ui.sceneUI['btnFriend'], true, true, false, 1, 0.7, false, false, true);
                        }
                        Teach.openSceneName = "zj.Friend_MainFriendSence";
                        Teach.isNeedOpenAddStep = true;
                        return;
                    }
                }
                else if (curStep_ == 1) {
                    Teach.addMask();
                    // let ui = Game.UIManager.topScene() as Friend_MainFriendSence;
                    let [ui, bLoading] = Teach.GetDstUI("zj.Friend_MainFriendSence");
                    if (bLoading) {
                        Teach.openSceneName = "zj.Friend_MainFriendSence";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    // Game.UIManager.setMaskAttachedTapObj(ui['buttonAdd']);
                    setTimeout(function () {
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonAdd'], true, true, false, 1, 0.7, false, false, true);
                        Teach.openDialogName = "zj.Friend_AddFriend";
                        Teach.isNeedOpenAddStep = true;
                        ui['buttonAdd'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                        }, null);
                    }, 500);
                    return;
                }
                else if (curStep_ == 2) {
                    Teach.addMask();
                    let ui = Game.UIManager.topDialog() as Friend_AddFriend;
                    setTimeout(function () {
                        // Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false, true);
                        ui['buttonClose'].once(egret.TouchEvent.TOUCH_TAP, () => {
                            Game.PlayerInfoSystem.checkAgreeEnter();
                            Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                        }, null);
                        Teach.closeDialogName = "zj.Friend_AddFriend";
                        Teach.isNeedCloseAddStep = true;
                    }, 500);
                    return;
                }
                else if (curStep_ == 3) {
                    let ui = Game.UIManager.topScene() as Friend_MainFriendSence;
                    // Game.UIManager.setMaskAttachedTapObj(ui['buttonClose']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['buttonClose'], true, true, false, 1, 0.7, false, false, true);
                    Teach.closeSceneName = "zj.Friend_MainFriendSence";
                    Teach.isNeedCloseAddStep = true;
                    ui['buttonClose'].once(egret.TouchEvent.TOUCH_TAP, () => {
                        Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                        Teach.removeMask();
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal(curPart_);
                        Teach.EndCurPart(false);
                        Teach.delTouchTipSpx();
                    }, null);
                    return;
                }
            }
        }
    }
}