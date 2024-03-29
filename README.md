# Board games

Board games is an application to play board games online.

## Features

- 2 games (easy to implement more)
- Games history
- 3 board themes (easy to implement more)
- Google authorization
- Changing nickname

## Installation

### Back-end (+ DB)

The back-end uses [node.js](https://nodejs.org/). Make sure it is installed on your machine

To make app run, go to folder server (from repository)

```bash
cd server
```
and run following command:
```bash
npm i
```
Then make sure to rename file (config.json) and folder (certificates) (just remove example from name).

Finally, launch the app:
```bash
node .
```
Database will be created automatically.

### Front-end 

First thing to make front-end work is to download custom package which is used in js. From repo go to client/js folder and run command:
```bash
cd client/js
npm i
```
Now, you are ready to go. Just go to folder higher (client)
```bash
cd ..
```
and start local server as you wish. For instance:
```bash
npx serve -l 5500
```

### Important
Make sure domain names match the domains in the application. Also, you have to trust certificates (in server/certificates) to enable secure connection. Look [here](https://docs.delinea.com/online-help/server-suite/admin/autoenrollment/root-certificate.htm) for detailed information.

Now, you can enjoy playing board games!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
