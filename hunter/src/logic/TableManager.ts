namespace zj {
    // 策划配置文件结构定义
    // Generate by auto tools
    // 2019-01-18


    // client_potato_screen.csv
    export class TableClientPotatoScreen {
        public id: number = 0; // 道具编号
        public name: string = ""; // 道具名字
        public type: number = 0; // 是否主属性
        public includeIds = new Array<number>(); // 包含id

        private static table: { [key: string]: TableClientPotatoScreen } = null;

        public static Table(): { [key: string]: TableClientPotatoScreen } {
            if (TableClientPotatoScreen.table == null) {
                TableClientPotatoScreen.table = <{ [key: string]: TableClientPotatoScreen }>Game.ConfigManager.getTable("client_potato_screen.json");
                if (TableClientPotatoScreen.table == null) TableClientPotatoScreen.table = {};
            }
            return TableClientPotatoScreen.table;
        }

        public static Item(key: number | string): TableClientPotatoScreen {
            if (key == undefined || key == null) return null;
            let item = TableClientPotatoScreen.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientPotatoScreen'] = TableClientPotatoScreen;


    // client_table_action_displacement.csv
    export class TableClientActionDisplacement {
        public id: number = 0; // 位移序列号
        public type: number = 0; // 类型
        public name: string = ""; // 名称
        public num: number = 0; // 攻击次数
        public time: number = 0; // 间隔时间
        public continue_time: number = 0; // 持续时间
        public displacement_speed = new Array<number>(); // x、y速度
        public displacement_acceleration = new Array<number>(); // x、y加速度
        public acceleration_time: number = 0; // 加速度时间
        public end_pos = new Array<number>(); // 指向位置
        public _bug: string = ""; // 改bug临时

        private static table: { [key: string]: TableClientActionDisplacement } = null;

        public static Table(): { [key: string]: TableClientActionDisplacement } {
            if (TableClientActionDisplacement.table == null) {
                TableClientActionDisplacement.table = <{ [key: string]: TableClientActionDisplacement }>Game.ConfigManager.getTable("client_table_action_displacement.json");
                if (TableClientActionDisplacement.table == null) TableClientActionDisplacement.table = {};
            }
            return TableClientActionDisplacement.table;
        }

        public static Item(key: number | string): TableClientActionDisplacement {
            if (key == undefined || key == null) return null;
            let item = TableClientActionDisplacement.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientActionDisplacement'] = TableClientActionDisplacement;


    // client_table_ani_css_source.csv
    export class TableClientAniCssSource {
        public id: number = 0; // 序列号
        public name: string = ""; // 名称(必填)
        public json: string = ""; // 路径
        public number: number = 0; // 分解数量

        private static table: { [key: string]: TableClientAniCssSource } = null;
        private static table2: { [key: string]: TableClientAniCssSource } = null;

        public static Table(): { [key: string]: TableClientAniCssSource } {
            if (TableClientAniCssSource.table == null) {
                TableClientAniCssSource.table = <{ [key: string]: TableClientAniCssSource }>Game.ConfigManager.getTable("client_table_ani_css_source.json");
                if (TableClientAniCssSource.table == null) TableClientAniCssSource.table = {};
            }
            return TableClientAniCssSource.table;
        }

        public static Table2(): { [key: string]: TableClientAniCssSource } {
            if (TableClientAniCssSource.table2 == null) {
                let tmp = <{ [key: string]: TableClientAniCssSource }>Game.ConfigManager.getTable("client_table_ani_css_source.json");
                TableClientAniCssSource.table2 = {};
                for (let k in tmp) {
                    TableClientAniCssSource.table2[tmp[k].name] = tmp[k];
                }
            }
            return TableClientAniCssSource.table2;
        }

        public static Item(key: number | string): TableClientAniCssSource {
            if (key == undefined || key == null) return null;
            let item = TableClientAniCssSource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }

        public static Item2(key: number | string): TableClientAniCssSource {
            if (key == undefined || key == null) return null;
            let item = TableClientAniCssSource.Table2()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientAniCssSource'] = TableClientAniCssSource;


    // client_table_ani_particle_source.csv
    export class TableClientAniParticleSource {
        public id: number = 0; // 序列号
        public plist: string = ""; // 名称(必填)
        public des: string = ""; // 备注

        private static table: { [key: string]: TableClientAniParticleSource } = null;

        public static Table(): { [key: string]: TableClientAniParticleSource } {
            if (TableClientAniParticleSource.table == null) {
                TableClientAniParticleSource.table = <{ [key: string]: TableClientAniParticleSource }>Game.ConfigManager.getTable("client_table_ani_particle_source.json");
                if (TableClientAniParticleSource.table == null) TableClientAniParticleSource.table = {};
            }
            return TableClientAniParticleSource.table;
        }

        public static Item(key: number | string): TableClientAniParticleSource {
            if (key == undefined || key == null) return null;
            let item = TableClientAniParticleSource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientAniParticleSource'] = TableClientAniParticleSource;


    // client_table_ani_spine_source.csv
    export class TableClientAniSpineSource {
        public id: number = 0; // 序列号
        public des: string = ""; // 备注xx
        public json: string = ""; // 路径
        public atlas: string = ""; // 路径
        public ani_name: string = ""; // 动画名字
        public loop: string = ""; // 是否循环播放

        private static table: { [key: string]: TableClientAniSpineSource } = null;

        public static Table(): { [key: string]: TableClientAniSpineSource } {
            if (TableClientAniSpineSource.table == null) {
                TableClientAniSpineSource.table = <{ [key: string]: TableClientAniSpineSource }>Game.ConfigManager.getTable("client_table_ani_spine_source.json");
                if (TableClientAniSpineSource.table == null) TableClientAniSpineSource.table = {};
            }
            return TableClientAniSpineSource.table;
        }

        public static Item(key: number | string): TableClientAniSpineSource {
            if (key == undefined || key == null) return null;
            let item = TableClientAniSpineSource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientAniSpineSource'] = TableClientAniSpineSource;


    // client_table_ani_spx_source.csv
    export class TableClientAniSpxSource {
        public id: number = 0; // 序列号
        public name: string = ""; // 名称(必填)
        public des: string = ""; // 描述
        public json: string = ""; // 路径
        public number: number = 0; // 分解数量
        public extra: string = ""; // 额外描述
        public order: number = 0; // 层级

        private static table: { [key: string]: TableClientAniSpxSource } = null;

        public static Table(): { [key: string]: TableClientAniSpxSource } {
            if (TableClientAniSpxSource.table == null) {
                TableClientAniSpxSource.table = <{ [key: string]: TableClientAniSpxSource }>Game.ConfigManager.getTable("client_table_ani_spx_source.json");
                if (TableClientAniSpxSource.table == null) TableClientAniSpxSource.table = {};
            }
            return TableClientAniSpxSource.table;
        }

        public static Item(key: number | string): TableClientAniSpxSource {
            if (key == undefined || key == null) return null;
            let item = TableClientAniSpxSource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientAniSpxSource'] = TableClientAniSpxSource;


    // client_table_ani_ui.csv
    export class TableClientAniUi {
        public id: number = 0; // 序列号
        public css_id: number = 0; // 映射css_resource表的id
        public index: number = 0; // 子动画序号
        public indexes = new Array<number>(); // 子动画序号（组合播放）
        public blend: number = 0; // 混合
        public des: string = ""; // 描述
        public bones = new Array<string>(); // 需要混合的骨骼名

        private static table: { [key: string]: TableClientAniUi } = null;
        private static table2: { [key: string]: TableClientAniUi } = null;

        public static Table(): { [key: string]: TableClientAniUi } {
            if (TableClientAniUi.table == null) {
                TableClientAniUi.table = <{ [key: string]: TableClientAniUi }>Game.ConfigManager.getTable("client_table_ani_ui.json");
                if (TableClientAniUi.table == null) TableClientAniUi.table = {};
            }
            return TableClientAniUi.table;
        }

        public static Table2(): { [key: string]: TableClientAniUi } {
            if (TableClientAniUi.table2 == null) {
                let tmp = <{ [key: string]: TableClientAniUi }>Game.ConfigManager.getTable("client_table_ani_ui.json");
                TableClientAniUi.table2 = {};
                for (let k in tmp) {
                    TableClientAniUi.table2[tmp[k].css_id + "_" + tmp[k].index] = tmp[k];
                }
            }
            return TableClientAniUi.table2;
        }

        public static Item(key: number | string): TableClientAniUi {
            if (key == undefined || key == null) return null;
            let item = TableClientAniUi.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }

        public static Item2(key: number | string): TableClientAniUi {
            if (key == undefined || key == null) return null;
            let item = TableClientAniUi.Table2()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientAniUi'] = TableClientAniUi;


    // client_table_bgm_resource.csv
    // 声音资源表
    export class TableClientBgmResource {
        public sound_id: number = 0; // id
        public name: string = ""; // 说明
        public sound_path: string = ""; // 路径
        public sound_vol: number = 0; // 音量
        public loop: number = 0; // 循环

        private static table: { [key: string]: TableClientBgmResource } = null;

        public static Table(): { [key: string]: TableClientBgmResource } {
            if (TableClientBgmResource.table == null) {
                TableClientBgmResource.table = <{ [key: string]: TableClientBgmResource }>Game.ConfigManager.getTable("client_table_bgm_resource.json");
                if (TableClientBgmResource.table == null) TableClientBgmResource.table = {};
            }
            return TableClientBgmResource.table;
        }

        public static Item(key: number | string): TableClientBgmResource {
            if (key == undefined || key == null) return null;
            let item = TableClientBgmResource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientBgmResource'] = TableClientBgmResource;


    // client_table_boss_information.csv
    // boss介绍，本地
    export class TableClientBossInformation {
        public information_id: number = 0; // information_id
        public boss_name: string = ""; // Boss名称
        public boss_name_path: string = ""; // Boss名称图片路径
        public boss_mapRoleId: number = 0; // Boss形象id（映射map_role表）
        public boss_aptitude: string = ""; // 资质图片
        public boss_des: string = ""; // Boss介绍图片

        private static table: { [key: string]: TableClientBossInformation } = null;

        public static Table(): { [key: string]: TableClientBossInformation } {
            if (TableClientBossInformation.table == null) {
                TableClientBossInformation.table = <{ [key: string]: TableClientBossInformation }>Game.ConfigManager.getTable("client_table_boss_information.json");
                if (TableClientBossInformation.table == null) TableClientBossInformation.table = {};
            }
            return TableClientBossInformation.table;
        }

        public static Item(key: number | string): TableClientBossInformation {
            if (key == undefined || key == null) return null;
            let item = TableClientBossInformation.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientBossInformation'] = TableClientBossInformation;


    // client_table_buff_base.csv
    export class TableClientBuffBase {
        public buff_id: number = 0; // buff唯一序列号
        public buff_name: string = ""; // 名称
        public buff_ani: number = 0; // 是否显示通用动画
        public buff_ima_path: string = ""; // 通用图片路径
        public spx_id: number = 0; // 资源序列号
        public action_id: number = 0; // 行为序列号
        public blend_active: number = 0; // 混合通道是否开启
        public buff_pos: string = ""; // 位置
        public ani_trigger = new Array<number>(); // 动画触发类型
        public word_trigger = new Array<number>(); // 效果字触发方式
        public buff_profit: number = 0; // 是不是有益buff
        public is_fold: number = 0; // 是否叠加
        public fold_number: number = 0; // 效果叠加上限
        public buff_name_path: string = ""; // 名称路径
        public is_showIcon: number = 0; // 是否显示icon
        public is_Iconlist: number = 0; // 是否列表显示icon
        public icon_path: string = ""; // icon路径
        public is_foldIcon: number = 0; // icon叠加
        public des: string = ""; // 描述

        private static table: { [key: string]: TableClientBuffBase } = null;

        public static Table(): { [key: string]: TableClientBuffBase } {
            if (TableClientBuffBase.table == null) {
                TableClientBuffBase.table = <{ [key: string]: TableClientBuffBase }>Game.ConfigManager.getTable("client_table_buff_base.json");
                if (TableClientBuffBase.table == null) TableClientBuffBase.table = {};
            }
            return TableClientBuffBase.table;
        }

        public static Item(key: number | string): TableClientBuffBase {
            if (key == undefined || key == null) return null;
            let item = TableClientBuffBase.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientBuffBase'] = TableClientBuffBase;


    // client_table_consume.csv
    export class TableClientConsume {
        public index: number = 0; // 序号
        public info: string = ""; // 说明
        public type: number = 0; // 数字类型
        public consume: string = ""; // 枚举类型(看协议)
        public title: string = ""; // 主标题文字
        public path: string = ""; // 主标题图片
        public count: string = ""; // 计数文字
        public path_count: string = ""; // 累计图片
        public resource: number = 0; // 计数资源
        public acount: string = ""; // 领取文字

        private static table: { [key: string]: TableClientConsume } = null;

        public static Table(): { [key: string]: TableClientConsume } {
            if (TableClientConsume.table == null) {
                TableClientConsume.table = <{ [key: string]: TableClientConsume }>Game.ConfigManager.getTable("client_table_consume.json");
                if (TableClientConsume.table == null) TableClientConsume.table = {};
            }
            return TableClientConsume.table;
        }

        public static Item(key: number | string): TableClientConsume {
            if (key == undefined || key == null) return null;
            let item = TableClientConsume.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientConsume'] = TableClientConsume;


    // client_table_error.csv
    export class TableClientError {
        public id: number = 0; // 错误码
        public des_default: string = ""; // 默认描述
        public des_custom: string = ""; // 自定义描述

        private static table: { [key: string]: TableClientError } = null;

        public static Table(): { [key: string]: TableClientError } {
            if (TableClientError.table == null) {
                TableClientError.table = <{ [key: string]: TableClientError }>Game.ConfigManager.getTable("client_table_error.json");
                if (TableClientError.table == null) TableClientError.table = {};
            }
            return TableClientError.table;
        }

        public static Item(key: number | string): TableClientError {
            if (key == undefined || key == null) return null;
            let item = TableClientError.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientError'] = TableClientError;


    // client_table_fight_ani_spine_source.csv
    export class TableClientFightAniSpineSource {
        public id: number = 0; // 序列号
        public des: string = ""; // 备注xx（资源名称）
        public json: string = ""; // 路径
        public atlas: string = ""; // 路径
        public ani_name: string = ""; // 动画名字
        public loop: number = 0; // 是否循环播放
        public key: number = 0; // 
        public order: number = 0; // 

        private static table: { [key: string]: TableClientFightAniSpineSource } = null;

        public static Table(): { [key: string]: TableClientFightAniSpineSource } {
            if (TableClientFightAniSpineSource.table == null) {
                TableClientFightAniSpineSource.table = <{ [key: string]: TableClientFightAniSpineSource }>Game.ConfigManager.getTable("client_table_fight_ani_spine_source.json");
                if (TableClientFightAniSpineSource.table == null) TableClientFightAniSpineSource.table = {};
            }
            return TableClientFightAniSpineSource.table;
        }

        public static Item(key: number | string): TableClientFightAniSpineSource {
            if (key == undefined || key == null) return null;
            let item = TableClientFightAniSpineSource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientFightAniSpineSource'] = TableClientFightAniSpineSource;


    // client_table_fight_combo.csv
    // 连击表
    export class TableClientFightCombo {
        public combo_lv: number = 0; // 连击等级
        public combo_des: string = ""; // 连击备注
        public combo_condition: number = 0; // 连击触发条件时机
        public buff_id: number = 0; // buff序列号
        public buff_lv: number = 0; // buff等级

        private static table: { [key: string]: TableClientFightCombo } = null;

        public static Table(): { [key: string]: TableClientFightCombo } {
            if (TableClientFightCombo.table == null) {
                TableClientFightCombo.table = <{ [key: string]: TableClientFightCombo }>Game.ConfigManager.getTable("client_table_fight_combo.json");
                if (TableClientFightCombo.table == null) TableClientFightCombo.table = {};
            }
            return TableClientFightCombo.table;
        }

        public static Item(key: number | string): TableClientFightCombo {
            if (key == undefined || key == null) return null;
            let item = TableClientFightCombo.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientFightCombo'] = TableClientFightCombo;


    // client_table_get_prop.csv
    // 产出表
    export class TableClientGetProp {
        public index: number = 0; // 获取类型
        public name: string = ""; // 获取途径名称
        public info: string = ""; // 其他提示
        public path: string = ""; // 图标
        public open: string = ""; // 未开启提示
        public skip: string = ""; // 是否跳转(避免逻辑错误)

        private static table: { [key: string]: TableClientGetProp } = null;

        public static Table(): { [key: string]: TableClientGetProp } {
            if (TableClientGetProp.table == null) {
                TableClientGetProp.table = <{ [key: string]: TableClientGetProp }>Game.ConfigManager.getTable("client_table_get_prop.json");
                if (TableClientGetProp.table == null) TableClientGetProp.table = {};
            }
            return TableClientGetProp.table;
        }

        public static Item(key: number | string): TableClientGetProp {
            if (key == undefined || key == null) return null;
            let item = TableClientGetProp.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientGetProp'] = TableClientGetProp;


    // client_table_help.csv
    export class TableClientHelp {
        public id: number = 0; // 序号
        public path: string = ""; // 图片路径
        public title: string = ""; // 标题
        public des: string = ""; // 内容

        private static table: { [key: string]: TableClientHelp } = null;

        public static Table(): { [key: string]: TableClientHelp } {
            if (TableClientHelp.table == null) {
                TableClientHelp.table = <{ [key: string]: TableClientHelp }>Game.ConfigManager.getTable("client_table_help.json");
                if (TableClientHelp.table == null) TableClientHelp.table = {};
            }
            return TableClientHelp.table;
        }

        public static Item(key: number | string): TableClientHelp {
            if (key == undefined || key == null) return null;
            let item = TableClientHelp.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientHelp'] = TableClientHelp;


    // client_table_help_big_type.csv
    export class TableClientHelpBigType {
        public big_id: number = 0; // 大类id
        public name: string = ""; // 名字
        public path: string = ""; // 图片路径
        public small_ids = new Array<number>(); // 包含小类

        private static table: { [key: string]: TableClientHelpBigType } = null;

        public static Table(): { [key: string]: TableClientHelpBigType } {
            if (TableClientHelpBigType.table == null) {
                TableClientHelpBigType.table = <{ [key: string]: TableClientHelpBigType }>Game.ConfigManager.getTable("client_table_help_big_type.json");
                if (TableClientHelpBigType.table == null) TableClientHelpBigType.table = {};
            }
            return TableClientHelpBigType.table;
        }

        public static Item(key: number | string): TableClientHelpBigType {
            if (key == undefined || key == null) return null;
            let item = TableClientHelpBigType.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientHelpBigType'] = TableClientHelpBigType;


    // client_table_help_small_type.csv
    export class TableClientHelpSmallType {
        public small_id: number = 0; // 小类id
        public help_id: string = ""; // 名字
        public path: string = ""; // 图片路径
        public help_ids = new Array<number>(); // 包含信息

        private static table: { [key: string]: TableClientHelpSmallType } = null;

        public static Table(): { [key: string]: TableClientHelpSmallType } {
            if (TableClientHelpSmallType.table == null) {
                TableClientHelpSmallType.table = <{ [key: string]: TableClientHelpSmallType }>Game.ConfigManager.getTable("client_table_help_small_type.json");
                if (TableClientHelpSmallType.table == null) TableClientHelpSmallType.table = {};
            }
            return TableClientHelpSmallType.table;
        }

        public static Item(key: number | string): TableClientHelpSmallType {
            if (key == undefined || key == null) return null;
            let item = TableClientHelpSmallType.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientHelpSmallType'] = TableClientHelpSmallType;


    // client_table_hurt_displacement.csv
    export class TableClientHurtDisplacement {
        public id: number = 0; // 位移序列号
        public type: number = 0; // 类型
        public name: string = ""; // 名称
        public num: string = ""; // 攻击次数
        public time: number = 0; // 间隔时间
        public continue_time: number = 0; // 持续时间
        public displacement_speed = new Array<number>(); // x、y速度
        public displacement_acceleration = new Array<number>(); // x、y加速度
        public acceleration_time: number = 0; // 加速度时间
        public end_pos = new Array<number>(); // 指向位置
        public _bug: string = ""; // 改bug临时

        private static table: { [key: string]: TableClientHurtDisplacement } = null;

        public static Table(): { [key: string]: TableClientHurtDisplacement } {
            if (TableClientHurtDisplacement.table == null) {
                TableClientHurtDisplacement.table = <{ [key: string]: TableClientHurtDisplacement }>Game.ConfigManager.getTable("client_table_hurt_displacement.json");
                if (TableClientHurtDisplacement.table == null) TableClientHurtDisplacement.table = {};
            }
            return TableClientHurtDisplacement.table;
        }

        public static Item(key: number | string): TableClientHurtDisplacement {
            if (key == undefined || key == null) return null;
            let item = TableClientHurtDisplacement.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientHurtDisplacement'] = TableClientHurtDisplacement;


    // client_table_league_animal_chat.csv
    // 联盟异兽对话表
    export class TableClientLeagueAnimalChat {
        public chat_id: number = 0; // uid
        public chat_des: string = ""; // 文本

        private static table: { [key: string]: TableClientLeagueAnimalChat } = null;

        public static Table(): { [key: string]: TableClientLeagueAnimalChat } {
            if (TableClientLeagueAnimalChat.table == null) {
                TableClientLeagueAnimalChat.table = <{ [key: string]: TableClientLeagueAnimalChat }>Game.ConfigManager.getTable("client_table_league_animal_chat.json");
                if (TableClientLeagueAnimalChat.table == null) TableClientLeagueAnimalChat.table = {};
            }
            return TableClientLeagueAnimalChat.table;
        }

        public static Item(key: number | string): TableClientLeagueAnimalChat {
            if (key == undefined || key == null) return null;
            let item = TableClientLeagueAnimalChat.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientLeagueAnimalChat'] = TableClientLeagueAnimalChat;


    // client_table_log.csv
    export class TableClientLog {
        public id: number = 0; // 日志类型
        public type: number = 0; // 日志显示位置(1联盟日志2异兽日志3联盟副本4副本伤害)
        public type_des: string = ""; // 类型描述
        public count: number = 0; // 描述数量
        public des_0: string = ""; // 描述
        public des_1: string = ""; // 
        public des_2: string = ""; // 
        public des_3: string = ""; // 

        private static table: { [key: string]: TableClientLog } = null;

        public static Table(): { [key: string]: TableClientLog } {
            if (TableClientLog.table == null) {
                TableClientLog.table = <{ [key: string]: TableClientLog }>Game.ConfigManager.getTable("client_table_log.json");
                if (TableClientLog.table == null) TableClientLog.table = {};
            }
            return TableClientLog.table;
        }

        public static Item(key: number | string): TableClientLog {
            if (key == undefined || key == null) return null;
            let item = TableClientLog.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientLog'] = TableClientLog;


    // client_table_map_ai.csv
    export class TableClientMapAi {
        public id: number = 0; // 序列号
        public common_param = new Array<number>(); // 普攻ai参数
        public skill_param = new Array<number>(); // 小技能ai参数
        public death_param = new Array<number>(); // 必杀技ai参数

        private static table: { [key: string]: TableClientMapAi } = null;

        public static Table(): { [key: string]: TableClientMapAi } {
            if (TableClientMapAi.table == null) {
                TableClientMapAi.table = <{ [key: string]: TableClientMapAi }>Game.ConfigManager.getTable("client_table_map_ai.json");
                if (TableClientMapAi.table == null) TableClientMapAi.table = {};
            }
            return TableClientMapAi.table;
        }

        public static Item(key: number | string): TableClientMapAi {
            if (key == undefined || key == null) return null;
            let item = TableClientMapAi.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientMapAi'] = TableClientMapAi;


    // client_table_map_bg.csv
    export class TableClientMapBg {
        public id: number = 0; // id
        public res_id: number = 0; // res_id
        public close_posy: number = 0; // close_posy
        public group_posy: number = 0; // group_posy
        public mid1_posy: number = 0; // mid1_posy
        public mid2_posy: number = 0; // mid2_posy
        public far_posy: number = 0; // far_posy
        public close_v = new Array<number>(); // close_v
        public group_v = new Array<number>(); // group_v
        public mid1_v = new Array<number>(); // mid1_v
        public mid2_v = new Array<number>(); // mid2_v
        public far_v = new Array<number>(); // far_v
        public far1_v = new Array<number>(); // far1_v
        public far2_v = new Array<number>(); // far2_v
        public config: string = ""; // config
        public des: string = ""; // 描述
        public scroll: number = 0; // 是否滚动

        private static table: { [key: string]: TableClientMapBg } = null;

        public static Table(): { [key: string]: TableClientMapBg } {
            if (TableClientMapBg.table == null) {
                TableClientMapBg.table = <{ [key: string]: TableClientMapBg }>Game.ConfigManager.getTable("client_table_map_bg.json");
                if (TableClientMapBg.table == null) TableClientMapBg.table = {};
            }
            return TableClientMapBg.table;
        }

        public static Item(key: number | string): TableClientMapBg {
            if (key == undefined || key == null) return null;
            let item = TableClientMapBg.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientMapBg'] = TableClientMapBg;


    // client_table_monsterLocal.csv
    // 怪，本地
    export class TableClientMonsterLocal {
        public monster_id: number = 0; // 怪物id
        public des: string = ""; // 填表说明
        public monster_roleId: number = 0; // 映射mapRoleId
        public monster_name: string = ""; // 怪物名称
        public role_type: number = 0; // 形态
        public real_general: number = 0; // 对应真实武将id
        public monster_profession: number = 0; // 职业(1-步兵近战，2-弓箭手，3-法师)
        public monster_level: number = 0; // 怪物等级
        public monster_star: number = 0; // 怪物星级
        public monster_step: number = 0; // 怪物阶数
        public help_bg: number = 0; // 援护背景
        public floor_offset: number = 0; // 相对于地板偏移值
        public father_ratio: number = 0; // 召唤怪继承父类属性百分比
        public call_time: number = 0; // 怪物基础存活时间
        public skill_ids = new Array<number>(); // 技能Id
        public skill_levels = new Array<number>(); // 技能等级
        public talent_ids = new Array<number>(); // 天赋ids
        public talent_levels = new Array<number>(); // 天赋等级
        public hide_talent_ids: number = 0; // 隐藏天赋
        public pve_ai: number = 0; // pve_ai
        public pvp_ai: number = 0; // pvp_ai
        public bean_max: number = 0; // 最大攒豆数
        public monster_rage: number = 0; // 怒气值
        public monster_hp: number = 0; // 生命值
        public monster_atk: number = 0; // 攻击
        public monster_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴击伤害
        public crit_resistance: number = 0; // 暴击抵抗
        public ignore_phyDef: number = 0; // 忽视防御
        public cd_speed: number = 0; // 速度
        public dodge_rate: number = 0; // 格挡率
        public hit_rate: number = 0; // 忽视格挡
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public stiff_resistance: number = 0; // 硬直抵抗
        public float_resistance: number = 0; // 浮空抗性
        public rage_reduce: number = 0; // 怒气减少
        public support_consume: number = 0; // 作为援护出场所需怒气值
        public general_atk_all: number = 0; // 攻击
        public general_def_all: number = 0; // 防御
        public all_crit: number = 0; // 暴击
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_crit: number = 0; // 技能暴击
        public final_extra: number = 0; // 终极附加
        public final_reduce: number = 0; // 终极减免
        public ignore_magicDef: number = 0; // 忽视魔防
        public sacred_atk: number = 0; // 神圣攻击
        public sacred_def: number = 0; // 神圣防御
        public sacred_crit: number = 0; // 神圣暴击
        public ignore_sacredDef: number = 0; // 忽视神防
        public get_up_time: number = 0; // 起身时间
        public is_stir_up: number = 0; // 是否能被挑起
        public stir_up_resistance: number = 0; // 挑起抵抗
        public stir_again_def: number = 0; // 再次挑起抵抗
        public is_gravity: number = 0; // 是否受重力影响
        public move_speed: number = 0; // 移动速度
        public name_pic: string = ""; // 名字图片

        private static table: { [key: string]: TableClientMonsterLocal } = null;

        public static Table(): { [key: string]: TableClientMonsterLocal } {
            if (TableClientMonsterLocal.table == null) {
                TableClientMonsterLocal.table = <{ [key: string]: TableClientMonsterLocal }>Game.ConfigManager.getTable("client_table_monsterLocal.json");
                if (TableClientMonsterLocal.table == null) TableClientMonsterLocal.table = {};
            }
            return TableClientMonsterLocal.table;
        }

        public static Item(key: number | string): TableClientMonsterLocal {
            if (key == undefined || key == null) return null;
            let item = TableClientMonsterLocal.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientMonsterLocal'] = TableClientMonsterLocal;


    // client_table_monthgift_index.csv
    // 新礼包索引
    export class TableClientMonthgiftIndex {
        public index: number = 0; // 索引
        public name: string = ""; // 名字
        public pic: string = ""; // 图片
        public name_path: string = ""; // 名字图片

        private static table: { [key: string]: TableClientMonthgiftIndex } = null;

        public static Table(): { [key: string]: TableClientMonthgiftIndex } {
            if (TableClientMonthgiftIndex.table == null) {
                TableClientMonthgiftIndex.table = <{ [key: string]: TableClientMonthgiftIndex }>Game.ConfigManager.getTable("client_table_monthgift_index.json");
                if (TableClientMonthgiftIndex.table == null) TableClientMonthgiftIndex.table = {};
            }
            return TableClientMonthgiftIndex.table;
        }

        public static Item(key: number | string): TableClientMonthgiftIndex {
            if (key == undefined || key == null) return null;
            let item = TableClientMonthgiftIndex.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientMonthgiftIndex'] = TableClientMonthgiftIndex;


    // client_table_msg.csv
    export class TableClientMsg {
        public id: number = 0; // 
        public name: string = ""; // 
        public loadFunc: string = ""; // 
        public requestTag: number = 0; // 

        private static table: { [key: string]: TableClientMsg } = null;

        public static Table(): { [key: string]: TableClientMsg } {
            if (TableClientMsg.table == null) {
                TableClientMsg.table = <{ [key: string]: TableClientMsg }>Game.ConfigManager.getTable("client_table_msg.json");
                if (TableClientMsg.table == null) TableClientMsg.table = {};
            }
            return TableClientMsg.table;
        }

        public static Item(key: number | string): TableClientMsg {
            if (key == undefined || key == null) return null;
            let item = TableClientMsg.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientMsg'] = TableClientMsg;


    // client_table_npc.csv
    // npc动画
    export class TableClientNpc {
        public id: number = 0; // 序列号（配到主线表里）
        public npc: number = 0; // NPC名字
        public spineId: number = 0; // 骨骼号
        public aniName: number = 0; // 骨骼动画名称
        public aniScale: number = 0; // 缩放比例
        public aniPath: number = 0; // 静态图片
        public icon: number = 0; // 头像

        private static table: { [key: string]: TableClientNpc } = null;

        public static Table(): { [key: string]: TableClientNpc } {
            if (TableClientNpc.table == null) {
                TableClientNpc.table = <{ [key: string]: TableClientNpc }>Game.ConfigManager.getTable("client_table_npc.json");
                if (TableClientNpc.table == null) TableClientNpc.table = {};
            }
            return TableClientNpc.table;
        }

        public static Item(key: number | string): TableClientNpc {
            if (key == undefined || key == null) return null;
            let item = TableClientNpc.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientNpc'] = TableClientNpc;


    // client_table_power_level.csv
    // 结算表
    export class TableClientPowerLevel {
        public level: number = 0; // 等级
        public general_count: number = 0; // 武将数量
        public general_level: number = 0; // 武将等级
        public general_step: number = 0; // 武将进阶
        public equip_level: number = 0; // 装备强化
        public skill_level: number = 0; // 技能平均等级
        public equip_forge: number = 0; // 装备锻造
        public general_star: number = 0; // 武将星级
        public equip_carve: number = 0; // 刻印等级
        public card_num: number = 0; // 卡片数量
        public animal_level: number = 0; // 念兽等级（单个念兽）

        private static table: { [key: string]: TableClientPowerLevel } = null;

        public static Table(): { [key: string]: TableClientPowerLevel } {
            if (TableClientPowerLevel.table == null) {
                TableClientPowerLevel.table = <{ [key: string]: TableClientPowerLevel }>Game.ConfigManager.getTable("client_table_power_level.json");
                if (TableClientPowerLevel.table == null) TableClientPowerLevel.table = {};
            }
            return TableClientPowerLevel.table;
        }

        public static Item(key: number | string): TableClientPowerLevel {
            if (key == undefined || key == null) return null;
            let item = TableClientPowerLevel.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientPowerLevel'] = TableClientPowerLevel;


    // client_table_randomFamilyName.csv
    export class TableClientRandomFamilyName {
        public id: number = 0; // 索引
        public family_name: string = ""; // 姓氏

        private static table: { [key: string]: TableClientRandomFamilyName } = null;

        public static Table(): { [key: string]: TableClientRandomFamilyName } {
            if (TableClientRandomFamilyName.table == null) {
                TableClientRandomFamilyName.table = <{ [key: string]: TableClientRandomFamilyName }>Game.ConfigManager.getTable("client_table_randomFamilyName.json");
                if (TableClientRandomFamilyName.table == null) TableClientRandomFamilyName.table = {};
            }
            return TableClientRandomFamilyName.table;
        }

        public static Item(key: number | string): TableClientRandomFamilyName {
            if (key == undefined || key == null) return null;
            let item = TableClientRandomFamilyName.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientRandomFamilyName'] = TableClientRandomFamilyName;


    // client_table_randomLoading.csv
    export class TableClientRandomLoading {
        public id: number = 0; // 索引
        public bg: string = ""; // 背景图
        public text: string = ""; // 文字图

        private static table: { [key: string]: TableClientRandomLoading } = null;

        public static Table(): { [key: string]: TableClientRandomLoading } {
            if (TableClientRandomLoading.table == null) {
                TableClientRandomLoading.table = <{ [key: string]: TableClientRandomLoading }>Game.ConfigManager.getTable("client_table_randomLoading.json");
                if (TableClientRandomLoading.table == null) TableClientRandomLoading.table = {};
            }
            return TableClientRandomLoading.table;
        }

        public static Item(key: number | string): TableClientRandomLoading {
            if (key == undefined || key == null) return null;
            let item = TableClientRandomLoading.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientRandomLoading'] = TableClientRandomLoading;


    // client_table_randomName.csv
    export class TableClientRandomName {
        public id: number = 0; // 索引
        public name: string = ""; // 名字

        private static table: { [key: string]: TableClientRandomName } = null;

        public static Table(): { [key: string]: TableClientRandomName } {
            if (TableClientRandomName.table == null) {
                TableClientRandomName.table = <{ [key: string]: TableClientRandomName }>Game.ConfigManager.getTable("client_table_randomName.json");
                if (TableClientRandomName.table == null) TableClientRandomName.table = {};
            }
            return TableClientRandomName.table;
        }

        public static Item(key: number | string): TableClientRandomName {
            if (key == undefined || key == null) return null;
            let item = TableClientRandomName.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientRandomName'] = TableClientRandomName;


    // client_table_randomTips.csv
    export class TableClientRandomTips {
        public id: number = 0; // 索引
        public level: number = 0; // 君主等级
        public des: string = ""; // 提示

        private static table: { [key: string]: TableClientRandomTips } = null;

        public static Table(): { [key: string]: TableClientRandomTips } {
            if (TableClientRandomTips.table == null) {
                TableClientRandomTips.table = <{ [key: string]: TableClientRandomTips }>Game.ConfigManager.getTable("client_table_randomTips.json");
                if (TableClientRandomTips.table == null) TableClientRandomTips.table = {};
            }
            return TableClientRandomTips.table;
        }

        public static Item(key: number | string): TableClientRandomTips {
            if (key == undefined || key == null) return null;
            let item = TableClientRandomTips.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientRandomTips'] = TableClientRandomTips;


    // client_table_skill_displacement.csv
    export class TableClientSkillDisplacement {
        public id: number = 0; // 位移序列号
        public type: number = 0; // 类型
        public name: string = ""; // 名称
        public num: number = 0; // 攻击次数
        public time: number = 0; // 间隔时间
        public continue_time: number = 0; // 持续时间
        public displacement_speed = new Array<number>(); // x、y速度
        public displacement_acceleration = new Array<number>(); // x、y加速度
        public acceleration_time: number = 0; // 加速度时间
        public end_pos = new Array<number>(); // 指向位置
        public _bug: string = ""; // 改bug临时

        private static table: { [key: string]: TableClientSkillDisplacement } = null;

        public static Table(): { [key: string]: TableClientSkillDisplacement } {
            if (TableClientSkillDisplacement.table == null) {
                TableClientSkillDisplacement.table = <{ [key: string]: TableClientSkillDisplacement }>Game.ConfigManager.getTable("client_table_skill_displacement.json");
                if (TableClientSkillDisplacement.table == null) TableClientSkillDisplacement.table = {};
            }
            return TableClientSkillDisplacement.table;
        }

        public static Item(key: number | string): TableClientSkillDisplacement {
            if (key == undefined || key == null) return null;
            let item = TableClientSkillDisplacement.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientSkillDisplacement'] = TableClientSkillDisplacement;


    // client_table_skill_hiteffect.csv
    export class TableClientSkillHiteffect {
        public id: number = 0; // 击中特效序列号
        public des: string = ""; // 备注xx（资源名称）
        public effects_spx_id: number = 0; // 资源序列号
        public effects_action_id: number = 0; // 行为序列号
        public play_speed: number = 0; // 特效播放速度(默认读的面板里的值)
        public blend_active: number = 0; // 

        private static table: { [key: string]: TableClientSkillHiteffect } = null;

        public static Table(): { [key: string]: TableClientSkillHiteffect } {
            if (TableClientSkillHiteffect.table == null) {
                TableClientSkillHiteffect.table = <{ [key: string]: TableClientSkillHiteffect }>Game.ConfigManager.getTable("client_table_skill_hiteffect.json");
                if (TableClientSkillHiteffect.table == null) TableClientSkillHiteffect.table = {};
            }
            return TableClientSkillHiteffect.table;
        }

        public static Item(key: number | string): TableClientSkillHiteffect {
            if (key == undefined || key == null) return null;
            let item = TableClientSkillHiteffect.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientSkillHiteffect'] = TableClientSkillHiteffect;


    // client_table_skill_particle.csv
    export class TableClientSkillParticle {
        public id: number = 0; // 特效序列号
        public source_id: number = 0; // 粒子资源id
        public play_pos = new Array<number>(); // 粒子播放位置
        public flip_x: number = 0; // 左右不同是否翻转
        public play_time: number = 0; // 播放时长
        public blend_active: number = 0; // 混合通道
        public scale = new Array<number>(); // 压缩比例(X|Y)

        private static table: { [key: string]: TableClientSkillParticle } = null;

        public static Table(): { [key: string]: TableClientSkillParticle } {
            if (TableClientSkillParticle.table == null) {
                TableClientSkillParticle.table = <{ [key: string]: TableClientSkillParticle }>Game.ConfigManager.getTable("client_table_skill_particle.json");
                if (TableClientSkillParticle.table == null) TableClientSkillParticle.table = {};
            }
            return TableClientSkillParticle.table;
        }

        public static Item(key: number | string): TableClientSkillParticle {
            if (key == undefined || key == null) return null;
            let item = TableClientSkillParticle.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientSkillParticle'] = TableClientSkillParticle;


    // client_table_skill_shake.csv
    export class TableClientSkillShake {
        public id: number = 0; // 震动序列号
        public des: string = ""; // 备注xx（资源名称）
        public screen_shake_frame: number = 0; // 屏幕抖动时间
        public range_x = new Array<number>(); // x抖动范围
        public range_y = new Array<number>(); // y抖动范围

        private static table: { [key: string]: TableClientSkillShake } = null;

        public static Table(): { [key: string]: TableClientSkillShake } {
            if (TableClientSkillShake.table == null) {
                TableClientSkillShake.table = <{ [key: string]: TableClientSkillShake }>Game.ConfigManager.getTable("client_table_skill_shake.json");
                if (TableClientSkillShake.table == null) TableClientSkillShake.table = {};
            }
            return TableClientSkillShake.table;
        }

        public static Item(key: number | string): TableClientSkillShake {
            if (key == undefined || key == null) return null;
            let item = TableClientSkillShake.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientSkillShake'] = TableClientSkillShake;


    // client_table_skill_step.csv
    export class TableClientSkillStep {
        public skill_step_id: number = 0; // 形态序列号
        public skill_step_form = new Array<number>(); // 形态所含技能单元

        private static table: { [key: string]: TableClientSkillStep } = null;

        public static Table(): { [key: string]: TableClientSkillStep } {
            if (TableClientSkillStep.table == null) {
                TableClientSkillStep.table = <{ [key: string]: TableClientSkillStep }>Game.ConfigManager.getTable("client_table_skill_step.json");
                if (TableClientSkillStep.table == null) TableClientSkillStep.table = {};
            }
            return TableClientSkillStep.table;
        }

        public static Item(key: number | string): TableClientSkillStep {
            if (key == undefined || key == null) return null;
            let item = TableClientSkillStep.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientSkillStep'] = TableClientSkillStep;


    // client_table_sound_resource.csv
    // 声音资源表
    export class TableClientSoundResource {
        public sound_id: number = 0; // id
        public name: string = ""; // 说明
        public sound_path: string = ""; // 路径
        public sound_type: number = 0; // 类型
        public des: string = ""; // 描述
        public add: string = ""; // 是否已添加
        public vol: number = 0; // 音量

        private static table: { [key: string]: TableClientSoundResource } = null;

        public static Table(): { [key: string]: TableClientSoundResource } {
            if (TableClientSoundResource.table == null) {
                TableClientSoundResource.table = <{ [key: string]: TableClientSoundResource }>Game.ConfigManager.getTable("client_table_sound_resource.json");
                if (TableClientSoundResource.table == null) TableClientSoundResource.table = {};
            }
            return TableClientSoundResource.table;
        }

        public static Item(key: number | string): TableClientSoundResource {
            if (key == undefined || key == null) return null;
            let item = TableClientSoundResource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientSoundResource'] = TableClientSoundResource;


    // client_table_story.xlsx
    export class TableClientTableStory {
        public id: string = ""; // id
        public step: number = 0; // 剧情出现的阶段
        public idx: number = 0; // 对话索引
        public type: number = 0; // 类型
        public spine: number = 0; // 人物spine ID
        public action: string = ""; // spine的动作
        public scale: number = 0; // spine的缩放
        public flip: number = 0; // 是否翻转
        public direction: number = 0; // 头像位置
        public name: string = ""; // 人物名字
        public sound: number = 0; // 音乐
        public content: string = ""; // 文字内容

        private static table: { [key: string]: TableClientTableStory } = null;

        public static Table(): { [key: string]: TableClientTableStory } {
            if (TableClientTableStory.table == null) {
                TableClientTableStory.table = <{ [key: string]: TableClientTableStory }>Game.ConfigManager.getTable("client_table_story.json");
                if (TableClientTableStory.table == null) TableClientTableStory.table = {};
            }
            return TableClientTableStory.table;
        }

        public static Item(key: number | string): TableClientTableStory {
            if (key == undefined || key == null) return null;
            let item = TableClientTableStory.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientTableStory'] = TableClientTableStory;

    // client_table_story_teach.csv
    // 教学关卡配置
    export class TableClientStoryTeach {
        public id: number = 0; // 索引
        public des: string = ""; // 描述
        public dialog: string = ""; // 对话内容（调时间参考用）
        public costTime: number = 0; // 该过程持续的时间
        public time: number = 0; // 触发时间
        public pos: string = ""; // 屏幕位置（左、右）
        public role: string = ""; // 角色名
        public event: number = 0; // 事件类型（enumEvent）
        public fightPos: string = ""; // 战斗位置
        public coverPos: string = ""; // 补位位置
        public appearPos: string = ""; // 闪现位置
        public skillIndex: string = ""; // 技能
        public rolehead: number = 0; // 是否显示必杀头像

        private static table: { [key: string]: TableClientStoryTeach } = null;

        public static Table(): { [key: string]: TableClientStoryTeach } {
            if (TableClientStoryTeach.table == null) {
                TableClientStoryTeach.table = <{ [key: string]: TableClientStoryTeach }>Game.ConfigManager.getTable("client_table_story_teach.json");
                if (TableClientStoryTeach.table == null) TableClientStoryTeach.table = {};
            }
            return TableClientStoryTeach.table;
        }

        public static Item(key: number | string): TableClientStoryTeach {
            if (key == undefined || key == null) return null;
            let item = TableClientStoryTeach.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientStoryTeach'] = TableClientStoryTeach;


    // client_table_teach_cartoon.csv
    export class TableClientTeachCartoon {
        public id: number = 0; // id
        public des: string = ""; // 描述
        public pic_path: string = ""; // 图片路径
        public pic_time: number = 0; // 图片显示时间
        public pic_speed: number = 0; // 图片运行速度
        public pic_opacity_time1: number = 0; // 图片淡入时间
        public pic_opacity_time2: number = 0; // 图片淡出时间
        public pic_opacity: number = 0; // 图片初始透明度
        public pic_direction: number = 0; // 图片运行方向（1上，2下，3左，4右）
        public text_delayTime: number = 0; // 文字延迟出现时间
        public text_info: string = ""; // 文本内容
        public graph: number = 0; // 幕
        public pic_direction2: number = 0; // 是否有其他方向
        public music: number = 0; // 音乐

        private static table: { [key: string]: TableClientTeachCartoon } = null;

        public static Table(): { [key: string]: TableClientTeachCartoon } {
            if (TableClientTeachCartoon.table == null) {
                TableClientTeachCartoon.table = <{ [key: string]: TableClientTeachCartoon }>Game.ConfigManager.getTable("client_table_teach_cartoon.json");
                if (TableClientTeachCartoon.table == null) TableClientTeachCartoon.table = {};
            }
            return TableClientTeachCartoon.table;
        }

        public static Item(key: number | string): TableClientTeachCartoon {
            if (key == undefined || key == null) return null;
            let item = TableClientTeachCartoon.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientTeachCartoon'] = TableClientTeachCartoon;


    // client_table_ui_rule.csv
    // 规则说明
    export class TableClientUiRule {
        public index: number = 0; // 
        public ui: string = ""; // 界面
        public rule: string = ""; // 规则
        public rule1: string = ""; // 规则1
        public rule2: string = ""; // 规则2
        public rule3: string = ""; // 规则3
        public rule4: string = ""; // 规则4
        public rule5: string = ""; // 规则5
        public rule6: string = ""; // 规则6
        public rule7: string = ""; // 规则7
        public rule8: string = ""; // 规则8
        public rule9: string = ""; // 规则9
        public rule10: string = ""; // 规则10

        private static table: { [key: string]: TableClientUiRule } = null;

        public static Table(): { [key: string]: TableClientUiRule } {
            if (TableClientUiRule.table == null) {
                TableClientUiRule.table = <{ [key: string]: TableClientUiRule }>Game.ConfigManager.getTable("client_table_ui_rule.json");
                if (TableClientUiRule.table == null) TableClientUiRule.table = {};
            }
            return TableClientUiRule.table;
        }

        public static Item(key: number | string): TableClientUiRule {
            if (key == undefined || key == null) return null;
            let item = TableClientUiRule.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientUiRule'] = TableClientUiRule;


    // client_table_ui_talk.csv
    // npc文字
    export class TableClientUiTalk {
        public index: number = 0; // 序号
        public npc: string = ""; // npc
        public ui: string = ""; // 界面
        public pop: number = 0; // 弹出
        public dialog = new Array<string>(); // 对话
        public other: string = ""; // 其他

        private static table: { [key: string]: TableClientUiTalk } = null;

        public static Table(): { [key: string]: TableClientUiTalk } {
            if (TableClientUiTalk.table == null) {
                TableClientUiTalk.table = <{ [key: string]: TableClientUiTalk }>Game.ConfigManager.getTable("client_table_ui_talk.json");
                if (TableClientUiTalk.table == null) TableClientUiTalk.table = {};
            }
            return TableClientUiTalk.table;
        }

        public static Item(key: number | string): TableClientUiTalk {
            if (key == undefined || key == null) return null;
            let item = TableClientUiTalk.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientUiTalk'] = TableClientUiTalk;


    // client_table_wanted_mobs_feature.csv
    // 通缉令怪物特性
    export class TableClientWantedMobsFeature {
        public id: number = 0; // 编号Id
        public name: string = ""; // 名称
        public quality: number = 0; // 天赋品质
        public des: string = ""; // 描述
        public path: string = ""; // 图片路径

        private static table: { [key: string]: TableClientWantedMobsFeature } = null;

        public static Table(): { [key: string]: TableClientWantedMobsFeature } {
            if (TableClientWantedMobsFeature.table == null) {
                TableClientWantedMobsFeature.table = <{ [key: string]: TableClientWantedMobsFeature }>Game.ConfigManager.getTable("client_table_wanted_mobs_feature.json");
                if (TableClientWantedMobsFeature.table == null) TableClientWantedMobsFeature.table = {};
            }
            return TableClientWantedMobsFeature.table;
        }

        public static Item(key: number | string): TableClientWantedMobsFeature {
            if (key == undefined || key == null) return null;
            let item = TableClientWantedMobsFeature.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientWantedMobsFeature'] = TableClientWantedMobsFeature;


    // client_table_world_boss.csv
    // 世界boss
    export class TableClientWorldBoss {
        public animal_id: number = 0; // boss类型
        public name: string = ""; // 名称
        public init_level: number = 0; // 初始等级
        public max_grow = new Array<number>(); // 等级对应奖励区间
        public zone_bosses = new Array<number>(); // 对应boss(分别为boss区间用|隔开)
        public map_roleName = new Array<string>(); // 异兽名字
        public feature = new Array<number>(); // 怪物特性
        public battle_bg: number = 0; // 战斗背景id
        public map_role: string = ""; // 形象

        private static table: { [key: string]: TableClientWorldBoss } = null;

        public static Table(): { [key: string]: TableClientWorldBoss } {
            if (TableClientWorldBoss.table == null) {
                TableClientWorldBoss.table = <{ [key: string]: TableClientWorldBoss }>Game.ConfigManager.getTable("client_table_world_boss.json");
                if (TableClientWorldBoss.table == null) TableClientWorldBoss.table = {};
            }
            return TableClientWorldBoss.table;
        }

        public static Item(key: number | string): TableClientWorldBoss {
            if (key == undefined || key == null) return null;
            let item = TableClientWorldBoss.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientWorldBoss'] = TableClientWorldBoss;


    // client_type_package.csv
    // 背包类型表
    export class TableClientTypePackage {
        public index: number = 0; // 类型
        public name: string = ""; // 中文名
        public info: string = ""; // 说明
        public itemType = new Array<number>(); // 对应类型
        public itemId = new Array<number>(); // 
        public exceptItemId = new Array<number>(); // 去除Id
        public path: string = ""; // 类型图片

        private static table: { [key: string]: TableClientTypePackage } = null;

        public static Table(): { [key: string]: TableClientTypePackage } {
            if (TableClientTypePackage.table == null) {
                TableClientTypePackage.table = <{ [key: string]: TableClientTypePackage }>Game.ConfigManager.getTable("client_type_package.json");
                if (TableClientTypePackage.table == null) TableClientTypePackage.table = {};
            }
            return TableClientTypePackage.table;
        }

        public static Item(key: number | string): TableClientTypePackage {
            if (key == undefined || key == null) return null;
            let item = TableClientTypePackage.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientTypePackage'] = TableClientTypePackage;


    // client_type_rank.csv
    // 排行类型表
    export class TableClientTypeRank {
        public index: number = 0; // 类型
        public name: string = ""; // 排行类型
        public type: number = 0; // 排行类型
        public path: string = ""; // 类型图片

        private static table: { [key: string]: TableClientTypeRank } = null;

        public static Table(): { [key: string]: TableClientTypeRank } {
            if (TableClientTypeRank.table == null) {
                TableClientTypeRank.table = <{ [key: string]: TableClientTypeRank }>Game.ConfigManager.getTable("client_type_rank.json");
                if (TableClientTypeRank.table == null) TableClientTypeRank.table = {};
            }
            return TableClientTypeRank.table;
        }

        public static Item(key: number | string): TableClientTypeRank {
            if (key == undefined || key == null) return null;
            let item = TableClientTypeRank.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientTypeRank'] = TableClientTypeRank;


    // table_activityboss_map_block.csv
    export class TableActivitybossMapBlock {
        public build_id: number = 0; // 建筑id
        public name: number = 0; // 建筑名称
        public picId: number = 0; // 头像id
        public level: number = 0; // 等级
        public show_scene = new Array<number>(); // 出现场景
        public block_cell: number = 0; // 建筑放置层（1:far,2:mid2，3:mid1,4:group,5:close)
        public build_type: number = 0; // 建筑物类型 5:功能npc
        public be_attacked: number = 0; // 建筑是否可被攻击或者触摸
        public build_x: number = 0; // 建筑坐标
        public build_y: number = 0; // 建筑坐标
        public balk_rt = new Array<number>(); // 碰撞格范围
        public touch_rt = new Array<number>(); // 触摸范围
        public is_mirror: number = 0; // 是否镜像
        public draw_order: number = 0; // 绘制层级
        public path: string = ""; // 路径
        public spine_scale: number = 0; // spine缩放
        public spine_id: number = 0; // spine动画
        public des: string = ""; // 描述
        public name_path: string = ""; // 名字路径
        public name_pos = new Array<number>(); // 名字位置

        private static table: { [key: string]: TableActivitybossMapBlock } = null;

        public static Table(): { [key: string]: TableActivitybossMapBlock } {
            if (TableActivitybossMapBlock.table == null) {
                TableActivitybossMapBlock.table = <{ [key: string]: TableActivitybossMapBlock }>Game.ConfigManager.getTable("table_activityboss_map_block.json");
                if (TableActivitybossMapBlock.table == null) TableActivitybossMapBlock.table = {};
            }
            return TableActivitybossMapBlock.table;
        }

        public static Item(key: number | string): TableActivitybossMapBlock {
            if (key == undefined || key == null) return null;
            let item = TableActivitybossMapBlock.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableActivitybossMapBlock'] = TableActivitybossMapBlock;


    // table_activity_battle.csv
    export class TableActivityBattle {
        public type: number = 0; // id
        public name: string = ""; // 活动类型
        public open_level: number = 0; // 开启等级
        public instance_pack = new Array<number>(); // 副本包含关卡
        public star_zone = new Array<number>(); // 星级数量
        public star_reward_good = new Array<number>(); // 星级奖励物品
        public star_reward_count = new Array<number>(); // 星级奖励物品数量
        public star_reward_score = new Array<number>(); // 星级奖励积分
        public star_rewards = new Array<Array<number>>(); // 奖励
        public exchange_reduce_score = new Array<number>(); // 兑换消耗积分
        public exchange_get_goods = new Array<Array<number>>(); // 兑换获得物品
        public exchange_count = new Array<number>(); // 兑换次数
        public extra_general = new Array<Array<number>>(); // 额外猎人
        public extra_score = new Array<number>(); // 额外积分百分比
        public extra_goods = new Array<Array<number>>(); // 额外奖励
        public extra_percent = new Array<Array<number>>(); // 额外百分比
        public extra_reward1 = new Array<Array<number>>(); // 额外奖励1
        public extra_reward2 = new Array<Array<number>>(); // 额外奖励2
        public instance_normal = new Array<number>(); // 普通副本
        public instance_elite = new Array<number>(); // 困难副本
        public instance_button = new Array<number>(); // 按钮皮肤
        public instance_bg: string = ""; // 背景
        public instance_half: string = ""; // 半身像
        public instance_Title: string = ""; // 标题
        public act_coin: number = 0; // 代币

        private static table: { [key: string]: TableActivityBattle } = null;

        public static Table(): { [key: string]: TableActivityBattle } {
            if (TableActivityBattle.table == null) {
                TableActivityBattle.table = <{ [key: string]: TableActivityBattle }>Game.ConfigManager.getTable("table_activity_battle.json");
                if (TableActivityBattle.table == null) TableActivityBattle.table = {};
            }
            return TableActivityBattle.table;
        }

        public static Item(key: number | string): TableActivityBattle {
            if (key == undefined || key == null) return null;
            let item = TableActivityBattle.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableActivityBattle'] = TableActivityBattle;


    // table_activity_battle_instance.csv
    export class TableActivityBattleInstance {
        public instance_id: number = 0; // id
        public name: string = ""; // 活动类型
        public instance_stage = new Array<number>(); // 副本包含怪物
        public first_reward = new Array<Array<number>>(); // 首杀奖励
        public reward_goods = new Array<Array<number>>(); // 通关奖励
        public reward_score: number = 0; // 通关积分
        public rewards = new Array<Array<number>>(); // 奖励
        public rand_item: string = ""; // 随机奖励
        public check_type = new Array<number>(); // 星级检测类型(1战斗胜利2上阵武将类型3上阵武将id)
        public check_value = new Array<number>(); // 星级检测数量
        public battle_bg: number = 0; // 副本战斗背景id
        public feature = new Array<number>(); // 怪物特性
        public boss_roleId: number = 0; // Boss形象id（映射map_role表）
        public instance_pic1: string = ""; // 副本关卡插图（标题）
        public instance_pic2: string = ""; // 副本关卡插图（内容）

        private static table: { [key: string]: TableActivityBattleInstance } = null;

        public static Table(): { [key: string]: TableActivityBattleInstance } {
            if (TableActivityBattleInstance.table == null) {
                TableActivityBattleInstance.table = <{ [key: string]: TableActivityBattleInstance }>Game.ConfigManager.getTable("table_activity_battle_instance.json");
                if (TableActivityBattleInstance.table == null) TableActivityBattleInstance.table = {};
            }
            return TableActivityBattleInstance.table;
        }

        public static Item(key: number | string): TableActivityBattleInstance {
            if (key == undefined || key == null) return null;
            let item = TableActivityBattleInstance.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableActivityBattleInstance'] = TableActivityBattleInstance;


    // table_activity_terminal.csv
    export class TableActivityTerminal {
        public index: number = 0; // 索引
        public activity_type: number = 0; // 活动类型（15-专题献礼，1-连续登录）
        public notice_type: number = 0; // 热门类型（1-普通，2-热门，3-最新）
        public pic_id: number = 0; // 活动图片
        public name: string = ""; // 活动名称
        public des: string = ""; // 活动描述
        public open_week_day: number = 0; // 活动开启星期数（0-星期日,6-星期六）
        public duration: number = 0; // 持续时长
        public mission_type = new Array<number>(); // 任务类型
        public mission_condition = new Array<number>(); // 任务条件
        public rewardZone = new Array<number>(); // 奖励区间
        public reward_goods = new Array<Array<number>>(); // 奖励内容
        public reward_count = new Array<Array<number>>(); // 奖励数量
        public show_type = new Array<Array<number>>(); // 显示类型

        private static table: { [key: string]: TableActivityTerminal } = null;

        public static Table(): { [key: string]: TableActivityTerminal } {
            if (TableActivityTerminal.table == null) {
                TableActivityTerminal.table = <{ [key: string]: TableActivityTerminal }>Game.ConfigManager.getTable("table_activity_terminal.json");
                if (TableActivityTerminal.table == null) TableActivityTerminal.table = {};
            }
            return TableActivityTerminal.table;
        }

        public static Item(key: number | string): TableActivityTerminal {
            if (key == undefined || key == null) return null;
            let item = TableActivityTerminal.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableActivityTerminal'] = TableActivityTerminal;


    // table_activity_wishtree.csv
    export class TableActivityWishtree {
        public index: number = 0; // 索引
        public vip_level: number = 0; // VIP等级
        public reward_goods = new Array<number>(); // 奖励内容
        public reward_count = new Array<number>(); // 奖励数量
        public rand_power = new Array<number>(); // 随机概率
        public rand_count = new Array<number>(); // 随机数量
        public show_type = new Array<number>(); // 显示类型

        private static table: { [key: string]: TableActivityWishtree } = null;

        public static Table(): { [key: string]: TableActivityWishtree } {
            if (TableActivityWishtree.table == null) {
                TableActivityWishtree.table = <{ [key: string]: TableActivityWishtree }>Game.ConfigManager.getTable("table_activity_wishtree.json");
                if (TableActivityWishtree.table == null) TableActivityWishtree.table = {};
            }
            return TableActivityWishtree.table;
        }

        public static Item(key: number | string): TableActivityWishtree {
            if (key == undefined || key == null) return null;
            let item = TableActivityWishtree.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableActivityWishtree'] = TableActivityWishtree;


    // table_adviser_level.csv
    // 军师等级
    export class TableAdviserLevel {
        public index: number = 0; // 索引(id*10000+level)
        public adviser_id: number = 0; // 军师id(10/11/12是特殊id)
        public level: number = 0; // 等级
        public skill_level: number = 0; // 技能等级
        public add_powerLimit: number = 0; // 增加体力上限
        public add_powerRatio: number = 0; // 体力恢复系数
        public resource_cdCount = new Array<number>(); // 产出资源(cd/资源/数量/上限)
        public wanted_money_addradio: number = 0; // 流星街金币奖励加成
        public challenge_gain_token = new Array<number>(); // 挑战副本概率获得钻石（概率|上限|下限）
        public consume_goods: number = 0; // 消耗物品
        public consume_count: number = 0; // 消耗数量
        public adviser_money: number = 0; // 升级消耗铜钱
        public levelup_ok = new Array<number>(); // 升级成功率
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public hit_rate: number = 0; // 暴击
        public dodge_rate: number = 0; // 技能暴击(废弃）
        public atk_crit: number = 0; // 暴伤伤害
        public crit_extra: number = 0; // 忽视格挡
        public ignore_phyDef: number = 0; // 忽视防御
        public rage_reduce: number = 0; // 怒气减少
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public float_resistance: number = 0; // 浮空抗性
        public cd_speed: number = 0; // 速度
        public support_consume: number = 0; // 援护怒气
        public general_atk_all: number = 0; // 攻击(废弃）
        public general_def_all: number = 0; // 防御(废弃）
        public all_crit: number = 0; // 暴击（废弃）
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public skill_crit: number = 0; // 暴击抵抗
        public crit_resistance: number = 0; // 格挡
        public final_extra: number = 0; // 终极附加(废弃)
        public final_reduce: number = 0; // 终极减免(废弃)
        public ignore_magicDef: number = 0; // 忽视魔防（废弃）
        public map_name: string = ""; // 星宿名字
        public map_index: number = 0; // 星图编号

        private static table: { [key: string]: TableAdviserLevel } = null;

        public static Table(): { [key: string]: TableAdviserLevel } {
            if (TableAdviserLevel.table == null) {
                TableAdviserLevel.table = <{ [key: string]: TableAdviserLevel }>Game.ConfigManager.getTable("table_adviser_level.json");
                if (TableAdviserLevel.table == null) TableAdviserLevel.table = {};
            }
            return TableAdviserLevel.table;
        }

        public static Item(key: number | string): TableAdviserLevel {
            if (key == undefined || key == null) return null;
            let item = TableAdviserLevel.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableAdviserLevel'] = TableAdviserLevel;


    // table_base_adviser.csv
    // 军师
    export class TableBaseAdviser {
        public adviser_id: number = 0; // 军师id
        public adviser_name: string = ""; // 军师名称
        public quality: number = 0; // 品质
        public compose_goods: number = 0; // 合成所需数量
        public compose_count: number = 0; // 合成消耗
        public adviser_des: string = ""; // 基础描述(策划专用)
        public base_skill = new Array<number>(); // 基础属性加成
        public skill_id = new Array<number>(); // 技能id
        public act_spx_id: number = 0; // 动作id
        public act_spx_index: number = 0; // 动作索引
        public effect_spx_id: number = 0; // 特效id
        public effect_spx_index: number = 0; // 特效索引
        public spine_id: number = 0; // 骨骼动画id
        public skeleton_index = new Array<number>(); // 骨骼动画index(待机|出场|施法)
        public movement_id = new Array<string>(); // 骨骼动画名称(待机|出场|施法)
        public head_path: string = ""; // 头像路径
        public name_path: string = ""; // 名字图片
        public name_down_path: string = ""; // 主界面名字图片
        public des: string = ""; // 描述
        public spine_scale: number = 0; // 动画大小

        private static table: { [key: string]: TableBaseAdviser } = null;

        public static Table(): { [key: string]: TableBaseAdviser } {
            if (TableBaseAdviser.table == null) {
                TableBaseAdviser.table = <{ [key: string]: TableBaseAdviser }>Game.ConfigManager.getTable("table_base_adviser.json");
                if (TableBaseAdviser.table == null) TableBaseAdviser.table = {};
            }
            return TableBaseAdviser.table;
        }

        public static Item(key: number | string): TableBaseAdviser {
            if (key == undefined || key == null) return null;
            let item = TableBaseAdviser.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBaseAdviser'] = TableBaseAdviser;


    // table_base_artifact.csv
    // 神兵
    export class TableBaseArtifact {
        public equip_id: number = 0; // 类型
        public equip_name: string = ""; // 名称
        public equip_quality: number = 0; // 品质
        public star: number = 0; // 星级
        public compose_goods: string = ""; // 合成所需物品
        public compose_count: string = ""; // 合成所需数量
        public compose_money: string = ""; // 合成消耗
        public up_equip: string = ""; // 下一阶装备
        public up_money: number = 0; // 进阶消耗金钱
        public up_goods: number = 0; // 进阶消耗材料
        public up_count: number = 0; // 进阶消耗数量
        public skill_id = new Array<number>(); // 神兵技能(从天赋表里获取)
        public general_atk_all = new Array<number>(); // 攻击(废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击（废弃）
        public ignore_def_all = new Array<number>(); // 忽视防御（废弃）
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public skill_atk = new Array<number>(); // 法术攻击（废弃）
        public skill_def = new Array<number>(); // 法术防御(废弃）
        public atk_crit = new Array<number>(); // 暴击
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_extra = new Array<number>(); // 暴伤伤害
        public crit_resistance = new Array<number>(); // 暴击抵抗（废弃）
        public dodge_rate = new Array<number>(); // 格挡
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public icon_path: string = ""; // 图片路径
        public ani_id: number = 0; // 对应ui表的id
        public ani_id_locked: number = 0; // 未解锁时动画
        public ani_id_static: number = 0; // 静态动画
        public skill_icon: string = ""; // 技能图标
        public skill_frame: string = ""; // 技能底板
        public skill_info: string = ""; // 技能描述
        public hero_ani_id: number = 0; // 神兵对应动画
        public sort_id: number = 0; // 显示顺序

        private static table: { [key: string]: TableBaseArtifact } = null;

        public static Table(): { [key: string]: TableBaseArtifact } {
            if (TableBaseArtifact.table == null) {
                TableBaseArtifact.table = <{ [key: string]: TableBaseArtifact }>Game.ConfigManager.getTable("table_base_artifact.json");
                if (TableBaseArtifact.table == null) TableBaseArtifact.table = {};
            }
            return TableBaseArtifact.table;
        }

        public static Item(key: number | string): TableBaseArtifact {
            if (key == undefined || key == null) return null;
            let item = TableBaseArtifact.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBaseArtifact'] = TableBaseArtifact;


    // table_base_general.csv
    // 武将
    export class TableBaseGeneral {
        public general_id: number = 0; // 序列号
        public general_roleId: number = 0; // 映射mapRoleId
        public general_name: string = ""; // 姓名
        public client_sort: number = 0; // 客户端排序
        public type: number = 0; // 派系
        public features: number = 0; // 武将特性(1攻2防3辅)
        public organization: number = 0; // 是否是旅团成员（1是0否）
        public is_open: number = 0; // 是否开启
        public general_soul: number = 0; // 招募所需魂类型
        public soul_count: number = 0; // 招募所需魂数量
        public consume_money: number = 0; // 招募消耗游戏币
        public help_bg: number = 0; // 援助背景
        public aptitude: number = 0; // 资质(11/12/13/14)
        public hero_sign: number = 0; // 标志（1-10）
        public attribute = new Array<number>(); // 特性(攻击/防守/控制/特效)
        public init_star: number = 0; // 初始星级
        public equip_info = new Array<number>(); // 装备设置
        public card_type = new Array<number>(); // 卡片类型
        public card_level = new Array<number>(); // 卡片等级
        public init_friends = new Array<number>(); // 初始伙伴
        public friends_compose = new Array<number>(); // 伙伴属性
        public up_star_soul = new Array<number>(); // 升星所需魂数量
        public up_star_money = new Array<number>(); // 升星所需游戏币
        public up_star_add_skillLevel = new Array<number>(); // 升星增加技能等级上限
        public psychic_unlock_six = new Array<number>(); // 六星解锁念力
        public init_quality: number = 0; // 初始品质
        public quality_partner = new Array<Array<number>>(); // 羁绊激活
        public skill_ids = new Array<number>(); // 技能Id
        public init_passive = new Array<number>(); // 被动
        public awake_passive: number = 0; // 觉醒被动
        public break_skill = new Array<Array<number>>(); // 突破技
        public pokedex_attri: number = 0; // 图鉴加成
        public xj_skill_ids = new Array<number>(); // 仙境技能Id
        public skill_levels = new Array<number>(); // 技能技能(目前测试用)
        public pic_id: number = 0; // 对应头像Id
        public fashion_id = new Array<number>(); // 对应时装id
        public new_recommend: number = 0; // 官方新手推荐
        public general_des: string = ""; // 基础描述
        public role_type: number = 0; // 形态(1-普通武将，2-小兵，3-精英，4-boss)
        public general_profession: number = 0; // 职业(1-步兵近战，2-刺客，3-法师，4-弓箭，5-骑兵)
        public life_id = new Array<number>(); // 传记
        public hide_talent_ids = new Array<number>(); // 隐藏天赋
        public pve_ai: number = 0; // pve_ai
        public pvp_ai: number = 0; // pvp_ai
        public bean_max: number = 0; // 最大攒豆数
        public general_rage: number = 0; // 怒气值
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴击伤害
        public crit_resistance: number = 0; // 暴击抵抗
        public ignore_phyDef: number = 0; // 忽视防御
        public cd_speed: number = 0; // 速度
        public dodge_rate: number = 0; // 格挡率
        public hit_rate: number = 0; // 忽视格挡
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public stiff_resistance: number = 0; // 硬直抵抗
        public float_resistance: number = 0; // 浮空抗性
        public rage_reduce: number = 0; // 初始怒气
        public support_consume: number = 0; // 作为援护出场所需怒气值
        public general_atk_all: number = 0; // 攻击
        public general_def_all: number = 0; // 防御
        public all_crit: number = 0; // 暴击
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_crit: number = 0; // 技能暴击
        public final_extra: number = 0; // 终极附加
        public final_reduce: number = 0; // 终极减免
        public ignore_magicDef: number = 0; // 忽视魔防
        public sacred_atk: number = 0; // 神圣攻击
        public sacred_def: number = 0; // 神圣防御
        public sacred_crit: number = 0; // 神圣暴击
        public ignore_sacredDef: number = 0; // 忽视神防
        public get_up_time: number = 0; // 起身时间
        public is_stir_up: number = 0; // 是否能被挑起
        public stir_up_resistance: number = 0; // 挑起抵抗
        public stir_again_def: number = 0; // 再次挑起抵抗
        public is_gravity: number = 0; // 是否受重力影响
        public move_speed: number = 0; // 移动速度
        public des: string = ""; // 图鉴特点描述
        public extra: string = ""; // 特点
        public name_pic: string = ""; // 名字图片
        public position = new Array<number>(); // 定位
        public technique: string = ""; // 技巧

        private static table: { [key: string]: TableBaseGeneral } = null;

        public static Table(): { [key: string]: TableBaseGeneral } {
            if (TableBaseGeneral.table == null) {
                TableBaseGeneral.table = <{ [key: string]: TableBaseGeneral }>Game.ConfigManager.getTable("table_base_general.json");
                if (TableBaseGeneral.table == null) TableBaseGeneral.table = {};
            }
            return TableBaseGeneral.table;
        }

        public static Item(key: number | string): TableBaseGeneral {
            if (key == undefined || key == null) return null;
            let item = TableBaseGeneral.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBaseGeneral'] = TableBaseGeneral;


    // table_base_pet.csv
    export class TableBasePet {
        public pet_id: number = 0; // 宠物id
        public pet_name: string = ""; // 宠物名称
        public quality: number = 0; // 品质
        public compose_goods: number = 0; // 召唤所需物品
        public compose_count: number = 0; // 召唤消耗
        public step = new Array<number>(); // 阶数
        public evo_star_req = new Array<number>(); // 可进化星级
        public evo_consume_money = new Array<number>(); // 进化消耗金钱
        public evo_consume = new Array<Array<number>>(); // 进化消耗
        public evo_consume_good = new Array<Array<number>>(); // 进化消耗物品数量
        public skill_island = new Array<number>(); // 贪婪之岛被动
        public skill_normal = new Array<number>(); // 正常战斗被动
        public skill: number = 0; // 主动技能
        public up_money = new Array<number>(); // 升星消耗金钱
        public up_goods = new Array<Array<number>>(); // 升星消耗
        public up_count = new Array<Array<number>>(); // 升星消耗数量
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击率
        public crit_extra = new Array<number>(); // 暴击伤害
        public dodge_rate = new Array<number>(); // 格挡率
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）
        public name_path: string = ""; // 路径
        public frame_path: string = ""; // 路径
        public spineId = new Array<number>(); // 进化对应spineId
        public name_down_path: string = ""; // 主界面名字图片
        public spine_id = new Array<number>(); // 骨骼动画id
        public unlock_step = new Array<number>(); // 进阶解锁进化形态
        public skill_Icon = new Array<string>(); // 图标
        public skill_name = new Array<string>(); // 技能名字
        public des: string = ""; // 描述
        public is_open: number = 0; // 是否开启

        private static table: { [key: string]: TableBasePet } = null;

        public static Table(): { [key: string]: TableBasePet } {
            if (TableBasePet.table == null) {
                TableBasePet.table = <{ [key: string]: TableBasePet }>Game.ConfigManager.getTable("table_base_pet.json");
                if (TableBasePet.table == null) TableBasePet.table = {};
            }
            return TableBasePet.table;
        }

        public static Item(key: number | string): TableBasePet {
            if (key == undefined || key == null) return null;
            let item = TableBasePet.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBasePet'] = TableBasePet;


    // table_break_skill_uplevel.csv
    export class TableBreakSkillUplevel {
        public id: number = 0; // 索引
        public consume_goods = new Array<number>(); // 消耗道具
        public consume_count = new Array<number>(); // 消耗数量
        public consume_money = new Array<number>(); // 消耗铜钱
        public exchange_ids = new Array<Array<number>>(); // 所需猎人ids
        public exchange_aptitude = new Array<Array<number>>(); // 所需武将品质
        public exchange_level = new Array<Array<number>>(); // 所需等级
        public exchange_star = new Array<Array<number>>(); // 所需星级
        public exchange_awaken = new Array<Array<number>>(); // 所需觉醒次数

        private static table: { [key: string]: TableBreakSkillUplevel } = null;

        public static Table(): { [key: string]: TableBreakSkillUplevel } {
            if (TableBreakSkillUplevel.table == null) {
                TableBreakSkillUplevel.table = <{ [key: string]: TableBreakSkillUplevel }>Game.ConfigManager.getTable("table_break_skill_uplevel.json");
                if (TableBreakSkillUplevel.table == null) TableBreakSkillUplevel.table = {};
            }
            return TableBreakSkillUplevel.table;
        }

        public static Item(key: number | string): TableBreakSkillUplevel {
            if (key == undefined || key == null) return null;
            let item = TableBreakSkillUplevel.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBreakSkillUplevel'] = TableBreakSkillUplevel;


    // table_buff.csv
    export class TableBuff {
        public buff_id: number = 0; // id
        public rand_power: number = 0; // 随机权重
        public inspire_type: number = 0; // 激励类型
        public buff_name: string = ""; // 名称
        public buff_des: string = ""; // 详细说明
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴伤伤害
        public dodge_rate: number = 0; // 格挡
        public hit_rate: number = 0; // 忽视格挡
        public ignore_phyDef: number = 0; // 忽视防御
        public rage_reduce: number = 0; // 怒气减少
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public float_resistance: number = 0; // 浮空抗性
        public cd_speed: number = 0; // 速度
        public support_consume: number = 0; // 援护怒气
        public general_atk_all: number = 0; // 攻击(废弃）
        public general_def_all: number = 0; // 防御(废弃）
        public all_crit: number = 0; // 暴击（废弃）
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public skill_crit: number = 0; // 技能暴击(废弃）
        public crit_resistance: number = 0; // 暴击抵抗
        public final_extra: number = 0; // 终极附加(废弃)
        public final_reduce: number = 0; // 终极减免(废弃)
        public ignore_magicDef: number = 0; // 忽视魔防（废弃）
        public buff_icon: string = ""; // 图标

        private static table: { [key: string]: TableBuff } = null;

        public static Table(): { [key: string]: TableBuff } {
            if (TableBuff.table == null) {
                TableBuff.table = <{ [key: string]: TableBuff }>Game.ConfigManager.getTable("table_buff.json");
                if (TableBuff.table == null) TableBuff.table = {};
            }
            return TableBuff.table;
        }

        public static Item(key: number | string): TableBuff {
            if (key == undefined || key == null) return null;
            let item = TableBuff.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBuff'] = TableBuff;


    // table_buy_money.csv
    // 点金
    export class TableBuyMoney {
        public index: number = 0; // 次数
        public consume: number = 0; // 消耗代币
        public monoey: number = 0; // 获得铜钱

        private static table: { [key: string]: TableBuyMoney } = null;

        public static Table(): { [key: string]: TableBuyMoney } {
            if (TableBuyMoney.table == null) {
                TableBuyMoney.table = <{ [key: string]: TableBuyMoney }>Game.ConfigManager.getTable("table_buy_money.json");
                if (TableBuyMoney.table == null) TableBuyMoney.table = {};
            }
            return TableBuyMoney.table;
        }

        public static Item(key: number | string): TableBuyMoney {
            if (key == undefined || key == null) return null;
            let item = TableBuyMoney.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableBuyMoney'] = TableBuyMoney;


    // table_channel_pay.csv
    // 充值渠道档位对应表
    export class TableChannelPay {
        public index: number = 0; // 索引
        public product_id: string = ""; // 商品id
        public pay_index: number = 0; // 支付索引(对应table_pay_index中的index)

        private static table: { [key: string]: TableChannelPay } = null;

        public static Table(): { [key: string]: TableChannelPay } {
            if (TableChannelPay.table == null) {
                TableChannelPay.table = <{ [key: string]: TableChannelPay }>Game.ConfigManager.getTable("table_channel_pay.json");
                if (TableChannelPay.table == null) TableChannelPay.table = {};
            }
            return TableChannelPay.table;
        }

        public static Item(key: number | string): TableChannelPay {
            if (key == undefined || key == null) return null;
            let item = TableChannelPay.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableChannelPay'] = TableChannelPay;


    // table_chapter_elite.csv
    // 精英副本章节
    export class TableChapterElite {
        public chapter_id: number = 0; // 章节id
        public chapter_name: string = ""; // 章节名称
        public chapter_pack = new Array<number>(); // 章节包含副本
        public chapter_bg: number = 0; // 章节背景id
        public boss_roleId: number = 0; // 映射mapRoleId
        public boss_x: number = 0; // boss微调x
        public boss_y: number = 0; // boss微调y
        public star_score = new Array<number>(); // 积分
        public goods_id = new Array<Array<number>>(); // 物品
        public goods_count = new Array<Array<number>>(); // 数量
        public chapter_num_pic: string = ""; // 章节序号图片
        public chapter_name_pic: string = ""; // 章节名称图片
        public elite_drop_des = new Array<string>(); // 精英副本掉落说明

        private static table: { [key: string]: TableChapterElite } = null;

        public static Table(): { [key: string]: TableChapterElite } {
            if (TableChapterElite.table == null) {
                TableChapterElite.table = <{ [key: string]: TableChapterElite }>Game.ConfigManager.getTable("table_chapter_elite.json");
                if (TableChapterElite.table == null) TableChapterElite.table = {};
            }
            return TableChapterElite.table;
        }

        public static Item(key: number | string): TableChapterElite {
            if (key == undefined || key == null) return null;
            let item = TableChapterElite.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableChapterElite'] = TableChapterElite;


    // table_chapter_normal.csv
    // 普通副本章节
    export class TableChapterNormal {
        public chapter_id: number = 0; // 章节id
        public chapter_name: string = ""; // 章节名称
        public chapter_pack = new Array<number>(); // 章节包含副本
        public chapter_bg: number = 0; // 章节背景id
        public boss_roleId: number = 0; // 映射mapRoleId
        public boss_x: number = 0; // boss微调x
        public boss_y: number = 0; // boss微调y
        public star_score = new Array<number>(); // 积分
        public goods_id = new Array<Array<number>>(); // 物品
        public goods_count = new Array<Array<number>>(); // 数量
        public chapter_name_pic: string = ""; // 章节名称图片

        private static table: { [key: string]: TableChapterNormal } = null;

        public static Table(): { [key: string]: TableChapterNormal } {
            if (TableChapterNormal.table == null) {
                TableChapterNormal.table = <{ [key: string]: TableChapterNormal }>Game.ConfigManager.getTable("table_chapter_normal.json");
                if (TableChapterNormal.table == null) TableChapterNormal.table = {};
            }
            return TableChapterNormal.table;
        }

        public static Item(key: number | string): TableChapterNormal {
            if (key == undefined || key == null) return null;
            let item = TableChapterNormal.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableChapterNormal'] = TableChapterNormal;


    // table_color_fruit_reward.csv
    // 双色球奖励
    export class TableColorFruitReward {
        public id: number = 0; // id
        public name: string = ""; // 名字
        public all_balls: number = 0; // 总数量
        public reward_goods = new Array<number>(); // 每日获得物品
        public reward_count = new Array<number>(); // 每日获得数量
        public pic: string = ""; // 图片路径

        private static table: { [key: string]: TableColorFruitReward } = null;

        public static Table(): { [key: string]: TableColorFruitReward } {
            if (TableColorFruitReward.table == null) {
                TableColorFruitReward.table = <{ [key: string]: TableColorFruitReward }>Game.ConfigManager.getTable("table_color_fruit_reward.json");
                if (TableColorFruitReward.table == null) TableColorFruitReward.table = {};
            }
            return TableColorFruitReward.table;
        }

        public static Item(key: number | string): TableColorFruitReward {
            if (key == undefined || key == null) return null;
            let item = TableColorFruitReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableColorFruitReward'] = TableColorFruitReward;


    // table_continue_login.csv
    // 连续七天登陆活动
    export class TableContinueLogin {
        public dayIndex: number = 0; // 天数索引
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量
        public show_type = new Array<number>(); // 显示类型

        private static table: { [key: string]: TableContinueLogin } = null;

        public static Table(): { [key: string]: TableContinueLogin } {
            if (TableContinueLogin.table == null) {
                TableContinueLogin.table = <{ [key: string]: TableContinueLogin }>Game.ConfigManager.getTable("table_continue_login.json");
                if (TableContinueLogin.table == null) TableContinueLogin.table = {};
            }
            return TableContinueLogin.table;
        }

        public static Item(key: number | string): TableContinueLogin {
            if (key == undefined || key == null) return null;
            let item = TableContinueLogin.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableContinueLogin'] = TableContinueLogin;


    // table_darkland.csv
    export class TableDarkland {
        public darkland_id: number = 0; // 黑暗大陆id
        public darkland_name: string = ""; // 黑暗大陆名称
        public open_time = new Array<number>(); // 开放时间(开放时间|结束时间|销毁时间)
        public mix_level: number = 0; // 最小等级
        public max_level: number = 0; // 最大等级
        public is_novice: number = 0; // 是否是新手黑暗大陆
        public is_battle: number = 0; // 是否可以战斗
        public is_halo: number = 0; // 是否生效光环
        public optimize_degree: number = 0; // 优化程度(0表示不优化)
        public max_people: number = 0; // 最大进入人数(0表示不做限制)
        public branch_condition: number = 0; // 分支条件(0表示该场景无分支)
        public max_branch: number = 0; // 最多分线(不超过100)
        public tree_pos = new Array<Array<number>>(); // 果树位置
        public revive_x = new Array<number>(); // 复活区域
        public revive_y = new Array<number>(); // 复活区域
        public server_time = new Array<number>(); // 开服时间
        public mobs_produce = new Array<Array<number>>(); // 怪物生成器
        public back_img: string = ""; // 背景图片
        public name_img: string = ""; // 名称图片
        public map_id: number = 0; // 地图id
        public block_index: number = 0; // 地图块类型
        public ani_id = new Array<number>(); // 动画id

        private static table: { [key: string]: TableDarkland } = null;

        public static Table(): { [key: string]: TableDarkland } {
            if (TableDarkland.table == null) {
                TableDarkland.table = <{ [key: string]: TableDarkland }>Game.ConfigManager.getTable("table_darkland.json");
                if (TableDarkland.table == null) TableDarkland.table = {};
            }
            return TableDarkland.table;
        }

        public static Item(key: number | string): TableDarkland {
            if (key == undefined || key == null) return null;
            let item = TableDarkland.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableDarkland'] = TableDarkland;


    // table_darkland_map_block.csv
    export class TableDarklandMapBlock {
        public build_id: number = 0; // 建筑id
        public build_name: string = ""; // 建筑名称
        public show_scene = new Array<number>(); // 出现场景
        public block_cell: number = 0; // 建筑放置层（1:far,2:mid2，3:mid1,4:group,5:close)
        public build_type: number = 0; // 建筑物类型 5:功能npc
        public be_attacked: number = 0; // 建筑是否可被攻击或者触摸
        public build_x: number = 0; // 建筑坐标
        public build_y: number = 0; // 建筑坐标
        public balk_rt = new Array<number>(); // 碰撞格范围
        public touch_rt = new Array<number>(); // 触摸范围
        public is_mirror: number = 0; // 是否镜像
        public draw_order: number = 0; // 绘制层级
        public path: string = ""; // 路径
        public spine_scale: string = ""; // spine缩放
        public spine_id: string = ""; // spine动画
        public des: string = ""; // 描述
        public name_path: string = ""; // 名字路径
        public name_pos = new Array<number>(); // 名字位置

        private static table: { [key: string]: TableDarklandMapBlock } = null;

        public static Table(): { [key: string]: TableDarklandMapBlock } {
            if (TableDarklandMapBlock.table == null) {
                TableDarklandMapBlock.table = <{ [key: string]: TableDarklandMapBlock }>Game.ConfigManager.getTable("table_darkland_map_block.json");
                if (TableDarklandMapBlock.table == null) TableDarklandMapBlock.table = {};
            }
            return TableDarklandMapBlock.table;
        }

        public static Item(key: number | string): TableDarklandMapBlock {
            if (key == undefined || key == null) return null;
            let item = TableDarklandMapBlock.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableDarklandMapBlock'] = TableDarklandMapBlock;


    // table_darkland_rank_reward.csv
    export class TableDarklandRankReward {
        public id: number = 0; // id
        public rank_min: number = 0; // 排名区间下限
        public rank_max: number = 0; // 排名区间上限
        public rank_reward = new Array<Array<number>>(); // 奖励

        private static table: { [key: string]: TableDarklandRankReward } = null;

        public static Table(): { [key: string]: TableDarklandRankReward } {
            if (TableDarklandRankReward.table == null) {
                TableDarklandRankReward.table = <{ [key: string]: TableDarklandRankReward }>Game.ConfigManager.getTable("table_darkland_rank_reward.json");
                if (TableDarklandRankReward.table == null) TableDarklandRankReward.table = {};
            }
            return TableDarklandRankReward.table;
        }

        public static Item(key: number | string): TableDarklandRankReward {
            if (key == undefined || key == null) return null;
            let item = TableDarklandRankReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableDarklandRankReward'] = TableDarklandRankReward;


    // table_evil_zone.csv
    // 罪恶值死亡时间表
    export class TableEvilZone {
        public evil_id: number = 0; // 罪恶值区间索引
        public evil_min: number = 0; // 区间下限
        public evil_max: number = 0; // 区间上限
        public revived_time: number = 0; // 复活时间

        private static table: { [key: string]: TableEvilZone } = null;

        public static Table(): { [key: string]: TableEvilZone } {
            if (TableEvilZone.table == null) {
                TableEvilZone.table = <{ [key: string]: TableEvilZone }>Game.ConfigManager.getTable("table_evil_zone.json");
                if (TableEvilZone.table == null) TableEvilZone.table = {};
            }
            return TableEvilZone.table;
        }

        public static Item(key: number | string): TableEvilZone {
            if (key == undefined || key == null) return null;
            let item = TableEvilZone.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableEvilZone'] = TableEvilZone;


    // table_exchange_mall.csv
    // 兑换
    export class TableExchangeMall {
        public id: number = 0; // 索引(1-仙境2-帮会3-魔域）
        public quality: number = 0; // 排序
        public type: number = 0; // 类型
        public is_choose: number = 0; // 是否选择
        public exchange_goods = new Array<Array<number>>(); // 需求物品
        public exchange_one = new Array<number>(); // 宝物一号位
        public exchange_two = new Array<number>(); // 宝物二号位
        public exchange_three = new Array<number>(); // 宝物三号位
        public is_only: number = 0; // 是否唯一
        public exchange_times: number = 0; // 兑换次数
        public daily_refresh: number = 0; // 日常刷新
        public week_refresh: number = 0; // 周常刷新
        public reward_goods: number = 0; // 兑换物品
        public reward_count: number = 0; // 兑换物品
        public level_min: number = 0; // 最小开启等级
        public des: string = ""; // 描述

        private static table: { [key: string]: TableExchangeMall } = null;

        public static Table(): { [key: string]: TableExchangeMall } {
            if (TableExchangeMall.table == null) {
                TableExchangeMall.table = <{ [key: string]: TableExchangeMall }>Game.ConfigManager.getTable("table_exchange_mall.json");
                if (TableExchangeMall.table == null) TableExchangeMall.table = {};
            }
            return TableExchangeMall.table;
        }

        public static Item(key: number | string): TableExchangeMall {
            if (key == undefined || key == null) return null;
            let item = TableExchangeMall.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableExchangeMall'] = TableExchangeMall;


    // table_facebook.csv
    // facebook分享表
    export class TableFacebook {
        public index: number = 0; // 索引
        public trigger_type: number = 0; // 触发类型
        public trigger_condition: number = 0; // 触发条件
        public reward_goods = new Array<number>(); // 分享奖励
        public reward_count = new Array<number>(); // 奖励数量
        public des: string = ""; // 触发条件说明

        private static table: { [key: string]: TableFacebook } = null;

        public static Table(): { [key: string]: TableFacebook } {
            if (TableFacebook.table == null) {
                TableFacebook.table = <{ [key: string]: TableFacebook }>Game.ConfigManager.getTable("table_facebook.json");
                if (TableFacebook.table == null) TableFacebook.table = {};
            }
            return TableFacebook.table;
        }

        public static Item(key: number | string): TableFacebook {
            if (key == undefined || key == null) return null;
            let item = TableFacebook.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableFacebook'] = TableFacebook;


    // table_first_charge.csv
    // 首冲表
    export class TableFirstCharge {
        public index: number = 0; // 索引
        public token: number = 0; // 充值数量
        public reward_goods = new Array<number>(); // 奖励内容
        public reward_count = new Array<number>(); // 奖励数量
        public show_type = new Array<number>(); // 显示类型
        public star_path: string = ""; // 几星文字
        public icon_path_title: string = ""; // 每档标题
        public icon_path_topic: string = ""; // 物品主题
        public icon_path_tip: string = ""; // 提示
        public role_pic: string = ""; // 角色图片
        public button_pic: string = ""; // 按钮图片

        private static table: { [key: string]: TableFirstCharge } = null;

        public static Table(): { [key: string]: TableFirstCharge } {
            if (TableFirstCharge.table == null) {
                TableFirstCharge.table = <{ [key: string]: TableFirstCharge }>Game.ConfigManager.getTable("table_first_charge.json");
                if (TableFirstCharge.table == null) TableFirstCharge.table = {};
            }
            return TableFirstCharge.table;
        }

        public static Item(key: number | string): TableFirstCharge {
            if (key == undefined || key == null) return null;
            let item = TableFirstCharge.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableFirstCharge'] = TableFirstCharge;


    // table_formations.csv
    export class TableFormations {
        public id: number = 0; // 阵型类型
        public des: string = ""; // 描述
        public generals: number = 0; // 参战武将数量
        public reserves: number = 0; // 替补武将数量
        public supports: number = 0; // 援助武将数量
        public generals_limit_level = new Array<number>(); // 第四个位置开启条件
        public generals_limit_number = new Array<number>(); // 主将增加数量
        public supports_limit_level = new Array<number>(); // 援护开启等级
        public supports_limit_number = new Array<number>(); // 援护增加数量
        public unopen_des: string = ""; // 主将未开启描述

        private static table: { [key: string]: TableFormations } = null;

        public static Table(): { [key: string]: TableFormations } {
            if (TableFormations.table == null) {
                TableFormations.table = <{ [key: string]: TableFormations }>Game.ConfigManager.getTable("table_formations.json");
                if (TableFormations.table == null) TableFormations.table = {};
            }
            return TableFormations.table;
        }

        public static Item(key: number | string): TableFormations {
            if (key == undefined || key == null) return null;
            let item = TableFormations.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableFormations'] = TableFormations;


    // table_function_open.csv
    // 开启等级
    export class TableFunctionOpen {
        public id: number = 0; // 功能类型
        public name: string = ""; // 名称
        public condition: number = 0; // 解锁条件-等级
        public condition_instance: number = 0; // 解锁条件-副本
        public show: number = 0; // 是否在升级界面显示
        public maincity: number = 0; // 是否在目标界面显示
        public unopen_tip: string = ""; // 未解锁提示
        public path: string = ""; // 图片
        public des: string = ""; // 功能说明

        private static table: { [key: string]: TableFunctionOpen } = null;

        public static Table(): { [key: string]: TableFunctionOpen } {
            if (TableFunctionOpen.table == null) {
                TableFunctionOpen.table = <{ [key: string]: TableFunctionOpen }>Game.ConfigManager.getTable("table_function_open.json");
                if (TableFunctionOpen.table == null) TableFunctionOpen.table = {};
            }
            return TableFunctionOpen.table;
        }

        public static Item(key: number | string): TableFunctionOpen {
            if (key == undefined || key == null) return null;
            let item = TableFunctionOpen.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableFunctionOpen'] = TableFunctionOpen;


    // table_gamble_jade.csv
    // 宝石切割
    export class TableGambleJade {
        public index: number = 0; // 类型
        public jade_ids = new Array<number>(); // 宝石id
        public jade_powers = new Array<number>(); // 宝石概率
        public jade_will = new Array<number>(); // 必出宝石
        public result_count: number = 0; // 随机数量
        public cost_type: number = 0; // 消耗资源类型
        public cost_count: number = 0; // 花费数量
        public is_show: string = ""; // 是否公告

        private static table: { [key: string]: TableGambleJade } = null;

        public static Table(): { [key: string]: TableGambleJade } {
            if (TableGambleJade.table == null) {
                TableGambleJade.table = <{ [key: string]: TableGambleJade }>Game.ConfigManager.getTable("table_gamble_jade.json");
                if (TableGambleJade.table == null) TableGambleJade.table = {};
            }
            return TableGambleJade.table;
        }

        public static Item(key: number | string): TableGambleJade {
            if (key == undefined || key == null) return null;
            let item = TableGambleJade.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGambleJade'] = TableGambleJade;


    // table_general_break.csv
    export class TableGeneralBreak {
        public general_id: number = 0; // 猎人ID
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击率
        public crit_extra = new Array<number>(); // 暴击伤害
        public dodge_rate = new Array<number>(); // 格挡率
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）

        private static table: { [key: string]: TableGeneralBreak } = null;

        public static Table(): { [key: string]: TableGeneralBreak } {
            if (TableGeneralBreak.table == null) {
                TableGeneralBreak.table = <{ [key: string]: TableGeneralBreak }>Game.ConfigManager.getTable("table_general_break.json");
                if (TableGeneralBreak.table == null) TableGeneralBreak.table = {};
            }
            return TableGeneralBreak.table;
        }

        public static Item(key: number | string): TableGeneralBreak {
            if (key == undefined || key == null) return null;
            let item = TableGeneralBreak.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralBreak'] = TableGeneralBreak;


    // table_general_breakup.csv
    // 猎人突破
    export class TableGeneralBreakup {
        public id: number = 0; // 突破等级
        public condition_aptitude = new Array<number>(); // 突破猎人资质
        public condition_transfer: number = 0; // 突破猎人变身
        public condition_level: number = 0; // 突破猎人所需等级
        public condition_star: number = 0; // 突破猎人所需星级
        public condition_awaken: number = 0; // 突破猎人所需觉醒次数
        public exchange_store = new Array<number>(); // 所需突破石
        public exchange_generals = new Array<number>(); // 所需猎人(0任意1同名)
        public exchange_level = new Array<number>(); // 所需等级
        public exchange_star = new Array<number>(); // 所需星级
        public exchange_awaken = new Array<number>(); // 所需觉醒次数
        public exchange_break = new Array<number>(); // 所需突破次数
        public consume: number = 0; // 消耗金币
        public add_level: number = 0; // 增加等级上限
        public add_step: number = 0; // 增加的进阶数
        public add_skillLevel: number = 0; // 增加的技能等级上限
        public open_skill: number = 0; // 解锁突破技
        public break_skill_level = new Array<number>(); // 突破技能等级
        public halo_front_aniId: number = 0; // 身前光环id
        public halo_back_aniId: number = 0; // 身后光环id

        private static table: { [key: string]: TableGeneralBreakup } = null;

        public static Table(): { [key: string]: TableGeneralBreakup } {
            if (TableGeneralBreakup.table == null) {
                TableGeneralBreakup.table = <{ [key: string]: TableGeneralBreakup }>Game.ConfigManager.getTable("table_general_breakup.json");
                if (TableGeneralBreakup.table == null) TableGeneralBreakup.table = {};
            }
            return TableGeneralBreakup.table;
        }

        public static Item(key: number | string): TableGeneralBreakup {
            if (key == undefined || key == null) return null;
            let item = TableGeneralBreakup.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralBreakup'] = TableGeneralBreakup;


    // table_general_compose.csv
    // 武将组合表
    export class TableGeneralCompose {
        public compose_id: number = 0; // 组合ID
        public compose_name: string = ""; // 组合名
        public compose_ratio: number = 0; // 权重比
        public des: string = ""; // 描述
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击
        public crit_extra = new Array<number>(); // 暴伤伤害
        public dodge_rate = new Array<number>(); // 格挡
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）

        private static table: { [key: string]: TableGeneralCompose } = null;

        public static Table(): { [key: string]: TableGeneralCompose } {
            if (TableGeneralCompose.table == null) {
                TableGeneralCompose.table = <{ [key: string]: TableGeneralCompose }>Game.ConfigManager.getTable("table_general_compose.json");
                if (TableGeneralCompose.table == null) TableGeneralCompose.table = {};
            }
            return TableGeneralCompose.table;
        }

        public static Item(key: number | string): TableGeneralCompose {
            if (key == undefined || key == null) return null;
            let item = TableGeneralCompose.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralCompose'] = TableGeneralCompose;


    // table_general_equip.csv
    // 武将装备
    export class TableGeneralEquip {
        public id: number = 0; // 编号
        public name: string = ""; // 名字
        public type: number = 0; // 类型（1通用1，2通用2，3专属）
        public skillId = new Array<number>(); // 被动天赋技能id
        public skillActivaLevel = new Array<number>(); // 天赋技能激活等级
        public skillLevel = new Array<number>(); // 品阶对应技能等级
        public compose_goods: string = ""; // 专属合成消耗物品
        public compose_count: string = ""; // 专属合成消耗数量
        public compose_money: number = 0; // 合成消耗金币
        public uplevel_goods = new Array<Array<number>>(); // 升级消耗物品
        public uplevel_count = new Array<Array<number>>(); // 升级消耗数量
        public uplevel_money = new Array<number>(); // 升级消耗铜钱
        public upstep_goods = new Array<Array<number>>(); // 升品消耗物品
        public upstep_count = new Array<Array<number>>(); // 升品消耗物品
        public upstep_money = new Array<number>(); // 升品消耗金钱
        public main_attri: number = 0; // 主属性
        public add_attri_one: number = 0; // 附加属性1
        public add_attri_two: string = ""; // 附加属性2
        public equip_des: string = ""; // 描述
        public name_path: string = ""; // 名字图片
        public equip_icon: string = ""; // 图标
        public equip_title: string = ""; // 标题
        public equip_type: string = ""; // 类型
        public equip_type_des: string = ""; // 系别
        public equip_type_name: string = ""; // 名字

        private static table: { [key: string]: TableGeneralEquip } = null;

        public static Table(): { [key: string]: TableGeneralEquip } {
            if (TableGeneralEquip.table == null) {
                TableGeneralEquip.table = <{ [key: string]: TableGeneralEquip }>Game.ConfigManager.getTable("table_general_equip.json");
                if (TableGeneralEquip.table == null) TableGeneralEquip.table = {};
            }
            return TableGeneralEquip.table;
        }

        public static Item(key: number | string): TableGeneralEquip {
            if (key == undefined || key == null) return null;
            let item = TableGeneralEquip.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralEquip'] = TableGeneralEquip;


    // table_general_equip_attri.csv
    export class TableGeneralEquipAttri {
        public attri_id: number = 0; // 属性ID
        public name: string = ""; // 
        public main_type: number = 0; // 属性分类（1主属性2附加属性）
        public add_type: number = 0; // 属性数值类型（1数值|2百分比）
        public attri_type: number = 0; // 属性类型
        public attri_value: number = 0; // 属性数值
        public attri_add = new Array<number>(); // 加成

        private static table: { [key: string]: TableGeneralEquipAttri } = null;

        public static Table(): { [key: string]: TableGeneralEquipAttri } {
            if (TableGeneralEquipAttri.table == null) {
                TableGeneralEquipAttri.table = <{ [key: string]: TableGeneralEquipAttri }>Game.ConfigManager.getTable("table_general_equip_attri.json");
                if (TableGeneralEquipAttri.table == null) TableGeneralEquipAttri.table = {};
            }
            return TableGeneralEquipAttri.table;
        }

        public static Item(key: number | string): TableGeneralEquipAttri {
            if (key == undefined || key == null) return null;
            let item = TableGeneralEquipAttri.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralEquipAttri'] = TableGeneralEquipAttri;


    // table_general_hole.csv
    // 武将羁绊
    export class TableGeneralHole {
        public hole_id: number = 0; // 序列号
        public partner_id: number = 0; // 羁绊卡
        public activate_num: number = 0; // 激活消耗数量
        public activate_money: number = 0; // 激活消耗
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 物理攻击
        public general_def: number = 0; // 物理防御
        public atk_crit: number = 0; // 物攻暴击
        public crit_extra: number = 0; // 暴伤加成值
        public dodge_rate: number = 0; // 闪避
        public hit_rate: number = 0; // 命中
        public ignore_phyDef: number = 0; // 忽视物防
        public rage_reduce: number = 0; // 怒气减少
        public cd_speed: number = 0; // 速度
        public support_consume: number = 0; // 援护怒气
        public general_atk_all: number = 0; // 攻击
        public general_def_all: number = 0; // 防御
        public all_crit: number = 0; // 暴击
        public ignore_def_all: number = 0; // 忽视防御
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public skill_crit: number = 0; // 技能暴击
        public crit_resistance: number = 0; // 暴击抵抗
        public final_extra: number = 0; // 终极附加
        public final_reduce: number = 0; // 终极减免
        public ignore_magicDef: number = 0; // 忽视魔防

        private static table: { [key: string]: TableGeneralHole } = null;

        public static Table(): { [key: string]: TableGeneralHole } {
            if (TableGeneralHole.table == null) {
                TableGeneralHole.table = <{ [key: string]: TableGeneralHole }>Game.ConfigManager.getTable("table_general_hole.json");
                if (TableGeneralHole.table == null) TableGeneralHole.table = {};
            }
            return TableGeneralHole.table;
        }

        public static Item(key: number | string): TableGeneralHole {
            if (key == undefined || key == null) return null;
            let item = TableGeneralHole.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralHole'] = TableGeneralHole;


    // table_general_life.csv
    // 传记
    export class TableGeneralLife {
        public life_id: number = 0; // id
        public life_name: string = ""; // 名字
        public path: string = ""; // 路径
        public des: string = ""; // 描述
        public battle_power: number = 0; // 战力加成权重
        public stat_zone = new Array<number>(); // 激活数量区间
        public add_allattri = new Array<number>(); // 增加全属性(百分比)
        public begin_point: number = 0; // 起点
        public stat_points = new Array<number>(); // 属性激活点

        private static table: { [key: string]: TableGeneralLife } = null;

        public static Table(): { [key: string]: TableGeneralLife } {
            if (TableGeneralLife.table == null) {
                TableGeneralLife.table = <{ [key: string]: TableGeneralLife }>Game.ConfigManager.getTable("table_general_life.json");
                if (TableGeneralLife.table == null) TableGeneralLife.table = {};
            }
            return TableGeneralLife.table;
        }

        public static Item(key: number | string): TableGeneralLife {
            if (key == undefined || key == null) return null;
            let item = TableGeneralLife.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralLife'] = TableGeneralLife;


    // table_general_life_statpoints.csv
    // 传记点
    export class TableGeneralLifeStatpoints {
        public stat_id: number = 0; // id
        public name: string = ""; // 名字
        public is_battle: number = 0; // 是否挑战
        public battle_value: number = 0; // 推荐战力
        public battle_bg: number = 0; // 战斗背景
        public quality: number = 0; // 品质
        public consume_goods = new Array<number>(); // 消耗的物品
        public consume_count = new Array<number>(); // 消耗的数量
        public assist_items = new Array<number>(); // 可使用辅助物品
        public rand_power = new Array<number>(); // 随机概率
        public path: string = ""; // 图标路径
        public path_open: string = ""; // 图标路径
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴伤伤害
        public dodge_rate: number = 0; // 格挡
        public hit_rate: number = 0; // 忽视格挡
        public ignore_phyDef: number = 0; // 忽视防御
        public rage_reduce: number = 0; // 怒气减少
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public float_resistance: number = 0; // 浮空抗性
        public cd_speed: number = 0; // 速度
        public support_consume: number = 0; // 援护怒气
        public general_atk_all: number = 0; // 攻击(废弃）
        public general_def_all: number = 0; // 防御(废弃）
        public all_crit: number = 0; // 暴击（废弃）
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public skill_crit: number = 0; // 技能暴击(废弃）
        public crit_resistance: number = 0; // 暴击抵抗
        public final_extra: number = 0; // 终极附加(废弃)
        public final_reduce: number = 0; // 终极减免(废弃)
        public ignore_magicDef: number = 0; // 忽视魔防（废弃）

        private static table: { [key: string]: TableGeneralLifeStatpoints } = null;

        public static Table(): { [key: string]: TableGeneralLifeStatpoints } {
            if (TableGeneralLifeStatpoints.table == null) {
                TableGeneralLifeStatpoints.table = <{ [key: string]: TableGeneralLifeStatpoints }>Game.ConfigManager.getTable("table_general_life_statpoints.json");
                if (TableGeneralLifeStatpoints.table == null) TableGeneralLifeStatpoints.table = {};
            }
            return TableGeneralLifeStatpoints.table;
        }

        public static Item(key: number | string): TableGeneralLifeStatpoints {
            if (key == undefined || key == null) return null;
            let item = TableGeneralLifeStatpoints.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralLifeStatpoints'] = TableGeneralLifeStatpoints;


    // table_general_make.csv
    // 武将合成
    export class TableGeneralMake {
        public id: number = 0; // 索引
        public compose_id: number = 0; // 合成猎人id
        public exchange_ids = new Array<number>(); // 所需猎人ids
        public exchange_aptitude = new Array<number>(); // 所需武将品质
        public exchange_level = new Array<number>(); // 所需等级
        public exchange_star = new Array<number>(); // 所需星级
        public exchange_awaken = new Array<number>(); // 所需觉醒次数
        public consume: number = 0; // 消耗金币

        private static table: { [key: string]: TableGeneralMake } = null;

        public static Table(): { [key: string]: TableGeneralMake } {
            if (TableGeneralMake.table == null) {
                TableGeneralMake.table = <{ [key: string]: TableGeneralMake }>Game.ConfigManager.getTable("table_general_make.json");
                if (TableGeneralMake.table == null) TableGeneralMake.table = {};
            }
            return TableGeneralMake.table;
        }

        public static Item(key: number | string): TableGeneralMake {
            if (key == undefined || key == null) return null;
            let item = TableGeneralMake.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralMake'] = TableGeneralMake;


    // table_general_psychic.csv
    // 念力组合表
    export class TableGeneralPsychic {
        public psychic_id: number = 0; // 念力
        public name: string = ""; // 
        public power: number = 0; // 随机权重
        public rand_attri = new Array<number>(); // 随机属性
        public rand_power = new Array<number>(); // 随机权重
        public group_num: number = 0; // 组合条件
        public group_talent: number = 0; // 组合效果
        public path: string = ""; // 路径

        private static table: { [key: string]: TableGeneralPsychic } = null;

        public static Table(): { [key: string]: TableGeneralPsychic } {
            if (TableGeneralPsychic.table == null) {
                TableGeneralPsychic.table = <{ [key: string]: TableGeneralPsychic }>Game.ConfigManager.getTable("table_general_psychic.json");
                if (TableGeneralPsychic.table == null) TableGeneralPsychic.table = {};
            }
            return TableGeneralPsychic.table;
        }

        public static Item(key: number | string): TableGeneralPsychic {
            if (key == undefined || key == null) return null;
            let item = TableGeneralPsychic.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralPsychic'] = TableGeneralPsychic;


    // table_general_psychic_attri.csv
    // 念力表
    export class TableGeneralPsychicAttri {
        public attri_id: number = 0; // 属性ID
        public name: string = ""; // 
        public quality: number = 0; // 品质（1/2/3/4）
        public attri_type: number = 0; // 随机属性类型（1生命2攻击4命中5抵抗8暴伤9暴抗）
        public object_type: number = 0; // 对象类型(1数值2百分比)
        public attri_value = new Array<number>(); // 属性范围(浮点型)
        public consume_general = new Array<number>(); // 升级消耗猎人id(0为任意)
        public general_level = new Array<number>(); // 所需猎人等级
        public general_star = new Array<number>(); // 所需猎人星级
        public general_awaken = new Array<number>(); // 所需猎人觉醒次数
        public general_count = new Array<number>(); // 所需猎人个数
        public consume_money = new Array<number>(); // 消耗金币
        public consume_fridge = new Array<Array<number>>(); // 消耗念力果
        public path: string = ""; // 路径

        private static table: { [key: string]: TableGeneralPsychicAttri } = null;

        public static Table(): { [key: string]: TableGeneralPsychicAttri } {
            if (TableGeneralPsychicAttri.table == null) {
                TableGeneralPsychicAttri.table = <{ [key: string]: TableGeneralPsychicAttri }>Game.ConfigManager.getTable("table_general_psychic_attri.json");
                if (TableGeneralPsychicAttri.table == null) TableGeneralPsychicAttri.table = {};
            }
            return TableGeneralPsychicAttri.table;
        }

        public static Item(key: number | string): TableGeneralPsychicAttri {
            if (key == undefined || key == null) return null;
            let item = TableGeneralPsychicAttri.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralPsychicAttri'] = TableGeneralPsychicAttri;


    // table_general_quality.csv
    // 武将进阶表
    export class TableGeneralQuality {
        public general_id: number = 0; // 序列号
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击
        public crit_extra = new Array<number>(); // 暴伤伤害
        public dodge_rate = new Array<number>(); // 格挡
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）

        private static table: { [key: string]: TableGeneralQuality } = null;

        public static Table(): { [key: string]: TableGeneralQuality } {
            if (TableGeneralQuality.table == null) {
                TableGeneralQuality.table = <{ [key: string]: TableGeneralQuality }>Game.ConfigManager.getTable("table_general_quality.json");
                if (TableGeneralQuality.table == null) TableGeneralQuality.table = {};
            }
            return TableGeneralQuality.table;
        }

        public static Item(key: number | string): TableGeneralQuality {
            if (key == undefined || key == null) return null;
            let item = TableGeneralQuality.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralQuality'] = TableGeneralQuality;


    // table_general_skill.csv
    // 描述
    export class TableGeneralSkill {
        public skill_id: number = 0; // 技能序列号
        public des_private: string = ""; // 私人描述
        public skill_name: string = ""; // 技能名称
        public quality: number = 0; // 品质框
        public uplevel_Id: string = ""; // 下一级Id
        public uplevel_consume = new Array<Array<number>>(); // 升级消耗
        public awaken_consume = new Array<Array<number>>(); // 激活消耗
        public awaken_id: number = 0; // 觉醒ID（版本无）
        public relate_still_effect: number = 0; // 关联静止指向特效
        public des: string = ""; // 描述
        public upgrade_des: string = ""; // 升级描速
        public talent_des = new Array<string>(); // 附加描述
        public buff_des = new Array<string>(); // BUFF描述
        public skill_des: string = ""; // 未获得描述
        public path: string = ""; // 图标路径
        public skill_units = new Array<string>(); // 技能单元
        public skill_cd_icon: string = ""; // 技能cd图标
        public skill_name_path: string = ""; // 技能名称路径
        public skill_name2_path_s: string = ""; // 技能名称路径（小）
        public extra_effect = new Array<Array<number>>(); // 技能附加效果
        public skill_cd: number = 0; // 技能cd时间
        public skill_cd_entry: number = 0; // 入场技能cd时间
        public skill_consume_rage: number = 0; // 消耗怒气值
        public skill_big_type: number = 0; // 技能大类型(1-普攻，2-小技能，3必杀)
        public skill_damage_type: number = 0; // 技能伤害类型(1-物理，2-魔法，3-神圣)
        public skill_order: number = 0; // 技能优先级
        public skill_hurt_ratio = new Array<number>(); // 效果基础值(百分比)及升级增量
        public skill_extra_value = new Array<number>(); // 效果附加值(数值)及升级增量
        public skill_upgrade_continueTime = new Array<number>(); // 持续时间及升级增量
        public skill_delay_time: number = 0; // 技能延迟时间
        public skill_ai_type: number = 0; // 技能ai类型
        public attack_time: number = 0; // 攻击次数
        public attack_range = new Array<number>(); // 攻击范围

        private static table: { [key: string]: TableGeneralSkill } = null;

        public static Table(): { [key: string]: TableGeneralSkill } {
            if (TableGeneralSkill.table == null) {
                TableGeneralSkill.table = <{ [key: string]: TableGeneralSkill }>Game.ConfigManager.getTable("table_general_skill.json");
                if (TableGeneralSkill.table == null) TableGeneralSkill.table = {};
            }
            return TableGeneralSkill.table;
        }

        public static Item(key: number | string): TableGeneralSkill {
            if (key == undefined || key == null) return null;
            let item = TableGeneralSkill.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralSkill'] = TableGeneralSkill;


    // table_general_star.csv
    // 武将星级提升系数表
    export class TableGeneralStar {
        public general_id: number = 0; // 序列号
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击
        public crit_extra = new Array<number>(); // 暴伤伤害
        public dodge_rate = new Array<number>(); // 格挡
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）

        private static table: { [key: string]: TableGeneralStar } = null;

        public static Table(): { [key: string]: TableGeneralStar } {
            if (TableGeneralStar.table == null) {
                TableGeneralStar.table = <{ [key: string]: TableGeneralStar }>Game.ConfigManager.getTable("table_general_star.json");
                if (TableGeneralStar.table == null) TableGeneralStar.table = {};
            }
            return TableGeneralStar.table;
        }

        public static Item(key: number | string): TableGeneralStar {
            if (key == undefined || key == null) return null;
            let item = TableGeneralStar.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralStar'] = TableGeneralStar;


    // table_general_step.csv
    // 武将阶级
    export class TableGeneralStep {
        public general_step: number = 0; // 序列号
        public general_quality: number = 0; // 武将品质
        public general_pos = new Array<number>(); // 羁绊位置
        public add_skill: number = 0; // 技能点
        public consume_money: number = 0; // 升阶铜钱消耗
        public max_level: number = 0; // 等级上限
        public name: string = ""; // 品阶名称
        public name_path: string = ""; // 路径
        public frame_path: string = ""; // 边框路径

        private static table: { [key: string]: TableGeneralStep } = null;

        public static Table(): { [key: string]: TableGeneralStep } {
            if (TableGeneralStep.table == null) {
                TableGeneralStep.table = <{ [key: string]: TableGeneralStep }>Game.ConfigManager.getTable("table_general_step.json");
                if (TableGeneralStep.table == null) TableGeneralStep.table = {};
            }
            return TableGeneralStep.table;
        }

        public static Item(key: number | string): TableGeneralStep {
            if (key == undefined || key == null) return null;
            let item = TableGeneralStep.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralStep'] = TableGeneralStep;


    // table_general_talent.csv
    // 武将天赋
    export class TableGeneralTalent {
        public talent_id: number = 0; // 天赋唯一码
        public talent_name: string = ""; // 天赋名称
        public talent_type_name: string = ""; // 天赋类型名
        public talent_type: number = 0; // 天赋类型
        public talent_quality: number = 0; // 天赋品质
        public open_level: number = 0; // 隐藏天赋开启等级（必杀技等级）
        public max_level: number = 0; // 天赋最大等级
        public uplevel_consume = new Array<Array<number>>(); // 升级消耗
        public is_awakened: number = 0; // 是否是觉醒技
        public uplevel_generals = new Array<number>(); // 升级消耗猎人
        public talent_break: string = ""; // 天赋突破
        public talent_describe: string = ""; // 天赋描述
        public talent_type_des: string = ""; // 天赋类型描述
        public skill_des: string = ""; // 未获得描述
        public talent_pro_des: number = 0; // 0
        public trigger_type: number = 0; // 天赋触发类型
        public trigger_condition = new Array<number>(); // 触发条件
        public trigger_rate = new Array<number>(); // 触发基础概率及升级参数
        public trigger_decay: number = 0; // 触发衰减
        public talent_effect = new Array<number>(); // 天赋效果
        public is_handOut: number = 0; // 是否分发
        public handOut_rate = new Array<number>(); // 分发每项概率
        public talent_extra: number = 0; // 天赋额外参数
        public talent_extra2: number = 0; // 天赋额外参数2
        public path: string = ""; // 图片
        public spx_id: number = 0; // 资源序列号
        public css_id: number = 0; // 资源序列号
        public action_id: number = 0; // 行为序列号
        public blend_active: number = 0; // 混合通道是否开启
        public bones: number = 0; // 需要混合的骨骼名
        public buff_pos: string = ""; // 位置
        public is_eyes: number = 0; // 是否触发眼睛特效
        public buff_name_path: string = ""; // 名称路径
        public trigger_ani_index: number = 0; // 触发动画索引(战斗骨骼动画)

        private static table: { [key: string]: TableGeneralTalent } = null;

        public static Table(): { [key: string]: TableGeneralTalent } {
            if (TableGeneralTalent.table == null) {
                TableGeneralTalent.table = <{ [key: string]: TableGeneralTalent }>Game.ConfigManager.getTable("table_general_talent.json");
                if (TableGeneralTalent.table == null) TableGeneralTalent.table = {};
            }
            return TableGeneralTalent.table;
        }

        public static Item(key: number | string): TableGeneralTalent {
            if (key == undefined || key == null) return null;
            let item = TableGeneralTalent.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralTalent'] = TableGeneralTalent;


    // table_general_talent_effect.csv
    // 天赋效果表
    export class TableGeneralTalentEffect {
        public effect_id: number = 0; // 天赋效果id
        public talent_type_name: string = ""; // 天赋类型名
        public talent_type: number = 0; // 天赋类型
        public effect_name: string = ""; // 天赋名称效果名称
        public effect_type: number = 0; // 天赋效果
        public effect_param: number = 0; // 天赋效果参数(备注：效果类型为1到4的可填数值参数，效果类型是7、8、9、10、13、14、23、24、25可区分伤害类型，如果不区分就填-1，效果类型是16、17的可填属性类型属性不可填-1，初次之外的其他类型如果没有其他需求都统一填-1
        public effect_rate = new Array<number>(); // 效果触发几率及升级参数
        public effect_pos: number = 0; // 天赋效果施加位置
        public effect_target: number = 0; // 天赋效果施加目标
        public effect_value = new Array<number>(); // 效果基础值及升级参数
        public effect_value2 = new Array<number>(); // 假效果基础值及升级参数
        public scene_type = new Array<number>(); // 场景类型
        public scene_add_value = new Array<number>(); // 场景附加
        public growUp_value = new Array<number>(); // 成长其他数值（赵云怒气）
        public effect_extra: number = 0; // 效果额外参数个别天赋所用,如(龙魂、龙怨、诡道、猎杀等 )
        public effect_extra2: number = 0; // 效果额外参数个别天赋所用,如(龙魂、龙怨、诡道、猎杀等 )
        public effect_extra3 = new Array<number>(); // 效果额外参数个别天赋所用,如(龙魂、龙怨、诡道、猎杀等 )
        public effect_buffId: number = 0; // 天赋效果产生的buff的id
        public effect_buffLv: number = 0; // 天赋效果产生的buff的等级
        public spx_id: number = 0; // 资源序列号
        public action_id: number = 0; // 行为序列号
        public blend_active: number = 0; // 混合通道是否开启
        public bones: number = 0; // 需要混合通道的骨骼
        public buff_pos: string = ""; // 位置

        private static table: { [key: string]: TableGeneralTalentEffect } = null;

        public static Table(): { [key: string]: TableGeneralTalentEffect } {
            if (TableGeneralTalentEffect.table == null) {
                TableGeneralTalentEffect.table = <{ [key: string]: TableGeneralTalentEffect }>Game.ConfigManager.getTable("table_general_talent_effect.json");
                if (TableGeneralTalentEffect.table == null) TableGeneralTalentEffect.table = {};
            }
            return TableGeneralTalentEffect.table;
        }

        public static Item(key: number | string): TableGeneralTalentEffect {
            if (key == undefined || key == null) return null;
            let item = TableGeneralTalentEffect.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralTalentEffect'] = TableGeneralTalentEffect;


    // table_general_transfer.csv
    export class TableGeneralTransfer {
        public general_id: number = 0; // 序列号
        public general_name: string = ""; // 姓名
        public general_add: number = 0; // 是否可变身
        public consume_goods = new Array<Array<number>>(); // 变身消耗物品
        public general_level: number = 0; // 变身武将等级
        public general_star: number = 0; // 变身武将星级
        public pic_id: number = 0; // 变身头像
        public transfer_role: number = 0; // 变身形象
        public transfer_skill: number = 0; // 变身技能
        public uplevel_consume = new Array<Array<number>>(); // 升级技能消耗
        public uplevel_consume_count = new Array<Array<number>>(); // 升级技能消耗数量
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击率
        public crit_extra = new Array<number>(); // 暴击伤害
        public dodge_rate = new Array<number>(); // 格挡率
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）
        public name_pic: string = ""; // 变身后名字路径
        public transfer_floor: string = ""; // 子项底板
        public transfer_board: string = ""; // 子项遮盖
        public transfer_des: string = ""; // 变身描述

        private static table: { [key: string]: TableGeneralTransfer } = null;

        public static Table(): { [key: string]: TableGeneralTransfer } {
            if (TableGeneralTransfer.table == null) {
                TableGeneralTransfer.table = <{ [key: string]: TableGeneralTransfer }>Game.ConfigManager.getTable("table_general_transfer.json");
                if (TableGeneralTransfer.table == null) TableGeneralTransfer.table = {};
            }
            return TableGeneralTransfer.table;
        }

        public static Item(key: number | string): TableGeneralTransfer {
            if (key == undefined || key == null) return null;
            let item = TableGeneralTransfer.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableGeneralTransfer'] = TableGeneralTransfer;


    // table_halo.csv
    // 星耀光环
    export class TableHalo {
        public id: number = 0; // 编号
        public name: string = ""; // 道具名字
        public is_battle: number = 0; // 是否战斗光环
        public add_type = new Array<number>(); // 加成类型(1血量2攻击3防御4命中5抵抗6暴击8爆伤)
        public add_crit = new Array<number>(); // 血量加成
        public halo_front_aniId: number = 0; // 星耀光环前侧动画id
        public halo_back_aniId: number = 0; // 星耀光环后侧动画id
        public scene_speed_add: number = 0; // 场景加速加成
        public extra: string = ""; // 附加描述
        public path: string = ""; // 图标路径
        public des: string = ""; // 备注

        private static table: { [key: string]: TableHalo } = null;

        public static Table(): { [key: string]: TableHalo } {
            if (TableHalo.table == null) {
                TableHalo.table = <{ [key: string]: TableHalo }>Game.ConfigManager.getTable("table_halo.json");
                if (TableHalo.table == null) TableHalo.table = {};
            }
            return TableHalo.table;
        }

        public static Item(key: number | string): TableHalo {
            if (key == undefined || key == null) return null;
            let item = TableHalo.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableHalo'] = TableHalo;


    // table_hunter_awake.csv
    // 武将觉醒表
    export class TableHunterAwake {
        public general_id: number = 0; // 猎人ID
        public general_hp = new Array<number>(); // 生命值
        public general_atk = new Array<number>(); // 攻击
        public general_def = new Array<number>(); // 防御
        public atk_crit = new Array<number>(); // 暴击率
        public crit_extra = new Array<number>(); // 暴击伤害
        public dodge_rate = new Array<number>(); // 格挡率
        public hit_rate = new Array<number>(); // 忽视格挡
        public ignore_phyDef = new Array<number>(); // 忽视防御
        public rage_reduce = new Array<number>(); // 怒气减少
        public universal_resistance = new Array<number>(); // 异常状态抵抗
        public ignore_resistance = new Array<number>(); // 忽视异常抵抗
        public float_resistance = new Array<number>(); // 浮空抗性
        public cd_speed = new Array<number>(); // 速度
        public support_consume = new Array<number>(); // 援护怒气
        public general_atk_all = new Array<number>(); // 攻击（废弃）
        public general_def_all = new Array<number>(); // 防御(废弃）
        public all_crit = new Array<number>(); // 暴击(废弃)
        public ignore_def_all = new Array<number>(); // 忽视防御(废弃)
        public skill_atk = new Array<number>(); // 效果命中
        public skill_def = new Array<number>(); // 效果抵抗
        public skill_crit = new Array<number>(); // 技能暴击(废弃）
        public crit_resistance = new Array<number>(); // 暴击抵抗
        public final_extra = new Array<number>(); // 终极附加(废弃)
        public final_reduce = new Array<number>(); // 终极减免(废弃)
        public ignore_magicDef = new Array<number>(); // 忽视魔防（废弃）

        private static table: { [key: string]: TableHunterAwake } = null;

        public static Table(): { [key: string]: TableHunterAwake } {
            if (TableHunterAwake.table == null) {
                TableHunterAwake.table = <{ [key: string]: TableHunterAwake }>Game.ConfigManager.getTable("table_hunter_awake.json");
                if (TableHunterAwake.table == null) TableHunterAwake.table = {};
            }
            return TableHunterAwake.table;
        }

        public static Item(key: number | string): TableHunterAwake {
            if (key == undefined || key == null) return null;
            let item = TableHunterAwake.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableHunterAwake'] = TableHunterAwake;


    // table_instance.csv
    // 副本
    export class TableInstance {
        public instance_id: number = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
        public instance_name: string = ""; // 副本名称
        public instance_pack = new Array<number>(); // 副本包含关卡
        public challenge_win: number = 0; // 挑战胜利消耗
        public challenge_start: number = 0; // 挑战开始消耗
        public challenge_level: number = 0; // 挑战等级
        public challenge_num: number = 0; // 日挑战最大次数(0表示不限次数)
        public open_licence: number = 0; // 开启执照等级
        public open_elite: string = ""; // 开启精英
        public battle_value: number = 0; // 推荐战力
        public better_power: number = 0; // 推荐等级
        public first_reward = new Array<Array<number>>(); // 首杀奖励
        public challenge_goods = new Array<number>(); // 掉落物品
        public rand_exp: string = ""; // 获得随机经验
        public rand_items = new Array<number>(); // 掉落组
        public rand_result = new Array<number>(); // 掉落概率以及掉落数量
        public drop_money: number = 0; // 副本掉落铜钱
        public first_drop: number = 0; // 首次必然掉落
        public check_new: number = 0; // 检测各种新手相关(1表示打赢后直接为3星)
        public battle_bg: number = 0; // 副本战斗背景id
        public dialog_role: number = 0; // 对话怪id
        public boss_information: number = 0; // Boss信息
        public feature = new Array<number>(); // 怪物特性
        public boss_roleId: number = 0; // Boss形象id（映射map_role表）
        public instance_pic1: string = ""; // 副本关卡插图（标题）
        public instance_pic2: string = ""; // 副本关卡插图（内容）
        public instance_des: string = ""; // 副本说明
        public talent_type: number = 0; // 天赋参数

        private static table: { [key: string]: TableInstance } = null;

        public static Table(): { [key: string]: TableInstance } {
            if (TableInstance.table == null) {
                TableInstance.table = <{ [key: string]: TableInstance }>Game.ConfigManager.getTable("table_instance.json");
                if (TableInstance.table == null) TableInstance.table = {};
            }
            return TableInstance.table;
        }

        public static Item(key: number | string): TableInstance {
            if (key == undefined || key == null) return null;
            let item = TableInstance.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstance'] = TableInstance;


    // table_instance_area.csv
    // 副本区域区域
    export class TableInstanceArea {
        public area_id: number = 0; // 区域id
        public area_name: string = ""; // 区域名称
        public area_normal = new Array<number>(); // 区域包含普通副本章节
        public area_elite = new Array<number>(); // 区域包含精英副本章节
        public area_search = new Array<number>(); // 区域包含探索副本章节
        public area_name_pic_big: string = ""; // 区域名称图片
        public area_name_pic: string = ""; // 区域名称图片
        public des: string = ""; // 区域介绍
        public elite_drop_des: string = ""; // 精英副本掉落说明
        public card_type: number = 0; // 卡片掉落类型
        public open_level: number = 0; // 

        private static table: { [key: string]: TableInstanceArea } = null;

        public static Table(): { [key: string]: TableInstanceArea } {
            if (TableInstanceArea.table == null) {
                TableInstanceArea.table = <{ [key: string]: TableInstanceArea }>Game.ConfigManager.getTable("table_instance_area.json");
                if (TableInstanceArea.table == null) TableInstanceArea.table = {};
            }
            return TableInstanceArea.table;
        }

        public static Item(key: number | string): TableInstanceArea {
            if (key == undefined || key == null) return null;
            let item = TableInstanceArea.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceArea'] = TableInstanceArea;


    // table_instance_chest.csv
    // 副本宝箱
    export class TableInstanceChest {
        public instance_id: number = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
        public goods_ids = new Array<number>(); // 物品id
        public goods_counts = new Array<number>(); // 物品数量
        public show_type = new Array<number>(); // 显示类型

        private static table: { [key: string]: TableInstanceChest } = null;

        public static Table(): { [key: string]: TableInstanceChest } {
            if (TableInstanceChest.table == null) {
                TableInstanceChest.table = <{ [key: string]: TableInstanceChest }>Game.ConfigManager.getTable("table_instance_chest.json");
                if (TableInstanceChest.table == null) TableInstanceChest.table = {};
            }
            return TableInstanceChest.table;
        }

        public static Item(key: number | string): TableInstanceChest {
            if (key == undefined || key == null) return null;
            let item = TableInstanceChest.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceChest'] = TableInstanceChest;


    // table_instance_group.csv
    // 组队战
    export class TableInstanceGroup {
        public id: number = 0; // 层数
        public instance_name: string = ""; // 关卡名称
        public type: number = 0; // 副本类型
        public monster_stages = new Array<number>(); // 怪物
        public first_reward = new Array<Array<number>>(); // 首杀奖励
        public static_reward_best = new Array<Array<number>>(); // 三队固定物品奖励
        public rand_reward_best = new Array<number>(); // 三队随机物品奖励
        public static_reward_bad = new Array<Array<number>>(); // 两队固定物品奖励
        public rand_reward_bad = new Array<number>(); // 两队随机物品奖励
        public friend_reward = new Array<Array<number>>(); // 好友奖励
        public des: string = ""; // 描述
        public client_reward_id = new Array<number>(); // 奖励物品id客户端
        public client_reward_count = new Array<number>(); // 奖励物品客户端
        public client_reward_show = new Array<number>(); // 奖励物品客户端
        public reward_good_id2 = new Array<number>(); // 奖励物品id(两队胜)
        public reward_good_count2 = new Array<number>(); // 奖励物品数量
        public reward_good_id3 = new Array<number>(); // 奖励物品id(三队胜)
        public reward_good_count3 = new Array<number>(); // 奖励物品数量
        public feature = new Array<Array<number>>(); // 怪物特性
        public boss_roleId = new Array<Array<number>>(); // 怪物阵型
        public boss_name: string = ""; // 怪物名
        public boss_name1 = new Array<string>(); // 怪物名
        public monster_level: string = ""; // 怪物等级
        public pic_path: string = ""; // 背景图

        private static table: { [key: string]: TableInstanceGroup } = null;

        public static Table(): { [key: string]: TableInstanceGroup } {
            if (TableInstanceGroup.table == null) {
                TableInstanceGroup.table = <{ [key: string]: TableInstanceGroup }>Game.ConfigManager.getTable("table_instance_group.json");
                if (TableInstanceGroup.table == null) TableInstanceGroup.table = {};
            }
            return TableInstanceGroup.table;
        }

        public static Item(key: number | string): TableInstanceGroup {
            if (key == undefined || key == null) return null;
            let item = TableInstanceGroup.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceGroup'] = TableInstanceGroup;


    // table_instance_relic.csv
    export class TableInstanceRelic {
        public id: number = 0; // id
        public name: string = ""; // 名称
        public max_step: number = 0; // 最大阶段
        public monster_stage = new Array<number>(); // 关卡
        public week_time = new Array<number>(); // 鞭尸时间(秒)
        public battle_level: number = 0; // 挑战等级
        public open_day = new Array<number>(); // 开启时间
        public first_rewards = new Array<Array<number>>(); // 首杀奖励
        public open_chest = new Array<number>(); // 可开宝箱
        public reward_goods = new Array<Array<number>>(); // 必掉物品
        public reward_count = new Array<Array<number>>(); // 必掉数量
        public damage_zone = new Array<number>(); // 伤害区间
        public damage_daily_goods = new Array<Array<number>>(); // 伤害日常奖励物品
        public damage_daily_count = new Array<Array<number>>(); // 伤害日常奖励数量
        public mapBg: number = 0; // 地图map
        public feature = new Array<Array<number>>(); // 怪物特性
        public boss_head_client: string = ""; // 怪物头像（客户端）
        public boss_des: number = 0; // 怪物描述
        public award_des: number = 0; // 产出描述
        public relic_pic: string = ""; // 关卡名图片
        public relic_goods_client = new Array<number>(); // 客户端显示掉落
        public boss_head_license: string = ""; // 怪物头像（攻略用）
        public relic_pic_license: string = ""; // 关卡名图片（攻略用）

        private static table: { [key: string]: TableInstanceRelic } = null;

        public static Table(): { [key: string]: TableInstanceRelic } {
            if (TableInstanceRelic.table == null) {
                TableInstanceRelic.table = <{ [key: string]: TableInstanceRelic }>Game.ConfigManager.getTable("table_instance_relic.json");
                if (TableInstanceRelic.table == null) TableInstanceRelic.table = {};
            }
            return TableInstanceRelic.table;
        }

        public static Item(key: number | string): TableInstanceRelic {
            if (key == undefined || key == null) return null;
            let item = TableInstanceRelic.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceRelic'] = TableInstanceRelic;


    // table_instance_relic_chest.csv
    export class TableInstanceRelicChest {
        public chest_id: number = 0; // id
        public open_time: number = 0; // 开启次数
        public price = new Array<number>(); // 价格
        public rand_item = new Array<number>(); // 随机
        public client_good = new Array<number>(); // 客户端掉落物品客户端掉落数量
        public path = new Array<string>(); // 宝箱图片

        private static table: { [key: string]: TableInstanceRelicChest } = null;

        public static Table(): { [key: string]: TableInstanceRelicChest } {
            if (TableInstanceRelicChest.table == null) {
                TableInstanceRelicChest.table = <{ [key: string]: TableInstanceRelicChest }>Game.ConfigManager.getTable("table_instance_relic_chest.json");
                if (TableInstanceRelicChest.table == null) TableInstanceRelicChest.table = {};
            }
            return TableInstanceRelicChest.table;
        }

        public static Item(key: number | string): TableInstanceRelicChest {
            if (key == undefined || key == null) return null;
            let item = TableInstanceRelicChest.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceRelicChest'] = TableInstanceRelicChest;


    // table_instance_search.csv
    // 精英副本章节
    export class TableInstanceSearch {
        public index: number = 0; // 索引
        public name: string = ""; // 描述
        public quailty: number = 0; // 品质
        public power: number = 0; // 权重
        public rand_des = new Array<number>(); // 描述
        public rand_item = new Array<number>(); // 奖励
        public condition = new Array<number>(); // 条件数量
        public condition_power = new Array<number>(); // 条件数量权重
        public condition_enum = new Array<number>(); // 条件枚举
        public condition_enum_power = new Array<number>(); // 条件枚举权重
        public step = new Array<number>(); // 品阶
        public step_power = new Array<number>(); // 品阶权重
        public level = new Array<number>(); // 等级
        public level_power = new Array<number>(); // 等级权重
        public star = new Array<number>(); // 星级
        public star_power = new Array<number>(); // 星级权重
        public aptitude = new Array<number>(); // 资质(11|12|13|14)
        public aptitude_power = new Array<number>(); // 品质权重
        public type = new Array<number>(); // 派系
        public type_power = new Array<number>(); // 派系权重
        public time: number = 0; // 时长

        private static table: { [key: string]: TableInstanceSearch } = null;

        public static Table(): { [key: string]: TableInstanceSearch } {
            if (TableInstanceSearch.table == null) {
                TableInstanceSearch.table = <{ [key: string]: TableInstanceSearch }>Game.ConfigManager.getTable("table_instance_search.json");
                if (TableInstanceSearch.table == null) TableInstanceSearch.table = {};
            }
            return TableInstanceSearch.table;
        }

        public static Item(key: number | string): TableInstanceSearch {
            if (key == undefined || key == null) return null;
            let item = TableInstanceSearch.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceSearch'] = TableInstanceSearch;


    // table_instance_village.csv
    // 铜钱经验副本
    export class TableInstanceVillage {
        public instance_id: number = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
        public instance_name: string = ""; // 副本名称
        public instance_pack = new Array<number>(); // 副本包含关卡
        public recommond_value: number = 0; // 推荐战斗力
        public goodses = new Array<Array<number>>(); // 掉落物品
        public total_damage = new Array<number>(); // 总伤害
        public max_combo = new Array<Array<number>>(); // 最大连击
        public add_max: number = 0; // 加成最大值
        public auto_fight: number = 0; // 是否强制自动战斗
        public battle_bg: number = 0; // 副本战斗背景id
        public boss_roleId: number = 0; // Boss形象id（映射map_role表）
        public instance_des: string = ""; // 副本说明

        private static table: { [key: string]: TableInstanceVillage } = null;

        public static Table(): { [key: string]: TableInstanceVillage } {
            if (TableInstanceVillage.table == null) {
                TableInstanceVillage.table = <{ [key: string]: TableInstanceVillage }>Game.ConfigManager.getTable("table_instance_village.json");
                if (TableInstanceVillage.table == null) TableInstanceVillage.table = {};
            }
            return TableInstanceVillage.table;
        }

        public static Item(key: number | string): TableInstanceVillage {
            if (key == undefined || key == null) return null;
            let item = TableInstanceVillage.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableInstanceVillage'] = TableInstanceVillage;


    // table_integral_egg.csv
    // 扭蛋机
    export class TableIntegralEgg {
        public id: number = 0; // 主题id
        public name: string = ""; // 主题名称
        public rand_item = new Array<number>(); // 随机物品
        public rand_power = new Array<number>(); // 随机权重
        public exchange_goods = new Array<Array<number>>(); // 兑换物品
        public exchange_integral = new Array<number>(); // 兑换积分
        public exchange_count = new Array<number>(); // 兑换次数
        public consume_token: number = 0; // 单抽消耗钻石
        public consume_token_ten: number = 0; // 十次抽消耗钻石
        public gift_content = new Array<Array<number>>(); // 礼包内容
        public gift_consume: number = 0; // 礼包消耗
        public first_rand: number = 0; // 首次单抽给
        public ten_rand: number = 0; // 十连抽必给
        public get_integral: number = 0; // 单抽获取积分
        public subject_duration: number = 0; // 主题时长
        public background: string = ""; // 背景
        public client_goods = new Array<Array<number>>(); // 客户端显示物品
        public path: string = ""; // 礼包配图

        private static table: { [key: string]: TableIntegralEgg } = null;

        public static Table(): { [key: string]: TableIntegralEgg } {
            if (TableIntegralEgg.table == null) {
                TableIntegralEgg.table = <{ [key: string]: TableIntegralEgg }>Game.ConfigManager.getTable("table_integral_egg.json");
                if (TableIntegralEgg.table == null) TableIntegralEgg.table = {};
            }
            return TableIntegralEgg.table;
        }

        public static Item(key: number | string): TableIntegralEgg {
            if (key == undefined || key == null) return null;
            let item = TableIntegralEgg.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableIntegralEgg'] = TableIntegralEgg;


    // table_item_base.csv
    // 总表
    export class TableItemBase {
        public type: number = 0; // 类型
        public name: string = ""; // 中文名
        public is_overlap: number = 0; // 是否可叠加
        public is_sell: number = 0; // 是否可出售
        public min_id: number = 0; // 最小ID
        public max_id: number = 0; // 最大ID
        public table_name: string = ""; // 对应表名
        public client_min_id = new Array<number>(); // 区别物品类型最小id（区分非name列名字）
        public client_max_id = new Array<number>(); // 区别物品类型最大id
        public client_name = new Array<string>(); // 区别物品类型名

        private static table: { [key: string]: TableItemBase } = null;

        public static Table(): { [key: string]: TableItemBase } {
            if (TableItemBase.table == null) {
                TableItemBase.table = <{ [key: string]: TableItemBase }>Game.ConfigManager.getTable("table_item_base.json");
                if (TableItemBase.table == null) TableItemBase.table = {};
            }
            return TableItemBase.table;
        }

        public static Item(key: number | string): TableItemBase {
            if (key == undefined || key == null) return null;
            let item = TableItemBase.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemBase'] = TableItemBase;


    // table_item_cimelia.csv
    // 物品宝箱
    export class TableItemCimelia {
        public id: number = 0; // 唯一标识(131开头是仙境果子)
        public name: string = ""; // 名称
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public is_lost: number = 0; // 是否会被爆
        public rand_items = new Array<number>(); // 随机分组
        public rand_power = new Array<number>(); // 随机权重
        public is_first: number = 0; // 首次必出(卡片ID)
        public is_will: number = 0; // 必出一个
        public rand_count: number = 0; // 随机最大数量
        public is_bag_rule: number = 0; // 是否遵循卡包规则
        public des: string = ""; // 基本描述
        public extrac: string = ""; // 附加描述
        public path: string = ""; // 图标路径
        public path_big: string = ""; // 大图标
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(参考table_item_prop.csv)
        public fruit_id: string = ""; // 果实id

        private static table: { [key: string]: TableItemCimelia } = null;

        public static Table(): { [key: string]: TableItemCimelia } {
            if (TableItemCimelia.table == null) {
                TableItemCimelia.table = <{ [key: string]: TableItemCimelia }>Game.ConfigManager.getTable("table_item_cimelia.json");
                if (TableItemCimelia.table == null) TableItemCimelia.table = {};
            }
            return TableItemCimelia.table;
        }

        public static Item(key: number | string): TableItemCimelia {
            if (key == undefined || key == null) return null;
            let item = TableItemCimelia.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemCimelia'] = TableItemCimelia;


    // table_item_client.csv
    // 客户端显示用物品
    export class TableItemClient {
        public id: number = 0; // 资源编号
        public name: string = ""; // 资源名字
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public path: string = ""; // 大图标
        public icon: string = ""; // 小图标
        public frame: string = ""; // 边框
        public frame_mask: string = ""; // 边框遮罩
        public client_star: number = 0; // 星级
        public small_icon: string = ""; // 小图标
        public des: string = ""; // 描述
        public from = new Array<number>(); // 获取途径
        public is_card: string = ""; // 是否属于卡片类物品
        public is_piece: number = 0; // 是否是碎片

        private static table: { [key: string]: TableItemClient } = null;

        public static Table(): { [key: string]: TableItemClient } {
            if (TableItemClient.table == null) {
                TableItemClient.table = <{ [key: string]: TableItemClient }>Game.ConfigManager.getTable("table_item_client.json");
                if (TableItemClient.table == null) TableItemClient.table = {};
            }
            return TableItemClient.table;
        }

        public static Item(key: number | string): TableItemClient {
            if (key == undefined || key == null) return null;
            let item = TableItemClient.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemClient'] = TableItemClient;


    // table_item_collect.csv
    // 收集
    export class TableItemCollect {
        public id: number = 0; // 材料id
        public name: string = ""; // 名字
        public quality: number = 0; // 品质
        public price: number = 0; // 出售价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 到期时间
        public path: string = ""; // 路径
        public des: string = ""; // 描述
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(参考table_item_prop.csv)

        private static table: { [key: string]: TableItemCollect } = null;

        public static Table(): { [key: string]: TableItemCollect } {
            if (TableItemCollect.table == null) {
                TableItemCollect.table = <{ [key: string]: TableItemCollect }>Game.ConfigManager.getTable("table_item_collect.json");
                if (TableItemCollect.table == null) TableItemCollect.table = {};
            }
            return TableItemCollect.table;
        }

        public static Item(key: number | string): TableItemCollect {
            if (key == undefined || key == null) return null;
            let item = TableItemCollect.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemCollect'] = TableItemCollect;


    // table_item_equip_carve.csv
    // 物品装备刻印材料
    export class TableItemEquipCarve {
        public id: number = 0; // 材料id
        public name: number = 0; // 名字
        public quality: number = 0; // 品质
        public price: number = 0; // 出售价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: number = 0; // 道具到期时间
        public compose_id: number = 0; // 合成后刻印石
        public compose_count: number = 0; // 合成所需数量
        public client_transfer = new Array<number>(); // 客户端用的转换信息
        public compose_cost: number = 0; // 合成花费
        public path: number = 0; // 路径
        public des: number = 0; // 描述
        public from = new Array<number>(); // 获取途径
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(参考table_item_prop.csv)

        private static table: { [key: string]: TableItemEquipCarve } = null;

        public static Table(): { [key: string]: TableItemEquipCarve } {
            if (TableItemEquipCarve.table == null) {
                TableItemEquipCarve.table = <{ [key: string]: TableItemEquipCarve }>Game.ConfigManager.getTable("table_item_equip_carve.json");
                if (TableItemEquipCarve.table == null) TableItemEquipCarve.table = {};
            }
            return TableItemEquipCarve.table;
        }

        public static Item(key: number | string): TableItemEquipCarve {
            if (key == undefined || key == null) return null;
            let item = TableItemEquipCarve.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemEquipCarve'] = TableItemEquipCarve;


    // table_item_equip_forge.csv
    // 物品装备锻造材料
    export class TableItemEquipForge {
        public id: number = 0; // 材料id
        public name: number = 0; // 名字
        public quality: number = 0; // 品质
        public price: number = 0; // 出售价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: number = 0; // 道具到期时间
        public path: number = 0; // 路径
        public des: number = 0; // 描述
        public from = new Array<number>(); // 获取处
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(参考table_item_prop.csv)

        private static table: { [key: string]: TableItemEquipForge } = null;

        public static Table(): { [key: string]: TableItemEquipForge } {
            if (TableItemEquipForge.table == null) {
                TableItemEquipForge.table = <{ [key: string]: TableItemEquipForge }>Game.ConfigManager.getTable("table_item_equip_forge.json");
                if (TableItemEquipForge.table == null) TableItemEquipForge.table = {};
            }
            return TableItemEquipForge.table;
        }

        public static Item(key: number | string): TableItemEquipForge {
            if (key == undefined || key == null) return null;
            let item = TableItemEquipForge.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemEquipForge'] = TableItemEquipForge;


    // table_item_fashion.csv
    // ʱװ
    export class TableItemFashion {
        public id: number = 0; // 唯一标识
        public name: string = ""; // 名称
        public quality: number = 0; // 品质
        public fashion_roleId: number = 0; // 映射mapRoleId
        public buy_type: number = 0; // 获取类型（0游戏内获取，1道具购买）
        public buy_price: number = 0; // 购买花费
        public price: number = 0; // 卖出价格
        public appearance_count: number = 0; // 分解数量
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public fashion_ratio: number = 0; // 权重比
        public match_general: number = 0; // 匹配武将
        public pic_id: number = 0; // 获得头像
        public des: string = ""; // 基本描述
        public extrac: string = ""; // 附加描述
        public path: string = ""; // 图标路径
        public shadow: string = ""; // 阴影图片
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴伤伤害
        public dodge_rate: number = 0; // 格挡
        public hit_rate: number = 0; // 忽视格挡
        public ignore_phyDef: number = 0; // 忽视防御
        public rage_reduce: number = 0; // 怒气减少
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public float_resistance: number = 0; // 浮空抗性
        public cd_speed: number = 0; // 速度
        public support_consume: number = 0; // 援护怒气
        public general_atk_all: number = 0; // 攻击(废弃）
        public general_def_all: number = 0; // 防御(废弃）
        public all_crit: number = 0; // 暴击（废弃）
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public skill_crit: number = 0; // 技能暴击(废弃）
        public crit_resistance: number = 0; // 暴击抵抗
        public final_extra: number = 0; // 终极附加(废弃)
        public final_reduce: number = 0; // 终极减免(废弃)
        public ignore_magicDef: number = 0; // 忽视魔防（废弃）
        public from = new Array<number>(); // 产出

        private static table: { [key: string]: TableItemFashion } = null;

        public static Table(): { [key: string]: TableItemFashion } {
            if (TableItemFashion.table == null) {
                TableItemFashion.table = <{ [key: string]: TableItemFashion }>Game.ConfigManager.getTable("table_item_fashion.json");
                if (TableItemFashion.table == null) TableItemFashion.table = {};
            }
            return TableItemFashion.table;
        }

        public static Item(key: number | string): TableItemFashion {
            if (key == undefined || key == null) return null;
            let item = TableItemFashion.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemFashion'] = TableItemFashion;


    // table_item_general.csv
    // 物品武将
    export class TableItemGeneral {
        public id: number = 0; // 唯一标识
        public name: string = ""; // 名称
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public match_general: number = 0; // 匹配武将
        public general_soul: number = 0; // 武将信物转化
        public des: string = ""; // 基本描述
        public extrac: number = 0; // 附加描述
        public path: string = ""; // 图标路径
        public from = new Array<number>(); // 获取途径

        private static table: { [key: string]: TableItemGeneral } = null;

        public static Table(): { [key: string]: TableItemGeneral } {
            if (TableItemGeneral.table == null) {
                TableItemGeneral.table = <{ [key: string]: TableItemGeneral }>Game.ConfigManager.getTable("table_item_general.json");
                if (TableItemGeneral.table == null) TableItemGeneral.table = {};
            }
            return TableItemGeneral.table;
        }

        public static Item(key: number | string): TableItemGeneral {
            if (key == undefined || key == null) return null;
            let item = TableItemGeneral.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemGeneral'] = TableItemGeneral;


    // table_item_general_soul.csv
    // 物品武将魂
    export class TableItemGeneralSoul {
        public id: number = 0; // 武将魂Id
        public name: string = ""; // 武将魂名称
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public path: string = ""; // 路径
        public des: string = ""; // 描述
        public from: string = ""; // 获取途径
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(参考table_item_prop.csv)

        private static table: { [key: string]: TableItemGeneralSoul } = null;

        public static Table(): { [key: string]: TableItemGeneralSoul } {
            if (TableItemGeneralSoul.table == null) {
                TableItemGeneralSoul.table = <{ [key: string]: TableItemGeneralSoul }>Game.ConfigManager.getTable("table_item_general_soul.json");
                if (TableItemGeneralSoul.table == null) TableItemGeneralSoul.table = {};
            }
            return TableItemGeneralSoul.table;
        }

        public static Item(key: number | string): TableItemGeneralSoul {
            if (key == undefined || key == null) return null;
            let item = TableItemGeneralSoul.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemGeneralSoul'] = TableItemGeneralSoul;


    // table_item_jade.csv
    // 宝石
    export class TableItemJade {
        public id: number = 0; // 道具编号
        public name: string = ""; // 道具名字
        public quality: number = 0; // 道具品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public priority: number = 0; // 优先级
        public compose_id: string = ""; // 合成的玉石
        public compose_count: number = 0; // 合成所需数量
        public update_cost: number = 0; // 合成花费铜钱
        public jade_type: number = 0; // 宝石类型
        public jade_level: number = 0; // 宝石等级
        public refresh_consume: number = 0; // 磨洗消耗
        public refresh_power: number = 0; // 磨洗权值
        public refresh_up_rand: number = 0; // 磨洗升级概率
        public show_type: number = 0; // 显示类型
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴伤伤害
        public dodge_rate: number = 0; // 格挡
        public hit_rate: number = 0; // 忽视格挡
        public ignore_phyDef: number = 0; // 忽视防御
        public rage_reduce: number = 0; // 怒气减少
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public float_resistance: number = 0; // 浮空抗性
        public cd_speed: number = 0; // 速度
        public support_consume: number = 0; // 援护怒气
        public general_atk_all: number = 0; // 攻击(废弃）
        public general_def_all: number = 0; // 防御(废弃）
        public all_crit: number = 0; // 暴击（废弃）
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_atk: number = 0; // 法术攻击（废弃）
        public skill_def: number = 0; // 法术防御(废弃）
        public skill_crit: number = 0; // 技能暴击(废弃）
        public crit_resistance: number = 0; // 暴击抵抗（废弃）
        public final_extra: number = 0; // 终极附加(废弃)
        public final_reduce: number = 0; // 终极减免(废弃)
        public ignore_magicDef: number = 0; // 忽视魔防（废弃）
        public extra: string = ""; // 附加描述
        public des: string = ""; // 附加描述
        public little_path: string = ""; // 图标路径
        public path: string = ""; // 图标路径

        private static table: { [key: string]: TableItemJade } = null;

        public static Table(): { [key: string]: TableItemJade } {
            if (TableItemJade.table == null) {
                TableItemJade.table = <{ [key: string]: TableItemJade }>Game.ConfigManager.getTable("table_item_jade.json");
                if (TableItemJade.table == null) TableItemJade.table = {};
            }
            return TableItemJade.table;
        }

        public static Item(key: number | string): TableItemJade {
            if (key == undefined || key == null) return null;
            let item = TableItemJade.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemJade'] = TableItemJade;


    // table_item_partner.csv
    // 物品羁绊卡
    export class TableItemPartner {
        public id: number = 0; // 类型
        public no_use: number = 0; // 辅助
        public name: string = ""; // 中文名
        public fullName: string = ""; // 全称
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public compose: number = 0; // 合成所需
        public level: number = 0; // 品级
        public count: number = 0; // 合成数量
        public consume: number = 0; // 消耗铜钱
        public transfer_good = new Array<number>(); // 转化所需物品（0表示不能转化）
        public transfer_count = new Array<number>(); // 转化所需数量
        public path: string = ""; // 图标
        public from = new Array<number>(); // 获取途径
        public des: string = ""; // 物品描述
        public use_tips: number = 0; // 使用跳转界面(空-不显示，100-转化)

        private static table: { [key: string]: TableItemPartner } = null;

        public static Table(): { [key: string]: TableItemPartner } {
            if (TableItemPartner.table == null) {
                TableItemPartner.table = <{ [key: string]: TableItemPartner }>Game.ConfigManager.getTable("table_item_partner.json");
                if (TableItemPartner.table == null) TableItemPartner.table = {};
            }
            return TableItemPartner.table;
        }

        public static Item(key: number | string): TableItemPartner {
            if (key == undefined || key == null) return null;
            let item = TableItemPartner.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemPartner'] = TableItemPartner;


    // table_item_partner_split.csv
    // 物品羁绊卡碎片
    export class TableItemPartnerSplit {
        public id: number = 0; // 类型
        public name: string = ""; // 中文名
        public fullName: string = ""; // 全称
        public level: number = 0; // 等级
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public path: string = ""; // 图标
        public des: string = ""; // 物品描述

        private static table: { [key: string]: TableItemPartnerSplit } = null;

        public static Table(): { [key: string]: TableItemPartnerSplit } {
            if (TableItemPartnerSplit.table == null) {
                TableItemPartnerSplit.table = <{ [key: string]: TableItemPartnerSplit }>Game.ConfigManager.getTable("table_item_partner_split.json");
                if (TableItemPartnerSplit.table == null) TableItemPartnerSplit.table = {};
            }
            return TableItemPartnerSplit.table;
        }

        public static Item(key: number | string): TableItemPartnerSplit {
            if (key == undefined || key == null) return null;
            let item = TableItemPartnerSplit.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemPartnerSplit'] = TableItemPartnerSplit;


    // table_item_pet_hat.csv
    export class TableItemPetHat {
        public id: number = 0; // 道具编号
        public name: string = ""; // 道具名字
        public quality: number = 0; // 道具品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: number = 0; // 道具到期时间
        public pet_id: number = 0; // 宠物id
        public path: string = ""; // 图标路径
        public extra: string = ""; // 附加描述
        public des: string = ""; // 备注

        private static table: { [key: string]: TableItemPetHat } = null;

        public static Table(): { [key: string]: TableItemPetHat } {
            if (TableItemPetHat.table == null) {
                TableItemPetHat.table = <{ [key: string]: TableItemPetHat }>Game.ConfigManager.getTable("table_item_pet_hat.json");
                if (TableItemPetHat.table == null) TableItemPetHat.table = {};
            }
            return TableItemPetHat.table;
        }

        public static Item(key: number | string): TableItemPetHat {
            if (key == undefined || key == null) return null;
            let item = TableItemPetHat.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemPetHat'] = TableItemPetHat;


    // table_item_pic.csv
    // 物品头像
    export class TableItemPic {
        public id: number = 0; // 道具编号
        public name: string = ""; // 道具名字
        public quality: number = 0; // 道具品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public match_general: number = 0; // 映射武将
        public mapRole_id: number = 0; // 映射人物模型id
        public extra: string = ""; // 附加描述
        public path: string = ""; // 图标路径
        public half_path: string = ""; // 半身路径
        public des: string = ""; // 备注
        public type: number = 0; // 类型（-1不当做头像，1当做武将普通头像，2武将高级头像，3帮会普通头像）

        private static table: { [key: string]: TableItemPic } = null;

        public static Table(): { [key: string]: TableItemPic } {
            if (TableItemPic.table == null) {
                TableItemPic.table = <{ [key: string]: TableItemPic }>Game.ConfigManager.getTable("table_item_pic.json");
                if (TableItemPic.table == null) TableItemPic.table = {};
            }
            return TableItemPic.table;
        }

        public static Item(key: number | string): TableItemPic {
            if (key == undefined || key == null) return null;
            let item = TableItemPic.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemPic'] = TableItemPic;


    // table_item_pic_frame.csv
    // 物品头像框
    export class TableItemPicFrame {
        public id: number = 0; // 道具编号
        public order: number = 0; // 排序
        public name: string = ""; // 道具名字
        public quality: number = 0; // 道具品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: number = 0; // 道具到期时间
        public extra: string = ""; // 附加描述
        public path: string = ""; // 边框路径
        public path_frame: string = ""; // 图标路径
        public des: string = ""; // 备注
        public from = new Array<number>(); // 获取途径

        private static table: { [key: string]: TableItemPicFrame } = null;

        public static Table(): { [key: string]: TableItemPicFrame } {
            if (TableItemPicFrame.table == null) {
                TableItemPicFrame.table = <{ [key: string]: TableItemPicFrame }>Game.ConfigManager.getTable("table_item_pic_frame.json");
                if (TableItemPicFrame.table == null) TableItemPicFrame.table = {};
            }
            return TableItemPicFrame.table;
        }

        public static Item(key: number | string): TableItemPicFrame {
            if (key == undefined || key == null) return null;
            let item = TableItemPicFrame.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemPicFrame'] = TableItemPicFrame;


    // table_item_potato.csv
    // 宝物
    export class TableItemPotato {
        public id: number = 0; // 道具编号
        public name: string = ""; // 道具名字
        public num: string = ""; // 编号
        public rarity: number = 0; // 稀有度
        public rare_card: number = 0; // 是否为特殊卡片
        public quality: number = 0; // 道具品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public appraise_add = new Array<number>(); // 必出属性
        public type: number = 0; // 派系
        public star: number = 0; // 初始星级
        public level: number = 0; // 初始等级
        public up_money = new Array<number>(); // 进阶消耗金钱
        public compose_ids = new Array<number>(); // 合成消耗物品
        public compose_counts = new Array<number>(); // 合成物品数量
        public compose_money: string = ""; // 合成消耗金钱
        public up_goods = new Array<number>(); // 进阶消耗材料
        public add_count = new Array<number>(); // 附加属性数量
        public bag_count: string = ""; // 卡包附加属性数量
        public add_type: number = 0; // 属性数值类型（1数值|2百分比）
        public attri_type: number = 0; // 属性类型
        public attri_value: number = 0; // 属性数值
        public attri_star = new Array<number>(); // 星级加成
        public attri_level = new Array<number>(); // 等级加成
        public add_type2: number = 0; // 升品数值类型
        public attri_type2: number = 0; // 升品属性类型
        public attri_value2: number = 0; // 升品属性数值
        public client_transfer = new Array<number>(); // 客户端用的转换信息
        public extra: string = ""; // 附加描述
        public des: string = ""; // 附加描述
        public package_des: string = ""; // 礼包描述
        public paths: string = ""; // 小图标路径
        public path: string = ""; // 图标路径
        public from = new Array<number>(); // 获取途径
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(1-使用界面/2-武将界面/3-装备界面/4-神兵界面/5-军师界面/6-武将觉醒/7-神兵碎片转换/8-聊天/9-帮会/10-用户界面/11-收集跳转)

        private static table: { [key: string]: TableItemPotato } = null;

        public static Table(): { [key: string]: TableItemPotato } {
            if (TableItemPotato.table == null) {
                TableItemPotato.table = <{ [key: string]: TableItemPotato }>Game.ConfigManager.getTable("table_item_potato.json");
                if (TableItemPotato.table == null) TableItemPotato.table = {};
            }
            return TableItemPotato.table;
        }

        public static Item(key: number | string): TableItemPotato {
            if (key == undefined || key == null) return null;
            let item = TableItemPotato.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemPotato'] = TableItemPotato;


    // table_item_prop.csv
    // 物品道具
    export class TableItemProp {
        public id: number = 0; // 道具编号
        public name: string = ""; // 道具名字
        public quality: number = 0; // 道具品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public general_exp: string = ""; // 提供武将经验
        public money: string = ""; // 使用增加铜钱
        public power: string = ""; // 使用增加体力
        public talent_exp: string = ""; // 可提天赋升级经验
        public consume_money: string = ""; // 吞噬时需要多少金钱
        public skill_point_add: string = ""; // 使用增加技能点
        public friend_exp_add: string = ""; // 使用增加亲密度
        public transfer_info: string = ""; // 转化信息
        public potato_addattri: string = ""; // 鉴定附加属性条数
        public add_randpower: string = ""; // 使用提升成功概率
        public is_return: string = ""; // 是否返还消耗物品
        public compose_rarity: string = ""; // 合成稀有度
        public compose_quality: string = ""; // 合成品质
        public compose_name: string = ""; // 合成显示名字
        public compose_star: string = ""; // 合成星级
        public compose_purple: string = ""; // 是否紫星
        public compose_counts: string = ""; // 合成消耗
        public compose_path: string = ""; // 合成图片
        public compose_cards = new Array<number>(); // 合成卡片（0合成具体的卡，1随机卡）
        public is_bag_rule: string = ""; // 是否遵循卡包规则
        public client_transfer = new Array<number>(); // 客户端用的转换信息
        public extra: string = ""; // 附加描述
        public des: string = ""; // 附加描述
        public otherDes: string = ""; // 其他描述（可用于神秘卡片描述等）
        public path: string = ""; // 图标路径
        public from = new Array<number>(); // 获取途径
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(1-使用界面/2-武将界面/3-装备界面/4-神兵界面/5-军师界面/6-武将觉醒/7-神兵碎片转换/8-聊天/9-帮会/10-用户界面/11-收集跳转/12 -礼盒/13 -回收/14 -宝物/15 -形象/16 -念兽/17 -宠物)

        private static table: { [key: string]: TableItemProp } = null;

        public static Table(): { [key: string]: TableItemProp } {
            if (TableItemProp.table == null) {
                TableItemProp.table = <{ [key: string]: TableItemProp }>Game.ConfigManager.getTable("table_item_prop.json");
                if (TableItemProp.table == null) TableItemProp.table = {};
            }
            return TableItemProp.table;
        }

        public static Item(key: number | string): TableItemProp {
            if (key == undefined || key == null) return null;
            let item = TableItemProp.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemProp'] = TableItemProp;


    // table_item_resource.csv
    // 物品资源
    export class TableItemResource {
        public id: number = 0; // 资源编号
        public name: string = ""; // 资源名字
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public show_type = new Array<number>(); // 根据数量显示颜色额
        public path: string = ""; // 大图标
        public icon: string = ""; // 小图标
        public des: string = ""; // 描述
        public from = new Array<number>(); // 来源
        public tag: string = ""; // 标签

        private static table: { [key: string]: TableItemResource } = null;

        public static Table(): { [key: string]: TableItemResource } {
            if (TableItemResource.table == null) {
                TableItemResource.table = <{ [key: string]: TableItemResource }>Game.ConfigManager.getTable("table_item_resource.json");
                if (TableItemResource.table == null) TableItemResource.table = {};
            }
            return TableItemResource.table;
        }

        public static Item(key: number | string): TableItemResource {
            if (key == undefined || key == null) return null;
            let item = TableItemResource.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemResource'] = TableItemResource;


    // table_item_secret.csv
    // 物品秘宝
    export class TableItemSecret {
        public id: number = 0; // 唯一标识
        public name: string = ""; // 名称
        public quality: number = 0; // 品质
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public reward_goods = new Array<number>(); // 奖励内容
        public reward_count = new Array<number>(); // 奖励数量
        public des: string = ""; // 基本描述
        public extrac: string = ""; // 附加描述
        public path: string = ""; // 图标路径
        public red_tips: number = 0; // 是否显示红点
        public use_tips: number = 0; // 使用跳转界面(参考table_item_prop.csv)

        private static table: { [key: string]: TableItemSecret } = null;

        public static Table(): { [key: string]: TableItemSecret } {
            if (TableItemSecret.table == null) {
                TableItemSecret.table = <{ [key: string]: TableItemSecret }>Game.ConfigManager.getTable("table_item_secret.json");
                if (TableItemSecret.table == null) TableItemSecret.table = {};
            }
            return TableItemSecret.table;
        }

        public static Item(key: number | string): TableItemSecret {
            if (key == undefined || key == null) return null;
            let item = TableItemSecret.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemSecret'] = TableItemSecret;


    // table_item_title.csv
    // 物品称号
    export class TableItemTitle {
        public id: number = 0; // 道具编号
        public name: string = ""; // 称号名字
        public order: number = 0; // 排序
        public level: number = 0; // 优先级
        public check_type: string = ""; // 触发类型
        public check_value: string = ""; // 触发条件
        public check_mulvalues = new Array<number>(); // 触发条件
        public from: string = ""; // 产出
        public quality: number = 0; // 道具品质
        public grade: number = 0; // 是否显示在聊天界面
        public show_type: number = 0; // 显示类别
        public price: number = 0; // 卖出价格
        public drop_count: number = 0; // 随机数量
        public drop_time: number = 0; // 随机次数
        public overdue_time: string = ""; // 道具到期时间
        public league_animal_grow: number = 0; // 提供联盟异兽成长值
        public effect: string = ""; // 称号描述
        public skill_normal: number = 0; // 正常战斗被动
        public general_hp: number = 0; // 生命值
        public general_atk: number = 0; // 攻击
        public general_def: number = 0; // 防御
        public atk_crit: number = 0; // 暴击
        public crit_extra: number = 0; // 暴击伤害
        public ignore_phyDef: number = 0; // 忽视防御
        public cd_speed: number = 0; // 速度
        public dodge_rate: number = 0; // 格挡率
        public hit_rate: number = 0; // 忽视格挡
        public skill_atk: number = 0; // 效果命中
        public skill_def: number = 0; // 效果抵抗
        public universal_resistance: number = 0; // 异常状态抵抗
        public ignore_resistance: number = 0; // 忽视异常抵抗
        public float_resistance: number = 0; // 浮空抗性
        public rage_reduce: number = 0; // 怒气减少
        public support_consume: number = 0; // 作为援护出场所需怒气值
        public general_atk_all: number = 0; // 攻击
        public general_def_all: number = 0; // 防御
        public all_crit: number = 0; // 暴击
        public ignore_def_all: number = 0; // 忽视防御（废弃）
        public skill_crit: number = 0; // 技能暴击
        public crit_resistance: number = 0; // 暴击抵抗
        public final_extra: number = 0; // 终极附加
        public final_reduce: number = 0; // 终极减免
        public ignore_magicDef: number = 0; // 忽视魔防
        public logo: string = ""; // 图片路径(场景大图片)
        public path: string = ""; // 图标路径（小图标）
        public path_chat: string = ""; // 图片路径（聊天）
        public des: string = ""; // 备注

        private static table: { [key: string]: TableItemTitle } = null;

        public static Table(): { [key: string]: TableItemTitle } {
            if (TableItemTitle.table == null) {
                TableItemTitle.table = <{ [key: string]: TableItemTitle }>Game.ConfigManager.getTable("table_item_title.json");
                if (TableItemTitle.table == null) TableItemTitle.table = {};
            }
            return TableItemTitle.table;
        }

        public static Item(key: number | string): TableItemTitle {
            if (key == undefined || key == null) return null;
            let item = TableItemTitle.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemTitle'] = TableItemTitle;


    // table_item_transfer.csv
    // 礼盒
    export class TableItemTransfer {
        public id: number = 0; // 编号
        public name: string = ""; // 名称
        public quality: number = 0; // 品质
        public price: number = 0; // 价格
        public drop_time: number = 0; // 随机次数
        public drop_count: number = 0; // 随机数量
        public overdue_time: string = ""; // 道具到期时间
        public items_id = new Array<number>(); // 物品编号
        public items_count = new Array<number>(); // 物品数量
        public is_bag_rule: number = 0; // 是否遵循卡包规则
        public add_general: number = 0; // 增加的猎人数量
        public des: string = ""; // 基本描述
        public extrac: string = ""; // 附加描述(包含)
        public use_tips: number = 0; // 跳转界面
        public red_tips: number = 0; // 红点
        public path: string = ""; // 图标路径
        public show_type: number = 0; // 显示类型

        private static table: { [key: string]: TableItemTransfer } = null;

        public static Table(): { [key: string]: TableItemTransfer } {
            if (TableItemTransfer.table == null) {
                TableItemTransfer.table = <{ [key: string]: TableItemTransfer }>Game.ConfigManager.getTable("table_item_transfer.json");
                if (TableItemTransfer.table == null) TableItemTransfer.table = {};
            }
            return TableItemTransfer.table;
        }

        public static Item(key: number | string): TableItemTransfer {
            if (key == undefined || key == null) return null;
            let item = TableItemTransfer.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableItemTransfer'] = TableItemTransfer;


    // table_jade_hole.csv
    // 宝石
    export class TableJadeHole {
        public index: number = 0; // 宝石槽
        public jade_pos: string = ""; // 位置
        public hole_type: number = 0; // 孔类型
        public open_level: number = 0; // 装备等级
        public jade_type = new Array<number>(); // 装备宝石类型
        public jade_tip: string = ""; // 说明文字

        private static table: { [key: string]: TableJadeHole } = null;

        public static Table(): { [key: string]: TableJadeHole } {
            if (TableJadeHole.table == null) {
                TableJadeHole.table = <{ [key: string]: TableJadeHole }>Game.ConfigManager.getTable("table_jade_hole.json");
                if (TableJadeHole.table == null) TableJadeHole.table = {};
            }
            return TableJadeHole.table;
        }

        public static Item(key: number | string): TableJadeHole {
            if (key == undefined || key == null) return null;
            let item = TableJadeHole.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableJadeHole'] = TableJadeHole;


    // table_ladder_score.csv
    // 竞技场奖励表
    export class TableLadderScore {
        public id: number = 0; // id
        public rank_min: number = 0; // 排名区间下限(左闭右开)
        public rank_max: number = 0; // 排名区间上限(左闭右开)
        public reward_token: number = 0; // 提升名次获得代币数量
        public reward_goods = new Array<number>(); // 每日获得物品
        public reward_count = new Array<number>(); // 每日获得数量

        private static table: { [key: string]: TableLadderScore } = null;

        public static Table(): { [key: string]: TableLadderScore } {
            if (TableLadderScore.table == null) {
                TableLadderScore.table = <{ [key: string]: TableLadderScore }>Game.ConfigManager.getTable("table_ladder_score.json");
                if (TableLadderScore.table == null) TableLadderScore.table = {};
            }
            return TableLadderScore.table;
        }

        public static Item(key: number | string): TableLadderScore {
            if (key == undefined || key == null) return null;
            let item = TableLadderScore.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLadderScore'] = TableLadderScore;


    // table_language.csv
    // 多语言名称索引表
    export class TableLanguage {
        public index: number = 0; // 索引
        public ch: string = ""; // 简体中文
        public en: string = ""; // 英文

        private static table: { [key: string]: TableLanguage } = null;

        public static Table(): { [key: string]: TableLanguage } {
            if (TableLanguage.table == null) {
                TableLanguage.table = <{ [key: string]: TableLanguage }>Game.ConfigManager.getTable("table_language.json");
                if (TableLanguage.table == null) TableLanguage.table = {};
            }
            return TableLanguage.table;
        }

        public static Item(key: number | string): TableLanguage {
            if (key == undefined || key == null) return null;
            let item = TableLanguage.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLanguage'] = TableLanguage;


    // table_league_animals.csv
    // 联盟异兽
    export class TableLeagueAnimals {
        public animal_id: number = 0; // boss类型
        public name: string = ""; // 名称
        public limit_level: number = 0; // 领养联盟等级
        public consume_res: number = 0; // 开启消耗帮贡
        public init_level: number = 0; // 初始等级
        public max_grow = new Array<number>(); // 等级对应奖励区间
        public zone_bosses = new Array<number>(); // 对应boss(分别为boss区间用|隔开)
        public boss_ratio: string = ""; // boss难度调节系数
        public map_roleName = new Array<string>(); // 异兽名字
        public feature = new Array<number>(); // 怪物特性
        public battle_bg: number = 0; // 战斗背景id

        private static table: { [key: string]: TableLeagueAnimals } = null;

        public static Table(): { [key: string]: TableLeagueAnimals } {
            if (TableLeagueAnimals.table == null) {
                TableLeagueAnimals.table = <{ [key: string]: TableLeagueAnimals }>Game.ConfigManager.getTable("table_league_animals.json");
                if (TableLeagueAnimals.table == null) TableLeagueAnimals.table = {};
            }
            return TableLeagueAnimals.table;
        }

        public static Item(key: number | string): TableLeagueAnimals {
            if (key == undefined || key == null) return null;
            let item = TableLeagueAnimals.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueAnimals'] = TableLeagueAnimals;


    // table_league_boss_reward.csv
    // 帮会boss奖励
    export class TableLeagueBossReward {
        public id: number = 0; // id
        public boss_grow: number = 0; // boss成长度
        public rank_min: number = 0; // 排名区间下限(左闭右开)
        public rank_max: number = 0; // 排名区间上限(左闭右开)
        public reward_goods = new Array<number>(); // 每日获得物品
        public reward_count = new Array<number>(); // 每日获得数量
        public reward_gift: number = 0; // 0
        public reward_exp: number = 0; // 1

        private static table: { [key: string]: TableLeagueBossReward } = null;

        public static Table(): { [key: string]: TableLeagueBossReward } {
            if (TableLeagueBossReward.table == null) {
                TableLeagueBossReward.table = <{ [key: string]: TableLeagueBossReward }>Game.ConfigManager.getTable("table_league_boss_reward.json");
                if (TableLeagueBossReward.table == null) TableLeagueBossReward.table = {};
            }
            return TableLeagueBossReward.table;
        }

        public static Item(key: number | string): TableLeagueBossReward {
            if (key == undefined || key == null) return null;
            let item = TableLeagueBossReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueBossReward'] = TableLeagueBossReward;


    // table_league_donate.csv
    // 联盟捐献
    export class TableLeagueDonate {
        public type: number = 0; // 捐献类型
        public consume_token: number = 0; // 消耗代币
        public consume_money: number = 0; // 消耗游戏币
        public reward_token: number = 0; // 获得联盟币
        public reward_contribution: number = 0; // 获得联盟贡献
        public reward_exp: number = 0; // 获得联盟经验
        public reward_active: number = 0; // 获得联盟活跃

        private static table: { [key: string]: TableLeagueDonate } = null;

        public static Table(): { [key: string]: TableLeagueDonate } {
            if (TableLeagueDonate.table == null) {
                TableLeagueDonate.table = <{ [key: string]: TableLeagueDonate }>Game.ConfigManager.getTable("table_league_donate.json");
                if (TableLeagueDonate.table == null) TableLeagueDonate.table = {};
            }
            return TableLeagueDonate.table;
        }

        public static Item(key: number | string): TableLeagueDonate {
            if (key == undefined || key == null) return null;
            let item = TableLeagueDonate.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueDonate'] = TableLeagueDonate;


    // table_league_fish.csv
    // 联盟钓鱼表
    export class TableLeagueFish {
        public fish_id: number = 0; // 鱼id
        public fish_name: string = ""; // 名称
        public fish_quality: number = 0; // 鱼品质
        public rand_power: number = 0; // 随机权值
        public fishing_duration: number = 0; // 垂钓时长
        public rand_items = new Array<number>(); // 奖励内容
        public image_title: string = ""; // 鱼名称图片
        public fish_image: string = ""; // 鱼图片
        public fish_ani: number = 0; // 鱼动态
        public image_board: string = ""; // 底版

        private static table: { [key: string]: TableLeagueFish } = null;

        public static Table(): { [key: string]: TableLeagueFish } {
            if (TableLeagueFish.table == null) {
                TableLeagueFish.table = <{ [key: string]: TableLeagueFish }>Game.ConfigManager.getTable("table_league_fish.json");
                if (TableLeagueFish.table == null) TableLeagueFish.table = {};
            }
            return TableLeagueFish.table;
        }

        public static Item(key: number | string): TableLeagueFish {
            if (key == undefined || key == null) return null;
            let item = TableLeagueFish.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueFish'] = TableLeagueFish;


    // table_league_instance.csv
    // 联盟副本表
    export class TableLeagueInstance {
        public instance_id: number = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
        public instance_name: string = ""; // 副本名称
        public instance_type: number = 0; // 副本类型(普通0，精英1)
        public open_level: number = 0; // 成员等级
        public consume_power: number = 0; // 消耗体力
        public boss_mobs = new Array<number>(); // boss
        public battle_bg: number = 0; // 
        public reward_zone = new Array<number>(); // 血量奖励阶段
        public boss_goods = new Array<Array<number>>(); // 固定物品奖励(id&id|id&id)
        public boss_count = new Array<Array<number>>(); // 奖励物品数量
        public battle_win_reward = new Array<Array<number>>(); // 战斗胜利奖励
        public battle_lose_reward = new Array<Array<number>>(); // 战斗失败奖励
        public feature = new Array<number>(); // 怪物特性
        public boss_roleId: string = ""; // Boss形象id（映射map_role表）
        public recommend_number: string = ""; // 推荐人数
        public recommend_power: number = 0; // 推荐战力
        public instance_des: number = 0; // 副本说明
        public back_img: string = ""; // 背景图片
        public name_img: string = ""; // 名称图片
        public back_big_img: string = ""; // 背景图片

        private static table: { [key: string]: TableLeagueInstance } = null;

        public static Table(): { [key: string]: TableLeagueInstance } {
            if (TableLeagueInstance.table == null) {
                TableLeagueInstance.table = <{ [key: string]: TableLeagueInstance }>Game.ConfigManager.getTable("table_league_instance.json");
                if (TableLeagueInstance.table == null) TableLeagueInstance.table = {};
            }
            return TableLeagueInstance.table;
        }

        public static Item(key: number | string): TableLeagueInstance {
            if (key == undefined || key == null) return null;
            let item = TableLeagueInstance.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueInstance'] = TableLeagueInstance;


    // table_league_match_rank.csv
    export class TableLeagueMatchRank {
        public id: number = 0; // id
        public rank_min: number = 0; // 排名区间下限
        public rank_max: number = 0; // 排名区间上限
        public local_rank_reward = new Array<Array<number>>(); // 本服排名奖励
        public local_craft_reward = new Array<Array<number>>(); // 本服四强奖励

        private static table: { [key: string]: TableLeagueMatchRank } = null;

        public static Table(): { [key: string]: TableLeagueMatchRank } {
            if (TableLeagueMatchRank.table == null) {
                TableLeagueMatchRank.table = <{ [key: string]: TableLeagueMatchRank }>Game.ConfigManager.getTable("table_league_match_rank.json");
                if (TableLeagueMatchRank.table == null) TableLeagueMatchRank.table = {};
            }
            return TableLeagueMatchRank.table;
        }

        public static Item(key: number | string): TableLeagueMatchRank {
            if (key == undefined || key == null) return null;
            let item = TableLeagueMatchRank.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueMatchRank'] = TableLeagueMatchRank;


    // table_league_match_score.csv
    export class TableLeagueMatchScore {
        public id: number = 0; // id
        public name: string = ""; // 段位
        public score_min: number = 0; // 最小积分
        public battle_reward = new Array<Array<number>>(); // 单场胜利奖励
        public daily_reward = new Array<Array<number>>(); // 战斗结算奖励

        private static table: { [key: string]: TableLeagueMatchScore } = null;

        public static Table(): { [key: string]: TableLeagueMatchScore } {
            if (TableLeagueMatchScore.table == null) {
                TableLeagueMatchScore.table = <{ [key: string]: TableLeagueMatchScore }>Game.ConfigManager.getTable("table_league_match_score.json");
                if (TableLeagueMatchScore.table == null) TableLeagueMatchScore.table = {};
            }
            return TableLeagueMatchScore.table;
        }

        public static Item(key: number | string): TableLeagueMatchScore {
            if (key == undefined || key == null) return null;
            let item = TableLeagueMatchScore.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueMatchScore'] = TableLeagueMatchScore;


    // table_level.csv
    // 等级
    export class TableLevel {
        public level: number = 0; // 等级
        public general_exp = new Array<number>(); // 武将升到下一级所需经验值(c,b,a,s)
        public role_exp: number = 0; // 角色升到下一级所需经验值
        public role_power: number = 0; // 角色体力最大上限
        public permit_exp: number = 0; // 通行证升级经验
        public league_people: number = 0; // 容纳人数
        public league_enliven: number = 0; // 每日联盟活跃上限
        public league_enliven_all: number = 0; // 联盟总活跃度上限
        public general_equip_money: number = 0; // 装备升级
        public general_skill_up: number = 0; // 技能升级
        public general_talent_exp = new Array<number>(); // 天赋升级经验
        public lottry_consume: number = 0; // 抽奖花费
        public league_exp: number = 0; // 联盟升级到下一级需要的贡献
        public league_mall: number = 0; // 联盟商城折扣
        public league_skill: number = 0; // 联盟技能等级
        public buy_money_ratio: number = 0; // 购买铜钱系数
        public levelup_power_sent: number = 0; // 升级赠送体力
        public instance_money_drop: number = 0; // 副本铜钱掉落
        public instance_exp_drop: number = 0; // 副本经验掉落
        public compose_money: number = 0; // 组合升级消耗
        public friend_exp: number = 0; // 伙伴升级亲密度
        public friend_money: number = 0; // 伙伴升级消耗
        public scene_formation: number = 0; // 场景中阵型设置武将数量
        public goods_ids = new Array<number>(); // 默默赠送道具
        public goods_count = new Array<number>(); // 默默赠送道具数量

        private static table: { [key: string]: TableLevel } = null;

        public static Table(): { [key: string]: TableLevel } {
            if (TableLevel.table == null) {
                TableLevel.table = <{ [key: string]: TableLevel }>Game.ConfigManager.getTable("table_level.json");
                if (TableLevel.table == null) TableLevel.table = {};
            }
            return TableLevel.table;
        }

        public static Item(key: number | string): TableLevel {
            if (key == undefined || key == null) return null;
            let item = TableLevel.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLevel'] = TableLevel;
    // table_licence.csv
    // 会员
    export class TableLicence {
        public level: number = 0; // 执照等级
        public text1 = new Array<number>(); // 文字特殊奖励TextsConfig_Vip.vip_string1-20
        public text2 = new Array<number>(); // 文字特殊权利TextsConfig_Vip.vip_string20-40
        public buy_plate: number = 0; // 购买盘子次数
        public buy_wanted_time: number = 0; // 购买第一条街次数
        public buy_arrest_time: number = 0; // 购买第二条街次数
        public buy_hunt_time: number = 0; // 购买缉拿令次数
        public quick_skill_up: number = 0; // 技能一键升级
        public all_skill_up: number = 0; // 技能全部升级
        public quick_equip_up: number = 0; // 装备一键强化
        public all_equip_up: number = 0; // 装备全部强化
        public buy_money: number = 0; // 招财次数
        public buy_money_rand: number = 0; // 招财暴击概率
        public buy_money_cirt = new Array<Array<number>>(); // 招财暴击倍率（前面是倍数后面是权值）
        public buy_mobs: number = 0; // 重置精英关卡次数
        public is_sweep: number = 0; // 是否可以扫荡
        public lottery_time: number = 0; // 抽奖次数(作废)
        public ladder: number = 0; // 购买演武堂比试次数
        public visit_immortal: number = 0; // 访仙次数
        public tower: number = 0; // 爬塔次数
        public tower_sweep_sapce: number = 0; // 爬塔扫荡时间间隔
        public tower_auto: number = 0; // 是否可以自动爬塔
        public sign_supply_time: number = 0; // 补签次数
        public relation_count: number = 0; // 关系数量上限
        public reward_power: number = 0; // 每日领取体力次数
        public pic_frame: string = ""; // 赠送头像框
        public chest_ten_sliver: number = 0; // 普通宝箱是否可以十连开
        public chest_ten_gold: number = 0; // 精致宝箱是否可以十连开
        public wanted_time: number = 0; // 第一条街挑战次数
        public arrest_time: number = 0; // 第二条街挑战次数
        public hunt_time: number = 0; // 缉拿令
        public wanted_add: number = 0; // 通缉令产量增加
        public wanted_sweep: number = 0; // 通缉令扫荡是否免费
        public wanted_refresh: number = 0; // 通缉令免费刷新次数
        public secret_free: number = 0; // 秘宝免费次数
        public league_animel_feed: number = 0; // 联盟异兽高级投喂
        public league_party_add: number = 0; // 联盟宴会加餐
        public league_fishing: number = 0; // 联盟钓鱼次数
        public fishing_refresh: number = 0; // 是否可以刷新紫色鱼
        public fishing_reward_double: number = 0; // 钓鱼奖励翻倍
        public battle_jump: number = 0; // 战斗跳过功能
        public wash_type: number = 0; // 神兵连洗类型
        public strategy_time: number = 0; // 军师阵法免费刷新次数
        public gamble_jade_time: number = 0; // 普通赌石次数
        public jade_quick_compose: number = 0; // 快速合成是否开启
        public jade_auto_refresh: number = 0; // 自动磨洗是否开启
        public gain_runes_time: number = 0; // 祭祀次数
        public change_runes_time: number = 0; // 换符次数
        public singlecraft_buy: number = 0; // 跨服挑战次数
        public singlecraft_free: number = 0; // 跨服免费挑战次数
        public assist_time: number = 0; // 组队战助战次数
        public reward_group_mail: number = 0; // 组队战收取邮件
        public tree_cirt = new Array<Array<number>>(); // 果子加成
        public xuyuan_free: number = 0; // 许愿屋免费次数
        public mall_relic_time: number = 0; // 遗迹商城刷新次数
        public search_count: number = 0; // 探索任务数量

        private static table: { [key: string]: TableLicence } = null;

        public static Table(): { [key: string]: TableLicence } {
            if (TableLicence.table == null) {
                TableLicence.table = <{ [key: string]: TableLicence }>Game.ConfigManager.getTable("table_licence.json");
                if (TableLicence.table == null) TableLicence.table = {};
            }
            return TableLicence.table;
        }

        public static Item(key: number | string): TableLicence {
            if (key == undefined || key == null) return null;
            let item = TableLicence.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLicence'] = TableLicence;


    // table_licence_weal.csv
    // 星耀等级
    export class TableLicenceWeal {
        public level: number = 0; // 星耀等级
        public starLevelName: string = ""; // 星耀等级名称
        public reward_index: number = 0; // 奖励标记
        public charge: string = ""; // 升级到下一级充值代币数量
        public sum: number = 0; // 累计充值
        public halo_id: number = 0; // 拥有光环
        public picFrame_id: number = 0; // 头像框Id
        public weal_award = new Array<number>(); // 奖励内容
        public weal_count = new Array<number>(); // 奖励数量

        private static table: { [key: string]: TableLicenceWeal } = null;

        public static Table(): { [key: string]: TableLicenceWeal } {
            if (TableLicenceWeal.table == null) {
                TableLicenceWeal.table = <{ [key: string]: TableLicenceWeal }>Game.ConfigManager.getTable("table_licence_weal.json");
                if (TableLicenceWeal.table == null) TableLicenceWeal.table = {};
            }
            return TableLicenceWeal.table;
        }

        public static Item(key: number | string): TableLicenceWeal {
            if (key == undefined || key == null) return null;
            let item = TableLicenceWeal.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLicenceWeal'] = TableLicenceWeal;


    // table_lottery_normal_reward.csv
    export class TableLotteryNormalReward {
        public index: number = 0; // 索引
        public lottery_time: number = 0; // 抽卡次数
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量
        public show_type = new Array<number>(); // 显示类型

        private static table: { [key: string]: TableLotteryNormalReward } = null;

        public static Table(): { [key: string]: TableLotteryNormalReward } {
            if (TableLotteryNormalReward.table == null) {
                TableLotteryNormalReward.table = <{ [key: string]: TableLotteryNormalReward }>Game.ConfigManager.getTable("table_lottery_normal_reward.json");
                if (TableLotteryNormalReward.table == null) TableLotteryNormalReward.table = {};
            }
            return TableLotteryNormalReward.table;
        }

        public static Item(key: number | string): TableLotteryNormalReward {
            if (key == undefined || key == null) return null;
            let item = TableLotteryNormalReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLotteryNormalReward'] = TableLotteryNormalReward;


    // table_map_role.csv
    // 模型
    export class TableMapRole {
        public model_id: number = 0; // 序列号
        public table_map_role: string = ""; // 模型描述
        public model_level: number = 0; // 等级
        public model_des: string = ""; // 描述
        public model_profession: number = 0; // 职业
        public model_sex: number = 0; // 性别
        public type: number = 0; // 派系
        public features: number = 0; // 武将特性(1攻2控3技4防)
        public organization: number = 0; // 是否是旅团成员（1是2否）
        public body_spx_id: number = 0; // 人物动作资源id
        public effect_spx_id: number = 0;
        public bodyxj_spx_id: number = 0; // 仙境人物动作资源id
        public effectxj_spx_id: number = 0; // 仙境角色特效id
        public xj_skill_id: number = 0; // 仙境技能id
        public body_color: number = 0; // 人物动作颜色
        public parry_time: number = 0; // 格挡时间(毫秒)
        public homing_time: number = 0; // 归位时间
        public model_scale: number = 0; // 缩放比例
        public hurt_num_pos: Array<number> = new Array<number>(); // 受伤数字位置
        public hurt_num_offset_nor: Array<number> = new Array<number>(); // 受伤数字出现位置1
        public hurt_num_offset_spe: Array<number> = new Array<number>();
        public hit_effect_offset_nor: Array<number> = new Array<number>(); // 受伤刀光特效出现位置1
        public hit_effect_offset_spe: Array<number> = new Array<number>(); // 受伤刀光效出现位置2
        public offset_nor_mid: Array<number> = new Array<number>(); // 出现位置中(主要针对buff和蓄力特效)
        public role_ani_offset_nor_up: Array<number> = new Array<number>(); // 特效出现位置上（主要针对头顶暴击、闪避、及小技能播放、buff播放等等)
        public role_ani_offset_spe_up: Array<number> = new Array<number>(); // 特效出现位置上（主要针对头顶暴击、闪避、及小技能播放、buff播放等等)
        public role_title_pos: Array<number> = new Array<number>(); // 场景人物名字位置
        public body_size: Array<number> = new Array<number>();
        public artifact_pos: Array<number> = new Array<number>(); // 待机神兵位置
        public eye_talent: string = ""; // 天赋眼睛路径
        public eye_head: string = ""; // 必杀半身路径
        public eye_head_shadow: string = ""; // 必杀半身影子路径
        public spine_id: number = 0; // 动画id（武将）
        public spine_scale: number = 0; // 动画大小（时装界面大小）
        public spine_instance_id: number = 0; // 动画id（副本）
        public spine_instance_scale: number = 0; // 动画大小（关卡boss大小）
        public fashion: number = 0; // 动画skill（武将）
        public body_touch_rt = new Array<Array<number>>(); // 模型触摸大概位置
        public path: string = ""; // 物品头像
        public body_path: string = ""; // 半身像路径
        public half_scale: number = 0; // 半身像缩放
        public tavern_half_scale: number = 0; // 招募半身像缩放
        public head_path: string = ""; // 头像路径
        public half_path: string = ""; // 半身路径
        public press_xuli_effect_sound: number = 0; // 点击蓄力音效
        public kill_xuli_effect_sound: number = 0; // 必杀蓄力音效
        public bisha_dub_sound: number = 0; // 必杀技配音
        public taici_dub_sound: number = 0; // 武将台词配音
        public name_path: string = ""; // 名字图片
        public body_scale: number = 0; // 人物缩放（战斗）
        public battle_head: string = ""; // 战斗头像
        public battle_help: string = ""; // 援护头像

        private static table: { [key: string]: TableMapRole } = null;

        public static Table(): { [key: string]: TableMapRole } {
            if (TableMapRole.table == null) {
                TableMapRole.table = <{ [key: string]: TableMapRole }>Game.ConfigManager.getTable("table_map_role.json");
                if (TableMapRole.table == null) TableMapRole.table = {};
            }
            return TableMapRole.table;
        }

        public static Item(key: number | string): TableMapRole {
            if (key == undefined || key == null) return null;
            let item = TableMapRole.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMapRole'] = TableMapRole;


    // table_mission_active.csv
    // 每日活跃度
    export class TableMissionActive {
        public id: number = 0; // 活跃度索引
        public score: number = 0; // 达到积分
        public reward_goods = new Array<Array<number>>(); // 奖励id
        public path: string = ""; // 图标路径

        private static table: { [key: string]: TableMissionActive } = null;

        public static Table(): { [key: string]: TableMissionActive } {
            if (TableMissionActive.table == null) {
                TableMissionActive.table = <{ [key: string]: TableMissionActive }>Game.ConfigManager.getTable("table_mission_active.json");
                if (TableMissionActive.table == null) TableMissionActive.table = {};
            }
            return TableMissionActive.table;
        }

        public static Item(key: number | string): TableMissionActive {
            if (key == undefined || key == null) return null;
            let item = TableMissionActive.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionActive'] = TableMissionActive;


    // table_mission_general.csv
    export class TableMissionGeneral {
        public id: number = 0; // 武将id
        public name: string = ""; // 名字
        public level: number = 0; // 星级
        public step: number = 0; // 进阶
        public star: number = 0; // 星级
        public awaken_level: number = 0; // 觉醒等级

        private static table: { [key: string]: TableMissionGeneral } = null;

        public static Table(): { [key: string]: TableMissionGeneral } {
            if (TableMissionGeneral.table == null) {
                TableMissionGeneral.table = <{ [key: string]: TableMissionGeneral }>Game.ConfigManager.getTable("table_mission_general.json");
                if (TableMissionGeneral.table == null) TableMissionGeneral.table = {};
            }
            return TableMissionGeneral.table;
        }

        public static Item(key: number | string): TableMissionGeneral {
            if (key == undefined || key == null) return null;
            let item = TableMissionGeneral.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionGeneral'] = TableMissionGeneral;


    // table_mission_item.csv
    // 任务子项表
    export class TableMissionItem {
        public id: number = 0; // 任务ID
        public name: string = ""; // 任务名称
        public des: string = ""; // 任务描述
        public star: number = 0; // 任务星级
        public condition: number = 0; // 完成条件
        public reward_goods = new Array<Array<number>>(); // 奖励id
        public reward_active: string = ""; // 提供活跃度
        public path: string = ""; // 图标路径
        public spine: number = 0; // 人物

        private static table: { [key: string]: TableMissionItem } = null;

        public static Table(): { [key: string]: TableMissionItem } {
            if (TableMissionItem.table == null) {
                TableMissionItem.table = <{ [key: string]: TableMissionItem }>Game.ConfigManager.getTable("table_mission_item.json");
                if (TableMissionItem.table == null) TableMissionItem.table = {};
            }
            return TableMissionItem.table;
        }

        public static Item(key: number | string): TableMissionItem {
            if (key == undefined || key == null) return null;
            let item = TableMissionItem.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionItem'] = TableMissionItem;


    // table_mission_jewel.csv
    export class TableMissionJewel {
        public index: number = 0; // 索引(必须是第几周)
        public name: string = ""; // 
        public month_open_day: number = 0; // 开启日期
        public day_num: number = 0; // 天数
        public check_type = new Array<number>(); // 检测类型(1卡片2卡片升星3猎人4猎人升星5道具)
        public check_star = new Array<number>(); // 检测星级
        public add_jewel_star = new Array<number>(); // 获取获得宝石
        public add_jewel_upstar = new Array<number>(); // 升星获得宝石
        public check_goods = new Array<number>(); // 检测物品
        public add_jewel_goods = new Array<number>(); // 获得宝石
        public daily_limit: number = 0; // 每日上限
        public exchange_goods = new Array<Array<number>>(); // 兑换物品
        public exchange_jewel = new Array<number>(); // 兑换积分
        public exchange_count = new Array<number>(); // 兑换次数
        public exchange_daily_update = new Array<number>(); // 每天刷新
        public daily_mission: number = 0; // 每日任务
        public final_mission: number = 0; // 终极任务

        private static table: { [key: string]: TableMissionJewel } = null;

        public static Table(): { [key: string]: TableMissionJewel } {
            if (TableMissionJewel.table == null) {
                TableMissionJewel.table = <{ [key: string]: TableMissionJewel }>Game.ConfigManager.getTable("table_mission_jewel.json");
                if (TableMissionJewel.table == null) TableMissionJewel.table = {};
            }
            return TableMissionJewel.table;
        }

        public static Item(key: number | string): TableMissionJewel {
            if (key == undefined || key == null) return null;
            let item = TableMissionJewel.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionJewel'] = TableMissionJewel;


    // table_mission_licence.csv
    // 执照任务
    export class TableMissionLicence {
        public id: number = 0; // 执照ID
        public name: string = ""; // 执照
        public battle_id: number = 0; // 挑战ID
        public reward_goods = new Array<number>(); // 奖励id
        public reward_count = new Array<number>(); // 奖励数量
        public examination_name: string = ""; // 考官名字
        public examination_des: string = ""; // 考官简介
        public condition: string = ""; // 过关条件
        public consume: number = 0; // 挑战消耗体力
        public battle_bg: number = 0; // 战斗背景
        public feature = new Array<number>(); // 怪物特性
        public boss_roleId = new Array<number>(); // Boss形象id（映射map_role表）
        public des: string = ""; // 考试信息描述
        public technique = new Array<number>(); // 推荐阵容
        public battle_value: number = 0; // 推荐战力

        private static table: { [key: string]: TableMissionLicence } = null;

        public static Table(): { [key: string]: TableMissionLicence } {
            if (TableMissionLicence.table == null) {
                TableMissionLicence.table = <{ [key: string]: TableMissionLicence }>Game.ConfigManager.getTable("table_mission_licence.json");
                if (TableMissionLicence.table == null) TableMissionLicence.table = {};
            }
            return TableMissionLicence.table;
        }

        public static Item(key: number | string): TableMissionLicence {
            if (key == undefined || key == null) return null;
            let item = TableMissionLicence.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionLicence'] = TableMissionLicence;


    // table_mission_main.csv
    // 执照任务
    export class TableMissionMain {
        public id: number = 0; // 索引
        public name: string = ""; // 
        public next_id: string = ""; // 下一个任务
        public type: number = 0; // 类型
        public sub_type: number = 0; // 任务类型
        public condition: number = 0; // 完成条件
        public reward_goods = new Array<Array<number>>(); // 奖励id
        public race_km: string = ""; // 与时间赛跑提供公里数
        public open_level: string = ""; // 开启等级类型
        public open_instance: string = ""; // 开启副本
        public description: string = ""; // 任务描述

        private static table: { [key: string]: TableMissionMain } = null;

        public static Table(): { [key: string]: TableMissionMain } {
            if (TableMissionMain.table == null) {
                TableMissionMain.table = <{ [key: string]: TableMissionMain }>Game.ConfigManager.getTable("table_mission_main.json");
                if (TableMissionMain.table == null) TableMissionMain.table = {};
            }
            return TableMissionMain.table;
        }

        public static Item(key: number | string): TableMissionMain {
            if (key == undefined || key == null) return null;
            let item = TableMissionMain.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionMain'] = TableMissionMain;


    // table_mission_race.csv
    export class TableMissionRace {
        public index: number = 0; // 索引(必须是第几周)
        public name: string = ""; // 
        public month_open_day: number = 0; // 开启日期
        public day_num: number = 0; // 天数
        public daily_missions = new Array<Array<number>>(); // 每日任务
        public zone_km = new Array<number>(); // 区间
        public zone_reward_goods = new Array<Array<number>>(); // 积分奖励物品
        public zone_reward_count = new Array<Array<number>>(); // 积分奖励数量

        private static table: { [key: string]: TableMissionRace } = null;

        public static Table(): { [key: string]: TableMissionRace } {
            if (TableMissionRace.table == null) {
                TableMissionRace.table = <{ [key: string]: TableMissionRace }>Game.ConfigManager.getTable("table_mission_race.json");
                if (TableMissionRace.table == null) TableMissionRace.table = {};
            }
            return TableMissionRace.table;
        }

        public static Item(key: number | string): TableMissionRace {
            if (key == undefined || key == null) return null;
            let item = TableMissionRace.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionRace'] = TableMissionRace;


    // table_mission_type.csv
    // 任务类型表
    export class TableMissionType {
        public index: number = 0; // 索引
        public type: number = 0; // 任务类型
        public sub_type: number = 0; // 任务子类型
        public start_id: number = 0; // 开始任务Id
        public end_id: number = 0; // 结束任务Id
        public open_level: number = 0; // 开启等级类型
        public open_instance: number = 0; // 开启副本
        public open_licence: number = 0; // 开启执照
        public des: string = ""; // 备注
        public tips: number = 0; // 没开启提示
        public sort: string = ""; // 排序
        public week_path: string = ""; // 周常任务按钮图片

        private static table: { [key: string]: TableMissionType } = null;

        public static Table(): { [key: string]: TableMissionType } {
            if (TableMissionType.table == null) {
                TableMissionType.table = <{ [key: string]: TableMissionType }>Game.ConfigManager.getTable("table_mission_type.json");
                if (TableMissionType.table == null) TableMissionType.table = {};
            }
            return TableMissionType.table;
        }

        public static Item(key: number | string): TableMissionType {
            if (key == undefined || key == null) return null;
            let item = TableMissionType.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionType'] = TableMissionType;


    // table_mission_week.csv
    export class TableMissionWeek {
        public index: number = 0; // 索引
        public name: string = ""; // 名字
        public next_index: number = 0; // 下一期
        public duration: number = 0; // 时长天
        public rest_day: number = 0; // 间隔
        public mission_types = new Array<number>(); // 任务类型*必须12开头
        public mall_goods = new Array<Array<number>>(); // 商品
        public mall_count = new Array<Array<number>>(); // 商品数量
        public buy_time = new Array<number>(); // 购买次数
        public day_refresh = new Array<number>(); // 是否每日刷新
        public price_token = new Array<number>(); // 消耗元宝
        public week_mission_type: number = 0; // 模板类型客户端用（1.美食2.契约3.赏金4.遗迹）

        private static table: { [key: string]: TableMissionWeek } = null;

        public static Table(): { [key: string]: TableMissionWeek } {
            if (TableMissionWeek.table == null) {
                TableMissionWeek.table = <{ [key: string]: TableMissionWeek }>Game.ConfigManager.getTable("table_mission_week.json");
                if (TableMissionWeek.table == null) TableMissionWeek.table = {};
            }
            return TableMissionWeek.table;
        }

        public static Item(key: number | string): TableMissionWeek {
            if (key == undefined || key == null) return null;
            let item = TableMissionWeek.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionWeek'] = TableMissionWeek;

    // table_mission_gift.csv
    export class TableMissionGift {
        public index: number = 0; // 索引
        public name: string = ""; // 名字
        public vip_level: number = 0; // vip要求
        public charge_token: number = 0; // 累充要求
        public comsume_token: number = 0; // 消耗元宝
        public reward_goods = new Array<number>(); // 物品
        public reward_count = new Array<number>(); // 数量
        public primer: string = ""; // 原价

        private static table: { [key: string]: TableMissionGift } = null;

        public static Table(): { [key: string]: TableMissionGift } {
            if (TableMissionGift.table == null) {
                TableMissionGift.table = <{ [key: string]: TableMissionGift }>Game.ConfigManager.getTable("table_mission_gift.json");
                if (TableMissionGift.table == null) TableMissionGift.table = {};
            }
            return TableMissionGift.table;
        }

        public static Item(key: number | string): TableMissionGift {
            if (key == undefined || key == null) return null;
            let item = TableMissionGift.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionGift'] = TableMissionGift;


    // table_monthgift.csv
    // 新礼包表
    export class TableMonthgift {
        public index: number = 0; // 索引
        public name: string = ""; // 名字
        public open_time: number = 0; // 开始时间（从月开始）
        public duration: number = 0; // 持续时间
        public price: number = 0; // 价格
        public raw_token: number = 0; // 添加元宝
        public goods_id = new Array<number>(); // 物品
        public goods_num = new Array<number>(); // 数量
        public chargeback_goods = new Array<Array<number>>(); // 大佬的回馈
        public refrence: number = 0; // 同一礼包
        public pay_index: string = ""; // 现金支付（映射pay_index）
        public token_price: string = ""; // 元宝支付
        public h5_show_type: number = 0; // h5页面显示类型(1、超值2、热销3、vip专享）
        public path: string = ""; // 图标路径
        public name_path: string = ""; // 名字图片
        public all_price: number = 0; // 总价值
        public des: string = ""; // 描述

        private static table: { [key: string]: TableMonthgift } = null;

        public static Table(): { [key: string]: TableMonthgift } {
            if (TableMonthgift.table == null) {
                TableMonthgift.table = <{ [key: string]: TableMonthgift }>Game.ConfigManager.getTable("table_monthgift.json");
                if (TableMonthgift.table == null) TableMonthgift.table = {};
            }
            return TableMonthgift.table;
        }

        public static Item(key: number | string): TableMonthgift {
            if (key == undefined || key == null) return null;
            let item = TableMonthgift.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMonthgift'] = TableMonthgift;


    // table_newgift.csv
    // 礼包索引
    export class TableNewgift {
        public index: number = 0; // 索引
        public gift_type: number = 0; // 礼包类型（1.等级2.回归3.宝物星级4.武将星级5.武将品质6.充值礼包）
        public trigger: number = 0; // 触发条件
        public trigger_add: string = ""; // 附加条件
        public trigger_level: string = ""; // 触发等级
        public trigger_gift = new Array<number>(); // 触发的礼包
        public trigger_duration: string = ""; // 触发频率
        public des: string = ""; // 描述
        public pic: string = ""; // 主城图标

        private static table: { [key: string]: TableNewgift } = null;

        public static Table(): { [key: string]: TableNewgift } {
            if (TableNewgift.table == null) {
                TableNewgift.table = <{ [key: string]: TableNewgift }>Game.ConfigManager.getTable("table_newgift.json");
                if (TableNewgift.table == null) TableNewgift.table = {};
            }
            return TableNewgift.table;
        }

        public static Item(key: number | string): TableNewgift {
            if (key == undefined || key == null) return null;
            let item = TableNewgift.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableNewgift'] = TableNewgift;


    // table_newgift_daily.csv
    // 礼包持续天数
    export class TableNewgiftDaily {
        public index: number = 0; // 索引
        public next_day: string = ""; // 下次天数
        public reward_level: string = ""; // 等级要求
        public goods_id = new Array<number>(); // 物品
        public goods_count = new Array<number>(); // 物品数量
        public des: string = ""; // 描述
        public value: string = ""; // 客户端读取价值

        private static table: { [key: string]: TableNewgiftDaily } = null;

        public static Table(): { [key: string]: TableNewgiftDaily } {
            if (TableNewgiftDaily.table == null) {
                TableNewgiftDaily.table = <{ [key: string]: TableNewgiftDaily }>Game.ConfigManager.getTable("table_newgift_daily.json");
                if (TableNewgiftDaily.table == null) TableNewgiftDaily.table = {};
            }
            return TableNewgiftDaily.table;
        }

        public static Item(key: number | string): TableNewgiftDaily {
            if (key == undefined || key == null) return null;
            let item = TableNewgiftDaily.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableNewgiftDaily'] = TableNewgiftDaily;


    // table_newgift_item.csv
    // 礼包内容
    export class TableNewgiftItem {
        public index: number = 0; // 索引
        public sort: number = 0; // 排序
        public name_str: string = ""; // 名字_配表用
        public is_new: number = 0; // 是否新加
        public gift_form: number = 0; // 礼包形式（1.限时限次2.每日限购3.无需购买-触发每日领取4.每周限购5.购买后每日领取6.买后按等级领取）
        public duration: number = 0; // 持续时间（1.3.5表示礼包触发后存在时间，6表示到等级后存在时间）
        public unpay_trigger_times: string = ""; // 未购买出现次数
        public unpay_trigger_duration: string = ""; // 未购买下次出现频率
        public trigger_charge_add: string = ""; // 购买完之后触发累充的概率
        public limit_level: number = 0; // 未购买到等级后消失（6）
        public is_forever: number = 0; // 永久（5类才有用，配了1，领完后又可再买（例如月卡）
        public buy_times: number = 0; // 可购买次数
        public goods_id = new Array<number>(); // 物品
        public goods_count = new Array<number>(); // 物品数量
        public is_permit: string = ""; // 高级许可证权限
        public is_passseason: string = ""; // 通行证赛季限购
        public super = new Array<number>(); // 特殊显示（0.无1.超值）
        public raw_token: number = 0; // 添加元宝
        public pay_type: number = 0; // 支付类型(1.RMB2.元宝3.免费)
        public chargeback_goods = new Array<Array<number>>(); // 大佬的回馈
        public primer: number = 0; // 原价
        public price: number = 0; // 价格
        public daily_num: string = ""; // 购买之后按等级或者按天数可领取奖励的个数
        public daily_index: string = ""; // 分支礼包第一天对应index
        public h5_show_type: string = ""; // h5页面显示类型(1、超值2、热销3、vip专享）
        public name: string = ""; // 礼包名
        public tips = new Array<number>(); // 跳转界面(客户端，前为推送，后为礼包跳转)
        public pay_index: string = ""; // 现金支付（映射pay_index）
        public des: string = ""; // 礼包描述
        public path: string = ""; // 图标路径
        public push_big_path: string = ""; // 推送大图片路径
        public info: string = ""; // 给玩家看的
        public is_op: number = 0; // 是否为绝版
        public is_show_city: number = 0; // 是否在主城展示
        public city_path: string = ""; // 主城图标

        private static table: { [key: string]: TableNewgiftItem } = null;

        public static Table(): { [key: string]: TableNewgiftItem } {
            if (TableNewgiftItem.table == null) {
                TableNewgiftItem.table = <{ [key: string]: TableNewgiftItem }>Game.ConfigManager.getTable("table_newgift_item.json");
                if (TableNewgiftItem.table == null) TableNewgiftItem.table = {};
            }
            return TableNewgiftItem.table;
        }

        public static Item(key: number | string): TableNewgiftItem {
            if (key == undefined || key == null) return null;
            let item = TableNewgiftItem.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableNewgiftItem'] = TableNewgiftItem;


    // table_newgift_seven.csv
    // 连续七天登陆礼包
    export class TableNewgiftSeven {
        public index: number = 0; // 索引
        public consume_token = new Array<number>(); // 消耗钻石数（0为不出售）
        public reward_goods = new Array<number>(); // 奖励内容
        public reward_count = new Array<number>(); // 奖励数量
        public primer: number = 0; // 礼包原价
        public show_type = new Array<number>(); // 显示类型

        private static table: { [key: string]: TableNewgiftSeven } = null;

        public static Table(): { [key: string]: TableNewgiftSeven } {
            if (TableNewgiftSeven.table == null) {
                TableNewgiftSeven.table = <{ [key: string]: TableNewgiftSeven }>Game.ConfigManager.getTable("table_newgift_seven.json");
                if (TableNewgiftSeven.table == null) TableNewgiftSeven.table = {};
            }
            return TableNewgiftSeven.table;
        }

        public static Item(key: number | string): TableNewgiftSeven {
            if (key == undefined || key == null) return null;
            let item = TableNewgiftSeven.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableNewgiftSeven'] = TableNewgiftSeven;


    // table_pay_index.csv
    // 充值档位
    export class TablePayIndex {
        public index: number = 0; // 索引
        public name: string = ""; // 名字
        public coin: number = 0; // 价格
        public product_type: number = 0; // 商品类别(包月1、正常2、大于100表示人民币礼包)(101-benefit)
        public raw_token: number = 0; // 添加元宝数(后台模拟接口使用该值)
        public give_token: number = 0; // 代币数量(赠送数量)
        public discount_price: number = 0; // 折扣价
        public original_price: number = 0; // 原价
        public lieren_coin: number = 0; // 猎人币
        public chargeback_goods = new Array<Array<number>>(); // 大佬的回馈
        public first_multiple: number = 0; // 首次倍数(可以为小数)
        public month_type: number = 0; // 是否是包月
        public is_delete: number = 0; // 是否作废(支付时为1表示不对该项处理，若为包月在领取奖励时继续计算)
        public ext1: number = 0; // 扩展信息(包月天数)
        public ext2 = new Array<Array<number>>(); // 扩展信息(包月每日领取奖励内容)
        public give_wechat: number = 0; // 微信支付额外赠送
        public h5_show_type: number = 0; // 页面显示类型(1、热门；等)
        public img_path: string = ""; // 图片路径
        public sort_index: number = 0; // 排序用index
        public des: string = ""; // 

        private static table: { [key: string]: TablePayIndex } = null;

        public static Table(): { [key: string]: TablePayIndex } {
            if (TablePayIndex.table == null) {
                TablePayIndex.table = <{ [key: string]: TablePayIndex }>Game.ConfigManager.getTable("table_pay_index.json");
                if (TablePayIndex.table == null) TablePayIndex.table = {};
            }
            return TablePayIndex.table;
        }

        public static Item(key: number | string): TablePayIndex {
            if (key == undefined || key == null) return null;
            let item = TablePayIndex.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePayIndex'] = TablePayIndex;


    // table_pay_reward.csv
    export class TablePayReward {
        public index: number = 0; // 索引
        public name: string = ""; // 名字
        public charge_token: number = 0; // 累计额度
        public reward_goods = new Array<number>(); // 奖励id
        public reward_count = new Array<number>(); // 奖励数量

        private static table: { [key: string]: TablePayReward } = null;

        public static Table(): { [key: string]: TablePayReward } {
            if (TablePayReward.table == null) {
                TablePayReward.table = <{ [key: string]: TablePayReward }>Game.ConfigManager.getTable("table_pay_reward.json");
                if (TablePayReward.table == null) TablePayReward.table = {};
            }
            return TablePayReward.table;
        }

        public static Item(key: number | string): TablePayReward {
            if (key == undefined || key == null) return null;
            let item = TablePayReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePayReward'] = TablePayReward;


    // table_pet_skill.csv
    export class TablePetSkill {
        public id: number = 0; // 技能id
        public name: string = ""; // 技能名字
        public type: number = 0; // 类型（1.属性2.抢果概率3.采集缩短4.复活缩短5.猎人回血）
        public attri_add = new Array<number>(); // 属性类型（类型&数值）
        public rand = new Array<number>(); // 抢夺概率
        public value: string = ""; // cd数值
        public b_fight: number = 0; // 是否为战斗属性（客户端）

        private static table: { [key: string]: TablePetSkill } = null;

        public static Table(): { [key: string]: TablePetSkill } {
            if (TablePetSkill.table == null) {
                TablePetSkill.table = <{ [key: string]: TablePetSkill }>Game.ConfigManager.getTable("table_pet_skill.json");
                if (TablePetSkill.table == null) TablePetSkill.table = {};
            }
            return TablePetSkill.table;
        }

        public static Item(key: number | string): TablePetSkill {
            if (key == undefined || key == null) return null;
            let item = TablePetSkill.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePetSkill'] = TablePetSkill;


    // table_pic.csv
    // 图片资源
    export class TablePic {
        public pic_id: number = 0; // 图片id
        public path: string = ""; // 标题路径
        public path2: string = ""; // 武将路径
        public generalId: string = ""; // 所属武将ID（累计充值）

        private static table: { [key: string]: TablePic } = null;

        public static Table(): { [key: string]: TablePic } {
            if (TablePic.table == null) {
                TablePic.table = <{ [key: string]: TablePic }>Game.ConfigManager.getTable("table_pic.json");
                if (TablePic.table == null) TablePic.table = {};
            }
            return TablePic.table;
        }

        public static Item(key: number | string): TablePic {
            if (key == undefined || key == null) return null;
            let item = TablePic.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePic'] = TablePic;


    // table_potato_attri.csv
    // 宝物属性
    export class TablePotatoAttri {
        public attri_id: number = 0; // 属性ID
        public quality: number = 0; // 品质
        public up_attri: string = ""; // 突破属性
        public is_reset: string = ""; // 是否重生
        public is_best: number = 0; // 是否是极品属性
        public rand_power: number = 0; // 随机权值
        public potato_type = new Array<number>(); // 在什么派系
        public potato_star = new Array<number>(); // 在什么星级出现
        public attri_type: number = 0; // 随机属性类型
        public object_type: string = ""; // 对象类型(见EPotatoAttriType)
        public attri_value = new Array<number>(); // 属性范围(浮点型)
        public des: string = ""; // 描述
        public range_growth = new Array<Array<number>>(); // 增幅范围
        public growth_consume = new Array<number>(); // 增幅消耗物品
        public growth_count = new Array<number>(); // 增幅消耗数量
        public growth_money = new Array<number>(); // 增幅消耗铜钱
        public growth_score = new Array<number>(); // 增幅积分
        public is_double: number = 0; // 是否可随出小数

        private static table: { [key: string]: TablePotatoAttri } = null;

        public static Table(): { [key: string]: TablePotatoAttri } {
            if (TablePotatoAttri.table == null) {
                TablePotatoAttri.table = <{ [key: string]: TablePotatoAttri }>Game.ConfigManager.getTable("table_potato_attri.json");
                if (TablePotatoAttri.table == null) TablePotatoAttri.table = {};
            }
            return TablePotatoAttri.table;
        }

        public static Item(key: number | string): TablePotatoAttri {
            if (key == undefined || key == null) return null;
            let item = TablePotatoAttri.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePotatoAttri'] = TablePotatoAttri;


    // table_potato_break.csv
    // 卡片突破
    export class TablePotatoBreak {
        public id: number = 0; // 突破等级
        public exchange_prop = new Array<number>(); // 所需道具
        public exchange_count: number = 0; // 所需同名卡数量
        public exchange_level: number = 0; // 所需同名卡等级下限
        public consume: number = 0; // 消耗金币

        private static table: { [key: string]: TablePotatoBreak } = null;

        public static Table(): { [key: string]: TablePotatoBreak } {
            if (TablePotatoBreak.table == null) {
                TablePotatoBreak.table = <{ [key: string]: TablePotatoBreak }>Game.ConfigManager.getTable("table_potato_break.json");
                if (TablePotatoBreak.table == null) TablePotatoBreak.table = {};
            }
            return TablePotatoBreak.table;
        }

        public static Item(key: number | string): TablePotatoBreak {
            if (key == undefined || key == null) return null;
            let item = TablePotatoBreak.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePotatoBreak'] = TablePotatoBreak;


    // table_process.csv
    // 进程
    export class TableProcess {
        public type: number = 0; // 进程类型
        public name: string = ""; // 进程名称
        public max_time: number = 0; // 最大时间
        public is_only: number = 0; // 进程是否唯一
        public is_pool: string = ""; // 是否是循环倒计时
        public des: string = ""; // 进程描述

        private static table: { [key: string]: TableProcess } = null;

        public static Table(): { [key: string]: TableProcess } {
            if (TableProcess.table == null) {
                TableProcess.table = <{ [key: string]: TableProcess }>Game.ConfigManager.getTable("table_process.json");
                if (TableProcess.table == null) TableProcess.table = {};
            }
            return TableProcess.table;
        }

        public static Item(key: number | string): TableProcess {
            if (key == undefined || key == null) return null;
            let item = TableProcess.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableProcess'] = TableProcess;


    // table_quick_mall.csv
    // 快速商铺
    export class TableQuickMall {
        public item_id: number = 0; // 物品id
        public item_name: string = ""; // 物品名称
        public start_level: number = 0; // 开启等级
        public consume_type: number = 0; // 消耗类型
        public consume_num: number = 0; // 消耗数量

        private static table: { [key: string]: TableQuickMall } = null;

        public static Table(): { [key: string]: TableQuickMall } {
            if (TableQuickMall.table == null) {
                TableQuickMall.table = <{ [key: string]: TableQuickMall }>Game.ConfigManager.getTable("table_quick_mall.json");
                if (TableQuickMall.table == null) TableQuickMall.table = {};
            }
            return TableQuickMall.table;
        }

        public static Item(key: number | string): TableQuickMall {
            if (key == undefined || key == null) return null;
            let item = TableQuickMall.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableQuickMall'] = TableQuickMall;


    // table_rand_item.csv
    export class TableRandItem {
        public id: number = 0; // 分组id
        public nouse1: string = ""; // 说明
        public item_ids = new Array<number>(); // 物品Id
        public item_count = new Array<number>(); // 物品数量
        public rand_power = new Array<number>(); // 随机权重
        public is_show = new Array<number>(); // 是否公告显示
        public show_type = new Array<number>(); // 显示类型
        public nouse2: string = ""; // 说明
        public index: string = ""; // 顺序
        public level_zone = new Array<number>(); // 等级区间

        private static table: { [key: string]: TableRandItem } = null;

        public static Table(): { [key: string]: TableRandItem } {
            if (TableRandItem.table == null) {
                TableRandItem.table = <{ [key: string]: TableRandItem }>Game.ConfigManager.getTable("table_rand_item.json");
                if (TableRandItem.table == null) TableRandItem.table = {};
            }
            return TableRandItem.table;
        }

        public static Item(key: number | string): TableRandItem {
            if (key == undefined || key == null) return null;
            let item = TableRandItem.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableRandItem'] = TableRandItem;

    // table_recovery.csv
    // 回收表
    export class TableRecovery {
        public id: number = 0; // id
        public consume_goods: number = 0; // 消耗物品
        public consume_count: number = 0; // 消耗数量
        public consume_token: number = 0; // 消耗元宝
        public back_goods = new Array<number>(); // 返还物品
        public des: string = ""; // 描述

        private static table: { [key: string]: TableRecovery } = null;

        public static Table(): { [key: string]: TableRecovery } {
            if (TableRecovery.table == null) {
                TableRecovery.table = <{ [key: string]: TableRecovery }>Game.ConfigManager.getTable("table_recovery.json");
                if (TableRecovery.table == null) TableRecovery.table = {};
            }
            return TableRecovery.table;
        }

        public static Item(key: number | string): TableRecovery {
            if (key == undefined || key == null) return null;
            let item = TableRecovery.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableRecovery'] = TableRecovery;


    // table_runes.csv
    // 魔域祭祀奖励表
    export class TableRunes {
        public id: number = 0; // id
        public name: string = ""; // 组合名称
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量
        public show_type = new Array<number>(); // 显示类型
        public des: string = ""; // 描述

        private static table: { [key: string]: TableRunes } = null;

        public static Table(): { [key: string]: TableRunes } {
            if (TableRunes.table == null) {
                TableRunes.table = <{ [key: string]: TableRunes }>Game.ConfigManager.getTable("table_runes.json");
                if (TableRunes.table == null) TableRunes.table = {};
            }
            return TableRunes.table;
        }

        public static Item(key: number | string): TableRunes {
            if (key == undefined || key == null) return null;
            let item = TableRunes.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableRunes'] = TableRunes;


    // table_scene_boss_reward.csv
    // 魔域boss伤害奖励表
    export class TableSceneBossReward {
        public id: number = 0; // id
        public bosslevel_min: number = 0; // boss等级
        public bosslevel_max: number = 0; // boss等级(左闭右闭)
        public rank_min: number = 0; // 排名区间下限(左开右闭)
        public rank_max: number = 0; // 排名区间上限(左开右闭)
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量

        private static table: { [key: string]: TableSceneBossReward } = null;

        public static Table(): { [key: string]: TableSceneBossReward } {
            if (TableSceneBossReward.table == null) {
                TableSceneBossReward.table = <{ [key: string]: TableSceneBossReward }>Game.ConfigManager.getTable("table_scene_boss_reward.json");
                if (TableSceneBossReward.table == null) TableSceneBossReward.table = {};
            }
            return TableSceneBossReward.table;
        }

        public static Item(key: number | string): TableSceneBossReward {
            if (key == undefined || key == null) return null;
            let item = TableSceneBossReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSceneBossReward'] = TableSceneBossReward;


    // table_share_reward.csv
    export class TableShareReward {
        public index: number = 0; // 索引
        public count: number = 0; // 数量
        public type: number = 0; // 任务类型
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量

        private static table: { [key: string]: TableShareReward } = null;

        public static Table(): { [key: string]: TableShareReward } {
            if (TableShareReward.table == null) {
                TableShareReward.table = <{ [key: string]: TableShareReward }>Game.ConfigManager.getTable("table_share_reward.json");
                if (TableShareReward.table == null) TableShareReward.table = {};
            }
            return TableShareReward.table;
        }

        public static Item(key: number | string): TableShareReward {
            if (key == undefined || key == null) return null;
            let item = TableShareReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableShareReward'] = TableShareReward;


    // table_singlecraft_rank.csv
    // 跨服战排行表
    export class TableSinglecraftRank {
        public id: number = 0; // id
        public index: number = 0; // 争霸赛季
        public rank_min: number = 0; // 排名区间最小值
        public rank_max: number = 0; // 排名区间最大值
        public title_id: number = 0; // 称号
        public reward_goods = new Array<number>(); // 段位奖励物品
        public reward_count = new Array<number>(); // 段位奖励数量

        private static table: { [key: string]: TableSinglecraftRank } = null;

        public static Table(): { [key: string]: TableSinglecraftRank } {
            if (TableSinglecraftRank.table == null) {
                TableSinglecraftRank.table = <{ [key: string]: TableSinglecraftRank }>Game.ConfigManager.getTable("table_singlecraft_rank.json");
                if (TableSinglecraftRank.table == null) TableSinglecraftRank.table = {};
            }
            return TableSinglecraftRank.table;
        }

        public static Item(key: number | string): TableSinglecraftRank {
            if (key == undefined || key == null) return null;
            let item = TableSinglecraftRank.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSinglecraftRank'] = TableSinglecraftRank;


    // table_singlecraft_rank_self.csv
    // 跨服战本服积分表
    export class TableSinglecraftRankSelf {
        public id: number = 0; // id
        public rank_min: number = 0; // 排名区间最小值
        public rank_max: number = 0; // 排名区间最大值
        public title_id: string = ""; // 称号
        public reward_goods = new Array<number>(); // 段位奖励物品
        public reward_count = new Array<number>(); // 段位奖励数量

        private static table: { [key: string]: TableSinglecraftRankSelf } = null;

        public static Table(): { [key: string]: TableSinglecraftRankSelf } {
            if (TableSinglecraftRankSelf.table == null) {
                TableSinglecraftRankSelf.table = <{ [key: string]: TableSinglecraftRankSelf }>Game.ConfigManager.getTable("table_singlecraft_rank_self.json");
                if (TableSinglecraftRankSelf.table == null) TableSinglecraftRankSelf.table = {};
            }
            return TableSinglecraftRankSelf.table;
        }

        public static Item(key: number | string): TableSinglecraftRankSelf {
            if (key == undefined || key == null) return null;
            let item = TableSinglecraftRankSelf.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSinglecraftRankSelf'] = TableSinglecraftRankSelf;


    // table_singlecraft_score.csv
    // 跨服战积分表
    export class TableSinglecraftScore {
        public index: number = 0; // 段位
        public name: string = ""; // 段位名称
        public section_score: number = 0; // 段位积分下限
        public title_id: string = ""; // 获得称号
        public win_coin: number = 0; // 胜利得币
        public fail_coin: number = 0; // 失败得币
        public reset_down: number = 0; // 重置后降低分数
        public reward_goods = new Array<number>(); // 每日段位奖励物品
        public reward_count = new Array<number>(); // 每日段位奖励数量
        public season_reward_goods = new Array<number>(); // 赛季段位奖励物品
        public season_reward_count = new Array<number>(); // 赛季段位奖励数量
        public icon_num: string = ""; // 段位Icon数字
        public title: string = ""; // 段位名称图片(大图)

        private static table: { [key: string]: TableSinglecraftScore } = null;

        public static Table(): { [key: string]: TableSinglecraftScore } {
            if (TableSinglecraftScore.table == null) {
                TableSinglecraftScore.table = <{ [key: string]: TableSinglecraftScore }>Game.ConfigManager.getTable("table_singlecraft_score.json");
                if (TableSinglecraftScore.table == null) TableSinglecraftScore.table = {};
            }
            return TableSinglecraftScore.table;
        }

        public static Item(key: number | string): TableSinglecraftScore {
            if (key == undefined || key == null) return null;
            let item = TableSinglecraftScore.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSinglecraftScore'] = TableSinglecraftScore;


    // table_skill_action.csv
    export class TableSkillAction {
        public id: number = 0; // 动作序列号
        public name: string = ""; // 动作名称
        public spx_action_id: number = 0; // 动作行为id
        public role_displacement_id: number = 0; // 人物位移
        public is_repeat: number = 0; // 是否循环播放
        public continue_time: number = 0; // 动作持续时间
        public action_flash: number = 0; // 行为目标（1-上一次行为，2-原始的进场位置，3-本地现在在什么位置就什么位置开始，4-特定位置，5-指定位置根据effect的目标）
        public flash_target_param1: number = 0; // 行为参数1
        public flash_target_param2: number = 0; // 行为参数2
        public is_lockY: number = 0; // 是否锁定Y轴
        public target_offset_distance = new Array<number>(); // 相对行为目标的偏差距离
        public effects_id = new Array<number>(); // 特效id
        public effects_appear_frame = new Array<number>(); // 触发特效时机
        public zone_reset: number = 0; // 区间重置
        public hurt_id: number = 0; // 效果id
        public break_action_frame: number = 0; // 打断等级(自己打断自己）
        public action_break_priority: number = 0; // 特效动作优先级(打断相关)
        public play_speed: number = 0; // 动作播放速度
        public shake_id: number = 0; // 震动id
        public shake_appear_frame: number = 0; // 震动出现时机
        public is_to_floor_over: number = 0; // 是否到达地面结束动作
        public action_effect_sound_id: number = 0; // 动作音效
        public is_continue: number = 0; // 是否持续施法
        public collision_num: number = 0; // 穿透次数
        public collision_distance: number = 0; // 有效碰撞距离

        private static table: { [key: string]: TableSkillAction } = null;

        public static Table(): { [key: string]: TableSkillAction } {
            if (TableSkillAction.table == null) {
                TableSkillAction.table = <{ [key: string]: TableSkillAction }>Game.ConfigManager.getTable("table_skill_action.json");
                if (TableSkillAction.table == null) TableSkillAction.table = {};
            }
            return TableSkillAction.table;
        }

        public static Item(key: number | string): TableSkillAction {
            if (key == undefined || key == null) return null;
            let item = TableSkillAction.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSkillAction'] = TableSkillAction;


    // table_skill_buff.csv
    export class TableSkillBuff {
        public buff_id: number = 0; // Buff序列号
        public base_type: number = 0; // BUFF基础类型(参见table-enumn)
        public buff_name: string = ""; // 名称
        public source: string = ""; // 基数数值来源说明
        public des_arg: string = ""; // 参数说明
        public buff_owner: string = ""; // 对应技能或天赋
        public damage_type: number = 0; // 伤害类型(物攻-魔攻-神圣攻击)
        public hit_rate = new Array<number>(); // 命中概率|升级参数
        public continue_time = new Array<number>(); // 持续时间|升级参数
        public fis_param = new Array<number>(); // 参数一:间隔时间，基数|增量
        public sec_param = new Array<number>(); // 参数二：具体伤害值，基数|增量
        public third_param = new Array<number>(); // 参数三：具体伤害值，基数|增量
        public body_color = new Array<number>(); // 中Buff人物颜色
        public des_param = new Array<Array<number>>(); // 技能描述参数1
        public des_param2 = new Array<Array<number>>(); // 假技能描述参数1
        public skill_des: string = ""; // 技能描述

        private static table: { [key: string]: TableSkillBuff } = null;

        public static Table(): { [key: string]: TableSkillBuff } {
            if (TableSkillBuff.table == null) {
                TableSkillBuff.table = <{ [key: string]: TableSkillBuff }>Game.ConfigManager.getTable("table_skill_buff.json");
                if (TableSkillBuff.table == null) TableSkillBuff.table = {};
            }
            return TableSkillBuff.table;
        }

        public static Item(key: number | string): TableSkillBuff {
            if (key == undefined || key == null) return null;
            let item = TableSkillBuff.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSkillBuff'] = TableSkillBuff;


    // table_skill_effects.csv
    export class TableSkillEffects {
        public id: number = 0; // 特效序列号
        public role: string = ""; // 使用角色
        public effects_spx_id: number = 0; // 特效资源id
        public efficient_eff: number = 0; // 特效关联id
        public effects_action_id: number = 0; // 特效行为id
        public effect_scale: number = 0; // 特效缩放
        public start_move_time: number = 0; // 开始移动时间
        public displacement_id: number = 0; // 特效位移
        public is_repeat: number = 0; // 是否循环播放
        public continue_time: number = 0; // 动作持续时间
        public collision_num: number = 0; // 穿透次数
        public play_speed: number = 0; // 播放速度(默认读的面板里的值)
        public distance_role = new Array<number>(); // 触发相对角色位置
        public is_follow_role: number = 0; // 是否跟随角色
        public is_lockY: number = 0; // 是否锁定Y轴
        public is_floor_end: number = 0; // 是否碰到地面就结束
        public effect_atk_type: number = 0; // 特效攻击类型（参照TableDamageType 1-物理 2-技能）
        public effect_skill_type: number = 0; // 特效触发技能类型(参照TableSkillType)
        public effect_target_pos: number = 0; // 方位(1-我方，2敌方)
        public distance_map = new Array<number>(); // 触发相对地图位置
        public effect_target: number = 0; // 施加目标类型（参照TableTargetId）
        public point_hurt = new Array<number>(); // 指向伤害
        public effect_break_priority: number = 0; // 特效动作优先级(打断相关)
        public buff_zone_reset: number = 0; // 
        public effect_buff_id: number = 0; // buff触发Id
        public buff_appear_frame: number = 0; // buff触发时机
        public hurt_zone_reset: number = 0; // 区间重置
        public hurt_id: number = 0; // 效果id
        public hit_effects_ids = new Array<number>(); // 击中特效id
        public hit_effects_size = new Array<number>(); // 击中特效id
        public next_effects_id: number = 0; // 下一个特效id
        public shake_id: number = 0; // 震动id
        public shake_appear_frame: number = 0; // 震动出现时机
        public call_monsterbase: number = 0; // 召唤怪物id
        public call_frame: number = 0; // 召唤怪物时机
        public effect_sound_id: number = 0; // 特效音效
        public sound_appear_frame: number = 0; // 音效出现时机
        public blend_active: number = 0; // 混合通道
        public particle_id: number = 0; // 粒子id
        public particle_frame: number = 0; // 粒子触发时机
        public decay_ratio: number = 0; // 衰减距离
        public missile_speed: number = 0; // 追踪导弹速度
        public collision_distance: number = 0; // 有效碰撞距离

        private static table: { [key: string]: TableSkillEffects } = null;

        public static Table(): { [key: string]: TableSkillEffects } {
            if (TableSkillEffects.table == null) {
                TableSkillEffects.table = <{ [key: string]: TableSkillEffects }>Game.ConfigManager.getTable("table_skill_effects.json");
                if (TableSkillEffects.table == null) TableSkillEffects.table = {};
            }
            return TableSkillEffects.table;
        }

        public static Item(key: number | string): TableSkillEffects {
            if (key == undefined || key == null) return null;
            let item = TableSkillEffects.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSkillEffects'] = TableSkillEffects;


    // table_skill_hurt.csv
    export class TableSkillHurt {
        public id: number = 0; // 效果序列号
        public name: string = ""; // 伤害名称
        public time = new Array<number>(); // 开始帧|结束帧|总时间（毫秒）
        public effect_type: number = 0; // 效果类型（0无类型，1血量，2怒气）
        public proof_value: number = 0; // 效果校对
        public role_num: number = 0; // 受伤角色总数
        public hurt_gap_time: number = 0; // 受伤判定间隔（毫秒）
        public stiff_time: number = 0; // 硬直时间
        public attacked_state: number = 0; // 受伤方式（0-普通受伤，1-向下击打受伤，2-挑起受伤）
        public attacked_displacement_id: number = 0; // 受伤位移
        public hurt_effect_sound_id: number = 0; // 受伤音效
        public hurt_weight: number = 0; // 伤害权重

        private static table: { [key: string]: TableSkillHurt } = null;

        public static Table(): { [key: string]: TableSkillHurt } {
            if (TableSkillHurt.table == null) {
                TableSkillHurt.table = <{ [key: string]: TableSkillHurt }>Game.ConfigManager.getTable("table_skill_hurt.json");
                if (TableSkillHurt.table == null) TableSkillHurt.table = {};
            }
            return TableSkillHurt.table;
        }

        public static Item(key: number | string): TableSkillHurt {
            if (key == undefined || key == null) return null;
            let item = TableSkillHurt.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSkillHurt'] = TableSkillHurt;


    // table_skill_unit.csv
    export class TableSkillUnit {
        public id: number = 0; // 技能单元id
        public des_private: string = ""; // 私人描述
        public skill_order: number = 0; // 技能单元优先级
        public all_action = new Array<number>(); // 技能单元包含的动作
        public bg_spx_id: number = 0; // 背景动画资源id
        public bg_spx_index: number = 0; // 背景动画开始索引
        public bg_appear_frame: number = 0; // 动作北京动画出现时机
        public storage_appear_frame: number = 0; // 蓄力光效产生时机
        public look_begin_frame: number = 0; // 静止开始帧
        public look_end_frame: number = 0; // 帧前为静止状态

        private static table: { [key: string]: TableSkillUnit } = null;

        public static Table(): { [key: string]: TableSkillUnit } {
            if (TableSkillUnit.table == null) {
                TableSkillUnit.table = <{ [key: string]: TableSkillUnit }>Game.ConfigManager.getTable("table_skill_unit.json");
                if (TableSkillUnit.table == null) TableSkillUnit.table = {};
            }
            return TableSkillUnit.table;
        }

        public static Item(key: number | string): TableSkillUnit {
            if (key == undefined || key == null) return null;
            let item = TableSkillUnit.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSkillUnit'] = TableSkillUnit;


    // table_spgeneral_reward.csv
    // 猛将
    export class TableSpgeneralReward {
        public index: number = 0; // 索引
        public general_id = new Array<number>(); // 武将号
        public own_count: number = 0; // 数量
        public general_name: string = ""; // 武将名称
        public reward_goods = new Array<number>(); // 奖励内容
        public reward_count = new Array<number>(); // 奖励数量
        public show_type = new Array<number>(); // 显示类型

        private static table: { [key: string]: TableSpgeneralReward } = null;

        public static Table(): { [key: string]: TableSpgeneralReward } {
            if (TableSpgeneralReward.table == null) {
                TableSpgeneralReward.table = <{ [key: string]: TableSpgeneralReward }>Game.ConfigManager.getTable("table_spgeneral_reward.json");
                if (TableSpgeneralReward.table == null) TableSpgeneralReward.table = {};
            }
            return TableSpgeneralReward.table;
        }

        public static Item(key: number | string): TableSpgeneralReward {
            if (key == undefined || key == null) return null;
            let item = TableSpgeneralReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSpgeneralReward'] = TableSpgeneralReward;


    // table_spgeneral_information.csv
    // 猛将
    export class TableSpgeneralInformation {
        public index: number = 0; // 索引
        public task_type: number = 0; // 任务类型
        public general_id: number = 0; // 武将Id
        public general_name: string = ""; // 武将名称
        public aptitude: number = 0; // 武将资质
        public img_path: string = ""; // 全身图片
        public head_path: string = ""; // 头像图片
        public title_path: string = ""; // 特性图片
        public word_path: string = ""; // 名字图片
        public text_path: string = ""; // 武将说明
        public name_path: string = ""; // 名字下标
        public general_series: string = ""; // 系别图片
        public general_type_path: string = ""; // 猎人类型图片
        public general_technique: string = ""; // 使用技巧
        public general_des: string = ""; // 角色定位
        public general_story: string = ""; // 猎人故事

        private static table: { [key: string]: TableSpgeneralInformation } = null;

        public static Table(): { [key: string]: TableSpgeneralInformation } {
            if (TableSpgeneralInformation.table == null) {
                TableSpgeneralInformation.table = <{ [key: string]: TableSpgeneralInformation }>Game.ConfigManager.getTable("table_spgeneral_information.json");
                if (TableSpgeneralInformation.table == null) TableSpgeneralInformation.table = {};
            }
            return TableSpgeneralInformation.table;
        }

        public static Item(key: number | string): TableSpgeneralInformation {
            if (key == undefined || key == null) return null;
            let item = TableSpgeneralInformation.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableSpgeneralInformation'] = TableSpgeneralInformation;


    // table_online_reward.csv
    export class TableOnlineReward {
        public index: number = 0; // 索引
        public online_time: number = 0; // 在线时长
        public goods_id = new Array<number>(); // 物品
        public goods_count = new Array<number>(); // 物品数量

        private static table: { [key: string]: TableOnlineReward } = null;

        public static Table(): { [key: string]: TableOnlineReward } {
            if (TableOnlineReward.table == null) {
                TableOnlineReward.table = <{ [key: string]: TableOnlineReward }>Game.ConfigManager.getTable("table_online_reward.json");
                if (TableOnlineReward.table == null) TableOnlineReward.table = {};
            }
            return TableOnlineReward.table;
        }

        public static Item(key: number | string): TableOnlineReward {
            if (key == undefined || key == null) return null;
            let item = TableOnlineReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableOnlineReward'] = TableOnlineReward;

    // table_teach.csv
    // 教学
    export class TableTeach {
        public id: number = 0; // 索引
        public part: number = 0; // 序号
        public scene: string = ""; // 场景
        public typeLua: string = ""; // 类别
        public des: string = ""; // 说明
        public condition: string = ""; // 条件
        private static table: { [key: string]: TableTeach } = null;
        public static tableLength: number = 0;

        public static Table(): { [key: string]: TableTeach } {
            if (TableTeach.table == null) {
                TableTeach.table = <{ [key: string]: TableTeach }>Game.ConfigManager.getTable("table_teach.json");
                if (TableTeach.table == null) TableTeach.table = {};
                TableTeach.tableLength = zj.Game.PlayerMissionSystem.tableLength(TableTeach.table);
            }
            return TableTeach.table;
        }

        public static Item(key: number | string): TableTeach {
            if (key == undefined || key == null) return null;
            let item = TableTeach.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableTeach'] = TableTeach;


    // table_tower.csv
    // 爬塔
    export class TableTower {
        public id: number = 0; // 层数
        public instance_name: string = ""; // 关卡名称
        public reduce_power: number = 0; // 消耗体力
        public first_reward = new Array<Array<number>>(); // 首杀奖励
        public reward_good_id = new Array<number>(); // 奖励物品id
        public reward_good_count = new Array<number>(); // 奖励物品数量
        public reward_good_show_type = new Array<number>(); // 奖励物品显示
        public cimelia_good_id = new Array<number>(); // 宝箱物品count
        public cimelia_good_count = new Array<number>(); // 宝箱物品id
        public tower_pack = new Array<number>(); // 包含关卡
        public better_power: number = 0; // 推荐战力
        public battle_bg: number = 0; // 副本战斗背景id
        public feature = new Array<Array<number>>(); // 怪物特性
        public boss_roleId = new Array<number>(); // Boss形象id（映射map_role表）
        public boss_name: string = ""; // 怪物名
        public monster_level: number = 0; // 怪物等级
        public des: string = ""; // 描述

        private static table: { [key: string]: TableTower } = null;

        public static Table(): { [key: string]: TableTower } {
            if (TableTower.table == null) {
                TableTower.table = <{ [key: string]: TableTower }>Game.ConfigManager.getTable("table_tower.json");
                if (TableTower.table == null) TableTower.table = {};
            }
            return TableTower.table;
        }

        public static Item(key: number | string): TableTower {
            if (key == undefined || key == null) return null;
            let item = TableTower.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableTower'] = TableTower;


    // table_training.csv
    // 特训
    export class TableTraining {
        public instance_id: number = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
        public instance_name: string = ""; // 副本名称
        public instance_pack = new Array<number>(); // 副本包含关卡
        public challenge_level: number = 0; // 挑战等级
        public reward_goods = new Array<Array<number>>(); // 奖励物品
        public combo_count: number = 0; // 过关连击数
        public battle_bg: number = 0; // 副本战斗背景id
        public boss_roleId: number = 0; // Boss形象id（映射map_role表）
        public instance_icon: string = ""; // 副本icon
        public instance_des: string = ""; // 副本说明

        private static table: { [key: string]: TableTraining } = null;

        public static Table(): { [key: string]: TableTraining } {
            if (TableTraining.table == null) {
                TableTraining.table = <{ [key: string]: TableTraining }>Game.ConfigManager.getTable("table_training.json");
                if (TableTraining.table == null) TableTraining.table = {};
            }
            return TableTraining.table;
        }

        public static Item(key: number | string): TableTraining {
            if (key == undefined || key == null) return null;
            let item = TableTraining.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableTraining'] = TableTraining;


    // table_uplevel_reward.csv
    export class TableUplevelReward {
        public index: number = 0; // 索引
        public level: number = 0; // 条件等级
        public level_reward = new Array<Array<number>>(); // 等级奖励
        public month_card = new Array<number>(); // 月卡条件
        public month_reward = new Array<Array<number>>(); // 月卡奖励

        private static table: { [key: string]: TableUplevelReward } = null;

        public static Table(): { [key: string]: TableUplevelReward } {
            if (TableUplevelReward.table == null) {
                TableUplevelReward.table = <{ [key: string]: TableUplevelReward }>Game.ConfigManager.getTable("table_uplevel_reward.json");
                if (TableUplevelReward.table == null) TableUplevelReward.table = {};
            }
            return TableUplevelReward.table;
        }

        public static Item(key: number | string): TableUplevelReward {
            if (key == undefined || key == null) return null;
            let item = TableUplevelReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableUplevelReward'] = TableUplevelReward;

    export class TableWorkSend {
        public work_id: number = 0; // 工作id
        public work_des: string = ""; // 工作描述

        private static table: { [key: string]: TableWorkSend } = null;

        public static Table(): { [key: string]: TableWorkSend } {
            if (TableWorkSend.table == null) {
                TableWorkSend.table = <{ [key: string]: TableWorkSend }>Game.ConfigManager.getTable("table_work_send.json");
                if (TableWorkSend.table == null) TableWorkSend.table = {};
            }
            return TableWorkSend.table;
        }

        public static Item(key: number | string): TableWorkSend {
            if (key == undefined || key == null) return null;
            let item = TableWorkSend.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWorkSend'] = TableWorkSend;


    // table_vipinfo.csv
    export class TableVipinfo {
        public level: number = 0; // Vip等级
        public vipLevelName: string = ""; // VIP等级名称
        public text1 = new Array<number>(); // 文字特殊奖励TextsConfig_Vip.vip_string1-20
        public text2 = new Array<number>(); // 文字特殊权利TextsConfig_Vip.vip_string20-40
        public charge: number = 0; // 升级到下一级充值代币数量
        public sum: number = 0; // 累计充值
        public power_speed: number = 0; // 体力恢复速度
        public power_add: number = 0; // 体力上限
        public buy_power: number = 0; // 购买体力次数
        public instance_exp_add: number = 0; // 副本经验加成
        public wanted_coin_add: number = 0; // 流星街金币加成
        public mall_free_time: number = 0; // 商城免费刷新次数
        public buy_coin_free_time: number = 0; // 购买金币免费次数
        public runes_free_time: number = 0; // 猜拳免费次数(未完成)
        public fishing_free_time: number = 0; // 钓鱼免费刷紫次数(未完成)
        public package_add: number = 0; // 猎人仓库容量
        public potato_add: number = 0; // 卡片数量上限
        public craft_buy_time: number = 0; // 跨服战可购买次数(未完成)
        public scene_revive_time: number = 0; // 仙境复活时间减少(未完成)
        public sendchat: number = 0; // Vip上线提示
        public is_sweep: number = 0; // 是否可扫荡5次（同时35级自动开启）
        public is_speed: number = 0; // 是否开启3倍速战斗（30级以上开启）
        public is_direct_tower: number = 0; // 是否直达
        public search_count: number = 0; // 探索任务数量

        private static table: { [key: string]: TableVipinfo } = null;

        public static Table(): { [key: string]: TableVipinfo } {
            if (TableVipinfo.table == null) {
                TableVipinfo.table = <{ [key: string]: TableVipinfo }>Game.ConfigManager.getTable("table_vipinfo.json");
                if (TableVipinfo.table == null) TableVipinfo.table = {};
            }
            return TableVipinfo.table;
        }

        public static Item(key: number | string): TableVipinfo {
            if (key == undefined || key == null) return null;
            let item = TableVipinfo.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableVipinfo'] = TableVipinfo;


    // table_vip_weal.csv
    export class TableVipWeal {
        public level: number = 0; // Vip等级
        public goods_content = new Array<number>(); // 商品
        public goods_count = new Array<number>(); // 商品数量
        public consume_token: number = 0; // 消耗钻石
        public primer: number = 0; // 原价

        private static table: { [key: string]: TableVipWeal } = null;

        public static Table(): { [key: string]: TableVipWeal } {
            if (TableVipWeal.table == null) {
                TableVipWeal.table = <{ [key: string]: TableVipWeal }>Game.ConfigManager.getTable("table_vip_weal.json");
                if (TableVipWeal.table == null) TableVipWeal.table = {};
            }
            return TableVipWeal.table;
        }

        public static Item(key: number | string): TableVipWeal {
            if (key == undefined || key == null) return null;
            let item = TableVipWeal.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableVipWeal'] = TableVipWeal;


    // table_wanted.csv
    // 通缉令表
    export class TableWanted {
        public wanted_id: number = 0; // 通缉令Id
        public type: number = 0; // 类型
        public limit_level: number = 0; // 等级限制
        public bSpecial: number = 0; // 特殊关卡（0普通，1特殊，2超特殊）
        public consume_type: string = ""; // 挑战券
        public static_goods = new Array<Array<number>>(); // 固定物品奖励(id&count|id&count)
        public sweep_consume: number = 0; // 扫荡消耗
        public battle_consume: number = 0; // 体力消耗
        public instance_pack = new Array<number>(); // 包含关卡
        public battle_bg: number = 0; // 战斗背景
        public battle_value: number = 0; // 推荐战力
        public first_reward = new Array<Array<number>>(); // 首杀奖励
        public rand_items = new Array<number>(); // 随机分组
        public rand_power = new Array<number>(); // 掉落百分比
        public soul_num: string = ""; // 掉落数量
        public soul_power: string = ""; // 掉落权重
        public extra_rand = new Array<number>(); // 额外随机
        public extra_power = new Array<number>(); // 额外权重
        public general = new Array<number>(); // 推荐武将
        public feature = new Array<number>(); // 怪物特性
        public drop_items = new Array<number>(); // 客户端掉落
        public monster_level: number = 0; // 怪物等级
        public Instance_name: string = ""; // 关卡名字
        public bossName: string = ""; // 怪物名字
        public des: string = ""; // 描述
        public boss_head_client: string = ""; // 怪物头像（客户端）
        public boss_name_client: string = ""; // boss名字图片
        public boss_drop_client: string = ""; // boss掉落说明
        public boss_type_client: number = 0; // boss特性(1攻2防3辅)
        public boss_feature_client = new Array<string>(); // boss特性图片
        public boss_floor: string = ""; // 是否为boss层
        public technique = new Array<number>(); // 推荐阵容
        public is_continuous: number = 0; // 是否可连续挑战
        public dialog_tip: string = ""; // 对话小tip

        private static table: { [key: string]: TableWanted } = null;

        public static Table(): { [key: string]: TableWanted } {
            if (TableWanted.table == null) {
                TableWanted.table = <{ [key: string]: TableWanted }>Game.ConfigManager.getTable("table_wanted.json");
                if (TableWanted.table == null) TableWanted.table = {};
            }
            return TableWanted.table;
        }

        public static Item(key: number | string): TableWanted {
            if (key == undefined || key == null) return null;
            let item = TableWanted.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWanted'] = TableWanted;


    // table_wanted_enemy_camp.csv
    // 敌犯大本营
    export class TableWantedEnemyCamp {
        public id: number = 0; // 层数
        public type: number = 0; // 类型
        public instance_level: string = ""; // 关卡等级
        public reward_good_id = new Array<number>(); // 奖励物品id
        public reward_good_count = new Array<number>(); // 奖励物品数量
        public instance_pack = new Array<number>(); // 包含关卡
        public general = new Array<number>(); // 推荐武将
        public battle_value: number = 0; // 推荐战力
        public feature = new Array<number>(); // 怪物特性
        public general_id: number = 0; // 怪物形象id
        public monster_level: number = 0; // 怪物等级
        public battle_bg: number = 0; // 副本战斗背景id

        private static table: { [key: string]: TableWantedEnemyCamp } = null;

        public static Table(): { [key: string]: TableWantedEnemyCamp } {
            if (TableWantedEnemyCamp.table == null) {
                TableWantedEnemyCamp.table = <{ [key: string]: TableWantedEnemyCamp }>Game.ConfigManager.getTable("table_wanted_enemy_camp.json");
                if (TableWantedEnemyCamp.table == null) TableWantedEnemyCamp.table = {};
            }
            return TableWantedEnemyCamp.table;
        }

        public static Item(key: number | string): TableWantedEnemyCamp {
            if (key == undefined || key == null) return null;
            let item = TableWantedEnemyCamp.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWantedEnemyCamp'] = TableWantedEnemyCamp;


    // table_wanted_rand.csv
    // 通缉令掉落
    export class TableWantedRand {
        public id: number = 0; // 分组id
        public type: number = 0; // 类型
        public desc: string = ""; // 描述
        public rand_items = new Array<number>(); // 随机分组
        public rand_power: number = 0; // 出现权值

        private static table: { [key: string]: TableWantedRand } = null;

        public static Table(): { [key: string]: TableWantedRand } {
            if (TableWantedRand.table == null) {
                TableWantedRand.table = <{ [key: string]: TableWantedRand }>Game.ConfigManager.getTable("table_wanted_rand.json");
                if (TableWantedRand.table == null) TableWantedRand.table = {};
            }
            return TableWantedRand.table;
        }

        public static Item(key: number | string): TableWantedRand {
            if (key == undefined || key == null) return null;
            let item = TableWantedRand.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWantedRand'] = TableWantedRand;


    // table_wonderland.csv
    // 仙境
    export class TableWonderland {
        public wonderland_id: number = 0; // 仙境id
        public wonderland_name: string = ""; // 仙境名称
        public open_time = new Array<number>(); // 开放时间
        public mix_level: number = 0; // 最小等级
        public max_level: number = 0; // 最大等级
        public is_novice: number = 0; // 是否是新手仙境
        public is_battle: number = 0; // 是否可以战斗
        public is_halo: number = 0; // 是否生效光环
        public optimize_degree: number = 0; // 优化程度(0表示不优化)
        public max_people: number = 0; // 最大进入人数(0表示不做限制)
        public branch_condition: number = 0; // 分支条件(0表示该场景无分支)
        public tree_pos = new Array<Array<number>>(); // 果树位置
        public revive_x = new Array<number>(); // 复活区域
        public revive_y = new Array<number>(); // 复活区域
        public mobs_produce = new Array<number>(); // 怪物生成器
        public back_img: string = ""; // 背景图片
        public name_img: string = ""; // 名称图片
        public map_id: number = 0; // 地图id
        public block_index: number = 0; // 地图块类型
        public ani_id = new Array<number>(); // 动画id

        private static table: { [key: string]: TableWonderland } = null;

        public static Table(): { [key: string]: TableWonderland } {
            if (TableWonderland.table == null) {
                TableWonderland.table = <{ [key: string]: TableWonderland }>Game.ConfigManager.getTable("table_wonderland.json");
                if (TableWonderland.table == null) TableWonderland.table = {};
            }
            return TableWonderland.table;
        }

        public static Item(key: number | string): TableWonderland {
            if (key == undefined || key == null) return null;
            let item = TableWonderland.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWonderland'] = TableWonderland;


    // table_wonderland_map_block.csv
    // 仙境地图表
    export class TableWonderlandMapBlock {
        public build_id: number = 0; // 建筑id
        public build_name: string = ""; // 建筑名称
        public show_scene = new Array<number>(); // 出现场景
        public block_cell: number = 0; // 建筑放置层（1:far,2:mid2，3:mid1,4:group,5:close)
        public build_type: number = 0; // 建筑物类型 5:功能npc
        public be_attacked: number = 0; // 建筑是否可被攻击或者触摸
        public build_x: number = 0; // 建筑坐标
        public build_y: number = 0; // 建筑坐标
        public balk_rt = new Array<number>(); // 碰撞格范围
        public touch_rt = new Array<number>(); // 触摸范围
        public is_mirror: number = 0; // 是否镜像
        public draw_order: number = 0; // 绘制层级
        public path: string = ""; // 路径
        public spine_scale: number = 0; // spine缩放
        public spine_id: number = 0; // spine动画
        public des: string = ""; // 描述
        public name_path: string = ""; // 名字路径
        public name_pos = new Array<number>(); // 名字位置

        private static table: { [key: string]: TableWonderlandMapBlock } = null;

        public static Table(): { [key: string]: TableWonderlandMapBlock } {
            if (TableWonderlandMapBlock.table == null) {
                TableWonderlandMapBlock.table = <{ [key: string]: TableWonderlandMapBlock }>Game.ConfigManager.getTable("table_wonderland_map_block.json");
                if (TableWonderlandMapBlock.table == null) TableWonderlandMapBlock.table = {};
            }
            return TableWonderlandMapBlock.table;
        }

        public static Item(key: number | string): TableWonderlandMapBlock {
            if (key == undefined || key == null) return null;
            let item = TableWonderlandMapBlock.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWonderlandMapBlock'] = TableWonderlandMapBlock;


    // table_wonderland_tree.csv
    // 仙境植物
    export class TableWonderlandTree {
        public tree_id: number = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
        public tree_name: string = ""; // 副本名称
        public not_limit: number = 0; // 果实是否无限
        public is_timeTree: number = 0; // 时间段果实
        public quality: number = 0; // 品质
        public time_limit: number = 0; // 时间限制果实
        public collection_get = new Array<Array<number>>(); // 采集必得
        public collection_rand: string = ""; // 采集随机
        public rand_count = new Array<number>(); // 随机数量
        public rand_power = new Array<number>(); // 随机数量权重
        public fruit_type: string = ""; // 果实类型
        public is_show: number = 0; // 是否公告
        public collection_consume: number = 0; // 采集消耗
        public collection_time: number = 0; // 采集消耗时长
        public mature_time: string = ""; // 果实成熟时长
        public mature_count: number = 0; // 果实数量
        public darkland_score: string = ""; // 黑暗大陆积分
        public mobs_rand: number = 0; // 怪物出现概率
        public mobs_info = new Array<number>(); // 怪物
        public mobs_rand_power = new Array<number>(); // 怪物随机概率
        public alive_time: string = ""; // 怪物存活时长
        public mobs_point = new Array<number>(); // 怪物移动范围
        public machine_rand = new Array<Array<number>>(); // 触发机关概率(0不触发1爆炸2冰冻3加速4加血5加倍)
        public immature_img: number = 0; // 未成熟果树（动画ani_ui）
        public mature_path: number = 0; // 成熟果树图（动画ani_ui）
        public balk_rt = new Array<number>(); // 碰撞格范围
        public touch_rt = new Array<number>(); // 触摸范围
        public shelter_pos = new Array<number>(); // 阴影范围
        public tag_y: number = 0; // 果树标签相对位置高度
        public time_show: number = 0; // 成熟时间显示

        private static table: { [key: string]: TableWonderlandTree } = null;

        public static Table(): { [key: string]: TableWonderlandTree } {
            if (TableWonderlandTree.table == null) {
                TableWonderlandTree.table = <{ [key: string]: TableWonderlandTree }>Game.ConfigManager.getTable("table_wonderland_tree.json");
                if (TableWonderlandTree.table == null) TableWonderlandTree.table = {};
            }
            return TableWonderlandTree.table;
        }

        public static Item(key: number | string): TableWonderlandTree {
            if (key == undefined || key == null) return null;
            let item = TableWonderlandTree.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWonderlandTree'] = TableWonderlandTree;


    // table_worldboss_map_block.csv
    // boss战建筑表
    export class TableWorldbossMapBlock {
        public build_id: number = 0; // 建筑id
        public build_name: string = ""; // 建筑名称
        public build_type: number = 0; // 建筑物类型
        public be_attacked: number = 0; // 建筑是否可被攻击
        public build_x: number = 0; // 建筑坐标
        public build_y: number = 0; // 建筑坐标
        public balk_rt = new Array<number>(); // 碰撞格范围
        public touch_rt = new Array<number>(); // 触摸范围
        public is_mirror: number = 0; // 是否镜像
        public draw_order: number = 0; // 绘制层级
        public path: string = ""; // 路径
        public spine_id: number = 0; // spine动画
        public des: string = ""; // 描述

        private static table: { [key: string]: TableWorldbossMapBlock } = null;

        public static Table(): { [key: string]: TableWorldbossMapBlock } {
            if (TableWorldbossMapBlock.table == null) {
                TableWorldbossMapBlock.table = <{ [key: string]: TableWorldbossMapBlock }>Game.ConfigManager.getTable("table_worldboss_map_block.json");
                if (TableWorldbossMapBlock.table == null) TableWorldbossMapBlock.table = {};
            }
            return TableWorldbossMapBlock.table;
        }

        public static Item(key: number | string): TableWorldbossMapBlock {
            if (key == undefined || key == null) return null;
            let item = TableWorldbossMapBlock.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableWorldbossMapBlock'] = TableWorldbossMapBlock;


    // table_xuyuan.csv
    export class TableXuyuan {
        public id: number = 0; // 主题id
        public name: string = ""; // 主题名称
        public rand_item = new Array<number>(); // 随机物品
        public rand_power = new Array<number>(); // 随机权重
        public exchange_goods = new Array<Array<number>>(); // 兑换物品
        public exchange_xuyuan = new Array<number>(); // 兑换积分
        public exchange_count = new Array<number>(); // 兑换次数
        public consume_pai: number = 0; // 单次许愿消耗牌
        public consume_pai_ten: number = 0; // 十次许愿消耗牌
        public consume_good: number = 0; // 许愿消耗物品
        public one_time_rand: number = 0; // 首次单抽给
        public ten_time_rand: number = 0; // 十连抽必给
        public score: number = 0; // 单抽获取积分
        public integral_duration: number = 0; // 距离娃娃机时长
        public subject_duration: number = 0; // 主题时长
        public step_score = new Array<number>(); // 进度奖励条件
        public step_reward = new Array<Array<number>>(); // 进度奖励
        public max_time: number = 0; // 本期最大次数
        public client_award = new Array<Array<number>>(); // 客户端奖励
        public client_award_pic = new Array<Array<number>>(); // 客户端奖励图

        private static table: { [key: string]: TableXuyuan } = null;

        public static Table(): { [key: string]: TableXuyuan } {
            if (TableXuyuan.table == null) {
                TableXuyuan.table = <{ [key: string]: TableXuyuan }>Game.ConfigManager.getTable("table_xuyuan.json");
                if (TableXuyuan.table == null) TableXuyuan.table = {};
            }
            return TableXuyuan.table;
        }

        public static Item(key: number | string): TableXuyuan {
            if (key == undefined || key == null) return null;
            let item = TableXuyuan.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableXuyuan'] = TableXuyuan;

    // client_table_up_pic.csv
    class TableClientUpPic {
        public pic_id: number = 0; // 图片id
        public Name: string = ""; // 猎人名字
        public path: string = ""; // 模板路径
        public button_path = new Array<number>(); // 按钮路径

        private static table: { [key: string]: TableClientUpPic } = null;

        public static Table(): { [key: string]: TableClientUpPic } {
            if (TableClientUpPic.table == null) {
                TableClientUpPic.table = <{ [key: string]: TableClientUpPic }>Game.ConfigManager.getTable("client_table_up_pic.json");
                if (TableClientUpPic.table == null) TableClientUpPic.table = {};
            }
            return TableClientUpPic.table;
        }

        public static Item(key: number | string): TableClientUpPic {
            if (key == undefined || key == null) return null;
            let item = TableClientUpPic.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableClientUpPic'] = TableClientUpPic;


    // table_contend_reward.csv
    class TableContendReward {
        public id: number = 0; // id
        public rank_min: number = 0; // 排名区间最小值
        public rank_max: number = 0; // 排名区间最大值
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量
        public title_id: string = ""; // 称号

        private static table: { [key: string]: TableContendReward } = null;

        public static Table(): { [key: string]: TableContendReward } {
            if (TableContendReward.table == null) {
                TableContendReward.table = <{ [key: string]: TableContendReward }>Game.ConfigManager.getTable("table_contend_reward.json");
                if (TableContendReward.table == null) TableContendReward.table = {};
            }
            return TableContendReward.table;
        }

        public static Item(key: number | string): TableContendReward {
            if (key == undefined || key == null) return null;
            let item = TableContendReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableContendReward'] = TableContendReward;


    // table_share_reward_new.csv
    class TableShareRewardNew {
        public type: number = 0; // 类型
        public name: string = ""; // name
        public refresh_type: number = 0; // 刷新类型（1每日2永久）
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量
        public des: string = ""; // 描述

        private static table: { [key: string]: TableShareRewardNew } = null;

        public static Table(): { [key: string]: TableShareRewardNew } {
            if (TableShareRewardNew.table == null) {
                TableShareRewardNew.table = <{ [key: string]: TableShareRewardNew }>Game.ConfigManager.getTable("table_share_reward_new.json");
                if (TableShareRewardNew.table == null) TableShareRewardNew.table = {};
            }
            return TableShareRewardNew.table;
        }

        public static Item(key: number | string): TableShareRewardNew {
            if (key == undefined || key == null) return null;
            let item = TableShareRewardNew.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableShareRewardNew'] = TableShareRewardNew;

    // server_table_sign.csv
    export class ServerTableSign {
        public id: number = 0; // 日期
        public good_id: number = 0; // 物品id
        public good_count: number = 0; // 普通物品数量
        public show_type: number = 0; // 显示类型
        public vip_level_limit: number = 0; // 双倍vip等级限制

        private static table: { [key: string]: ServerTableSign } = null;

        public static Table(): { [key: string]: ServerTableSign } {
            if (ServerTableSign.table == null) {
                ServerTableSign.table = <{ [key: string]: ServerTableSign }>Game.ConfigManager.getTable("server_table_sign.json");
                if (ServerTableSign.table == null) ServerTableSign.table = {};
            }
            return ServerTableSign.table;
        }

        public static Item(key: number | string): ServerTableSign {
            if (key == undefined || key == null) return null;
            let item = ServerTableSign.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['ServerTableSign'] = ServerTableSign;

    // table_permit_mission.csv
    export class TablePermitMission {
        public id: number = 0; // id
        public type: number = 0; // 类型
        public value: number = 0; // 条件
        public reward_goods: Array<number> = new Array<number>(); // 奖励物品
        public des: string = ""; // 描述

        private static table: { [key: string]: TablePermitMission } = null;

        public static Table(): { [key: string]: TablePermitMission } {
            if (TablePermitMission.table == null) {
                TablePermitMission.table = <{ [key: string]: TablePermitMission }>Game.ConfigManager.getTable("table_permit_mission.json");
                if (TablePermitMission.table == null) TablePermitMission.table = {};
            }
            return TablePermitMission.table;
        }

        public static Item(key: number | string): TablePermitMission {
            if (key == undefined || key == null) return null;
            let item = TablePermitMission.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePermitMission'] = TablePermitMission;


    // table_permit_reward.csv
    export class TablePermitReward {
        public id: number = 0; // id
        public level: number = 0; // 等级
        public season: number = 0; // 赛季
        public free_reward = new Array<number>(); // 免费物品
        public pay_reward = new Array<number>(); // 特殊物品

        private static table: { [key: string]: TablePermitReward } = null;

        public static Table(): { [key: string]: TablePermitReward } {
            if (TablePermitReward.table == null) {
                TablePermitReward.table = <{ [key: string]: TablePermitReward }>Game.ConfigManager.getTable("table_permit_reward.json");
                if (TablePermitReward.table == null) TablePermitReward.table = {};
            }
            return TablePermitReward.table;
        }

        public static Item(key: number | string): TablePermitReward {
            if (key == undefined || key == null) return null;
            let item = TablePermitReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TablePermitReward'] = TablePermitReward;

    // table_mission_reward.csv
    export class TableMissionReward {
        public index: number = 0; // 索引
        public condition: number = 0; // 条件
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量

        private static table: { [key: string]: TableMissionReward } = null;

        public static Table(): { [key: string]: TableMissionReward } {
            if (TableMissionReward.table == null) {
                TableMissionReward.table = <{ [key: string]: TableMissionReward }>Game.ConfigManager.getTable("table_mission_reward.json");
                if (TableMissionReward.table == null) TableMissionReward.table = {};
            }
            return TableMissionReward.table;
        }

        public static Item(key: number | string): TableMissionReward {
            if (key == undefined || key == null) return null;
            let item = TableMissionReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableMissionReward'] = TableMissionReward;


    // table_tower_rank_reward.csv
    export class TableTowerRankReward {
        public id: number = 0; // 排名
        public tower_rank_min: number = 0; // 排名区间最小值
        public towe_rank_max: number = 0; // 排名区间最大值
        public tower_rank_good_id: Array<number> = new Array<number>(); // 排名物品id
        public tower_rank_good_count: Array<number> = new Array<number>(); // 排名物品数量

        private static table: { [key: string]: TableTowerRankReward } = null;

        public static Table(): { [key: string]: TableTowerRankReward } {
            if (TableTowerRankReward.table == null) {
                TableTowerRankReward.table = <{ [key: string]: TableTowerRankReward }>Game.ConfigManager.getTable("table_tower_rank_reward.json");
                if (TableTowerRankReward.table == null) TableTowerRankReward.table = {};
            }
            return TableTowerRankReward.table;
        }

        public static Item(key: number | string): TableTowerRankReward {
            if (key == undefined || key == null) return null;
            let item = TableTowerRankReward.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableTowerRankReward'] = TableTowerRankReward;

    // table_league_skill.csv
    // 联盟技能
    export class TableLeagueSkill {
        public type: number = 0; // type
        public name: string = ""; // name
        public attri_type: number = 0; // 属性类型
        public attri_value = new Array<number>(); // 属性数值
        public consume_coin = new Array<number>(); // 消耗公会币
        public consume_money = new Array<number>(); // 消耗金币

        private static table: { [key: string]: TableLeagueSkill } = null;

        public static Table(): { [key: string]: TableLeagueSkill } {
            if (TableLeagueSkill.table == null) {
                TableLeagueSkill.table = <{ [key: string]: TableLeagueSkill }>Game.ConfigManager.getTable("table_league_skill.json");
                if (TableLeagueSkill.table == null) TableLeagueSkill.table = {};
            }
            return TableLeagueSkill.table;
        }

        public static Item(key: number | string): TableLeagueSkill {
            if (key == undefined || key == null) return null;
            let item = TableLeagueSkill.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableLeagueSkill'] = TableLeagueSkill;

    // table_continue_pay.csv
    export class TableContinuePay {
        public id: number = 0; // 天数索引
        public reward_goods = new Array<number>(); // 奖励物品
        public reward_count = new Array<number>(); // 奖励数量

        private static table: { [key: string]: TableContinuePay } = null;

        public static Table(): { [key: string]: TableContinuePay } {
            if (TableContinuePay.table == null) {
                TableContinuePay.table = <{ [key: string]: TableContinuePay }>Game.ConfigManager.getTable("table_continue_pay.json");
                if (TableContinuePay.table == null) TableContinuePay.table = {};
            }
            return TableContinuePay.table;
        }
        public static Item(key: number | string): TableContinuePay {
            if (key == undefined || key == null) return null;
            let item = TableContinuePay.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableContinuePay'] = TableContinuePay;

    // table_activity_rand_instance.csv
    export class TableActivityRandInstance {
        public instance_id: number = 0; // id
        public name: string = ""; // 活动类型
        public open_instance: number = 0; // 通关开启
        public instance_stage = new Array<number>(); // 副本包含怪物
        public reward_goods = new Array<Array<number>>(); // 通关奖励
        public battle_value: number = 0; // 推荐战力
        public battle_bg: number = 0; // 副本战斗背景id
        public feature = new Array<number>(); // 怪物特性
        public boss_roleId: number = 0; // Boss形象id（映射map_role表）
        public instance_pic1: string = ""; // 副本关卡插图（标题）
        public instance_pic2: string = ""; // 副本关卡插图（内容）

        private static table: { [key: string]: TableActivityRandInstance } = null;

        public static Table(): { [key: string]: TableActivityRandInstance } {
            if (TableActivityRandInstance.table == null) {
                TableActivityRandInstance.table = <{ [key: string]: TableActivityRandInstance }>Game.ConfigManager.getTable("table_activity_rand_instance.json");
                if (TableActivityRandInstance.table == null) TableActivityRandInstance.table = {};
            }
            return TableActivityRandInstance.table;
        }

        public static Item(key: number | string): TableActivityRandInstance {
            if (key == undefined || key == null) return null;
            let item = TableActivityRandInstance.Table()[key.toString()];
            if (item == undefined) return null;
            return item;
        }
    }
    window['TableActivityRandInstance'] = TableActivityRandInstance;
}