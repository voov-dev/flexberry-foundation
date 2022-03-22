# [Результат работы](https://voov-dev.github.io/flexberry-foundation/)
[Описание тестового задания](https://github.com/Flexberry/flexberry-foundation-internship-task);
Вывожу 5 элементов согласно ТЗ

## Файлы вошедшие в сбору:
`source/js/model/`
- [abstract-model](/source/js/model/abstract-model.js)
- [filter-model](/source/js/model/filter-model.js)
- [ticket-model](/source/js/model/ticket-model.js)

`source/js/presenter/`
- [app-presenter](/source/js/presenter/app-presenter.js)
- [ticket-item-presenter](/source/js/presenter/ticket-item-presenter.js)
- [ticket-list-presenter](/source/js/presenter/ticket-list-presenter.js)

`source/js/utils/`
- [observer](/source/js/utils/observer.js)
- [render](/source/js/utils/render.js)
- [sort-tickets](/source/js/utils/sort-tickets.js)
- [filter-tickets](/source/js/utils/filter-tickets.js)
- [get-date](/source/js/utils/get-date.js)
- [incline-word](/source/js/utils/incline-word.js)

`source/js/view/`
- [abstract-view](/source/js/view/abstract-view.js)
- [app-view](/source/js/view/app-view.js)
- [filter-stops-view](/source/js/view/filter-stops-view.js)
- [sorting-order-view](/source/js/view/sorting-order-view.js)
- [ticket-item-view](/source/js/view/ticket-item-view.js)
- [ticket-layout-view](/source/js/view/ticket-layout-view.js)

`source/js/`
- [api](/source/js/api.js)
- [const](/source/js/const.js)
- [main](/source/js/main.js)


## [Гайд по работе со сборкой](/GUIDE.md) 📕

## Краткая инструкция по работе
Для начала работы у вас должент быть установлен **Node.js** 14 версии

### Основные команды для работы
- Установка - `npm install --save --save-exact`
- Запуск локального сервера - `npm start`
- Сборка проекта, минификация скриптов <br>
и оптимизация изображений перед деплоем на прод - `npm run build`
- Запуск тестирования на соответствия кодгайдам - `npm test`
- Создание webp изображений в директории source - `npm run webp`

### Вся разработка ведётся в директории `source`
### Итоговый код попадает в директорию `build`
