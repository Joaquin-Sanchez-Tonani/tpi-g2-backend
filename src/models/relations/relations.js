import { Appointments } from '../appointment.models.js'
import {Roles} from '../role.models.js'
import { Specialties } from '../specialties.models.js'
import { Times } from '../time.models.js'
import {Users} from '../user.models.js'

Roles.hasMany(Users, { foreignKey: "role_id" })
Users.belongsTo(Roles, { foreignKey: "role_id" })
Specialties.hasMany(Users, { foreignKey: "specialty_id"})
Users.belongsTo(Specialties, { foreignKey: "specialty_id"})
Times.hasMany(Appointments, { foreignKey: "time_id"})
Appointments.belongsTo(Times, { foreignKey: "time_id"})
export {Roles,Users,Specialties,Times,Appointments}