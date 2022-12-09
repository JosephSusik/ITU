from django.urls import path
# from .views_new import *
from .views import *

urlpatterns = [
    path('listings/', viewListings ),
    path('seed/', seedData),
    path('listings/<int:id>/', listing),
    path('users/', viewUsers),
    path('users/<int:id>/', viewUser),
    path('comment/<int:id>/', commentDelete),
    path('rating/<int:id>/', ratingDelete)
]

# urlpatterns = [
#     path('listings_old/', ListingList.as_view()),
#     path('listings/', ListingCreate.as_view()),
# ]