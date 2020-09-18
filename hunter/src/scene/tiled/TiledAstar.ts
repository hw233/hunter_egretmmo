namespace zj {
	/**
	 * Astar寻路算法类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class TiledAstar {
		// 8方向检测
		private static posTemp: number[][] = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];

		private static astarNodeCache: AstarNode[] = [];// 点对象池
		private static cacheIdx: number = 0;

		private static checkList: AstarNode[];// 检测点列表
		/**
		 * Astar寻路
		 * startX：起始X坐标
		 * startY：起始Y坐标
		 * endX： 目标点X坐标
		 * endY： 目标点Y坐标
		 * tileW： 小地图块宽
		 * tileH： 小地图块高
		 * blocks： 碰撞点二维数组，0-无碰撞，1-碰撞块, 2-已检测过（初始数据只有0、1）
		 */
		public static getPath(startX: number, startY: number, endX: number, endY: number, tileW: number, tileH: number, blocks: number[][]): egret.Point[] {
			// 按地图块获取寻路路径集合
			let list: AstarNode[] = this.getPathTiled(
				Math.floor(startX / tileW),
				Math.floor(startY / tileH),
				Math.floor(endX / tileW),
				Math.floor(endY / tileH),
				blocks);
			if(list){
				// 将地图块集合转化为点集合
				let offx = startX % tileW;
				let offy = startY % tileH;
				let result = [];
				for(let i = 0; i < list.length; ++i){
					let node = list[i];
					let pos: egret.Point = PoolManager.getInstance().getPoint(node.idxX * tileW + offx, node.idxY * tileH + offy);
					result.push(pos);
				}
				result.push(PoolManager.getInstance().getPoint(endX, endY));
				return result;
			}
			return null;
		}
		/**
		 * startX：起始X轴块索引
		 * startY：起始Y轴块索引
		 * endX： 目标点X轴块索引
		 * endY： 目标点Y轴块索引
		 */
		private static getPathTiled(startX: number, startY: number, endX: number, endY: number, blocks: number[][]): AstarNode[] {
			this.cacheIdx = 0;
			this.checkList = [];
			let nodeStart = this.getNode(null, -1, startX, startY, endX, endY);
			let endNode = this.getPathLogic(nodeStart, endX, endY, blocks);
			if (endNode) {
				let list = [];
				while (endNode.father) {
					if(endNode.father == nodeStart){
						break;
					} else {
						list.splice(0, 0, endNode.father);
						endNode = endNode.father;
					}
				}
				return this.optimizeNode(list);
			}
			return null;
		}
		
		private static getPathLogic(node: AstarNode, endX: number, endY: number, blocks: number[][]): AstarNode {
			if (node.idxX == endX && node.idxY == endY) {
				return node;
			}
			this.checkPosAround(node, endX, endY, blocks);
			if (this.checkList.length > 0) {
				return this.getPathLogic(this.checkList.pop(), endX, endY, blocks);
			}
			return null;
		}
		// 检测node周围的节点
		private static checkPosAround(node: AstarNode, endX: number, endY: number, blocks: number[][]) {
			let idx = node.idxX;
			let idy = node.idxY;
			let list = this.posTemp;
			let nx = 0;
			let ny = 0;
			let type = 0;
			for (let i = 0; i < list.length; ++i) {
				nx = idx + list[i][0];
				ny = idy + list[i][1];
				if (this.isInSize(nx, ny, blocks)) {
					type = blocks[nx][ny];
					if (type == 0) {
						blocks[nx][ny] = 2;
						this.addNode(node, i, nx, ny, endX, endY);
					}
				}
			}
		}
		/**
		 * 将点加入到待检测集合，距离最短的放最后，优先检测
		 */
		private static addNode(father: AstarNode, face: number, idxX: number, idxY: number, endX: number, endY: number) {
			let node = this.getNode(father, face, idxX, idxY, endX, endY);
			let islast = true;
			for (let i = this.checkList.length - 1; i >= 0; --i) {
				if (node.getPdisAll() < this.checkList[i].getPdisAll()) {
					if (islast) {
						this.checkList.push(node);
					} else {
						this.checkList.splice(i + 1, 0, node);
					}
					return;
				}
				islast = false;
			}
			this.checkList.splice(0, 0, node);
		}
		// 检测块是否在地图中
		private static isInSize(nx: number, ny: number, blocks: number[][]) {
			return nx >= 0 && ny >= 0 && nx < blocks.length && ny < blocks[nx].length;
		}
		/**
		 * 从对象池获取节点对象
		 */
		private static getNode(father: AstarNode, face: number, idxX: number, idxY: number, endX: number, endY: number): AstarNode {
			let node: AstarNode = null;
			if (this.cacheIdx < this.astarNodeCache.length) {
				node = this.astarNodeCache[this.cacheIdx];
				this.cacheIdx++;
			} else {
				node = new AstarNode();
				this.astarNodeCache.push(node);
				this.cacheIdx = this.astarNodeCache.length;
			}
			node.setTo(father, face, idxX, idxY, endX, endY);
			return node;
		}
		/**
		 * 优化路径集合（如果相邻的3个节点在同一条线上，则删掉中间的节点，减少移动节点）
		 */
		private static optimizeNode(list: AstarNode[]): AstarNode[]{
			if(list.length > 2){
				for(let i = list.length - 2; i > 0; --i){
					let qian = list[i - 1];
					let curr = list[i];
					let hou = list[i + 1];
					if(qian.face == curr.face && curr.face == hou.face){
						list.splice(i, 1);
					} else if ((qian.idxX == curr.idxX && curr.idxX == hou.idxX) 
							|| (qian.idxY == curr.idxY && curr.idxY == hou.idxY)){
						list.splice(i, 1);
					}
				}
			}
			return list;
		}
	}
	export class AstarNode {
		public father: AstarNode;
		public idxX: number;
		public idxY: number;
		private pdisStart: number;
		private pdis: number;
		public face: number;

		public setTo(father: AstarNode, face: number, idxX: number, idxY: number, endX: number, endY: number) {
			this.father = father;
			this.face = face;
			this.idxX = idxX;
			this.idxY = idxY;
			this.pdisStart = 0;
			if(father){
				this.pdisStart = father.pdisStart + this.pDisPoint(idxX * 10, idxY * 10, father.idxX * 10, father.idxY * 10);
			}
			this.pdis = this.pDisPoint(idxX * 10, idxY * 10, endX * 10, endY * 10);
			return this;
		}

		public getPdisAll(): number{
			return this.pdisStart + this.pdis;
		}

		private pDisPoint(x1, y1, x2, y2) {
			return Math.pow(Math.abs((x1 - x2) * (x1 - x2)) + Math.abs((y1 - y2) * (y1 - y2)), 0.5);
		}

	}
}