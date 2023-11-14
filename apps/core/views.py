from django.shortcuts import render
from django.db import IntegrityError
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login, logout,get_user_model
from django.http import HttpResponseRedirect
from django.views import View
from django.urls import reverse


CustomUser = get_user_model()


class IndexView(TemplateView):
    template_name = "core/index.html"

class LoginView(View):
    def get(self, request):
        return render(request, "core/login.html")
    
    def post(self, request):
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("core:index"))
        else:
            return render(request, "core/login.html", {
                "message": "Invalid username and/or password."
            })

class LogoutView(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse("core:index"))


class RegisterView(View):
    def get(self, request):
        return render(request, "core/register.html")
    
    def post(self, request):
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "core/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = CustomUser.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "core/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("core:index"))
