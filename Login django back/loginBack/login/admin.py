from django.contrib import admin
from login.models import Login

class Logins(admin.ModelAdmin):
    list_display = ( 'id', 'nome', 'email' )

admin.site.register(Login, Logins)
