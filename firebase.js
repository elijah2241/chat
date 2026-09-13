
  

  const firebaseConfig = {
  apiKey: "AIzaSyBAn20uJGpvswq0tI_vrh3mu_GamZj6DCI",
  authDomain: "global-chat-61d29.firebaseapp.com",
  databaseURL: "https://global-chat-61d29-default-rtdb.firebaseio.com",
  projectId: "global-chat-61d29",
  storageBucket: "global-chat-61d29.firebasestorage.app",
  messagingSenderId: "1002774370723",
  appId: "1:1002774370723:web:09c3d48abbccbec7b6e216",
  measurementId: "G-4Q42CLSPS3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const messagesRef = db.ref("messages");


function requestRefFor(userId) {
  return db.ref("messageRequests/" + userId);
}

function acceptedRefFor(userId) {
  return db.ref("acceptedUsers/" + userId);
}

function userRefFor(userId) {
  return db.ref("users/" + userId);
}

function getChatId(firstUser, secondUser) {
  return [firstUser, secondUser].sort().join("_");
}

