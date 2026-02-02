from django.db import models
from django.contrib.auth.models import AbstractUser

# 1. Пользователь
class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Телефон")
    gender = models.CharField(max_length=10, blank=True, null=True, verbose_name="Пол")
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

# 2. Категория
class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название категории")
    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
    def __str__(self):
        return self.name

# 3. Товар (ссылается на Категорию)
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="Категория")
    name = models.CharField(max_length=255, verbose_name="Название букета")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    image = models.ImageField(upload_to='products/', verbose_name="Изображение")

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
    def __str__(self):
        return self.name

# 4. Заказ (ссылается на Товар через ManyToMany)
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True, blank=True)
    customer_name = models.CharField(max_length=255, verbose_name="Имя клиента")
    customer_phone = models.CharField(max_length=20, verbose_name="Телефон клиента")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Общая стоимость")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    products = models.ManyToManyField(Product, through='OrderItem')

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

# 5. Элемент заказа
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

#6. Модель карты
class PaymentCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    brand = models.CharField(max_length=20) # Visa, Mastercard
    last4 = models.CharField(max_length=4)
    is_primary = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Платежная карта"
        verbose_name_plural = "Платежные карты"


#7. Отметка в Избраное
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='favorites')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')