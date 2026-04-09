## ⬇️ How to clone server
Clone the repository into some location 
Open your terminal in the [backend](./backend) to setup the virtual enviroment
Run:
```bash
python -m venv venv
source venv/bin/activate
```
If that doesn't work, navigate to ./backend/venv/Scripts and run whichever script activates the enviroment on your OS.
Then install the requirements with
```bash
pip install -r requirements.txt
```

## 🚀 Running server
To run the server, open your terminal in the [backend](./backend)
You may need to migrate any changes made if you are running the server for the first time or after updating it
```bash
python manage.py migrate
```
Once migrated, run the server
```bash
python manage.py runserver
```
Now you should be able to see the webpages by going to [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
## ⭐ Creating a superuser
To get an admin view you must add a superuser, open your terminal in the [backend](./backend)
```bash
python manage.py createsuperuser
```
Then enter a username, password, and email for your superuser account. Making sure to record your username and password.

To get an admin view, run the server and go to [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
Then login with your superuser account.
The admin view has a user friendly view of the data within the database. To add or remove an item, just go to the group and click add or change.
