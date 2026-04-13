from urllib.parse import urlencode

from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.urls import reverse
from django.utils.http import url_has_allowed_host_and_scheme
from .forms import SignUpForm
from .models import ShopProduct
import json
from django.core.serializers.json import DjangoJSONEncoder


def _get_redirect_target(request, default_name='home'):
    redirect_to = request.POST.get('next') or request.GET.get('next')

    if redirect_to and url_has_allowed_host_and_scheme(
        redirect_to,
        allowed_hosts={request.get_host()},
        require_https=request.is_secure(),
    ):
        return redirect_to

    return reverse(default_name)


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
    next_url = _get_redirect_target(request)

    # Handle the registration form submission
    if request.method == 'POST':
        form = SignUpForm(request.POST)

        # Save the new user if the form is valid
        if form.is_valid():
            form.save()
            login_url = reverse('login')
            query_string = urlencode({'next': next_url}) if next_url else ''
            return redirect(f'{login_url}?{query_string}' if query_string else login_url)
    else:
        # Show an empty registration form for GET requests
        form = SignUpForm()

    return render(request, 'store/register.html', {'form': form, 'next': next_url})


def login_view(request):
    next_url = _get_redirect_target(request)

    if request.user.is_authenticated:
        return redirect(next_url)

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
                return redirect(next_url)
    else:
        # Show an empty login form for GET requests
        form = AuthenticationForm()

    return render(request, 'store/login.html', {'form': form, 'next': next_url})


def logout_view(request):
    # Log out the current user
    logout(request)

    # Redirect to the current page when possible so sign-out feels seamless
    return redirect(_get_redirect_target(request))
