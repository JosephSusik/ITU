from typing import List
from django.db import models

# Create your models here.


class TradeTypeChoices(models.TextChoices):
    FREE = 'Free'
    TRADE = 'Trade'
    CASH = 'Sell'


class DifficultyChoices(models.TextChoices):
    EASY = 'Easy'
    MEDUIM = 'Medium'
    HARD = 'Hard'
    UNKNOWN = 'Unknown'


class HeightChoices(models.TextChoices):
    FIRST = '1-20cm'
    SECOND = '20-50cm'
    THIRD = '50-100cm'
    FOURTH = '100-150cm'
    FIFTH = '>150cm'
    UNKNOWN = 'Unknown'


class CategoryChoices(models.TextChoices):
    INDOOR_PLANTS = 'Indoor plants'
    CACTI = 'Cacti'
    PALMS = 'Palms'
    FRUIT_TREES = 'Fruit trees'
    DECORATIVE_TREES = 'Decorative trees'
    OUTSIDE_PLANTS = 'Outside plants'
    OTHERS = 'Others'
    HERBS = 'Herbs'
    EXOTIC_PLANTS = 'Exotic plants'


class PlantTypeChoices(models.TextChoices):
    CUT = 'Cut'
    SEEDS = 'Seeds'
    ALIVE_PLANT = 'Alive plant'
    UNKNOWN = 'Unknown'
    Other = 'Other'


class RatingStarsChoices(models.IntegerChoices):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(choices=CategoryChoices.choices, max_length=30)

    class Meta:
        managed = True

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    joinedOn  = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True

class Listing(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    locationName = models.CharField(max_length=50, default='Unknown')
    locationZip = models.CharField(max_length=5,default='00000')
    difficulty = models.CharField(
        choices=DifficultyChoices.choices, default=DifficultyChoices.UNKNOWN, max_length=10)
    tradeType = models.CharField(
        choices=TradeTypeChoices.choices, default=TradeTypeChoices.CASH, max_length=10)
    size = models.CharField(choices=HeightChoices.choices,
                            default=HeightChoices.UNKNOWN, max_length=10)
    price = models.IntegerField(default=0)
    plantType = models.CharField(choices=PlantTypeChoices.choices, default=PlantTypeChoices.UNKNOWN, max_length=20)
    createdOn = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    editedOn = models.DateTimeField(auto_now=True, null=True, blank=True)

    category = models.ForeignKey(Category,on_delete=models.DO_NOTHING, null=False)
    author = models.ForeignKey(User,on_delete=models.DO_NOTHING, null=False)

    class Meta:
        managed = True

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=1000)
    createdOn = models.DateTimeField(auto_now_add=True)

    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False)
    parentComment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, null=True)

    class Meta:
        managed = True




class Rating(models.Model):
    id = models.AutoField(primary_key=True)
    rating = models.IntegerField(choices=RatingStarsChoices.choices)
    text = models.CharField(max_length=1000)
    createdOn = models.DateTimeField(auto_now_add=True)
    
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False, related_name='author_id')
    ratee = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False, related_name='ratee_id')


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    path = models.CharField(max_length=100)

    listing =  models.ForeignKey(Listing, on_delete=models.CASCADE, null=False)

    class Meta:
        managed = True

class ListingFacade:
    def __init__(self, listing: Listing, comments: List[Comment] ):
        self.listing = listing
        self.comments = comments

    def __iter__(self):
        return self


