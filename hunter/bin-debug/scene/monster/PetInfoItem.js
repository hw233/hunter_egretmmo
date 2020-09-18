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
    //PetInfoItem
    //hexiaowei
    //2019/01/11
    var PetInfoItem = (function (_super) {
        __extends(PetInfoItem, _super);
        function PetInfoItem() {
            var _this = _super.call(this) || this;
            _this.level = 0;
            _this.isdown = false;
            _this.skinName = "resource/skins/monster/PetInfoItemSkin.exml";
            zj.cachekeys(zj.UIResource["PetInfoItem"], null);
            _this.imgSpriteFrame.visible = false;
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            //     this.imgSpriteFrame.visible = true;
            // }, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            //     this.imgSpriteFrame.visible = false;
            // }, this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, _this);
            return _this;
        }
        PetInfoItem.prototype.dataChanged = function () {
            if (this.data.pet_id == undefined) {
                this.getAdviser();
            }
            else {
                var petid = this.data.pet_id;
                var petinfo = zj.PlayerAdviserSystem.PetBase(petid);
                this.imgSpriteName.source = zj.cachekey(petinfo.name_path, this);
                this.imgSpriteIcon.source = zj.cachekey(petinfo.frame_path, this);
                this.imgSpriteGrade.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.smallGrade[petinfo.quality + 10], this);
                if (this.selected) {
                    this.imgSpriteFrame.visible = true;
                }
                else {
                    this.imgSpriteFrame.visible = false;
                }
                var mn = zj.Game.PlayerAdviserSystem.petMap;
                var level = zj.Game.PlayerAdviserSystem.petMap[petid].star;
                var itemId = petinfo.compose_goods;
                var cur = zj.PlayerItemSystem.Count(itemId);
                var des = petinfo.compose_count;
                if ((level > 0 && level < 6) || level == 0 && cur >= des) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[1];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[1];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else if (level >= 6 && level < 11) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[2];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[2];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else if (level >= 11 && level < 16) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[3];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[3];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else if (level >= 16 && level < 21) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[4];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[4];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else if (level >= 21 && level < 26) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[5];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[5];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else if (level >= 26 && level < 31) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[6];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[6];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else if (level >= 31) {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[7];
                    var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[7];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
                }
                else {
                    var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[8];
                    zj.Set.ButtonBackgroud(this.btnPetName, path1, path1, path1);
                }
                var money = 0;
                var moneyDes = 0;
                if (zj.PlayerAdviserSystem.GetPet(petid)) {
                    zj.Helper.SetImageFilterColor(this.imgSpriteIcon);
                    this.imgSpriteNode.visible = false;
                    this.groupNodeStar.visible = true;
                    this.labelLevel.text = "+" + level;
                    PetInfoItem.GetNodeStarByAlignmentsPet(this.groupNodeStar, 5, 5, 0.8, level, null);
                    money = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                    moneyDes = petinfo.up_money[level + 1];
                }
                else {
                    zj.Helper.SetImageFilterColor(this.imgSpriteIcon, "gray");
                    this.imgSpriteNode.visible = true;
                    if (cur >= des) {
                        this.imgSpriteNode.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.canGet, this);
                    }
                    else {
                        this.imgSpriteNode.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.dontGet, this);
                    }
                    this.groupNodeStar.visible = false;
                    this.imgSpriteLevel.visible = false;
                    this.labelLevel.visible = false;
                }
                var step = 0;
                if (zj.PlayerAdviserSystem.GetPet(petid) && zj.Game.PlayerAdviserSystem.petMap[petid].step == zj.CommonConfig.pet_step_max) {
                    step = zj.Game.PlayerAdviserSystem.petMap[petid].step - 1;
                }
                else {
                    step = zj.Game.PlayerAdviserSystem.petMap[petid].step;
                }
                var goods = petinfo.evo_consume[step];
                var count = petinfo.evo_consume_good[step][0];
                var itemSet1 = zj.PlayerItemSystem.Set(goods[0]);
                var cur1 = zj.PlayerItemSystem.Count(goods[0]);
                var moneyStep = petinfo.evo_consume_money[step];
                var moneyDeStep = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                var curStar = 0;
                if (step <= zj.CommonConfig.pet_step_max) {
                    curStar = petinfo.evo_star_req[step];
                }
                var star = 1;
                if (zj.PlayerAdviserSystem.GetPet(petid)) {
                    star = zj.Game.PlayerAdviserSystem.petMap[petid].star - 1;
                }
                var itemIdnew = petinfo.up_goods[star][0];
                var curStarnew = zj.PlayerItemSystem.Count(itemIdnew);
                var desStar = petinfo.up_count[star][0];
                var itemSet = zj.PlayerItemSystem.Set(itemIdnew);
                var moneyStar = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                var moneyDesStar = petinfo.up_money[star];
                //宠物红点
                if (cur >= des && zj.PlayerAdviserSystem.GetPet(petid) == false) {
                    this.imgSpriteTip.visible = true;
                }
                else if (level != zj.CommonConfig.pet_star_max && zj.PlayerAdviserSystem.GetPet(petid) == true
                    && petinfo.up_count[zj.Game.PlayerAdviserSystem.petMap[petid].star][0] >= zj.PlayerItemSystem.Count(petinfo.up_goods[zj.Game.PlayerAdviserSystem.petMap[petid].star][0])
                    && moneyDes != null
                    && petinfo.up_money[zj.Game.PlayerAdviserSystem.petMap[petid].star] >= moneyDes) {
                    this.imgSpriteTip.visible = true;
                }
                else if (zj.PlayerAdviserSystem.GetPet(petid) && curStarnew >= desStar && star != zj.CommonConfig.pet_star_max && moneyStar >= moneyDesStar) {
                    this.imgSpriteTip.visible = true;
                }
                else if (zj.PlayerAdviserSystem.GetPet(petid)
                    && zj.Game.PlayerAdviserSystem.petMap[petid].step != zj.CommonConfig.pet_step_max
                    && step <= zj.CommonConfig.pet_step_max
                    && zj.Game.PlayerAdviserSystem.petMap[petid].star >= curStar
                    && cur1 >= count
                    && moneyDeStep >= moneyStep) {
                    this.imgSpriteTip.visible = true;
                }
                else {
                    this.imgSpriteTip.visible = false;
                }
            }
        };
        PetInfoItem.prototype.getAdviser = function () {
            var adviserid = this.data.adviser_id != undefined ? this.data.adviser_id : this.data.adviserId;
            var info = zj.PlayerAdviserSystem.Instance(adviserid);
            this.imgSpriteName.source = zj.cachekey(info.name_path, this);
            this.imgSpriteIcon.source = zj.cachekey(info.head_path, this);
            this.imgSpriteGrade.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.smallGrade[info.quality + 10], this);
            if (this.selected) {
                this.imgSpriteFrame.visible = true;
            }
            else {
                this.imgSpriteFrame.visible = false;
            }
            if (zj.PlayerAdviserSystem.Have(info.adviser_id) == false) {
                this.level = 0;
            }
            else {
                this.level = zj.Game.PlayerAdviserSystem.advisersMap[info.adviser_id].level;
                this.money = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                this.moneyDes = zj.PlayerAdviserSystem.AdviserlvdbInstance(info.adviser_id * 10000 + this.level).adviser_money;
                this.desNext = zj.PlayerAdviserSystem.AdviserlvdbInstance(info.adviser_id * 10000 + this.level).consume_count;
            }
            var itemId = zj.PlayerAdviserSystem.Instance(info.adviser_id).compose_goods;
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = zj.PlayerAdviserSystem.Instance(info.adviser_id).compose_count;
            var adviserId = zj.PlayerAdviserSystem.Instance(info.adviser_id).adviser_id;
            //是否拥有念兽
            if (zj.PlayerAdviserSystem.Have(info.adviser_id)) {
                zj.Helper.SetImageFilterColor(this.imgSpriteIcon);
                this.imgSpriteNode.visible = false;
                this.groupNodeStar.visible = true;
                this.labelLevel.text = "+" + this.level;
                PetInfoItem.GetNodeStarByAlignmentsPet(this.groupNodeStar, 5, 5, 0.8, this.level, null);
            }
            else {
                zj.Helper.SetImageFilterColor(this.imgSpriteIcon, "gray");
                this.imgSpriteNode.visible = true;
                if (cur >= des) {
                    this.imgSpriteNode.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.canGet, this);
                }
                else {
                    this.imgSpriteNode.source = zj.cachekey(zj.UIConfig.UIConfig_Pet.dontGet, this);
                }
                this.groupNodeStar.visible = false;
                this.imgSpriteLevel.visible = false;
                this.labelLevel.visible = false;
            }
            var one = [];
            for (var k in zj.Game.PlayerAdviserSystem.adviser) {
                var v = zj.Game.PlayerAdviserSystem.adviser[k];
                if (v.reward_count != 0) {
                    one.push(v.adviserId);
                }
                this.two = zj.Table.FindF(one, function (k, v) {
                    return v == info.adviser_id;
                });
            }
            //红点
            if (cur >= des && zj.PlayerAdviserSystem.Have(info.adviser_id) == false) {
                this.imgSpriteTip.visible = true;
            }
            else if (zj.PlayerAdviserSystem.Have(info.adviser_id) == true && cur >= this.desNext && zj.PlayerAdviserSystem.AdviserlvdbIsMax(info.adviser_id, this.level) == false && this.money >= this.moneyDes) {
                this.imgSpriteTip.visible = true;
            }
            else if (this.two) {
                this.imgSpriteTip.visible = true;
            }
            else {
                this.imgSpriteTip.visible = false;
            }
            //list按钮背景（念兽星级有关）
            if ((this.level > 0 && this.level < 6) || (this.level == 0 && cur >= des)) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[1];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[1];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (this.level >= 6 && this.level < 11) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[2];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[2];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (this.level >= 11 && this.level < 16) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[3];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[3];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (this.level >= 16 && this.level < 21) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[4];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[4];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (this.level >= 21 && this.level < 26) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[5];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[5];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (this.level >= 26 && this.level < 31) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[6];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[6];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (this.level >= 31) {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[7];
                var path2 = zj.UIConfig.UIConfig_Pet.buttonSel[7];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else {
                var path1 = zj.UIConfig.UIConfig_Pet.buttonNor[8];
                zj.Set.ButtonBackgroud(this.btnPetName, path1, path1, path1);
            }
        };
        //居中对齐星星(念兽按钮列表)
        PetInfoItem.GetNodeStarByAlignmentsPet = function (nodeMid, star, maxStar, scale, level, angle) {
            nodeMid.removeChildren();
            var nodeStar = [];
            var path;
            maxStar = maxStar != 0 ? maxStar : zj.CommonConfig.general_max_star;
            star = (maxStar < star) ? maxStar : star;
            var gap = nodeMid.width / (maxStar - 1);
            var centerPos = new egret.Point(nodeMid.width / 4, nodeMid.height / 2);
            var posList = zj.Helper.GetLinePosition(centerPos.x, -centerPos.y, gap, star, angle);
            for (var i = 0; i < star; i++) {
                var flag1 = 5;
                var flag2 = 6;
                if (level > 0 && level < 6) {
                    if (i < level) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "1" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "0" + "_png";
                    }
                }
                else if (level >= 6 && level < 11) {
                    if (i < level - flag1) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "2" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "1" + "_png";
                    }
                }
                else if (level >= 11 && level < 16) {
                    if (i < level - flag1 * 2) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "3" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "2" + "_png";
                    }
                }
                else if (level >= 16 && level < 21) {
                    if (i < level - flag1 * 3) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "4" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "3" + "_png";
                    }
                }
                else if (level >= 21 && level < 26) {
                    if (i < level - flag1 * 4) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "5" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "4" + "_png";
                    }
                }
                else if (level >= 26 && level < 31) {
                    if (i < level - flag1 * 5) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "6" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "5" + "_png";
                    }
                }
                else if (level >= 31 && level <= 35) {
                    if (i < level - flag1 * 6) {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "7" + "_png";
                    }
                    else {
                        path = "ui_hunter_evaluate_IconSkillAwaken" + "6" + "_png";
                    }
                }
                else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "0" + "_png";
                }
                var img = new eui.Image();
                img.source = path;
                img.x = posList[i].x;
                img.verticalCenter = 0;
                //img.y = posList[i].y; 
                img.anchorOffsetX = 0.5;
                img.anchorOffsetY = 0.5;
                nodeMid.addChild(img);
                nodeStar.push(img);
            }
            return nodeStar;
        };
        return PetInfoItem;
    }(eui.ItemRenderer));
    zj.PetInfoItem = PetInfoItem;
    __reflect(PetInfoItem.prototype, "zj.PetInfoItem");
})(zj || (zj = {}));
//# sourceMappingURL=PetInfoItem.js.map