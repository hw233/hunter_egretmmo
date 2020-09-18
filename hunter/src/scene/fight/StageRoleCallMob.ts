namespace zj {
//玩家召唤出来的怪
export class StageRoleCallMob extends StageRoleMob{
    constructor(node, aiTag, roleId)
    {
        super(node, aiTag, roleId);
		this.setRoleType( TableEnum.TableEnumRoleType.ROLE_TYPE_CALL );

		this.father = null
		this.skill_level = null
		this.expandTime = 0;
		this.leftTime = -1;
		this.bCall = true;
    }
	public father;
	public skill_level;
	public expandTime;
	public leftTime;
}
}