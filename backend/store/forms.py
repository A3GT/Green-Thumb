from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    # Use Django's built-in User model for username and password
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']

