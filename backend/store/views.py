from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import SignUpForm
from .models import ShopProduct
import json
from django.core.serializers.json import DjangoJSONEncoder


def home_view(request):
    # Render the main homepage
    return render(request, 'store/index.html')


def shop_view(request):
    shop_items = ShopProduct.objects.all().values()

    js_items = json.dumps(list(shop_items), cls=DjangoJSONEncoder)
    context = { 'shop_data' : js_items }
    return render(request, 'store/shop.html', context)


def reviews_view(request):
    return render(request, 'store/reviews.html')


def about_view(request):
    return render(request, 'store/about.html')


def cart_view(request):
    return render(request, 'store/cart.html')


def register_view(request):
    # Handle the registration form submission
    if request.method == 'POST':
        form = SignUpForm(request.POST)

        # Save the new user if the form is valid
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        # Show an empty registration form for GET requests
        form = SignUpForm()

    return render(request, 'store/register.html', {'form': form})


def login_view(request):
    # Handle the login form submission
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)

        # Check whether the submitted username and password are valid
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')

            # Authenticate the user with Django's built-in auth system
            user = authenticate(request, username=username, password=password)

            if user is not None:
                # Log the user in and start a session
                login(request, user)
                return redirect('login')
    else:
        # Show an empty login form for GET requests
        form = AuthenticationForm()

    return render(request, 'store/login.html', {'form': form})


def logout_view(request):
    # Log out the current user
    logout(request)

    # Redirect to the login page after logout
    return redirect('login')
