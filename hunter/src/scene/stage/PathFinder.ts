namespace zj {
//A*寻路器
export class PathFinder {
	public constructor() {
	}
	public static PathFinder = {};
	public static Block_Width = 80;
	public static findBeginBlock(pos,blocks,beforPath,isFly){
		if(beforPath){
			let point = beforPath.currentWayPoint();
			if(point){
				return PathFinder.findClosetBlock(point,blocks,isFly);
			}
		}
		return PathFinder.findClosetBlock(pos,blocks,isFly);
	}
	//找到离坐标最近的地块
	public static findClosetBlock(pos,blocks,isFly){
		let actorWNum = (pos.x+ConstantConfig_RoleBattle.ROOM_BLOCK_WIDTH_HALF)/this.Block_Width
		let actorHNum = (pos.y+ConstantConfig_RoleBattle.ROOM_BLOCK_WIDTH_HALF)/this.Block_Width//PlayerWonderLandSystem.MapHeight-
		let wNum = Math.floor(actorWNum);
		let hNum = Math.floor(actorHNum);
		if(wNum != actorWNum || hNum != actorHNum){
			return PathFinder.find_(wNum,hNum,blocks,pos);
		}else{
			let key = Helper.StringFormat("%d_%d",wNum,hNum);
			return blocks[key];
		}
	}
	public static find_(wNum,hNum,blocks,pos){
		let distanceSqrt = 99999999999;
		let resultBlock;
		for(let addW = 1;addW<=2;addW++){
			for(let addH = 1;addH<=2;addH++){
				let [w,h] = [wNum+(addW-1),hNum + (addH-1)];
				let blockName = Helper.StringFormat("%d_%d",w,h);
				let block = blocks[blockName];
				if(block && (block.couldCross || null)){
					// let aaaa = egret.Point.distance(block.pos,pos);
					// let bbbb=Math.sqrt(block.pos.x-pos.x)+Math.sqrt(block.pos.y-pos.y);
					//let newDisSqrt = (block.pos.x-pos.x) * (block.pos.x-pos.x) + (block.pos.y-pos.y) * (block.pos.y-pos.y);
					let newDisSqrt = egret.Point.distance(block.pos,pos);
					if(distanceSqrt > newDisSqrt){
						resultBlock = block;
					    distanceSqrt = newDisSqrt;
					}
				}
			}
		}
		return resultBlock;
	}
	//判断地块的可通过性
	public static jugeNeighbor(w,h,nodes,neighbors,isFly){
		let nodeName = Helper.StringFormat("%d_%d",w,h);
		let neighborNode = nodes[nodeName];
		if(neighborNode && (isFly || neighborNode.couldCross)){
			neighbors.push(neighborNode);
			return true;
		}
		return false;
	}
	//查找地块附近可用的地块
	//theBlock - 需要判定的地块
	//blocks - 所有地块
	//isFly - 飞行，是否无视障碍物
	public static neighbors(theBlock,blocks,isFly){
		let neighbors = [];
		//首先取出附近的8个节点。
		let left_top = true;
		let left_down = true;
		let right_top = true;
		let right_down = true;

		//left
		if(!PathFinder.jugeNeighbor(theBlock.w-1,theBlock.h,blocks,neighbors,isFly)){
			left_top = false;
			left_down = false;
		}
		//right
		if(!PathFinder.jugeNeighbor(theBlock.w+1,theBlock.h,blocks,neighbors,isFly)){
			right_top = false;
			right_down = false;
		}
		//top
		if(!PathFinder.jugeNeighbor(theBlock.w,theBlock.h+1,blocks,neighbors,isFly)){
			left_top = false;
			right_top = false;
		}
		//down
		if(!PathFinder.jugeNeighbor(theBlock.w,theBlock.h-1,blocks,neighbors,isFly)){
			left_down = false;
			right_down = false;
		}
		//top-left
		if(left_top){
			PathFinder.jugeNeighbor(theBlock.w-1,theBlock.h+1,blocks,neighbors,isFly);
		}
		//down-left
		if(left_down){
			PathFinder.jugeNeighbor(theBlock.w-1,theBlock.h-1,blocks,neighbors,isFly);
		}
		//top-right
		if(right_top){
			PathFinder.jugeNeighbor(theBlock.w+1,theBlock.h+1,blocks,neighbors,isFly);
		}
		//down-right
		if(right_down){
			PathFinder.jugeNeighbor(theBlock.w+1,theBlock.h-1,blocks,neighbors,isFly);
		}
		return neighbors;
	}
	public static calculate(beginPos,targetPos,blocks,isFly,beforePath){
		//1.找到开始节点，以actor所在位置，寻找附近最近的节点block
		let beginBlock = PathFinder.findBeginBlock(beginPos,blocks,beforePath,isFly);
		//2.找到结束节点
		let endBlock = PathFinder.findClosetBlock(targetPos,blocks,isFly);
		//3.使用A*查找路线
		let blockPaths = Astar.getInstance().path(beginBlock,endBlock,false,(theBlock)=>{
			return PathFinder.neighbors(theBlock,blocks,isFly);
		});
		//4.构建Path结构数据
		if(!blockPaths || Helper.getObjLen(blockPaths) == 0){
			return null;//A*寻路没有找到可用的路线
		}
		let path = new Path();
		for(let i = 0;i<blockPaths.length;i++){
			let block = blockPaths[i];
			path.addWayPoint(block.pos);
		}
		//7.将最终的终点加入到Path里面
		path.addWayPoint(targetPos);
		return path;
	}
}
}