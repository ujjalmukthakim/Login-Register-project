from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):

    #i set here password=none because by defult i want to create user model as none password and after check everything i wll make password hash and set it instead of none
    #why here just email and password? 
    def create_user(self, email, password=None, **extra_fields):

        #first i am checking email is ok or not 
        if not email:
            raise ValueError("Email is required")

        #covert ShaGor@gmail.com to shagor@gmail.com
        email = self.normalize_email(email)

        #this is the line where i create model(table) where password is none by defult that i set up there
        user = self.model(email=email, **extra_fields)
        #now i hash the password
        user.set_password(password)
        #now i save it 
        user.save()
        #this function is returning user after creating 
        return user
    
    #this is the logic for creating superuser , there are create method at the last which is actually the function that i write at create_user
    #and also it have some defult power that i want to give to super user
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        
        #calling the function
        return self.create_user(email, password, **extra_fields)
