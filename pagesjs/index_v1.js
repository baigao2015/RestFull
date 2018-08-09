
var methodDatas = [
		    	{"option": "GET","text": "GET"},
		    	{"option": "POST","text": "POST"},
		    	{"option": "PUT","text": "PUT"},
		    	{"option": "GET","text": "GET"},
		    	{"option": "PATCH","text": "PATCH"},
		    	{"option": "DELETE","text": "DELETE"},
		    	{"option": "COPY","text": "COPY"},
		    	{"option": "HEAD","text": "HEAD"},
		    	{"option": "OPTIONS","text": "OPTIONS"},
		    	{"option": "LINK","text": "LINK"},
		    	{"option": "ULINK","text": "ULINK"},
		    	{"option": "PURGE","text": "PURGE"},
		    	{"option": "LOCK","text": "LOCK"},
		    	{"option": "UNLOCK","text": "UNLOCK"},
		    	{"option": "PROPFIND","text": "PROPFIND"},
		    	{"option": "VIEW","text": "VIEW"}
			 ];

/**
 * 新增 key--value  的输入框
 * @param {Object} v
 */
function createNextDivRowHtmlParams(v) {
	var inputId = $(v).attr('id');
	$headerVid = $(v).parent().parent().parent(); // 获取当前行div的ID名称
	
	if(inputId == 'params_row_val' || inputId == 'params_row_key') {
		var rowIndex = $headerVid.index() + 1;
		var nextDivhtml = ''
		+'<div class="row" id="params_row_'+ rowIndex +'">'
        +'    <div class="col-sm-4">'
        +'		<div class="m-b">'
        +'        	<input type="text" id="params_row_key_'+ rowIndex +'" placeholder="key" class="form-control" onpropertychange="getDivParams(this)" oninput="getDivParams(this)">'
        +'      </div>'
        +'    </div>'
        +'    <div class="col-sm-7">'
        +'		<div class="input-group m-b">'
        +'          <input type="text" id="params_row_val_'+ rowIndex +'" placeholder="value" class="form-control" onpropertychange="getDivParams(this)" oninput="getDivParams(this)">'
        +'			<span class="input-group-addon" style="border: none;" onclick="moveDivRowHtml(this)"><i class="fa fa-ellipsis-v"></i></span>' // 拖动上下顺序按钮
        +'			<span class="input-group-addon" style="padding: 0px 1px 0 5px; border: none;" onclick="removeDivRowHtml(this)"><i class="fa fa-close"></i></span>'
        +'       </div>'
        +'   </div>'
        +'</div>';
		
		$headerVid.before(nextDivhtml);
		
		inputId == 'params_row_val' ? $('#params_row_val_'+ rowIndex +'').focus() : $('#params_row_key_'+ rowIndex +'').focus();
	}
	
	// 暂存params 参数
	var urlParamsPrev = isEmpty($('#url-input').val()) ? "" : $('#url-input').val();
	
	if(urlParamsPrev.indexOf("?") > 0) {
		urlParamsPrev = urlParamsPrev.substring(urlParamsPrev.indexOf("?") + 1, urlParamsPrev.length);
		$('#url-input_params').val(urlParamsPrev);
	} else {
		$('#url-input_params').val('');
	}
}

/**
 * 获取 key--value 拼装参数赋值给url
 * @param {Object} v
 */
function getDivParams(v) {
	var dynamicParam = $(v).val();
	var url = $('#url-input').val();

	var paramsTemp = '';
	var testRegExp = new RegExp('_row_key_');
	var testRegExp2 = new RegExp('_row_val_');
	
	if(testRegExp.test($(v).attr('id'))) {
		paramsTemp+=dynamicParam;
	}

	if(testRegExp2.test($(v).attr('id'))) {
		var paramKey = $(v).parent().parent().prev().find('input').val();
		if(paramKey) {
			paramsTemp+= paramKey + '=' +dynamicParam;
		}
	}
	
	var paramsPrev = isEmpty($('#url-input_params').val()) ? "" : ($('#url-input_params').val() + "&");
	$('#url-input').val('');
	$('#url-input').val($('#url-input_temp').val() + "?"+ paramsPrev + paramsTemp);
}

/**
 * 新增 key--value  的输入框
 * @param {Object} v
 */
function createNextDivRowHtml(v) {
	var inputId = $(v).attr('id');
	$headerVid = $(v).parent().parent().parent(); // 获取当前行div的ID名称
	
	if(inputId == 'header_row_val' || inputId == 'header_row_key') {
		var rowIndex = $headerVid.index() + 1;
		var nextDivhtml = ''
		+'<div class="row" id="header_row_'+ rowIndex +'">'
        +'    <div class="col-sm-4">'
        +'		<div class="input-group m-b">'
        +'			<span class="input-group-addon" style="padding: 0px 5px 0 1px; border: none;"><i class="fa fa-check-circle"></i></span>'
        +'        	<input type="text" id="header_row_key_'+ rowIndex +'" placeholder="key" class="form-control" onfocus="createNextDivRowHtml(this)">'
        +'       </div>'
        +'    </div>'
        +'    <div class="col-sm-8">'
        +'		<div class="input-group m-b">'
        +'          <input type="text" id="header_row_val_'+ rowIndex +'" placeholder="value" class="form-control" onfocus="createNextDivRowHtml(this)">'
        +'			<span class="input-group-addon" style="padding: 0px 1px 0 5px; border: none;" onclick="removeDivRowHtml(this)"><i class="fa fa-close"></i></span>'
        +'       </div>'
        +'   </div>'
        +'</div>';
		
		$headerVid.before(nextDivhtml);
		
		inputId == 'header_row_val' ? $('#header_row_val_'+ rowIndex +'').focus() : $('#header_row_key_'+ rowIndex +'').focus();
	}
}

/**
 * 删除对应 key--value 的输入框
 * @param {Object} v
 */
function removeDivRowHtml(v) {
	$headerVid = $(v).parent().parent().parent(); // 获取当前行div的ID名称

	if($headerVid.next().length < 1) {
		// 只剩下一条时，只做清空处理
		$headerVid.find('input').val('');
	} else {
		$(v).parent().parent().parent().remove();
	}
}

function editParam2DivRows(v) {
	
	var setparamsInDiv = $(v).attr('name'); //设置在哪个模块里header/params/.....
	var testRegExp = new RegExp('params');
	
	if(testRegExp.test(setparamsInDiv)) {
	    $('#'+ setparamsInDiv +'_content_params').show();
	    $('#'+ setparamsInDiv +'_content').hide();
	} else { // header
		setDivParamsJsonObj2Textarea(getDivParams2Json());
		$('#header_content').hide();
		$('#header_content_params').show();
	}
	
}

/**
 * 获取textarea内容设置到html key--value中
 */
function setParams2Html(v) {
	
	var setparamsInDiv = $(v).attr('name'); //设置在哪个模块里header/params/.....
	var testRegExp = new RegExp('params');
	
	var textVal = $("#params_key2val").val();
	parJson(textVal);
	
	var arrayVals = [];
		arrayVals = textVal.split('\n'); // 以换行未分隔符，将内容分割成数组
	
	var nextDivhtml = '';
	
	$.each(arrayVals, function(index, val) {
		var indexNum = val.indexOf(':');
		var rowIndex = index;
		var rowKey = val.substr(0, indexNum), rowVal = val.substr(indexNum+1, val.length);
		
		if(!testRegExp.test(setparamsInDiv)) {
			nextDivhtml += ''
							+'<div class="row" id="'+ setparamsInDiv +'_row_'+ rowIndex +'">'
					        +'    <div class="col-sm-4">'
					        +'		<div class="input-group m-b">'
					        +'        	<input type="text" id="'+ setparamsInDiv +'_row_key_'+ rowIndex +'" placeholder="key" value="'+rowKey+'" class="form-control" onfocus="createNextDivRowHtml(this)">'
					        +'       </div>'
					        +'    </div>'
					        +'    <div class="col-sm-7">'
					        +'		<div class="input-group m-b">'
					        +'          <input type="text" id="'+ setparamsInDiv +'_row_val_'+ rowIndex +'" placeholder="value" class="form-control" value="'+rowVal+'" onfocus="createNextDivRowHtml(this)">'
					        +'			<span class="input-group-addon" style="border: none;" onclick="moveDivRowHtml(this)"><i class="fa fa-ellipsis-v"></i></span>' // 拖动上下顺序按钮
					        +'			<span class="input-group-addon" style="padding: 0px 1px 0 5px; border: none;" onclick="removeDivRowHtml(this)"><i class="fa fa-close"></i></span>'
					        +'       </div>'
					        +'   </div>'
					        +'</div>';
		} else {// header
			nextDivhtml += ''
							+'<div class="row" id="header_row_'+ rowIndex +'">'
					        +'    <div class="col-sm-4">'
					        +'		<div class="input-group m-b">'
					        +'			<span class="input-group-addon" style="padding: 0px 5px 0 1px; border: none;"><i class="fa fa-check-circle"></i></span>'
					        +'        	<input type="text" id="header_row_key_'+ rowIndex +'" placeholder="key" value="'+rowKey+'" class="form-control" onfocus="createNextDivRowHtml(this)">'
					        +'       </div>'
					        +'    </div>'
					        +'    <div class="col-sm-8">'
					        +'		<div class="input-group m-b">'
					        +'          <input type="text" id="header_row_val_'+ rowIndex +'" placeholder="value" class="form-control" value="'+rowVal+'" onfocus="createNextDivRowHtml(this)">'
					        +'			<span class="input-group-addon" style="padding: 0px 1px 0 5px; border: none;" onclick="removeDivRowHtml(this)"><i class="fa fa-close"></i></span>'
					        +'       </div>'
					        +'   </div>'
					        +'</div>';
		}
	});
	
	// 固定栏目
	var headerRow = '<div class="row" id="header_row">'
                +'    <div class="col-sm-4">'
                +'    	<div class="input-group m-b">'
                +'			<span class="input-group-addon" style="padding: 0px 17px 0 1px; border: none;"> </span>'
                +'        	<input type="text" id="header_row_key" placeholder="key" class="form-control" onfocus="createNextDivRowHtml(this)">'
                +'        </div>'
                +'    </div>'
                +'    <div class="col-sm-8">'
                +'    	<div class="input-group m-b">'
                +'            <input type="text" id="header_row_val" placeholder="value" class="form-control" onfocus="createNextDivRowHtml(this)">'
                +'        	<span class="input-group-addon" style="padding: 0px 1px 0 5px; border: none; font-size: 11px;" onclick="editParam2DivRows(this)">Builk Edit</span>'
                +'    	</div>'
                +'    </div>'
                +'</div>';
	
	if(testRegExp.test(setparamsInDiv)) {
		$('#'+ setparamsInDiv +'_content').html('').append(nextDivhtml).append(headerRow);
	    $('#'+ setparamsInDiv +'_content_params').hide();
	    $('#'+ setparamsInDiv +'_content').show();
	} else { // header
		$('#header_content').html('').append(nextDivhtml).append(headerRow);
	    $('#header_content_params').hide();
	    $('#header_content').show();
	}
	
}

/**
 * textarea 取消按钮
 */
function cancelParams(v) {
	var setparamsInDiv = $(v).attr('name'); //设置在哪个模块里header/params/.....
	var testRegExp = new RegExp('params');
	
	if(testRegExp.test(setparamsInDiv)) {
	    $('#'+ setparamsInDiv +'_content_params').hide();
	    $('#'+ setparamsInDiv +'_content').show();
	} else { // header
		$('#header_content').show();
		$('#header_content_params').hide();
		$('#params_key2val').val('');
	}
	
}


/**
 * 获取配置参数封装成json obj
 */
function getDivParams2Json() {
	var paramArrays = [];
	
	$('#header_content div input').each(function(index, obj) {
		var paramKey = new RegExp('header_row_key_');
		var paramInputId = $(obj).attr('id');
		
		if(paramKey.test(paramInputId)) {
			var objKeyVal = "\""+$(obj).val()+"\":\""+ $(obj).parent().parent().next().find('input').val() +"\"";
			paramArrays.push(objKeyVal)
		}
		
	});
	if(paramArrays.length <= 0) {
		return "";
	} else {
		return "{"+ paramArrays.join(",") +"}";
	}
}

/**
 * 格式化json后赋值给文本域里显示
 * @param {Object} jsonData
 */
function setDivParamsJsonObj2Textarea(jsonData) {
	//格式化json
	var formatJson = jsl.format.formatJson(jsonData);
	$("#params_key2val").val(formatJson);
}

/**
 * 调用json HTML格式插件
 * @param {Object} showDivId 格式化后在哪个div显示的ID名称
 * @param {Object} jsonData 被格式化的json数据
 * @param {Object} optionsFormat 插件初始化参数option，可自己写
 */
function formatJSON2HtmlInit(showDivId, jsonData, optionsFormat) {
	var defaultOptions = {
	                dom: document.getElementById(''+showDivId+'')
	            };
	var options = isEmpty(optionsFormat) ? defaultOptions : optionsFormat;
	window.jf = new JsonFormatter(options);
	jf.doFormat(jsonData);
}


/**
 * 
 * @param {Object} jsonData
 */
function parseJson(jsonData) {
	jsonData = JSON.parse(jsonData);
	
	if(typeof(jsonData) == "undefined") {
		alert("JSON对象不能为空！")
	}
	
	
	// 遍历第一层
	for(var toKey in jsonData) {
		// 如果对象类型为object类型且数组长度大于0，递归继续解析
		if(jsonData[toKey].length > 0 && typeof(jsonData[toKey]) == "object") {
			parseJson(jsonData[toKey]);
		} else {
			if(typeof(jsonData[toKey]) == "object") {
				for(var childKey in jsonData) {
					
					// 如果对象类型为object类型，递归继续解析
					if(typeof(jsonData[toKey][childKey]) == "object") {
						parseJson(jsonData[toKey][childKey]);
					} else {
						// 如果对象类型为object类型，直接取key  val.  childKey====jsonData[toKey][childKey]
						console.log(childKey+'=====直接取key  val======'+jsonData[toKey][childKey]);
						
					}
				}
			} else {
				// 如果对象类型object类型，直接取key  val.  childKey====jsonData[toKey]
				console.log(toKey+'=====直接取key  val======'+jsonData[toKey]);		
			}
		}
	}
}
/**
 * 初始化方法下拉框
 */
function initSelectMethod() {
	var htmlTemp = '';
	$.each(methodDatas, function(index, val) {
		htmlTemp+= '<option value="'+ val.option +'">'+ val.text +'</option>'
	});
	$('#method').append(htmlTemp);
}

function setIntervalTemp(v) {
	var tempUrl = $(v).val();
	if(tempUrl.indexOf("?") > 0) {
		$('#url-input_temp').val(tempUrl.substring(0,url.firstIndexOf("?")));
	} else {
		$('#url-input_temp').val(tempUrl);
	}
}

/**
 * 获取URL中参数的值
 * @param {Object} name
 * @param {Object} urlParam 可传可不传
 */
function getUrlParams(name, urlParam) {
	var reg = new RegExp("(^|&))" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
	var r = isEmpty(urlParam) ? window.location.search.substr(1).match(reg) : urlParam.search.substr(1).match(reg); // 匹配目标参数
	
	var reg_rewrite = new RegExp("(^|/)" + name + "/[^/]*(/|$)", "i");
	var q = isEmpty(urlParam) ? window.location.search.substr(1).match(reg_rewrite) : urlParam.search.substr(1).match(reg_rewrite); // 匹配目标参数
	
	if(r != null) {
		return unescape(r[2]);
	} else if(q != null) {
		return unescape(q[2])
	} else {
		return null;
	}
}
function sendAjaxFun() {
	
//	$.ajax()
}
