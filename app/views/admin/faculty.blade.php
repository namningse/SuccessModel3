@extends('admin.layout')


@section('application')
    <div id="FacultyApp" ng-app="FacultyApp">
        <span us-spinner="{radius:30, width:8, length: 16}"></span>

        <div class="row" ng-controller="AlertController">
          <alert ng-repeat="alert in alerts" type="{{alert.type}}">{{alert.msg}}</alert>
        </div>

        <div ui-view></div>
    </div>
@stop

@section('javascript')
<script type="text/javascript" src="/js/app/faculty/app.js"></script>
<script type="text/javascript" src="/js/app/http_interceptor.js"></script>
<script type="text/javascript" src="/js/app/faculty/services.js"></script>
<script type="text/javascript" src="/js/app/faculty/controllers.js"></script>
<script type="text/javascript" src="/js/app/alert_controller.js"></script>

@stop