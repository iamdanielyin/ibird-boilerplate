/**
 * @api {PUT} /:modelName 修改接口（默认）
 * @apiName ModelUpdate
 * @apiDescription 模型默认修改接口
 * @apiGroup Model
 * @apiParam {String} modelName 模型/元数据名称（对应元数据结构中的name值）
 * @apiHeader {String="application/json"} Content-Type="application/json" 请求内容类型
 * @apiParam {Object} cond 更新条件（与查询接口的格式基本一致，区别在于这里是且只能是对象结构，这里只能是对象结构，对象结构，对象结构）
 * @apiParam {Object} doc 更新对象（填写你需要更新的字段，也只能是对象结构；注意：不需要提供所有字段，只需提供被更新的字段，被更新的字段，被更新的字段即可）
 * @apiParam {Object} [options] 额外选项
 * @apiParam {Boolean} [options.multi] 是否批量更新（默认只会更新一条记录）
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
 * @apiParamExample 修改示例
 *      示例列表：
 *          1.修改操作
 *              {
 *                  "cond": {
 *                      "_id": "5a37e9cd310819001a4cdb8f"
 *                  },
 *                  "doc": {
 *                      "name": "参数A003",
 *                      "value": "参数值A3"
 *                  }
 *              }
 * 
 * @apiSuccess {Object} data 更新后的数据对象（具体的数据结构请查看参考模型的元数据信息）
 * @apiSuccessExample {json} 正常返回
 *   HTTP/1.1 200 OK
 *   {
 *       "data": {
 *          "_id": "5a37e9cd310819001a4cdb8f",
 *          "code": "1003",
 *          "name": "参数A003",
 *          "value": "参数值A3"
 *       }
 *   }
 * @apiSampleRequest off
 */