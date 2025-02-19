import { socketConnection } from "@/common/socket";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setNotificationData } from "../reducers/user-info/depositSlice";
import { connect } from "../reducers/websocket";

// let socket: Socket<ServerToClientListen, ClientToServerListen>;

// export const webSocketMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     const webSocketState: IWebsocketState = store.getState().websocket;
//     if (webSocketState.connect === typeConnect.Disconnected && !socket) {
//     } else if (webSocketState.connect === typeConnect.Connected && socket) {
//       if (action.type === "game/bet") {
//       } else if (action.type === "game/cashout") {
//       }
//     }
//     next(action);
//   };

export const webSocketMiddleware = createListenerMiddleware();

webSocketMiddleware.startListening({
  actionCreator: connect,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    if (action.type === "websocket/connect") {
      socketConnection.ws.connect();
      socketConnection.ws
        .private(`App.User.${action.payload}`)
        .notification((notification: unknown) => {
          listenerApi.dispatch(setNotificationData(notification));
        });
    }

    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    // Run async logic
    //   const data = await fetchData()

    // Pause until action dispatched or state changed
    //   if (await listenerApi.condition(matchSomeAction)) {
    // Use the listener API methods to dispatch, get state,
    // unsubscribe the listener, start child tasks, and more
    // listenerApi.dispatch(todoAdded('Buy pet food'))

    // // Spawn "child tasks" that can do more work and return results
    // const task = listenerApi.fork(async (forkApi) => {
    //   // Can pause execution
    //   await forkApi.delay(5)
    //   // Complete the child by returning a value
    //   return 42
    // })

    // const result = await task.result
    // // Unwrap the child result in the listener
    // if (result.status === 'ok') {
    //   // Logs the `42` result value that was returned
    //   console.log('Child succeeded: ', result.value)
    // }
    //   }
  },
});
