Welcome to ~~Simple~~ CRUD App!
===================

Install and start server
-------------
    // on Windows
    $ cd %HOMEPATH%\Desktop

	// on Linux or macOS
	$ cd ~/Desktop

    $ git clone https://github.com/olehmelnyk/CRUD.git
    $ cd CRUD
    $ npm i
    $ npm start

Now you can open [http://localhost:3000](http://localhost:3000) in your favorite browser and test this app.

You can start server with custom host and port like this:
-----------------------------------------------------------

    $ node ./bin/www 3001 crud.local

Both params are optional.

Features:
---------

 - Ability to choose what you want to use as DB: MongoDB or JSON file
 - Accepts Sync/Async REST/GET|POST requests
 - Renders HTML by default, for JSON response - add GET param `?format=json`

Feel free to send bug reports and feature requests ;)
-----------------------------------------------------