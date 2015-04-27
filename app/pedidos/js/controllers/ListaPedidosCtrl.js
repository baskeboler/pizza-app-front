(function () {
  'use strict'
  /*globals angular:false, _:false, moment:false*/
  angular
    .module('sbAdminApp')
    .controller('ListaPedidosController', ListaPedidosController)
  function ListaPedidosController (Pedido, notify, $log, $timeout, $scope, $modal) {
    var vm = this
    vm.listaPedidos = []
    vm.cargarPedidos = cargarPedidos
    vm.updatePedidos = updatePedidos
    vm.setFilterFecha = setFilterFecha
    vm.getTotal = getTotal
    vm.nextState = nextState
    vm.remove = remove
    vm.verPedido = verPedido

    function verPedido (pedido) {
      var modal = $modal.open({
        templateUrl: '/pedidos/views/modals/ver-pedido-modal.html',
        controller: 'VerPedidoModalInstanceController',
        controllerAs: 'vm',
        resolve: {
          pedido: function() {
            return pedido;
          } 
        }
      });

      modal.result.then(ok, cancel);
      function ok () {
        $log.debug('dialogo cerrado - ok');
      }
      function cancel () {
        $log.debug('dialogo cerrado - salir');
      }
    }
    function remove (p) {
      p.remove().then(ok, error)
      function ok (argument) {
        vm.cargarPedidos()
      }
      function error (argument) {
        // body...
      }
    }
    $timeout(vm.cargarPedidos, 1000)
    function updatePedidos () {
      if (vm.filtroFecha && vm.filtroFecha.trim() !== '') {
        vm.listaPedidos = vm.diario[vm.filtroFecha]
      } else {
        cargarPedidos()
      }
    }
    function nextState (i, pedido) {
      pedido.customGET('estado').then(ok, error)
      function ok (p) {
        // body...
        vm.cargarPedidos()
      }
      function error (res) {
        notify('ok')
      }
    }
    function getTotal (listaPedidos) {
      return _.map(listaPedidos, calcTotalPedido)
        .reduce(
          function (sum, n) {
            return sum + n
          }, 0
      )
    }
    function setFilterFecha (fechaStr) {
    }
    function stats (argument) {
      var a = Pedido.getPedidosPorClientes().then(ok, error)
      function ok (a) {
        $log.debug(a)
      }
      function error (argument) {
        // body...
        $log.debug('error() en stats')
        $log.debug(argument)
      }
    }
    stats()
    function cargarPedidos () {
      Pedido.getList().then(handlePedidos, handleError)
      function handlePedidos (data) {
        vm.listaPedidos = data
        _.each(vm.listaPedidos, function (pedido) {
          pedido.total = calcTotalPedido(pedido)
          $log.debug(pedido.total)
          pedido.tiempo = moment(pedido.fecha)
          if (pedido.tiempo.add(30, 'm').isBefore(moment())) {
            pedido.alerta = true
          } else {
            pedido.alerta = false
          }
        })
        vm.listaPedidos = _.filter(vm.listaPedidos, filtro)

        function filtro (elem) {
          if (!vm.filtrarCompletos) {return true;} else {
            return !elem.estado.completo
          }
        }

        vm.diario = _.groupBy(vm.listaPedidos, function (p) {
          return moment(p.fecha).format('YYYY-MM-DD')
        })

        vm.fechas = _.keys(vm.diario)
      }

      function handleError (argument) {
        // body...
        notify('error')
      }
    }
    $scope.$watch('vm.filtrarCompletos', function () {
      cargarPedidos()
    })
    function calcTotalPedido (pedido) {
      return _.map(pedido.items, function (item) {
        return +item.producto.precio * item.cantidad
      })
        .reduce(function (sum, n) {return sum + n}, 0)
    }
  }

})()
