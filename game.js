/* =========================================================
   GAMES SYSTEM
   ========================================================= */

console.log("game.js loaded successfully.");


/* =========================================================
   ELEMENTS
   ========================================================= */

const gamesButton =
    document.getElementById("games-button");

const gamesSystem =
    document.getElementById("gamesSystem");

const gamesWindow =
    document.getElementById("gamesWindow");

const gamesPage =
    document.getElementById("gamesPage");

const gamelaunchwindow =
    document.getElementById("gamelaunchwindow");

const closeGames =
    document.getElementById("closeGames");

const gameLaunchBack =
    document.getElementById("gameLaunchBack");

const gameLaunchTitle =
    document.getElementById("gameLaunchTitle");

const gameLaunchFullscreen =
    document.getElementById("gameLaunchFullscreen");

const gameLaunchArea =
    document.getElementById("gameLaunchArea");

const gameLaunchLoading =
    document.getElementById("gameLaunchLoading");

const gameLaunchLoadingText =
    document.getElementById("gameLaunchLoadingText");

const gameLaunchMethod =
    document.getElementById("gameLaunchMethod");

const gameLaunchFrames =
    document.getElementById("gameLaunchFrames");

const gameLaunchFailed =
    document.getElementById("gameLaunchFailed");

const gameLaunchFailedText =
    document.getElementById("gameLaunchFailedText");

const gameLaunchRetry =
    document.getElementById("gameLaunchRetry");

const gamesControls =
    document.getElementById("gamesControls");

const gamesCategory =
    document.getElementById("gamesCategory");

const browseAllGames =
    document.getElementById("browseAllGames");

const gamesGrid =
    document.getElementById("gamesGrid");


/* =========================================================
   SEARCH BOX
   ========================================================= */

let gamesSearch =
    document.getElementById("gamesSearch");

if (!gamesSearch && gamesControls) {

    gamesSearch =
        document.createElement("input");

    gamesSearch.id =
        "gamesSearch";

    gamesSearch.type =
        "text";

    gamesSearch.placeholder =
        "Search games...";

    gamesSearch.style.backgroundColor =
        "var(--background-color)";

    gamesSearch.style.color =
        "var(--text-color)";

    gamesSearch.style.border =
        "2px solid var(--outline-color)";

    gamesSearch.style.borderRadius =
        "8px";

    gamesSearch.style.padding =
        "8px 12px";

    gamesSearch.style.outline =
        "none";

    gamesSearch.style.boxSizing =
        "border-box";

    gamesSearch.style.minWidth =
        "200px";

    gamesControls.insertBefore(
        gamesSearch,
        gamesControls.firstChild
    );

}


/* =========================================================
   GAME DATABASE
   ========================================================= */

const games = [

    ["Drift Hunters",
     "https://www.hoodamath.com/games/drifthunters.html#gsc.tab=0",
     "https://th.bing.com/th/id/OIP.NisJvxY5ge1BLADxdnxlJAHaD4",
     "sports"],

    ["Basket Random",
     "https://basketball-random.com/",
     "https://th.bing.com/th/id/OIP.N-WiksFLDQQReMFP2GWEwgHaD4",
     "sports"],

    ["Tunnel Rush",
     "https://tunnel-rush.io/",
     "https://th.bing.com/th/id/OIP.1eo7NkYJ4KDgOal62U0BZwHaHa",
     "arcade"],

    ["Retro Bowl",
     "https://www.footballgames.org/retro-bowl/fullscreen/",
     "https://th.bing.com/th/id/OIP.kVhr19z4KymOjV3-xb3qkAHaHa?w=159&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Ragdoll Archers",
     "https://ragdoll-archers.io/",
     "https://th.bing.com/th/id/OIP.rpDBjsXPYBrqCrvoMOccZQHaHa",
     "arcade"],

    ["Agar.io",
     "https://agar.live/",
     "https://th.bing.com/th/id/OIP.UMjBmrp3AksCMahD6zhk-QHaD4",
     "arcade"],

    ["Slope",
     "https://slope3.com/",
     "https://th.bing.com/th/id/OIP.qTt8RTAIKmewE3x2mZStVQHaEO",
     "arcade"],

    ["Dashmetry",
     "https://dashmetry.com/",
     "https://th.bing.com/th/id/OIP.ztWGvsyPwKm2az01owxruwHaEx",
     "arcade"],

    ["Bloxd.io",
     "https://bloxd.io/",
     "https://th.bing.com/th/id/OIP.fmcAmo7izpd11jr9lLFAbQHaEK",
     "arcade"],

    ["Smash Karts",
     "https://smashkarts.io",
     "https://th.bing.com/th/id/OIP.p-_HDiEvs5jMyw2vq-BYZQHaEK",
     "shooter"],

    ["Space Waves",
     "https://spacewaves.io/",
     "https://th.bing.com/th/id/OIP.I95Ujof4PxFfL6ioZMoLIgHaEK",
     "arcade"],

    ["Subway Surfers",
     "https://subwaysurfers.pages.dev/",
     "https://th.bing.com/th/id/OIP.v6ZCx0TJEk6IXcJOD_3q_gHaHa",
     "arcade"],

    ["Venge.io",
     "https://venge.io",
     "https://th.bing.com/th/id/OIP.Wceaeahk-A-G-WDxr8sXVQHaHa",
     "shooter"],

    ["Krunker.io",
     "https://krunker.io",
     "https://th.bing.com/th/id/OIP.oRK34L9-xL9txbkbXrl2jQHaEK",
     "shooter"],

    ["RocketGoal.io",
     "https://rocketgoal.io",
     "https://th.bing.com/th/id/OIP.VtZ8uz3AkHv_VGPFMObebAHaEK",
     "sports"],

    ["Veck.io",
     "https://veck.io",
     "https://th.bing.com/th/id/OIP.p3ADqvQ_-CGkYZYhLWow0gHaEK",
     "shooter"],

    ["Cookie Clicker",
     "https://orteil.dashnet.org/cookieclicker/beta/",
     "https://th.bing.com/th/id/OIP.mdBgbbxsrjKXoVZEpIJhbwHaEK",
     "arcade"],

    ["Kakuro Conquest",
     "https://www.kakuroconquest.com/",
     "https://th.bing.com/th/id/OIP.xV7T7DvGbJwIvMWlayMLywHaLG",
     "puzzle"],

    ["Hitori Conquest",
     "https://octordlegame.io/hitori-conquest",
     "https://th.bing.com/th/id/OIP.ew_y7qHK0NsyRSsh53OyFgHaD4",
     "puzzle"],

    ["1v1.LOL",
     "https://1v1lol-unblocked.bitbucket.io/",
     "https://th.bing.com/th/id/OIP.Dj62dlhPfPHSS_K42-mD_QHaEo",
     "shooter"],

    ["Shell Shockers",
     "https://shellshock.io/",
     "https://api.web.gamepix.com/assets/img/250/250/icon/shell-shockers.png",
     "shooter"],

    ["BuildNow GG",
     "https://build-now-gg.bitbucket.io/",
     "https://th.bing.com/th/id/OIP.iweMhyzrOkUeGBE7PuhO_wHaHa",
     "shooter"],

    ["Papa Louie Games",
     "https://papalouie.io/",
     "https://th.bing.com/th/id/OIP.BQA7yfQL0kGg7-2En2D2QwAAAA",
     "arcade"],

    ["Sonic Games",
     "https://www.play-games.com/sonic-games.html",
     "https://th.bing.com/th/id/OIP.w2lBOlL0iL11iAgEl-kp_gAAAA",
     "arcade"],

    ["TheLast.io",
     "https://www.thelast.io/",
     "https://th.bing.com/th/id/OIP.o97MybZt7NkQJSuwAUelcAHaEK",
     "shooter"],

    ["Bowmasters Tower Attack",
     "https://storytellergame.io/bowmasters/",
     "https://th.bing.com/th/id/OIP.sx-D5upPu68Aa_Q5TCEKjAAAAA",
     "arcade"],

    ["Cut The Rope",
     "https://playtropolis.com/Cut-the-rope",
     "https://th.bing.com/th/id/OIP.iOSC0a2yZF623ijLKJ-bPwHaEK",
     "puzzle"],

    ["Grim Donut Game",
     "https://www.pinkbike.com/sandbox/grimdonutgame/",
     "https://th.bing.com/th/id/OIP.4M4SadQrrkZWkiSSERYe4gHaEO",
     "sports"],

    ["All Fnaf",
     "https://fngames.io/games/fnaf-games",
     "https://th.bing.com/th/id/OIP.JeDdcskIRIUGuEe8s5OuAgHaEK",
     "arcade"],

    ["Farming Simulator",
     "https://www.gamepix.com/play/farming-simulator-game",
     "https://th.bing.com/th/id/OIP.G0qX6KcOF8LevdZAPmtbWAHaFj",
     "arcade"],

    ["FNAF 1",
     "https://fnafgames.io/fnaf-1",
     "https://th.bing.com/th/id/OIP.JeDdcskIRIUGuEe8s5OuAgHaEK",
     "arcade"],

    ["2048",
     "https://www.mathsisfun.com/games/a/2048/index.html",
     "https://th.bing.com/th/id/OIP.EUJy-EyViUSqsYiKJ2IUmQHaEU?w=305&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Moto X3M",
     "https://motox3m.gitlab.io/",
     "https://th.bing.com/th/id/OIP.SeOc2rOhbRCSJFZQA4Yf5AHaEQ?w=289&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Crossy Road",
     "https://crossyroadgame.io/",
     "https://th.bing.com/th/id/OIP.8wiJWFhYAqfXDn9KlwVB4wHaD4?w=339&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Little Alchemy 2",
     "https://littlealchemy2.com/",
     "https://th.bing.com/th/id/OIP.dl1rVFtpr7IV9Aj48reKowHaDt?w=342&h=174&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Soccer Random",
     "https://soccerrandomgame.com/",
     "https://th.bing.com/th/id/OIP.ZN0BmNyzD7pf7s0fSxF-UAHaEK?w=292&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Doodle Jump",
     "https://doodlejump.io/",
     "https://th.bing.com/th/id/OIP.9Z6Vh-fdws-eAn0nUKVdiwAAAA?w=209&h=150&c=6&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Temple Run 2",
     "https://playtropolis.com/Temple-run-2",
     "https://th.bing.com/th/id/OIP.tSjeUAecZkwFAx4VsuiOyQHaHa?w=205&h=205&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Flappy Bird",
     "https://flappybird.io/",
     "https://th.bing.com/th/id/OIP.YpYWj-NpuedbCHS3sm8eRAHaEK?w=304&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Slither.io",
     "https://iogamesweb.com/slither-io",
     "https://th.bing.com/th/id/OIP.j6q6EWtdB1vWsrs6-ZggXgHaFD?w=250&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Zombs Royale",
     "https://zombsroyale.io/",
     "https://th.bing.com/th/id/OIP.z2yRX8sSF8ob_-54XXA00QHaEK?w=306&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["Combat Online",
     "https://nadgames.com/combat_online",
     "https://th.bing.com/th/id/OIP.wEb-eJ9js6DHkJp2qYHkiwHaHa?w=175&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["BitLife",
     "https://ragdoll-archers.io/w/bitlife-life-simulator",
     "https://th.bing.com/th/id/OIP.j0ufO00QHGpweJ5fOSF_PwHaEK?w=205&h=115&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Getting Over It",
     "https://playgama.com/game/getting-over-it-classic",
     "https://th.bing.com/th/id/OIP.BCVwu6jV9Fl1zPHttohH5wHaEK?w=302&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Fireboy and Watergirl",
     "https://playgama.com/game/fireboy-and-watergirl-1-forest-temple",
     "https://th.bing.com/th/id/OIP._t442hgD26bnobjKSldZBAHaD4?w=326&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Bob the Robber",
     "https://www.gogy.com/games/bob-the-robber",
     "https://th.bing.com/th/id/OIP.RPpMLLwsJE0FTrdmeBDUNwHaEU?w=307&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Happy Wheels",
     "https://happy-wheels.co/",
     "https://th.bing.com/th/id/OIP.Vui68qhUBvIYG3VMgJvJQgHaHa?w=172&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Short Life",
     "https://short-life.io/",
     "https://th.bing.com/th/id/OIP.Kd2y1PVCGOfU2C1Sf0C0nQAAAA?w=301&h=152&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["G-Switch 3",
     "https://gswitch.io/g-switch-3",
     "https://th.bing.com/th/id/OIP.kmaOPzEDlrelYXELaEsd7wHaEG?w=306&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Run 3",
     "https://run3.io/",
     "https://th.bing.com/th/id/OIP.ZskFVecWkZGpvlYE524C5QHaE8?w=256&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Vex 7",
     "https://www.vex-7.com/",
     "https://th.bing.com/th/id/OIP.V5ACJWOrPAJManhEv-DX8AHaHa?w=180&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Penalty Shooters 2",
     "https://penalty-shooters-2.com/",
     "https://th.bing.com/th/id/OIP.AjEprzLtR7Vu8AM_HXxOnAHaE8?w=228&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Football Legends",
     "https://football-legends.io/",
     "https://th.bing.com/th/id/OIP.ty9dOiUX1mbqVYBTf5TGRAHaHa?w=180&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Tennis Masters",
     "https://www.onlinegames.io/tennis-masters/",
     "https://th.bing.com/th/id/OIP.XbR1TVQ0UB2rtR6A6dIEVAHaD4?w=322&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Punch Bob",
     "https://kbhgames.com/game/punch-bob",
     "https://th.bing.com/th/id/OIP.I9O1-zn9aU6bdtFmp-KLWQHaDt?w=341&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Burrito Bison",
     "https://www.silvergames.com/en/burrito-bison",
     "https://th.bing.com/th/id/OIP.bjAS-aF6pG3aoUzNuR41_AHaFj?w=239&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Stickman Hook",
     "https://stickman-hook.io/",
     "https://th.bing.com/th/id/OIP.Ch7TR3OpTzuI9Xcbgrlp3AHaEM?w=309&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Drive Mad",
     "https://hotgames.io/drive-mad",
     "https://th.bing.com/th/id/OIP.VUYHR_PJenffmfHxfy41OwHaHa?w=186&h=186&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Monster Tracks",
     "https://playtropolis.com/Monster-tracks",
     "https://th.bing.com/th/id/OIP.B5eE5TpwijYB3ae1u1HiXwHaD4?w=334&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Brain Test",
     "https://www.topgames.com/play/Brain-Test",
     "https://th.bing.com/th/id/OIP.D5s4W6rv5ErKQEU5vWRRlwHaD4?w=329&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Who Is This?",
     "https://playtropolis.com/Who-is",
     "https://th.bing.com/th/id/OIP.rXNHaLZgxlXh86Y8tnH4mgHaHk?w=169&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Wordle",
     "https://www.wordle.name/en/",
     "https://th.bing.com/th/id/OIP.mOgtmaA4pcFHuMu4rkt8xgHaDt?w=330&h=174&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Connections",
     "https://connectionsgame.org/",
     "https://th.bing.com/th/id/OIP.tZ-PZ1ITBJ9p_17WxbVPYAHaHa?w=168&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Tetris",
     "https://tetris.game/",
     "https://th.bing.com/th/id/OIP.gRmscv1tDFqzSXADl_AYngHaHa?w=179&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "puzzle"],

    ["Pac-Man",
     "https://freepacman.org/",
     "https://th.bing.com/th/id/OIP.EcwfP5LFM34FVPfv7KjkXwHaEL?w=307&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Minecraft",
     "https://mcraft.fun/",
     "https://th.bing.com/th/id/OIP.aG6z_MvcOv-NWPj4Dbh6vQHaEK?w=326&h=183&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Paper.io 2",
     "https://paper-io.com/",
     "https://th.bing.com/th/id/OIP.JttT5KjSv1b_1-dKxsZh0gHaHa?w=174&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Hole.io",
     "https://www.holeio.com/",
     "https://th.bing.com/th/id/OIP.qPZTGr0FSS0D9EzG9litEQHaEK?w=315&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Aquapark.io",
     "https://www.jopi.com/game/game/aquapark.io/",
     "https://th.bing.com/th/id/OIP.yRyeubETrwzoSf3kJ-ZVlgHaDL?w=345&h=150&c=7&r=0&o=7&pid=1.7&rm=3",
     "sports"],

    ["Crowd City",
     "https://www.gametop.com/online/crowd-city/",
     "https://th.bing.com/th/id/OIP.9urhxNSocjw_pqOcy3hWtgHaEK?w=267&h=150&c=6&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Diep.io",
     "https://diep.io/",
     "https://th.bing.com/th/id/OIP.95kX7329oYEsuZV9m68wlgHaHa?w=175&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["EvoWars.io",
     "https://evowars.io/",
     "https://th.bing.com/th/id/OIP.XRxc7WOOfw1jtgETjeDDWQHaEK?w=299&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Slay.one",
     "https://slay.one/",
     "https://th.bing.com/th/id/OIP.ukEyYzh4ZR3vtV4aGEgMJQHaEK?w=328&h=184&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["Ev.io",
     "https://ev.io/",
     "https://th.bing.com/th/id/OIP.WAqpRlbYxkjWifj2m0VyUAHaD3?w=332&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["Superhex.io",
     "https://superhex.io/",
     "https://th.bing.com/th/id/OIP.6rvZ2zLDa4y91Ke2l5wU5gHaEr?w=263&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Lol Beans",
     "https://lolbeans.io/",
     "https://th.bing.com/th/id/OIP.9kRUa35P4xLiWMFVH4YMQwHaEJ?w=302&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["War Brokers",
     "https://warbrokers.io/",
     "https://th.bing.com/th/id/OIP.V_LGpl4tE2O8v4WCeYvTPAHaEK?w=308&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["Wings.io",
     "https://wings.io/",
     "https://th.bing.com/th/id/OIP.xZGNYkEPFnnUiNs9SdDhEAHaEK?w=321&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["Airmash",
     "https://kbhgames.com/game/airmash",
     "https://th.bing.com/th/id/OIP.FzXgQOk7VexKHvpilzwqcQHaEK?w=299&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "shooter"],

    ["Duck Life 4",
     "https://www.hoodamath.com/games/ducklife4.html#gsc.tab=0",
     "https://th.bing.com/th/id/OIP.UivgaL4Dg2DeLAuGN21n3AHaEc?w=288&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Powerline.io",
     "https://powerline.io/",
     "https://th.bing.com/th/id/OIP.0RhGYsR2lS-JqT5pqXO8PgHaEK?w=292&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
     "arcade"],

    ["Geometry Dash",
     "https://geometrydash.io/",
     "https://images.launchbox-app.com/35fc6d8a-2387-474b-88e0-b149450fac92.png",
     "arcade"],

    ["Idle Breakout",
     "https://idlebreakout.com/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST25BhqeZ450SN-Ece9QVbaJMiavRRVwfG785_uRrjsg&s=10",
     "arcade"],

    ["Madalin Stunt Cars 2",
     "https://madalinstuntcars2.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeMTtz3GWa7ICAx3_kPLFqzj69lDqHex-F8xFz1uXDQ&s=10",
     "sports"],

    ["Basketball Stars",
     "https://basketball-stars.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRHBDssFSALG587HPVoQsGKWR4F3NClTC8V-ycmS59CQ&s=10",
     "sports"],

    ["Tiny Fishing",
     "https://tinyfishing.co/",
     "https://www.coolmathgames.com/sites/default/files/styles/mobile_game_image/public/TinyFishing_OG-logo.jpg.webp?itok=i5zMuX6W",
     "arcade"],

    ["Ducklings.io",
     "https://ducklings.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEWpJ6Sp_dg-0PkbP22t1592tG3ZqX1PwZyGYv7teKg&s=10",
     "arcade"],

    ["Surviv.io",
     "https://surviv.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6RflGJ2jW_xZQl8YNU9kiP65t0sRFd3yhPxQ618C1A&s=10",
     "shooter"],

    ["Tank Trouble",
     "https://tanktrouble.com/",
     "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4qgi.jpg",
     "shooter"],

    ["Helix Jump",
     "https://helixjump.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7J8XiV2UilQYmgRi3vuP3pgCfwnClpk2wsA&s",
     "arcade"],

    ["Snow Rider 3D",
     "https://snowrider3d.com/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGe4ZcD31Tqf2qhMczVjO0x71h5N-VKfsO-GqKFvfMf5I_Up19D1JKDo&s",
     "sports"],

    ["Elastic Man",
     "https://elasticman.org/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOd96q-09yEcjQVk9SALEnSYmlGO8gPQuUq2q9ymXvxA&s=10",
     "arcade"],

    ["Hexanaut.io",
     "https://hexanaut.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFgMpGMHOuHQlh6wSYQ81R353y0NalkKohPsQ6UcnMxA&s=10",
     "arcade"],

    ["Falling Balls",
     "https://www.coolmathgames.com/0-falling-balls",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbCP0-K9IiEGVcAwcgYFsF3MpmZvp2t6KGSWzR9lOUXg&s=10",
     "puzzle"],

    ["Raft Wars",
     "https://www.crazygames.com/game/raft-wars-multiplayer",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOwpeHH54WOZxj5rDb23tf_JVwtYMQUM9SRKQ4NoVlcg&s=10",
     "shooter"],

    ["Super Mario Flash",
     "https://www.numuki.com/game/super-mario-flash/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGy4Nvwy8B8FoLx1LkavF0TJquPrpWj9tZN_1lGPCVDg&s=10",
     "arcade"],

    ["Rooftop Snipers",
     "https://rooftopsnipers.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6BXlQDjIXHHmL53h8A5ld8QBGB0iTUw-UVAT6h1q9A&s=10",
     "shooter"],

    ["Getaway Shootout",
     "https://getawayshootout.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SwAkZoIJKlnbR-A-ssLw9DV2oeKuMgQDeeWNJwzDcg&s",
     "shooter"],

    ["Basket Bros",
     "https://basketbros.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYOTA9Jcq_EqiwGD0KKKLvxT_O_hFoFgrJC5630GRQbw&s",
     "sports"],

    ["Chess",
     "https://www.chess.com/play/computer",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_2KDtoO7k4Icz4oaImct9pqy_NrDrFM5F8QH82BCkEg&s",
     "puzzle"],

    ["Checkers",
     "https://cardgames.io/checkers/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1JZ-kDO332_iKxs9E8YWj7-joi8FG-F9k55GmOlGrg&s=10",
     "puzzle"],

    ["Sudoku",
     "https://sudoku.com/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtCe2j0nrBE20unyim2TgSWxHbcMzoDr80HFW5KWLjSQ&s=10",
     "puzzle"],

    ["Minesweeper",
     "https://minesweeperonline.com/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD75wHcXtTRseFXOALoM5lnldDqXypY9r7d7pCM0xPZg&s",
     "puzzle"],

    ["Google Snake",
     "https://googlesnake.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5JPT-Cg57PqNqP1cybPJfxUFYwF-cQ72TCDTyKyY7Y1ZrrjRZWyuoII&s",
     "arcade"],

    ["Snake.io",
     "https://snake.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpI7btjJG8IhtI5gwznFCHxu_4txinIXem5wlYCrYhxShjrmewXB3wUNE&s",
     "arcade"],

    ["Uno Online",
     "https://unoonline.io/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQjS2GF0lf2O2bhVysjrq1_xq_Ueyq8QTMTD4eamflw&s",
     "puzzle"],

    ["Among Us Online",
     "https://amongusplay.online/",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKdrYfbCvwRTduKcecXhwEJnldyl2yXZOFpM_FkzppHCeAS3ozUUQWdtE&s",
     "arcade"]

];


/* =========================================================
   CATEGORY MAPPING
   ========================================================= */

const categoryMap = {

    all: null,

    arcade: "arcade",

    action: "shooter",

    puzzle: "puzzle",

    racing: "sports",

    sports: "sports",

    strategy: "puzzle",

    shooter: "shooter"

};


/* =========================================================
   CURRENT GAME STATE
   ========================================================= */

let currentGame = null;


/* =========================================================
   RENDER GAMES
   ========================================================= */

function renderGames() {

    if (!gamesGrid) {

        console.error(
            "gamesGrid was not found."
        );

        return;

    }


    const selectedCategory =
        gamesCategory
            ? gamesCategory.value
            : "all";


    const category =
        categoryMap[selectedCategory] || null;


    const search =
        gamesSearch
            ? gamesSearch.value
                .trim()
                .toLowerCase()
            : "";


    gamesGrid.innerHTML = "";


    const fragment =
        document.createDocumentFragment();


    let displayedGames = 0;


    games.forEach(function(game) {

        const name =
            game[0];

        const url =
            game[1];

        const image =
            game[2];

        const gameCategory =
            game[3];


        if (
            category &&
            gameCategory !== category
        ) {

            return;

        }


        if (
            search &&
            !name
                .toLowerCase()
                .includes(search)
        ) {

            return;

        }


        displayedGames++;


        const card =
            document.createElement("div");


        card.className =
            "gameCard";


        card.dataset.gameName =
            name;


        card.title =
            name;


        const img =
            document.createElement("img");


        img.className =
            "gameImage";


        img.src =
            image;


        img.alt =
            name;


        img.loading =
            "lazy";


        img.onerror =
            function() {

                img.style.display =
                    "none";

            };


        const title =
            document.createElement("div");


        title.className =
            "gameName";


        title.textContent =
            name;


        card.appendChild(img);

        card.appendChild(title);


        card.addEventListener(
            "click",
            function() {

                launchGame(game);

            }
        );


        fragment.appendChild(card);

    });


    if (
        displayedGames === 0
    ) {

        const noGames =
            document.createElement("div");


        noGames.className =
            "noGames";


        noGames.textContent =
            "No games found.";


        fragment.appendChild(noGames);

    }


    gamesGrid.appendChild(fragment);

}


/* =========================================================
   LAUNCH GAME
   ========================================================= */

function launchGame(game) {

    if (
        !game ||
        !game[1]
    ) {

        console.error(
            "Invalid game:",
            game
        );

        return;

    }


    currentGame =
        game;


    const gameName =
        game[0];


    const gameURL =
        game[1];


    console.log(
        "Opening game in new tab:",
        gameName,
        gameURL
    );


    /*
     * Open the game directly in a new tab.
     *
     * This is intentionally done directly inside
     * the card's click event so the browser sees
     * it as the result of a user action.
     */

    const newTab =
        window.open(
            gameURL,
            "_blank",
            "noopener,noreferrer"
        );


    /*
     * If the browser blocks the new tab,
     * provide a fallback.
     */

    if (!newTab) {

        console.warn(
            "The browser blocked the new tab."
        );


        const shouldOpen =
            confirm(
                "The browser blocked the game from opening in a new tab.\n\nOpen the game in this tab instead?"
            );


        if (shouldOpen) {

            window.location.href =
                gameURL;

        }


        return;

    }


    /*
     * Keep the games menu open in the
     * original tab.
     */

    if (gamesSystem) {

        gamesSystem.style.display =
            "block";

    }


    if (gamesWindow) {

        gamesWindow.style.display =
            "block";

    }


    if (gamesPage) {

        gamesPage.style.display =
            "block";

    }


    if (gamelaunchwindow) {

        gamelaunchwindow.style.display =
            "none";

    }

}


/* =========================================================
   SHOW GAMES PAGE
   ========================================================= */

function showGamesPage() {

    if (gamesPage) {

        gamesPage.style.display =
            "block";

    }


    if (gamelaunchwindow) {

        gamelaunchwindow.style.display =
            "none";

    }

}


/* =========================================================
   BACK TO GAMES
   ========================================================= */

function backToGames() {

    currentGame =
        null;


    showGamesPage();


    renderGames();

}


/* =========================================================
   OPEN GAMES
   ========================================================= */

function openGames() {

    if (!gamesSystem) {

        console.error(
            "gamesSystem was not found."
        );

        return;

    }


    gamesSystem.style.display =
        "block";


    if (gamesWindow) {

        gamesWindow.style.display =
            "block";

    }


    showGamesPage();


    renderGames();

}


/* =========================================================
   CLOSE GAMES
   ========================================================= */

function closeGamesWindow() {

    currentGame =
        null;


    if (gamesSystem) {

        gamesSystem.style.display =
            "none";

    }


    if (gamesWindow) {

        gamesWindow.style.display =
            "none";

    }


    if (gamelaunchwindow) {

        gamelaunchwindow.style.display =
            "none";

    }


    if (gamesPage) {

        gamesPage.style.display =
            "block";

    }

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

if (gamesCategory) {

    gamesCategory.addEventListener(
        "change",
        renderGames
    );

}


/* =========================================================
   SEARCH
   ========================================================= */

if (gamesSearch) {

    gamesSearch.addEventListener(
        "input",
        renderGames
    );

}


/* =========================================================
   BROWSE ALL
   ========================================================= */

if (browseAllGames) {

    browseAllGames.addEventListener(
        "click",
        function() {

            if (gamesCategory) {

                gamesCategory.value =
                    "all";

            }


            if (gamesSearch) {

                gamesSearch.value =
                    "";

            }


            renderGames();

        }
    );

}


/* =========================================================
   GAMES BUTTON
   ========================================================= */

if (gamesButton) {

    gamesButton.addEventListener(
        "click",
        openGames
    );

}


/* =========================================================
   CLOSE GAMES
   ========================================================= */

if (closeGames) {

    closeGames.addEventListener(
        "click",
        closeGamesWindow
    );

}


/* =========================================================
   BACK BUTTON
   ========================================================= */

if (gameLaunchBack) {

    gameLaunchBack.addEventListener(
        "click",
        backToGames
    );

}


/* =========================================================
   FULLSCREEN BUTTON
   ========================================================= */

if (gameLaunchFullscreen) {

    gameLaunchFullscreen.addEventListener(
        "click",
        function() {

            console.log(
                "Fullscreen is controlled by the game tab."
            );

        }
    );

}


/* =========================================================
   RETRY BUTTON
   ========================================================= */

if (gameLaunchRetry) {

    gameLaunchRetry.addEventListener(
        "click",
        function() {

            if (currentGame) {

                launchGame(
                    currentGame
                );

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            !gamesSystem ||
            gamesSystem.style.display !==
            "block"
        ) {

            return;

        }


        closeGamesWindow();

    }
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

if (gamesSystem) {

    gamesSystem.style.display =
        "none";

}


if (gamesWindow) {

    gamesWindow.style.display =
        "none";

}


if (gamesPage) {

    gamesPage.style.display =
        "block";

}


if (gamelaunchwindow) {

    gamelaunchwindow.style.display =
        "none";

}


if (gameLaunchLoading) {

    gameLaunchLoading.style.display =
        "none";

}


if (gameLaunchFailed) {

    gameLaunchFailed.style.display =
        "none";

}


/* =========================================================
   INITIAL RENDER
   ========================================================= */

renderGames();


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "Games system successfully initialized."
);


console.log(
    "Games available:",
    games.length
);


console.log(
    "Game launch mode: New tab"
);