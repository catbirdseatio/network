from django.contrib.auth import get_user_model
import factory
import factory.fuzzy

from apps.posts.models import Post


CustomUser = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Faker("user_name")
    email = factory.Faker("email")
    password = factory.PostGenerationMethodCall("set_password", "Testpass123")

    class Meta:
        model = CustomUser
        exclude = ("plaintext_password",)


class PostFactory(factory.django.DjangoModelFactory):
    body = factory.Faker('text', max_nb_chars=127)
    author = factory.SubFactory(UserFactory)
    
    class Meta:
        model = Post
