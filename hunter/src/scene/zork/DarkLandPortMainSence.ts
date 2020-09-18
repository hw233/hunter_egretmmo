namespace zj {
// DarkLand_PortMain  (贪婪之岛 -- 港口)
// wangshenzhuo
// 2019/6/14

export class DarkLandPortMainSence extends Dialog {

    public imageBg: eui.Image;
    public buttonRuturn: eui.Button;
    public listHit: eui.List;
    public buttonEnter: eui.Button;
    public lebelRule: eui.Label;
    public labelTime: eui.Label;
    public labelAllCore: eui.Label;
    public labelRank: eui.Label;
    // public listRule: eui.List;

    public darklandMapTbl;
    private timer: egret.Timer;

    private TableViewItem: eui.ArrayCollection;
    private listRuleItem: eui.ArrayCollection;

    public constructor() {
        super();
        this.skinName = "resource/skins/zork/DarkLandPortMainSenceSkin.exml";
        //创建一个计时器对象
        this.timer = new egret.Timer(300, 0);
        // 注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.UpdateTime, this);
        this.timer.start();
        this.buttonRuturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonRuturn, this);
        this.buttonEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonEnter, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            if (this.timer) this.timer.stop();
        }, null);
    }

    public Init() {
        this.darklandMapTbl = TableDarkland.Table();
        this.UpdateTime();
        this.SetRule();
        this.SetInfoAward();
        this.ReqMyRank();
    }
    public isFullScreen() {
        return true;
    }

    public UpdateTime() {
        let [bOpen, lastTime] = PlayerDarkSystem.PortOpenTime();
        let str_time: any = this.formatMsTimeCh(lastTime);
        if (!bOpen) {
            str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, str_time);
            this.labelTime.textFlow = Util.RichText(str_time);
        } else {
            str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, str_time);
            this.labelTime.textFlow = Util.RichText(str_time);
        }
        this.buttonEnter.enabled = bOpen;
    }

    public SetRule() {
        this.lebelRule.text = RuleConfig.DarklandResource;;
    }

    public SetInfoAward() {
        let awardTbl: any = TableDarklandRankReward.Table();

        this.listHit.selectedIndex = -1; // 默认选中
        this.listHit.itemRenderer = DarkLandPortMainItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < Object.keys(awardTbl).length; i++) {
            let data = new DarkLandPortMainItemData();
            data.father = this;
            data.info = awardTbl[i + 1];
            data.index = i;
            this.TableViewItem.addItem(data);
        }
        this.listHit.dataProvider = this.TableViewItem;
    }

    private ReqMyRank() {
        PlayerDarkSystem.SceneQueryScoreRankReq().then((data: message.SceneQueryScoreRankResponse) => {
            this.labelAllCore.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.grade, data.body.self_rank.score);
            this.labelRank.text = data.body.self_rank.rank.toString();

            if (data.body.self_rank.rank == 0 || data.body.self_rank.score < CommonConfig.darkland_rank_base_score) {
                this.labelRank.text = (TextsConfig.TextsConfig_WonderlandBoss.disAttend);
            } else if (data.body.self_rank.rank >= 100) {
                this.labelRank.text = "100+";
            }
        }).catch(reason => { });
    }

    private onButtonRuturn() {
        this.close(UI.HIDE_TO_TOP);
    }

    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private onButtonEnter() {
        let bOpen = PlayerDarkSystem.PortOpenTime();
        if (bOpen || Device.isDevLog) {
            PlayerDarkSystem.SetFormationReq().then(() => {
                this.DarklandEnterReq();
            })
        } else {
            toast_warning(TextsConfig.TextsConfig_DarkLand.notOpen);
        }
    }

    public DarklandEnterReq() {
        Game.PlayerDarkSystem.SceneEnterRespBody().then(() => {
            Tips.tips_4_10_set(true);
            Game.PlayerWonderLandSystem.darkland.mapBlockIndex = this.darklandMapTbl[1].block_index;
            PlayerWonderLandSystem.MapHeight = 1500;
            MapSceneLoading.getInstance().loadFightRes(41, this.wonderland, this);
            Game.PlayerWonderLandSystem.darkland.darklandId = 1;
        }).catch((reason) => {
            if (reason == message.EC.XG_FORMATION_IS_EMPTY) {
                toast_warning(reason);
            } else {
                toast_warning(reason);
            }
        });
    }
    public wonderland() {
        StageSceneManager.Instance.ChangeScene(StageSceneDarkland);
    }

    // 中文时间
    private formatMsTimeCh(ms: number) {
        let d: number = Math.floor(ms / 86400);
        let ttmp: number = Math.floor(ms % 86400)
        let a: number = Math.floor(ttmp / 3600);
        let tmp: number = Math.floor(ttmp % 3600);
        let b: number = Math.floor(tmp / 60);
        let c: number = Math.floor(tmp % 60);

        let hour: any = a;
        let min: any = b;
        let sec: any = c;
        let day: any = d;
        if (a < 10) {
            hour = "0" + a;
        }
        if (b < 10) {
            min = "0" + b;
        }
        if (c < 10) {
            sec = "0" + c;
        }

        if (d == 0) {
            return hour + ":" + min + ":" + sec;
        }
        return day + ":" + hour + ":" + min + ":" + sec;
    }

}
}