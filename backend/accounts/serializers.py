from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework import serializers
from .models import User



#i have to overwrite the defult serializer because i am using email instead of username
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'


#most important question , why i use password and activation type in serializer not model?
#because activation tye is not for save and password that already in the model i just overwrite it because i dont want to allow to read that
class RegisterSerializer(serializers.ModelSerializer):
    #I have to write things before meta that i want to add for new or edit , here password that i edit and set write only and 
    #activation type which is not available in defult user model and i create it newly 
    password = serializers.CharField(write_only=True)

    #i directly put the list into the choices , but its not a good practice .
    activation_type = serializers.ChoiceField(choices=["otp", "link"], write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password", "activation_type"]


#i am over writing the create method
#it's taking all validate data as a perameter 
#why i overwrite the create method here, though i already overwrite the create method in managers.py !
# because i don't have any field named activation type in database so i pop it and
    def create(self, validated_data):

        activation_type = validated_data.pop("activation_type")
        #i pop password because if i dont then the password will save as plain text and user can't log in cuz django check password as hashed string

        password = validated_data.pop("password")

        user = User.objects.create_user(
            #i did here passwors=password becuase if i dont do that then manager.py will take two password. once is actually pass another will be as a valid feild
            #there is no field in model named password and django work as password=password always so if i dont do that then django will not know that is password that it have to hashed
            #the most important things there is no perameter named as password in serializer create method for that i did that 
            password=password,
            is_active=False,
            is_verified=False,
            **validated_data
        )
        #i am sending them to views for doing rest of work
        #i can save them and i can also use them in view through view
        return user, activation_type
    
#data moves serializer to managers.py