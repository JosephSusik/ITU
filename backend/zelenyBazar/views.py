from django.http import HttpResponse, Http404, HttpResponseBadRequest, QueryDict
from .models import *
from itertools import chain
from django.core import serializers
import json
from django.db.models import Q

# Create your views here.

#TODO: What to return in these cases? is message good enough?


def viewListings(request):

    if request.method == 'GET':
        listings = Listing.objects

        if request.GET.__contains__('search'):
            listings = listings.filter(Q(title__icontains=request.GET.get('search')) | Q(
                description__icontains=request.GET.get('search')))
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

        images = []
        for listing in listings.all():
            image = Image.objects.filter(listing_id = listing.id).first()
            if image:
                images.append(image) 

        combined = list(chain(listings.all(), images))
        response = serializers.serialize('json', combined )
        return HttpResponse(response, content_type='text/json')
    if request.method == 'POST':
        listing_object = None
        # for des_object in serializers.deserialize('json', request.body):
        #     if des_object.object._meta.model_name =='listing':
        #         if listing_object:
        #             return HttpResponseBadRequest(json.dumps({'Error' : 'Cannot upload two listings at once'}), content_type='text/json')
        #         des_object.object.save()
        #         listing_object = des_object.object
        #     elif des_object.object._meta.model_name == 'image':
        #         if not listing_object and not des_object.objec.listing_id:
        #             return HttpResponseBadRequest(json.dumps({'Error' : 'Cannot upload image without listing'}), content_type='text/json')
        #         des_object.object.listing_id = listing_object.id
        #         des_object.object.save()
        #     else:
        #         return HttpResponseBadRequest(json.dumps({'Error' : 'Cannot upload anythin else than listing or image'}), content_type='text/json')
        #     return HttpResponse(json.dumps({'Success': 'Object created', 'id': listing_object.id}), content_type='text/json')

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
        # payload = request.body()
        #payload = QueryDict(request.body)

        # print(payload)
        # print(f"ID: {payload.get('favoriteId')}")
        if 'favoriteId' in payload:
            listing = Listing.objects.filter(id=payload['favoriteId']).all().first()
            listing.isFavorite = not listing.isFavorite
            listing.save()
            return HttpResponse(json.dumps({'Success' : listing.id, 'Listing set to' : 'Favorite' if listing.isFavorite else 'Not favorite' }), content_type = 'text/json')
        return HttpResponseBadRequest()


        


def listing(request, id):
    listings = Listing.objects.filter(id=id).all()
    listing = listings.first()
    if not listings:
        return Http404()

    if request.method == 'GET':
        comments = Comment.objects.filter(listing_id = id).all()
        images = Image.objects.filter(listing_id = id).all()
        combined = list(chain(listings, images))
        combined = list(chain(combined, comments))
        response = serializers.serialize('json', combined)
        return HttpResponse(response, content_type='text/json')
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
        # for des_object in serializers.deserialize('json', request.body):
        #     des_object.object.id = id
        #     des_object.object.save()
        #     return HttpResponse(json.dumps({'Success': 'Listing updated', 'id': des_object.object.id}), content_type='text/json')
    if request.method == 'DELETE':
        listings.first().delete()
        return HttpResponse(json.dumps({'success': 'Object deleted', 'id': id}), content_type='text/json')
    if request.method == 'POST':
        # for des_object in serializers.deserialize('json', request.body):
        #     if des_object.object._meta.model_name != 'comment':
        #         return HttpResponseBadRequest(json.dumps({'Error' : 'Only comments can be uploaded via POST'}), content_type='text/json')
        #     des_object.object.listing_id = id
        #     des_object.object.save()
        #     return HttpResponse(json.dumps({'Success': 'Comment added.', 'id': des_object.object.id}), content_type='text/json')
        payload = json.loads(request.body)

        comment = Comment()
        comment.text = payload['text']
        comment.listing = listing
        comment.author_id = 1
        if 'parentCommentId' in payload:
            comment.parentComment_id = payload['parentCommentId']
        comment.save()

        return HttpResponse(json.dumps({'Success': 'Comment added.', 'id': comment.id}), content_type='text/json')


def seedData(request):

    cat = Category()
    for categoryName in CategoryChoices.choices:
        cat = Category()
        cat.name = categoryName
        cat.save()

    currentUser = User()
    currentUser.name = 'CurrentUser'
    currentUser.surname = 'User'
    currentUser.save()

    marek = User()
    marek.name = 'Marek'
    marek.surname = 'Stolár'
    marek.save()

    listing = Listing()
    listing.title = 'New plant'
    listing.description = 'This is new plant to test my api.'
    listing.difficulty = DifficultyChoices.MEDUIM
    listing.tradeTypeChoices = TradeTypeChoices.CASH
    listing.size = HeightChoices.SECOND
    listing.price = 150
    listing.plantType = PlantTypeChoices.ALIVE_PLANT
    listing.author = marek
    listing.category = cat
    listing.locationName = 'Brno'
    listing.locationZip = '61600'
    listing.save()

    comment = Comment()
    comment.text = 'Nice listing yo!'
    comment.author = marek
    comment.listing = listing
    comment.save()

    comment2 = Comment()
    comment2.text = 'Bad listing :('
    comment2.author = marek
    comment2.listing = listing
    comment2.save()

    image = Image()
    image.path = 'PATH'
    image.listing = listing
    image.save()

    return HttpResponse(json.dumps({'Success': 'Seed successful'}), content_type='text/json')


def viewUsers(request):
    if request.method == 'GET':
        response = serializers.serialize('json', User.objects.all())
        return HttpResponse(response, content_type='text/json')
    if request.method == 'PUT':
        payload = json.loads(request.body)
        if 'favoriteId' in payload:
            user = User.objects.filter(id=payload['favoriteId']).all().first()
            user.isFavorite = not user.isFavorite
            user.save()
            return HttpResponse(json.dumps({'Success' : user.id, 'User set to' : 'Favorite' if user.isFavorite else 'Not favorite' }), content_type = 'text/json')
        return HttpResponseBadRequest()
    # if request.method == 'POST':
    #     for des_user in serializers.deserialize('json', request.body):
    #         des_user.object.save()
    #         return HttpResponse(json.dumps({'Success': 'User created', 'id': des_user.object.id}), content_type='text/json')

def viewUser(request,id):
    user = User.objects.get(id=id)
    if not user:
        return Http404(json.dumps({'Error': 'User with specified ID not found'}), content_type='text/json')

    if request.method == 'GET':
        response = serializers.serialize('json', user)
        return HttpResponse(response, content_type='text/json')
    # if request.method == 'PUT':
    #     for des_object in serializers.deserialize('json', request.body):
    #         des_object.object.id = id
    #         des_object.object.save()
    #         return HttpResponse(json.dumps({'Success': 'User updated', 'id': des_object.object.id}), content_type='text/json')
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
        rating.save
        return HttpResponse(json.dumps({'Success': 'Rating added.', 'id': rating.id}), content_type='text/json')

        # for des_object in serializers.deserialize('json', request.body):
        #     if des_object.model != 'zelenyBazar.rating':
        #         return HttpResponseBadRequest(json.dumps({'Error' : 'Only ratings can be uploaded via POST'}), content_type='text/json')
        #     des_object.object.ratee_id = id
        #     des_object.object.save()
        #     return HttpResponse(json.dumps({'Success': 'Rating added.', 'id': des_object.object.id}), content_type='text/json')

def commentDelete(request, id):
    comment = Comment.objects.get(id=id)
    if not comment:
        return Http404(json.dumps({'Error': 'Comment with specified ID not found'}), content_type='text/json')

    if request.method == 'DELETE':
        comment.delete()
        return HttpResponse(json.dumps({'Success': 'Comment deleted.', 'id': id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : 'No other methods supported'}), content_type='text/json')

def ratingDelete(request, id):
    rating = Rating.objects.get(id=id)
    if not rating:
        return Http404(json.dumps({'Error': 'Rating with specified ID not found'}), content_type='text/json')

    if request.method == 'DELETE':
        rating.delete()
        return HttpResponse(json.dumps({'Success': 'Rating deleted.', 'id': id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : 'No other methods supported'}), content_type='text/json')

