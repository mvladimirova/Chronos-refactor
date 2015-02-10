/**
 * Created by Marianna on 10-Feb-15.
 */
Chronos.module('Views', function(Views, Chronos, Backbone, Marionette, $, _){
    'use strict';

    Views.HeaderView = Marionette.ItemView.extend({
        template: '#header-template'
    });
});