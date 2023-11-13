from django.contrib.auth import get_user_model
import factory
from faker import Faker

from apps.posts.models import Post


CustomUser = get_user_model()
fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Faker("user_name")
    email = factory.Faker("email")
    password = factory.PostGenerationMethodCall("set_password", "Testpass123")

    class Meta:
        model = CustomUser
        exclude = ("plaintext_password",)


class PostFactory(factory.django.DjangoModelFactory):
    body = factory.fuzzy.FuzzyText(length=127)
    author = factory.SubFactory(UserFactory)
    
    class Meta:
        model = Post
