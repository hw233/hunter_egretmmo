namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-11-20
     * 
     * @class 帮助类，辅助做一些计算
     */

    export class Helper {

        /**
         * 字符串格式化
         * 
         * @param str 字符串
         * @param para 可选参数
         * 
         * @description 可选参数如果传入数组，需要对数组进行解构操作
         */
        static StringFormat(str: string, ...para: any[]) {
            if (str == null || str == undefined) return "";
            if (typeof str !== "string") return String(str);
            var count = 0;
            str = str.replace(/(%%)/g, "%");
            //通过正则替换%s
            return str.replace(/(%.2f%)|(%s)|(%d)|(%u)|(%.1f)|(%2d)/g, function (s, i) {
                return para[count++];
            });
        }
        public static getWonderlandPlayerType(myMode, bMem) {
            let _type = TableEnum.Enum.LeagueWarTouchType.Partner;
            if (myMode == message.EBattleMode.BATTLE_MODE_PEACE) {
                _type = TableEnum.Enum.LeagueWarTouchType.Partner;
            } else if (myMode == message.EBattleMode.BATTLE_MODE_KILLING) {
                if (bMem) {
                    _type = TableEnum.Enum.LeagueWarTouchType.Partner;
                } else {
                    _type = TableEnum.Enum.LeagueWarTouchType.Person;
                }
            }
            return _type;
        }
        public static getWonderlandBloodPath(mode) {
            let path = UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
            if (mode == message.EBattleMode.BATTLE_MODE_PEACE) {
                path = UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
            } else if (mode == message.EBattleMode.BATTLE_MODE_KILLING) {
                path = UIConfig.UIConfig_LeagueWarScene.roleBloodFightBar;
            }
            return path;
        }
        public static beInWonderlandWater(point) {
            let rect: egret.Rectangle = new egret.Rectangle();
            let tag = false;
            for (let k in ConstantConfig_Wonderland.warter_range) {
                let v = ConstantConfig_Wonderland.warter_range[k];
                rect.x = v.x;
                rect.y = v.y;
                rect.width = v.width;
                rect.height = v.height;
                if (rect.containsPoint(point)) {
                    tag = true;
                    break;
                }
            }
            return tag;
        }
        //主城弹窗显示时间用
        static FormatMsTime3(ms) {
            let a = Math.floor(ms / 3600)
            let tmp = Math.floor(ms % 3600)
            let b = Math.floor(tmp / 60)
            let c = Math.floor(tmp % 60)
            let hour: string = null;
            let min: string = null;
            let ms1: string = null;
            if (a >= 10) {
                hour = Helper.StringFormat("%d", a)
            } else {
                hour = "0" + Helper.StringFormat("%d", a)
            }
            if (b >= 10) {
                min = Helper.StringFormat("%d", b)
            } else {
                min = "0" + Helper.StringFormat("%d", b)
            }
            if (c >= 10) {
                ms1 = Helper.StringFormat("%d", c)
            } else {
                ms1 = "0" + Helper.StringFormat("%d", c)
            }
            let ret = Helper.StringFormat("%s:%s:%s", hour, min, ms1);
            return ret;
        }

        public static random(seed: number = 1): number {
            let k = seed;
            k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            k ^= k >>> 24;
            k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            let h = (97 ^ 4);
            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;
            h ^= h >>> 13;
            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            h ^= h >>> 15;
            return (h >>> 0) & 0x7fffffff;
        }
        public static getRandom2(n, m) {
            if (n > m) {
                m = m + n;
                n = m - n;
                m = m - n;
            }
            let rand = n + TsMtirand() % (m - n + 1);
            return rand;
        }
        //获取段位对应星图
        public static GetSegmentStar(score, lowShow) {
            let tbl = TableLeagueMatchScore.Table();
            for (let i = 1; i <= Helper.getObjLen(tbl); i++) {
                if (tbl[i + 1] == null && score >= tbl[i].score_min) {
                    return UIConfig.UIConfig_Union.segmentLogo[i - 1];
                }
                if (score >= tbl[i].score_min && score < tbl[i + 1].score_min && (i >= 4 || lowShow)) {
                    return UIConfig.UIConfig_Union.segmentLogo[i - 1];
                }
            }
        }
        static baseToBriefInfo(msg) {
            let brief = new message.RoleBriefInfo;
            brief.id = msg.id
            brief.name = msg.name
            brief.level = msg.level
            brief.picId = msg.picId
            brief.picFrameId = msg.picFrameId
            brief.titleId = msg.titleId
            //brief.viceTitleId = msg.viceTitleId
            brief.ladderRank = msg.ladderRank
            brief.ladderMax = msg.ladderMax
            brief.leagueId = msg.leagueId
            brief.leagueName = msg.leagueName
            brief.is_online = msg.is_online
            brief.logoutTime = msg.logoutTime
            brief.battleValue = msg.battleValue
            brief.vipLevel = msg.vipLevel
            //brief.praisedCount = msg.praisedCount
            return brief;
        }
        public static writeDetailFormat(detailFormat) {
            let tbl = [];
            for (let i = 0; i < detailFormat.generals.length; i++) {
                if (detailFormat.generals[i] != null && detailFormat.generals[i].general_id) {
                    tbl.push(detailFormat.generals[i].general_id);
                }
            }
            for (let i = 0; i < detailFormat.reserves.length; i++) {
                if (detailFormat.reserves[i] != null && detailFormat.reserves[i].general_id) {
                    tbl.push(detailFormat.reserves[i].general_id);
                }
            }
            for (let i = 0; i < detailFormat.supports.length; i++) {
                if (detailFormat.supports[i] != null && detailFormat.supports[i].general_id) {
                    tbl.push(detailFormat.supports[i].general_id);
                }
            }
            return tbl;
        }
        public static writeSimpleFormat(format) {
            let tbl = [];
            for (let i = 0; i < format.generals.length; i++) {
                if (format.generals[i] > 0) {
                    tbl.push(format.generals[i]);
                }
            }
            for (let i = 0; i < format.reserves.length; i++) {
                if (format.reserves[i] > 0) {
                    tbl.push(format.reserves[i]);
                }
            }
            for (let i = 0; i < format.supports.length; i++) {
                if (format.supports[i] > 0) {
                    tbl.push(format.supports[i]);
                }
            }
            return tbl;
        }
        public static writeMainFormat(format) {
            let tbl = [];
            for (let i = 0; i < format.generals.length; i++) {
                if (format.generals[i] > 0) {
                    tbl.push(format.generals[i]);
                }
            }
            return tbl;
        }
        public static detailCovertFormat(detailFormat) {
            let msg = new message.FormationInfo;
            msg.adviserId = detailFormat.adviserId;
            //msg.strategy = detailFormat.strategy;
            msg.adviserSkill = detailFormat.adviserSkill;
            for (let i = 0; i < detailFormat.generals.length; i++) {
                msg.generals.push(detailFormat.generals[i].general_id);
            }
            for (let i = 0; i < detailFormat.reserves.length; i++) {
                msg.reserves.push(detailFormat.reserves[i].general_id);
            }
            for (let i = 0; i < detailFormat.supports.length; i++) {
                msg.supports.push(detailFormat.supports[i].general_id);
            }
            return msg;
        }

        public static getGeneralIndexById(generalId) {
            let index = -1;
            for (let i = 0; i < Game.PlayerHunterSystem.queryAllHunters().length; i++) {
                if (Game.PlayerHunterSystem.queryAllHunters()[i].general_id == generalId) {
                    index = i;
                    break
                }
            }
            if (index == -1) {
                console.log("not find general, id===" + generalId);

            }
            return index
        }

        /**
         * RGB值合成颜色值
         * r:60,g:255,b:0
         */
        public static RGBToHex(color: string) {
            var rgb = color.split(',');
            var r = parseInt(rgb[0].split(':')[1]);
            var g = parseInt(rgb[1].split(':')[1]);
            var b = parseInt(rgb[2].split(':')[1]);

            return Math.floor(((r * 256) + g) * 256 + b);
        }

        /**
         * 16进制颜色值分割成rgb值
         */
        public static HexToRGB(color) {
            let result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor(color / 256) % 256;
            result.r = Math.floor(color / 256) / 256
            return result;
        }

        /** 角度转弧度 */
        private static DegreeToRadian(degrees) {
            return degrees * (Math.PI / 180);
        }
        /** 弧度转角度 */
        private static RadianToDegree(radians) {
            return radians * (180 / Math.PI);
        }

        /**
         * 获取在直线上的点
         * 
         * @param positionCenter 中心点坐标
         * @param gap 两点的间距
         * @param num 数量
         * @param angle 角度
         */
        static GetLinePosition(centerX: number, centerY: number, gap: number, num: number, angle = 0) {
            // console.log("\n---- centerX = ", centerX, "centerY = ", centerY, " gap = ", gap, " num = ", num);
            if (num % 2 == 0) { // 偶数个星星
                centerX += gap / 2 - gap * num / 2;
                centerY += gap * Math.tan(this.DegreeToRadian(angle)) / 2 - gap * num * Math.tan(this.DegreeToRadian(angle)) / 2;
            } else {
                centerX -= (gap * (num - 1)) / 2;
                centerY -= gap * (num - 1) * Math.tan(this.DegreeToRadian(angle) / 2);
            }

            let ret: Array<egret.Point> = [];
            for (let i = 0; i < num; i++) {
                let pos = new egret.Point();
                pos.x = centerX + gap * i;
                pos.y = centerY + gap * i * Math.tan(this.DegreeToRadian(angle));
                ret.push(pos);
            }
            return ret;
        }

        /**
         * 居左对齐星星
         * @param node 星星节点
         * @param star 显示星星个数
         * @param maxStar 最大显示个数
         * @param scale 缩放
         * @param showDark 是否显示暗星
         * @param lightStarPath 亮星路径
         * @param darkStarPath 暗星路径
         */
        static NodeStarByAlignLeft(node: eui.Group, star, maxStar?, scale?, showDark = false, lightStarPath = null, darkStarPath = null) {
            node.removeChildren();

            scale = (scale != null) ? scale : node.scaleX;
            maxStar = (maxStar != null) ? maxStar : CommonConfig.general_max_star;
            star = (maxStar < star) ? maxStar : star;
            let showStarNum = showDark ? maxStar : star;

            lightStarPath = (lightStarPath != null) ? lightStarPath : UIConfig.UIConfig_Role.starOnNew;
            darkStarPath = (darkStarPath != null) ? darkStarPath : UIConfig.UIConfig_Role.heroAwakenStar[0];

            let starArray: Array<eui.Image> = [];

            let gap = node.width / (maxStar - 1);
            let centerPos = new egret.Point(node.width / 2, node.height / 2);
            let posList = this.GetLinePosition(centerPos.x, centerPos.y, gap, maxStar);
            for (let i = 0; i < showStarNum; i++) {
                let img = new eui.Image();
                img.source = cachekey(((i < star) ? lightStarPath : darkStarPath), null);
                img.x = posList[i].x;
                img.y = posList[i].y;
                img.height = node.height;
                img.width = node.height;

                img.scaleX = scale;
                img.scaleY = scale;
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;

                if (i < star) {
                    node.addChild(img);
                    starArray.push(img);
                } else {
                    if (showDark == true) {
                        node.addChild(img);
                        starArray.push(img);
                    }
                }
            }
            return starArray;
        }

        /**
         * 居中对齐星星
         * 
         * @param node 星星节点
         * @param star 显示星星个数
         * @param maxStar 最大显示个数
         * @param scale 缩放
         * @param path 路径
         * @param angle 旋转角度
         */
        static NodeStarByAlignMiddle(node: eui.Group, star: number, maxStar?: number, scale = 1.0, path = UIConfig.UIConfig_Role.starOnNew, angle = 0) {
            if (maxStar == null) {
                maxStar = CommonConfig.general_max_star;
            }

            node.removeChildren();
            let gap = node.width / (maxStar - 1);
            let centerPos = new egret.Point(node.width / 2, node.height / 2);
            let posList = this.GetLinePosition(centerPos.x, centerPos.y, gap, maxStar);

            for (let i = 0; i < star; i++) {
                let img = new eui.Image();
                img.source = path;
                img.rotation = angle;
                img.x = posList[i].x;
                img.y = posList[i].y;
                img.height = node.height;
                img.width = img.height;
                img.scaleX = scale;
                img.scaleY = scale;

                node.addChild(img);
            }
        }

        /**
         * 觉醒后星级颜色(居中)
         * @param node 星星节点
         * @param star 星星显示个数
         * @param level 技能觉醒等级
         */
        static SetHeroAwakeStarMid(node: eui.Group, star: number, level: number) {
            if (node != null) {
                this.NodeStarByAlignMiddle(node, star, null, null, UIConfig.UIConfig_Role.heroAwakenStar[level]);
            }
        }

        /**
         * 觉醒后星级颜色(居左)
         * @param node 星星节点
         * @param star 星星显示个数
         * @param level 技能觉醒等级
         */
        static SetHeroAwakenStar(node: eui.Group, star, level) {
            if (node != null) {
                this.NodeStarByAlignLeft(node, star, CommonConfig.general_max_star, null, false, UIConfig.UIConfig_Role.heroAwakenStar[level + 1]);
            }
        }

        /**
         * 觉醒后星级颜色(显示暗星星)
         * @param node 星星节点
         * @param star 星星节点
         * @param level 技能觉醒等级
         */
        static SetAwakeSpriteStar(node: eui.Group, star, level) {
            if (node != null) {
                this.NodeStarByAlignLeft(node, star, CommonConfig.general_max_star, null, true, UIConfig.UIConfig_Role.heroAwakenStar[level + 1]);
            }
        }


        /** 
         * 设置突破角标 
         * 
         * @param level 突破等级(0-3，0隐藏, 1 - 3 突破阶级).
         * */
        public static GetBreakLevelToPath(sprite: eui.Image, level: number) {
            if (sprite != null) {
                sprite.visible = (level != 0);
                if (level > 0 && level <= 9) {
                    sprite.source = cachekey(UIConfig.UIConfig_Hunter_break.breaklevelIcon[level - 1], null);
                } else {
                    sprite.source = "";
                }

            }
        }

        // 设置星星
        static SetStar(starGroup: eui.Group, starNum: number, starPic: string, scale: number, starInterval: number, cla?: any) {
            starGroup.removeChildren();

            for (let i = 0; i < starNum; i++) {
                let imageStar: eui.Image = new eui.Image();
                if (cla) {
                    imageStar.source = cachekey(starPic, cla);
                }
                else {
                    imageStar.source = starPic;
                }
                imageStar.scaleX = scale;
                imageStar.scaleY = scale;
                imageStar.y = 0;
                imageStar.x = starInterval * i;
                starGroup.addChild(imageStar);
            }
        }

        static StarHunterLevelPath(stars, level, path) {
            for (var v in stars) {
                if (stars.hasOwnProperty(v)) {
                    var k = stars[v];
                    k.source = (yuan3(v <= level, path[0], path[1]));
                }
            }
        }

        public static AttriConvertTbl(attri: message.AttriInfo) {
            // body
            let result = Helper.CreateGeneralAttrTbl0();
            result[TableEnum.EnumGelAttrib.ATTR_HP] = attri.general_hp;
            result[TableEnum.EnumGelAttrib.ATTR_PHY_ATK] = attri.general_atk;
            result[TableEnum.EnumGelAttrib.ATTR_PHY_DEF] = attri.general_def;
            result[TableEnum.EnumGelAttrib.ATTR_HTV] = attri.skill_atk;
            result[TableEnum.EnumGelAttrib.ATTR_EVA] = attri.skill_def;
            result[TableEnum.EnumGelAttrib.ATTR_PHY_CRIT] = attri.atk_crit;
            result[TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT] = attri.skill_crit;
            result[TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA] = attri.crit_extra;
            result[TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS] = attri.crit_resistance;
            result[TableEnum.EnumGelAttrib.ATTR_DODGE_RATE] = attri.dodge_rate;
            result[TableEnum.EnumGelAttrib.ATTR_HIT_RATE] = attri.hit_rate;
            result[TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF] = attri.ignore_phyDef;
            result[TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF] = attri.ignore_magicDef;
            result[TableEnum.EnumGelAttrib.ATTR_FINAL_EXTRA] = attri.final_extra;
            result[TableEnum.EnumGelAttrib.ATTR_FINAL_REDUCE] = attri.final_reduce;
            result[TableEnum.EnumGelAttrib.ATTR_ATK_ALL] = attri.general_atk_all;
            result[TableEnum.EnumGelAttrib.ATTR_DEF_ALL] = attri.general_def_all;
            result[TableEnum.EnumGelAttrib.ATTR_CRIT_ALL] = attri.all_crit;
            result[TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL] = attri.ignore_def_all;
            result[TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS] = attri.universal_resistance;
            result[TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS] = attri.ignore_resistance;
            result[TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS] = attri.float_resistance;
            result[TableEnum.EnumGelAttrib.ATTR_CD_SPEED] = attri.cd_speed;

            return result
        }
        public static tblConvertAttri(result) {
            let attri = new message.AttriInfo;
            attri.general_hp = result[TableEnum.EnumGelAttrib.ATTR_HP]
            attri.general_atk = result[TableEnum.EnumGelAttrib.ATTR_PHY_ATK]
            attri.general_def = result[TableEnum.EnumGelAttrib.ATTR_PHY_DEF]
            attri.skill_atk = result[TableEnum.EnumGelAttrib.ATTR_HTV]
            attri.skill_def = result[TableEnum.EnumGelAttrib.ATTR_EVA]
            attri.atk_crit = result[TableEnum.EnumGelAttrib.ATTR_PHY_CRIT]
            attri.skill_crit = result[TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT]
            attri.crit_extra = result[TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA]
            attri.crit_resistance = result[TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS]
            attri.dodge_rate = result[TableEnum.EnumGelAttrib.ATTR_DODGE_RATE]
            attri.hit_rate = result[TableEnum.EnumGelAttrib.ATTR_HIT_RATE]
            attri.ignore_phyDef = result[TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF]
            attri.ignore_magicDef = result[TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF]
            attri.final_extra = result[TableEnum.EnumGelAttrib.ATTR_FINAL_EXTRA]
            attri.final_reduce = result[TableEnum.EnumGelAttrib.ATTR_FINAL_REDUCE]
            attri.general_atk_all = result[TableEnum.EnumGelAttrib.ATTR_ATK_ALL]
            attri.general_def_all = result[TableEnum.EnumGelAttrib.ATTR_DEF_ALL]
            attri.all_crit = result[TableEnum.EnumGelAttrib.ATTR_CRIT_ALL]
            attri.ignore_def_all = result[TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL]
            attri.universal_resistance = result[TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS]
            attri.ignore_resistance = result[TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS]
            attri.float_resistance = result[TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS]
            attri.cd_speed = result[TableEnum.EnumGelAttrib.ATTR_CD_SPEED]
            return attri
        }

        /**
         * 返回阶级颜色
         */
        public static GetStepColor(step: number) {
            let _COLOR_WHITE = 0
            let _COLOR_GREEN = 2
            let _COLOR_BLUE = 5
            let _COLOR_PURPLE = 8
            let _COLOR_ORANGE = 12
            let _COLOR_RED = 16
            let _COLOR_GOLD = 20
            if (step <= _COLOR_WHITE) {
                return ConstantConfig_Common.Color.white
            } else if (step <= _COLOR_GREEN) {
                return ConstantConfig_Common.Color.quality_green
            } else if (step <= _COLOR_BLUE) {
                return ConstantConfig_Common.Color.quality_blue
            } else if (step <= _COLOR_PURPLE) {
                return ConstantConfig_Common.Color.quality_purple
            } else if (step <= _COLOR_ORANGE) {
                return ConstantConfig_Common.Color.quality_orange
            } else if (step <= _COLOR_RED) {
                return ConstantConfig_Common.Color.quality_red
            } else if (step <= _COLOR_GOLD) {
                return ConstantConfig_Common.Color.quality_gold
            } else {
                return ConstantConfig_Common.Color.quality_gold
            }
        }

        static CreateGeneralAttrTbl(): Array<number> {
            var result = []
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i < TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                result.push(0);
            }
            return result
        }
        static CreateGeneralAttrTbl0(): Array<number> {
            var result = []
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i < TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                result.push(0);
            }
            result.unshift(0);
            return result
        }


        /**
         * 设置图片滤镜颜色
         * @param img 图片
         * @param color null 原色, 'gray' 灰色 ,'black' 黑色,'yellow' 黄色
         */
        static SetImageFilterColor(img: eui.Image, color?: string) {
            if (color == null) {
                var colorMatrix = [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            } else if (color === 'gray') {
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            } else if (color === 'black') {
                var colorMatrix = [
                    0.05, 0.05, 0, 0, 0,
                    0.05, 0.05, 0, 0, 0,
                    0.05, 0.05, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            } else if (color === 'yellow') {
                var colorMatrix = [
                    1, 1, 0, 0, 0,
                    1, 1, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            } else if (color == "cool") {
                var colorMatrix = [
                    0.2, 0.05, 0, 0, 0,
                    0.2, 0.05, 0, 0, 0,
                    0.2, 0.05, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            }
        }

        /** 字符串转换，如"一百零五" */
        static GetNumCH(src: string, bSpecial = false) {

            if (bSpecial && parseInt(src) == 2) {
                return TextsConfig.TextsConfig_Common.two;
            }
            if (parseInt(src) == 0) {
                return TextsConfig.TextsConfig_Common.numZero;
            }

            let numCH = TextsConfig.TextsConfig_Common.numCH;
            let numUnit1 = TextsConfig.TextsConfig_Common.numUnit1;
            let numUnit2 = TextsConfig.TextsConfig_Common.numUnit2;
            let numUnit3 = TextsConfig.TextsConfig_Common.numUnit3;
            let numZero = TextsConfig.TextsConfig_Common.numZero;
            let numOne = TextsConfig.TextsConfig_Common.numOne;
            let numTen = TextsConfig.TextsConfig_Common.numTen;

            let ajustZero = function (str: string) {
                let sub = str.substr(-3);
                if (sub == numZero) {
                    str = str.substr(0, str.length - 3);
                }
                return str;
            }

            let num2Table = function (num: number, denominator = 10) {
                // 默认分母是10
                let tbl = [];
                let len = String(num).length;
                for (let i = 0; i < len; i++) {
                    if (num != 0) {
                        let tmp = num % denominator;
                        tbl.push(tmp);
                        num = Math.floor(num / denominator);
                    } else {
                        break;
                    }
                }
                return tbl;
            }

            let num2Str = function (t: Array<number>): string {
                let str = "";
                for (let i = t.length - 1; i >= 0; i--) {
                    let v = t[i];
                    if (v != 0) {
                        if (t.length == i + 1 && v == 1 && numUnit3[i] == numTen) {
                            str += numUnit3[i];
                        } else {
                            str += (numCH[v - 1] + numUnit3[i]);
                        }
                    } else {
                        if (i != t.length - 1) {
                            // 多个零只要一个零
                            if (i % 4 == 1) {
                                // 万亿兆需特殊处理
                                str = ajustZero(str);
                                str += (numUnit3[i] + numZero);
                            } else {
                                if (t[i + 1] != 0 && t.length > 2) {
                                    str += numZero;
                                }
                            }
                        }
                    }
                }
                return str;
            }

            let num = parseInt(src);
            if (num != null) {
                if (num < 0) {
                    num = -num;
                }
                let ret = "";
                let tbl = num2Table(num);
                ret = num2Str(tbl);
                return ret;
            }
            return "";
        }

        /**
         * 根据品质和字符串，返回相应颜色的富文本
         */
        public static GetLevelColorStr(name: string, quality: number) {
            let richStr = "<font color=%s><text>%s</text></font>";
            return Helper.StringFormat(richStr,
                ConstantConfig_Common.Color.quality_level_color[quality - 1],
                name);
        }

        /**
         * 查询错误码对应的错误描述
         * @param code 错误码
         * 
         * @description from db_other.lua
         */
        public static GetErrorString(code: number): string {
            let itemInfo = TableClientError.Item(code);
            if (code == null) {
                return "error";
            } else if (itemInfo == null) {
                return Helper.StringFormat("%s[%d]", TextsConfig.TextsConfig_Common.unknownError, code);
            } else if (itemInfo.des_custom != "") {
                return Helper.StringFormat("%s[%d]", itemInfo.des_custom, code);
            } else {
                return Helper.StringFormat("%s[%d]", itemInfo.des_default, code);
            }
        }

        public static getObjLen(obj) {
            let len = 0;
            if (obj == null) { return len; }
            for (let k in obj) {
                len++;
            }
            return len;
        }

        //商铺折扣
        public static MallDiscount(per) {
            let discount = per * 100
            let discount_str = ""
            let discount_tbl = []
            if (discount % 10 == 0) {
                discount = discount / 10
            }
            else if (discount % 100 == 0) {
                discount = discount / 100
            }
            let insert = function () {
                if (discount == 0) {
                    return
                }
                else {
                    discount_tbl.unshift(Helper.GetNumCH((discount % 10).toString()))
                    discount = (discount - discount % 10) / 10;
                    insert()
                }
            }
            insert()
            for (let k in discount_tbl) {
                let v = discount_tbl[k];
                discount_str = discount_str + v;

            }

            return discount_str

        }

        //转化为 时：分：秒
        public static GetTimeStr(secTotal: number, noHour: boolean): string {
            let s = secTotal % 60;
            let ss;
            if (s < 10) {
                ss = "0" + s;
            } else {
                ss = s;
            }
            let mm;
            let m = Math.floor(secTotal % 3600 / 60);
            if (m < 10) {
                mm = "0" + m;
            } else {
                mm = m;
            }
            let hh;
            let h = Math.floor(secTotal % (3600 * 24) / 3600);
            if (h >= 1 && h <= 9) {
                hh = "0" + h;
            }
            else if (h > 9) {
                hh = h;
            }
            else {
                // hh = "0" + "0";
                hh = "";
            }
            if (noHour) {
                return Helper.StringFormat("%2d:%2d", m, s);
            } else {
                if (hh) {
                    return Helper.StringFormat("%2d:%2d:%2d", hh, mm, ss);
                }
                return Helper.StringFormat("%2d:%2d", mm, ss);
            }
        }
        public static GetTimeStr1(secTotal): string {
            let s = Math.floor(secTotal % 60);
            let ss;
            if (s < 10) {
                ss = "0" + s;
            } else {
                ss = s;
            }
            let mm;
            let m = Math.floor(secTotal % 3600 / 60);
            if (m < 10) {
                mm = "0" + m;
            } else {
                mm = m;
            }
            let hh;
            let h = Math.floor(secTotal % (3600 * 24) / 3600);
            if (h > 1 && h <= 9) {
                hh = "0" + h;
            }
            else if (h > 9) {
                hh = h;
            }
            else {
                hh = "0" + "0";
            }
            return mm + ":" + ss;
        }

        public static FormatMsTime(ms: number): string {
            let a = Math.floor(ms / 3600);
            let tmp = Math.floor(ms % 3600);
            let b = Math.floor(tmp / 60);
            let c = Math.floor((tmp % 60));

            let hour = a;
            let min = b;
            let s = c;

            if (a != 0 && b != 0 && c == 0)
                return hour + TextsConfig.TextsConfig_Time.hours + min + TextsConfig.TextsConfig_Time.min;
            else if (a != 0 && b == 0 && c == 0)
                return hour + TextsConfig.TextsConfig_Time.hours;
            else if (a == 0 && b == 0 && c != 0)
                return ms + TextsConfig.TextsConfig_Time.sec;
            else if (a == 0 && b != 0 && c != 0)
                return min + TextsConfig.TextsConfig_Time.min + ms + TextsConfig.TextsConfig_Time.sec;
            else if (a == 0 && b != 0 && c == 0)
                return min + TextsConfig.TextsConfig_Time.min;

            return hour + TextsConfig.TextsConfig_Time.hours + min + TextsConfig.TextsConfig_Time.min + ms + TextsConfig.TextsConfig_Time.sec;
        }


        public static SetButtonLabel(btn: eui.Button, text: string, size = 16, center = true) {
            let label = btn.labelDisplay as eui.Label;
            label.width = size * 5;
            label.height = size * 2;
            label.size = size;
            label.fontFamily = "Arial";
            label.text = text;

            if (center) {
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
            }
            label.textColor = this.RGBToHex("r:0,g:0,b:0");
        }

        private static rnd(seed: number): number {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / (233280.0);
        };

        public static Rand(number): number {
            let today = new Date();
            let seed = today.getTime();
            return Math.ceil(Helper.rnd(seed) * number);
        };

        public static GetRandItem(tbl: Object): Object {
            let total = [];
            let length = Object.keys(tbl).length;
            for (let i = 0; i < length; i++) {
                total.push(tbl[i]);
            }

            let randNum = Helper.Rand(length);
            let rowNum = (randNum % length) + 1;

            return total[rowNum];
        }

        /**
         * 设置升星成功星星。
         * 
         * @param node 星星容器
         * @param star 星星个数
         * @param level 被动觉醒技能
         */
        public static setUpstarImage(node: eui.Group, star: number, level: number): eui.Group {
            node.removeChildren();

            let isSmallStar = (i: number) => {
                let index = 2; // 2:小星星 1:大星星
                if (star == 3) {
                    index = (i == 1) ? 1 : 2;
                } else if (star == 4) {
                    index = (i == 1 || i == 2) ? 1 : 2;
                } else if (star == 5) {
                    index = (i == 2) ? 1 : 2;
                } else if (star == 6) {
                    index = (i == 2 || i == 3) ? 1 : 2;
                }
                return (index == 2);
            }

            let offSetY = (i: number) => {
                let offSet = 0;
                if (star == 3) {
                    offSet = (i == 1) ? -15 : 0;
                } else if (star == 4) {
                    offSet = (i == 1 || i == 2) ? -15 : 0;
                } else if (star == 5) {
                    if (i == 2) {
                        offSet = - 15;
                    } else if (i == 1 || i == 3) {
                        offSet = -5;
                    }
                } else if (star == 6) {
                    if (i == 2 || i == 3) {
                        offSet = -15;
                    } else if (i == 1 || i == 4) {
                        offSet = -5;
                    }
                }
                return offSet;
            }

            let scaleX = 0.6; // 缩放比例
            let list = [];
            let sumWidth = 0;
            for (let i = 0; i < star; i++) {
                let w = (isSmallStar(i)) ? 60 * scaleX : 70 * scaleX;
                list.push(w);
                sumWidth += w;
            }
            let gap = -6; // 星星间隔
            let beginX = (node.width - sumWidth) * 0.5;
            for (let i = 0; i < star; i++) {
                let index = isSmallStar(i) ? 2 : 1; // 2:小星星 1:大星星
                let w = (index == 2) ? 60 * scaleX : 70 * scaleX;
                let source = "ui_hunter_UpStar" + level.toString() + "_" + index.toString() + "_png";
                let image = new eui.Image(source);
                // image.anchorOffsetX = w * 0.5;
                image.anchorOffsetY = w * 0.5;
                image.scaleX = scaleX;
                image.scaleY = scaleX;
                image.y = offSetY(i);
                image.x = beginX;
                node.addChild(image);

                beginX += (list[i] + gap);
            }

            return node;
        }

        public static convertStringWithColor(msg: string, color?: string): string {
            if (color == "green") {
                return "<color>r:0,g:220,b:0</color><text>" + msg + "</text>";
            }
            return msg;
        }
        public static CreateTalentAttrTbl() {
            let result = {};
            for (let k in TableEnum.TableRoleBaseAttribute) {
                let v = TableEnum.TableRoleBaseAttribute[k];
                result[v] = 0;
            }
            return result;
        }
        public static getTwoPointsDis(pos1, pos2) {
            let px1 = pos1.x
            let py1 = pos1.y
            let px2 = pos2.x
            let py2 = pos2.y

            let x = px2 - px1;
            let y = py1 - py2;
            let dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            return dis;
        }
        public static tAnyIn(tbl, valTbl) {
            for (let k in valTbl) {
                let v = valTbl[k];
                if (Helper.vIn(tbl, v)) {
                    return true;
                }
            }
            return false;
        }
        public static vIn(tbl, value) {
            if (tbl == null) {
                return false;
            }
            for (let k in tbl) {
                let v = tbl[k];
                if (v == value) {
                    return true;
                }
            }
            return false;
        }

        public static getSkillBaseTypeById(id) {
            let tableSkillBase = TableGeneralSkill.Table();
            if (tableSkillBase[id] == null) {
            }
            let eType = tableSkillBase[id].skill_big_type;
            return eType;
        }

        /**根据排名获取竞技场奖励信息 */
        public static GetArenaScoreInfo(rank: number): [TableLadderScore, number] {
            let tableArenaScore = TableLadderScore.Table();
            for (let k in tableArenaScore) {
                if (tableArenaScore.hasOwnProperty(k)) {
                    let v = tableArenaScore[k];
                    if (rank > v.rank_min && rank <= v.rank_max) {
                        return [v, Number(k)];
                    }
                }
            }
            return [null, -1];
        }

        public static getBuffRelate(level, id) {
            let tableBuff = TableSkillBuff.Table();
            if (tableBuff[id] == null) {
                return null;
            }
            let param = tableBuff[id].hit_rate;
            let baseType = tableBuff[id].base_type;
            let damageType = tableBuff[id].damage_type;
            let hitRate = buff_hit(level, param[0], param[1]);
            return [hitRate, baseType, damageType];
        }
        public static getBuffUseType(type) {
            let tableBaseBuff = TableClientBuffBase.Table();
            if (tableBaseBuff[type] == null) {
                return null;
            }
            return [tableBaseBuff[type].buff_profit, tableBaseBuff[type].is_fold, tableBaseBuff[type].fold_number];
        }


        public static getComboLv(curLv, num) {
            let _tag = false;
            let tableCombo = TableClientFightCombo.Table();
            for (let i = curLv + 1; i < Helper.getObjLen(tableCombo); i++) {
                if (num >= tableCombo[i].combo_condition) {
                    _tag = true;
                    return [_tag, i];
                }
            }
            return [_tag, -1];
        }
        public static instanceToBriefInfo(fightType, instanceId, bossInfo) {
            let brief = new message.RoleBriefInfo;
            let name = "";
            let chapterId = 0;
            let chapterName = "";
            let bossMapRoleID = 1;
            let bossLevel = 1;
            let id = instanceId;
            if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                let tableInstance = TableInstance.Table();
                name = tableInstance[instanceId].instance_name;
                let mobId = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
                let [dstChapterIdx, dstMobIdx] = Game.PlayerInstanceSystem.ChapterIdx(mobId);
                chapterName = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.instance_normal, dstChapterIdx, Number(dstMobIdx) + 1);
            } else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                let tableInstance = TableInstance.Table();
                name = tableInstance[instanceId].instance_name;
                let mobId = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
                let [dstChapterIdx, dstMobIdx] = Game.PlayerInstanceSystem.ChapterIdx(mobId);
                chapterName = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.instance_elite, dstChapterIdx, dstMobIdx);
            } else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                bossMapRoleID = bossInfo.monster_roleId
                bossLevel = bossInfo.monster_level
                let temp = instanceId;
                name = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.tower_content, temp)
                chapterName = TextsConfig.TextsConfig_Replay.Title.tower_title;
            } else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                bossMapRoleID = bossInfo.monster_roleId
                bossLevel = bossInfo.monster_level
                let temp = instanceId
                name = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.tower_content, temp % 1000)
                chapterName = TextsConfig.TextsConfig_Replay.Title.tower_title;
            } else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId
                bossLevel = bossInfo.monster_level;
                let _tmp = Game.PlayerLeagueSystem.Instances[Game.PlayerLeagueSystem.leagueInstance.curInstanceId - 1].instance_id;
                let _tmp_c = TableLeagueInstance.Item(_tmp).instance_name;
                chapterName = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.league_instance, _tmp_c)
            } else if (fightType == message.EFormationType.FORMATION_TYPE_WANTED || fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_GAOJI_WANTED) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                //流星街%s第%s关
                let _index = Game.PlayerMissionSystem.fightExt;
                let _cell = Game.PlayerWantedSystem.wantedCurPos % 100;
                chapterName = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.tower_content, TextsConfig.TextsConfig_Comment.wanted_type[_index + 1] + "·" + _cell);
            } else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
            } else if (fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                name = Lang.Des(bossInfo.monster_name)
                bossMapRoleID = bossInfo.monster_roleId
                bossLevel = bossInfo.monster_level
            } else if (fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                name = Lang.Des(bossInfo.monster_name)
                bossMapRoleID = bossInfo.monster_roleId
                bossLevel = bossInfo.monster_level
            } else if (fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                bossMapRoleID = bossInfo.monster_roleId
                bossLevel = bossInfo.monster_level
                let temp = instanceId;
                name = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Replay.Title.license_content, temp);
                chapterName = TextsConfig.TextsConfig_Replay.Title.license_title;
            }

            brief.id = id
            brief.name = name || " ";
            brief.level = bossLevel || 1;
            brief.picId = bossMapRoleID || 1;
            brief.picFrameId = 0;
            brief.leagueId = chapterId || 0;
            brief.leagueName = chapterName || " ";
            return brief;
        }
        //异步技能数据加载
        public static cacheSkillSpineId(type, enemys) {
            Gmgr.Instance.relatedAsynDataId = [];
            let forArr = Game.PlayerFormationSystem.curFormations;
            let formation = {};
            if (type == message.EFormationType.FORMATION_TYPE_WANTED) {
                formation = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt];
            } else if (type == message.EFormationType.FORMATION_TYPE_RELIC) {
                formation = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt];
            } else {
                formation = forArr[type - 1];
            }
            let suffixs = ["generals", "reserves", "supports"];
            for (let i = 0; i < suffixs.length; i++) {
                let ids = formation[suffixs[i]];
                for (let j = 0; j < ids.length; j++) {
                    if (ids[j] > 0) {
                        let gelInfo = Game.PlayerHunterSystem.allHuntersMap()[ids[j]];
                        if (gelInfo != null) {
                            for (let x = 0; x < gelInfo.skills.length; x++) {
                                Gmgr.Instance.relatedAsynDataId.push(gelInfo.skills[x].skillId);
                            }
                        }
                    }
                }
            }
            for (let k in enemys) {
                let v = enemys[k];
                let info = Game.PlayerMobSystem.Instance(v.id);
                Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
            }
        }

        public static getSpeedMaxIndex(level) {
            let index = 0;
            for (let i = 0; i < ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT.length; i++) {
                if (level >= ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT[i] || PlayerVIPSystem.LowLevel().level >= ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT_VIP[i]) {
                    index = i;
                }
            }
            return index + 1;
        }
        //判断屏幕坐标(GL坐标系，左下角为(0, 0))(x, y)是否在节点的rect中
        public static bInNodeRect(node: eui.Group, x, y) {
            let sizeNode = node;
            let trans = node.globalToLocal(x, y);
            // trans.x += Game.UIManager.x;
            if (trans.x >= 0 && trans.x <= sizeNode.width && trans.y >= 0 && trans.y <= sizeNode.height) {
                return true;
            } else {
                return false;
            }
        }
        //返回node绝对坐标
        public static GetWolrdPoint(node: eui.Image, _point: egret.Point) {
            let point = node.localToGlobal(0, 0, _point);
            point.x -= Game.UIManager.x;
            return point;
            // return new egret.Point(point.x + width / 2, point.y + height / 2);
        }
        //获得首杀物品
        public static getFirstBloodGoods(goods, fightType) {
            2
            let tbl = [];
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].goodsId == message.EResourceType.RESOURCE_ROLE_EXP && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].goodsId == message.EResourceType.RESOURCE_MONEY && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].index != 2) {
                    continue;
                }
                tbl.push(goods[i]);
            }
            return tbl;
        }
        //隐藏掉铜钱为0的
        public static hideSpecialGoods(goods) {
            let tbl = [];
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].goodsId == message.EResourceType.RESOURCE_ROLE_EXP && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].goodsId == message.EResourceType.RESOURCE_MONEY && goods[i].count == 0) {
                    continue;
                }
                tbl.push(goods[i]);
            }
            return tbl;
        }
        //获得翻牌子物品
        public static getTurnGoods(goods, fightType) {
            let tbl = [];
            let extraTbl = [];
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].goodsId == message.EResourceType.RESOURCE_ROLE_EXP && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].goodsId == message.EResourceType.RESOURCE_MONEY && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].index == 1 && Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                    tbl.push(goods[i]);
                }
                if (goods[i].index == 3 && Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                    extraTbl.push(goods[i]);
                }
            }
            return [tbl, extraTbl];
        }
        public static getBattleStar(after, before) {
            let num = after;
            if (num == before) {
                num = message.EBattleStar.BATTLE_STAR_3;
            }
            if (num >= message.EBattleStar.BATTLE_STAR_3) {
                num = message.EBattleStar.BATTLE_STAR_3;
            }
            if (num <= message.EBattleStar.BATTLE_STAR_NONO) {
                num = message.EBattleStar.BATTLE_STAR_1;
            }
            return num;
        }
        // 战斗数据(类型为16\22\23数据格式为MultiResultInfo否则为ReplayBattleInfo)
        public static createBattleResultInfo(battleType, battleResult, battleStar, battleTime, totalDamage, maxCombo, msg) {
            for (let i = 0; i < msg.leftReplayInfo.generals.length; i++) {
                msg.leftReplayInfo.generals[i].pos = msg.leftReplayInfo.generals[i].pos + 1;
            }
            for (let i = 0; i < msg.rightReplayInfo.generals.length; i++) {
                msg.rightReplayInfo.generals[i].pos = parseInt(msg.rightReplayInfo.generals[i].pos) + 1;
            }
            let encoder2 = new aone.BinaryEncoder();//序列化数据
            msg.to_bytes(encoder2);

            let inflate = new Zlib.Deflate(new Uint8Array(encoder2.buffer, 0, encoder2.length));
            let plain: any = inflate.compress();
            // rightReplayInfo
            let plainArr = [];
            let length = encoder2.length;
            plainArr.push(length & 0xff);
            plainArr.push((length >> 8) & 0xff);
            plainArr.push((length >> 16) & 0xff);
            plainArr.push((length >> 24) & 0xff);
            for (let i = 0; i < plain.length; i++) {
                plainArr.push(plain[i]);
            }

            let info = new message.BattleResultInfo;
            info.is_check = Device.isBattleValidate;
            info.battleId = "0";
            info.battleType = battleType;
            info.battleResult = battleResult;
            info.battleStar = battleStar;
            info.battleTime = battleTime / 2;
            info.totalDamage = totalDamage;
            info.maxCombo = maxCombo;
            info.battleData = plainArr;


            return info;
        }
        public static createPvpBattleResultInfo(msg) {
            let encoder2 = new aone.BinaryEncoder();//序列化数据
            msg.to_bytes(encoder2);

            let inflate = new Zlib.Deflate(new Uint8Array(encoder2.buffer, 0, encoder2.length));
            let plain: any = inflate.compress();

            let plainArr = [];
            let length = encoder2.length;
            plainArr.push(length & 0xff);
            plainArr.push((length >> 8) & 0xff);
            plainArr.push((length >> 16) & 0xff);
            plainArr.push((length >> 24) & 0xff);
            for (let i = 0; i < plain.length; i++) {
                plainArr.push(plain[i]);
            }
            return plainArr;
        }
        public static createMutiBattleResultInfo(battleType, battleResult, battleStar, battleTime, totalDamage, maxCombo, msg) {
            let info = new message.BattleResultInfo();
            let encoder2 = new aone.BinaryEncoder();//序列化数据
            msg.to_bytes(encoder2);
            let inflate = new Zlib.Deflate(new Uint8Array(encoder2.buffer, 0, encoder2.length));
            let plain: any = inflate.compress();

            let plainArr = [];
            let length = encoder2.length;
            plainArr.push(length & 0xff);
            plainArr.push((length >> 8) & 0xff);
            plainArr.push((length >> 16) & 0xff);
            plainArr.push((length >> 24) & 0xff);
            for (let i = 0; i < plain.length; i++) {
                plainArr.push(plain[i]);
            }

            info.is_check = Device.isBattleValidate
            info.battleId = "0";
            info.battleType = battleType
            info.battleResult = battleResult
            info.battleStar = battleStar;
            if (ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
                info.battleTime = battleTime / 2;
            } else {
                info.battleTime = battleTime;
            }

            info.totalDamage = totalDamage
            info.maxCombo = maxCombo;

            info.battleData = plainArr;
            return info;
        }

        public static getGenerlBeforeTotalExp(level, step) {
            let tableLevel = TableLevel.Table();
            let total = 0;
            for (let i = 0; i < level - 1; i++) {
                total = total + tableLevel[i + 1].general_exp[step - 1];
            }
            return total;
        }
        public static getInstanceDetailName(fightType, rightBrief) {
            let str = "";
            if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_normal_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                let a = rightBrief.leagueName.slice(rightBrief.leagueName, Object.keys(rightBrief.leagueName).length - 1) + (Number(rightBrief.leagueName[Object.keys(rightBrief.leagueName).length - 1]) + 1);
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_elite_title, a);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_tower_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_hightower_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_wanted_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_leagueMon_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_leagueBoss_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pvp_arena_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pvp_license_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Replay.Title.pve_zorkboss_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                str = rightBrief;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY) {
                str = TableActivityBattleInstance.Item(PlayerActivitySystem.activityBattleCurPos).name;
            }
            return str;
        }
        public static integrateAttri(tbl) {
            let result = Helper.CreateGeneralAttrTbl0();
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i < TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (i != TableEnum.EnumGelAttrib.ATTR_ATK_ALL && i != TableEnum.EnumGelAttrib.ATTR_DEF_ALL && i != TableEnum.EnumGelAttrib.ATTR_CRIT_ALL && i != TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL) {
                    let tmp = [i];
                    if (i == TableEnum.EnumGelAttrib.ATTR_PHY_ATK) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_ATK_ALL);
                    } else if (i == TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_DEF_ALL);
                    } else if (i == TableEnum.EnumGelAttrib.ATTR_PHY_CRIT || i == TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_CRIT_ALL);
                    } else if (i == TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF || i == TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL);
                    }
                    for (let j = 0; j < tmp.length; j++) {
                        result[i] = result[i] + tbl[tmp[j + 1]];
                    }
                }
            }
            return result;
        }
        public static integrateAttri0(tbl) {
            tbl.unshift(0);
            let result = Helper.CreateGeneralAttrTbl0();
            for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i < TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                if (i != TableEnum.EnumGelAttrib.ATTR_ATK_ALL && i != TableEnum.EnumGelAttrib.ATTR_DEF_ALL && i != TableEnum.EnumGelAttrib.ATTR_CRIT_ALL && i != TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL) {
                    let tmp = [i];
                    if (i == TableEnum.EnumGelAttrib.ATTR_PHY_ATK) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_ATK_ALL);
                    } else if (i == TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_DEF_ALL);
                    } else if (i == TableEnum.EnumGelAttrib.ATTR_PHY_CRIT || i == TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_CRIT_ALL);
                    } else if (i == TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF || i == TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF) {
                        tmp.push(TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL);
                    }
                    for (let j = 0; j < tmp.length; j++) {
                        result[i] = result[i] + tbl[tmp[j]];
                    }
                }
            }
            return result;
        }
        //根据物品id获得物品数量
        public static getGoodsCountFrTbl(tbl, id) {
            let count = 0;
            for (let i = 0; i < tbl.length; i++) {
                if (tbl[i].goodsId == id) {
                    count = tbl[i].count;
                }
            }
            return count;
        }
        public static LocalGeneralIdTranToGelSimpleInfo(id) {
            let generalInfo = Game.PlayerHunterSystem.allHuntersMap()[id];
            let msg = new message.GeneralSimpleInfo();
            if (generalInfo == null) {
                return msg;
            }
            msg.general_id = generalInfo.general_id;
            msg.level = generalInfo.level;
            msg.star = generalInfo.star;
            msg.step = generalInfo.step;
            msg.fashionId = generalInfo.fashionId;
            msg.battleValue = generalInfo.battleValue;
            return msg;
        }
        public static DetailGeneralTranToGelSimpleInfo(generalInfo) {
            let msg = new message.GeneralSimpleInfo();
            if (generalInfo == null) {
                return msg;
            }
            msg.general_id = generalInfo.general_id;
            msg.level = generalInfo.level;
            msg.star = generalInfo.star;
            msg.step = generalInfo.step;
            msg.fashionId = generalInfo.fashionId;
            msg.battleValue = generalInfo.battleValue;
            return msg;
        }

        public static CacheTeachSkillSpineId() {
            Gmgr.Instance.relatedAsynDataId = [];
            for (let k in teachBattle.teachLeftGeneral) {
                let v = teachBattle.teachLeftGeneral[k];
                let instance = TableClientMonsterLocal.Item(v.id);
                for (let i = 0; i < instance.skill_ids.length; i++) {
                    Gmgr.Instance.relatedAsynDataId.push(instance.skill_ids[i]);
                }
            }

            for (let k in teachBattle.teachLeftSupport) {
                let v = teachBattle.teachLeftSupport[k];
                let instance = TableClientMonsterLocal.Item(v.id);
                for (let i = 0; i < instance.skill_ids.length; i++) {
                    Gmgr.Instance.relatedAsynDataId.push(instance.skill_ids[i]);
                }
            }

            for (let k in teachBattle.teachRightGeneral) {
                let v = teachBattle.teachRightGeneral[k];
                let instance = TableClientMonsterLocal.Item(v.id);
                for (let i = 0; i < instance.skill_ids.length; i++) {
                    Gmgr.Instance.relatedAsynDataId.push(instance.skill_ids[i]);
                }
            }
        }
        public static sortBattleInfoByDamage(Left, right) {
            let sortByDamage = (a, b) => {
                return a.totalDamage + a.recoverValue > b.totalDamage + b.recoverValue;
            }
            Left.sort(sortByDamage);
            right.sort(sortByDamage);
        }

        public static GetMvp(t) {
            let totalValue = 0;
            let index = 0;
            let maxValue = 0;
            for (let i = 0; i < Game.PlayerMissionSystem.tableLength(t); i++) {
                let hurt = t[i].totalDamage;
                let recover = t[i].recoverValue;
                let max = Math.max(hurt, recover);
                if (hurt + recover > totalValue) {
                    totalValue = hurt + recover;
                    index = i;
                }
                if (max > maxValue) {
                    maxValue = max
                }
            }
            //最大干将索引，速度判断最大值
            return [index, maxValue];
        }

        public static GetTMStrForActivity(secTotal?: number) {
            let time: Date;
            if (secTotal == null || secTotal == undefined) {
                time = Game.Controller.serverNow();
            } else {
                time = new Date(secTotal * 1000);
            }

            return Helper.StringFormat("%d-%s-%s %s:%s",
                time.getFullYear(),
                time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1).toString() : (time.getMonth() + 1).toString(),
                time.getDate() < 10 ? "0" + time.getDate().toString() : time.getDate().toString(),
                time.getHours() < 10 ? "0" + time.getHours().toString() : time.getHours().toString(),
                time.getMinutes() < 10 ? "0" + time.getMinutes().toString() : time.getMinutes().toString()
            );
        }
        /**特效音乐id */
        public static EftByID(id) {
            let sound = TableClientSoundResource.Item(id);
            if (sound) {
                let arr = sound.sound_path.split("/");
                Game.SoundManager.playEffect(arr[arr.length - 1].replace(".", "_"));
            }
        }
        /**背景音乐id */
        public static PlaybgmByID(id, loops?: number) {
            let sound = TableClientBgmResource.Item(id);
            let arr = sound.sound_path.split("/");
            Game.SoundManager.playMusic(arr[arr.length - 1].replace(".", "_"), loops);
        }
        /**特效音乐路径名字 */
        public static PlayEff(name, maxWaitMs?: number) {
            let arr = name.split("/");
            Game.SoundManager.playEffect(arr[arr.length - 1].replace(".", "_"), maxWaitMs);
        }

        //中文时间
        public static FormatDaysTimeChs(ms: number) {
            let a = Math.floor(ms / 3600)
            let tmp = Math.floor(ms % 3600)
            let b = Math.floor(tmp / 60)
            let c = Math.floor(tmp % 60)

            let hour: number = a;
            let min: number = b;
            let sec: number = c;

            if (b != 0 && c == 0) {
                return hour + TextsConfig.TextsConfig_Time.hours + min + TextsConfig.TextsConfig_Time.min;
            } else if (b == 0 && c == 0) {
                return hour + TextsConfig.TextsConfig_Time.hours;
            }
            return hour + TextsConfig.TextsConfig_Time.hours + min + TextsConfig.TextsConfig_Time.min + sec + TextsConfig.TextsConfig_Time.sec;
        }
        public static FormatDaysTimeCh(ms: number) {
            let a: number = Math.floor(ms / 24 / 3600);
            let tmp: number = Math.floor(ms % (3600 * 24));
            let b: number = Math.floor(tmp / 3600);
            let c: number = Math.floor((tmp % 3600) / 60);

            let day: number = a;
            let hour: number = b;
            let min: number = c;

            if (a == 0 && b != 0 && c != 0) {
                return hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
            } else if (a == 0 && b == 0) {
                return min + TextsConfig.TextsConfig_Time.min;
            } else if (a != 0 && b == 0 && c == 0) {
                return day + TextsConfig.TextsConfig_Time.day
            } else if (a == 0 && b != 0 && c == 0) {
                return hour + TextsConfig.TextsConfig_Time.hour;
            }

            return day + TextsConfig.TextsConfig_Time.day + hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
        }

        public static MissionProgress(tableCur, type) {
            let ret = 0;
            for (let i in tableCur) {
                if (tableCur.hasOwnProperty(i)) {
                    let v = tableCur[i];
                    if (Math.floor(v / 10000) == type) {
                        ret = v % 10000
                    }
                }
            }
            return ret;
        }
        public static isPointInCircle(point, center, r) {
            let tag = false
            let px1 = point.x
            let py1 = point.y
            let px2 = center.x
            let py2 = center.y

            let x = px1 - px2
            let y = py1 - py2;
            let xie = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            if (xie <= r) {
                tag = true;
            }
            return tag;
        }
        public static findNearCrossBlock(beginPoint, endPoint, blocks, blockWidth) {
            let [b_i, b_j] = [0, 0];
            let b_actorWNum = beginPoint.x / blockWidth;
            let b_actorHNum = beginPoint.y / blockWidth;
            let wNum = Math.floor(b_actorWNum);
            let hNum = Math.floor(b_actorHNum);
            if (b_actorWNum == wNum) {
                b_i = wNum;
            } else {
                b_i = wNum;
            }
            if (b_actorHNum == hNum) {
                b_j = hNum;
            } else {
                b_j = hNum;
            }
            let [e_i, e_j] = [0, 0]
            let e_actorWNum = endPoint.x / blockWidth;
            let e_actorHNum = endPoint.y / blockWidth;
            wNum = Math.floor(e_actorWNum);
            hNum = Math.floor(e_actorHNum);
            if (e_actorWNum == wNum) {
                e_i = wNum;
            } else {
                e_i = wNum;
            }
            if (e_actorHNum == hNum) {
                e_j = hNum;
            } else {
                e_j = hNum;
            }
            let tmp = [];

            for (let i = e_i - 1; i <= e_i + 1; i++) {
                for (let j = e_j - 1; j <= e_j + 1; j++) {
                    let key = Helper.StringFormat("%d_%d", i, j);
                    if (blocks[key] == null) {
                        continue;
                    }
                    if (blocks[key].couldCross == false) {
                        continue;
                    }
                    let info = { key: key, value: Math.abs(i - b_i) + Math.abs(j - b_j) };
                    tmp.push(info);
                }
            }
            if (tmp.length != 0) {
                tmp.sort((a, b) => {
                    return a.value - b.value;
                });
                return tmp[0].key;
            } else {
                let [new_i, new_j] = [0, 0];
                if (Math.abs(e_i - b_i) < 2) {
                    new_i = e_i;
                } else if (e_i > b_i) {
                    new_i = e_i - 1;
                } else if (e_i < b_i) {
                    new_i = e_i + 1;
                }
                if (Math.abs(e_j - b_j) < 2) {
                    new_j = e_j;
                } else if (e_j > b_j) {
                    new_j = e_j - 1;
                } else if (e_j < b_j) {
                    new_j = e_j + 1;
                }
                let newPoint = new egret.Point(new_i * blockWidth, new_j * blockWidth);
                return Helper.findNearCrossBlock(beginPoint, newPoint, blocks, blockWidth);
            }
        }

        public static activityTime(open: number, close: number) {
            let curTime = Game.Controller.serverNow();
            let curServerTime = Date.parse(curTime.toString()) / 1000;
            let start = open - curServerTime;
            let stop = close - curServerTime;
            let [str, color] = [null, null];

            if (start > 0) {
                color = ConstantConfig_Common.Color.red;
            } else {
                color = ConstantConfig_Common.Color.green;
            }

            if (3600 * 24 < start) {  // X天开启
                str = Helper.StringFormat(TextsConfig.TextsConfig_Time.openDay, Math.floor(start / 3600 / 24));
            } else if (3600 < start && start <= 3600 * 24) {  // X小时开启
                str = Helper.StringFormat(TextsConfig.TextsConfig_Time.openHour, Math.floor(start / 3600));
            } else if (60 < start && start <= 3600) {          //x分钟开启
                str = Helper.StringFormat(TextsConfig.TextsConfig_Time.openMin, Math.floor(start / 60));
            } else if (0 < start && start <= 60) {              //-马上开启
                str = TextsConfig.TextsConfig_Time.openNow;
            } else if (3600 * 24 < stop) {                      //-x天关闭
                str = Helper.StringFormat(TextsConfig.TextsConfig_Time.closeDay, Math.floor(stop / 3600 / 24));
            } else if (3600 < stop && stop <= 3600 * 24) {      //x小时关闭
                str = Helper.StringFormat(TextsConfig.TextsConfig_Time.closeHour, Math.floor(stop / 3600));
            } else if (0 < stop && stop <= 3600) {              //x分钟关闭
                str = Helper.StringFormat(TextsConfig.TextsConfig_Time.closeMin, Math.floor(stop / 60));
            } else if (0 < stop && stop <= 60) {                //-马上关闭
                str = TextsConfig.TextsConfig_Time.closeNow;
            } else if (start < 0 && stop <= 0) {                //-已经关闭
                str = TextsConfig.TextsConfig_Time.closed;
            }
            return [str, color];
        }

        public static getWantedBattleStar(after: number, before: number): number {
            let dif = before - after;
            let num = message.EBattleStar.BATTLE_STAR_1;
            if (dif == 0) {
                num = message.EBattleStar.BATTLE_STAR_3;
            }
            else if (dif == 1) {
                num = message.EBattleStar.BATTLE_STAR_2;
            }
            else if (dif >= 2) {
                num = message.EBattleStar.BATTLE_STAR_1;
            }
            return num;
        }

        /**获取建号第几天 四点刷新 四点之前算前一天*/
        public static day() {
            return Helper.getDayIdx(Game.PlayerInfoSystem.BaseInfo.createTime * 1000, Game.Controller.curServerTime * 1000);
        }

        /**
         * 获取注册账号时间到服务器当前时间的天数(凌晨4点刷新)
         * @param timeCreate {number} 注册账号时间
         * @param timeCurr {number} 服务器当前时间
         * @returns 返回当前时间与创建时间天数的差值{number}
         */
        public static getDayIdx(timeCreate: number, timeCurr: number): number {
            let day1 = 86400000;// 1天时间的毫秒数
            let date = new Date(timeCreate - day1);// 创建时间前24小时的时间戳
            // 设置时间为凌晨4点
            date.setHours(4);
            date.setMinutes(0);
            date.setSeconds(0);
            // 获取凌晨4点的毫秒值
            let time = date.getTime();
            // 创建时间离凌晨4点的天数
            let createIdx = Math.floor((timeCreate - time) / day1);
            // 当前时间离凌晨4点的天数
            let currIdx = Math.floor((timeCurr - time) / day1);
            // 返回当前时间与创建时间天数的差值
            return currIdx - createIdx + 1;
        }
    }


    export class Table {

        public static Count(t, f: Function) {
            let count = 0;
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    let v = t[k];
                    count += f(k, v);
                }
            }
            return count;
        }

        /**
         * 函数求和
         * @param a 起始索引
         * @param b 终止索引
         * @param f 函数
         */
        public static Add(a: number, b: number, f: (i: number) => number) {
            // if (a >= b) return 0;

            let count = 0;
            for (let i = a; i < b; i++) {
                count += f(i);
            }
            return count;
        }

        /**
         * 遍历数组查找对应的值
         * @param t 待遍历的数组
         * @param f 比较函数
         * 
         * @returns 元祖 [对应的值， 该值对应的索引]
         */
        static FindR(t: Array<any>, f: (a, b) => boolean): [any, number] {
            for (let i = 0; i < t.length; i++) {
                if (f(i, t[i])) {
                    return [t[i], i]
                }
            }
            return [null, null]
        }

        static FindZ(t: Array<number>, max: number) {
            let index = 0;
            for (let k in t) {
                let v = t[k];
                if (max < v) {
                    index = Number(k);
                    break;
                }
                else {
                    index = Number(k) + 1;
                }
            }

            return index;
        }

        static FindRcall(t: Array<any>, f: (a, b) => boolean, thisObj: any): [any, number] {
            for (let i = 0; i < t.length; i++) {
                if (f.call(thisObj, i, t[i])) {
                    return [t[i], i]
                }
            }
            return [null, null]
        }
        static ObjFindRcall(t: any, f: (a, b) => boolean, thisObj: any): [any, number] {
            for (let i in t) {
                if (f.call(thisObj, i, t[i])) {
                    return [t[i], parseInt(i)];
                }
            }
            return [null, null]
        }

        public static FindF(t, f: (a, b) => boolean): boolean {
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    let v = t[k];
                    if (f(k, v) == true) {
                        return true;
                    }
                }
            }
            return false;
        }
        public static FindFCall(t, f: (a, b) => boolean, thisObj: any): boolean {
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    let v = t[k];
                    if (f.call(thisObj, k, v) == true) {
                        return true;
                    }
                }
            }
            return false;
        }

        /** 
         * 查找数组对应的元素的下标 
         * -1 未找到
        */
        public static FindK(t: Array<any>, v: any) {
            return t.indexOf(v);
        }

        public static FindV(t, v) {
            for (let _k in t) {
                if (t.hasOwnProperty(_k)) {
                    let _v = t[_k];
                    if (_k == v) {
                        return _v;
                    }
                }
            }
            return null;
        }

        public static VIn(t: any, value: any): boolean {
            if (t == null) {
                return false
            }

            for (let key in t) {
                if (t.hasOwnProperty(key)) {
                    if (t[key] == value) {
                        return true;
                    }
                }
            }
            return false
        }

        public static Findev(t, val) {
            for (let _k in t) {
                let _v = t[_k];
                if (Table.FindK(_v, val) != -1) {
                    return _k;
                }
            }
            return -1;
        }
        /**
         * 深拷贝
         * @param data 对于非引用值类型的数值，直接赋值，而对于引用值类型（object）遍历，递归赋值。
         */
        public static DeepCopy<T>(data: T): T {
            let t = Table._type(data), o, i, ni;

            if (t === 'array') {
                o = [];
            } else if (t === 'object') {
                o = {};
            } else {
                return data;
            }

            if (t === 'array') {
                for (i = 0, ni = (data as any).length; i < ni; i++) {
                    o.push(Table.DeepCopy(data[i]));
                }
                return o;
            } else if (t === 'object') {
                for (i in data) {
                    o[i] = Table.DeepCopy(data[i]);
                }
                return o;
            }

        }
        private static _type(obj) {
            let toString = Object.prototype.toString;
            let map = {
                '[object Boolean]': 'boolean',
                '[object Number]': 'number',
                '[object String]': 'string',
                '[object Function]': 'function',
                '[object Array]': 'array',
                '[object Date]': 'date',
                '[object RegExp]': 'regExp',
                '[object Undefined]': 'undefined',
                '[object Null]': 'null',
                '[object Object]': 'object'
            };
            return map[toString.call(obj)];
        }

        public static Init(c: number, f: (a: number) => any): Array<any> {
            let ret = [];
            for (let i = 0; i < c; i++) {
                ret.push(f(i))
            }
            return ret;
        }

        public static initi(t, f) {
            let ret = []
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    let v = t[k];
                    let value = f(k, v);
                    if (value != null) {
                        ret.push(value)
                    }
                }
            }
            return ret;
        }

        public static alltrue(t, f) {
            let count1 = Table.countture(t, f)
            let count2 = Table.length1(t)

            return count1 == count2;
        }
        public static countture(t, f) {
            let count = 0;
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    let v = t[k];
                    count = count + (f(k, v) && 1 || 0);
                }
            }
            return count;
        }

        public static length1(t) {
            let count = 0;
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    let v = t[k];
                    count = count + 1;
                }
            }
            return count;
        }

        public static copy(src) {
            if (src == null) {
                return null;
            }
            let dst = [];
            for (let k in src) {
                if (src.hasOwnProperty(k)) {
                    let v = src[k];
                    dst[k] = v;
                }
            }
            return dst;
        }

        /**
         *初始化数组
         *
         * @static
         * @param {Array<any>} t 需要遍历的数组
         * @param {(a:number , b:any) =>number} f 遍历的方法
         * @returns 被初始化的数组
         * @memberof Table
         */
        public static InitF(t: Array<any>, f: (a: number, b: any) => any) {
            let result = [];
            for (let i = 0; i < t.length; i++) {
                let v = t[i];
                result[i] = f(i, v);
                this;
            }
            return result;
        }

        public static LengthDisorder(t: Object) {
            let len = 0;
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    len += 1;
                }
            }
            return len;
        }

        public static Sort(a, b) {
            if (a.value1 == b.value1) {
                if (a.value2 == b.value2) {
                    return a.key < b.key;
                } else {
                    return a.value2 > b.value2;
                }
            } else {
                return a.value1 > b.value1
            }
        }

        public static tableLength(t: Object): number {
            let count = 0;
            for (let k in t) {
                if (t.hasOwnProperty(k)) {
                    count += 1;
                }
            }
            return count;
        }





    }

    export class Set {

        public static NumberUnit2(number) {
            if (number < 100000) {
                return Helper.StringFormat("%d", number)
            }
            else {
                return Helper.StringFormat("%d%s", number / 10000, TextsConfig.TextsConfig_Common.wan)
            }
        }

        public static NumberUnit3(n: number) {
            if (n < 100000) {
                if (n == 0) {
                    return String(0);
                } else {
                    return String(n);
                }
            } else if (n >= 100000 && n < 1000000000) {
                if (n % 10000 == 0) {
                    return Helper.StringFormat("%s%s", String(n / 10000), TextsConfig.TextsConfig_Common.wan);
                }
                return Helper.StringFormat("%s%s", (n / 10000).toFixed(1), TextsConfig.TextsConfig_Common.wan);
            } else if (n >= 1000000000) {
                if (n % 100000000 == 0) {
                    return Helper.StringFormat("%s%s", String(n / 100000000), TextsConfig.TextsConfig_Common.yi);
                }
                return Helper.StringFormat("%s%s", (n / 100000000).toFixed(1), TextsConfig.TextsConfig_Common.yi);
            }
        }

        public static numberUnitBattleValue(number: number) {
            if (number < 1000000) {
                return Helper.StringFormat("%d", number);
            } else if (1000000 <= number) {
                return Helper.StringFormat("%s%s", Math.floor(number / 10000), TextsConfig.TextsConfig_Common.wan);
            }
        }

        public static NumberUnit4(number: number) {
            if (number < 100000) {
                return Helper.StringFormat("%d", number);
            } else if (100000 <= number) {
                return Helper.StringFormat("%s%s", (number / 10000).toFixed(2), TextsConfig.TextsConfig_Common.wan);
            }
        }

        public static timeLeaveSec(second: number): string {
            let hours: number = Math.floor(second % (3600 * 24) / 3600);
            let minutes: number = Math.floor(second % 3600 / 60);
            let seconds: number = second % 60;

            let str = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            return str;
        }

        /**
         * 设置按钮背景图片
         * @param btn 按钮
         * @param normalPath 正常显示图片
         * @param highLightPath 高亮图片
         * @param disablePath 按钮失效显示图片
         */
        public static ButtonBackgroud(btn: eui.Button, normalPath?: string, highLightPath?: string, disablePath?: string) {
            if (btn != null && normalPath != null) {

                // 正常
                (<eui.Image>btn.getChildAt(0)).source = normalPath;

                // 按下 
                if (highLightPath != null) {
                    let property: eui.SetProperty = <eui.SetProperty>btn.skin.states[1].overrides[0];
                    if (property != null && property.name == "source") {
                        property.value = highLightPath;
                    }
                }

                // 禁用
                if (disablePath != null) {
                    let property: eui.SetProperty = <eui.SetProperty>btn.skin.states[2].overrides[0];
                    if (property != null && property.name == "source") {
                        property.value = disablePath;
                    }
                }
            }
        }

        /**
         * 设置label数量足够时绿色,不足时红色
         * @param label label
         * @param number 当前
         * @param enough 
         */
        public static LabelNumberGreenAndRed(label, number: number, enough: number) {
            label.textColor = (number < enough) ? ConstantConfig_Common.Color.red : ConstantConfig_Common.Color.green;
        }

        public static getNodeRect(node: eui.Group) {
            let rect = { left: 10000, right: 0, top: 10000, bottom: 0 }
            for (let i = 0; i < node.numChildren; i++) {
                let c = node.getChildAt(i);
                let sizew = c.width;
                let sizeh = c.height;
                let px = c.x;
                let py = c.y;
                let anchorX = c.anchorOffsetX;
                let anchorY = c.anchorOffsetY;
                let set = { x: px - anchorX, y: py - anchorY };
                let trans: egret.Point = new egret.Point();
                node.localToGlobal(set.x, set.y, trans);
                let rx = trans.x
                let ry = trans.y

                if (rx < rect.left) {
                    rect.left = rx
                }
                if (ry < rect.top) {
                    rect.top = ry
                }
                if (rx + sizew > rect.right) {
                    rect.right = rx + sizew
                }
                if (ry + sizeh > rect.bottom) {
                    rect.bottom = ry + sizeh
                }
            }
            return rect
        }

        public static DecodeJson(value: any, key?: string) {
            let ret = "";

            let defaultKey = (key != null) ? key : StringConfig_Language_Server[Device.languageType];
            // let status = () == null ? false : true;
            // if (value instanceof Array) {
            //     ret = value[0];
            // } else {
            //     if (value.substring(0, 1) == "{" || value.substring(0, 2) == "[{") {
            //         ret = JSON.parse(value);
            //     } else {
            //         ret = value;
            //     }
            // }

            try {
                ret = JSON.parse(value);
            }
            catch (e) {
                // console.error(e);
                ret = value;
            }

            if (ret != null && ret[defaultKey] != null) {
                return ret[defaultKey];
            }

            return value;

        }

        public static TimeOffset(sec: number) {
            let date = Game.Controller.serverNow();
            let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            humanDate.getTime() / 1000 - 8 * 60 * 60;

            sec = (humanDate.getTime() / 1000 - 8 * 60 * 60) - sec;
            let ret = 0;
            let des;
            if (sec > (3600 * 24) * 365) {
                ret = Math.floor(sec / ((3600 * 24) * 365));
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.yearsAgo, ret);
            } else if (sec > (3600 * 24) * 30) {
                ret = Math.floor(sec / ((3600 * 24) * 30));
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.monsAgo, ret);
            } else if (sec > (3600 * 24)) {
                ret = Math.floor(sec / (3600 * 24));
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.daysAgo, ret);
            } else if (sec > 3600) {
                ret = Math.floor(sec / 3600);
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.hoursAgo2, ret);
            } else if (sec > 60) {
                ret = Math.floor(sec / 60);
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.minsAgo, ret);
            } else {
                des = TextsConfig.TextsConfig_Time.justNow;
            }

            return des;
        }


        public static TimeForMail(sec: number): string {
            // return Set.TimeFormatBeijing("%s-%s-%s  %s:%s", sec);
            let time = sec;
            if (time == null || time == undefined) {
                if (Game.Controller.curServerTime != null && Game.Controller.curServerTime != 0) {
                    time = Game.Controller.curServerTime;
                } else {
                    time = new Date().valueOf() / 1000;
                }
            }

            let date = new Date(time * 1000);
            return Helper.StringFormat("%s-%s-%s  %s:%s",
                date.getFullYear(),
                date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1,
                date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate(),
                date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours(),
                date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()
            );
        }

        /**在任何时区返回北京时间的格式化 */
        public static TimeFormatBeijing() {
            // let time;Game.Controller.serverNow()
            // if (Game.PlayerInstanceSystem.curServerTime != null && Game.PlayerInstanceSystem.curServerTime != 0) {
            //     time = Game.PlayerInstanceSystem.curServerTime;
            // } else {
            //     let timestamp = (new Date()).getTime();
            //     time = timestamp;
            // }


            // let data = new Date((time + 8 * 3600));
            // let y = data.getFullYear();
            // let m = data.getMonth() + 1;
            // let d = data.getDate();
            // let h = data.getHours();
            // let mm = data.getMinutes();
            return Game.Controller.serverNow();
        }
        private static add0(m) {
            return m < 10 ? '0' + m : m
        }
        public static FormatMsTime2(msg) {
            let a = Math.floor(msg % 60)
            let b = Math.floor(msg / 60)
            let ms = Helper.StringFormat("%2d", a)
            if (Number(ms) < 10) {
                ms = "0" + ms;
            }
            let min = Helper.StringFormat("%2d", b)
            if (Number(min) < 10) {
                min = "0" + min;
            }
            let ret = Helper.StringFormat("%s:%s", min, ms)
            return ret
        }

        // 转换币值
        public static CashUnit(str: string): string {
            if (str == undefined) return "";
            let cash: string = "";
            if (str.indexOf("CNY") != -1) {
                cash = "¥";
            } else if (str.indexOf("USD") != -1) {
                cash = "$";
            } else if (str.indexOf("KRW") != -1) {
                cash = "₩";
            } else if (str.indexOf("TWD") != -1) {
                cash = "NT$";
            } else {
                cash = "¥";
            }
            return cash;
        }

        /**对齐显示魔域boss伤害 */
        public static numberUnit4(number: number) {
            if (number < 100000) {
                return Helper.StringFormat("%d", number);
            }
            else {
                let num = (number / 10000);
                let strNum = num.toString();
                let pos = strNum.indexOf(".");
                let newStrNum = strNum.substr(0, pos + 2);
                num = Number(newStrNum);
                return Helper.StringFormat("%.1f%s", num, TextsConfig.TextsConfig_Common.wan);
            }
        }
    }

    export class singLecraft {
        public static decodeGroupName(str, strchar: string, bAfter: boolean): string {
            if (str == null) {
                return;
            } else {
                let jsonStr = Set.DecodeJson(str, null);
                let arr = String(jsonStr).split(strchar);
                if (arr.length == 1) return "";
                if (bAfter) {
                    return arr[1] ? arr[1] : "";
                } else {
                    return arr[0] ? arr[0] : "";
                }
            }
        }

        public static GetLevel(score: number) {
            let tbl = TableSinglecraftScore.Table();
            let level = 1;
            for (var k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    var v = tbl[k];
                    if (score >= v.section_score) {
                        level = Number(k);
                    } else {
                        break;
                    }
                }
            }
            return level;
        }

        public static InstanceScore(id: number) {
            if (ckid(id)) {
                return null;
            }
            return TableSinglecraftScore.Item(id);
        }

        public static LevelProgresBar(score: number) {
            //当前段位
            let curLevel = singLecraft.GetLevel(score);
            //当前段位对应积分
            let preCore = singLecraft.InstanceScore(curLevel).section_score;
            preCore = preCore == 0 ? CommonConfig.singlecraft_init_score : preCore;

            //下一段位
            let nextLevel = curLevel;
            if (singLecraft.InstanceScore(nextLevel + 1) != null) {
                nextLevel = curLevel + 1;
            }

            //下一段位对应积分
            let nextCore = singLecraft.InstanceScore(nextLevel).section_score;

            //百分比
            let percent = 1;
            let bLast = true;
            if (nextCore == preCore) {
                //已达到最高
            } else {
                percent = Math.floor((score - preCore) / (nextCore - preCore) * 100) / 100;
                percent = percent >= 1 ? 1 : percent;
                bLast = false;
            }

            return [preCore, nextCore, percent, bLast];
        }

        public static RewardGoods(type: number, season: number) {
            season = season || 1;
            let goodsList = [];
            let strGood = {
                [1]: "reward_goods",
                [2]: "season_reward_goods",
            };
            let strCount = {
                [1]: "reward_count",
                [2]: "season_reward_count",
            };
            if (type == 1 || type == 2) {
                let tbl = TableSinglecraftScore.Table();
                for (let k in tbl) {
                    if (tbl.hasOwnProperty(k)) {
                        let v = tbl[k];
                        let item = { good: null, max: null, min: null, icon: null, logo: null };
                        item.good = [];
                        if (type == 2 && v.title_id != "") {
                            let goods = [];
                            let good = new message.GoodsInfo();
                            good.goodsId = Number(v.title_id);
                            good.count = 1;
                            item.good.push(good);
                        }
                        for (let kk in v[strGood[type]]) {
                            if (v[strGood[type]].hasOwnProperty(kk)) {
                                let vv = v[strGood[type]][kk];
                                let goods = [];
                                let good = new message.GoodsInfo();
                                good.goodsId = Number(vv);
                                good.count = tbl[k][strCount[type]][kk];
                                item.good.push(good);
                            }
                        }
                        item.max = null;
                        item.min = tbl[k].section_score;
                        item.icon = tbl[k].icon_num;
                        item.logo = tbl[k].title;
                        goodsList.push(item);

                    }
                }
            } else if (type == 3 || type == 4) {
                let tbl = {};
                if (type == 3) {
                    tbl = TableSinglecraftRank.Table();
                } else {
                    tbl = TableSinglecraftRankSelf.Table();
                }
                let maxSeason = 1;
                for (let k in tbl) {
                    if (tbl.hasOwnProperty(k)) {
                        let v = tbl[k];
                        if (v.index != null && v.index > maxSeason) {
                            maxSeason = v.index;
                        }
                    }
                }
                if (season > maxSeason) {
                    season = maxSeason;
                }
                for (let k in tbl) {
                    if (tbl.hasOwnProperty(k)) {
                        let v = tbl[k];
                        let curIndex = v.index || 1;
                        if (curIndex == season) {
                            let item = { good: null, max: null, min: null, icon: null, logo: null };
                            item.good = [];
                            if (v.title_id != "") {
                                let goods = {};
                                let good = new message.GoodsInfo();
                                good.goodsId = v.title_id;
                                good.count = 1;
                                item.good.push(good);
                            }
                            for (var kk in v.reward_goods) {
                                if (v.reward_goods.hasOwnProperty(kk)) {
                                    var vv = v.reward_goods[kk];
                                    let goods = {};
                                    let good = new message.GoodsInfo();
                                    good.goodsId = vv;
                                    good.count = tbl[k].reward_count[kk];
                                    item.good.push(good);
                                }
                            }
                            item.max = tbl[k].rank_max;
                            item.min = tbl[k].rank_min;
                            item.icon = tbl[k].icon_num;
                            item.logo = tbl[k].title;
                            goodsList.push(item);
                        }
                    }
                }
            }
            return goodsList;
        }
    }

    export class Lang {
        public static chatContent(chatMsg): string {
            let contentInfo = null;
            let ret: string = "";
            let isJson: boolean = false;
            if (chatMsg.content.substring(0, 2) != "[{") {
                isJson = false;

                // [{"content":"2d1935e806f5","type":"0"},
                // {"content":"{\"en\":\"1&H5_172\",\"ko\":\"1&H5_172\",\"ru\":\"1&H5_172\",\"zhcn\":\"1&H5_172\",\"zhtw\":\"1&H5_172\"}","type":"12"},
                // {"content":"40","type":"0"}]

                contentInfo = (<string>chatMsg.content).split("&");
                if (chatMsg.content_type == "") {
                    if (contentInfo.length > 0) {
                        ret = contentInfo[contentInfo.length - 1];
                    }
                    return ret;
                }
                if (contentInfo.length >= 1 && contentInfo[0]) {
                    return contentInfo[0];
                }

                if (contentInfo == null) {
                    contentInfo = [];
                }
            } else {
                isJson = true;
                contentInfo = JSON.parse(chatMsg.content);
                if (chatMsg.content_type == "") {
                    if (contentInfo.length > 0) {
                        ret = contentInfo[contentInfo.length - 1].content;
                    }
                    return ret;
                }
            }

            let paramTbl = [];
            for (let i = 0; i < contentInfo.length; i++) {
                let curType = null;
                let curId = null;
                let curCon = null;
                if (typeof contentInfo[i] === "string") {
                    let curContent = contentInfo[i].split("|")
                    if (curContent == null) {
                        return TextsConfig.TextsConfig_Common.mail_error;
                    }
                    curType = Number(curContent[0]);
                    curId = Number(curContent[1]);
                    curCon = curContent[1];
                } else {
                    curType = Number(contentInfo[i].type);
                    curId = Number(contentInfo[i].content);
                    curCon = contentInfo[i].content;
                }

                if (curType == message.ETextArgType.TEXT_ARG_TYPE_NONO) {
                    paramTbl.push(curCon);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GOODS) {
                    if (curId != 0) {
                        let name = PlayerItemSystem.Item(curId)["name"];
                        paramTbl.push(name);
                    }
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
                    let name = Lang.Des(curId);
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND) {
                    let name = TableWonderland.Item(curId).wonderland_name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND_TREE) {
                    let name = TableWonderlandTree.Item(curId).tree_name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_ARTIFACT) {
                    let name = TableBaseArtifact.Item(curId).equip_name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GENERAL) {
                    let name = null;
                    if (PlayerHunterSystem.Table(curId) == null) {
                        name = TextsConfig.TextsConfig_Common.unknowGeneral;
                    } else {
                        name = PlayerHunterSystem.Table(curId).general_name;
                    }
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_FORMATION_COMPOSE) {
                    let name = TableGeneralCompose.Item(curId).compose_name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_LEAUGE_INSTANCE) {
                    let name = TableLeagueInstance.Item(curId).instance_name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GIFT) {
                    let name = "";
                    if (TableNewgiftItem.Item(curId) != null) {
                        name = TableNewgiftItem.Item(curId).name;
                    } else if (TableMonthgift.Item(curId) != null) {
                        name = TableMonthgift.Item(curId).name;
                    }
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GROUP) {
                    let name = null;
                    if (isJson) {
                        name = Set.DecodeJson(curCon);
                    } else {
                        let newStr = "";
                        for (let j = 0; j < contentInfo.length; j++) {
                            if (j >= i) {
                                if (contentInfo[i].split("|") == null) {
                                    newStr = newStr + "&" + contentInfo[j];
                                } else {
                                    if (j == i) {
                                        newStr = newStr + curCon;
                                    } else {
                                        break;
                                    }
                                }
                            }
                        }
                        name = Set.DecodeJson(newStr);
                    }
                    name = singLecraft.decodeGroupName(name, "&", false);
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_SINGLECRAFT_SECTION) {
                    let name = TableSinglecraftScore.Item(curId).name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_ADVISER) {
                    StringConfig_Table.adviserBase
                    let name = TableBaseAdviser.Item(curId).adviser_name;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_FRUIT) {
                    let name = curId % 100;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GIFT_BACK) {
                    let name = TextsConfig.TextsConfig_Activity.bigGift;
                    paramTbl.push(name);
                } else if (curType == message.ETextArgType.TEXT_ARG_TYPE_LEAGUEMATCH_SCORE) {
                    let name = TableLeagueMatchScore.Item(curId).name;
                    paramTbl.push(name);
                }
            }

            let funcName = chatMsg.content_type;
            if (LanguageManager[funcName]) {
                ret = LanguageManager[funcName](...paramTbl);
            }
            return ret;
        }

        /**根据索引，返回对应语句的描述 */
        public static Des(id) {
            let suffix = Device.languageInfo;
            let ret = TableLanguage.Item(id);
            return ret[suffix];
        }
    }
}