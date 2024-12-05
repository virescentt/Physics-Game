function validateAndShowAnswer(calcFunction, paramNames, resultElementId = 'resultSection', {measurementVal = ''} = {}) {
  const formulaBtn = document.querySelector('.show-formula-btn');
  const formulaSpan = formulaBtn.querySelector('span');
  const answerBtn = document.getElementById('display-answer');
  const errorMessage = document.getElementById('error-message');
  const resultSection = document.getElementById(resultElementId);
  errorMessage.style.display = 'none';
  resultSection.innerHTML = '';  // Очищаем предыдущий ответ

  let valid = true;

  // Проверяем каждый input
  paramNames.forEach(name => {
      const input = document.getElementById(name);
      if (input && input.value === '') {
          input.style.borderColor = 'red';  // Подсвечиваем красным
          valid = false;
      } else if (input) {
          input.style.borderColor = '';  // Сбрасываем стиль
      }
  });


  if (!valid) {
      errorMessage.style.display = 'block';  // Показываем сообщение об ошибке
  } else {
    paramNames.forEach(name => {
      const input = document.getElementById(name);
      input.setAttribute('readonly', true);
    });
      // Если все поля заполнены, вычисляем и показываем ответ
      const params = paramNames.map(name => parseFloat(document.getElementById(name).value));
      let result = calcFunction(...params);  // Используем переданную функцию с параметрами
      result = Math.round(result * 100) / 100;
      formulaBtn.classList.add('btn-disabled');
      formulaBtn.disabled = true; // Отключаем кнопку для дальнейших кликов
      answerBtn.classList.add('btn-disabled');
      // answerBtn.disabled = true;
      answerBtn.style.display = 'none';

      formulaSpan.style.color = '';

      // вот здесь уже вопрос, не думаю что мне в эту секцию надо выводить ответ
      resultSection.innerHTML = `Ответ: ${result} ${measurementVal}`;

      // checkSection.style.display = 'block'; Немодальные кнопки Верно/Неверно

      showModal(result, measurementVal);  // Показываем модальное окно с правильным ответом
  }
}


// function validateAndShowAnswer(calcFunction, paramNames, resultElementId, correctAnswer) {
//   const inputs = document.querySelectorAll('input');
//   const answerBtn = document.getElementById('display-answer');
//   const errorMessage = document.getElementById('error-message');
//   const resultSection = document.getElementById(resultElementId);
//   const checkSection = document.getElementById('checkSection');
//   errorMessage.style.display = 'none';
//   resultSection.innerHTML = '';  // Очищаем предыдущий ответ
//   checkSection.style.display = 'none'; // Скрываем кнопки "Верно/Неверно"

//   let valid = true;

//   // Проверяем каждый input по названиям параметров
//   paramNames.forEach(name => {
//       const input = document.getElementById(name);
//       if (input && input.value === '') {
//           input.style.borderColor = 'red';  // Подсвечиваем красным
//           valid = false;
//       } else if (input) {
//           input.style.borderColor = '';  // Сбрасываем стиль
//       }
//   });

//   if (!valid) {
//       errorMessage.style.display = 'block';  // Показываем сообщение об ошибке
//   } else {
//       // Если все поля заполнены, вычисляем и показываем ответ
//       const params = paramNames.map(name => parseFloat(document.getElementById(name).value));
//       const result = calcFunction(...params);  // Используем переданную функцию с параметрами
//       answerBtn.classList.add('btn-disabled');
//       resultSection.innerHTML = `Ответ: ${result}`;  // Выводим результат
//       checkSection.style.display = 'block'; // Показываем кнопки
//   }
// }


function showFormula() {
  // Получаем кнопку и формулу
  const button = document.getElementById('showFormulaBtn');
  const formula = document.getElementById('formula'); // Элемент <p> с формулой
  const span = button.querySelector('span');

  const warningMessage = document.getElementById('formulaWarning');
  warningMessage.style.display = 'block';
  warningMessage.classList.add('formula-warning');

  // Проверяем, была ли уже показана формула
  if (formula.style.display === "none" || formula.style.display === "") {
      formula.style.display = "block"; // Показываем формулу
      button.classList.add('btn-disabled'); // Добавляем класс для неактивной кнопки
      button.disabled = true; // Отключаем кнопку для дальнейших кликов
      span.style.display = 'none';
      console.log('Формула показана');
  } else {
      console.log('Формула уже отображается');
  }


  console.log('Hmm.. But you have clicked my bro');
  const pointsEl = document.getElementById("points");
  const animationContainer = document.getElementById("points-animation");

  // Уменьшаем баллы
  let currentPoints = parseFloat(pointsEl.textContent);
  const decrement = 0.5;
  if (currentPoints > 0) {
      console.log(`перед этим ${pointsEl.textContent}`)
      pointsEl.textContent = (currentPoints - decrement).toFixed(1);
      console.log(`отработало ${pointsEl.textContent}`)

      // Создаем красную анимацию "-0.5"
      const pointsChange = document.createElement("span");
      pointsChange.textContent = `-${decrement}`;
      pointsChange.classList.add("points-change");
      animationContainer.appendChild(pointsChange);

      // Удаляем элемент после завершения анимации
      pointsChange.addEventListener("animationend", () => {
          animationContainer.removeChild(pointsChange);
      });

      // Добавляем временное покраснение текста баллов
      pointsEl.style.color = "red";
      setTimeout(() => {
          pointsEl.style.color = ""; // Возвращаем стандартный цвет
      }, 300);
  }
}


// Показываем модальное окно
function showModal(result, measurementVal) {
    const modal = document.getElementById('answerModal');
    const modalAnswerText = document.getElementById('modalAnswerText');
    const warningMessage = document.querySelector('.formula-warning');

    document.body.style.overflow = 'hidden';

  // Устанавливаем текст ответа
  modalAnswerText.innerHTML = `Правильный ответ: <span> ${result} ${measurementVal} </span>`;

  // Добавляем класс для отображения модального окна
  modal.classList.add('show');
  toggleBlur(true);
  warningMessage.style.color = 'darkgrey';

}

// Закрываем модальное окно
function closeModal(resultElementId = 'resultSection', fromWhom = 'button') {
  const modal = document.getElementById('answerModal');
  const modalBtns = document.getElementById('modalButtons');
  const resultSection = document.getElementById(resultElementId);


  resultSection.style.opacity = 1;

  // Добавляем класс для скрытия модального окна
  modal.classList.remove('show');
  for (let btn of modalBtns.children) {
    btn.disabled = true; // Добавляем класс каждому дочернему элементу
    btn.classList.add("hidden");
  }


  if (fromWhom == 'cross') {
    toggleBlur(false); // оно срабатывает при нажатии на кнопки Верно Неверно с нужным им таймом, поэтому это излишне если не использовать крестик
    location.reload();
  }

}

// Универсальная функция для проверки правильности ответа
function checkAnswer(isCorrect, finalPointsElementId) {
  closeModal();

  const finalPointsEl = document.getElementById(finalPointsElementId);


  // Создаем элемент для отображения результата
  const resultDisplay = document.createElement('div');
  resultDisplay.id = 'resultDisplay';
  document.body.appendChild(resultDisplay);


  if (isCorrect) {
    // Логика для правильного ответа
    resultDisplay.innerHTML = `
    <div class="shine-effect_points">
      <div id="winnerText" class="points-text animate__animated animate__jackInTheBox">+${finalPointsEl.textContent} <i style="color: rgb(255, 191, 0);" class="fas fa-trophy"></i></div>
      <div class="celebration"></div>
    </div>
    `;

    triggerCelebration(); // Анимация салюта
  } else {
    // Логика для неправильного ответа
    resultDisplay.innerHTML = `
    <img class="pepe-cry animate__animated animate__rubberBand " src="../img/pepe_cry.png" alt="Плачущий Пепе">
  `;

  toggleBlur(true);  // Включить размытый фон

  }

  // Удаляем сообщение через несколько секунд
  setTimeout(() => {
    resultDisplay.remove();
    toggleBlur(false);
    location.reload();
  }, 2000);


}

function toggleBlur(is_show) {
  const blurElement = document.getElementById('blurred-background');
  if (is_show) {
      blurElement.classList.add('active');
  } else {
      blurElement.classList.remove('active');
  }
}

function triggerCelebration() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.7 },
    zIndex: 1000,
  });

}

// Получаем все инпуты внутри формы с id 'task-form'
const inputs = document.querySelectorAll('#task-form input[type="text"]');

// Добавляем обработчик события для каждого инпута
inputs.forEach(input => {
  input.addEventListener('input', function(event) {
    let value = event.target.value;

    // Заменяем запятую на точку
    value = value.replace(',', '.');

    // Убираем все символы, кроме цифр и точки
    value = value.replace(/[^0-9.]/g, '');

    // Если точка появляется больше одного раза, удаляем лишние
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }

    // Ограничиваем до двух знаков после запятой
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    event.target.value = value;
  });
});

// const infoBox = document.getElementById("infoBox");
// const infoTab = document.getElementById("infoTab");

// // Переключение видимости бокса
// infoTab.addEventListener("click", () => {
//   infoBox.classList.toggle("open");
// });

// // Закрытие бокса при клике за его пределами
// document.addEventListener("click", (event) => {
//   if (!infoBox.contains(event.target) && !infoTab.contains(event.target)) {
//     infoBox.classList.remove("open");
//   }
// });

//
// function validateAndShowAnswer(calcFunction, paramNames, resultElementId) {
//   const inputs = document.querySelectorAll('input');
//   const errorMessage = document.getElementById('error-message');
//   const resultSection = document.getElementById(resultElementId);
//   errorMessage.style.display = 'none';
//   resultSection.innerHTML = '';  // Очищаем предыдущий ответ

//   let valid = true;

//   // Проверяем каждый input по названиям параметров
//   paramNames.forEach(name => {
//       const input = document.getElementById(name);
//       if (input && input.value === '') {
//           input.style.borderColor = 'red';  // Подсвечиваем красным
//           valid = false;
//       } else if (input) {
//           input.style.borderColor = '';  // Сбрасываем стиль
//       }
//   });

//   if (!valid) {
//       errorMessage.style.display = 'block';  // Показываем сообщение об ошибке
//   } else {
//       // Если все поля заполнены, вычисляем и показываем ответ
//       const params = paramNames.map(name => parseFloat(document.getElementById(name).value));
//       const result = calcFunction(...params);  // Используем переданную функцию с параметрами
//       resultSection.innerHTML = `Ответ: ${result}`;  // Выводим результат
//   }
// }

