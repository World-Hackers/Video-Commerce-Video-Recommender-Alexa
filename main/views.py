from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
import json
import main.amazon_search_api as amazon_search_api

# Create your views here.
products = amazon_search_api.products


def home(request):
    context = {
        "products": products
    }
    return render(request, "home.html", context)


class SmartSearch(APIView):

    def post(self, request):
        body = json.loads(request.body.decode('utf-8'))
        product = amazon_search_api.search_product(body["product"])
        context = {
            "products": products
        }
        return JsonResponse(context)
