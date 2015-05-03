(function() {
  'use strict'
  angular
    .module('sbAdminApp')
    .factory('Pedido', Pedido)

  function Pedido(Restangular, $log, $q) {
    var Pedidos = Restangular.all('pedidos')
    var service = {
      getList: getList,
      create: create,
      nextState: nextState,
      getPedidosPorClientes: getPedidosPorClientes,
      getPedidosPendientes: getPedidosPendientes,
      get: get
    };

    return service;

    function get(idPedido) {
      return Restangular.one('pedidos', idPedido)
        .get();
    }

    function getPedidosPorClientes() {
      var deferred = $q.defer()
      Pedidos.getList()
        .then(process, error)

      function process(pedidos) {
        var a = _.groupBy(pedidos, function(p) {
          return p.cliente.nombre
        })
        a = _.map(a, function function_name(pedidos, mombre) {
          return {
            nombre: pedidos
          }
        })
        deferred.resolve(a)
      }

      function error(argument) {
        deferred.reject(argument)
      }
      return deferred.promise
    }

    function getPedidosPendientes() {
      return Pedidos.customGETLIST('search/obtenerPedidosPendientes')
    }

    function getList(params) {
      return Pedidos.getList(params)
    }

    function create(pedido) {
      return Pedidos.post(pedido)
    }

    function nextState(pedido) {
      return pedido.customGET('estado')
    }

  }
})()