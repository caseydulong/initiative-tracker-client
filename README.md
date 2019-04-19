# D&D Initiative Tracker Client

This app is a simple initiative tracker for playing Dungeons & Dragons or similar tabletop RPGs.  A GM can create a new encounter and enter the combatants and their initiatives.  The play button can then be used to cycle through the turn order.  You can return to the encounter later using the generated ID at the bottom of each new encounter.

The API repository for this app can be found [here](https://github.com/caseydulong/initiative-tracker-api).

![Initiative Tracker Client](https://i.imgur.com/Mk0Xl9P.png)

### Technologies Used

- React
- Axios
- Sass

### Known Issues

1. Users can "get" encounters that don't belong to them by entering a valid ID.  They cannot, however, make changes to the encounter while they are viewing it.  If they attempt to add a combatant, they will receive an error, but they will also see the combatant added to the table.  This change is localized to the state and does not affect the encounter.  This problem will be solved by disallowing access to encounter documents not owned by the current user.

### Planning and Development

Due to the short development cycle for this app, I planned from the beginning to make it simple, clean, and functional.

The UI was designed with use on a mobile phone in mind, as most D&D players will have their phone available at the table.  As a result, I chose to move the controll pannel to the bottom to be easily reachable while holding your phone.  This also allows more horizontal space to display the table with reasonably sized text.

#### Wireframe:
![wireframe](https://i.imgur.com/70ahVHJ.jpg)

#### ERD:
Users -|---< Encounters -|---< Combatants

### Future Features

- Allow a DM to save a party of players as a template encounter so they don't have to enter each player's name for each encounter.
- Add additional fields to combatants, such as hit points and armor class.
- Allow users to store characters with associated values (hit points, armor class, initiative modifier), and allow the app to "roll" initiative for the combatants.
- Allow multiple users to connect to an encounter at once so that each player can enter their own name and initiative, while the DM enters the monsters.
- Allow for separate DM and player views, so the DM can choose when to display hidden monsters to the players.

### Installation

1. Run `npm start` in the client directory to start the React app.
2. Run `npm run server` in the API directory to start the backend server.
