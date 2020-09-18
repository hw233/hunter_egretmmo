namespace zj {
export class StageRoleMobLocal extends StageRoleMobCommon{
	public constructor(node, aiTag, roleId) {
		super( node, aiTag, roleId);
	}
	public getDbInstance(){
		
		return TableClientMonsterLocal.Item(this.roleId);
	}
}
}