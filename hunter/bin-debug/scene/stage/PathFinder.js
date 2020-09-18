var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    //A*寻路器
    var PathFinder = (function () {
        function PathFinder() {
        }
        PathFinder.findBeginBlock = function (pos, blocks, beforPath, isFly) {
            if (beforPath) {
                var point = beforPath.currentWayPoint();
                if (point) {
                    return PathFinder.findClosetBlock(point, blocks, isFly);
                }
            }
            return PathFinder.findClosetBlock(pos, blocks, isFly);
        };
        //找到离坐标最近的地块
        PathFinder.findClosetBlock = function (pos, blocks, isFly) {
            var actorWNum = (pos.x + zj.ConstantConfig_RoleBattle.ROOM_BLOCK_WIDTH_HALF) / this.Block_Width;
            var actorHNum = (pos.y + zj.ConstantConfig_RoleBattle.ROOM_BLOCK_WIDTH_HALF) / this.Block_Width; //PlayerWonderLandSystem.MapHeight-
            var wNum = Math.floor(actorWNum);
            var hNum = Math.floor(actorHNum);
            if (wNum != actorWNum || hNum != actorHNum) {
                return PathFinder.find_(wNum, hNum, blocks, pos);
            }
            else {
                var key = zj.Helper.StringFormat("%d_%d", wNum, hNum);
                return blocks[key];
            }
        };
        PathFinder.find_ = function (wNum, hNum, blocks, pos) {
            var distanceSqrt = 99999999999;
            var resultBlock;
            for (var addW = 1; addW <= 2; addW++) {
                for (var addH = 1; addH <= 2; addH++) {
                    var _a = [wNum + (addW - 1), hNum + (addH - 1)], w = _a[0], h = _a[1];
                    var blockName = zj.Helper.StringFormat("%d_%d", w, h);
                    var block = blocks[blockName];
                    if (block && (block.couldCross || null)) {
                        // let aaaa = egret.Point.distance(block.pos,pos);
                        // let bbbb=Math.sqrt(block.pos.x-pos.x)+Math.sqrt(block.pos.y-pos.y);
                        //let newDisSqrt = (block.pos.x-pos.x) * (block.pos.x-pos.x) + (block.pos.y-pos.y) * (block.pos.y-pos.y);
                        var newDisSqrt = egret.Point.distance(block.pos, pos);
                        if (distanceSqrt > newDisSqrt) {
                            resultBlock = block;
                            distanceSqrt = newDisSqrt;
                        }
                    }
                }
            }
            return resultBlock;
        };
        //判断地块的可通过性
        PathFinder.jugeNeighbor = function (w, h, nodes, neighbors, isFly) {
            var nodeName = zj.Helper.StringFormat("%d_%d", w, h);
            var neighborNode = nodes[nodeName];
            if (neighborNode && (isFly || neighborNode.couldCross)) {
                neighbors.push(neighborNode);
                return true;
            }
            return false;
        };
        //查找地块附近可用的地块
        //theBlock - 需要判定的地块
        //blocks - 所有地块
        //isFly - 飞行，是否无视障碍物
        PathFinder.neighbors = function (theBlock, blocks, isFly) {
            var neighbors = [];
            //首先取出附近的8个节点。
            var left_top = true;
            var left_down = true;
            var right_top = true;
            var right_down = true;
            //left
            if (!PathFinder.jugeNeighbor(theBlock.w - 1, theBlock.h, blocks, neighbors, isFly)) {
                left_top = false;
                left_down = false;
            }
            //right
            if (!PathFinder.jugeNeighbor(theBlock.w + 1, theBlock.h, blocks, neighbors, isFly)) {
                right_top = false;
                right_down = false;
            }
            //top
            if (!PathFinder.jugeNeighbor(theBlock.w, theBlock.h + 1, blocks, neighbors, isFly)) {
                left_top = false;
                right_top = false;
            }
            //down
            if (!PathFinder.jugeNeighbor(theBlock.w, theBlock.h - 1, blocks, neighbors, isFly)) {
                left_down = false;
                right_down = false;
            }
            //top-left
            if (left_top) {
                PathFinder.jugeNeighbor(theBlock.w - 1, theBlock.h + 1, blocks, neighbors, isFly);
            }
            //down-left
            if (left_down) {
                PathFinder.jugeNeighbor(theBlock.w - 1, theBlock.h - 1, blocks, neighbors, isFly);
            }
            //top-right
            if (right_top) {
                PathFinder.jugeNeighbor(theBlock.w + 1, theBlock.h + 1, blocks, neighbors, isFly);
            }
            //down-right
            if (right_down) {
                PathFinder.jugeNeighbor(theBlock.w + 1, theBlock.h - 1, blocks, neighbors, isFly);
            }
            return neighbors;
        };
        PathFinder.calculate = function (beginPos, targetPos, blocks, isFly, beforePath) {
            //1.找到开始节点，以actor所在位置，寻找附近最近的节点block
            var beginBlock = PathFinder.findBeginBlock(beginPos, blocks, beforePath, isFly);
            //2.找到结束节点
            var endBlock = PathFinder.findClosetBlock(targetPos, blocks, isFly);
            //3.使用A*查找路线
            var blockPaths = zj.Astar.getInstance().path(beginBlock, endBlock, false, function (theBlock) {
                return PathFinder.neighbors(theBlock, blocks, isFly);
            });
            //4.构建Path结构数据
            if (!blockPaths || zj.Helper.getObjLen(blockPaths) == 0) {
                return null; //A*寻路没有找到可用的路线
            }
            var path = new zj.Path();
            for (var i = 0; i < blockPaths.length; i++) {
                var block = blockPaths[i];
                path.addWayPoint(block.pos);
            }
            //7.将最终的终点加入到Path里面
            path.addWayPoint(targetPos);
            return path;
        };
        PathFinder.PathFinder = {};
        PathFinder.Block_Width = 80;
        return PathFinder;
    }());
    zj.PathFinder = PathFinder;
    __reflect(PathFinder.prototype, "zj.PathFinder");
})(zj || (zj = {}));
//# sourceMappingURL=PathFinder.js.map