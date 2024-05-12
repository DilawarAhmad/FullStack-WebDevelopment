from django.db import models

# Create your models here.
class user(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField(blank=False)
    password=models.CharField(max_length=8)
    image=models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name

class post(models.Model):
    image=models.ImageField(upload_to='images/')
    created_on=models.DateField(auto_now_add=True)
    title=models.CharField(max_length=200)
    description=models.TextField()
    user=models.ForeignKey(user,on_delete=models.CASCADE)

    def __str__(self):
        return self.title
