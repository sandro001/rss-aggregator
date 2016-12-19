# RSS-Aggregator

Ап на фреймворку [Sails](http://sailsjs.org) з використанням БД MySQL.

## 4-та лабораторна робота

#### 1-ше завдання

Ми використали `docker-compose` для підняття БД та серверу. В нас виникла проблема, яка полягала в тому, що сервер запускався раніше БД, і видавав помилку, оскільки не міг під'єднатись до БД.

Ми не знайшли рішень *з коробки*, але знайшли скрипт, яки прослуховує порт, і як тільки той стає доступний - закінчує свою роботи, тим самим дозволяє виконати наступні команди.

Команда для збірки образу:

`docker build -t aggregator .`

Команда для запуску:

`docker-compose up`

#### 2-ге завдання

Поспілкувавшись з одногрупниками, які пишуть проект на Java та інших мовах, ми зрозуміли що NodeJS не зовсім підходить для цього завдання. Справа в тому, що ап на NodeJS та Sails неможливо зібрати в якийсь один файл. Для запуску в продакшені необхідний весь проект, включаючи модулі npm (за виключенням `grunt`), а режим продакшену вмикається додаванням параметру `--prod` до команди `sails lift`.
Тому ми вирішили просто показати вміння працювати з параметром `-v` - розшарили папку з мініфікованими файлами www.

Для цього необхідно виконати команду 

`docker run -v [`шлях до папки на вашій host-машині`]:/home/apps/rss-aggregator/www aggregator grunt buildProd`

#### 3-тє завдання

Спочатку ми пішли по прикладу 3-ї лабораторної роботи, і просто запускали сервер командою `sails lift`, після чого вже виконували інтеграційні тести. І воно працювало. Але потім ми уважніше почитали завдання і зрозуміли що необхідно використовувати докер.

Знову ж таки в нас виникла проблема - образ сервера запускався раніше ніж піднімалась БД. Ми намагались використати рішення з першого завдання, але або скрипт зависав по якійсь причині, або ми не змогли правильно вказати хост для скрипта (ми пробували `bash ./wait-for-it.sh aggregator-mysql:3306`).
В результаті ми дійшли до звичайного `sleep 60`.

