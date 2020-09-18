var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 策划配置文件结构定义
    // Generate by auto tools
    // 2019-01-18
    // client_potato_screen.csv
    var TableClientPotatoScreen = (function () {
        function TableClientPotatoScreen() {
            this.id = 0; // 道具编号
            this.name = ""; // 道具名字
            this.type = 0; // 是否主属性
            this.includeIds = new Array(); // 包含id
        }
        TableClientPotatoScreen.Table = function () {
            if (TableClientPotatoScreen.table == null) {
                TableClientPotatoScreen.table = zj.Game.ConfigManager.getTable("client_potato_screen.json");
                if (TableClientPotatoScreen.table == null)
                    TableClientPotatoScreen.table = {};
            }
            return TableClientPotatoScreen.table;
        };
        TableClientPotatoScreen.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientPotatoScreen.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientPotatoScreen.table = null;
        return TableClientPotatoScreen;
    }());
    zj.TableClientPotatoScreen = TableClientPotatoScreen;
    __reflect(TableClientPotatoScreen.prototype, "zj.TableClientPotatoScreen");
    window['TableClientPotatoScreen'] = TableClientPotatoScreen;
    // client_table_action_displacement.csv
    var TableClientActionDisplacement = (function () {
        function TableClientActionDisplacement() {
            this.id = 0; // 位移序列号
            this.type = 0; // 类型
            this.name = ""; // 名称
            this.num = 0; // 攻击次数
            this.time = 0; // 间隔时间
            this.continue_time = 0; // 持续时间
            this.displacement_speed = new Array(); // x、y速度
            this.displacement_acceleration = new Array(); // x、y加速度
            this.acceleration_time = 0; // 加速度时间
            this.end_pos = new Array(); // 指向位置
            this._bug = ""; // 改bug临时
        }
        TableClientActionDisplacement.Table = function () {
            if (TableClientActionDisplacement.table == null) {
                TableClientActionDisplacement.table = zj.Game.ConfigManager.getTable("client_table_action_displacement.json");
                if (TableClientActionDisplacement.table == null)
                    TableClientActionDisplacement.table = {};
            }
            return TableClientActionDisplacement.table;
        };
        TableClientActionDisplacement.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientActionDisplacement.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientActionDisplacement.table = null;
        return TableClientActionDisplacement;
    }());
    zj.TableClientActionDisplacement = TableClientActionDisplacement;
    __reflect(TableClientActionDisplacement.prototype, "zj.TableClientActionDisplacement");
    window['TableClientActionDisplacement'] = TableClientActionDisplacement;
    // client_table_ani_css_source.csv
    var TableClientAniCssSource = (function () {
        function TableClientAniCssSource() {
            this.id = 0; // 序列号
            this.name = ""; // 名称(必填)
            this.json = ""; // 路径
            this.number = 0; // 分解数量
        }
        TableClientAniCssSource.Table = function () {
            if (TableClientAniCssSource.table == null) {
                TableClientAniCssSource.table = zj.Game.ConfigManager.getTable("client_table_ani_css_source.json");
                if (TableClientAniCssSource.table == null)
                    TableClientAniCssSource.table = {};
            }
            return TableClientAniCssSource.table;
        };
        TableClientAniCssSource.Table2 = function () {
            if (TableClientAniCssSource.table2 == null) {
                var tmp = zj.Game.ConfigManager.getTable("client_table_ani_css_source.json");
                TableClientAniCssSource.table2 = {};
                for (var k in tmp) {
                    TableClientAniCssSource.table2[tmp[k].name] = tmp[k];
                }
            }
            return TableClientAniCssSource.table2;
        };
        TableClientAniCssSource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniCssSource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniCssSource.Item2 = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniCssSource.Table2()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniCssSource.table = null;
        TableClientAniCssSource.table2 = null;
        return TableClientAniCssSource;
    }());
    zj.TableClientAniCssSource = TableClientAniCssSource;
    __reflect(TableClientAniCssSource.prototype, "zj.TableClientAniCssSource");
    window['TableClientAniCssSource'] = TableClientAniCssSource;
    // client_table_ani_particle_source.csv
    var TableClientAniParticleSource = (function () {
        function TableClientAniParticleSource() {
            this.id = 0; // 序列号
            this.plist = ""; // 名称(必填)
            this.des = ""; // 备注
        }
        TableClientAniParticleSource.Table = function () {
            if (TableClientAniParticleSource.table == null) {
                TableClientAniParticleSource.table = zj.Game.ConfigManager.getTable("client_table_ani_particle_source.json");
                if (TableClientAniParticleSource.table == null)
                    TableClientAniParticleSource.table = {};
            }
            return TableClientAniParticleSource.table;
        };
        TableClientAniParticleSource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniParticleSource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniParticleSource.table = null;
        return TableClientAniParticleSource;
    }());
    zj.TableClientAniParticleSource = TableClientAniParticleSource;
    __reflect(TableClientAniParticleSource.prototype, "zj.TableClientAniParticleSource");
    window['TableClientAniParticleSource'] = TableClientAniParticleSource;
    // client_table_ani_spine_source.csv
    var TableClientAniSpineSource = (function () {
        function TableClientAniSpineSource() {
            this.id = 0; // 序列号
            this.des = ""; // 备注xx
            this.json = ""; // 路径
            this.atlas = ""; // 路径
            this.ani_name = ""; // 动画名字
            this.loop = ""; // 是否循环播放
        }
        TableClientAniSpineSource.Table = function () {
            if (TableClientAniSpineSource.table == null) {
                TableClientAniSpineSource.table = zj.Game.ConfigManager.getTable("client_table_ani_spine_source.json");
                if (TableClientAniSpineSource.table == null)
                    TableClientAniSpineSource.table = {};
            }
            return TableClientAniSpineSource.table;
        };
        TableClientAniSpineSource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniSpineSource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniSpineSource.table = null;
        return TableClientAniSpineSource;
    }());
    zj.TableClientAniSpineSource = TableClientAniSpineSource;
    __reflect(TableClientAniSpineSource.prototype, "zj.TableClientAniSpineSource");
    window['TableClientAniSpineSource'] = TableClientAniSpineSource;
    // client_table_ani_spx_source.csv
    var TableClientAniSpxSource = (function () {
        function TableClientAniSpxSource() {
            this.id = 0; // 序列号
            this.name = ""; // 名称(必填)
            this.des = ""; // 描述
            this.json = ""; // 路径
            this.number = 0; // 分解数量
            this.extra = ""; // 额外描述
            this.order = 0; // 层级
        }
        TableClientAniSpxSource.Table = function () {
            if (TableClientAniSpxSource.table == null) {
                TableClientAniSpxSource.table = zj.Game.ConfigManager.getTable("client_table_ani_spx_source.json");
                if (TableClientAniSpxSource.table == null)
                    TableClientAniSpxSource.table = {};
            }
            return TableClientAniSpxSource.table;
        };
        TableClientAniSpxSource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniSpxSource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniSpxSource.table = null;
        return TableClientAniSpxSource;
    }());
    zj.TableClientAniSpxSource = TableClientAniSpxSource;
    __reflect(TableClientAniSpxSource.prototype, "zj.TableClientAniSpxSource");
    window['TableClientAniSpxSource'] = TableClientAniSpxSource;
    // client_table_ani_ui.csv
    var TableClientAniUi = (function () {
        function TableClientAniUi() {
            this.id = 0; // 序列号
            this.css_id = 0; // 映射css_resource表的id
            this.index = 0; // 子动画序号
            this.indexes = new Array(); // 子动画序号（组合播放）
            this.blend = 0; // 混合
            this.des = ""; // 描述
            this.bones = new Array(); // 需要混合的骨骼名
        }
        TableClientAniUi.Table = function () {
            if (TableClientAniUi.table == null) {
                TableClientAniUi.table = zj.Game.ConfigManager.getTable("client_table_ani_ui.json");
                if (TableClientAniUi.table == null)
                    TableClientAniUi.table = {};
            }
            return TableClientAniUi.table;
        };
        TableClientAniUi.Table2 = function () {
            if (TableClientAniUi.table2 == null) {
                var tmp = zj.Game.ConfigManager.getTable("client_table_ani_ui.json");
                TableClientAniUi.table2 = {};
                for (var k in tmp) {
                    TableClientAniUi.table2[tmp[k].css_id + "_" + tmp[k].index] = tmp[k];
                }
            }
            return TableClientAniUi.table2;
        };
        TableClientAniUi.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniUi.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniUi.Item2 = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientAniUi.Table2()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientAniUi.table = null;
        TableClientAniUi.table2 = null;
        return TableClientAniUi;
    }());
    zj.TableClientAniUi = TableClientAniUi;
    __reflect(TableClientAniUi.prototype, "zj.TableClientAniUi");
    window['TableClientAniUi'] = TableClientAniUi;
    // client_table_bgm_resource.csv
    // 声音资源表
    var TableClientBgmResource = (function () {
        function TableClientBgmResource() {
            this.sound_id = 0; // id
            this.name = ""; // 说明
            this.sound_path = ""; // 路径
            this.sound_vol = 0; // 音量
            this.loop = 0; // 循环
        }
        TableClientBgmResource.Table = function () {
            if (TableClientBgmResource.table == null) {
                TableClientBgmResource.table = zj.Game.ConfigManager.getTable("client_table_bgm_resource.json");
                if (TableClientBgmResource.table == null)
                    TableClientBgmResource.table = {};
            }
            return TableClientBgmResource.table;
        };
        TableClientBgmResource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientBgmResource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientBgmResource.table = null;
        return TableClientBgmResource;
    }());
    zj.TableClientBgmResource = TableClientBgmResource;
    __reflect(TableClientBgmResource.prototype, "zj.TableClientBgmResource");
    window['TableClientBgmResource'] = TableClientBgmResource;
    // client_table_boss_information.csv
    // boss介绍，本地
    var TableClientBossInformation = (function () {
        function TableClientBossInformation() {
            this.information_id = 0; // information_id
            this.boss_name = ""; // Boss名称
            this.boss_name_path = ""; // Boss名称图片路径
            this.boss_mapRoleId = 0; // Boss形象id（映射map_role表）
            this.boss_aptitude = ""; // 资质图片
            this.boss_des = ""; // Boss介绍图片
        }
        TableClientBossInformation.Table = function () {
            if (TableClientBossInformation.table == null) {
                TableClientBossInformation.table = zj.Game.ConfigManager.getTable("client_table_boss_information.json");
                if (TableClientBossInformation.table == null)
                    TableClientBossInformation.table = {};
            }
            return TableClientBossInformation.table;
        };
        TableClientBossInformation.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientBossInformation.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientBossInformation.table = null;
        return TableClientBossInformation;
    }());
    zj.TableClientBossInformation = TableClientBossInformation;
    __reflect(TableClientBossInformation.prototype, "zj.TableClientBossInformation");
    window['TableClientBossInformation'] = TableClientBossInformation;
    // client_table_buff_base.csv
    var TableClientBuffBase = (function () {
        function TableClientBuffBase() {
            this.buff_id = 0; // buff唯一序列号
            this.buff_name = ""; // 名称
            this.buff_ani = 0; // 是否显示通用动画
            this.buff_ima_path = ""; // 通用图片路径
            this.spx_id = 0; // 资源序列号
            this.action_id = 0; // 行为序列号
            this.blend_active = 0; // 混合通道是否开启
            this.buff_pos = ""; // 位置
            this.ani_trigger = new Array(); // 动画触发类型
            this.word_trigger = new Array(); // 效果字触发方式
            this.buff_profit = 0; // 是不是有益buff
            this.is_fold = 0; // 是否叠加
            this.fold_number = 0; // 效果叠加上限
            this.buff_name_path = ""; // 名称路径
            this.is_showIcon = 0; // 是否显示icon
            this.is_Iconlist = 0; // 是否列表显示icon
            this.icon_path = ""; // icon路径
            this.is_foldIcon = 0; // icon叠加
            this.des = ""; // 描述
        }
        TableClientBuffBase.Table = function () {
            if (TableClientBuffBase.table == null) {
                TableClientBuffBase.table = zj.Game.ConfigManager.getTable("client_table_buff_base.json");
                if (TableClientBuffBase.table == null)
                    TableClientBuffBase.table = {};
            }
            return TableClientBuffBase.table;
        };
        TableClientBuffBase.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientBuffBase.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientBuffBase.table = null;
        return TableClientBuffBase;
    }());
    zj.TableClientBuffBase = TableClientBuffBase;
    __reflect(TableClientBuffBase.prototype, "zj.TableClientBuffBase");
    window['TableClientBuffBase'] = TableClientBuffBase;
    // client_table_consume.csv
    var TableClientConsume = (function () {
        function TableClientConsume() {
            this.index = 0; // 序号
            this.info = ""; // 说明
            this.type = 0; // 数字类型
            this.consume = ""; // 枚举类型(看协议)
            this.title = ""; // 主标题文字
            this.path = ""; // 主标题图片
            this.count = ""; // 计数文字
            this.path_count = ""; // 累计图片
            this.resource = 0; // 计数资源
            this.acount = ""; // 领取文字
        }
        TableClientConsume.Table = function () {
            if (TableClientConsume.table == null) {
                TableClientConsume.table = zj.Game.ConfigManager.getTable("client_table_consume.json");
                if (TableClientConsume.table == null)
                    TableClientConsume.table = {};
            }
            return TableClientConsume.table;
        };
        TableClientConsume.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientConsume.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientConsume.table = null;
        return TableClientConsume;
    }());
    zj.TableClientConsume = TableClientConsume;
    __reflect(TableClientConsume.prototype, "zj.TableClientConsume");
    window['TableClientConsume'] = TableClientConsume;
    // client_table_error.csv
    var TableClientError = (function () {
        function TableClientError() {
            this.id = 0; // 错误码
            this.des_default = ""; // 默认描述
            this.des_custom = ""; // 自定义描述
        }
        TableClientError.Table = function () {
            if (TableClientError.table == null) {
                TableClientError.table = zj.Game.ConfigManager.getTable("client_table_error.json");
                if (TableClientError.table == null)
                    TableClientError.table = {};
            }
            return TableClientError.table;
        };
        TableClientError.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientError.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientError.table = null;
        return TableClientError;
    }());
    zj.TableClientError = TableClientError;
    __reflect(TableClientError.prototype, "zj.TableClientError");
    window['TableClientError'] = TableClientError;
    // client_table_fight_ani_spine_source.csv
    var TableClientFightAniSpineSource = (function () {
        function TableClientFightAniSpineSource() {
            this.id = 0; // 序列号
            this.des = ""; // 备注xx（资源名称）
            this.json = ""; // 路径
            this.atlas = ""; // 路径
            this.ani_name = ""; // 动画名字
            this.loop = 0; // 是否循环播放
            this.key = 0; // 
            this.order = 0; // 
        }
        TableClientFightAniSpineSource.Table = function () {
            if (TableClientFightAniSpineSource.table == null) {
                TableClientFightAniSpineSource.table = zj.Game.ConfigManager.getTable("client_table_fight_ani_spine_source.json");
                if (TableClientFightAniSpineSource.table == null)
                    TableClientFightAniSpineSource.table = {};
            }
            return TableClientFightAniSpineSource.table;
        };
        TableClientFightAniSpineSource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientFightAniSpineSource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientFightAniSpineSource.table = null;
        return TableClientFightAniSpineSource;
    }());
    zj.TableClientFightAniSpineSource = TableClientFightAniSpineSource;
    __reflect(TableClientFightAniSpineSource.prototype, "zj.TableClientFightAniSpineSource");
    window['TableClientFightAniSpineSource'] = TableClientFightAniSpineSource;
    // client_table_fight_combo.csv
    // 连击表
    var TableClientFightCombo = (function () {
        function TableClientFightCombo() {
            this.combo_lv = 0; // 连击等级
            this.combo_des = ""; // 连击备注
            this.combo_condition = 0; // 连击触发条件时机
            this.buff_id = 0; // buff序列号
            this.buff_lv = 0; // buff等级
        }
        TableClientFightCombo.Table = function () {
            if (TableClientFightCombo.table == null) {
                TableClientFightCombo.table = zj.Game.ConfigManager.getTable("client_table_fight_combo.json");
                if (TableClientFightCombo.table == null)
                    TableClientFightCombo.table = {};
            }
            return TableClientFightCombo.table;
        };
        TableClientFightCombo.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientFightCombo.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientFightCombo.table = null;
        return TableClientFightCombo;
    }());
    zj.TableClientFightCombo = TableClientFightCombo;
    __reflect(TableClientFightCombo.prototype, "zj.TableClientFightCombo");
    window['TableClientFightCombo'] = TableClientFightCombo;
    // client_table_get_prop.csv
    // 产出表
    var TableClientGetProp = (function () {
        function TableClientGetProp() {
            this.index = 0; // 获取类型
            this.name = ""; // 获取途径名称
            this.info = ""; // 其他提示
            this.path = ""; // 图标
            this.open = ""; // 未开启提示
            this.skip = ""; // 是否跳转(避免逻辑错误)
        }
        TableClientGetProp.Table = function () {
            if (TableClientGetProp.table == null) {
                TableClientGetProp.table = zj.Game.ConfigManager.getTable("client_table_get_prop.json");
                if (TableClientGetProp.table == null)
                    TableClientGetProp.table = {};
            }
            return TableClientGetProp.table;
        };
        TableClientGetProp.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientGetProp.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientGetProp.table = null;
        return TableClientGetProp;
    }());
    zj.TableClientGetProp = TableClientGetProp;
    __reflect(TableClientGetProp.prototype, "zj.TableClientGetProp");
    window['TableClientGetProp'] = TableClientGetProp;
    // client_table_help.csv
    var TableClientHelp = (function () {
        function TableClientHelp() {
            this.id = 0; // 序号
            this.path = ""; // 图片路径
            this.title = ""; // 标题
            this.des = ""; // 内容
        }
        TableClientHelp.Table = function () {
            if (TableClientHelp.table == null) {
                TableClientHelp.table = zj.Game.ConfigManager.getTable("client_table_help.json");
                if (TableClientHelp.table == null)
                    TableClientHelp.table = {};
            }
            return TableClientHelp.table;
        };
        TableClientHelp.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientHelp.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientHelp.table = null;
        return TableClientHelp;
    }());
    zj.TableClientHelp = TableClientHelp;
    __reflect(TableClientHelp.prototype, "zj.TableClientHelp");
    window['TableClientHelp'] = TableClientHelp;
    // client_table_help_big_type.csv
    var TableClientHelpBigType = (function () {
        function TableClientHelpBigType() {
            this.big_id = 0; // 大类id
            this.name = ""; // 名字
            this.path = ""; // 图片路径
            this.small_ids = new Array(); // 包含小类
        }
        TableClientHelpBigType.Table = function () {
            if (TableClientHelpBigType.table == null) {
                TableClientHelpBigType.table = zj.Game.ConfigManager.getTable("client_table_help_big_type.json");
                if (TableClientHelpBigType.table == null)
                    TableClientHelpBigType.table = {};
            }
            return TableClientHelpBigType.table;
        };
        TableClientHelpBigType.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientHelpBigType.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientHelpBigType.table = null;
        return TableClientHelpBigType;
    }());
    zj.TableClientHelpBigType = TableClientHelpBigType;
    __reflect(TableClientHelpBigType.prototype, "zj.TableClientHelpBigType");
    window['TableClientHelpBigType'] = TableClientHelpBigType;
    // client_table_help_small_type.csv
    var TableClientHelpSmallType = (function () {
        function TableClientHelpSmallType() {
            this.small_id = 0; // 小类id
            this.help_id = ""; // 名字
            this.path = ""; // 图片路径
            this.help_ids = new Array(); // 包含信息
        }
        TableClientHelpSmallType.Table = function () {
            if (TableClientHelpSmallType.table == null) {
                TableClientHelpSmallType.table = zj.Game.ConfigManager.getTable("client_table_help_small_type.json");
                if (TableClientHelpSmallType.table == null)
                    TableClientHelpSmallType.table = {};
            }
            return TableClientHelpSmallType.table;
        };
        TableClientHelpSmallType.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientHelpSmallType.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientHelpSmallType.table = null;
        return TableClientHelpSmallType;
    }());
    zj.TableClientHelpSmallType = TableClientHelpSmallType;
    __reflect(TableClientHelpSmallType.prototype, "zj.TableClientHelpSmallType");
    window['TableClientHelpSmallType'] = TableClientHelpSmallType;
    // client_table_hurt_displacement.csv
    var TableClientHurtDisplacement = (function () {
        function TableClientHurtDisplacement() {
            this.id = 0; // 位移序列号
            this.type = 0; // 类型
            this.name = ""; // 名称
            this.num = ""; // 攻击次数
            this.time = 0; // 间隔时间
            this.continue_time = 0; // 持续时间
            this.displacement_speed = new Array(); // x、y速度
            this.displacement_acceleration = new Array(); // x、y加速度
            this.acceleration_time = 0; // 加速度时间
            this.end_pos = new Array(); // 指向位置
            this._bug = ""; // 改bug临时
        }
        TableClientHurtDisplacement.Table = function () {
            if (TableClientHurtDisplacement.table == null) {
                TableClientHurtDisplacement.table = zj.Game.ConfigManager.getTable("client_table_hurt_displacement.json");
                if (TableClientHurtDisplacement.table == null)
                    TableClientHurtDisplacement.table = {};
            }
            return TableClientHurtDisplacement.table;
        };
        TableClientHurtDisplacement.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientHurtDisplacement.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientHurtDisplacement.table = null;
        return TableClientHurtDisplacement;
    }());
    zj.TableClientHurtDisplacement = TableClientHurtDisplacement;
    __reflect(TableClientHurtDisplacement.prototype, "zj.TableClientHurtDisplacement");
    window['TableClientHurtDisplacement'] = TableClientHurtDisplacement;
    // client_table_league_animal_chat.csv
    // 联盟异兽对话表
    var TableClientLeagueAnimalChat = (function () {
        function TableClientLeagueAnimalChat() {
            this.chat_id = 0; // uid
            this.chat_des = ""; // 文本
        }
        TableClientLeagueAnimalChat.Table = function () {
            if (TableClientLeagueAnimalChat.table == null) {
                TableClientLeagueAnimalChat.table = zj.Game.ConfigManager.getTable("client_table_league_animal_chat.json");
                if (TableClientLeagueAnimalChat.table == null)
                    TableClientLeagueAnimalChat.table = {};
            }
            return TableClientLeagueAnimalChat.table;
        };
        TableClientLeagueAnimalChat.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientLeagueAnimalChat.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientLeagueAnimalChat.table = null;
        return TableClientLeagueAnimalChat;
    }());
    zj.TableClientLeagueAnimalChat = TableClientLeagueAnimalChat;
    __reflect(TableClientLeagueAnimalChat.prototype, "zj.TableClientLeagueAnimalChat");
    window['TableClientLeagueAnimalChat'] = TableClientLeagueAnimalChat;
    // client_table_log.csv
    var TableClientLog = (function () {
        function TableClientLog() {
            this.id = 0; // 日志类型
            this.type = 0; // 日志显示位置(1联盟日志2异兽日志3联盟副本4副本伤害)
            this.type_des = ""; // 类型描述
            this.count = 0; // 描述数量
            this.des_0 = ""; // 描述
            this.des_1 = ""; // 
            this.des_2 = ""; // 
            this.des_3 = ""; // 
        }
        TableClientLog.Table = function () {
            if (TableClientLog.table == null) {
                TableClientLog.table = zj.Game.ConfigManager.getTable("client_table_log.json");
                if (TableClientLog.table == null)
                    TableClientLog.table = {};
            }
            return TableClientLog.table;
        };
        TableClientLog.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientLog.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientLog.table = null;
        return TableClientLog;
    }());
    zj.TableClientLog = TableClientLog;
    __reflect(TableClientLog.prototype, "zj.TableClientLog");
    window['TableClientLog'] = TableClientLog;
    // client_table_map_ai.csv
    var TableClientMapAi = (function () {
        function TableClientMapAi() {
            this.id = 0; // 序列号
            this.common_param = new Array(); // 普攻ai参数
            this.skill_param = new Array(); // 小技能ai参数
            this.death_param = new Array(); // 必杀技ai参数
        }
        TableClientMapAi.Table = function () {
            if (TableClientMapAi.table == null) {
                TableClientMapAi.table = zj.Game.ConfigManager.getTable("client_table_map_ai.json");
                if (TableClientMapAi.table == null)
                    TableClientMapAi.table = {};
            }
            return TableClientMapAi.table;
        };
        TableClientMapAi.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientMapAi.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientMapAi.table = null;
        return TableClientMapAi;
    }());
    zj.TableClientMapAi = TableClientMapAi;
    __reflect(TableClientMapAi.prototype, "zj.TableClientMapAi");
    window['TableClientMapAi'] = TableClientMapAi;
    // client_table_map_bg.csv
    var TableClientMapBg = (function () {
        function TableClientMapBg() {
            this.id = 0; // id
            this.res_id = 0; // res_id
            this.close_posy = 0; // close_posy
            this.group_posy = 0; // group_posy
            this.mid1_posy = 0; // mid1_posy
            this.mid2_posy = 0; // mid2_posy
            this.far_posy = 0; // far_posy
            this.close_v = new Array(); // close_v
            this.group_v = new Array(); // group_v
            this.mid1_v = new Array(); // mid1_v
            this.mid2_v = new Array(); // mid2_v
            this.far_v = new Array(); // far_v
            this.far1_v = new Array(); // far1_v
            this.far2_v = new Array(); // far2_v
            this.config = ""; // config
            this.des = ""; // 描述
            this.scroll = 0; // 是否滚动
        }
        TableClientMapBg.Table = function () {
            if (TableClientMapBg.table == null) {
                TableClientMapBg.table = zj.Game.ConfigManager.getTable("client_table_map_bg.json");
                if (TableClientMapBg.table == null)
                    TableClientMapBg.table = {};
            }
            return TableClientMapBg.table;
        };
        TableClientMapBg.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientMapBg.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientMapBg.table = null;
        return TableClientMapBg;
    }());
    zj.TableClientMapBg = TableClientMapBg;
    __reflect(TableClientMapBg.prototype, "zj.TableClientMapBg");
    window['TableClientMapBg'] = TableClientMapBg;
    // client_table_monsterLocal.csv
    // 怪，本地
    var TableClientMonsterLocal = (function () {
        function TableClientMonsterLocal() {
            this.monster_id = 0; // 怪物id
            this.des = ""; // 填表说明
            this.monster_roleId = 0; // 映射mapRoleId
            this.monster_name = ""; // 怪物名称
            this.role_type = 0; // 形态
            this.real_general = 0; // 对应真实武将id
            this.monster_profession = 0; // 职业(1-步兵近战，2-弓箭手，3-法师)
            this.monster_level = 0; // 怪物等级
            this.monster_star = 0; // 怪物星级
            this.monster_step = 0; // 怪物阶数
            this.help_bg = 0; // 援护背景
            this.floor_offset = 0; // 相对于地板偏移值
            this.father_ratio = 0; // 召唤怪继承父类属性百分比
            this.call_time = 0; // 怪物基础存活时间
            this.skill_ids = new Array(); // 技能Id
            this.skill_levels = new Array(); // 技能等级
            this.talent_ids = new Array(); // 天赋ids
            this.talent_levels = new Array(); // 天赋等级
            this.hide_talent_ids = 0; // 隐藏天赋
            this.pve_ai = 0; // pve_ai
            this.pvp_ai = 0; // pvp_ai
            this.bean_max = 0; // 最大攒豆数
            this.monster_rage = 0; // 怒气值
            this.monster_hp = 0; // 生命值
            this.monster_atk = 0; // 攻击
            this.monster_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴击伤害
            this.crit_resistance = 0; // 暴击抵抗
            this.ignore_phyDef = 0; // 忽视防御
            this.cd_speed = 0; // 速度
            this.dodge_rate = 0; // 格挡率
            this.hit_rate = 0; // 忽视格挡
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.stiff_resistance = 0; // 硬直抵抗
            this.float_resistance = 0; // 浮空抗性
            this.rage_reduce = 0; // 怒气减少
            this.support_consume = 0; // 作为援护出场所需怒气值
            this.general_atk_all = 0; // 攻击
            this.general_def_all = 0; // 防御
            this.all_crit = 0; // 暴击
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_crit = 0; // 技能暴击
            this.final_extra = 0; // 终极附加
            this.final_reduce = 0; // 终极减免
            this.ignore_magicDef = 0; // 忽视魔防
            this.sacred_atk = 0; // 神圣攻击
            this.sacred_def = 0; // 神圣防御
            this.sacred_crit = 0; // 神圣暴击
            this.ignore_sacredDef = 0; // 忽视神防
            this.get_up_time = 0; // 起身时间
            this.is_stir_up = 0; // 是否能被挑起
            this.stir_up_resistance = 0; // 挑起抵抗
            this.stir_again_def = 0; // 再次挑起抵抗
            this.is_gravity = 0; // 是否受重力影响
            this.move_speed = 0; // 移动速度
            this.name_pic = ""; // 名字图片
        }
        TableClientMonsterLocal.Table = function () {
            if (TableClientMonsterLocal.table == null) {
                TableClientMonsterLocal.table = zj.Game.ConfigManager.getTable("client_table_monsterLocal.json");
                if (TableClientMonsterLocal.table == null)
                    TableClientMonsterLocal.table = {};
            }
            return TableClientMonsterLocal.table;
        };
        TableClientMonsterLocal.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientMonsterLocal.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientMonsterLocal.table = null;
        return TableClientMonsterLocal;
    }());
    zj.TableClientMonsterLocal = TableClientMonsterLocal;
    __reflect(TableClientMonsterLocal.prototype, "zj.TableClientMonsterLocal");
    window['TableClientMonsterLocal'] = TableClientMonsterLocal;
    // client_table_monthgift_index.csv
    // 新礼包索引
    var TableClientMonthgiftIndex = (function () {
        function TableClientMonthgiftIndex() {
            this.index = 0; // 索引
            this.name = ""; // 名字
            this.pic = ""; // 图片
            this.name_path = ""; // 名字图片
        }
        TableClientMonthgiftIndex.Table = function () {
            if (TableClientMonthgiftIndex.table == null) {
                TableClientMonthgiftIndex.table = zj.Game.ConfigManager.getTable("client_table_monthgift_index.json");
                if (TableClientMonthgiftIndex.table == null)
                    TableClientMonthgiftIndex.table = {};
            }
            return TableClientMonthgiftIndex.table;
        };
        TableClientMonthgiftIndex.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientMonthgiftIndex.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientMonthgiftIndex.table = null;
        return TableClientMonthgiftIndex;
    }());
    zj.TableClientMonthgiftIndex = TableClientMonthgiftIndex;
    __reflect(TableClientMonthgiftIndex.prototype, "zj.TableClientMonthgiftIndex");
    window['TableClientMonthgiftIndex'] = TableClientMonthgiftIndex;
    // client_table_msg.csv
    var TableClientMsg = (function () {
        function TableClientMsg() {
            this.id = 0; // 
            this.name = ""; // 
            this.loadFunc = ""; // 
            this.requestTag = 0; // 
        }
        TableClientMsg.Table = function () {
            if (TableClientMsg.table == null) {
                TableClientMsg.table = zj.Game.ConfigManager.getTable("client_table_msg.json");
                if (TableClientMsg.table == null)
                    TableClientMsg.table = {};
            }
            return TableClientMsg.table;
        };
        TableClientMsg.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientMsg.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientMsg.table = null;
        return TableClientMsg;
    }());
    zj.TableClientMsg = TableClientMsg;
    __reflect(TableClientMsg.prototype, "zj.TableClientMsg");
    window['TableClientMsg'] = TableClientMsg;
    // client_table_npc.csv
    // npc动画
    var TableClientNpc = (function () {
        function TableClientNpc() {
            this.id = 0; // 序列号（配到主线表里）
            this.npc = 0; // NPC名字
            this.spineId = 0; // 骨骼号
            this.aniName = 0; // 骨骼动画名称
            this.aniScale = 0; // 缩放比例
            this.aniPath = 0; // 静态图片
            this.icon = 0; // 头像
        }
        TableClientNpc.Table = function () {
            if (TableClientNpc.table == null) {
                TableClientNpc.table = zj.Game.ConfigManager.getTable("client_table_npc.json");
                if (TableClientNpc.table == null)
                    TableClientNpc.table = {};
            }
            return TableClientNpc.table;
        };
        TableClientNpc.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientNpc.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientNpc.table = null;
        return TableClientNpc;
    }());
    zj.TableClientNpc = TableClientNpc;
    __reflect(TableClientNpc.prototype, "zj.TableClientNpc");
    window['TableClientNpc'] = TableClientNpc;
    // client_table_power_level.csv
    // 结算表
    var TableClientPowerLevel = (function () {
        function TableClientPowerLevel() {
            this.level = 0; // 等级
            this.general_count = 0; // 武将数量
            this.general_level = 0; // 武将等级
            this.general_step = 0; // 武将进阶
            this.equip_level = 0; // 装备强化
            this.skill_level = 0; // 技能平均等级
            this.equip_forge = 0; // 装备锻造
            this.general_star = 0; // 武将星级
            this.equip_carve = 0; // 刻印等级
            this.card_num = 0; // 卡片数量
            this.animal_level = 0; // 念兽等级（单个念兽）
        }
        TableClientPowerLevel.Table = function () {
            if (TableClientPowerLevel.table == null) {
                TableClientPowerLevel.table = zj.Game.ConfigManager.getTable("client_table_power_level.json");
                if (TableClientPowerLevel.table == null)
                    TableClientPowerLevel.table = {};
            }
            return TableClientPowerLevel.table;
        };
        TableClientPowerLevel.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientPowerLevel.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientPowerLevel.table = null;
        return TableClientPowerLevel;
    }());
    zj.TableClientPowerLevel = TableClientPowerLevel;
    __reflect(TableClientPowerLevel.prototype, "zj.TableClientPowerLevel");
    window['TableClientPowerLevel'] = TableClientPowerLevel;
    // client_table_randomFamilyName.csv
    var TableClientRandomFamilyName = (function () {
        function TableClientRandomFamilyName() {
            this.id = 0; // 索引
            this.family_name = ""; // 姓氏
        }
        TableClientRandomFamilyName.Table = function () {
            if (TableClientRandomFamilyName.table == null) {
                TableClientRandomFamilyName.table = zj.Game.ConfigManager.getTable("client_table_randomFamilyName.json");
                if (TableClientRandomFamilyName.table == null)
                    TableClientRandomFamilyName.table = {};
            }
            return TableClientRandomFamilyName.table;
        };
        TableClientRandomFamilyName.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientRandomFamilyName.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientRandomFamilyName.table = null;
        return TableClientRandomFamilyName;
    }());
    zj.TableClientRandomFamilyName = TableClientRandomFamilyName;
    __reflect(TableClientRandomFamilyName.prototype, "zj.TableClientRandomFamilyName");
    window['TableClientRandomFamilyName'] = TableClientRandomFamilyName;
    // client_table_randomLoading.csv
    var TableClientRandomLoading = (function () {
        function TableClientRandomLoading() {
            this.id = 0; // 索引
            this.bg = ""; // 背景图
            this.text = ""; // 文字图
        }
        TableClientRandomLoading.Table = function () {
            if (TableClientRandomLoading.table == null) {
                TableClientRandomLoading.table = zj.Game.ConfigManager.getTable("client_table_randomLoading.json");
                if (TableClientRandomLoading.table == null)
                    TableClientRandomLoading.table = {};
            }
            return TableClientRandomLoading.table;
        };
        TableClientRandomLoading.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientRandomLoading.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientRandomLoading.table = null;
        return TableClientRandomLoading;
    }());
    zj.TableClientRandomLoading = TableClientRandomLoading;
    __reflect(TableClientRandomLoading.prototype, "zj.TableClientRandomLoading");
    window['TableClientRandomLoading'] = TableClientRandomLoading;
    // client_table_randomName.csv
    var TableClientRandomName = (function () {
        function TableClientRandomName() {
            this.id = 0; // 索引
            this.name = ""; // 名字
        }
        TableClientRandomName.Table = function () {
            if (TableClientRandomName.table == null) {
                TableClientRandomName.table = zj.Game.ConfigManager.getTable("client_table_randomName.json");
                if (TableClientRandomName.table == null)
                    TableClientRandomName.table = {};
            }
            return TableClientRandomName.table;
        };
        TableClientRandomName.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientRandomName.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientRandomName.table = null;
        return TableClientRandomName;
    }());
    zj.TableClientRandomName = TableClientRandomName;
    __reflect(TableClientRandomName.prototype, "zj.TableClientRandomName");
    window['TableClientRandomName'] = TableClientRandomName;
    // client_table_randomTips.csv
    var TableClientRandomTips = (function () {
        function TableClientRandomTips() {
            this.id = 0; // 索引
            this.level = 0; // 君主等级
            this.des = ""; // 提示
        }
        TableClientRandomTips.Table = function () {
            if (TableClientRandomTips.table == null) {
                TableClientRandomTips.table = zj.Game.ConfigManager.getTable("client_table_randomTips.json");
                if (TableClientRandomTips.table == null)
                    TableClientRandomTips.table = {};
            }
            return TableClientRandomTips.table;
        };
        TableClientRandomTips.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientRandomTips.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientRandomTips.table = null;
        return TableClientRandomTips;
    }());
    zj.TableClientRandomTips = TableClientRandomTips;
    __reflect(TableClientRandomTips.prototype, "zj.TableClientRandomTips");
    window['TableClientRandomTips'] = TableClientRandomTips;
    // client_table_skill_displacement.csv
    var TableClientSkillDisplacement = (function () {
        function TableClientSkillDisplacement() {
            this.id = 0; // 位移序列号
            this.type = 0; // 类型
            this.name = ""; // 名称
            this.num = 0; // 攻击次数
            this.time = 0; // 间隔时间
            this.continue_time = 0; // 持续时间
            this.displacement_speed = new Array(); // x、y速度
            this.displacement_acceleration = new Array(); // x、y加速度
            this.acceleration_time = 0; // 加速度时间
            this.end_pos = new Array(); // 指向位置
            this._bug = ""; // 改bug临时
        }
        TableClientSkillDisplacement.Table = function () {
            if (TableClientSkillDisplacement.table == null) {
                TableClientSkillDisplacement.table = zj.Game.ConfigManager.getTable("client_table_skill_displacement.json");
                if (TableClientSkillDisplacement.table == null)
                    TableClientSkillDisplacement.table = {};
            }
            return TableClientSkillDisplacement.table;
        };
        TableClientSkillDisplacement.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientSkillDisplacement.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientSkillDisplacement.table = null;
        return TableClientSkillDisplacement;
    }());
    zj.TableClientSkillDisplacement = TableClientSkillDisplacement;
    __reflect(TableClientSkillDisplacement.prototype, "zj.TableClientSkillDisplacement");
    window['TableClientSkillDisplacement'] = TableClientSkillDisplacement;
    // client_table_skill_hiteffect.csv
    var TableClientSkillHiteffect = (function () {
        function TableClientSkillHiteffect() {
            this.id = 0; // 击中特效序列号
            this.des = ""; // 备注xx（资源名称）
            this.effects_spx_id = 0; // 资源序列号
            this.effects_action_id = 0; // 行为序列号
            this.play_speed = 0; // 特效播放速度(默认读的面板里的值)
            this.blend_active = 0; // 
        }
        TableClientSkillHiteffect.Table = function () {
            if (TableClientSkillHiteffect.table == null) {
                TableClientSkillHiteffect.table = zj.Game.ConfigManager.getTable("client_table_skill_hiteffect.json");
                if (TableClientSkillHiteffect.table == null)
                    TableClientSkillHiteffect.table = {};
            }
            return TableClientSkillHiteffect.table;
        };
        TableClientSkillHiteffect.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientSkillHiteffect.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientSkillHiteffect.table = null;
        return TableClientSkillHiteffect;
    }());
    zj.TableClientSkillHiteffect = TableClientSkillHiteffect;
    __reflect(TableClientSkillHiteffect.prototype, "zj.TableClientSkillHiteffect");
    window['TableClientSkillHiteffect'] = TableClientSkillHiteffect;
    // client_table_skill_particle.csv
    var TableClientSkillParticle = (function () {
        function TableClientSkillParticle() {
            this.id = 0; // 特效序列号
            this.source_id = 0; // 粒子资源id
            this.play_pos = new Array(); // 粒子播放位置
            this.flip_x = 0; // 左右不同是否翻转
            this.play_time = 0; // 播放时长
            this.blend_active = 0; // 混合通道
            this.scale = new Array(); // 压缩比例(X|Y)
        }
        TableClientSkillParticle.Table = function () {
            if (TableClientSkillParticle.table == null) {
                TableClientSkillParticle.table = zj.Game.ConfigManager.getTable("client_table_skill_particle.json");
                if (TableClientSkillParticle.table == null)
                    TableClientSkillParticle.table = {};
            }
            return TableClientSkillParticle.table;
        };
        TableClientSkillParticle.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientSkillParticle.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientSkillParticle.table = null;
        return TableClientSkillParticle;
    }());
    zj.TableClientSkillParticle = TableClientSkillParticle;
    __reflect(TableClientSkillParticle.prototype, "zj.TableClientSkillParticle");
    window['TableClientSkillParticle'] = TableClientSkillParticle;
    // client_table_skill_shake.csv
    var TableClientSkillShake = (function () {
        function TableClientSkillShake() {
            this.id = 0; // 震动序列号
            this.des = ""; // 备注xx（资源名称）
            this.screen_shake_frame = 0; // 屏幕抖动时间
            this.range_x = new Array(); // x抖动范围
            this.range_y = new Array(); // y抖动范围
        }
        TableClientSkillShake.Table = function () {
            if (TableClientSkillShake.table == null) {
                TableClientSkillShake.table = zj.Game.ConfigManager.getTable("client_table_skill_shake.json");
                if (TableClientSkillShake.table == null)
                    TableClientSkillShake.table = {};
            }
            return TableClientSkillShake.table;
        };
        TableClientSkillShake.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientSkillShake.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientSkillShake.table = null;
        return TableClientSkillShake;
    }());
    zj.TableClientSkillShake = TableClientSkillShake;
    __reflect(TableClientSkillShake.prototype, "zj.TableClientSkillShake");
    window['TableClientSkillShake'] = TableClientSkillShake;
    // client_table_skill_step.csv
    var TableClientSkillStep = (function () {
        function TableClientSkillStep() {
            this.skill_step_id = 0; // 形态序列号
            this.skill_step_form = new Array(); // 形态所含技能单元
        }
        TableClientSkillStep.Table = function () {
            if (TableClientSkillStep.table == null) {
                TableClientSkillStep.table = zj.Game.ConfigManager.getTable("client_table_skill_step.json");
                if (TableClientSkillStep.table == null)
                    TableClientSkillStep.table = {};
            }
            return TableClientSkillStep.table;
        };
        TableClientSkillStep.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientSkillStep.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientSkillStep.table = null;
        return TableClientSkillStep;
    }());
    zj.TableClientSkillStep = TableClientSkillStep;
    __reflect(TableClientSkillStep.prototype, "zj.TableClientSkillStep");
    window['TableClientSkillStep'] = TableClientSkillStep;
    // client_table_sound_resource.csv
    // 声音资源表
    var TableClientSoundResource = (function () {
        function TableClientSoundResource() {
            this.sound_id = 0; // id
            this.name = ""; // 说明
            this.sound_path = ""; // 路径
            this.sound_type = 0; // 类型
            this.des = ""; // 描述
            this.add = ""; // 是否已添加
            this.vol = 0; // 音量
        }
        TableClientSoundResource.Table = function () {
            if (TableClientSoundResource.table == null) {
                TableClientSoundResource.table = zj.Game.ConfigManager.getTable("client_table_sound_resource.json");
                if (TableClientSoundResource.table == null)
                    TableClientSoundResource.table = {};
            }
            return TableClientSoundResource.table;
        };
        TableClientSoundResource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientSoundResource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientSoundResource.table = null;
        return TableClientSoundResource;
    }());
    zj.TableClientSoundResource = TableClientSoundResource;
    __reflect(TableClientSoundResource.prototype, "zj.TableClientSoundResource");
    window['TableClientSoundResource'] = TableClientSoundResource;
    // client_table_story.xlsx
    var TableClientTableStory = (function () {
        function TableClientTableStory() {
            this.id = ""; // id
            this.step = 0; // 剧情出现的阶段
            this.idx = 0; // 对话索引
            this.type = 0; // 类型
            this.spine = 0; // 人物spine ID
            this.action = ""; // spine的动作
            this.scale = 0; // spine的缩放
            this.flip = 0; // 是否翻转
            this.direction = 0; // 头像位置
            this.name = ""; // 人物名字
            this.sound = 0; // 音乐
            this.content = ""; // 文字内容
        }
        TableClientTableStory.Table = function () {
            if (TableClientTableStory.table == null) {
                TableClientTableStory.table = zj.Game.ConfigManager.getTable("client_table_story.json");
                if (TableClientTableStory.table == null)
                    TableClientTableStory.table = {};
            }
            return TableClientTableStory.table;
        };
        TableClientTableStory.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientTableStory.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientTableStory.table = null;
        return TableClientTableStory;
    }());
    zj.TableClientTableStory = TableClientTableStory;
    __reflect(TableClientTableStory.prototype, "zj.TableClientTableStory");
    window['TableClientTableStory'] = TableClientTableStory;
    // client_table_story_teach.csv
    // 教学关卡配置
    var TableClientStoryTeach = (function () {
        function TableClientStoryTeach() {
            this.id = 0; // 索引
            this.des = ""; // 描述
            this.dialog = ""; // 对话内容（调时间参考用）
            this.costTime = 0; // 该过程持续的时间
            this.time = 0; // 触发时间
            this.pos = ""; // 屏幕位置（左、右）
            this.role = ""; // 角色名
            this.event = 0; // 事件类型（enumEvent）
            this.fightPos = ""; // 战斗位置
            this.coverPos = ""; // 补位位置
            this.appearPos = ""; // 闪现位置
            this.skillIndex = ""; // 技能
            this.rolehead = 0; // 是否显示必杀头像
        }
        TableClientStoryTeach.Table = function () {
            if (TableClientStoryTeach.table == null) {
                TableClientStoryTeach.table = zj.Game.ConfigManager.getTable("client_table_story_teach.json");
                if (TableClientStoryTeach.table == null)
                    TableClientStoryTeach.table = {};
            }
            return TableClientStoryTeach.table;
        };
        TableClientStoryTeach.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientStoryTeach.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientStoryTeach.table = null;
        return TableClientStoryTeach;
    }());
    zj.TableClientStoryTeach = TableClientStoryTeach;
    __reflect(TableClientStoryTeach.prototype, "zj.TableClientStoryTeach");
    window['TableClientStoryTeach'] = TableClientStoryTeach;
    // client_table_teach_cartoon.csv
    var TableClientTeachCartoon = (function () {
        function TableClientTeachCartoon() {
            this.id = 0; // id
            this.des = ""; // 描述
            this.pic_path = ""; // 图片路径
            this.pic_time = 0; // 图片显示时间
            this.pic_speed = 0; // 图片运行速度
            this.pic_opacity_time1 = 0; // 图片淡入时间
            this.pic_opacity_time2 = 0; // 图片淡出时间
            this.pic_opacity = 0; // 图片初始透明度
            this.pic_direction = 0; // 图片运行方向（1上，2下，3左，4右）
            this.text_delayTime = 0; // 文字延迟出现时间
            this.text_info = ""; // 文本内容
            this.graph = 0; // 幕
            this.pic_direction2 = 0; // 是否有其他方向
            this.music = 0; // 音乐
        }
        TableClientTeachCartoon.Table = function () {
            if (TableClientTeachCartoon.table == null) {
                TableClientTeachCartoon.table = zj.Game.ConfigManager.getTable("client_table_teach_cartoon.json");
                if (TableClientTeachCartoon.table == null)
                    TableClientTeachCartoon.table = {};
            }
            return TableClientTeachCartoon.table;
        };
        TableClientTeachCartoon.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientTeachCartoon.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientTeachCartoon.table = null;
        return TableClientTeachCartoon;
    }());
    zj.TableClientTeachCartoon = TableClientTeachCartoon;
    __reflect(TableClientTeachCartoon.prototype, "zj.TableClientTeachCartoon");
    window['TableClientTeachCartoon'] = TableClientTeachCartoon;
    // client_table_ui_rule.csv
    // 规则说明
    var TableClientUiRule = (function () {
        function TableClientUiRule() {
            this.index = 0; // 
            this.ui = ""; // 界面
            this.rule = ""; // 规则
            this.rule1 = ""; // 规则1
            this.rule2 = ""; // 规则2
            this.rule3 = ""; // 规则3
            this.rule4 = ""; // 规则4
            this.rule5 = ""; // 规则5
            this.rule6 = ""; // 规则6
            this.rule7 = ""; // 规则7
            this.rule8 = ""; // 规则8
            this.rule9 = ""; // 规则9
            this.rule10 = ""; // 规则10
        }
        TableClientUiRule.Table = function () {
            if (TableClientUiRule.table == null) {
                TableClientUiRule.table = zj.Game.ConfigManager.getTable("client_table_ui_rule.json");
                if (TableClientUiRule.table == null)
                    TableClientUiRule.table = {};
            }
            return TableClientUiRule.table;
        };
        TableClientUiRule.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientUiRule.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientUiRule.table = null;
        return TableClientUiRule;
    }());
    zj.TableClientUiRule = TableClientUiRule;
    __reflect(TableClientUiRule.prototype, "zj.TableClientUiRule");
    window['TableClientUiRule'] = TableClientUiRule;
    // client_table_ui_talk.csv
    // npc文字
    var TableClientUiTalk = (function () {
        function TableClientUiTalk() {
            this.index = 0; // 序号
            this.npc = ""; // npc
            this.ui = ""; // 界面
            this.pop = 0; // 弹出
            this.dialog = new Array(); // 对话
            this.other = ""; // 其他
        }
        TableClientUiTalk.Table = function () {
            if (TableClientUiTalk.table == null) {
                TableClientUiTalk.table = zj.Game.ConfigManager.getTable("client_table_ui_talk.json");
                if (TableClientUiTalk.table == null)
                    TableClientUiTalk.table = {};
            }
            return TableClientUiTalk.table;
        };
        TableClientUiTalk.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientUiTalk.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientUiTalk.table = null;
        return TableClientUiTalk;
    }());
    zj.TableClientUiTalk = TableClientUiTalk;
    __reflect(TableClientUiTalk.prototype, "zj.TableClientUiTalk");
    window['TableClientUiTalk'] = TableClientUiTalk;
    // client_table_wanted_mobs_feature.csv
    // 通缉令怪物特性
    var TableClientWantedMobsFeature = (function () {
        function TableClientWantedMobsFeature() {
            this.id = 0; // 编号Id
            this.name = ""; // 名称
            this.quality = 0; // 天赋品质
            this.des = ""; // 描述
            this.path = ""; // 图片路径
        }
        TableClientWantedMobsFeature.Table = function () {
            if (TableClientWantedMobsFeature.table == null) {
                TableClientWantedMobsFeature.table = zj.Game.ConfigManager.getTable("client_table_wanted_mobs_feature.json");
                if (TableClientWantedMobsFeature.table == null)
                    TableClientWantedMobsFeature.table = {};
            }
            return TableClientWantedMobsFeature.table;
        };
        TableClientWantedMobsFeature.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientWantedMobsFeature.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientWantedMobsFeature.table = null;
        return TableClientWantedMobsFeature;
    }());
    zj.TableClientWantedMobsFeature = TableClientWantedMobsFeature;
    __reflect(TableClientWantedMobsFeature.prototype, "zj.TableClientWantedMobsFeature");
    window['TableClientWantedMobsFeature'] = TableClientWantedMobsFeature;
    // client_table_world_boss.csv
    // 世界boss
    var TableClientWorldBoss = (function () {
        function TableClientWorldBoss() {
            this.animal_id = 0; // boss类型
            this.name = ""; // 名称
            this.init_level = 0; // 初始等级
            this.max_grow = new Array(); // 等级对应奖励区间
            this.zone_bosses = new Array(); // 对应boss(分别为boss区间用|隔开)
            this.map_roleName = new Array(); // 异兽名字
            this.feature = new Array(); // 怪物特性
            this.battle_bg = 0; // 战斗背景id
            this.map_role = ""; // 形象
        }
        TableClientWorldBoss.Table = function () {
            if (TableClientWorldBoss.table == null) {
                TableClientWorldBoss.table = zj.Game.ConfigManager.getTable("client_table_world_boss.json");
                if (TableClientWorldBoss.table == null)
                    TableClientWorldBoss.table = {};
            }
            return TableClientWorldBoss.table;
        };
        TableClientWorldBoss.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientWorldBoss.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientWorldBoss.table = null;
        return TableClientWorldBoss;
    }());
    zj.TableClientWorldBoss = TableClientWorldBoss;
    __reflect(TableClientWorldBoss.prototype, "zj.TableClientWorldBoss");
    window['TableClientWorldBoss'] = TableClientWorldBoss;
    // client_type_package.csv
    // 背包类型表
    var TableClientTypePackage = (function () {
        function TableClientTypePackage() {
            this.index = 0; // 类型
            this.name = ""; // 中文名
            this.info = ""; // 说明
            this.itemType = new Array(); // 对应类型
            this.itemId = new Array(); // 
            this.exceptItemId = new Array(); // 去除Id
            this.path = ""; // 类型图片
        }
        TableClientTypePackage.Table = function () {
            if (TableClientTypePackage.table == null) {
                TableClientTypePackage.table = zj.Game.ConfigManager.getTable("client_type_package.json");
                if (TableClientTypePackage.table == null)
                    TableClientTypePackage.table = {};
            }
            return TableClientTypePackage.table;
        };
        TableClientTypePackage.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientTypePackage.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientTypePackage.table = null;
        return TableClientTypePackage;
    }());
    zj.TableClientTypePackage = TableClientTypePackage;
    __reflect(TableClientTypePackage.prototype, "zj.TableClientTypePackage");
    window['TableClientTypePackage'] = TableClientTypePackage;
    // client_type_rank.csv
    // 排行类型表
    var TableClientTypeRank = (function () {
        function TableClientTypeRank() {
            this.index = 0; // 类型
            this.name = ""; // 排行类型
            this.type = 0; // 排行类型
            this.path = ""; // 类型图片
        }
        TableClientTypeRank.Table = function () {
            if (TableClientTypeRank.table == null) {
                TableClientTypeRank.table = zj.Game.ConfigManager.getTable("client_type_rank.json");
                if (TableClientTypeRank.table == null)
                    TableClientTypeRank.table = {};
            }
            return TableClientTypeRank.table;
        };
        TableClientTypeRank.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientTypeRank.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientTypeRank.table = null;
        return TableClientTypeRank;
    }());
    zj.TableClientTypeRank = TableClientTypeRank;
    __reflect(TableClientTypeRank.prototype, "zj.TableClientTypeRank");
    window['TableClientTypeRank'] = TableClientTypeRank;
    // table_activityboss_map_block.csv
    var TableActivitybossMapBlock = (function () {
        function TableActivitybossMapBlock() {
            this.build_id = 0; // 建筑id
            this.name = 0; // 建筑名称
            this.picId = 0; // 头像id
            this.level = 0; // 等级
            this.show_scene = new Array(); // 出现场景
            this.block_cell = 0; // 建筑放置层（1:far,2:mid2，3:mid1,4:group,5:close)
            this.build_type = 0; // 建筑物类型 5:功能npc
            this.be_attacked = 0; // 建筑是否可被攻击或者触摸
            this.build_x = 0; // 建筑坐标
            this.build_y = 0; // 建筑坐标
            this.balk_rt = new Array(); // 碰撞格范围
            this.touch_rt = new Array(); // 触摸范围
            this.is_mirror = 0; // 是否镜像
            this.draw_order = 0; // 绘制层级
            this.path = ""; // 路径
            this.spine_scale = 0; // spine缩放
            this.spine_id = 0; // spine动画
            this.des = ""; // 描述
            this.name_path = ""; // 名字路径
            this.name_pos = new Array(); // 名字位置
        }
        TableActivitybossMapBlock.Table = function () {
            if (TableActivitybossMapBlock.table == null) {
                TableActivitybossMapBlock.table = zj.Game.ConfigManager.getTable("table_activityboss_map_block.json");
                if (TableActivitybossMapBlock.table == null)
                    TableActivitybossMapBlock.table = {};
            }
            return TableActivitybossMapBlock.table;
        };
        TableActivitybossMapBlock.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableActivitybossMapBlock.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableActivitybossMapBlock.table = null;
        return TableActivitybossMapBlock;
    }());
    zj.TableActivitybossMapBlock = TableActivitybossMapBlock;
    __reflect(TableActivitybossMapBlock.prototype, "zj.TableActivitybossMapBlock");
    window['TableActivitybossMapBlock'] = TableActivitybossMapBlock;
    // table_activity_battle.csv
    var TableActivityBattle = (function () {
        function TableActivityBattle() {
            this.type = 0; // id
            this.name = ""; // 活动类型
            this.open_level = 0; // 开启等级
            this.instance_pack = new Array(); // 副本包含关卡
            this.star_zone = new Array(); // 星级数量
            this.star_reward_good = new Array(); // 星级奖励物品
            this.star_reward_count = new Array(); // 星级奖励物品数量
            this.star_reward_score = new Array(); // 星级奖励积分
            this.star_rewards = new Array(); // 奖励
            this.exchange_reduce_score = new Array(); // 兑换消耗积分
            this.exchange_get_goods = new Array(); // 兑换获得物品
            this.exchange_count = new Array(); // 兑换次数
            this.extra_general = new Array(); // 额外猎人
            this.extra_score = new Array(); // 额外积分百分比
            this.extra_goods = new Array(); // 额外奖励
            this.extra_percent = new Array(); // 额外百分比
            this.extra_reward1 = new Array(); // 额外奖励1
            this.extra_reward2 = new Array(); // 额外奖励2
            this.instance_normal = new Array(); // 普通副本
            this.instance_elite = new Array(); // 困难副本
            this.instance_button = new Array(); // 按钮皮肤
            this.instance_bg = ""; // 背景
            this.instance_half = ""; // 半身像
            this.instance_Title = ""; // 标题
            this.act_coin = 0; // 代币
        }
        TableActivityBattle.Table = function () {
            if (TableActivityBattle.table == null) {
                TableActivityBattle.table = zj.Game.ConfigManager.getTable("table_activity_battle.json");
                if (TableActivityBattle.table == null)
                    TableActivityBattle.table = {};
            }
            return TableActivityBattle.table;
        };
        TableActivityBattle.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableActivityBattle.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableActivityBattle.table = null;
        return TableActivityBattle;
    }());
    zj.TableActivityBattle = TableActivityBattle;
    __reflect(TableActivityBattle.prototype, "zj.TableActivityBattle");
    window['TableActivityBattle'] = TableActivityBattle;
    // table_activity_battle_instance.csv
    var TableActivityBattleInstance = (function () {
        function TableActivityBattleInstance() {
            this.instance_id = 0; // id
            this.name = ""; // 活动类型
            this.instance_stage = new Array(); // 副本包含怪物
            this.first_reward = new Array(); // 首杀奖励
            this.reward_goods = new Array(); // 通关奖励
            this.reward_score = 0; // 通关积分
            this.rewards = new Array(); // 奖励
            this.rand_item = ""; // 随机奖励
            this.check_type = new Array(); // 星级检测类型(1战斗胜利2上阵武将类型3上阵武将id)
            this.check_value = new Array(); // 星级检测数量
            this.battle_bg = 0; // 副本战斗背景id
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = 0; // Boss形象id（映射map_role表）
            this.instance_pic1 = ""; // 副本关卡插图（标题）
            this.instance_pic2 = ""; // 副本关卡插图（内容）
        }
        TableActivityBattleInstance.Table = function () {
            if (TableActivityBattleInstance.table == null) {
                TableActivityBattleInstance.table = zj.Game.ConfigManager.getTable("table_activity_battle_instance.json");
                if (TableActivityBattleInstance.table == null)
                    TableActivityBattleInstance.table = {};
            }
            return TableActivityBattleInstance.table;
        };
        TableActivityBattleInstance.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableActivityBattleInstance.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableActivityBattleInstance.table = null;
        return TableActivityBattleInstance;
    }());
    zj.TableActivityBattleInstance = TableActivityBattleInstance;
    __reflect(TableActivityBattleInstance.prototype, "zj.TableActivityBattleInstance");
    window['TableActivityBattleInstance'] = TableActivityBattleInstance;
    // table_activity_terminal.csv
    var TableActivityTerminal = (function () {
        function TableActivityTerminal() {
            this.index = 0; // 索引
            this.activity_type = 0; // 活动类型（15-专题献礼，1-连续登录）
            this.notice_type = 0; // 热门类型（1-普通，2-热门，3-最新）
            this.pic_id = 0; // 活动图片
            this.name = ""; // 活动名称
            this.des = ""; // 活动描述
            this.open_week_day = 0; // 活动开启星期数（0-星期日,6-星期六）
            this.duration = 0; // 持续时长
            this.mission_type = new Array(); // 任务类型
            this.mission_condition = new Array(); // 任务条件
            this.rewardZone = new Array(); // 奖励区间
            this.reward_goods = new Array(); // 奖励内容
            this.reward_count = new Array(); // 奖励数量
            this.show_type = new Array(); // 显示类型
        }
        TableActivityTerminal.Table = function () {
            if (TableActivityTerminal.table == null) {
                TableActivityTerminal.table = zj.Game.ConfigManager.getTable("table_activity_terminal.json");
                if (TableActivityTerminal.table == null)
                    TableActivityTerminal.table = {};
            }
            return TableActivityTerminal.table;
        };
        TableActivityTerminal.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableActivityTerminal.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableActivityTerminal.table = null;
        return TableActivityTerminal;
    }());
    zj.TableActivityTerminal = TableActivityTerminal;
    __reflect(TableActivityTerminal.prototype, "zj.TableActivityTerminal");
    window['TableActivityTerminal'] = TableActivityTerminal;
    // table_activity_wishtree.csv
    var TableActivityWishtree = (function () {
        function TableActivityWishtree() {
            this.index = 0; // 索引
            this.vip_level = 0; // VIP等级
            this.reward_goods = new Array(); // 奖励内容
            this.reward_count = new Array(); // 奖励数量
            this.rand_power = new Array(); // 随机概率
            this.rand_count = new Array(); // 随机数量
            this.show_type = new Array(); // 显示类型
        }
        TableActivityWishtree.Table = function () {
            if (TableActivityWishtree.table == null) {
                TableActivityWishtree.table = zj.Game.ConfigManager.getTable("table_activity_wishtree.json");
                if (TableActivityWishtree.table == null)
                    TableActivityWishtree.table = {};
            }
            return TableActivityWishtree.table;
        };
        TableActivityWishtree.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableActivityWishtree.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableActivityWishtree.table = null;
        return TableActivityWishtree;
    }());
    zj.TableActivityWishtree = TableActivityWishtree;
    __reflect(TableActivityWishtree.prototype, "zj.TableActivityWishtree");
    window['TableActivityWishtree'] = TableActivityWishtree;
    // table_adviser_level.csv
    // 军师等级
    var TableAdviserLevel = (function () {
        function TableAdviserLevel() {
            this.index = 0; // 索引(id*10000+level)
            this.adviser_id = 0; // 军师id(10/11/12是特殊id)
            this.level = 0; // 等级
            this.skill_level = 0; // 技能等级
            this.add_powerLimit = 0; // 增加体力上限
            this.add_powerRatio = 0; // 体力恢复系数
            this.resource_cdCount = new Array(); // 产出资源(cd/资源/数量/上限)
            this.wanted_money_addradio = 0; // 流星街金币奖励加成
            this.challenge_gain_token = new Array(); // 挑战副本概率获得钻石（概率|上限|下限）
            this.consume_goods = 0; // 消耗物品
            this.consume_count = 0; // 消耗数量
            this.adviser_money = 0; // 升级消耗铜钱
            this.levelup_ok = new Array(); // 升级成功率
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.hit_rate = 0; // 暴击
            this.dodge_rate = 0; // 技能暴击(废弃）
            this.atk_crit = 0; // 暴伤伤害
            this.crit_extra = 0; // 忽视格挡
            this.ignore_phyDef = 0; // 忽视防御
            this.rage_reduce = 0; // 怒气减少
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.float_resistance = 0; // 浮空抗性
            this.cd_speed = 0; // 速度
            this.support_consume = 0; // 援护怒气
            this.general_atk_all = 0; // 攻击(废弃）
            this.general_def_all = 0; // 防御(废弃）
            this.all_crit = 0; // 暴击（废弃）
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.skill_crit = 0; // 暴击抵抗
            this.crit_resistance = 0; // 格挡
            this.final_extra = 0; // 终极附加(废弃)
            this.final_reduce = 0; // 终极减免(废弃)
            this.ignore_magicDef = 0; // 忽视魔防（废弃）
            this.map_name = ""; // 星宿名字
            this.map_index = 0; // 星图编号
        }
        TableAdviserLevel.Table = function () {
            if (TableAdviserLevel.table == null) {
                TableAdviserLevel.table = zj.Game.ConfigManager.getTable("table_adviser_level.json");
                if (TableAdviserLevel.table == null)
                    TableAdviserLevel.table = {};
            }
            return TableAdviserLevel.table;
        };
        TableAdviserLevel.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableAdviserLevel.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableAdviserLevel.table = null;
        return TableAdviserLevel;
    }());
    zj.TableAdviserLevel = TableAdviserLevel;
    __reflect(TableAdviserLevel.prototype, "zj.TableAdviserLevel");
    window['TableAdviserLevel'] = TableAdviserLevel;
    // table_base_adviser.csv
    // 军师
    var TableBaseAdviser = (function () {
        function TableBaseAdviser() {
            this.adviser_id = 0; // 军师id
            this.adviser_name = ""; // 军师名称
            this.quality = 0; // 品质
            this.compose_goods = 0; // 合成所需数量
            this.compose_count = 0; // 合成消耗
            this.adviser_des = ""; // 基础描述(策划专用)
            this.base_skill = new Array(); // 基础属性加成
            this.skill_id = new Array(); // 技能id
            this.act_spx_id = 0; // 动作id
            this.act_spx_index = 0; // 动作索引
            this.effect_spx_id = 0; // 特效id
            this.effect_spx_index = 0; // 特效索引
            this.spine_id = 0; // 骨骼动画id
            this.skeleton_index = new Array(); // 骨骼动画index(待机|出场|施法)
            this.movement_id = new Array(); // 骨骼动画名称(待机|出场|施法)
            this.head_path = ""; // 头像路径
            this.name_path = ""; // 名字图片
            this.name_down_path = ""; // 主界面名字图片
            this.des = ""; // 描述
            this.spine_scale = 0; // 动画大小
        }
        TableBaseAdviser.Table = function () {
            if (TableBaseAdviser.table == null) {
                TableBaseAdviser.table = zj.Game.ConfigManager.getTable("table_base_adviser.json");
                if (TableBaseAdviser.table == null)
                    TableBaseAdviser.table = {};
            }
            return TableBaseAdviser.table;
        };
        TableBaseAdviser.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBaseAdviser.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBaseAdviser.table = null;
        return TableBaseAdviser;
    }());
    zj.TableBaseAdviser = TableBaseAdviser;
    __reflect(TableBaseAdviser.prototype, "zj.TableBaseAdviser");
    window['TableBaseAdviser'] = TableBaseAdviser;
    // table_base_artifact.csv
    // 神兵
    var TableBaseArtifact = (function () {
        function TableBaseArtifact() {
            this.equip_id = 0; // 类型
            this.equip_name = ""; // 名称
            this.equip_quality = 0; // 品质
            this.star = 0; // 星级
            this.compose_goods = ""; // 合成所需物品
            this.compose_count = ""; // 合成所需数量
            this.compose_money = ""; // 合成消耗
            this.up_equip = ""; // 下一阶装备
            this.up_money = 0; // 进阶消耗金钱
            this.up_goods = 0; // 进阶消耗材料
            this.up_count = 0; // 进阶消耗数量
            this.skill_id = new Array(); // 神兵技能(从天赋表里获取)
            this.general_atk_all = new Array(); // 攻击(废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击（废弃）
            this.ignore_def_all = new Array(); // 忽视防御（废弃）
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.skill_atk = new Array(); // 法术攻击（废弃）
            this.skill_def = new Array(); // 法术防御(废弃）
            this.atk_crit = new Array(); // 暴击
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_extra = new Array(); // 暴伤伤害
            this.crit_resistance = new Array(); // 暴击抵抗（废弃）
            this.dodge_rate = new Array(); // 格挡
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.icon_path = ""; // 图片路径
            this.ani_id = 0; // 对应ui表的id
            this.ani_id_locked = 0; // 未解锁时动画
            this.ani_id_static = 0; // 静态动画
            this.skill_icon = ""; // 技能图标
            this.skill_frame = ""; // 技能底板
            this.skill_info = ""; // 技能描述
            this.hero_ani_id = 0; // 神兵对应动画
            this.sort_id = 0; // 显示顺序
        }
        TableBaseArtifact.Table = function () {
            if (TableBaseArtifact.table == null) {
                TableBaseArtifact.table = zj.Game.ConfigManager.getTable("table_base_artifact.json");
                if (TableBaseArtifact.table == null)
                    TableBaseArtifact.table = {};
            }
            return TableBaseArtifact.table;
        };
        TableBaseArtifact.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBaseArtifact.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBaseArtifact.table = null;
        return TableBaseArtifact;
    }());
    zj.TableBaseArtifact = TableBaseArtifact;
    __reflect(TableBaseArtifact.prototype, "zj.TableBaseArtifact");
    window['TableBaseArtifact'] = TableBaseArtifact;
    // table_base_general.csv
    // 武将
    var TableBaseGeneral = (function () {
        function TableBaseGeneral() {
            this.general_id = 0; // 序列号
            this.general_roleId = 0; // 映射mapRoleId
            this.general_name = ""; // 姓名
            this.client_sort = 0; // 客户端排序
            this.type = 0; // 派系
            this.features = 0; // 武将特性(1攻2防3辅)
            this.organization = 0; // 是否是旅团成员（1是0否）
            this.is_open = 0; // 是否开启
            this.general_soul = 0; // 招募所需魂类型
            this.soul_count = 0; // 招募所需魂数量
            this.consume_money = 0; // 招募消耗游戏币
            this.help_bg = 0; // 援助背景
            this.aptitude = 0; // 资质(11/12/13/14)
            this.hero_sign = 0; // 标志（1-10）
            this.attribute = new Array(); // 特性(攻击/防守/控制/特效)
            this.init_star = 0; // 初始星级
            this.equip_info = new Array(); // 装备设置
            this.card_type = new Array(); // 卡片类型
            this.card_level = new Array(); // 卡片等级
            this.init_friends = new Array(); // 初始伙伴
            this.friends_compose = new Array(); // 伙伴属性
            this.up_star_soul = new Array(); // 升星所需魂数量
            this.up_star_money = new Array(); // 升星所需游戏币
            this.up_star_add_skillLevel = new Array(); // 升星增加技能等级上限
            this.psychic_unlock_six = new Array(); // 六星解锁念力
            this.init_quality = 0; // 初始品质
            this.quality_partner = new Array(); // 羁绊激活
            this.skill_ids = new Array(); // 技能Id
            this.init_passive = new Array(); // 被动
            this.awake_passive = 0; // 觉醒被动
            this.break_skill = new Array(); // 突破技
            this.pokedex_attri = 0; // 图鉴加成
            this.xj_skill_ids = new Array(); // 仙境技能Id
            this.skill_levels = new Array(); // 技能技能(目前测试用)
            this.pic_id = 0; // 对应头像Id
            this.fashion_id = new Array(); // 对应时装id
            this.new_recommend = 0; // 官方新手推荐
            this.general_des = ""; // 基础描述
            this.role_type = 0; // 形态(1-普通武将，2-小兵，3-精英，4-boss)
            this.general_profession = 0; // 职业(1-步兵近战，2-刺客，3-法师，4-弓箭，5-骑兵)
            this.life_id = new Array(); // 传记
            this.hide_talent_ids = new Array(); // 隐藏天赋
            this.pve_ai = 0; // pve_ai
            this.pvp_ai = 0; // pvp_ai
            this.bean_max = 0; // 最大攒豆数
            this.general_rage = 0; // 怒气值
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴击伤害
            this.crit_resistance = 0; // 暴击抵抗
            this.ignore_phyDef = 0; // 忽视防御
            this.cd_speed = 0; // 速度
            this.dodge_rate = 0; // 格挡率
            this.hit_rate = 0; // 忽视格挡
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.stiff_resistance = 0; // 硬直抵抗
            this.float_resistance = 0; // 浮空抗性
            this.rage_reduce = 0; // 初始怒气
            this.support_consume = 0; // 作为援护出场所需怒气值
            this.general_atk_all = 0; // 攻击
            this.general_def_all = 0; // 防御
            this.all_crit = 0; // 暴击
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_crit = 0; // 技能暴击
            this.final_extra = 0; // 终极附加
            this.final_reduce = 0; // 终极减免
            this.ignore_magicDef = 0; // 忽视魔防
            this.sacred_atk = 0; // 神圣攻击
            this.sacred_def = 0; // 神圣防御
            this.sacred_crit = 0; // 神圣暴击
            this.ignore_sacredDef = 0; // 忽视神防
            this.get_up_time = 0; // 起身时间
            this.is_stir_up = 0; // 是否能被挑起
            this.stir_up_resistance = 0; // 挑起抵抗
            this.stir_again_def = 0; // 再次挑起抵抗
            this.is_gravity = 0; // 是否受重力影响
            this.move_speed = 0; // 移动速度
            this.des = ""; // 图鉴特点描述
            this.extra = ""; // 特点
            this.name_pic = ""; // 名字图片
            this.position = new Array(); // 定位
            this.technique = ""; // 技巧
        }
        TableBaseGeneral.Table = function () {
            if (TableBaseGeneral.table == null) {
                TableBaseGeneral.table = zj.Game.ConfigManager.getTable("table_base_general.json");
                if (TableBaseGeneral.table == null)
                    TableBaseGeneral.table = {};
            }
            return TableBaseGeneral.table;
        };
        TableBaseGeneral.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBaseGeneral.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBaseGeneral.table = null;
        return TableBaseGeneral;
    }());
    zj.TableBaseGeneral = TableBaseGeneral;
    __reflect(TableBaseGeneral.prototype, "zj.TableBaseGeneral");
    window['TableBaseGeneral'] = TableBaseGeneral;
    // table_base_pet.csv
    var TableBasePet = (function () {
        function TableBasePet() {
            this.pet_id = 0; // 宠物id
            this.pet_name = ""; // 宠物名称
            this.quality = 0; // 品质
            this.compose_goods = 0; // 召唤所需物品
            this.compose_count = 0; // 召唤消耗
            this.step = new Array(); // 阶数
            this.evo_star_req = new Array(); // 可进化星级
            this.evo_consume_money = new Array(); // 进化消耗金钱
            this.evo_consume = new Array(); // 进化消耗
            this.evo_consume_good = new Array(); // 进化消耗物品数量
            this.skill_island = new Array(); // 贪婪之岛被动
            this.skill_normal = new Array(); // 正常战斗被动
            this.skill = 0; // 主动技能
            this.up_money = new Array(); // 升星消耗金钱
            this.up_goods = new Array(); // 升星消耗
            this.up_count = new Array(); // 升星消耗数量
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击率
            this.crit_extra = new Array(); // 暴击伤害
            this.dodge_rate = new Array(); // 格挡率
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
            this.name_path = ""; // 路径
            this.frame_path = ""; // 路径
            this.spineId = new Array(); // 进化对应spineId
            this.name_down_path = ""; // 主界面名字图片
            this.spine_id = new Array(); // 骨骼动画id
            this.unlock_step = new Array(); // 进阶解锁进化形态
            this.skill_Icon = new Array(); // 图标
            this.skill_name = new Array(); // 技能名字
            this.des = ""; // 描述
            this.is_open = 0; // 是否开启
        }
        TableBasePet.Table = function () {
            if (TableBasePet.table == null) {
                TableBasePet.table = zj.Game.ConfigManager.getTable("table_base_pet.json");
                if (TableBasePet.table == null)
                    TableBasePet.table = {};
            }
            return TableBasePet.table;
        };
        TableBasePet.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBasePet.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBasePet.table = null;
        return TableBasePet;
    }());
    zj.TableBasePet = TableBasePet;
    __reflect(TableBasePet.prototype, "zj.TableBasePet");
    window['TableBasePet'] = TableBasePet;
    // table_break_skill_uplevel.csv
    var TableBreakSkillUplevel = (function () {
        function TableBreakSkillUplevel() {
            this.id = 0; // 索引
            this.consume_goods = new Array(); // 消耗道具
            this.consume_count = new Array(); // 消耗数量
            this.consume_money = new Array(); // 消耗铜钱
            this.exchange_ids = new Array(); // 所需猎人ids
            this.exchange_aptitude = new Array(); // 所需武将品质
            this.exchange_level = new Array(); // 所需等级
            this.exchange_star = new Array(); // 所需星级
            this.exchange_awaken = new Array(); // 所需觉醒次数
        }
        TableBreakSkillUplevel.Table = function () {
            if (TableBreakSkillUplevel.table == null) {
                TableBreakSkillUplevel.table = zj.Game.ConfigManager.getTable("table_break_skill_uplevel.json");
                if (TableBreakSkillUplevel.table == null)
                    TableBreakSkillUplevel.table = {};
            }
            return TableBreakSkillUplevel.table;
        };
        TableBreakSkillUplevel.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBreakSkillUplevel.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBreakSkillUplevel.table = null;
        return TableBreakSkillUplevel;
    }());
    zj.TableBreakSkillUplevel = TableBreakSkillUplevel;
    __reflect(TableBreakSkillUplevel.prototype, "zj.TableBreakSkillUplevel");
    window['TableBreakSkillUplevel'] = TableBreakSkillUplevel;
    // table_buff.csv
    var TableBuff = (function () {
        function TableBuff() {
            this.buff_id = 0; // id
            this.rand_power = 0; // 随机权重
            this.inspire_type = 0; // 激励类型
            this.buff_name = ""; // 名称
            this.buff_des = ""; // 详细说明
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴伤伤害
            this.dodge_rate = 0; // 格挡
            this.hit_rate = 0; // 忽视格挡
            this.ignore_phyDef = 0; // 忽视防御
            this.rage_reduce = 0; // 怒气减少
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.float_resistance = 0; // 浮空抗性
            this.cd_speed = 0; // 速度
            this.support_consume = 0; // 援护怒气
            this.general_atk_all = 0; // 攻击(废弃）
            this.general_def_all = 0; // 防御(废弃）
            this.all_crit = 0; // 暴击（废弃）
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.skill_crit = 0; // 技能暴击(废弃）
            this.crit_resistance = 0; // 暴击抵抗
            this.final_extra = 0; // 终极附加(废弃)
            this.final_reduce = 0; // 终极减免(废弃)
            this.ignore_magicDef = 0; // 忽视魔防（废弃）
            this.buff_icon = ""; // 图标
        }
        TableBuff.Table = function () {
            if (TableBuff.table == null) {
                TableBuff.table = zj.Game.ConfigManager.getTable("table_buff.json");
                if (TableBuff.table == null)
                    TableBuff.table = {};
            }
            return TableBuff.table;
        };
        TableBuff.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBuff.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBuff.table = null;
        return TableBuff;
    }());
    zj.TableBuff = TableBuff;
    __reflect(TableBuff.prototype, "zj.TableBuff");
    window['TableBuff'] = TableBuff;
    // table_buy_money.csv
    // 点金
    var TableBuyMoney = (function () {
        function TableBuyMoney() {
            this.index = 0; // 次数
            this.consume = 0; // 消耗代币
            this.monoey = 0; // 获得铜钱
        }
        TableBuyMoney.Table = function () {
            if (TableBuyMoney.table == null) {
                TableBuyMoney.table = zj.Game.ConfigManager.getTable("table_buy_money.json");
                if (TableBuyMoney.table == null)
                    TableBuyMoney.table = {};
            }
            return TableBuyMoney.table;
        };
        TableBuyMoney.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableBuyMoney.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableBuyMoney.table = null;
        return TableBuyMoney;
    }());
    zj.TableBuyMoney = TableBuyMoney;
    __reflect(TableBuyMoney.prototype, "zj.TableBuyMoney");
    window['TableBuyMoney'] = TableBuyMoney;
    // table_channel_pay.csv
    // 充值渠道档位对应表
    var TableChannelPay = (function () {
        function TableChannelPay() {
            this.index = 0; // 索引
            this.product_id = ""; // 商品id
            this.pay_index = 0; // 支付索引(对应table_pay_index中的index)
        }
        TableChannelPay.Table = function () {
            if (TableChannelPay.table == null) {
                TableChannelPay.table = zj.Game.ConfigManager.getTable("table_channel_pay.json");
                if (TableChannelPay.table == null)
                    TableChannelPay.table = {};
            }
            return TableChannelPay.table;
        };
        TableChannelPay.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableChannelPay.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableChannelPay.table = null;
        return TableChannelPay;
    }());
    zj.TableChannelPay = TableChannelPay;
    __reflect(TableChannelPay.prototype, "zj.TableChannelPay");
    window['TableChannelPay'] = TableChannelPay;
    // table_chapter_elite.csv
    // 精英副本章节
    var TableChapterElite = (function () {
        function TableChapterElite() {
            this.chapter_id = 0; // 章节id
            this.chapter_name = ""; // 章节名称
            this.chapter_pack = new Array(); // 章节包含副本
            this.chapter_bg = 0; // 章节背景id
            this.boss_roleId = 0; // 映射mapRoleId
            this.boss_x = 0; // boss微调x
            this.boss_y = 0; // boss微调y
            this.star_score = new Array(); // 积分
            this.goods_id = new Array(); // 物品
            this.goods_count = new Array(); // 数量
            this.chapter_num_pic = ""; // 章节序号图片
            this.chapter_name_pic = ""; // 章节名称图片
            this.elite_drop_des = new Array(); // 精英副本掉落说明
        }
        TableChapterElite.Table = function () {
            if (TableChapterElite.table == null) {
                TableChapterElite.table = zj.Game.ConfigManager.getTable("table_chapter_elite.json");
                if (TableChapterElite.table == null)
                    TableChapterElite.table = {};
            }
            return TableChapterElite.table;
        };
        TableChapterElite.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableChapterElite.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableChapterElite.table = null;
        return TableChapterElite;
    }());
    zj.TableChapterElite = TableChapterElite;
    __reflect(TableChapterElite.prototype, "zj.TableChapterElite");
    window['TableChapterElite'] = TableChapterElite;
    // table_chapter_normal.csv
    // 普通副本章节
    var TableChapterNormal = (function () {
        function TableChapterNormal() {
            this.chapter_id = 0; // 章节id
            this.chapter_name = ""; // 章节名称
            this.chapter_pack = new Array(); // 章节包含副本
            this.chapter_bg = 0; // 章节背景id
            this.boss_roleId = 0; // 映射mapRoleId
            this.boss_x = 0; // boss微调x
            this.boss_y = 0; // boss微调y
            this.star_score = new Array(); // 积分
            this.goods_id = new Array(); // 物品
            this.goods_count = new Array(); // 数量
            this.chapter_name_pic = ""; // 章节名称图片
        }
        TableChapterNormal.Table = function () {
            if (TableChapterNormal.table == null) {
                TableChapterNormal.table = zj.Game.ConfigManager.getTable("table_chapter_normal.json");
                if (TableChapterNormal.table == null)
                    TableChapterNormal.table = {};
            }
            return TableChapterNormal.table;
        };
        TableChapterNormal.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableChapterNormal.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableChapterNormal.table = null;
        return TableChapterNormal;
    }());
    zj.TableChapterNormal = TableChapterNormal;
    __reflect(TableChapterNormal.prototype, "zj.TableChapterNormal");
    window['TableChapterNormal'] = TableChapterNormal;
    // table_color_fruit_reward.csv
    // 双色球奖励
    var TableColorFruitReward = (function () {
        function TableColorFruitReward() {
            this.id = 0; // id
            this.name = ""; // 名字
            this.all_balls = 0; // 总数量
            this.reward_goods = new Array(); // 每日获得物品
            this.reward_count = new Array(); // 每日获得数量
            this.pic = ""; // 图片路径
        }
        TableColorFruitReward.Table = function () {
            if (TableColorFruitReward.table == null) {
                TableColorFruitReward.table = zj.Game.ConfigManager.getTable("table_color_fruit_reward.json");
                if (TableColorFruitReward.table == null)
                    TableColorFruitReward.table = {};
            }
            return TableColorFruitReward.table;
        };
        TableColorFruitReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableColorFruitReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableColorFruitReward.table = null;
        return TableColorFruitReward;
    }());
    zj.TableColorFruitReward = TableColorFruitReward;
    __reflect(TableColorFruitReward.prototype, "zj.TableColorFruitReward");
    window['TableColorFruitReward'] = TableColorFruitReward;
    // table_continue_login.csv
    // 连续七天登陆活动
    var TableContinueLogin = (function () {
        function TableContinueLogin() {
            this.dayIndex = 0; // 天数索引
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
            this.show_type = new Array(); // 显示类型
        }
        TableContinueLogin.Table = function () {
            if (TableContinueLogin.table == null) {
                TableContinueLogin.table = zj.Game.ConfigManager.getTable("table_continue_login.json");
                if (TableContinueLogin.table == null)
                    TableContinueLogin.table = {};
            }
            return TableContinueLogin.table;
        };
        TableContinueLogin.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableContinueLogin.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableContinueLogin.table = null;
        return TableContinueLogin;
    }());
    zj.TableContinueLogin = TableContinueLogin;
    __reflect(TableContinueLogin.prototype, "zj.TableContinueLogin");
    window['TableContinueLogin'] = TableContinueLogin;
    // table_darkland.csv
    var TableDarkland = (function () {
        function TableDarkland() {
            this.darkland_id = 0; // 黑暗大陆id
            this.darkland_name = ""; // 黑暗大陆名称
            this.open_time = new Array(); // 开放时间(开放时间|结束时间|销毁时间)
            this.mix_level = 0; // 最小等级
            this.max_level = 0; // 最大等级
            this.is_novice = 0; // 是否是新手黑暗大陆
            this.is_battle = 0; // 是否可以战斗
            this.is_halo = 0; // 是否生效光环
            this.optimize_degree = 0; // 优化程度(0表示不优化)
            this.max_people = 0; // 最大进入人数(0表示不做限制)
            this.branch_condition = 0; // 分支条件(0表示该场景无分支)
            this.max_branch = 0; // 最多分线(不超过100)
            this.tree_pos = new Array(); // 果树位置
            this.revive_x = new Array(); // 复活区域
            this.revive_y = new Array(); // 复活区域
            this.server_time = new Array(); // 开服时间
            this.mobs_produce = new Array(); // 怪物生成器
            this.back_img = ""; // 背景图片
            this.name_img = ""; // 名称图片
            this.map_id = 0; // 地图id
            this.block_index = 0; // 地图块类型
            this.ani_id = new Array(); // 动画id
        }
        TableDarkland.Table = function () {
            if (TableDarkland.table == null) {
                TableDarkland.table = zj.Game.ConfigManager.getTable("table_darkland.json");
                if (TableDarkland.table == null)
                    TableDarkland.table = {};
            }
            return TableDarkland.table;
        };
        TableDarkland.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableDarkland.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableDarkland.table = null;
        return TableDarkland;
    }());
    zj.TableDarkland = TableDarkland;
    __reflect(TableDarkland.prototype, "zj.TableDarkland");
    window['TableDarkland'] = TableDarkland;
    // table_darkland_map_block.csv
    var TableDarklandMapBlock = (function () {
        function TableDarklandMapBlock() {
            this.build_id = 0; // 建筑id
            this.build_name = ""; // 建筑名称
            this.show_scene = new Array(); // 出现场景
            this.block_cell = 0; // 建筑放置层（1:far,2:mid2，3:mid1,4:group,5:close)
            this.build_type = 0; // 建筑物类型 5:功能npc
            this.be_attacked = 0; // 建筑是否可被攻击或者触摸
            this.build_x = 0; // 建筑坐标
            this.build_y = 0; // 建筑坐标
            this.balk_rt = new Array(); // 碰撞格范围
            this.touch_rt = new Array(); // 触摸范围
            this.is_mirror = 0; // 是否镜像
            this.draw_order = 0; // 绘制层级
            this.path = ""; // 路径
            this.spine_scale = ""; // spine缩放
            this.spine_id = ""; // spine动画
            this.des = ""; // 描述
            this.name_path = ""; // 名字路径
            this.name_pos = new Array(); // 名字位置
        }
        TableDarklandMapBlock.Table = function () {
            if (TableDarklandMapBlock.table == null) {
                TableDarklandMapBlock.table = zj.Game.ConfigManager.getTable("table_darkland_map_block.json");
                if (TableDarklandMapBlock.table == null)
                    TableDarklandMapBlock.table = {};
            }
            return TableDarklandMapBlock.table;
        };
        TableDarklandMapBlock.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableDarklandMapBlock.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableDarklandMapBlock.table = null;
        return TableDarklandMapBlock;
    }());
    zj.TableDarklandMapBlock = TableDarklandMapBlock;
    __reflect(TableDarklandMapBlock.prototype, "zj.TableDarklandMapBlock");
    window['TableDarklandMapBlock'] = TableDarklandMapBlock;
    // table_darkland_rank_reward.csv
    var TableDarklandRankReward = (function () {
        function TableDarklandRankReward() {
            this.id = 0; // id
            this.rank_min = 0; // 排名区间下限
            this.rank_max = 0; // 排名区间上限
            this.rank_reward = new Array(); // 奖励
        }
        TableDarklandRankReward.Table = function () {
            if (TableDarklandRankReward.table == null) {
                TableDarklandRankReward.table = zj.Game.ConfigManager.getTable("table_darkland_rank_reward.json");
                if (TableDarklandRankReward.table == null)
                    TableDarklandRankReward.table = {};
            }
            return TableDarklandRankReward.table;
        };
        TableDarklandRankReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableDarklandRankReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableDarklandRankReward.table = null;
        return TableDarklandRankReward;
    }());
    zj.TableDarklandRankReward = TableDarklandRankReward;
    __reflect(TableDarklandRankReward.prototype, "zj.TableDarklandRankReward");
    window['TableDarklandRankReward'] = TableDarklandRankReward;
    // table_evil_zone.csv
    // 罪恶值死亡时间表
    var TableEvilZone = (function () {
        function TableEvilZone() {
            this.evil_id = 0; // 罪恶值区间索引
            this.evil_min = 0; // 区间下限
            this.evil_max = 0; // 区间上限
            this.revived_time = 0; // 复活时间
        }
        TableEvilZone.Table = function () {
            if (TableEvilZone.table == null) {
                TableEvilZone.table = zj.Game.ConfigManager.getTable("table_evil_zone.json");
                if (TableEvilZone.table == null)
                    TableEvilZone.table = {};
            }
            return TableEvilZone.table;
        };
        TableEvilZone.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableEvilZone.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableEvilZone.table = null;
        return TableEvilZone;
    }());
    zj.TableEvilZone = TableEvilZone;
    __reflect(TableEvilZone.prototype, "zj.TableEvilZone");
    window['TableEvilZone'] = TableEvilZone;
    // table_exchange_mall.csv
    // 兑换
    var TableExchangeMall = (function () {
        function TableExchangeMall() {
            this.id = 0; // 索引(1-仙境2-帮会3-魔域）
            this.quality = 0; // 排序
            this.type = 0; // 类型
            this.is_choose = 0; // 是否选择
            this.exchange_goods = new Array(); // 需求物品
            this.exchange_one = new Array(); // 宝物一号位
            this.exchange_two = new Array(); // 宝物二号位
            this.exchange_three = new Array(); // 宝物三号位
            this.is_only = 0; // 是否唯一
            this.exchange_times = 0; // 兑换次数
            this.daily_refresh = 0; // 日常刷新
            this.week_refresh = 0; // 周常刷新
            this.reward_goods = 0; // 兑换物品
            this.reward_count = 0; // 兑换物品
            this.level_min = 0; // 最小开启等级
            this.des = ""; // 描述
        }
        TableExchangeMall.Table = function () {
            if (TableExchangeMall.table == null) {
                TableExchangeMall.table = zj.Game.ConfigManager.getTable("table_exchange_mall.json");
                if (TableExchangeMall.table == null)
                    TableExchangeMall.table = {};
            }
            return TableExchangeMall.table;
        };
        TableExchangeMall.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableExchangeMall.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableExchangeMall.table = null;
        return TableExchangeMall;
    }());
    zj.TableExchangeMall = TableExchangeMall;
    __reflect(TableExchangeMall.prototype, "zj.TableExchangeMall");
    window['TableExchangeMall'] = TableExchangeMall;
    // table_facebook.csv
    // facebook分享表
    var TableFacebook = (function () {
        function TableFacebook() {
            this.index = 0; // 索引
            this.trigger_type = 0; // 触发类型
            this.trigger_condition = 0; // 触发条件
            this.reward_goods = new Array(); // 分享奖励
            this.reward_count = new Array(); // 奖励数量
            this.des = ""; // 触发条件说明
        }
        TableFacebook.Table = function () {
            if (TableFacebook.table == null) {
                TableFacebook.table = zj.Game.ConfigManager.getTable("table_facebook.json");
                if (TableFacebook.table == null)
                    TableFacebook.table = {};
            }
            return TableFacebook.table;
        };
        TableFacebook.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableFacebook.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableFacebook.table = null;
        return TableFacebook;
    }());
    zj.TableFacebook = TableFacebook;
    __reflect(TableFacebook.prototype, "zj.TableFacebook");
    window['TableFacebook'] = TableFacebook;
    // table_first_charge.csv
    // 首冲表
    var TableFirstCharge = (function () {
        function TableFirstCharge() {
            this.index = 0; // 索引
            this.token = 0; // 充值数量
            this.reward_goods = new Array(); // 奖励内容
            this.reward_count = new Array(); // 奖励数量
            this.show_type = new Array(); // 显示类型
            this.star_path = ""; // 几星文字
            this.icon_path_title = ""; // 每档标题
            this.icon_path_topic = ""; // 物品主题
            this.icon_path_tip = ""; // 提示
            this.role_pic = ""; // 角色图片
            this.button_pic = ""; // 按钮图片
        }
        TableFirstCharge.Table = function () {
            if (TableFirstCharge.table == null) {
                TableFirstCharge.table = zj.Game.ConfigManager.getTable("table_first_charge.json");
                if (TableFirstCharge.table == null)
                    TableFirstCharge.table = {};
            }
            return TableFirstCharge.table;
        };
        TableFirstCharge.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableFirstCharge.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableFirstCharge.table = null;
        return TableFirstCharge;
    }());
    zj.TableFirstCharge = TableFirstCharge;
    __reflect(TableFirstCharge.prototype, "zj.TableFirstCharge");
    window['TableFirstCharge'] = TableFirstCharge;
    // table_formations.csv
    var TableFormations = (function () {
        function TableFormations() {
            this.id = 0; // 阵型类型
            this.des = ""; // 描述
            this.generals = 0; // 参战武将数量
            this.reserves = 0; // 替补武将数量
            this.supports = 0; // 援助武将数量
            this.generals_limit_level = new Array(); // 第四个位置开启条件
            this.generals_limit_number = new Array(); // 主将增加数量
            this.supports_limit_level = new Array(); // 援护开启等级
            this.supports_limit_number = new Array(); // 援护增加数量
            this.unopen_des = ""; // 主将未开启描述
        }
        TableFormations.Table = function () {
            if (TableFormations.table == null) {
                TableFormations.table = zj.Game.ConfigManager.getTable("table_formations.json");
                if (TableFormations.table == null)
                    TableFormations.table = {};
            }
            return TableFormations.table;
        };
        TableFormations.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableFormations.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableFormations.table = null;
        return TableFormations;
    }());
    zj.TableFormations = TableFormations;
    __reflect(TableFormations.prototype, "zj.TableFormations");
    window['TableFormations'] = TableFormations;
    // table_function_open.csv
    // 开启等级
    var TableFunctionOpen = (function () {
        function TableFunctionOpen() {
            this.id = 0; // 功能类型
            this.name = ""; // 名称
            this.condition = 0; // 解锁条件-等级
            this.condition_instance = 0; // 解锁条件-副本
            this.show = 0; // 是否在升级界面显示
            this.maincity = 0; // 是否在目标界面显示
            this.unopen_tip = ""; // 未解锁提示
            this.path = ""; // 图片
            this.des = ""; // 功能说明
        }
        TableFunctionOpen.Table = function () {
            if (TableFunctionOpen.table == null) {
                TableFunctionOpen.table = zj.Game.ConfigManager.getTable("table_function_open.json");
                if (TableFunctionOpen.table == null)
                    TableFunctionOpen.table = {};
            }
            return TableFunctionOpen.table;
        };
        TableFunctionOpen.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableFunctionOpen.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableFunctionOpen.table = null;
        return TableFunctionOpen;
    }());
    zj.TableFunctionOpen = TableFunctionOpen;
    __reflect(TableFunctionOpen.prototype, "zj.TableFunctionOpen");
    window['TableFunctionOpen'] = TableFunctionOpen;
    // table_gamble_jade.csv
    // 宝石切割
    var TableGambleJade = (function () {
        function TableGambleJade() {
            this.index = 0; // 类型
            this.jade_ids = new Array(); // 宝石id
            this.jade_powers = new Array(); // 宝石概率
            this.jade_will = new Array(); // 必出宝石
            this.result_count = 0; // 随机数量
            this.cost_type = 0; // 消耗资源类型
            this.cost_count = 0; // 花费数量
            this.is_show = ""; // 是否公告
        }
        TableGambleJade.Table = function () {
            if (TableGambleJade.table == null) {
                TableGambleJade.table = zj.Game.ConfigManager.getTable("table_gamble_jade.json");
                if (TableGambleJade.table == null)
                    TableGambleJade.table = {};
            }
            return TableGambleJade.table;
        };
        TableGambleJade.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGambleJade.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGambleJade.table = null;
        return TableGambleJade;
    }());
    zj.TableGambleJade = TableGambleJade;
    __reflect(TableGambleJade.prototype, "zj.TableGambleJade");
    window['TableGambleJade'] = TableGambleJade;
    // table_general_break.csv
    var TableGeneralBreak = (function () {
        function TableGeneralBreak() {
            this.general_id = 0; // 猎人ID
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击率
            this.crit_extra = new Array(); // 暴击伤害
            this.dodge_rate = new Array(); // 格挡率
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
        }
        TableGeneralBreak.Table = function () {
            if (TableGeneralBreak.table == null) {
                TableGeneralBreak.table = zj.Game.ConfigManager.getTable("table_general_break.json");
                if (TableGeneralBreak.table == null)
                    TableGeneralBreak.table = {};
            }
            return TableGeneralBreak.table;
        };
        TableGeneralBreak.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralBreak.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralBreak.table = null;
        return TableGeneralBreak;
    }());
    zj.TableGeneralBreak = TableGeneralBreak;
    __reflect(TableGeneralBreak.prototype, "zj.TableGeneralBreak");
    window['TableGeneralBreak'] = TableGeneralBreak;
    // table_general_breakup.csv
    // 猎人突破
    var TableGeneralBreakup = (function () {
        function TableGeneralBreakup() {
            this.id = 0; // 突破等级
            this.condition_aptitude = new Array(); // 突破猎人资质
            this.condition_transfer = 0; // 突破猎人变身
            this.condition_level = 0; // 突破猎人所需等级
            this.condition_star = 0; // 突破猎人所需星级
            this.condition_awaken = 0; // 突破猎人所需觉醒次数
            this.exchange_store = new Array(); // 所需突破石
            this.exchange_generals = new Array(); // 所需猎人(0任意1同名)
            this.exchange_level = new Array(); // 所需等级
            this.exchange_star = new Array(); // 所需星级
            this.exchange_awaken = new Array(); // 所需觉醒次数
            this.exchange_break = new Array(); // 所需突破次数
            this.consume = 0; // 消耗金币
            this.add_level = 0; // 增加等级上限
            this.add_step = 0; // 增加的进阶数
            this.add_skillLevel = 0; // 增加的技能等级上限
            this.open_skill = 0; // 解锁突破技
            this.break_skill_level = new Array(); // 突破技能等级
            this.halo_front_aniId = 0; // 身前光环id
            this.halo_back_aniId = 0; // 身后光环id
        }
        TableGeneralBreakup.Table = function () {
            if (TableGeneralBreakup.table == null) {
                TableGeneralBreakup.table = zj.Game.ConfigManager.getTable("table_general_breakup.json");
                if (TableGeneralBreakup.table == null)
                    TableGeneralBreakup.table = {};
            }
            return TableGeneralBreakup.table;
        };
        TableGeneralBreakup.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralBreakup.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralBreakup.table = null;
        return TableGeneralBreakup;
    }());
    zj.TableGeneralBreakup = TableGeneralBreakup;
    __reflect(TableGeneralBreakup.prototype, "zj.TableGeneralBreakup");
    window['TableGeneralBreakup'] = TableGeneralBreakup;
    // table_general_compose.csv
    // 武将组合表
    var TableGeneralCompose = (function () {
        function TableGeneralCompose() {
            this.compose_id = 0; // 组合ID
            this.compose_name = ""; // 组合名
            this.compose_ratio = 0; // 权重比
            this.des = ""; // 描述
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击
            this.crit_extra = new Array(); // 暴伤伤害
            this.dodge_rate = new Array(); // 格挡
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
        }
        TableGeneralCompose.Table = function () {
            if (TableGeneralCompose.table == null) {
                TableGeneralCompose.table = zj.Game.ConfigManager.getTable("table_general_compose.json");
                if (TableGeneralCompose.table == null)
                    TableGeneralCompose.table = {};
            }
            return TableGeneralCompose.table;
        };
        TableGeneralCompose.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralCompose.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralCompose.table = null;
        return TableGeneralCompose;
    }());
    zj.TableGeneralCompose = TableGeneralCompose;
    __reflect(TableGeneralCompose.prototype, "zj.TableGeneralCompose");
    window['TableGeneralCompose'] = TableGeneralCompose;
    // table_general_equip.csv
    // 武将装备
    var TableGeneralEquip = (function () {
        function TableGeneralEquip() {
            this.id = 0; // 编号
            this.name = ""; // 名字
            this.type = 0; // 类型（1通用1，2通用2，3专属）
            this.skillId = new Array(); // 被动天赋技能id
            this.skillActivaLevel = new Array(); // 天赋技能激活等级
            this.skillLevel = new Array(); // 品阶对应技能等级
            this.compose_goods = ""; // 专属合成消耗物品
            this.compose_count = ""; // 专属合成消耗数量
            this.compose_money = 0; // 合成消耗金币
            this.uplevel_goods = new Array(); // 升级消耗物品
            this.uplevel_count = new Array(); // 升级消耗数量
            this.uplevel_money = new Array(); // 升级消耗铜钱
            this.upstep_goods = new Array(); // 升品消耗物品
            this.upstep_count = new Array(); // 升品消耗物品
            this.upstep_money = new Array(); // 升品消耗金钱
            this.main_attri = 0; // 主属性
            this.add_attri_one = 0; // 附加属性1
            this.add_attri_two = ""; // 附加属性2
            this.equip_des = ""; // 描述
            this.name_path = ""; // 名字图片
            this.equip_icon = ""; // 图标
            this.equip_title = ""; // 标题
            this.equip_type = ""; // 类型
            this.equip_type_des = ""; // 系别
            this.equip_type_name = ""; // 名字
        }
        TableGeneralEquip.Table = function () {
            if (TableGeneralEquip.table == null) {
                TableGeneralEquip.table = zj.Game.ConfigManager.getTable("table_general_equip.json");
                if (TableGeneralEquip.table == null)
                    TableGeneralEquip.table = {};
            }
            return TableGeneralEquip.table;
        };
        TableGeneralEquip.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralEquip.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralEquip.table = null;
        return TableGeneralEquip;
    }());
    zj.TableGeneralEquip = TableGeneralEquip;
    __reflect(TableGeneralEquip.prototype, "zj.TableGeneralEquip");
    window['TableGeneralEquip'] = TableGeneralEquip;
    // table_general_equip_attri.csv
    var TableGeneralEquipAttri = (function () {
        function TableGeneralEquipAttri() {
            this.attri_id = 0; // 属性ID
            this.name = ""; // 
            this.main_type = 0; // 属性分类（1主属性2附加属性）
            this.add_type = 0; // 属性数值类型（1数值|2百分比）
            this.attri_type = 0; // 属性类型
            this.attri_value = 0; // 属性数值
            this.attri_add = new Array(); // 加成
        }
        TableGeneralEquipAttri.Table = function () {
            if (TableGeneralEquipAttri.table == null) {
                TableGeneralEquipAttri.table = zj.Game.ConfigManager.getTable("table_general_equip_attri.json");
                if (TableGeneralEquipAttri.table == null)
                    TableGeneralEquipAttri.table = {};
            }
            return TableGeneralEquipAttri.table;
        };
        TableGeneralEquipAttri.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralEquipAttri.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralEquipAttri.table = null;
        return TableGeneralEquipAttri;
    }());
    zj.TableGeneralEquipAttri = TableGeneralEquipAttri;
    __reflect(TableGeneralEquipAttri.prototype, "zj.TableGeneralEquipAttri");
    window['TableGeneralEquipAttri'] = TableGeneralEquipAttri;
    // table_general_hole.csv
    // 武将羁绊
    var TableGeneralHole = (function () {
        function TableGeneralHole() {
            this.hole_id = 0; // 序列号
            this.partner_id = 0; // 羁绊卡
            this.activate_num = 0; // 激活消耗数量
            this.activate_money = 0; // 激活消耗
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 物理攻击
            this.general_def = 0; // 物理防御
            this.atk_crit = 0; // 物攻暴击
            this.crit_extra = 0; // 暴伤加成值
            this.dodge_rate = 0; // 闪避
            this.hit_rate = 0; // 命中
            this.ignore_phyDef = 0; // 忽视物防
            this.rage_reduce = 0; // 怒气减少
            this.cd_speed = 0; // 速度
            this.support_consume = 0; // 援护怒气
            this.general_atk_all = 0; // 攻击
            this.general_def_all = 0; // 防御
            this.all_crit = 0; // 暴击
            this.ignore_def_all = 0; // 忽视防御
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.skill_crit = 0; // 技能暴击
            this.crit_resistance = 0; // 暴击抵抗
            this.final_extra = 0; // 终极附加
            this.final_reduce = 0; // 终极减免
            this.ignore_magicDef = 0; // 忽视魔防
        }
        TableGeneralHole.Table = function () {
            if (TableGeneralHole.table == null) {
                TableGeneralHole.table = zj.Game.ConfigManager.getTable("table_general_hole.json");
                if (TableGeneralHole.table == null)
                    TableGeneralHole.table = {};
            }
            return TableGeneralHole.table;
        };
        TableGeneralHole.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralHole.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralHole.table = null;
        return TableGeneralHole;
    }());
    zj.TableGeneralHole = TableGeneralHole;
    __reflect(TableGeneralHole.prototype, "zj.TableGeneralHole");
    window['TableGeneralHole'] = TableGeneralHole;
    // table_general_life.csv
    // 传记
    var TableGeneralLife = (function () {
        function TableGeneralLife() {
            this.life_id = 0; // id
            this.life_name = ""; // 名字
            this.path = ""; // 路径
            this.des = ""; // 描述
            this.battle_power = 0; // 战力加成权重
            this.stat_zone = new Array(); // 激活数量区间
            this.add_allattri = new Array(); // 增加全属性(百分比)
            this.begin_point = 0; // 起点
            this.stat_points = new Array(); // 属性激活点
        }
        TableGeneralLife.Table = function () {
            if (TableGeneralLife.table == null) {
                TableGeneralLife.table = zj.Game.ConfigManager.getTable("table_general_life.json");
                if (TableGeneralLife.table == null)
                    TableGeneralLife.table = {};
            }
            return TableGeneralLife.table;
        };
        TableGeneralLife.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralLife.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralLife.table = null;
        return TableGeneralLife;
    }());
    zj.TableGeneralLife = TableGeneralLife;
    __reflect(TableGeneralLife.prototype, "zj.TableGeneralLife");
    window['TableGeneralLife'] = TableGeneralLife;
    // table_general_life_statpoints.csv
    // 传记点
    var TableGeneralLifeStatpoints = (function () {
        function TableGeneralLifeStatpoints() {
            this.stat_id = 0; // id
            this.name = ""; // 名字
            this.is_battle = 0; // 是否挑战
            this.battle_value = 0; // 推荐战力
            this.battle_bg = 0; // 战斗背景
            this.quality = 0; // 品质
            this.consume_goods = new Array(); // 消耗的物品
            this.consume_count = new Array(); // 消耗的数量
            this.assist_items = new Array(); // 可使用辅助物品
            this.rand_power = new Array(); // 随机概率
            this.path = ""; // 图标路径
            this.path_open = ""; // 图标路径
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴伤伤害
            this.dodge_rate = 0; // 格挡
            this.hit_rate = 0; // 忽视格挡
            this.ignore_phyDef = 0; // 忽视防御
            this.rage_reduce = 0; // 怒气减少
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.float_resistance = 0; // 浮空抗性
            this.cd_speed = 0; // 速度
            this.support_consume = 0; // 援护怒气
            this.general_atk_all = 0; // 攻击(废弃）
            this.general_def_all = 0; // 防御(废弃）
            this.all_crit = 0; // 暴击（废弃）
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.skill_crit = 0; // 技能暴击(废弃）
            this.crit_resistance = 0; // 暴击抵抗
            this.final_extra = 0; // 终极附加(废弃)
            this.final_reduce = 0; // 终极减免(废弃)
            this.ignore_magicDef = 0; // 忽视魔防（废弃）
        }
        TableGeneralLifeStatpoints.Table = function () {
            if (TableGeneralLifeStatpoints.table == null) {
                TableGeneralLifeStatpoints.table = zj.Game.ConfigManager.getTable("table_general_life_statpoints.json");
                if (TableGeneralLifeStatpoints.table == null)
                    TableGeneralLifeStatpoints.table = {};
            }
            return TableGeneralLifeStatpoints.table;
        };
        TableGeneralLifeStatpoints.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralLifeStatpoints.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralLifeStatpoints.table = null;
        return TableGeneralLifeStatpoints;
    }());
    zj.TableGeneralLifeStatpoints = TableGeneralLifeStatpoints;
    __reflect(TableGeneralLifeStatpoints.prototype, "zj.TableGeneralLifeStatpoints");
    window['TableGeneralLifeStatpoints'] = TableGeneralLifeStatpoints;
    // table_general_make.csv
    // 武将合成
    var TableGeneralMake = (function () {
        function TableGeneralMake() {
            this.id = 0; // 索引
            this.compose_id = 0; // 合成猎人id
            this.exchange_ids = new Array(); // 所需猎人ids
            this.exchange_aptitude = new Array(); // 所需武将品质
            this.exchange_level = new Array(); // 所需等级
            this.exchange_star = new Array(); // 所需星级
            this.exchange_awaken = new Array(); // 所需觉醒次数
            this.consume = 0; // 消耗金币
        }
        TableGeneralMake.Table = function () {
            if (TableGeneralMake.table == null) {
                TableGeneralMake.table = zj.Game.ConfigManager.getTable("table_general_make.json");
                if (TableGeneralMake.table == null)
                    TableGeneralMake.table = {};
            }
            return TableGeneralMake.table;
        };
        TableGeneralMake.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralMake.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralMake.table = null;
        return TableGeneralMake;
    }());
    zj.TableGeneralMake = TableGeneralMake;
    __reflect(TableGeneralMake.prototype, "zj.TableGeneralMake");
    window['TableGeneralMake'] = TableGeneralMake;
    // table_general_psychic.csv
    // 念力组合表
    var TableGeneralPsychic = (function () {
        function TableGeneralPsychic() {
            this.psychic_id = 0; // 念力
            this.name = ""; // 
            this.power = 0; // 随机权重
            this.rand_attri = new Array(); // 随机属性
            this.rand_power = new Array(); // 随机权重
            this.group_num = 0; // 组合条件
            this.group_talent = 0; // 组合效果
            this.path = ""; // 路径
        }
        TableGeneralPsychic.Table = function () {
            if (TableGeneralPsychic.table == null) {
                TableGeneralPsychic.table = zj.Game.ConfigManager.getTable("table_general_psychic.json");
                if (TableGeneralPsychic.table == null)
                    TableGeneralPsychic.table = {};
            }
            return TableGeneralPsychic.table;
        };
        TableGeneralPsychic.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralPsychic.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralPsychic.table = null;
        return TableGeneralPsychic;
    }());
    zj.TableGeneralPsychic = TableGeneralPsychic;
    __reflect(TableGeneralPsychic.prototype, "zj.TableGeneralPsychic");
    window['TableGeneralPsychic'] = TableGeneralPsychic;
    // table_general_psychic_attri.csv
    // 念力表
    var TableGeneralPsychicAttri = (function () {
        function TableGeneralPsychicAttri() {
            this.attri_id = 0; // 属性ID
            this.name = ""; // 
            this.quality = 0; // 品质（1/2/3/4）
            this.attri_type = 0; // 随机属性类型（1生命2攻击4命中5抵抗8暴伤9暴抗）
            this.object_type = 0; // 对象类型(1数值2百分比)
            this.attri_value = new Array(); // 属性范围(浮点型)
            this.consume_general = new Array(); // 升级消耗猎人id(0为任意)
            this.general_level = new Array(); // 所需猎人等级
            this.general_star = new Array(); // 所需猎人星级
            this.general_awaken = new Array(); // 所需猎人觉醒次数
            this.general_count = new Array(); // 所需猎人个数
            this.consume_money = new Array(); // 消耗金币
            this.consume_fridge = new Array(); // 消耗念力果
            this.path = ""; // 路径
        }
        TableGeneralPsychicAttri.Table = function () {
            if (TableGeneralPsychicAttri.table == null) {
                TableGeneralPsychicAttri.table = zj.Game.ConfigManager.getTable("table_general_psychic_attri.json");
                if (TableGeneralPsychicAttri.table == null)
                    TableGeneralPsychicAttri.table = {};
            }
            return TableGeneralPsychicAttri.table;
        };
        TableGeneralPsychicAttri.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralPsychicAttri.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralPsychicAttri.table = null;
        return TableGeneralPsychicAttri;
    }());
    zj.TableGeneralPsychicAttri = TableGeneralPsychicAttri;
    __reflect(TableGeneralPsychicAttri.prototype, "zj.TableGeneralPsychicAttri");
    window['TableGeneralPsychicAttri'] = TableGeneralPsychicAttri;
    // table_general_quality.csv
    // 武将进阶表
    var TableGeneralQuality = (function () {
        function TableGeneralQuality() {
            this.general_id = 0; // 序列号
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击
            this.crit_extra = new Array(); // 暴伤伤害
            this.dodge_rate = new Array(); // 格挡
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
        }
        TableGeneralQuality.Table = function () {
            if (TableGeneralQuality.table == null) {
                TableGeneralQuality.table = zj.Game.ConfigManager.getTable("table_general_quality.json");
                if (TableGeneralQuality.table == null)
                    TableGeneralQuality.table = {};
            }
            return TableGeneralQuality.table;
        };
        TableGeneralQuality.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralQuality.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralQuality.table = null;
        return TableGeneralQuality;
    }());
    zj.TableGeneralQuality = TableGeneralQuality;
    __reflect(TableGeneralQuality.prototype, "zj.TableGeneralQuality");
    window['TableGeneralQuality'] = TableGeneralQuality;
    // table_general_skill.csv
    // 描述
    var TableGeneralSkill = (function () {
        function TableGeneralSkill() {
            this.skill_id = 0; // 技能序列号
            this.des_private = ""; // 私人描述
            this.skill_name = ""; // 技能名称
            this.quality = 0; // 品质框
            this.uplevel_Id = ""; // 下一级Id
            this.uplevel_consume = new Array(); // 升级消耗
            this.awaken_consume = new Array(); // 激活消耗
            this.awaken_id = 0; // 觉醒ID（版本无）
            this.relate_still_effect = 0; // 关联静止指向特效
            this.des = ""; // 描述
            this.upgrade_des = ""; // 升级描速
            this.talent_des = new Array(); // 附加描述
            this.buff_des = new Array(); // BUFF描述
            this.skill_des = ""; // 未获得描述
            this.path = ""; // 图标路径
            this.skill_units = new Array(); // 技能单元
            this.skill_cd_icon = ""; // 技能cd图标
            this.skill_name_path = ""; // 技能名称路径
            this.skill_name2_path_s = ""; // 技能名称路径（小）
            this.extra_effect = new Array(); // 技能附加效果
            this.skill_cd = 0; // 技能cd时间
            this.skill_cd_entry = 0; // 入场技能cd时间
            this.skill_consume_rage = 0; // 消耗怒气值
            this.skill_big_type = 0; // 技能大类型(1-普攻，2-小技能，3必杀)
            this.skill_damage_type = 0; // 技能伤害类型(1-物理，2-魔法，3-神圣)
            this.skill_order = 0; // 技能优先级
            this.skill_hurt_ratio = new Array(); // 效果基础值(百分比)及升级增量
            this.skill_extra_value = new Array(); // 效果附加值(数值)及升级增量
            this.skill_upgrade_continueTime = new Array(); // 持续时间及升级增量
            this.skill_delay_time = 0; // 技能延迟时间
            this.skill_ai_type = 0; // 技能ai类型
            this.attack_time = 0; // 攻击次数
            this.attack_range = new Array(); // 攻击范围
        }
        TableGeneralSkill.Table = function () {
            if (TableGeneralSkill.table == null) {
                TableGeneralSkill.table = zj.Game.ConfigManager.getTable("table_general_skill.json");
                if (TableGeneralSkill.table == null)
                    TableGeneralSkill.table = {};
            }
            return TableGeneralSkill.table;
        };
        TableGeneralSkill.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralSkill.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralSkill.table = null;
        return TableGeneralSkill;
    }());
    zj.TableGeneralSkill = TableGeneralSkill;
    __reflect(TableGeneralSkill.prototype, "zj.TableGeneralSkill");
    window['TableGeneralSkill'] = TableGeneralSkill;
    // table_general_star.csv
    // 武将星级提升系数表
    var TableGeneralStar = (function () {
        function TableGeneralStar() {
            this.general_id = 0; // 序列号
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击
            this.crit_extra = new Array(); // 暴伤伤害
            this.dodge_rate = new Array(); // 格挡
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
        }
        TableGeneralStar.Table = function () {
            if (TableGeneralStar.table == null) {
                TableGeneralStar.table = zj.Game.ConfigManager.getTable("table_general_star.json");
                if (TableGeneralStar.table == null)
                    TableGeneralStar.table = {};
            }
            return TableGeneralStar.table;
        };
        TableGeneralStar.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralStar.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralStar.table = null;
        return TableGeneralStar;
    }());
    zj.TableGeneralStar = TableGeneralStar;
    __reflect(TableGeneralStar.prototype, "zj.TableGeneralStar");
    window['TableGeneralStar'] = TableGeneralStar;
    // table_general_step.csv
    // 武将阶级
    var TableGeneralStep = (function () {
        function TableGeneralStep() {
            this.general_step = 0; // 序列号
            this.general_quality = 0; // 武将品质
            this.general_pos = new Array(); // 羁绊位置
            this.add_skill = 0; // 技能点
            this.consume_money = 0; // 升阶铜钱消耗
            this.max_level = 0; // 等级上限
            this.name = ""; // 品阶名称
            this.name_path = ""; // 路径
            this.frame_path = ""; // 边框路径
        }
        TableGeneralStep.Table = function () {
            if (TableGeneralStep.table == null) {
                TableGeneralStep.table = zj.Game.ConfigManager.getTable("table_general_step.json");
                if (TableGeneralStep.table == null)
                    TableGeneralStep.table = {};
            }
            return TableGeneralStep.table;
        };
        TableGeneralStep.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralStep.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralStep.table = null;
        return TableGeneralStep;
    }());
    zj.TableGeneralStep = TableGeneralStep;
    __reflect(TableGeneralStep.prototype, "zj.TableGeneralStep");
    window['TableGeneralStep'] = TableGeneralStep;
    // table_general_talent.csv
    // 武将天赋
    var TableGeneralTalent = (function () {
        function TableGeneralTalent() {
            this.talent_id = 0; // 天赋唯一码
            this.talent_name = ""; // 天赋名称
            this.talent_type_name = ""; // 天赋类型名
            this.talent_type = 0; // 天赋类型
            this.talent_quality = 0; // 天赋品质
            this.open_level = 0; // 隐藏天赋开启等级（必杀技等级）
            this.max_level = 0; // 天赋最大等级
            this.uplevel_consume = new Array(); // 升级消耗
            this.is_awakened = 0; // 是否是觉醒技
            this.uplevel_generals = new Array(); // 升级消耗猎人
            this.talent_break = ""; // 天赋突破
            this.talent_describe = ""; // 天赋描述
            this.talent_type_des = ""; // 天赋类型描述
            this.skill_des = ""; // 未获得描述
            this.talent_pro_des = 0; // 0
            this.trigger_type = 0; // 天赋触发类型
            this.trigger_condition = new Array(); // 触发条件
            this.trigger_rate = new Array(); // 触发基础概率及升级参数
            this.trigger_decay = 0; // 触发衰减
            this.talent_effect = new Array(); // 天赋效果
            this.is_handOut = 0; // 是否分发
            this.handOut_rate = new Array(); // 分发每项概率
            this.talent_extra = 0; // 天赋额外参数
            this.talent_extra2 = 0; // 天赋额外参数2
            this.path = ""; // 图片
            this.spx_id = 0; // 资源序列号
            this.css_id = 0; // 资源序列号
            this.action_id = 0; // 行为序列号
            this.blend_active = 0; // 混合通道是否开启
            this.bones = 0; // 需要混合的骨骼名
            this.buff_pos = ""; // 位置
            this.is_eyes = 0; // 是否触发眼睛特效
            this.buff_name_path = ""; // 名称路径
            this.trigger_ani_index = 0; // 触发动画索引(战斗骨骼动画)
        }
        TableGeneralTalent.Table = function () {
            if (TableGeneralTalent.table == null) {
                TableGeneralTalent.table = zj.Game.ConfigManager.getTable("table_general_talent.json");
                if (TableGeneralTalent.table == null)
                    TableGeneralTalent.table = {};
            }
            return TableGeneralTalent.table;
        };
        TableGeneralTalent.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralTalent.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralTalent.table = null;
        return TableGeneralTalent;
    }());
    zj.TableGeneralTalent = TableGeneralTalent;
    __reflect(TableGeneralTalent.prototype, "zj.TableGeneralTalent");
    window['TableGeneralTalent'] = TableGeneralTalent;
    // table_general_talent_effect.csv
    // 天赋效果表
    var TableGeneralTalentEffect = (function () {
        function TableGeneralTalentEffect() {
            this.effect_id = 0; // 天赋效果id
            this.talent_type_name = ""; // 天赋类型名
            this.talent_type = 0; // 天赋类型
            this.effect_name = ""; // 天赋名称效果名称
            this.effect_type = 0; // 天赋效果
            this.effect_param = 0; // 天赋效果参数(备注：效果类型为1到4的可填数值参数，效果类型是7、8、9、10、13、14、23、24、25可区分伤害类型，如果不区分就填-1，效果类型是16、17的可填属性类型属性不可填-1，初次之外的其他类型如果没有其他需求都统一填-1
            this.effect_rate = new Array(); // 效果触发几率及升级参数
            this.effect_pos = 0; // 天赋效果施加位置
            this.effect_target = 0; // 天赋效果施加目标
            this.effect_value = new Array(); // 效果基础值及升级参数
            this.effect_value2 = new Array(); // 假效果基础值及升级参数
            this.scene_type = new Array(); // 场景类型
            this.scene_add_value = new Array(); // 场景附加
            this.growUp_value = new Array(); // 成长其他数值（赵云怒气）
            this.effect_extra = 0; // 效果额外参数个别天赋所用,如(龙魂、龙怨、诡道、猎杀等 )
            this.effect_extra2 = 0; // 效果额外参数个别天赋所用,如(龙魂、龙怨、诡道、猎杀等 )
            this.effect_extra3 = new Array(); // 效果额外参数个别天赋所用,如(龙魂、龙怨、诡道、猎杀等 )
            this.effect_buffId = 0; // 天赋效果产生的buff的id
            this.effect_buffLv = 0; // 天赋效果产生的buff的等级
            this.spx_id = 0; // 资源序列号
            this.action_id = 0; // 行为序列号
            this.blend_active = 0; // 混合通道是否开启
            this.bones = 0; // 需要混合通道的骨骼
            this.buff_pos = ""; // 位置
        }
        TableGeneralTalentEffect.Table = function () {
            if (TableGeneralTalentEffect.table == null) {
                TableGeneralTalentEffect.table = zj.Game.ConfigManager.getTable("table_general_talent_effect.json");
                if (TableGeneralTalentEffect.table == null)
                    TableGeneralTalentEffect.table = {};
            }
            return TableGeneralTalentEffect.table;
        };
        TableGeneralTalentEffect.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralTalentEffect.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralTalentEffect.table = null;
        return TableGeneralTalentEffect;
    }());
    zj.TableGeneralTalentEffect = TableGeneralTalentEffect;
    __reflect(TableGeneralTalentEffect.prototype, "zj.TableGeneralTalentEffect");
    window['TableGeneralTalentEffect'] = TableGeneralTalentEffect;
    // table_general_transfer.csv
    var TableGeneralTransfer = (function () {
        function TableGeneralTransfer() {
            this.general_id = 0; // 序列号
            this.general_name = ""; // 姓名
            this.general_add = 0; // 是否可变身
            this.consume_goods = new Array(); // 变身消耗物品
            this.general_level = 0; // 变身武将等级
            this.general_star = 0; // 变身武将星级
            this.pic_id = 0; // 变身头像
            this.transfer_role = 0; // 变身形象
            this.transfer_skill = 0; // 变身技能
            this.uplevel_consume = new Array(); // 升级技能消耗
            this.uplevel_consume_count = new Array(); // 升级技能消耗数量
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击率
            this.crit_extra = new Array(); // 暴击伤害
            this.dodge_rate = new Array(); // 格挡率
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
            this.name_pic = ""; // 变身后名字路径
            this.transfer_floor = ""; // 子项底板
            this.transfer_board = ""; // 子项遮盖
            this.transfer_des = ""; // 变身描述
        }
        TableGeneralTransfer.Table = function () {
            if (TableGeneralTransfer.table == null) {
                TableGeneralTransfer.table = zj.Game.ConfigManager.getTable("table_general_transfer.json");
                if (TableGeneralTransfer.table == null)
                    TableGeneralTransfer.table = {};
            }
            return TableGeneralTransfer.table;
        };
        TableGeneralTransfer.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableGeneralTransfer.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableGeneralTransfer.table = null;
        return TableGeneralTransfer;
    }());
    zj.TableGeneralTransfer = TableGeneralTransfer;
    __reflect(TableGeneralTransfer.prototype, "zj.TableGeneralTransfer");
    window['TableGeneralTransfer'] = TableGeneralTransfer;
    // table_halo.csv
    // 星耀光环
    var TableHalo = (function () {
        function TableHalo() {
            this.id = 0; // 编号
            this.name = ""; // 道具名字
            this.is_battle = 0; // 是否战斗光环
            this.add_type = new Array(); // 加成类型(1血量2攻击3防御4命中5抵抗6暴击8爆伤)
            this.add_crit = new Array(); // 血量加成
            this.halo_front_aniId = 0; // 星耀光环前侧动画id
            this.halo_back_aniId = 0; // 星耀光环后侧动画id
            this.scene_speed_add = 0; // 场景加速加成
            this.extra = ""; // 附加描述
            this.path = ""; // 图标路径
            this.des = ""; // 备注
        }
        TableHalo.Table = function () {
            if (TableHalo.table == null) {
                TableHalo.table = zj.Game.ConfigManager.getTable("table_halo.json");
                if (TableHalo.table == null)
                    TableHalo.table = {};
            }
            return TableHalo.table;
        };
        TableHalo.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableHalo.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableHalo.table = null;
        return TableHalo;
    }());
    zj.TableHalo = TableHalo;
    __reflect(TableHalo.prototype, "zj.TableHalo");
    window['TableHalo'] = TableHalo;
    // table_hunter_awake.csv
    // 武将觉醒表
    var TableHunterAwake = (function () {
        function TableHunterAwake() {
            this.general_id = 0; // 猎人ID
            this.general_hp = new Array(); // 生命值
            this.general_atk = new Array(); // 攻击
            this.general_def = new Array(); // 防御
            this.atk_crit = new Array(); // 暴击率
            this.crit_extra = new Array(); // 暴击伤害
            this.dodge_rate = new Array(); // 格挡率
            this.hit_rate = new Array(); // 忽视格挡
            this.ignore_phyDef = new Array(); // 忽视防御
            this.rage_reduce = new Array(); // 怒气减少
            this.universal_resistance = new Array(); // 异常状态抵抗
            this.ignore_resistance = new Array(); // 忽视异常抵抗
            this.float_resistance = new Array(); // 浮空抗性
            this.cd_speed = new Array(); // 速度
            this.support_consume = new Array(); // 援护怒气
            this.general_atk_all = new Array(); // 攻击（废弃）
            this.general_def_all = new Array(); // 防御(废弃）
            this.all_crit = new Array(); // 暴击(废弃)
            this.ignore_def_all = new Array(); // 忽视防御(废弃)
            this.skill_atk = new Array(); // 效果命中
            this.skill_def = new Array(); // 效果抵抗
            this.skill_crit = new Array(); // 技能暴击(废弃）
            this.crit_resistance = new Array(); // 暴击抵抗
            this.final_extra = new Array(); // 终极附加(废弃)
            this.final_reduce = new Array(); // 终极减免(废弃)
            this.ignore_magicDef = new Array(); // 忽视魔防（废弃）
        }
        TableHunterAwake.Table = function () {
            if (TableHunterAwake.table == null) {
                TableHunterAwake.table = zj.Game.ConfigManager.getTable("table_hunter_awake.json");
                if (TableHunterAwake.table == null)
                    TableHunterAwake.table = {};
            }
            return TableHunterAwake.table;
        };
        TableHunterAwake.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableHunterAwake.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableHunterAwake.table = null;
        return TableHunterAwake;
    }());
    zj.TableHunterAwake = TableHunterAwake;
    __reflect(TableHunterAwake.prototype, "zj.TableHunterAwake");
    window['TableHunterAwake'] = TableHunterAwake;
    // table_instance.csv
    // 副本
    var TableInstance = (function () {
        function TableInstance() {
            this.instance_id = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
            this.instance_name = ""; // 副本名称
            this.instance_pack = new Array(); // 副本包含关卡
            this.challenge_win = 0; // 挑战胜利消耗
            this.challenge_start = 0; // 挑战开始消耗
            this.challenge_level = 0; // 挑战等级
            this.challenge_num = 0; // 日挑战最大次数(0表示不限次数)
            this.open_licence = 0; // 开启执照等级
            this.open_elite = ""; // 开启精英
            this.battle_value = 0; // 推荐战力
            this.better_power = 0; // 推荐等级
            this.first_reward = new Array(); // 首杀奖励
            this.challenge_goods = new Array(); // 掉落物品
            this.rand_exp = ""; // 获得随机经验
            this.rand_items = new Array(); // 掉落组
            this.rand_result = new Array(); // 掉落概率以及掉落数量
            this.drop_money = 0; // 副本掉落铜钱
            this.first_drop = 0; // 首次必然掉落
            this.check_new = 0; // 检测各种新手相关(1表示打赢后直接为3星)
            this.battle_bg = 0; // 副本战斗背景id
            this.dialog_role = 0; // 对话怪id
            this.boss_information = 0; // Boss信息
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = 0; // Boss形象id（映射map_role表）
            this.instance_pic1 = ""; // 副本关卡插图（标题）
            this.instance_pic2 = ""; // 副本关卡插图（内容）
            this.instance_des = ""; // 副本说明
            this.talent_type = 0; // 天赋参数
        }
        TableInstance.Table = function () {
            if (TableInstance.table == null) {
                TableInstance.table = zj.Game.ConfigManager.getTable("table_instance.json");
                if (TableInstance.table == null)
                    TableInstance.table = {};
            }
            return TableInstance.table;
        };
        TableInstance.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstance.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstance.table = null;
        return TableInstance;
    }());
    zj.TableInstance = TableInstance;
    __reflect(TableInstance.prototype, "zj.TableInstance");
    window['TableInstance'] = TableInstance;
    // table_instance_area.csv
    // 副本区域区域
    var TableInstanceArea = (function () {
        function TableInstanceArea() {
            this.area_id = 0; // 区域id
            this.area_name = ""; // 区域名称
            this.area_normal = new Array(); // 区域包含普通副本章节
            this.area_elite = new Array(); // 区域包含精英副本章节
            this.area_search = new Array(); // 区域包含探索副本章节
            this.area_name_pic_big = ""; // 区域名称图片
            this.area_name_pic = ""; // 区域名称图片
            this.des = ""; // 区域介绍
            this.elite_drop_des = ""; // 精英副本掉落说明
            this.card_type = 0; // 卡片掉落类型
            this.open_level = 0; // 
        }
        TableInstanceArea.Table = function () {
            if (TableInstanceArea.table == null) {
                TableInstanceArea.table = zj.Game.ConfigManager.getTable("table_instance_area.json");
                if (TableInstanceArea.table == null)
                    TableInstanceArea.table = {};
            }
            return TableInstanceArea.table;
        };
        TableInstanceArea.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceArea.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceArea.table = null;
        return TableInstanceArea;
    }());
    zj.TableInstanceArea = TableInstanceArea;
    __reflect(TableInstanceArea.prototype, "zj.TableInstanceArea");
    window['TableInstanceArea'] = TableInstanceArea;
    // table_instance_chest.csv
    // 副本宝箱
    var TableInstanceChest = (function () {
        function TableInstanceChest() {
            this.instance_id = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
            this.goods_ids = new Array(); // 物品id
            this.goods_counts = new Array(); // 物品数量
            this.show_type = new Array(); // 显示类型
        }
        TableInstanceChest.Table = function () {
            if (TableInstanceChest.table == null) {
                TableInstanceChest.table = zj.Game.ConfigManager.getTable("table_instance_chest.json");
                if (TableInstanceChest.table == null)
                    TableInstanceChest.table = {};
            }
            return TableInstanceChest.table;
        };
        TableInstanceChest.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceChest.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceChest.table = null;
        return TableInstanceChest;
    }());
    zj.TableInstanceChest = TableInstanceChest;
    __reflect(TableInstanceChest.prototype, "zj.TableInstanceChest");
    window['TableInstanceChest'] = TableInstanceChest;
    // table_instance_group.csv
    // 组队战
    var TableInstanceGroup = (function () {
        function TableInstanceGroup() {
            this.id = 0; // 层数
            this.instance_name = ""; // 关卡名称
            this.type = 0; // 副本类型
            this.monster_stages = new Array(); // 怪物
            this.first_reward = new Array(); // 首杀奖励
            this.static_reward_best = new Array(); // 三队固定物品奖励
            this.rand_reward_best = new Array(); // 三队随机物品奖励
            this.static_reward_bad = new Array(); // 两队固定物品奖励
            this.rand_reward_bad = new Array(); // 两队随机物品奖励
            this.friend_reward = new Array(); // 好友奖励
            this.des = ""; // 描述
            this.client_reward_id = new Array(); // 奖励物品id客户端
            this.client_reward_count = new Array(); // 奖励物品客户端
            this.client_reward_show = new Array(); // 奖励物品客户端
            this.reward_good_id2 = new Array(); // 奖励物品id(两队胜)
            this.reward_good_count2 = new Array(); // 奖励物品数量
            this.reward_good_id3 = new Array(); // 奖励物品id(三队胜)
            this.reward_good_count3 = new Array(); // 奖励物品数量
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = new Array(); // 怪物阵型
            this.boss_name = ""; // 怪物名
            this.boss_name1 = new Array(); // 怪物名
            this.monster_level = ""; // 怪物等级
            this.pic_path = ""; // 背景图
        }
        TableInstanceGroup.Table = function () {
            if (TableInstanceGroup.table == null) {
                TableInstanceGroup.table = zj.Game.ConfigManager.getTable("table_instance_group.json");
                if (TableInstanceGroup.table == null)
                    TableInstanceGroup.table = {};
            }
            return TableInstanceGroup.table;
        };
        TableInstanceGroup.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceGroup.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceGroup.table = null;
        return TableInstanceGroup;
    }());
    zj.TableInstanceGroup = TableInstanceGroup;
    __reflect(TableInstanceGroup.prototype, "zj.TableInstanceGroup");
    window['TableInstanceGroup'] = TableInstanceGroup;
    // table_instance_relic.csv
    var TableInstanceRelic = (function () {
        function TableInstanceRelic() {
            this.id = 0; // id
            this.name = ""; // 名称
            this.max_step = 0; // 最大阶段
            this.monster_stage = new Array(); // 关卡
            this.week_time = new Array(); // 鞭尸时间(秒)
            this.battle_level = 0; // 挑战等级
            this.open_day = new Array(); // 开启时间
            this.first_rewards = new Array(); // 首杀奖励
            this.open_chest = new Array(); // 可开宝箱
            this.reward_goods = new Array(); // 必掉物品
            this.reward_count = new Array(); // 必掉数量
            this.damage_zone = new Array(); // 伤害区间
            this.damage_daily_goods = new Array(); // 伤害日常奖励物品
            this.damage_daily_count = new Array(); // 伤害日常奖励数量
            this.mapBg = 0; // 地图map
            this.feature = new Array(); // 怪物特性
            this.boss_head_client = ""; // 怪物头像（客户端）
            this.boss_des = 0; // 怪物描述
            this.award_des = 0; // 产出描述
            this.relic_pic = ""; // 关卡名图片
            this.relic_goods_client = new Array(); // 客户端显示掉落
            this.boss_head_license = ""; // 怪物头像（攻略用）
            this.relic_pic_license = ""; // 关卡名图片（攻略用）
        }
        TableInstanceRelic.Table = function () {
            if (TableInstanceRelic.table == null) {
                TableInstanceRelic.table = zj.Game.ConfigManager.getTable("table_instance_relic.json");
                if (TableInstanceRelic.table == null)
                    TableInstanceRelic.table = {};
            }
            return TableInstanceRelic.table;
        };
        TableInstanceRelic.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceRelic.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceRelic.table = null;
        return TableInstanceRelic;
    }());
    zj.TableInstanceRelic = TableInstanceRelic;
    __reflect(TableInstanceRelic.prototype, "zj.TableInstanceRelic");
    window['TableInstanceRelic'] = TableInstanceRelic;
    // table_instance_relic_chest.csv
    var TableInstanceRelicChest = (function () {
        function TableInstanceRelicChest() {
            this.chest_id = 0; // id
            this.open_time = 0; // 开启次数
            this.price = new Array(); // 价格
            this.rand_item = new Array(); // 随机
            this.client_good = new Array(); // 客户端掉落物品客户端掉落数量
            this.path = new Array(); // 宝箱图片
        }
        TableInstanceRelicChest.Table = function () {
            if (TableInstanceRelicChest.table == null) {
                TableInstanceRelicChest.table = zj.Game.ConfigManager.getTable("table_instance_relic_chest.json");
                if (TableInstanceRelicChest.table == null)
                    TableInstanceRelicChest.table = {};
            }
            return TableInstanceRelicChest.table;
        };
        TableInstanceRelicChest.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceRelicChest.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceRelicChest.table = null;
        return TableInstanceRelicChest;
    }());
    zj.TableInstanceRelicChest = TableInstanceRelicChest;
    __reflect(TableInstanceRelicChest.prototype, "zj.TableInstanceRelicChest");
    window['TableInstanceRelicChest'] = TableInstanceRelicChest;
    // table_instance_search.csv
    // 精英副本章节
    var TableInstanceSearch = (function () {
        function TableInstanceSearch() {
            this.index = 0; // 索引
            this.name = ""; // 描述
            this.quailty = 0; // 品质
            this.power = 0; // 权重
            this.rand_des = new Array(); // 描述
            this.rand_item = new Array(); // 奖励
            this.condition = new Array(); // 条件数量
            this.condition_power = new Array(); // 条件数量权重
            this.condition_enum = new Array(); // 条件枚举
            this.condition_enum_power = new Array(); // 条件枚举权重
            this.step = new Array(); // 品阶
            this.step_power = new Array(); // 品阶权重
            this.level = new Array(); // 等级
            this.level_power = new Array(); // 等级权重
            this.star = new Array(); // 星级
            this.star_power = new Array(); // 星级权重
            this.aptitude = new Array(); // 资质(11|12|13|14)
            this.aptitude_power = new Array(); // 品质权重
            this.type = new Array(); // 派系
            this.type_power = new Array(); // 派系权重
            this.time = 0; // 时长
        }
        TableInstanceSearch.Table = function () {
            if (TableInstanceSearch.table == null) {
                TableInstanceSearch.table = zj.Game.ConfigManager.getTable("table_instance_search.json");
                if (TableInstanceSearch.table == null)
                    TableInstanceSearch.table = {};
            }
            return TableInstanceSearch.table;
        };
        TableInstanceSearch.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceSearch.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceSearch.table = null;
        return TableInstanceSearch;
    }());
    zj.TableInstanceSearch = TableInstanceSearch;
    __reflect(TableInstanceSearch.prototype, "zj.TableInstanceSearch");
    window['TableInstanceSearch'] = TableInstanceSearch;
    // table_instance_village.csv
    // 铜钱经验副本
    var TableInstanceVillage = (function () {
        function TableInstanceVillage() {
            this.instance_id = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
            this.instance_name = ""; // 副本名称
            this.instance_pack = new Array(); // 副本包含关卡
            this.recommond_value = 0; // 推荐战斗力
            this.goodses = new Array(); // 掉落物品
            this.total_damage = new Array(); // 总伤害
            this.max_combo = new Array(); // 最大连击
            this.add_max = 0; // 加成最大值
            this.auto_fight = 0; // 是否强制自动战斗
            this.battle_bg = 0; // 副本战斗背景id
            this.boss_roleId = 0; // Boss形象id（映射map_role表）
            this.instance_des = ""; // 副本说明
        }
        TableInstanceVillage.Table = function () {
            if (TableInstanceVillage.table == null) {
                TableInstanceVillage.table = zj.Game.ConfigManager.getTable("table_instance_village.json");
                if (TableInstanceVillage.table == null)
                    TableInstanceVillage.table = {};
            }
            return TableInstanceVillage.table;
        };
        TableInstanceVillage.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableInstanceVillage.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableInstanceVillage.table = null;
        return TableInstanceVillage;
    }());
    zj.TableInstanceVillage = TableInstanceVillage;
    __reflect(TableInstanceVillage.prototype, "zj.TableInstanceVillage");
    window['TableInstanceVillage'] = TableInstanceVillage;
    // table_integral_egg.csv
    // 扭蛋机
    var TableIntegralEgg = (function () {
        function TableIntegralEgg() {
            this.id = 0; // 主题id
            this.name = ""; // 主题名称
            this.rand_item = new Array(); // 随机物品
            this.rand_power = new Array(); // 随机权重
            this.exchange_goods = new Array(); // 兑换物品
            this.exchange_integral = new Array(); // 兑换积分
            this.exchange_count = new Array(); // 兑换次数
            this.consume_token = 0; // 单抽消耗钻石
            this.consume_token_ten = 0; // 十次抽消耗钻石
            this.gift_content = new Array(); // 礼包内容
            this.gift_consume = 0; // 礼包消耗
            this.first_rand = 0; // 首次单抽给
            this.ten_rand = 0; // 十连抽必给
            this.get_integral = 0; // 单抽获取积分
            this.subject_duration = 0; // 主题时长
            this.background = ""; // 背景
            this.client_goods = new Array(); // 客户端显示物品
            this.path = ""; // 礼包配图
        }
        TableIntegralEgg.Table = function () {
            if (TableIntegralEgg.table == null) {
                TableIntegralEgg.table = zj.Game.ConfigManager.getTable("table_integral_egg.json");
                if (TableIntegralEgg.table == null)
                    TableIntegralEgg.table = {};
            }
            return TableIntegralEgg.table;
        };
        TableIntegralEgg.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableIntegralEgg.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableIntegralEgg.table = null;
        return TableIntegralEgg;
    }());
    zj.TableIntegralEgg = TableIntegralEgg;
    __reflect(TableIntegralEgg.prototype, "zj.TableIntegralEgg");
    window['TableIntegralEgg'] = TableIntegralEgg;
    // table_item_base.csv
    // 总表
    var TableItemBase = (function () {
        function TableItemBase() {
            this.type = 0; // 类型
            this.name = ""; // 中文名
            this.is_overlap = 0; // 是否可叠加
            this.is_sell = 0; // 是否可出售
            this.min_id = 0; // 最小ID
            this.max_id = 0; // 最大ID
            this.table_name = ""; // 对应表名
            this.client_min_id = new Array(); // 区别物品类型最小id（区分非name列名字）
            this.client_max_id = new Array(); // 区别物品类型最大id
            this.client_name = new Array(); // 区别物品类型名
        }
        TableItemBase.Table = function () {
            if (TableItemBase.table == null) {
                TableItemBase.table = zj.Game.ConfigManager.getTable("table_item_base.json");
                if (TableItemBase.table == null)
                    TableItemBase.table = {};
            }
            return TableItemBase.table;
        };
        TableItemBase.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemBase.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemBase.table = null;
        return TableItemBase;
    }());
    zj.TableItemBase = TableItemBase;
    __reflect(TableItemBase.prototype, "zj.TableItemBase");
    window['TableItemBase'] = TableItemBase;
    // table_item_cimelia.csv
    // 物品宝箱
    var TableItemCimelia = (function () {
        function TableItemCimelia() {
            this.id = 0; // 唯一标识(131开头是仙境果子)
            this.name = ""; // 名称
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.is_lost = 0; // 是否会被爆
            this.rand_items = new Array(); // 随机分组
            this.rand_power = new Array(); // 随机权重
            this.is_first = 0; // 首次必出(卡片ID)
            this.is_will = 0; // 必出一个
            this.rand_count = 0; // 随机最大数量
            this.is_bag_rule = 0; // 是否遵循卡包规则
            this.des = ""; // 基本描述
            this.extrac = ""; // 附加描述
            this.path = ""; // 图标路径
            this.path_big = ""; // 大图标
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(参考table_item_prop.csv)
            this.fruit_id = ""; // 果实id
        }
        TableItemCimelia.Table = function () {
            if (TableItemCimelia.table == null) {
                TableItemCimelia.table = zj.Game.ConfigManager.getTable("table_item_cimelia.json");
                if (TableItemCimelia.table == null)
                    TableItemCimelia.table = {};
            }
            return TableItemCimelia.table;
        };
        TableItemCimelia.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemCimelia.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemCimelia.table = null;
        return TableItemCimelia;
    }());
    zj.TableItemCimelia = TableItemCimelia;
    __reflect(TableItemCimelia.prototype, "zj.TableItemCimelia");
    window['TableItemCimelia'] = TableItemCimelia;
    // table_item_client.csv
    // 客户端显示用物品
    var TableItemClient = (function () {
        function TableItemClient() {
            this.id = 0; // 资源编号
            this.name = ""; // 资源名字
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.path = ""; // 大图标
            this.icon = ""; // 小图标
            this.frame = ""; // 边框
            this.frame_mask = ""; // 边框遮罩
            this.client_star = 0; // 星级
            this.small_icon = ""; // 小图标
            this.des = ""; // 描述
            this.from = new Array(); // 获取途径
            this.is_card = ""; // 是否属于卡片类物品
            this.is_piece = 0; // 是否是碎片
        }
        TableItemClient.Table = function () {
            if (TableItemClient.table == null) {
                TableItemClient.table = zj.Game.ConfigManager.getTable("table_item_client.json");
                if (TableItemClient.table == null)
                    TableItemClient.table = {};
            }
            return TableItemClient.table;
        };
        TableItemClient.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemClient.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemClient.table = null;
        return TableItemClient;
    }());
    zj.TableItemClient = TableItemClient;
    __reflect(TableItemClient.prototype, "zj.TableItemClient");
    window['TableItemClient'] = TableItemClient;
    // table_item_collect.csv
    // 收集
    var TableItemCollect = (function () {
        function TableItemCollect() {
            this.id = 0; // 材料id
            this.name = ""; // 名字
            this.quality = 0; // 品质
            this.price = 0; // 出售价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 到期时间
            this.path = ""; // 路径
            this.des = ""; // 描述
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(参考table_item_prop.csv)
        }
        TableItemCollect.Table = function () {
            if (TableItemCollect.table == null) {
                TableItemCollect.table = zj.Game.ConfigManager.getTable("table_item_collect.json");
                if (TableItemCollect.table == null)
                    TableItemCollect.table = {};
            }
            return TableItemCollect.table;
        };
        TableItemCollect.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemCollect.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemCollect.table = null;
        return TableItemCollect;
    }());
    zj.TableItemCollect = TableItemCollect;
    __reflect(TableItemCollect.prototype, "zj.TableItemCollect");
    window['TableItemCollect'] = TableItemCollect;
    // table_item_equip_carve.csv
    // 物品装备刻印材料
    var TableItemEquipCarve = (function () {
        function TableItemEquipCarve() {
            this.id = 0; // 材料id
            this.name = 0; // 名字
            this.quality = 0; // 品质
            this.price = 0; // 出售价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = 0; // 道具到期时间
            this.compose_id = 0; // 合成后刻印石
            this.compose_count = 0; // 合成所需数量
            this.client_transfer = new Array(); // 客户端用的转换信息
            this.compose_cost = 0; // 合成花费
            this.path = 0; // 路径
            this.des = 0; // 描述
            this.from = new Array(); // 获取途径
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(参考table_item_prop.csv)
        }
        TableItemEquipCarve.Table = function () {
            if (TableItemEquipCarve.table == null) {
                TableItemEquipCarve.table = zj.Game.ConfigManager.getTable("table_item_equip_carve.json");
                if (TableItemEquipCarve.table == null)
                    TableItemEquipCarve.table = {};
            }
            return TableItemEquipCarve.table;
        };
        TableItemEquipCarve.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemEquipCarve.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemEquipCarve.table = null;
        return TableItemEquipCarve;
    }());
    zj.TableItemEquipCarve = TableItemEquipCarve;
    __reflect(TableItemEquipCarve.prototype, "zj.TableItemEquipCarve");
    window['TableItemEquipCarve'] = TableItemEquipCarve;
    // table_item_equip_forge.csv
    // 物品装备锻造材料
    var TableItemEquipForge = (function () {
        function TableItemEquipForge() {
            this.id = 0; // 材料id
            this.name = 0; // 名字
            this.quality = 0; // 品质
            this.price = 0; // 出售价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = 0; // 道具到期时间
            this.path = 0; // 路径
            this.des = 0; // 描述
            this.from = new Array(); // 获取处
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(参考table_item_prop.csv)
        }
        TableItemEquipForge.Table = function () {
            if (TableItemEquipForge.table == null) {
                TableItemEquipForge.table = zj.Game.ConfigManager.getTable("table_item_equip_forge.json");
                if (TableItemEquipForge.table == null)
                    TableItemEquipForge.table = {};
            }
            return TableItemEquipForge.table;
        };
        TableItemEquipForge.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemEquipForge.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemEquipForge.table = null;
        return TableItemEquipForge;
    }());
    zj.TableItemEquipForge = TableItemEquipForge;
    __reflect(TableItemEquipForge.prototype, "zj.TableItemEquipForge");
    window['TableItemEquipForge'] = TableItemEquipForge;
    // table_item_fashion.csv
    // ʱװ
    var TableItemFashion = (function () {
        function TableItemFashion() {
            this.id = 0; // 唯一标识
            this.name = ""; // 名称
            this.quality = 0; // 品质
            this.fashion_roleId = 0; // 映射mapRoleId
            this.buy_type = 0; // 获取类型（0游戏内获取，1道具购买）
            this.buy_price = 0; // 购买花费
            this.price = 0; // 卖出价格
            this.appearance_count = 0; // 分解数量
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.fashion_ratio = 0; // 权重比
            this.match_general = 0; // 匹配武将
            this.pic_id = 0; // 获得头像
            this.des = ""; // 基本描述
            this.extrac = ""; // 附加描述
            this.path = ""; // 图标路径
            this.shadow = ""; // 阴影图片
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴伤伤害
            this.dodge_rate = 0; // 格挡
            this.hit_rate = 0; // 忽视格挡
            this.ignore_phyDef = 0; // 忽视防御
            this.rage_reduce = 0; // 怒气减少
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.float_resistance = 0; // 浮空抗性
            this.cd_speed = 0; // 速度
            this.support_consume = 0; // 援护怒气
            this.general_atk_all = 0; // 攻击(废弃）
            this.general_def_all = 0; // 防御(废弃）
            this.all_crit = 0; // 暴击（废弃）
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.skill_crit = 0; // 技能暴击(废弃）
            this.crit_resistance = 0; // 暴击抵抗
            this.final_extra = 0; // 终极附加(废弃)
            this.final_reduce = 0; // 终极减免(废弃)
            this.ignore_magicDef = 0; // 忽视魔防（废弃）
            this.from = new Array(); // 产出
        }
        TableItemFashion.Table = function () {
            if (TableItemFashion.table == null) {
                TableItemFashion.table = zj.Game.ConfigManager.getTable("table_item_fashion.json");
                if (TableItemFashion.table == null)
                    TableItemFashion.table = {};
            }
            return TableItemFashion.table;
        };
        TableItemFashion.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemFashion.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemFashion.table = null;
        return TableItemFashion;
    }());
    zj.TableItemFashion = TableItemFashion;
    __reflect(TableItemFashion.prototype, "zj.TableItemFashion");
    window['TableItemFashion'] = TableItemFashion;
    // table_item_general.csv
    // 物品武将
    var TableItemGeneral = (function () {
        function TableItemGeneral() {
            this.id = 0; // 唯一标识
            this.name = ""; // 名称
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.match_general = 0; // 匹配武将
            this.general_soul = 0; // 武将信物转化
            this.des = ""; // 基本描述
            this.extrac = 0; // 附加描述
            this.path = ""; // 图标路径
            this.from = new Array(); // 获取途径
        }
        TableItemGeneral.Table = function () {
            if (TableItemGeneral.table == null) {
                TableItemGeneral.table = zj.Game.ConfigManager.getTable("table_item_general.json");
                if (TableItemGeneral.table == null)
                    TableItemGeneral.table = {};
            }
            return TableItemGeneral.table;
        };
        TableItemGeneral.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemGeneral.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemGeneral.table = null;
        return TableItemGeneral;
    }());
    zj.TableItemGeneral = TableItemGeneral;
    __reflect(TableItemGeneral.prototype, "zj.TableItemGeneral");
    window['TableItemGeneral'] = TableItemGeneral;
    // table_item_general_soul.csv
    // 物品武将魂
    var TableItemGeneralSoul = (function () {
        function TableItemGeneralSoul() {
            this.id = 0; // 武将魂Id
            this.name = ""; // 武将魂名称
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.path = ""; // 路径
            this.des = ""; // 描述
            this.from = ""; // 获取途径
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(参考table_item_prop.csv)
        }
        TableItemGeneralSoul.Table = function () {
            if (TableItemGeneralSoul.table == null) {
                TableItemGeneralSoul.table = zj.Game.ConfigManager.getTable("table_item_general_soul.json");
                if (TableItemGeneralSoul.table == null)
                    TableItemGeneralSoul.table = {};
            }
            return TableItemGeneralSoul.table;
        };
        TableItemGeneralSoul.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemGeneralSoul.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemGeneralSoul.table = null;
        return TableItemGeneralSoul;
    }());
    zj.TableItemGeneralSoul = TableItemGeneralSoul;
    __reflect(TableItemGeneralSoul.prototype, "zj.TableItemGeneralSoul");
    window['TableItemGeneralSoul'] = TableItemGeneralSoul;
    // table_item_jade.csv
    // 宝石
    var TableItemJade = (function () {
        function TableItemJade() {
            this.id = 0; // 道具编号
            this.name = ""; // 道具名字
            this.quality = 0; // 道具品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.priority = 0; // 优先级
            this.compose_id = ""; // 合成的玉石
            this.compose_count = 0; // 合成所需数量
            this.update_cost = 0; // 合成花费铜钱
            this.jade_type = 0; // 宝石类型
            this.jade_level = 0; // 宝石等级
            this.refresh_consume = 0; // 磨洗消耗
            this.refresh_power = 0; // 磨洗权值
            this.refresh_up_rand = 0; // 磨洗升级概率
            this.show_type = 0; // 显示类型
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴伤伤害
            this.dodge_rate = 0; // 格挡
            this.hit_rate = 0; // 忽视格挡
            this.ignore_phyDef = 0; // 忽视防御
            this.rage_reduce = 0; // 怒气减少
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.float_resistance = 0; // 浮空抗性
            this.cd_speed = 0; // 速度
            this.support_consume = 0; // 援护怒气
            this.general_atk_all = 0; // 攻击(废弃）
            this.general_def_all = 0; // 防御(废弃）
            this.all_crit = 0; // 暴击（废弃）
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_atk = 0; // 法术攻击（废弃）
            this.skill_def = 0; // 法术防御(废弃）
            this.skill_crit = 0; // 技能暴击(废弃）
            this.crit_resistance = 0; // 暴击抵抗（废弃）
            this.final_extra = 0; // 终极附加(废弃)
            this.final_reduce = 0; // 终极减免(废弃)
            this.ignore_magicDef = 0; // 忽视魔防（废弃）
            this.extra = ""; // 附加描述
            this.des = ""; // 附加描述
            this.little_path = ""; // 图标路径
            this.path = ""; // 图标路径
        }
        TableItemJade.Table = function () {
            if (TableItemJade.table == null) {
                TableItemJade.table = zj.Game.ConfigManager.getTable("table_item_jade.json");
                if (TableItemJade.table == null)
                    TableItemJade.table = {};
            }
            return TableItemJade.table;
        };
        TableItemJade.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemJade.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemJade.table = null;
        return TableItemJade;
    }());
    zj.TableItemJade = TableItemJade;
    __reflect(TableItemJade.prototype, "zj.TableItemJade");
    window['TableItemJade'] = TableItemJade;
    // table_item_partner.csv
    // 物品羁绊卡
    var TableItemPartner = (function () {
        function TableItemPartner() {
            this.id = 0; // 类型
            this.no_use = 0; // 辅助
            this.name = ""; // 中文名
            this.fullName = ""; // 全称
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.compose = 0; // 合成所需
            this.level = 0; // 品级
            this.count = 0; // 合成数量
            this.consume = 0; // 消耗铜钱
            this.transfer_good = new Array(); // 转化所需物品（0表示不能转化）
            this.transfer_count = new Array(); // 转化所需数量
            this.path = ""; // 图标
            this.from = new Array(); // 获取途径
            this.des = ""; // 物品描述
            this.use_tips = 0; // 使用跳转界面(空-不显示，100-转化)
        }
        TableItemPartner.Table = function () {
            if (TableItemPartner.table == null) {
                TableItemPartner.table = zj.Game.ConfigManager.getTable("table_item_partner.json");
                if (TableItemPartner.table == null)
                    TableItemPartner.table = {};
            }
            return TableItemPartner.table;
        };
        TableItemPartner.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemPartner.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemPartner.table = null;
        return TableItemPartner;
    }());
    zj.TableItemPartner = TableItemPartner;
    __reflect(TableItemPartner.prototype, "zj.TableItemPartner");
    window['TableItemPartner'] = TableItemPartner;
    // table_item_partner_split.csv
    // 物品羁绊卡碎片
    var TableItemPartnerSplit = (function () {
        function TableItemPartnerSplit() {
            this.id = 0; // 类型
            this.name = ""; // 中文名
            this.fullName = ""; // 全称
            this.level = 0; // 等级
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.path = ""; // 图标
            this.des = ""; // 物品描述
        }
        TableItemPartnerSplit.Table = function () {
            if (TableItemPartnerSplit.table == null) {
                TableItemPartnerSplit.table = zj.Game.ConfigManager.getTable("table_item_partner_split.json");
                if (TableItemPartnerSplit.table == null)
                    TableItemPartnerSplit.table = {};
            }
            return TableItemPartnerSplit.table;
        };
        TableItemPartnerSplit.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemPartnerSplit.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemPartnerSplit.table = null;
        return TableItemPartnerSplit;
    }());
    zj.TableItemPartnerSplit = TableItemPartnerSplit;
    __reflect(TableItemPartnerSplit.prototype, "zj.TableItemPartnerSplit");
    window['TableItemPartnerSplit'] = TableItemPartnerSplit;
    // table_item_pet_hat.csv
    var TableItemPetHat = (function () {
        function TableItemPetHat() {
            this.id = 0; // 道具编号
            this.name = ""; // 道具名字
            this.quality = 0; // 道具品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = 0; // 道具到期时间
            this.pet_id = 0; // 宠物id
            this.path = ""; // 图标路径
            this.extra = ""; // 附加描述
            this.des = ""; // 备注
        }
        TableItemPetHat.Table = function () {
            if (TableItemPetHat.table == null) {
                TableItemPetHat.table = zj.Game.ConfigManager.getTable("table_item_pet_hat.json");
                if (TableItemPetHat.table == null)
                    TableItemPetHat.table = {};
            }
            return TableItemPetHat.table;
        };
        TableItemPetHat.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemPetHat.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemPetHat.table = null;
        return TableItemPetHat;
    }());
    zj.TableItemPetHat = TableItemPetHat;
    __reflect(TableItemPetHat.prototype, "zj.TableItemPetHat");
    window['TableItemPetHat'] = TableItemPetHat;
    // table_item_pic.csv
    // 物品头像
    var TableItemPic = (function () {
        function TableItemPic() {
            this.id = 0; // 道具编号
            this.name = ""; // 道具名字
            this.quality = 0; // 道具品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.match_general = 0; // 映射武将
            this.mapRole_id = 0; // 映射人物模型id
            this.extra = ""; // 附加描述
            this.path = ""; // 图标路径
            this.half_path = ""; // 半身路径
            this.des = ""; // 备注
            this.type = 0; // 类型（-1不当做头像，1当做武将普通头像，2武将高级头像，3帮会普通头像）
        }
        TableItemPic.Table = function () {
            if (TableItemPic.table == null) {
                TableItemPic.table = zj.Game.ConfigManager.getTable("table_item_pic.json");
                if (TableItemPic.table == null)
                    TableItemPic.table = {};
            }
            return TableItemPic.table;
        };
        TableItemPic.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemPic.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemPic.table = null;
        return TableItemPic;
    }());
    zj.TableItemPic = TableItemPic;
    __reflect(TableItemPic.prototype, "zj.TableItemPic");
    window['TableItemPic'] = TableItemPic;
    // table_item_pic_frame.csv
    // 物品头像框
    var TableItemPicFrame = (function () {
        function TableItemPicFrame() {
            this.id = 0; // 道具编号
            this.order = 0; // 排序
            this.name = ""; // 道具名字
            this.quality = 0; // 道具品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = 0; // 道具到期时间
            this.extra = ""; // 附加描述
            this.path = ""; // 边框路径
            this.path_frame = ""; // 图标路径
            this.des = ""; // 备注
            this.from = new Array(); // 获取途径
        }
        TableItemPicFrame.Table = function () {
            if (TableItemPicFrame.table == null) {
                TableItemPicFrame.table = zj.Game.ConfigManager.getTable("table_item_pic_frame.json");
                if (TableItemPicFrame.table == null)
                    TableItemPicFrame.table = {};
            }
            return TableItemPicFrame.table;
        };
        TableItemPicFrame.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemPicFrame.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemPicFrame.table = null;
        return TableItemPicFrame;
    }());
    zj.TableItemPicFrame = TableItemPicFrame;
    __reflect(TableItemPicFrame.prototype, "zj.TableItemPicFrame");
    window['TableItemPicFrame'] = TableItemPicFrame;
    // table_item_potato.csv
    // 宝物
    var TableItemPotato = (function () {
        function TableItemPotato() {
            this.id = 0; // 道具编号
            this.name = ""; // 道具名字
            this.num = ""; // 编号
            this.rarity = 0; // 稀有度
            this.rare_card = 0; // 是否为特殊卡片
            this.quality = 0; // 道具品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.appraise_add = new Array(); // 必出属性
            this.type = 0; // 派系
            this.star = 0; // 初始星级
            this.level = 0; // 初始等级
            this.up_money = new Array(); // 进阶消耗金钱
            this.compose_ids = new Array(); // 合成消耗物品
            this.compose_counts = new Array(); // 合成物品数量
            this.compose_money = ""; // 合成消耗金钱
            this.up_goods = new Array(); // 进阶消耗材料
            this.add_count = new Array(); // 附加属性数量
            this.bag_count = ""; // 卡包附加属性数量
            this.add_type = 0; // 属性数值类型（1数值|2百分比）
            this.attri_type = 0; // 属性类型
            this.attri_value = 0; // 属性数值
            this.attri_star = new Array(); // 星级加成
            this.attri_level = new Array(); // 等级加成
            this.add_type2 = 0; // 升品数值类型
            this.attri_type2 = 0; // 升品属性类型
            this.attri_value2 = 0; // 升品属性数值
            this.client_transfer = new Array(); // 客户端用的转换信息
            this.extra = ""; // 附加描述
            this.des = ""; // 附加描述
            this.package_des = ""; // 礼包描述
            this.paths = ""; // 小图标路径
            this.path = ""; // 图标路径
            this.from = new Array(); // 获取途径
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(1-使用界面/2-武将界面/3-装备界面/4-神兵界面/5-军师界面/6-武将觉醒/7-神兵碎片转换/8-聊天/9-帮会/10-用户界面/11-收集跳转)
        }
        TableItemPotato.Table = function () {
            if (TableItemPotato.table == null) {
                TableItemPotato.table = zj.Game.ConfigManager.getTable("table_item_potato.json");
                if (TableItemPotato.table == null)
                    TableItemPotato.table = {};
            }
            return TableItemPotato.table;
        };
        TableItemPotato.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemPotato.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemPotato.table = null;
        return TableItemPotato;
    }());
    zj.TableItemPotato = TableItemPotato;
    __reflect(TableItemPotato.prototype, "zj.TableItemPotato");
    window['TableItemPotato'] = TableItemPotato;
    // table_item_prop.csv
    // 物品道具
    var TableItemProp = (function () {
        function TableItemProp() {
            this.id = 0; // 道具编号
            this.name = ""; // 道具名字
            this.quality = 0; // 道具品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.general_exp = ""; // 提供武将经验
            this.money = ""; // 使用增加铜钱
            this.power = ""; // 使用增加体力
            this.talent_exp = ""; // 可提天赋升级经验
            this.consume_money = ""; // 吞噬时需要多少金钱
            this.skill_point_add = ""; // 使用增加技能点
            this.friend_exp_add = ""; // 使用增加亲密度
            this.transfer_info = ""; // 转化信息
            this.potato_addattri = ""; // 鉴定附加属性条数
            this.add_randpower = ""; // 使用提升成功概率
            this.is_return = ""; // 是否返还消耗物品
            this.compose_rarity = ""; // 合成稀有度
            this.compose_quality = ""; // 合成品质
            this.compose_name = ""; // 合成显示名字
            this.compose_star = ""; // 合成星级
            this.compose_purple = ""; // 是否紫星
            this.compose_counts = ""; // 合成消耗
            this.compose_path = ""; // 合成图片
            this.compose_cards = new Array(); // 合成卡片（0合成具体的卡，1随机卡）
            this.is_bag_rule = ""; // 是否遵循卡包规则
            this.client_transfer = new Array(); // 客户端用的转换信息
            this.extra = ""; // 附加描述
            this.des = ""; // 附加描述
            this.otherDes = ""; // 其他描述（可用于神秘卡片描述等）
            this.path = ""; // 图标路径
            this.from = new Array(); // 获取途径
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(1-使用界面/2-武将界面/3-装备界面/4-神兵界面/5-军师界面/6-武将觉醒/7-神兵碎片转换/8-聊天/9-帮会/10-用户界面/11-收集跳转/12 -礼盒/13 -回收/14 -宝物/15 -形象/16 -念兽/17 -宠物)
        }
        TableItemProp.Table = function () {
            if (TableItemProp.table == null) {
                TableItemProp.table = zj.Game.ConfigManager.getTable("table_item_prop.json");
                if (TableItemProp.table == null)
                    TableItemProp.table = {};
            }
            return TableItemProp.table;
        };
        TableItemProp.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemProp.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemProp.table = null;
        return TableItemProp;
    }());
    zj.TableItemProp = TableItemProp;
    __reflect(TableItemProp.prototype, "zj.TableItemProp");
    window['TableItemProp'] = TableItemProp;
    // table_item_resource.csv
    // 物品资源
    var TableItemResource = (function () {
        function TableItemResource() {
            this.id = 0; // 资源编号
            this.name = ""; // 资源名字
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.show_type = new Array(); // 根据数量显示颜色额
            this.path = ""; // 大图标
            this.icon = ""; // 小图标
            this.des = ""; // 描述
            this.from = new Array(); // 来源
            this.tag = ""; // 标签
        }
        TableItemResource.Table = function () {
            if (TableItemResource.table == null) {
                TableItemResource.table = zj.Game.ConfigManager.getTable("table_item_resource.json");
                if (TableItemResource.table == null)
                    TableItemResource.table = {};
            }
            return TableItemResource.table;
        };
        TableItemResource.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemResource.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemResource.table = null;
        return TableItemResource;
    }());
    zj.TableItemResource = TableItemResource;
    __reflect(TableItemResource.prototype, "zj.TableItemResource");
    window['TableItemResource'] = TableItemResource;
    // table_item_secret.csv
    // 物品秘宝
    var TableItemSecret = (function () {
        function TableItemSecret() {
            this.id = 0; // 唯一标识
            this.name = ""; // 名称
            this.quality = 0; // 品质
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.reward_goods = new Array(); // 奖励内容
            this.reward_count = new Array(); // 奖励数量
            this.des = ""; // 基本描述
            this.extrac = ""; // 附加描述
            this.path = ""; // 图标路径
            this.red_tips = 0; // 是否显示红点
            this.use_tips = 0; // 使用跳转界面(参考table_item_prop.csv)
        }
        TableItemSecret.Table = function () {
            if (TableItemSecret.table == null) {
                TableItemSecret.table = zj.Game.ConfigManager.getTable("table_item_secret.json");
                if (TableItemSecret.table == null)
                    TableItemSecret.table = {};
            }
            return TableItemSecret.table;
        };
        TableItemSecret.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemSecret.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemSecret.table = null;
        return TableItemSecret;
    }());
    zj.TableItemSecret = TableItemSecret;
    __reflect(TableItemSecret.prototype, "zj.TableItemSecret");
    window['TableItemSecret'] = TableItemSecret;
    // table_item_title.csv
    // 物品称号
    var TableItemTitle = (function () {
        function TableItemTitle() {
            this.id = 0; // 道具编号
            this.name = ""; // 称号名字
            this.order = 0; // 排序
            this.level = 0; // 优先级
            this.check_type = ""; // 触发类型
            this.check_value = ""; // 触发条件
            this.check_mulvalues = new Array(); // 触发条件
            this.from = ""; // 产出
            this.quality = 0; // 道具品质
            this.grade = 0; // 是否显示在聊天界面
            this.show_type = 0; // 显示类别
            this.price = 0; // 卖出价格
            this.drop_count = 0; // 随机数量
            this.drop_time = 0; // 随机次数
            this.overdue_time = ""; // 道具到期时间
            this.league_animal_grow = 0; // 提供联盟异兽成长值
            this.effect = ""; // 称号描述
            this.skill_normal = 0; // 正常战斗被动
            this.general_hp = 0; // 生命值
            this.general_atk = 0; // 攻击
            this.general_def = 0; // 防御
            this.atk_crit = 0; // 暴击
            this.crit_extra = 0; // 暴击伤害
            this.ignore_phyDef = 0; // 忽视防御
            this.cd_speed = 0; // 速度
            this.dodge_rate = 0; // 格挡率
            this.hit_rate = 0; // 忽视格挡
            this.skill_atk = 0; // 效果命中
            this.skill_def = 0; // 效果抵抗
            this.universal_resistance = 0; // 异常状态抵抗
            this.ignore_resistance = 0; // 忽视异常抵抗
            this.float_resistance = 0; // 浮空抗性
            this.rage_reduce = 0; // 怒气减少
            this.support_consume = 0; // 作为援护出场所需怒气值
            this.general_atk_all = 0; // 攻击
            this.general_def_all = 0; // 防御
            this.all_crit = 0; // 暴击
            this.ignore_def_all = 0; // 忽视防御（废弃）
            this.skill_crit = 0; // 技能暴击
            this.crit_resistance = 0; // 暴击抵抗
            this.final_extra = 0; // 终极附加
            this.final_reduce = 0; // 终极减免
            this.ignore_magicDef = 0; // 忽视魔防
            this.logo = ""; // 图片路径(场景大图片)
            this.path = ""; // 图标路径（小图标）
            this.path_chat = ""; // 图片路径（聊天）
            this.des = ""; // 备注
        }
        TableItemTitle.Table = function () {
            if (TableItemTitle.table == null) {
                TableItemTitle.table = zj.Game.ConfigManager.getTable("table_item_title.json");
                if (TableItemTitle.table == null)
                    TableItemTitle.table = {};
            }
            return TableItemTitle.table;
        };
        TableItemTitle.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemTitle.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemTitle.table = null;
        return TableItemTitle;
    }());
    zj.TableItemTitle = TableItemTitle;
    __reflect(TableItemTitle.prototype, "zj.TableItemTitle");
    window['TableItemTitle'] = TableItemTitle;
    // table_item_transfer.csv
    // 礼盒
    var TableItemTransfer = (function () {
        function TableItemTransfer() {
            this.id = 0; // 编号
            this.name = ""; // 名称
            this.quality = 0; // 品质
            this.price = 0; // 价格
            this.drop_time = 0; // 随机次数
            this.drop_count = 0; // 随机数量
            this.overdue_time = ""; // 道具到期时间
            this.items_id = new Array(); // 物品编号
            this.items_count = new Array(); // 物品数量
            this.is_bag_rule = 0; // 是否遵循卡包规则
            this.add_general = 0; // 增加的猎人数量
            this.des = ""; // 基本描述
            this.extrac = ""; // 附加描述(包含)
            this.use_tips = 0; // 跳转界面
            this.red_tips = 0; // 红点
            this.path = ""; // 图标路径
            this.show_type = 0; // 显示类型
        }
        TableItemTransfer.Table = function () {
            if (TableItemTransfer.table == null) {
                TableItemTransfer.table = zj.Game.ConfigManager.getTable("table_item_transfer.json");
                if (TableItemTransfer.table == null)
                    TableItemTransfer.table = {};
            }
            return TableItemTransfer.table;
        };
        TableItemTransfer.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableItemTransfer.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableItemTransfer.table = null;
        return TableItemTransfer;
    }());
    zj.TableItemTransfer = TableItemTransfer;
    __reflect(TableItemTransfer.prototype, "zj.TableItemTransfer");
    window['TableItemTransfer'] = TableItemTransfer;
    // table_jade_hole.csv
    // 宝石
    var TableJadeHole = (function () {
        function TableJadeHole() {
            this.index = 0; // 宝石槽
            this.jade_pos = ""; // 位置
            this.hole_type = 0; // 孔类型
            this.open_level = 0; // 装备等级
            this.jade_type = new Array(); // 装备宝石类型
            this.jade_tip = ""; // 说明文字
        }
        TableJadeHole.Table = function () {
            if (TableJadeHole.table == null) {
                TableJadeHole.table = zj.Game.ConfigManager.getTable("table_jade_hole.json");
                if (TableJadeHole.table == null)
                    TableJadeHole.table = {};
            }
            return TableJadeHole.table;
        };
        TableJadeHole.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableJadeHole.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableJadeHole.table = null;
        return TableJadeHole;
    }());
    zj.TableJadeHole = TableJadeHole;
    __reflect(TableJadeHole.prototype, "zj.TableJadeHole");
    window['TableJadeHole'] = TableJadeHole;
    // table_ladder_score.csv
    // 竞技场奖励表
    var TableLadderScore = (function () {
        function TableLadderScore() {
            this.id = 0; // id
            this.rank_min = 0; // 排名区间下限(左闭右开)
            this.rank_max = 0; // 排名区间上限(左闭右开)
            this.reward_token = 0; // 提升名次获得代币数量
            this.reward_goods = new Array(); // 每日获得物品
            this.reward_count = new Array(); // 每日获得数量
        }
        TableLadderScore.Table = function () {
            if (TableLadderScore.table == null) {
                TableLadderScore.table = zj.Game.ConfigManager.getTable("table_ladder_score.json");
                if (TableLadderScore.table == null)
                    TableLadderScore.table = {};
            }
            return TableLadderScore.table;
        };
        TableLadderScore.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLadderScore.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLadderScore.table = null;
        return TableLadderScore;
    }());
    zj.TableLadderScore = TableLadderScore;
    __reflect(TableLadderScore.prototype, "zj.TableLadderScore");
    window['TableLadderScore'] = TableLadderScore;
    // table_language.csv
    // 多语言名称索引表
    var TableLanguage = (function () {
        function TableLanguage() {
            this.index = 0; // 索引
            this.ch = ""; // 简体中文
            this.en = ""; // 英文
        }
        TableLanguage.Table = function () {
            if (TableLanguage.table == null) {
                TableLanguage.table = zj.Game.ConfigManager.getTable("table_language.json");
                if (TableLanguage.table == null)
                    TableLanguage.table = {};
            }
            return TableLanguage.table;
        };
        TableLanguage.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLanguage.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLanguage.table = null;
        return TableLanguage;
    }());
    zj.TableLanguage = TableLanguage;
    __reflect(TableLanguage.prototype, "zj.TableLanguage");
    window['TableLanguage'] = TableLanguage;
    // table_league_animals.csv
    // 联盟异兽
    var TableLeagueAnimals = (function () {
        function TableLeagueAnimals() {
            this.animal_id = 0; // boss类型
            this.name = ""; // 名称
            this.limit_level = 0; // 领养联盟等级
            this.consume_res = 0; // 开启消耗帮贡
            this.init_level = 0; // 初始等级
            this.max_grow = new Array(); // 等级对应奖励区间
            this.zone_bosses = new Array(); // 对应boss(分别为boss区间用|隔开)
            this.boss_ratio = ""; // boss难度调节系数
            this.map_roleName = new Array(); // 异兽名字
            this.feature = new Array(); // 怪物特性
            this.battle_bg = 0; // 战斗背景id
        }
        TableLeagueAnimals.Table = function () {
            if (TableLeagueAnimals.table == null) {
                TableLeagueAnimals.table = zj.Game.ConfigManager.getTable("table_league_animals.json");
                if (TableLeagueAnimals.table == null)
                    TableLeagueAnimals.table = {};
            }
            return TableLeagueAnimals.table;
        };
        TableLeagueAnimals.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueAnimals.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueAnimals.table = null;
        return TableLeagueAnimals;
    }());
    zj.TableLeagueAnimals = TableLeagueAnimals;
    __reflect(TableLeagueAnimals.prototype, "zj.TableLeagueAnimals");
    window['TableLeagueAnimals'] = TableLeagueAnimals;
    // table_league_boss_reward.csv
    // 帮会boss奖励
    var TableLeagueBossReward = (function () {
        function TableLeagueBossReward() {
            this.id = 0; // id
            this.boss_grow = 0; // boss成长度
            this.rank_min = 0; // 排名区间下限(左闭右开)
            this.rank_max = 0; // 排名区间上限(左闭右开)
            this.reward_goods = new Array(); // 每日获得物品
            this.reward_count = new Array(); // 每日获得数量
            this.reward_gift = 0; // 0
            this.reward_exp = 0; // 1
        }
        TableLeagueBossReward.Table = function () {
            if (TableLeagueBossReward.table == null) {
                TableLeagueBossReward.table = zj.Game.ConfigManager.getTable("table_league_boss_reward.json");
                if (TableLeagueBossReward.table == null)
                    TableLeagueBossReward.table = {};
            }
            return TableLeagueBossReward.table;
        };
        TableLeagueBossReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueBossReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueBossReward.table = null;
        return TableLeagueBossReward;
    }());
    zj.TableLeagueBossReward = TableLeagueBossReward;
    __reflect(TableLeagueBossReward.prototype, "zj.TableLeagueBossReward");
    window['TableLeagueBossReward'] = TableLeagueBossReward;
    // table_league_donate.csv
    // 联盟捐献
    var TableLeagueDonate = (function () {
        function TableLeagueDonate() {
            this.type = 0; // 捐献类型
            this.consume_token = 0; // 消耗代币
            this.consume_money = 0; // 消耗游戏币
            this.reward_token = 0; // 获得联盟币
            this.reward_contribution = 0; // 获得联盟贡献
            this.reward_exp = 0; // 获得联盟经验
            this.reward_active = 0; // 获得联盟活跃
        }
        TableLeagueDonate.Table = function () {
            if (TableLeagueDonate.table == null) {
                TableLeagueDonate.table = zj.Game.ConfigManager.getTable("table_league_donate.json");
                if (TableLeagueDonate.table == null)
                    TableLeagueDonate.table = {};
            }
            return TableLeagueDonate.table;
        };
        TableLeagueDonate.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueDonate.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueDonate.table = null;
        return TableLeagueDonate;
    }());
    zj.TableLeagueDonate = TableLeagueDonate;
    __reflect(TableLeagueDonate.prototype, "zj.TableLeagueDonate");
    window['TableLeagueDonate'] = TableLeagueDonate;
    // table_league_fish.csv
    // 联盟钓鱼表
    var TableLeagueFish = (function () {
        function TableLeagueFish() {
            this.fish_id = 0; // 鱼id
            this.fish_name = ""; // 名称
            this.fish_quality = 0; // 鱼品质
            this.rand_power = 0; // 随机权值
            this.fishing_duration = 0; // 垂钓时长
            this.rand_items = new Array(); // 奖励内容
            this.image_title = ""; // 鱼名称图片
            this.fish_image = ""; // 鱼图片
            this.fish_ani = 0; // 鱼动态
            this.image_board = ""; // 底版
        }
        TableLeagueFish.Table = function () {
            if (TableLeagueFish.table == null) {
                TableLeagueFish.table = zj.Game.ConfigManager.getTable("table_league_fish.json");
                if (TableLeagueFish.table == null)
                    TableLeagueFish.table = {};
            }
            return TableLeagueFish.table;
        };
        TableLeagueFish.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueFish.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueFish.table = null;
        return TableLeagueFish;
    }());
    zj.TableLeagueFish = TableLeagueFish;
    __reflect(TableLeagueFish.prototype, "zj.TableLeagueFish");
    window['TableLeagueFish'] = TableLeagueFish;
    // table_league_instance.csv
    // 联盟副本表
    var TableLeagueInstance = (function () {
        function TableLeagueInstance() {
            this.instance_id = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
            this.instance_name = ""; // 副本名称
            this.instance_type = 0; // 副本类型(普通0，精英1)
            this.open_level = 0; // 成员等级
            this.consume_power = 0; // 消耗体力
            this.boss_mobs = new Array(); // boss
            this.battle_bg = 0; // 
            this.reward_zone = new Array(); // 血量奖励阶段
            this.boss_goods = new Array(); // 固定物品奖励(id&id|id&id)
            this.boss_count = new Array(); // 奖励物品数量
            this.battle_win_reward = new Array(); // 战斗胜利奖励
            this.battle_lose_reward = new Array(); // 战斗失败奖励
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = ""; // Boss形象id（映射map_role表）
            this.recommend_number = ""; // 推荐人数
            this.recommend_power = 0; // 推荐战力
            this.instance_des = 0; // 副本说明
            this.back_img = ""; // 背景图片
            this.name_img = ""; // 名称图片
            this.back_big_img = ""; // 背景图片
        }
        TableLeagueInstance.Table = function () {
            if (TableLeagueInstance.table == null) {
                TableLeagueInstance.table = zj.Game.ConfigManager.getTable("table_league_instance.json");
                if (TableLeagueInstance.table == null)
                    TableLeagueInstance.table = {};
            }
            return TableLeagueInstance.table;
        };
        TableLeagueInstance.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueInstance.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueInstance.table = null;
        return TableLeagueInstance;
    }());
    zj.TableLeagueInstance = TableLeagueInstance;
    __reflect(TableLeagueInstance.prototype, "zj.TableLeagueInstance");
    window['TableLeagueInstance'] = TableLeagueInstance;
    // table_league_match_rank.csv
    var TableLeagueMatchRank = (function () {
        function TableLeagueMatchRank() {
            this.id = 0; // id
            this.rank_min = 0; // 排名区间下限
            this.rank_max = 0; // 排名区间上限
            this.local_rank_reward = new Array(); // 本服排名奖励
            this.local_craft_reward = new Array(); // 本服四强奖励
        }
        TableLeagueMatchRank.Table = function () {
            if (TableLeagueMatchRank.table == null) {
                TableLeagueMatchRank.table = zj.Game.ConfigManager.getTable("table_league_match_rank.json");
                if (TableLeagueMatchRank.table == null)
                    TableLeagueMatchRank.table = {};
            }
            return TableLeagueMatchRank.table;
        };
        TableLeagueMatchRank.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueMatchRank.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueMatchRank.table = null;
        return TableLeagueMatchRank;
    }());
    zj.TableLeagueMatchRank = TableLeagueMatchRank;
    __reflect(TableLeagueMatchRank.prototype, "zj.TableLeagueMatchRank");
    window['TableLeagueMatchRank'] = TableLeagueMatchRank;
    // table_league_match_score.csv
    var TableLeagueMatchScore = (function () {
        function TableLeagueMatchScore() {
            this.id = 0; // id
            this.name = ""; // 段位
            this.score_min = 0; // 最小积分
            this.battle_reward = new Array(); // 单场胜利奖励
            this.daily_reward = new Array(); // 战斗结算奖励
        }
        TableLeagueMatchScore.Table = function () {
            if (TableLeagueMatchScore.table == null) {
                TableLeagueMatchScore.table = zj.Game.ConfigManager.getTable("table_league_match_score.json");
                if (TableLeagueMatchScore.table == null)
                    TableLeagueMatchScore.table = {};
            }
            return TableLeagueMatchScore.table;
        };
        TableLeagueMatchScore.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueMatchScore.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueMatchScore.table = null;
        return TableLeagueMatchScore;
    }());
    zj.TableLeagueMatchScore = TableLeagueMatchScore;
    __reflect(TableLeagueMatchScore.prototype, "zj.TableLeagueMatchScore");
    window['TableLeagueMatchScore'] = TableLeagueMatchScore;
    // table_level.csv
    // 等级
    var TableLevel = (function () {
        function TableLevel() {
            this.level = 0; // 等级
            this.general_exp = new Array(); // 武将升到下一级所需经验值(c,b,a,s)
            this.role_exp = 0; // 角色升到下一级所需经验值
            this.role_power = 0; // 角色体力最大上限
            this.permit_exp = 0; // 通行证升级经验
            this.league_people = 0; // 容纳人数
            this.league_enliven = 0; // 每日联盟活跃上限
            this.league_enliven_all = 0; // 联盟总活跃度上限
            this.general_equip_money = 0; // 装备升级
            this.general_skill_up = 0; // 技能升级
            this.general_talent_exp = new Array(); // 天赋升级经验
            this.lottry_consume = 0; // 抽奖花费
            this.league_exp = 0; // 联盟升级到下一级需要的贡献
            this.league_mall = 0; // 联盟商城折扣
            this.league_skill = 0; // 联盟技能等级
            this.buy_money_ratio = 0; // 购买铜钱系数
            this.levelup_power_sent = 0; // 升级赠送体力
            this.instance_money_drop = 0; // 副本铜钱掉落
            this.instance_exp_drop = 0; // 副本经验掉落
            this.compose_money = 0; // 组合升级消耗
            this.friend_exp = 0; // 伙伴升级亲密度
            this.friend_money = 0; // 伙伴升级消耗
            this.scene_formation = 0; // 场景中阵型设置武将数量
            this.goods_ids = new Array(); // 默默赠送道具
            this.goods_count = new Array(); // 默默赠送道具数量
        }
        TableLevel.Table = function () {
            if (TableLevel.table == null) {
                TableLevel.table = zj.Game.ConfigManager.getTable("table_level.json");
                if (TableLevel.table == null)
                    TableLevel.table = {};
            }
            return TableLevel.table;
        };
        TableLevel.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLevel.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLevel.table = null;
        return TableLevel;
    }());
    zj.TableLevel = TableLevel;
    __reflect(TableLevel.prototype, "zj.TableLevel");
    window['TableLevel'] = TableLevel;
    // table_licence.csv
    // 会员
    var TableLicence = (function () {
        function TableLicence() {
            this.level = 0; // 执照等级
            this.text1 = new Array(); // 文字特殊奖励TextsConfig_Vip.vip_string1-20
            this.text2 = new Array(); // 文字特殊权利TextsConfig_Vip.vip_string20-40
            this.buy_plate = 0; // 购买盘子次数
            this.buy_wanted_time = 0; // 购买第一条街次数
            this.buy_arrest_time = 0; // 购买第二条街次数
            this.buy_hunt_time = 0; // 购买缉拿令次数
            this.quick_skill_up = 0; // 技能一键升级
            this.all_skill_up = 0; // 技能全部升级
            this.quick_equip_up = 0; // 装备一键强化
            this.all_equip_up = 0; // 装备全部强化
            this.buy_money = 0; // 招财次数
            this.buy_money_rand = 0; // 招财暴击概率
            this.buy_money_cirt = new Array(); // 招财暴击倍率（前面是倍数后面是权值）
            this.buy_mobs = 0; // 重置精英关卡次数
            this.is_sweep = 0; // 是否可以扫荡
            this.lottery_time = 0; // 抽奖次数(作废)
            this.ladder = 0; // 购买演武堂比试次数
            this.visit_immortal = 0; // 访仙次数
            this.tower = 0; // 爬塔次数
            this.tower_sweep_sapce = 0; // 爬塔扫荡时间间隔
            this.tower_auto = 0; // 是否可以自动爬塔
            this.sign_supply_time = 0; // 补签次数
            this.relation_count = 0; // 关系数量上限
            this.reward_power = 0; // 每日领取体力次数
            this.pic_frame = ""; // 赠送头像框
            this.chest_ten_sliver = 0; // 普通宝箱是否可以十连开
            this.chest_ten_gold = 0; // 精致宝箱是否可以十连开
            this.wanted_time = 0; // 第一条街挑战次数
            this.arrest_time = 0; // 第二条街挑战次数
            this.hunt_time = 0; // 缉拿令
            this.wanted_add = 0; // 通缉令产量增加
            this.wanted_sweep = 0; // 通缉令扫荡是否免费
            this.wanted_refresh = 0; // 通缉令免费刷新次数
            this.secret_free = 0; // 秘宝免费次数
            this.league_animel_feed = 0; // 联盟异兽高级投喂
            this.league_party_add = 0; // 联盟宴会加餐
            this.league_fishing = 0; // 联盟钓鱼次数
            this.fishing_refresh = 0; // 是否可以刷新紫色鱼
            this.fishing_reward_double = 0; // 钓鱼奖励翻倍
            this.battle_jump = 0; // 战斗跳过功能
            this.wash_type = 0; // 神兵连洗类型
            this.strategy_time = 0; // 军师阵法免费刷新次数
            this.gamble_jade_time = 0; // 普通赌石次数
            this.jade_quick_compose = 0; // 快速合成是否开启
            this.jade_auto_refresh = 0; // 自动磨洗是否开启
            this.gain_runes_time = 0; // 祭祀次数
            this.change_runes_time = 0; // 换符次数
            this.singlecraft_buy = 0; // 跨服挑战次数
            this.singlecraft_free = 0; // 跨服免费挑战次数
            this.assist_time = 0; // 组队战助战次数
            this.reward_group_mail = 0; // 组队战收取邮件
            this.tree_cirt = new Array(); // 果子加成
            this.xuyuan_free = 0; // 许愿屋免费次数
            this.mall_relic_time = 0; // 遗迹商城刷新次数
            this.search_count = 0; // 探索任务数量
        }
        TableLicence.Table = function () {
            if (TableLicence.table == null) {
                TableLicence.table = zj.Game.ConfigManager.getTable("table_licence.json");
                if (TableLicence.table == null)
                    TableLicence.table = {};
            }
            return TableLicence.table;
        };
        TableLicence.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLicence.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLicence.table = null;
        return TableLicence;
    }());
    zj.TableLicence = TableLicence;
    __reflect(TableLicence.prototype, "zj.TableLicence");
    window['TableLicence'] = TableLicence;
    // table_licence_weal.csv
    // 星耀等级
    var TableLicenceWeal = (function () {
        function TableLicenceWeal() {
            this.level = 0; // 星耀等级
            this.starLevelName = ""; // 星耀等级名称
            this.reward_index = 0; // 奖励标记
            this.charge = ""; // 升级到下一级充值代币数量
            this.sum = 0; // 累计充值
            this.halo_id = 0; // 拥有光环
            this.picFrame_id = 0; // 头像框Id
            this.weal_award = new Array(); // 奖励内容
            this.weal_count = new Array(); // 奖励数量
        }
        TableLicenceWeal.Table = function () {
            if (TableLicenceWeal.table == null) {
                TableLicenceWeal.table = zj.Game.ConfigManager.getTable("table_licence_weal.json");
                if (TableLicenceWeal.table == null)
                    TableLicenceWeal.table = {};
            }
            return TableLicenceWeal.table;
        };
        TableLicenceWeal.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLicenceWeal.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLicenceWeal.table = null;
        return TableLicenceWeal;
    }());
    zj.TableLicenceWeal = TableLicenceWeal;
    __reflect(TableLicenceWeal.prototype, "zj.TableLicenceWeal");
    window['TableLicenceWeal'] = TableLicenceWeal;
    // table_lottery_normal_reward.csv
    var TableLotteryNormalReward = (function () {
        function TableLotteryNormalReward() {
            this.index = 0; // 索引
            this.lottery_time = 0; // 抽卡次数
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
            this.show_type = new Array(); // 显示类型
        }
        TableLotteryNormalReward.Table = function () {
            if (TableLotteryNormalReward.table == null) {
                TableLotteryNormalReward.table = zj.Game.ConfigManager.getTable("table_lottery_normal_reward.json");
                if (TableLotteryNormalReward.table == null)
                    TableLotteryNormalReward.table = {};
            }
            return TableLotteryNormalReward.table;
        };
        TableLotteryNormalReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLotteryNormalReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLotteryNormalReward.table = null;
        return TableLotteryNormalReward;
    }());
    zj.TableLotteryNormalReward = TableLotteryNormalReward;
    __reflect(TableLotteryNormalReward.prototype, "zj.TableLotteryNormalReward");
    window['TableLotteryNormalReward'] = TableLotteryNormalReward;
    // table_map_role.csv
    // 模型
    var TableMapRole = (function () {
        function TableMapRole() {
            this.model_id = 0; // 序列号
            this.table_map_role = ""; // 模型描述
            this.model_level = 0; // 等级
            this.model_des = ""; // 描述
            this.model_profession = 0; // 职业
            this.model_sex = 0; // 性别
            this.type = 0; // 派系
            this.features = 0; // 武将特性(1攻2控3技4防)
            this.organization = 0; // 是否是旅团成员（1是2否）
            this.body_spx_id = 0; // 人物动作资源id
            this.effect_spx_id = 0;
            this.bodyxj_spx_id = 0; // 仙境人物动作资源id
            this.effectxj_spx_id = 0; // 仙境角色特效id
            this.xj_skill_id = 0; // 仙境技能id
            this.body_color = 0; // 人物动作颜色
            this.parry_time = 0; // 格挡时间(毫秒)
            this.homing_time = 0; // 归位时间
            this.model_scale = 0; // 缩放比例
            this.hurt_num_pos = new Array(); // 受伤数字位置
            this.hurt_num_offset_nor = new Array(); // 受伤数字出现位置1
            this.hurt_num_offset_spe = new Array();
            this.hit_effect_offset_nor = new Array(); // 受伤刀光特效出现位置1
            this.hit_effect_offset_spe = new Array(); // 受伤刀光效出现位置2
            this.offset_nor_mid = new Array(); // 出现位置中(主要针对buff和蓄力特效)
            this.role_ani_offset_nor_up = new Array(); // 特效出现位置上（主要针对头顶暴击、闪避、及小技能播放、buff播放等等)
            this.role_ani_offset_spe_up = new Array(); // 特效出现位置上（主要针对头顶暴击、闪避、及小技能播放、buff播放等等)
            this.role_title_pos = new Array(); // 场景人物名字位置
            this.body_size = new Array();
            this.artifact_pos = new Array(); // 待机神兵位置
            this.eye_talent = ""; // 天赋眼睛路径
            this.eye_head = ""; // 必杀半身路径
            this.eye_head_shadow = ""; // 必杀半身影子路径
            this.spine_id = 0; // 动画id（武将）
            this.spine_scale = 0; // 动画大小（时装界面大小）
            this.spine_instance_id = 0; // 动画id（副本）
            this.spine_instance_scale = 0; // 动画大小（关卡boss大小）
            this.fashion = 0; // 动画skill（武将）
            this.body_touch_rt = new Array(); // 模型触摸大概位置
            this.path = ""; // 物品头像
            this.body_path = ""; // 半身像路径
            this.half_scale = 0; // 半身像缩放
            this.tavern_half_scale = 0; // 招募半身像缩放
            this.head_path = ""; // 头像路径
            this.half_path = ""; // 半身路径
            this.press_xuli_effect_sound = 0; // 点击蓄力音效
            this.kill_xuli_effect_sound = 0; // 必杀蓄力音效
            this.bisha_dub_sound = 0; // 必杀技配音
            this.taici_dub_sound = 0; // 武将台词配音
            this.name_path = ""; // 名字图片
            this.body_scale = 0; // 人物缩放（战斗）
            this.battle_head = ""; // 战斗头像
            this.battle_help = ""; // 援护头像
        }
        TableMapRole.Table = function () {
            if (TableMapRole.table == null) {
                TableMapRole.table = zj.Game.ConfigManager.getTable("table_map_role.json");
                if (TableMapRole.table == null)
                    TableMapRole.table = {};
            }
            return TableMapRole.table;
        };
        TableMapRole.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMapRole.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMapRole.table = null;
        return TableMapRole;
    }());
    zj.TableMapRole = TableMapRole;
    __reflect(TableMapRole.prototype, "zj.TableMapRole");
    window['TableMapRole'] = TableMapRole;
    // table_mission_active.csv
    // 每日活跃度
    var TableMissionActive = (function () {
        function TableMissionActive() {
            this.id = 0; // 活跃度索引
            this.score = 0; // 达到积分
            this.reward_goods = new Array(); // 奖励id
            this.path = ""; // 图标路径
        }
        TableMissionActive.Table = function () {
            if (TableMissionActive.table == null) {
                TableMissionActive.table = zj.Game.ConfigManager.getTable("table_mission_active.json");
                if (TableMissionActive.table == null)
                    TableMissionActive.table = {};
            }
            return TableMissionActive.table;
        };
        TableMissionActive.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionActive.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionActive.table = null;
        return TableMissionActive;
    }());
    zj.TableMissionActive = TableMissionActive;
    __reflect(TableMissionActive.prototype, "zj.TableMissionActive");
    window['TableMissionActive'] = TableMissionActive;
    // table_mission_general.csv
    var TableMissionGeneral = (function () {
        function TableMissionGeneral() {
            this.id = 0; // 武将id
            this.name = ""; // 名字
            this.level = 0; // 星级
            this.step = 0; // 进阶
            this.star = 0; // 星级
            this.awaken_level = 0; // 觉醒等级
        }
        TableMissionGeneral.Table = function () {
            if (TableMissionGeneral.table == null) {
                TableMissionGeneral.table = zj.Game.ConfigManager.getTable("table_mission_general.json");
                if (TableMissionGeneral.table == null)
                    TableMissionGeneral.table = {};
            }
            return TableMissionGeneral.table;
        };
        TableMissionGeneral.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionGeneral.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionGeneral.table = null;
        return TableMissionGeneral;
    }());
    zj.TableMissionGeneral = TableMissionGeneral;
    __reflect(TableMissionGeneral.prototype, "zj.TableMissionGeneral");
    window['TableMissionGeneral'] = TableMissionGeneral;
    // table_mission_item.csv
    // 任务子项表
    var TableMissionItem = (function () {
        function TableMissionItem() {
            this.id = 0; // 任务ID
            this.name = ""; // 任务名称
            this.des = ""; // 任务描述
            this.star = 0; // 任务星级
            this.condition = 0; // 完成条件
            this.reward_goods = new Array(); // 奖励id
            this.reward_active = ""; // 提供活跃度
            this.path = ""; // 图标路径
            this.spine = 0; // 人物
        }
        TableMissionItem.Table = function () {
            if (TableMissionItem.table == null) {
                TableMissionItem.table = zj.Game.ConfigManager.getTable("table_mission_item.json");
                if (TableMissionItem.table == null)
                    TableMissionItem.table = {};
            }
            return TableMissionItem.table;
        };
        TableMissionItem.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionItem.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionItem.table = null;
        return TableMissionItem;
    }());
    zj.TableMissionItem = TableMissionItem;
    __reflect(TableMissionItem.prototype, "zj.TableMissionItem");
    window['TableMissionItem'] = TableMissionItem;
    // table_mission_jewel.csv
    var TableMissionJewel = (function () {
        function TableMissionJewel() {
            this.index = 0; // 索引(必须是第几周)
            this.name = ""; // 
            this.month_open_day = 0; // 开启日期
            this.day_num = 0; // 天数
            this.check_type = new Array(); // 检测类型(1卡片2卡片升星3猎人4猎人升星5道具)
            this.check_star = new Array(); // 检测星级
            this.add_jewel_star = new Array(); // 获取获得宝石
            this.add_jewel_upstar = new Array(); // 升星获得宝石
            this.check_goods = new Array(); // 检测物品
            this.add_jewel_goods = new Array(); // 获得宝石
            this.daily_limit = 0; // 每日上限
            this.exchange_goods = new Array(); // 兑换物品
            this.exchange_jewel = new Array(); // 兑换积分
            this.exchange_count = new Array(); // 兑换次数
            this.exchange_daily_update = new Array(); // 每天刷新
            this.daily_mission = 0; // 每日任务
            this.final_mission = 0; // 终极任务
        }
        TableMissionJewel.Table = function () {
            if (TableMissionJewel.table == null) {
                TableMissionJewel.table = zj.Game.ConfigManager.getTable("table_mission_jewel.json");
                if (TableMissionJewel.table == null)
                    TableMissionJewel.table = {};
            }
            return TableMissionJewel.table;
        };
        TableMissionJewel.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionJewel.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionJewel.table = null;
        return TableMissionJewel;
    }());
    zj.TableMissionJewel = TableMissionJewel;
    __reflect(TableMissionJewel.prototype, "zj.TableMissionJewel");
    window['TableMissionJewel'] = TableMissionJewel;
    // table_mission_licence.csv
    // 执照任务
    var TableMissionLicence = (function () {
        function TableMissionLicence() {
            this.id = 0; // 执照ID
            this.name = ""; // 执照
            this.battle_id = 0; // 挑战ID
            this.reward_goods = new Array(); // 奖励id
            this.reward_count = new Array(); // 奖励数量
            this.examination_name = ""; // 考官名字
            this.examination_des = ""; // 考官简介
            this.condition = ""; // 过关条件
            this.consume = 0; // 挑战消耗体力
            this.battle_bg = 0; // 战斗背景
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = new Array(); // Boss形象id（映射map_role表）
            this.des = ""; // 考试信息描述
            this.technique = new Array(); // 推荐阵容
            this.battle_value = 0; // 推荐战力
        }
        TableMissionLicence.Table = function () {
            if (TableMissionLicence.table == null) {
                TableMissionLicence.table = zj.Game.ConfigManager.getTable("table_mission_licence.json");
                if (TableMissionLicence.table == null)
                    TableMissionLicence.table = {};
            }
            return TableMissionLicence.table;
        };
        TableMissionLicence.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionLicence.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionLicence.table = null;
        return TableMissionLicence;
    }());
    zj.TableMissionLicence = TableMissionLicence;
    __reflect(TableMissionLicence.prototype, "zj.TableMissionLicence");
    window['TableMissionLicence'] = TableMissionLicence;
    // table_mission_main.csv
    // 执照任务
    var TableMissionMain = (function () {
        function TableMissionMain() {
            this.id = 0; // 索引
            this.name = ""; // 
            this.next_id = ""; // 下一个任务
            this.type = 0; // 类型
            this.sub_type = 0; // 任务类型
            this.condition = 0; // 完成条件
            this.reward_goods = new Array(); // 奖励id
            this.race_km = ""; // 与时间赛跑提供公里数
            this.open_level = ""; // 开启等级类型
            this.open_instance = ""; // 开启副本
            this.description = ""; // 任务描述
        }
        TableMissionMain.Table = function () {
            if (TableMissionMain.table == null) {
                TableMissionMain.table = zj.Game.ConfigManager.getTable("table_mission_main.json");
                if (TableMissionMain.table == null)
                    TableMissionMain.table = {};
            }
            return TableMissionMain.table;
        };
        TableMissionMain.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionMain.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionMain.table = null;
        return TableMissionMain;
    }());
    zj.TableMissionMain = TableMissionMain;
    __reflect(TableMissionMain.prototype, "zj.TableMissionMain");
    window['TableMissionMain'] = TableMissionMain;
    // table_mission_race.csv
    var TableMissionRace = (function () {
        function TableMissionRace() {
            this.index = 0; // 索引(必须是第几周)
            this.name = ""; // 
            this.month_open_day = 0; // 开启日期
            this.day_num = 0; // 天数
            this.daily_missions = new Array(); // 每日任务
            this.zone_km = new Array(); // 区间
            this.zone_reward_goods = new Array(); // 积分奖励物品
            this.zone_reward_count = new Array(); // 积分奖励数量
        }
        TableMissionRace.Table = function () {
            if (TableMissionRace.table == null) {
                TableMissionRace.table = zj.Game.ConfigManager.getTable("table_mission_race.json");
                if (TableMissionRace.table == null)
                    TableMissionRace.table = {};
            }
            return TableMissionRace.table;
        };
        TableMissionRace.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionRace.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionRace.table = null;
        return TableMissionRace;
    }());
    zj.TableMissionRace = TableMissionRace;
    __reflect(TableMissionRace.prototype, "zj.TableMissionRace");
    window['TableMissionRace'] = TableMissionRace;
    // table_mission_type.csv
    // 任务类型表
    var TableMissionType = (function () {
        function TableMissionType() {
            this.index = 0; // 索引
            this.type = 0; // 任务类型
            this.sub_type = 0; // 任务子类型
            this.start_id = 0; // 开始任务Id
            this.end_id = 0; // 结束任务Id
            this.open_level = 0; // 开启等级类型
            this.open_instance = 0; // 开启副本
            this.open_licence = 0; // 开启执照
            this.des = ""; // 备注
            this.tips = 0; // 没开启提示
            this.sort = ""; // 排序
            this.week_path = ""; // 周常任务按钮图片
        }
        TableMissionType.Table = function () {
            if (TableMissionType.table == null) {
                TableMissionType.table = zj.Game.ConfigManager.getTable("table_mission_type.json");
                if (TableMissionType.table == null)
                    TableMissionType.table = {};
            }
            return TableMissionType.table;
        };
        TableMissionType.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionType.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionType.table = null;
        return TableMissionType;
    }());
    zj.TableMissionType = TableMissionType;
    __reflect(TableMissionType.prototype, "zj.TableMissionType");
    window['TableMissionType'] = TableMissionType;
    // table_mission_week.csv
    var TableMissionWeek = (function () {
        function TableMissionWeek() {
            this.index = 0; // 索引
            this.name = ""; // 名字
            this.next_index = 0; // 下一期
            this.duration = 0; // 时长天
            this.rest_day = 0; // 间隔
            this.mission_types = new Array(); // 任务类型*必须12开头
            this.mall_goods = new Array(); // 商品
            this.mall_count = new Array(); // 商品数量
            this.buy_time = new Array(); // 购买次数
            this.day_refresh = new Array(); // 是否每日刷新
            this.price_token = new Array(); // 消耗元宝
            this.week_mission_type = 0; // 模板类型客户端用（1.美食2.契约3.赏金4.遗迹）
        }
        TableMissionWeek.Table = function () {
            if (TableMissionWeek.table == null) {
                TableMissionWeek.table = zj.Game.ConfigManager.getTable("table_mission_week.json");
                if (TableMissionWeek.table == null)
                    TableMissionWeek.table = {};
            }
            return TableMissionWeek.table;
        };
        TableMissionWeek.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionWeek.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionWeek.table = null;
        return TableMissionWeek;
    }());
    zj.TableMissionWeek = TableMissionWeek;
    __reflect(TableMissionWeek.prototype, "zj.TableMissionWeek");
    window['TableMissionWeek'] = TableMissionWeek;
    // table_mission_gift.csv
    var TableMissionGift = (function () {
        function TableMissionGift() {
            this.index = 0; // 索引
            this.name = ""; // 名字
            this.vip_level = 0; // vip要求
            this.charge_token = 0; // 累充要求
            this.comsume_token = 0; // 消耗元宝
            this.reward_goods = new Array(); // 物品
            this.reward_count = new Array(); // 数量
            this.primer = ""; // 原价
        }
        TableMissionGift.Table = function () {
            if (TableMissionGift.table == null) {
                TableMissionGift.table = zj.Game.ConfigManager.getTable("table_mission_gift.json");
                if (TableMissionGift.table == null)
                    TableMissionGift.table = {};
            }
            return TableMissionGift.table;
        };
        TableMissionGift.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionGift.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionGift.table = null;
        return TableMissionGift;
    }());
    zj.TableMissionGift = TableMissionGift;
    __reflect(TableMissionGift.prototype, "zj.TableMissionGift");
    window['TableMissionGift'] = TableMissionGift;
    // table_monthgift.csv
    // 新礼包表
    var TableMonthgift = (function () {
        function TableMonthgift() {
            this.index = 0; // 索引
            this.name = ""; // 名字
            this.open_time = 0; // 开始时间（从月开始）
            this.duration = 0; // 持续时间
            this.price = 0; // 价格
            this.raw_token = 0; // 添加元宝
            this.goods_id = new Array(); // 物品
            this.goods_num = new Array(); // 数量
            this.chargeback_goods = new Array(); // 大佬的回馈
            this.refrence = 0; // 同一礼包
            this.pay_index = ""; // 现金支付（映射pay_index）
            this.token_price = ""; // 元宝支付
            this.h5_show_type = 0; // h5页面显示类型(1、超值2、热销3、vip专享）
            this.path = ""; // 图标路径
            this.name_path = ""; // 名字图片
            this.all_price = 0; // 总价值
            this.des = ""; // 描述
        }
        TableMonthgift.Table = function () {
            if (TableMonthgift.table == null) {
                TableMonthgift.table = zj.Game.ConfigManager.getTable("table_monthgift.json");
                if (TableMonthgift.table == null)
                    TableMonthgift.table = {};
            }
            return TableMonthgift.table;
        };
        TableMonthgift.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMonthgift.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMonthgift.table = null;
        return TableMonthgift;
    }());
    zj.TableMonthgift = TableMonthgift;
    __reflect(TableMonthgift.prototype, "zj.TableMonthgift");
    window['TableMonthgift'] = TableMonthgift;
    // table_newgift.csv
    // 礼包索引
    var TableNewgift = (function () {
        function TableNewgift() {
            this.index = 0; // 索引
            this.gift_type = 0; // 礼包类型（1.等级2.回归3.宝物星级4.武将星级5.武将品质6.充值礼包）
            this.trigger = 0; // 触发条件
            this.trigger_add = ""; // 附加条件
            this.trigger_level = ""; // 触发等级
            this.trigger_gift = new Array(); // 触发的礼包
            this.trigger_duration = ""; // 触发频率
            this.des = ""; // 描述
            this.pic = ""; // 主城图标
        }
        TableNewgift.Table = function () {
            if (TableNewgift.table == null) {
                TableNewgift.table = zj.Game.ConfigManager.getTable("table_newgift.json");
                if (TableNewgift.table == null)
                    TableNewgift.table = {};
            }
            return TableNewgift.table;
        };
        TableNewgift.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableNewgift.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableNewgift.table = null;
        return TableNewgift;
    }());
    zj.TableNewgift = TableNewgift;
    __reflect(TableNewgift.prototype, "zj.TableNewgift");
    window['TableNewgift'] = TableNewgift;
    // table_newgift_daily.csv
    // 礼包持续天数
    var TableNewgiftDaily = (function () {
        function TableNewgiftDaily() {
            this.index = 0; // 索引
            this.next_day = ""; // 下次天数
            this.reward_level = ""; // 等级要求
            this.goods_id = new Array(); // 物品
            this.goods_count = new Array(); // 物品数量
            this.des = ""; // 描述
            this.value = ""; // 客户端读取价值
        }
        TableNewgiftDaily.Table = function () {
            if (TableNewgiftDaily.table == null) {
                TableNewgiftDaily.table = zj.Game.ConfigManager.getTable("table_newgift_daily.json");
                if (TableNewgiftDaily.table == null)
                    TableNewgiftDaily.table = {};
            }
            return TableNewgiftDaily.table;
        };
        TableNewgiftDaily.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableNewgiftDaily.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableNewgiftDaily.table = null;
        return TableNewgiftDaily;
    }());
    zj.TableNewgiftDaily = TableNewgiftDaily;
    __reflect(TableNewgiftDaily.prototype, "zj.TableNewgiftDaily");
    window['TableNewgiftDaily'] = TableNewgiftDaily;
    // table_newgift_item.csv
    // 礼包内容
    var TableNewgiftItem = (function () {
        function TableNewgiftItem() {
            this.index = 0; // 索引
            this.sort = 0; // 排序
            this.name_str = ""; // 名字_配表用
            this.is_new = 0; // 是否新加
            this.gift_form = 0; // 礼包形式（1.限时限次2.每日限购3.无需购买-触发每日领取4.每周限购5.购买后每日领取6.买后按等级领取）
            this.duration = 0; // 持续时间（1.3.5表示礼包触发后存在时间，6表示到等级后存在时间）
            this.unpay_trigger_times = ""; // 未购买出现次数
            this.unpay_trigger_duration = ""; // 未购买下次出现频率
            this.trigger_charge_add = ""; // 购买完之后触发累充的概率
            this.limit_level = 0; // 未购买到等级后消失（6）
            this.is_forever = 0; // 永久（5类才有用，配了1，领完后又可再买（例如月卡）
            this.buy_times = 0; // 可购买次数
            this.goods_id = new Array(); // 物品
            this.goods_count = new Array(); // 物品数量
            this.is_permit = ""; // 高级许可证权限
            this.is_passseason = ""; // 通行证赛季限购
            this.super = new Array(); // 特殊显示（0.无1.超值）
            this.raw_token = 0; // 添加元宝
            this.pay_type = 0; // 支付类型(1.RMB2.元宝3.免费)
            this.chargeback_goods = new Array(); // 大佬的回馈
            this.primer = 0; // 原价
            this.price = 0; // 价格
            this.daily_num = ""; // 购买之后按等级或者按天数可领取奖励的个数
            this.daily_index = ""; // 分支礼包第一天对应index
            this.h5_show_type = ""; // h5页面显示类型(1、超值2、热销3、vip专享）
            this.name = ""; // 礼包名
            this.tips = new Array(); // 跳转界面(客户端，前为推送，后为礼包跳转)
            this.pay_index = ""; // 现金支付（映射pay_index）
            this.des = ""; // 礼包描述
            this.path = ""; // 图标路径
            this.push_big_path = ""; // 推送大图片路径
            this.info = ""; // 给玩家看的
            this.is_op = 0; // 是否为绝版
            this.is_show_city = 0; // 是否在主城展示
            this.city_path = ""; // 主城图标
        }
        TableNewgiftItem.Table = function () {
            if (TableNewgiftItem.table == null) {
                TableNewgiftItem.table = zj.Game.ConfigManager.getTable("table_newgift_item.json");
                if (TableNewgiftItem.table == null)
                    TableNewgiftItem.table = {};
            }
            return TableNewgiftItem.table;
        };
        TableNewgiftItem.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableNewgiftItem.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableNewgiftItem.table = null;
        return TableNewgiftItem;
    }());
    zj.TableNewgiftItem = TableNewgiftItem;
    __reflect(TableNewgiftItem.prototype, "zj.TableNewgiftItem");
    window['TableNewgiftItem'] = TableNewgiftItem;
    // table_newgift_seven.csv
    // 连续七天登陆礼包
    var TableNewgiftSeven = (function () {
        function TableNewgiftSeven() {
            this.index = 0; // 索引
            this.consume_token = new Array(); // 消耗钻石数（0为不出售）
            this.reward_goods = new Array(); // 奖励内容
            this.reward_count = new Array(); // 奖励数量
            this.primer = 0; // 礼包原价
            this.show_type = new Array(); // 显示类型
        }
        TableNewgiftSeven.Table = function () {
            if (TableNewgiftSeven.table == null) {
                TableNewgiftSeven.table = zj.Game.ConfigManager.getTable("table_newgift_seven.json");
                if (TableNewgiftSeven.table == null)
                    TableNewgiftSeven.table = {};
            }
            return TableNewgiftSeven.table;
        };
        TableNewgiftSeven.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableNewgiftSeven.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableNewgiftSeven.table = null;
        return TableNewgiftSeven;
    }());
    zj.TableNewgiftSeven = TableNewgiftSeven;
    __reflect(TableNewgiftSeven.prototype, "zj.TableNewgiftSeven");
    window['TableNewgiftSeven'] = TableNewgiftSeven;
    // table_pay_index.csv
    // 充值档位
    var TablePayIndex = (function () {
        function TablePayIndex() {
            this.index = 0; // 索引
            this.name = ""; // 名字
            this.coin = 0; // 价格
            this.product_type = 0; // 商品类别(包月1、正常2、大于100表示人民币礼包)(101-benefit)
            this.raw_token = 0; // 添加元宝数(后台模拟接口使用该值)
            this.give_token = 0; // 代币数量(赠送数量)
            this.discount_price = 0; // 折扣价
            this.original_price = 0; // 原价
            this.lieren_coin = 0; // 猎人币
            this.chargeback_goods = new Array(); // 大佬的回馈
            this.first_multiple = 0; // 首次倍数(可以为小数)
            this.month_type = 0; // 是否是包月
            this.is_delete = 0; // 是否作废(支付时为1表示不对该项处理，若为包月在领取奖励时继续计算)
            this.ext1 = 0; // 扩展信息(包月天数)
            this.ext2 = new Array(); // 扩展信息(包月每日领取奖励内容)
            this.give_wechat = 0; // 微信支付额外赠送
            this.h5_show_type = 0; // 页面显示类型(1、热门；等)
            this.img_path = ""; // 图片路径
            this.sort_index = 0; // 排序用index
            this.des = ""; // 
        }
        TablePayIndex.Table = function () {
            if (TablePayIndex.table == null) {
                TablePayIndex.table = zj.Game.ConfigManager.getTable("table_pay_index.json");
                if (TablePayIndex.table == null)
                    TablePayIndex.table = {};
            }
            return TablePayIndex.table;
        };
        TablePayIndex.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePayIndex.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePayIndex.table = null;
        return TablePayIndex;
    }());
    zj.TablePayIndex = TablePayIndex;
    __reflect(TablePayIndex.prototype, "zj.TablePayIndex");
    window['TablePayIndex'] = TablePayIndex;
    // table_pay_reward.csv
    var TablePayReward = (function () {
        function TablePayReward() {
            this.index = 0; // 索引
            this.name = ""; // 名字
            this.charge_token = 0; // 累计额度
            this.reward_goods = new Array(); // 奖励id
            this.reward_count = new Array(); // 奖励数量
        }
        TablePayReward.Table = function () {
            if (TablePayReward.table == null) {
                TablePayReward.table = zj.Game.ConfigManager.getTable("table_pay_reward.json");
                if (TablePayReward.table == null)
                    TablePayReward.table = {};
            }
            return TablePayReward.table;
        };
        TablePayReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePayReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePayReward.table = null;
        return TablePayReward;
    }());
    zj.TablePayReward = TablePayReward;
    __reflect(TablePayReward.prototype, "zj.TablePayReward");
    window['TablePayReward'] = TablePayReward;
    // table_pet_skill.csv
    var TablePetSkill = (function () {
        function TablePetSkill() {
            this.id = 0; // 技能id
            this.name = ""; // 技能名字
            this.type = 0; // 类型（1.属性2.抢果概率3.采集缩短4.复活缩短5.猎人回血）
            this.attri_add = new Array(); // 属性类型（类型&数值）
            this.rand = new Array(); // 抢夺概率
            this.value = ""; // cd数值
            this.b_fight = 0; // 是否为战斗属性（客户端）
        }
        TablePetSkill.Table = function () {
            if (TablePetSkill.table == null) {
                TablePetSkill.table = zj.Game.ConfigManager.getTable("table_pet_skill.json");
                if (TablePetSkill.table == null)
                    TablePetSkill.table = {};
            }
            return TablePetSkill.table;
        };
        TablePetSkill.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePetSkill.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePetSkill.table = null;
        return TablePetSkill;
    }());
    zj.TablePetSkill = TablePetSkill;
    __reflect(TablePetSkill.prototype, "zj.TablePetSkill");
    window['TablePetSkill'] = TablePetSkill;
    // table_pic.csv
    // 图片资源
    var TablePic = (function () {
        function TablePic() {
            this.pic_id = 0; // 图片id
            this.path = ""; // 标题路径
            this.path2 = ""; // 武将路径
            this.generalId = ""; // 所属武将ID（累计充值）
        }
        TablePic.Table = function () {
            if (TablePic.table == null) {
                TablePic.table = zj.Game.ConfigManager.getTable("table_pic.json");
                if (TablePic.table == null)
                    TablePic.table = {};
            }
            return TablePic.table;
        };
        TablePic.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePic.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePic.table = null;
        return TablePic;
    }());
    zj.TablePic = TablePic;
    __reflect(TablePic.prototype, "zj.TablePic");
    window['TablePic'] = TablePic;
    // table_potato_attri.csv
    // 宝物属性
    var TablePotatoAttri = (function () {
        function TablePotatoAttri() {
            this.attri_id = 0; // 属性ID
            this.quality = 0; // 品质
            this.up_attri = ""; // 突破属性
            this.is_reset = ""; // 是否重生
            this.is_best = 0; // 是否是极品属性
            this.rand_power = 0; // 随机权值
            this.potato_type = new Array(); // 在什么派系
            this.potato_star = new Array(); // 在什么星级出现
            this.attri_type = 0; // 随机属性类型
            this.object_type = ""; // 对象类型(见EPotatoAttriType)
            this.attri_value = new Array(); // 属性范围(浮点型)
            this.des = ""; // 描述
            this.range_growth = new Array(); // 增幅范围
            this.growth_consume = new Array(); // 增幅消耗物品
            this.growth_count = new Array(); // 增幅消耗数量
            this.growth_money = new Array(); // 增幅消耗铜钱
            this.growth_score = new Array(); // 增幅积分
            this.is_double = 0; // 是否可随出小数
        }
        TablePotatoAttri.Table = function () {
            if (TablePotatoAttri.table == null) {
                TablePotatoAttri.table = zj.Game.ConfigManager.getTable("table_potato_attri.json");
                if (TablePotatoAttri.table == null)
                    TablePotatoAttri.table = {};
            }
            return TablePotatoAttri.table;
        };
        TablePotatoAttri.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePotatoAttri.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePotatoAttri.table = null;
        return TablePotatoAttri;
    }());
    zj.TablePotatoAttri = TablePotatoAttri;
    __reflect(TablePotatoAttri.prototype, "zj.TablePotatoAttri");
    window['TablePotatoAttri'] = TablePotatoAttri;
    // table_potato_break.csv
    // 卡片突破
    var TablePotatoBreak = (function () {
        function TablePotatoBreak() {
            this.id = 0; // 突破等级
            this.exchange_prop = new Array(); // 所需道具
            this.exchange_count = 0; // 所需同名卡数量
            this.exchange_level = 0; // 所需同名卡等级下限
            this.consume = 0; // 消耗金币
        }
        TablePotatoBreak.Table = function () {
            if (TablePotatoBreak.table == null) {
                TablePotatoBreak.table = zj.Game.ConfigManager.getTable("table_potato_break.json");
                if (TablePotatoBreak.table == null)
                    TablePotatoBreak.table = {};
            }
            return TablePotatoBreak.table;
        };
        TablePotatoBreak.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePotatoBreak.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePotatoBreak.table = null;
        return TablePotatoBreak;
    }());
    zj.TablePotatoBreak = TablePotatoBreak;
    __reflect(TablePotatoBreak.prototype, "zj.TablePotatoBreak");
    window['TablePotatoBreak'] = TablePotatoBreak;
    // table_process.csv
    // 进程
    var TableProcess = (function () {
        function TableProcess() {
            this.type = 0; // 进程类型
            this.name = ""; // 进程名称
            this.max_time = 0; // 最大时间
            this.is_only = 0; // 进程是否唯一
            this.is_pool = ""; // 是否是循环倒计时
            this.des = ""; // 进程描述
        }
        TableProcess.Table = function () {
            if (TableProcess.table == null) {
                TableProcess.table = zj.Game.ConfigManager.getTable("table_process.json");
                if (TableProcess.table == null)
                    TableProcess.table = {};
            }
            return TableProcess.table;
        };
        TableProcess.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableProcess.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableProcess.table = null;
        return TableProcess;
    }());
    zj.TableProcess = TableProcess;
    __reflect(TableProcess.prototype, "zj.TableProcess");
    window['TableProcess'] = TableProcess;
    // table_quick_mall.csv
    // 快速商铺
    var TableQuickMall = (function () {
        function TableQuickMall() {
            this.item_id = 0; // 物品id
            this.item_name = ""; // 物品名称
            this.start_level = 0; // 开启等级
            this.consume_type = 0; // 消耗类型
            this.consume_num = 0; // 消耗数量
        }
        TableQuickMall.Table = function () {
            if (TableQuickMall.table == null) {
                TableQuickMall.table = zj.Game.ConfigManager.getTable("table_quick_mall.json");
                if (TableQuickMall.table == null)
                    TableQuickMall.table = {};
            }
            return TableQuickMall.table;
        };
        TableQuickMall.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableQuickMall.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableQuickMall.table = null;
        return TableQuickMall;
    }());
    zj.TableQuickMall = TableQuickMall;
    __reflect(TableQuickMall.prototype, "zj.TableQuickMall");
    window['TableQuickMall'] = TableQuickMall;
    // table_rand_item.csv
    var TableRandItem = (function () {
        function TableRandItem() {
            this.id = 0; // 分组id
            this.nouse1 = ""; // 说明
            this.item_ids = new Array(); // 物品Id
            this.item_count = new Array(); // 物品数量
            this.rand_power = new Array(); // 随机权重
            this.is_show = new Array(); // 是否公告显示
            this.show_type = new Array(); // 显示类型
            this.nouse2 = ""; // 说明
            this.index = ""; // 顺序
            this.level_zone = new Array(); // 等级区间
        }
        TableRandItem.Table = function () {
            if (TableRandItem.table == null) {
                TableRandItem.table = zj.Game.ConfigManager.getTable("table_rand_item.json");
                if (TableRandItem.table == null)
                    TableRandItem.table = {};
            }
            return TableRandItem.table;
        };
        TableRandItem.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableRandItem.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableRandItem.table = null;
        return TableRandItem;
    }());
    zj.TableRandItem = TableRandItem;
    __reflect(TableRandItem.prototype, "zj.TableRandItem");
    window['TableRandItem'] = TableRandItem;
    // table_recovery.csv
    // 回收表
    var TableRecovery = (function () {
        function TableRecovery() {
            this.id = 0; // id
            this.consume_goods = 0; // 消耗物品
            this.consume_count = 0; // 消耗数量
            this.consume_token = 0; // 消耗元宝
            this.back_goods = new Array(); // 返还物品
            this.des = ""; // 描述
        }
        TableRecovery.Table = function () {
            if (TableRecovery.table == null) {
                TableRecovery.table = zj.Game.ConfigManager.getTable("table_recovery.json");
                if (TableRecovery.table == null)
                    TableRecovery.table = {};
            }
            return TableRecovery.table;
        };
        TableRecovery.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableRecovery.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableRecovery.table = null;
        return TableRecovery;
    }());
    zj.TableRecovery = TableRecovery;
    __reflect(TableRecovery.prototype, "zj.TableRecovery");
    window['TableRecovery'] = TableRecovery;
    // table_runes.csv
    // 魔域祭祀奖励表
    var TableRunes = (function () {
        function TableRunes() {
            this.id = 0; // id
            this.name = ""; // 组合名称
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
            this.show_type = new Array(); // 显示类型
            this.des = ""; // 描述
        }
        TableRunes.Table = function () {
            if (TableRunes.table == null) {
                TableRunes.table = zj.Game.ConfigManager.getTable("table_runes.json");
                if (TableRunes.table == null)
                    TableRunes.table = {};
            }
            return TableRunes.table;
        };
        TableRunes.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableRunes.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableRunes.table = null;
        return TableRunes;
    }());
    zj.TableRunes = TableRunes;
    __reflect(TableRunes.prototype, "zj.TableRunes");
    window['TableRunes'] = TableRunes;
    // table_scene_boss_reward.csv
    // 魔域boss伤害奖励表
    var TableSceneBossReward = (function () {
        function TableSceneBossReward() {
            this.id = 0; // id
            this.bosslevel_min = 0; // boss等级
            this.bosslevel_max = 0; // boss等级(左闭右闭)
            this.rank_min = 0; // 排名区间下限(左开右闭)
            this.rank_max = 0; // 排名区间上限(左开右闭)
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
        }
        TableSceneBossReward.Table = function () {
            if (TableSceneBossReward.table == null) {
                TableSceneBossReward.table = zj.Game.ConfigManager.getTable("table_scene_boss_reward.json");
                if (TableSceneBossReward.table == null)
                    TableSceneBossReward.table = {};
            }
            return TableSceneBossReward.table;
        };
        TableSceneBossReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSceneBossReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSceneBossReward.table = null;
        return TableSceneBossReward;
    }());
    zj.TableSceneBossReward = TableSceneBossReward;
    __reflect(TableSceneBossReward.prototype, "zj.TableSceneBossReward");
    window['TableSceneBossReward'] = TableSceneBossReward;
    // table_share_reward.csv
    var TableShareReward = (function () {
        function TableShareReward() {
            this.index = 0; // 索引
            this.count = 0; // 数量
            this.type = 0; // 任务类型
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
        }
        TableShareReward.Table = function () {
            if (TableShareReward.table == null) {
                TableShareReward.table = zj.Game.ConfigManager.getTable("table_share_reward.json");
                if (TableShareReward.table == null)
                    TableShareReward.table = {};
            }
            return TableShareReward.table;
        };
        TableShareReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableShareReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableShareReward.table = null;
        return TableShareReward;
    }());
    zj.TableShareReward = TableShareReward;
    __reflect(TableShareReward.prototype, "zj.TableShareReward");
    window['TableShareReward'] = TableShareReward;
    // table_singlecraft_rank.csv
    // 跨服战排行表
    var TableSinglecraftRank = (function () {
        function TableSinglecraftRank() {
            this.id = 0; // id
            this.index = 0; // 争霸赛季
            this.rank_min = 0; // 排名区间最小值
            this.rank_max = 0; // 排名区间最大值
            this.title_id = 0; // 称号
            this.reward_goods = new Array(); // 段位奖励物品
            this.reward_count = new Array(); // 段位奖励数量
        }
        TableSinglecraftRank.Table = function () {
            if (TableSinglecraftRank.table == null) {
                TableSinglecraftRank.table = zj.Game.ConfigManager.getTable("table_singlecraft_rank.json");
                if (TableSinglecraftRank.table == null)
                    TableSinglecraftRank.table = {};
            }
            return TableSinglecraftRank.table;
        };
        TableSinglecraftRank.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSinglecraftRank.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSinglecraftRank.table = null;
        return TableSinglecraftRank;
    }());
    zj.TableSinglecraftRank = TableSinglecraftRank;
    __reflect(TableSinglecraftRank.prototype, "zj.TableSinglecraftRank");
    window['TableSinglecraftRank'] = TableSinglecraftRank;
    // table_singlecraft_rank_self.csv
    // 跨服战本服积分表
    var TableSinglecraftRankSelf = (function () {
        function TableSinglecraftRankSelf() {
            this.id = 0; // id
            this.rank_min = 0; // 排名区间最小值
            this.rank_max = 0; // 排名区间最大值
            this.title_id = ""; // 称号
            this.reward_goods = new Array(); // 段位奖励物品
            this.reward_count = new Array(); // 段位奖励数量
        }
        TableSinglecraftRankSelf.Table = function () {
            if (TableSinglecraftRankSelf.table == null) {
                TableSinglecraftRankSelf.table = zj.Game.ConfigManager.getTable("table_singlecraft_rank_self.json");
                if (TableSinglecraftRankSelf.table == null)
                    TableSinglecraftRankSelf.table = {};
            }
            return TableSinglecraftRankSelf.table;
        };
        TableSinglecraftRankSelf.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSinglecraftRankSelf.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSinglecraftRankSelf.table = null;
        return TableSinglecraftRankSelf;
    }());
    zj.TableSinglecraftRankSelf = TableSinglecraftRankSelf;
    __reflect(TableSinglecraftRankSelf.prototype, "zj.TableSinglecraftRankSelf");
    window['TableSinglecraftRankSelf'] = TableSinglecraftRankSelf;
    // table_singlecraft_score.csv
    // 跨服战积分表
    var TableSinglecraftScore = (function () {
        function TableSinglecraftScore() {
            this.index = 0; // 段位
            this.name = ""; // 段位名称
            this.section_score = 0; // 段位积分下限
            this.title_id = ""; // 获得称号
            this.win_coin = 0; // 胜利得币
            this.fail_coin = 0; // 失败得币
            this.reset_down = 0; // 重置后降低分数
            this.reward_goods = new Array(); // 每日段位奖励物品
            this.reward_count = new Array(); // 每日段位奖励数量
            this.season_reward_goods = new Array(); // 赛季段位奖励物品
            this.season_reward_count = new Array(); // 赛季段位奖励数量
            this.icon_num = ""; // 段位Icon数字
            this.title = ""; // 段位名称图片(大图)
        }
        TableSinglecraftScore.Table = function () {
            if (TableSinglecraftScore.table == null) {
                TableSinglecraftScore.table = zj.Game.ConfigManager.getTable("table_singlecraft_score.json");
                if (TableSinglecraftScore.table == null)
                    TableSinglecraftScore.table = {};
            }
            return TableSinglecraftScore.table;
        };
        TableSinglecraftScore.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSinglecraftScore.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSinglecraftScore.table = null;
        return TableSinglecraftScore;
    }());
    zj.TableSinglecraftScore = TableSinglecraftScore;
    __reflect(TableSinglecraftScore.prototype, "zj.TableSinglecraftScore");
    window['TableSinglecraftScore'] = TableSinglecraftScore;
    // table_skill_action.csv
    var TableSkillAction = (function () {
        function TableSkillAction() {
            this.id = 0; // 动作序列号
            this.name = ""; // 动作名称
            this.spx_action_id = 0; // 动作行为id
            this.role_displacement_id = 0; // 人物位移
            this.is_repeat = 0; // 是否循环播放
            this.continue_time = 0; // 动作持续时间
            this.action_flash = 0; // 行为目标（1-上一次行为，2-原始的进场位置，3-本地现在在什么位置就什么位置开始，4-特定位置，5-指定位置根据effect的目标）
            this.flash_target_param1 = 0; // 行为参数1
            this.flash_target_param2 = 0; // 行为参数2
            this.is_lockY = 0; // 是否锁定Y轴
            this.target_offset_distance = new Array(); // 相对行为目标的偏差距离
            this.effects_id = new Array(); // 特效id
            this.effects_appear_frame = new Array(); // 触发特效时机
            this.zone_reset = 0; // 区间重置
            this.hurt_id = 0; // 效果id
            this.break_action_frame = 0; // 打断等级(自己打断自己）
            this.action_break_priority = 0; // 特效动作优先级(打断相关)
            this.play_speed = 0; // 动作播放速度
            this.shake_id = 0; // 震动id
            this.shake_appear_frame = 0; // 震动出现时机
            this.is_to_floor_over = 0; // 是否到达地面结束动作
            this.action_effect_sound_id = 0; // 动作音效
            this.is_continue = 0; // 是否持续施法
            this.collision_num = 0; // 穿透次数
            this.collision_distance = 0; // 有效碰撞距离
        }
        TableSkillAction.Table = function () {
            if (TableSkillAction.table == null) {
                TableSkillAction.table = zj.Game.ConfigManager.getTable("table_skill_action.json");
                if (TableSkillAction.table == null)
                    TableSkillAction.table = {};
            }
            return TableSkillAction.table;
        };
        TableSkillAction.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSkillAction.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSkillAction.table = null;
        return TableSkillAction;
    }());
    zj.TableSkillAction = TableSkillAction;
    __reflect(TableSkillAction.prototype, "zj.TableSkillAction");
    window['TableSkillAction'] = TableSkillAction;
    // table_skill_buff.csv
    var TableSkillBuff = (function () {
        function TableSkillBuff() {
            this.buff_id = 0; // Buff序列号
            this.base_type = 0; // BUFF基础类型(参见table-enumn)
            this.buff_name = ""; // 名称
            this.source = ""; // 基数数值来源说明
            this.des_arg = ""; // 参数说明
            this.buff_owner = ""; // 对应技能或天赋
            this.damage_type = 0; // 伤害类型(物攻-魔攻-神圣攻击)
            this.hit_rate = new Array(); // 命中概率|升级参数
            this.continue_time = new Array(); // 持续时间|升级参数
            this.fis_param = new Array(); // 参数一:间隔时间，基数|增量
            this.sec_param = new Array(); // 参数二：具体伤害值，基数|增量
            this.third_param = new Array(); // 参数三：具体伤害值，基数|增量
            this.body_color = new Array(); // 中Buff人物颜色
            this.des_param = new Array(); // 技能描述参数1
            this.des_param2 = new Array(); // 假技能描述参数1
            this.skill_des = ""; // 技能描述
        }
        TableSkillBuff.Table = function () {
            if (TableSkillBuff.table == null) {
                TableSkillBuff.table = zj.Game.ConfigManager.getTable("table_skill_buff.json");
                if (TableSkillBuff.table == null)
                    TableSkillBuff.table = {};
            }
            return TableSkillBuff.table;
        };
        TableSkillBuff.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSkillBuff.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSkillBuff.table = null;
        return TableSkillBuff;
    }());
    zj.TableSkillBuff = TableSkillBuff;
    __reflect(TableSkillBuff.prototype, "zj.TableSkillBuff");
    window['TableSkillBuff'] = TableSkillBuff;
    // table_skill_effects.csv
    var TableSkillEffects = (function () {
        function TableSkillEffects() {
            this.id = 0; // 特效序列号
            this.role = ""; // 使用角色
            this.effects_spx_id = 0; // 特效资源id
            this.efficient_eff = 0; // 特效关联id
            this.effects_action_id = 0; // 特效行为id
            this.effect_scale = 0; // 特效缩放
            this.start_move_time = 0; // 开始移动时间
            this.displacement_id = 0; // 特效位移
            this.is_repeat = 0; // 是否循环播放
            this.continue_time = 0; // 动作持续时间
            this.collision_num = 0; // 穿透次数
            this.play_speed = 0; // 播放速度(默认读的面板里的值)
            this.distance_role = new Array(); // 触发相对角色位置
            this.is_follow_role = 0; // 是否跟随角色
            this.is_lockY = 0; // 是否锁定Y轴
            this.is_floor_end = 0; // 是否碰到地面就结束
            this.effect_atk_type = 0; // 特效攻击类型（参照TableDamageType 1-物理 2-技能）
            this.effect_skill_type = 0; // 特效触发技能类型(参照TableSkillType)
            this.effect_target_pos = 0; // 方位(1-我方，2敌方)
            this.distance_map = new Array(); // 触发相对地图位置
            this.effect_target = 0; // 施加目标类型（参照TableTargetId）
            this.point_hurt = new Array(); // 指向伤害
            this.effect_break_priority = 0; // 特效动作优先级(打断相关)
            this.buff_zone_reset = 0; // 
            this.effect_buff_id = 0; // buff触发Id
            this.buff_appear_frame = 0; // buff触发时机
            this.hurt_zone_reset = 0; // 区间重置
            this.hurt_id = 0; // 效果id
            this.hit_effects_ids = new Array(); // 击中特效id
            this.hit_effects_size = new Array(); // 击中特效id
            this.next_effects_id = 0; // 下一个特效id
            this.shake_id = 0; // 震动id
            this.shake_appear_frame = 0; // 震动出现时机
            this.call_monsterbase = 0; // 召唤怪物id
            this.call_frame = 0; // 召唤怪物时机
            this.effect_sound_id = 0; // 特效音效
            this.sound_appear_frame = 0; // 音效出现时机
            this.blend_active = 0; // 混合通道
            this.particle_id = 0; // 粒子id
            this.particle_frame = 0; // 粒子触发时机
            this.decay_ratio = 0; // 衰减距离
            this.missile_speed = 0; // 追踪导弹速度
            this.collision_distance = 0; // 有效碰撞距离
        }
        TableSkillEffects.Table = function () {
            if (TableSkillEffects.table == null) {
                TableSkillEffects.table = zj.Game.ConfigManager.getTable("table_skill_effects.json");
                if (TableSkillEffects.table == null)
                    TableSkillEffects.table = {};
            }
            return TableSkillEffects.table;
        };
        TableSkillEffects.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSkillEffects.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSkillEffects.table = null;
        return TableSkillEffects;
    }());
    zj.TableSkillEffects = TableSkillEffects;
    __reflect(TableSkillEffects.prototype, "zj.TableSkillEffects");
    window['TableSkillEffects'] = TableSkillEffects;
    // table_skill_hurt.csv
    var TableSkillHurt = (function () {
        function TableSkillHurt() {
            this.id = 0; // 效果序列号
            this.name = ""; // 伤害名称
            this.time = new Array(); // 开始帧|结束帧|总时间（毫秒）
            this.effect_type = 0; // 效果类型（0无类型，1血量，2怒气）
            this.proof_value = 0; // 效果校对
            this.role_num = 0; // 受伤角色总数
            this.hurt_gap_time = 0; // 受伤判定间隔（毫秒）
            this.stiff_time = 0; // 硬直时间
            this.attacked_state = 0; // 受伤方式（0-普通受伤，1-向下击打受伤，2-挑起受伤）
            this.attacked_displacement_id = 0; // 受伤位移
            this.hurt_effect_sound_id = 0; // 受伤音效
            this.hurt_weight = 0; // 伤害权重
        }
        TableSkillHurt.Table = function () {
            if (TableSkillHurt.table == null) {
                TableSkillHurt.table = zj.Game.ConfigManager.getTable("table_skill_hurt.json");
                if (TableSkillHurt.table == null)
                    TableSkillHurt.table = {};
            }
            return TableSkillHurt.table;
        };
        TableSkillHurt.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSkillHurt.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSkillHurt.table = null;
        return TableSkillHurt;
    }());
    zj.TableSkillHurt = TableSkillHurt;
    __reflect(TableSkillHurt.prototype, "zj.TableSkillHurt");
    window['TableSkillHurt'] = TableSkillHurt;
    // table_skill_unit.csv
    var TableSkillUnit = (function () {
        function TableSkillUnit() {
            this.id = 0; // 技能单元id
            this.des_private = ""; // 私人描述
            this.skill_order = 0; // 技能单元优先级
            this.all_action = new Array(); // 技能单元包含的动作
            this.bg_spx_id = 0; // 背景动画资源id
            this.bg_spx_index = 0; // 背景动画开始索引
            this.bg_appear_frame = 0; // 动作北京动画出现时机
            this.storage_appear_frame = 0; // 蓄力光效产生时机
            this.look_begin_frame = 0; // 静止开始帧
            this.look_end_frame = 0; // 帧前为静止状态
        }
        TableSkillUnit.Table = function () {
            if (TableSkillUnit.table == null) {
                TableSkillUnit.table = zj.Game.ConfigManager.getTable("table_skill_unit.json");
                if (TableSkillUnit.table == null)
                    TableSkillUnit.table = {};
            }
            return TableSkillUnit.table;
        };
        TableSkillUnit.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSkillUnit.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSkillUnit.table = null;
        return TableSkillUnit;
    }());
    zj.TableSkillUnit = TableSkillUnit;
    __reflect(TableSkillUnit.prototype, "zj.TableSkillUnit");
    window['TableSkillUnit'] = TableSkillUnit;
    // table_spgeneral_reward.csv
    // 猛将
    var TableSpgeneralReward = (function () {
        function TableSpgeneralReward() {
            this.index = 0; // 索引
            this.general_id = new Array(); // 武将号
            this.own_count = 0; // 数量
            this.general_name = ""; // 武将名称
            this.reward_goods = new Array(); // 奖励内容
            this.reward_count = new Array(); // 奖励数量
            this.show_type = new Array(); // 显示类型
        }
        TableSpgeneralReward.Table = function () {
            if (TableSpgeneralReward.table == null) {
                TableSpgeneralReward.table = zj.Game.ConfigManager.getTable("table_spgeneral_reward.json");
                if (TableSpgeneralReward.table == null)
                    TableSpgeneralReward.table = {};
            }
            return TableSpgeneralReward.table;
        };
        TableSpgeneralReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSpgeneralReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSpgeneralReward.table = null;
        return TableSpgeneralReward;
    }());
    zj.TableSpgeneralReward = TableSpgeneralReward;
    __reflect(TableSpgeneralReward.prototype, "zj.TableSpgeneralReward");
    window['TableSpgeneralReward'] = TableSpgeneralReward;
    // table_spgeneral_information.csv
    // 猛将
    var TableSpgeneralInformation = (function () {
        function TableSpgeneralInformation() {
            this.index = 0; // 索引
            this.task_type = 0; // 任务类型
            this.general_id = 0; // 武将Id
            this.general_name = ""; // 武将名称
            this.aptitude = 0; // 武将资质
            this.img_path = ""; // 全身图片
            this.head_path = ""; // 头像图片
            this.title_path = ""; // 特性图片
            this.word_path = ""; // 名字图片
            this.text_path = ""; // 武将说明
            this.name_path = ""; // 名字下标
            this.general_series = ""; // 系别图片
            this.general_type_path = ""; // 猎人类型图片
            this.general_technique = ""; // 使用技巧
            this.general_des = ""; // 角色定位
            this.general_story = ""; // 猎人故事
        }
        TableSpgeneralInformation.Table = function () {
            if (TableSpgeneralInformation.table == null) {
                TableSpgeneralInformation.table = zj.Game.ConfigManager.getTable("table_spgeneral_information.json");
                if (TableSpgeneralInformation.table == null)
                    TableSpgeneralInformation.table = {};
            }
            return TableSpgeneralInformation.table;
        };
        TableSpgeneralInformation.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableSpgeneralInformation.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableSpgeneralInformation.table = null;
        return TableSpgeneralInformation;
    }());
    zj.TableSpgeneralInformation = TableSpgeneralInformation;
    __reflect(TableSpgeneralInformation.prototype, "zj.TableSpgeneralInformation");
    window['TableSpgeneralInformation'] = TableSpgeneralInformation;
    // table_online_reward.csv
    var TableOnlineReward = (function () {
        function TableOnlineReward() {
            this.index = 0; // 索引
            this.online_time = 0; // 在线时长
            this.goods_id = new Array(); // 物品
            this.goods_count = new Array(); // 物品数量
        }
        TableOnlineReward.Table = function () {
            if (TableOnlineReward.table == null) {
                TableOnlineReward.table = zj.Game.ConfigManager.getTable("table_online_reward.json");
                if (TableOnlineReward.table == null)
                    TableOnlineReward.table = {};
            }
            return TableOnlineReward.table;
        };
        TableOnlineReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableOnlineReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableOnlineReward.table = null;
        return TableOnlineReward;
    }());
    zj.TableOnlineReward = TableOnlineReward;
    __reflect(TableOnlineReward.prototype, "zj.TableOnlineReward");
    window['TableOnlineReward'] = TableOnlineReward;
    // table_teach.csv
    // 教学
    var TableTeach = (function () {
        function TableTeach() {
            this.id = 0; // 索引
            this.part = 0; // 序号
            this.scene = ""; // 场景
            this.typeLua = ""; // 类别
            this.des = ""; // 说明
            this.condition = ""; // 条件
        }
        TableTeach.Table = function () {
            if (TableTeach.table == null) {
                TableTeach.table = zj.Game.ConfigManager.getTable("table_teach.json");
                if (TableTeach.table == null)
                    TableTeach.table = {};
                TableTeach.tableLength = zj.Game.PlayerMissionSystem.tableLength(TableTeach.table);
            }
            return TableTeach.table;
        };
        TableTeach.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableTeach.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableTeach.table = null;
        TableTeach.tableLength = 0;
        return TableTeach;
    }());
    zj.TableTeach = TableTeach;
    __reflect(TableTeach.prototype, "zj.TableTeach");
    window['TableTeach'] = TableTeach;
    // table_tower.csv
    // 爬塔
    var TableTower = (function () {
        function TableTower() {
            this.id = 0; // 层数
            this.instance_name = ""; // 关卡名称
            this.reduce_power = 0; // 消耗体力
            this.first_reward = new Array(); // 首杀奖励
            this.reward_good_id = new Array(); // 奖励物品id
            this.reward_good_count = new Array(); // 奖励物品数量
            this.reward_good_show_type = new Array(); // 奖励物品显示
            this.cimelia_good_id = new Array(); // 宝箱物品count
            this.cimelia_good_count = new Array(); // 宝箱物品id
            this.tower_pack = new Array(); // 包含关卡
            this.better_power = 0; // 推荐战力
            this.battle_bg = 0; // 副本战斗背景id
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = new Array(); // Boss形象id（映射map_role表）
            this.boss_name = ""; // 怪物名
            this.monster_level = 0; // 怪物等级
            this.des = ""; // 描述
        }
        TableTower.Table = function () {
            if (TableTower.table == null) {
                TableTower.table = zj.Game.ConfigManager.getTable("table_tower.json");
                if (TableTower.table == null)
                    TableTower.table = {};
            }
            return TableTower.table;
        };
        TableTower.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableTower.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableTower.table = null;
        return TableTower;
    }());
    zj.TableTower = TableTower;
    __reflect(TableTower.prototype, "zj.TableTower");
    window['TableTower'] = TableTower;
    // table_training.csv
    // 特训
    var TableTraining = (function () {
        function TableTraining() {
            this.instance_id = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
            this.instance_name = ""; // 副本名称
            this.instance_pack = new Array(); // 副本包含关卡
            this.challenge_level = 0; // 挑战等级
            this.reward_goods = new Array(); // 奖励物品
            this.combo_count = 0; // 过关连击数
            this.battle_bg = 0; // 副本战斗背景id
            this.boss_roleId = 0; // Boss形象id（映射map_role表）
            this.instance_icon = ""; // 副本icon
            this.instance_des = ""; // 副本说明
        }
        TableTraining.Table = function () {
            if (TableTraining.table == null) {
                TableTraining.table = zj.Game.ConfigManager.getTable("table_training.json");
                if (TableTraining.table == null)
                    TableTraining.table = {};
            }
            return TableTraining.table;
        };
        TableTraining.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableTraining.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableTraining.table = null;
        return TableTraining;
    }());
    zj.TableTraining = TableTraining;
    __reflect(TableTraining.prototype, "zj.TableTraining");
    window['TableTraining'] = TableTraining;
    // table_uplevel_reward.csv
    var TableUplevelReward = (function () {
        function TableUplevelReward() {
            this.index = 0; // 索引
            this.level = 0; // 条件等级
            this.level_reward = new Array(); // 等级奖励
            this.month_card = new Array(); // 月卡条件
            this.month_reward = new Array(); // 月卡奖励
        }
        TableUplevelReward.Table = function () {
            if (TableUplevelReward.table == null) {
                TableUplevelReward.table = zj.Game.ConfigManager.getTable("table_uplevel_reward.json");
                if (TableUplevelReward.table == null)
                    TableUplevelReward.table = {};
            }
            return TableUplevelReward.table;
        };
        TableUplevelReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableUplevelReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableUplevelReward.table = null;
        return TableUplevelReward;
    }());
    zj.TableUplevelReward = TableUplevelReward;
    __reflect(TableUplevelReward.prototype, "zj.TableUplevelReward");
    window['TableUplevelReward'] = TableUplevelReward;
    var TableWorkSend = (function () {
        function TableWorkSend() {
            this.work_id = 0; // 工作id
            this.work_des = ""; // 工作描述
        }
        TableWorkSend.Table = function () {
            if (TableWorkSend.table == null) {
                TableWorkSend.table = zj.Game.ConfigManager.getTable("table_work_send.json");
                if (TableWorkSend.table == null)
                    TableWorkSend.table = {};
            }
            return TableWorkSend.table;
        };
        TableWorkSend.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWorkSend.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWorkSend.table = null;
        return TableWorkSend;
    }());
    zj.TableWorkSend = TableWorkSend;
    __reflect(TableWorkSend.prototype, "zj.TableWorkSend");
    window['TableWorkSend'] = TableWorkSend;
    // table_vipinfo.csv
    var TableVipinfo = (function () {
        function TableVipinfo() {
            this.level = 0; // Vip等级
            this.vipLevelName = ""; // VIP等级名称
            this.text1 = new Array(); // 文字特殊奖励TextsConfig_Vip.vip_string1-20
            this.text2 = new Array(); // 文字特殊权利TextsConfig_Vip.vip_string20-40
            this.charge = 0; // 升级到下一级充值代币数量
            this.sum = 0; // 累计充值
            this.power_speed = 0; // 体力恢复速度
            this.power_add = 0; // 体力上限
            this.buy_power = 0; // 购买体力次数
            this.instance_exp_add = 0; // 副本经验加成
            this.wanted_coin_add = 0; // 流星街金币加成
            this.mall_free_time = 0; // 商城免费刷新次数
            this.buy_coin_free_time = 0; // 购买金币免费次数
            this.runes_free_time = 0; // 猜拳免费次数(未完成)
            this.fishing_free_time = 0; // 钓鱼免费刷紫次数(未完成)
            this.package_add = 0; // 猎人仓库容量
            this.potato_add = 0; // 卡片数量上限
            this.craft_buy_time = 0; // 跨服战可购买次数(未完成)
            this.scene_revive_time = 0; // 仙境复活时间减少(未完成)
            this.sendchat = 0; // Vip上线提示
            this.is_sweep = 0; // 是否可扫荡5次（同时35级自动开启）
            this.is_speed = 0; // 是否开启3倍速战斗（30级以上开启）
            this.is_direct_tower = 0; // 是否直达
            this.search_count = 0; // 探索任务数量
        }
        TableVipinfo.Table = function () {
            if (TableVipinfo.table == null) {
                TableVipinfo.table = zj.Game.ConfigManager.getTable("table_vipinfo.json");
                if (TableVipinfo.table == null)
                    TableVipinfo.table = {};
            }
            return TableVipinfo.table;
        };
        TableVipinfo.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableVipinfo.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableVipinfo.table = null;
        return TableVipinfo;
    }());
    zj.TableVipinfo = TableVipinfo;
    __reflect(TableVipinfo.prototype, "zj.TableVipinfo");
    window['TableVipinfo'] = TableVipinfo;
    // table_vip_weal.csv
    var TableVipWeal = (function () {
        function TableVipWeal() {
            this.level = 0; // Vip等级
            this.goods_content = new Array(); // 商品
            this.goods_count = new Array(); // 商品数量
            this.consume_token = 0; // 消耗钻石
            this.primer = 0; // 原价
        }
        TableVipWeal.Table = function () {
            if (TableVipWeal.table == null) {
                TableVipWeal.table = zj.Game.ConfigManager.getTable("table_vip_weal.json");
                if (TableVipWeal.table == null)
                    TableVipWeal.table = {};
            }
            return TableVipWeal.table;
        };
        TableVipWeal.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableVipWeal.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableVipWeal.table = null;
        return TableVipWeal;
    }());
    zj.TableVipWeal = TableVipWeal;
    __reflect(TableVipWeal.prototype, "zj.TableVipWeal");
    window['TableVipWeal'] = TableVipWeal;
    // table_wanted.csv
    // 通缉令表
    var TableWanted = (function () {
        function TableWanted() {
            this.wanted_id = 0; // 通缉令Id
            this.type = 0; // 类型
            this.limit_level = 0; // 等级限制
            this.bSpecial = 0; // 特殊关卡（0普通，1特殊，2超特殊）
            this.consume_type = ""; // 挑战券
            this.static_goods = new Array(); // 固定物品奖励(id&count|id&count)
            this.sweep_consume = 0; // 扫荡消耗
            this.battle_consume = 0; // 体力消耗
            this.instance_pack = new Array(); // 包含关卡
            this.battle_bg = 0; // 战斗背景
            this.battle_value = 0; // 推荐战力
            this.first_reward = new Array(); // 首杀奖励
            this.rand_items = new Array(); // 随机分组
            this.rand_power = new Array(); // 掉落百分比
            this.soul_num = ""; // 掉落数量
            this.soul_power = ""; // 掉落权重
            this.extra_rand = new Array(); // 额外随机
            this.extra_power = new Array(); // 额外权重
            this.general = new Array(); // 推荐武将
            this.feature = new Array(); // 怪物特性
            this.drop_items = new Array(); // 客户端掉落
            this.monster_level = 0; // 怪物等级
            this.Instance_name = ""; // 关卡名字
            this.bossName = ""; // 怪物名字
            this.des = ""; // 描述
            this.boss_head_client = ""; // 怪物头像（客户端）
            this.boss_name_client = ""; // boss名字图片
            this.boss_drop_client = ""; // boss掉落说明
            this.boss_type_client = 0; // boss特性(1攻2防3辅)
            this.boss_feature_client = new Array(); // boss特性图片
            this.boss_floor = ""; // 是否为boss层
            this.technique = new Array(); // 推荐阵容
            this.is_continuous = 0; // 是否可连续挑战
            this.dialog_tip = ""; // 对话小tip
        }
        TableWanted.Table = function () {
            if (TableWanted.table == null) {
                TableWanted.table = zj.Game.ConfigManager.getTable("table_wanted.json");
                if (TableWanted.table == null)
                    TableWanted.table = {};
            }
            return TableWanted.table;
        };
        TableWanted.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWanted.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWanted.table = null;
        return TableWanted;
    }());
    zj.TableWanted = TableWanted;
    __reflect(TableWanted.prototype, "zj.TableWanted");
    window['TableWanted'] = TableWanted;
    // table_wanted_enemy_camp.csv
    // 敌犯大本营
    var TableWantedEnemyCamp = (function () {
        function TableWantedEnemyCamp() {
            this.id = 0; // 层数
            this.type = 0; // 类型
            this.instance_level = ""; // 关卡等级
            this.reward_good_id = new Array(); // 奖励物品id
            this.reward_good_count = new Array(); // 奖励物品数量
            this.instance_pack = new Array(); // 包含关卡
            this.general = new Array(); // 推荐武将
            this.battle_value = 0; // 推荐战力
            this.feature = new Array(); // 怪物特性
            this.general_id = 0; // 怪物形象id
            this.monster_level = 0; // 怪物等级
            this.battle_bg = 0; // 副本战斗背景id
        }
        TableWantedEnemyCamp.Table = function () {
            if (TableWantedEnemyCamp.table == null) {
                TableWantedEnemyCamp.table = zj.Game.ConfigManager.getTable("table_wanted_enemy_camp.json");
                if (TableWantedEnemyCamp.table == null)
                    TableWantedEnemyCamp.table = {};
            }
            return TableWantedEnemyCamp.table;
        };
        TableWantedEnemyCamp.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWantedEnemyCamp.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWantedEnemyCamp.table = null;
        return TableWantedEnemyCamp;
    }());
    zj.TableWantedEnemyCamp = TableWantedEnemyCamp;
    __reflect(TableWantedEnemyCamp.prototype, "zj.TableWantedEnemyCamp");
    window['TableWantedEnemyCamp'] = TableWantedEnemyCamp;
    // table_wanted_rand.csv
    // 通缉令掉落
    var TableWantedRand = (function () {
        function TableWantedRand() {
            this.id = 0; // 分组id
            this.type = 0; // 类型
            this.desc = ""; // 描述
            this.rand_items = new Array(); // 随机分组
            this.rand_power = 0; // 出现权值
        }
        TableWantedRand.Table = function () {
            if (TableWantedRand.table == null) {
                TableWantedRand.table = zj.Game.ConfigManager.getTable("table_wanted_rand.json");
                if (TableWantedRand.table == null)
                    TableWantedRand.table = {};
            }
            return TableWantedRand.table;
        };
        TableWantedRand.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWantedRand.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWantedRand.table = null;
        return TableWantedRand;
    }());
    zj.TableWantedRand = TableWantedRand;
    __reflect(TableWantedRand.prototype, "zj.TableWantedRand");
    window['TableWantedRand'] = TableWantedRand;
    // table_wonderland.csv
    // 仙境
    var TableWonderland = (function () {
        function TableWonderland() {
            this.wonderland_id = 0; // 仙境id
            this.wonderland_name = ""; // 仙境名称
            this.open_time = new Array(); // 开放时间
            this.mix_level = 0; // 最小等级
            this.max_level = 0; // 最大等级
            this.is_novice = 0; // 是否是新手仙境
            this.is_battle = 0; // 是否可以战斗
            this.is_halo = 0; // 是否生效光环
            this.optimize_degree = 0; // 优化程度(0表示不优化)
            this.max_people = 0; // 最大进入人数(0表示不做限制)
            this.branch_condition = 0; // 分支条件(0表示该场景无分支)
            this.tree_pos = new Array(); // 果树位置
            this.revive_x = new Array(); // 复活区域
            this.revive_y = new Array(); // 复活区域
            this.mobs_produce = new Array(); // 怪物生成器
            this.back_img = ""; // 背景图片
            this.name_img = ""; // 名称图片
            this.map_id = 0; // 地图id
            this.block_index = 0; // 地图块类型
            this.ani_id = new Array(); // 动画id
        }
        TableWonderland.Table = function () {
            if (TableWonderland.table == null) {
                TableWonderland.table = zj.Game.ConfigManager.getTable("table_wonderland.json");
                if (TableWonderland.table == null)
                    TableWonderland.table = {};
            }
            return TableWonderland.table;
        };
        TableWonderland.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWonderland.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWonderland.table = null;
        return TableWonderland;
    }());
    zj.TableWonderland = TableWonderland;
    __reflect(TableWonderland.prototype, "zj.TableWonderland");
    window['TableWonderland'] = TableWonderland;
    // table_wonderland_map_block.csv
    // 仙境地图表
    var TableWonderlandMapBlock = (function () {
        function TableWonderlandMapBlock() {
            this.build_id = 0; // 建筑id
            this.build_name = ""; // 建筑名称
            this.show_scene = new Array(); // 出现场景
            this.block_cell = 0; // 建筑放置层（1:far,2:mid2，3:mid1,4:group,5:close)
            this.build_type = 0; // 建筑物类型 5:功能npc
            this.be_attacked = 0; // 建筑是否可被攻击或者触摸
            this.build_x = 0; // 建筑坐标
            this.build_y = 0; // 建筑坐标
            this.balk_rt = new Array(); // 碰撞格范围
            this.touch_rt = new Array(); // 触摸范围
            this.is_mirror = 0; // 是否镜像
            this.draw_order = 0; // 绘制层级
            this.path = ""; // 路径
            this.spine_scale = 0; // spine缩放
            this.spine_id = 0; // spine动画
            this.des = ""; // 描述
            this.name_path = ""; // 名字路径
            this.name_pos = new Array(); // 名字位置
        }
        TableWonderlandMapBlock.Table = function () {
            if (TableWonderlandMapBlock.table == null) {
                TableWonderlandMapBlock.table = zj.Game.ConfigManager.getTable("table_wonderland_map_block.json");
                if (TableWonderlandMapBlock.table == null)
                    TableWonderlandMapBlock.table = {};
            }
            return TableWonderlandMapBlock.table;
        };
        TableWonderlandMapBlock.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWonderlandMapBlock.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWonderlandMapBlock.table = null;
        return TableWonderlandMapBlock;
    }());
    zj.TableWonderlandMapBlock = TableWonderlandMapBlock;
    __reflect(TableWonderlandMapBlock.prototype, "zj.TableWonderlandMapBlock");
    window['TableWonderlandMapBlock'] = TableWonderlandMapBlock;
    // table_wonderland_tree.csv
    // 仙境植物
    var TableWonderlandTree = (function () {
        function TableWonderlandTree() {
            this.tree_id = 0; // 副本id(精英副本id从100001开始,普通副本Id和精英副本Id必须是连续的)
            this.tree_name = ""; // 副本名称
            this.not_limit = 0; // 果实是否无限
            this.is_timeTree = 0; // 时间段果实
            this.quality = 0; // 品质
            this.time_limit = 0; // 时间限制果实
            this.collection_get = new Array(); // 采集必得
            this.collection_rand = ""; // 采集随机
            this.rand_count = new Array(); // 随机数量
            this.rand_power = new Array(); // 随机数量权重
            this.fruit_type = ""; // 果实类型
            this.is_show = 0; // 是否公告
            this.collection_consume = 0; // 采集消耗
            this.collection_time = 0; // 采集消耗时长
            this.mature_time = ""; // 果实成熟时长
            this.mature_count = 0; // 果实数量
            this.darkland_score = ""; // 黑暗大陆积分
            this.mobs_rand = 0; // 怪物出现概率
            this.mobs_info = new Array(); // 怪物
            this.mobs_rand_power = new Array(); // 怪物随机概率
            this.alive_time = ""; // 怪物存活时长
            this.mobs_point = new Array(); // 怪物移动范围
            this.machine_rand = new Array(); // 触发机关概率(0不触发1爆炸2冰冻3加速4加血5加倍)
            this.immature_img = 0; // 未成熟果树（动画ani_ui）
            this.mature_path = 0; // 成熟果树图（动画ani_ui）
            this.balk_rt = new Array(); // 碰撞格范围
            this.touch_rt = new Array(); // 触摸范围
            this.shelter_pos = new Array(); // 阴影范围
            this.tag_y = 0; // 果树标签相对位置高度
            this.time_show = 0; // 成熟时间显示
        }
        TableWonderlandTree.Table = function () {
            if (TableWonderlandTree.table == null) {
                TableWonderlandTree.table = zj.Game.ConfigManager.getTable("table_wonderland_tree.json");
                if (TableWonderlandTree.table == null)
                    TableWonderlandTree.table = {};
            }
            return TableWonderlandTree.table;
        };
        TableWonderlandTree.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWonderlandTree.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWonderlandTree.table = null;
        return TableWonderlandTree;
    }());
    zj.TableWonderlandTree = TableWonderlandTree;
    __reflect(TableWonderlandTree.prototype, "zj.TableWonderlandTree");
    window['TableWonderlandTree'] = TableWonderlandTree;
    // table_worldboss_map_block.csv
    // boss战建筑表
    var TableWorldbossMapBlock = (function () {
        function TableWorldbossMapBlock() {
            this.build_id = 0; // 建筑id
            this.build_name = ""; // 建筑名称
            this.build_type = 0; // 建筑物类型
            this.be_attacked = 0; // 建筑是否可被攻击
            this.build_x = 0; // 建筑坐标
            this.build_y = 0; // 建筑坐标
            this.balk_rt = new Array(); // 碰撞格范围
            this.touch_rt = new Array(); // 触摸范围
            this.is_mirror = 0; // 是否镜像
            this.draw_order = 0; // 绘制层级
            this.path = ""; // 路径
            this.spine_id = 0; // spine动画
            this.des = ""; // 描述
        }
        TableWorldbossMapBlock.Table = function () {
            if (TableWorldbossMapBlock.table == null) {
                TableWorldbossMapBlock.table = zj.Game.ConfigManager.getTable("table_worldboss_map_block.json");
                if (TableWorldbossMapBlock.table == null)
                    TableWorldbossMapBlock.table = {};
            }
            return TableWorldbossMapBlock.table;
        };
        TableWorldbossMapBlock.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableWorldbossMapBlock.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableWorldbossMapBlock.table = null;
        return TableWorldbossMapBlock;
    }());
    zj.TableWorldbossMapBlock = TableWorldbossMapBlock;
    __reflect(TableWorldbossMapBlock.prototype, "zj.TableWorldbossMapBlock");
    window['TableWorldbossMapBlock'] = TableWorldbossMapBlock;
    // table_xuyuan.csv
    var TableXuyuan = (function () {
        function TableXuyuan() {
            this.id = 0; // 主题id
            this.name = ""; // 主题名称
            this.rand_item = new Array(); // 随机物品
            this.rand_power = new Array(); // 随机权重
            this.exchange_goods = new Array(); // 兑换物品
            this.exchange_xuyuan = new Array(); // 兑换积分
            this.exchange_count = new Array(); // 兑换次数
            this.consume_pai = 0; // 单次许愿消耗牌
            this.consume_pai_ten = 0; // 十次许愿消耗牌
            this.consume_good = 0; // 许愿消耗物品
            this.one_time_rand = 0; // 首次单抽给
            this.ten_time_rand = 0; // 十连抽必给
            this.score = 0; // 单抽获取积分
            this.integral_duration = 0; // 距离娃娃机时长
            this.subject_duration = 0; // 主题时长
            this.step_score = new Array(); // 进度奖励条件
            this.step_reward = new Array(); // 进度奖励
            this.max_time = 0; // 本期最大次数
            this.client_award = new Array(); // 客户端奖励
            this.client_award_pic = new Array(); // 客户端奖励图
        }
        TableXuyuan.Table = function () {
            if (TableXuyuan.table == null) {
                TableXuyuan.table = zj.Game.ConfigManager.getTable("table_xuyuan.json");
                if (TableXuyuan.table == null)
                    TableXuyuan.table = {};
            }
            return TableXuyuan.table;
        };
        TableXuyuan.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableXuyuan.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableXuyuan.table = null;
        return TableXuyuan;
    }());
    zj.TableXuyuan = TableXuyuan;
    __reflect(TableXuyuan.prototype, "zj.TableXuyuan");
    window['TableXuyuan'] = TableXuyuan;
    // client_table_up_pic.csv
    var TableClientUpPic = (function () {
        function TableClientUpPic() {
            this.pic_id = 0; // 图片id
            this.Name = ""; // 猎人名字
            this.path = ""; // 模板路径
            this.button_path = new Array(); // 按钮路径
        }
        TableClientUpPic.Table = function () {
            if (TableClientUpPic.table == null) {
                TableClientUpPic.table = zj.Game.ConfigManager.getTable("client_table_up_pic.json");
                if (TableClientUpPic.table == null)
                    TableClientUpPic.table = {};
            }
            return TableClientUpPic.table;
        };
        TableClientUpPic.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableClientUpPic.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableClientUpPic.table = null;
        return TableClientUpPic;
    }());
    __reflect(TableClientUpPic.prototype, "TableClientUpPic");
    window['TableClientUpPic'] = TableClientUpPic;
    // table_contend_reward.csv
    var TableContendReward = (function () {
        function TableContendReward() {
            this.id = 0; // id
            this.rank_min = 0; // 排名区间最小值
            this.rank_max = 0; // 排名区间最大值
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
            this.title_id = ""; // 称号
        }
        TableContendReward.Table = function () {
            if (TableContendReward.table == null) {
                TableContendReward.table = zj.Game.ConfigManager.getTable("table_contend_reward.json");
                if (TableContendReward.table == null)
                    TableContendReward.table = {};
            }
            return TableContendReward.table;
        };
        TableContendReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableContendReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableContendReward.table = null;
        return TableContendReward;
    }());
    __reflect(TableContendReward.prototype, "TableContendReward");
    window['TableContendReward'] = TableContendReward;
    // table_share_reward_new.csv
    var TableShareRewardNew = (function () {
        function TableShareRewardNew() {
            this.type = 0; // 类型
            this.name = ""; // name
            this.refresh_type = 0; // 刷新类型（1每日2永久）
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
            this.des = ""; // 描述
        }
        TableShareRewardNew.Table = function () {
            if (TableShareRewardNew.table == null) {
                TableShareRewardNew.table = zj.Game.ConfigManager.getTable("table_share_reward_new.json");
                if (TableShareRewardNew.table == null)
                    TableShareRewardNew.table = {};
            }
            return TableShareRewardNew.table;
        };
        TableShareRewardNew.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableShareRewardNew.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableShareRewardNew.table = null;
        return TableShareRewardNew;
    }());
    __reflect(TableShareRewardNew.prototype, "TableShareRewardNew");
    window['TableShareRewardNew'] = TableShareRewardNew;
    // server_table_sign.csv
    var ServerTableSign = (function () {
        function ServerTableSign() {
            this.id = 0; // 日期
            this.good_id = 0; // 物品id
            this.good_count = 0; // 普通物品数量
            this.show_type = 0; // 显示类型
            this.vip_level_limit = 0; // 双倍vip等级限制
        }
        ServerTableSign.Table = function () {
            if (ServerTableSign.table == null) {
                ServerTableSign.table = zj.Game.ConfigManager.getTable("server_table_sign.json");
                if (ServerTableSign.table == null)
                    ServerTableSign.table = {};
            }
            return ServerTableSign.table;
        };
        ServerTableSign.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = ServerTableSign.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        ServerTableSign.table = null;
        return ServerTableSign;
    }());
    zj.ServerTableSign = ServerTableSign;
    __reflect(ServerTableSign.prototype, "zj.ServerTableSign");
    window['ServerTableSign'] = ServerTableSign;
    // table_permit_mission.csv
    var TablePermitMission = (function () {
        function TablePermitMission() {
            this.id = 0; // id
            this.type = 0; // 类型
            this.value = 0; // 条件
            this.reward_goods = new Array(); // 奖励物品
            this.des = ""; // 描述
        }
        TablePermitMission.Table = function () {
            if (TablePermitMission.table == null) {
                TablePermitMission.table = zj.Game.ConfigManager.getTable("table_permit_mission.json");
                if (TablePermitMission.table == null)
                    TablePermitMission.table = {};
            }
            return TablePermitMission.table;
        };
        TablePermitMission.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePermitMission.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePermitMission.table = null;
        return TablePermitMission;
    }());
    zj.TablePermitMission = TablePermitMission;
    __reflect(TablePermitMission.prototype, "zj.TablePermitMission");
    window['TablePermitMission'] = TablePermitMission;
    // table_permit_reward.csv
    var TablePermitReward = (function () {
        function TablePermitReward() {
            this.id = 0; // id
            this.level = 0; // 等级
            this.season = 0; // 赛季
            this.free_reward = new Array(); // 免费物品
            this.pay_reward = new Array(); // 特殊物品
        }
        TablePermitReward.Table = function () {
            if (TablePermitReward.table == null) {
                TablePermitReward.table = zj.Game.ConfigManager.getTable("table_permit_reward.json");
                if (TablePermitReward.table == null)
                    TablePermitReward.table = {};
            }
            return TablePermitReward.table;
        };
        TablePermitReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TablePermitReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TablePermitReward.table = null;
        return TablePermitReward;
    }());
    zj.TablePermitReward = TablePermitReward;
    __reflect(TablePermitReward.prototype, "zj.TablePermitReward");
    window['TablePermitReward'] = TablePermitReward;
    // table_mission_reward.csv
    var TableMissionReward = (function () {
        function TableMissionReward() {
            this.index = 0; // 索引
            this.condition = 0; // 条件
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
        }
        TableMissionReward.Table = function () {
            if (TableMissionReward.table == null) {
                TableMissionReward.table = zj.Game.ConfigManager.getTable("table_mission_reward.json");
                if (TableMissionReward.table == null)
                    TableMissionReward.table = {};
            }
            return TableMissionReward.table;
        };
        TableMissionReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableMissionReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableMissionReward.table = null;
        return TableMissionReward;
    }());
    zj.TableMissionReward = TableMissionReward;
    __reflect(TableMissionReward.prototype, "zj.TableMissionReward");
    window['TableMissionReward'] = TableMissionReward;
    // table_tower_rank_reward.csv
    var TableTowerRankReward = (function () {
        function TableTowerRankReward() {
            this.id = 0; // 排名
            this.tower_rank_min = 0; // 排名区间最小值
            this.towe_rank_max = 0; // 排名区间最大值
            this.tower_rank_good_id = new Array(); // 排名物品id
            this.tower_rank_good_count = new Array(); // 排名物品数量
        }
        TableTowerRankReward.Table = function () {
            if (TableTowerRankReward.table == null) {
                TableTowerRankReward.table = zj.Game.ConfigManager.getTable("table_tower_rank_reward.json");
                if (TableTowerRankReward.table == null)
                    TableTowerRankReward.table = {};
            }
            return TableTowerRankReward.table;
        };
        TableTowerRankReward.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableTowerRankReward.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableTowerRankReward.table = null;
        return TableTowerRankReward;
    }());
    zj.TableTowerRankReward = TableTowerRankReward;
    __reflect(TableTowerRankReward.prototype, "zj.TableTowerRankReward");
    window['TableTowerRankReward'] = TableTowerRankReward;
    // table_league_skill.csv
    // 联盟技能
    var TableLeagueSkill = (function () {
        function TableLeagueSkill() {
            this.type = 0; // type
            this.name = ""; // name
            this.attri_type = 0; // 属性类型
            this.attri_value = new Array(); // 属性数值
            this.consume_coin = new Array(); // 消耗公会币
            this.consume_money = new Array(); // 消耗金币
        }
        TableLeagueSkill.Table = function () {
            if (TableLeagueSkill.table == null) {
                TableLeagueSkill.table = zj.Game.ConfigManager.getTable("table_league_skill.json");
                if (TableLeagueSkill.table == null)
                    TableLeagueSkill.table = {};
            }
            return TableLeagueSkill.table;
        };
        TableLeagueSkill.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableLeagueSkill.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableLeagueSkill.table = null;
        return TableLeagueSkill;
    }());
    zj.TableLeagueSkill = TableLeagueSkill;
    __reflect(TableLeagueSkill.prototype, "zj.TableLeagueSkill");
    window['TableLeagueSkill'] = TableLeagueSkill;
    // table_continue_pay.csv
    var TableContinuePay = (function () {
        function TableContinuePay() {
            this.id = 0; // 天数索引
            this.reward_goods = new Array(); // 奖励物品
            this.reward_count = new Array(); // 奖励数量
        }
        TableContinuePay.Table = function () {
            if (TableContinuePay.table == null) {
                TableContinuePay.table = zj.Game.ConfigManager.getTable("table_continue_pay.json");
                if (TableContinuePay.table == null)
                    TableContinuePay.table = {};
            }
            return TableContinuePay.table;
        };
        TableContinuePay.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableContinuePay.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableContinuePay.table = null;
        return TableContinuePay;
    }());
    zj.TableContinuePay = TableContinuePay;
    __reflect(TableContinuePay.prototype, "zj.TableContinuePay");
    window['TableContinuePay'] = TableContinuePay;
    // table_activity_rand_instance.csv
    var TableActivityRandInstance = (function () {
        function TableActivityRandInstance() {
            this.instance_id = 0; // id
            this.name = ""; // 活动类型
            this.open_instance = 0; // 通关开启
            this.instance_stage = new Array(); // 副本包含怪物
            this.reward_goods = new Array(); // 通关奖励
            this.battle_value = 0; // 推荐战力
            this.battle_bg = 0; // 副本战斗背景id
            this.feature = new Array(); // 怪物特性
            this.boss_roleId = 0; // Boss形象id（映射map_role表）
            this.instance_pic1 = ""; // 副本关卡插图（标题）
            this.instance_pic2 = ""; // 副本关卡插图（内容）
        }
        TableActivityRandInstance.Table = function () {
            if (TableActivityRandInstance.table == null) {
                TableActivityRandInstance.table = zj.Game.ConfigManager.getTable("table_activity_rand_instance.json");
                if (TableActivityRandInstance.table == null)
                    TableActivityRandInstance.table = {};
            }
            return TableActivityRandInstance.table;
        };
        TableActivityRandInstance.Item = function (key) {
            if (key == undefined || key == null)
                return null;
            var item = TableActivityRandInstance.Table()[key.toString()];
            if (item == undefined)
                return null;
            return item;
        };
        TableActivityRandInstance.table = null;
        return TableActivityRandInstance;
    }());
    zj.TableActivityRandInstance = TableActivityRandInstance;
    __reflect(TableActivityRandInstance.prototype, "zj.TableActivityRandInstance");
    window['TableActivityRandInstance'] = TableActivityRandInstance;
})(zj || (zj = {}));
//# sourceMappingURL=TableManager.js.map