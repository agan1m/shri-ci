1. cd server && npm start
2. cd agent && npm start в package.json можно указать порт, по дефолту 3001

## Обработка ситуаций

Сервер должен корректно обрабатывать ситуацию, когда агенты не справляются с поступающими заявками:

Отпарвляет сообщение что агенты заняты.

Агент должен корректно обрабатывать ситуацию, когда при старте не смог соединиться с сервером:

Агент не запускается.

Агент должен корректно обрабатывать ситуацию, когда при отправке результатов сборки не смог соединиться с сервером:

Сохраняет в кэш и отправляет вместе со следующим билдом.

P.S
Почему то не коммитится папка logs в agent, если не будет работать создать ее.