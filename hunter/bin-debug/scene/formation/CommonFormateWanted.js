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
    var CommonFormateWanted = (function (_super) {
        __extends(CommonFormateWanted, _super);
        function CommonFormateWanted() {
            var _this = _super.call(this, "resource/skins/formation/CommonFormationWanted.exml") || this;
            // 怪物特征
            _this.features = null;
            // 怪物信息
            _this.enemys = null;
            // boss信息
            _this.bossInfo = null;
            // 当前副本信息
            _this.curInfo = null;
            // 技能列表数据
            _this.listBottomData = new eui.ArrayCollection();
            //let scene = new StageSceneFightArena;
            // this.addChildAt(scene, 0);
            //scene.initMap();
            // let rect_back = new eui.Rect();
            // rect_back.x = 0;
            // rect_back.y = 0;
            // rect_back.width = UIManager.StageWidth;
            // rect_back.height = UIManager.StageHeight;
            // rect_back.fillAlpha = 0.6;
            // rect_back.name = "__rect_back";
            // this.addChildAt(rect_back, 1);
            _this.skinName = "resource/skins/formation/CommonFormationWanted.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.listBossSkill.itemRenderer = zj.CommonBossSkillItem;
            zj.Game.EventManager.on("battlevaluechange", function (e) {
                _this.labelPlayerPower.text = _this.LoadTotalBattleValue();
            }, null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.listBottomData = new eui.ArrayCollection();
            }, null);
            return _this;
        }
        CommonFormateWanted.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
        };
        CommonFormateWanted.prototype.setInfo = function (id) {
            this.curPos = id;
            this.LoadEnemys();
            this.LoadBoss();
        };
        CommonFormateWanted.prototype.LoadEnemys = function () {
            var cell = this.curPos;
            var stages = zj.TableWanted.Item(cell).instance_pack;
            this.features = zj.TableWanted.Item(cell).feature;
            this.enemys = zj.getEnemyFomation(stages);
            this.monsterPower = zj.TableWanted.Item(cell).battle_value;
        };
        CommonFormateWanted.prototype.LoadBoss = function () {
            this.bossInfo = zj.Game.PlayerMobSystem.Instance(this.enemys[0].id);
            this.curInfo = zj.Game.PlayerMobSystem.GetCurInfo(this.enemys[0].id);
            zj.Gmgr.Instance.pveBossinfo = this.bossInfo;
            if (this.bossInfo == null)
                return;
            this.LoadBossAni();
            this.SetBossInfo(this.bossInfo, this.features);
        };
        CommonFormateWanted.prototype.LoadBossAni = function () {
            var _this = this;
            var instance = zj.TableMapRole.Item(this.bossInfo.monster_roleId);
            // 异步播放龙骨
            var boneName = zj.TableClientFightAniSpineSource.Item(instance.body_spx_id).json;
            zj.Game.DragonBonesManager.playAnimation(this, boneName, "armatureName", 1, 0)
                .then(function (display) {
                display.x = 0;
                display.y = 0;
                _this["groupAni"].addChild(display);
                display.scaleX = -instance.spine_instance_scale;
                display.scaleY = instance.spine_instance_scale;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        CommonFormateWanted.prototype.SetBossInfo = function (info, features) {
            this.features = features;
            var item = zj.TableLanguage.Item(info.monster_name);
            this.labelBossName.text = item ? item["ch"] : "";
            this.LoadFeatureList();
        };
        CommonFormateWanted.prototype.LoadFeatureList = function () {
            this.listBottomData.removeAll();
            for (var i = 0; i < this.features.length; i++) {
                var data = new zj.CommonBossSkillData();
                data.mobId = this.features[i];
                data.father = this;
                this.listBottomData.addItem(data);
            }
            this.listBossSkill.dataProvider = this.listBottomData;
        };
        CommonFormateWanted.ID = "CommonFormatePveMain";
        return CommonFormateWanted;
    }(zj.FormatChoose));
    zj.CommonFormateWanted = CommonFormateWanted;
    __reflect(CommonFormateWanted.prototype, "zj.CommonFormateWanted");
})(zj || (zj = {}));
//# sourceMappingURL=CommonFormateWanted.js.map