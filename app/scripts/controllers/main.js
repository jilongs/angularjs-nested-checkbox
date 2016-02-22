'use strict';

/**
 * @ngdoc function
 * @name yoTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoTestApp
 */
angular.module('yoTestApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    vm.ALL_OPTION_LABEL = "all";
    vm.ALL_OPTION_VALUE = "all";
    console.trace("hello");
    vm.data = {
      allOption: {
        label: vm.ALL_OPTION_LABEL,
        value: vm.ALL_OPTION_VALUE,
        selected: true
      },
      isNested: true,
      id: "0",
      options: [{
        label: "login",
        value: "login",
        selected: false
      },
        {
          label: "transaction",
          value: "transaction",
          selected: false
        }],
      compare: false
    };
    var formatSubOption = function (data, maxlevel, curLevel) {
      if (curLevel === maxlevel)return;
      var formattedOptions = [];
      for (var i = 0; i < 4; i++) {
        var option = {};
        option.label = data.label + i;
        option.value = data.value + i;
        option.selected = false;
        if (curLevel < maxlevel - 1) {
          option.subOption = {
            allOption: {
              label: "All",
              value: "All",
              selected: true
            },
            isNested: curLevel + 2 !== maxlevel,
            id: data.subOption.id + "_" + i
          }
          option.subOption.options = formatSubOption(option, maxlevel, curLevel + 1);
        }
        formattedOptions.push(option);
      }
      return formattedOptions;
    };
    var count = 0;
    for (var i in vm.data.options) {
      var option = vm.data.options[i];
      option.subOption = {
        allOption: {
          label: "All",
          value: "All",
          selected: true
        },
        isNested: true,
        id: vm.data.id + "_" + count
      };
      option.subOption.options = formatSubOption(option, 2, 0);
      count++;
    }
    vm.eventQuery = "t";
  });
