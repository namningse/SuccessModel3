@extends('admin.layout')


@section('application')
    <div id="ProjectApp" ng-app="ProjectApp" class="fill">


        <div ng-controller="AlertController">
          <alert ng-repeat="alert in alerts" type="{{alert.type}}">{{alert.msg}}</alert>
        </div>

        <div ui-view></div>

        <span us-spinner="{radius:30, width:8, length: 16}"></span>
    </div>
@stop

@section('javascript')

<!-- Application -->
<script type="text/javascript" src="/js/app/project/project_app.js"></script>
<script type="text/javascript" src="/js/app/http_interceptor.js"></script>

<!-- Services -->

<script type="text/javascript" src="/js/app/project/project_services.js"></script>
<script type="text/javascript" src="/js/app/faculty/faculty_services.js"></script>
<script type="text/javascript" src="/js/app/researcher/researcher_services.js"></script>

<!-- Controllers -->
<script type="text/javascript" src="/js/app/project/project_controllers.js"></script>
<script type="text/javascript" src="/js/app/alert_controller.js"></script>

@stop