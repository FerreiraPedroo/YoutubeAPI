const videoInfo = {
    "documentary": {
        "videoPlayerId": 0,
        "videoYoutubeId": ["KYVHYAQHHwM"],
        "videoYoutubePlayListId": ["SnhWHQsnPT8", "gPSk0Xjz0og", "hoJg83xuvUM", "jgq_SXU1qzc", "8Cq7ROrnDog"]
    },
    "music": {
        "videoPlayerId": 1,
        "videoYoutubeId": ["BgkmvPa2V4o"],
        "videoYoutubePlayListId": ["kVtCFecXldM", "8mUvndag4hw", "MbLirwiFe9I", "DWyUjMJDvl4"]
    },
    "journalism": {
        "videoPlayerId": 2,
        "videoYoutubeId": ["DfH3jfB-D6M"],
        "videoYoutubePlayListId": ["YCDHln0Qyf0", "ChvvhhH8Tso", "2gej2XnUtr0", "c73onyTVYgE", "giRejp5WhOA", "t022n8j7jgg"]
    },
    "course": {
        "videoPlayerId": 3,
        "videoYoutubeId": ["iT6E92Kt38o"],
        "videoYoutubePlayListId": ["_KglicHxv3g", "TrfhQwSYCEk", "cUAmhmbFZd4", "rX2I7OjLqWE"]
    },
    "cartoon": {
        "videoPlayerId": 4,
        "videoYoutubeId": ["CmIYOYv_lkU"],
        "videoYoutubePlayListId": ["eA3x2Deld3o", "XHc9d2Nihuk", "PWz5bVkao_8"]
    }
}
const playerPositionList = [];
let actualTabPlayer;

function onYouTubeIframeAPIReady() {
    //createVideoPlayer(0);
}

/*
    Função que cria e carrega o player.
*/
async function createVideoPlayer(_tabName) {
    let youtubeIdVideo = videoInfo[_tabName].videoYoutubeId;
    playerPositionList[videoInfo[_tabName].videoPlayerId] = new YT.Player(_tabName + "-ytplayer", {
        videoId: youtubeIdVideo,
        events: {
            'onReady': (event) => {
                let time = event.target.getDuration()
                $(`#${_tabName}-duration`).html(timeCalculation(time))
                $(`#${_tabName}-title`).html(event.target.getVideoData().title);
                updateAccordion(_tabName);
                loadPlayList(_tabName);
            }
        }
    });
}

/*



VERIFICAR PORQUE A ABA MUSICA O TEXTO NÃO ESTÁ FUNCIONANDO





*/
async function loadPlayList(_tabName) {
    let youtubeVideoList = videoInfo[_tabName].videoYoutubePlayListId;
    let player = [];
    let playerVideo_div;
    let playerVideo_img;
    await $(".videohidden").remove()
    for (let forListPos = 0; forListPos < youtubeVideoList.length; forListPos++) {

        playerVideo_div = $("<div>").attr({ id: _tabName + "-playlist-video-" + forListPos });
        playerVideo_img = $("<img>").attr({
            videoid: youtubeVideoList[forListPos],
            class: "playlist-video-img",
            src: `https://img.youtube.com/vi/${youtubeVideoList[forListPos]}/mqdefault.jpg`
        });

        playerVideo_div.append(playerVideo_img);
        $("#" + _tabName + "-playlist").append(playerVideo_div);
        $("#" + _tabName + "-playlist").append($("<div>").attr({ id: `videohidden-${forListPos}`, class: "videohidden", hidden: true }));

        player[forListPos] = new YT.Player(`videohidden-${forListPos}`, {
            videoId: youtubeVideoList[forListPos],
            events: {
                'onReady': (event) => {
                    playerListTitleDuration(_tabName, event, forListPos)
                }
            }
        });
    }
}

/*
    Função que carrega a playlist da aba selecionada no "accordion"
    Chamada dentro da função "loadPlayList"
*/
function playerListTitleDuration(_id, _info, _loop) {
    console.log(_id,_info,_loop)
    let info = _info;
    let infoTitle = info.target.getVideoData().title;
    let infoDuration = timeCalculation(info.target.getDuration());
    let playerVideo_titleDuration = $("<span></span>").attr({
        class: "playlist-titleDuration",
    });
    console.log(infoTitle,infoDuration,playerVideo_titleDuration)
    playerVideo_titleDuration.html(infoTitle + "<br>" + infoDuration)
    $("#" + _id + "-playlist-video-" + _loop).append(playerVideo_titleDuration)
}
/*
    Função para converter um timer que esteja em segundos retornando o formato "hh:mm:ss" ou "mm:ss" ou "ss"
*/
function timeCalculation(_totalSecond) {
    let duration = _totalSecond;
    let h = parseInt(duration / 3600) < 10 ? "0" + String(parseInt(duration / 3600)) : parseInt(duration / 3600);
    let m = parseInt((duration - (h * 3600)) / 60) < 10 ? "0" + String(parseInt((duration - (h * 3600)) / 60)) : parseInt((duration - (h * 3600)) / 60);
    let s = (duration - (h * 3600)) - (m * 60) < 10 ? "0" + String((duration - (h * 3600)) - (m * 60)) : (duration - (h * 3600)) - (m * 60);
    let totalTime = h > 0 ? `${h}h ${m}min ${s}s` : m > 0 ? `${m}min ${s}s` : `${s} segundos`;
    return totalTime;
}
/* 
    Exibe o accordion que está com o "display:none"
    Executa uma vez para cada accordion assim que o video estiver "onready" na função "createVideoPlayer".
*/
function updateAccordion(_id) {
    $("#" + _id + "-accordion").css("display", "inline");
}

$(document).ready(() => {
    /*
        Carrega o ACCORDION e TABS
    */
    $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    }).hide();
    $("#tabs").tabs({
        collapsible: true,
        active: false
    });

    /*
        Pausa o video atual em reprodução.
        Verifica se o video da aba selecionada foi carregado anteriormente.
         > Não foi carregado: executa a função "createVideoPlayer"
         > Foi carregado: Não executa nada.
    */
    $("#tabs > ul > li > a").on('click', function () {

        // PAUSA O VIDEO QUE ESTIVER SENDO REPRODUZIDO
        if (actualTabPlayer == undefined) {
            actualTabPlayer = this.id;
            console.table("ChangeActualPlayer: ", actualTabPlayer);
        } else {
            let ytplayerId = videoInfo[actualTabPlayer].videoPlayerId;
            console.log("----------------------------")
            console.log(playerPositionList[ytplayerId]);
            console.log(ytplayerId)
            if (playerPositionList[ytplayerId].getPlayerState() == 1) {
                console.log(playerPositionList[ytplayerId].getPlayerState())
                playerPositionList[ytplayerId].pauseVideo();
            }
            actualTabPlayer = this.id;
        }
        // VERIFICA SE A ABA DO VIDEO JÁ FOI CARREGADO
        if (playerPositionList[videoInfo[this.id].videoPlayerId] == undefined) {
            console.log(playerPositionList[videoInfo[this.id].videoPlayerId])
            console.log(this.id)
            createVideoPlayer(this.id);
        }
    })
})






























// pegar imagem do video do youtube
//http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg









/*
        player = new YT.Player("ytplayer0", {
            videoId: "DfH3jfB-D6M",
            events: {
                'onReady': (data) => {
                    console.log(data);
                    console.log(data.target.playerInfo.videoData.title);
                    console.log(data.target.iframe);
                }
            }
        });


const divIframe = document.createElement('div')
divIframe.id = 'ytplayer'
divIframe.style = "display:none;"
console.log(divIframe)
*/




/*
$(document).ready(() => {
    $("#accordion").accordion();
    $("#tabs").tabs();
    $("#tabs > ul > li > a").on('click', function () {
        let tab = this.href;
        let getPlayerYouTubeHTML = $("#" + player.getIframe().id).detach();
        $("#tabs-" + tab[tab.length - 1]).append(getPlayerYouTubeHTML);

    })
})
*/

/*
    events: {
    'onReady': (data, _number) => {
                let nu = _number;

                if (nu == undefined) {
                    nu = 10

                    console.log("nu", nu)
                    let p = data.target.i.j['events'].onReady
                    p(data, nu)
                } else if (nu > 0) {
                    nu--
                    let p = data.target.i.j['events'].onReady

                    console.log("nu", nu)
                    p(data, nu)
                }


*/

