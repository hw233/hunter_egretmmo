namespace zj {
//普通怪物类，继承怪物类
export class StageRoleMobCommon extends StageRoleMob{
    constructor(node, aiTag, roleId){
        super(node, aiTag, roleId);
		this.setRoleType( TableEnum.TableEnumRoleType.ROLE_TYPE_MOB );
    }
	public loadStorageSpx( ){
		
	}
}
}