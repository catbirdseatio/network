from rest_framework.pagination import PageNumberPagination
from rest_framework.utils.urls import remove_query_param, replace_query_param


class PostPagination(PageNumberPagination):
    page_size = 10
    url = "/posts/"

    def get_next_link(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        return replace_query_param(self.url, self.page_query_param, page_number)

    def get_previous_link(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        if page_number == 1:
            return remove_query_param(self.url, self.page_query_param)
        return replace_query_param(self.url, self.page_query_param, page_number)
