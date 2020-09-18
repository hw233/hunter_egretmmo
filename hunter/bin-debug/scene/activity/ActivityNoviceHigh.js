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
     * @author xing li wei
     *
     * @date 2019-3-29
     *
     * @class 高手进阶
     */
    var ActivityNoviceHigh = (function (_super) {
        __extends(ActivityNoviceHigh, _super);
        // public btnClose: eui.Button;
        // public listViewTag: eui.List;
        // public imgBar: eui.Image;
        // public imgBar1: eui.Image;
        // public labelCount: eui.BitmapLabel;
        // public listViewItem: eui.List;
        // public btnGift: eui.Button;
        // public labelTime: eui.Label;
        // public labelTime1: eui.Label;
        // public labelTime2: eui.Label;
        // public labelTime3: eui.Label;
        // public imgbg: eui.Image;
        // public noviceType: number = 1;
        // public typeId: number = 1;
        // public procType: number;
        // public missionType: number;
        // public data: Array<{ [0]: { mission: message.MissionInfo }, [1]: { typeInfo: TableMissionType }, [2]: { _ROW_ITEM: number }, [3]: { index: number }, [4]: { dataInfo: Array<TableMissionItem> }, [5]: { sort: number }, [6]: { lock: boolean }, [7]: { state: Array<number> }, [8]: { finishs: Array<any> | Array<Array<any>> }, [9]: { finish } }>;
        // public tokenNow: number = 0;
        // public tokenAll: number = 0;
        // public sizeCount;
        // public c: number;
        // public array = new eui.ArrayCollection();
        // public index: number = 3;
        // public vislist: boolean = true;
        // public TableEnumNoviceGift = {
        // 	[0]: CommonConfig.missionnew_goods, [1]: CommonConfig.missionnew_reward_one, [2]: CommonConfig.missionnew_reward_two,
        // 	[3]: CommonConfig.missionnew_reward_maqi, [4]: CommonConfig.missionnew_reward_kubi
        // }
        // public NoviceMissionType = {
        // 	[1]: TableEnum.Enum.NoviceType0,
        // 	[2]: TableEnum.Enum.NoviceType1,
        // 	[3]: TableEnum.Enum.NoviceType2,
        // 	[4]: TableEnum.Enum.NoviceTypeMAQI,
        // 	[5]: TableEnum.Enum.NoviceTypeKUBI,
        // }
        // public type;
        // /**用于赋值奖励详情界面有利于界面移除 */
        // public commonDesSkill: Common_PlayerCardPopB | CommonDesGeneral | Common_DesRes | Common_DesProp | ArenaWholePop | Common_DesRandom | PlayerCardPopDialog;
        // /**判断奖励详情界面是否已加载进界面 */
        // public commonDesSkillvis: boolean = false;
        function ActivityNoviceHigh() {
            return _super.call(this) || this;
            // this.skinName = "resource/skins/activity/ActivityNoviceHighSkin.exml";
            // this.init();
        }
        return ActivityNoviceHigh;
    }(zj.noviceBase));
    zj.ActivityNoviceHigh = ActivityNoviceHigh;
    __reflect(ActivityNoviceHigh.prototype, "zj.ActivityNoviceHigh");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceHigh.js.map