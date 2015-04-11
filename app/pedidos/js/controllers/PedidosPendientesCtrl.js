(function () {
  'use strict'
  /*globals angular:false, _:false, moment:false*/
  angular
    .module('sbAdminApp')
    .controller('ListaPedidosPendientesController', ListaPedidosPendientesController)

  function ListaPedidosPendientesController (Pedido, notify, $log, $timeout, $interval, $q) {
    var vm = this
    vm.listaPedidos = []
    vm.listaPendientes = []

    vm.cargarPedidos = cargarPedidos
    vm.remove = remove
    vm.nextState = nextState
    vm.getTotal = getTotal

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
    $interval(vm.cargarPedidos, 5000)

    function nextState (i, pedido) {
      // var p = Restangular.copy(pedido)

      pedido.customGET('estado').then(ok, error)

      function ok (p) {
        // body...
        vm.cargarPedidos()
      }

      function error (res) {
        // body...
        notify('ok')
      }
    // body...
    }
    function getTotal (listaPedidos) {
      return _.map(listaPedidos, calcTotalPedido)
        .reduce(
          function (sum, n) {
            return sum + n
          }, 0
      )
    }

    function cargarPedidos () {
      Pedido.getPedidosPendientes().then(handlePedidos, handleError)

      function handlePedidos (data) {
        vm.listaPedidos = data
        _.each(vm.listaPedidos,
          function (pedido) {
            pedido.total = calcTotalPedido(pedido)
            pedido.tiempo = moment(pedido.fecha)
            if (pedido.tiempo.add(30, 'm').isBefore(moment())) {
              pedido.alerta = true
            } else {
              pedido.alerta = false
            }
          })

      }

      function handleError (argument) {
        notify('error')
      }
    }

    function calcTotalPedido (pedido) {
      return _.map(pedido.items, function (item) {
        return +item.producto.precio * item.cantidad
      }).reduce(function (sum, n) {return sum + n}, 0)
    }
  }
})()
