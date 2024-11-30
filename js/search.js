// Для поиска
// document.getElementById('searchInput').addEventListener('keydown', function (event) {
//     const query = this.value;
//     console.log('ну я впрочем смотрю, но ничего не вижу!!');
// });

/* Event listener */
const author = document.querySelector("author");
console.log(author);

auhor.addEventListener('click', function () {
    console.log('Да, я Virescent');
});

/* Function */
function doThing(){
   alert('Horray! Someone wrote!');
}

document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value;
    const cards = document.querySelectorAll('.card');
    console.log('ну я впрочем смотрю, но ничего не вижу!!');
    cards.forEach(card => {

        const id = card.getAttribute('data-id');

        // Проверяем совпадение с query и показываем/скрываем
        if (id.startsWith(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
