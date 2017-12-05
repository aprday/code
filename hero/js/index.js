$(document).ready(function () {
    bind();
});
var $root = $('body');
var $hero = $('.input');
var map = new Object();
var $board = $('.board');
var $detail = $('.details');

var fix = 1;
function bind() {
    $root.on('click', '.add', addHero);
    $root.on('click', '.player', fetchHero);
    $root.on('click', '.delete', deleteHero);
    $root.on('click', '.up', upHero);
    $root.on('click', '.down', downHero);
    $root.on('keypress', '.input', addHero);
}

function renderBoard(map) {
    $board.html('');
    for(key in Object.keys(map)){
       var player ={ 
           'name': Object.keys(map)[key],
           'score':Object.getOwnPropertyDescriptor(map, Object.keys(map)[key]).value
       }
        $board.append('<li class="player"><span class="name">' + player.name + '</span><span class="score">' + player.score + '</span></li>');
    }
   
};

function renderDetail(player){
    
    $detail.html('<div class="name">'+player.name+'</div><button class="up">顶</button><button class="down">踩</button><button class="delete">删除</button>');
}

function fetchHero(event) {
    var player = {
        'name': $(event.currentTarget).find('.name').text(),
        'score': 0,
    };
    if (Object.getOwnPropertyDescriptor(map, player.name.toString()) != undefined) {
        
    }else{
        Object.defineProperty(map, player.name.toString(), {
            value: player.score,
            enumerable: true,
            configurable: true,
            writable: false
        });
    }
    
    renderDetail(player);
}

function addHero(event){
    
    if(event.type=="keypress"){
        if(event.keyCode == 13){
            var player = {
            'name': $hero.val(),
            'score': 0,
            }
            if (Object.getOwnPropertyDescriptor(map, player.name.toString()) != undefined) {
                $detail.html('<div class="message">没有这个玩家</div>');
            }else{
                Object.defineProperty(map, player.name.toString(), {
                    value: player.score,
                    enumerable: true,
                    configurable: true,
                    writable: false
                });
            }
             $hero.val('');
            renderBoard(map);
        }
    }else{
        var player = {
            'name': $hero.val(),
            'score': 0,
        }
        if (Object.getOwnPropertyDescriptor(map, player.name.toString()) != undefined) {
            $detail.html('<div class="message">没有这个玩家</div>');
        }else{
            Object.defineProperty(map, player.name.toString(), {
                value: player.score,
                enumerable: true,
                configurable: true,
                writable: false
            });
        }
        $hero.val('');
        renderBoard(map);
    }
    
}
function deleteHero(event) {
    var player = {
        'name': $detail.find('.name').text(),
    };
    if (Object.getOwnPropertyDescriptor(map, player.name.toString()) != undefined) {
        delete map[player.name.toString()];
    }
    renderBoard(map);
    $detail.html('<div class="message">请选择一个玩家</div>');
};

function upHero() {
    var player = {
        'name': $detail.find('.name').text(),
    };
    if (Object.getOwnPropertyDescriptor(map, player.name.toString()) == undefined) {
        $detail.html('<div class="message">没有这个玩家</div>');
    }else{
         Object.defineProperty(map, player.name.toString(), {
            value: Object.getOwnPropertyDescriptor(map, player.name.toString()).value+fix,
            enumerable: true,
            configurable: true,
            writable: false
        });
    }
    renderBoard(map);
};
function downHero() {
    var player = {
        'name': $detail.find('.name').text(),
    };
    if (Object.getOwnPropertyDescriptor(map, player.name.toString()) == undefined) {
        $detail.html('<div class="message">没有这个玩家</div>');
    }else{
        Object.defineProperty(map, player.name.toString(), {
            value: Object.getOwnPropertyDescriptor(map, player.name.toString()).value-fix,
            enumerable: true,
            configurable: true,
            writable: false
        });
    }
    renderBoard(map);
};