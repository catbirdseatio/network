import pytest

from tests.factories import UserFactory, PostFactory


@pytest.fixture
def test_user():
    return UserFactory()


@pytest.fixture
def test_post(test_user):
    return PostFactory(author=test_user)
