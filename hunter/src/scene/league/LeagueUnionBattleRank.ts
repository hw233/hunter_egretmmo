namespace zj {
//公会战-公会排行-主界面
//yuqingchao
//2019.02.21
export class LeagueUnionBattleRank extends Dialog {
    private btnStrongWorld: eui.Button;     //世界排行按钮
    private btnThisSerRank: eui.Button;     //本服排行按钮
    private btnClose: eui.Button;
    private groupHead1: eui.Group;      //本服排行Top
    private groupHead3: eui.Group;      //世界排行Top
    private lstViewRank: eui.List;      //本服排行List
    private lstViewRankThis: eui.List;      //世界排行List
    private groupMyInfo: eui.Group;     //本服排行我的信息
    private lbMyRank: eui.Label;
    private imgMySegment: eui.Image;
    private lbMyUnionName: eui.Label;
    private lbMyRankScore: eui.Label;
    private array: eui.ArrayCollection;
    private array1: eui.ArrayCollection;
    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueUnionBattleRankSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnThisSerRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnThisSerRank, this);
        this.btnStrongWorld.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrongWorld, this);

        this.init();
    }

    private init() {
        this.onBtnThisSerRank();
        this.setMyInfo();
    }

    private applyRankInfo(tyep: number) {

    }
    //设置所在公会信息
    private setMyInfo() {
        let leagueBase = Game.PlayerLeagueSystem.BaseInfo;
        this.lbMyRank.text = leagueBase.match_rank.toString();
        this.imgMySegment.source = cachekey(PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4], this);
        this.lbMyUnionName.text = leagueBase.name;
        this.lbMyRankScore.text = leagueBase.match_score.toString();
    }

    private onBtnThisSerRank() {
        this.btnThisSerRank.currentState = "down";
        this.btnStrongWorld.currentState = "up";
        this.groupHead1.visible = true;
        this.groupHead3.visible = false;
        this.groupMyInfo.visible = true;
        this.lstViewRankThis.visible = false;
        this.lstViewRank.visible = true;
        Game.PlayerLeagueSystem.leagueMatchQueryRank(1)
            .then((arr: Array<message.CraftLeagueRankInfo>) => {
                this.SetInfoMall(arr)
            })
    }

    private onBtnStrongWorld() {
        this.btnThisSerRank.currentState = "up";
        this.btnStrongWorld.currentState = "down";
        this.groupHead1.visible = false;
        this.groupHead3.visible = true;
        this.groupMyInfo.visible = false;
        this.lstViewRank.visible = false;
        this.lstViewRankThis.visible = true;
        Game.PlayerLeagueSystem.leagueMatchQueryRank(4)
            .then((arr: Array<message.CraftLeagueRankInfo>) => {
                this.SetInfoMall1(arr)
            })
    }
    private SetInfoMall(arr: Array<message.CraftLeagueRankInfo>) {
        this.array = new eui.ArrayCollection();
        for (let i = 0; i < arr.length; i++) {
            this.array.addItem({
                info: arr[i]
            })
        }
        this.lstViewRank.dataProvider = this.array;
        this.lstViewRank.itemRenderer = LeagueUnionBattleRankItemIR;
    }
    private SetInfoMall1(arr: Array<message.CraftLeagueRankInfo>) {
        this.array1 = new eui.ArrayCollection();
        let tempTab = [];
        for (let v of arr) {
            let server = PlayerLeagueSystem.GetServerName(v.group_name)
            let has = false;
            if (tempTab.length != 0) {
                for (let kk in tempTab) {
                    if (tempTab[kk]["serverName"] == server) {
                        tempTab[kk][v.rank] = v.leagueName
                        has = true
                    }
                }
            }
            if (!has) {
                let t = {}
                t["serverName"] = server
                t[v.rank] = v.leagueName
                tempTab.push(t)
            }
        }

        for (let v of tempTab) {
            let aData = {};
            aData["server"] = v["serverName"]
            aData["union1"] = v[1]
            aData["union2"] = v[2]
            aData["union3"] = v[3]

            this.array1.addItem({
                info: aData
            })
        }
        // for (let i = 0; i < arr.length; i++) {

        // }
        this.lstViewRankThis.dataProvider = this.array1;
        this.lstViewRankThis.itemRenderer = LeagueUnionBattleRankItem3IR;
    }
    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}