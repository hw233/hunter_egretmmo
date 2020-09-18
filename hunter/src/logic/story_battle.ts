namespace zj {
export const teachBattle = {
    // 预加载
    teachPart : 4001,
    teachSeed : 13,
    bgTeachId : 38,
    helpMax : 2,
    preTeachLeft : [10010, 10011, 10018],
    preTeachRight : [1, 2],

    teachNoRageMobId             : 100003,
    teachBattleEndId             : 100011,
    teachPartId_1_1              : 4002, // 战斗1-1  连招
    teachPartId_1_3              : 4003, // 战斗1-3  怒气
    teachPartId_1_5              : 4004, // 战斗1-5  张飞援护
    teachPartId_1_10             : 4005, // 战斗1-10 华佗援护
    
    teachPartID_STRATEGY_LEARN   : 1017,
    teachPartID_PETINTRODUCE     : 1019,
    
    teachPartID_ARENA_MALL       : 1004, // 演武商铺
    
    teachPartID_BATTLE_1_1       : 3002, // 攻打副本1-1
    teachPartID_BATTLE_1_2       : 3003, // 攻打副本1-2
    teachPartID_BATTLE_1_3       : 3022, // 攻打副本1-3
    teachPartID_TRAIN_FIGHT      : 1001, // 特训战斗
    teachPartID_TRAIN_AWARD      : 1002, // 特训领奖
    teachPartID_HERO_LVUP        : 3007, // 吃经验丹
    teachPartID_HERO_SKILLUP     : 3017, // 技能升级
    teachPartID_EQUIP_STRENGTH   : 3018, // 装备强化
    teachPartID_EQUIP_CARVE      : 1014, // 装备刻印
    teachPartID_ELITE            : 3021, // 精英副本
    
    teachPartID_BOX_CHAPTER_1    : 1,
    teachPartID_BOX_CHAPTER_2    : 2,
    teachPartID_BOX_100002       : 3004, // 领宝箱
    teachPartID_BOX_100005       : 3008, // 领宝箱
    teachPartID_BOX_100008       : 3014, // 领宝箱
    teachPartID_BOX_100010       : 3015, // 领宝箱
    teachPartID_BOX_100021       : 3019, // 领宝箱
    
    teachPartID_NAME             : 2001, // 改名
    teachPartID_SUPPORT          : 2002, // 援护上阵
    teachPartID_RESERVE          : 2003, // 替补上阵
    teachPartID_STRATEGY         : 2004, // 军师上阵和阵法选择
    teachPartID_STARUP           : 2005, // 武将升星
    teachPartID_TREASURE         : 2006, // 开宝箱
    teachPartID_TALENT           : 2007, // 天赋引导
    teachPartID_ARTIFACT_OPEN    : 2008, // 神兵开启
    teachPartID_ARTIFACT_COMPOSE : 2009, // 神兵召唤
    teachPartID_ARTIFACT_CLEAR   : 2010, // 神兵洗练
    teachPartID_Arena            : 1004, // 演武堂商铺
    
    teachPartID_WONDER_ENTER_1   : 1007, // 进入仙境场景引导
    teachPartID_WONDER_ENTER_2   : 1008, // 进入仙境场景引导
    teachPartID_WONDER_ENTER_3   : 1009, // 进入仙境场景引导
    teachPartID_WONDER_ENTER_4   : 1010, // 进入仙境场景引导
    teachPartID_WONDER_NPC       : 6003, // 进入仙境npc引导
    
    teachPartID_WONDER_1         : 6001, // 仙境场景引导
    teachPartID_WONDER_2         : 6002, // 仙境场景引导

    teachPartID_ZORK             : 7001, // 魔域内引导

    teachPartID_General_Life      : 8001, // 天命
    teachPartID_Lisence_Exam     : 8009, // 执照考试
    teachPartID_League_Main      : 8011,// 帮会主界面
    teachPartID_League_Instance  : 8003,// 帮会副本
    teachPartID_League_Boss      : 8004,// 帮会boss
    teachPartID_Awake            : 8014,// 武将觉醒
    teachPartID_Lisence_Get      : 8015,// 执照领取
    teachPartID_Pokedex          : 8016,// 图鉴
    teachPartID_DoubleFruit      : 8017,// 双色球
	teachPartID_Psychic1         : 8019,// 念力1
    teachPartID_Psychic2         : 8020,// 念力2
    teachPartID_FormationSet     : 8021,// 阵容预设
    teachPartID_Formation_BanZang     : 8023,// 上阵半藏
    teachPartID_First_Charge     : 8024,// 首充
    teachPartID_GiftBag          : 8025,// 新手礼包
    teachPartID_Friend           :8026,

    // 修改
    teach_value : {
        
        // 1-1        
        [4002] : {
            [10032] : {
                cd : 2000,
                nq : 100,
            },
            [10053] : {
                cd : 2050,
                nq : 100,
            },
            [10006] : {
                cd : 2100,
                nq : 100,
            }
        },

        //`
        // 1-3
        [4003] : {
            [10001] : {
                cd : 18000,
                nq : 190,
            },
            [10010] : {
                cd : 18000,
                nq : 190,
            },
            [10003] : {
                cd : 18000,
                nq : 190,
            },
            //boss怒气初始值
            [2131] : {
                nq : 100,
            },
        },

        // 1-7
        [4004] : {
            [10001] : {
                cd : 7200,
                nq : 120,
            },
            [10010] : {
                cd : 7500,
                nq : 100,
            },
            [10003] : {
                cd : 7200,
                nq : 120,
            },
            
            //bos怒气初始值设置            
            [2151] : {
            //[2171] : {
                cd : 20000,
                nq : 400,
            },
        },

        // 1-10
        [4005] : {
            [10001] : {
                cd : 4500,
            },
            [10010] : {
                cd : 4500,
            },
            [10003] : {
                cd : 4500,
            },            
            //boss怒气初始值设置
            [21101] : {
                 nq : 250,
                 cd : 18000,
            },
        },    
    },

    teach_fake_help : {
        start_fake_stage_id : 100001,
        min_fake_stage_id : 100002,
        max_fake_stage_id : 100007,
        fake_general_id : 102,

        [100001] : {
            [0] : 102,  
        },         

        [100002] : {
            [0] : 102,            
        },  

        [100003] : {
            [0] : 102,
        },  

        [100004] : {
            [0] : 114,
        },  

        [100005] : {
            [0] : 114,
        },  

        [100006] : {
            [0] : 102,
        },  

        [100007] : {
            [0] : 102,
        },  
    },  
 
    // 左边武将配置
    teachLeftGeneral : {	                      
	    // 二号位	       
        xiaojie : {
		    id : 103,
		    name : "小杰",
            pos : 2,
	    },          
	    

	    qiya : {
		    id : 105,
		    name : "奇犽",
            pos : 3, 	
	    },

        kula : {
            id : 106,
            name : "酷拉皮卡",
            pos : 1, 	
        },

        heijie : {
            id : 118,
            name : "黑杰",
            pos : 2,
        },

        leiya : {
            id : 119,
            name : "雷犽",
            pos : 3,
        },

        huohongyan : {
            id : 120,
            name : "火红眼",
            pos : 1,
        }
    },

    // 左边援护武将配置
    teachLeftSupport : {
        leiouli : {
            id : 113,
            name : "雷欧力",
            pos : 1,
        },
    },


    // 右边武将配置
    teachRightGeneral : {                       
	    
        wojin : {
            id : 108,
            name : "窝金",
            isBoss : false,
            pos : 0,
            dir : 0,
            coordinate : {
                x : 250,
                y : 230-10,
            }
        },

        kuluoluo : {
            id : 109,
            name : "库洛洛",
            isBoss : true,
            pos : 0,
            dir : 1,
            coordinate : {
                x : 750,
                y : 230+10,
            }
        },

        feitan : {
            id : 112,
            name : "飞坦",
            isBoss : false,
            pos : 0,
            dir : 1,
            coordinate : {
                x : 350,
                y : 230+10,
            }
        },

        paike : {
            id : 111,
            name : "派克诺妲",
            isBoss : false,
            pos : 0,
            dir : 0,
            coordinate : {
                x : 420,
                y : 230-10,
            }
        }, 	 

        xiaodi : {
            id : 115,
            name : "小迪",
            isBoss : false,
            pos : 0,
            dir : 1,
            coordinate : {
                x : 500,
                y : 230+10,
            }
        }, 

        maqi : {
            id : 116,
            name : "玛琪",
            isBoss : false,
            pos : 0,
            dir : 0,
            coordinate : {
                x : 550,
                y : 230-10,
            }
        },  

        kete : {
            id : 117,
            name : "库哔",
            isBoss : false,
            pos : 0,
            dir : 1,
            coordinate : {
                x : 650,
                y : 230-10,
            }
        },  

     },

    teachRightSupport : {
   //     feitan : {
     //       id : 112,
       //     name : "飞坦",
         //   pos : 2,
        //},
    },

    enumPos : {
	    Pos_Left : 1,
	    Pos_Right : 2,
    },

    enumEvent : {
	    Event_Cover : 1,		// 补位
	    Event_Appear : 2,		// 闪现出场 
	    Event_Play_Skill : 3,	// 播放技能
	    Event_Leave : 4,		// 离场
	    Event_Dialog : 5,       // 对话
        Event_Help : 6,         // 援护出场       
	    Event_End : 7,          // 结束
        Event_Mp4 : 8,          // mp4演示
        Event_Change : 9,       // 变身
        Event_GoPos : 10,       // 去战斗位置
    },

    groupFightFakeGeneralInfo : {
        generals : {
            [1] : {
                general_id : 10032,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
            [2] : {
                general_id : 10033,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
            [3] : {
                general_id : 10034,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
            [4] : {
                general_id : 10035,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
        },
        supports : {
            [1] : {
                general_id : 10036,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
            [2] : {
                general_id : 10037,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
            [3] : {
                general_id : 10038,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
            [4] : {
                general_id : 10039,
                level      : 60,
                star       : 6,
                step       : 16,
                awaken_level : 5,
                skillLevel : [5,5,5],
            },
        },
    },
}

}