/**
 * @api {GET} /:modelName/one 单个查询（默认）
 * @apiName ModelOne
 * @apiDescription 模型默认单个查询接口 - 该接口用法与列表接口基本一致，区别在于该接口始终只会返回一条数据
 * @apiGroup Model
 * @apiHeader {String="application/json"} Content-Type="application/json" 请求内容类型
 * @apiParam {String} modelName 模型/元数据名称（对应元数据结构中的name值）
 * @apiParam {String} project 字段过滤字符串，与列表接口格式完全一致
 * @apiParam {String} cond 查询条件字符串，与列表接口格式完全一致
 * @apiParamExample {json} 示例元数据结构
 *       {
 *           "name": "Param",
 *           "displayName": "系统参数",
 *           "jsonSchema": {
 *               "type": "object",
 *               "properties": {
 *                   "_id": {
 *                       "type": "string"
 *                   },
 *                   "code": {
 *                       "type": "string",
 *                       "required": true,
 *                       "displayName": "参数编码"
 *                   },
 *                   "name": {
 *                       "type": "string",
 *                       "required": true,
 *                      "displayName": "参数名称"
 *                   },
 *                   "value": {
 *                       "type": "any",
 *                       "required": true,
 *                       "displayName": "参数值"
 *                   }
 *              }
 *           }
 *       }
 * @apiParamExample 查询示例
 *      示例列表：
 *          1.查询参数编码为"1001"且参数名称为"测试"的数据
 *              http://test.domain.com/api/param/one?cond={"code":"1001","name":"测试"}
 * 
 *          2.查询参数编码和参数名称皆不为空的数据
 *              http://test.domain.com/api/param/one?cond={"code":{"$exists":true},"name":{"$exists":true}}
 * 
 *          3.查询参数编码为"1001"、"1008"或"b101"的数据
 *              http://test.domain.com/api/param/one?cond={"code":{"$in":["1001","1008","b101"]}}
 * 
 *          4.查询参数编码不为"1001"、"1008"或"b101"的数据
 *              http://test.domain.com/api/param/one?cond={"code":{"$nin":["1001","1008","b101"]}}
 * 
 *          5.只查询参数编码和参数名称信息
 *              http://test.domain.com/api/param/one?project=code,name
 * 
 * @apiSuccess {Object} data 数据对象（具体的数据结构请查看参考模型的元数据信息）
 * @apiSuccessExample {json} 正常返回
 *   HTTP/1.1 200 OK
 *   {
 *       "data": {
 *           "_id": "xxx",
 *           "code": "xxx",
 *           "name": "xxx",
 *           "value": "xxx"
 *       }
 *   }
 */