/**
 * Created by Marianna on 10-Feb-15.
 */
var Chronos = new Marionette.Application();

Chronos.addRegions({
    header: '#header'
    //calendar: '#calendar'
});

//Chronos.start();

Chronos.on('start', function(){
    var headerView = new Chronos.Views.HeaderView({});
    Chronos.header.show(headerView);
});