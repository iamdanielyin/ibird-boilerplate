/**
 * @api {GET} /:modelName 列表查询（默认）
 * @apiName ModelList
 * @apiDescription 模型默认列表查询接口
 * @apiGroup Model
 * @apiHeader {String="application/json"} Content-Type="application/json" 请求内容类型
 * @apiParam {String} modelName 模型/元数据名称（对应元数据结构中的name值）
 * @apiParam {String="PAGE","ALL"} range 查询模式（"PAGE"表示分页查询；"ALL"表示全部模式）
 * @apiParam {String} sort 排序字符串（指定排序的key值，格式为"-created,code"，负号开头表示逆序）
 * @apiParam {Number} page 页码（分页属性，从1开始，ALL模式可忽略）
 * @apiParam {Number} size 每页条数（分页属性，ALL模式可忽略）
 * @apiParam {String} project 字段过滤字符串（指定字段的key值；例如"code,name"，表示只返回"code"和"name"的字段；也可通过负号开头过滤某些字段"-password,-username"）
 * @apiParam {String} cond 查询条件字符串（JSON字符串格式，例如{"code":"123","name":"测试"}，其中"code"和"name"为属性key，可用的属性key请参考模型的元数据结构）
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
 *                   },
 *                   "creator": {
 *                       "type": "string",
 *                       "required": true,
 *                       "default": "super",
 *                       "displayName": "创建人"
 *                   },
 *                   "createdAt": {
 *                       "type": "number",
 *                       "displayName": "创建时间（Unix时间戳）"
 *                   },
 *                   "modifier": {
 *                       "type": "string",
 *                       "displayName": "修改人"
 *                   },
 *                   "updatedAt": {
 *                       "type": "number",
 *                       "displayName": "修改时间（Unix时间戳）"
 *                   },
 *                   "dr": {
 *                       "type": "boolean",
 *                       "default": false,
 *                       "displayName": "删除标记"
 *                   }
 *              }
 *           }
 *       }
 * @apiParamExample 常规查询示例
 *      操作符说明：
 *          $exists：是否存在
 *          $in：包含
 *          $nin：不包含
 * 
 *      示例列表：
 *          1.查询参数编码为"1001"且参数名称为"测试"的数据
 *              http://test.domain.com/api/param?cond={"code":"1001","name":"测试"}
 * 
 *          2.查询创建人和创建时间皆不为空的数据
 *              http://test.domain.com/api/param?cond={"creator":{"$exists":true},"createdAt":{"$exists":true}}
 * 
 *          3.查询参数编码为"1001"、"1008"或"b101"的数据
 *              http://test.domain.com/api/param?cond={"code":{"$in":["1001","1008","b101"]}}
 * 
 *          4.查询参数编码不为"1001"、"1008"或"b101"的数据
 *              http://test.domain.com/api/param?cond={"code":{"$nin":["1001","1008","b101"]}}
 * 
 * @apiParamExample 模糊查询示例
 *      操作符说明：
 *          $regex：正则表达式字符串，与"new RegExp(str)"所填写的部分"str"格式一致
 *          $options：i忽略大小写、m多行匹配、s允许使用点字符（"."）匹配包括换行符在内的所有字符
 * 
 *      示例列表：
 *          1.查询参数编码为"1001"且参数名称包含"Abc"关键字的数据（忽略大小写且匹配多行）
 *              http://test.domain.com/api/param?cond={"code":"1001","name":{"$regex":"Abc","$options":"mi"}}
 * 
 *          2.查询参数编码为"1001"且参数名称包含"Abc"的数据（忽略大小写）
 *              http://test.domain.com/api/param?cond={"code":"1001","name":{"$regex":"^Abc","$options":"i"}}
 * 
 *          3.查询参数编码为"1001"且参数名称以"abc"开头的数据
 *              http://test.domain.com/api/param?cond={"code":"1001","name":{"$regex":"^abc"}}
 * 
 *          4.查询参数编码为"1001"且参数名称以"abc"结尾的数据
 *              http://test.domain.com/api/param?cond={"code":"1001","name":{"$regex":"abc$"}}
 * 
 * @apiParamExample 分页查询
 *      场景说明：
 *          对于文档较多的集合，可通过分页依次查询所需数据，需要注意的是，分页时一般需要指定一个排序条件
 * 
 *      示例列表：
 *          1.按每页30条分页，并按创建时间逆序，查询第1页的数据
 *              http://test.domain.com/api/param?size=30&page=1&sort=-createdAt
 * 
 *          2.按每页50条分页，并按创建时间逆序，查询第19页的数据
 *              http://test.domain.com/api/param?size=50&page=19&sort=-createdAt
 * 
 *          3.查询创建时间大于"1513602998"的数据，并按每页50条分页，返回第3页的数据
 *              http://test.domain.com/api/param?cond={"createdAt":{"$gt":1513602998}}&size=50&page=3
 * 
 *          4.查询创建时间大于等于"1513602998"且修改时间小于等于"1514736000"的数据，并按每页50条分页，返回第19页的数据
 *              http://test.domain.com/api/param?size=50&page=19&cond={"$and":[{"createdAt":{"$gte":1513602998}},{"updatedAt":{"$lte":1513602998}}]}
 * 
 * @apiParamExample 排序查询
 *      示例列表：
 *          1.按每页30条分页，并按创建时间逆序，查询第1页的数据
 *              http://test.domain.com/api/param?size=30&page=1&sort=-createdAt
 * 
 *          2.查询创建时间大于"1513602998"的数据，按每页50条分页，再按创建时间逆序修改时间升序排列，返回第3页的数据
 *              http://test.domain.com/api/param?size=50&page=3&cond={"createdAt":{"$gt":1513602998}}&sort=-createdAt,updatedAt
 * 
 * @apiParamExample 指定字段查询
 *      场景说明：
 *          1.对于文档信息较大的数据，有时候只需要其中某几个字段时，则可通过指定返回字段进行查询；有时候需要把一些大数据量的字段给过滤掉，则可以忽略某几个字段；
 *          2.指定和过滤两种模式不能同时使用：project=code,name或project=-code,-name
 * 
 *      示例列表：
 *          1.按每页30条分页，并按创建时间逆序，查询第5页的数据，只查询参数编码和参数名称信息
 *              http://test.domain.com/api/param?size=30&page=5&sort=-createdAt&project=code,name
 * 
 *          2.按每页30条分页，并按创建时间逆序，查询第5页的数据，不查询参数值、创建人和创建时间信息
 *              http://test.domain.com/api/param?size=30&page=5&sort=-createdAt&project=-value,-creator,-createdAt
 * 
 * @apiParamExample 逻辑查询示例
 *      操作符说明：
 *          $or：并集查询，$or参数的值为数组结构，其中每个数组元素皆为一个查询条件，只要被查询数据满足数组中的任一条件，则返回数据，即表示查询所有数组元素匹配的并集
 *          $and：交集查询，$and参数的值也为数组结构，表示被查询数据必须满足数组中所有的条件才返回数据，即表示查询所有数组元素匹配的交集
 * 
 *      示例列表：
 *          1.查询参数编码为"1001"且参数名称包含"Abc"的数据（忽略大小写）或创建人和创建时间皆不为空的数据
 *              http://test.domain.com/api/param?cond={"$or":[{"code":"1001","name":{"$regex":"^Abc","$options":"i"}},{"creator":{"$exists":true},"createdAt":{"$exists":true}}]}
 * 
 *          2.查询创建人为"super"且参数编码为"1001"或参数名称为"1001"的数据
 *              http://test.domain.com/api/param?cond={"creator":"super","$or":[{"code":"1001"},{"name":"1001"}]}
 * 
 *          3.查询创建人为"super"、参数编码为"1001"和创建人为空、参数名称为"1001"的数据
 *              http://test.domain.com/api/param?cond={"$and":[{"creator":"super","code":"1001"},{"creator":{"$exists":false},"name":"1001"}]}
 * 
 *          4.查询在创建人为"super"的前提下，创建时间为空、参数编码为"1001"和修改时间不为空、参数名称为"1002"的数据
 *              http://test.domain.com/api/param?cond={"creator":"super","$and":[{"createdAt":{"$exists":false},"code":"1001"},{"updatedAt":{"$exists":true},"name":"1002"}]}
 * 
 * @apiParamExample 数值查询示例
 *      操作符说明：
 *          $gt：大于
 *          $gte：大于等于
 *          $lt：小于
 *          $lte：小于等于
 *          $eq：等于
 *          $ne：不等于
 * 
 *      示例列表：
 *          1.查询参数编码不等于"A1001"的数据
 *              http://test.domain.com/api/param?cond={"code":{"$eq":"A1001"}}
 * 
 *          2.查询删除标记不为"true"的数据
 *              http://test.domain.com/api/param?cond={"dr":{"$ne":true}}
 * 
 *          3.查询创建时间大于"1513602998"的数据
 *              http://test.domain.com/api/param?cond={"createdAt":{"$gt":1513602998}}
 * 
 *          4.查询创建时间大于等于"1513602998"且修改时间小于等于"1514736000"的数据
 *              http://test.domain.com/api/param?cond={"$and":[{"createdAt":{"$gte":1513602998}},{"updatedAt":{"$lte":1513602998}}]}
 *
 * @apiSuccess {Object} data 数据对象
 * @apiSuccess {String} data.range 查询模式（同请求参数）
 * @apiSuccess {Object} data.sort 排序字符串（解析后的sort参数，若请求中有传递sort参数但返回值为空，表示解析sort参数失败，请检查sort参数的格式是否正确）
 * @apiSuccess {Number} data.page 页码（同请求参数）
 * @apiSuccess {Number} data.size 每页条数（同请求参数）
 * @apiSuccess {Object} data.project 排序字符串（解析后的project参数，若请求中有传递project参数但返回值为空，表示解析project参数失败，请检查project参数的格式是否正确）
 * @apiSuccess {Object} data.cond 查询字符串（解析后的cond参数，若请求中有传递cond参数但返回值为空，表示解析cond参数失败，请检查cond参数的格式是否正确）
 * @apiSuccess {Array} data.list 列表数据（对象数组，具体的数据结构请查看参考模型的元数据信息）
 * @apiSuccess {Number} data.totalrecords 总数据条数
 * @apiSuccess {Number} data.totalpages 总页数（页属性，ALL模式可忽略）
 * @apiSuccessExample {json} 正常返回
 *   HTTP/1.1 200 OK
 *   {
 *       "data": {
 *           "cond": {
 *               "code": "1001"
 *           },
 *           "project": {
 *               "code": 1,
 *               "name": 1
 *           },
 *           "page": 1,
 *           "size": 20,
 *           "range": "PAGE",
 *           "sort": {
 *               "_id": 1
 *           },
 *           "list": [
 *               {
 *                   "_id": "5a376d27cd84d14e4446ce56",
 *                   "code": "1001",
 *                   "name": "测试名称"
 *               }
 *           ],
 *           "totalrecords": 1,
 *           "totalpages": 1
 *       }
 *   }
 */