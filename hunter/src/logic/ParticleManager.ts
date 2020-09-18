namespace zj {
	// 粒子管理类
	// zhaiweili
	// 2019.12.12

	export class ParticleManager {
		pool: ParticleBody[] = [];
		public constructor() {
		}

		public create(res: string, xMin: number, xMax: number, yMin: number, yMax: number,
			moveSp: number, rotaSp: number, faceMin: number, faceMax: number, callFinish: Function) {
			let item: ParticleBody;
			if (this.pool.length > 0) {
				item = this.pool.shift();
			} else {
				item = new ParticleBody();
			}
			item.init(res, xMin, xMax, yMin, yMax, moveSp, rotaSp, faceMin, faceMax, callFinish);
			return item;
		}

	}
}