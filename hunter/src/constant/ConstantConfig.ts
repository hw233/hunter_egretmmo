namespace zj {

export class ConstantConfig_Common {
    public static HEART_BEAT_TIME = 120;
    public static PROGRESS_TIP_TIME = 0.99;
    public static LONG_TOUCH_TIME = 0.05;
    public static BLOCK_WIDTH = 80;
    public static WAR_PROGRESS_TIME = 2;
    public static Color = {
        //列表
        list_default: 0Xffffff,
        list_highlight: 0Xdca578,

        //EditBox
        input_default: 0X8c7864,
        input_result: 0X583520,

        input_default_dark: 0Xb4b4b4,
        input_result_dark: 0Xffffff,

        //聊天
        input_default_chat: 0Xa28974,
        input_result_chat: 0Xdccbb7,

        //信件
        letter_default: 0X818181,
        letter_result: 0X321405,
        letter_dark: 0X000000,
        //联盟
        league_scene_chat: 0X5a3012,

        //品质字体颜色
        quality_purple: 0Xff00ff,
        quality_blue: 0X00ffff,
        quality_green: 0Xbeff00,
        quality_gray: 0Xffffff,
        quality_orange: 0Xff8c14,
        quality_red: 0Xf12200,
        quality_gold: 0Xffff00,

        //数量字体颜色
        count_green: 0X24d700,
        count_white: 0Xffffff,
        count_red: 0Xf12200,

        //刻印颜色(已激活，下一个激活，未激活）
        carve_1: 0X411903,
        carve_2: 0Xff6701,
        carve_3: 0Xaf9682,

        ////// 以上是新的， 以下是旧的 ////-
        red: 0Xf12200,
        green: 0X00c800,
        blue: 0X25ddca,
        white: 0Xffffff,
        brown: 0X321405,
        black: 0X000000,
        yellow: 0Xffff00,
        Rank_MainItemTop3Color: 0Xfeffad,
        gray_color: 0X808080,

        // 品质
        white_color: 0Xd4e0ee,
        blue_color: 0X7afaff,
        purple_color: 0Xfe22ec,
        yellow_color: 0Xffff00,
        orange_color: 0Xff6400,

        //其他文字
        normal_color: 0Xd4e0ee,
        title_color: 0Xfeffad,
        highlight: 0Xffc000,
        fail_color: 0Xff411b,
        success_color: 0X19e344,

        //公会
        ublue_color: 0X48a2ff,

        //输入框与输入内容颜色
        holder_font_color: 0Xffffff,

        //主角名称
        leader_name_color: 0X84ff00,
        city_high_name_color: 0Xffcd21,

        //公会
        gold_color: 0Xebd076,
        // 品质索引
        quality_color: [
            0Xd4e0ee, // 白
            0X19e344, // 绿
            0X7afaff, // 蓝
            0Xfe22ec, // 紫
            0Xffff00, // 金
            0Xffff00, // 经验(用于经验剑魂)
        ],
        // 神兵名字颜色
        artifact_color: [
            0Xd4e0ee, // 白
            0Xd4e0ee, // 白
            0Xd4e0ee, // 白
            0Xd4e0ee, // 白
            0X19e344, // 绿
            0X19e344, // 绿
            0X19e344, // 绿
            0X7afaff, // 蓝
            0X7afaff, // 蓝
            0X7afaff, // 蓝
            0Xfe22ec, // 紫
            0Xfe22ec, // 紫
            0Xfe22ec, // 紫
            0Xffff00, // 金
            0Xffff00, // 金
            0Xffff00, // 金
        ],

        // 品质索引
        quality_level_color: [0Xffffff, // 白
            0X19e344, // 绿
            0X7afaff, // 蓝
            0Xfe22ec, // 紫
            0Xfe950d, // 橙
            0Xff0000, // 红
            0Xffff00, // 黄
        ],

        // 品质索引
        psy_quality_color: [
            0Xd4e0ee,
            0X19e344, // 绿
            0X7afaff, // 蓝
            0Xfe22ec, // 紫
            0Xfe950d, // 橙
            0Xff0000, // 红
        ],

        // 在线不在线
        online: 0X3cff00,
        offline: 0Xf12200,

        //连按时间

        //军师
        adviser_name: 0Xeaead2,

        // 联盟场景
        league_color: {
            leader_color: 0Xffffff,
            member_color: 0Xffffff,
            animal_color: {
                [1]: 0Xdcdcc8,          // 形态一
                [2]: 0Xdcdcc8,          // 形态二
                [3]: 0Xdcdcc8,          // 形态三
            },
            offical_color: {
                [1]: 0Xdcdcc8,          // 成员
                [2]: 0X00c800,              // 长老
                [3]: 0Xfe22ec,           // 盟主
            },
            high_name_color: 0Xffff00,  // 选中人或物 高亮色
        },

        // 联盟战斗
        league_war_color: {
            leader_color: 0xfbf39c,//0X00ff00,       // 联盟战主角颜色
            member_color: 0xcc00ff,//0Xffffff,     // 联盟战同盟角色颜色
            enemy_color: 0xf12200,       // 联盟战对方颜色
        },

        // 仙境颜色
        wonderland_color: {
            leader_color: 0xfbf39c,         // 主角和平模式下颜色
            memeber_color: 0xffffff,//0x00ff00,        // 其他玩家和平模式下颜色

            my_kill_color: 0xfbf39c,     // 主角战斗模式下颜色
            other_kill_color: 0xf12200,  // 别人自己是pk关系的颜色

            stroke: 0x1C1B1B     // 头顶名字描边
            //[[
            // my_evil_color : {
            //     [1] : 0X00ff00,
            //     [2] : 0Xeb3c2d,
            //     [3] : 0Xe3170d,
            //     [4] : 0X960000,
            // },
            // ]]

            //[[
            // evil_color : {
            //     [1] : 0Xffffff,
            //     [2] : 0Xeb3c2d,
            //     [3] : 0Xe3170d,
            //     [4] : 0X960000,
            // },
            // ]]                 

        },

        // 通用rpg颜色
        rpg_color: {
            league_title_color: 0x6be2fc//0Xffff00, // 通用联盟标题颜色
        },

        // 名次
        pk_older_color: [
            [0Xff0000, 1, 1], // 红
            [0Xfe950d, 2, 2], // 橙
            [0Xfe22ec, 3, 3], // 紫
            [0X006400, 4, 20], // 绿
            [0X000000, 21, 100], // 黑
        ],

        // 公会战排行榜颜色
        ub_rank_color: [
            0Xff0000, // 红
            0Xbf590e, // 橙
            0Xfe22ec, // 紫
            0X3ab2ff, // 蓝
        ]
    };
    public static add_interval = [0.4, 0.35, 0.3, 0.25, 0.12];
    public static fontSize = {
        Normal: 20,
        FONT_SIZE: 20,
        DETAIL_FONT_SIZE: 22,
        NAME_FONT_SIZE: 24,
        UNION_FONT_SIZE: 20,
        CITY_NAME_FONT_SIZE: 21,
        LEVEL_FONT_SIZE: 18,
        EDITBOX: 18,
        BUILD_OPEN_SIZE: 20,
        SCENE_TALK_SIZE: 18,
        RPG_SIZE: 16,
        ZORK_BOSS_SIZE: 22,
        FIGHT_CHAT: 20,
    };
    public static actionTime = {
        loginCreateRole: 0.2,
        messageStay: 1,
        rewardDelayUnit: 0.1,
        rewardItemStay: 1,
        rewardItemAppear: 0.5,
        rewardItemUnit: 0.3,
        rewardItemDisappear: 0.2,
        basicInfoScale: 0.15,
        commonRoleDetail: 0.2,
        mainMenu: 0.15,
        addNewUI: 0.3,
        newUIStay: 2,
        effectSpeed: 1 / 30,
        upgradeTotal: 3,
        upgradeTobig: 0.2,
        upgradeTonormal: 0.1,
        upgradeTime: 2,
        swordScaleTime: 0.1,
        swordDelayTime: 0.2,
        annouceTime: 5,
    };
    public static scaleSize = {
        origin: 1,
        basicInfo: 1.5,
        buttonEffect: 0.55,
        upGrade: 1.5,
        upGradeSmall: 0.9
    };
    public static numNeedChangeMenu = 1000000;
    public static numNeedChange = 10000000;
    public static numChangeBse = 10000;
    public static MaxHitSoundEffect = 1;// 每帧最大命中音效播放数量
    public static MySteriousVipOpenLevel = 5;// 神秘商城开启临界值

    public static ShadowOpacity = 175;
    public static ShadowOpacityLight = 100;
}

export class ConstantConfig_Label {
    public static r = 150;
    public static g = 150;
    public static b = 150;
    public static shadowColor = 0X96000000;
    public static shadowSize = { width: 1, height: -1 };
    public static labelSpace = 1;
    public static lineHeight = 5;
    public static labelSpace_bmfont = 2;
    public static lineHeight_bmfont = 5;
}

export const ConstantConfig_XSockServer = {
    UNKNOWN: 0,// 未知事件
    DISCONNECTED: 1, // 网络断开(无消息)
    MESSAGE: 2, // 收到消息(回复消息或通知消息)
    TIMEOUT: 3, // 接收回复超时(请求消息的副本)
    FIGHT_DISCONNECTED: 4 // 从战斗服断开
}

export const ConstantConfig_Teach = {
    Tag: {
        SpxHand: 1,
        LayerUp: 2,
        LayerLeft: 3,
        LayerRight: 4,
        LayerDown: 5,
        LayerMid: 6,
        Dialog: 7,
    },
    Teach_Operate_Unkown: -1,
    Teach_Operate_Left_Part_Right: 1,//屏幕左边右滑
    Teach_Operate_Left_Part_Left: 2,//屏幕左边左滑
    Teach_Operate_Right_Part_Click: 3,//屏幕右边点击
    Teach_Operate_Right_Part_Right: 4,//屏幕右边右滑
    Teach_Operate_Right_Part_Left: 5,//屏幕右边左滑
    Teach_Operate_Right_Part_Up: 6,//屏幕右边上滑
    Teach_Operate_Right_Part_Down: 7,//屏幕右边下滑
    Teach_Operate_Left_Double_Click: 8,//屏幕左边双击

    SupportHP: 0.45,
    LayerOpacity: 140,
    SkillDelay2: 0,
    SkillDelay3: 0,
    HeroMain: 5,

    RageDelay2: 0,
    RageDelay3: 0,
}

export const ConstantConfig_Tip = {
    cellHeight: 40,
    cellHeight2: 80,
    ofset_x: 100,
    ofset_x_dt: 10,
    stayTime: 0.5,
    actTime: 0.3,
    formatLevel: 31,

    scrollTime: 0.15,
    scrollStay: 0.5,
}

export class ConstantConfig_CommonReward {
    public static maxItemPerScreen = 5;
    public static defaultMaxY = 425;
    public static defaultMinY = 145;
    public static defaultIndex = 1;
    public static defaultX = 0;
    public static itemY = 70;
    public static startOffY = 210;
    public static judgeLastY = 120;
    public static resourceScale = 1.2;
    public static color = {
        titleSuccess: 0X19e344,
        titleFail: 0Xe1411b,
        nameResource: 0Xfeffad,
        count: 0Xffc000,
        // name，使用上面的quality_color
    };
    public static rewardItemStay = 30;
    public static rewardItemUnit = 10;
    public static rewardItemDisappear = 10;
}

export const ConstantConfig_CommonTool = {
    fightFactor: [1, 4, 3, 5, 4, 15, 15, 15, 15, 15, 15]// 战力系数
}

export class ConstantConfig_CommonBattle {
    public static MOB_NAME_FONT_SIZE = 20;
    public static MOB_NAME_Y_OFFSET = 40;
    public static GUIDE_Y_OFFSET = 5;

    public static BUFF_HP_DIS_OFFSETY = 8 + 5;

    public static blood_board = {
        w: 82,
        h: 12,
    };

    // 正常伤害数字
    public static shanghainum1 = {
        w: 18,
        h: 24,
        offset: 0,
        randTbl: {
            min: 0.6,
            max: 1,
        },
    };

    // 暴击数字
    public static baojinum = {
        w: 18,
        h: 24,
        offset: 0,
        randTbl: {
            min: 0.6,
            max: 1,
        },
    };

    //[[
    // shanghainum1: {
    //     w: 18,
    //     h: 24,
    // },
    // ]]

    // 绿色加血数字
    public static shanghainum2 = {
        w: 18,
        h: 24,
        offset: 0,
        randTbl: {
            min: 0.6,
            max: 1,
        },
    };

    public static shanghainum3 = {
        w: 18,
        h: 24,
        offset: 0,
        randTbl: {
            min: 0.6,
            max: 1,
        },
    };

    public static combonum = {
        w: 40,
        h: 50,
    };

    public static nuqinum1 = {
        w: 22,
        h: 33,
        offset: 0,
    };

    public static nuqinum2 = {
        w: 22,
        h: 33,
        offset: 0,
    };

    public static color = {
        ice_color: 0X3392ff,
        rain_color: 0Xa61ee0,
        blood_color: 0Xf53315,
    };

    public static yaoganPonit = {
        x: 170,
        y: 170,
        rad: 83,
    };

    public static dcOffsetPos = {
        x: 0,
        y: -20,
    };

    public static dcBuffOffsetPos = {
        x: 21,
        y: 0,
    }
}

export class ConstantConfig_Rpg {
    public static EVENT_VALID_CIRCLE_RAD = 300;//226,
    public static COMMON_LED_OFFSET_Y = 25;
    public static Color = {
        button_speed: 0Xfafafa,    // 白
        button_blood: 0Xfafafa,    // 白
    }
    public static PetMove = {
        AX: 0.001,         // x轴加速度 
        AY: 0.001,         // y轴加速度
        VX: 0.005,         // x轴初始速度
        VY: 0.005,         // y轴初始速度
        CONTINUE_TIME: 1000,   // 加速持续
    }
}

export const ConstantConfig_LeagueWar = {
    // 准备区
    prepare_range: {
        left_rt: { x: 0, y: 0, width: 960 - 320, height: 1200 },
        right_rt: { x: 3440 + 320, y: 0, width: 960 - 320, height: 1200 },
    },
}

export class ConstantConfig_Wonderland {
    // 树品质颜色
    public static tree_quality_color = [
        0Xd4e0ee,    // 白
        0X19e344,      // 绿
        0X7afaff,    // 蓝
        0Xfe22ec,     // 紫
        0Xffff00,      // 金
    ];

    public static TREE_DES_NAME_OFFSET_Y = 2;             // 详情和名称之间纵向偏移

    public static warter_range = {
        [1]: { x: 0, y: 0, width: 3520, height: 640 },
        [2]: { x: 0, y: 560, width: 2880, height: 160 },
        [3]: { x: 2880, y: 560, width: 320, height: 80 },
        [4]: { x: 240, y: 720, width: 560, height: 80 },
        [5]: { x: 800, y: 800, width: 1600, height: 160 },
        [6]: { x: 2400, y: 800, width: 240, height: 80 },
        [7]: { x: 1040, y: 960, width: 480, height: 80 },
        [8]: { x: 1520, y: 960, width: 560, height: 120 },
        [9]: { x: 2080, y: 960, width: 240, height: 80 },
        [10]: { x: 3440, y: 560, width: 80, height: 80 },
    };
}

export const ConstantConfig_Particle = {
    D: 9899,
    A: 1.2,
    F: 437.5,
    E: 6601,
    G: 8,
}

export const ConstantConfig_LeagueHome = {
    CITY_SAFE_ROLE_DISTANCE_MAX: 500,      // 靠近人物距离x
    CITY_SAFE_ROLE_DISTANCE_MAX_Y: 100,    // 靠近人物距离y

    TITLE_NAME_X_OFFSET: 5,                // 名称和官职 整体偏移x 
    OFFICAL_NAME_X_OFFSET: 10,             // 官职名字和人物名字间隙

    LV_NAME_X_OFFSET: 5,                   // 等级和人物名字间隙
    //FLAG_NAME_X_OFFSET : 45,                // 旗子和联盟名称间隙 to delete

    BLOOD_NAME_Y_OFFSET: 2,                // 血条与姓名纵向位移y
    NAME_LEAGUE_Y_OFFSET: 2,               // 姓名与联盟纵向位移y
    LEAGUE_PROGRESS_Y_OFFSET: 2,           // 联盟与进度条纵向位移
    PROGRESS_BAR_BOARD_X_OFFSET: 4,        // 进度条与底板偏移量

    //CHAT_BOARD_OPACITY : 0.7,               // 聊天面板透明度
    //CHAT_BOARD_SCALE : 0.8,                 // 聊天面板缩放比例

    CHAT_BOARD_OFFSET_X: 50,              // 聊天面板校对坐标x
    CHAT_BOARD_OFFSET_Y: 10,              // 聊天面板校对坐标y

    CHAT_BOARD_OFFSET_W: 22,
    CHAT_BOARD_OFFSET_H: 22,
    CHAT_BOARD_OFFSET_SPACE: 30,
    CHAT_ADDITIONAL_KERNING: 1.5,

    LEAGUE_CHAT_STAY_TIME: 5000,           // 联盟聊天文本存活时间(5秒到2*5秒)
    LEAGUE_ANIMAL_RAND_TALK_MAX_TIME: 5000,// 动物随机说话存活时间(5秒到2*5秒)
    LEAGUE_NOTICE_STAY_TIME: 15000,        // 第一次进联盟公告停留时间
    LEAGUE_NOTICE_STAY_MAX_TIME: 5000,     // 点击联盟公告停留时间(5秒到2*5秒)
    LEAGUE_TITLE_FRESH_MAX_FRAME: 5000,    // 刷新频率
}

export const ConstantConfig_RoleBattle = {
    PI: 3.1415926,
    //DEFAULTFPS: 30,
    GRAVITY: 0.0007,
    LEADER_JUMP_SPEED: 0.62,			//跳跃初始速度
    STIR_UP_AGAIN_SPEED: 0.24,			//2次挑起速度
    SPRINT_FAREST: 40000,				//冲刺最大距离
    SPRINT_SHORTEST: 170,				//冲刺最短距离
    SPRINT_SPEED: 0.6,					//冲刺速度
    HIT_DOWN_SPEED: 0.4,				//击倒向下的速度
    SPRINT_JUMP_MOVE_SPEED: 0.5,		//冲刺跳起的移动速度
    HIT_BODY_STOP_TIME: 100,				//攻击打到人停顿时间
    EFFECT_HIT_BODY_STOP_TIME: 100,		//特效打到人停顿时间
    NORMAL_SPX_SPEED: 100,				//一般人物spx的播放速度
    SHUIJING_SPX_SPEED: 150,			//水晶spx的播放速度
    STUN_SPX_SPEED: 100,				//眩晕特效播放速度
    TOUCH_EFFECT_SPX_SPEED: 40,		//触摸特效播放速度

    NORMAL_ROLE_GET_UP_TIMES: 300,		//一般人物起身无敌时间
    ROLE_RESAFE_GET_UP_TIMES: 1000,	//安全起身无敌时间
    ROLE_BOSS_RESAFE_TIMES: 10000,		// 世界boss复活无敌时间

    STIR_UP_RATIO_SML: 0.3,			// 模型挑起系数
    STIR_UP_RATIO_BIG: 0.7,			// 模型挑起系数
    STIR_UP_RATIO_SPEC: 0.1,           // 特殊挑起系数

    STIR_UP_AGAIN_SPEED_MAX: 0.3,
    STIR_UP_AGAIN_RATIO: 0.3,

    SPRINT_PRIORITY: 4,				// 冲刺优先级

    MOVE_DIS_OFFSET_LEADER: 0,
    //MOVE_DIS_OFFSET_LEADER : 60,
    VER_DIS_OFFSET_LEADER: 0,
    MOVE_DIS_OFFSET_MONSTER: 30,
    JUMP_DIS_OFFSET_LEADER: 213,

    TOUCH_ERROR_LIMIT: 0,				// 触摸点误差
    TOUCH_MOVE_LIMIT: 50,				// 触摸移动误差

    TOUCH_INIT_LEFT_POINT: 160,		// 人物朝左初始触摸点
    TOUCH_INIT_RIGHT_POINT: 160,		// 人物朝右初始触摸点
    TOUCH_INIT_POINT: 160,				// 触摸初始判断左右的点
    TOUCH_MOVE_RANGE: 400,				// 触摸移动范围
    ROOM_BLOCK_WIDTH_HALF: 0,

    MOVE_TARGET_LIMIT_X: 20,
    MOVE_TARGET_LIMIT_Y: 20,

    TOUCH_INIT_POSY: 200,
    TOUCH_OFFSET_Y: 20,

    STAND_MAX_TIME: 10000,
    NEGATIVE_INFINITY: -100,
    POSITIVE_INFINITY: 100,

    COMMON_DEAD_STIRUPSPEED: 0.5,
    COMMON_DEAD_STIRXSPEED: 0.1,

    SPECIAL_DEAD_STIRUPSPEED: 0.5,
    SPECIAL_DEAD_STIRXSPEED: 0.1,

    PET_MOVE_SPEED: 0.25,
    PET_DISTANCE: 70, // 70
    PET_PETY: 282,

    TOUCH_MOVE_M: 20,
    TOUCH_MOVE_N: 10,

    COMBO_TIME: 1500,
    COMBO_SPC_FRAME: 300,

    BLOOD_SPEED: 60,
    RESET_DEAD_HP: 10,

    DOOR_SHIFT: 200,

    DEFAULTFPS: 60,
    SLOWFPS: 3,
    DIE_MAX_FRAME: 1.7,


    // extra
    BODY_ACTION_CUT: 25,
    NO_HURT_MAX_MS: 1000,
    NO_HURT_DIFFER: 10,

    DYING_SHOW_PERCENT: 0.3,
    HELP_MAX_NUMBER: 1,        // 正常援助次数
    OPP_HELP_MAX_NUMBER: 1,    // 对方援助次数
    HELP_BASTILLE_MAX_NUMBER: 1,// 伏牛寨援助次数
    HELP_WANTED_MAX_NUMBER: 1, // 伏牛寨援助次数 
    GENERAL_HELP_MAX_CD: 8000, // 援助最大CD (5秒钟)
    OPP_GENERAL_HELP_MAX_CD: 8000, // 对方援助最大CD

    VERTICAL_BEGIN_DIS: 315,   // 纵向位移起始点
    VERTICAL_BREAK_Y: 260,     // 阻塞中断点
    VERTICAL_END_MAX: 210,     // 挑起最高位移
    VERTICAL_BREAK_V0: 0,  // 阻塞初始速度
    VERTICAL_BREAK_A: 0,  // 阻塞加速度

    BREAK_MOVE_TIME: 0.08,     // 打断闪现回去时间
    DANDAN_CHIP_PERCENT: 0.2,  // 蛋蛋形态破碎百分比
    COMBO_PIC_MAX_NUM: 6,      // 连击图片次数
    COMBO_DIS_X: 120,          // 连斩距离屏幕右边的像素
    HELP_FLOOR_DIS_Y: 165,           // 援护距离地板像素

    TEACH_FLOAT_CUT_VALUE_MIN: 230, // 教学浮空临界值1
    TEACH_FLOAT_CUT_VALUE_MAX: 260, // 教学浮空临界值2

    RUN_SOUND_FPS_MAX: 10,      // 跑步声音播放间隔帧数
    OPEN_AUTO_LIMIT: 6,       // 开启自动战斗等级
    AI_CD_TIME: 3000,          // cd间隔时间
    CONTEND_CD_TIME: 90,    // 联赛一局时间
    SINGLE_CD_TIME: 90,         // 跨服一局时间
    PVP_CD_TIME: 180000,      // PVP时间
    //MINE_CD_TIME : 180000,      // 抢矿时间
    HIGHT_LIGHT_MAX_TIME: 6000, // 高亮最长时间
    SKI_PAUSE_TIME: 1000,      // 技能黑屏暂停时间
    SKI_SUPPORT_PAUSE_TIME: 2000, // 援护技能黑屏暂停时间

    BOSS_BODY_SCALE_RADIO: 1.3, // boss放大系数
    TALENT_ANI_DELAY_TIME: 300, // 延迟时间

    PVP_HURT_RATIO: 1.0,        // pvp伤害系数
    PVE_HURT_RATIO: 1.0,        // pve伤害系数

    CALL_ROLE_ATTRIB_RATIO: 0.2,// 召唤怪的继承系数
    //REVIVE_SUPER_TIME : 5000,    // 复活无敌时间

    AI_RECOVER_SINGLE_POINT: 60,  // 单体血量低于x时回复
    AI_RECOVER_ALL_POINT: 75,     // 全体血量低于x时回复 
    AI_HELP_RECOVER_POINT: 75,    // 援护全体血量低于x时回复

    //RESERVE_SUPER_TIME : 3000,   // 替补上场基础无敌时间
    RESERVE_ADD_RAGE: 80,       // 替补上场增加怒气

    FIGHT_SCENE_SHOW_MAX_NUM: 2,  // 展现最大次数
    FIGHT_SCENE_DIE_STAY_MS: 25,  // 死后多长时间进复活区(300)
    FASTER_SPEED_PROMOTE_PERCENT: 1.5, // 急速提升速度倍数
    CONTROL_BUILD_MAX_TIME: 5000, // 控制建筑的最大时间
    OVERLAP_SELECT_MAX_NUM: 6,    // 重叠块最大选择人数
    VERTICAL_SPLIT_SCREEN: 3,     // 纵向分屏（主角位于纵向1/3屏)
    COLLECT_GRASS_MAX_TIME: 5000, // 采集的最大时间
    SYNC_POS_MAX_TIME: 10000,     // 如果玩家在待机过程中每隔x秒发移动协议 
    MOVE_NET_MAX_TIME: 500,       // touch move发送协议最大间隔 
    BOSS_SYNC_MAX_TIME: 500,      // boss战中每隔x毫秒发移动协议s 
    FIGHT_AUTO_SPEED_LIMIT: [1, 1, 15],// 战斗托管速度等级限制
    BATTLE_AUTO_SPEED: [1.0, 1.2, 1.4],    // 自动战斗速度值
    BATTLE_AUTO_SPEED_UI: [1.0, 5.0, 10.0],
    DODGE_REDUCE_HURT: 0,     // 格挡减少伤害
    IGNORE_DEF_PER: 50,        // 忽视%N的防御

    FLASH_DIS_IGNORE_X: 30,    // 闪现开始计算时横向忽略位移
    FLASH_DIS_IGNORE_Y: 30,    // 闪现开始计算时纵向忽略位移

    FLASH_DIS_OFFSET_X: 50,
    FLASH_DIS_OFFSET_Y: 0,

    RAGE_GET_VALUE: {          // 怒气获得
        // 1/普通攻击
        // 2/技能攻击
        // 3/最后一击
        // 4/回血增加
        pve: [0, 10, 30, 40, 5],
        pvp: [0, 10, 30, 40, 8],
    },
    FIGHT_HP_ANIM_TIME: 1000, // 战斗hp动画时间总时间
    FIGHT_HP_ANIM_STEP: 60,   // 战斗hp动画多长时间改变一次（ms）
    FIGHT_HP_ANIM_VALUE: 3,  // 超过血量的百分之x改变

    FIGHT_CD_ANIM_TIME: 250, // 战斗cd动画时间总时间
    FIGHT_CD_ANIM_STEP: 30,   // 战斗cd动画多长时间改变一次（ms）
    FIGHT_CD_ANIM_VALUE: 5,  // 超过cd的百分之x改变

    CONTINUE_BATTLE_MAX_NUM: 10, // 连续战斗最大次数
    CONTINUE_BATTLE_MAX_NUM_TEST: 99, // 测试模式下连续战斗最大
    BATTLE_SETTLE_RECONNECT_TIME: 40, // 结算重连时间

    formulaP1: 1.0,
    FIGHT_TEST_STAGE_TIME: 60000
}

export const ConstantConfig_BattleTbl = {
    FIGHT_AUTO_SPEED_LIMIT: [1, 1, 15],// 战斗托管速度等级限制
    FIGHT_AUTO_SPEED_LIMIT_VIP: [0, 0, 1],// 战斗托管速度VIP限制
    BATTLE_AUTO_SPEED: [0, 1.2, 1.6, 2],    // 自动战斗速度值//[0,1.0, 1.21, 1.4],
    BATTLE_AUTO_SPEED_UI: [0, 1.0, 5.0, 10.0]
}

// 登陆
export class ConstantConfig_Login {
    public static nameLengthMax = 12;
    public static fontSize = 20;
    public static fontLengthMail = 30;
    public static fontLengthPwd = 10;
    public static editSize = { width: 359, height: 34 };
    public static pwdMin = 6;
    public static pwdMax = 10;
}

// 战斗结算
export const ConstantConfig_BattleSettle = {
    // 副本战斗结算
    generalComeTime: 1.056,
    generalInfoComeTime: 0.15,
    generalInfoFadeTime: 400,
    generalExpComeTime: 0.35,
    getInfoComeTime: 1.75,
    getInfoFadeTime: 0.25,
    buttonFadeTime: 500,
    dropInfoComeTime: 1.5,
    dropInfoFadeTime: 0.25,
    continueBattleSettleTime: 2.5,
    continueBattleNextTime: 3.5,

    expPipeTick: 50,
    hurtPipeTick: 50,

    expPipeTime: 700,
    hurtPipeTime: 700,

    loseGeneralComeTime: 800,
    loseCasueBoardComeTime: 800,
    loseCauseBoardFadeBoardTime: 500,
    loseCauseBoardFadeDialogTime: 1000,
    loseCauseBoardFadeIconTime: 750,
    loseCauseBoardFadeWordTime: 750,
    loseCauseBoardFadeButtonTime: 750,


    // 竞技场战斗结算
    rankComeTime: 1.75,
    rankFadeTime: 1.0,

    // 爬塔战斗结算
    towerTipComeTime: 1.75,
    towerTipFadeTime: 1.0,

    // 经验或游戏币结算
    bastilleTipComeTime: 1.75,
    bastilleTipFadeTime: 1.0,
}

export const ConstantConfig_Maincity = {

    open_time: 0.3,
    close_time: 0.21,
}

// 角色
export const ConstantConfig_Role = {

    ui_close_call: 0.4,
    ui_upgrade_item: 4,    //经验丹数量
}

// 系统设置
export const ConstantConfig_System = {

    [1]: {
        [1]: true, //音乐设置
        [2]: true, //音效设置
        [5]: true, //查看详情设置
    },

    [2]: {
        [1]: true, //体力提醒
        [2]: true, //领体力提醒
        [3]: true, //活动开启提醒
        [4]: true, //挖矿结束提醒
        [5]: true, //被邀护矿提醒
        [6]: true, //矿洞被抢提醒
    },
}

// 地图
export const ConstantConfig_Map = {
    moveDistancePer: 1,
}


// 抢矿
export const ConstantConfig_Mine = {
    aniMine: {
        [1]: 69,
        [2]: 71,
        [3]: 73,
        [4]: 75,
    }
}

// 聊天
export class ConstantConfig_Chat {
    public static lengthMax = 76;
    public static openLevel = 15;
    // public static titleColor = [
    //     0Xff411b,
    //     0X7afaff,
    //     0X48a2ff,
    //     0Xfe22ec,
    //     0Xffc000,
    //     0Xffffff
    // ];
    public static titleColor = [
        [255, 65, 27],
        [122, 250, 255],
        [72, 162, 255],
        [254, 34, 236],
        [255, 192, 0],
        [255, 255, 255],
    ];
    public static nameColor = 0Xd4e0ee;
    // public static contentColor = [
    //     0Xffffff,
    //     0X00a8ff,
    //     0X32ff32,
    //     0Xfe22ec,
    //     0Xefc938,
    //     0Xffffff,
    //     0Xffffff,
    //     0Xffffff,
    //     0Xffffff
    // ];
    public static contentColor = [
        // [255, 255, 255],
        [102, 123, 133],
        [0, 168, 255],
        [50, 255, 50],
        [254, 34, 236],
        [239, 201, 56],
        // [255, 255, 255],
        [102, 123, 133],
        // [255, 255, 255],
        [102, 123, 133],
        // [255, 255, 255],
        [102, 123, 133],
        // [255, 255, 255],
        [102, 123, 133],
    ];
    public static typeLua = {
        world: 1,
        server: 2,
        league: 3,
        whisper: 4,
    };
}

// 公告滚动
export class ConstantConfig_ScrollTip {
    public static bgRect = { x: 1, y: 1, w: 10, h: 10 };
    public static tipFontSize = 26;
    public static tipMoveSpeed = 4;
    public static tipSize = { width: 700, height: 40 };
    public static tipPosition = { width: 480, height: 380 };
}

//列表子项大小
export class ConstantConfig_ListContent {

    public static hero_head = { width: 120, height: 150 };      //英雄头像子项
    public static hero_skill = { width: 250, height: 100 };     //英雄技能子项
    public static hero_Talent = { width: 250, height: 100 };   //英雄天赋子项
    public static hero_detailAttr = { width: 200, height: 25 }; //英雄详情文本
    public static hero_fateItem = { width: 40, height: 40 };    //英雄缘分头像
    public static hero_fate = { width: 300, height: 25 };       //英雄缘分子项
    public static hero_drop = { width: 300, height: 90 };       //英雄掉落副本子项
    public static worship_compose = { width: 117, height: 130 };//天赋合成子项
    public static worship_handbook = { width: 117, height: 130 };//天赋图鉴子项
    public static worship_resolve = { width: 130, height: 130 };//天赋分解子项
    public static talent_learn = { width: 110, height: 130 };  //天赋学习子项
    public static talent_upgrade = { width: 115, height: 130 }; //天赋升级子项
    public static package_item = { width: 115, height: 115 };   //背包子项
    public static mall_arena = { width: 265, height: 150 };     //天梯商铺子项
    public static mall_league = { width: 265, height: 155 };   //帮会商铺子项
    public static mall_main = { width: 265, height: 150 };     //普通商铺子项
    public static mall_worship = { width: 265, height: 150 };   //天宫商铺子项
    public static mall_tavern = { width: 265, height: 155 };    //酒馆商铺子项
    public static mall_wanted = { width: 265, height: 155 };    //通缉商铺子项
    public static daily_achieve = { width: 690, height: 110 };  //成就子项
    public static daily_live = { width: 690, height: 110 };     //日常子项
    public static daily_task = { width: 690, height: 200 };     //任务子项
    public static money_item = { width: 440, height: 60 };      //点金子项
    public static rank_type = { width: 160, height: 70 };      //排行类型
    public static rank_item = { width: 500, height: 110 };      //排行子项
    public static vip_charge = { width: 320, height: 160 };     //充值子项
    public static vip_page = { width: 520, height: 300 };       //会员文本
    public static vip_item = { width: 520, height: 30 };        //会员文本子项
    public static chat_item = { width: 800, height: 100 };       //聊天子项
    public static sign_item = { width: 116, height: 145 };     //签到子项
    public static mail_item = { width: 620, height: 100 };      //邮件子项
    public static equip_item = { width: 120, height: 120 };     //装备列表
    public static forge_item = { width: 100, height: 100 };      //锻造材料
    public static carve_item = { width: 80, height: 100 };      //刻印材料
    public static carve_page = { width: 230, height: 230 };     //刻印属性
    public static activity_server = { width: 490, height: 120 };//活动 每日 子项
    public static daily_award = { width: 110, height: 60 };     //成就 奖励 子项
    public static tower_item = { width: 450, height: 110 };     //爬塔 子项
    public static forFate_item = { width: 475, height: 135 };   //阵型武将组合 子项
    public static forFate_heroItem = { width: 50, height: 50 };   //阵型武将组合 武将子项
    public static package_type = { width: 160, height: 65 };    //背包类型
    public static daily_reward = { width: 110, height: 60 };    //任务奖励
    public static player_hero = { width: 126, height: 120 };     //玩家详情武将子项
    public static player_equip = { width: 115, height: 120 };    //玩家详情装备子项
    public static player_talent = { width: 190, height: 100 };  //玩家详情天赋子项
    public static player_adviser = { width: 255, height: 400 }; //玩家详情军师子项
    public static sell_item = { width: 130, height: 150 };      //一件卖出子项
    public static wanted_item = { width: 250, height: 500 };   //通缉令开始子项
    public static wanted_chat = { width: 240, height: 50 };    //通缉令获得子项
    public static wanted_hero = { width: 70, height: 70 };     //通缉令英雄子项
    public static first_charge = { width: 100, height: 100 };   //首冲子项
    public static pakage_item = { width: 162, height: 200 };     //礼盒子项
    public static award_gift = { width: 420, height: 100 };      //会员礼包子项
    public static award_fund = { width: 495, height: 100 };      //成长基金子项
    public static adviser_level = { width: 110, height: 30 };       //军师等级属性列表
    public static activity_uplevelpop = { width: 220, height: 40 }; //冲级活动详情列表
    public static activity_uplevel = { width: 200, height: 75 };    //冲级活动
    public static activity_vip = { width: 490, height: 100 };       //vip活动
    public static activity_top = { width: 490, height: 120 };      //累计充值
    public static activity_consumption = { width: 450, height: 130 };       //累计消耗
    public static activity_exchange = { width: 490, height: 113 };       //累计消耗
    public static league_feedanimal = { width: 100, height: 100 };       //杂事投喂界面子项
    public static novice_tag = { width: 105, height: 80 };       //新手嘉年华
    public static novice_item = { width: 200, height: 250 };      //新手嘉年华
}

// 爬塔、精英通关送武将
export const ConstantConfig_WinPop = {
    eliteStart: 200001,
    elite: 200024,
    tower: 30,
    elite_general: 10013,
    tower_general: 10020,
}

export const ConstantConfig_OpenVisit = {
    icon: "ccbResources/item_icon/BoxChoose_SoulA.png",
    logo: "ccbResources/common_ui/Activity/IconSoHot.png",
}

export const ConstantConfig_UI_Config = {
    //排行类型
    RANK_TYPE: [
        message.ERankType.RANK_TYPE_LEVEL,
        message.ERankType.RANK_TYPE_LEAGUE,
        message.ERankType.RANK_TYPE_LADDER,
        message.ERankType.RANK_TYPE_TOWER,
        message.ERankType.RANK_TYPE_HIGH_TOWER
    ]

    // RANK_TYPE: {
    //     [1]: "全队战力：",
    //     [2]: "最高三人战力：",
    //     [3]: "最高六人战力：",
    //     [4]: "最多钻石：",
    //     [5]: "最多充值额度：",
    //     [6]: "最多金币：",
    //     [7]: "最多断章：",
    //     [8]: "最多银钥匙：",
    //     [9]: "最多金钥匙：",
    //     [10]: "最高天梯积分：",
    //     [11]: "最多体力：",
    //     [12]: "最多晶魂：",
    //     [13]: "最多真气：",
    //     [14]: "防守战力：",
    //     [15]: "公会等级：",
    //     [16]: "最高层数：",
    //     [17]: "最高连斩数：",
    //     [18]: "最大累计伤害：",
    //     [19]: "世界boss最高：",
    //     [20]: "公会boss最高：",
    //     [21]: "抽奖积分：",
    //     [22]: "群英争霸积分：",
    //     [23]: "队伍等级：",
    // }
}

// 魔域boss
export const ConstantConfig_ZorkBoss = {
    boss_attack_outer_radius: 300, // 可攻击魔域boss半径
    boss_attack_delay_atk: 1000,   // 延迟等待时间（ms)

    circle_outer_init_x: 280,
    cricle_outer_final_x: 483,
    cricle_outer_appear_time: 0.5,

    career_atk_dis: {
        [1]: { min: 50, max: 120 }, // 猛将
        [2]: { min: 200, max: 300 },  // 法师
        [3]: { min: 200, max: 300 },  //刺客
        [4]: { min: 200, max: 300 }  // 弓箭手

    }

}

// 卡片
export class ConstantConfig_Card {

    // 品质索引
    public static start_color = [0Xffff00ff, 0Xff00e300, 0X962800ff, 0X22fe00ff, 0X95fe00ff, 0X00ff00ff];

    // 品质索引
    public static end_color = [0Xffff00ff, 0Xff00e300, 0X962800ff, 0X22fe00ff, 0X95fe00ff, 0X00ff00ff]
}

export class TableEnumLayerId {
    public static LAYER_NONE = 0;
    public static LAYER_LOGIN = 1;
    public static LAYER_CITY = 2;
    public static LAYER_FIGHT = 3;
    public static LAYER_LEAGUE = 4;
    public static LAYER_LEAGUE_FIGHT = 5;
    public static LAYER_WONDERLAND = 6;
    public static LAYER_ZORKBOSS = 7;
    public static LAYER_ZORK = 8;
    public static LAYER_DARKLAND = 9;
    public static LAYER_MAX = 10;
}
}