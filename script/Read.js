import { sql } from './api.js';
import { getBlockByID } from './api.js';

// 绑定事件
document.getElementById('get_note').addEventListener('click', function () {
	read();
});


async function read() {
	// 获取当前块信息和文字
	var present_block_data = info_present_blocks().then((res) => {
		
		var resLength = res.length;
		var all_character = '';
		for (var i = 0; i < resLength; i++) {
			if(res[i].content){
				all_character += res[i].content + '\n';
			}
		}
		document.getElementById('texts').value = all_character;
	});
}

async function info_present_blocks() {

	var self = window.frameElement.parentElement.parentElement;
	var self_id = await getBlockByID(self.getAttribute('data-node-id'));
	if(self_id){
		var page_id = self_id.root_id;

	}else{
		alert("暂未获取到ID，请等待几秒再试。。。");
	}
	
var sql_sentence = "select * from blocks where type = 'p' and (root_id = '" + page_id + "'" + " or path like '%" + page_id + "%')";
	//console.log(sql_sentence);
	const res = await sql(sql_sentence);
	//console.log(res);
	return res;

}
