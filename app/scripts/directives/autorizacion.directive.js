'use strict';
angular.module('lvpBusquedaProductosApp')
.directive('acceso', function(AutorizacionService){

    return {

        restrict : 'A',
        link : function(scope, element, attrs){

            var makeVisible = function(){

                element.removeClass('hidden');

            },
            makeHidden = function(){

                element.addClass('hidden');

            },
            determineVisibility = function(resetFirst){

                var result;
                if(resetFirst){
                    makeVisible();
                }

                result = AutorizacionService.autorizar(true, roles);

                if(result === 0){
                    makeVisible();
                }else{
                    makeHidden();
                }

            };

            var roles = attrs.acceso.split(',');

            if(roles.length > 0){

                determineVisibility(true);

            }

        }

    }

});
