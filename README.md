# <img src="./client/src/assets/share-thin.png" width="100rem"/>

# Photo Share

## A user based content platform

A webb application made with Express API, MongoDB database and Mongoose for the backend. For the frontend we've used React and MUI. We've used YUP for validation in both ends.

On the platform you are able to create a user profile and login. When you are logged in as a user, you can view, create, edit and delete your own posts on your profile page. You are also able to view all the posts from all the other users, including yourself, on the Explore page. The posts on the Explore page are always visible to everyone who visits the site and does not require login.

<br>

### Contributors:

- [Lisa Marie Andersson](https://github.com/lisamarieandersson)
- [Nathalie Gustafsson](https://github.com/nathaliegustafsson)
- [Moa Hedendahl](https://github.com/moamoa07)

<br>

### How to build the project:

Run these commands in the terminal:

- `npm install`

- `For client`
    - `cd client`
    - `npm run dev`

- `For server`
    - `cd server`
    - `npm run dev`

<br>

**Krav för godkänt:**

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [x] Uppgiften lämnas in i tid!
- [x] Det ska finnas minst två stycken resurser (users & posts)
- [x] Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [x] Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [x] Allt innehåll ska sparas i en MongoDB databas.
_Gjorda krav ska kryssas i_

**Krav för väl godkänt:**

- [ ] Alla punkter för godkänt är uppfyllda
- [ ] Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [ ] Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.

_Gjorda krav ska kryssas i_
