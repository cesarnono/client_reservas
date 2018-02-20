var app = new Vue({
  el: '#app',
  data:{
       tabActiva : 'tbinicio',
       listaVuelos :[],
       listaTarifaVuelos : [],
       ciudadOrigen: '',
       ciudadDestino:'',
       fechaVuelo :''
  },
  methods:{
     initConsultaVuelos:function(){
       var self = app;
       $.ajax({
         url: 'http://localhost:8080/tarifas',
         type: 'GET'
       })
       .done(function(data) {
         console.log("success");
         self.listaTarifaVuelos = data;
       })
       .fail(function() {
         console.log("error");
       })
       .always(function() {
         console.log("termino initConsultaVuelos");
       });

     },
     consultarVuelos: function(){
        var self = app;
        $.ajax({
          url: 'http://localhost:8080/consultarvuelos',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({"fecha":self.fechaVuelo, "tarifaVuelo":{ "ciudadOrigen": self.ciudadOrigen, "ciudadDestino": self.ciudadDestino } })
        })
        .done(function(data) {
          self.listaVuelos = data;
          console.log("success");
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete consultarVuelos");
        });

     }
  }
});
