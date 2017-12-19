/**
 * @api {POST} /:modelName 新增接口（默认）
 * @apiName ModelCreate
 * @apiDescription 模型默认新增接口 - 该接口无法在线测试，请直接按照元数据结构指定请求体接口；请求体可为对象或者对象数组结构，分别表示单个新增和批量新增
 * @apiGroup Model
 * @apiParam {String} modelName 模型/元数据名称（对应元数据结构中的name值）
 * @apiHeader {String="application/json"} Content-Type="application/json" 请求内容类型
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
 * @apiParamExample 新增示例
 *      示例列表：
 *          1.单个新增
 *              {
 *                 "code": "xxx",
 *                 "name": "xxx",
 *                 "value": "xxx"
 *              }
 * 
 *          2.批量新增
 *              [
 *                  {
 *                      "code": "xxx",
 *                      "name": "xxx",
 *                      "value": "xxx"
 *                  },
 *                  {
 *                      "code": "xxx",
 *                      "name": "xxx",
 *                      "value": "xxx"
 *                  }
 *              ]
 * 
 * @apiSuccess {Array} data 数据对象（不论是单个新增还是批量新增，都统一返回对象数组；具体的数据结构请查看参考模型的元数据信息）
 * @apiSuccessExample {json} 正常返回
 *   HTTP/1.1 200 OK
 *   {
 *       "data": [
 *           {
 *              "_id": "xxx",
 *              "code": "xxx",
 *              "name": "xxx",
 *              "value": "xxx"
 *           },
 *           {
 *              "_id": "xxx",
 *              "code": "xxx",
 *              "name": "xxx",
 *              "value": "xxx"
 *           }
 *      ]
 *   }
 * @apiSampleRequest off
 */