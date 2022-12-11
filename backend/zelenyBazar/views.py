from django.http import HttpResponse, Http404, HttpResponseBadRequest, QueryDict
from .models import *
from itertools import chain
from django.core import serializers
import json
from django.db.models import Q
from .serializers import *
from statistics import mean

# Create your views here.

#TODO: What to return in these cases? is message good enough?


def viewListings(request):

    if request.method == 'GET':
        listings = Listing.objects.filter(isListed=True)
        if request.GET.__contains__('search'):
            listings = listings.filter(Q(title__icontains=request.GET.get('search')) | Q(
                description__icontains=request.GET.get('search')) | Q(speciesCZ__icontains=request.GET.get('search')) | Q(speciesLat__icontains=request.GET.get('search')))
        if request.GET.__contains__('loc'):
            listings = listings.filter(
                locationName__icontains=request.GET.get('loc'))
        if request.GET.__contains__('zip'):
            listings = listings.filter(
                locationZip=request.GET.get('zip'))
        if request.GET.__contains__('diff'):
            listings = listings.filter(
                difficulty=request.GET.get('diff'))
        if request.GET.__contains__('ttype'):
            listings = listings.filter(
                trade_type=request.GET.get('ttype'))
        if request.GET.__contains__('height'):
            listings = listings.filter(
                size=request.GET.get('height'))
        if request.GET.__contains__('maxprice'):
            listings = listings.filter(
                price__lte = request.GET.get('maxprice'))
        if request.GET.__contains__('minprice'):
            listings = listings.filter(
                price__gte = request.GET.get('minprice'))
        if request.GET.__contains__('ptype'):
            listings = listings.filter(
                plantType=request.GET.get('ptype'))
        if request.GET.__contains__('cat'):
            listings = listings.filter(
                category_id=request.GET.get('cat'))
        if request.GET.__contains__('auth'):
            listings = listings.filter(
                author_id=request.GET.get('auth'))
        if request.GET.__contains__('instructions'):
            if request.GET.get('instructions') == 'true':
                listings = listings.exclude(instructions='')

        listings = listings.select_related('author').prefetch_related('image_listing')
        serializer = ListingSerializerMainPage(listings, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type = 'text/json')


    if request.method == 'POST':
        payload = json.loads(request.body)
        if not ( payload.keys() >= {'title', 'description' , 'category' , 'difficulty', 'plantType', 'size', 'tradeType'}):
            return HttpResponse(json.dumps({'Error' : 'Listing has missing fields'}), content_type = 'text/json')
        listing = Listing()
        listing.title = payload['title']
        listing.description = payload['description']
        listing.category_id = payload['category']
        if 'author' in payload:
            listing.author_id = payload['author']
        else:
            listing.author_id = 1
        listing.difficulty = payload['difficulty']
        if 'price' in payload:
            listing.price = payload['price']
        listing.plantType = payload['plantType']
        listing.size = payload['size']
        listing.tradeType = payload['tradeType']
        listing.save()
        for imagePath in payload['images']:
            image = Image()
            image.path = imagePath
            image.listing = listing
            image.save()
        return HttpResponse(json.dumps({'Success' : listing.id}), content_type = 'text/json')
    
    if request.method == 'PUT':
        payload = json.loads(request.body)
        if 'favoriteId' in payload:
            listing = Listing.objects.filter(id=payload['favoriteId']).all().first()
            listing.isFavorite = not listing.isFavorite
            listing.save()
            return HttpResponse(json.dumps({'Success' : listing.id, 'Listing set to' : 'Favorite' if listing.isFavorite else 'Not favorite' }), content_type = 'text/json')
        return HttpResponseBadRequest()

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')


        


def listing(request, id):
    listings = Listing.objects.filter(id=id).all()
    listing = listings.first()
    if not listings:
        return Http404()

    if request.method == 'GET':
        listing = Listing.objects.filter(id = id).select_related('author').prefetch_related('image_listing').prefetch_related('comment_listing')
        serializer = ListingSerializerFull(listing.first(), many=False)
        return HttpResponse(json.dumps(serializer.data), content_type = 'text/json')
    if request.method == 'PUT':
        

        payload = json.loads(request.body)

        
        listing.title = payload['title']
        listing.description = payload['description']
        listing.category_id = payload['category']
        listing.author_id = payload['author']
        listing.difficulty = payload['difficulty']
        if 'price' in payload:
            listing.price = payload['price']
        listing.plantType = payload['plantType']
        listing.size = payload['size']
        listing.tradeType = payload['tradeType']
        listing.save()
        #TODO: IMAGES change?

    if request.method == 'DELETE':
        listings.first().delete()
        return HttpResponse(json.dumps({'success': 'Object deleted', 'id': id}), content_type='text/json')
    if request.method == 'POST':
        payload = json.loads(request.body)

        comment = Comment()
        comment.text = payload['text']
        comment.listing = listing
        comment.author_id = 1
        if 'parentCommentId' in payload:
            comment.parentComment_id = payload['parentCommentId']
        comment.save()

        return HttpResponse(json.dumps({'Success': 'Comment added.', 'id': comment.id}), content_type='text/json')





def viewUsers(request):
    if request.method == 'GET':
        # response = serializers.serialize('json', User.objects.all())
        # return HttpResponse(response, content_type='text/json')
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type = 'text/json')
    if request.method == 'PUT':
        payload = json.loads(request.body)
        if 'favoriteId' in payload:
            user = User.objects.filter(id=payload['favoriteId']).all().first()
            user.isFavorite = not user.isFavorite
            user.save()
            return HttpResponse(json.dumps({'Success' : user.id, 'User set to' : 'Favorite' if user.isFavorite else 'Not favorite' }), content_type = 'text/json')
        return HttpResponseBadRequest()

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')

def viewUser(request,id):
    user = User.objects.get(id=id)
    if not user:
        return Http404()

    if request.method == 'GET':
        user = User.objects.filter(id = id).prefetch_related('rating_ratee').prefetch_related('listing_author')
        serializer = UserSerializerFull(user.first(), many=False)
        return HttpResponse(json.dumps(serializer.data), content_type='text/json')

    if request.method == 'DELETE':
        user.delete()
        return HttpResponse(json.dumps({'success': 'User deleted', 'id': id}), content_type='text/json')

    if request.method == 'POST':
        rating = Rating()

        payload = json.loads(request.body)

        rating.text = payload['text']
        rating.rating = payload['rating']
        rating.ratee = user
        rating.author_id = 1
        rating.save()

        userRatings = Rating.objects.filter(ratee_id = id)
        user.averageRating = mean([ rating.rating for rating in userRatings ])
        user.save()

        return HttpResponse(json.dumps({'Success': 'Rating added.', 'id': rating.id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')

def commentDelete(request, id):
    comment = Comment.objects.get(id=id)
    if not comment:
        return Http404()

    if request.method == 'DELETE':
        comment.delete()
        return HttpResponse(json.dumps({'Success': 'Comment deleted.', 'id': id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : 'No other methods supported'}), content_type='text/json')

def ratingDelete(request, id):
    rating = Rating.objects.get(id=id)
    if not rating:
        return Http404()

    if request.method == 'DELETE':
        rating.delete()
        return HttpResponse(json.dumps({'Success': 'Rating deleted.', 'id': id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')


def seedData(request):

    cat = Category()
    for categoryName in CategoryChoices.choices:
        cat = Category()
        cat.name = categoryName[0]
        cat.save()

    currentUser = User()
    currentUser.name = 'Current'
    currentUser.surname = 'User'
    currentUser.averageRating = 3
    currentUser.save()

    marek = User()
    marek.name = 'Marek'
    marek.surname = 'Stolár'
    marek.averageRating = 4
    marek.save()

    listing1 = Listing()
    listing1.title = 'New plant'
    listing1.description = 'This is new plant to test my api.'
    listing1.difficulty = DifficultyChoices.MEDUIM
    listing1.tradeTypeChoices = TradeTypeChoices.CASH
    listing1.size = HeightChoices.SECOND
    listing1.price = 151
    listing1.plantType = PlantTypeChoices.ALIVE_PLANT
    listing1.author = marek
    listing1.category = cat
    listing1.locationName = 'Brno'
    listing1.locationZip = '61600'
    listing1.instructions = 'These are instuctions for care of the plant'
    listing1.speciesCZ = 'Kaktus'
    listing1.save()

    listing2 = Listing()
    listing2.title = 'New plant2'
    listing2.description = 'This is new plant to test my api.'
    listing2.difficulty = DifficultyChoices.MEDUIM
    listing2.tradeTypeChoices = TradeTypeChoices.CASH
    listing2.size = HeightChoices.SECOND
    listing2.price = 152
    listing2.plantType = PlantTypeChoices.ALIVE_PLANT
    listing2.author = currentUser
    listing2.category = cat
    listing2.locationName = 'Bratislava'
    listing2.locationZip = '61600'
    listing2.speciesLat = 'Cactusius latinus'
    listing2.save()

    comment = Comment()
    comment.text = 'Nice listing yo!'
    comment.author = currentUser
    comment.listing = listing1
    comment.save()

    comment2 = Comment()
    comment2.text = 'Bad listing :('
    comment2.author = marek
    comment2.listing = listing2
    comment2.save()

    comment3 = Comment()
    comment3.text = 'Die'
    comment3.author = currentUser
    comment3.listing = listing2
    comment3.parentComment = comment2
    comment3.save()


    image1 = Image()
    image1.path = '/img/1/1.jpg'
    image1.listing = listing1
    image1.save()

    listing1.mainImage = image1
    listing1.save()

    image2 = Image()
    image2.path = '/img/1/2.jpg'
    image2.listing = listing1
    image2.save()

    image3 = Image()
    image3.path = '/img/1/3.jpg'
    image3.listing = listing2
    image3.save()

    listing2.mainImage = image3
    listing2.save()

    rating1 = Rating()
    rating1.ratee = marek
    rating1.author = currentUser
    rating1.rating = 4
    rating1.text = 'Mr. CoolGuy'
    rating1.save()

    rating2 = Rating()
    rating2.ratee = currentUser
    rating2.author = marek
    rating2.rating = 3
    rating2.text = 'Yes'
    rating2.save()

    return HttpResponse(json.dumps({'Success': 'Seed successful'}), content_type='text/json')