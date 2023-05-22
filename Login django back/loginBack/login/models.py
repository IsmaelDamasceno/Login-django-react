from typing import Any, Dict, Tuple
from django.db import models

class Login(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.BigIntegerField()
    email = models.CharField(max_length=100)
    