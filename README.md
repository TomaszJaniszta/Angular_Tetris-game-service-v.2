# Angular
2 versions of the application.
Aplication is simulation of service with tetris game with different functionalities.
# Version 1. 
	I. Intro page with intro text and player form
		* Form with two inputs: player name, player email (validation)
  		* Start game button - upon clicking 'start' checking name and email, and notify player, if name and email are fine then store this data and moving to the game page
	II. Game page
		* personalized welcome message (with player name)
		* 'exit game' button which move player to intro page
		* integrated ngx-tetris game
		* indication of the game status (ready, started, paused...)
		* points counting mechanism (each cleared line counts)
		* displaying current amount of points
		* displaying time spent wile playing
		* 'gameplay history' with all actions
			- timestamp
			- action name (player started the game, paused, line cleared...)
			- filterable by event type (ie. show only 'line cleared' events)
			- sortable by timestamp (latest first or oldest first)

Clon / copy project
Initialize a project npm init -y
Install dependencies npm install
Run ng serve -o
Navigate to http://localhost:4200/

# Version 2. Connected with simulated game server to work with methods: GET, POST
	I. Routing between two pages (intro, game page)
		* Intro page (smart component, route)
		* Player form component (dumb component)
		* Game page (smart component, route)
		* Handles navigation (going back, Location service)
	II. Services - storing and reading data
		* Store player data in a service
		* Intro page - puts player data to store
		* Game page - reads player data from store
	III. Http: reading and displaying highscores, token verification, posting scores, my scores
		* Reading and displaying highscores
			- Read current highscores GET /scores/tetris
			- Display highscores (name - score pairs) show only top 10 entries
			- List sorting - sorting by: score asc/desc
			- Update score lists every 30 seconds
		* Intro page form - token input field
			- text entry, upon form submission validate entered token POST /check-token
		* On game finished
			- submitted player scores and name (POST /scores)
			- signed with auth token (auth-token header)
		* Displaying my scores list (component)
			- filter data (only my entries)
			- sorting by score asc/desc
	IV. Routing params
		* Added high contrast mode controlled by route param - extended game route to accept parameter 'colors'
			- Intro page allow player to select color palette: normal, high contrast
			- Passed selected color palette through route parameter
			- Game page added support for 'high contrast' color palette
	V. Guarding game route (data from 'Intro page' form stored in service)
		* Guards - interface indicating whether there is a player data inside or not
			- Visiting intro page clear data stored in player data service
			- Injected player data service
			- Implemented CanActivate interface
			- Player data service in 'decision making process' (Player data NOT EMPTY: allow navigation, Player data EMPTY: redirect to intro page)
			- Added created guard to game page route
			- Player data service use local storage for player data persisting
	VI. Reactive forms
		* Converted intro page to reactive forms from version 1
			- Player name required
			- Auth code input required
			- Color selection with initial value, upon change some element either changes
			- Store user input in local storage and fill the form for returning users

Clon / copy project
Initialize a project npm init -y
Install dependencies npm install
Run ng serve -o
Navigate to http://localhost:4200/

Clon / copy server 
Initialize a project npm init -y
Install dependencies npm install
Run npm run start port:8080
