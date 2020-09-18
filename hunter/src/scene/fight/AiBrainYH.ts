namespace zj {
	export class AiBrainYH extends AiBrain {
		public role;
		public id;
		public fightScene;
		public constructor(role, id) {
			super(role, id);
		}
		protected startHelp(){
			this.fightScene.startHelpYH(this.role);
		}
		public update(tick) {
			super.update(tick);
		}
		public updateHelp() {
			if (this.role.getRage() < this.role.getMaxRage()) {
				return;
			}
			if (!this.role.isPlaySkillLegeal()) {
				return;
			}
			if (this.fightScene.checkAllEnemyDead()) {
				return;
			}
			if (this.role.bPauseBlack) {
				return;
			}
			if (this.fightScene.checkOppAnyReady(this.role.bEnemy) == false) {
				return;
			}
			this.dealHelp();
		}
	}
}