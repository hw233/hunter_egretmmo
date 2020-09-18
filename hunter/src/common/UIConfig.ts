namespace zj {

    export const UIConfig = {

        UIConfig_Common: {
            roleFrame: [
                "ui_frame_FrameImage_png",
                "ui_frame_BoardUnionFrame_png",
            ],
            itemFrame: [
                "ui_frame_FrameHunterAsh_png",
                "ui_frame_FrameHunterGreen1_png",
                "ui_frame_FrameHunterBule1_png",
                "ui_frame_FrameHunterViolet1_png",
                "ui_frame_FrameHunterOrange1_png",
                "ui_frame_FrameHunterRed1_png",
            ],
            cloudCover: {
                ["boss"]: "ccbResources/common_ui/OrnFrameBoss.png",
                ["elite"]: "ccbResources/common_ui/OrnFrameElite.png",
                ["soldier"]: "ccbResources/common_ui/OrnFrameSoldier.png",
            },
            spark: "ui_login_Spark_png",
            nothing: "ui_other_Nothing_png",
            item_unknow: [
                "ccbResources/item_icon/RandomD.png",
                "ccbResources/item_icon/RandomC.png",
                "ccbResources/item_icon/RandomB.png",
                "ccbResources/item_icon/RandomA.png",
            ],
            item_shadow: [
                "ccbResources/common_ui/MaskFrameProp.png",
                "ui_other_MakeFrameSoul_png",
                "ccbResources/common_ui/MaskFramePiece.png",
            ],
            role_check: {
                selected: "ccbResources/common_ui/ui_an_ty_chakan_da.png",
                unSelected: "ccbResources/common_ui/ui_an_ty_chakan_dax.png",
            },
            sceneBG: "ui_mainui_BgMaoboli_png",
            luency: "ui_login_Spark_png",
            aone_ios_logo: {
                ["aone_ios"]: "ui_login_BigloadingLogo_png",
                ["aone_iosa"]: "ccbResources/common_ui/Login/BigloadingLogoA.png",
                ["aone_iosb"]: "ccbResources/common_ui/Login/BigloadingLogoB.png",
                ["aone_iosc"]: "ccbResources/common_ui/Login/BigloadingLogoA.png",
                ["aone_iosOL"]: "ccbResources/common_ui/Login/BigloadingLogoA.png",
                ["aone_iosWS"]: "ccbResources/common_ui/Login/BigloadingLogoC.png",
                ["aone_iosB2"]: "ccbResources/common_ui/Login/BigloadingLogoD.png",
                ["aone_iosLZ"]: "ccbResources/common_ui/Login/BigloadingLogoD.png",
                ["aone_iosBOL"]: "ccbResources/common_ui/Login/BigloadingLogoD.png",
                ["aone_iosZHD"]: "ui_login_BigloadingLogo_png",
                ["aone_iosZOL"]: "ui_login_BigloadingLogo_png",
                ["aone_iosX1"]: "ccbResources/common_ui/Login/BigloadingLogoE.png",
                ["aone_iosXHD"]: "ccbResources/common_ui/Login/BigloadingLogoE.png",
                ["aone_iosXOL"]: "ccbResources/common_ui/Login/BigloadingLogoE.png",
                ["aone_iosJ1"]: "ccbResources/common_ui/Login/BigloadingLogoF.png",
                ["aone_iosJHD"]: "ccbResources/common_ui/Login/BigloadingLogoF.png",
                ["aone_iosJOL"]: "ccbResources/common_ui/Login/BigloadingLogoF.png",
                ["aone_iosJY"]: "ccbResources/common_ui/Login/BigloadingLogoG.png",
                ["aone_iosJYCS"]: "ccbResources/common_ui/Login/BigloadingLogoH.png",
                ["aone_iosXYHD"]: "ccbResources/common_ui/Login/BigloadingLogoI.png",
                ["aone_iosPKZJ"]: "ccbResources/common_ui/Login/BigloadingLogoJ.png",
                ["aone_iosDJFY"]: "ccbResources/common_ui/Login/BigloadingLogoK.png",
                ["aone_iosZKR"]: "ccbResources/common_ui/Login/BigloadingLogoL.png",
                ["aone_iosJZXF"]: "ccbResources/common_ui/Login/BigloadingLogoM.png",
                ["aone_iosZWJ"]: "ccbResources/common_ui/Login/BigloadingLogoN.png",
                ["aone_iosLZRY"]: "ccbResources/common_ui/Login/BigloadingLogoO.png",
                ["aone_iosZUIWS"]: "ui_login_BigloadingLogo_png",
            },
            tw_ios_logo: {
                ["smartspace_ios"]: "ui_login_BigloadingLogo_png",
                ["smartspace_ios_tw"]: "ccbResources/common_ui/Login/BigloadingLogoA.png",
            },
            ko_logo: {
                ["smartspace_ios"]: "ccbResources/common_ui/Login/BigloadingLogoA.png",
            },
            ja_logo: {
                ["smartspace_ios"]: "ui_login_BigloadingLogo_png",
            },
            random_title: "ccbResources/common_ui/Words/WordRandom.png",
            doubles: {
                [1]: "ui_common_WordsDouble_png",
                [2]: "ui_common_WordsDoubleB_png",
            }
        },


        UIConfig_CommonBattle: {
            // --通用父级节点名称
            commonArtFatherName: "026_fuji",
            commonArtShadowName: "026_yingzi",
            commonArtSkillShadowName: "026_jineng_yingzi",
            commonArtBuffName: "026_buff",
            commonArtUpName: "026_up",

            // --png
            fightTipCD: "ui_battle_WordsHunterSkillTip_png",
            fightTipMp: "ccbResources/fight_ui/TishiMP.png",

            hpjia: "ccbResources/common_ui/WordHPjia.png",
            mpjia: "ccbResources/common_ui/WordMPjia.png",
            commonjia: "ccbResources/fight_ui/huifujia.png",
            // --粒子
            deadParticleSprite: "ccbResources/ani_particle/Guaidead.plist",
            resafeParticleSprite: "ccbResources/ani_particle/Fuhuo.plist",
            guiweiParticleSprite: "ccbResources/ani_particle/guiwei.plist",
            clickParticleSprite: "ccbResources/ani_particle/fight_dianji.plist",
            delayParticleSprite: "ccbResources/ani_particle/fight_shanghua.plist",

            // --影子
            common_shadow: "ui_fight_shadow_png",

            // --女神
            goddess_p0: "ccbResources/ani_particle/goddess_000_huabanlizi.plist",
            goddess_p1: "ccbResources/ani_particle/goddess_001_huaban.plist",
            goddess_p2: "ccbResources/ani_particle/goddess_002_juanzhoubeijing.plist",
            goddess_p3: "ccbResources/ani_particle/goddess_003_jiaodiguanghuan.plist",
            goddess_p4: "ccbResources/ani_particle/goddess_004_jiaodihuaban.plist",
            goddess_p5: "ccbResources/ani_particle/goddess_005_shifalizi.plist",

            // --蓄力
            storageNormalIcon: "ccbResources/fight_ui/biaozhi.png",
            storageBrokenIcon: "ccbResources/fight_ui/biaozhiposui.png",
            storageFrame: "ui_battle_buff_diban_png",
            storageBar: "ccbResources/fight_ui/nengliangtiao.png",

            // --摇杆
            yaoganBg: "ui_union_battle_bg_png",
            yaoganPoint: "ccbResources/fight_ui/yaogan_baidian.png",

            // --talk
            talkBg: "ccbResources/common_ui/League/Bubbles.png",

            // --hp
            hp_board: "ui_battle_BoardBurBlood_png",   // 黑的
            hp_blood_l: "ui_battle_BurHunterBlood_png",   // 绿的
            hp_blood_r: "ui_battle_BurMonsterBlood_png",  // 红的
            hp_blood_pdh: "ui_battle_BurPdhBlood_png",   // 紫色
            hp_blood_red: "ui_battle_BoardBurBlood_png",  // 黑的
            blood_split: "ui_battle_BloodSplit_png",    // 箭头下
            cd_bar: "ui_battle_BurHunterAngre_png",     // 下面的cd条
            cd_bar_light: "ui_battle_BurHunterAngre2_png", // 下面的cd条

            // --遮罩
            //blackShade: "ui_battle_Black_png",
            formulaP2: 20,
        },


        UIConfig_RpgScene: {
            // --人物水面波纹
            bowenEffect: {
                jsonId: 75,
                daiji: {
                    actionId: 2,
                    blend: true,
                },

                yidong: {
                    actionId: 1,
                    blend: false,
                },
            },

            // --碰撞冲击特效
            collideEffet: {
                jsonId: 75,
                collide_land: {
                    actionId: 0,
                    blend: true,
                },
            },

            ledEffect: {
                jsonId: 3001,
                actionIds: {
                    [1]: 3,    // -- 攻击角色
                    [2]: 4,    // -- 攻击建筑
                    [3]: 0, // --采集
                    [4]: 1, // --对话
                    [5]: 3, // --攻击怪物
                    [6]: 2, // --角色详情
                    [7]: 1, // --大炮齿轮
                },
            },

            controlProgressPic: {
                [1]: "ui_wonderland_WordCollection_png", // -- 采集中
                [2]: "ui_icon_Flag_png", // --攻打中
                [3]: "ui_icon_Flag_png", // --操作中
            },

            warActionIcon: {
                [1]: "ui_icon_Flag_png",
                [2]: "ui_icon_Flag_png",
                [3]: "ui_icon_Flag_png",
                [4]: "ui_icon_Flag_png",
                [5]: "ui_icon_Flag_png",
                [6]: "ui_icon_Flag_png",
            },

            buttonIconLeft: {
                [1]: "ui_icon_Flag_png",  // -- ButtonWarRankTelescopicBNor
                [2]: "ui_icon_Flag_png", // --ButtonWarRankTelescopicBSel
            },
            buttonIconRight: {
                [1]: "ui_icon_Flag_png", // -- ButtonWarRankTelescopicANor
                [2]: "ui_icon_Flag_png", // --ButtonWarRankTelescopicASel
            },

            resultWinOrLose: {
                [1]: "ui_mail_IconWinSmall_png",
                [2]: "ui_mail_IconLoseSmall_png",
            },

            resultTeam: {
                [1]: "ui_mail_WordsTeam1_png",
                [2]: "ui_mail_WordsTeam2_png",
                [3]: "ui_mail_WordsTeam3_png",
            }
        },


        UIConfig_LeagueScene: {
            // --body
            fishing: {
                jsonId: 52,
                actionId: 0,
            },
        },


        UIConfig_LeagueWarScene: {
            // --body

            sceneNameBoard: "ui_wonderland_BoardFruitName_png", // --BoardName
            sceneTreeBoardDes: "ui_wonderland_BoardFruitName_png", // --Boardtree(果子的数量)
            sceneTreeBoardName: "ui_wonderland_BoardFruitName_png", // --Boardtree2（果树的名称）

            roleBloodBoard: "ui_wonderland_BoardBurHunterBlood_png",
            roleBloodMyBar: "ui_wonderland_BurHunterBlood_png",
            roleBloodEnemyBar: "ui_wonderland_BurHunterFightBlood_png",
            roleBloodPkBar: "ui_wonderland_BurHunterFightBlood_png",
            roleBloodFightBar: "ui_wonderland_BurHunterFightBlood_png",

            buildBloodBoard: "ui_wonderland_BoardBurHunterBlood_png",
            buildBloodMyBar: "ui_wonderland_BurHunterBlood_png",
            buildBloodEnemyBar: "ui_wonderland_BurHunterBlood_png",

            roleProgressBoard: "ui_wonderland_BoardBurHunterBlood_png",
            roleBuildProgressBar: "ui_wonderland_BurHunterBlood_png",
            roleCollectProgressBar: "ui_wonderland_BurHunterBlood_png",

            roleBloodPeaceBarUi: "ui_wonderland_BurPlayerBlood_png",
            roleBloodFightBarUi: "ui_wonderland_BurPlayerRedBlood_png",

            warHomeIcon: {
                [1]: "ui_icon_Flag_png",      // --IconRongyao
                [2]: "ui_icon_GoldSmall_png",
                [3]: "ui_currencyicon_IconGemstone_png",
                [4]: "ui_currencyicon_IconGemstone_png",
            }
        },


        UIConfig_Wonderland: {
            ripeEffect: {
                jsonId: 71,
                land: {
                    actionId: 4,
                    blend: true,
                },
                water: {
                    actionId: 3,
                    blend: true,
                },
            },

            modeWarIcon2: "ui_icon_Flag_png",   // --WordTypeZhandou
            modeWarIcon1: "ui_icon_Flag_png",   // --IconFormation2
            modePeaceIcon: "ui_icon_Flag_png", // --WordTypeHeping

            sortOpen: {
                [1]: "ui_wonderland_ButtnAdjustmentNor_png",
                [2]: "ui_wonderland_ButtnAdjustmentSel_png",
                [3]: "ui_wonderland_ButtnAdjustmentSel_png",
            },
            sortClose: {
                [1]: "ui_wonderland_ButtonChangeImageOkNor_png",
                [2]: "ui_wonderland_ButtonChangeImageOkSel_png",
                [3]: "ui_wonderland_ButtonChangeImageOkSel_png",
            },

            peace: {
                [1]: "ui_wonderland_IconWonderlandType2_png",
                [2]: "ui_wonderland_IconWonderlandType2_png",
                [3]: "ui_wonderland_IconWonderlandType2_png",
            },

            battle: {
                [1]: "ui_wonderland_IconWonderlandType2_png",
                [2]: "ui_wonderland_IconWonderlandType2_png",
                [3]: "ui_wonderland_IconWonderlandType2_png",
            },

            kill: {
                [1]: "ui_wonderland_IconWonderlandType1_png",
                [2]: "ui_wonderland_IconWonderlandType1_png",
                [3]: "ui_wonderland_IconWonderlandType1_png",
            },
            name: [
                "ui_wonderland_name_WordsName1_png",
                "ui_wonderland_name_WordsName2_png",
                "ui_wonderland_name_WordsName3_png",
                "ui_wonderland_name_WordsName4_png",
                "ui_wonderland_name_WordsName5_png",
                "ui_wonderland_name_WordsName6_png",
            ],
            area: {
                [1]: "ui_wonderland_WordsWonderlandType1_png",
                [2]: "ui_wonderland_WordsWonderlandType2_png",
                [3]: "ui_wonderland_WordsWonderlandType3_png",
                [4]: "ui_wonderland_WordsWonderlandType4_png",
                [5]: "ui_wonderland_WordsWonderlandType5_png",
                [6]: "ui_wonderland_WordsWonderlandType6_png",
                [7]: "ui_wonderland_WordsWonderlandType7_png",
            },
            board: {
                [1]: "ui_wonderland_ButtonBoardName_png",
                [2]: "ui_wonderland_ButtonBoardNameSel_png",
            },

            tipBoard: [
                "ui_wonderland_TipBoardB_png",
                "ui_wonderland_TipBoardA_png",
            ]
        },


        // 战斗ui相关
        UIConfig_BattleUi: {
            roleBoard: {
                [1]: "ccbResources/battle_ui/FrameHero1.png",
                [2]: "ccbResources/battle_ui/FrameHero2.png",
                [3]: "ccbResources/battle_ui/FrameHero3.png",
                [4]: "ccbResources/battle_ui/FrameHero4.png",
            },

            roleOrn: {
                [1]: "ccbResources/battle_ui/IconAttack1.png",
                [2]: "ccbResources/battle_ui/IconAttack2.png",
                [3]: "ccbResources/battle_ui/IconAttack3.png",
                [4]: "ccbResources/battle_ui/IconAttack4.png",
            },

            pauseSprite: [
                "ui_battle_ButtonPauseNor_png",
                "ui_battle_ButtonPauseSel_png",
                "ui_battle_ButtonPauseDisable_png",
            ],

            autoSprite: {
                auto: [
                    "ui_battle_ButtonAutoNor_png",
                    "ui_battle_ButtonAutoSel_png",
                ],
                manual: [
                    "ui_battle_ButtonManualNor_png",
                    "ui_battle_ButtonManualSel_png",
                ]
            },

            speedSprite: {
                [1]: [
                    "ui_battle_ButtonAddFast1_png",
                    "ui_battle_ButtonAddFast1Sel_png",
                ],
                [2]: [
                    "ui_battle_ButtonAddFast2_png",
                    "ui_battle_ButtonAddFast2Sel_png",
                ],
                [3]: [
                    "ui_battle_ButtonAddFast3_png",
                    "ui_battle_ButtonAddFast3Sel_png",
                ],
            },

            chatClickLeft: {
                [1]: "ccbResources/common_ui/HXH_Battle/ButtonChatLeftNor.png",
                [2]: "ccbResources/common_ui/HXH_Battle/ButtonChatLeftSel.png",
                [3]: "ccbResources/common_ui/HXH_Battle/ButtonChatLeftSel.png",
            },

            chatClickRight: {
                [1]: "ui_battle_ButtonChatRightNor_png",
                [2]: "ui_battle_ButtonChatRightSel_png",
                [3]: "ui_battle_ButtonChatRightSel_png",
            },


            roleBarBloodPng: "ccbResources/battle_ui/BarBlood.png",
            roleBarBloodReducePng: "ccbResources/battle_ui/BarBloodReduce.png",

            roleBarAngryPng: "ui_battle_MaskPartner_png",

            roleCdTimePng: "ui_battle_OrnBurSkillCd_png",
            bossBarBossAngryPng: "ui_battle_BurBossAngre_png",

            monsterBarAngryPng: "ccbResources/battle_ui/BarEnemyAngry.png",
            monsterBarAngryReducePng: "ccbResources/battle_ui/BarEnemyAngryReduce.png",

            settleExpPng: "ui_battleend_BurHunterExp_png",
            settleHurtPng: "ui_battleend_BurHunterBlood_png",
            settleRecoverPng: "ui_battleend_BurHunterHit_png",

            // --button
            autoSpriteNor: "ui_battle_ButtonAutoNor_png",
            autoSpriteSel: "ui_battle_ButtonAutoSel_png",
            autoSpriteDis: "ui_battle_ButtonAutoDis_png",

            // -- return button
            returnSpriteNor: "ui_battle_ButtonReturnNor_png",
            returnSpriteSel: "ui_battle_ButtonReturnSel_png",

            // --watch button
            watchSpriteNor: "ccbResources/battle_ui/ButtonBackPlayNor.png",
            watchSpriteSel: "ccbResources/battle_ui/ButtonBackPlaySel.png",

            wordBuffFont: "BattleSkillCDNum_fnt",
        },


        UIConfig_FightNumber: {
            baojinum: "fight_number_baoji_png",                // -- 暴击数字
            shanghainum1: "fight_number_shanghai1_png",   // -- 黄色攻击伤害
            shanghainum2: "fight_number_shanghai2_png", // --绿色恢复
            shanghainum3: "fight_number_shanghai3_png", // --白色特效数字
            nuqishuzi1: "fight_number_nuqireduce_png", // --怒气减血数字
            nuqishuzi2: "fight_number_nuqiadd_png", // --怒气加血数字
            baoji: "fight_game_baoji_png",//暴击
            shanbi: "fight_game_miss_png",//格挡
            daduan: "fight_game_break_png",//打断
            dikang: "fight_game_immune_png",//抵抗文字
            nujia: "fight_game_nuqiadd_png",//怒气加文字
            nujian: "fight_game_nuqireduce_png",//怒气减文字
            nuzhan: "fight_game_zhansha_png",//斩杀加文字图片
            cdjia: "fight_number_cdadd_png",//cd加的文字图片
            cdjian: "fight_number_cdreduce_png",//cd减的文字图片
            rebound: "fight_game_fantan_png",//伤害反弹文字图片
        },

        // --战斗内部相关
        UIConfig_CommonBattleCss: {
            json_tongyong: 1002,   // -- new
            json_help: 1003, // --new
            json_zhandou_ui: 1004, // --new
            json_zhandou_start: 1005, // --new
            json_xuli: 1006, // --new
            json_bomb: 1007, // --new
            // --json_bisha: 10,
            json_jisha: 1008, // --new
            json_siwang: 1009, // --new
            json_timeup: 1010, // --new
            json_zibao: 1012, // --new
            json_skill_dialog: 1013, // --new
            json_bossInformation: 119,
            json_fightTalentBone: 171,

            HUNTER_FIGHT_UI: {
                is_blend: true,
                cd_index: 0,
                support_index: 2,
                hp_index: 4,
            },

            talentEyes: {
                // --必杀开始循环
                name: "004_tianfu_yanjing",
                des: "天赋眼睛",
                index: 4,
                index_enemy: 6,
                skinEye: "004_tianfu_yanjing",
                skinName: "004_chaobishaji_jinengmingzi",
            },

            talentBone: {
                // --天赋战斗骨骼
                [1]: {
                    skinIcon: "000_tianfu_tubiao",
                    skinName: "000_tianfu_mingzi",
                },
                [2]: {
                    skinIcon: "001_shenbing_tubiao",
                    skinName: "001_shenbing_mingzi",
                },
            },

            // --蓄力相关
            pressKillAni: {
                // --点击类技能播放
                name: "000_bishaji_xuli",
                des: "点击类技能蓄力",
                index: 0,
                blend: true,
            },

            deadKillAni: {
                // --点击类技能播放
                name: "001_chaobishaji_xuli",
                des: "必杀类技能蓄力",
                index: 1,
                blend: true,
            },

            // --hunter
            // --施加buff名字相关
            HUNTER_playBuffAni: {
                wenzi_index: 1,
                wenzi_skinName: "004_buff_wenzi",
                icon_index: 0,
                icon_skinName1: "001_buff_tubiao1",
                icon_skinName2: "002_buff_tubiao2",
            },

            // --死亡特效
            siwangAni: {
                name: "000_siwang",
                des: "天赋死亡效果",
                index: 0,
            },

            // --boss被击杀特效
            bossDeadAni: {
                name: "000_jishaxiaoguo",
                des: "boss被击杀",
                index: 0,
                blend: true,
            },

            HUNTER_HELP: {
                left: {
                    des: "左边援护出场",
                    index: 0,
                    blend: 0,
                },
                right: {
                    des: "右边援护出场",
                    index: 1,
                    blend: 0,
                },
                skins: {
                    role: "003_juese",
                    role2: "004_juese2",
                    word: "008_wenzi"
                }
            },

            bossInformation: {
                boss_quality_skin: "006_zizhi",
                boss_des_skin: "004_shuoming",
                boss_name_skin: "003_mingzi",
                boss_general_skin: "002_wujiang",

                appear: {
                    name: "000_boss_shuoming_chuxian",
                    index: 0,
                    blend: false,
                },
                loop: {
                    name: "001_boss_shuoming_xunhuan",
                    index: 1,
                    blend: false,
                },
                disappear: {
                    name: "002_boss_shuoming_xiaoshi",
                    index: 2,
                    blend: false
                },
            },

            artifact_fight: [256, 257, 258, 259, 260, 261, 262, 416, 427],
            artifact_xiaoshi: [277, 278, 279, 280, 281, 282, 283, 420, 431],
            artifact_futi: [284, 285, 286, 287, 288, 289, 290, 420, 431],
        },


        // --战斗spine骨骼动画相关
        UIConfig_BattleUiSpine: {
            fightStartAni: {
                id: 8,			// -- id
                x: 0,			// -- x
                y: 0,         // --y
                ani: "animation", // --ani
                loop: false, // -- false
                interval: 0, // --interval
                timeScale: 0.7,
            },
        },


        UIConfig_BattleSettleAni: {
            settleAniJsonId: 2,
            settleAni: {
                [1]: {
                    name: "000_shengliwenzi_chuxian",
                    index: 0,
                },

                [2]: {
                    name: "001_xingxingdiban",
                    index: 1,
                },

                [3]: {
                    name: "004_huisediban",
                    index: 3,
                },

                [4]: {
                    name: "003_xingxing1",
                    index: 2,
                },
            },

            shengjitexiao: {
                name: "005_shenjitexiao",
                index: 4,
            },

            winchixu: {
                name: "006_shengliwenzi_xunhuan",
                index: 5,
            },

            instanceWin: {
                shanzi: {
                    num: 1,
                    x: 0,
                    y: 0,
                    time: 0,
                },

                xingkuang: {
                    num: 2,
                    x: 0,
                    y: 0,
                    time: 0,
                },

                dikuang: {
                    num: 3,
                    x: 0,
                    y: 0,
                    time: 1.5,
                },

                xingxing1: {
                    num: 4,
                    x: -61,
                    y: 0,
                    time: 0.4,
                },

                xingxing2: {
                    num: 4,
                    x: 0,
                    y: 0,
                    time: 0.726,
                },

                xingxing3: {
                    num: 4,
                    x: 61,
                    y: 0,
                    time: 1.026,
                },
            },

            settleLoseAniJsonId: 6,
            loseBoardMove: {
                name: "000_mupaichuxian",
                index: 0,
            },

            loseBoardStatic: {
                name: "001_mupaixunhuan",
                index: 1,
            },

            settleTimeupJsonId: 31,
            timeup: {
                name: "000_shijiandao",
                index: 0,
            },

            settleTombJsonId: 32,
            tombChuxian: {
                name: "000_mubei_chuxian",
                index: 0,
            },

            tombXunhuan: {
                name: "001_mubei_xunhuan",
                index: 1,
            },

            // --胜利粒子
            fireParticle: {
                resPath: "ccbResources/ani_particle/shengli_xingxing.plist",
                time: 0.16,
                blend: true,
            }
        },


        UIConfig_BattleSettleResult: {

            // --伏牛寨结算
            BastilleDamageTip: "ccbResources/battle_ui/Bastille/WordShanghai.png",
            BastilleComboTip: "ccbResources/battle_ui/Bastille/WordLianzhan.png",


            [TableEnum.EnumAnalyseResult.RESULT_FORMAT]: {
                icon: "ui_battleend_IconLoseTeam_png",
                path: "ui_battleend_WordsLoseTeam_png",
            },
            [TableEnum.EnumAnalyseResult.RESULT_VISIT]: {
                icon: "ui_battleend_IconLoseTeam_png",
                path: "ui_battleend_WordsLoseTeam_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_CARD_NUM]: {
                icon: "ui_battleend_IconGetcard_png",
                path: "ui_battleend_WordsLoseGetcard_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_CARD_LEVEL]: {
                icon: "ui_battleend_IconLoseCard_png",
                path: "ui_battleend_WordsLoseCard_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_LEVEL]: {
                icon: "ui_battleend_IconLoseHunter_png",
                path: "ui_battleend_WordsLoseHunter_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STAR]: {
                icon: "ui_battleend_IconLoseHunter_png",
                path: "ui_battleend_WordsLoseHunter_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STEP]: {
                icon: "ui_battleend_IconLoseHunter_png",
                path: "ui_battleend_WordsLoseHunter_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_UPGRADE_SKILLS]: {
                icon: "ui_battleend_IconLoseHunter_png",
                path: "ui_battleend_WordsLoseHunter_png",
            },

            [TableEnum.EnumAnalyseResult.RESULT_UPGRADE_ADVISER]: {
                icon: "ui_battleend_IconLosePet_png",
                path: "ui_battleend_WordsLosePet_png",
            },

            nextButton: [
                "ui_battleend_ButtonNextInstanceNor_png",
                "ui_battleend_ButtonNextInstanceSel_png",
            ],

            againButton: [
                "ui_battleend_ButtonAgainInstanceNor_png",
                "ui_battleend_ButtonAgainInstanceSel_png",
            ],

            againTen: [
                "ui_battleend_ButtonTenNor_png",
                "ui_battleend_ButtonTenSel_png",
            ]
        },


        // --战斗ui动画相关
        UIConfig_BattleUiAni: {
            // --body
            battleAniJsonId: 1,

            fightStart_config: {
                battleJsonId: 81,
                start: {
                    name: "Animation",
                    index: 0
                },
            },

            lianjiJsonId: 8,
            lianji_qiehuan: {
                index: 0,
            },
            lianji_bg: {
                [2]: 1,
                [3]: 2,
                [4]: 3,
            }
        },

        // --登陆
        UIConfig_Login: {
            spriteFile: {
                zhanhun: "ccbResources/ani_css/QuanshenZhanhun.sprite",
                jiren: "ccbResources/ani_css/QuanshenJiren.sprite",
                jianling: "ccbResources/ani_css/QuanshenLingjian.sprite",
            },
            pngFile: {
                zhanhun: "ccbResources/ani_css/QuanshenZhanhun.png",
                jiren: "ccbResources/ani_css/QuanshenJiren.png",
                jianling: "ccbResources/ani_css/QuanshenLingjian.png",
            },
            InputBg: "ccbResources/common_ui/Login/kaishi_kuang2.png",
            iconServer: {
                close: "ccbResources/common_ui/Login/IconFuwuqiGray.png",
                normal: "ccbResources/common_ui/Login/IconFuwuqiGreen.png",
                busy: "ccbResources/common_ui/Login/IconFuwuqiRed.png",
                full: "ccbResources/common_ui/Login/IconFuwuqiYellow.png",
            },
            bgServer: {
                close: "ccbResources/common_ui/Login/ButtonBiggestB2.png",
                normal: "ccbResources/common_ui/Login/ButtonBiggestB.png",
                busy: "ccbResources/common_ui/Login/ButtonBiggestO.png",
                full: "ccbResources/common_ui/Login/ButtonBiggestO1.png",
            },
            wordsServer: {
                new: "ui_login_WordXinqu_png",
                recommend: "ui_login_WordTuijian_png",
            },
            iconRole: {
                zhanhun: "ccbResources/common_ui/Login/QuanshenZhanhun.png",
                jiren: "ccbResources/common_ui/Login/QuanshenJiren.png",
                jianling: "ccbResources/common_ui/Login/QuanshenLingjian.png",
            },
            iconRoleTransA: [
                "ccbResources/common_ui/Login/WordZhanhunGuangming.png",
                "ccbResources/common_ui/Login/WordJirenBing.png",
                "ccbResources/common_ui/Login/WordLingjianJiejie.png",
                "ccbResources/common_ui/Login/WordMolingwushen.png",
            ],
            iconRoleTransB: [
                "ccbResources/common_ui/Login/WordZhanhunHeian.png",
                "ccbResources/common_ui/Login/WordJirenFeng.png",
                "ccbResources/common_ui/Login/WordLingjianZhaohuan.png",
                "ccbResources/common_ui/Login/WordQimonvwang.png",
            ],
            userTilte: "ccbResources/common_ui/Login/WordDengluYHM.png",
            tipList: [
                "ui_login_ButtonPulldownNor_png",
                "ui_login_ButtonPulldownSel_png",
            ],
            statePic: [
                "ui_login_IconServerType4_png",
                "ui_login_IconServerType3_png",
                "ui_login_IconServerType2_png",
                "ui_login_IconServerType1_png",
            ],
            trans: [
                "ccbResources/common_ui/Login/Loading1.png",
                "ccbResources/common_ui/Login/Loading2.png",
                "ccbResources/common_ui/Login/Loading3.png",
                "ccbResources/common_ui/Login/Loading4.png",
                "ccbResources/common_ui/Login/Loading5.png",
            ],
            bg: [
                "ccbResources/common_ui/Login/zhongjianbeijing.png",
                "ccbResources/common_ui/Login/qiantexiao.png",
            ]
        },

        // --角色
        UIConfig_Role: {

            // --阶级底图
            grade_board: {
                [0]: "ccbResources/common_ui/BoardGradeD.png",  // --0 灰

                [1]: "ccbResources/common_ui/BoardGradeC.png", // --绿
                [2]: "ccbResources/common_ui/BoardGradeC1.png", // -- + 1
                [3]: "ccbResources/common_ui/BoardGradeC2.png", // -- + 2

                [4]: "ccbResources/common_ui/BoardGradeB.png", // --蓝
                [5]: "ccbResources/common_ui/BoardGradeB1.png", // -- + 1
                [6]: "ccbResources/common_ui/BoardGradeB2.png", // -- + 2
                [7]: "ccbResources/common_ui/BoardGradeB3.png", // -- + 3

                [8]: "ccbResources/common_ui/BoardGradeA.png", // --紫
                [9]: "ccbResources/common_ui/BoardGradeA1.png", // -- + 1
                [10]: "ccbResources/common_ui/BoardGradeA2.png", // -- + 2
                [11]: "ccbResources/common_ui/BoardGradeA3.png", // -- + 3
                [12]: "ccbResources/common_ui/BoardGradeA3.png", // -- + 4

                [13]: "ccbResources/common_ui/BoardGradeS.png", // --橙
                [14]: "ccbResources/common_ui/BoardGradeS1.png", // -- + 1
                [15]: "ccbResources/common_ui/BoardGradeS2.png", // -- + 2
                [16]: "ccbResources/common_ui/BoardGradeS3.png", // -- + 3
                [17]: "ccbResources/common_ui/BoardGradeS4.png", // --17


                [18]: "ccbResources/common_ui/BoardGradeE.png", // --红1
                [19]: "ccbResources/common_ui/BoardGradeE1.png", // --2
                [20]: "ccbResources/common_ui/BoardGradeE2.png", // --3
                [21]: "ccbResources/common_ui/BoardGradeE3.png", // --4
                [22]: "ccbResources/common_ui/BoardGradeE4.png", // --5
                [23]: "ccbResources/common_ui/BoardGradeE5.png", // --6
                [24]: "ccbResources/common_ui/BoardGradeE5.png", // --7
                [25]: "ccbResources/common_ui/BoardGradeE5.png", // --7
            },

            // --活跃度图片
            daily_live: "ui_daily_IconActivity_png",

            // --角色底板

            // --底板
            roleFrame: {
                [0]: "ui_other_FrameGradeD_png",   // --0

                [1]: "ui_other_FrameGradeC_png", // --绿
                [2]: "ui_other_FrameGradeC_png", // -- + 1
                [3]: "ui_other_FrameGradeC_png", // -- + 2

                [4]: "ui_other_FrameGradeB_png", // --蓝
                [5]: "ui_other_FrameGradeB_png", // -- + 1
                [6]: "ui_other_FrameGradeB_png", // -- + 2
                [7]: "ui_other_FrameGradeB_png", // -- + 3

                [8]: "ui_other_FrameGradeA_png", // --紫
                [9]: "ui_other_FrameGradeA_png", // -- + 1
                [10]: "ui_other_FrameGradeA_png", // -- + 2
                [11]: "ui_other_FrameGradeA_png", // -- + 3
                [12]: "ui_other_FrameGradeA_png", // -- + 4

                [13]: "ui_other_FrameGradeS_png", // --橙
                [14]: "ui_other_FrameGradeS_png", // -- + 1
                [15]: "ui_other_FrameGradeS_png", // -- + 2
                [16]: "ui_other_FrameGradeS_png", // -- + 3
                [17]: "ui_other_FrameGradeS_png", // --17

                [18]: "ccbResources/common_ui/FrameGradeE.png", // --红1
                [19]: "ccbResources/common_ui/FrameGradeE.png", // --2
                [20]: "ccbResources/common_ui/FrameGradeE.png", // --3
                [21]: "ccbResources/common_ui/FrameGradeE.png", // --4
                [22]: "ccbResources/common_ui/FrameGradeE.png", // --5
                [23]: "ccbResources/common_ui/FrameGradeE.png", // --6
                [24]: "ccbResources/common_ui/FrameGradeE.png", // --7
                [25]: "ccbResources/common_ui/FrameGradeE.png", // --7
            },

            // --武将头像框
            heroFrame: {   // -- 品阶图片

                [0]: "ui_frame_FrameHunterAsh_png",

                [1]: "ui_frame_FrameHunterGreen1_png", // --1绿
                [2]: "ui_frame_FrameHunterGreen2_png", // --2
                [3]: "ui_frame_FrameHunterBule1_png", // --3

                [4]: "ui_frame_FrameHunterBule2_png", // --4蓝
                [5]: "ui_frame_FrameHunterBule3_png", // --5

                [6]: "ui_frame_FrameHunterViolet1_png", // --6紫
                [7]: "ui_frame_FrameHunterViolet2_png", // --7
                [8]: "ui_frame_FrameHunterViolet3_png", // --8

                [9]: "ui_frame_FrameHunterOrange1_png", // --9橙
                [10]: "ui_frame_FrameHunterOrange2_png", // --10
                [11]: "ui_frame_FrameHunterOrange3_png", // --8
                [12]: "ui_frame_FrameHunterOrange4_png", // --8

                [13]: "ui_frame_FrameHunterRed1_png", // --9
                [14]: "ui_frame_FrameHunterRed2_png", // --10红
                [15]: "ui_frame_FrameHunterRed3_png", // --11
                [16]: "ui_frame_FrameHunterRed4_png", // --12

                [17]: "ui_frame_FrameHunterGold1_png", // --金
                [18]: "ui_frame_FrameHunterGold2_png", // --12
                [19]: "ui_frame_FrameHunterGold3_png", // --12
                [20]: "ui_frame_FrameHunterGold4_png", // --12

                [21]: "ui_frame_FrameHunterGold5_png", // --3
                [22]: "ui_frame_FrameHunterGold6_png", // --4
                [23]: "ui_frame_FrameHunterGold4_png", // --5

                // --突破使用头像框

                [24]: "ui_frame_FrameImage1_png",
                [25]: "ui_frame_FrameImage2_png",
                [26]: "ui_frame_FrameImage3_png",
            },

            // --武将星级
            heroStar: {
                [1]: "ui_hunter_evaluate_IconStar1_png",
                [2]: "ui_hunter_evaluate_IconStar2_png",
                [3]: "ui_hunter_evaluate_IconStar3_png",
                [4]: "ui_hunter_evaluate_IconStar4_png",
                [5]: "ui_hunter_evaluate_IconStar5_png",
                [6]: "ui_hunter_evaluate_IconStar6_png",
                [7]: "ui_hunter_evaluate_IconStar7_png",
            },
            // --觉醒星级
            heroAwakenStar: {
                [0]: "ui_hunter_evaluate_IconSkillAwaken0_png",
                [1]: "ui_hunter_evaluate_IconSkillAwaken1_png",
                [2]: "ui_hunter_evaluate_IconSkillAwaken2_png",
                [3]: "ui_hunter_evaluate_IconSkillAwaken3_png",
                [4]: "ui_hunter_evaluate_IconSkillAwaken4_png",
                [5]: "ui_hunter_evaluate_IconSkillAwaken5_png",
                [6]: "ui_hunter_evaluate_IconSkillAwaken6_png",
            },
            // --道具框
            itemFrame: {
                [0]: "ui_frame_FrameHunterAsh_png",  // --1灰
                [1]: "ui_frame_FrameHunterAsh_png", // --1灰
                [2]: "ui_frame_FrameHunterGreen1_png", // --2绿
                [3]: "ui_frame_FrameHunterBule1_png", // --3蓝
                [4]: "ui_frame_FrameHunterViolet1_png", // --4紫
                [5]: "ui_frame_FrameHunterOrange1_png", // --5橙
                [6]: "ui_frame_FrameHunterRed1_png", // --6红

                // --未开放
                [7]: "ccbResources/common_ui/FramePropE.png", // --7金
                [8]: "ccbResources/common_ui/FramePropE.png", // --8金
                [9]: "ccbResources/common_ui/FramePropE.png", // --9金
            },

            // --特殊卡片框
            item_rareCardFrame: {
                [1]: "ui_frame_FrameHunterRed1_png",  // --1灰
            },

            // --碎片框
            pieceFrame: {
                [0]: "ui_frame_FrameHunterSPAsh_png",  // --1灰
                [1]: "ui_frame_FrameHunterSPAsh_png", // --1灰
                [2]: "ui_frame_FrameHunterSPGreen_png", // --2绿
                [3]: "ui_frame_FrameHunterSPBule_png", // --3蓝
                [4]: "ui_frame_FrameHunterSPViolet_png", // --4紫
                [5]: "ui_frame_FrameHunterSPOrange_png", // --5橙
                [6]: "ui_frame_FrameHunterSPRed_png", // --6红

                [7]: "ccbResources/common_ui/FramePieceE.png", // --7金
                [8]: "ccbResources/common_ui/FramePieceE.png", // --8金
                [9]: "ccbResources/common_ui/FramePieceE.png", // --9金

            },


            // --卡片框
            cardFrame: {
                [0]: "ui_frame_FrameCard0_png",  // --1灰
                [1]: "ui_frame_FrameCard0_png", // --1灰
                [2]: "ui_frame_FrameCard1_png", // --2绿
                [3]: "ui_frame_FrameCard2_png", // --3蓝
                [4]: "ui_frame_FrameCard3_png", // --4紫
                [5]: "ui_frame_FrameCard4_png", // --5橙
                [6]: "ui_frame_FrameCard5_png", // --6红

            },

            // --特殊卡片框
            cardRareFrame: {
                [1]: "ui_frame_FrameCard6_png",  // --1灰
            },

            // --卡片框
            cardFrameOut: {
                [0]: "ui_frame_FrameCardIcon1_png",  // --1灰
                [1]: "ui_frame_FrameCardIcon1_png", // --1灰
                [2]: "ui_frame_FrameCardIcon2_png", // --2绿
                [3]: "ui_frame_FrameCardIcon3_png", // --3蓝
                [4]: "ui_frame_FrameCardIcon4_png", // --4紫
                [5]: "ui_frame_FrameCardIcon5_png", // --5橙
                [6]: "ui_frame_FrameCardIcon6_png", // --6红
            },

            // --特殊卡片框
            cardRareFrameOut: {
                [1]: "ui_frame_FrameCardIcon7_png",  // --1灰
            },

            // --碎片框
            potatoFrame: {
                [0]: "ccbResources/common_ui/FramePotatoA.png",   // --0灰
                [1]: "ccbResources/common_ui/FramePotatoA.png", // --1灰
                [2]: "ccbResources/common_ui/FramePotatoB.png", // --2绿
                [3]: "ui_other_FrameSoul_png", // --3蓝
                [4]: "ui_other_FrameArtifact_png", // --4紫
                [5]: "ccbResources/common_ui/FramePotatoC.png", // --5金
                [6]: "ccbResources/common_ui/FramePotatoD.png", // --5金

                [7]: "ccbResources/common_ui/FramePotatoD.png", // --7金
                [8]: "ccbResources/common_ui/FramePotatoD.png", // --8金
                [9]: "ccbResources/common_ui/FramePotatoD.png", // --9金

            },

            souleFrame: "ui_other_FrameSoul_png", // --信物框
            artifactFrame: "ui_other_FrameArtifact_png", // --神兵碎片框
            artifactFateFrame: "ui_other_FrameEquipSpNor_png", // --神兵缘分外框

            // --外框
            typeFrame: {
                [1]: "ui_other_FrameSoul_png",        // --信物框
                [2]: "ui_other_FrameArtifact_png", // --神兵碎片框
            },

            // --碎片标识
            pieceLogo: {
                [1]: "ui_icon_PieceRelation_png",// --羁绊卡
                [2]: "ui_icon_PieceSoul_png", // --武将魂
                [3]: "ui_icon_PieceTalent_png", // --残卷
                [4]: "ui_icon_PieceArtifact_png", // --神兵碎片
                [5]: "ccbResources/common_ui/Treasure/IconTreasureSuipian.png", // --宝物碎片
            },

            // --刻印标识
            carveLv: {
                [0]: "ui_other_Nothing_png",
                [1]: "ui_icon_IconCarve1_png",
                [2]: "ui_icon_IconCarve2_png",
                [3]: "ui_icon_IconCarve3_png",
                [4]: "ui_icon_IconCarve4_png",
                [5]: "ui_icon_IconCarve5_png",
                [6]: "ui_icon_IconCarve6_png",
                [7]: "ui_icon_IconCarve7_png",
                [8]: "ui_icon_IconCarve8_png",
                [9]: "ui_icon_IconCarve9_png",
                [10]: "ui_icon_IconCarve10_png",
                [11]: "ccbResources/common_ui/Icon/IconCarve11.png",
                [12]: "ccbResources/common_ui/Icon/IconCarve12.png",
                [13]: "ccbResources/common_ui/Icon/IconCarve12.png",
            },

            carveMaster: {
                [0]: "ccbResources/common_ui/Words/WordCarveCainiao.png",
                [1]: "ccbResources/common_ui/Words/WordCarveLevelOne.png",
                [2]: "ccbResources/common_ui/Words/WordCarveLevelTow.png",
                [3]: "ccbResources/common_ui/Words/WordCarveLevelThree.png",
                [4]: "ccbResources/common_ui/Words/WordCarveLevelFour.png",
                [5]: "ccbResources/common_ui/Words/WordCarveLevelFive.png",
                [6]: "ccbResources/common_ui/Words/WordCarveLevelSix.png",
                [7]: "ccbResources/common_ui/Words/WordCarveLevelSeven.png",
                [8]: "ccbResources/common_ui/Words/WordCarveLevelEight.png",
                [9]: "ccbResources/common_ui/Words/WordCarveLevelNine.png",
                [10]: "ccbResources/common_ui/Words/WordCarveLevelTen.png",
                [11]: "ccbResources/common_ui/Words/WordCarveLevelEleven.png",
                [12]: "ccbResources/common_ui/Words/WordCarveLevelTwelve.png",
                [13]: "ccbResources/common_ui/Words/WordCarveLevelTwelve.png",
            },

            // --缘分等级
            fateLv: {
                [0]: "ccbResources/common_ui/IconFateZero.png",
                [1]: "ccbResources/common_ui/IconFateOne.png",
                [2]: "ccbResources/common_ui/IconFateTow.png",
                [3]: "ccbResources/common_ui/IconFateThree.png",
                [4]: "ccbResources/common_ui/IconFateFour.png",
                [5]: "ccbResources/common_ui/IconFateFive.png",
                [6]: "ccbResources/common_ui/IconFateSix.png",
                [7]: "ccbResources/common_ui/IconFateSeven.png",
                // --未开放
                [8]: "ccbResources/common_ui/IconFateSix.png",
                [9]: "ccbResources/common_ui/IconFateSix.png",
            },

            rule: [
                "ccbResources/common_ui/Words/Qianghuashuoming.png",
                "ccbResources/common_ui/Words/Duanzaoshuoming.png",
                "ccbResources/common_ui/Words/Keyinshuoming.png",
            ],

            mask: {
                soul: "ui_frame_FrameHunterSPmask_png",
                piece: "ui_frame_FrameHunterSPmask_png",
                normal: "ccbResources/common_ui/MaskFrameProp.png",
            },

            // --36号骨骼
            bone_36_name: "001_qianghua_chenggong",

            // --缘分激活骨骼
            bone_fate_at: {
                [1]: "000_yuanfen",
                [2]: "000_touxiang1",
                [3]: "000_touxiang_kuang1",
                [4]: "000_touxiang2",
                [5]: "000_touxiang_kuang2",
            },

            // --缘分升级骨骼
            bone_fate_up: {
                [1]: "000_shengji_yuanfen",
                [2]: "000_yuanfen",
            },

            // --技能觉醒
            skill_wakeup: {
                [1]: "000_tubiao1",
                [2]: "000_tubiao2",
            },

            // --锻造升级
            bone_forge_up: {
                [1]: "000_duanzaohou_xingxing1",
                [2]: "000_duanzaohou_xingxing2",
                [3]: "000_duanzaohou_xingxing3",
                [4]: "000_duanzaohou_xingxing4",
                [5]: "000_tubiao2",
                [6]: "000_tubiao_juexing",

                [7]: "000_duanzaoqian_xingxing1",
                [8]: "000_duanzaoqian_xingxing2",
                [9]: "000_duanzaoqian_xingxing3",
                [10]: "000_duanzaoqian_xingxing4",
                [11]: "000_tubiao1",
                [12]: "000_tubiao_putong",

                [13]: "000_duanzaohou_xingxing5",
                [14]: "000_duanzaoqian_xingxing5",

                [15]: "000_duanzaohou_xingxing6",
                [16]: "000_duanzaoqian_xingxing6",
            },

            // --刻印大师
            bone_carve_ms: {
                [1]: "000_wenzikuang",
            },

            bone_skill_up: {
                [1]: "000_tubiao1",
                [2]: "000_tubiao2",
                [3]: "000_tubiao_juexing",
            },

            // --刻印升级
            bone_carve_up: {
                [1]: "000_tubiao1",
                [2]: "000_keyin_qian",
                [3]: "000_tubiao2",
                [4]: "000_keyin_hou",
                [5]: "000_tubiao_putong",
                [6]: "000_tubiao_juexing",
            },

            partner_word: "ccbResources/common_ui/Words/Jihuochenggong.png",
            step_word: "ccbResources/common_ui/Words/Jinjiela.png",
            star_word: "ccbResources/common_ui/Words/Shengjila.png",
            skill_word: "ccbResources/common_ui/Words/Shengjila.png",

            // --阵法学习
            learn_word: "ccbResources/common_ui/Words/Xuexichenggong.png",

            equip_word: [
                "ccbResources/common_ui/Words/Qianghuachenggong.png",
                "ccbResources/common_ui/Words/Duanzaochenggong.png",
                "ccbResources/common_ui/Words/Keyinchenggong.png",
            ],

            // --模板
            stencil: {
                normal: "ui_other_FramePropStencil_png",
                piece: "ui_other_FramePieceStencil_png",
                soul: "ui_frame_FrameHunterSPmask_png",
                skill: "ui_other_FrameSkillStencil_png",
                skillAwake: "ui_other_FrameAwakenStencil_png",
                helpHead: "ccbResources/battle_ui/FrameAidStencil.png",
                event: "ui_other_FrameEventStencil_png",
                battleUiSkill: "ccbResources/battle_ui/StencilSkill.png",
                artifact: "ui_other_FrameSoulStencil_png",
                hero: "ui_other_MakeFrameHero_png",
                artifact2: "ui_other_FrameEquipSpStencil_png",
                half: "ui_tavern_BoardPopHeroMake_png",
            },


            // --选中图片
            sel: {
                normal: "ui_other_FramePropSelected_png",
                piece: "ui_other_FramePieceSel_png",
                soul: "ui_other_FrameSoulSel_png",
            },

            selFrame: [
                "ui_frame_FrameHunterAsh_png",
                "ui_frame_FrameHunterUpStar_png",
            ],

            starOn: "ui_license_IconHunterStarNor_png",
            starOff: "ui_license_IconHunterStarDis_png",

            starOffNew: "ui_hunter_evaluate_IconSingleStarSel_png",
            starOnNew: "ui_hunter_evaluate_IconSingleStarNor_png",

            starForge: [
                "ui_other_Nothing_png",
                "ui_icon_IconStartGreen_png",
                "ui_icon_IconStartBlue_png",
                "ui_icon_IconStartPurple_png",
                "ui_icon_IconStartOrange_png",
                "ccbResources/common_ui/Icon/IconStartRed.png",
            ],

            formationPosWord: [
                "ui_instance_battle_WordsWeizhi1_png",
                "ui_instance_battle_WordsWeizhi2_png",
                "ui_instance_battle_WordsWeizhi3_png",
                "ui_instance_battle_WordsWeizhi4_png",
            ],

            formationSptArrow: {
                lock: "ui_instance_IconArrowlockSupport_png",
                open: "ui_instance_IconArrowOpenSupport_png",
            },

            formationNoneSprite: {
                word: "ui_instance_WordsIconNode_png",
                empty: "ui_instance_FrameNode_png",
            },

            inFormationIcon: [
                "ui_instance_WordsTipZhen_png",
                "ui_instance_WordsTipZhen_png",
                "ui_instance_WordsTipYuan_png",
                "ui_instance_WordsWeizhi1_png",
            ],

            inFormationIconMini: [
                "ccbResources/common_ui/IconMainTeamB.png",
                "ccbResources/common_ui/IconSubTeamB.png",
                "ccbResources/common_ui/IconAidTeamB.png",
            ],

            inFormationSimpleWord: {
                main: "ccbResources/common_ui/IconMainTeam.png",
                reserve: "ccbResources/common_ui/IconSubTeam.png",
            },

            generalstar: [
                "ccbResources/common_ui/Popular/IconHeartAlight.png",
                "ccbResources/common_ui/Popular/IconHeartHalf.png",
                "ccbResources/common_ui/Popular/IconHeartDim.png",
            ],

            partner_active_nor: "ccbResources/common_ui/Words/Kejihuo.png",
            partner_active_dis: "ccbResources/common_ui/Words/KejihuoDis.png",
            partner_active_not: "ccbResources/common_ui/Words/WeijihuoDis.png",

            partner_compose_nor: "ccbResources/common_ui/Words/Kehecheng.png",
            partner_compose_dis: "ccbResources/common_ui/Words/KehechengDis.png",

            partner_add_nor: "ccbResources/common_ui/ButtonRelationAddNor.png",
            partner_add_dis: "ccbResources/common_ui/ButtonRelationAddDis.png",

            general_state: [
                "ccbResources/common_ui/Popular/WordRenqiwujiang.png",  // --人气
                "ccbResources/common_ui/Popular/WordXinshoubibei.png", // --新手
                "ccbResources/common_ui/Popular/WordZuijiazhujiang.png", // --最佳主将
                "ccbResources/common_ui/Popular/WordZuijiayuanhu.png", // --最佳援护
                "ccbResources/common_ui/Popular/WordZuijiatibu.png", // --最佳替补
                "ccbResources/common_ui/Popular/WordJingjidaren.png", // --演武堂攻守
                "ccbResources/common_ui/Popular/WordLianzhanshengshou.png", // --伏牛宝穴
            ],

            skill_frame: [
                "ui_frame_FrameSkill_png",
                "ui_other_FrameAwaken_png",
            ],

            skill_awaken_frame: {
                [0]: "ui_frame_FrameSkillAwaken1_png",
                [1]: "ui_frame_FrameSkillAwaken2_png",
                [2]: "ui_frame_FrameSkillAwaken3_png",
                [3]: "ui_frame_FrameSkillAwaken4_png",
                [4]: "ui_frame_FrameSkillAwaken5_png",
                [5]: "ui_frame_FrameSkillAwaken6_png",
                [6]: "ui_frame_FrameSkillNor_png"
            },

            skill_awaken_Role: [
                "ui_frame_FrameSkillAwakenTip1_png",
                "ui_frame_FrameSkillAwakenTip2_png",
                "ui_frame_FrameSkillAwakenTip3_png",
            ],

            skill_logo: [
                "ccbResources/common_ui/IconSkillA.png",
                "ccbResources/common_ui/IconSkillB.png",
                "ccbResources/common_ui/IconSkillC.png",
                "ccbResources/common_ui/IconSkillCAwaken.png",
            ],

            job: {
                [1]: "ui_icon_JobZhanshi_png",
                [2]: "ui_icon_JobCike_png",
                [3]: "ui_icon_JobFashi_png",
            },

            job_word: {
                [1]: "ccbResources/common_ui/Words/WordHeroType1.png",
                [2]: "ccbResources/common_ui/Words/WordHeroType2.png",
                [3]: "ccbResources/common_ui/Words/WordHeroType3.png",
            },

            apt: {
                [11]: "ccbResources/common_ui/Words/WordXizhiNumA.png",
                [12]: "ccbResources/common_ui/Words/WordXizhiNumB.png",
                [13]: "ccbResources/common_ui/Words/WordXizhiNumC.png",
                [14]: "ccbResources/common_ui/Words/WordXizhiNumD.png",
                [15]: "ccbResources/common_ui/Words/WordXizhiNumE.png",
            },

            talent_ui_grade: {
                [1]: "ccbResources/common_ui/Words/WordSkillQuanXuan.png",
                [2]: "ccbResources/common_ui/Words/WordSkillBingJi.png",
                [3]: "ccbResources/common_ui/Words/WordSkillYiJi.png",
                [4]: "ccbResources/common_ui/Words/WordSkillJiaJi.png",
                [5]: "ccbResources/common_ui/Words/WordSkillTeji.png",
            },

            fashion_title: {
                [1]: "ccbResources/common_ui/Wardrobe/WordJingDian.png",
                [2]: "ccbResources/common_ui/Wardrobe/WordWushuang.png",
                [3]: "ccbResources/common_ui/Wardrobe/WordQidai.png",
            },

            fashion_progress: {
                [1]: "ui_fashion_IconPageNor_png",
                [2]: "ui_fashion_IconPageSel_png",
            },

            instance_progress: {
                [1]: "ui_instance_new_IconPointNor_png",
                [2]: "ui_instance_new_IconPointSel_png",
            },
        },


        UIConfig_General: {
            title: {
                [1]: "ui_tavern_WordsTipType4_png",
                [2]: "ui_tavern_WordsTipType1_png",
                [3]: "ui_tavern_WordsTipType2_png",
                [4]: "ui_tavern_WordsTipType3_png",

            },

            left_list_1: [
                "ccbResources/common_ui/BoardHeroListNor.png",
                "ccbResources/common_ui/BoardHeroListSel.png",
            ],
            left_list_2: [
                "ccbResources/common_ui/BoardHeroList2Nor.png",
                "ccbResources/common_ui/BoardHeroList2Sel.png",
            ],
            attribute: {
                [1]: "ccbResources/common_ui/Icon/HeroType1.png",
                [2]: "ccbResources/common_ui/Icon/HeroType2.png",
                [3]: "ccbResources/common_ui/Icon/HeroType3.png",
                [4]: "ccbResources/common_ui/Icon/HeroType4.png",
                [5]: "ccbResources/common_ui/Icon/HeroType5.png",
                [6]: "ccbResources/common_ui/Icon/HeroType6.png",
                [7]: "ccbResources/common_ui/Icon/HeroType7.png",
                [8]: "ccbResources/common_ui/Icon/HeroType8.png",
                [9]: "ccbResources/common_ui/Icon/HeroType9.png",
                [10]: "ccbResources/common_ui/Icon/HeroType10.png",
            },

            life_back: {
                [1]: "ccbResources/common_ui/HeroLog/IconNull.png",
                [2]: "ccbResources/common_ui/HeroLog/IconNullB.png",
                [3]: "ccbResources/common_ui/HeroLog/IconOpen.png",
                [4]: "ccbResources/common_ui/HeroLog/IconClose.png",
                [5]: "ui_acitivity_wish_IconPoint_png",
            },

            life_is_battle: "ui_acitivity_special_getpower_Icon2_png",

            life_is_open: "ccbResources/common_ui/HeroLog/WordYijihuo.png",
            life_not_open: "ccbResources/common_ui/HeroLog/WordWeitansuo.png",

            life_unlock_back: "ccbResources/common_ui/HeroLog/BoardHeroLogInsSel.png",

            hunter_grade: {
                [11]: "ui_hunter_evaluate_IconWrodsCard1_png",
                [12]: "ui_hunter_evaluate_IconWrodsCard2_png",
                [13]: "ui_hunter_evaluate_IconWrodsCard3_png",
                [14]: "ui_hunter_evaluate_IconWrodsCard4_png",
                [15]: "ui_hunter_evaluate_IconWrodsCard5_png",
            },

            hunter_type1: {
                [1]: "ui_hunter_evaluate_IconHunterType6_png",
                [2]: "ui_hunter_evaluate_IconHunterType1_png",
                [3]: "ui_hunter_evaluate_IconHunterType3_png",
                [4]: "ui_hunter_evaluate_IconHunterType5_png",
                [5]: "ui_hunter_evaluate_IconHunterType4_png",
                [6]: "ui_hunter_evaluate_IconHunterType2_png",
            },

            hunter_type2: {
                [1]: "ui_hunter_evaluate_IconHeroType3_png",
                [2]: "ui_hunter_evaluate_IconHeroType1_png",
                [3]: "ui_hunter_evaluate_IconHeroType2_png",
            },

            hunter_type3: {
                [1]: "ui_tavern_WordsGetHunterType1_png",
                [2]: "ui_tavern_WordsGetHunterType3_png",
                [3]: "ui_tavern_WordsGetHunterType2_png",
            },

            hunter_type4: {
                [1]: "ui_hunter_evaluate_IconSpriteHeroType3_png",
                [2]: "ui_hunter_evaluate_IconSpriteHeroType1_png",
                [3]: "ui_hunter_evaluate_IconSpriteHeroType2_png",
            },

            stepActivateButton: {
                [1]: "ui_hunter_ButtonActivationNor_png",
                [2]: "ui_hunter_ButtonActivationSel_png",
                [3]: "ui_hunter_ButtonActivationDis_png",
            },

            stepGetButton: {
                [1]: "ui_hunter_ButtonObtainBigNor_png",
                [2]: "ui_hunter_ButtonObtainBigSel_png",
                [3]: "ui_hunter_ButtonObtainBigSel_png",
            },

            hunter_juexing_star: [
                "ui_hunter_evaluate_IconSkillAwaken4_png",
                "ui_hunter_evaluate_IconSkillAwaken1_png",
                "ui_hunter_evaluate_IconSkillAwaken1_png",

            ],
            hunter_juexing_dark_star: "ui_hunter_evaluate_IconSkillAwaken0_png",
            hunter_donnot_know: "hero_icon_head_wz_weizhi_png",

            hunter_skillType: [
                "ui_hunter_evaluate_IconSkillType1_png",
                "ui_hunter_evaluate_IconSkillType1_png",
                "ui_hunter_evaluate_IconSkillType2_png",
                "ui_hunter_evaluate_IconSkillType3_png",
                "ui_evaluate_IconSkillType4_png",
            ],
        },


        // --主菜单
        UIConfig_User: {

            vip: [
                "ui_common_WordsVip0_png",
                "ui_common_WordsVip1_png",
                "ui_common_WordsVip2_png",
                "ui_common_WordsVip3_png",
                "ui_common_WordsVip4_png",
                "ui_common_WordsVip5_png",
                "ui_common_WordsVip6_png",
                "ui_common_WordsVip7_png",
                "ui_common_WordsVip8_png",
                "ui_common_WordsVip9_png",
                "ui_common_WordsVip10_png",
                "ui_common_WordsVip11_png",
                "ui_common_WordsVip12_png",
                "ui_common_WordsVip12_png",
                "ui_common_WordsVip12_png",
                "ui_common_WordsVip12_png",
                "ui_icon_Flag_png",
                "ui_other_Nothing_png",
            ]
        },

        // --主城
        UIConfig_City: {
            BuilFont: "LevelOpenNum_fnt",
            BuildName_Normal: "ui_mainui_BoardName_png",
            BuildName_Click: "ui_mainui_BoardSceneName_png",
            BuildName_Tip: "ui_currencyicon_IconRed_png",
        },

        // --上阵界面
        UIConfig_Format: {
            none: "ccbResources/common_ui/ChooseHero/TipKong.png",
            more: "ui_doublecolor_IconAdd_png",
            unionBloodPng: "ui_union_instance_BurInstanceBossBlood_png",
            bossBloodPng: [
                "ui_union_instance_BurBossBlood1_png",
                "ui_union_instance_BurBossBlood2_png",
                "ui_union_instance_BurBossBlood3_png",
            ]
        },

        // --副本
        UIConfig_Instance: {
            addTipNormal: "ccbResources/common_ui/ChooseHero/WordsAddHeroTip.png",
            addTipHighlight: "ccbResources/common_ui/ChooseHero/WordsAddHeroTipB.png",
            boxClose: [
                "ccbResources/common_ui/InstanceChapter/IconWoodBoxClose.png",
                "ccbResources/common_ui/InstanceChapter/IconSilverBoxClose.png",
                "ui_skyarean_IconGoldBoxClose_png",
            ],
            boxOpen: [
                "ccbResources/common_ui/InstanceChapter/IconWoodBoxOpen.png",
                "ccbResources/common_ui/InstanceChapter/IconSilverBoxOpen.png",
                "ui_skyarean_IconGoldBoxOpen_png",
            ],
            boxHalf: [
                "ccbResources/common_ui/InstanceChapter/IconWoodBoxHalfOpen.png",
                "ccbResources/common_ui/InstanceChapter/IconSilverBoxHalfOpen.png",
                "ccbResources/common_ui/InstanceChapter/IconGoldBoxHalfOpen.png",
            ],
            boxMobClose: "ccbResources/common_ui/InstanceChapter/IconBoxAClose.png",
            boxMobOpen: "ccbResources/common_ui/InstanceChapter/IconBoxAOpen.png",
            boxMobHalf: "ccbResources/common_ui/InstanceChapter/IconBoxAHalfOpen.png",
            boxBossClose: "ccbResources/common_ui/InstanceChapter/IconBoxBClose.png",
            boxBossOpen: "ccbResources/common_ui/InstanceChapter/IconBoxBOpen.png",
            boxBossHalf: "ccbResources/common_ui/InstanceChapter/IconBoxBHalfOpen.png",
            wipeButton: {
                normal: {
                    [0]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe3Nor.png",
                    [1]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe1Nor.png",
                    [2]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe2Nor.png",
                    [3]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe3Nor.png",
                    [4]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe4Nor.png",
                    [5]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe5Nor.png",
                },
                highlight: {
                    [0]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe3Sel.png",
                    [1]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe1Sel.png",
                    [2]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe2Sel.png",
                    [3]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe3Sel.png",
                    [4]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe4Sel.png",
                    [5]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe5Sel.png",
                },
                disable: {
                    [0]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe3Nor.png",
                    [1]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe1Nor.png",
                    [2]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe2Nor.png",
                    [3]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe3Nor.png",
                    [4]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe4Nor.png",
                    [5]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe5Nor.png",
                },
            },
            itemBottom: {
                normal: "ccbResources/common_ui/InstanceChapter/BoardBarrierNum.png",
                disable: "ccbResources/common_ui/InstanceChapter/BoardBarrierUnopen.png",
            },
            stageEasy: "ccbResources/common_ui/BattleMsgPreview/WordJiandan.png",
            stageNormal: "ccbResources/common_ui/BattleMsgPreview/WordPutong.png",
            stageHard: "ccbResources/common_ui/BattleMsgPreview/WordKunnan.png",
            stageHell: "ccbResources/common_ui/BattleMsgPreview/WordXiongxian.png",
            chapterStar: {
                normal: [
                    "ccbResources/common_ui/InstanceChapter/WordsStarNumA.png",
                    "ccbResources/common_ui/InstanceChapter/WordsStarNumB.png",
                    "ccbResources/common_ui/InstanceChapter/WordsStarNumC.png",
                ],
                elite: [
                    "ccbResources/common_ui/InstanceChapter/WordsStarNumD.png",
                    "ccbResources/common_ui/InstanceChapter/WordsStarNumE.png",
                    "ccbResources/common_ui/InstanceChapter/WordsStarNumF.png",
                ],
            },
            instanceStarOn: "ui_instance_IconInstanceStar1_png",
            instanceStarOff: "ui_instance_IconInstanceStar2_png",
            sweepsOnce: "ui_instance_WordsSweepA_png",

            // --章节
            instanceNum: [
                "ui_instancechapter_WordsChapterName1_png",
                "ui_instancechapter_WordsChapterName2_png",
                "ui_instancechapter_WordsChapterName3_png",
                "ccbResources/common_ui/InstanceChapter/WordsChapterNam4.png",
                "ui_instancechapter_WordsChapterName5_png",
                "ui_instancechapter_WordsChapterName6_png",
                "ui_instancechapter_WordsChapterName7_png",
                "ui_instancechapter_WordsChapterName8_png",
                "ui_instancechapter_WordsChapterName9_png",
                "ui_instancechapter_WordsChapterName10_png",
                "ui_instancechapter_WordsChapterName11_png",
                "ccbResources/common_ui/InstanceChapter/WordsChapterName12.png ",
            ],
            // --首杀评星

            instanceStar: {
                [0]: "ui_instance_OrnInstanceGradeStar0_png",
                [1]: "ui_instance_OrnInstanceGradeStar1_png",
                [2]: "ui_instance_OrnInstanceGradeStar2_png",
                [3]: "ui_instance_OrnInstanceGradeStar3_png",
            },

            // --新区域开启动画
            area_open_ani: [
                "ui_instance_Changjing01_png",
                "ui_instance_Changjing02_png",
                "ui_instance_Changjing03_png",
                "ui_instance_Changjing04_png",
                "ui_instance_Changjing05_png",
                "ui_instance_Changjing06_png",
                "ui_instance_Changjing07_png",
                "ui_instance_Changjing08_png",
                "ui_instance_Changjing09_png",
                "ui_instance_Changjing10_png",
            ],

            area_open_title: [
                "ui_instance_IconWenzi01_png",
                "ui_instance_IconWenzi02_png",
                "ui_instance_IconWenzi03_png",
                "ui_instance_IconWenzi04_png",
                "ui_instance_IconWenzi05_png",
                "ui_instance_IconWenzi06_png",
                "ui_instance_IconWenzi07_png",
                "ui_instance_IconWenzi08_png",
                "ui_instance_IconWenzi09_png",
                "ui_instance_IconWenzi10_png",
            ],
        },

        // --世界地图
        UIConfig_WorldMap: {
        },


        // --排行
        UIConfig_Rank: {

            rank: [
                "ccbResources/common_ui/Words/TypeSanrenzhanli.png",
                "ccbResources/common_ui/Words/TypeLiurenzhanli.png",
                "ccbResources/common_ui/Words/TypeTeamLevel.png",
                "ccbResources/common_ui/Words/TypeLeague.png",
                "ccbResources/common_ui/Words/TypeYanwutangB.png",
                "ccbResources/common_ui/Words/TypeYanwutang.png",
                "ccbResources/common_ui/Words/TypeTower.png",
                "ccbResources/common_ui/Words/TypeFuniubaoxue.png",
                "ccbResources/common_ui/Words/TypeFuniujinku.png",
            ],

            best: [
                "ui_arena_WordsRankingFirst_png",
                "ui_arena_WordsRankingSecond_png",
                "ui_arena_WordsRankingThree_png",
            ],

            sign: [
                "ccbResources/common_ui/IconMainTeam.png",
                "ccbResources/common_ui/IconSubTeam.png",
            ],
        },


        // --背包
        UIConfig_Package: {

            change: [
                "ui_wonderland_ButtonFruitUseNor_png",
                "ui_wonderland_ButtonFruitUseSel_png",
                "ui_wonderland_ButtonFruitSellDis_png",
            ],

            use: [
                "ui_wonderland_ButtonFruitUseNor_png",
                "ui_wonderland_ButtonFruitUseSel_png",
                "ui_wonderland_ButtonFruitUseDis_png",
            ],

            convert: [
                "ui_hunter_ButtonSkillPointChangeNor_png",
                "ui_hunter_ButtonSkillPointChangeSel_png",
                "ui_hunter_ButtonSkillPointChangeSel_png",
            ]
        },


        // --体力
        UIConfig_Strength: {
            Strength: [
                "ui_strength_ButtonBuyStrengthNor_png",
                "ui_strength_ButtonBuyStrengthSel_png",
            ]
        },


        // --竞技场
        UIConfig_Arena: {
            freshState: {
                nor: "ui_arena_ButtonChangePlayerNor_png",
                sel: "ui_arena_ButtonChangePlayerSel_png",
            },

            buyState: {
                nor: "ui_arena_ButtonArenaBuyTimeNor_png",
                sel: "ui_arena_ButtonArenaBuyTimeSel_png",
            },

            showFormate: [
                "ui_arena_ButtonViewEnemyTeamNewNor_png",
                "ui_arena_ButtonViewEnemyTeamNewSel_png",
                "ui_arena_ButtonViewEnemyTeamNewSel_png",
            ],
            unshowFormate: [
                "ui_arena_ButtonConsealEnemyTeamNewNor_png",
                "ui_arena_ButtonConsealEnemyTeamNewSel_png",
                "ui_arena_ButtonConsealEnemyTeamNewSel_png",
            ],

            showFormates: [
                "ui_arena_ButtonViewEnemyTeamNor_png",
                "ui_arena_ButtonViewEnemyTeamSel_png",
                "ui_arena_ButtonViewEnemyTeamSel_png",
            ],
            unshowFormates: [
                "ui_arena_ButtonConsealEnemyTeamNor_png",
                "ui_arena_ButtonConsealEnemyTeamSel_png",
                "ui_arena_ButtonConsealEnemyTeamSel_png",
            ],
            hunterFeatureType: [
                "ui_hunter_evaluate_IconFormatType3_png",
                "ui_hunter_evaluate_IconFormatType1_png",
                "ui_hunter_evaluate_IconFormatType2_png",
            ],
        },

        // --信息
        UIConfig_Mail: {

            read: [
                "ui_mail_WordsRead_png",
                "ui_mail_WordsDontRead_png",
            ],

            win: [
                "ui_mail_IconWinSmall_png",
                "ui_mail_IconLoseSmall_png",
                "",
            ],

            win2: [
                "ui_groupfight_IconWin_png",
                "ui_groupfight_IconLose_png",
                "",
            ],

            winLogo: [
                "ui_mail_IconSmallBig_png",
                "ui_mail_IconLoseBig_png",
            ],

            winWord: {
                // --4竞技场
                [4]: {
                    [1]: "ccbResources/common_ui/Mail/WordAttach.png",
                    [2]: "ccbResources/common_ui/Mail/WordAttach.png",
                },
                // --5抢矿
                [5]: {
                    [1]: "ccbResources/common_ui/Mail/WordQiangduoziyuan.png",
                    [2]: "ccbResources/common_ui/Mail/WordZhanbaisunshi.png",
                },
            },
        },


        // --宝箱
        UIConfig_Treasure: {

            tip: [
                "ccbResources/common_ui/Box/WordShuangbei.png",
                "ccbResources/common_ui/Box/WordSibei.png",
            ],


            word: [
                "ccbResources/common_ui/Box/WordShuangbeijiangli.png",
                "ccbResources/common_ui/Box/WordSibeijiangli.png",
            ],

            tips: [
                "ccbResources/common_ui/Box/IconDoubleTip.png",
                "ccbResources/common_ui/Box/IconFourTimesTip.png",
            ],

            key: [
                "ccbResources/common_ui/Box/IconCommonKey.png",
                "ccbResources/common_ui/Box/IconPreciousKey.png",
            ],

            double: {
                [0]: "ui_other_Nothing_png",
                [1]: "ui_other_Nothing_png",
                [2]: "ccbResources/common_ui/Box/BoardDouble.png",
                [4]: "ccbResources/common_ui/Box/BoardQuadruple.png",
            },

            gold: "ui_icon_Gold_png",

            pop_title: {
                [1]: "ccbResources/common_ui/Box/BoxTip3.png",
                [2]: "ccbResources/common_ui/Box/BoxTip4.png",
            },
            potato_back: "ccbResources/common_ui/Treasure/ButtonSelected2Sel.png",
        },


        // --领奖
        UIConfig_Award: {

            type_icon: [
                "ccbResources/common_ui/IconEvent/Sign.png",            // --签到图标
                "ccbResources/item_icon/IconEnergyBig.png",             // --领体力图标
                "ccbResources/common_ui/IconEvent/Award_VIP.png", // --VIP打折礼包图标
                "ccbResources/common_ui/IconEvent/Award_MonthCard.png", // --月卡图标
                "ccbResources/common_ui/IconEvent/Award_Fund.png", // --成长基金图标
                "ccbResources/common_ui/IconEvent/Award_MonthCard.png", // --月卡图标
            ],

            type_word: [
                "ccbResources/common_ui/Award/WordLabelQiandao.png",    // --签到
                "ccbResources/common_ui/Award/WordLabelLingtili.png", // --领体力
                "ccbResources/common_ui/Award/WordLabelViplibao.png", // --vip礼包
                "ccbResources/common_ui/Award/WordLabelYueka.png", // --月卡
                "ccbResources/common_ui/Award/WordLabelJiJin.png", // --基金
                "ccbResources/common_ui/Award/WordLabelYueka.png", // --月卡
            ],

            sign_word: [
                "ccbResources/common_ui/Award/ButtonSignNor.png",
                "ccbResources/common_ui/Award/ButtonSignSel.png",
                "ccbResources/common_ui/Award/ButtonSignDis.png",
            ],
            fix_word: [
                "ccbResources/common_ui/Award/ButtonResignNor.png",
                "ccbResources/common_ui/Award/ButtonResignSel.png",
                "ccbResources/common_ui/Award/ButtonResignDis.png",
            ],

            double: {
                [0]: "ui_other_Nothing_png",
                [1]: "ccbResources/common_ui/Award/WordDoubleV1.png",
                [2]: "ccbResources/common_ui/Award/WordDoubleV2.png",
                [3]: "ccbResources/common_ui/Award/WordDoubleV3.png",
                [4]: "ccbResources/common_ui/Award/WordDoubleV4.png",
                [5]: "ccbResources/common_ui/Award/WordDoubleV5.png",
                [6]: "ccbResources/common_ui/Award/WordDoubleV6.png",
                [7]: "ccbResources/common_ui/Award/WordDoubleV7.png",
                [8]: "ccbResources/common_ui/Award/WordDoubleV8.png",
                [9]: "ccbResources/common_ui/Award/WordDoubleV9.png",
            },

            power: "ui_icon_IconEnergySmall_png",
            split: "ui_icon_TalentCoinSmall_png",
        },

        // --经验金钱副本
        UIConfig_Bastille: {

            open: "ccbResources/common_ui/Bastille/BoardOpenMsgAlight.png",
            close: "ccbResources/common_ui/Bastille/BoardOpenMsgDim.png",

            prop3: "ccbResources/common_ui/Bastille/PropHurtBonus.png",
            prop4: "ccbResources/common_ui/Bastille/PropComboBonus.png",

            wipeButton: {
                [1]: {
                    [1]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe2Nor.png",
                    [2]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe2Sel.png",
                    [3]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipe2Nor.png",
                },
                [2]: {
                    [1]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipeNor.png",
                    [2]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipeSel.png",
                    [3]: "ccbResources/common_ui/BattleMsgPreview/ButtonWipeNor.png",
                },
            },
        },


        // --酒馆
        UIConfig_Tavern: {

            oneMore: [
                "ccbResources/common_ui/Tavern/ButtonOnceMoreNor.png",
                "ccbResources/common_ui/Tavern/ButtonOnceMoreSel.png",
            ],

            tenMore: [
                "ccbResources/common_ui/Tavern/ButtonTenMoreNor.png",
                "ccbResources/common_ui/Tavern/ButtonTenMoreSel.png",
            ],

            tips: {
                [1]: "ccbResources/common_ui/Tavern/WordTip.png",
                [2]: "ccbResources/common_ui/Tavern/WordTip2.png",
                [3]: "ccbResources/common_ui/Tavern/WordTip3.png",
                [4]: "ccbResources/common_ui/Tavern/WordTip4.png",
            },

            one_time: "ccbResources/common_ui/Tavern/WordBenCiVisit.png",
            ten_time: "ccbResources/common_ui/Tavern/TipAgainVisit.png",

            title: {
                [1]: "ui_tavern_WordsTipType4_png",
                [2]: "ui_tavern_WordsTipType1_png",
                [3]: "ui_tavern_WordsTipType2_png",
                [4]: "ui_tavern_WordsTipType3_png",

            },

            tavernBoard: {
                [11]: "ui_tavern_BoardPopHero_png",
                [12]: "ui_tavern_BoardPopHero1_png",
                [13]: "ui_tavern_BoardPopHero2_png",
                [14]: "ui_tavern_BoardPopHero3_png",
                [15]: "ui_tavern_BoardPopHero3_png",

            },
        },


        // --点金
        UIConfig_Money: {

            crit: [
                "ccbResources/common_ui/MoneyTree/Crit1.png",
                "ccbResources/common_ui/MoneyTree/Crit2.png",
                "ccbResources/common_ui/MoneyTree/Crit3.png",
                "ccbResources/common_ui/MoneyTree/Crit4.png",
                "ccbResources/common_ui/MoneyTree/Crit5.png",
                "ccbResources/common_ui/MoneyTree/Crit6.png",
                "ccbResources/common_ui/MoneyTree/Crit7.png",
                "ccbResources/common_ui/MoneyTree/Crit8.png",
                "ccbResources/common_ui/MoneyTree/Crit9.png",
                "ccbResources/common_ui/MoneyTree/Crit10.png",
                "ccbResources/common_ui/MoneyTree/Crit12.png",
            ],

            nameFont: [
                "WoddsGoldAwardLogA_fnt",
                "WoddsGoldAwardLogB_fnt",
                "WoddsGoldAwardLogC_fnt",
                "WoddsGoldAwardLogD_fnt",
                "WoddsGoldAwardLogE_fnt",
            ],

            FONT_PATH: "ccbResources/common_ui/HXH_Font/WoddsGoldAwardLogB_0.png"
        },


        // --活动
        UIConfig_Activity: {

            left_head: {
                // --活动标签头像
                [1]: "ccbResources/common_ui/IconEvent/Act_Login.png", // --七天登陆活动
                [2]: "ccbResources/common_ui/IconEvent/Act_EverdayCharge.png", // --每日充值送好礼
                [3]: "ccbResources/common_ui/IconEvent/Act_Charge.png", // --累积充值送好礼
                [4]: "ccbResources/common_ui/IconEvent/Act_Buff.png", // --buff活动
                [5]: "ccbResources/common_ui/IconEvent/Act_Notice.png", // --其他线下活动(只有文本描述)
                [6]: "ccbResources/common_ui/IconEvent/Act_Exchange.png", // --搜集道具
                [7]: "ccbResources/common_ui/IconEvent/Act_Consume.png", // --消耗类活动
                [8]: "ccbResources/common_ui/IconEvent/Act_LevelUp.png", // --冲级活动
                [9]: "ccbResources/common_ui/IconEvent/Act_VIP.png", // --VIP商城
                [10]: "ccbResources/common_ui/IconEvent/Act_SaleMall.png", // --打折商城
                [11]: "ccbResources/common_ui/IconEvent/Act_EverdayChargeAlot.png", // --每日累计充值
                [12]: "ccbResources/common_ui/IconEvent/Act_EverdayChargeAlot.png", // --广告
                [13]: "ccbResources/common_ui/IconEvent/Act_Login.png", // --真情回馈
                [14]: "ccbResources/common_ui/IconEvent/Act_Login.png",
                [15]: "ccbResources/common_ui/IconEvent/Act_Login.png",
                [16]: "ccbResources/common_ui/IconEvent/Act_EverdayCharge.png",
            },

            HXH_left_head: {
                // --活动标签头像
                [0]: "ui_acitivity_WordsAcitivityTypeName1_png", // --七天登陆活动
                [1]: "ui_acitivity_WordsAcitivityTypeName3_png", // --七天登陆活动
                [2]: "ui_acitivity_WordsAcitivityTypeName3_png", // --每日充值送好礼
                [3]: "ui_acitivity_WordsAcitivityTypeName3_png", // --累积充值送好礼
                [4]: "ui_acitivity_WordsAcitivityTypeName3_png", // --buff活动
                [5]: "ui_acitivity_WordsAcitivityTypeName3_png", // --其他线下活动(只有文本描述)
                [6]: "ui_acitivity_WordsAcitivityTypeName3_png", // --搜集道具
                [7]: "ui_acitivity_WordsAcitivityTypeName3_png", // --消耗类活动
                [8]: "ui_acitivity_WordsAcitivityTypeName3_png", // --冲级活动
                [9]: "ui_acitivity_WordsAcitivityTypeName3_png", // --VIP商城
                [10]: "ui_acitivity_WordsAcitivityTypeName3_png", // --打折商城
                [11]: "ui_acitivity_WordsAcitivityTypeName3_png", // --每日累计充值
                [12]: "ui_acitivity_WordsAcitivityTypeName3_png", // --广告
                [13]: "ui_acitivity_WordsAcitivityTypeName3_png", // --真情回馈
                [14]: "ui_acitivity_WordsAcitivityTypeName3_png",
                [15]: "ui_acitivity_WordsAcitivityTypeName2_png", // --专题献礼
                [16]: "ui_acitivity_WordsAcitivityTypeName3_png",
            },

            ad_path: [
                "ccbResources/common_ui/IconEvent/AdvertisementArtifact.png",
                "ccbResources/common_ui/IconEvent/AdvertisementBookCloth.png",
                "ccbResources/common_ui/IconEvent/AdvertisementHero.png",
            ],

            notice: [
                "ui_acitivity_WordsAcitivityType3_png",
                "ui_acitivity_WordsAcitivityType1_png",
                "ui_acitivity_WordsAcitivityType2_png",
                "ui_acitivity_WordsAcitivityType4_png",
            ],

            vip: {
                [0]: "ui_mall_new_VIP0_png",
                [1]: "ui_mall_new_VIP1_png",
                [2]: "ui_mall_new_VIP2_png",
                [3]: "ui_mall_new_VIP3_png",
                [4]: "ui_mall_new_VIP4_png",
                [5]: "ui_mall_new_VIP5_png",
                [6]: "ui_mall_new_VIP6_png",
                [7]: "ui_mall_new_VIP7_png",
                [8]: "ui_mall_new_VIP8_png",
                [9]: "ui_mall_new_VIP9_png",
                [10]: "ui_mall_new_VIP10_png",
                [11]: "ui_mall_new_VIP11_png",
                [12]: "ui_mall_new_VIP12_png",
                [13]: "ccbResources/common_ui/Activity/Vip13.png",
                [14]: "ccbResources/common_ui/Activity/Vip14.png",
                [15]: "ccbResources/common_ui/Activity/Vip15.png",
            },

            upLevel: [
                "ui_acitivity_TipAward1_png",
                "ui_acitivity_TipAward2_png",
                "ui_acitivity_TipAward3_png",
            ],

            giftIcon: [
                "item_lihe1_png",
                "item_lihe2_png",
                "item_lihe3_png",
                "item_lihe4_png",
                "item_lihe4_png",
                "item_lihe4_png",
            ],

            consumption: {
                power: "ui_icon_IconEnergySmall_png",
                gold: "ui_icon_GoldSmall_png",
                money: "ui_icon_CopperSmall_png",
                Tip4B: "ccbResources/common_ui/Activity/Tip4B.png",
                Tip15B: "ccbResources/common_ui/Activity/Tip15B.png",
            },

            day: {
                [1]: "ui_acitivity_serverseven_WordsListLeft1_png",
                [2]: "ui_acitivity_serverseven_WordsListLeft2_png",
                [3]: "ui_acitivity_serverseven_WordsListLeft3_png",
                [4]: "ui_acitivity_serverseven_WordsListLeft4_png",
                [5]: "ui_acitivity_serverseven_WordsListLeft5_png",
                [6]: "ui_acitivity_serverseven_WordsListLeft6_png",
                [7]: "ui_acitivity_serverseven_WordsListLeft7_png",
            },

            Novice: {
                [3]: { // --武将
                    [1]: "ui_acitivity_novice_ButtonHunterNor_png",
                    [2]: "ui_acitivity_novice_ButtonHunterSel_png",
                    [3]: "ui_acitivity_novice_ButtonHunterDis_png",
                },
                [5]: { // --采果子
                    [1]: "ui_acitivity_novice_ButtonCollectNor_png",
                    [2]: "ui_acitivity_novice_ButtonCollectSel_png",
                    [3]: "ui_acitivity_novice_ButtonCollectDis_png",
                },
                [2]: { // --品阶
                    [1]: "ui_acitivity_novice_ButtonUpAdvanceNor_png",
                    [2]: "ui_acitivity_novice_ButtonUpAdvanceSel_png",
                    [3]: "ui_acitivity_novice_ButtonUpAdvanceDis_png",
                },
                [6]: { // --爬塔
                    [1]: "ui_acitivity_novice_ButtonConquerNor_png",
                    [2]: "ui_acitivity_novice_ButtonConquerSel_png",
                    [3]: "ui_acitivity_novice_ButtonConquerDis_png",
                },
                [1]: { // --精英
                    [1]: "ui_acitivity_novice_ButtonAdvanceNor_png",
                    [2]: "ui_acitivity_novice_ButtonAdvanceSel_png",
                    [3]: "ui_acitivity_novice_ButtonAdvanceDis_png",
                },
                [4]: { // --演武
                    [1]: "ui_acitivity_novice_ButtonArenaNor_png",
                    [2]: "ui_acitivity_novice_ButtonArenaSel_png",
                    [3]: "ui_acitivity_novice_ButtonArenaDis_png",
                },
                [7]: {
                    [1]: "ui_acitivity_novice_ButtonAdvanceNor_png",
                    [2]: "ui_acitivity_novice_ButtonAdvanceNor_png",
                    [3]: "ui_acitivity_novice_ButtonAdvanceNor_png",
                }
            },
            buttonGo: {
                [1]: "ui_acitivity_novice_ButtonGoNor_png",
                [2]: "ui_acitivity_novice_ButtonGoSel_png",
            },

            buttonGet: {
                [1]: "ui_acitivity_novice_ButtonGetNor_png",
                [2]: "ui_acitivity_novice_ButtonGetSel_png",
            },

            buttonGet2: {
                [1]: "ui_acitivity_ButtonConmonGetNor_png",
                [2]: "ui_acitivity_ButtonConmonGetSel.png",
            },

            bknow: {
                [1]: "ui_daily_ButtonKnowNor_png",
                [2]: "ui_daily_ButtonKnowSel_png",
            },
            buttonDis: "ui_acitivity_novice_ButtonGetDis_png",

            spriteGet: [
                "ui_acitivity_novice_ButtonAwardSel_png",
                "ui_acitivity_novice_ButtonAwardNor_png",
                "ui_acitivity_novice_ButtonAwardDis_png",

            ],

            title: {
                [1]: "ui_wipe_WordsWipeTipOne_png",
                [2]: "ccbResources/common_ui/Activity/TipTow.png",
                [3]: "ccbResources/common_ui/Activity/TipThree.png",
                [4]: "ccbResources/common_ui/Activity/TipFour.png",
                [5]: "ui_wipe_WordsWipeTipFive_png",
            },

            seven: {
                [1]: "ui_acitivity_serverseven_WrodsTipTop_png",
                [2]: "ui_acitivity_serverseven_WrodsTipTop_png",
                [3]: "ccbResources/common_ui/Activity/Tip23.png",
                [4]: "ccbResources/common_ui/Activity/Tip25.png",

            },

            sevenRole: {
                [1]: "ui_acitivity_serverseven_IconImage_png",
                [2]: "ui_acitivity_serverseven_IconImage_png",

            },

            tree_get: [
                "ccbResources/common_ui/Activity/ButtonGetAwardENor.png",
                "ccbResources/common_ui/Activity/ButtonGetAwardESel.png",
                "ccbResources/common_ui/Activity/ButtonGetAwardEDis.png",
            ],
            tree_sel: [
                "ccbResources/common_ui/Activity/ButtonXuanwoNor.png",
                "ccbResources/common_ui/Activity/ButtonXuanwoSel.png",
                "ccbResources/common_ui/Activity/ButtonXuanwoSel.png",
            ],
            levelRank: [
                "ui_acitivity_WordsSeverUpLevelRank1_png",
                "ui_acitivity_WordsSeverUpLevelRank2_png",
                "ui_acitivity_WordsSeverUpLevelRank3_png",
            ],


            ButtonLevel: "ui_acitivity_ButtonVisitHunterGetLevelDis_png",
            ButtonOk: "ui_acitivity_ButtonVisitHunterGetOkDis_png",

            iconStarNor: "ui_acitivity_novice_IconStarNor_png",
            iconStarSel: "ui_acitivity_novice_IconStarSel_png",

            random: {
                [1]: "ui_acitivity_random_Qiu2_png",
                [13]: "ui_acitivity_random_Qiu7_png",
                [14]: "ui_acitivity_random_Qiu6_png",
            },

            doubleMonth: {
                // --查看
                [1]: [
                    "ui_acitivity_ButtonDoubleMouthCardNor_png",
                    "ui_acitivity_ButtonDoubleMouthCardNor_png",
                    "ui_acitivity_ButtonDoubleMouthCardNor_png",
                ],
                // --领取
                [2]: [
                    "ui_acitivity_ButtonDoubleMouthCardSel_png",
                    "ui_acitivity_ButtonDoubleMouthCardSel_png",
                    "ui_acitivity_ButtonDoubleMouthCardSel_png",
                ],
                // --已购买
                [3]: [
                    "ui_acitivity_ButtonDoubleMouthCardDis_png",
                    "ui_acitivity_ButtonDoubleMouthCardDis_png",
                    "ui_acitivity_ButtonDoubleMouthCardDis_png",
                ]
            },
            WeekBuy: "ui_acitivity_weekmission_WordsBuJiZhan_png",
            WeekMainButton: {
                [1]: [
                    "ui_mainui_ButtonWeekMission1Nor_png",
                    "ui_mainui_ButtonWeekMission1Sel_png",
                    "ui_mainui_ButtonWeekMission1Sel_png",
                ],
                [2]: [
                    "ui_mainui_ButtonWeekMission2Nor_png",
                    "ui_mainui_ButtonWeekMission2Sel_png",
                    "ui_mainui_ButtonWeekMission2Sel_png",
                ],
                [3]: [
                    "ui_mainui_ButtonWeekMission3Nor_png",
                    "ui_mainui_ButtonWeekMission3Sel_png",
                    "ui_mainui_ButtonWeekMission3Sel_png",
                ],
                [4]: [
                    "ui_mainui_ButtonWeekMission4Nor_png",
                    "ui_mainui_ButtonWeekMission4Sel_png",
                    "ui_mainui_ButtonWeekMission4Sel_png",
                ]
            },
            WeekTypeButton: {
                [1]: [
                    "ui_acitivity_weekmission_ButtonType1Nor_png",
                    "ui_acitivity_weekmission_ButtonType1Sel_png",
                    "ui_acitivity_weekmission_ButtonType1Sel_png",
                ],
                [2]: [
                    "ui_acitivity_weekmission_ButtonType2Nor_png",
                    "ui_acitivity_weekmission_ButtonType2Sel_png",
                    "ui_acitivity_weekmission_ButtonType2Sel_png",
                ],
                [3]: [
                    "ui_acitivity_weekmission_ButtonType3Nor_png",
                    "ui_acitivity_weekmission_ButtonType3Sel_png",
                    "ui_acitivity_weekmission_ButtonType3Sel_png",
                ],
                [4]: [
                    "ui_acitivity_weekmission_ButtonType4Nor_png",
                    "ui_acitivity_weekmission_ButtonType4Sel_png",
                    "ui_acitivity_weekmission_ButtonType4Sel_png",
                ]
            },
            StoryCheckPath: {
                [1]: "ui_storyinstance_ButtonSelectSel_png",
                [2]: "ui_storyinstance_ButtonSelectNor_png",
            },

            StoryTimePath: {
                [1]: "ui_storyinstance_WordsActivityPRE_png",
                [2]: "ui_storyinstance_WordsActivityON_png",
                [3]: "ui_storyinstance_WordsActivityOFF_png",
            },

        },
        // --福利
        UIConfig_Special: {

            title: [
                "ui_acitivity_special_qieye5_1_png",
                "ui_acitivity_special_qieye6_1_png",
                "ui_acitivity_special_qieye7_1_png",
                "ui_acitivity_special_qieye3_1_png",
                "ui_acitivity_special_qieye1_1_png",
                "ui_acitivity_special_qieye2_1_png",
                "ui_acitivity_special_qieye4_1_png",
                "ui_acitivity_special_qieye4_1_png",
                "ui_acitivity_special_qieye4_1_png",
            ],
            title1: [
                "ui_acitivity_special_qieye5_2_png",
                "ui_acitivity_special_qieye6_2_png",
                "ui_acitivity_special_qieye7_2_png",
                "ui_acitivity_special_qieye3_2_png",
                "ui_acitivity_special_qieye1_2_png",
                "ui_acitivity_special_qieye2_2_png",
                "ui_acitivity_special_qieye4_2_png",
                "ui_acitivity_special_qieye4_2_png",
                "ui_acitivity_special_qieye4_2_png",
            ],

            shareImg: [
                "share/Share0.jpg",
                "share/Share1.jpg",
                "share/Share2.jpg",
                "share/Share3.jpg",
                "share/Share4.jpg",
                "share/Share5.jpg",
            ],

            foodNor: {
                [1]: "ui_acitivity_special_getpower_Icon1_png",
                [2]: "ui_acitivity_special_getpower_Icon3_png",
                [3]: "ui_acitivity_special_getpower_Icon5_png"

            },

            foodDis: {
                [1]: "ui_acitivity_special_getpower_Icon2_png",
                [2]: "ui_acitivity_special_getpower_Icon4_png",
                [3]: "ui_acitivity_special_getpower_Icon6_png"

            },

            buttonSel: "ui_acitivity_ButtonVisitHunterGetSel_png",
            buttonDis: "ui_acitivity_ButtonVisitHunterGetDis_png",
            buttonNor: "ui_acitivity_ButtonVisitHunterGetNor_png",


            buttonSingle: {
                buttonNor: "ui_acitivity_special_ButtonCardAwardNor_png",
                buttonSel: "ui_acitivity_special_ButtonCardAwardSel_png",
            },

            buttonGetAward: "ui_acitivity_special_SeeAward_png",

            day: [
                "ui_acitivity_special_SpecialDay1_png",
                "ui_acitivity_special_SpecialDay2_png",
                "ui_acitivity_special_SpecialDay3_png",
                "ui_acitivity_special_SpecialDay4_png",
                "ui_acitivity_special_SpecialDay5_png",
            ],

            SixAward: "ui_acitivity_special_SixAward_png",

            shareBox: {
                [0]: [
                    "ui_acitivity_special_IconSpecialShareBox1_png",
                    "ui_acitivity_special_IconSpecialShareBoxOpen1_png",
                ],
                [1]: [
                    "ui_acitivity_special_IconSpecialShareBox2_png",
                    "ui_acitivity_special_IconSpecialShareBoxOpen2_png",
                ],
                [2]: [
                    "ui_acitivity_special_IconSpecialShareBox3_png",
                    "ui_acitivity_special_IconSpecialShareBoxOpen3_png",
                ],
                [3]: [
                    "ui_acitivity_special_IconSpecialShareBox4_png",
                    "ui_acitivity_special_IconSpecialShareBoxOpen4_png",
                ]
            }
        },


        UIConfig_Mall: {

            cost: {
                [1]: "ui_icon_TalentCoinSmall_png", // --访仙
                [2]: "ui_icon_ArenaCoinSmall_png",  // --天梯
                [3]: "ui_icon_LeagueCoinSmall_png", // --联盟
                [4]: "ui_icon_GoldSmall_png", // --神秘
                [5]: "ui_icon_CopperSmall_png", // --普通
            },
            name: {
                [1]: {
                    [1]: "ui_mall_ButtonMallNor_png",
                    [2]: "ui_mall_ButtonMallSel_png",
                },
                [2]: {
                    [1]: "ui_mall_ButtonMallArenaNor_png",
                    [2]: "ui_mall_ButtonMallArenaSel_png",
                },
                [3]: {
                    [1]: "ui_mall_ButtonMallUnionNor_png",
                    [2]: "ui_mall_ButtonMallUnionSel_png",
                },
                [4]: {
                    [1]: "ui_mall_ButtonMallHonorNor_png",
                    [2]: "ui_mall_ButtonMallHonorSel_png",
                },
                [5]: {
                    [1]: "ui_mall_ButtonTavernMallNor_png",
                    [2]: "ui_mall_ButtonTavernMallSel_png",
                },
                [6]: {
                    [1]: "ccbResources/common_ui/Mall/ButtonSecretNor.png",
                    [2]: "ccbResources/common_ui/Mall/ButtonSecretSel.png",
                },
                [7]: {
                    [1]: "ccbResources/common_ui/Mall/ButtonRuyNor.png",
                    [2]: "ccbResources/common_ui/Mall/ButtonRuySel.png",
                },
                [8]: {
                    [1]: "ccbResources/common_ui/Mall/ButtonZorkMallNor.png",
                    [2]: "ccbResources/common_ui/Mall/ButtonZorkMallSel.png",
                },
            },
            dis: {
            },
        },


        UIConfig_Worship: {
            book_bone: "000_xianrenwupim",
            resolve_bone: "001_qianghua_chenggong",
            resolve_skin: "ccbResources/common_ui/Words/Fenjiechenggong.png",
        },


        UIConfig_Stronger: {

            // --图标
            icon: [
                "ccbResources/common_ui/IconEvent/Upgrade.png", // --武将升级
                "ccbResources/common_ui/IconEvent//HeroAddStar.png", // --武将升星
                "ccbResources/common_ui/IconEvent//HeroAdvanced.png", // --武将进阶
                "ccbResources/common_ui/IconEvent//SkillUpgrade.png", // --技能升级
                "ccbResources/common_ui/IconEvent//StudyTalent.png", // --学习天赋
                "ccbResources/common_ui/IconEvent//EquipStrengthen.png", // --装备强化
                "ccbResources/common_ui/IconEvent//EquipForge.png", // --装备锻造
                "ccbResources/common_ui/IconEvent//EquipCarve.png", // --装备刻印
                "ccbResources/common_ui/IconEvent//Adviser.png", // --培养军师
            ],

            // --文字图片
            text: [
                "ccbResources/battle_ui/LoseAnalyse/WordHeroUpgrade.png", // --武将升级
                "ccbResources/battle_ui/LoseAnalyse//WordHeroAddStar.png", // --武将升星
                "ccbResources/battle_ui/LoseAnalyse//WordHeroAdvanced.png", // --武将进阶
                "ccbResources/battle_ui/LoseAnalyse//WordSkillUp.png", // --技能升级
                "ccbResources/battle_ui/LoseAnalyse//WordStudyTalent.png", // --学习天赋
                "ccbResources/battle_ui/LoseAnalyse//WordEquipStrengthen.png", // --装备强化
                "ccbResources/battle_ui/LoseAnalyse//WordEquipForge.png", // --装备锻造
                "ccbResources/battle_ui/LoseAnalyse//WordEquipCarve.png", // --装备刻印
                "ccbResources/battle_ui/LoseAnalyse//WordAdviser.png", // --培养军师
            ],
        },


        // --强化
        UIConfig_Strengthen: {

        },


        // --任务
        UIConfig_Task: {
            starOff: "ui_license_IconHunterStarDis_png",
            starOn: "ui_license_IconHunterStarNor_png",
            star: "ui_license_IconHunterStarSel_png",
            starG: "ui_hunter_evaluate_IconCardBigStar_png",

            // --getAward :"ui_license_WordsGetAward_png",
            ActivityType: {
                Typeing: "ui_license_WordsLevelStarOn_png",
                Typeed: "ui_license_WordsLevelStarOk_png",
            },
            titleEH: {
                [1]: "ui_license_WordsExamination_png",
                [2]: "ui_license_high_WordsHighLiscenseExamination_png",
            },


            num: {
                [1]: "ui_license_WordsLicenseTitleNum1_png",
                [2]: "ui_license_WordsLicenseTitleNum2_png",
                [3]: "ui_license_WordsLicenseTitleNum3_png",
                [4]: "ui_license_WordsLicenseTitleNum4_png",
                [5]: "ui_license_WordsLicenseTitleNum5_png",
                [6]: "ui_license_WordsLicenseTitleNum6_png",
                [7]: "ui_license_WordsLicenseTitleNum7_png",
            },

            Highnum: {
                [1]: "ui_license_WordsHighLicenseTitleNum1_png",
                [2]: "ui_license_WordsHighLicenseTitleNum2_png",
                [3]: "ui_license_WordsHighLicenseTitleNum3_png",
                [4]: "ui_license_WordsHighLicenseTitleNum4_png",
                [5]: "ui_license_WordsHighLicenseTitleNum5_png",
                [6]: "ui_license_WordsHighLicenseTitleNum6_png",
                [7]: "ui_license_WordsHighLicenseTitleNum7_png",
            },

            Title: {
                [1]: "ui_license_examination_WordsTitle1_png",
                [2]: "ui_license_examination_WordsTitle2_png",
                [3]: "ui_license_examination_WordsTitle3_png",
                [4]: "ui_license_examination_WordsTitle4_png",
                [5]: "ui_license_examination_WordsTitle5_png",
                [6]: "ui_license_examination_WordsTitle6_png",
                [7]: "ui_license_examination_WordsTitle7_png",
                [8]: "ui_license_examination_WordsTitle8_png",
                [9]: "ui_license_examination_WordsTitle9_png",
                [10]: "ui_license_examination_WordsTitle10_png",
                [11]: "ui_license_examination_WordsTitle11_png",
                [12]: "ui_license_examination_WordsTitle12_png",
                [0]: "ui_license_examination_WordsTitle0_png",
            },

            board: {
                [1]: "ui_mainui_BoardHunterLicenseLevel_png",
                [2]: "ui_mainui_BoardHunterLicenseLevelA_png",
                [3]: "ui_mainui_BoardHighLicenseLevel_png",
            },

            IconTitle: {
                [0]: "ui_license_examination_IconBoardTitle0_png",
                [1]: "ui_license_examination_IconBoardTitle2_png",
                [2]: "ui_license_examination_IconBoardTitle2_png",
                [3]: "ui_license_examination_IconBoardTitle3_png",
                [4]: "ui_license_examination_IconBoardTitle4_png",
                [5]: "ui_license_examination_IconBoardTitle5_png",
                [6]: "ui_license_examination_IconBoardTitle6_png",
                [7]: "ui_license_examination_IconBoardTitle7_png",

            },

            borad: "ui_license_BardInput_png",

            IconExamination: {
                [1]: "ui_license_examination_IconExaminationTip2_png",
                [2]: "ui_license_examination_IconExaminationTip1_png",
                [3]: "ui_license_examination_IconExaminationTip5_png",
                [4]: "ui_license_examination_IconExaminationTip6_png",
                [6]: "ui_license_examination_IconExaminationTip3_png",
                [5]: "ui_license_examination_IconExaminationTip4_png",
            },

            UpStar: {
                [1]: "ui_license_examination_IconExaminationTip2_png",
                [4]: "ui_license_examination_IconExaminationTip1_png",
                [2]: "ui_license_examination_IconExaminationTip5_png",
                [5]: "ui_license_examination_IconExaminationTip6_png",
                [3]: "ui_license_examination_IconExaminationTip3_png",
                [6]: "ui_license_examination_IconExaminationTip4_png",
            },

            UpStarName: {

                [1]: "ccbResources/common_ui/HXH_License/WordsUpName2.png",// --角色等级
                [2]: "ccbResources/common_ui/HXH_License/WordsUpName4.png", // --地图探索
                [3]: "ccbResources/common_ui/HXH_License/WordsUpName5.png", // --流星街
                [4]: "ccbResources/common_ui/HXH_License/WordsUpName1.png", // --天空竞技场
                // --[5]  : "ccbResources/common_ui/HXH_License/WordsUpName1.png", // --天空竞技场
                // --[6]  : "ccbResources/common_ui/HXH_License/WordsUpName3.png", // --格斗

            },

            Examination: {
                [1]: "ui_license_examination_WordsExaminationName1_png",
                [2]: "ui_license_examination_WordsExaminationName2_png",
                [3]: "ui_license_examination_WordsExaminationName4_png",
                [4]: "ui_license_examination_WordsExaminationName3_png",

            },
            ExaminationHigh: {
                [1]: "ui_license_examination_WordsExaminationName1_png",
                [2]: "ui_examination_WordsExaminationName5_png",
                [3]: "ui_license_examination_WordsExaminationName4_png",
                [4]: "ui_license_examination_WordsExaminationName3_png",

            },

            Map: {
                [1]: "ui_license_OrnMapSmall1_png",
                [2]: "ui_license_OrnMapSmall4_png",
                [3]: "ui_license_OrnMapSmall2_png",
                [4]: "ui_license_OrnMapSmall3_png",

            },
            HighMap: {
                [1]: "ui_license_OrnMapSmall1_png",
                [2]: "ui_license_OrnMapSmall5_png",
                [3]: "ui_license_OrnMapSmall2_png",
                [4]: "ui_license_OrnMapSmall3_png",
            },

            types: {

                [1]: "ccbResources/common_ui/HXH_License/WordsUpName2.png",
                [2]: "ccbResources/common_ui/HXH_License/WordsUpName1.png",
                [3]: "ccbResources/common_ui/HXH_License/WordsUpName6.png",
                [4]: "ccbResources/common_ui/HXH_License/WordsUpName3.png",
                [5]: "ccbResources/common_ui/HXH_License/WordsUpName5.png",
                [6]: "ccbResources/common_ui/HXH_License/WordsUpName4.png",
                // --[7]  : "ccbResources/common_ui/HXH_License/WordsUpName7.png",  

            },

            Level: {
                [1]: "ui_license_WordsUpNameLevelNum1_png",
                [2]: "ui_license_WordsUpNameLevelNum2_png",
                [3]: "ui_license_WordsUpNameLevelNum3_png",
                [4]: "ui_license_WordsUpNameLevelNum4_png",
                [5]: "ui_license_WordsUpNameLevelNum5_png",
                [6]: "ui_license_WordsUpNameLevelNum6_png",
                [7]: "ui_license_WordsUpNameLevelNum7_png",
            },

            buttonAward: {
                nor: "ui_license_ButtonGetAwardNor_png",
                sel: "ui_license_ButtonGetAwardSel_png",

            },

            buttonFinish: {
                nor: "ui_license_ButtonGoFinishNor_png",
                sel: "ui_license_ButtonGoFinishSel_png",
            },

            buttons: {
                nor: "ccbResources/common_ui/Daily/ButtonDoneNor.png",
            },

            awardState: {
                nor: "ui_license_WordsDontActivition_png",// --未达成
                getAward: "ui_license_WordsGetAward_png", // --已领奖

            },

            buttonStar: {
                nor: "ui_license_ButtonHunterStarOpneNor_png",
                sel: "ui_license_ButtonHunterStarOpneSel_png",
                dis: "ui_license_ButtonHunterStarOpneDis_png",
            },

            buttonStated: {
                dis: "ui_license_ButtonHunterStarOpneDis_png",
                sel: "ui_license_ButtonHunterStarOpneSel_png",
                nor: "ui_license_ButtonHunterStarOpneNor_png",
            },

            buttonState: {
                awarded: "ui_license_ButtonLevelStarGetNow_png",
                GetAwardNormal: "ui_license_ButtonLevelStarGetNor_png",
                GetAwardSel: "ui_license_ButtonLevelStarGetSel_png",
                NoLock: "ui_license_ButtonLevelStarGoDis_png",
                GoFinishNor: "ui_license_ButtonLevelStarGoNor_png",
                GoFinishSel: "ui_license_ButtonLevelStarGoSel_png",
                ButtonExamNor: "ui_license_ButtonHunterExaminationNor_png",
                ButtonExamSel: "ui_license_ButtonHunterExaminationSel_png",
            },

            titleName: {

                [1]: "ui_license_WordsPopName2_png",
                [2]: "ui_license_WordsPopName1_png",
                [3]: "ui_license_WordsPopName5_png",
                [4]: "ui_license_WordsPopName6_png",
                [5]: "ui_license_WordsPopName4_png",
                [6]: "ui_license_WordsPopName3_png",
            },

            buttonNum: {

                [1]: "ui_license_ButtonHunterLiscense1Nor_png",
                [2]: "ui_license_ButtonHunterLiscense2Nor_png",
                [3]: "ui_license_ButtonHunterLiscense3Nor_png",
                [4]: "ui_license_ButtonHunterLiscense4Nor_png",
                [5]: "ui_license_ButtonHunterLiscense5Nor_png",
                [6]: "ui_license_ButtonHunterLiscense6Nor_png",
                [7]: "ui_license_ButtonHunterLiscense7Nor_png",
            },

            buttonHighNum: {
                [1]: "ui_license_high_ButtonHighLiscense1Nor_png",
                [2]: "ui_license_high_ButtonHighLiscense2Nor_png",
                [3]: "ui_license_high_ButtonHighLiscense3Nor_png",
                [4]: "ui_license_high_ButtonHighLiscense4Nor_png",
                [5]: "ui_license_high_ButtonHighLiscense5Nor_png",
                [6]: "ui_license_high_ButtonHighLiscense6Nor_png",
                [7]: "ui_license_high_ButtonHighLiscense7Nor_png",
            },

            buttonLock: {

                [1]: "ui_license_ButtonHunterLiscense1Dis_png",
                [2]: "ui_license_ButtonHunterLiscense2Dis_png",
                [3]: "ui_license_ButtonHunterLiscense3Dis_png",
                [4]: "ui_license_ButtonHunterLiscense4Dis_png",
                [5]: "ui_license_ButtonHunterLiscense5Dis_png",
                [6]: "ui_license_ButtonHunterLiscense6Dis_png",
                [7]: "ui_license_ButtonHunterLiscense7Dis_png",
            },
            buttonHighLock: {
                [1]: "ui_license_high_ButtonHighLiscense1Dis_png",
                [2]: "ui_license_high_ButtonHighLiscense2Dis_png",
                [3]: "ui_license_high_ButtonHighLiscense3Dis_png",
                [4]: "ui_license_high_ButtonHighLiscense4Dis_png",
                [5]: "ui_license_high_ButtonHighLiscense5Dis_png",
                [6]: "ui_license_high_ButtonHighLiscense6Dis_png",
                [7]: "ui_license_high_ButtonHighLiscense7Dis_png",
            },

            buttonSel: {
                [1]: "ui_license_ButtonHunterLiscense1Sel_png",
                [2]: "ui_license_ButtonHunterLiscense2Sel_png",
                [3]: "ui_license_ButtonHunterLiscense3Sel_png",
                [4]: "ui_license_ButtonHunterLiscense4Sel_png",
                [5]: "ui_license_ButtonHunterLiscense5Sel_png",
                [6]: "ui_license_ButtonHunterLiscense6Sel_png",
                [7]: "ui_license_ButtonHunterLiscense7Sel_png",
            },

            buttonHighSel: {

                [1]: "ui_license_high_ButtonHighLiscense1Sel_png",
                [2]: "ui_license_high_ButtonHighLiscense2Sel_png",
                [3]: "ui_license_high_ButtonHighLiscense3Sel_png",
                [4]: "ui_license_high_ButtonHighLiscense4Sel_png",
                [5]: "ui_license_high_ButtonHighLiscense5Sel_png",
                [6]: "ui_license_high_ButtonHighLiscense6Sel_png",
                [7]: "ui_license_high_ButtonHighLiscense7Sel_png",
            },

            buttonDis: {
                [1]: "ui_license_ButtonHunterLiscense1DisSel_png",
                [2]: "ui_license_ButtonHunterLiscense2DisSel_png",
                [3]: "ui_license_ButtonHunterLiscense3DisSel_png",
                [4]: "ui_license_ButtonHunterLiscense4DisSel_png",
                [5]: "ui_license_ButtonHunterLiscense5DisSel_png",
                [6]: "ui_license_ButtonHunterLiscense6DisSel_png",
                [7]: "ui_license_ButtonHunterLiscense7DisSel_png",
            },

            buttonHighDis: {
                [1]: "ui_license_high_ButtonHighLiscense1DisSel_png",
                [2]: "ui_license_high_ButtonHighLiscense2DisSel_png",
                [3]: "ui_license_high_ButtonHighLiscense3DisSel_png",
                [4]: "ui_license_high_ButtonHighLiscense4DisSel_png",
                [5]: "ui_license_high_ButtonHighLiscense5DisSel_png",
                [6]: "ui_license_high_ButtonHighLiscense6DisSel_png",
                [7]: "ui_license_high_ButtonHighLiscense7DisSel_png",
            },
            highStar: "ui_acitivity_wish_IconStar_png",
            highStarSmall: "ui_license_high_IconStar2_png",
        },


        // --联盟
        UIConfig_Union: {
            garState: {
                [1]: [
                    "ui_union_battle_garrison1_png",
                    "ui_union_battle_garrison2_png",
                    "ui_union_battle_garrison3_png",
                ],
                [2]: [
                    "ui_union_battle_Disarm1_png",
                    "ui_union_battle_Disarm2_png",
                    "ui_union_battle_Disarm2_png",
                ],
            },
            airShipTitle: [
                "ui_union_battle_WordsFlyShip3_png",
                "ui_union_battle_WordsFlyShip21_png",
                "ui_union_battle_WordsFlyShip22_png",
                "ui_union_battle_WordsFlyShip11_png",
                "ui_union_battle_WordsFlyShip12_png",
            ],

            star: [
                "ui_union_battle_star_png",
                "ui_union_battle_starGray_png",
            ],
            main: {
                curBookmark: "ui_union_battle_curBookmark_png",
                Bookmark: "ui_union_battle_Bookmark_png",
                BattleHoloInfoBboard: "ui_union_battle_BattleHoloInfoBboard_png",
                HoloInfoBboard: "ui_union_battle_unionInfoBG_png",
                bigAirshipPic: "ui_union_battle_bigAirshipPic_png",
                bigAirshipSelect: "ui_union_battle_bigAirshipSelect_png",
                AirshipPic: "ui_union_battle_AirshipPic_png",
                AirshipSelect: "ui_union_battle_AirshipSelect_png",
                smallAirshipPic: "ui_union_battle_smallAirshipPic_png",
                smallAirshipSelect: "ui_union_battle_smallAirshipSelect_png",
                VS_draw: "ui_union_battle_draw_png",
                VS_enemyWin: "ui_union_battle_enemyWin_png",
                VS_ourWin: "ui_union_battle_ourWin_png",
                airship1_1: "ui_union_battle_airshipPic3_png",
                airship1_2: "ui_union_battle_airshipPic4_png",
                airship2_1: "ui_union_battle_airshipPic7_png",
                airship2_2: "ui_union_battle_airshipPic8_png",
                airship3_1: "ui_union_battle_airshipPic1_png",
                airship3_2: "ui_union_battle_airshipPic2_png",
                airship4_1: "ui_union_battle_airshipPic9_png",
                airship4_2: "ui_union_battle_airshipPic10_png",
                airship5_1: "ui_union_battle_airshipPic5_png",
                airship5_2: "ui_union_battle_airshipPic6_png",
                segmentIcon_1: "ui_union_battle_rewardSegment1_png",
                segmentIcon_2: "ui_union_battle_rewardSegment2_1_png",
                segmentIcon_3: "ui_union_battle_rewardSegment2_2_png",
                segmentIcon_4: "ui_union_battle_rewardSegment3_1_png",
                segmentIcon_5: "ui_union_battle_rewardSegment3_2_png",
                segmentIcon_6: "ui_union_battle_rewardSegment4_1_png",
                segmentIcon_7: "ui_union_battle_rewardSegment4_2_png",
                segmentIcon_8: "ui_union_battle_rewardSegment4_3_png",
                segmentIcon_9: "ui_union_battle_SupremeSegment_png",
            },
            segmentLogo: [
                "ui_union_battle_segmentLogo1_1_png",
                "ui_union_battle_segmentLogo2_1_png",
                "ui_union_battle_segmentLogo2_2_png",
                "ui_union_battle_segmentLogo3_1_png",
                "ui_union_battle_segmentLogo3_2_png",
                "ui_union_battle_segmentLogo4_1_png",
                "ui_union_battle_segmentLogo4_2_png",
                "ui_union_battle_segmentLogo4_3_png",
                "ui_union_battle_segmentLogo5_1_png",
            ],
            segmentLogoText: [
                "ui_union_battle_segment1_1_png",
                "ui_union_battle_segment2_1_png",
                "ui_union_battle_segment2_2_png",
                "ui_union_battle_segment3_1_png",
                "ui_union_battle_segment3_2_png",
                "ui_union_battle_segment4_1_png",
                "ui_union_battle_segment4_2_png",
                "ui_union_battle_segment4_3_png",
                "ui_union_battle_segment5_1_png",
            ],
            segmentStar: [
                "ui_union_battle_star11_png",
                "ui_union_battle_star21_png",
                "ui_union_battle_star22_png",
                "ui_union_battle_star31_png",
                "ui_union_battle_star32_png",
                "ui_union_battle_star41_png",
                "ui_union_battle_star42_png",
                "ui_union_battle_star43_png",
                "ui_union_battle_star51_png",
            ],
            battle_evaluation: {
                [0]: "ui_union_battle_win2_png",
                [1]: "ui_union_battle_win1_png",
                [2]: "ui_union_battle_win_png",
                [3]: "ui_union_battle_win3_png",
                [4]: "ui_union_battle_win2_png",
                [5]: "ui_union_battle_lose1_png",
                [6]: "ui_union_battle_lose_png",
                [7]: "ui_union_battle_lose3_png",
                [8]: "ui_union_battle_lose2_png",
            },
            infoPanel: {
                [1]: "ui_union_battle_InfoPanelMyUnion_png",
                [2]: "ui_union_battle_server_2_png",
                [3]: "ui_union_battle_Segment_3_png",
                [4]: "ui_union_battle_rankScore_3_png",
                [5]: "ui_union_battle_thisServiceRank4_png",

                [6]: "ui_union_battle_InfoPanelEnumyUnion_png",
                [7]: "ui_union_battle_server_2_png",
                [8]: "ui_union_battle_Segment_2_png",
                [9]: "ui_union_battle_rankScore_2_png",
                [10]: "ui_union_battle_thisServiceRank3_png",
            },
        },


        // --社交
        UIConfig_Social: {

        },

        // --天梯
        UIConfig_Tower: {
            boxClose1: "ui_skyarean_IconBoxClose_png",
            boxOpen1: "ui_skyarean_IconBoxOpen_png",
            boxClose2: "ui_skyarean_IconGoldBoxClose_png",
            boxOpen2: "ui_skyarean_IconGoldBoxOpen_png",
            boxCloseBoss: "ui_skyarean_IconGoldBoxClose_png",
            boxOpenBoss: "ui_skyarean_IconGoldBoxOpen_png",
            step: "ccbResources/common_ui/Tower/TowerNormalStep.png",
            stepBoss: "ccbResources/common_ui/Tower/TowerSeniorStep.png",
            auto: "ui_battle_ButtonAutoSel_png",
            manual: "ui_battle_ButtonAutoNor_png",
            hasChallenage: "ui_skyarean_WordsTipOpen_png",
            TopFloor: {
                [1]: "ui_skyarean_ButtonChangeDis_png",
                [2]: "ui_skyarean_ButtonChangeDis_png",
                [3]: "ui_skyarean_ButtonChangeDis_png",
            },
            ResetEnable: {
                [1]: "ui_skyarean_ButtonGoLayerNor_png",
                [2]: "ui_skyarean_ButtonGoLayerSel_png",
                [3]: "ui_skyarean_ButtonGoLayerSel_png",
            },
            ChallengeEnable: {
                [1]: "ui_common_ButtonChangeNor_png",
                [2]: "ui_common_ButtonChangeSel_png",
                [3]: "ui_skyarean_ButtonChangeDisB_png",
            },
            FloorState1: {
                [1]: "ui_skyarean_ButtonListSel_png",
                [2]: "ui_skyarean_ButtonListSel_png",
                [3]: "ui_skyarean_ButtonListSel_png",
            },
            FloorState2: {
                [1]: "ui_skyarean_ButtonListDis_png",
                [2]: "ui_skyarean_ButtonListDis_png",
                [3]: "ui_skyarean_ButtonListDis_png",
            },
            FloorState11: {
                [1]: "ui_skyarean_ButtonListNorB_png",
                [2]: "ui_skyarean_ButtonListNorB_png",
                [3]: "ui_skyarean_ButtonListNorB_png",
            },
            FloorState12: {
                [1]: "ui_skyarean_ButtonListDisB_png",
                [2]: "ui_skyarean_ButtonListDisB_png",
                [3]: "ui_skyarean_ButtonListDisB_png",
            },
            FloorSix1: {
                [1]: "ui_skyarean_ButtonLayerNor_png",
                [2]: "ui_skyarean_ButtonLayerNor_png",
                [3]: "ui_skyarean_ButtonLayerNor_png",
            },
            FloorSix2: {
                [1]: "ui_skyarean_ButtonLayerSel_png",
                [2]: "ui_skyarean_ButtonLayerSel_png",
                [3]: "ui_skyarean_ButtonLayerSel_png",
            },
            FloorSix11: {
                [1]: "ui_skyarean_ButtonLayerNorB_png",
                [2]: "ui_skyarean_ButtonLayerNorB_png",
                [3]: "ui_skyarean_ButtonLayerNorB_png",
            },
            FloorSix12: {
                [1]: "ui_skyarean_ButtonLayerSelB_png",
                [2]: "ui_skyarean_ButtonLayerSelB_png",
                [3]: "ui_skyarean_ButtonLayerSelB_png",
            },
            // --大背景
            backBoard: [
                "ui_skyarean_LayerBgFirst_png",
                "ui_skyarean_LayerBgFirstHigh_png",
            ],
            // --小背景
            board: [
                "ui_skyarean_LayerBg_png",
                "ui_skyarean_LayerBgHigh_png",
            ],
            // --排行标题
            rankTitle: {
                [7]: "ui_skyarean_WordsSkyRankTipLow_png",
                [10]: "ui_skyarean_WordsSkyRankTipHigh_png",
            },
        },


        // --抽奖
        UIConfig_Lucky: {

        },


        // --vip
        UIConfig_VIP: {

            logo: [
                "ccbResources/common_ui/VipCharge/IconRecommend.png",
                "ccbResources/common_ui/VipCharge/IconDouble.png",
                "ui_other_Nothing_png",
            ],

            defaultIcon: "ccbResources/common_ui/VipCharge/VipChargeIcon8.png",

            chargeType: {
                [1]: {
                    [1]: "ui_mall_ButtonMallChargeNor_png",
                    [2]: "ui_mall_ButtonMallChargeSel_png",
                    [3]: "ui_mall_ButtonMallChargeSel_png",
                },
                [2]: {
                    [1]: "ui_mall_new_ButtonJueBanNor_png",
                    [2]: "ui_mall_new_ButtonJueBanSel_png",
                    [3]: "ui_mall_new_ButtonJueBanSel_png",
                },
                [3]: {
                    [1]: "ui_mall_new_ButtonChaoZhiNor_png",
                    [2]: "ui_mall_new_ButtonChaoZhiSel_png",
                    [3]: "ui_mall_new_ButtonChaoZhiSel_png",
                },
                [4]: {
                    [1]: "ui_mall_new_ButtonZuanShiNor_png",
                    [2]: "ui_mall_new_ButtonZuanShiSel_png",
                    [3]: "ui_mall_new_ButtonZuanShiSel_png",
                },

                [5]: {
                    [1]: "ui_mall_ButtonVipGiftNor_png",
                    [2]: "ui_mall_ButtonVipGiftSel_png",
                    [3]: "ui_mall_ButtonVipGiftSel_png",
                },
            },
        },


        // --聊天
        UIConfig_Chat: {

        },


        UIConfig_League: {
            official: [
                "ui_union_IconLeagueSecond_png",
                "ui_union_IconLeagueSecond_png",
                "ui_union_IconLeagueFirst_png",
            ],
            donate: [
                "ui_iconresources_jinbi3_png",
                "ui_iconresources_zuanshi3_png",
            ],
            donateNmae: [
                "ui_union_WordsConsturction1_png",
                "ui_union_WordsConsturction2_png",
                "ui_union_WordsConsturction3_png",
            ],
            donateIcon: [
                "ui_union_IconConsturction1_png",
                "ui_union_IconConsturction2_png",
                "ui_union_IconConsturction3_png",
            ],
            growBMFont: "ccbResources/picfont/GrowNum.fnt",
            bloodBMFont: "Zhanli_fnt",

            BattleBarLeft: "ui_wonderland_BurHunterBloodSmall_png",
            BattleBarRight: "ui_wonderland_BurHunterBloodSmall_png",

            WarResultWin: "ui_wonderland_WordsPkSuccess_png",
            WarResultLose: "ui_wonderland_WordsPkLose_png",

            WarBoardResultWin: "ui_wonderland_BoardPkSuccess_png",
            WarBoardResultLose: "ui_wonderland_BoardPkLose_png",

            WarBigResultWin: "ui_wonderland_BoardPkSuccess_png",
            WarBigResultLose: "ui_wonderland_BoardPkLose_png",

            WarWinGetFoods: "ui_wonderland_WordsBattleGet_png",
            WarWinLoseFoods: "ui_wonderland_WordsBattleLose_png",

            // --WarBlueMine : "ccbResources/common_ui/League/War/WordMineB.png",
            // --WarRedMine : "ccbResources/common_ui/League/War/WordMineA.png",
            // --WarBlueEnemy : "ccbResources/common_ui/League/War/WordEnemyB.png",
            // --WarRedEnemy : "ccbResources/common_ui/League/War/WordEnemyA.png",

            instanceRank: [
                "ccbResources/common_ui/League/WordOne.png",
                "ccbResources/common_ui/League/WordTow.png",
                "ccbResources/common_ui/League/WordThree.png",
                "ccbResources/common_ui/League/WordFour.png",
                "ccbResources/common_ui/League/WordFive.png",
                "ccbResources/common_ui/League/WordSix.png",
                "ccbResources/common_ui/League/WordSeven.png",
                "ccbResources/common_ui/League/WordEight.png",
                "ccbResources/common_ui/League/WordNine.png",
                "ccbResources/common_ui/League/WordTen.png",
            ],

            instanceType: {
                [0]: "ccbResources/common_ui/League/WordsOrdinaryDifficulty.png",
                [1]: "ccbResources/common_ui/League/WordsEliteDifficulty.png",
            },

            logTypeTitle: [
                "ui_union_WordsTipUnionLog_png",
                "ui_union_WordsTipUnionLog_png",
                "ui_union_WordsTipUnionLogB_png",
                "ui_union_WordsTipUnionLog_png",
            ],

            LeagueHomeButton: {
                [1]: [
                    "ccbResources/common_ui/League/ButtonEnterBattleNor.png",
                    "ccbResources/common_ui/League/ButtonEnterBattleSel.png",
                ],
                [2]: [
                    "ccbResources/common_ui/League/ButtonFishGetSel.png",
                    "ccbResources/common_ui/League/ButtonFishGetNor.png",
                ],
                [3]: [
                    "ccbResources/common_ui/League/War/ButtonWarBangzhanNor.png",
                    "ccbResources/common_ui/League/War/ButtonWarBangzhanSel.png",
                ],
            },
            LeagueHomeButtonText: [
                "ccbResources/common_ui/League/WordBattleB.png",
                "ccbResources/common_ui/League/WordQudiaoyu.png",
                "ccbResources/common_ui/League/War/WordWarBanghuizhanB.png",
            ],

            boxSilver: [
                "ccbResources/common_ui/InstanceChapter/IconBoxAClose.png",
                "ccbResources/common_ui/InstanceChapter/IconBoxAHalfOpen.png",
                "ccbResources/common_ui/InstanceChapter/IconBoxAOpen.png",
            ],
            boxGold: [
                "ccbResources/common_ui/InstanceChapter/IconBoxBClose.png",
                "ccbResources/common_ui/InstanceChapter/IconBoxBHalfOpen.png",
                "ccbResources/common_ui/InstanceChapter/IconBoxBOpen.png",
            ],

            wordsInput: [
                "ui_union_WordsInputUnionAnnouncementB_png",// --公告
                "ui_union_WordsInputUnionAnnouncement_png", // --宣传语
            ],

            leagueInstanceLock: "ui_union_instance_bossimage_IconBossImage0_png",

            leagueInstanceName: {
                [1]: "ui_union_instance_bossname_WordsBoss1_png",
                [2]: "ui_union_instance_bossname_WordsBoss2_png",
                [3]: "ui_union_instance_bossname_WordsBoss3_png",
                [4]: "ui_union_instance_bossname_WordsBoss4_png",
                [5]: "ui_union_instance_bossname_WordsBoss5_png",
                [6]: "ui_union_instance_bossname_WordsBoss6_png",
                [7]: "ui_union_instance_bossname_WordsBoss7_png",
            },
            leagueAddFood: {
                [0]: "ui_union_boss_OrnGoodFoodA_png",
                [1]: "ui_union_boss_OrnGoodFoodB_png",
            },

            leaguMatchProgress: [
                "ui_union_battle_BoardExpAddFloor_png",
                "ui_union_battle_BoardExpFullFloor_png",
            ],
            leaguMatchProgress2: "ui_union_battle_memberPro1_png",
        },


        UIConfig_WonderBoss: {
            enterWar: {
                [1]: "ui_wonderland_boss_ButtonEnterBossNor_png",
                [2]: "ui_wonderland_boss_ButtonEnterBossSel_png",
                [3]: "ui_wonderland_boss_ButtonEnterBossDis_png",
            },
            enterWars: {
                [1]: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonEnterBossNor.png",
                [2]: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonEnterBossSel.png",
                [3]: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonEnterBossNor.png",
                [4]: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonEnterBossDis.png",
            },
            buttonRank: {
                selOn: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonTopHitRankSel1.png",
                selDown: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonTopHitRankSel2.png",
                norOn: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonTopHitRankNor1.png",
                norDown: "ccbResources/common_ui/HXH_Acitivity/Activity_Boss/ButtonTopHitRankNor2.png",
            },
        },


        UIConfig_WonderRunes: {
            starOn: "ccbResources/common_ui/Zork/Icon/IconLong1.png",
            starOff: "ccbResources/common_ui/Zork/Icon/IconFeng1.png",
            MoraBigIcon: {
                [1]: "ui_mora_IconMora1_png",
                [2]: "ui_mora_IconMora2_png",
                [3]: "ccbResources/common_ui/HXH_Mora/IconMora13.png",
            },

            MoraSmallIcon: {
                [1]: "ui_mora_IconMoraSmall1_png",
                [2]: "ui_mora_IconMoraSmall2_png",
                [3]: "ui_mora_IconMoraSmall3_png",
            },

            numberPath: {
                [0]: "ui_mora_WordsMoraPlayerId1_png",
                [1]: "ui_mora_WordsMoraPlayerId2_png",
                [2]: "ui_mora_WordsMoraPlayerId3_png",
                [3]: "ui_mora_WordsMoraPlayerId4_png",
                [4]: "ui_mora_WordsMoraPlayerId5_png",
                [5]: "ui_mora_WordsMoraPlayerId6_png",
                [6]: "ui_mora_WordsMoraPlayerId7_png",
            },

            winOrLose: {
                [1]: "ui_mora_WordsWoraWin_png",
                [2]: "ui_mora_WordsWoraLose_png",
            },
            changeCharm: {
                [1]: {
                    [1]: "ui_mora_ButtonMoraAgainNor_png",
                    [2]: "ui_mora_ButtonMoraAgainSel_png",
                    [3]: "ui_mora_ButtonMoraAgainSel_png",
                },
                [2]: {
                    [1]: "ui_mora_ButtonMoraAgainDis_png",
                    [2]: "ui_mora_ButtonMoraAgainDis_png",
                    [3]: "ui_mora_ButtonMoraAgainDis_png",
                },
            },
            charmLevel: {
                [1]: "ccbResources/common_ui/Zork/Icon/IconJin1.png",
                [2]: "ccbResources/common_ui/Zork/Icon/IconHuo1.png",
                [3]: "ccbResources/common_ui/Zork/Icon/IconMu1.png",
                [4]: "ccbResources/common_ui/Zork/Icon/IconShui1.png",
                [5]: "ccbResources/common_ui/Zork/Icon/IconTu1.png",
                [6]: "ccbResources/common_ui/Zork/Icon/IconLong1.png",
            },
        },


        UIConfig_ButtonList: {
            league: {
                nor: [
                    "ccbResources/common_ui/League/ButtonLeagueDonateNor.png",
                    "ccbResources/common_ui/League/ButtonLeagueMallNor.png",
                    // -- "ccbResources/common_ui/League/ButtonLeagueSkillNor.png",
                    "ccbResources/common_ui/League/ButtonManageNor.png",
                    "ui_battle_ButtonExitNor_png",
                ],
                sel: [
                    "ccbResources/common_ui/League/ButtonLeagueDonateSel.png",
                    "ccbResources/common_ui/League/ButtonLeagueMallSel.png",
                    // -- "ccbResources/common_ui/League/ButtonLeagueSkillSel.png",
                    "ccbResources/common_ui/League/ButtonManageSel.png",
                    "ui_battle_ButtonExitSel_png",
                ],
            },
        },


        UIConfig_Mine: {
            digBtn: {
                normal: {
                    [1]: "ccbResources/common_ui/Mine/ButtonDigWineNor.png",
                    [2]: "ccbResources/common_ui/Mine/ButtonDigCopperNor.png",
                    [3]: "ccbResources/common_ui/Mine/ButtonDigSilverNor.png",
                },
                highlight: {
                    [1]: "ccbResources/common_ui/Mine/ButtonDigWineSel.png",
                    [2]: "ccbResources/common_ui/Mine/ButtonDigCopperSel.png",
                    [3]: "ccbResources/common_ui/Mine/ButtonDigSilverSel.png",
                },
            },
            shovel: {
                [1]: "ccbResources/common_ui/Mine/IconStoneMine.png",
                [2]: "ccbResources/common_ui/Mine/IconCopperMine.png",
                [3]: "ccbResources/common_ui/Mine/IconSilverMine.png",
            },
            mineWord: {
                [1]: "ccbResources/common_ui/Mine/WordShikuang.png",
                [2]: "ccbResources/common_ui/Mine/WordTongkuang.png",
                [3]: "ccbResources/common_ui/Mine/WordYinkuang.png",
                [4]: "ccbResources/common_ui/Mine/WordJinkuang.png",
            },
            formatOnuse: "ccbResources/common_ui/Mine/WordZhengzaishiyong.png",
            digTip: {
                [25]: "ccbResources/common_ui/Mine/Word125.png",
                [50]: "ccbResources/common_ui/Mine/Word150.png",
            }
        },


        UIConfig_Train: {
            titleReward: "ccbResources/common_ui/Train/TitleTip1.png",
        },


        UIConfig_Replay: {
            win: "ccbResources/common_ui/Words/Sheng.png",
            fail: "ccbResources/common_ui/Words/Fu.png",
        },


        UIConfig_Wanted: {
            map: {
                [1]: "ui_meteor_WordsInstanceBg1_png",
                [2]: "ui_meteor_WordsInstanceBg2_png",
                [3]: "ui_meteor_WordsInstanceBg3_png",
            },
            newBoard: {
                [1]: "ui_meteor_BoardBossInfo_png",
                [2]: "ui_meteor_BoardBossInfo2_png"
            },
            number: {
                [1]: "ui_meteor_WordsLevelNum1_png",
                [2]: "ui_meteor_WordsLevelNum1_png",
                [3]: "ui_meteor_WordsLevelNum1_png",
                [4]: "ui_meteor_WordsLevelNum1_png",
                [5]: "ui_meteor_WordsLevelNum1_png",
                [6]: "ui_meteor_WordsLevelNum1_png",
                [7]: "ui_meteor_WordsLevelNum1_png",
                [8]: "ui_meteor_WordsLevelNum1_png",
                [9]: "ui_meteor_WordsLevelNum1_png",
                [10]: "ui_meteor_WordsLevelNum1_png",
                [11]: "ui_meteor_WordsLevelNum1_png",
                [12]: "ui_meteor_WordsLevelNum1_png",
                [13]: "ui_meteor_WordsLevelNum1_png",
                [14]: "ui_meteor_WordsLevelNum1_png",
                [15]: "ui_meteor_WordsLevelNum1_png",
            },
            FloorState1: {
                [1]: "ui_meteor_ButtonInstanceNor_png",
                [2]: "ui_meteor_ButtonInstanceNor_png",
                [3]: "ui_meteor_ButtonInstanceNor_png",
            },
            FloorState2: {
                [1]: "ui_meteor_ButtonInstanceSel_png",
                [2]: "ui_meteor_ButtonInstanceSel_png",
                [3]: "ui_meteor_ButtonInstanceSel_png",
            },
            FloorState3: {
                [1]: "ui_meteor_ButtonInstanceDis_png",
                [2]: "ui_meteor_ButtonInstanceDis_png",
                [3]: "ui_meteor_ButtonInstanceDis_png",
            },
            topName: {
                [1]: "ui_meteor_WordsInstanceName1_png",
                [2]: "ui_meteor_WordsInstanceName2_png",
                [3]: "ui_meteor_WordsInstanceName3_png",
            },
            topName2: {
                [1]: "ui_meteor_WordsName1_png",
                [2]: "ui_meteor_WordsName2_png",
                [3]: "ui_meteor_WordsName3_png",
            },
            topName3: {
                [1]: "ui_meteor_BoardTopbg_png",
                [2]: "ui_meteor_BoardTopbg1_png",
                [3]: "ui_meteor_BoardTopbg2_png",
            },
            isWin: {
                [1]: "",
                [2]: "zhuangtai1_png",
                [3]: "zhuangtai2_png"
            },
            number2: [
                "ui_meteor_BoardLevelNum_png",
                "ui_meteor_BoardLevelNum2_png",
                "ui_meteor_BoardLevelNum3_png",
                "ui_meteor_BoardLevelNum4_png",
                "ui_meteor_BoardLevelNum5_png",
                "ui_meteor_BoardLevelNum6_png",
                "ui_meteor_BoardLevelNum7_png",
                "ui_meteor_BoardLevelNum8_png",
                "ui_meteor_BoardLevelNum9_png",
                "ui_meteor_BoardLevelNum10_png",
                "ui_meteor_BoardLevelNum11_png",
                "ui_meteor_BoardLevelNum12_png",
                "ui_meteor_BoardLevelNum13_png",
                "ui_meteor_BoardLevelNum14_png",
                "ui_meteor_BoardLevelNum15_png",
                "ui_meteor_BoardLevelNum16_png",
                "ui_meteor_BoardLevelNum17_png",
                "ui_meteor_BoardLevelNum18_png",
                "ui_meteor_BoardLevelNum19_png",
                "ui_meteor_BoardLevelNum20_png",
            ],
            number3: {
                [16]: "ui_meteor_BoardLevelNum16_png",
                [17]: "ui_meteor_BoardLevelNum17_png",
                [18]: "ui_meteor_BoardLevelNum18_png",
                [19]: "ui_meteor_BoardLevelNum19_png",
                [20]: "ui_meteor_BoardLevelNum20_png",
                [21]: "ui_meteor_BoardLevelNum21_png",
            },
            name: {
                [1]: "ccbResources/common_ui/Wanted/WantedNameTip1Nor.png",
                [2]: "ccbResources/common_ui/Wanted/WantedNameTip2Nor.png",
                [3]: "ccbResources/common_ui/Wanted/WantedNameTip3Nor.png",
            },

            itemMap: {
                [1]: "ccbResources/common_ui/Wanted/Map21.png",
                [2]: "ccbResources/common_ui/Wanted/Map22.png",
                [3]: "ccbResources/common_ui/Wanted/Map23.png",
            },

            hard: {
                [1]: "ccbResources/common_ui/Wanted/WordDifficulty1.png",
                [2]: "ccbResources/common_ui/Wanted/WordDifficulty2.png",
                [3]: "ccbResources/common_ui/Wanted/WordDifficulty3.png",
            },

            chooseMap: {
                [1]: "ccbResources/common_ui/Wanted/Map11.jpg",
                [2]: "ccbResources/common_ui/Wanted/Map12.jpg",
                [3]: "ccbResources/common_ui/Wanted/Map13.jpg",
            },

            title: {
                [1]: "ccbResources/common_ui/Wanted/WantedNameTip1.png",
                [2]: "ccbResources/common_ui/Wanted/WantedNameTip2.png",
                [3]: "ccbResources/common_ui/Wanted/WantedNameTip3.png",
            },

            costIconBig: {
                [1]: "ccbResources/common_ui/Wanted/Icon/ItemIconBig1.png",
                [2]: "ccbResources/common_ui/Wanted/Icon/ItemIconBig2.png",
                [3]: "ccbResources/common_ui/Wanted/Icon/ItemIconBig3.png",
            },
            costIconLittle: {
                [1]: "ccbResources/common_ui/Wanted/Icon/ItemIconLittel1.png",
                [2]: "ccbResources/common_ui/Wanted/Icon/ItemIconLittel2.png",
                [3]: "ccbResources/common_ui/Wanted/Icon/ItemIconLittel3.png",
            },
            costIconSmall: {
                [1]: "ccbResources/common_ui/Wanted/Icon/ItemIconSmall1.png",
                [2]: "ccbResources/common_ui/Wanted/Icon/ItemIconSmall2.png",
                [3]: "ccbResources/common_ui/Wanted/Icon/ItemIconSmall3.png",
            },

            Stele: {
                [1]: "ccbResources/common_ui/Wanted/Boardyincang2.png", // --巨石
                [2]: "ccbResources/common_ui/Wanted/Boardyincang3.png", // --戈壁
                [3]: "ccbResources/common_ui/Wanted/Boardyincang1.png", // --冰原
                // --[3] : "ccbResources/common_ui/Wanted/zhanweikaifang.png", // --暂未开放
            },

            Title: {
                [1]: "ccbResources/common_ui/Wanted/WordYincang2.png",
                [2]: "ccbResources/common_ui/Wanted/WordYincang3.png",
                [3]: "ccbResources/common_ui/Wanted/WordYincang1.png",
            },
            challenge: [
                "ui_common_ButtonChangeNor_png",
                "ui_common_ButtonChangeSel_png",
                "ccbResources/common_ui/Wanted/ButtonOpenBattleDis.png",
            ],

            Map: {
                [1]: "ccbResources/common_ui/Wanted/Map14.jpg",
                [2]: "ccbResources/common_ui/Wanted/Map15.jpg",
                [3]: "ccbResources/common_ui/Wanted/Map16.jpg",

            },

            Num: {
                [1]: "ccbResources/common_ui/League/War/WordShuzi1.png",
                [2]: "ccbResources/common_ui/League/War/WordShuzi2.png",
                [3]: "ccbResources/common_ui/League/War/WordShuzi3.png",
                [4]: "ccbResources/common_ui/League/War/WordShuzi4.png",
                [5]: "ccbResources/common_ui/League/War/WordShuzi5.png",
                [6]: "ccbResources/common_ui/League/War/WordShuzi6.png",

            },

            SpriteNormal: "ccbResources/common_ui/Wanted/BoardTipYinCang.png",
            SpriteClick: "ccbResources/common_ui/Wanted/BoardTipYinCangSel.png",

            boxSilver: [
                "ccbResources/common_ui/InstanceChapter/IconSilverBoxOpen.png",
                "ccbResources/common_ui/InstanceChapter/IconSilverBoxClose.png",
            ],
            boxGold: [
                "ui_skyarean_IconGoldBoxOpen_png",
                "ui_skyarean_IconGoldBoxClose_png",
            ],
            formatDead: "ccbResources/common_ui/WordsIconDead.png",

            instanceLock: "ui_currencyicon_IconLock_png",

            dropTitle: "ccbResources/common_ui/Wanted/WardDayAward2.png",
        },


        UIConfig_Fate: {
            composePic: {
                more: "ccbResources/common_ui/ChooseHero/IconPlus.png",
                less: "ccbResources/common_ui/ChooseHero/IconMinus.png",
            },
            composeNum: {
                more: [
                    "strategy_Plus1_png",
                    "strategy_Plus2_png",
                    "strategy_Plus3_png",
                    "strategy_Plus4_png",
                    "strategy_Plus5_png",
                    "strategy_Plus6_png",
                    "ccbResources/common_ui/ChooseHero/Plus7.png",
                    "ccbResources/common_ui/ChooseHero/Plus8.png",
                    "ccbResources/common_ui/ChooseHero/Plus9.png",
                ],
                less: [
                    "ccbResources/common_ui/ChooseHero/Minus1.png",
                    "ccbResources/common_ui/ChooseHero/Minus2.png",
                    "ccbResources/common_ui/ChooseHero/Minus3.png",
                    "ccbResources/common_ui/ChooseHero/Minus4.png",
                    "ccbResources/common_ui/ChooseHero/Minus5.png",
                    "ccbResources/common_ui/ChooseHero/Minus6.png",
                    "ccbResources/common_ui/ChooseHero/Minus7.png",
                    "ccbResources/common_ui/ChooseHero/Minus8.png",
                    "ccbResources/common_ui/ChooseHero/Minus9.png",
                ],
            },
        },


        UIConfig_Artifact: {
            starNone: "ccbResources/common_ui/DivineTroops/LevelOne.png",
            starOne: "ccbResources/common_ui/DivineTroops/LevelTow.png",
            starTwo: "ui_hunter_collection_hunterlevelThree_png",
            clearUp: "ccbResources/common_ui/DivineTroops/IconUp.png",
            clearDown: "ccbResources/common_ui/DivineTroops/IconDown.png",
            attrLock: "ccbResources/common_ui/DivineTroops/IconClockOne.png",
            attrFree: "ccbResources/common_ui/DivineTroops/IconClockTwo.png",
            picBar: [
                "ccbResources/common_ui/DivineTroops/BurGray.png",
                "ccbResources/common_ui/DivineTroops/BurATK.png",
                "ccbResources/common_ui/DivineTroops/BurDef.png",
                "ccbResources/common_ui/DivineTroops/BurFinalDamage.png",
            ],
            picNameH: [
                "ccbResources/common_ui/DivineTroops/WordKuWu.png",
                "ccbResources/common_ui/DivineTroops/WordJuQue.png",
                "ccbResources/common_ui/DivineTroops/WordTaiE.png",
                "ccbResources/common_ui/DivineTroops/WordLongQue.png",
                "ccbResources/common_ui/DivineTroops/WordChiXiao.png",
                "ccbResources/common_ui/DivineTroops/WordChengYing.png",
                "ccbResources/common_ui/DivineTroops/WordShiHun.png",
                "ccbResources/common_ui/DivineTroops/WordLongYuan.png",
                "ccbResources/common_ui/DivineTroops/WordZhuXie.png",
            ],
            picNameV: [
                "ccbResources/common_ui/DivineTroops/WordKunwuSmall.png",
                "ccbResources/common_ui/DivineTroops/WordJuqueSmall.png",
                "ccbResources/common_ui/DivineTroops/WordTaieSmall.png",
                "ccbResources/common_ui/DivineTroops/WordLongqueSmall.png",
                "ccbResources/common_ui/DivineTroops/WordChixiaoSmall.png",
                "ccbResources/common_ui/DivineTroops/WordChengyingSmall.png",
                "ccbResources/common_ui/DivineTroops/WordShihunSmall.png",
                "ccbResources/common_ui/DivineTroops/WordLongYuanSmall.png",
                "ccbResources/common_ui/DivineTroops/WordZhuXieSmall.png",
            ],

            jadeRandom: [
                "ccbResources/item_icon/Jade_Gongji%02d.png",
                "ccbResources/item_icon/Jade_Shengming%02d.png",
                "ccbResources/item_icon/Jade_Fangyu%02d.png",
                "ccbResources/item_icon/Jade_Baoji%02d.png",
                "ccbResources/item_icon/Jade_Shanbi%02d.png",
                "ccbResources/item_icon/Jade_Mingzhong%02d.png",
            ],

            jadeText: [
                "ccbResources/common_ui/Jade/WordJadeTypeGong.png",
                "ccbResources/common_ui/Jade/WordJadeTypeXue.png",
                "ccbResources/common_ui/Jade/WordJadeTypeFang.png",
                "ccbResources/common_ui/Jade/WordJadeTypeBao.png",
                "ccbResources/common_ui/Jade/WordJadeTypeShan.png",
                "ccbResources/common_ui/Jade/WordJadeTypeMing.png",
            ],

            nameFont: [
                "ccbResources/picfont/DivineTroops1.fnt",
                "ccbResources/picfont/DivineTroops1.fnt",
                "ccbResources/picfont/DivineTroops1.fnt",
                "ccbResources/picfont/DivineTroops1.fnt",
                "ccbResources/picfont/DivineTroops2.fnt",
                "ccbResources/picfont/DivineTroops2.fnt",
                "ccbResources/picfont/DivineTroops2.fnt",
                "ccbResources/picfont/DivineTroops3.fnt",
                "ccbResources/picfont/DivineTroops3.fnt",
                "ccbResources/picfont/DivineTroops3.fnt",
                "ccbResources/picfont/DivineTroops4.fnt",
                "ccbResources/picfont/DivineTroops4.fnt",
                "ccbResources/picfont/DivineTroops4.fnt",
                "ccbResources/picfont/DivineTroops5.fnt",
                "ccbResources/picfont/DivineTroops5.fnt",
                "ccbResources/picfont/DivineTroops5.fnt",
            ],
        },


        UIConfig_Adviser: {
            lawTitle: [
                "ccbResources/common_ui/Adviser/WordLawOne.png",
                "ccbResources/common_ui/Adviser/WordLawTwo.png",
                "ccbResources/common_ui/Adviser/WordLawThree.png",
            ],
            posName: [
                "ccbResources/common_ui/Adviser/WordTip1.png",
                "ccbResources/common_ui/Adviser/WordTip2.png",
                "ccbResources/common_ui/Adviser/WordTip3.png",
            ],
            mapItem: {
                dark: [
                    "ui_acitivity_wish_IconStar_png",
                    "ui_wonderland_IconEndStar_png",
                ],
                bright: [
                    "ccbResources/common_ui/Adviser/IconStarActivation.png",
                    "ccbResources/common_ui/Adviser/IconStarEndActivity.png",
                ],
            },

            button: {
                nor: "ui_pet_ButtonPetNameNor_png",
                sel: "ui_pet_FrameSelectedPet_png",
                dis: "ui_pet_ButtonPetNameDis_png",

            },

            petIcon: {
                [1]: "ccbResources/common_ui/HXH_Pet/HXH_Icon/IconPetBig1.png",
                [2]: "ccbResources/common_ui/HXH_Pet/HXH_Icon/IconPetBig2.png",
                [3]: "ccbResources/common_ui/HXH_Pet/HXH_Icon/IconPetBig3.png",

            },

            petIcons: {
                [1]: "ui_pet_icon_IconPet1_png",
                [2]: "ui_pet_icon_IconPet2_png",
                [3]: "ui_pet_icon_IconPet3_png",
                [4]: "ui_pet_icon_IconPet4_png",
                [5]: "ui_pet_icon_IconPet5_png",
                [6]: "ui_pet_icon_IconPet6_png",
                [7]: "ui_pet_icon_IconPet7_png",
                [8]: "ui_pet_icon_IconPet8_png",
                [9]: "ui_pet_icon_IconPet9_png",
                [13]: "ui_pet_icon_IconPet10_png",


            },


            bg: "ui_arena_BoardPlayerInfo_png",

            petName: {
                [1]: "ui_pet_icon_WordsPetName1_png",
                [2]: "ui_pet_icon_WordsPetName2_png",
                [3]: "ui_pet_icon_WordsPetName3_png",
                [4]: "ui_pet_icon_WordsPetName4_png",
                [5]: "ui_pet_icon_WordsPetName5_png",
                [6]: "ui_pet_icon_WordsPetName6_png",
                [7]: "ui_pet_icon_WordsPetName7_png",
                [8]: "ui_pet_icon_WordsPetName8_png",
                [9]: "ui_pet_icon_WordsPetName9_png",
                [13]: "ui_pet_icon_WordsPetName10_png",
            },
            petIconNode: "ui_frame_FrameHunterSPmask_png",

            pet_battle_state: {
                stopNor: "ui_pet_newpet_ButtonRestNor_png",
                stopSel: "ui_pet_newpet_ButtonRestSel_png",
                battleNor: "ui_pet_newpet_ButtonFightNor_png",
                battleSel: "ui_pet_newpet_ButtonFightSel_png",
            },

            pet_unlock_step: {
                step1: "ui_pet_newpet_WordsForm1_png",
                step2: "ui_pet_newpet_WordsForm2_png",
                step3: "ui_pet_newpet_WordsForm3_png",
            },


        },


        UIConfig_Pet: {

            buttonNor: {
                [1]: "ui_pet_ButtonPetFrame1Nor_png",
                [2]: "ui_pet_ButtonPetFrame2Nor_png",
                [3]: "ui_pet_ButtonPetFrame3Nor_png",
                [4]: "ui_pet_ButtonPetFrame4Nor_png",
                [5]: "ui_pet_ButtonPetFrame5Nor_png",
                [6]: "ui_pet_ButtonPetFrame6Nor_png",
                [7]: "ui_pet_ButtonPetFrame7Nor_png",
                [8]: "ui_pet_ButtonPetFrameDis_png",

            },

            buttonSel: {
                [1]: "ui_pet_ButtonPetFrame1Sel_png",
                [2]: "ui_pet_ButtonPetFrame2Sel_png",
                [3]: "ui_pet_ButtonPetFrame3Sel_png",
                [4]: "ui_pet_ButtonPetFrame4Sel_png",
                [5]: "ui_pet_ButtonPetFrame5Sel_png",
                [6]: "ui_pet_ButtonPetFrame6Sel_png",
                [7]: "ui_pet_ButtonPetFrame7Sel_png",

            },

            Grade: {

                [11]: "ui_pet_IconBigPetGrade1_png",
                [12]: "ui_pet_IconBigPetGrade2_png",
                [13]: "ui_pet_IconBigPetGrade3_png",
                [14]: "ui_pet_IconBigPetGrade4_png",
                [15]: "ui_pet_IconBigPetGrade5_png",

            },

            smallGrade: {
                [11]: "ui_pet_IconSmallPetGrade1_png",
                [12]: "ui_pet_IconSmallPetGrade2_png",
                [13]: "ui_pet_IconSmallPetGrade3_png",
                [14]: "ui_pet_IconSmallPetGrade4_png",
                [15]: "ui_pet_IconSmallPetGrade5_png",
            },

            canGet: "ui_pet_WordsTipSumon_png",
            dontGet: "ui_pet_WordsTipNode_png",
        },


        // --联赛
        UIConfig_ArenaTow: {

            formationNum: [
                "ccbResources/common_ui/Arena/TipTowOne1.png",
                "ccbResources/common_ui/Arena/TipTowTow2.png",
                "ccbResources/common_ui/Arena/TipTowTreen3.png",
            ],

            star: [
                "ccbResources/common_ui/Arena/IconTowStarA.png",
                "ccbResources/common_ui/Arena/IconTowStarB.png",
            ],

            leftTitleFirst: "ccbResources/common_ui/Arena/TipTowJifenRankB.png",
            leftTitleClose: "ccbResources/common_ui/Arena/TipTowJifenRank.png",
            leftTitleOpen: "ccbResources/common_ui/Arena/TipTowJifenRank.png",


        },


        UIConfig_BattleStarcraft: {
            flag: {
                win: "ccbResources/common_ui/IconFlagA.png",
                fail: "ccbResources/common_ui/IconFlagB.png",
            },

            word: {
                win: "ui_mail_IconWinSmall_png",
                fail: "ui_mail_IconLoseSmall_png",
            },
        },


        // --礼包相关
        UIConfig_Gift: {
            days: {
                [1]: {
                    [0]: "ccbResources/common_ui/Activity/Time/WordDayFirstNro.png", // --第一天亮
                    [1]: "ccbResources/common_ui/Activity/Time/WordDayFirstSel.png", // --第一天灰
                },
                [2]: {
                    [0]: "ccbResources/common_ui/Activity/Time/WordDaySecondNor.png",
                    [1]: "ccbResources/common_ui/Activity/Time/WordDaySecondSel.png",
                },
                [3]: {
                    [0]: "ccbResources/common_ui/Activity/Time/WordDayThreeNor.png",
                    [1]: "ccbResources/common_ui/Activity/Time/WordDayThreeSel.png",
                },
                [4]: {
                    [0]: "ccbResources/common_ui/Activity/Time/WordDayFourNor.png",
                    [1]: "ccbResources/common_ui/Activity/Time/WordDayFourSel.png",
                },
                [5]: {
                    [0]: "ccbResources/common_ui/Activity/Time/WordDayFiveNor.png",
                    [1]: "ccbResources/common_ui/Activity/Time/WordDayFiveSel.png",
                },
            },
            buy_type: {
                [1]: "ui_mall_WordsGmestoneFirstSendB_png", // -- 限时限购
                [2]: "ui_mall_WordsGmestoneFirstSendC_png", // --限时
                [3]: "ui_mall_WordsGmestoneFirstSendF_png", // --限购
                [4]: "ui_mall_WordsGmestoneFirstSendD_png", // --可购一次
                [5]: "ui_mall_WordsGmestoneFirstSendE_png", // --免费赠送
                [6]: "ui_mall_WordsGmestoneFirstSendDNew_png", // --可购一次
            },
            buy_type2: {
                [1]: "ui_mall_gift_WordsGiftTimeTypeTip2_png", // -- 限时限购
                [2]: "ui_mall_gift_WordsGiftTimeTypeTip2_png", // --限时
                [3]: "ui_mall_gift_WordsGiftTimeTypeTip2_png", // --限购
                [4]: "ui_mall_gift_WordsGiftTimeTypeTip2_png", // --可购一次
                [5]: "ui_mall_gift_WordsGiftTimeTypeTip1_png", // --免费赠送
            },
            buy_type3: {
                [1]: "ui_mall_gift_WordsSelectedTip_png", // -- 一個
                [2]: "ui_mall_gift_WordsSelectedTip1_png", // --限购
                [3]: "ui_mall_gift_WordsSelectedTip2_png", // --限时
                [4]: "ui_mall_gift_WordsSelectedTip3_png", // --限时限购
            },
            super: {
                [1]: "ccbResources/common_ui/Activity/Time/WordChaoZhiSmall.png",
                [2]: "ccbResources/common_ui/Activity/Time/WordChaoZhiSmall.png",
                [3]: "ccbResources/common_ui/Activity/Time/WordChaoZhiSmall.png",
            },

            // --领取
            get: [
                "ui_mall_gift_ButtonGiftGetNor_png",
                "ui_mall_gift_ButtonGiftGetSel_png",
                "ui_mall_gift_ButtonGiftGetDisB_png",
            ],
            // --达成
            reach: [
                "ui_mall_gift_ButtonGiftGetNor_png",
                "ui_mall_gift_ButtonGiftGetSel_png",
                "ui_mall_gift_ButtonGiftGetDis_png",
            ],

            beerGift: {
                [1]: [
                    "ui_tavern_ButtonbeerNor_png",
                    "ui_tavern_ButtonbeerSel_png",
                    "ui_tavern_ButtonbeerSel_png",
                ],
                [2]: [
                    "ui_tavern_ButtonbeerNor_png",
                    "ui_tavern_ButtonbeerSel_png",
                    "ui_tavern_ButtonbeerSel_png",
                ],
            },

            secretMallBoard: [
                "ui_acitivity_publicgift_BoardGiftFloor1_png",
                "ui_acitivity_publicgift_BoardGiftFloor2_png",
                "ui_acitivity_publicgift_BoardGiftFloor3_png",
                "ui_acitivity_publicgift_BoardGiftFloor4_png",
                "ui_acitivity_publicgift_BoardGiftFloor5_png",
                "ui_acitivity_publicgift_BoardGiftFloor6_png",
            ],

        },


        // --武将魂
        UIConfig_Soul: {
            [0]: "ui_frame_FrameHunterSPAsh_png",  // --1灰
            [1]: "ui_frame_FrameHunterSPAsh_png", // --1灰
            [2]: "ui_frame_FrameHunterSPGreen_png", // --2绿
            [3]: "ui_frame_FrameHunterSPBule_png", // --3蓝
            [4]: "ui_frame_FrameHunterSPViolet_png", // --4紫
            [5]: "ui_frame_FrameHunterSPOrange_png", // --5橙
            [6]: "ui_frame_FrameHunterSPRed_png", // --6红
        },


        // --兑换相关
        UIConfig_Random: {
            title: {
                [1]: "ccbResources/common_ui/Mall/WordTipRandom.png",
                [2]: "ccbResources/common_ui/Mall/WordTipRandomB.png",
                [3]: "ccbResources/common_ui/Mall/WordTipRandomA.png",
            },
            board: {
                [3]: "ui_exchange_BoardNeedProp3_png",
                [4]: "ui_exchange_BoardNeedProp4_png",
                [5]: "ui_exchange_BoardNeedProp5_png",
            },
            cdPng: "ui_exchange_MaskFuritCD_png",
            cdPng2: "ui_exchange_MaskFuritCD2_png",
        },


        // --跨服战相关
        UIConfig_Pk: {
            Grade: {
                [1]: "ui_arena_WordsGradeDayCommon_png", // -- today
                [2]: "ui_arena_WordsGradeYesterday_png",
                [4]: "ui_arena_WordsGradeDayCommon_png", // -- today     
            },

            Num: {
                [1]: "ui_arena_WordsJifenDayCommon_png", // -- today
                [2]: "ui_arena_WordsJifeYesterdayCommon_png",
                [4]: "ui_arena_WordsJifenDayCommon_png", // --today       
            },
            TeamIndex: {
                [1]: "ui_arena_WordsEnemyDefenseFirst_png",
                [2]: "ui_arena_WordsEnemyDefenseSecond_png",
                [3]: "ui_arena_WordsEnemyDefenseThree_png",
            },
            GradeUp: {
                [1]: "ui_arena_WordGradeUp_png",
                [2]: "ui_arena_WordGradeDown_png",
            },
            Great: {
                [1]: "ui_arena_ButtonGreatNor_png",
                [2]: "ui_arena_ButtonFightNor_png",
            },
            Win: {
                [1]: "ui_arena_ButtonGreatNor_png",
                [2]: "ui_arena_ButtonGreatSel_png",
                [3]: "ui_arena_ButtonGreatSel_png",
            },
            Lose: {
                [1]: "ui_arena_ButtonFightNor_png",
                [2]: "ui_arena_ButtonFightNor_png",
                [3]: "ui_arena_ButtonFightNor_png",
            },
            tips: {
                [1]: "ui_arena_WordsPromptDayRank_png",
                [2]: "ui_arena_WordsPromptYesterdayRank_png",
                [3]: "ui_arena_WordsPromptFirst_png",
                [4]: "ui_arena_WordsPromptDayRank_png",
                [5]: "ui_arena_WordsPromptFirst_png",
                [6]: "ui_arena_WordsPromptDayRank_png",
            },
            level_change: [
                "ui_arena_WordGradeUp_png",
                "ui_arena_WordGradeDown_png",
            ],
        },


        // --宝物相关
        UIConfig_Potato: {

            // --宝物框
            potatoFrame: {

                [0]: "ui_other_FramePropD_png",  // --1灰
                [1]: "ui_other_FramePropD_png", // --1灰
                [2]: "ui_other_FramePropC_png", // --2绿
                [3]: "ui_other_FramePropB_png", // --3蓝
                [4]: "ui_other_FramePropA_png", // --4紫
                [5]: "ui_other_FramePropS_png", // --5橙
                [6]: "ccbResources/common_ui/FramePropE.png", // --6红
            },

            // --宝物品质图标
            potatoLevel: {
                [0]: "ccbResources/common_ui/Treasure/WordGrade1.png",
                [1]: "ccbResources/common_ui/Treasure/WordGrade2.png",
                [2]: "ccbResources/common_ui/Treasure/WordGrade5.png",
                [3]: "ccbResources/common_ui/Treasure/WordGrade6.png",
                [4]: "ccbResources/common_ui/Treasure/WordGrade3.png",
            },

            // --宝物品质图标
            potatoLevelNew: {
                [0]: "ccbResources/common_ui/Treasure/WordSuCai.png",
                [1]: "ccbResources/common_ui/Treasure/WordGrade2.png",
                [2]: "ccbResources/common_ui/Treasure/WordGrade3.png",
                [3]: "ccbResources/common_ui/Treasure/WordGrade4.png",
                [4]: "ccbResources/common_ui/Treasure/WordGrade5.png",
                [5]: "ccbResources/common_ui/Treasure/WordGrade6.png",
                [6]: "ccbResources/common_ui/Treasure/WordGrade7.png",
            },


            // --宝物缘份
            potatoFate: {
                [0]: "ui_other_Nothing_png",
                [1]: "ccbResources/common_ui/Treasure/WordFate1.png",
                [2]: "ccbResources/common_ui/Treasure/WordFate2.png",
            },

            // --宝物缘份激活
            potatoFateAct: {
                [0]: "ccbResources/common_ui/Words/Yijinghuo.png",
                [1]: "ccbResources/common_ui/Words/WeijihuoDis.png",
            },

            // --宝物缘份激活
            potatoLock: "ccbResources/common_ui/IconLockB.png",
            potatoAdd: "ccbResources/common_ui/Treasure/WordTreasure.png",

            potatoStar: "ccbResources/common_ui/Treasure/IconBigStart.png",

            hero_none: "ui_acitivity_serverseven_WordsNone_png",



            fresh_button: [
                "ccbResources/common_ui/Treasure/ButtonGoFreshAttNor.png",
                "ccbResources/common_ui/Treasure/ButtonGoFreshAttSel.png",
                "ccbResources/common_ui/Treasure/ButtonGoFreshAttSel.png",
            ],
            dec_button: [
                "ccbResources/common_ui/Treasure/ButtonGoDecomposNorB.png",
                "ccbResources/common_ui/Treasure/ButtonGoDecomposSelB.png",
                "ccbResources/common_ui/Treasure/ButtonGoDecomposSelB.png",
            ],

            fresh_buttonb: [
                "ccbResources/common_ui/Treasure/ButtonGoFreshAttBNor.png",
                "ccbResources/common_ui/Treasure/ButtonGoFreshAttBSel.png",
                "ccbResources/common_ui/Treasure/ButtonGoFreshAttBSel.png",
            ],
            dec_buttonb: [
                "ccbResources/common_ui/Treasure/ButtoAkeyDecompseNor.png",
                "ccbResources/common_ui/Treasure/ButtoAkeyDecompseSel.png",
                "ccbResources/common_ui/Treasure/ButtoAkeyDecompseSel.png",
            ],

            outside_frame: {
                card: "ui_frame_FrameCardBack_png",
                item: "ui_frame_FrameItemBack_png",
            },
        },


        UIConfig_Hunter: {
            upStarColor: [
                "ui_hunter_IconBingoHunterSoulRed_png",
                "ui_card_IconCardSelected_png",
            ],
            starOn: "ui_license_IconHunterStarNor_png",
            starOff: "ui_license_IconHunterStarDis_png",
            type1: [
                "ui_hunter_evaluate_IconHunterType6_png",         // --强化系
                "ui_hunter_evaluate_IconHunterType1_png",        // --放出系
                "ui_hunter_evaluate_IconHunterType3_png", // --具现化系
                "ui_hunter_evaluate_IconHunterType5_png", // --特质系
                "ui_hunter_evaluate_IconHunterType4_png", // --变化系
                "ui_hunter_evaluate_IconHunterType2_png", // --操作系
            ],

            type2: [
                "ui_hunter_evaluate_IconHeroType3_png",   // --攻击型
                "ui_hunter_evaluate_IconHeroType1_png", // --防御型
                "ui_hunter_evaluate_IconHeroType2_png", // --辅助型
            ],

            grade: [
                "ccbResources/common_ui/HXH_Hunter/HXH_Evaluate/IconGrad1.png",
                "ccbResources/common_ui/HXH_Hunter/HXH_Evaluate/IconGrad2.png",
                "ccbResources/common_ui/HXH_Hunter/HXH_Evaluate/IconGrad3.png",
                "ccbResources/common_ui/HXH_Hunter/HXH_Evaluate/IconGrad4.png",
                "ccbResources/common_ui/HXH_Hunter/HXH_Evaluate/IconGrad5.png",
            ],

            starLight: "ui_hunter_evaluate_IconSingleStarNor_png",
            starDark: "ui_hunter_evaluate_IconSingleStarSel_png",

            common_hint: {
                [1]: "ui_common_WordsSuccessUpStar_png", // -- 升星成功
                [2]: "ui_common_WordsSuccessStrength_png", // --强化成功
                [3]: "ui_common_WordsEnchantingSuccess_png", // --附魔成功
                [4]: "ui_common_WordsAniAcitivitySuccess_png", // --激活成功
                [5]: "ui_common_WordsAniUpLevelSuccess_png", // --升级啦
            },

            partner_small: {
                [1]: "ui_hunter_evaluate_IconPartnerSmall1_png",
                [2]: "ui_hunter_evaluate_IconPartnerSmall2_png",
                [3]: "ui_hunter_evaluate_IconPartnerSmall3_png",
                [4]: "ui_hunter_evaluate_IconPartnerSmall4_png",
                [5]: "ui_hunter_evaluate_IconPartnerSmall5_png",
                [6]: "ui_hunter_evaluate_IconPartnerSmall6_png",
                [7]: "ui_hunter_evaluate_IconPartnerSmall7_png",
                [8]: "ui_hunter_evaluate_IconPartnerSmall8_png",
                [9]: "ui_hunter_evaluate_IconPartnerSmall9_png",
                [10]: "ui_hunter_evaluate_IconPartnerSmall10_png",
            },

            partner_big: {
                [1]: "ui_hunter_evaluate_IconPartnerBig1_png",
                [2]: "ui_hunter_evaluate_IconPartnerBig2_png",
                [3]: "ui_hunter_evaluate_IconPartnerBig3_png",
                [4]: "ui_hunter_evaluate_IconPartnerBig4_png",
                [5]: "ui_hunter_evaluate_IconPartnerBig5_png",
                [6]: "ui_hunter_evaluate_IconPartnerBig6_png",
                [7]: "ui_hunter_evaluate_IconPartnerBig7_png",
                [8]: "ui_hunter_evaluate_IconPartnerBig8_png",
                [9]: "ui_hunter_evaluate_IconPartnerBig9_png",
                [10]: "ui_hunter_evaluate_IconPartnerBig10_png",
            },

            partner_bur_A: "ui_hunter_BurPartnerB_png",
            partner_bur_B: "ui_hunter_BurPartnerA_png",

            frameSkillNor: "ui_frame_FrameSkillNor_png",
            frameSkillSel: "ui_frame_FrameSkillSel_png",

            searchA: "ui_instance_ButtonSearchCancelNor_png",
            searchB: "ui_instance_ButtonSearchCancelSel_png",

            awardA: "ui_instance_ButtonSearchAwardNor_png",
            awardB: "ui_instance_ButtonSearchAwardSel_png",
            board: "ui_instance_BoardSearchA_png",
            successA: "ui_instance_IconSearchSuccessB_png",
            successB: "ui_instance_IconSearchSuccess_png",

            buttonSet: "ui_instance_ButtonSearchSetLineupDis_png",
            buttonNor: "ui_instance_ButtonSearchSetLineupNor_png",
            buttonDis: "ui_instance_ButtonSearchSetLineupSel_png",

            skillLevel: [
                "ccbResources/common_ui/HXH_CurrencyIcon/IconHunterAwaken1.png",
                "ccbResources/common_ui/HXH_CurrencyIcon/IconHunterAwaken2.png",
                "ccbResources/common_ui/HXH_CurrencyIcon/IconHunterAwaken3.png",
            ],

            awakeLevel: [
                "ui_hunter_evaluate_IconHunterAwakenLevel1_png",
                "ui_hunter_evaluate_IconHunterAwakenLevel2_png",
                "ui_hunter_evaluate_IconHunterAwakenLevel3_png",
                "ui_hunter_evaluate_IconHunterAwakenLevel4_png",
                "ui_hunter_evaluate_IconHunterAwakenLevel5_png",
            ],
            awakenLock: "ui_currencyicon_IconLock_png",
            awakenTime: [
                "ui_hunter_IconSkillHunterArrow1_png",
                "ui_hunter_IconSkillHunterArrow2_png",
                "ui_hunter_IconSkillHunterArrow3_png",
                "ui_hunter_IconSkillHunterArrow4_png",
                "ui_hunter_IconSkillHunterArrow5_png",
                "ui_hunter_IconSkillHunterArrow6_png",
                "ui_hunter_IconSkillHunterArrow7_png",

            ],
            wanou: [
                "ui_hunter_ButtonAwakenMeterials2Nor_png",
                "ui_hunter_ButtonAwakenMeterials2Sel_png",
            ],


            awakenSkill: [
                "ui_hunter_WordsSkillHunterUnlock_png",
                "ui_hunter_WordsSkillHunterUoLevel_png",
                "ui_hunter_WordsSkillHunterAwakenLevelMax_png",
            ],

            instance_chapter: [

                "ui_instancechapter_WordsTipDrop1_png",
                "ui_instancechapter_WordsTipDrop2_png",
                "ui_instancechapter_WordsTipDrop3_png",
                "ui_instancechapter_WordsTipDrop4_png",
                "ui_instancechapter_WordsTipDrop5_png",
                "ui_instancechapter_WordsTipDrop6_png",
                "ui_instancechapter_WordsTipDrop7_png",
                "ui_instancechapter_WordsTipDrop8_png",
                "ui_instancechapter_WordsTipDrop9_png",
                "ui_instancechapter_WordsTipDrop10_png",
                "ui_instancechapter_WordsTipDrop11_png",
                "ui_instancechapter_WordsTipDrop12_png",
                "ui_instancechapter_WordsTipDrop13_png",
                "ui_instancechapter_WordsTipDrop14_png",
                "ui_instancechapter_WordsTipDrop15_png",
                "ui_instancechapter_WordsTipDrop16_png",

            ],


            instance_button: {
                [2]: {
                    [1]: [
                        "ui_instance_ButtonTyepDekaronoNor_png",
                        "ui_instance_ButtonTyepDekaronoSel_png",
                        "ui_instance_ButtonTyepDekaronoSel_png",
                    ],
                    [2]: [
                        "ui_instance_ButtonTyepDekaronoDis_png",
                        "ui_instance_ButtonTyepDekaronoDis_png",
                        "ui_instance_ButtonTyepDekaronoDis_png",
                    ]
                },
                [3]: {
                    [1]: [
                        "ui_instance_ButtnoTypeSearchNor_png",
                        "ui_instance_ButtnoTypeSearchSel_png",
                        "ui_instance_ButtnoTypeSearchSel_png",
                    ],
                    [2]: [
                        "ui_instance_ButtnoTypeSearchDis_png",
                        "ui_instance_ButtnoTypeSearchDis_png",
                        "ui_instance_ButtnoTypeSearchDis_png",
                    ]
                }
            },
        },


        UIConfig_Psychic: {
            psyPath: {
                [1]: "ui_hunter_psychic_WordsQiang_png",
                [2]: "ui_hunter_psychic_WordsBian_png",
                [3]: "ui_hunter_psychic_WordsJu_png",
                [4]: "ui_hunter_psychic_WordsTe_png",
                [5]: "ui_hunter_psychic_WordsCao_png",
                [6]: "ui_hunter_psychic_WordsFang_png",
            },

            psyGroup: {
                [2]: "ui_hunter_psychic_WordsEffectTwo_png",
                [4]: "ui_hunter_psychic_WordsEffectFour_png",
            },

            plan: {
                [1]: "ui_hunter_psychic_WordsPlan1_png",
                [2]: "ui_hunter_psychic_WordsPlan2_png",
                [3]: "ui_hunter_psychic_WordsPlan3_png",
            },

            button: {
                dis: "ui_hunter_psychic_ButtonPlanSelectDis_png",
                nor: "ui_hunter_psychic_ButtonPlanSelectNor_png",
                sel: "ui_hunter_psychic_ButtonPlanSelectSel_png",
            },
            level: {
                [1]: "ui_hunter_psychic_new_BoardLevelFloor1_png",
                [2]: "ui_hunter_psychic_new_BoardLevelFloor2_png",
                [3]: "ui_hunter_psychic_new_BoardLevelFloor3_png",
                [4]: "ui_hunter_psychic_new_BoardLevelFloor4_png",
                [5]: "ui_hunter_psychic_new_BoardLevelFloor5_png",
                [6]: "ui_hunter_psychic_new_BoardLevelFloor6_png",
            },

            groupUp: {
                [1]: "ui_psychic_WordsTitleGroupUp_png",
                [2]: "ui_psychic_WordsTitleGetNewGroup_png",
            },
        },


        UIConfig_Comment: {
            wordsHot: "ui_license_WordsHot_png",
            wordsHotB: "ui_license_WordsHotB_png",

            praiseNor: "ui_license_ButtonGoodUpNor_png",
            praiseSel: "ui_license_ButtonGoodUpSel_png",
            praiseDis: "ui_license_ButtonGoodUpDis_png",

            stepNor: "ui_license_ButtonGoodDownNor_png",
            stepSel: "ui_license_ButtonGoodDownSel_png",
            stepDis: "ui_license_ButtonGoodDownDis_png",


            position: [
                "ui_license_huntertype_WordsHunterType1_png",
                "ui_license_huntertype_WordsHunterType2_png",
                "ui_license_huntertype_WordsHunterType3_png",
                "ui_license_huntertype_WordsHunterType4_png",
                "ui_license_huntertype_WordsHunterType5_png",
                "ui_license_huntertype_WordsHunterType6_png",
                "ui_license_huntertype_WordsHunterType7_png",
                "ui_license_huntertype_WordsHunterType8_png",
                "ui_license_huntertype_WordsHunterType9_png",
                "ui_license_huntertype_WordsHunterType10_png",
                "ui_license_huntertype_WordsHunterType11_png",
                "ui_license_huntertype_WordsHunterType12_png",
                "ui_license_huntertype_WordsHunterType13_png",
                "ui_license_huntertype_WordsHunterType14_png",
                "ui_license_huntertype_WordsHunterType15_png",
                "ui_license_huntertype_WordsHunterType16_png",
                "ui_license_huntertype_WordsHunterType17_png",
                "ui_license_huntertype_WordsHunterType18_png",
                "ui_license_huntertype_WordsHunterType19_png",
                "ui_license_huntertype_WordsHunterType20_png",
                "ui_license_huntertype_WordsHunterType21_png",
                "ui_license_huntertype_WordsHunterType22_png",
                "ui_license_huntertype_WordsHunterType23_png",
                "ui_license_huntertype_WordsHunterType24_png",
                "ui_license_huntertype_WordsHunterType25_png",
                "ui_license_huntertype_WordsHunterType26_png",
                "ui_license_huntertype_WordsHunterType27_png",
                "ui_license_huntertype_WordsHunterType28_png",
                "ui_license_huntertype_WordsHunterType29_png",
                "ui_license_huntertype_WordsHunterType30_png",
                "ui_license_huntertype_WordsHunterType31_png",
                "ui_license_huntertype_WordsHunterType32_png",
            ],

            title: {
                [1]: "ui_comment_WordsTitleHunter_png",
                [2]: "ui_comment_WordsTitleSky_png",
                [3]: "ui_comment_WordsTitleLicense_png",
                [5]: "ui_comment_WordsTitleMeteor_png",
                [6]: "ui_license_WordsHightHome_png",
                [7]: "ui_comment_WordsTitleGroup_png",

            },
            title1: "ui_license_WordsHightHome_png",
            title2: "ui_license_WordsHight_png",

            // --综合
            leftButton: [
                "ui_acitivity_ButtonDoubleMouthCardNor_png",
                "ui_acitivity_ButtonDoubleMouthCardNor_png",
                "ui_acitivity_ButtonDoubleMouthCardNor_png",
                "ui_acitivity_ButtonDoubleMouthCardNor_png",
            ],

            // --爬塔
            leftButtonNor: [
                "ui_comment_WordsLowNor_png",
                "ui_comment_WordsHighNor_png",
            ],
            leftButtonSel: [
                "ui_comment_WordsLowSel_png",
                "ui_comment_WordsHighSel_png",
            ],

            // --执照
            license: "ui_comment_WordsLicenseSel_png",
            GroupNor: [
                "ui_comment_WordsGroupFightOneNor_png",
                "ui_comment_WordsGroupFightTwoNor_png",
                "ui_comment_WordsGroupFightThreeSel_png",
            ],

            GroupSel: [
                "ui_comment_WordsGroupFightOneSel_png",
                "ui_comment_WordsGroupFightTwoSel_png",
                "ui_comment_WordsGroupFightThreeSel_png",
            ],

            aptitude: [
                "ui_frame_FrameHunterGreen1_png",
                "ui_frame_FrameHunterBule1_png",
                "ui_frame_FrameHunterViolet1_png",
                "ui_frame_FrameHunterOrange1_png",
            ],


            menu: [
                "ui_comment_MenuIconHunter_png",
                "ui_comment_MenuIconSky_png",
                "ui_comment_MenuIconLicense_png",
                "ui_comment_MenuIconWanted_png",
                "ui_comment_MenuIconGroupFight_png",
            ],

            Meteor: [
                "ui_comment_MenuIconMeteor1_png",
                "ui_comment_MenuIconMeteor2_png",
                "ui_comment_MenuIconMeteor3_png",
                "ui_comment_MenuIconMeteor4_png",
                "ui_comment_MenuIconMeteor5_png",
                "ui_comment_MenuIconMeteor6_png",
                "ui_comment_MenuIconMeteor7_png",
            ],

            licenseSign: {
                GM: "ui_license_WordsGM_png",
                REQ: "ui_license_WordsBest_png",
            },
        },


        UIConfig_Hunter_Card: {

            card_Enchant_board: [
                "ui_card_enchant_BoardFloorLow_png",  // 初
                "ui_card_enchant_BoardFloorHigh_png", // 高
            ],

            card_Enchant_name: [
                "ui_card_enchant_WordsLow_png",         // 初
                "ui_card_enchant_WordsHigh_png",        // 高 
            ],

            card_type: [
                "ui_hunter_evaluate_IconCardTypeBig1_png",         // --缠
                "ui_hunter_evaluate_IconCardTypeBig2_png",         // --绝
                "ui_hunter_evaluate_IconCardTypeBig7_png", // --练
                "ui_hunter_evaluate_IconCardTypeBig3_png", // --发
                "ui_hunter_evaluate_IconCardTypeBig4_png", // --圆
                "ui_hunter_evaluate_IconCardTypeBig5_png", // --坚
                "ui_hunter_evaluate_IconCardTypeBig6_png", // --硬
            ],

            card_type_small: [
                "ui_hunter_evaluate_IconCardType4_png",
                "ui_hunter_evaluate_IconCardType2_png",
                "ui_hunter_evaluate_IconCardType3_png",
                "ui_hunter_evaluate_IconCardType7_png",
                "ui_hunter_evaluate_IconCardType5_png",
                "ui_hunter_evaluate_IconCardType1_png",
                "ui_hunter_evaluate_IconCardType6_png",
            ],

            card_type_right: [
                "ui_hunter_evaluate_IconCardTypeOrn6_png",
                "ui_hunter_evaluate_IconCardTypeOrn2_png",
                "ui_hunter_evaluate_IconCardTypeOrn7_png",
                "ui_hunter_evaluate_IconCardTypeOrn3_png",
                "ui_hunter_evaluate_IconCardTypeOrn4_png",
                "ui_hunter_evaluate_IconCardTypeOrn5_png",
                "ui_hunter_evaluate_IconCardTypeOrn1_png",
            ],

            // --card_star : "ui_hunter_evaluate_IconCardBigStar_png",
            card_star: "ui_hunter_evaluate_IconSkillAwaken1_png",
            card_star_next: "ui_hunter_evaluate_IconSkillAwaken4_png",
            card_Star_awaken: "ui_hunter_evaluate_IconSkillAwaken4_png",

            card_difficulty: [
                "ui_hunter_evaluate_IconWrodsCard1_png",
                "ui_hunter_evaluate_IconWrodsCard2_png",
                "ui_hunter_evaluate_IconWrodsCard3_png",
                "ui_hunter_evaluate_IconWrodsCard4_png",
                "ui_hunter_evaluate_IconWrodsCard5_png",
            ],

            card_type_title: [
                "ui_hunter_card_WordsCardTypeName7_png",
                "ui_hunter_card_WordsCardTypeName3_png",
                "ui_hunter_card_WordsCardTypeName1_png",
                "ui_hunter_card_WordsCardTypeName4_png",
                "ui_hunter_card_WordsCardTypeName5_png",
                "ui_hunter_card_WordsCardTypeName6_png",
                "ui_hunter_card_WordsCardTypeName2_png",
            ],


            card_pokedex_btn: {
                [1]: [
                    {
                        [1]: "ui_card_ButtonCardViewType1Nor_png",
                        [2]: "ui_card_ButtonCardViewType1Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType3Nor_png",
                        [2]: "ui_card_ButtonCardViewType3Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType2Nor_png",
                        [2]: "ui_card_ButtonCardViewType2Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType4Nor_png",
                        [2]: "ui_card_ButtonCardViewType4Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType5Nor_png",
                        [2]: "ui_card_ButtonCardViewType5Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType7Nor_png",
                        [2]: "ui_card_ButtonCardViewType7Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType6Nor_png",
                        [2]: "ui_card_ButtonCardViewType6Sel_png",
                    },
                ],
                [2]: [
                    {
                        [1]: "ui_card_ButtonCardViewType11Nor_png",
                        [2]: "ui_card_ButtonCardViewType11Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType12Nor_png",
                        [2]: "ui_card_ButtonCardViewType12Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType13Nor_png",
                        [2]: "ui_card_ButtonCardViewType13Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType14Nor_png",
                        [2]: "ui_card_ButtonCardViewType14Sel_png",
                    },
                    {
                        [1]: "ui_card_ButtonCardViewType15Nor_png",
                        [2]: "ui_card_ButtonCardViewType15Sel_png",
                    },
                ],
            },

            card_pokedex_title_all: {
                [1]: [
                    "ui_hunter_card_WordsCardTypeName7_png",
                    "ui_hunter_card_WordsCardTypeName1_png",
                    "ui_hunter_card_WordsCardTypeName3_png",
                    "ui_hunter_card_WordsCardTypeName4_png",
                    "ui_hunter_card_WordsCardTypeName5_png",
                    "ui_hunter_card_WordsCardTypeName6_png",
                    "ui_hunter_card_WordsCardTypeName2_png",
                ],
                [2]: [
                    "ui_card_WordsCardType11_png",
                    "ui_card_WordsCardType12_png",
                    "ui_card_WordsCardType13_png",
                    "ui_card_WordsCardType14_png",
                    "ui_card_WordsCardType15_png",
                ],
            },

            card_show_type: {
                [1]: [
                    "ui_card_ButtonCardViewNameNor_png",
                    "ui_card_ButtonCardViewNameSel_png",
                    "ui_card_ButtonCardViewNameSel_png",
                ],
                [2]: [
                    "ui_card_ButtonCardViewUserNor_png",
                    "ui_card_ButtonCardViewUserSel_png",
                    "ui_card_ButtonCardViewUserSel_png",
                ],
            },
            card_upstar_bottom: [
                "ui_card_IconCardStar1_png",
                "ui_card_IconCardStar2_png",
                "ui_card_IconCardStar3_png",
                "ui_card_IconCardStar4_png",
                "ui_card_IconCardStar5_png",
            ],

            cardGoBreak: [
                "ui_hunter_ButtonGoBreakNor_png",
                "ui_hunter_ButtonGoBreakSel_png",
            ],
            cardGoUpstar: [
                "ui_hunter_ButtonGoUpStarNor_png",
                "ui_hunter_ButtonGoUpStarSel_png",
            ],
        },

        UIConfig_Hunter_Pay: {
            extern_away: [
                "ui_mall_WordsGmestoneFirstSend_png",
                "ui_mall_WordsGmestoneFirstSendA_png",
            ],
            first_enable: [
                "ui_mall_gift_ButtonChargeFreeGetNor_png",
                "ui_mall_gift_ButtonChargeFreeGetSel_png",
                "ui_mall_gift_ButtonChargeFreeGetSel_png",
            ],
            first_disenable: [
                "ui_mall_gift_ButtonChargeFreeGetDis_png",
                "ui_mall_gift_ButtonChargeFreeGetDis_png",
                "ui_mall_gift_ButtonChargeFreeGetDis_png",
            ],
            donate: [
                "ui_mall_gift_IconMoney_png",
                "ui_iconresources_zuanshi3_png",
            ],
            getorbuy: [
                "ui_mall_IconSoldOut_png", // -- 已领取
                "ui_mall_WordsLingqu_png", // -- 已购买
            ],
            backcolor: [
                "ui_acitivity_mouthgift_BoardGiftOrdinary_png", // -- 橙色
                "ui_acitivity_mouthgift_BoardGiftLuxury_png", // --红色
            ],
            bordcolor: [
                "ui_acitivity_mouthgift_IconOrdinary_png", // -- 银色
                "ui_acitivity_mouthgift_IconLuxury_png", // --金色
            ],

            // new board
            backButton: {
                [1]: [
                    "ui_mall_new_ButtonFloorNor_png",
                    "ui_mall_new_ButtonFloorSel_png",
                    "ui_mall_new_ButtonFloorDis_png",
                ],
                [2]: [
                    "ui_mall_new_ButtonFloor1Nor_png",
                    "ui_mall_new_ButtonFloor1Sel_png",
                    "ui_mall_new_ButtonFloor1Dis_png",
                ],
            },
        },


        UIConfig_Hunter_Review_Resource: {
            loading: "ui_login_boardloading_BoardLoading6_jpg",
        },


        UIConfig_Hunter_DoubleColor: {
            RedOrBlue: [
                "ui_exchange_IconFuritType1_png",
                "ui_exchange_IconFuritType2_png",
            ],
            RedOrBlue2: [
                "ui_doublecolor_IconRed_png",
                "ui_doublecolor_IconBlue_png",
            ],
            RightOrWrong: [
                "ui_doublecolor_IconBigon_png",
                "ui_doublecolor_IconError_png",
            ],
        },


        UIConfig_Hunter_Pokedex: {
            itemButton: {
                nor: "ui_hunterpokedex_ButtonHunterListNor_png",
                sel: "ui_hunterpokedex_ButtonHunterListSel_png",
            },

            buttons: {
                // --强化
                [1]: [
                    "ui_hunterpokedex_ButtonType5Nor_png",
                    "ui_hunterpokedex_ButtonType5Sel_png",
                ],
                // --放出
                [2]: [
                    "ui_hunterpokedex_ButtonType3Nor_png",
                    "ui_hunterpokedex_ButtonType3Sel_png",
                ],
                // --具现化
                [3]: [
                    "ui_hunterpokedex_ButtonType4Nor_png",
                    "ui_hunterpokedex_ButtonType4Sel_png",
                ],
                // --特质系
                [4]: [
                    "ui_hunterpokedex_ButtonType6Nor_png",
                    "ui_hunterpokedex_ButtonType6Sel_png",
                ],
                // --变化系
                [5]: [
                    "ui_hunterpokedex_ButtonType1Nor_png",
                    "ui_hunterpokedex_ButtonType1Sel_png",
                ],
                // --操作系
                [6]: [
                    "ui_hunterpokedex_ButtonType2Nor_png",
                    "ui_hunterpokedex_ButtonType2Sel_png",
                ],
            },

            // --攻 / 防 / 辅
            feature: {
                [1]: "ui_hunterpokedex_WordsHunterTip3_png",
                [2]: "ui_hunterpokedex_WordsHunterTip1_png",
                [3]: "ui_hunterpokedex_WordsHunterTip2_png",
            },

            // --派系
            dpt: {
                [1]: "ui_hunterpokedex_WordsType1_png",
                [2]: "ui_hunterpokedex_WordsType2_png",
                [3]: "ui_hunterpokedex_WordsType5_png",
                [4]: "ui_hunterpokedex_WordsType4_png",
                [5]: "ui_hunterpokedex_WordsType3_png",
                [6]: "ui_hunterpokedex_WordsType6_png",
            },

            dpt2: {
                [1]: "ui_hunter_evaluate_IconHunterType6_png",
                [2]: "ui_hunter_evaluate_IconHunterType1_png",
                [3]: "ui_hunter_evaluate_IconHunterType3_png",
                [4]: "ui_hunter_evaluate_IconHunterType5_png",
                [5]: "ui_hunter_evaluate_IconHunterType4_png",
                [6]: "ui_hunter_evaluate_IconHunterType2_png",
            },
        },


        UIConfig_Hunter_GroupFight: {
            use: [
                "ui_groupfight_ButtonUseNor_png",
                "ui_groupfight_ButtonUseSel_png",
                "ui_groupfight_ButtonUseSel_png",
            ],
            cancel: [
                "ui_groupfight_ButtonCancelNor_png",
                "ui_groupfight_ButtonCancelSel_png",
                "ui_groupfight_ButtonCancelSel_png",
            ],
            haveUse: [
                "ui_groupfight_ButtonUseDis_png",
                "ui_groupfight_ButtonUseDis_png",
                "ui_groupfight_ButtonUseDis_png",
            ],

            chooseTeam: [
                "ui_groupfight_ButtonChooseNor_png",
                "ui_groupfight_ButtonChooseSel_png",
                "ui_groupfight_ButtonChooseSel_png",
            ],

            unChooseTeam: [
                "ui_groupfight_ButtonUnChooseNor_png",
                "ui_groupfight_ButtonUnChooseSel_png",
                "ui_groupfight_ButtonUnChooseSel_png",
            ],

            chooseOpen: [
                "ui_groupfight_ButtonLevelListNor_png",
                "ui_groupfight_ButtonLevelListSel_png",
                "ui_groupfight_ButtonLevelListSel_png",
            ],

            chooseUnOpen: [
                "ui_groupfight_ButtonLevelListDis_png",
                "ui_groupfight_ButtonLevelListDis_png",
                "ui_groupfight_ButtonLevelListDis_png",
            ],
        },


        UIConfig_Mission_Race: {
            canGet: {
                [1]: "ui_acitivity_timerace_WordsGetCan_png",
                [2]: "ui_acitivity_timerace_WordsGetDone_png",
            },
            cirlceSprite: {
                small: [
                    "ui_acitivity_timerace_PointSmall1_png",
                    "ui_acitivity_timerace_PointSmall2_png",
                ],
                big: [
                    "ui_acitivity_timerace_PointMid1_png",
                    "ui_acitivity_timerace_PointMid2_png",
                ],
                special: [
                    "ui_acitivity_timerace_PointBig1_png",
                    "ui_acitivity_timerace_PointBig2_png",
                ],
            },

            boxSprite: {
                special: [
                    "ui_acitivity_timerace_BoxBigClose_png",
                    "ui_acitivity_timerace_BoxBigOpen_png",
                ],

                normal: [
                    "ui_acitivity_timerace_BoxSmallClose_png",
                    "ui_acitivity_timerace_BoxSmallOpen_png",
                ],
            },
        },


        UIConfig_VipMall: {

            vipFloor: [
                "ui_vip_BoardAwardFloor1_png",
                "ui_vip_BoardAwardFloor1_png",
                "ui_vip_BoardAwardFloor2_png",
                "ui_vip_BoardAwardFloor3_png",
            ],

            vipAward: [
                "ui_vip_IconAward5_png",
                "ui_vip_IconAward0_png",
                "ui_vip_IconAward1_png",
                "ui_vip_IconAward2_png",
                "ui_vip_IconAward3_png",
                "ui_vip_IconAward4_png",
                "ui_vip_IconAward6_png",
            ],

            vipLevel: [
                "ui_vip_WordsTips5_png",
                "ui_vip_WordsTips0_png",
                "ui_vip_WordsTips1_png",
                "ui_vip_WordsTips2_png",
                "ui_vip_WordsTips3_png",
                "ui_vip_WordsTips4_png",
                "ui_vip_WordsTips6_png",

            ],


            vipLimit: [
                "ui_vip_WordsTipsTimes_png",  // --每周限领一次
                "ui_vip_WordsTipsTimesOnce_png",  // --限领一次
            ],

            // --使用光环
            buttonUse: [
                "ui_vip_ButtonUseAuraNor_png",
                "ui_vip_ButtonUseAuraSel_png",

            ],

            // --取消使用光环

            buttonUseCancel: [
                "ui_vip_ButtonCancelNor_png",
                "ui_vip_ButtonCancelSel_png",

            ],

            // --使用头像框

            buttonUseFrame: [
                "ui_vip_ButtonUseFrameNor_png",
                "ui_vip_ButtonUseFrameSel_png",

            ],
            // --尚未获得
            dontGet: "ui_vip_ButtonDontHaveDis_png",
            Get: [
                "ui_acitivity_ButtonConmonGetDis_png",
                "ui_acitivity_ButtonConmonGetNor_png",
                "ui_acitivity_ButtonConmonGetSel_png",
            ],

            WordsTips: "ui_vip_WordsTips_png",

            vip_title: {
                [1]: "power_speed",             //体力恢复速度
                [2]: "power_add",               //体力上限
                [3]: "instance_exp_add",        //副本经验
                [4]: "wanted_coin_add",         //流星街金币
                [5]: "mall_free_time",          //商城免费刷新
                [6]: "buy_coin_free_time",      //金币宝藏每日免费
                [7]: "runes_free_time",         //免费重新猜拳
                [8]: "fishing_free_time",       //钓鱼免费刷紫
                [9]: "package_add",             //猎人仓库容量
                [10]: "potato_add",             //卡片数量上限
                [11]: "craft_buy_time",         //跨服战可购买次数
                [12]: "scene_revive_time",      //流星街复活时间减少
                [13]: "buy_power",              //购买体力次数
            },

            low_vip_title_new: {
                [0]: "ui_mall_new_VIP0_png",
                [1]: "ui_mall_new_VIP1_png",
                [2]: "ui_mall_new_VIP2_png",
                [3]: "ui_mall_new_VIP3_png",
                [4]: "ui_mall_new_VIP4_png",
                [5]: "ui_mall_new_VIP5_png",
                [6]: "ui_mall_new_VIP6_png",
                [7]: "ui_mall_new_VIP7_png",
                [8]: "ui_mall_new_VIP8_png",
                [9]: "ui_mall_new_VIP9_png",
                [10]: "ui_mall_new_VIP10_png",
                [11]: "ui_mall_new_VIP11_png",
                [12]: "ui_mall_new_VIP12_png",
            },

            low_title_name: "ui_mall_new_WordsTitleVIP_png",
            low_title_texiao: "ui_mall_new_WordsTitleMall_png",
        },

        // --宝石活动
        UIConfig_Jewel: {
            Card: {
                img1: "ui_acitivity_jewel_BoardGetCardFloor_png",
                img2: "ui_acitivity_jewel_BoardCardUpStarFloor_png",
                text1: "ui_acitivity_jewel_WordsGetCard_png",
                text2: "ui_acitivity_jewel_WordsCardUpStar_png",
            },

            Hunter: {
                img1: "ui_acitivity_jewel_BoardGetHunterFloor_png",
                img2: "ui_acitivity_jewel_BoardHunterUpStarFloor_png",
                text1: "ui_acitivity_jewel_WordsGetHunter_png",
                text2: "ui_acitivity_jewel_WordsHunterUpStar_png",
            },

            Item: {
                img1: "ui_acitivity_jewel_BoardGetItemFloor_png",
                text1: "ui_acitivity_jewel_WordsGetItem_png",
            }
        },


        UIConfig_Hunter_break: {
            buttonBreak: {
                nor: "ui_hunter_ButtonHunterSel_png",
                sel: "ui_hunter_ButtonHunterSel_png",
            },

            buttonUpStar: {
                nor: "ui_hunter_ButtonUpStartNor_png",
                sel: "ui_hunter_ButtonUpStartSel_png",
            },

            buttonStepSkillNor: [
                "ui_hunter_break_ButtonSkill1Dis_png",
                "ui_hunter_break_ButtonSkill2Dis_png",
                "ui_hunter_break_ButtonSkill3Dis_png",
            ],

            buttonStepSkillSel: [
                "ui_hunter_break_ButtonSkill1Nor_png",
                "ui_hunter_break_ButtonSkill2Nor_png",
                "ui_hunter_break_ButtonSkill3Nor_png",
            ],

            break_level: [
                "ui_hunter_break_WordsTitle1_png",
                "ui_hunter_break_WordsTitle2_png",
                "ui_hunter_break_WordsTitle3_png",
                "ui_hunter_break_WordsTitle4_png",
                "ui_hunter_break_WordsTitle5_png",
                "ui_hunter_break_WordsTitle6_png",
                "ui_hunter_break_WordsTitle7_png",
                "ui_hunter_break_WordsTitle8_png",
                "ui_hunter_break_WordsTitle9_png",
            ],

            breakIcon: [
                "ui_hunter_evaluate_IconWrodsCard1_png",
                "ui_hunter_evaluate_IconWrodsCard2_png",
                "ui_hunter_evaluate_IconWrodsCard3_png",

            ],

            breaklevelIcon: [
                "ui_hunter_break_IconBreakCuprumCorner1_png",
                "ui_hunter_break_IconBreakCuprumCorner2_png",
                "ui_hunter_break_IconBreakCuprumCorner3_png",
                "ui_hunter_break_IconBreakSilverCorner1_png",
                "ui_hunter_break_IconBreakSilverCorner2_png",
                "ui_hunter_break_IconBreakSilverCorner3_png",
                "ui_hunter_break_IconBreakCorner1_png",
                "ui_hunter_break_IconBreakCorner2_png",
                "ui_hunter_break_IconBreakCorner3_png",
            ],

            breakTitle: [
                "ui_hunter_break_WordsSkillTitle1_png",
                "ui_hunter_break_WordsSkillTitle2_png",
                "ui_hunter_break_WordsSkillTitle3_png",
            ],

            BreakSkillIcon: [
                "ui_hunter_break_IconSkill1_png",
                "ui_hunter_break_IconSkill2_png",
                "ui_hunter_break_IconSkill3_png",
            ],

            aptitude: [
                "ui_frame_FrameHunterBule1_png",
                "ui_frame_FrameHunterViolet1_png",
                "ui_frame_FrameHunterOrange1_png",
            ]
        },

        // 黑暗大陆
        UIConfig_DarkLand: {
            campHeadPath: [
                "ui_meteor_BoardListBoss1_png",
                "ui_meteor_BoardListBoss2_png",
                "ui_meteor_BoardListBoss3_png",
                "ui_meteor_BoardListBoss4_png",
            ],

            fruitBagType: {
                [1]: [
                    "ui_wonderland_ButtonFruitWholeNor_png",
                    "ui_wonderland_ButtonFruitWholeSel_png",
                    "ui_wonderland_ButtonFruitWholeSel_png",
                ],
                [2]: [
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitRedNor.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitRedSel.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitRedSel.png",
                ],
                [3]: [
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitBlueNor.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitBlueSel.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitBlueSel.png",
                ],
                [4]: [
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeNor.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeSel.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeSel.png",
                ],
                [5]: [
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeNor.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeSel.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeSel.png",
                ],
                [6]: [
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeNor.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeSel.png",
                    "ccbResources/common_ui/HXH_Wonderland/ButtonFruitWholeSel.png",
                ],
            },

            mallName: {
                [1]: {
                    [1]: "ccbResources/common_ui/HXH_Mall/ButtonMallNor.png",
                    [2]: "ccbResources/common_ui/HXH_Mall/ButtonMallSel.png",
                },
                [2]: {
                    [1]: "ccbResources/common_ui/HXH_Mall/ButtonMallArenaNor.png",
                    [2]: "ccbResources/common_ui/HXH_Mall/ButtonMallArenaSel.png",
                },
            },

            peace: {
                [1]: "ui_wonderland_IconWonderlandType22_png",
                [2]: "ui_wonderland_IconWonderlandType22_png",
                [3]: "ui_wonderland_IconWonderlandType22_png",
            },

            battle: {
                [1]: "ui_wonderland_IconWonderlandType11_png",
                [2]: "ui_wonderland_IconWonderlandType11_png",
                [3]: "ui_wonderland_IconWonderlandType11_png",
            },


            relicHurtLevel2: [
                "ui_darkland_relic_IconBigD_png",
                "ui_darkland_relic_IconBigC1_png",
                "ui_darkland_relic_IconBigC2_png",
                "ui_darkland_relic_IconBigC3_png",
                "ui_darkland_relic_IconBigB1_png",
                "ui_darkland_relic_IconBigB2_png",
                "ui_darkland_relic_IconBigB3_png",
                "ui_darkland_relic_IconBigA1_png",
                "ui_darkland_relic_IconBigA2_png",
                "ui_darkland_relic_IconBigA3_png",
                "ui_darkland_relic_IconBigS1_png",
                "ui_darkland_relic_IconBigS2_png",
                "ui_darkland_relic_IconBigS3_png",
                "ui_darkland_relic_IconBigSS1_png",
                "ui_darkland_relic_IconBigSS2_png",
                "ui_darkland_relic_IconBigSS3_png",
            ],

            relicHurtLevel: [
                "ui_darkland_relic_IconD_png",
                "ui_darkland_relic_IconC1_png",
                "ui_darkland_relic_IconC2_png",
                "ui_darkland_relic_IconC3_png",
                "ui_darkland_relic_IconB1_png",
                "ui_darkland_relic_IconB2_png",
                "ui_darkland_relic_IconB3_png",
                "ui_darkland_relic_IconA1_png",
                "ui_darkland_relic_IconA2_png",
                "ui_darkland_relic_IconA3_png",
                "ui_darkland_relic_IconS1_png",
                "ui_darkland_relic_IconS2_png",
                "ui_darkland_relic_IconS3_png",
                "ui_darkland_relic_IconSS1_png",
                "ui_darkland_relic_IconSS2_png",
                "ui_darkland_relic_IconSS3_png",
            ],

            relicLevelEnd: [
                "ui_darkland_relic_WordsEnd1_png",
                "ui_darkland_relic_WordsEnd2_png",
                "ui_darkland_relic_WordsEnd3_png",
                "ui_darkland_relic_WordsEnd4_png",
                "ui_darkland_relic_WordsEnd5_png",
            ],
            relicHurtLevelWords: [
                "ui_darkland_relic_WordsHurtTitle1_png",
                "ui_darkland_relic_WordsHurtTitle2_png",
                "ui_darkland_relic_WordsHurtTitle3_png",
            ],
            relicRankWords: [
                "ccbResources/common_ui/HXH_DarkLand/HXH_Relic/WordsTitleRank1.png",
                "ccbResources/common_ui/HXH_DarkLand/HXH_Relic/WordsTitleRank2.png",
                "ccbResources/common_ui/HXH_DarkLand/HXH_Relic/WordsTitleRank3.png",
            ],
            relicBigStar: [
                "ui_darkland_relic_xingxing1_png",
                "ui_darkland_relic_xingxing2_png",
            ],

            relicSmallStar: [
                "ui_darkland_relic_IconStar_png",
                "ui_darkland_relic_IconStarDis_png",
            ],

            relicDropDes: [
                "ui_darkland_relic_WordsDropDes1_png",
                "ui_darkland_relic_WordsDropDes2_png",
                "ui_darkland_relic_WordsDropDes3_png",
            ],

            relicDropTitle: [
                "ui_darkland_relic_WordsTitleAwardView1_png",
                "ui_darkland_relic_WordsTitleAwardView2_png",
                "ui_darkland_relic_WordsTitleAwardView3_png",
            ],
        },

        // --装备
        UIConfig_Hunter_Equip: {

            Speical_Frame: {
                [0]: "ui_hunter_collection_SpeicalFrame0_png",
                [1]: "ui_hunter_collection_SpeicalFrame1_png",
                [2]: "ui_hunter_collection_SpeicalFrame2_png",
                [3]: "ui_hunter_collection_SpeicalFrame3_png",
                [4]: "ui_hunter_collection_SpeicalFrame4_png",
                [5]: "ui_hunter_collection_SpeicalFrame5_png",
                [6]: "ui_hunter_collection_SpeicalFrame6_png",
            },

            Normal_Frame: {
                [0]: "ui_hunter_collection_SpeicalFrame0_png",
                [1]: "ui_hunter_collection_NormalFrame1_png",
                [2]: "ui_hunter_collection_NormalFrame2_png",
                [3]: "ui_hunter_collection_NormalFrame3_png",
                [4]: "ui_hunter_collection_NormalFrame4_png",
                [5]: "ui_hunter_collection_NormalFrame5_png",
                [6]: "ui_hunter_collection_NormalFrame6_png",
            },


            specailName: {
                nor: "ccbResources/common_ui/HXH_Hunter/HXH_Collection/specialNor.png",
                dis: "ccbResources/common_ui/HXH_Hunter/HXH_Collection/specialDis.png",
            },

            buttonLock: {
                nor: "ccbResources/common_ui/HXH_Hunter/HXH_Collection/ButtonLockNor.png",
                sel: "ccbResources/common_ui/HXH_Hunter/HXH_Collection/ButtonLockSel.png",
            },

            buttonSele: {
                nor: "ccbResources/common_ui/HXH_Hunter/CollectCompoundNor.png",
                sel: "ccbResources/common_ui/HXH_Hunter/CollectCompoundSel.png",
            },

            collectLevel1: "ui_hunter_collection_hunterlevelThree_png",
            collectLevel2: "ui_hunter_collection_hunterlevelFour_png",

            common_hint: {
                [1]: "ui_hunter_collection_lockSuccess_png", // -- 激活成功
                [2]: "ui_hunter_collection_selectSuccess_png", // -- 合成成功
                [3]: "ui_hunter_collection_stepSuccess_png", // --升品
                [4]: "ui_hunter_collection_strengthSuccess_png", // --强化
                [5]: "ui_hunter_break_WordsUpSuccess_png", // --升级成功

            },

            collection: [
                "ui_hunter_collection_blood_png",
                "ui_hunter_collection_atk_png",
                "ui_hunter_collection_def_png",
                "ui_hunter_collection_Star_png",
                "ui_hunter_collection_hit_png",
                "ui_hunter_collection_resist_png"
            ],

            itemFrame: [
                "ui_frame_FrameHunterAsh_png",
                "ui_frame_FrameHunterGreen1_png",
                "ui_frame_FrameHunterBule1_png",
                "ui_frame_FrameHunterViolet1_png",
                "ui_frame_FrameHunterRed1_png",
                "ui_frame_FrameHunterGold1_png",
            ],

            frameBoard: [
                "ui_hunter_collection_BoardStarFloor1_png",
                "ui_hunter_collection_BoardStarFloor2_png",
                "ui_hunter_collection_BoardStarFloor3_png",
                "ui_hunter_collection_BoardStarFloor4_png",
                "ui_hunter_collection_BoardStarFloor5_png",
                "ui_hunter_collection_BoardStarFloor6_png",
            ],

            spriteStar: [
                "ui_hunter_collection_IconStar1_png",
                "ui_hunter_collection_IconStar2_png",
                "ui_hunter_collection_IconStar3_png",
                "ui_hunter_collection_IconStar4_png",
                "ui_hunter_collection_IconStar5_png",
                "ui_hunter_collection_IconStar6_png",
                "ui_hunter_collection_IconStar7_png",
                "ui_hunter_collection_IconStar8_png",
                "ui_hunter_collection_IconStar9_png",
                "ui_hunter_collection_IconStar10_png",
                "ui_hunter_collection_IconStar11_png",
                "ui_hunter_collection_IconStar12_png",
                "ui_hunter_collection_IconStar13_png",
                "ui_hunter_collection_IconStar14_png",
                "ui_hunter_collection_IconStar15_png",
                "ui_hunter_collection_IconStar16_png",
                "ui_hunter_collection_IconStar17_png",
                "ui_hunter_collection_IconStar18_png",
                "ui_hunter_collection_IconStar19_png",
                "ui_hunter_collection_IconStar20_png",
                "ui_hunter_collection_IconStar21_png",
                "ui_hunter_collection_IconStar22_png",
                "ui_hunter_collection_IconStar23_png",
                "ui_hunter_collection_IconStar24_png",
                "ui_hunter_collection_IconStar25_png",
                "ui_hunter_collection_IconStar26_png",
            ],
        },

        // 新手活动
        UIConfig_Novice: {
            [1]: {
                gift: [
                    "ui_acitivity_novicenew_ButtonAwardSel_png",
                    "ui_acitivity_novicenew_ButtonAwardNor_png",
                    "ui_acitivity_novicenew_ButtonAwardDis_png",
                ],
                button: {
                    [1]: [
                        "ui_acitivity_novicenew_ButtonDrinkNor_png",
                        "ui_acitivity_novicenew_ButtonDrinkSel_png",
                        "ui_acitivity_novicenew_ButtonDrinkSel_png",
                    ],
                    [2]: [
                        "ui_acitivity_novicenew_ButtonUpAdvanceNor_png",
                        "ui_acitivity_novicenew_ButtonUpAdvanceSel_png",
                        "ui_acitivity_novicenew_ButtonUpAdvanceSel_png",
                    ],
                    [3]: [
                        "ui_acitivity_novicenew_ButtonHunterNor_png",
                        "ui_acitivity_novicenew_ButtonHunterSel_png",
                        "ui_acitivity_novicenew_ButtonHunterSel_png",
                    ]
                },
                get: [
                    "ui_acitivity_novicenew_ButtonGetNor_png",
                    "ui_acitivity_novicenew_ButtonGetSel_png",
                    "ui_acitivity_novicenew_ButtonGetSel_png",
                ],
                go: [
                    "ui_acitivity_novicenew_ButtonGoNor_png",
                    "ui_acitivity_novicenew_ButtonGoSel_png",
                    "ui_acitivity_novicenew_ButtonGoSel_png",
                ],
                star: [
                    "ui_acitivity_novice_IconStarNor_png",
                    "ui_acitivity_novice_IconStarSel_png",
                ],
                getItem: "ui_acitivity_novicenew_WordsTipKelingqu2_png",
                floor: "ui_acitivity_novicenew_BoardItem_png",
            },
            [2]: {
                gift: [
                    "ui_acitivity_novicehigh_ButtonAwardSel_png",
                    "ui_acitivity_novicehigh_ButtonAwardNor_png",
                    "ui_acitivity_novicehigh_ButtonAwardDis_png",
                ],
                button: {
                    [1]: [
                        "ui_acitivity_novicehigh_ButtonUpAdvanceNor_png",
                        "ui_acitivity_novicehigh_ButtonUpAdvanceSel_png",
                        "ui_acitivity_novicehigh_ButtonUpAdvanceSel_png",
                    ],
                    [2]: [
                        "ui_acitivity_novicehigh_ButtonWeakNor_png",
                        "ui_acitivity_novicehigh_ButtonWeakSel_png",
                        "ui_acitivity_novicehigh_ButtonWeakSel_png",
                    ],
                    [3]: [
                        "ui_acitivity_novicehigh_ButtonHunterNor_png",
                        "ui_acitivity_novicehigh_ButtonHunterSel_png",
                        "ui_acitivity_novicehigh_ButtonHunterSel_png",
                    ]
                },
                get: [
                    "ui_acitivity_novicenew_ButtonGetNor_png",
                    "ui_acitivity_novicenew_ButtonGetSel_png",
                    "ui_acitivity_novicenew_ButtonGetSel_png",
                ],
                go: [
                    "ui_acitivity_novicenew_ButtonGoNor_png",
                    "ui_acitivity_novicenew_ButtonGoSel_png",
                    "ui_acitivity_novicenew_ButtonGoSel_png",
                ],
                star: [
                    "ui_acitivity_novice_IconStarNor_png",
                    "ui_acitivity_novice_IconStarSel_png",
                ],
                getItem: "ui_acitivity_novicenew_WordsTipKelingqu2_png",
                floor: "ui_acitivity_novicenew_BoardItem_png",
            },
            [3]: {
                gift: [
                    "ui_acitivity_novicecontinue_ButtonAwardSel_png",
                    "ui_acitivity_novicecontinue_ButtonAwardNor_png",
                    "ui_acitivity_novicecontinue_ButtonAwardDis_png",
                ],
                button: {
                    [1]: [
                        "ui_acitivity_novicecontinue_ButtonMeteorNor_png",
                        "ui_acitivity_novicecontinue_ButtonMeteorSel_png",
                        "ui_acitivity_novicecontinue_ButtonMeteorSel_png",
                    ],
                    [2]: [
                        "ui_acitivity_novicecontinue_ButtonCardNor_png",
                        "ui_acitivity_novicecontinue_ButtonCardSel_png",
                        "ui_acitivity_novicecontinue_ButtonCardSel_png",
                    ],
                    [3]: [
                        "ui_acitivity_novicecontinue_ButtonUpNor_png",
                        "ui_acitivity_novicecontinue_ButtonUpSel_png",
                        "ui_acitivity_novicecontinue_ButtonUpSel_png",
                    ]
                },
                get: [
                    "ui_acitivity_novicecontinue_ButtonGetNor_png",
                    "ui_acitivity_novicecontinue_ButtonGetSel_png",
                    "ui_acitivity_novicecontinue_ButtonGetSel_png",
                ],
                go: [
                    "ui_acitivity_novicecontinue_ButtonGoNor_png",
                    "ui_acitivity_novicecontinue_ButtonGoSel_png",
                    "ui_acitivity_novicecontinue_ButtonGoSel_png",
                ],
                star: [
                    "ui_acitivity_novicecontinue_IconStarNor_png",
                    "ui_acitivity_novicecontinue_IconStarSel_png",
                ],
                getItem: "ui_acitivity_novicecontinue_WordsTipKelingqu2_png",
                floor: "ui_acitivity_novicecontinue_BoardItem_png",
            },
            [4]: {
                gift: [
                    "ui_acitivity_novicecontinue_ButtonAwardSel_png",
                    "ui_acitivity_novicecontinue_ButtonAwardNor_png",
                    "ui_acitivity_novicecontinue_ButtonAwardDis_png",
                ],
                button: {
                    [1]: [
                        "ui_acitivity_novicecontinue_ButtonMeteorNor_png",
                        "ui_acitivity_novicecontinue_ButtonMeteorSel_png",
                        "ui_acitivity_novicecontinue_ButtonMeteorSel_png",
                    ],
                    [2]: [
                        "ui_acitivity_novicecontinue_ButtonCardNor_png",
                        "ui_acitivity_novicecontinue_ButtonCardSel_png",
                        "ui_acitivity_novicecontinue_ButtonCardSel_png",
                    ],
                    [3]: [
                        "ui_acitivity_novicecontinue_ButtonUpNor_png",
                        "ui_acitivity_novicecontinue_ButtonUpSel_png",
                        "ui_acitivity_novicecontinue_ButtonUpSel_png",
                    ]
                },
                get: [
                    "ui_acitivity_novicecontinue_ButtonGetNor_png",
                    "ui_acitivity_novicecontinue_ButtonGetSel_png",
                    "ui_acitivity_novicecontinue_ButtonGetSel_png",
                ],
                go: [
                    "ui_acitivity_novicecontinue_ButtonGoNor_png",
                    "ui_acitivity_novicecontinue_ButtonGoSel_png",
                    "ui_acitivity_novicecontinue_ButtonGoSel_png",
                ],
                star: [
                    "ui_acitivity_novicecontinue_IconStarNor_png",
                    "ui_acitivity_novicecontinue_IconStarSel_png",
                ],
                getItem: "ui_acitivity_novicecontinue_WordsTipKelingqu2_png",
                floor: "ui_acitivity_novicecontinue_BoardItem_png",
                hero: "hero_half_wj_maqi_png",
                title: "ui_acitivity_novicehigh_WordsTitle1_png",
            },
            [5]: {
                gift: [
                    "ui_acitivity_novicecontinue_ButtonAwardSel_png",
                    "ui_acitivity_novicecontinue_ButtonAwardNor_png",
                    "ui_acitivity_novicecontinue_ButtonAwardDis_png",
                ],
                button: {
                    [1]: [
                        "ui_acitivity_novicecontinue_ButtonMeteorNor_png",
                        "ui_acitivity_novicecontinue_ButtonMeteorSel_png",
                        "ui_acitivity_novicecontinue_ButtonMeteorSel_png",
                    ],
                    [2]: [
                        "ui_acitivity_novicecontinue_ButtonCardNor_png",
                        "ui_acitivity_novicecontinue_ButtonCardSel_png",
                        "ui_acitivity_novicecontinue_ButtonCardSel_png",
                    ],
                    [3]: [
                        "ui_acitivity_novicecontinue_ButtonUpNor_png",
                        "ui_acitivity_novicecontinue_ButtonUpSel_png",
                        "ui_acitivity_novicecontinue_ButtonUpSel_png",
                    ]
                },
                get: [
                    "ui_acitivity_novicecontinue_ButtonGetNor_png",
                    "ui_acitivity_novicecontinue_ButtonGetSel_png",
                    "ui_acitivity_novicecontinue_ButtonGetSel_png",
                ],
                go: [
                    "ui_acitivity_novicecontinue_ButtonGoNor_png",
                    "ui_acitivity_novicecontinue_ButtonGoSel_png",
                    "ui_acitivity_novicecontinue_ButtonGoSel_png",
                ],
                star: [
                    "ui_acitivity_novicecontinue_IconStarNor_png",
                    "ui_acitivity_novicecontinue_IconStarSel_png",
                ],
                getItem: "ui_acitivity_novicecontinue_WordsTipKelingqu2_png",
                floor: "ui_acitivity_novicecontinue_BoardItem_png",
                hero: "hero_half_wj_kubi_png",
                title: "ui_acitivity_novicehigh_WordsTitle2_png",
            },
        },

        UIConfig_Activity_Battle: {
            skill_level: [
                "ui_storyinstance_transform_0_png",
                "ui_storyinstance_transform_1_png",
                "ui_storyinstance_transform_2_png",
                "ui_storyinstance_transform_3_png",
                "ui_storyinstance_transform_4_png",
                "ui_storyinstance_transform_5_png",
                "ui_storyinstance_transform_6_png",
                "ui_storyinstance_transform_7_png",
                "ui_storyinstance_transform_8_png",
                "ui_storyinstance_transform_9_png",
                "ui_storyinstance_transform_0_png",
            ],
            skillFrame: "ui_storyinstance_transform_FrameTransform_png",
            spriteframe: {
                [1]: "ui_storyinstance_transform_FrameTransform_png",
                [2]: "ui_frame_FrameSkillSelected_png",
            },
        },

        UIConfig_BattlePass: {
            lowPass: "ui_battlePass_SpriteLow_png",
            highPass: "ui_battlePass_SpriteHigh_png",

            passMissFinishedNor: "ui_battlePass_ButtonToDoNor_png",
            passMissFinishedSel: "ui_battlePass_ButtonToDoSel_png",

            passMissGetRewardNor: "ui_battlePass_ButtonGetNor_png",
            passMissGetRewardSel: "ui_battlePass_ButtonGetSel_png",


            highPassGetNor: "ui_battlePass_LvUp_ButtonGetLNor_png",
            highPassGetSel: "ui_battlePass_LvUp_ButtonGetLSel_png",

            dianPassGetNor: "ui_battlePass_LvUp_ButtonGetHNor_png",
            dianPassGetSel: "ui_battlePass_LvUp_ButtonGetHSel_png",

            iconLowPass: "ui_battlePass_IconLowPass_png",
            iconHighPass: "ui_battlePass_IconHighPass_png"
        }


    }

}