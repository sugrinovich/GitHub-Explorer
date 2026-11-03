# RepoScope — GitHub Explorer

Веб-приложение для поиска репозиториев на GitHub. Ищите по ключевому слову, уточняйте результаты фильтрами, сохраняйте понравившиеся репозитории в избранное и переходите на GitHub в один клик.

![Скриншот RepoScope](./docs/screenshot.png)

**Демо:** https://github-explorer-aibfhmopf-sugr1.vercel.app

## Возможности

- Поиск репозиториев по ключевому слову через GitHub REST API (по кнопке или Enter)
- Быстрые теги «Popular searches»: `react`, `typescript`, `developer tools`, `ai agents`
- Фильтры (применяются кнопкой **Apply**, сбрасываются кнопкой **Reset**):
  - язык программирования
  - минимальное количество звёзд (Any, 100+, 1,000+, 10,000+)
  - дата последнего обновления
  - сортировка по звёздам, форкам или issues
- Карточки репозиториев: аватар, название, описание, язык, звёзды, форки, открытые issues и время обновления
- Пагинация (Previous / Next), по 3 карточки на странице
- Избранное (страница `/saved`): репозитории можно сохранять и удалять, список хранится в `localStorage` и не пропадает после перезагрузки страницы. Фильтры работают и для избранного
- Клик по карточке открывает репозиторий на GitHub в новой вкладке, карточка доступна с клавиатуры
- Ошибки запроса и исчерпанный лимит GitHub показываются прямо на странице
- Адаптивная вёрстка для мобильных экранов
- Длинные описания обрезаются до 128 символов, если описания нет, показывается «No description»

## Технологии

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [oxlint](https://oxc.rs/) для линтинга
- [GitHub REST API](https://docs.github.com/en/rest)
- `localStorage` для избранного

## Запуск проекта

### Требования

- Node.js 20.19+ или 22.12+ (требование Vite)
- npm

### Установка

```bash
git clone https://github.com/sugrinovich/GitHub-Explorer.git
cd GitHub-Explorer
npm install
npm run dev
```

Приложение откроется по адресу `http://localhost:5173` (точный порт выводится в терминале).

### Другие команды

```bash
npm run build     # production-сборка
npm run preview   # локальный просмотр production-сборки
npm run lint      # проверка кода линтером
```

## Как это работает

### Запрос поиска

Используется endpoint поиска репозиториев:

```
GET https://api.github.com/search/repositories
```

Пример:

```bash
curl -H "Accept: application/vnd.github+json" \
  "https://api.github.com/search/repositories?q=react&per_page=100&page=1"
```

| Параметр   | Описание                                       | Пример  |
|------------|------------------------------------------------|---------|
| `q`        | Поисковый запрос (экранируется `URLSearchParams`) | `react` |
| `per_page` | Результатов на странице (максимум 100)         | `100`   |
| `page`     | Номер страницы                                 | `1`     |

За один поиск приложение загружает до 5 страниц по 100 результатов (до 500 репозиториев). Фильтры, сортировка и пагинация затем работают на клиенте по загруженным результатам, без новых запросов к API. Если начать новый поиск, пока идёт предыдущий, старый запрос отменяется через `AbortController`.

### Пример ответа (сокращённый)

```json
{
  "total_count": 500000,
  "incomplete_results": false,
  "items": [
    {
      "id": 10270250,
      "name": "react",
      "full_name": "facebook/react",
      "owner": {
        "login": "facebook",
        "avatar_url": "https://avatars.githubusercontent.com/u/69631?v=4"
      },
      "html_url": "https://github.com/facebook/react",
      "description": "The library for web and native user interfaces.",
      "language": "JavaScript",
      "stargazers_count": 250000,
      "forks_count": 51000,
      "open_issues_count": 1400,
      "updated_at": "2026-10-01T12:00:00Z"
    }
  ]
}
```

Значения приведены для примера, реальные числа постоянно меняются.

### Поля, которые использует приложение

| Поле                | Тип           | Для чего                                |
|---------------------|---------------|-----------------------------------------|
| `full_name`         | string        | Заголовок карточки                      |
| `owner.avatar_url`  | string        | Аватар                                  |
| `description`       | string / null | Описание                                |
| `language`          | string / null | Язык                                    |
| `stargazers_count`  | number        | Звёзды                                  |
| `forks_count`       | number        | Форки                                   |
| `open_issues_count` | number        | Issues                                  |
| `updated_at`        | string (ISO)  | «Updated 2h ago»                        |
| `html_url`          | string        | Ссылка на репозиторий на GitHub         |
| `total_count`       | number        | Сколько страниц результатов загрузить   |

### Избранное

Сохранённые репозитории записываются в `localStorage` под одним ключом в виде JSON-массива. Кнопка **Save** добавляет репозиторий, кнопка **Delete** удаляет. Если очистить данные браузера, избранное тоже очистится.

## Ограничения

- GitHub Search API работает без токена, но с лимитом: **10 запросов в минуту** для неавторизованных запросов. Один поиск тратит до 5 запросов. Когда лимит исчерпан, приложение читает заголовок `X-RateLimit-Reset` и показывает на кнопке, через сколько секунд можно искать снова.
- Поиск GitHub отдаёт максимум первые **1000** результатов по любому запросу; приложение загружает первые 500.
- Фильтры применяются только к загруженным результатам, а не ко всему GitHub.

### Ошибки

| Код | Значение                           |
|-----|------------------------------------|
| 403 / 429 | Превышен лимит запросов      |
| 422 | Некорректный поисковый запрос      |
| 503 | GitHub временно недоступен         |

## Структура проекта

```
src/
├── app/                 # App: роутинг и состояние избранного
├── pages/               # MainPage (/) и SavedPage (/saved)
├── shared/
│   ├── components/
│   │   ├── Body/        # содержимое страниц поиска и избранного
│   │   ├── Header/      # шапка с навигацией
│   │   ├── Pagination/
│   │   ├── RepoCards/   # список и карточка репозитория
│   │   ├── RepoSearch/  # поле поиска и популярные запросы
│   │   └── RepoSort/    # панель фильтров
│   ├── hooks/           # useRepoExplorer (поиск), usePaginations, useFavorites
│   ├── types/           # типы ответа GitHub API и фильтров
│   └── utils/           # фильтрация, форматирование чисел и дат, цвета языков
└── styles/              # глобальные стили и переменные темы
```

## Лицензия

[MIT](./LICENSE)