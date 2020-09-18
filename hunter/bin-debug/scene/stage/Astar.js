var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Astar = (function () {
        function Astar() {
            this.INF = 1 / 0;
        }
        Astar.getInstance = function () {
            if (this.instance == null) {
                this.instance = new Astar();
            }
            return this.instance;
        };
        Astar.prototype.dist_betweenSqrt = function (nodeA, nodeB) {
            var subPos = { x: nodeA.pos.x - nodeB.pos.x, y: nodeA.pos.y - nodeB.pos.y };
            return Math.pow(subPos.x, 2) + Math.pow(subPos.y, 2);
        };
        Astar.prototype.heuristic_cost_estimate = function (nodeA, nodeB) {
            return this.dist_betweenSqrt(nodeA, nodeB);
        };
        //查找开启列表中，F值最低的节点
        Astar.prototype.lowest_f_score = function (set, f_score) {
            var _a = [this.INF, null], lowest = _a[0], bestNode = _a[1];
            for (var k in set) {
                var node = set[k];
                var score = f_score[node.w + "_" + node.h];
                if (score < lowest) {
                    _b = [score, node], lowest = _b[0], bestNode = _b[1];
                }
            }
            return bestNode;
            var _b;
        };
        Astar.prototype.not_in = function (set, theNode) {
            for (var k in set) {
                var v = set[k];
                if (v.w == theNode.w && v.h == theNode.h && v.pos.x == theNode.pos.x && v.pos.y == theNode.pos.y) {
                    return false;
                }
            }
            return true;
            // if(set[theNode]){
            // 	return false
            // }
            // return true;
        };
        //从set中删除一个节点
        Astar.prototype.remove_node = function (set, theNode) {
            delete set[theNode.w + "_" + theNode.h];
        };
        //反向查找得到路径
        Astar.prototype.unwind_path = function (flat_path, map, current_node) {
            var aaa = [];
            if (map[current_node.w + "_" + current_node.h]) {
                flat_path.unshift(map[current_node.w + "_" + current_node.h]);
                return this.unwind_path(flat_path, map, map[current_node.w + "_" + current_node.h]);
            }
            else {
                return flat_path;
            }
        };
        Astar.prototype.table_num = function (set) {
            var count = 0;
            for (var k in set) {
                count = count + 1;
            }
            return count;
        };
        /**
         * 参数：star  开始点
         * goal  目标点
         * nodes 所有节点
         * valid_node_func 判断临近节点是否可用的函数
         */
        Astar.prototype.a_star = function (start, goal, find_Neighbors) {
            var closedset = {}; //关闭列表
            var openset = {}; //开启列表
            openset[start.w + "_" + start.h] = start;
            var came_from = {}; //记录节点的上一个节点
            var g_score = {};
            var f_score = {};
            g_score[start.w + "_" + start.h] = 0;
            f_score[start.w + "_" + start.h] = g_score[start.w + "_" + start.h] + this.heuristic_cost_estimate(start, goal); // F = G + H
            while (this.table_num(openset) > 0) {
                var current = this.lowest_f_score(openset, f_score); // 找到F最小值
                if (current == goal) {
                    var path = this.unwind_path([], came_from, goal);
                    path.push(goal);
                    return path;
                }
                //继续查找
                this.remove_node(openset, current); //从开启列表中删除选中节点
                closedset[current.w + "_" + current.h] = current;
                var neighbors = find_Neighbors(current); //获得当前节点的附近节点
                for (var k in neighbors) {
                    var neighbor = neighbors[k];
                    if (this.not_in(closedset, neighbor)) {
                        var tentative_g_score = g_score[current.w + "_" + current.h] + this.dist_betweenSqrt(current, neighbor);
                        if (this.not_in(openset, neighbor) || tentative_g_score < g_score[neighbor.w + "_" + neighbor.h]) {
                            came_from[neighbor.w + "_" + neighbor.h] = current; //记录父方格
                            g_score[neighbor.w + "_" + neighbor.h] = tentative_g_score;
                            f_score[neighbor.w + "_" + neighbor.h] = g_score[neighbor.w + "_" + neighbor.h] + this.heuristic_cost_estimate(neighbor, goal);
                            if (this.not_in(openset, neighbor)) {
                                openset[neighbor.w + "_" + neighbor.h] = neighbor;
                            }
                        }
                    }
                }
            }
            return null;
        };
        Astar.prototype.clear_cached_paths = function () {
            this.cachedPaths = null;
        };
        Astar.prototype.path = function (start, goal, ignore_cache, find_Neighbors) {
            if (!start) {
                return null;
            }
            if (!this.cachedPaths) {
                this.cachedPaths = {};
            }
            if (!this.cachedPaths[start.w + "_" + start.h]) {
                this.cachedPaths[start.w + "_" + start.h] = {};
            }
            else if (this.cachedPaths[start.w + "_" + start.h][goal.w + "_" + goal.h] && !ignore_cache) {
                return this.cachedPaths[start.w + "_" + start.h][goal.w + "_" + goal.h];
            }
            var newPath = this.a_star(start, goal, find_Neighbors);
            this.cachedPaths[start.w + "_" + start.h][goal.w + "_" + goal.h] = newPath; //存储缓存数据
            return newPath;
        };
        return Astar;
    }());
    zj.Astar = Astar;
    __reflect(Astar.prototype, "zj.Astar");
})(zj || (zj = {}));
//# sourceMappingURL=Astar.js.map