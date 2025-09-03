import {Roles} from '../role.models.js'
import {Users} from '../user.models.js'

Roles.hasMany(Users, { foreignKey: "role_id" })
Users.belongsTo(Roles, { foreignKey: "role_id" })

export {Roles,Users}