from rest_framework import serializers
from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('id', 'title', 'description', 'locationName', 'locationZip', 'difficulty',
                  'tradeType', 'size', 'price', 'plantType', 'createdOn', 'editedOn', 'category', 'author')


class CreateListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'description', 'locationName', 'locationZip',
                              'difficulty', 'tradeType', 'size', 'price', 'plantType', 'category', 'author')
