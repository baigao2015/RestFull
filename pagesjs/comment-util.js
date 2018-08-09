
/**
 * 转换为字符
 * @param v {object}
 * @returns {string}
 */
function toString(v) {
	return Object.prototype.toString.apply(v);
}
/**
 * 判断值是否已定义
 * @param v {*}
 * @returns {boolean}
 */
function isDefined(v) {
	return typeof v !== 'undefined';
}
/**
 * 是否为空
 * @param v  {*} 值
 * @param allowBlank {boolean} 是否允许空
 * @returns {boolean|*}
 */
function isEmpty(v, allowBlank) {
	return v === null || v === undefined
			|| String(v).toUpperCase() === 'NULL'
			|| ((isArray(v) && !v.length))
			|| (!allowBlank ? v === '' : false);
}
/**
 * 是否是数组
 * @param v
 * @returns {boolean}
 */
 function isArray(v) {
	return toString(v) === '[object Array]';
}
/**
     * 是否是日期
     * @param v
     * @returns {boolean}
     */
function isDate(v) {
	return toString(v) === '[object Date]';
}
/**
 * 是否是对象
 * @param v
 * @returns {boolean}
 */
function isObject(v) {
	return !!v && toString(v) === '[object Object]';
}
/**
 * 是否是函数
 * @param v
 * @returns {boolean}
 */
function isFunction(v) {
	return toString(v) === '[object Function]';
}
///**
// * 是否是数值型
// * @param v
// * @returns {boolean}
// */
//isNumber : function(v) {
//	return typeof v === 'number' && isFinite(v);
//}
///**
// * 是否是字符型
// * @param v
// * @returns {boolean}
// */
//isString : function(v) {
//	return typeof v === 'string';
//}
///**
// * 是否是布尔型
// * @param v
// * @returns {boolean}
// */
//isBoolean : function(v) {
//	return typeof v === 'boolean';
//}
///**
// * 是否是原始类型
// * @param v
// * @returns {*|boolean}
// */
//isPrimitive : function(v) {
//	return Fw.isString(v) || Fw.isNumber(v) || Fw.isBoolean(v);
//}
///**
// * 是否可迭代
// * @param v
// * @returns {*}
// */
//isIterable : function(v) {
//	return (v && typeof v !== 'string') ? Fw.isDefined(v.length) : false;
//}
///**
// * 是否是URL
// * @param v
// * @returns {boolean}
// */
//isUrl : function(v) {
//	return /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST|127.0.0.1))\/?)/i
//			.test(v);
//}