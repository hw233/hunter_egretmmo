var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var ConstantConfig_Common = (function () {
        function ConstantConfig_Common() {
        }
        ConstantConfig_Common.HEART_BEAT_TIME = 120;
        ConstantConfig_Common.PROGRESS_TIP_TIME = 0.99;
        ConstantConfig_Common.LONG_TOUCH_TIME = 0.05;
        ConstantConfig_Common.BLOCK_WIDTH = 80;
        ConstantConfig_Common.WAR_PROGRESS_TIME = 2;
        ConstantConfig_Common.Color = {
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
                0Xd4e0ee,
                0X19e344,
                0X7afaff,
                0Xfe22ec,
                0Xffff00,
                0Xffff00,
            ],
            // 神兵名字颜色
            artifact_color: [
                0Xd4e0ee,
                0Xd4e0ee,
                0Xd4e0ee,
                0Xd4e0ee,
                0X19e344,
                0X19e344,
                0X19e344,
                0X7afaff,
                0X7afaff,
                0X7afaff,
                0Xfe22ec,
                0Xfe22ec,
                0Xfe22ec,
                0Xffff00,
                0Xffff00,
                0Xffff00,
            ],
            // 品质索引
            quality_level_color: [0Xffffff,
                0X19e344,
                0X7afaff,
                0Xfe22ec,
                0Xfe950d,
                0Xff0000,
                0Xffff00,
            ],
            // 品质索引
            psy_quality_color: [
                0Xd4e0ee,
                0X19e344,
                0X7afaff,
                0Xfe22ec,
                0Xfe950d,
                0Xff0000,
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
                animal_color: (_a = {},
                    _a[1] = 0Xdcdcc8,
                    _a[2] = 0Xdcdcc8,
                    _a[3] = 0Xdcdcc8,
                    _a),
                offical_color: (_b = {},
                    _b[1] = 0Xdcdcc8,
                    _b[2] = 0X00c800,
                    _b[3] = 0Xfe22ec,
                    _b),
                high_name_color: 0Xffff00,
            },
            // 联盟战斗
            league_war_color: {
                leader_color: 0xfbf39c,
                member_color: 0xcc00ff,
                enemy_color: 0xf12200,
            },
            // 仙境颜色
            wonderland_color: {
                leader_color: 0xfbf39c,
                memeber_color: 0xffffff,
                my_kill_color: 0xfbf39c,
                other_kill_color: 0xf12200,
                stroke: 0x1C1B1B // 头顶名字描边
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
                league_title_color: 0x6be2fc //0Xffff00, // 通用联盟标题颜色
            },
            // 名次
            pk_older_color: [
                [0Xff0000, 1, 1],
                [0Xfe950d, 2, 2],
                [0Xfe22ec, 3, 3],
                [0X006400, 4, 20],
                [0X000000, 21, 100],
            ],
            // 公会战排行榜颜色
            ub_rank_color: [
                0Xff0000,
                0Xbf590e,
                0Xfe22ec,
                0X3ab2ff,
            ]
        };
        ConstantConfig_Common.add_interval = [0.4, 0.35, 0.3, 0.25, 0.12];
        ConstantConfig_Common.fontSize = {
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
        ConstantConfig_Common.actionTime = {
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
        ConstantConfig_Common.scaleSize = {
            origin: 1,
            basicInfo: 1.5,
            buttonEffect: 0.55,
            upGrade: 1.5,
            upGradeSmall: 0.9
        };
        ConstantConfig_Common.numNeedChangeMenu = 1000000;
        ConstantConfig_Common.numNeedChange = 10000000;
        ConstantConfig_Common.numChangeBse = 10000;
        ConstantConfig_Common.MaxHitSoundEffect = 1; // 每帧最大命中音效播放数量
        ConstantConfig_Common.MySteriousVipOpenLevel = 5; // 神秘商城开启临界值
        ConstantConfig_Common.ShadowOpacity = 175;
        ConstantConfig_Common.ShadowOpacityLight = 100;
        return ConstantConfig_Common;
    }());
    zj.ConstantConfig_Common = ConstantConfig_Common;
    __reflect(ConstantConfig_Common.prototype, "zj.ConstantConfig_Common");
    var ConstantConfig_Label = (function () {
        function ConstantConfig_Label() {
        }
        ConstantConfig_Label.r = 150;
        ConstantConfig_Label.g = 150;
        ConstantConfig_Label.b = 150;
        ConstantConfig_Label.shadowColor = 0X96000000;
        ConstantConfig_Label.shadowSize = { width: 1, height: -1 };
        ConstantConfig_Label.labelSpace = 1;
        ConstantConfig_Label.lineHeight = 5;
        ConstantConfig_Label.labelSpace_bmfont = 2;
        ConstantConfig_Label.lineHeight_bmfont = 5;
        return ConstantConfig_Label;
    }());
    zj.ConstantConfig_Label = ConstantConfig_Label;
    __reflect(ConstantConfig_Label.prototype, "zj.ConstantConfig_Label");
    zj.ConstantConfig_XSockServer = {
        UNKNOWN: 0,
        DISCONNECTED: 1,
        MESSAGE: 2,
        TIMEOUT: 3,
        FIGHT_DISCONNECTED: 4 // 从战斗服断开
    };
    zj.ConstantConfig_Teach = {
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
        Teach_Operate_Left_Part_Right: 1,
        Teach_Operate_Left_Part_Left: 2,
        Teach_Operate_Right_Part_Click: 3,
        Teach_Operate_Right_Part_Right: 4,
        Teach_Operate_Right_Part_Left: 5,
        Teach_Operate_Right_Part_Up: 6,
        Teach_Operate_Right_Part_Down: 7,
        Teach_Operate_Left_Double_Click: 8,
        SupportHP: 0.45,
        LayerOpacity: 140,
        SkillDelay2: 0,
        SkillDelay3: 0,
        HeroMain: 5,
        RageDelay2: 0,
        RageDelay3: 0,
    };
    zj.ConstantConfig_Tip = {
        cellHeight: 40,
        cellHeight2: 80,
        ofset_x: 100,
        ofset_x_dt: 10,
        stayTime: 0.5,
        actTime: 0.3,
        formatLevel: 31,
        scrollTime: 0.15,
        scrollStay: 0.5,
    };
    var ConstantConfig_CommonReward = (function () {
        function ConstantConfig_CommonReward() {
        }
        ConstantConfig_CommonReward.maxItemPerScreen = 5;
        ConstantConfig_CommonReward.defaultMaxY = 425;
        ConstantConfig_CommonReward.defaultMinY = 145;
        ConstantConfig_CommonReward.defaultIndex = 1;
        ConstantConfig_CommonReward.defaultX = 0;
        ConstantConfig_CommonReward.itemY = 70;
        ConstantConfig_CommonReward.startOffY = 210;
        ConstantConfig_CommonReward.judgeLastY = 120;
        ConstantConfig_CommonReward.resourceScale = 1.2;
        ConstantConfig_CommonReward.color = {
            titleSuccess: 0X19e344,
            titleFail: 0Xe1411b,
            nameResource: 0Xfeffad,
            count: 0Xffc000,
        };
        ConstantConfig_CommonReward.rewardItemStay = 30;
        ConstantConfig_CommonReward.rewardItemUnit = 10;
        ConstantConfig_CommonReward.rewardItemDisappear = 10;
        return ConstantConfig_CommonReward;
    }());
    zj.ConstantConfig_CommonReward = ConstantConfig_CommonReward;
    __reflect(ConstantConfig_CommonReward.prototype, "zj.ConstantConfig_CommonReward");
    zj.ConstantConfig_CommonTool = {
        fightFactor: [1, 4, 3, 5, 4, 15, 15, 15, 15, 15, 15] // 战力系数
    };
    var ConstantConfig_CommonBattle = (function () {
        function ConstantConfig_CommonBattle() {
        }
        ConstantConfig_CommonBattle.MOB_NAME_FONT_SIZE = 20;
        ConstantConfig_CommonBattle.MOB_NAME_Y_OFFSET = 40;
        ConstantConfig_CommonBattle.GUIDE_Y_OFFSET = 5;
        ConstantConfig_CommonBattle.BUFF_HP_DIS_OFFSETY = 8 + 5;
        ConstantConfig_CommonBattle.blood_board = {
            w: 82,
            h: 12,
        };
        // 正常伤害数字
        ConstantConfig_CommonBattle.shanghainum1 = {
            w: 18,
            h: 24,
            offset: 0,
            randTbl: {
                min: 0.6,
                max: 1,
            },
        };
        // 暴击数字
        ConstantConfig_CommonBattle.baojinum = {
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
        ConstantConfig_CommonBattle.shanghainum2 = {
            w: 18,
            h: 24,
            offset: 0,
            randTbl: {
                min: 0.6,
                max: 1,
            },
        };
        ConstantConfig_CommonBattle.shanghainum3 = {
            w: 18,
            h: 24,
            offset: 0,
            randTbl: {
                min: 0.6,
                max: 1,
            },
        };
        ConstantConfig_CommonBattle.combonum = {
            w: 40,
            h: 50,
        };
        ConstantConfig_CommonBattle.nuqinum1 = {
            w: 22,
            h: 33,
            offset: 0,
        };
        ConstantConfig_CommonBattle.nuqinum2 = {
            w: 22,
            h: 33,
            offset: 0,
        };
        ConstantConfig_CommonBattle.color = {
            ice_color: 0X3392ff,
            rain_color: 0Xa61ee0,
            blood_color: 0Xf53315,
        };
        ConstantConfig_CommonBattle.yaoganPonit = {
            x: 170,
            y: 170,
            rad: 83,
        };
        ConstantConfig_CommonBattle.dcOffsetPos = {
            x: 0,
            y: -20,
        };
        ConstantConfig_CommonBattle.dcBuffOffsetPos = {
            x: 21,
            y: 0,
        };
        return ConstantConfig_CommonBattle;
    }());
    zj.ConstantConfig_CommonBattle = ConstantConfig_CommonBattle;
    __reflect(ConstantConfig_CommonBattle.prototype, "zj.ConstantConfig_CommonBattle");
    var ConstantConfig_Rpg = (function () {
        function ConstantConfig_Rpg() {
        }
        ConstantConfig_Rpg.EVENT_VALID_CIRCLE_RAD = 300; //226,
        ConstantConfig_Rpg.COMMON_LED_OFFSET_Y = 25;
        ConstantConfig_Rpg.Color = {
            button_speed: 0Xfafafa,
            button_blood: 0Xfafafa,
        };
        ConstantConfig_Rpg.PetMove = {
            AX: 0.001,
            AY: 0.001,
            VX: 0.005,
            VY: 0.005,
            CONTINUE_TIME: 1000,
        };
        return ConstantConfig_Rpg;
    }());
    zj.ConstantConfig_Rpg = ConstantConfig_Rpg;
    __reflect(ConstantConfig_Rpg.prototype, "zj.ConstantConfig_Rpg");
    zj.ConstantConfig_LeagueWar = {
        // 准备区
        prepare_range: {
            left_rt: { x: 0, y: 0, width: 960 - 320, height: 1200 },
            right_rt: { x: 3440 + 320, y: 0, width: 960 - 320, height: 1200 },
        },
    };
    var ConstantConfig_Wonderland = (function () {
        function ConstantConfig_Wonderland() {
        }
        // 树品质颜色
        ConstantConfig_Wonderland.tree_quality_color = [
            0Xd4e0ee,
            0X19e344,
            0X7afaff,
            0Xfe22ec,
            0Xffff00,
        ];
        ConstantConfig_Wonderland.TREE_DES_NAME_OFFSET_Y = 2; // 详情和名称之间纵向偏移
        ConstantConfig_Wonderland.warter_range = (_a = {},
            _a[1] = { x: 0, y: 0, width: 3520, height: 640 },
            _a[2] = { x: 0, y: 560, width: 2880, height: 160 },
            _a[3] = { x: 2880, y: 560, width: 320, height: 80 },
            _a[4] = { x: 240, y: 720, width: 560, height: 80 },
            _a[5] = { x: 800, y: 800, width: 1600, height: 160 },
            _a[6] = { x: 2400, y: 800, width: 240, height: 80 },
            _a[7] = { x: 1040, y: 960, width: 480, height: 80 },
            _a[8] = { x: 1520, y: 960, width: 560, height: 120 },
            _a[9] = { x: 2080, y: 960, width: 240, height: 80 },
            _a[10] = { x: 3440, y: 560, width: 80, height: 80 },
            _a);
        return ConstantConfig_Wonderland;
    }());
    zj.ConstantConfig_Wonderland = ConstantConfig_Wonderland;
    __reflect(ConstantConfig_Wonderland.prototype, "zj.ConstantConfig_Wonderland");
    zj.ConstantConfig_Particle = {
        D: 9899,
        A: 1.2,
        F: 437.5,
        E: 6601,
        G: 8,
    };
    zj.ConstantConfig_LeagueHome = {
        CITY_SAFE_ROLE_DISTANCE_MAX: 500,
        CITY_SAFE_ROLE_DISTANCE_MAX_Y: 100,
        TITLE_NAME_X_OFFSET: 5,
        OFFICAL_NAME_X_OFFSET: 10,
        LV_NAME_X_OFFSET: 5,
        //FLAG_NAME_X_OFFSET : 45,                // 旗子和联盟名称间隙 to delete
        BLOOD_NAME_Y_OFFSET: 2,
        NAME_LEAGUE_Y_OFFSET: 2,
        LEAGUE_PROGRESS_Y_OFFSET: 2,
        PROGRESS_BAR_BOARD_X_OFFSET: 4,
        //CHAT_BOARD_OPACITY : 0.7,               // 聊天面板透明度
        //CHAT_BOARD_SCALE : 0.8,                 // 聊天面板缩放比例
        CHAT_BOARD_OFFSET_X: 50,
        CHAT_BOARD_OFFSET_Y: 10,
        CHAT_BOARD_OFFSET_W: 22,
        CHAT_BOARD_OFFSET_H: 22,
        CHAT_BOARD_OFFSET_SPACE: 30,
        CHAT_ADDITIONAL_KERNING: 1.5,
        LEAGUE_CHAT_STAY_TIME: 5000,
        LEAGUE_ANIMAL_RAND_TALK_MAX_TIME: 5000,
        LEAGUE_NOTICE_STAY_TIME: 15000,
        LEAGUE_NOTICE_STAY_MAX_TIME: 5000,
        LEAGUE_TITLE_FRESH_MAX_FRAME: 5000,
    };
    zj.ConstantConfig_RoleBattle = {
        PI: 3.1415926,
        //DEFAULTFPS: 30,
        GRAVITY: 0.0007,
        LEADER_JUMP_SPEED: 0.62,
        STIR_UP_AGAIN_SPEED: 0.24,
        SPRINT_FAREST: 40000,
        SPRINT_SHORTEST: 170,
        SPRINT_SPEED: 0.6,
        HIT_DOWN_SPEED: 0.4,
        SPRINT_JUMP_MOVE_SPEED: 0.5,
        HIT_BODY_STOP_TIME: 100,
        EFFECT_HIT_BODY_STOP_TIME: 100,
        NORMAL_SPX_SPEED: 100,
        SHUIJING_SPX_SPEED: 150,
        STUN_SPX_SPEED: 100,
        TOUCH_EFFECT_SPX_SPEED: 40,
        NORMAL_ROLE_GET_UP_TIMES: 300,
        ROLE_RESAFE_GET_UP_TIMES: 1000,
        ROLE_BOSS_RESAFE_TIMES: 10000,
        STIR_UP_RATIO_SML: 0.3,
        STIR_UP_RATIO_BIG: 0.7,
        STIR_UP_RATIO_SPEC: 0.1,
        STIR_UP_AGAIN_SPEED_MAX: 0.3,
        STIR_UP_AGAIN_RATIO: 0.3,
        SPRINT_PRIORITY: 4,
        MOVE_DIS_OFFSET_LEADER: 0,
        //MOVE_DIS_OFFSET_LEADER : 60,
        VER_DIS_OFFSET_LEADER: 0,
        MOVE_DIS_OFFSET_MONSTER: 30,
        JUMP_DIS_OFFSET_LEADER: 213,
        TOUCH_ERROR_LIMIT: 0,
        TOUCH_MOVE_LIMIT: 50,
        TOUCH_INIT_LEFT_POINT: 160,
        TOUCH_INIT_RIGHT_POINT: 160,
        TOUCH_INIT_POINT: 160,
        TOUCH_MOVE_RANGE: 400,
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
        PET_DISTANCE: 70,
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
        HELP_MAX_NUMBER: 1,
        OPP_HELP_MAX_NUMBER: 1,
        HELP_BASTILLE_MAX_NUMBER: 1,
        HELP_WANTED_MAX_NUMBER: 1,
        GENERAL_HELP_MAX_CD: 8000,
        OPP_GENERAL_HELP_MAX_CD: 8000,
        VERTICAL_BEGIN_DIS: 315,
        VERTICAL_BREAK_Y: 260,
        VERTICAL_END_MAX: 210,
        VERTICAL_BREAK_V0: 0,
        VERTICAL_BREAK_A: 0,
        BREAK_MOVE_TIME: 0.08,
        DANDAN_CHIP_PERCENT: 0.2,
        COMBO_PIC_MAX_NUM: 6,
        COMBO_DIS_X: 120,
        HELP_FLOOR_DIS_Y: 165,
        TEACH_FLOAT_CUT_VALUE_MIN: 230,
        TEACH_FLOAT_CUT_VALUE_MAX: 260,
        RUN_SOUND_FPS_MAX: 10,
        OPEN_AUTO_LIMIT: 6,
        AI_CD_TIME: 3000,
        CONTEND_CD_TIME: 90,
        SINGLE_CD_TIME: 90,
        PVP_CD_TIME: 180000,
        //MINE_CD_TIME : 180000,      // 抢矿时间
        HIGHT_LIGHT_MAX_TIME: 6000,
        SKI_PAUSE_TIME: 1000,
        SKI_SUPPORT_PAUSE_TIME: 2000,
        BOSS_BODY_SCALE_RADIO: 1.3,
        TALENT_ANI_DELAY_TIME: 300,
        PVP_HURT_RATIO: 1.0,
        PVE_HURT_RATIO: 1.0,
        CALL_ROLE_ATTRIB_RATIO: 0.2,
        //REVIVE_SUPER_TIME : 5000,    // 复活无敌时间
        AI_RECOVER_SINGLE_POINT: 60,
        AI_RECOVER_ALL_POINT: 75,
        AI_HELP_RECOVER_POINT: 75,
        //RESERVE_SUPER_TIME : 3000,   // 替补上场基础无敌时间
        RESERVE_ADD_RAGE: 80,
        FIGHT_SCENE_SHOW_MAX_NUM: 2,
        FIGHT_SCENE_DIE_STAY_MS: 25,
        FASTER_SPEED_PROMOTE_PERCENT: 1.5,
        CONTROL_BUILD_MAX_TIME: 5000,
        OVERLAP_SELECT_MAX_NUM: 6,
        VERTICAL_SPLIT_SCREEN: 3,
        COLLECT_GRASS_MAX_TIME: 5000,
        SYNC_POS_MAX_TIME: 10000,
        MOVE_NET_MAX_TIME: 500,
        BOSS_SYNC_MAX_TIME: 500,
        FIGHT_AUTO_SPEED_LIMIT: [1, 1, 15],
        BATTLE_AUTO_SPEED: [1.0, 1.2, 1.4],
        BATTLE_AUTO_SPEED_UI: [1.0, 5.0, 10.0],
        DODGE_REDUCE_HURT: 0,
        IGNORE_DEF_PER: 50,
        FLASH_DIS_IGNORE_X: 30,
        FLASH_DIS_IGNORE_Y: 30,
        FLASH_DIS_OFFSET_X: 50,
        FLASH_DIS_OFFSET_Y: 0,
        RAGE_GET_VALUE: {
            // 1/普通攻击
            // 2/技能攻击
            // 3/最后一击
            // 4/回血增加
            pve: [0, 10, 30, 40, 5],
            pvp: [0, 10, 30, 40, 8],
        },
        FIGHT_HP_ANIM_TIME: 1000,
        FIGHT_HP_ANIM_STEP: 60,
        FIGHT_HP_ANIM_VALUE: 3,
        FIGHT_CD_ANIM_TIME: 250,
        FIGHT_CD_ANIM_STEP: 30,
        FIGHT_CD_ANIM_VALUE: 5,
        CONTINUE_BATTLE_MAX_NUM: 10,
        CONTINUE_BATTLE_MAX_NUM_TEST: 99,
        BATTLE_SETTLE_RECONNECT_TIME: 40,
        formulaP1: 1.0,
        FIGHT_TEST_STAGE_TIME: 60000
    };
    zj.ConstantConfig_BattleTbl = {
        FIGHT_AUTO_SPEED_LIMIT: [1, 1, 15],
        FIGHT_AUTO_SPEED_LIMIT_VIP: [0, 0, 1],
        BATTLE_AUTO_SPEED: [0, 1.2, 1.6, 2],
        BATTLE_AUTO_SPEED_UI: [0, 1.0, 5.0, 10.0]
    };
    // 登陆
    var ConstantConfig_Login = (function () {
        function ConstantConfig_Login() {
        }
        ConstantConfig_Login.nameLengthMax = 12;
        ConstantConfig_Login.fontSize = 20;
        ConstantConfig_Login.fontLengthMail = 30;
        ConstantConfig_Login.fontLengthPwd = 10;
        ConstantConfig_Login.editSize = { width: 359, height: 34 };
        ConstantConfig_Login.pwdMin = 6;
        ConstantConfig_Login.pwdMax = 10;
        return ConstantConfig_Login;
    }());
    zj.ConstantConfig_Login = ConstantConfig_Login;
    __reflect(ConstantConfig_Login.prototype, "zj.ConstantConfig_Login");
    // 战斗结算
    zj.ConstantConfig_BattleSettle = {
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
    };
    zj.ConstantConfig_Maincity = {
        open_time: 0.3,
        close_time: 0.21,
    };
    // 角色
    zj.ConstantConfig_Role = {
        ui_close_call: 0.4,
        ui_upgrade_item: 4,
    };
    // 系统设置
    zj.ConstantConfig_System = (_a = {},
        _a[1] = (_b = {},
            _b[1] = true,
            _b[2] = true,
            _b[5] = true,
            _b),
        _a[2] = (_c = {},
            _c[1] = true,
            _c[2] = true,
            _c[3] = true,
            _c[4] = true,
            _c[5] = true,
            _c[6] = true,
            _c),
        _a);
    // 地图
    zj.ConstantConfig_Map = {
        moveDistancePer: 1,
    };
    // 抢矿
    zj.ConstantConfig_Mine = {
        aniMine: (_d = {},
            _d[1] = 69,
            _d[2] = 71,
            _d[3] = 73,
            _d[4] = 75,
            _d)
    };
    // 聊天
    var ConstantConfig_Chat = (function () {
        function ConstantConfig_Chat() {
        }
        ConstantConfig_Chat.lengthMax = 76;
        ConstantConfig_Chat.openLevel = 15;
        // public static titleColor = [
        //     0Xff411b,
        //     0X7afaff,
        //     0X48a2ff,
        //     0Xfe22ec,
        //     0Xffc000,
        //     0Xffffff
        // ];
        ConstantConfig_Chat.titleColor = [
            [255, 65, 27],
            [122, 250, 255],
            [72, 162, 255],
            [254, 34, 236],
            [255, 192, 0],
            [255, 255, 255],
        ];
        ConstantConfig_Chat.nameColor = 0Xd4e0ee;
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
        ConstantConfig_Chat.contentColor = [
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
        ConstantConfig_Chat.typeLua = {
            world: 1,
            server: 2,
            league: 3,
            whisper: 4,
        };
        return ConstantConfig_Chat;
    }());
    zj.ConstantConfig_Chat = ConstantConfig_Chat;
    __reflect(ConstantConfig_Chat.prototype, "zj.ConstantConfig_Chat");
    // 公告滚动
    var ConstantConfig_ScrollTip = (function () {
        function ConstantConfig_ScrollTip() {
        }
        ConstantConfig_ScrollTip.bgRect = { x: 1, y: 1, w: 10, h: 10 };
        ConstantConfig_ScrollTip.tipFontSize = 26;
        ConstantConfig_ScrollTip.tipMoveSpeed = 4;
        ConstantConfig_ScrollTip.tipSize = { width: 700, height: 40 };
        ConstantConfig_ScrollTip.tipPosition = { width: 480, height: 380 };
        return ConstantConfig_ScrollTip;
    }());
    zj.ConstantConfig_ScrollTip = ConstantConfig_ScrollTip;
    __reflect(ConstantConfig_ScrollTip.prototype, "zj.ConstantConfig_ScrollTip");
    //列表子项大小
    var ConstantConfig_ListContent = (function () {
        function ConstantConfig_ListContent() {
        }
        ConstantConfig_ListContent.hero_head = { width: 120, height: 150 }; //英雄头像子项
        ConstantConfig_ListContent.hero_skill = { width: 250, height: 100 }; //英雄技能子项
        ConstantConfig_ListContent.hero_Talent = { width: 250, height: 100 }; //英雄天赋子项
        ConstantConfig_ListContent.hero_detailAttr = { width: 200, height: 25 }; //英雄详情文本
        ConstantConfig_ListContent.hero_fateItem = { width: 40, height: 40 }; //英雄缘分头像
        ConstantConfig_ListContent.hero_fate = { width: 300, height: 25 }; //英雄缘分子项
        ConstantConfig_ListContent.hero_drop = { width: 300, height: 90 }; //英雄掉落副本子项
        ConstantConfig_ListContent.worship_compose = { width: 117, height: 130 }; //天赋合成子项
        ConstantConfig_ListContent.worship_handbook = { width: 117, height: 130 }; //天赋图鉴子项
        ConstantConfig_ListContent.worship_resolve = { width: 130, height: 130 }; //天赋分解子项
        ConstantConfig_ListContent.talent_learn = { width: 110, height: 130 }; //天赋学习子项
        ConstantConfig_ListContent.talent_upgrade = { width: 115, height: 130 }; //天赋升级子项
        ConstantConfig_ListContent.package_item = { width: 115, height: 115 }; //背包子项
        ConstantConfig_ListContent.mall_arena = { width: 265, height: 150 }; //天梯商铺子项
        ConstantConfig_ListContent.mall_league = { width: 265, height: 155 }; //帮会商铺子项
        ConstantConfig_ListContent.mall_main = { width: 265, height: 150 }; //普通商铺子项
        ConstantConfig_ListContent.mall_worship = { width: 265, height: 150 }; //天宫商铺子项
        ConstantConfig_ListContent.mall_tavern = { width: 265, height: 155 }; //酒馆商铺子项
        ConstantConfig_ListContent.mall_wanted = { width: 265, height: 155 }; //通缉商铺子项
        ConstantConfig_ListContent.daily_achieve = { width: 690, height: 110 }; //成就子项
        ConstantConfig_ListContent.daily_live = { width: 690, height: 110 }; //日常子项
        ConstantConfig_ListContent.daily_task = { width: 690, height: 200 }; //任务子项
        ConstantConfig_ListContent.money_item = { width: 440, height: 60 }; //点金子项
        ConstantConfig_ListContent.rank_type = { width: 160, height: 70 }; //排行类型
        ConstantConfig_ListContent.rank_item = { width: 500, height: 110 }; //排行子项
        ConstantConfig_ListContent.vip_charge = { width: 320, height: 160 }; //充值子项
        ConstantConfig_ListContent.vip_page = { width: 520, height: 300 }; //会员文本
        ConstantConfig_ListContent.vip_item = { width: 520, height: 30 }; //会员文本子项
        ConstantConfig_ListContent.chat_item = { width: 800, height: 100 }; //聊天子项
        ConstantConfig_ListContent.sign_item = { width: 116, height: 145 }; //签到子项
        ConstantConfig_ListContent.mail_item = { width: 620, height: 100 }; //邮件子项
        ConstantConfig_ListContent.equip_item = { width: 120, height: 120 }; //装备列表
        ConstantConfig_ListContent.forge_item = { width: 100, height: 100 }; //锻造材料
        ConstantConfig_ListContent.carve_item = { width: 80, height: 100 }; //刻印材料
        ConstantConfig_ListContent.carve_page = { width: 230, height: 230 }; //刻印属性
        ConstantConfig_ListContent.activity_server = { width: 490, height: 120 }; //活动 每日 子项
        ConstantConfig_ListContent.daily_award = { width: 110, height: 60 }; //成就 奖励 子项
        ConstantConfig_ListContent.tower_item = { width: 450, height: 110 }; //爬塔 子项
        ConstantConfig_ListContent.forFate_item = { width: 475, height: 135 }; //阵型武将组合 子项
        ConstantConfig_ListContent.forFate_heroItem = { width: 50, height: 50 }; //阵型武将组合 武将子项
        ConstantConfig_ListContent.package_type = { width: 160, height: 65 }; //背包类型
        ConstantConfig_ListContent.daily_reward = { width: 110, height: 60 }; //任务奖励
        ConstantConfig_ListContent.player_hero = { width: 126, height: 120 }; //玩家详情武将子项
        ConstantConfig_ListContent.player_equip = { width: 115, height: 120 }; //玩家详情装备子项
        ConstantConfig_ListContent.player_talent = { width: 190, height: 100 }; //玩家详情天赋子项
        ConstantConfig_ListContent.player_adviser = { width: 255, height: 400 }; //玩家详情军师子项
        ConstantConfig_ListContent.sell_item = { width: 130, height: 150 }; //一件卖出子项
        ConstantConfig_ListContent.wanted_item = { width: 250, height: 500 }; //通缉令开始子项
        ConstantConfig_ListContent.wanted_chat = { width: 240, height: 50 }; //通缉令获得子项
        ConstantConfig_ListContent.wanted_hero = { width: 70, height: 70 }; //通缉令英雄子项
        ConstantConfig_ListContent.first_charge = { width: 100, height: 100 }; //首冲子项
        ConstantConfig_ListContent.pakage_item = { width: 162, height: 200 }; //礼盒子项
        ConstantConfig_ListContent.award_gift = { width: 420, height: 100 }; //会员礼包子项
        ConstantConfig_ListContent.award_fund = { width: 495, height: 100 }; //成长基金子项
        ConstantConfig_ListContent.adviser_level = { width: 110, height: 30 }; //军师等级属性列表
        ConstantConfig_ListContent.activity_uplevelpop = { width: 220, height: 40 }; //冲级活动详情列表
        ConstantConfig_ListContent.activity_uplevel = { width: 200, height: 75 }; //冲级活动
        ConstantConfig_ListContent.activity_vip = { width: 490, height: 100 }; //vip活动
        ConstantConfig_ListContent.activity_top = { width: 490, height: 120 }; //累计充值
        ConstantConfig_ListContent.activity_consumption = { width: 450, height: 130 }; //累计消耗
        ConstantConfig_ListContent.activity_exchange = { width: 490, height: 113 }; //累计消耗
        ConstantConfig_ListContent.league_feedanimal = { width: 100, height: 100 }; //杂事投喂界面子项
        ConstantConfig_ListContent.novice_tag = { width: 105, height: 80 }; //新手嘉年华
        ConstantConfig_ListContent.novice_item = { width: 200, height: 250 }; //新手嘉年华
        return ConstantConfig_ListContent;
    }());
    zj.ConstantConfig_ListContent = ConstantConfig_ListContent;
    __reflect(ConstantConfig_ListContent.prototype, "zj.ConstantConfig_ListContent");
    // 爬塔、精英通关送武将
    zj.ConstantConfig_WinPop = {
        eliteStart: 200001,
        elite: 200024,
        tower: 30,
        elite_general: 10013,
        tower_general: 10020,
    };
    zj.ConstantConfig_OpenVisit = {
        icon: "ccbResources/item_icon/BoxChoose_SoulA.png",
        logo: "ccbResources/common_ui/Activity/IconSoHot.png",
    };
    zj.ConstantConfig_UI_Config = {
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
    };
    // 魔域boss
    zj.ConstantConfig_ZorkBoss = {
        boss_attack_outer_radius: 300,
        boss_attack_delay_atk: 1000,
        circle_outer_init_x: 280,
        cricle_outer_final_x: 483,
        cricle_outer_appear_time: 0.5,
        career_atk_dis: (_e = {},
            _e[1] = { min: 50, max: 120 },
            _e[2] = { min: 200, max: 300 },
            _e[3] = { min: 200, max: 300 },
            _e[4] = { min: 200, max: 300 } // 弓箭手
        ,
            _e)
    };
    // 卡片
    var ConstantConfig_Card = (function () {
        function ConstantConfig_Card() {
        }
        // 品质索引
        ConstantConfig_Card.start_color = [0Xffff00ff, 0Xff00e300, 0X962800ff, 0X22fe00ff, 0X95fe00ff, 0X00ff00ff];
        // 品质索引
        ConstantConfig_Card.end_color = [0Xffff00ff, 0Xff00e300, 0X962800ff, 0X22fe00ff, 0X95fe00ff, 0X00ff00ff];
        return ConstantConfig_Card;
    }());
    zj.ConstantConfig_Card = ConstantConfig_Card;
    __reflect(ConstantConfig_Card.prototype, "zj.ConstantConfig_Card");
    var TableEnumLayerId = (function () {
        function TableEnumLayerId() {
        }
        TableEnumLayerId.LAYER_NONE = 0;
        TableEnumLayerId.LAYER_LOGIN = 1;
        TableEnumLayerId.LAYER_CITY = 2;
        TableEnumLayerId.LAYER_FIGHT = 3;
        TableEnumLayerId.LAYER_LEAGUE = 4;
        TableEnumLayerId.LAYER_LEAGUE_FIGHT = 5;
        TableEnumLayerId.LAYER_WONDERLAND = 6;
        TableEnumLayerId.LAYER_ZORKBOSS = 7;
        TableEnumLayerId.LAYER_ZORK = 8;
        TableEnumLayerId.LAYER_DARKLAND = 9;
        TableEnumLayerId.LAYER_MAX = 10;
        return TableEnumLayerId;
    }());
    zj.TableEnumLayerId = TableEnumLayerId;
    __reflect(TableEnumLayerId.prototype, "zj.TableEnumLayerId");
    var _a, _b, _a, _a, _b, _c, _d, _e;
})(zj || (zj = {}));
//# sourceMappingURL=ConstantConfig.js.map