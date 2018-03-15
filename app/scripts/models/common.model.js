'use strict';
angular.module('lvpBusquedaProductosApp')
.service('CommonModel',function () {

    this.getDiasFhNacimiento = function(){

        var dias = [];
        var dia = 1;

        dias.push({valor : "", descripcion : "Día"})

        while(dia <= 31){

            var nObjDia = { valor : "", descripcion : "" };

            if(dia < 10){
                nObjDia.valor = "0" + dia;
                nObjDia.descripcion = "0" + dia;
                dias.push(nObjDia);
            }else{
                nObjDia.valor = dia + "";
                nObjDia.descripcion = dia + "";
                dias.push(nObjDia);
            }

            dia = dia + 1;

        }

        return dias;

    }

    this.getMesesFhNacimiento = function(){

        var meses = [
            {valor : "", descripcion : "Mes"},
            {valor : "01", descripcion : "Enero"},
            {valor : "02", descripcion : "Febrero"},
            {valor : "03", descripcion : "Marzo"},
            {valor : "04", descripcion : "Abril"},
            {valor : "05", descripcion : "Mayo"},
            {valor : "06", descripcion : "Junio"},
            {valor : "07", descripcion : "Julio"},
            {valor : "08", descripcion : "Agosto"},
            {valor : "09", descripcion : "Septiembre"},
            {valor : "10", descripcion : "Octubre"},
            {valor : "11", descripcion : "Noviembre"},
            {valor : "12", descripcion : "Diciembre"}
        ];

        return meses;

    }


    this.getAniosFhNacimiento = function(){

        var anios = [];
        var anioMax = 1;
        var anioActual = (new Date().getFullYear() + 1) - 18;

        anios.push({valor : "", descripcion : "Año"})

        while(anioMax <= 65){

            var anioActual = anioActual - 1;

            var nObjAnio = { valor : anioActual, descripcion : anioActual };
            anios.push(nObjAnio);

            anioMax = anioMax + 1;

        }

        return anios;

    }


    this.getAniosFhConstitucion = function(){

        var anios = [];
        var anioMax = 1;
        var anioActual = new Date().getFullYear() + 1;

        anios.push({valor : "", descripcion : "Año"})

        while(anioMax <= 200){

            var anioActual = anioActual - 1;

            var nObjAnio = { valor : anioActual, descripcion : anioActual };
            anios.push(nObjAnio);

            anioMax = anioMax + 1;

        }

        return anios;

    }


    this.getVigenciasCotizacion = function(){

        var vigencias = [
            {
                descripcion : "Selecciona una opción",
                valor : ''
            },
            {
                valor : "ANU",
                descripcion : "Anual"
            },
            {
                valor : "SEM",
                descripcion : "Semestral"
            }
        ];

        return vigencias;

    }


});
