(function(){
  "use strict"
  //in this function we will pass data object and salesfores_account_id (i.e.user account?)
  //name and value and sign i.e: $ or %
  function MetricsOperational(data){
    var self = this;
    self.operational_name = ko.observable(data.name);
    self.operational_value = ko.observable(data.value);
    self.sign = ko.observable(data.sign);

    self.formattedValue = ko.computed(function(){
      var val = self.operational_value();
      if(self.sign() === "%"){
        return  val.toFixed(2)+ self.sign();
      }
      else{
        return  self.sign() + val.toFixed(2);
      }
    });
  }

  function MetricsSatisfaction(data){
    self.satisfaction_value = ko.observable(data.satisfaction_value);
    self.satisfaction_description = ko.observable(data.satisfaction_description);
  }

  //we can pass date that will have id, title,owner,description
  function Process(data){
    var self = this;
    self.id = ko.observable(data.id);
    self.title = ko.observable(data.title);
    self.owner = ko.observable(data.owner);
    self.operational_description = ko.observable(data.operational_description);
    self.operational_metrcis = ko.observableArray([]);
    self.satisfaction_metrics = ko.observableArray([]);

    //we should pass metric object from the form
    self.addOpMetric = function(){
     var metric = new MetricsOperational(metricData2);
      self.operational_metrcis.push(metric);
      //add logic to insert it to database and display updated vew on the screen
    };
    self.removeOpMetric = function(metric){
      self.operational_metrcis.destroy(metric);
      self.operational_metrcis.remove(metric);
    };

    //we should pass metric object from the form
    self.addSatMetric = function(){
     var metric = new MetricsSatisfaction(satisfaction_metric2);
      self.satisfaction_metrics.push(metric);
      //add logic to insert it to database and display updated vew on the screen
    };
    self.removeSatMetric = function(metric){
      self.satisfaction_metrics.destroy(metric);
      self.satisfaction_metrics.remove(metric);
    };


  }
  //we will create model instead of data objects?
  var metricData1 = {
    name:"# of obsolete asssets",
    value: 20,
    sign:"%"
  };
  var metricData2 = {
    name:"# of obsolete asssets",
    value: 20,
    sign:"%"
  };

  var satisfaction_metric1 = {
    satisfaction_description:"Lorem ipsum dolor sit amet",
    satisfaction_value: 0.8
  }
  var satisfaction_metric2 = {
    satisfaction_description:"Lorem ipsum dolor sit amet",
    satisfaction_value: 0.6
  }

  var processData = {
    id: "ABC",
    operational_description: "Lorem ipsum dolor sit amet, qui putant dolorum torquatos ei,eos ut dico solum putant. Ea vel dolores argumentum. ",
    owner: "John Smith",
    title: "Availability and Capacity Management",
  };

  var m = new MetricsOperational(metricData1);

  var s = new MetricsSatisfaction(satisfaction_metric1);
  var process = new Process(processData);

  process.operational_metrcis.push(m)
  process.satisfaction_metrics.push(s)
  ko.applyBindings(process);
})();
