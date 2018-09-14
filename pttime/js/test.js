var url='http://www.qq.com/';
var main='https://jokeybell.github.io/pttime/pttime/images/'
var options={
statusbar: {
color: '#ffffff'
},
toolbar: {
height: 50,
color: '#ffffff'
},
backButton: {
image: main+'back.png',
imagePressed: 'back',
align: 'right',
event: 'backPressed'
},
forwardButton: {
image: main+'forward.png',
imagePressed: 'forward',
align: 'right',
event: 'forwardPressed'
},
closeButton: {
image: main+'close.png',
imagePressed: 'close',
align: 'right',
event: 'closePressed'
},
customButtons: [
                {
                image: main+'home.png',
                imagePressed: 'home',
                align: 'right',
                event: 'refreshPressed'
                },
                {
                image: main+'refresh.png',
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
        oDiv.innerHTML='<img src="'+main+'sigo.png"><p>network failure</p><button>retry</button>';
        document.body.appendChild(oDiv);
    },
    removeOffline:function (){
        var oApp=document.getElementById('app');
        oApp.style.display="none";
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
    initMain();
});
EventUtil.addHandler(window, "offline", function() {
    //alert("Offline ---离线工作");
    methods.getOffLine();
});



