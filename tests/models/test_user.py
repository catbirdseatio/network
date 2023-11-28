import pytest

pytestmark = pytest.mark.django_db


class TestUser:
    def test_count_following_five_users(self, test_user, five_users):
        [test_user.follow_author(author) for author in five_users]
        test_user.count_following() == 5
    
    def test_count_followers_five_users(self, test_user, five_users):
        [author.follow_author(test_user) for author in five_users]
        test_user.count_followers() == 5
    
    def test_count_unfollow_author_five_users(self, test_user, five_users):
        [author.follow_author(test_user) for author in five_users]
        [author.unfollow_author(test_user) for author in five_users]
        test_user.count_followers() == 0
    
    def test_follow_author(self, test_user, admin_user):
        test_user.follow_author(admin_user)
        test_user.count_followers() == 1
        
    