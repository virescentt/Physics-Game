function homeCardGeneration () {

    const cardsContainer = document.getElementById('cardsContainer');

    console.log('погнаЛИИИ');
    // Генерация карточек

    for (let i = 1; i <= 30; i++) {
        // Шаблон HTML с динамическим номером
        const cardHTML = `
            <a href="cards/card-${i}.html">
                <div class="card" data-id="${i}">
                    Kartka ${i}
                </div>
            </a>
        `;

        // Создаем временный элемент, чтобы вставить HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;

        // Добавляем карточку в контейнер
        cardsContainer.appendChild(tempDiv.firstElementChild);
    }

    // Добавляем скрытый параграф "Nie znaleziono wyników"
    const notFoundText = document.createElement('p');
    notFoundText.id = 'notFoundMessage';
    notFoundText.innerHTML = `Jest tylko 30 kartek <i style="color: #666; margin-left: 5px;" <i class="fa-regular fa-face-frown"></i>`;
    notFoundText.style.display = 'none';
    notFoundText.style.opacity = '.8';
    notFoundText.style.color = '#666';
    cardsContainer.appendChild(notFoundText);

}



// Для поиска
// document.getElementById('searchInput').addEventListener('keydown', function (event) {
//     const query = this.value;
//     console.log('ну я впрочем смотрю, но ничего не вижу!!');
// });



document.getElementById('searchInput').addEventListener('input', function () {
    notFoundMessage.style.display = 'none';

    const query = this.value;
    const cards = document.querySelectorAll('.card');
    let firstVisibleCard = null;

    console.log('Im looking..');
    cards.forEach(card => {
        const id = card.getAttribute('data-id');

        // Проверяем совпадение с query и показываем/скрываем
        if (id.startsWith(query)) {
            card.style.display = 'inline-block';
            if (!firstVisibleCard) {
                firstVisibleCard = card; // Запоминаем первую видимую карточку
            }
        } else {
            card.style.display = 'none';

        }
    });

    // Если есть совпадения, прокрутить к первой видимой карточке
    if (firstVisibleCard) {
        firstVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Если совпадений нет, прокручиваем к началу контейнера
        const cardsContainer = document.getElementById('cardsContainer');
        notFoundMessage.style.display = 'block';
        cardsContainer.style.boxShadow = 'none';
        cardsContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
// document.getElementById('searchInput').addEventListener('input', function () {
//     const query = this.value;
//     const cards = document.querySelectorAll('.card');
//     console.log('Im looking..');
//     cards.forEach(card => {

//         const id = card.getAttribute('data-id');

//         // Проверяем совпадение с query и показываем/скрываем
//         if (id.startsWith(query)) {
//             card.style.display = 'inline-block';
//         } else {
//             card.style.display = 'none';
//         }
//     });
// });

