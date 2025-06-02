# Таймер

## Срок сдачи работ

Последний коммит и пул реквест должен быть оформлен до ???

## Цель:

Научиться использовать Javascript для работы со временем и `setInterval`

_Ознакомиться с тем как они должны выглядеть можно [здесь](https://21isr.github.io/uidev-lab17/)_

Ваша задача дописать сайт

## Теория

### setInterval

**setInterval** - метод JavaScript, который выполняет функцию через определенные промежутки времени

```JavaScript
let count = 0;
let timer = setInterval(() => {
    count++;
    console.log(`Прошло секунд: ${count}`);

    // Автоматическая остановка на 10 секундах
    if (count >= 10) {
        clearInterval(timer);
    }
}, 1000);
```

-   `1000` - задержка в миллисекундах (1000ms = 1 секунда)
-   `timer` - возвращаемый ID для управления интервалом

### Превращение секунд в часы, минуты и секунды

```JavaScript
let count = 0;

function updateClock() {
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Либо возвращаем значение в стиле `${formattedHours}:${formattedMinutes}:${formattedSeconds}`, либо прям тут задаем значение для DOM элемента
}
```

### Изменение прогресса круга

```JavaScript
function updateCircleProgress(circle, value, max) {
    const progress = (value / max) * circumference
    circle.style.strokeDasharray = `${progress} ${circumference}`
}

updateCircleProgress(hoursCircle, hours, 24)
```

-   `circle` - HTML элемент круга определенной единицы изменеия времени
-   `value` - сколько часов/минут/секунд
-   `max` - максимальное значение

### Создание записи круга

```JavaScript
function recordLap() {
    if (isRunning) {
        lapCount++
        const currentTime = formatTime(elapsedTime)

        const lapItem = document.createElement("div")
        lapItem.className = "lap-item"
        lapItem.innerHTML = `
                    <span class="lap-number">Lap ${lapCount}</span>
                    <span class="lap-time">${currentTime}</span>
                `

        lapList.insertBefore(lapItem, lapList.firstChild)
        lapsContainer.style.display = "block"
    }
}
```

## Как сдавать

1. Создайте форк репозитория в организации `21ISR` с названием `uidev-lab16-вашафамилия`
2. Используя ветку `wip` сделайте задание
3. Зафиксируйте изменения в вашем репозитории
4. Когда документ будет готов - создайте пул реквест из ветки `wip` (вашей) на ветку `main` (тоже вашу) и укажите меня ([ktkv419](https://github.com/ktkv419)) как reviewer

**Не мержите сами коммит**, это сделаю я после проверки задания
