var url='http://www.qq.com/';
var options={
statusbar: {
color: '#ffffff'
},
toolbar: {
height: 50,
color: '#ffffff'
},
backButton: {
image: 'back',
imagePressed: 'back',
align: 'right',
event: 'backPressed'
},
forwardButton: {
image: 'forward',
imagePressed: 'forward',
align: 'right',
event: 'forwardPressed'
},
closeButton: {
image: 'close',
imagePressed: 'close',
align: 'right',
event: 'closePressed'
},
customButtons: [
                {
                image: 'home',
                imagePressed: 'home',
                align: 'right',
                event: 'refreshPressed'
                },
                {
                image: 'refresh',
                imagePressed: 'refresh',
                align: 'right',
                event: 'homePressed'
                }
                ],
backButtonCanClose: false,
disableAnimation: true
};

var methods={
    getOffLine:function (){
        var oDiv=document.createElement('div');
        oDiv.id='offline-div'
        oDiv.innerHTML='<img src="./static/images/sigo.png"><p>network failure</p><button>retry</button>';
        document.body.appendChild(oDiv);
    },
    removeOffline:function (){
        document.body.style.display="none"

        var oDiv=document.getElementById('offline-div');
        if(oDiv){
            document.body.removeChild(oDiv);
        } 
    },
    initMain:function(){
        document.addEventListener('deviceready', function(){
            if(url!=''){
                cordova.ThemeableBrowser.open(url,'_0',options)
            }
        }, false);
    }
};

if (navigator.onLine) {
    methods.removeOffline();
    methods.initMain();
    //console.log("正常工作！");

} else {
    //执行离线状态时的任务
    methods.getOffLine();
    //console.log("离线工作！");

};

var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
};

EventUtil.addHandler(window, "online", function() {
    //alert("Online---正常工作");
    methods.removeOffline();
    methods.initMain();
});
EventUtil.addHandler(window, "offline", function() {
    //alert("Offline ---离线工作");
    methods.getOffLine();
});



