var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * Astar寻路算法类
     * zhaiweili
     * 2019.10.24
     */
    var TiledAstar = (function () {
        function TiledAstar() {
        }
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
        TiledAstar.getPath = function (startX, startY, endX, endY, tileW, tileH, blocks) {
            // 按地图块获取寻路路径集合
            var list = this.getPathTiled(Math.floor(startX / tileW), Math.floor(startY / tileH), Math.floor(endX / tileW), Math.floor(endY / tileH), blocks);
            if (list) {
                // 将地图块集合转化为点集合
                var offx = startX % tileW;
                var offy = startY % tileH;
                var result = [];
                for (var i = 0; i < list.length; ++i) {
                    var node = list[i];
                    var pos = zj.PoolManager.getInstance().getPoint(node.idxX * tileW + offx, node.idxY * tileH + offy);
                    result.push(pos);
                }
                result.push(zj.PoolManager.getInstance().getPoint(endX, endY));
                return result;
            }
            return null;
        };
        /**
         * startX：起始X轴块索引
         * startY：起始Y轴块索引
         * endX： 目标点X轴块索引
         * endY： 目标点Y轴块索引
         */
        TiledAstar.getPathTiled = function (startX, startY, endX, endY, blocks) {
            this.cacheIdx = 0;
            this.checkList = [];
            var nodeStart = this.getNode(null, -1, startX, startY, endX, endY);
            var endNode = this.getPathLogic(nodeStart, endX, endY, blocks);
            if (endNode) {
                var list = [];
                while (endNode.father) {
                    if (endNode.father == nodeStart) {
                        break;
                    }
                    else {
                        list.splice(0, 0, endNode.father);
                        endNode = endNode.father;
                    }
                }
                return this.optimizeNode(list);
            }
            return null;
        };
        TiledAstar.getPathLogic = function (node, endX, endY, blocks) {
            if (node.idxX == endX && node.idxY == endY) {
                return node;
            }
            this.checkPosAround(node, endX, endY, blocks);
            if (this.checkList.length > 0) {
                return this.getPathLogic(this.checkList.pop(), endX, endY, blocks);
            }
            return null;
        };
        // 检测node周围的节点
        TiledAstar.checkPosAround = function (node, endX, endY, blocks) {
            var idx = node.idxX;
            var idy = node.idxY;
            var list = this.posTemp;
            var nx = 0;
            var ny = 0;
            var type = 0;
            for (var i = 0; i < list.length; ++i) {
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
        };
        /**
         * 将点加入到待检测集合，距离最短的放最后，优先检测
         */
        TiledAstar.addNode = function (father, face, idxX, idxY, endX, endY) {
            var node = this.getNode(father, face, idxX, idxY, endX, endY);
            var islast = true;
            for (var i = this.checkList.length - 1; i >= 0; --i) {
                if (node.getPdisAll() < this.checkList[i].getPdisAll()) {
                    if (islast) {
                        this.checkList.push(node);
                    }
                    else {
                        this.checkList.splice(i + 1, 0, node);
                    }
                    return;
                }
                islast = false;
            }
            this.checkList.splice(0, 0, node);
        };
        // 检测块是否在地图中
        TiledAstar.isInSize = function (nx, ny, blocks) {
            return nx >= 0 && ny >= 0 && nx < blocks.length && ny < blocks[nx].length;
        };
        /**
         * 从对象池获取节点对象
         */
        TiledAstar.getNode = function (father, face, idxX, idxY, endX, endY) {
            var node = null;
            if (this.cacheIdx < this.astarNodeCache.length) {
                node = this.astarNodeCache[this.cacheIdx];
                this.cacheIdx++;
            }
            else {
                node = new AstarNode();
                this.astarNodeCache.push(node);
                this.cacheIdx = this.astarNodeCache.length;
            }
            node.setTo(father, face, idxX, idxY, endX, endY);
            return node;
        };
        /**
         * 优化路径集合（如果相邻的3个节点在同一条线上，则删掉中间的节点，减少移动节点）
         */
        TiledAstar.optimizeNode = function (list) {
            if (list.length > 2) {
                for (var i = list.length - 2; i > 0; --i) {
                    var qian = list[i - 1];
                    var curr = list[i];
                    var hou = list[i + 1];
                    if (qian.face == curr.face && curr.face == hou.face) {
                        list.splice(i, 1);
                    }
                    else if ((qian.idxX == curr.idxX && curr.idxX == hou.idxX)
                        || (qian.idxY == curr.idxY && curr.idxY == hou.idxY)) {
                        list.splice(i, 1);
                    }
                }
            }
            return list;
        };
        // 8方向检测
        TiledAstar.posTemp = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
        TiledAstar.astarNodeCache = []; // 点对象池
        TiledAstar.cacheIdx = 0;
        return TiledAstar;
    }());
    zj.TiledAstar = TiledAstar;
    __reflect(TiledAstar.prototype, "zj.TiledAstar");
    var AstarNode = (function () {
        function AstarNode() {
        }
        AstarNode.prototype.setTo = function (father, face, idxX, idxY, endX, endY) {
            this.father = father;
            this.face = face;
            this.idxX = idxX;
            this.idxY = idxY;
            this.pdisStart = 0;
            if (father) {
                this.pdisStart = father.pdisStart + this.pDisPoint(idxX * 10, idxY * 10, father.idxX * 10, father.idxY * 10);
            }
            this.pdis = this.pDisPoint(idxX * 10, idxY * 10, endX * 10, endY * 10);
            return this;
        };
        AstarNode.prototype.getPdisAll = function () {
            return this.pdisStart + this.pdis;
        };
        AstarNode.prototype.pDisPoint = function (x1, y1, x2, y2) {
            return Math.pow(Math.abs((x1 - x2) * (x1 - x2)) + Math.abs((y1 - y2) * (y1 - y2)), 0.5);
        };
        return AstarNode;
    }());
    zj.AstarNode = AstarNode;
    __reflect(AstarNode.prototype, "zj.AstarNode");
})(zj || (zj = {}));
//# sourceMappingURL=TiledAstar.js.map