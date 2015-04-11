(function () {
  'use strict'
  /*globals describe:false, beforeEach:false, module:false, inject:false*/
  describe('Controller: BebidasController', function () {
    // load the controller's module
    beforeEach(module('sbAdminApp'))

    var BebidasController,
      scope

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new()
      BebidasController = $controller('BebidasController', {
        $scope: scope
      })
    }))

    it('should attach a list of awesomeThings to the scope', function () {
      expect(scope.awesomeThings.length).toBe(3)
    })
  })
})()
