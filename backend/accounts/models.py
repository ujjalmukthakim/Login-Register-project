from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    

    #i set email field istead of defult username field
    USERNAME_FIELD = 'email'

    #i set username as a require field because i want to take username and make it useable .
    REQUIRED_FIELDS = ['username']
     
    #i overwrite the abstract user , so i also have to over write the usermanager because this is the things where user create method run
    objects = UserManager()

    def __str__(self):
        return self.email

class OTP(models.Model):
    #one User can have many OTPs, but each specific OTP belongs to only one User.
    #suser=123 otp
    #suer=345 otp here user same but otp not same and two otp actullay belongs to one user
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    purpose = models.CharField(max_length=50)
    expires_at = models.DateTimeField()
    attempts = models.IntegerField(default=0)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.code}"
