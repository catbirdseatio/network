import pytest
from django.core.exceptions import ValidationError

from tests.factories import PostFactory

pytestmark = pytest.mark.django_db


class TestPost:
    def test_post_model(self, test_user, test_post):
        assert test_post.author.username == test_user.username
        assert len(test_post.body) < 127
    
    def test_post_model_clean_raises_validation_error(self, test_user):
        with pytest.raises(ValidationError):
            body = f"{'A'*250}"
            post = PostFactory(body=body, author=test_user)
            post.clean()
        
    def test_post___str__full_length(self, test_post):
        assert f"{test_post.body[:25]}..." == str(test_post)

    def test_post___str_short_length(self, test_user):
        body = f"{'A'*25}"
        post = PostFactory(body=body, author=test_user)
        assert body == str(post)
