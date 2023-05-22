from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from login.models import Login
from login.serializer import Serializer

class LoginViewSet(viewsets.ModelViewSet):
    queryset = Login.objects.all()
    serializer_class = Serializer

    def list(self, request, *args, **kwargs):
        responseArray = []
        for login in Login.objects.all():
            responseArray.append({
                'username': login.nome,
                'email': login.email,
                'id': login.id
            })

        return Response(status=status.HTTP_200_OK, data=responseArray)

    def create(self, request):
        data = request.data
        reqType = data['reqType']
        cpf = data['cpf']
        email = data['email']

        if (reqType == "Login"):
            userEmail = Login.objects.filter(email=email)
            if (len(userEmail) > 0):
                userCpf = Login.objects.filter(cpf=cpf)
                if (len(userCpf) > 0):
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED, data={ 'error': 'Cpf não encontrado' })
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED, data={ 'error': 'Email não encontrado' })
            
        elif (reqType == "Register"):
            userEmail = Login.objects.filter(email=email)
            userCpf = Login.objects.filter(cpf=cpf)
            if (len(userEmail) > 0):
                return Response(status=status.HTTP_401_UNAUTHORIZED, data={ 'error': 'Email já registrado' })
            elif (len(userCpf) > 0):
                return Response(status=status.HTTP_401_UNAUTHORIZED, data={ 'error': 'Cpf já registrado' })
            else:
                username = data['username']
                Login.objects.create(nome=username, cpf=cpf, email=email)
                return Response(status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_200_OK)
    