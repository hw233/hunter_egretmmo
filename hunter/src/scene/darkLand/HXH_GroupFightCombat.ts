namespace zj {
// HXH_GroupFightCombat (飞龙营地 -- 挑战)
// wangshenzhuo
// 2019/03/15
export class HXH_GroupFightCombat extends Scene {

    private buttonReturn: eui.Button;
    private groupLeftTop: eui.Group;
    private labelLevel: eui.Label;
    private buttonCombat: eui.Button;
    private groupTeam1: eui.Group;
    private labelTeamName1: eui.Label;
    private imageTeamIcon1: eui.Image;
    private groupTeam2: eui.Group;
    private labelTeamName2: eui.Label;
    private imageTeamIcon2: eui.Image;
    private groupTeam3: eui.Group;
    private labelTeamName3: eui.Label;
    private imageTeamIcon3: eui.Image;
    private groupEnemy1: eui.Group;
    private labelEnemyName1: eui.Label;
    private imageEnemyIcon1: eui.Image;
    private groupEnemy2: eui.Group;
    private labelEnemyName2: eui.Label;
    private imageEnemyIcon2: eui.Image;
    private groupEnemy3: eui.Group;
    private labelEnemyName3: eui.Label;
    private imageEnemyIcon3: eui.Image;
    private buttonChange1: eui.Button;
    private buttonChange2: eui.Button;
    private groupMainLeft: eui.Group;
    private imageBg: eui.Image;

    private groupleft = [];
    private groupright = [];
    private imageleft = [];
    private imageright = [];
    private nameleft = [];
    private nameright = [];
    private order = [];

    private leftPos = [];
    private rightPos = [];
    private bInteach: boolean;

    private Posx0;
    private Posx1;
    private Posx2;
    private Posy0;
    private Posy1;
    private Posy2;

    public father: HXH_GroupFightFormate;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightCombatSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonChange1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChange1, this);
        this.buttonChange2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChange2, this);
        this.buttonCombat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonOpen, this);
        if (this.width >= 1344) {
            this.imageBg.scaleX = this.width / 1334;
        }
        this.init();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this);
		}, this)
    }

    private init() {
        this.groupleft = [
            this.groupTeam1,
            this.groupTeam2,
            this.groupTeam3,
        ];

        this.groupright = [
            this.groupEnemy1,
            this.groupEnemy2,
            this.groupEnemy3,
        ];

        this.imageleft = [
            this.imageTeamIcon1,
            this.imageTeamIcon2,
            this.imageTeamIcon3,
        ];

        this.imageright = [
            this.imageEnemyIcon1,
            this.imageEnemyIcon2,
            this.imageEnemyIcon3,
        ];

        this.nameleft = [
            this.labelTeamName1,
            this.labelTeamName2,
            this.labelTeamName3,
        ];

        this.nameright = [
            this.labelEnemyName1,
            this.labelEnemyName2,
            this.labelEnemyName3,
        ];

        this.order = [1, 2, 3];

        for (const k in this.groupleft) {
            const v = this.groupleft[k];
            v.visible = false;
        }

        for (const k in this.groupright) {
            const v = this.groupright[k];
            v.visible = false;
        }

        for (const k in this.imageleft) {
            const v = this.imageleft[k];
            v.visible = false;
        }

        for (const k in this.imageright) {
            const v = this.imageright[k];
            v.visible = false;
        }

        this.buttonChange1.visible = false;
        this.buttonChange2.visible = false;

        this.InitMovePos();

        egret.Tween.get(this).wait(500).call(() => {
            this.EntranceAni();
        })

    }

    public SetTeach() {
        this.bInteach = true;
    }

    //开场动画
    public EntranceAni() {
        for (const k in this.groupleft) {
            const v = this.groupleft[k];
            egret.Tween.get(this.groupleft[k])
                .to({ visible: false }, 0)
                .to({ x: -480 }, 0).wait(100 * (Number(k)))
                .to({ visible: true })
                .to({ x: 10 }, 200, egret.Ease.sineOut)
                .to({ x: 0 }, 50)
        }

        for (const k in this.groupright) {
            const v = this.groupright[k];
            egret.Tween.get(this.groupright[k])
                .to({ visible: false }, 0)
                .to({ x: 480 }, 0).wait(100 * (Number(k)))
                .to({ visible: true })
                .to({ x: -10 }, 200, egret.Ease.sineOut)
                .to({ x: 0 }, 50)
        }

        for (const k in this.imageleft) {
            const v = this.imageleft[k];
            egret.Tween.get(this.imageleft[k])
                .to({ visible: false }, 0)
                .to({ x: -480 }, 0).wait(200 * (Number(k)))
                .to({ visible: true })
                .to({ x: 64 }, 200, egret.Ease.sineOut)
                .to({ x: 54 }, 50)
        }

        for (const k in this.imageright) {
            const v = this.imageright[k];
            egret.Tween.get(this.imageright[k])
                .to({ visible: false }, 0)
                .to({ x: 200 }, 0).wait(200 * (Number(k)))
                .to({ visible: true })
                .to({ x: 0 }, 200, egret.Ease.sineOut)
                .to({ x: 10 }, 50).call(() => {
                    if (Number(k) == 2) {
                        this.buttonChange1.visible = true;
                        this.buttonChange2.visible = true;
                    }
                })
        }
    }

    public SetInfo(father: HXH_GroupFightFormate) {
        this.father = father;
        this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.hard, this.father.DiffInfo.id % 10000);

        this.SetInfoRightInfo();
        this.SetInfoFightFormation();
        this.SetInfoLeftInfo();
    }

    //右侧领主boss信息
    private SetInfoRightInfo() {
        for (const k in this.father.DiffInfo.boss_roleId) {
            const v = this.father.DiffInfo.boss_roleId[k];
            let generalId = v[0];
            let teamName = this.father.DiffInfo.boss_name1[k];

            let mapRoleId: any = PlayerHunterSystem.Table(generalId).general_roleId;
            let eyePath = TableMapRole.Table()[mapRoleId].eye_head;
            this.imageright[k].source = cachekey(eyePath, this);
            this.nameright[k].visible = true;
            this.nameright[k].text = teamName;
        }
    }

    private SetInfoFightFormation() {
        for (const k in this.order) {
            const v = this.order[k];
            let formation = new message.DetailFormationInfo;
            if (v == 3) {
                formation = this.father.friendFormate;
            } else {
                formation.advisers = Game.PlayerAdviserSystem.adviser;
                formation.pets = Game.PlayerAdviserSystem.petInfo;
                formation.historyGenerals = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();

                for (let i = 0; i < this.father.generalNum; i++) {
                    let generalInfo = new message.GeneralInfo;
                    if (Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals[i] != 0 && Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals[i] != null) {
                        generalInfo = Game.PlayerHunterSystem.allHuntersMap()[Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals[i]];
                    }
                    formation.generals.push(generalInfo);
                }
                for (let i = 0; i < this.father.supportNum; i++) {
                    let generalInfo = new message.GeneralInfo;
                    if (Game.PlayerFormationSystem.formatsGroupFight[v - 1].supports[i] != 0 && Game.PlayerFormationSystem.formatsGroupFight[v - 1].supports[i] != null) {
                        generalInfo = Game.PlayerHunterSystem.allHuntersMap()[Game.PlayerFormationSystem.formatsGroupFight[v - 1].supports[i]];
                    }
                    formation.supports.push(generalInfo);
                }
            }
            PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[k] = formation;
        }
    }

    //左侧君主信息
    private SetInfoLeftInfo() {
        for (const k in this.order) {
            const v = this.order[k];
            let generalId = null;
            let teamName = TextsConfig.TextsConfig_GroupFight.noFriend;
            if (v == 3) {
                let findGeneralId: any = Table.FindR(this.father.friendFormate.generals, function (kk, vv) {
                    if (vv == 0) {
                        return false;
                    } else {
                        return vv.general_id != 0;
                    }
                })
                if (findGeneralId[0] == null) {
                    generalId = 0;
                    teamName = TextsConfig.TextsConfig_GroupFight.noFriend;
                } else {
                    generalId = findGeneralId[0].general_id;
                    teamName = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.teamName, this.father.bUsedInfo[1].name);
                }
            } else {
                let a = Game.PlayerFormationSystem.formatsGroupFight;
                let findGeneralId = Table.FindR(Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals, function (kk, vv) {
                    return vv != 0;
                })
                generalId = findGeneralId[0] || 0;
                teamName = TextsConfig.TextsConfig_GroupFight.myTeamName[v - 1];
            }
            if (generalId != 0 && generalId != null) {
                let mapRoleId = PlayerHunterSystem.Table(generalId).general_roleId;
                let eyePath = TableMapRole.Table()[mapRoleId].eye_head;
                this.imageleft[k].source = cachekey(eyePath, this);
            } else {
                let eyePath = "hero_role_wu_png";
                this.imageleft[k].source = cachekey(eyePath, this);
            }
            this.nameleft[k].text = teamName;
        }

    }

    private onButtonChange1() {
        this.buttonChange1.enabled = false;
        this.buttonChange2.enabled = false;
        this.SetInfoControlMove(0);
    }

    private onButtonChange2() {
        this.buttonChange1.enabled = false;
        this.buttonChange2.enabled = false;
        this.SetInfoControlMove(1);
    }

    private SetInfoControlMove(index) {

        egret.Tween.get(this.imageleft[index + 1]).wait(200)
            .to({ x : this["Posx" + (index + 1)] , y : this["Posy" + (index + 1)]} , 5)
            .to({ x : this["Posx" + index] , y : this["Posy" + index]} , 410 , egret.Ease.sineInOut).call(()=>{
        this.tmp(index);
        this.buttonChange1.enabled = true;
        this.buttonChange2.enabled = true;
        })

        egret.Tween.get(this.imageleft[index]).wait(200)
            .to({ x : this["Posx" + index] , y : this["Posy" + index]} , 0)
            .to({ x : this["Posx" + (index + 1)] , y : this["Posy" + (index + 1)]} , 400 , egret.Ease.sineInOut)
    }
    public tmp(index) {
        let tmp = Table.DeepCopy(this.order[index]);
        this.order[index] = this.order[index + 1];
        this.order[index + 1] = tmp;
        
        let imgTmp = this.imageleft[index];
        this.imageleft[index] = this.imageleft[index + 1];
        this.imageleft[index + 1 ] = imgTmp;
        
        let tmps = Table.DeepCopy(PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index]);
        PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index] = PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index + 1];
        PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index + 1] = tmps;

        setTimeout(() => {
            this.SetInfoLeftInfo();
        }, 100)

    }

    private InitMovePos() {
        for (let i = 0; i < 3; i++) {
            this["Posx" + i] = this.imageleft[i].x;
            this["Posy" + i] = this.imageleft[i].y;
        }

        this.leftPos = [];
        this.rightPos = [];

        for (let i = 0; i < 2; i++) {
            let p0 = [0, 0];
            let p1 = [55, (this["Posy" + (i + 1)] - this["Posy" + i]) / 2];
            let p2 = [0, (this["Posy" + (i + 1)] - this["Posy" + i])];

            let p3 = [0, 0];
            let p4 = [0 - 35, (this["Posy" + i] - this["Posy" + (i + 1)]) / 2];
            let p5 = [0, (this["Posy" + i] - this["Posy" + (i + 1)])];

            let arrayLeft = this.CurvilinearPath(p3, p4, p5);
            let arrayRight = this.CurvilinearPath(p0, p1, p2);

            this.rightPos.push(arrayRight);
            this.leftPos.push(arrayLeft);
        }
    }

    private CurvilinearPath(p0, p1, p2) {
        let result = [];
        for (let i = 0; i < 10; i++) {
            let t = i / 10;
            result[i] = [];
            result[i]["x"] = (1 * Math.pow(1 - t, 2) * Math.pow(t, 0) * p0[0] + 2 * Math.pow(1 - t, 1) * Math.pow(t, 1) * p1[0] + 1 * Math.pow(1 - t, 0) * Math.pow(t, 2) * p2[0]);
            result[i]["y"] = (1 * Math.pow(1 - t, 2) * Math.pow(t, 0) * p0[1] + 2 * Math.pow(1 - t, 1) * Math.pow(t, 1) * p1[1] + 1 * Math.pow(1 - t, 0) * Math.pow(t, 2) * p2[1]);
        }
        result.push(p0);
        return result;
    }

    private onButtonOpen() {
        if (this.father.bUsedInfo[1].id == null || this.father.bUsedInfo[1].id == 0) {
            if (this.father.fakeRole == true && this.father.bInTeach == true) {
                this.SetFakeDetailRoleInfo();
                 this.BattleStart_Req();
            } else {
                let baseDetailInfo = new message.DetailFormationInfo;
                this.SetInfoDetailsInfo(baseDetailInfo);
                this.BattleStart_Req();
            }
        }else{
            this.GetFirendFormationReq();
        }
    }

    private GetFirendFormationReq() {
        let id = this.father.bUsedInfo[1].id;
        let groupid = this.father.bUsedInfo[1].group_id;
         Game.PlayerInfoSystem.queryRoleInfo(id , groupid , message.EFormationType.FORMATION_TYPE_GROUP_FIGHT).then((resp: message.RoleInfoZip) => {
             this.SetInfoDetailsInfo(resp.formations[0]);
             this.BattleStart_Req();
            }).catch(reason => { });
    }

    private BattleStart_Req() {

        let request = new message.BattleStartRequest();
        request.body.type = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
        request.body.id = this.father.id;
        request.body.ext = this.father.bUsedInfo[1].id || 0;
        Game.PlayerBattleSystem.sendFight(request)
            .then((value) => {
                let FightCB = () => {
                    Game.PlayerFormationSystem.curFormationIndex = 1;
                    Gmgr.Instance.starcraftIndex = 1;
                    this.CacheGroupSkillSpineId();
                    StageSceneManager.Instance.ChangeScene(StageSceneFightBGroupFight);
                }
			    FightLoading.getInstance().loadFightRes(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT, FightCB, this);
            }).catch((reason) => {

            });
    }

    private CacheGroupSkillSpineId() {
        Gmgr.Instance.relatedAsynDataId = [];
        let detailFormation = PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[Gmgr.Instance.starcraftIndex];
        for (let i = 0; i < detailFormation.generals.length; i++) {
            let generalInfo = detailFormation.generals[i];
            if (generalInfo.general_id != 0) {
                for (let x = 0; x < generalInfo.skills.length; x++) {
                    Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
                }
            }
        }
        for (let i = 0; i < detailFormation.supports.length; i++) {
            let generalInfo = detailFormation.supports[i];
            if (generalInfo.general_id != 0) {
                for (let x = 0; x < generalInfo.skills.length; x++) {
                    Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId)
                }
            }
        }
        let retTbl = PlayerGroupFightSystem.Instance(PlayerGroupFightSystem.groupFightDetailsInfo.instanceId)
        let stageId = retTbl.monster_stages[Gmgr.Instance.starcraftIndex-1]
        let enemys = getEnemyFomation({ stageId })
        for (const k in enemys) {
            const v = enemys[k];
            let info = Game.PlayerMobSystem.Instance(v.id);
            Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
        }
    }

    public SetInfoDetailsInfo(formation) {
        let key = Table.FindK(this.order, 3);
        let star = Table.FindRcall(Game.PlayerWantedSystem.wantedInfo.groupBattleStar, function (k, v) {
            return v.key == this.father.id;
        },this);
        if (star == null || star[0] == null) {
            PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle = 0;
        } else {
            PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle = star[0].value;
        }

        PlayerGroupFightSystem.groupFightDetailsInfo.instanceId = this.father.id;
        PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos = this.order;
        PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[key] = formation;
        PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo = this.father.bUsedInfo[1];
    }

    public SetFakeDetailRoleInfo() {
        let baseDetailInfo = new message.DetailFormationInfo;
        for (let i = 0; i < 4; i++) {
            let general = new message.GeneralInfo;
        }
    }

    private onButtonClose() {
        this.close(UI.HIDE_TRAIL_OFF);
    }
}

}