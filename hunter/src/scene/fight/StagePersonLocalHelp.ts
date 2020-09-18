namespace zj {
/**援助类,继承人物类 */
export class StagePersonLocalHelp extends StagePersonLocal{
	public constructor(node, aiTag) {
		super(node, aiTag);
		this.setRoleType( TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP );
		this.senderRole = null;
		this.bHasHelped = false;
	}
	public bHasHelped;

	public loadHpDc(){

	}
	public beEffectHurt( effect, character, point ){
		return [false, 0];
	}
	public beHurtCommon( belongSkill, character, atkType, hurt, hitId, sizeTbl, priority, numX, numY, bTarget, point, effect ){
		let hurtValue = 0;
		this.dealHit( character,hitId, sizeTbl );
		this.dealHurtState( priority, hurt, character );
		return [true, hurtValue];
	}
	public beRebounded( atkType, hurtValue, character ){

	}
	public openRageLimit(){
		this.SetAttrib("curRage", this.attribs.maxRage);
	}
	public finishSkill(){
		super.finishSkill();
		this.setVisible(false);
		this.fightScene.endHelp();
	}
	public setHasHelped(tag){
		this.bHasHelped = tag;
	}
	public isHasHelped(){
		return this.bHasHelped;
	}
	//设置发号使令武将
	public setSenderRole( role ){
		this.senderRole = role;
	}
	public isPlaySkillLegeal(){
		if(this.bPauseBlack == true){
			return false
		}
		return true;
	}
}
}