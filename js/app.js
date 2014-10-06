(function() {
  angular.module('glossary',['duScroll'])

  .factory('definitionService', function($filter) {
    
    var service = {
      getDefinitions: getDefinitions,
      getDefinitionsByLetter: getDefinitionsByLetter,
      getAlphabet: getAlphabet
    };     

    function getAlphabet() {

      var alphabet = [{letter:'A', count: 0},
                      {letter:'B', count: 0},
                      {letter:'C', count: 0},
                      {letter:'D', count: 0},
                      {letter:'E', count: 0},
                      {letter:'F', count: 0},
                      {letter:'G', count: 0},
                      {letter:'H', count: 0},
                      {letter:'I', count: 0},
                      {letter:'J', count: 0},
                      {letter:'K', count: 0},
                      {letter:'L', count: 0},
                      {letter:'M', count: 0},
                      {letter:'N', count: 0},
                      {letter:'O', count: 0},
                      {letter:'P', count: 0},
                      {letter:'Q', count: 0},
                      {letter:'R', count: 0},
                      {letter:'S', count: 0},
                      {letter:'T', count: 0},
                      {letter:'U', count: 0},
                      {letter:'V', count: 0},
                      {letter:'W', count: 0},
                      {letter:'X', count: 0},
                      {letter:'Y', count: 0},
                      {letter:'Z', count: 0}];

      for (var i = alphabet.length - 1; i >= 0; i--) {
        alphabet[i].count = getDefinitionsByLetter(alphabet[i].letter).length;
      };

      return alphabet;

    }
    
    function getDefinitions() {
      return definitions;
    }

    function getDefinitionsByLetter(letter) {
      var filtered = $filter('filter')(definitions, function(definition) {
        return definition.word.charAt(0).toLowerCase() === letter.toLowerCase();
      }, true);
      return filtered;
    }

    var definitions = [
      {link: '#', word: "Activation", definition: "When you put a plan into action"},
      {link: '#', word: "Dog", definition: "A noble beast, man's best friend"},
      {link: '#', word: "Aeolian", definition: "Pertaining to Aeolus, or to the winds in general"},
      {link: '#', word: "Zephyr", definition: "A gentle, mild breeze"},
      {link: '#', word: "Favonian", definition: "Of or pertaining to the west wind"},
      {link: '#', word: "Boreal", definition: "Of or pertaining to the north wind"},
      {link: '#', word: "Subventaneous", definition: "Like the wind in its intangible or empty character; insubstantial empty"},
      {link: '#', word: "Harmattan", definition: "A harmattan is a dry, parching land breeze, charged with dust in that blows in the western Sahara"},
      {link: '#', word: "Squall", definition: "A sudden, violent gust of wind, often accompanied by rain, snow, or sleet. The term can also refer to a sudden disturbance or commotion."},
      {link: '#', word: "Mistral", definition: "The Mistral is a cold, dry, northerly wind common in southern France and neighboring regions"},
      {link: '#', word: "Paranymph", definition: "Groomsman or a bridesmaid."},
    ];

    return service;
  })

  .controller('GlossaryController', function($scope, $document, definitionService) {
    $scope.glossary_open = false;
    $scope.alphabet = definitionService.getAlphabet(); 
    $scope.toggleGlossaryOpen = function() {
      $scope.glossary_open = !$scope.glossary_open;
    }
  })

  .directive('definitionGroup', function() {
    return {
      restrict: 'A',
      scope: { letter: '=' },
      templateUrl: 'partials/definition-group.html',
      controller: function($scope, definitionService) {
        $scope.definitions = {};
        init();
        function init() {
          $scope.definitions = definitionService.getDefinitionsByLetter($scope.letter.letter);
        }
      }
    };
  })
  
})();