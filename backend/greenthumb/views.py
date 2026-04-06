from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

hrefs = {
    "home_url" : "",
    "shop_url" : "/shop/",
    "cart_url" : "/cart/",
    "reviews_url" : "/reviews/",
    "about_url" : "/about/"
}


def index(request):
    template = loader.get_template("greenthumb/index.html")
    context = {}
    context.update(hrefs)
    return HttpResponse(template.render(context, request))

def shop(request):
    template = loader.get_template("greenthumb/pages/shop.html")
    context = {}
    context.update(hrefs)
    return HttpResponse(template.render(context, request))

def cart(request):
    template = loader.get_template("greenthumb/pages/cart.html")
    context = {}
    context.update(hrefs)
    return HttpResponse(template.render(context, request))

def reviews(request):
    template = loader.get_template("greenthumb/pages/reviews.html")
    context = {}
    context.update(hrefs)
    return HttpResponse(template.render(context, request))

def about(request):
    template = loader.get_template("greenthumb/pages/about.html")
    context = {}
    context.update(hrefs)
    return HttpResponse(template.render(context, request))