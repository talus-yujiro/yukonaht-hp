//変数を定義する場所
let time = 0;
let otterpower = localStorage.getItem(document.getElementById("name").value);
let powerCount = true;
let playerName = document.getElementById("name").value;
let requidedTime4Power = 5000;
let powerIncrementFlag = false;


//もしプレイヤー名が空だったら名前を"playerxxx"にする
if (playerName === "") {
    document.getElementById("name").value = "player" + Math.floor(Math.random() * 1000);
    otterpower = 10;
};


//時間を動かす
//獺パウワァの増減
let timeInterval = setInterval(() => {
    document.getElementById("time").innerHTML = formatDate(new Date());
    time++;
    if(time === requidedTime4Power && powerIncrementFlag) {
        otterpower++;
        time = 0;
    }
    document.getElementById("powerValue").innerHTML = otterpower;
}, 1);

document.getElementById("powerIncrement").addEventListener("click", () =>{
    if(otterpower >= 10) {
        otterpower -= 10;
        powerIncrementFlag = true;
        alert('購入しました');
    } else {
        alert('パウワァが足りません！！');
    }
});


//セーブ
document.getElementById("save").addEventListener("click",() => {
    localStorage.setItem(document.getElementById("name").value, otterpower);
});


//ロード
document.getElementById("road").addEventListener("click",() => {
    otterpower = localStorage.getItem(document.getElementById("name").value);
});


//日付をyy/mm/dd hh:mm:ssにする
function formatDate(date) {
    const pad = (num) => String(num).padStart(2, '0');
    return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}



//↓↓一旦置いておく場所

/**
 * 条件が揃ったら resolve 関数を走らせる。
 * Promise や Proxy を使いこなせばもっとスマートに書けるかも
 * @param {Function} conditionCallback resolve が走るための真偽値を返す関数
 * @param {Function} nonresolve 条件が揃うまで実行する関数
 * @param {Function} resolve 条件が揃ったら走る関数
 * @param {Number} intervalMillSecond ポーリング間隔ミリ秒
 */
function waitAsync(conditionCallback, nonresolve, resolve, intervalMillSecond = 100) {
    if (conditionCallback()) {
        // 待つまでもなく成立しているパターン用
        resolve();
        return;
    }
    // 条件が成立するまで setInterval でポーリング的なループ
    const intervalId = setInterval(() => {
        if (!conditionCallback()) {
            // 条件関数が false を返した時はループ続行
            nonresolve();
            return;
        }
        // 条件関数が true を返した時はループ用の interval を消去
        clearInterval(intervalId);
        // 条件関数が true を返した時は resolve 関数を実行
        resolve();
    }, intervalMillSecond)
}
