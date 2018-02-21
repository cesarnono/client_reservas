var app = new Vue({
  el: '#app',
  data:{
       tabActiva : 'tbinicio',
       tabSecActiva:'tab_reg_reserva',
       listaVuelos :[],
       listaTarifaVuelos : [],
       ciudadOrigen: '',
       ciudadDestino:'',
       fechaVuelo :'',
       nuevoUsuario:{},
       mensajeProceso : "",
       usuarioConsulta :{},
       identificacionUsuarioBusqueda: "",
       vueloReserva :{},
       mensajeProcesoReserva:"",
       reservasUsuario:[]
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
     },
     registrarUsuario : function(){
       var self = app;
       $.ajax({
         url: 'http://localhost:8080/regusuario',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(self.nuevoUsuario)
       })
       .done(function() {
        self.mensajeProceso = "Ha sido registrado con exito!";
        self.nuevoUsuario = {};
         console.log("success registrarUsuario");
       })
       .fail(function() {
         console.log("error");
       })
       .always(function() {
         console.log("complete registrarUsuario");
       });
     },
     consultarUsuario: function(){
       var self = app;

       self.mensajeProceso ="";
       $.ajax({
         url: 'http://localhost:8080/consultausuario',
         type: 'GET',
         data: {"identificacion" : self.identificacionUsuarioBusqueda}
       })
       .done(function(data) {
        self.usuarioConsulta =data;
        self.mensajeProceso = data.nombreCompleto ? "" : "No se encontro registro. Puede hacerlo en la pestaña Nuevo Usuario";
        console.log("success consultarUsuario");
       })
       .fail(function() {
         console.log("error");
       })
       .always(function() {
         console.log("complete consultarUsuario");
       });
     },
     registrarReserva: function(){
       var self = app;
       self.mensajeProcesoReserva="";
       if(confirm("Esta seguro hacer la reserva?")){
         $.ajax({
           url: 'http://localhost:8080/reserva',
           type: 'POST',
           contentType: 'application/json',
           data: JSON.stringify({"usuario":self.usuarioConsulta, "vuelo": {"id":self.vueloReserva.id}})
         })
         .done(function() {
           self.usuarioConsulta ={};
           self.mensajeProcesoReserva = "La reserva sido registrada con exito!";
           console.log("success registrarReserva");
         })
         .fail(function() {
           console.log("error");
         })
         .always(function() {
           console.log("complete registrarReserva");
         });
       }

     },
     limpiar:function(){
       this.mensajeProceso = "";
       this.mensajeProcesoReserva= "";
     },

     consultarReservas: function(){
       var self = app;
       $.ajax({
         url: 'http://localhost:8080/consultareservas',
         type: 'GET',
         data: {"identificacion" : self.identificacionUsuarioBusqueda}
       })
       .done(function(data) {
        self.reservasUsuario =data;
        //self.mensajeProceso = data.length>0 ? "" : "No se encontro registros de reservas de vuelo.";
        console.log("success consultarUsuario");
       })
       .fail(function() {
         console.log("error");
       })
       .always(function() {
         console.log("complete consultarUsuario");
       });
     }
  }
});
