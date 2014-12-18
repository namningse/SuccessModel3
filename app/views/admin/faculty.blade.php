@extends('admin.layout')


@section('application')
    <div id="FacultyApp" ng-app="FacultyApp"">
            <div ui-view></div>
    </div>
@stop

@section('javascript')
<script type="text/javascript" src="/js/app/faculty/app.js"></script>
<script type="text/javascript" src="/js/app/faculty/services.js"></script>
<script type="text/javascript" src="/js/app/faculty/controllers.js"></script>
@stop