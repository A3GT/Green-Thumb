from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=150, required=True)
    last_name = forms.CharField(max_length=150, required=True)

    # Use Django's built-in User model for username and password
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password1', 'password2']
