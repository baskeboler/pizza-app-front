(function() {
  'use strict'
  /*globals angular:false, _:false*/
  angular.module('sbAdminApp')
    .controller('BebidasController', BebidasCtrl)
  BebidasCtrl.$inject = ['$log', 'Bebida', '$timeout', '$modal', 'notify', 'ConfirmDialog']

  function BebidasCtrl($log, Bebida, $timeout, $modal, notify, ConfirmDialog) {
    var vm = this;
    vm.title = 'Bebidas';
    vm.nueva = {};
    vm.listaBebidas = null;
    vm.errors = [];
    vm.page = null;
    vm.currentPage = 1;
    vm.pageSize = 5;
    vm.crearBebida = crearBebida;
    vm.cargarLista = cargarListaBebidas;
    vm.dismissError = dismissError;
    vm.remove = removeBebida;
    vm.abrirModalCrearBebida = abrirModalCrearBebida;
    vm.pageChanged = pageChanged;

    $timeout(cargarListaBebidas, 1000)

    function pageChanged() {
      // body...
      vm.listaBebidas = null;
      $timeout(cargarListaBebidas, 500);
    }

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
      var doit = ConfirmDialog.confirm('Eliminar Bebida', 'Eliminar ' + bebida.nombre + '?');
      doit.result.then(ok);

      function ok() {
        // body...
        bebida.remove()
          .then(ok, showErrors)

        function ok() {
          _.remove(vm.listaBebidas, function(b) {
            return b === bebida
          })
        }
      }
    }

    function dismissError(error) {
      _.remove(vm.errors, function(e) {
        return e === error
      })
    }

    function cargarListaBebidas() {
      Bebida.getList({
          page: vm.currentPage - 1,
          size: vm.pageSize
        })
        .then(fillData, showErrors)

      function fillData(data) {
        $log.debug('[fillData] data received.')
        $log.debug(data);
        vm.listaBebidas = data;
        vm.page = data.page;
        vm.currentPage = vm.page.number + 1;
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