from rest_framework import generics, status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingCreate(APIView):
    serializer_class = CreateListingSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
    def get(self, request, format=None):
        queryset = Listing.objects.all()
        serializer_class = ListingSerializer
        return Response(serializer_class(queryset).data)
    
