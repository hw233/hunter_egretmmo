var zj;
(function (zj) {
    zj.teachBattle = {
        // 预加载
        teachPart: 4001,
        teachSeed: 13,
        bgTeachId: 38,
        helpMax: 2,
        preTeachLeft: [10010, 10011, 10018],
        preTeachRight: [1, 2],
        teachNoRageMobId: 100003,
        teachBattleEndId: 100011,
        teachPartId_1_1: 4002,
        teachPartId_1_3: 4003,
        teachPartId_1_5: 4004,
        teachPartId_1_10: 4005,
        teachPartID_STRATEGY_LEARN: 1017,
        teachPartID_PETINTRODUCE: 1019,
        teachPartID_ARENA_MALL: 1004,
        teachPartID_BATTLE_1_1: 3002,
        teachPartID_BATTLE_1_2: 3003,
        teachPartID_BATTLE_1_3: 3022,
        teachPartID_TRAIN_FIGHT: 1001,
        teachPartID_TRAIN_AWARD: 1002,
        teachPartID_HERO_LVUP: 3007,
        teachPartID_HERO_SKILLUP: 3017,
        teachPartID_EQUIP_STRENGTH: 3018,
        teachPartID_EQUIP_CARVE: 1014,
        teachPartID_ELITE: 3021,
        teachPartID_BOX_CHAPTER_1: 1,
        teachPartID_BOX_CHAPTER_2: 2,
        teachPartID_BOX_100002: 3004,
        teachPartID_BOX_100005: 3008,
        teachPartID_BOX_100008: 3014,
        teachPartID_BOX_100010: 3015,
        teachPartID_BOX_100021: 3019,
        teachPartID_NAME: 2001,
        teachPartID_SUPPORT: 2002,
        teachPartID_RESERVE: 2003,
        teachPartID_STRATEGY: 2004,
        teachPartID_STARUP: 2005,
        teachPartID_TREASURE: 2006,
        teachPartID_TALENT: 2007,
        teachPartID_ARTIFACT_OPEN: 2008,
        teachPartID_ARTIFACT_COMPOSE: 2009,
        teachPartID_ARTIFACT_CLEAR: 2010,
        teachPartID_Arena: 1004,
        teachPartID_WONDER_ENTER_1: 1007,
        teachPartID_WONDER_ENTER_2: 1008,
        teachPartID_WONDER_ENTER_3: 1009,
        teachPartID_WONDER_ENTER_4: 1010,
        teachPartID_WONDER_NPC: 6003,
        teachPartID_WONDER_1: 6001,
        teachPartID_WONDER_2: 6002,
        teachPartID_ZORK: 7001,
        teachPartID_General_Life: 8001,
        teachPartID_Lisence_Exam: 8009,
        teachPartID_League_Main: 8011,
        teachPartID_League_Instance: 8003,
        teachPartID_League_Boss: 8004,
        teachPartID_Awake: 8014,
        teachPartID_Lisence_Get: 8015,
        teachPartID_Pokedex: 8016,
        teachPartID_DoubleFruit: 8017,
        teachPartID_Psychic1: 8019,
        teachPartID_Psychic2: 8020,
        teachPartID_FormationSet: 8021,
        teachPartID_Formation_BanZang: 8023,
        teachPartID_First_Charge: 8024,
        teachPartID_GiftBag: 8025,
        teachPartID_Friend: 8026,
        // 修改
        teach_value: (_a = {},
            // 1-1        
            _a[4002] = (_b = {},
                _b[10032] = {
                    cd: 2000,
                    nq: 100,
                },
                _b[10053] = {
                    cd: 2050,
                    nq: 100,
                },
                _b[10006] = {
                    cd: 2100,
                    nq: 100,
                },
                _b),
            //`
            // 1-3
            _a[4003] = (_c = {},
                _c[10001] = {
                    cd: 18000,
                    nq: 190,
                },
                _c[10010] = {
                    cd: 18000,
                    nq: 190,
                },
                _c[10003] = {
                    cd: 18000,
                    nq: 190,
                },
                //boss怒气初始值
                _c[2131] = {
                    nq: 100,
                },
                _c),
            // 1-7
            _a[4004] = (_d = {},
                _d[10001] = {
                    cd: 7200,
                    nq: 120,
                },
                _d[10010] = {
                    cd: 7500,
                    nq: 100,
                },
                _d[10003] = {
                    cd: 7200,
                    nq: 120,
                },
                //bos怒气初始值设置            
                _d[2151] = {
                    //[2171] : {
                    cd: 20000,
                    nq: 400,
                },
                _d),
            // 1-10
            _a[4005] = (_e = {},
                _e[10001] = {
                    cd: 4500,
                },
                _e[10010] = {
                    cd: 4500,
                },
                _e[10003] = {
                    cd: 4500,
                },
                //boss怒气初始值设置
                _e[21101] = {
                    nq: 250,
                    cd: 18000,
                },
                _e),
            _a),
        teach_fake_help: (_f = {
                start_fake_stage_id: 100001,
                min_fake_stage_id: 100002,
                max_fake_stage_id: 100007,
                fake_general_id: 102
            },
            _f[100001] = (_g = {},
                _g[0] = 102,
                _g),
            _f[100002] = (_h = {},
                _h[0] = 102,
                _h),
            _f[100003] = (_j = {},
                _j[0] = 102,
                _j),
            _f[100004] = (_k = {},
                _k[0] = 114,
                _k),
            _f[100005] = (_l = {},
                _l[0] = 114,
                _l),
            _f[100006] = (_m = {},
                _m[0] = 102,
                _m),
            _f[100007] = (_o = {},
                _o[0] = 102,
                _o),
            _f),
        // 左边武将配置
        teachLeftGeneral: {
            // 二号位	       
            xiaojie: {
                id: 103,
                name: "小杰",
                pos: 2,
            },
            qiya: {
                id: 105,
                name: "奇犽",
                pos: 3,
            },
            kula: {
                id: 106,
                name: "酷拉皮卡",
                pos: 1,
            },
            heijie: {
                id: 118,
                name: "黑杰",
                pos: 2,
            },
            leiya: {
                id: 119,
                name: "雷犽",
                pos: 3,
            },
            huohongyan: {
                id: 120,
                name: "火红眼",
                pos: 1,
            }
        },
        // 左边援护武将配置
        teachLeftSupport: {
            leiouli: {
                id: 113,
                name: "雷欧力",
                pos: 1,
            },
        },
        // 右边武将配置
        teachRightGeneral: {
            wojin: {
                id: 108,
                name: "窝金",
                isBoss: false,
                pos: 0,
                dir: 0,
                coordinate: {
                    x: 250,
                    y: 230 - 10,
                }
            },
            kuluoluo: {
                id: 109,
                name: "库洛洛",
                isBoss: true,
                pos: 0,
                dir: 1,
                coordinate: {
                    x: 750,
                    y: 230 + 10,
                }
            },
            feitan: {
                id: 112,
                name: "飞坦",
                isBoss: false,
                pos: 0,
                dir: 1,
                coordinate: {
                    x: 350,
                    y: 230 + 10,
                }
            },
            paike: {
                id: 111,
                name: "派克诺妲",
                isBoss: false,
                pos: 0,
                dir: 0,
                coordinate: {
                    x: 420,
                    y: 230 - 10,
                }
            },
            xiaodi: {
                id: 115,
                name: "小迪",
                isBoss: false,
                pos: 0,
                dir: 1,
                coordinate: {
                    x: 500,
                    y: 230 + 10,
                }
            },
            maqi: {
                id: 116,
                name: "玛琪",
                isBoss: false,
                pos: 0,
                dir: 0,
                coordinate: {
                    x: 550,
                    y: 230 - 10,
                }
            },
            kete: {
                id: 117,
                name: "库哔",
                isBoss: false,
                pos: 0,
                dir: 1,
                coordinate: {
                    x: 650,
                    y: 230 - 10,
                }
            },
        },
        teachRightSupport: {},
        enumPos: {
            Pos_Left: 1,
            Pos_Right: 2,
        },
        enumEvent: {
            Event_Cover: 1,
            Event_Appear: 2,
            Event_Play_Skill: 3,
            Event_Leave: 4,
            Event_Dialog: 5,
            Event_Help: 6,
            Event_End: 7,
            Event_Mp4: 8,
            Event_Change: 9,
            Event_GoPos: 10,
        },
        groupFightFakeGeneralInfo: {
            generals: (_p = {},
                _p[1] = {
                    general_id: 10032,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _p[2] = {
                    general_id: 10033,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _p[3] = {
                    general_id: 10034,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _p[4] = {
                    general_id: 10035,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _p),
            supports: (_q = {},
                _q[1] = {
                    general_id: 10036,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _q[2] = {
                    general_id: 10037,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _q[3] = {
                    general_id: 10038,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _q[4] = {
                    general_id: 10039,
                    level: 60,
                    star: 6,
                    step: 16,
                    awaken_level: 5,
                    skillLevel: [5, 5, 5],
                },
                _q),
        },
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
})(zj || (zj = {}));
//# sourceMappingURL=story_battle.js.map