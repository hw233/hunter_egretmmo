namespace zj {
    /**
     * @author haohuihui
     * 
     * @date 2018-12-11
     * 
     * @classs 设置红点
     */

    export class Tips {

        private static TIP_FORMART_SAVE = "_save_";
        private static TIP_FORMART_TIME = "_time_";
        private static TIP_FORMART_ACT = "_act_";

        // 主城红点Tag
        public static TAG = {

            // 主城上的tag
            LEAGUE: 1,     // 帮会
            LADDER: 2,     // 天梯
            MINE: 3,       // 矿洞
            WONDERLAND: 4, // 仙境
            TOWER: 5,      // 爬塔
            BASTILLE: 6,   // 伏牛
            WANTED: 7,     // 通缉
            TAVERN: 8,     // 酒馆(寻访是-1)
            MALL: 9,       // 商铺(建筑是26)
            JADE: 11,      // 玉石(建筑是40)

            // 副本界面的tag
            TEACH: 10,     // 教学

            // 界面上的tag
            MIN: 20,
            INSTANCE: 20,  // 副本
            TREAUSER: 21,  // 宝箱
            DAILY: 22,     // 日常
            AWARD: 23,     // 领奖
            CHANGE: 24,    // 充值
            ACTIVITY: 25,  // 活动
            NOTHING1: 26,  // 占空(商铺)
            GENERAL: 27,   // 武将
            ADVISER: 28,   // 军师
            FRIEND: 29,    // 好友
            RANK: 30,      // 排行
            PACKAGE: 31,   // 背包
            TASK: 32,      // 任务
            MAIL: 33,      // 邮件
            TRAIN: 34,     // 特训
            FIRST: 35,     // 首冲
            SEVEN: 36,     // 七天
            NOVICE: 37,    // 新手
            CHAT: 38,      // 聊天
            EQUIP: 39,     // 装备
            NOTHING2: 40,  // 占空(玉石)
            ARTIFACT: 41,  // 神兵
            MORE: 42,      // 更多
            FEEDBACK: 43,  // 回馈
            CONTEND: 44,   // 争霸
            ZORK: 45,      // 魔域
            RECOVERY: 46,  // 回收
            POTATO: 47,    // 宝物
            CHARGE: 48,    // 冲榜
            LICENSE: 49,   // 执照
            NEWGIFT: 50,   // 新类型礼包
            EGG: 51,       // 扭蛋机
            SPECIAL: 52,   // 福利活动
            Pokedex: 53,   // 图鉴
            RACE: 54,      // 时间赛跑
            VIPX: 55,      // 大V系统
            Jewel: 56,     // 积分商城
            WebPay: 57,    // WebPay
            Biography: 58, // 猎人传记
            XUYUAN: 59,    // 许愿屋
            NEWLOWGift: 60,// 至尊礼包
            NOVICE1: 61,   // 新手one
            DarkLand: 62,  // 黑暗大陆
            NOVICE2: 63,   // 新手two
            NOVICEMAQI: 64,// 玛琪活动
            NOVICEKUBI: 65,// 酷比活动
            WEEKMISSION: 66,// 周常
            ActivityBattle: 67,// 活动本
            PassBattle: 68, // 通行证
            MAX: 69,

            // 公会
            LEAGUE_DONATE: 1,
            LEAGUE_MALL: 2,
            LEAGUE_APPLY: 3,
            LEAGUE_INSTANCE: 4,
            LEAGUE_CELEBRATE: 5,
            LEAGUE_DEFENCE_FORMATE: 6,
            LEAGUE_ENTRANCE: 7,
            MATCH_MALL: 8,
            LEAGUE_SIGNIN: 9,

            // 演武堂
            LADDER_MAIL: 1,
            LADDER_MALL: 2,
            LADDER_FIGHT: 3,
            CONTEND_AWARD: 4,
            CONTEND_COUNT: 5,
            PK_MALL: 6,
            CHARGE_CHALLENGE: 7,

            CONTEND_MALL: 1,

            // 如意商铺
            TREAUSER_KEY: 1,
            TREAUSER_MALL: 2,

            // 魔域商铺
            ZORK_MALL: 1,
            ZORK_Boss: 2,
            ZORK_Runes: 3,
            ZORK_Convert: 4,

            // 日常
            DAILY_GIFT: 1,
            DAILY_ACTIVE: 2,
            DAILY_ACHIEVE: 3,
            // DAILY_TASK : 4,

            FIGHT: 1,
            RUNES: 2,
            FISH: 3,
            EXCHANGE: 4,
            COLLECT: 5,
            DOUBLE: 6,
            ZORK_BOSS: 7,
            GROUPFIGHT: 8,
            FASHION: 9,
            PORT: 10,

            AWARD_SIGN: 1,
            AWARD_POWER: 2,
            AWARD_GIFT: 3,
            AWARD_MONTH: 4,
            AWARD_FUND: 5,
            AWARD_MONTHNEW: 6,

            SEVEN_Reward: 1,
            SEVEN_Gift: 2,

            VipX_Right: 1,      // 回馈
            VipXGift: 2,        // 商城
            VipX_WebPay: 3,     // webPay

            INST_GIFT: 1,
            INST_SEARCH: 2,

            MALL_MALL: 1,
            MALL_SECRET: 2,
            MALL_OTHER: 3,

            RELIC_MALL: 1,     // 黑暗大陆商店
            RELIC_INSTANCE: 2, // 黑暗大陆遗迹
            GROUPDARKFIGHT: 3, // 黑暗大陆遗迹

            TOWER_FLOOR: 1,

            BASTILLE_NUM: 1,

            WANTED_1: 1, // 通缉令1
            WANTED_2: 2, // 通缉令2
            WANTED_3: 3, // 通缉令3

            TAVERN_FREE: 1,

            JADE_DIVIDE: 1,
            JADE_COMPOSE: 2,
            ADE_CONVERT: 3,

            GENERAL_NEW: 1,
            GENERAL_GRADE: 2,
            GENERAL_GRADE_STEP: 3,
            GENERAL_SKILL: 4,
            GENERAL_Card: 5,
            GENERAL_UPSTAR: 6,
            GENERAL_AWAKEN: 7,
            GENERAL_PSYCHIC: 8,
            GENERAL_EQUIP: 9,
            GENERAL_UPLEVEL: 10,

            EQUIP_TIPS: 1,

            ADVISER_GET: 1,  // 念兽可召唤
            ADVISER_UP: 2,   // 念兽强化
            ADVISER_AWARD: 3, // 念兽可领取奖励
            PET_GET: 4,  // 宠物可召唤
            PET_UPSTAR: 5, // 宠物可升星
            PET_STEP: 6,

            FIRST_UNCHARGE: 1,
            FIRST_UNREWARD: 2,

            CHAT_ALLY: 1,

            CHARGE_OPEN: 1,
            CHARGE_GETREWARD: 2,

            LICENSE_REWARD: 1,

            NEWGIFT_FIRST: 1,  // 首冲
            NEWGIFT_OP: 2,     // 绝版
            NEWGIFT_GIFT: 3,   // 超值
            NEWGIFT_CHARGE: 4, // 充值

            EGG_FIRST: 1,  // 扭蛋机首次免费
            EGG_AWARD: 2,  // 扭蛋机可领取奖励
            EGG_COIN: 3,

            SPECIAL_SIGN: 1,  // 签到
            SPECIAL_GATAWARD: 2, // 升级奖励
            SPECIAL_UpStar: 3, // 升星奖励
            SPECIAL_WORLD: 4,
            SPECIAL_WORDERLAND: 5,
            SPECIAL_SKY: 6,
            SPECIAL_WANTED: 7,
            SPECIAL_BIND_PHONE: 8,
            SPECIAL_SHARE: 9,
            SPECIAL_GETPOWER: 10,

            RACEDAY: 1, // 当日红点
            RACEBOX: 2, // 宝箱红点

            Jewel_Mission: 1, // 达人任务
            Jewel_Mall: 2,    // 宝石商店

            XUYUAN_FIRST: 1,   // 免费
            XUYUAN_AWARD: 2,  // 可领奖

            ActivityBattle_ACTIVITY: 1,
            ActivityBattle_TRANSFORM: 2,

            PASS_AWARD: 1, // 奖励
            PASS_MISSION: 2, // 任务
        }

        // 进程更新时检测的红点Tag
        public static PROGRESS = {
            // 商铺
            [1]: message.EProcessType.PROCESS_TYPE_MALL_NORMAL,
            [2]: message.EProcessType.PROCESS_TYPE_MALL_LEAGUE,
            [3]: message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE,
            [4]: message.EProcessType.PROCESS_TYPE_MALL_LADDER,
            [5]: message.EProcessType.PROCESS_TYPE_MALL_LOTTERY,
            // [6]: message.EProcessType.PROCESS_TYPE_MALL_DARKLAND,
            [7]: message.EProcessType.PROCESS_TYPE_MALL_RELIC,
            [8]: message.EProcessType.PROCESS_TYPE_MALL_HONOR,

            // 体力
            [9]: message.EProcessType.PROCESS_TYPE_OPEN_POWER,
            [10]: message.EProcessType.PROCESS_TYPE_REWARD_POWER,

            // 玉石
            [11]: message.EProcessType.PROCESS_TYPE_GAMBLE_NORMAL,
            [12]: message.EProcessType.PROCESS_TYPE_GAMBLE_SENIOR,

            // 酒馆
            // [13]: message.EProcessType.PROCESS_TYPE_NORMAL_LOTTERY,

            // 钓鱼
            [14]: message.EProcessType.PROCESS_TYPE_LEAGUE_FISHING,

            // 宴会
            [15]: message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY,

            // 魔域boss
            [16]: message.EProcessType.PROCESS_TYPE_SCENE_BOSS,
            [17]: message.EProcessType.PROCESS_TYPE_INSTANCE_POWER,
        }

        // 保存的一次性红点Tag
        public static SAVE = {
            SERECT_MALL: 1,  // 神秘商铺红点提示
            SERECT_TIPS: 2,  // 神秘商铺弹窗提示
            NORMAL_MALL: 3,  // 普通商店刷新提示
            LEAGUE_MALL: 4,  // 联盟商铺刷新提示
            WORSHIP_MALL: 5, // 天宫商铺刷新提示
            ARENA_MALL: 6,   // 天梯商铺刷新提示
            MINE_DEFIND: 7,  // 护矿红点提示
            ACTIVITY_ALL: 8, // 活动每天提示
            LEAGUE_WAR_ENROL: 9,         // 联盟战提示报名
            LEAGUE_WAR_MATCHING: 10,     // 联盟战提示匹配
            LEAGUE_WAR_ENROL_BEFORE: 11, // 联盟战提示报名前
            AWARD_FUND: 12,              // 每日点击基金
            ACTIVITY_BACK: 13,           // 真情回馈点击
            LEAGUE_WAR_TIPS: 14,         // 联盟内联盟战提醒
            LEAGUE_WAR_TIPS_CITY: 15,    // 主城联盟战提醒
            LEAGUE_WAR_ENROLL_TIPS: 16,  // 联盟内联盟战报名提醒
            WONDERLAND_BOSS_TIPS: 17,    // 魔域Boss提示
            WANTED_CAVE: 18, // 通缉令山洞1
            WANTED_GOBI: 19, // 通缉令山洞2
            WANTED_NEVE: 20, // 通缉令山洞3
            SINGLE: 21,  // 跨服战
            LOTTERY: 22, // 酒馆商铺刷新提示
            GIFT_BAG_ACTIVITY: 23,     // n选1礼包活动
            DOUBLE_TOKEN_ACTIVITY: 24, // 双倍元宝活动,
            SPECIAL_WORLD: 25,
            SPECIAL_WORDERLAND: 26,
            SPECIAL_SKY: 27,
            SPECIAL_WANTED: 28,
            MAIL_PK: 29,    // 切磋显示战报,
            PUSH_FIRST: 30, // 推送首冲
            PUSH_SELF_SELECTION: 31, // 推送自选礼包
            SPECIAL_BIND_PHONE: 32,  // 绑定手机号
            TAVERN_ACTIVITY: 33,     // 每日首次弹出酒馆活动
            MATCH_MALL: 34,  // 战功商店刷新提示
            LEAGUE_CHAT: 35, // 帮会聊天每日一弹
            PORTFIRST: 36,   // 每日首次进入港口
            RELIC_MALL: 37,  // 遗迹商店刷新提示
            SPECIAL_SHARE: 38, // 分享
        }

        public static HUNTERTAG = {
            GENERAL_NEW: 0,
            GENERAL_GRADE: 1,
            GENERAL_GRADE_STEP: 2,
            GENERAL_SKILL: 3,
            GENERAL_Card: 4,
            GENERAL_UPSTAR: 5,
            GENERAL_AWAKEN: 6,
            GENERAL_PSYCHIC: 7,
            GENERAL_EQUIP: 8,
            GENERAL_UPLEVEL: 9
        }

        public static FUNC = {
            [Tips.TAG.LEAGUE]: {
                [1]: Tips.Tips_1_1,  //1.有剩余的捐献次数
                [2]: Tips.Tips_1_2,  //2.帮会商铺刷新（点进去一次之后就不再显示）
                [3]: Tips.Tips_1_3,  //3.（身为管理员）有未处理的入帮申请
                [4]: Tips.Tips_1_4,  //4.帮会副本
                [5]: Tips.Tips_1_5,  //5.帮会庆功宴
                [6]: Tips.Tips_1_6,  //6.帮会战防守阵容未全设置
                [7]: Tips.Tips_1_7,  //7.公会战剩余次数大于零
                [8]: Tips.Tips_1_8,  //8.战功商店
                [9]: Tips.Tips_1_9,  //9.公会战未报名
            },

            [Tips.TAG.LADDER]: {
                [1]: Tips.tips_2_1, //1.有战报
                [2]: Tips.tips_2_2, //2.演武商城刷新（点进去一次之后就不再显示）
                [3]: Tips.tips_2_3, //3.演武堂有挑战次数
                [4]: Tips.tips_2_4, //4.争霸奖励
                [5]: Tips.tips_2_5, //5.争霸次数
                [6]: Tips.tips_2_6, //6.跨服战商铺
                [7]: Tips.tips_2_7, //7.跨服挑战次数
            },

            [Tips.TAG.MINE]: {
                [1]: Tips.tips_3_1,  //1.挖矿红点
                [2]: Tips.tips_3_2,  //2.抢矿红点
                [3]: Tips.tips_3_3,  //3.护矿红点
                [4]: Tips.tips_3_4,  //4.矿洞战报
            },

            [Tips.TAG.WONDERLAND]: {
                [1]: Tips.tips_4_1, //战斗仙境盘子>3，等级足够
                [2]: Tips.tips_4_2, //和平仙境有祭祀次数，可领奖
                [3]: Tips.tips_4_3, //和平仙境钓鱼
                [4]: Tips.tips_4_4, //和平仙境可兑换
                [5]: Tips.tips_4_5, //和平仙境可采集
                [6]: Tips.tips_4_6, //双色球可下注
                [7]: Tips.tips_4_7, //魔龙boss开启
                [8]: Tips.tips_4_8, //组队战有次数
                [9]: Tips.tips_4_9, //有新的时装
                [10]: Tips.tips_4_10, //可进入港口
            },

            [Tips.TAG.TOWER]: {
                [1]: Tips.tips_5_1,  //3.当前层数低于或者等于历史最高层数
            },

            [Tips.TAG.BASTILLE]: {
                [1]: Tips.tips_6_1,  //1.有剩余的挑战次数,非cd时间
            },

            [Tips.TAG.WANTED]: {
                [1]: Tips.tips_7_1,
                [2]: Tips.tips_7_2,
                [3]: Tips.tips_7_3,
            },

            [Tips.TAG.TAVERN]: {
                [1]: Tips.tips_8_1,  //1.可以免费抽取时
            },

            [Tips.TAG.MALL]: {
                [1]: Tips.tips_9_1,  //1.商铺刷新商品（点进去一次之后就不再显示）
                [2]: Tips.tips_9_2,  //2.神秘商店开启（点进去一次之后就不再显示）
                [3]: Tips.tips_9_3,  //3.其他商铺
            },

            [Tips.TAG.TEACH]: {
                [1]: Tips.tips_10_1,   //1.有新的教学
            },

            [Tips.TAG.JADE]: {
                [1]: Tips.tips_11_1,  // 切割
                [2]: Tips.tips_11_2,  // 合成
                [3]: Tips.tips_11_3,  // 磨洗
            },

            [Tips.TAG.INSTANCE]: {
                [1]: Tips.tips_20_1,  // 宝箱未领取
                [2]: Tips.tips_20_2,  // 探索完成
            },

            [Tips.TAG.TREAUSER]: {
                [1]: Tips.tips_21_1,  // 钥匙不为零
                [2]: Tips.tips_21_2,  // 如意商铺刷新
            },

            [Tips.TAG.DAILY]: { // 日常
                [1]: Tips.tips_22_1,  //1.活跃度礼包未领取
                [2]: Tips.tips_22_2,  //2.活跃度任务可点“完成”
                [3]: Tips.tips_22_3,  //3.成就可点“达成”
                //[4] : Tips.tips_22_4,  //4.主线可点领取
            },

            [Tips.TAG.AWARD]: {
                [1]: Tips.tips_23_1,  // 1.没签到;有漏签,有补签次数;可补领vip
                [2]: Tips.tips_23_2,  // 2.可领取体力
                [3]: Tips.tips_23_3,  // 3.礼包可买
                [4]: Tips.tips_23_4,  // 4.月卡礼包可领
                [5]: Tips.tips_23_5,  // 5.基金礼包可领
                [6]: Tips.tips_23_6,  // 6.新月卡
            },

            [Tips.TAG.CHANGE]: {
                [1]: Tips.tips_24_1, // 无红点
            },

            [Tips.TAG.ACTIVITY]: {
                [1]: Tips.tips_25_1,
                [2]: Tips.tips_25_2,
                [3]: Tips.tips_25_3,
            },

            [Tips.TAG.GENERAL]: {
                [1]: Tips.tips_27_1,
            },

            [Tips.TAG.ADVISER]: {
                [1]: Tips.tips_28_1,
                [2]: Tips.tips_28_2,
                [3]: Tips.tips_28_3,
                [4]: Tips.tips_28_4,
                [5]: Tips.tips_28_5,
                [6]: Tips.tips_28_6,
            },

            [Tips.TAG.FRIEND]: {  //好友
                [1]: Tips.tips_29_1,  //1.有可领取的体力（上限未满的前提下）
                [2]: Tips.tips_29_2,  //2.有好友申请
            },

            [Tips.TAG.RANK]: {
                [1]: Tips.tips_30_1,  // 不显示
            },

            [Tips.TAG.PACKAGE]: {
                [1]: Tips.tips_31_1,
            },

            [Tips.TAG.MAIL]: {
                [1]: Tips.tips_33_1, // 有消息/有附件
            },

            [Tips.TAG.TRAIN]: {
                [1]: Tips.tips_34_1, // 未完成/未领取
            },

            [Tips.TAG.FIRST]: {
                [1]: Tips.tips_35_1,  // 未充值
                [2]: Tips.tips_35_2,  // 可领取
            },

            [Tips.TAG.SEVEN]: {
                [1]: Tips.tips_36_1, // 可领取
                [2]: Tips.tips_36_2, // 7日可领取
            },

            [Tips.TAG.NOVICE]: {
                [1]: Tips.tips_37_1, // 可领取
            },

            [Tips.TAG.CHAT]: {
                [1]: Tips.tips_38_1, // 有人私聊自己
            },

            [Tips.TAG.EQUIP]: {
                [1]: Tips.tips_39_1,   // 可升级/锻造/刻印
            },

            [Tips.TAG.MORE]: {
                [1]: Tips.tips_42_1,   // 背包+好友+排行
            },

            [Tips.TAG.FEEDBACK]: {
                [1]: Tips.tips_43_1,   // 真情回馈
            },

            [Tips.TAG.CONTEND]: {
                [1]: Tips.tips_44_1,   // 真情回馈
            },

            [Tips.TAG.ZORK]: {
                [1]: Tips.tips_45_1,   // 魔域商铺
                [2]: Tips.tips_45_2,   // 魔域Boss开启
                [3]: Tips.tips_45_3,   // 魔域祭坛
                [4]: Tips.tips_45_4,   // 魔域游商
            },

            [Tips.TAG.RECOVERY]: {
                [1]: Tips.tips_46_1,   // 不显示
            },

            [Tips.TAG.POTATO]: {
                [1]: Tips.tips_47_1,   // 有卡包
                [2]: Tips.tips_47_2,   // 可鉴定（弃用）
                [3]: Tips.tips_47_3,   // 可合成
            },

            [Tips.TAG.CHARGE]: {
                [1]: Tips.tips_48_1,  // 开启
                [2]: Tips.tips_48_2,  // 可领取
            },

            [Tips.TAG.LICENSE]: {
                [1]: Tips.tips_49_1,
            },

            [Tips.TAG.NEWGIFT]: {
                [1]: Tips.tips_50_1,
                [2]: Tips.tips_50_2,
                [3]: Tips.tips_50_3,
                [4]: Tips.tips_50_4,
            },

            [Tips.TAG.EGG]: {
                [1]: Tips.tips_51_1,
                [2]: Tips.tips_51_2,
                [3]: Tips.tips_51_3,
            },

            [Tips.TAG.SPECIAL]: {
                [1]: Tips.tips_52_1,
                [2]: Tips.tips_52_2,
                [3]: Tips.tips_52_3,
                [4]: Tips.tips_52_4,
                [5]: Tips.tips_52_5,
                [6]: Tips.tips_52_6,
                [7]: Tips.tips_52_7,
                [8]: Tips.tips_52_8,
                [9]: Tips.tips_52_9,
                [10]: Tips.tips_52_10,
            },

            [Tips.TAG.Pokedex]: {
                [1]: Tips.tips_53_1,
            },

            [Tips.TAG.RACE]: {
                [1]: Tips.tips_54_1,
                [2]: Tips.tips_54_2,
            },

            [Tips.TAG.VIPX]: {
                [1]: Tips.tips_55_1,
                [2]: Tips.tips_55_2,
                [3]: Tips.tips_55_3,
            },

            [Tips.TAG.Jewel]: {
                [1]: Tips.tips_56_1,  //任务达人
                [2]: Tips.tips_56_2,  // 宝石商店
            },

            [Tips.TAG.Biography]: {
                [1]: Tips.tips_58_1,
            },

            [Tips.TAG.XUYUAN]: {
                [1]: Tips.tips_59_1,
                [2]: Tips.tips_59_2,
            },

            [Tips.TAG.NOVICE1]: {
                [1]: Tips.tips_61_1, // 可领取
            },

            [Tips.TAG.DarkLand]: {
                [1]: Tips.tips_62_1,
                [2]: Tips.tips_62_2,
                [3]: Tips.tips_62_3,
            },

            [Tips.TAG.NOVICE2]: {
                [1]: Tips.tips_63_1, // 可领取
            },

            [Tips.TAG.NOVICEMAQI]: {
                [1]: Tips.tips_64_1, // 可领取
            },

            [Tips.TAG.NOVICEKUBI]: {
                [1]: Tips.tips_65_1, // 可领取
            },

            [Tips.TAG.WEEKMISSION]: {
                [1]: Tips.tips_66_1,   // 可领取
            },
            [Tips.TAG.NEWLOWGift]: {
                [1]: () => {
                    let bGetCur = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, (k, v) => {
                        return v == Game.PlayerInfoSystem.BaseInfo.vipLevel;
                    })
                    let have = Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal.length - 1 < Game.PlayerInfoSystem.BaseInfo.vipLevel
                    let cond = have//(Player.lowVipLevel  and Tips.tips_LowVip_get(Player.lowVipLevelNum) and not bGetCur) or
                    return cond
                } // Tips.tips_63_1,   //1 有新的礼包了已领取
            },
            [Tips.TAG.ActivityBattle]: {
                [1]: Tips.tips_67_1,
                [2]: Tips.tips_67_2,
            },
            [Tips.TAG.PassBattle]: {
                [1]: Tips.tips_68_1,
                [2]: Tips.tips_68_2,
            }
        }

        private static Battle: number = 0;
        private static Value: { [key: number]: { [key: number]: boolean } } = {};
        private static Hero: { [key: number]: { [key: number]: boolean } } = {};
        private static Activity: { [key: number]: { [key: number]: boolean } } = {};

        public static Init() {
            Tips.Value = {};

            let actiInit = message.ActivityType.ACT_TYPE_END;

            for (let k in Tips.FUNC) {
                Tips.Value[k] = {
                    [0]: false
                };
                for (let kk in Tips.FUNC[k]) {
                    Tips.Value[k][kk] = false;
                }
            }

            for (let i = 1; i <= actiInit; i++) {
                Tips.Activity[i] = {};
            }
        }

        public static UnInit() {
            this.Init();
        }

        public static InitTipHero() {
            Tips.Hero = {};
            let heroInit = 10;

            for (let [k, v] of HelpUtil.GetKV(Game.PlayerHunterSystem.allHuntersMap())) {
                Tips.Hero[k] = {};
                for (let i = 1; i <= heroInit; i++) {
                    Tips.Hero[k][i] = false;
                }
            }
        }

        // 主城背景tag转换
        private static FixBugOfBuild(id: number): number {
            if (id == TableEnum.BuildType.Build_Type_Mall) {
                return Tips.TAG.MALL;
            } else if (id == TableEnum.BuildType.Build_Type_Tavern) {
                return Tips.TAG.TAVERN;
            } else if (id == TableEnum.BuildType.Build_Type_Jade) {
                return Tips.TAG.JADE;
            } else if (id == TableEnum.BuildType.Build_Type_Zork) {
                return Tips.TAG.ZORK;
            }

            return id;
        }

        // 设置提示
        // id1 {number} 类型  id2 {number} 子类型
        public static SetTipsOfId(id1: number, id2?: number) {
            id1 = Tips.FixBugOfBuild(id1);

            if (id2 == undefined || id2 == null) {
                for (let k in Tips.FUNC[id1]) {
                    Tips.SetFunction(id1, Number(k));
                }
            } else {
                Tips.SetFunction(id1, id2);
            }

            Tips.Value[id1][0] = Table.FindF(Tips.Value[id1], function (k, v) {
                return Number(k) > 0 && v == true;
            });
        }

        // 获取提示
        public static GetTipsOfId(id1: number, id2?: number): boolean {
            id1 = Tips.FixBugOfBuild(id1);
            if (Tips.Value[id1] && Tips.Value[id1][id2] != null)
                return Tips.Value[id1][id2];

            return Tips.Value[id1][0];
        }

        // 设置值
        public static SetFunction(id1: number, id2: number) {
            Tips.Value[id1][id2] = Tips.FUNC[id1][id2]();
        }

        // 进程
        public static SetTipsOfProgresses() {
            for (let [k, v] of HelpUtil.GetKV(Tips.PROGRESS)) {
                Tips.SetTipsOfProgressesWithId(v);
            }

            Tips.SetTipsOfId(Tips.TAG.INSTANCE, Tips.TAG.INST_SEARCH);
            Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GETPOWER)
        }

        // 进程相关红点
        public static SetTipsOfProgressesWithId(progressId: number) {
            if (Game.PlayerProgressesSystem.progressMap[progressId] != null) {
                if (Game.PlayerProgressesSystem.progressMap[progressId].leftTime != 0) {
                    // 领体力计时
                    if (progressId == message.EProcessType.PROCESS_TYPE_OPEN_POWER) {
                        Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_POWER);
                    }
                    // 开启领体力
                    else if (progressId == message.EProcessType.PROCESS_TYPE_REWARD_POWER) {
                        Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_POWER);
                    }
                }

                // 演武堂
                if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LADDER) {
                    Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL);
                }
                // 普通商铺
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_NORMAL) {
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                // 联盟商铺
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LEAGUE) {
                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                // 战功商铺
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE) {
                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.MATCH_MALL);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_RELIC) {
                    Tips.SetTipsOfId(Tips.TAG.DarkLand, Tips.TAG.RELIC_MALL);
                }
                // 天梯商铺
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LADDER) {
                    Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                // 跨服战商铺
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_HONOR) {
                    Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.PK_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                // 如意商铺
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LOTTERY) {
                    Tips.SetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                // 杀猪宴会
                else if (progressId == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY) {
                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_CELEBRATE);
                }
                // 魔域
                else if (progressId == message.EProcessType.PROCESS_TYPE_SCENE_BOSS) {
                    Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.ZORK_BOSS);
                }
            }
        }

        public static GetInTimeOfPid(startId, stopId) {
            let timeStart = Game.PlayerProgressesSystem.progressMap[startId].leftTime;
            let timeStop = Game.PlayerProgressesSystem.progressMap[stopId].leftTime;
            let bToStop = timeStart <= 0 && timeStop == 0;
            let bInStop = timeStart == 0 && timeStop > 0;

            return bToStop || bInStop;
        }

        // 活动提示
        public static GetTipsOfActivity(type, index) {
            return Tips.Activity[type][index];
        }

        // 本地值 
        public static GetSaveTime(id: number): number {
            let key = `${Tips.TIP_FORMART_TIME}_${id}`;
            let value = Game.Controller.getRoleStorageItem(key);
            if (value.length == 0) return 0;
            let t = parseInt(value);
            if (isNaN(t)) return 0;
            return t;
        }

        public static SetSaveTime(id: number, time: number) {
            if (id == null || time == null) return;
            let key = `${Tips.TIP_FORMART_TIME}_${id}`;
            Game.Controller.setRoleStorageItem(key, time.toString());
        }

        // 获取点击进入次数TAVERN
        public static GetSaveIntValue(type, modules) {
            let id = 100202;
            if (id == null || id == undefined) {
                return 1;
            }

            let key = `${id}_${this.TIP_FORMART_TIME}_${modules}_${type}`;
            let value = Game.Controller.getRoleStorageItem(key);
            if (value.length == 0) return 0;
            let t = parseInt(value);
            if (isNaN(t)) return 0;
            return t;
        }

        // 存取点击进入次数TAVERN
        public static SetSaveIntValue(type, time, modules) {
            let id = 100202;
            if (id == null || id == undefined) {
                return false;
            }

            let key = `${id}_${this.TIP_FORMART_TIME}_${modules}_${type}`;
            return Game.Controller.setRoleStorageItem(key, time.toString());
        }

        public static GetSaveIntInfo(key: string, initValue?: any) {
            let value = Game.Controller.getRoleStorageItem(key);
            if (value.length == 0) return initValue;
            let t = parseInt(value);
            if (isNaN(t)) return initValue;
            return t;
        }

        public static SetSaveIntInfo(key: string, value: number): boolean {
            return Game.Controller.setRoleStorageItem(key, value.toString());
        }

        public static GetSaveBoolInfo(key: string, initValue?: boolean) {
            let value = Game.Controller.getRoleStorageItem(key);
            if (value == "true") {
                return true;
            } else if (value == "false") {
                return false;
            } else {
                if (initValue) {
                    Game.Controller.setRoleStorageItem(key, initValue.toString());
                    return initValue;
                } else {
                    return false;
                }
            }
        }

        public static SetSaveBoolInfo(key: string, value: boolean): boolean {
            return Game.Controller.setRoleStorageItem(key, value.toString());
        }

        public static GetSaveBool(id: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (id == null || baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + id, bool ? bool : true);
        }

        public static SetSaveBool(id: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (id == null || baseId == null || baseId == 0) return;
            let key = baseId.toString() + Tips.TIP_FORMART_SAVE + id.toString();
            Tips.SetSaveBoolInfo(key, bool ? bool : false);
        }

        public static GetSaveBoolForActivity(type, index, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || index == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + type + "_" + "index", bool ? bool : true);
        }

        public static SetSaveBoolForActivity(type, index, bool: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || index == null || baseId == 0) return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + type + "_" + "index", bool ? bool : false);
        }

        public static GetSaveByMallNewProduct(type) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "MALL" + type, 0);
        }

        public static SetSaveTimeByMallNewProduct(type, time) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "MALL" + type, time);
        }

        //流星街（新）图标
        public static GetSaveBoolForWantedNewOpen(type, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "_WantedNewOpen_" + type, bool ? bool : true);
        }

        public static SetSaveBoolForWantedNewOpen(type, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0) return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "_WantedNewOpen_" + type, bool ? bool : false);
        }

        // 时装
        public static GetSaveBoolForFashionNewGet(id: number, bool?: boolean): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "_FashionNewGet_" + id, bool ? bool : false);
        }

        public static SetSaveBoolForFashionNewGet(id: number, bool: boolean = false): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return;

            Tips.SetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + this.TIP_FORMART_TIME + "_FashionNewGet_" + id, bool ? bool : false);
        }

        public static GetSaveByTavernNewProduct(type) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "TAVERN" + type, 0);
        }

        public static SetSaveTimeByTavernNewProduct(type, time) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "TAVERN" + type, time);
        }

        // 武将排序默认顺序 sort 默认按照等级排序
        public static GetSaveTimeForGeneralSort(time: number = 1) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "general_sort", time);
        }

        public static SetSaveTimeForGeneralSort(time: number) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "general_sort", time);
        }

        // 卡片排序默认顺序
        public static GetSaveTimeForCardSort(time: number = 1) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_sort", time);
        }

        public static SetSaveTimeForCardSort(time: number) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_sort", time);
        }

        public static GetSaveTimeForCardHostSort(time: number = 1) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_host_sort", time);
        }

        public static SetSaveTimeForCardHostSort(time: number) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_host_sort", time);
        }

        // 武将升星值
        public static GetSaveBoolForGeneralUpStar(): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "general_up_star", false);
        }

        public static SetSaveBoolForGeneralUpStar(bool: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return;

            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "general_up_star", bool ? bool : false);
        }

        // 卡片升星值
        public static GetSaveBoolForCardUpStar(): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "card_up_star", false);
        }

        public static SetSaveBoolForCardUpStar(bool: boolean): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            return Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "card_up_star", bool ? bool : false);
        }

        //天空竞技场上次难度本地值
        public static GetSaveTowerLastDiff() {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "tower_diff", 1);
        }

        public static SetSaveTowerLastDiff(time: any) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "tower_diff", time);
        }

        // 帮会战结算上次弹出时间记录
        public static GetSaveUnionBattlePushRecord(): number {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return 1;

            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "union_battle_record");
        }

        public static SetSaveUnionBattlePushRecord(time: number) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0) return;

            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "union_battle_record", time);
        }

        // 攻略
        public static GetSaveBoolForHighHand(index, bool?: boolean): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "highhand" + index, bool ? bool : true);
        }

        public static SetSaveBoolForHighHand(index, bool: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "highhand" + index, bool ? bool : false);
        }

        // 突破
        public static GetSaveBoolForHunterBreak(index, bool?: boolean): boolean {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Breakattri" + index, bool ? bool : true);
        }

        public static SetSaveBoolForHunterBreak(index, bool: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return;

            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Breakattri" + index, bool ? bool : false);
        }

        // VIP星耀
        public static GetSaveBoolForVip_attri(index: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "attri" + index, bool ? bool : true);
        }

        public static SetSaveBoolForVip_attri(index: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "attri" + index, bool ? bool : false);
        }

        public static GetSaveBoolForlowVip(index: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "lowVip" + index, bool ? bool : true);
        }

        public static SetSaveBoolForlowVip(index: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0) return false;

            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "lowVip" + index, bool ? bool : false);
        }

        public static GetSaveBoolForRandom(index: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || index == null) return false;

            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Random" + index, bool ? bool : true);
        }

        public static SetSaveBoolForRandom(index: number, bool?: boolean) {
            let baseId = Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0) return;

            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Random" + index, bool ? bool : false);
        }

        private static ArenaValue: { [key: number]: {} } = {};
        private static SetTipsOfArena(generalId: number, id: number) {
            if (generalId == null && id == null) return;
            if (Tips.ArenaValue[generalId] == null) Tips.ArenaValue[generalId] = {};

        }

        private static GetTipsOfArena(generalId: number, id = 0): boolean {
            if (Tips.ArenaValue[generalId]) {
                return Tips.ArenaValue[generalId][id];
            }
            return false;
        }

        public static tips_instance_1(id) {
            let normalBox: boolean = false;
            let eliteBox: boolean = false;

            let instanceData: TableInstanceArea = Game.PlayerInstanceSystem.AreaInstance(id);
            if (instanceData == null) return;

            let chapterList: Array<number> = instanceData.area_normal;
            let instanceListNormal: Array<number> = [];

            for (let i = 0; i < chapterList.length; i++) {
                let vv: number = chapterList[i];
                let chapterData: TableChapterNormal = Game.PlayerInstanceSystem.ChapterInstance(vv);
                instanceListNormal.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
            }

            let giftInfoNormal: Array<any> = Table.DeepCopy(instanceListNormal);
            for (let i = 0; i < instanceListNormal.length; i++) {
                let vv: number = instanceListNormal[i];
                let mobInfos: Array<message.MobInfo> = Game.PlayerInstanceSystem.mobInfos;
                let instance: message.MobInfo = null;
                for (let j = 0; j < mobInfos.length; j++) {
                    if (mobInfos[j].mobId == vv) {
                        instance = mobInfos[j];
                        break;
                    }
                }

                if (instance != null) {
                    giftInfoNormal[i] = instance;
                }

                if (!(typeof giftInfoNormal[i] === "number" || giftInfoNormal[i].star == 0) && giftInfoNormal[i].chestReward == false) {
                    normalBox = true || normalBox;
                }
            }

            let eliteList: Array<number> = instanceData.area_elite;
            let instanceListElite: Array<number> = [];

            for (let i = 0; i < eliteList.length; i++) {
                let vv: number = eliteList[i];
                let eliteData: TableChapterElite = Game.PlayerInstanceSystem.EliteInstance(vv);
                instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
            }

            let giftInfoElite: Array<any> = Table.DeepCopy(instanceListElite);
            for (let i = 0; i < instanceListElite.length; i++) {
                let vv: number = instanceListElite[i];
                let mobInfos: Array<message.MobInfo> = Game.PlayerInstanceSystem.mobInfos;
                let instance: message.MobInfo = null;
                for (let j = 0; j < mobInfos.length; j++) {
                    if (mobInfos[j].mobId == vv) {
                        instance = mobInfos[j];
                        break;
                    }
                }

                if (instance != null && instance.star != 0) {
                    giftInfoElite[i] = instance;
                }

                if (typeof giftInfoElite[i] === "number" || giftInfoElite[i].star == 0) {

                }
                else if (giftInfoElite[i].chestReward == false) {
                    eliteBox = true || eliteBox;
                }
                else {

                }
            }
            return normalBox || eliteBox;
        }

        public static getTipsOfMail(mailType) {
            let cond = false;
            if (Game.PlayerMailSystem.mailboxInfo[mailType - 1] != null) {
                cond = false || Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReadCount > 0 || Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReward > 0
            }
            Tips.SetTipsOfId(Tips.TAG.MAIL, 1)
            return cond;
        }

        public static GetIntValue(key: string, defaultValue = 0): number {
            if (key == null) return defaultValue;
            key = `${Tips.TIP_FORMART_SAVE}_${key}`;
            let value = Game.Controller.getRoleStorageItem(key);
            if (value.length == 0) return defaultValue;
            let t = parseInt(value);
            if (isNaN(t)) return defaultValue;
            return t;
        }
        public static SetIntValue(key: string, v: number) {
            if (key == null) return;
            key = `${Tips.TIP_FORMART_SAVE}_${key}`;
            Game.Controller.setRoleStorageItem(key, v.toString());
        }

        // VIP星耀
        public static GetSaveBoolForVip(index: number, bool?: boolean) {
            if (Game.PlayerInfoSystem.BaseInfo.id == 0 || index == undefined) {
                return false;
            }
            return Tips.GetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + this.TIP_FORMART_ACT + "_" + index, bool ? bool : true);
        }

        public static SetSaveBoolForVip(index: number, bool?: boolean) {
            if (Game.PlayerInfoSystem.BaseInfo.id == 0 || index == undefined) {
                return;
            }
            Tips.SetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + this.TIP_FORMART_ACT + "_" + index, bool ? bool : false);
        }

        // 一次重置
        private static tips_onetime_set(index: number, time: any) {
            let serverTime = Game.Controller.serverNow();
            if (index == null || serverTime.valueOf() == null) {
                console.error("tips_onetime_set error index == nil");
                return;
            }

            if (typeof time === "number" && serverTime.valueOf() > 0) {
                let saveTime = Tips.GetSaveTime(index);
                if (saveTime == 0) {
                    Tips.SetSaveBool(index, false);
                    Tips.SetSaveTime(index, time + serverTime.valueOf());

                }
                else if (saveTime < serverTime.valueOf()) {
                    Tips.SetSaveBool(index, true);
                    Tips.SetSaveTime(index, 0);
                }
            }
            else if (typeof time === "boolean") {
                Tips.SetSaveBool(index, true);
            }
        }

        // 一次重置
        private static tips_onetime_get(index: number) {
            return Tips.GetSaveBool(index, false) == false;
        }

        // 每天重置一次
        public static tips_oneday_set(index: number, day) {
            if (typeof day === "number") {
                let saveDay = Tips.GetSaveTime(index);
                if (-1 == day) { // 没有时间
                } else if (saveDay == day) { // 未过设置时间
                } else if (saveDay != day) { // 已过设置日期,重新设置红点
                    Tips.SetSaveBool(index, true)
                    Tips.SetSaveTime(index, Game.Controller.serverNow().getDay() + 1)
                }
            } else if (typeof day === "boolean") {
                // 红点消失
                Tips.SetSaveTime(index, Game.Controller.serverNow().getDay() + 1)
                Tips.SetSaveBool(index, false)
            }
            return Tips.GetSaveBool(index);
        }

        public static tips_oneday_get(index: number) {
            return Tips.GetSaveBool(index);
        }

        // 使用一次
        public static tips_useTime_set(index) {
            if (Tips.GetSaveBool(index) == true) {
                Tips.SetSaveBool(index, false)
            }
        }

        public static tips_useTime_get(index) {
            return Tips.GetSaveBool(index)
        }

        // 使用一次,专用活动
        public static tips_activity_set(type, index) {
            if (Tips.GetSaveBoolForActivity(type, index) == true) {
                Tips.SetSaveBoolForActivity(type, index, false);
            }
        }

        public static tips_activity_get(type, index) {
            return Tips.GetSaveBoolForActivity(type, index);
        }

        // 使用一次，攻略
        public static tips_Highhand_set(index) {
            if (Tips.GetSaveBoolForHighHand(index) == true) {
                Tips.SetSaveBoolForHighHand(index, false);
            }
        }

        public static tips_Highhand_get(index) {
            return Tips.GetSaveBoolForHighHand(index);
        }

        // 使用一次，突破
        public static tips_HunterBreak_set(index) {
            if (Tips.GetSaveBoolForHunterBreak(index) == true) {
                Tips.SetSaveBoolForHunterBreak(index, false);
            }
        }

        public static tips_HunterBreak_get(index) {
            return Tips.GetSaveBoolForHunterBreak(index);
        }

        // 使用一次，Vip星耀
        public static tips_Vip_set(index: number) {
            if (Tips.GetSaveBoolForVip(index) == true) {
                Tips.SetSaveBoolForVip(index, false);
            }
        }

        public static tips_Vip_get(index: number) {
            return Tips.GetSaveBoolForVip(index);
        }

        // 使用一次，Vip星耀属性
        public static tips_VipAttri_set(index: number) {
            if (Tips.GetSaveBoolForVip_attri(index) == true) {
                Tips.SetSaveBoolForVip_attri(index, false);
            }
        }

        public static tips_VipAttri_get(index: number) {
            return Tips.GetSaveBoolForVip_attri(index);
        }

        // 使用一次，lowVip
        public static tips_LowVip_set(index: number) {
            if (Tips.GetSaveBoolForlowVip(index) == true) {
                Tips.SetSaveBoolForlowVip(index, false);
            }
        }

        public static tips_LowVip_get(index: number) {
            return Tips.GetSaveBoolForlowVip(index);
        }

        public static tips_Random_set(index: number) {
            if (Tips.GetSaveBoolForRandom(index) == true) {
                Tips.SetSaveBoolForRandom(index, false);
            }
        }

        public static tips_Random_get(index: number) {
            return Tips.GetSaveBoolForRandom(index);
        }

        private static getMondayTime(): number {
            let curTime: Date = Game.Controller.serverNow();
            let timeS = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            // 到第二天4点的秒数 + 第二天4点到下周一4点的秒数 (4*3600 + 28*3600 - timeS) + (7-curTime.wday)%7 * 24*3600
            // curTime.getDay() 0表示星期天
            let lastTime = 100800 - timeS + (8 - PlayerLeagueSystem.GetDay()) % 7 * 86400;

            return lastTime;
        }

        private static getMondayTenTime(): number {
            let curTime: Date = Game.Controller.serverNow();
            let timeS = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            // 到第二天10点的秒数 + 第二天10点到下周一10点的秒数 (10*3600 + 24*3600 - timeS) + (7-curTime.wday)%7 * 24*3600
            let lastTime = 122400 - timeS + (7 - curTime.getDay()) % 7 * 86400;

            return lastTime;
        }

        // 帮会
        private static Tips_1_1(): boolean {
            let cond = false;

            if (Game.PlayerInfoSystem.BaseInfo.leagueId != 0 &&
                Game.PlayerLeagueSystem.LeagueInfo != null &&
                Game.PlayerLeagueSystem.Member.is_donate != null &&
                CommonConfig.league_donate_daily_times - Game.PlayerLeagueSystem.Member.is_donate > 0) {
                cond = true;
            }
            return cond;
        }

        private static tips_1_2_get(): boolean {
            return Tips.tips_onetime_get(Tips.SAVE.LEAGUE_MALL);
        }

        private static tips_1_2_set() {
            Tips.tips_onetime_set(Tips.SAVE.LEAGUE_MALL, Tips.getMondayTime());
        }

        private static Tips_1_2(): boolean {
            if (PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE) && Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LEAGUE].leftTime == 0) {
                Tips.tips_1_2_set();
                return Tips.tips_onetime_get(Tips.SAVE.LEAGUE_MALL);
            } else {
                return false;
            }
        }

        private static Tips_1_3(): boolean {
            let cond = false;
            if (Game.PlayerInfoSystem.BaseInfo.leagueId != 0 &&
                Game.PlayerLeagueSystem.LeagueInfo != null &&
                Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL &&
                Game.PlayerLeagueSystem.LeagueInfo.info != null &&
                Game.PlayerLeagueSystem.LeagueInfo.applicants.length > 0) {
                cond = true;
            }

            return cond;
        }

        private static Tips_1_4(): boolean {
            let bOpen = PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE);
            let bLeague = Game.PlayerInfoSystem.BaseInfo.leagueId != 0;
            if (!bOpen || !bLeague) return false;

            if (Game.PlayerLeagueSystem.LeagueInfo != null && Game.PlayerLeagueSystem.LeagueInfo.instances != null) {
                if (Game.PlayerLeagueSystem.Member.instance_buy_time + CommonConfig.league_instance_day_time > Game.PlayerLeagueSystem.Member.instance_time) {
                    for (const vv of Game.PlayerLeagueSystem.LeagueInfo.instances) {
                        for (const v of vv.stageInfos) {
                            if (!v.is_win) return true;
                        }
                    }
                }

                for (const vv of Game.PlayerLeagueSystem.LeagueInfo.instances) {
                    let mv = Table.FindR(Game.PlayerLeagueSystem.Member.mobsReward, function (rk, rv) {
                        if (rv.instanceId == vv.instance_id) return true;
                    })[0];

                    for (let k in vv.stageInfos) {
                        let v = vv.stageInfos[k];
                        let isWin = v.is_win;
                        let isRew = false;
                        if (mv != null) {
                            isRew = Table.FindK(mv.mobsReward, Number(k) - 1) != -1;
                        }
                        let bReward = isWin && !isRew;
                        if (bReward) return true;
                    }
                }
            }

            return false;
        }

        private static Tips_1_5(): boolean {
            let bOpen = PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE);
            let bLeague = Game.PlayerInfoSystem.BaseInfo.leagueId != 0;
            let cond_nor = false;
            let cond_add = false;
            let can_fight = false;

            if (Game.PlayerLeagueSystem.LeagueInfo != null && Game.PlayerLeagueSystem.LeagueInfo.info != null) {
                let [processes, _] = Table.FindR(Game.PlayerLeagueSystem.LeagueInfo.info.processes, function (_k, _v) {
                    if (_v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY)
                        return true;
                });

                if (processes != null && processes.leftTime > 0) {
                    if (Game.PlayerLeagueSystem.Member.party_time == 0) {
                        cond_nor = true;
                    }
                    if (processes.info != 0 && Game.PlayerLeagueSystem.Member.party_time_add == 0) {
                        cond_add = true;
                    }
                }

                let [tip, __] = Table.FindR(Game.PlayerLeagueSystem.LeagueInfo.info.processes, function (_k, _v) {
                    if (_v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS && _v.leftTime > 0)
                        return true;
                });

                if (tip) {
                    can_fight = CommonConfig.league_boss_battle_number > Game.PlayerLeagueSystem.Member.boss_time;
                }
            }

            return bOpen && bLeague && ((cond_nor || cond_add) || can_fight);
        }

        private static Tips_1_6(): boolean {
            let bOpen = PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE);
            let bLeague: boolean = Game.PlayerInfoSystem.LeagueId != 0;

            if (!bLeague || Game.PlayerLeagueSystem.LeagueInfo == null) {
                return false;
            }

            let noTeams: boolean = true;
            let emptyTeam: boolean = true;
            for (let [k, v] of HelpUtil.GetKV(Game.PlayerFormationSystem.formatsMatchDefine)) {
                noTeams = false;
                let [findGenerals, _] = Table.FindR(v.generals, function (_k, _v) {
                    return _v != 0;
                });
                if (findGenerals) emptyTeam = false;
            }

            return bOpen && bLeague && (noTeams || emptyTeam);
        }

        // 公会战 入口
        private static Tips_1_7(): boolean {
            let bleague = (Game.PlayerInfoSystem.LeagueId != 0);

            if (!bleague) return false;

            if (Game.PlayerLeagueSystem.unionBattleInfo.UnionStatus == TableEnum.Enum.UnionBattleStatus.Battle) {
                return (CommonConfig.league_match_member_attack_times - Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime > 0)
            } else {
                return false;
            }
        }

        private static tips_1_8_set() {
            Tips.tips_onetime_set(Tips.SAVE.MATCH_MALL, Tips.getMondayTime());
        }

        private static tips_1_8_get(): boolean {
            return Tips.tips_onetime_get(Tips.SAVE.MATCH_MALL);
        }

        private static Tips_1_8(): boolean {
            if (PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE) &&
                Game.PlayerInfoSystem.LeagueId != 0 &&
                Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE].leftTime == 0) {
                Tips.tips_1_8_set();
                return Tips.tips_onetime_get(Tips.SAVE.MATCH_MALL);
            }
            else {
                return false;
            }
        }

        private static Tips_1_9(): boolean {
            if (Game.PlayerInfoSystem.LeagueId != 0 &&
                Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER ||
                Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                if (Game.PlayerLeagueSystem.LeagueInfo.info.curNum >= CommonConfig.league_match_limit_members &&
                    Game.PlayerLeagueSystem.LeagueInfo.info.enliven_all >= CommonConfig.league_match_sign_consume_enliven &&
                    Game.PlayerLeagueSystem.LeagueInfo.info.level >= CommonConfig.league_match_join_limit_level) {
                    return !Game.PlayerLeagueSystem.LeagueInfo.info.match_join;
                }
            }
            return false;
        }

        // 竞技场
        private static tips_2_1() {
            return false;
        }

        private static tips_2_2_set() {
            Tips.tips_onetime_set(Tips.SAVE.ARENA_MALL, Tips.getMondayTime());
        }

        private static tips_2_2(): boolean {
            let open = PlayerMissionSystem.FunOpenTo(FUNC.ARENA);
            let progressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LADDER];
            if (open && progressInfo.leftTime == 0) {
                Tips.tips_2_2_set();
                return Tips.tips_onetime_get(Tips.SAVE.ARENA_MALL);
            } else {
                return false;
            }
        }

        private static tips_2_3(): boolean {
            let progressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_LADDER];
            if (progressInfo != null && progressInfo.leftTime != 0) return false;

            let vipInfo = Game.PlayerVIPSystem.vipInfo;
            let condition = vipInfo.buyPvpPower + CommonConfig.ladder_challenge_time > vipInfo.pvpPower;
            return condition;
        }

        private static tips_2_4(): boolean {
            // discard
            return false;
        }

        private static tips_2_5(): boolean {
            return true;
        }

        private static tips_2_6(): boolean {
            let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            if (info != null && info.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING) return false;

            let open = PlayerMissionSystem.FunOpenTo(FUNC.SINGLE);
            let progressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_HONOR];
            if (open && progressInfo.leftTime == 0) {
                Tips.tips_onetime_set(Tips.SAVE.SINGLE, Tips.getMondayTenTime());
                return Tips.tips_onetime_get(Tips.SAVE.SINGLE);
            }

            return false;
        }

        private static tips_2_7(): boolean {
            let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            if (info != null && info.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING) return false;

            let open = PlayerMissionSystem.FunOpenTo(FUNC.SINGLE);
            let condition = false;
            if (open) {
                let vipInfo = Game.PlayerVIPSystem.vipInfo;
                let currentNumber = vipInfo.craft_buy * CommonConfig.singlecraft_buy_time + CommonConfig.singlecraft_buy_time - vipInfo.craft_time;
                condition = currentNumber > 0;
            }
            return condition;
        }

        // 矿洞
        private static tips_3_1(): boolean {
            return false;
        }

        private static tips_3_2() {
            return false;
        }

        private static tips_3_3() {
            return false;
        }

        private static tips_3_4(): boolean {
            return false;
        }

        // 仙境
        private static tips_4_1(): boolean {
            let cond = false;
            if (Game.PlayerInfoSystem.BaseInfo.goldPlate >= 3)
                cond = true;

            let warInfo = TableWonderland.Item(3);
            let open = Game.PlayerInfoSystem.BaseInfo.level >= warInfo.mix_level && Game.PlayerInfoSystem.BaseInfo.level <= warInfo.max_level;
            return cond && open;
        }

        private static tips_4_2(): boolean {
            let bTimes = false;
            let level = Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            let runesTime = TableLicence.Item(level).gain_runes_time;
            if (Game.PlayerVIPSystem.vipInfo.gain_runes_time != null) {
                bTimes = Game.PlayerVIPSystem.vipInfo.gain_runes_time < runesTime && true || false;
            }
            let rewardGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0;
            let cond = bTimes || rewardGet;
            return cond;
        }

        private static tips_4_3(): boolean {
            // 钓鱼
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo == null)
                return false;

            let cnt = PlayerVIPSystem.Level().league_fishing - Game.PlayerVIPSystem.vipInfo.league_fishing;
            // 钓鱼中
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) > 0)
                return false;
            //  可领取
            else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses != null && Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length > 0)
                return true;
            // 可下杆
            else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                if (cnt > 0)
                    return true;
                else if (cnt == 0)
                    return false;
            }
            // 可收杆
            else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0)
                return true;

            return false;
        }

        private static tips_4_4(): boolean {
            return false;
        }

        private static tips_4_5(): boolean {
            let peaceInfo = TableWonderland.Item(2);
            let open = (Game.PlayerInfoSystem.BaseInfo.level >= peaceInfo.mix_level && Game.PlayerInfoSystem.BaseInfo.level <= peaceInfo.max_level);
            let canPick = false;
            for (let v of peaceInfo.tree_pos) {
                canPick = canPick //||  otherdb.inPeaceWonderlandNotPick(v[0]);
            }

            let cond = false
            if (Game.PlayerInfoSystem.BaseInfo.goldPlate >= 3)
                cond = true;

            return open && canPick && cond;
        }

        private static tips_4_6(): boolean {
            let cur = Game.Controller.serverNow();
            let sec = cur.getHours() * 3600 + cur.getMinutes() * 60 + cur.getSeconds();
            if (4 * 3600 <= sec && sec < CommonConfig.double_fruit_bet_time[0] && Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit == 0)
                return true;
            else
                return false;
        }

        private static tips_4_7(): boolean {
            let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.BOSS);
            let bFresh = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info != 0;
            let cond = bFresh && bOpen;
            return cond;
        }

        private static tips_4_8(): boolean {
            return false;
        }

        private static tips_4_9(): boolean {
            let open: boolean = PlayerMissionSystem.FunOpenTo(FUNC.GROUPFIGHT);
            if (!open) {
                return false;
            }

            let tbl: { [key: string]: TableBaseGeneral } = TableBaseGeneral.Table();
            for (let k in tbl) {
                if (tbl[k].fashion_id[0] != 0 && tbl[k].fashion_id[1] != null && PlayerFashionSystem.FashionWithId(tbl[k].general_id) != null) {
                    if (PlayerFashionSystem.GetHunterFashionTips(tbl[k].general_id)) {
                        return true;
                    }
                }
            }

            return false;
        }

        public static tips_4_10_set(day) {
            Tips.tips_oneday_set(Tips.SAVE.PORTFIRST, day);
        }

        private static tips_4_10(): boolean {
            if (PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND) && PlayerDarkSystem.PortOpenTime())
                return Tips.tips_oneday_get(Tips.SAVE.PORTFIRST);
            else
                return false;
        }

        // 无极塔
        private static tips_5_1(): boolean {
            let cond = false;
            if (Game.PlayerTowerSystem.towerInfo.towerCur == null || Game.PlayerTowerSystem.towerInfo.towerMax == null)
                return false;

            if (Game.PlayerTowerSystem.towerInfo.towerCur < Game.PlayerTowerSystem.towerInfo.towerMax)
                cond = true;

            return cond;
        }

        // 伏牛寨
        private static tips_6_1(): boolean {
            return false;
        }

        // 通缉令
        private static tips_7_1(): boolean {
            if (Game.PlayerWantedSystem.wantedInfo == null)
                return false;

            if (Game.PlayerWantedSystem.wantedInfo.typeLevel == {} || Game.PlayerWantedSystem.wantedInfo.typeLevel == null)
                return false;

            if (Game.PlayerWantedSystem.wantedInfo.typeLevel[0] == null)
                return false;

            let consume = PlayerWantedSystem.Instance(Game.PlayerWantedSystem.wantedInfo.typeLevel[0].value).battle_consume;
            return Game.PlayerInfoSystem.BaseInfo.level >= PlayerWantedSystem.GetLimitLevel(1) && Game.PlayerInfoSystem.BaseInfo.wantedCoin > 0;
        }

        private static tips_7_2(): boolean {
            if (Game.PlayerWantedSystem.wantedInfo == null)
                return false;

            if (Game.PlayerWantedSystem.wantedInfo.typeLevel == {} || Game.PlayerWantedSystem.wantedInfo.typeLevel == null)
                return false;

            if (Game.PlayerWantedSystem.wantedInfo.typeLevel[1] == null)
                return false;

            let consume = PlayerWantedSystem.Instance(Game.PlayerWantedSystem.wantedInfo.typeLevel[1].value).battle_consume;
            return Game.PlayerInfoSystem.BaseInfo.level >= PlayerWantedSystem.GetLimitLevel(2) && Game.PlayerInfoSystem.BaseInfo.wantedCoin > 0;
        }

        private static tips_7_3(): boolean {
            return false;
        }

        private static tips_7_4(): boolean {
            return false;
        }

        private static tips_7_5(): boolean {
            return false;
        }

        private static tips_7_6(): boolean {
            return false;
        }

        private static tips_8_1(): boolean {
            return false;
        }

        // 商城
        public static tips_9_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_NORMAL].leftTime == 0;
            return cond;
        }

        public static tips_9_2(): boolean {
            return true;
        }

        // 神秘商店红点
        public static tips_9_2_red_set(time) {
            Tips.tips_onetime_set(Tips.SAVE.SERECT_MALL, time);
        }

        public static tips_9_2_red_get(): boolean {
            return Tips.tips_onetime_get(Tips.SAVE.SERECT_MALL);
        }

        // 神秘商店弹窗
        public static tips_9_2_tip_set(time) {
            Tips.tips_onetime_set(Tips.SAVE.SERECT_TIPS, time);
        }

        public static tips_9_2_tip_get(): boolean {
            return Tips.tips_onetime_get(Tips.SAVE.SERECT_TIPS);
        }

        private static tips_9_3(): boolean {
            let cond1 = Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL);
            let cond2 = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_MALL);
            let cond3 = Tips.GetTipsOfId(Tips.TAG.CONTEND, Tips.TAG.CONTEND_MALL);
            let cond4 = Tips.GetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL);
            let cond5 = Tips.GetTipsOfId(Tips.TAG.ZORK, Tips.TAG.ZORK_MALL);
            let cond6 = Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.PK_MALL);
            let cond7 = Tips.GetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL);
            let cond = cond1 || cond2 || cond3 || cond4 && cond5 && cond6 && cond7;

            return cond;
        }

        // 教学
        private static tips_10_1(): boolean {
            let cond = false;
            if (Teach.isTeach(null) != -1) {
                cond = true;
            }
            return cond;
        }

        // 玉石
        private static tips_11_1(): boolean {
            return false;
        }

        private static tips_11_2(): boolean {
            return false;
        }

        private static tips_11_3(): boolean {
            return false;
        }

        // 副本
        private static tips_20_1(): boolean {
            let tblArea = TableInstanceArea.Table();
            for (let [kk, vv] of HelpUtil.GetKV(tblArea)) {
                if (Tips.tips_instance_1(vv.area_id))
                    return true;
            }

            return false;
        }

        private static tips_20_2(): boolean {
            let statusList = Game.PlayerInstanceSystem.GetAreaSearchStatus();
            for (let vv of statusList) {
                if (vv) return true;
            }

            return false;
        }

        // 宝箱
        private static tips_21_1(): boolean {
            return false;
        }

        private static tips_21_2(): boolean {
            let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LOTTERY];

            if (info.leftTime == 0)
                return Tips.tips_onetime_get(Tips.SAVE.LOTTERY);
            else
                return false;
        }

        // 日常
        private static tips_22_1(): boolean {
            let MAX_SCORE = 100;
            let MAX_POINT = 5;
            let _not_get_daily1 = () => {
                let score = Game.PlayerMissionSystem.missionActive.activeScore < MAX_SCORE ? Game.PlayerMissionSystem.missionActive.activeScore : MAX_SCORE;
                let index = Math.floor(score / MAX_SCORE * MAX_POINT);
                let count = Game.PlayerMissionSystem.missionActive.activeIndex.length;
                return index != count;
            }

            let cond = PlayerMissionSystem.FunOpenTo(FUNC.DAILY) && _not_get_daily1();
            return cond;
        }

        private static tips_22_2(): boolean {
            let _not_get_daily2 = () => {
                return Table.FindF(Game.PlayerMissionSystem.missionMap, function (k, v) {
                    return v.type == message.MissionType.MISSION_TYPE_DAILY && Game.PlayerMissionSystem.itemCompleteForLive(k);
                });
            }

            let cond = PlayerMissionSystem.FunOpenTo(FUNC.DAILY) && _not_get_daily2();
            return cond;
        }

        private static tips_22_3(): boolean {
            let _not_get_daily3 = () => {
                return Table.FindF(Game.PlayerMissionSystem.missionMap, function (k, v) {
                    return v.type == message.MissionType.MISSION_TYPE_ACHIEVE && Game.PlayerMissionSystem.itemCompleteForAchieve(k);
                });
            }

            let cond = PlayerMissionSystem.FunOpenTo(FUNC.DAILY) && _not_get_daily3();
            return cond;
        }

        // 领奖
        private static tips_23_1(): boolean {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday == null) return false;

            let bSign = Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday;
            return !bSign;
        }

        private static tips_23_2(): boolean {
            return false;
        }

        private static tips_23_3(): boolean {
            return false;
        }

        private static tips_23_4(): boolean {
            // 没开启测试
            // let cond1 = !Device.isTestSwitch;

            // // 购买后是否领取
            // let cond2 = Table.FindF(Game.Playerm, function(k, v) {
            //     return v.isToday == false;
            // });

            // // 是否结束
            // let cond3 = table.findfTable.FindF(Player.monthInfo, function(k, v) {
            //     return v.monthDays > 0;
            // });

            // //非评审版
            // let cond4 = !Device.isReviewSwitch;
            // let cond = cond1 && cond2 && cond3 && cond4;

            return false;
        }

        private static tips_23_5_set(day) {
            Tips.tips_oneday_set(Tips.SAVE.AWARD_FUND, day);
        }

        private static tips_23_5_get(): boolean {
            return Tips.tips_oneday_get(Tips.SAVE.AWARD_FUND);
        }

        // 基金:1可购买;2可领奖
        private static tips_23_5(): boolean {
            let _BUY_LEVEL = 40;
            let _BUY_VIP = 3;

            // 没有购买 and 未到40级 and 未到vip3级 and 今日没点击
            let cond1 = !Game.PlayerMixUnitInfoSystem.mixunitinfo.buy_fund
                && Game.PlayerInfoSystem.BaseInfo.licenceLevel < _BUY_VIP
                && Game.PlayerInfoSystem.BaseInfo.level < _BUY_LEVEL
                && Tips.tips_23_5_get();

            // 没有购买 and 达到vip3级
            let cond2 = !Game.PlayerMixUnitInfoSystem.mixunitinfo.buy_fund
                && Game.PlayerInfoSystem.BaseInfo.licenceLevel >= _BUY_VIP
                && Game.PlayerInfoSystem.BaseInfo.level < _BUY_LEVEL;

            // 购买后，可以领取
            let cond3 = Game.PlayerMixUnitInfoSystem.mixunitinfo.buy_fund && Otherdb.FundReward();

            // 非评审版
            // let cond4 = !Device.isReviewSwitch;

            let cond = cond1 || cond2 || cond3; // && cond4;
            return cond;
        }

        private static tips_23_6(): boolean {
            return false;
        }

        // 充值
        private static tips_24_1(): boolean {
            return false;
        }

        public static tips_25_set(day) {
            Tips.tips_oneday_set(Tips.SAVE.ACTIVITY_ALL, day);
        }

        private static tips_25_get(): boolean {
            return Tips.tips_oneday_get(Tips.SAVE.ACTIVITY_ALL);
        }

        // 活动
        private static tips_25_1(): boolean {
            // 活动是否更新/未点击
            let cond1 = Tips.tips_25_get();

            // 内部活动是否开始(除真情回馈 ) and 内部红点 or 点击
            let cond2 = Table.FindF(Game.PlayerActivitySystem.Activities, function (k, v) {
                return true
                    && Game.Controller.curServerTime > 0
                    && v.openTime <= Game.Controller.curServerTime
                    && v.closeTime > Game.Controller.curServerTime
                    && v.type != message.ActivityType.ACT_TYPE_CHARGE_BACK
                    && v.type != message.ActivityType.ACT_TYPE_WISHTREE
                    && (Tips.GetTipsOfActivity(v.type, v.index) || (Otherdb.GetActivityInShow(v.type, v.index) && Tips.tips_activity_get(v.type, v.index)))
            });

            let cond = cond1 || cond2;

            return cond;
        }

        private static tips_25_2(): boolean {
            return false;
        }

        private static tips_25_3(): boolean {
            let bTips1 = Tips.tips_useTime_get(Tips.SAVE.DOUBLE_TOKEN_ACTIVITY)

            let selectTransferId = 100213;
            let bTips2 = false;
            let [findGift, _] = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                return _v.gift_index == selectTransferId;
            });

            let gift_info = PlayerGiftSystem.Instance_item(selectTransferId);

            if (findGift != null) {
                if (findGift.buy_times < gift_info.buy_times) {
                    bTips2 = Tips.tips_useTime_get(Tips.SAVE.GIFT_BAG_ACTIVITY);
                }
            }

            return bTips1 || bTips2;
        }

        private static SetTipsOfActivity() {
            for (let k in Game.PlayerActivitySystem.Activities) {
                let info = Game.PlayerActivitySystem.Activities[k];
                Tips.Activity[info.type][info.index] = false;
                if (0 < Game.Controller.curServerTime && info.openTime < Game.Controller.curServerTime && Game.Controller.curServerTime < info.closeTime) {
                    // 七天登陆活动
                    if (info.type == message.ActivityType.ACT_TYPE_CONTINUELOGIN) {
                        Tips.Activity[info.type][info.index] = !info.todayReward && info.daysIndex <= info.rewardZone.length;
                    }
                    // 累积充值送好礼
                    else if (info.type == message.ActivityType.ACT_TYPE_CHARGEADD) {
                        // for (let k in info.rewardZone) {
                        for (let i = 0; i < info.rewardZone.length; i++) {
                            if (info.rewardIndex.length != info.rewardZone.length) {
                                let bIsGet = true; //= Table.VIn(info.rewardIndex, i); // 已领取
                                for (let j = 0; j < info.rewardIndex.length; j++) {
                                    if (info.rewardIndex[j] == i) {
                                        bIsGet = true;
                                    } else {
                                        bIsGet = false;
                                    }
                                }
                                Tips.Activity[info.type][info.index] = ((info.itemCount >= info.rewardZone[i]) && bIsGet);  // 可领取
                                if ((info.itemCount >= info.rewardZone[i] && bIsGet)) break;
                            }
                        }
                    }
                    // 消耗类活动 
                    else if (info.type == message.ActivityType.ACT_TYPE_CONSUME) {
                        for (let kk in info.rewardZone) {
                            let bIsGet = Table.VIn(info.rewardIndex, Number(kk) + 1)//已领取
                            let bNotGet = info.itemCount >= info.rewardZone[kk] && !bIsGet;  // 可领取
                            Tips.Activity[info.type][info.index] = bNotGet
                            if (bNotGet) break;
                        }
                    }
                    // 搜集道具
                    else if (info.type == message.ActivityType.ACT_TYPE_COLLECT) {
                        for (let v of info.exchanges) {
                            let canGet = false;
                            let itemSet01 = PlayerItemSystem.Set(v.exchangeInfo[0].goodsId);
                            let item01_num = v.exchangeInfo[0].count;
                            let item01_get = yuan3(itemSet01.Count == 0, 1, itemSet01.Count);
                            if (v.exchangeInfo[1] != null) {
                                let itemSet02 = PlayerItemSystem.Set(v.exchangeInfo[1].goodsId);
                                let item02_num = v.exchangeInfo[1].count;
                                let item02_get = yuan3(itemSet02.Count == "", 1, itemSet02.Count);
                                canGet = item01_get >= item01_num && item02_get >= item02_num;
                            }
                            else {
                                canGet = item01_get >= item01_num;
                            }
                            // 已兑换完
                            let bIsGet = Table.FindF(info.kvInfos, function (k, vv) {
                                return vv.key == v.index && vv.value >= v.exchangeCount;
                            });
                            let bNotGet = canGet && !bIsGet; // 可领取
                            Tips.Activity[info.type][info.index] = bNotGet;
                            if (bNotGet) break;
                        }
                    }
                    // 每日充值送好礼
                    else if (info.type == message.ActivityType.ACT_TYPE_CHARGEDAILY) {
                        let canGet = info.itemCount >= info.chargeDaily;
                        let bNotGet = !info.todayReward && canGet;  // 可领取
                        Tips.Activity[info.type][info.index] = bNotGet;
                    }
                    // 每日累计充值
                    else if (info.type == message.ActivityType.ACT_TYPE_DAILYADD) {
                        let _info = info.dailyAddItems[info.daysIndex] || info.dailyAddItems[0];
                        let bReward = Table.FindF(_info.rewardZone, function (k, v) {
                            let bZone = _info.chargeCount >= _info.rewardZone[k];
                            let bGet = Table.FindF(_info.rewardIndex, function (kk, vv) {
                                return vv == k;
                            });
                            return bZone && !bGet;
                        });
                        Tips.Activity[info.type][info.index] = bReward;
                    }
                    // 开服寻访猪哥
                    else if (info.type == message.ActivityType.ACT_TYPE_END) {
                        let count = Game.PlayerVIPSystem.vipInfo.lottery_beer_time + Game.PlayerVIPSystem.vipInfo.lottery_redwine_time + Game.PlayerVIPSystem.vipInfo.lottery_champagne_time;
                        let count1 = Table.FindZ(info.rewardZone, count);
                        let count2 = Game.PlayerMixUnitInfoSystem.mixunitinfo.lotteryRewards.length;
                        let bReward = count1 != count2;
                        Tips.Activity[info.type][info.index] = bReward;
                    }
                    // 除真情回馈
                    else if (info.type == message.ActivityType.ACT_TYPE_CHARGE_BACK) {
                        let [bGet, _] = Table.FindR(info.rewardZone, function (k, v) {
                            return true && info.itemCount >= v && !Table.VIn(info.rewardIndex, k);
                        });
                        Tips.Activity[info.type][info.index] = bGet;
                    }
                    // 专题献礼
                    else if (info.type == message.ActivityType.ACT_TYPE_MISSION) {
                        for (let v of info.missions) {
                            let _alnum = 0;
                            for (let vv of info.kvInfos) {
                                if (vv.key == v.mission_type) {
                                    _alnum = vv.value;
                                }
                            }
                            let bIsGet = Table.VIn(info.rewardIndex, v.mission_type);   // 已领取
                            let bNotGet = (_alnum >= v.mission_condition || v.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN) && !bIsGet;  // 可领取
                            Tips.Activity[info.type][info.index] = bNotGet;
                            if (bNotGet) break;
                        }
                    }
                    // 双月卡活动
                    else if (info.type == message.ActivityType.ACT_TYPE_MONTHFIT) {
                        // 双月卡购买完成并且未领取奖励
                        let Junior_Id = CommonConfig.month_card_fit[0]; // 初级月卡
                        let Advanced_Id = CommonConfig.month_card_fit[1];  // 高级月卡
                        let Junior_Tbl = PlayerGiftSystem.Instance_item(Junior_Id);
                        let Advanced_Tbl = PlayerGiftSystem.Instance_item(Advanced_Id);

                        let [Junior_Info, _] = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                            return _v.gift_index == Junior_Id;
                        });

                        let [Advanced_Info, __] = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                            return _v.gift_index == Advanced_Id;
                        });

                        if (Junior_Info == null || Advanced_Info == null) {
                            Tips.Activity[info.type][info.index] = false;
                        }
                        else {
                            // 月卡是否购买
                            let b_jun_bought = Junior_Info.buy_times >= Junior_Tbl.buy_times;
                            let b_adv_bought = Advanced_Info.buy_times >= Advanced_Tbl.buy_times;

                            // 是否领取过
                            // 月卡领取奖励单项
                            let reward_has_get = Table.FindF(info.rewardIndex, function (_k, _v) {
                                return _v == 1;
                            });

                            if (b_jun_bought && b_adv_bought && !reward_has_get)
                                Tips.Activity[info.type][info.index] = true;
                            else
                                Tips.Activity[info.type][info.index] = false;
                        }
                    }
                    else {
                        Tips.Activity[info.type][info.index] = false;
                    }
                }
            }
        }

        // 武将提示
        public static GetTipsOfHero(generalId: number, id?: number): boolean {
            if (generalId != null && id != null && Tips.Hero[generalId] != null && Tips.Hero[generalId][id] != null) {
                return Tips.Hero[generalId][id];
            }
            else if (generalId != null && id == null) {
                return false ||
                    Tips.Hero[generalId][2] ||
                    Tips.Hero[generalId][3] ||
                    Tips.Hero[generalId][4] ||
                    Tips.Hero[generalId][5] ||
                    Tips.Hero[generalId][6] ||
                    Tips.Hero[generalId][7] ||
                    Tips.Hero[generalId][8] ||
                    Tips.Hero[generalId][9];
            }
        }

        // 武将红点
        public static SetTipsOfHero(generalId: number, id?: number) {
            if (Tips.Hero[generalId] == null) {
                Tips.Hero[generalId] = [];
                for (let i = 1; i <= 10; i++) {
                    Tips.Hero[generalId][i] = false;
                }
            }

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);

            let funcHero = [
                Tips.tips_hero_1(),
                Tips.tips_hero_2(generalId, hunterInfo),
                Tips.tips_hero_3(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_4(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_5(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_6(),
                Tips.tips_hero_7(),
                Tips.tips_hero_8(),
                Tips.tips_hero_9(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_10(generalId, hunterInfo, baseGeneralInfo),
            ]

            if (generalId && !id) {
                for (let i = 0; i < funcHero.length; i++) {
                    let v = funcHero[i];
                    Tips.Hero[generalId][i + 1] = v;
                }
            } else if (generalId && id) {
                Tips.Hero[generalId][id] = funcHero[id];
            }

            Tips.SetTipsOfId(Tips.TAG.GENERAL);
        }

        // 有可召唤的猎人
        private static tips_hero_1() {
            return false;
        }

        // 猎人可进阶
        private static tips_hero_2(generalId: number, hunterInfo: message.GeneralInfo) {
            let allActived = true;
            for (let i = 1; i <= 4; i++) {
                let partnerLv = PlayerHunterSystem.GetPartnerLv(generalId, i);
                if (hunterInfo.step >= partnerLv || hunterInfo.step == CommonConfig.general_max_quality) {
                    allActived = false;
                    break;
                }
            }

            let moneyEnough = PlayerHunterSystem.GetStep(generalId).consume_money <= Game.PlayerInfoSystem.BaseInfo.money;

            return allActived && moneyEnough;
        }

        // 可激活羁绊卡
        private static tips_hero_3(generalId: number, hunterInfo: message.GeneralInfo, baseGeneralInfo: TableBaseGeneral) {
            for (let i = 1; i <= 4; i++) {
                let partner = PlayerHunterSystem.GetPartner(generalId, i);
                let partnerLevel = PlayerHunterSystem.GetPartnerLv(generalId, i);
                let holeLevel = PlayerHunterSystem.GetHoleLevel(generalId, i);
                let holeInfo = PlayerHunterSystem.GetHole(generalId, i);
                if (partner == null || holeInfo == null) break;

                let bActive = (hunterInfo.step < partnerLevel);
                let bLevel = (hunterInfo.level >= holeLevel);
                let bCount = (PlayerItemSystem.Count(partner.id) >= holeInfo.activate_num);
                if (!bActive && bCount && bLevel) return true;
            }

            return false;
        }

        // 有技能点可以升级技能了
        private static tips_hero_4(generalId: number, hunterInfo: message.GeneralInfo, baseGeneralInfo: TableBaseGeneral) {
            return hunterInfo.skill_num > 0;
        }

        // 有卡片可以安装
        private static tips_hero_5(generalId: number, hunterInfo: message.GeneralInfo, baseGeneralInfo: TableBaseGeneral) {
            let func = PlayerMissionSystem.FunOpenTo(FUNC.POTATO);
            if (!func) return false;
            if (baseGeneralInfo.is_open == 0) return false;

            let cardMap = Game.PlayerCardSystem.getHunterCardMap(generalId);
            let level = Game.PlayerInfoSystem.Level;
            for (let i = 1; i <= 9; i++) {
                if (baseGeneralInfo.card_level[i - 1] <= level) {
                    if (cardMap[i] == null) {
                        let type = baseGeneralInfo.card_type[i - 1];
                        if (PlayerCardSystem.GetHaveCardByType(type) == true) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        // 武将可升星
        private static tips_hero_6() {
            return false;
        }

        // 武将觉醒
        private static tips_hero_7() {
            // wtf!!!
            return false;
        }

        // 念力
        private static tips_hero_8() {
            return false;
        }

        // 装备
        private static tips_hero_9(generalId: number, hunterInfo: message.GeneralInfo, baseGeneralInfo: TableBaseGeneral) {
            let not_get_hero_1 = () => {
                let equipInfo = baseGeneralInfo.equip_info;
                return Table.FindF(equipInfo, function (k, v) {
                    let have = Table.FindF(Game.PlayerHunterSystem.queryHunter(generalId).equipInfo, function (kk, vv) {
                        return vv.equipId == v;
                    });
                    return v != 0 &&
                        ((Number(k) != 3 && PlayerHunterSystem.equipCanActive(generalId, equipInfo, v)) ||
                            (Number(k) == 3 && PlayerHunterSystem.equipCanCompound(generalId, equipInfo)) ||
                            (have && PlayerHunterSystem.equipCanUpStep(generalId, v)) ||
                            (have && PlayerHunterSystem.equipCanStrengthen(generalId, v)));
                });
            }
            return PlayerMissionSystem.FunOpenTo(FUNC.EQUIP) && not_get_hero_1();
        }

        // 升级
        private static tips_hero_10(generalId: number, hunterInfo: message.GeneralInfo, baseGeneralInfo: TableBaseGeneral) {
            let canUpLevel = () => {
                let canUpMaxLevel = 0;
                if (hunterInfo.break_level != 0 && hunterInfo.level >= 60) {
                    let [_, levelNext, __] = PlayerHunterSystem.GetBreakHunterLevel(hunterInfo.break_level);
                    canUpMaxLevel = 60 + levelNext;
                }
                else {
                    canUpMaxLevel = PlayerHunterSystem.GetStep(generalId).max_level;
                }

                let needsIsEnough = (exp) => {
                    let _PROP_INDEX = [30001, 30002, 30003, 30004];
                    let metGivenExp = 0;
                    for (let v of _PROP_INDEX) {
                        if (Game.PlayerCardSystem.getGoodsById(v) != null) {
                            metGivenExp = metGivenExp + Game.PlayerCardSystem.getGoodsById(v).count * Number(TableItemProp.Item(v).general_exp);
                        }
                    }

                    return metGivenExp >= exp;
                };

                let [ExpNow, ExpNext, _] = PlayerHunterSystem.Exp(generalId);
                let needEnough = needsIsEnough(ExpNext - ExpNow);

                return canUpMaxLevel > hunterInfo.level && needEnough;
            };

            return PlayerMissionSystem.FunOpenTo(FUNC.HEROLEVEL) && canUpLevel();
        }

        private static tips_27_1() {
            let allGen = Game.PlayerFormationSystem.GetAllFormatGeneralByType(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
            return Table.FindF(allGen, function (kk, vv) {
                if (Tips.Hero[vv]) {
                    return Table.FindF(Tips.Hero[vv], function (k, v) {
                        return v;
                    });
                }
            });
        }

        // 装备
        private static tips_39_1(): boolean {
            // 列表中排前七名的武将头像上有红点
            let _get_hero_equip = () => {
                let hero_seven = Game.PlayerHunterSystem.getSortGeneral()
                let cond1 = Table.FindF(hero_seven, function (k, v) {
                    return 0 <= Number(k) && Number(k) <= 6 && Tips.Hero[v.general_id][9];
                });

                return cond1;
            };

            let cond = _get_hero_equip();

            return cond;
        }

        // 念兽
        private static tips_28_1(): boolean {
            let _not_get_pet_1 = () => {
                let tbl = TableBaseAdviser.Table();
                return Table.FindF(tbl, function (k, v) {
                    return PlayerAdviserSystem.CompletedHave(v.adviser_id);
                });
            };

            let cond = (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && _not_get_pet_1();
            return cond;
        }

        private static tips_28_2(): boolean {
            let _not_get_pet_2 = () => {
                let tbl = TableBaseAdviser.Table();
                return Table.FindF(tbl, function (k, v) {
                    return PlayerAdviserSystem.CompletedMax(v.adviser_id, Game.PlayerAdviserSystem.advisersMap[v.adviser_id].level);
                });
            };

            let cond = (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && _not_get_pet_2();
            return cond;
        }

        private static tips_28_3(): boolean {
            let _not_get_pet_3 = () => {
                let tbl = Game.PlayerAdviserSystem.adviser;
                return Table.FindF(tbl, function (k, v) {
                    return (v.adviserId == 12 && v.reward_count != 0) || (v.adviserId == 11 && v.reward_count != 0);
                });
            };

            let cond = (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && _not_get_pet_3();
            return cond;
        }

        private static tips_28_4(): boolean {
            let _not_get_pet_4 = () => {
                let tbl = TableBasePet.Table();
                return Table.FindF(tbl, function (k, v) {
                    return PlayerAdviserSystem.PetGetTips(v.pet_id);
                });
            };

            let cond = (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && _not_get_pet_4();
            return cond;
        }

        private static tips_28_5(): boolean {
            let _not_get_pet_5 = () => {
                let tbl = Game.PlayerAdviserSystem.petInfo;
                return Table.FindF(tbl, function (k, v) {
                    return PlayerAdviserSystem.PetUpStar(v.pet_id, Game.PlayerAdviserSystem.petMap[v.pet_id].star);
                });
            };

            let cond = (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && _not_get_pet_5();
            return cond;
        }

        private static tips_28_6(): boolean {
            let _not_get_pet_6 = () => {
                let tbl = Game.PlayerAdviserSystem.petInfo;
                return Table.FindF(tbl, function (k, v) {
                    return PlayerAdviserSystem.PetStep(v.pet_id);
                });
            };

            let cond = (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER) || PlayerAdviserSystem.Open()) && _not_get_pet_6();
            return cond;
        }

        // 好友
        private static tips_29_1(): boolean {
            let cond = false;
            let bTag = false;
            for (const k in Game.PlayerRelateSystem.relateResp.relations) {
                const v = Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == message.ERelationType.RELATION_TYPE_FRIEND && v.canReward && v.isReward == false) {
                    bTag = true;
                    break;
                }
            }
            if (Game.PlayerVIPSystem.vipInfo.rewardPower != null && Game.PlayerVIPSystem.vipInfo.rewardPower < PlayerVIPSystem.ItemNew().reward_power && bTag == true) {
                cond = true;
            }
            return cond;
        }

        private static tips_29_2(): boolean {
            let cond = false;
            if (Game.PlayerRelateSystem.relateResp.applys.length > 0) {
                cond = true;
            }
            return cond;
        }

        // 排行
        private static tips_30_1(): boolean {
            return false;
        }

        // 背包
        private static tips_31_1(): boolean {
            let bFind = Table.FindF(Game.PlayerItemSystem.mapGoodsInfo, function (k, v) {
                let info = PlayerItemSystem.ItemConfig(v.goodsId);
                return info != null && info["red_tips"] != null && info["red_tips"] != 0;
            });

            return bFind;
        }

        // 邮件
        private static tips_33_1(): boolean {
            let _check_type = [
                message.MailType.MAIL_TYPE_SYSTEM,
                message.MailType.MAIL_TYPE_NORMAL,
                message.MailType.MAIL_TYPE_PVP,
            ];

            let cond = Table.FindF(Game.PlayerMailSystem.mailboxInfo, function (k, v) {
                let pkRed = (Number(k) + 1 == message.MailType.MAIL_TYPE_PVP) && Tips.GetSaveBool(Tips.SAVE.MAIL_PK, false);
                return Table.VIn(_check_type, Number(k) + 1) && (v.unReadCount + v.unReward > 0) && !pkRed;
            });

            return cond;
        }

        // 新手
        private static tips_34_1(): boolean {
            return false;
        }

        // 首冲
        private static tips_35_1(): boolean {
            return false;
        }

        private static tips_35_2(): boolean {
            let info = Game.PlayerGiftSystem.firstCharge();
            let bAllGet = Table.alltrue(info, function (k, v) {
                let bFull = Game.PlayerInfoSystem.BaseInfo.chargeToken >= v.token;
                let bGet = Table.VIn(Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, Number(k) + 1);
                return (bFull && bGet) || !bFull;
            });

            let cond = !bAllGet && Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;

            return cond;
        }

        // 七天
        private static tips_36_1(): boolean {
            let bOpen = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0;
            let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (kk, vv) {
                return vv == 0;
            });

            return bOpen && bReward;
        }

        private static tips_36_2(): boolean {
            let mixUnitInfo = Game.PlayerMixUnitInfoSystem.mixunitinfo;
            if (mixUnitInfo.newGiftSeven.length < mixUnitInfo.sevenLoginReward.length && mixUnitInfo.sevenLoginReward.length <= 7)
                return true;
            else
                return false;
        }

        // 新手狂欢
        private static tips_37_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0
                && (Game.PlayerMissionSystem.NoviceCanReward(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) || Game.PlayerMissionSystem.NoviceCanRewardEnd(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL));
            return cond;
        }

        private static tips_38_1(): boolean {
            return false;
        }

        // 更多
        private static tips_42_1(): boolean {
            let cond = Tips.GetTipsOfId(Tips.TAG.PACKAGE) || Tips.GetTipsOfId(Tips.TAG.FRIEND) || Tips.GetTipsOfId(Tips.TAG.RANK);

            return cond;
        }

        // 真情回馈
        public static tips_43_set(day) {
            Tips.tips_oneday_set(Tips.SAVE.ACTIVITY_BACK, day)
        }

        public static tips_43_get() {
            return Tips.tips_oneday_get(Tips.SAVE.ACTIVITY_BACK);
        }

        private static tips_43_1(): boolean {
            // 活动是否更新/未点击
            let cond1 = Tips.tips_43_get();

            // 内部活动是否开始 and 内部红点 or 点击
            let cond2 = Table.FindF(Game.PlayerActivitySystem.Activities, function (k, v) {
                return true
                    && v.type == message.ActivityType.ACT_TYPE_CHARGE_BACK
                    && Game.Controller.curServerTime > 0
                    && v.openTime <= Game.Controller.curServerTime
                    && v.closeTime > Game.Controller.curServerTime
                    && Tips.Activity[v.type][v.index];
            });

            let cond = cond1 || cond2;

            return cond;
        }

        private static tips_44_1(): boolean {
            return true;
        }

        // 回收
        private static tips_46_1(): boolean {
            return false;
        }

        // 宝物
        private static tips_47_1(): boolean {
            let cardBags = PlayerCardSystem.GetAllCardBag();

            return cardBags.length != 0 && PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO);
        }

        private static tips_47_2(): boolean {
            return false;
        }

        private static tips_47_3(): boolean {
            let tbl = PlayerCardSystem.GetComposeTbl();

            let bTip = Table.FindF(tbl, function (_k, _v) {
                return _v.can_compose == 1;
            });

            let bOpen = PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO);

            return bTip && bOpen;
        }

        // 设置邮件提示
        public static SetTipsOfMail() {
            Tips.SetTipsOfId(Tips.TAG.MAIL, 1);
        }

        // 获取邮件提示
        public static GetTipsOfMail(mailType: number) {
            let cond: boolean = false;

            if (Game.PlayerMailSystem.mailboxInfo != null && Game.PlayerMailSystem.mailboxInfo[mailType - 1] != null) {
                cond = false || Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReadCount > 0 || Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReward > 0;
            }
            Tips.SetTipsOfMail();

            return cond;
        }

        public static SetTipsOfTime() {
            // 活动一次性红点
            Tips.tips_25_set(Game.PlayerMissionSystem.GetDay());
            // 回馈一次性红点
            Tips.tips_43_set(Game.PlayerMissionSystem.GetDay());
            // 基金一次性红点
            Tips.tips_23_5_set(Game.PlayerMissionSystem.GetDay());
            // 酒馆活动红点
            Tips.tips_oneday_set(Tips.SAVE.TAVERN_ACTIVITY, Game.PlayerMissionSystem.GetDay());
            // 伏牛
            Tips.SetTipsOfId(Tips.TAG.BASTILLE);
            // 冲榜
            Tips.SetTipsOfId(Tips.TAG.CHARGE);
            // 魔域祭祀
            Tips.SetTipsOfId(Tips.TAG.ZORK, Tips.TAG.ZORK_Runes);
            // 邮件
            Tips.SetTipsOfId(Tips.TAG.MAIL);
            // 联盟战
            // Tips.SetTipsOfId(Tips.TAG.LEAGUE, 6)
            // 魔域Boss
            Tips.SetTipsOfId(Tips.TAG.ZORK, Tips.TAG.ZORK_Boss);
        }

        public static SetTipsOfAllHero() {
            // 武将提示
            Tips.SetTipsOfId(Tips.TAG.GENERAL);
            // 图鉴
            //Tips.SetTipsOfId(Tips.TAG.Pokedex);
        }

        public static SetTipsOfAllActivity() {
            // 活动红点数据
            Tips.SetTipsOfActivity();
            // 活动红点
            Tips.SetTipsOfId(Tips.TAG.ACTIVITY);
            // 回馈红点
            Tips.SetTipsOfId(Tips.TAG.FEEDBACK);
        }

        public static tips_45_1_setread(read) {
            Tips.tips_onetime_set(Tips.SAVE.WONDERLAND_BOSS_TIPS, read);
        }

        private static tips_45_1(): boolean {
            return false;
        }

        private static tips_45_2(): boolean {
            let bOpen = false;
            let bFresh = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info != 0;
            let cond = bFresh && bOpen;
            return cond;
        }

        private static tips_45_3(): boolean {
            if (Game.PlayerInfoSystem.BaseInfo.licenceLevel == null) return false;

            let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.RUNES);
            let bTimes = false;
            let level = Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            let tbl = TableLicence.Table();
            let runesTime = tbl[level].gain_runes_time;
            if (Game.PlayerVIPSystem.vipInfo.gain_runes_time != null) {
                bTimes = Game.PlayerVIPSystem.vipInfo.gain_runes_time < runesTime && true || false;
            }

            let rewardGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0;
            let cond = bOpen && bTimes || rewardGet;
            return cond;
        }

        private static tips_45_4(): boolean {
            // hhh  convertdb.Tips?
            // let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.RUNES);
            // let bOther = playerc convertdb.Tips(message.EExchangeMallType.EXCHANGEMALL_TYPE_DEMON)
            // let cond = bOpen && bOther;
            // return cond;
            return false;
        }

        // 冲榜
        private static tips_48_1(): boolean {
            let cond = false;
            for (let v of Game.PlayerActivitySystem.Activities) {
                if (v.type == message.ActivityType.ACT_TYPE_CHARGERANK) {
                    let time = v.stopTime - Game.Controller.curServerTime;
                    if (time > 0) {
                        cond = true;
                    }
                }
            }

            return cond;
        }

        private static tips_48_2(): boolean {
            let show_count = 3;
            let rewardGet = false;
            let index = 0;
            let can_get = false;
            for (let v of Game.PlayerActivitySystem.Activities) {
                if (v.type == message.ActivityType.ACT_TYPE_CHARGERANK) {
                    can_get = v.stopTime - Game.Controller.curServerTime > 0;
                    for (let kk in v.rewardZone) {
                        let vv = v.rewardZone[kk];
                        if (v.itemCount >= vv) {
                            index = Number(kk) > show_count ? show_count : Number(kk);
                        }
                    }

                    if (index != v.rewardIndex.length && index != 0) {
                        rewardGet = true;
                    }
                }
            }

            return rewardGet && can_get;
        }

        // 执照
        private static tips_49_1(): boolean {
            let _not_get_License_1 = () => {
                let tbl = TableMissionType.Table();

                return Table.FindF(tbl, function (k, v) {
                    return v.type == message.MissionType.MISSION_TYPE_LICENCE && Game.PlayerMissionSystem.itemCompleteForLicense(k) && Game.PlayerInfoSystem.baseInfo_pre.level >= 10;
                });
            };

            return _not_get_License_1();
        }

        // 礼包
        private static tips_50_1(): boolean {
            // 首冲
            return false;
        }

        private static tips_50_2(): boolean {
            // 绝版
            return PlayerGiftSystem.findOpTips();
        }

        private static tips_50_3(): boolean {
            // 超值
            return PlayerGiftSystem.findTips();
        }

        private static tips_50_4(): boolean {
            // 充值
            return PlayerGiftSystem.findTipsCharge();
        }

        private static tips_51_1(): boolean {
            // 首次免费
            if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info == 0)
                return false;

            return !Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_isFree;
        }

        private static tips_51_2(): boolean {
            return false;
        }

        private static tips_51_3(): boolean {
            return Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0 && Game.PlayerInfoSystem.BaseInfo.dollCoin != 0;
        }

        // 福利活动
        // 签到
        private static tips_52_1(): boolean {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo == null) return false;
            return !Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday;
        }

        // 是否领奖
        private static tips_52_2(): boolean {
            let tbl = TableUplevelReward.Table();
            let info = [];
            let newTbl: { [key: string]: TableUplevelReward } = {};
            for (const key in tbl) {
                if (tbl.hasOwnProperty(key)) {
                    const element = tbl[key];
                    if (element.index > 1000) continue;
                    newTbl[key] = element;
                }
            }
            let ret = Table.copy(newTbl);
            ret.sort((a, b) => {
                return a.index - b.index;
            });

            for (const k in ret) {
                const vv = ret[k];
                if (vv.level <= Game.PlayerInfoSystem.BaseInfo.level) {
                    info.push(vv);
                }
            }
            let isGet = Table.FindF(info, function (kk, vv) {
                let level = info[kk].level;
                // 是否够买了月卡
                let BuyCard = PlayerGiftSystem.AdvanceMonthBeBought();

                let mixUnitInfo = Game.PlayerMixUnitInfoSystem.mixunitinfo;
                // 等级奖励是否领取
                let levelReward = Table.FindF(mixUnitInfo.levelReward, function (k, v) {
                    return v == Number(kk) + 1;
                });
                // 月卡奖励是否领取
                let monthReward = Table.FindF(mixUnitInfo.monthReward, function (k, v) {
                    return mixUnitInfo.monthReward.length != 0 && v == vv.index;
                });

                // 月卡没购买（满足等级条件，等级奖励未领取）
                let tips1 = BuyCard == false && Game.PlayerInfoSystem.BaseInfo.level >= level && !(info.length == mixUnitInfo.levelReward.length);
                let tips2 = BuyCard == true && Game.PlayerInfoSystem.BaseInfo.level >= level && !levelReward;
                let tips3 = BuyCard == true && Game.PlayerInfoSystem.BaseInfo.level >= level && levelReward && !monthReward;
                let tips4 = BuyCard && !monthReward;
                let cond = tips1 || tips2 || tips3 || tips4;

                return cond;
            });

            return isGet;
            // let info: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
            //     return v.gift_index == 100203;
            // })[0];
            // let info1: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
            //     return v.gift_index == 100204;
            // })[0];
            // if (info == null && info1 == null) {
            //     return false;
            // } else if (info != null && info1 == null) {
            //     if ((info.buy_times != 0 && info.mark == 0)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } else if (info == null && info1 != null) {
            //     if ((info1.buy_times != 0 && info1.mark == 0)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } else {
            //     if ((info.buy_times != 0 && info.mark == 0) || (info1.buy_times != 0 && info1.mark == 0)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }
        }

        private static tips_52_3(): boolean {
            return false;
        }

        // 点击一次消失
        private static tips_52_4(): boolean {
            Tips.tips_52_4_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_WORLD);
        }

        private static tips_52_4_set() {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_WORLD);
        }

        private static tips_52_5(): boolean {
            Tips.tips_52_5_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_WORDERLAND);
        }

        private static tips_52_5_set() {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_WORDERLAND);
        }

        private static tips_52_6(): boolean {
            Tips.tips_52_6_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_SKY);
        }

        private static tips_52_6_set() {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_SKY);
        }

        private static tips_52_7(): boolean {
            Tips.tips_52_7_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_WANTED);
        }

        private static tips_52_7_set() {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_WANTED);
        }

        private static tips_52_8(): boolean {
            if (Game.PlayerInfoSystem.BaseInfo.bind_phone == message.EBindPhone.BIND_PHONE_NOT_BIND) {
                Tips.tips_52_8_set();
                return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_BIND_PHONE);
            }
        }

        private static tips_52_8_set() {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_BIND_PHONE);
        }

        private static tips_52_9(): boolean {
            if (Tips.tips_useTime_get(Tips.SAVE.SPECIAL_SHARE)) {
                Tips.tips_52_9_set();
                return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_SHARE);
            }

            let mixUnitInfo = Game.PlayerMixUnitInfoSystem.mixunitinfo;

            let shareCount = {
                [message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE]: mixUnitInfo.share_role_create_count,
                [message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR]: mixUnitInfo.share_role_six_star_count,
                [message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE]: mixUnitInfo.share_role_first_charge_count
            };

            let shareReceive = {
                [message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE]: mixUnitInfo.share_role_create_gift,
                [message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR]: mixUnitInfo.share_role_six_star_gift,
                [message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE]: mixUnitInfo.share_role_first_charge_gift
            };

            // hhh shareInfo?
            for (let [k, v] of HelpUtil.GetKV(shareCount)) {
                // for (let [kk, vv] of )
            }

            return false;
        }

        private static tips_52_9_set() {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_SHARE);
        }

        private static tips_52_10(): boolean {
            let reward_progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INSTANCE_POWER];
            let canGet = CommonConfig.recieve_instance_power_info;
            let list = [];
            if (reward_progress) {
                for (let vv of canGet) {
                    if (vv <= reward_progress.info) {
                        list.push(vv);
                    }
                }
            }

            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.instancePower.length < list.length)
                return true;
            else
                return false;
        }

        // 图鉴
        private static tips_53_1(): boolean {
            // let tag = false;
            // for (const k in Game.PlayerHunterHistorySystem.getGeneralHistoryIds()) {
            //     const v = Game.PlayerHunterHistorySystem.getGeneralHistoryIds()[k];
            //     let item: any = v;
            //     let ins = PlayerHunterSystem.Table(item.generalId);
            //     if (ins != null && ins.is_open != 0 && Gmgr.Instance.pokedexTipsTbl[item.generalId] != null && Gmgr.Instance.pokedexTipsTbl[item.generalId] != 1) {
            //         tag = true;
            //         break;
            //     }
            // }

            // return tag;
            return false;
        }

        // 与时间赛跑
        // 当日红点
        private static tips_54_1(): boolean {
            return PlayerRaceSystem.GetTipsShow();
        }

        // 宝箱红点
        private static tips_54_2(): boolean {
            return false;
        }

        // Vip系统
        private static tips_55_1(): boolean {
            let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
            let chargeList = [];
            for (const v of Object.keys(tbl)) {
                if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum) {
                    chargeList.push(tbl[v]);
                }
            }
            let levelCur = chargeList.length - 1;
            let cond: boolean = false;
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward.length < levelCur) {
                cond = true;
            }
            return cond;
        }

        private static tips_55_2(): boolean {
            // return PlayerGiftSystem.findOpTipsVip();
            return false;
        }

        private static tips_55_3(): boolean {
            // if (Game.PlayerInfoSystem.BaseInfo.chargeToken < PlayerVIPSystem.WealItem(0)["charge"]) {
            //     return false;
            // }
            // if (Game.PlayerPaySystem.customerInfo.customerWeb != "" && Device.customerWeb == "") {
            //     return true;
            // }
            return false;
        }

        // 宝石收藏（任务达人）
        private static tips_56_1(): boolean {
            let mIndex = PlayerJewelSystem.GetActivityIndex();
            if (mIndex == null) {
                return false;
            }
            let isOver1 = () => {
                let id = PlayerJewelSystem.GetJewelDailyMission(mIndex);
                let tbl = Game.PlayerMissionSystem.itemMain(id);
                let index = Game.PlayerMissionSystem.itemIndex(tbl.type, tbl.sub_type);
                if (Game.PlayerMissionSystem.missionMap[index] == null) {
                    return false;
                }
                let [isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.itemComplete(index);
                return isCanGet && !isOver;
            }
            let isOver2 = () => {
                let id = PlayerJewelSystem.GetJewelFinalMission(mIndex);
                let tbl = Game.PlayerMissionSystem.itemMain(id);
                let index = Game.PlayerMissionSystem.itemIndex(tbl.type, tbl.sub_type);
                if (Game.PlayerMissionSystem.missionMap[index] == null) {
                    return false;
                }
                let [isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.itemComplete(index);
                return isCanGet && !isOver;
            }
            return isOver1() || isOver2();
        }

        // 宝石收藏（宝石商店  兑换奖励） 
        private static tips_56_2(): boolean {
            let index = PlayerJewelSystem.GetActivityIndex();
            if (index == null) {
                return false;
            }
            let aData = PlayerJewelSystem.GetJewelMallData(index);
            for (let i = 0; i < aData.length; i++) {
                if (Game.PlayerMissionSystem.missionActive.jewelHave > aData[i].consume && aData[i].leftTimes > 0) {
                    return true;
                }
            }
            return false;
        }

        private static tips_58_1(): boolean {
            // let bSeven = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0;
            // let _data = PlayerHunterSystem.Activity_Hero();
            // let count = Table.Count(_data, function (k, v) {
            //     return Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), _data[k].general_id) != -1 ? 1 : 0;
            // });
            // let bTipsUp = count != Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.length;
            // return bTipsUp && bSeven;

            let [heroCount1, heroCount2, heroCount3, heroCount4] = [0, 0, 0, 0];
            let [own_count1, own_count2, own_count3, own_count4] = [0, 0, 0, 0];
            let heroData = TableSpgeneralInformation.Table();
            let rewardData = TableSpgeneralReward.Table();

            for (const key in rewardData) {
                if (rewardData.hasOwnProperty(key)) {
                    const element = rewardData[key];
                    if (element.index.toString().substr(0, 1) == "1") {
                        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) { // 领取了奖励
                            own_count1++;
                        }
                    }
                    if (element.index.toString().substr(0, 1) == "2") {
                        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) { // 领取了奖励
                            own_count2++;
                        }
                    }
                    if (element.index.toString().substr(0, 1) == "3") {
                        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) { // 领取了奖励
                            own_count3++;
                        }
                    }
                    if (element.index.toString().substr(0, 1) == "4") {
                        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) { // 领取了奖励
                            own_count4++;
                        }
                    }

                }
            }
            for (const key in heroData) {
                if (heroData.hasOwnProperty(key)) {
                    const element = heroData[key];
                    if (element.task_type == 1) {
                        if (Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) { // 收集的猎人
                            heroCount1++;
                        }
                    }
                    if (element.task_type == 2) {
                        if (Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) { // 收集的猎人
                            heroCount2++;
                        }
                    }
                    if (element.task_type == 3) {
                        if (Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) { // 收集的猎人
                            heroCount3++;
                        }
                    }
                    if (element.task_type == 4) {
                        if (Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) { // 收集的猎人
                            heroCount4++;
                        }
                    }
                }
            }

            let isShowTip = (hero, count) => {
                if (hero == 8) return !(count == 3);
                if (hero >= 5) return !(count == 2);
                if (hero >= 3) return !(count == 1);
            }

            return isShowTip(heroCount1, own_count1) || isShowTip(heroCount2, own_count2) || isShowTip(heroCount3, own_count3) || isShowTip(heroCount4, own_count4);
        }

        // 许愿屋
        private static tips_59_1(): boolean {
            if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info == 0)
                return false;

            return PlayerVIPSystem.ItemNew().xuyuan_free > Game.PlayerVIPSystem.vipInfo.xuyuan_free;
        }

        private static tips_59_2(): boolean {
            let infoXuYuan = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN];

            if (infoXuYuan.info == 0 || infoXuYuan.leftTime == 0)
                return false;

            let xuyuanTbl = TableXuyuan.Table();

            let index = infoXuYuan.info % Table.tableLength(xuyuanTbl);
            index = index == 0 ? Table.tableLength(xuyuanTbl) : index;

            let cur_topic = TableXuyuan.Item(index);
            let can_get_num = 0;

            for (let v of cur_topic.step_score) {
                if (Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore >= v) {
                    can_get_num = can_get_num + 1;
                }
            }

            return !(can_get_num == Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone.length);
        }

        private static tips_61_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0
                && (Game.PlayerMissionSystem.NoviceCanReward(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE) || Game.PlayerMissionSystem.NoviceCanRewardEnd(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE));

            return cond;
        }

        // 黑暗大陆
        private static tips_62_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_RELIC].leftTime == 0;
            let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND2);

            return cond && bOpen;
        }

        private static tips_62_2(): boolean {
            let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND2);
            let canFight = false;
            let relicTbl = TableInstanceRelic.Table();
            for (let i = 0; i < Object.keys(relicTbl).length; i++) {
                if (PlayerDarkSystem.LastChallengeTime(i + 1) > 0) {
                    canFight = true;
                }
            }

            let canOpenChest = false;
            for (let v of Game.PlayerInstanceSystem.RelicChest) {
                if (PlayerDarkSystem.CanOpenByChestId(v.key)) {
                    canOpenChest = true;
                }
            }

            return bOpen && (canFight || canOpenChest);
        }

        private static tips_62_3(): boolean {
            let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.GROUPFIGHT);
            if (!bOpen) return false;

            let [useTime, _] = Table.FindR(Game.PlayerWantedSystem.wantedInfo.groupBattleTime, function (_k, _v) {
                return _k == 0;
            });

            if (useTime == null)
                useTime = 0;
            else
                useTime = useTime.value;

            let allTime = CommonConfig.group_battle_limit_times[0];
            if (useTime < allTime)
                return true;
        }

        private static tips_63_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_TWO].leftTime > 0
                && (Game.PlayerMissionSystem.NoviceCanReward(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO) || Game.PlayerMissionSystem.NoviceCanRewardEnd(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO));
            return cond;
        }

        private static tips_64_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_MAQI].leftTime > 0
                && (Game.PlayerMissionSystem.NoviceCanReward(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI) || Game.PlayerMissionSystem.NoviceCanRewardEnd(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI));

            return cond;
        }

        private static tips_65_1(): boolean {
            let cond = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_KUBI].leftTime > 0
                && (Game.PlayerMissionSystem.NoviceCanReward(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI) || Game.PlayerMissionSystem.NoviceCanRewardEnd(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI));

            return cond;
        }

        private static tips_66_1(): boolean {
            if (Game.PlayerMissionSystem.missionActive.missionWeekIndex == 0 || !PlayerMissionSystem.FunOpenTo(FUNC.MISSIONWEEK, false) || Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_WEEK].leftTime != 0) {
                return false;
            }
            let leftTime = Game.PlayerMissionSystem.missionActive.missionWeekStart + Game.PlayerMissionSystem.itemMissionWeek(Game.PlayerMissionSystem.missionActive.missionWeekIndex).duration * 3600 * 24 - Game.Controller.curServerTime;
            if (leftTime > 0) {
                let free = Game.PlayerMissionSystem.getWeekAwardPay(Game.PlayerMissionSystem.missionActive.missionWeekIndex, 1);
                return Game.PlayerMissionSystem.WeekMissionCanReward(Game.PlayerMissionSystem.itemMissionWeek(Game.PlayerMissionSystem.missionActive.missionWeekIndex).mission_types) || free[0].buyTimes < free[0].canBuyTimes;
            }
            return false;
        }

        private static tips_60_1(): boolean {
            let bGetCur = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, (k, v) => {
                return v == Game.PlayerInfoSystem.BaseInfo.vipLevel;
            })

            let have = Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal.length - 1 < Game.PlayerInfoSystem.BaseInfo.vipLevel;
            let cond = have  //(Player.lowVipLevel  and Tips.tips_LowVip_get(Player.lowVipLevelNum) and not bGetCur) or
            return cond
        }


        private static tips_67_1(): boolean {
            let maxTimes = CommonConfig.activity_instance_battle_time + Game.PlayerVIPSystem.vipInfo.buy_activity_time * CommonConfig.activity_instance_buy_battle_time_add;
            let restTimes = maxTimes - Game.PlayerVIPSystem.vipInfo.activity_time;
            if (otherdb.getActivityBattle().length != 0 && restTimes > 0) {
                return true;
            } else {
                return false;
            }
        }

        private static tips_67_2() {
            let transformTab = TableGeneralTransfer.Table();
            for (const kk in Game.PlayerHunterSystem.allHuntersMap()) {
                const vv = Game.PlayerHunterSystem.allHuntersMap()[kk];
                if (vv == null) {
                    console.log("未找到");
                    continue;
                }
                let baseGeneralInfo = PlayerHunterSystem.Table(vv.general_id);
                if (vv.general_id && transformTab[baseGeneralInfo.general_id] && vv.level >= transformTab[baseGeneralInfo.general_id].general_level && transformTab[baseGeneralInfo.general_id].general_add != 0 && vv.transfer_level < 1 && vv.star >= transformTab[baseGeneralInfo.general_id].general_star) {
                    let isEnough1 = false;
                    let isEnough2 = false;
                    for (let i = 0; i < 2; i++) {
                        let itemSetCount = PlayerItemSystem.Count(transformTab[baseGeneralInfo.general_id].consume_goods[i][0]);
                        let needCount = transformTab[baseGeneralInfo.general_id].consume_goods[i][1];
                        if (itemSetCount >= needCount) {
                            if (i == 0) {
                                isEnough1 = true;
                            } else {
                                isEnough2 = true;
                            }
                        }
                    }
                    if (isEnough1 && isEnough2) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * @description 通行证
         */
        public static tips_68_1() {
            let season = Math.floor((Set.TimeFormatBeijing().getMonth()) + 1);
            let tblInfo = TablePermitReward.Table();
            let rewardList = [];
            Table.Sort(tblInfo, function (a, b) { return a.level < b.level; });
            for (let [k, v] of HelpUtil.GetKV(tblInfo)) {
                if (v.season == season && v.level <= Game.PlayerInfoSystem.BaseInfo.level) rewardList.push(v);
            }
            let cond = false;
            if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && rewardList.length == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length && rewardList.length == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length) {
                cond = false;
            }
            else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && rewardList.length == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
                cond = false;
            }
            else {
                cond = true;
            }
        }

        public static tips_68_2() {
            let tbl = TablePermitMission.Table();
            let isGet = false;
            let cond = false;
            for (let [kk, vv] of HelpUtil.GetKV(tbl)) {
                isGet = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward, function (k, v) {
                    return v == kk;
                });

                if (vv.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet
                    || vv.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay == 1
                    || vv.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore >= vv.value) {
                    cond = true;
                    break;
                }
                else {
                    cond = false;
                }
            }
            return cond;
        }
    }

}