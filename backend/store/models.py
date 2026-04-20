from django.db import models
from django.conf import settings

# Create your models here.

class ShopProduct(models.Model) :
    product_name = models.CharField(max_length=30, name="product_name", primary_key=True)
    desc = models.CharField(max_length=150, name="desc")
    price = models.FloatField(name="price")
    src = models.CharField()
    def __str__(self):
        return self.product_name


class Review(models.Model):
    user    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    name    = models.CharField(max_length=100)
    product = models.CharField(max_length=100)
    stars   = models.IntegerField()
    text    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.product} ({self.stars}★)"