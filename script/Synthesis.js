		if(!('speechSynthesis' in window)) {
			throw alert("对不起，您的浏览器不支持")
		}
 
		var _play = document.querySelector("._play");
		var to_speak = window.speechSynthesis;
		var dataName, voiceSelect = document.querySelector("#voiceSelect");
		var voices = [];
 		
		//创建选择语言的select标签
		function populateVoiceList() {
			voices = speechSynthesis.getVoices();
			for(i = 0; i < voices.length; i++) {
				var option = document.createElement('option');
				option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
 
				if(voices[i].default) {
					option.textContent += ' -- DEFAULT';
				}
				option.setAttribute('data-lang', voices[i].lang);
				option.setAttribute('data-name', voices[i].name);
				voiceSelect.appendChild(option);
			}
		}
 
		setTimeout(function() {
			populateVoiceList();
		}, 500);

		function play() {
			myCheckFunc();//检查文本框是否为空
			cancel(); //
			to_speak = new SpeechSynthesisUtterance(_play.value);
 
			//to_speak.rate = 1.4;// 设置播放语速，范围：0.1 - 10之间
 
			var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
			for(i = 0; i < voices.length; i++) {
				if(voices[i].name === selectedOption) {
					to_speak.voice = voices[i];
				}
			}
 
			window.speechSynthesis.speak(to_speak);
 			//console.log(to_speak);
			//console.log(_play.value);
		}
 
		//暂停
		function pause() {
			myCheckFunc();//检查文本框是否为空
			window.speechSynthesis.pause();
		}
		//继续播放
		function resume() {
			myCheckFunc();//检查文本框是否为空
			window.speechSynthesis.resume(); //继续
		}
		//清除所有语音播报创建的队列
		function cancel() {
			window.speechSynthesis.cancel();
		}
		//清空文本框
		function cls()  {
			 document.getElementById("texts").value=""; //清空文本框
		}
		//检查文本框是否为空
		function myCheckFunc() {
		        let x;
		        x = document.getElementById("texts").value;
		        try {
		            if (x === "")
		                throw "文本框为空";
            
		        } catch (error) {
		            alert( "提示" + error);
		        }
		}


		//朗读选中文本
		var oContent = document.getElementsByTagName("body")[0];
		oContent.onmouseup = function(){
			if(selectText()){
				
				let msg = new SpeechSynthesisUtterance(selectText());
				window.speechSynthesis.speak(msg);
			}
		};  
	
		function selectText(){
			if(document.Selection){       
				//ie浏览器
				return document.selection.createRange().text;     	 
			}else{    
				//标准浏览器
				return window.getSelection().toString();	 
			}	 
		}