<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="utf-8"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>

    <title>SuccessModel Control Panel</title>

    <link href="/components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/css/dashboard.css" rel="stylesheet"/>
    <link href="/css/style.css" rel="stylesheet"/>

</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">SuccessModel Control Panel</a>
</nav>

<div class="row fill"">
    <div class="col-sm-3 col-md-2 sidebar fill" id="sidebar" ng-controller="SideBarController">
        <ul class="nav nav-sidebar">
            <li ng-class="{active : $path === 'admin' }">
                <a href="/admin">Dashboard</a>
            </li>

            <li ng-class="{active : $path === 'admin/news'} ">
                <a href="/admin/news">News</a>
            </li>

            <li ng-class="{active : $path === 'admin/faculty'} ">
                <a href="/admin/faculty">Faculty</a>
            </li>

            <li ng-class="{active : $path === 'admin/researcher'} ">
                <a href="/admin/researcher">Researcher</a>
            </li>

            <li ng-class="{active : $path === 'admin/project'} ">
                <a href="/admin/project">Project</a>
            </li>
        </ul>
    </div>

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main fill">
            @yield('application')
    </div>
</div>

    <script src="/components/jquery/dist/jquery.min.js"></script>
    <script src="/components/angular/angular.min.js"></script>
    <script src="/components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="/components/angular-bootstrap/ui-bootstrap.min.js"></script>
    <script src="/components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="/components/angular-loading-spinner/spin.js"></script>
    <script src="/components/angular-loading-spinner/angular-spinner.min.js"></script>
    <script src="/components/angular-loading-spinner/angular-loading-spinner.js"></script>
    <script src="/components/angular-base64-upload/dist/angular-base64-upload.min.js"></script>
    <script src="/components/holderjs/holder.js"></script>
    <script src="/components/angular-file-upload/angular-file-upload.min.js"></script>

    <script type="text/javascript">

        var sidebarApp = angular.module('SideBarApp',[]);
        sidebarApp.controller("SideBarController",function($scope) {
            var $path = $scope.$path = '<?php echo Request::path()?>'
        });
        angular.bootstrap($("#sidebar"),["SideBarApp"]);

    </script>

    @yield('javascript')
</body>
</html>
