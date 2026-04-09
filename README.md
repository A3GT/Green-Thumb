Ensure you have [python](https://www.python.org) installed.

## ⬇️ How to clone server
Open terminal and navigate to location of installation

Clone some version from the repository, for example the main branch would be:
```bash
git clone https://github.com/A3GT/Green-Thumb.git

```
Open a terminal or change directory to the [backend](./backend)
```bash
cd backend

```
Then activate your virtual enviroment by running:
```bash
python -m venv venv
source venv/bin/activate

```
If that doesn't work, navigate to ./backend/venv/Scripts and run whichever script activates the enviroment on your OS.

Finally, install your requirements file with the command
```bash
pip install -r requirements.txt

```
### 🔑 Generate a secret key
This isn't strictly necessary but will prevent tampering

Staying within [backend](./backend) run this python script in terminal
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

```
Save the generated key.

Create a .env file

Within the file put:
```
SECRET_KEY=generated_key_here

```
Replace generated_key_here with the key you saved earlier.
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
