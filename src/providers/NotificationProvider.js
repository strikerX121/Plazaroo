import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';


   class NotificationProvider {
       notificationfunction(massege,action_json,playerid,title)
         {
           console.log('player_id',playerid)
           console.log('player_id',action_json)
          let contents = {'en':massege};
          let data = {'action_json':action_json};
          
          // Make sure to send an String Array of playerIds
          let playerIds = [playerid];
          var other = {
            headings:{en:title},
            group: 10,
           priority: 10,
          };
          OneSignal.postNotification(contents,data, playerIds, other);
         }
         
    }

  export const notification = new NotificationProvider();
     