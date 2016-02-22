'use strict';
angular.module('yoTestApp')

  .directive('nestedCheckbox', function ($compile) {
    function link($scope, $element) {
      $scope.query = "";
    }

    return {
      templateUrl: 'views/nestedCheckbox.html',
      restrict: 'CAE',
      scope: {
        data: '=',
        applyCompareChange: '&?'
      },
      link: link
    };
  });


angular.module('yoTestApp')
  .filter('showOptionFilter', function () {
    return function (input, query) {
      if(input === undefined){
        return input;
      }
      for (var i = 0; i < input.length; i++) {
        var option = input[i];
        if (option.label.indexOf(query) > -1) {
          option.display = true;
        } else {
          option.display = false;
        }
      }
      return input;
    }
  });
angular.module('yoTestApp')
  .directive('innerNestedCheckbox', function ($compile) {
    function link($scope, $element, $attrs) {
      $scope.showOptions = function (option) {
        if (option.subOption !== undefined && $element.find("#" + option.value + "Options div").length === 0) {
          var nestedCheckboxes = '<inner-nested-checkbox data="option.subOption" query="query"/>';
          $compile(nestedCheckboxes)($scope, function (cloned) {
            $element.find("#" + option.value + "Options").append(cloned);
          });
        }
      };
      $scope.change = function (option) {
        console.log(option);
        if (option.selected) {
          if (option.subOption !== undefined && $element.find("#" + option.value + "Options div").length === 0) {
            var nestedCheckboxes = '<inner-nested-checkbox data="option.subOption" query="query"/>';
            //only compile on "this" scope will work
            $compile(nestedCheckboxes)(this, function (cloned) {
              $element.find("#" + option.value + "Options").append(cloned);
            });
          }
        }
      };
      $scope.isScroll = function () {
        if ($scope.data.id === "0") {
          return "nps-scroll";
        }
      }
    }

    return {
      templateUrl: 'views/innerNestedCheckbox.html',
      restrict: 'E',
      transclude: true,
      scope: {
        data: '=',
        query: '=',
        applyCompareChange: '&?'
      },
      controller: ['$scope', function ($scope) {
        $scope.updateSubOptions = function (option) {
          if (option.allOption.selected) {
            option.options.forEach(function (opt) {
              opt.selected = false;
            })
          }
        };
      }],
      link: link
    };
  });

