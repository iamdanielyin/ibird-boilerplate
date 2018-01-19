/**
 * @api {GET} /:modelName/id ID查询（默认）
 * @apiName ModelId
 * @apiDescription 模型默认ID查询接口 - 该接口只能根据ID进行查询
 * @apiGroup Model
 * @apiHeader {String="application/json"} Content-Type="application/json" 请求内容类型
 * @apiParam {String} modelName 模型/元数据名称（对应元数据结构中的name值）
 * @apiParam {String} val 数据ID
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
 *          1.查询ID为"5a376d27cd84d14e4446ce56"的数据
 *              http://test.domain.com/api/param/id?val=5a376d27cd84d14e4446ce56
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