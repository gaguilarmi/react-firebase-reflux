# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns(
	'',
	url(r'^$', view=views.IndexView.as_view(), name='index'),

)