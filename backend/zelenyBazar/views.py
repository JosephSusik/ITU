from rest_framework import generics
from .models import *
from .serializers import *

class ListingList(generics.CreateAPIView):
    queryset =  Listing.objects.all()
    serializer_class = ListingSerializer