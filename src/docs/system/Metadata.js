/**
 * @api {GET} /metadata 模型元数据查询
 * @apiName Metadata
 * @apiDescription 该接口主要用于在调用模型默认接口时，查询模型的字段结构
 * @apiGroup System
 *
 * @apiParam {String} [name] 模型名称（不指定"name"则返回系统内所有的元数据）
 *
 * @apiSuccess {Object} data 数据对象（注意：该字段为对象或数组类型；当有指定"name"查询时，返回对象结构；当不指定"name"时，返回对象数组结构）
 * @apiSuccess {Object} data.name 模型名称
 * @apiSuccess {Object} data.displayName 模型显示名
 * @apiSuccess {Object} data.jsonSchema 模型的元数据结构（为JSON-Schema格式）
 * @apiSuccessExample {json} 正常返回
 *   HTTP/1.1 200 OK
 *   {
 *       "data": {
 *           "name": "Param",
 *           "displayName": "系统参数",
 *           "jsonSchema": { ... }
 *       }
 *   }
 */