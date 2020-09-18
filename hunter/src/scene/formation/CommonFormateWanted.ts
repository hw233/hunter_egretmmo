namespace zj {


    export class CommonFormateWanted extends FormatChoose {

        public static ID = "CommonFormatePveMain"

        // 怪物特征
        public features = null;
        // 怪物信息
        public enemys = null;
        // boss战斗力
        public monsterPower: number;
        // boss信息
        public bossInfo = null;
        // 当前副本信息
        public curInfo = null;

        // boss名字
        public labelBossName: eui.Label;

        // boss技能
        public listBossSkill: eui.List;

        // 技能列表数据
        private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();

        // 怪物战力值
        public labelMonsterPower: eui.Label;

        // 玩家战力值
        public labelPlayerPower: eui.Label;

        // 滚动框
        public scroller: eui.Scroller;

        // groupRight
        public groupRight: eui.Group;

        // 当前boss
        public curPos: number;

        constructor() {
            super("resource/skins/formation/CommonFormationWanted.exml");

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

            this.skinName = "resource/skins/formation/CommonFormationWanted.exml";

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.listBossSkill.itemRenderer = CommonBossSkillItem;

            Game.EventManager.on("battlevaluechange", (e) => {
                this.labelPlayerPower.text = this.LoadTotalBattleValue();
            }, null);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.listBottomData = new eui.ArrayCollection();
            }, null);

        }

        public onAddToStage() {
            super.onAddToStage();
        }


        public setInfo(id) {
            this.curPos = id;
            this.LoadEnemys()
            this.LoadBoss()
        }

        public LoadEnemys() {
            let cell = this.curPos;
            let stages = TableWanted.Item(cell).instance_pack;
            this.features = TableWanted.Item(cell).feature;
            this.enemys = getEnemyFomation(stages);
            this.monsterPower = TableWanted.Item(cell).battle_value;
        }

        public LoadBoss() {

            this.bossInfo = Game.PlayerMobSystem.Instance(this.enemys[0].id)
            this.curInfo = Game.PlayerMobSystem.GetCurInfo(this.enemys[0].id)
            Gmgr.Instance.pveBossinfo = this.bossInfo
            if (this.bossInfo == null) return;
            this.LoadBossAni()
            this.SetBossInfo(this.bossInfo, this.features)

        }

        public LoadBossAni() {
            let instance = TableMapRole.Item(this.bossInfo.monster_roleId)
            // 异步播放龙骨
            let boneName = TableClientFightAniSpineSource.Item(instance.body_spx_id).json;
            Game.DragonBonesManager.playAnimation(this, boneName, "armatureName", 1, 0)
                .then(display => {
                    display.x = 0;
                    display.y = 0;
                    this[`groupAni`].addChild(display);
                    display.scaleX = -instance.spine_instance_scale;
                    display.scaleY = instance.spine_instance_scale;
                })
                .catch(reason => {
                    toast(reason);
                });

        }

        public SetBossInfo(info, features) {
            this.features = features;
            let item = TableLanguage.Item(info.monster_name);
            this.labelBossName.text = item ? item["ch"] : "";
            this.LoadFeatureList();
        }

        public LoadFeatureList() {

            this.listBottomData.removeAll();
            for (let i = 0; i < this.features.length; i++) {
                let data = new CommonBossSkillData();
                data.mobId = this.features[i];
                data.father = this;
                this.listBottomData.addItem(data);
            }
            this.listBossSkill.dataProvider = this.listBottomData;
        }
    }


}