
from rest_framework import serializers
from login.models import Login

class Serializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ( 'id', 'nome', 'cpf', 'email' )

