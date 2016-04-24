'use strict';

angular.module('TripApp')
  .service('devices', function($http) {
    var devices = [];

    this.addPicture = function(idToAdd, photo){
      var deviceToAdd = getDeviceByID(idToAdd);
      if(!deviceToAdd){
        deviceToAdd = {};
        deviceToAdd.id = idToAdd;
      }

      if(typeof deviceToAdd.pictures === 'undefined'){
        deviceToAdd.pictures = [];
      }

      deviceToAdd.pictures.unshift(photo);
    };

    this.addFile = function(idToAdd, file) {
      var deviceToAdd = getDeviceByID(idToAdd);
      if(!deviceToAdd){
        deviceToAdd = {};
        deviceToAdd.id = idToAdd;
      }

      if(typeof deviceToAdd.files === 'undefined'){
        deviceToAdd.files = [];
      }

      deviceToAdd.files.unshift(file);
    };

    this.addDir = function(idToAdd, dir) {
      var deviceToAdd = getDeviceByID(idToAdd);
      if(!deviceToAdd){
        deviceToAdd = {};
        deviceToAdd.id = idToAdd;
      }

      if(typeof deviceToAdd.dirs === 'undefined'){
        deviceToAdd.dirs = [];
      }

      deviceToAdd.dirs.unshift(dir.dir);
    };

    this.changeFileExplorer = function(idToAdd, dirs, files, path) {
      var deviceToAdd = getDeviceByID(idToAdd);
      if(!deviceToAdd){
        deviceToAdd = {};
        deviceToAdd.id = idToAdd;
      }
      deviceToAdd.fileExplorer = {};

      deviceToAdd.fileExplorer.dirs = dirs.map(function(dir) { return dir.dir; });
      deviceToAdd.fileExplorer.files = files.map(function(file) { return file.path; });
      deviceToAdd.fileExplorer.path = path;

      return deviceToAdd.fileExplorer;
    };

    this.getPictures = function(idToSend){
      var device = getDeviceByID(idToSend);
      if(device) {
        if(device.pictures) {
          return device.pictures;
        }
      }
      return null;
    };

    this.setGpsLoc = function(idToAdd, gps) {
      var deviceToAdd = getDeviceByID(idToAdd);
      if(!deviceToAdd){
        deviceToAdd = {};
        deviceToAdd.id = idToAdd;
      }
      deviceToAdd.gps = gps;
    };

    /*this.getGpsLoc = function(idToSend) {
      var device = getDeviceByID(idToSend);
      if(device) {
        if(device.gps) {
          return device.gps;
        }
      }
      return null;
    };*/

    this.getDevices = function(){
      var httpreq = $http.get('/api/devices');
      httpreq.success(function(awesomeThings) {
        devices = syncNewDevices(awesomeThings);
      });
      return httpreq;
    };

    function syncNewDevices(awesomeThings){
      Object.keys(awesomeThings).forEach(function (key) {
        var tempDevice = getDeviceByID(awesomeThings[key].id);
        if(tempDevice){
          awesomeThings[key].pictures = tempDevice.pictures;
          awesomeThings[key].gps = tempDevice.gps;
          awesomeThings[key].files = tempDevice.files;
          awesomeThings[key].dirs = tempDevice.dirs;
          awesomeThings[key].fileExplorer = tempDevice.fileExplorer;
        }
      });
      return awesomeThings;
    }

    this.getDevice = function(id){
      return getDeviceByID(id);
    };

    this.updateDevices = function(newDevices){
      devices = syncNewDevices(newDevices);
    };

    function getDeviceByID(checkID){
      var device = null;
      Object.keys(devices).forEach(function (key) {
        if(devices[key].id === (checkID)){
          device = devices[key];
        }
      });
      return device;
    }
  });
