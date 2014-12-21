@extends('admin.layout')


@section('application')
    <div id="ResearcherApp" ng-app="ResearcherApp" class="fill">


        <div ng-controller="AlertController">
          <alert ng-repeat="alert in alerts" type="{{alert.type}}">{{alert.msg}}</alert>
        </div>

        <div ui-view></div>

        <span us-spinner="{radius:30, width:8, length: 16}"></span>
    </div>
@stop

@section('javascript')
<script type="text/javascript" src="/js/app/researcher/researcher_app.js"></script>
<script type="text/javascript" src="/js/app/http_interceptor.js"></script>
<script type="text/javascript" src="/js/app/researcher/researcher_services.js"></script>
<script type="text/javascript" src="/js/app/researcher/researcher_controllers.js"></script>
<script type="text/javascript" src="/js/app/alert_controller.js"></script>

@stop