namespace zj {
export class Path {
	public constructor() {
	}
	public static WayPointSeekDistSq = Math.pow(30,2);
	public wayPoints_ = [];
	public curWayPointIndex_ = 0;
	public isLoop_ = false;
	public isFinished_ = false;

	public currentWayPoint(){
		return this.wayPoints_[this.curWayPointIndex_];
	}
	//当前目标点是否是组后一个路径点
	public isLastPoint(){
		return (this.curWayPointIndex_ == this.wayPoints_.length - 1) && (! this.isLoop_);
	}
	//是否完成所有路径
	public finished(){
		return this.isFinished_;
	}
	public addWayPoint(newPoint){
		this.wayPoints_[this.wayPoints_.length] = newPoint;
	}
	public setWayPoints(points){
		this.wayPoints_ = points;
	}
	public setIsLoop(b){
		this.isLoop_ = b;
	}
	public clear(){
		this.wayPoints_ = [];
	}
	public getWayPoints(){
		return this.wayPoints_;
	}
	public getLastPoint(){
		return this.wayPoints_[this.wayPoints_.length - 1];
	}
	public goToNextWayPoint(){
		let num = this.wayPoints_.length - 1;
		this.curWayPointIndex_  = this.curWayPointIndex_  + 1;
		if(this.curWayPointIndex_  > num){
			if(this.isLoop_){
				this.curWayPointIndex_  = 0;
			}else{
				this.isFinished_ = true;
			}
		}else{
			this.isFinished_ = false;
		}
	}
	public isArrivedCurrentPoint(pos){
		let distanceSqrt = Math.pow(egret.Point.distance(this.currentWayPoint(),pos),2);
		return distanceSqrt < Path.WayPointSeekDistSq;
	}
}
}