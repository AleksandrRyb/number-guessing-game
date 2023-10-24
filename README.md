# Number guessing game

## Game Rules
One player thinks of a number, and the other player must guess whether it's an even number or not. Initially, both players are given 3 turns. If no winner is determined after all turns, the game continues between the leading players until one of them provides the correct answer.

## How to Get Started
After logging in with your Google account, you will arrive at the home page. Here, you will have the option to create a new game and log out. When creating a new game, you will be automatically redirected to the game page, where you can invite other users via email and write them a message. Once there are at least two participants in the game, you can start the game by clicking the "Game Start" button, which will appear next to the "Invite" button on the right side of the Navbar. From there, the game progresses according to the rules mentioned above, until its conclusion. Afterward, you will receive a message about the outcome, which will return you to the home page.

## Here are the steps:

1. Log in.
2. Create a game (Center button).
3. On the game page, click "Invite" (Note: You can only invite a user who is currently logged into the application and is in it; otherwise, they won't receive the message as email functionality is not connected).
4. After there are at least 2 participants on the game page, the "Start Game" button appears (located to the right of the "Invite" button). Click it.
5. The game starts, and players take turns guessing numbers. Each player has 3 turns. If players have the same number of points at the end, the game continues until one of them guesses a number.
6. A victory message will appear. Click it to be redirected to the home page.

## Local Development
```npm start``` Launches the application locally.
```npm run functions-local``` Runs Firebase functions locally.
```npm run deploy``` Builds the application and deploys it to Firebase simultaneously. Ensure you have the Firebase CLI installed before running.

Note
Currently, there is a static list of games on the home page. There are plans to create a list of games in which you are participating.






## Правила игры.

Один игрок загадывает число другому и второй должен отгадать четное это число или нет. Изначально всем дается 3 хода. Если по истечению всех ходов победитель не будет выявлен, то игра продолжится между лидирующими игроками.
Пока один из них не даст правильный ответ.

## Как начать играть.

Пройдя авторизацию google вы попадете на домашнюю страницу. На ней у вас будет возможность создать новую игру и сделать logout. При создании новой игры у вас автоматически сработает редирект на страницу игры, откуда вы уже сможете пригласить пользователей по email и написать ему сопроводительное сообщение. После того как в игру зашло не менее двух человек вы можете начать игру нажав кнопку GameStart, которая появится возле кнопки Invite в правой стороне Navbar.
Далее все идет по выше указаным правилам до самого конца. После вы получите сообщение о победе или поражении которое отправит вас на домашнюю страницу.

**Теперь по шагам**
1.Логинимся
2.Создаем игру(Кнопка по центру)
3.На странице с игрой жвем Invite(Можно инвайтить только пользователя который сейчас авторизован в приложении и находится в нем. Иначе сообщение ему не придет. Emailing не подключен)
4.После того как на странице игры появилось хотябы 2 человека появляется кнопка Start Game(Справа от кнопки Invite) Жмем
5.Игра началась и мы по очереди загадываем числа. У каждого по 3 хода.Если по окончанию у игроков будет одинаково колличество очков то игра продолжается. До первого угаданного числа
6.Приходит сообщение о победе. Жмем и редиректимся на домашнюю страницу.

## Работа локально

**npm start** Запускает приложение локально
**npm run functions-local** Запускает локально firebase функции.
**npm run deploy** Делает одновременно build приложения и запускает firebase deploy. **Убедитесь что перед запуском у вас установлен firebase CLI**

## Примечание

Сейчас на домашней странице есть статический список игр. В планах сделать список игр в которых ты принимаешь участие.
