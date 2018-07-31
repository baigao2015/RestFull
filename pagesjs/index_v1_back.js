
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
        +'		<div class="input-group m-b">'
        +'        	<input type="text" id="params_row_key_'+ rowIndex +'" placeholder="key" class="form-control" onfocus="createNextDivRowHtml(this)">'
        +'       </div>'
        +'    </div>'
        +'    <div class="col-sm-8">'
        +'		<div class="input-group m-b">'
        +'          <input type="text" id="params_row_val_'+ rowIndex +'" placeholder="value" class="form-control" onfocus="createNextDivRowHtml(this)">'
        +'			<span class="input-group-addon" style="padding: 0px 1px 0 5px; border: none;" onclick="removeDivRowHtml(this)"><i class="fa fa-close"></i></span>'
        +'       </div>'
        +'   </div>'
        +'</div>';
		
		$headerVid.before(nextDivhtml);
		
		inputId == 'header_row_val' ? $('#params_row_val_'+ rowIndex +'').focus() : $('#params_row_key_'+ rowIndex +'').focus();
	}
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
 * 新增 key--value  的输入框
 * @param {Object} v
 */
function createNextDivRowHtml2(v) {
	$headerVid = $(v).parent().parent().parent(); // 获取当前行div的ID名称
	
	// 判断该div下一兄弟节点是否存在，不存在则创建，否则不做处理
	if($headerVid.prev().length < 1) {
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
	$('#header_content').hide();
	$('#header_content_params').show();
}

/**
 * 获取textarea内容设置到html key--value中
 */
function setParams2Html() {
	
	var textVal = $("#params_key2val").val();
	
	var arrayVals = [];
		arrayVals = textVal.split('\n'); // 以换行未分隔符，将内容分割成数组
	
	var nextDivhtml = '';
	
	$.each(arrayVals, function(index, val) {
		var indexNum = val.indexOf(':');
		var rowIndex = index;
		var rowKey = val.substr(0, indexNum), rowVal = val.substr(indexNum+1, val.length);
		
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
	
	$('#header_content').html('').append(nextDivhtml).append(headerRow);
    
    $('#header_content_params').hide();
    $('#header_content').show();
}

/**
 * textarea 取消按钮
 */
function cancelParams() {
	$('#header_content').show();
	$('#header_content_params').hide();
	$('#params_key2val').val('');
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
	var jsonData = "{"+ paramArrays.join(",") +"}";
	
	setDivParamsJsonObj2Textarea(jsonData);
	return jsonData;
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
 *是否为空  
 * @param v  {*} 值  
 * @param allowBlank {boolean} 是否允许空  
 * @returns {boolean|*}  
 */
function isEmpty(v, allowBlank) {
	return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || ((isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
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

function keyInputOnkeUp(this) {
	var methodTmp = $('#method').val();
	 switch (methodTmp){
        case "GET":
        case "get":
            return $('#url-input').val() + 
        case "delete":
            url = "DELETE";
            break;
        case "put":
            method = "PUT";
            break;
        default :
            break;
    }
}
