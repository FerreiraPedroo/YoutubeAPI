//const videoIdList = ["KYVHYAQHHwM", "BgkmvPa2V4o", "DfH3jfB-D6M", "iT6E92Kt38o", "CmIYOYv_lkU"];
let actualTabPlayer;
const videoIdList = {
    "documentary": ["BgkmvPa2V4o"],
    "music": ["CmIYOYv_lkU"],
    "journalism": ["KYVHYAQHHwM"],
    "course": ["iT6E92Kt38o"],
    "cartoon": ["BgkmvPa2V4o"]
}
const playerListArray = [];

function onYouTubeIframeAPIReady() {
    //createVideoPlayer(0);
}

async function createVideoPlayer(_tabId) {
    let videoId = videoIdList[_tabId][0];
    let player;
    console.log("Function createVideoPlayer: ", videoId)

    player = await new YT.Player(_tabId + "-ytplayer", {
        videoId: videoId,
        events: {
            'onReady': (event) => {
                console.log(event)
                let duration = event.target.getDuration()
                $(`#${_tabId}-duration`).html(`${parseInt(duration / 60)}:${parseInt(((duration / 60) - parseInt(duration / 60)) * 60)}` + " minutos");
                $(`#${_tabId}-title`).html(event.target.getVideoData().title)
                console.log("ONREADY", event.target.getDuration());
                updateAccordion(_tabId)
            }
        }
    });
}


function updateAccordion(_id) {
    console.log(_id)
    $("#" + _id + "-accordion").css("display", "block")
}

$(document).ready(() => {
    $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    }).hide();
    $("#tabs").tabs({
        collapsible: true,
        active: false
    });


    $("#tabs > ul > li > a").on('click', function () {
        let tabId = this.id;
        console.log("TABID: ", tabId)
        /*
        // PAUSA O VIDEO QUE ESTIVER EM EXECUÇÃO
        if (actualTabPlayer == undefined) {
            actualTabPlayer = tabId
            console.table(playerListArray)
        } else {
            playerListArray[actualTabPlayer][0].length != undefined ? playerListArray[actualTabPlayer][0][0].pauseVideo() : playerListArray[actualTabPlayer][0].pauseVideo()
            actualTabPlayer = tabId
        }
*/
        createVideoPlayer(tabId);
    })
})








































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

*/        /*
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

