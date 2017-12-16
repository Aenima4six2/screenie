const mongooseService = require('../mongooseService')
const sequelizeService = require('../sequelizeService')

module.exports = {
  getRebalanceSetting: () => mongooseService.getModel('RebalanceSetting'),
  getRebalanceSettingTemplate: () => mongooseService.getModel('RebalanceSettingTemplate'),
  getRebalanceSettingScope: () => mongooseService.getModel('RebalanceSettingScope'),
  getRebalanceSettingValueType: () => mongooseService.getModel('RebalanceSettingValueType'),
  getClient: async (firmId) => sequelizeService.getModel('Client', require('../schema/Client').schema, firmId),
  getProgram: async (firmId) => sequelizeService.getModel('Program', require('../schema/Program').schema, firmId),
  getRebalanceModel: () => mongooseService.getModel('RebalanceModel'),
  getRebalanceSqlModel: async (firmId) => sequelizeService.getModel('Model', require('../schema/RebalanceSqlModel').schema, firmId),
  getRebalanceAssignment: async (firmId) => sequelizeService.getModel('ModelAssignment', require('../schema/RebalanceAssignment').schema, firmId),
  getRebalanceModelHierarchy: () => mongooseService.getModel('RebalanceModelHierarchy'),
  getRebalanceModelLevel: () => mongooseService.getModel('RebalanceModelLevel')
}


