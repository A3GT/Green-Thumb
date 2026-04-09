from django.db import models

# Create your models here.

class ShopProduct(models.Model) :
    product_name = models.CharField(max_length=30, name="product_name", primary_key=True)
    desc = models.CharField(max_length=150, name="desc")
    price = models.FloatField(name="price")
    src = models.CharField()
    def __str__(self):
        return self.product_name