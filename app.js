var app = angular.module('noteApp', ['ui.bootstrap','ngSanitize','angular.filter','ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCrtl'
        });
        $stateProvider.state('notes', {
            url: '/notes/{id}',
            templateUrl: '/notes.html',
            controller: 'NotesCtrl'
        });

        $urlRouterProvider.otherwise('home');
    }]);

app.factory('notes', [function(){
    var o = {
        notes: []
    };
    return o;

}])

app.controller('MainCtrl', [
'$scope',
'notes',
    function($scope, notes){
        $scope.notes = notes.notes;
        /* [
            {title: 'Note Title 1', content: 'test content'},
            {title: 'Note title 2', content: 'hello world'}
        ];*/
        $scope.firstItemData = $scope.notes[0];
        $scope.clickedFirstTime = false;

        $scope.open = function (item) {
            $scope.notes.filter(a=> a ===item).forEach(a=>{
                debugger;
                a.isOpen = (a.isOpen === undefined && a ===
                    $scope.firstItemData ? false:!a.isOpen);
            });
            $scope.clickedFirstTime = true;
        }

        $scope.close = function (item) {
            $scope.notes.filter(a=> a ===item).forEach(a=>{
                a.isOpen = false;
            });
        }

        $scope.addNote = function(){
            if (!$scope.title || $scope.title === '') {return; }
            //var today = new Date();

            $scope.notes.push({
                title: $scope.title,
               // date: (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear(),
                content: $scope.content
            });
            $scope.title = '';
            $scope.content = '';
        };

}]);

app.controller('NotesCtrl', [
    '$scope',
    '$stateParams',
    'notes',
    function($scope, $stateParams, notes){
        
}]);



