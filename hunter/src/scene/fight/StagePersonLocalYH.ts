namespace zj {
	/**本地特殊援助类,继承人物类 */
	export class StagePersonLocalYH extends StagePersonLocalHelp {
		public constructor(node, aiTag) {
			super(node, aiTag);
		}
		
		// public procAi(tick) {
		// 	super.procAi(tick);
		// }
		
        public creatAi(aiId) {
            this.myAI = new AiBrainYH(this, aiId);
        }

		public loadBaseData(){
			super.loadBaseData();
			this.SetAttrib("maxRage", 200);
		}

		// //[[增加人物怒气]]
        // public addRage(add) {
        //     let cur = this.getRage();
		// 	let max = this.getMaxRage();
        //     this.setRage(cur + add);
        // }
	}
}