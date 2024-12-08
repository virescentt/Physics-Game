const G = 9.8;
// Автоматически генерируем таблицу значений синусов и косинусов
const angleTrigValues = {};
for (let angle = 0; angle <= 90; angle++) {
    angleTrigValues[angle] = {
        sin: parseFloat(Math.sin(angle * Math.PI / 180).toFixed(2)),
        cos: parseFloat(Math.cos(angle * Math.PI / 180).toFixed(2))
    };
}


const imgWrong = new Image();
imgWrong.src = '../img/cryNigga.gif';
