namespace zj {

	// 改版主城角色
	// 翟伟利
	// 2019.11.7

	export class StageSceneCityLeader extends StageSceneFightLeader {
		private speedCity: number;
		private isControlWalk: boolean;
		private currArc: number = 0;
		public constructor(node, order) {
			super(node, order);
		}

		public loadSpeed() {
			super.loadSpeed();
			this.speedCity = this.moveSpeedX * 1000 * 0.03;
		}

		public onWalkStart() {
		}

		public onWalkEnd() {
			this.isControlWalk = false;
			this.changeState(TableEnum.TableEnumBaseState.State_None);
			this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
		}

		public moveMapWalk(arc: number) {
			if (!this.isControlWalk) {
				super.endPath();
				this.changeState(TableEnum.TableEnumBaseState.State_Walk);
				this.isControlWalk = true;
			}
			this.onMoveLogic(arc);
			return this.speedCity;
		}

		private onMoveLogic(arc: number) {
			this.currArc = arc;
			let offx = Math.floor(Util.getArcX(this.speedCity, arc));
			let offy = Math.floor(Util.getArcY(this.speedCity, arc));
			if (offx > 0) {
				this.changeDir(TableEnum.TableEnumDir.Dir_Right);
			} else if (offx < 0) {
				this.changeDir(TableEnum.TableEnumDir.Dir_Left);
			}
			this.onLeaderMoveOff(offx, offy);
		}

		private onLeaderMoveOff(offx, offy) {
			// 无碰撞，则直接移动
			if (this.isCanTouchGround(this.x + offx, this.y + offy)) {
				this.moveMap(offx, offy);
				this.setPos(this.x, this.y);
				return;
			}

			if (Math.abs(offx) > Math.abs(offy)) {
				if (this.isCanTouchGround(this.x + offx, this.y)) {
					this.moveMap(offx, 0);
					this.setPos(this.x, this.y);
					return;
				}
				if (offy != 0) {
					if (this.isCanTouchGround(this.x, this.y + offy)) {
						this.moveMap(0, offy);
						this.setPos(this.x, this.y);
						return;
					}
				}
			} else {
				if (this.isCanTouchGround(this.x, this.y + offy)) {
					this.moveMap(0, offy);
					this.setPos(this.x, this.y);
					return;
				}
				if (offx != 0) {
					if (this.isCanTouchGround(this.x + offx, this.y)) {
						this.moveMap(offx, 0);
						this.setPos(this.x, this.y);
						return;
					}
				}
			}
		}
	}
}