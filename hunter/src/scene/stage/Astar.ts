namespace zj {
export class Astar {
	private static instance;
	public constructor(){

	}
	public static getInstance():Astar{
        if(this.instance == null){
            this.instance = new Astar();
        }
        return this.instance;
    }
	public INF = 1/0;
	public cachedPaths;

	private dist_betweenSqrt(nodeA, nodeB){
		let subPos = { x : nodeA.pos.x - nodeB.pos.x, y : nodeA.pos.y - nodeB.pos.y};
		return Math.pow(subPos.x,2) + Math.pow(subPos.y,2);
	}
	private heuristic_cost_estimate ( nodeA, nodeB ){
		return this.dist_betweenSqrt(nodeA, nodeB);
	}
	//查找开启列表中，F值最低的节点
	private lowest_f_score ( set, f_score ){
		let [lowest, bestNode] = [this.INF, null];
		for(let k in set){
			let node = set[k];
			let score = f_score [ node.w+"_"+node.h ];
			if(score < lowest){
				[lowest, bestNode] = [score, node];
			}
		}
		return bestNode;
	}
	private not_in ( set, theNode ){
		for(let k in set){
			let v = set[k];
			if(v.w == theNode.w && v.h == theNode.h && v.pos.x == theNode.pos.x && v.pos.y == theNode.pos.y){
				return false;
			}
		}
		return  true;
		// if(set[theNode]){
		// 	return false
		// }
		// return true;
	}
	//从set中删除一个节点
	private remove_node ( set, theNode ){
		delete set[theNode.w+"_"+theNode.h];
	}
	//反向查找得到路径
	private unwind_path ( flat_path, map, current_node ){
		let aaa = [];
		if(map [ current_node.w+"_"+current_node.h ]){
			flat_path.unshift(map [ current_node.w+"_"+current_node.h ]);
			return this.unwind_path ( flat_path, map, map [ current_node.w+"_"+current_node.h ] );
		}else {
			return flat_path;
		}
	}
	private table_num(set){
		let count = 0;
		for(let k in set){
			count = count + 1;
		}
		return count;
	}
	/**
	 * 参数：star  开始点
	 * goal  目标点
	 * nodes 所有节点
	 * valid_node_func 判断临近节点是否可用的函数
	 */
	private a_star( start, goal, find_Neighbors){
		let closedset = {};//关闭列表
		let openset = {}; //开启列表
		openset[start.w+"_"+start.h] = start;
		let came_from = {}; //记录节点的上一个节点

		let g_score = {};
		let f_score = {};
		g_score [ start.w+"_"+start.h ] = 0;
		f_score [ start.w+"_"+start.h ] = g_score [ start.w+"_"+start.h ] + this.heuristic_cost_estimate ( start, goal ); // F = G + H

		while(this.table_num(openset) > 0){
			let current = this.lowest_f_score ( openset, f_score ); // 找到F最小值
			if(current == goal){//找到了目标点
				let path = this.unwind_path ( [], came_from, goal );
				path.push(goal);
				return path;
			}
			//继续查找
			this.remove_node ( openset, current );	//从开启列表中删除选中节点
			closedset[current.w+"_"+current.h] = current;
			let neighbors = find_Neighbors(current); //获得当前节点的附近节点
			for(let k in neighbors){
				let neighbor = neighbors[k];
				if(this.not_in ( closedset, neighbor )){//附近节点没有在关闭列表里面，说明该节点还没有被选中
					let tentative_g_score = g_score [ current.w+"_"+current.h ] + this.dist_betweenSqrt ( current, neighbor );
					if(this.not_in ( openset, neighbor ) || tentative_g_score < g_score [ neighbor.w+"_"+neighbor.h ]){
						came_from 	[ neighbor.w+"_"+neighbor.h ] = current; //记录父方格
						g_score 	[ neighbor.w+"_"+neighbor.h ] = tentative_g_score;
						f_score 	[ neighbor.w+"_"+neighbor.h ] = g_score [ neighbor.w+"_"+neighbor.h ] + this.heuristic_cost_estimate ( neighbor, goal );
						if(this.not_in ( openset, neighbor )){
							openset[neighbor.w+"_"+neighbor.h] = neighbor;
						}
					}
				}
			}
		}
		return null;
	}
	public clear_cached_paths(){
		this.cachedPaths = null;
	}
	public path ( start, goal, ignore_cache, find_Neighbors ){
		if(!start){
			return null;
		}
		if(!this.cachedPaths){
			this.cachedPaths = {};
		}
		if(!this.cachedPaths [ start.w+"_"+start.h ]){
			this.cachedPaths [ start.w+"_"+start.h ] = {};
		}else if(this.cachedPaths [ start.w+"_"+start.h ] [ goal.w+"_"+goal.h ] && !ignore_cache){
			return this.cachedPaths [ start.w+"_"+start.h ] [ goal.w+"_"+goal.h ];
		}
		let newPath = this.a_star ( start, goal, find_Neighbors );
		this.cachedPaths [ start.w+"_"+start.h ] [ goal.w+"_"+goal.h ] = newPath; //存储缓存数据
		return newPath;
	}
}
}