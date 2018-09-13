/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 ************************************************************************************/

var catsg = 0;
var catrsg = 0;
var catsg_wsid = 0;
var catrsg_wsid = 0;

function MitigacionRiesgosetValueFromCapture(recordid, value, target_fieldname) {
    if (target_fieldname=='catsg') {
        catsg = recordid;
    }

    if (target_fieldname=='catrsg') {
        catrsg = recordid;
    }

    if(catsg !=0 && catrsg !=0) {
        var cbws = new cbWSClient('');
        cbws.extendSession();

        ExecuteFunctions('getModuleWebseriviceID','wsmodule=CatalogoSalvaGuarda').then(function(data) {
            catsg_wsid = data;

            ExecuteFunctions('getModuleWebseriviceID','wsmodule=CatalogoRiesgos').then(function(data) {
                catrsg_wsid = data;

                cbws.doQuery("select redprobabilidad, redimpacto from SalvaguardasRiesgos where catsg='"+catsg_wsid+'x'+catsg+"' and catrsg='"+catrsg_wsid+'x'+catrsg+"' limit 1")
                    .then(function (value) {
                        if (value.length > 0) {
                            var redprobabilidad = value[0]['redprobabilidad'];
                            var redimpacto = value[0]['redimpacto'];

                            if (document.EditView) {
                                if (document.EditView.redprobabilidad) {
                                    document.EditView.redprobabilidad.value = redprobabilidad;
                                }
                        
                                if (document.EditView.redimpacto) {
                                    document.EditView.redimpacto.value = redimpacto;
                                }
                            }
                        }
                    });
            });
        });
    }
}