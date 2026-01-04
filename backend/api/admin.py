from django.contrib import admin
from .models import Product  # Импортируйте вашу модель (проверьте, что название совпадает)

# Регистрируем модель, чтобы она появилась в админке
admin.site.register(Product)
