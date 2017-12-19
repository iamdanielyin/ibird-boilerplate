/**
 * @api {DELETE} /:modelName 删除接口（默认）
 * @apiName ModelRemove
 * @apiDescription 模型默认删除接口
 * @apiGroup Model
 * @apiParam {String} modelName 模型/元数据名称（对应元数据结构中的name值）
 * @apiHeader {String="application/json"} Content-Type="application/json" 请求内容类型
 * @apiParam {Object} cond 删除条件（与查询接口的格式基本一致，区别在于这里是且只能是对象结构，这里只能是对象结构，对象结构，对象结构）
 * @apiParam {Object} [options] 删除选项
 * @apiParam {Boolean} [options.multi] 是否批量删除（默认只会删除一条记录）
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
 * @apiParamExample 删除示例
 *      示例列表：
 *          1.删除操作
 *              {
 *                  "cond": {
 *                      "_id": "5a37e9cd310819001a4cdb8f"
 *                  }
 *              }
 * 
 * @apiSuccess {Object} data 删除结果对象（当ok为1且n大于等于1时，表示删除成功）
 * @apiSuccess {Number} data.ok 删除命令执行状态，当值为1时，仅表示命令执行成功但并不确保数据已删除
 * @apiSuccess {Number} data.n 被删除的数据条数
 * @apiSuccessExample {json} 正常返回
 *   HTTP/1.1 200 OK
 *   {
 *       "data": {
 *          "n": 1,
 *          "ok": 1
 *       }
 *   }
 * @apiSampleRequest off
 */