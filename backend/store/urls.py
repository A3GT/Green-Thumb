from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('shop/', views.shop_view, name='shop'),
    path('reviews/', views.reviews_view, name='reviews'),
    path('reviews/submit/', views.submit_review_view, name='submit_review'),
    path('reviews/delete/<int:review_id>/', views.delete_review_view, name='delete_review'),
    path('about/', views.about_view, name='about'),
    path('cart/', views.cart_view, name='cart'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
