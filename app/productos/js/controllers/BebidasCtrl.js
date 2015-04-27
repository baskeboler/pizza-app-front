(function() {
  'use strict'
  /*globals angular:false, _:false*/
  angular.module('sbAdminApp')
    .controller('BebidasController', BebidasCtrl)
  BebidasCtrl.$inject = ['$log', 'Bebida', '$timeout', '$modal', 'notify']

  function BebidasCtrl($log, Bebida, $timeout, $modal, notify) {
    var vm = this
    vm.title = 'Bebidas'
    vm.nueva = {}
    vm.listaBebidas = []
    vm.errors = []
    vm.crearBebida = crearBebida
    vm.cargarLista = cargarListaBebidas
    vm.dismissError = dismissError
    vm.clearForm = clearForm
    vm.remove = removeBebida
    vm.abrirModalCrearBebida = abrirModalCrearBebida;

    $timeout(vm.cargarLista, 1000)

    function abrirModalCrearBebida() {
      var modal = $modal.open({
        templateUrl: 'productos/views/modals/crear-bebida-modal.html',
        controller: 'CrearBebidaModalInstanceController',
        controllerAs: 'vm'
      });

      modal.result.then(ok, cancelado);

      function ok(nuevaBebida) {
        // body...
        notify('Bebida Creada.');
        cargarListaBebidas();
        //vm.listaBebidas.push(nuevaBebida);
      }

      function cancelado(argument) {
        // body...
      }
    }

    function crearBebida() {
      Bebida.create(vm.nueva)
        .then(ok, showErrors)

      function ok() {
        vm.listaBebidas.push(vm.nueva)
        vm.clearForm()
      }
    }

    function removeBebida(bebida) {
      bebida.remove()
        .then(ok, showErrors)

      function ok() {
        _.remove(vm.listaBebidas, function(b) {
          return b === bebida
        })
      }
    }

    function dismissError(error) {
      _.remove(vm.errors, function(e) {
        return e === error
      })
    }

    function cargarListaBebidas() {
      Bebida.getList()
        .then(fillData, showErrors)

      function fillData(data) {
        vm.listaBebidas = data
      }
    }

    function showErrors(response) {
      $log.debug('there was an error')
      vm.errors.push(response)
    }

    function clearForm() {
      vm.nueva = {}
    }
  }
})()