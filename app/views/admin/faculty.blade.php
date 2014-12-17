@extends('admin.layout')


@section('application')
    <div id="FacultyApp" ng-app="FacultyApp"">
            <div ui-view></div>
    </div>
@stop

@section('javascript')
<script type="text/javascript" src="/js/app/faculty/facultyApp.js"></script>
@stop