/* =======================================================
   PRIVATE MESSAGE ELEMENTS
   ======================================================= */

const requestsList =
  document.getElementById("requestsList");

const requestBadge =
  document.getElementById("requestBadge");

const acceptedChats =
  document.getElementById("acceptedChats");

const privatePartner =
  document.getElementById("privatePartner");

const privateUserIdInput =
  document.getElementById("privateUserId");

const openPrivateChatButton =
  document.getElementById("openPrivateChat");

const privateMessages =
  document.getElementById("privateMessages");

const privateMessageInput =
  document.getElementById("privateMessage");

const sendPrivateButton =
  document.getElementById("sendPrivate");

const deleteChatButton =
  document.getElementById("deleteChatButton");


/*
   IMPORTANT:
   These names are different from menustuff.js
   so they do not conflict with its const declarations.
*/

const privateMessageContainer =
  document.getElementById("privateContainer");

const privateRequestContainer =
  document.getElementById("requestContainer");


/* =======================================================
   PRIVATE MESSAGE VARIABLES
   ======================================================= */

let requestCount = 0;

let privateUserId = null;

let privateUserName = null;

let privateChatRef = null;

let privateListener = null;

let privateProfileListener = null;


/* =======================================================
   CREATE PRIVATE PROFILE PICTURE
   ======================================================= */

function createPrivateProfilePicture(
  userId,
  name
) {

  const container =
    document.createElement("div");

  container.className =
    "privateMessageProfilePicture";

  if (userId) {

    container.dataset.profilePictureUser =
      userId;

  }


  if (
    typeof window.getProfilePicture ===
    "function"
  ) {

    window.getProfilePicture(userId)
      .then(function(profilePicture) {

        renderPrivateProfilePicture(
          container,
          profilePicture,
          name
        );

      })
      .catch(function(error) {

        console.error(
          "Could not load private profile picture:",
          error
        );

        container.textContent =
          "👤";

      });

  } else {

    container.textContent =
      "👤";

  }


  return container;

}


/* =======================================================
   RENDER PRIVATE PROFILE PICTURE
   ======================================================= */

function renderPrivateProfilePicture(
  container,
  profilePicture,
  name
) {

  container.innerHTML =
    "";

  if (profilePicture) {

    const img =
      document.createElement("img");

    img.src =
      profilePicture;

    img.alt =
      name ||
      "Profile picture";

    container.appendChild(
      img
    );

  } else {

    container.textContent =
      "👤";

  }

}


/* =======================================================
   CREATE ACCEPTED CONTACT
   ======================================================= */

function createAcceptedContact(
  otherUserId,
  otherName
) {

  const contactButton =
    document.createElement("button");

  contactButton.className =
    "acceptedChatUser";

  contactButton.title =
    otherUserId;

  contactButton.dataset.userId =
    otherUserId;


  const profilePicture =
    createPrivateProfilePicture(
      otherUserId,
      otherName
    );

  contactButton.appendChild(
    profilePicture
  );


  const contactName =
    document.createElement("span");

  contactName.className =
    "acceptedChatUserName";

  contactName.textContent =
    otherName;

  contactButton.appendChild(
    contactName
  );


  userRefFor(
    otherUserId
  ).on(
    "value",
    function(snapshot) {

      const data =
        snapshot.val() || {};

      contactName.textContent =
        data.name ||
        "Unknown User";

    },
    function(error) {

      console.error(
        "Could not listen to contact profile:",
        error
      );

    }
  );


  contactButton.addEventListener(
    "click",
    function() {

      openPrivateChatWithUser(
        otherUserId
      );

    }
  );


  return contactButton;

}


/* =======================================================
   FORMAT PRIVATE MESSAGE TIME
   ======================================================= */

function formatPrivateMessageTime(
  timestamp
) {

  if (!timestamp) {
    return "";
  }

  const date =
    new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString(
    undefined,
    {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


/* =======================================================
   REQUEST BADGE
   ======================================================= */

function updateRequestBadge() {

  if (!requestBadge) {
    return;
  }

  requestBadge.textContent =
    requestCount;

  if (requestCount > 0) {

    requestBadge.style.display =
      "inline-block";

  } else {

    requestBadge.style.display =
      "none";

  }

}


/* =======================================================
   ADD REQUEST TO SCREEN
   ======================================================= */

function addRequestToScreen(
  requestId,
  senderId
) {

  if (!requestsList) {
    return;
  }

  const requestElement =
    document.createElement("div");

  requestElement.className =
    "requestItem";

  requestElement.dataset.requestId =
    requestId;


  const userSpan =
    document.createElement("span");

  userSpan.className =
    "requestUser";

  userSpan.textContent =
    "User ID: " +
    senderId;


  const acceptButton =
    document.createElement("button");

  acceptButton.className =
    "requestButton acceptRequest";

  acceptButton.textContent =
    "Accept";


  const declineButton =
    document.createElement("button");

  declineButton.className =
    "requestButton declineRequest";

  declineButton.textContent =
    "Decline";


  requestElement.appendChild(
    userSpan
  );

  requestElement.appendChild(
    acceptButton
  );

  requestElement.appendChild(
    declineButton
  );


  acceptButton.addEventListener(
    "click",
    function() {

      acceptRequest(
        requestId,
        senderId
      );

    }
  );


  declineButton.addEventListener(
    "click",
    function() {

      declineRequest(
        requestId
      );

    }
  );


  requestsList.appendChild(
    requestElement
  );

}


/* =======================================================
   ACCEPT REQUEST
   ======================================================= */

function acceptRequest(
  requestId,
  senderId
) {

  const updates = {};


  updates[
    "messageRequests/" +
    window.userId +
    "/" +
    requestId
  ] = null;


  updates[
    "acceptedUsers/" +
    window.userId +
    "/" +
    senderId
  ] = true;


  updates[
    "acceptedUsers/" +
    senderId +
    "/" +
    window.userId
  ] = true;


  db.ref()
    .update(updates)
    .then(function() {

      openPrivateChatWithUser(
        senderId
      );

    })
    .catch(function(error) {

      console.error(
        "Could not accept request:",
        error
      );

      alert(
        "Could not accept request: " +
        error.message
      );

    });

}


/* =======================================================
   DECLINE REQUEST
   ======================================================= */

function declineRequest(
  requestId
) {

  requestRefFor(
    window.userId
  )
    .child(requestId)
    .remove()
    .catch(function(error) {

      console.error(
        "Could not decline request:",
        error
      );

    });

}


/* =======================================================
   LISTEN FOR REQUESTS
   ======================================================= */

function listenForRequests() {

  if (!window.userId) {
    return;
  }


  requestRefFor(
    window.userId
  ).on(
    "child_added",
    function(snapshot) {

      if (!requestsList) {
        return;
      }


      const existing =
        requestsList.querySelector(
          '[data-request-id="' +
          CSS.escape(snapshot.key) +
          '"]'
        );


      if (existing) {
        return;
      }


      const data =
        snapshot.val();


      if (
        !data ||
        !data.sender
      ) {

        return;

      }


      addRequestToScreen(
        snapshot.key,
        data.sender
      );


      requestCount++;

      updateRequestBadge();

    },
    function(error) {

      console.error(
        "Could not listen for requests:",
        error
      );

    }
  );


  requestRefFor(
    window.userId
  ).on(
    "child_removed",
    function(snapshot) {

      if (!requestsList) {
        return;
      }


      const element =
        requestsList.querySelector(
          '[data-request-id="' +
          CSS.escape(snapshot.key) +
          '"]'
        );


      if (!element) {
        return;
      }


      element.remove();


      requestCount--;

      if (requestCount < 0) {
        requestCount = 0;
      }


      updateRequestBadge();

    },
    function(error) {

      console.error(
        "Could not listen for removed requests:",
        error
      );

    }
  );

}


/* =======================================================
   LOAD ACCEPTED CHATS
   ======================================================= */

function loadAcceptedChats() {

  if (
    !window.userId ||
    !acceptedChats
  ) {

    return;

  }


  acceptedRefFor(
    window.userId
  ).on(
    "value",
    function(snapshot) {

      acceptedChats.innerHTML =
        "";


      const users =
        snapshot.val() || {};


      Object.keys(users)
        .forEach(function(otherUserId) {

          userRefFor(
            otherUserId
          ).once(
            "value"
          )
          .then(function(userSnapshot) {

            const data =
              userSnapshot.val() || {};


            const otherName =
              data.name ||
              "Unknown User";


            if (
              acceptedChats.querySelector(
                '[data-user-id="' +
                CSS.escape(otherUserId) +
                '"]'
              )
            ) {

              return;

            }


            const contactButton =
              createAcceptedContact(
                otherUserId,
                otherName
              );


            acceptedChats.appendChild(
              contactButton
            );

          })
          .catch(function(error) {

            console.error(
              "Could not load contact:",
              error
            );

          });

        });

    },
    function(error) {

      console.error(
        "Could not load accepted contacts:",
        error
      );

    }
  );

}


/* =======================================================
   OPEN PRIVATE CHAT
   ======================================================= */

function openPrivateChatWithUser(
  otherUserId
) {

  if (!otherUserId) {
    return;
  }


  if (
    otherUserId ===
    window.userId
  ) {

    alert(
      "You cannot message yourself."
    );

    return;

  }


  acceptedRefFor(
    window.userId
  )
    .child(otherUserId)
    .once("value")
    .then(function(snapshot) {

      if (!snapshot.exists()) {

        alert(
          "This user is not in your contacts."
        );

        return null;

      }


      return userRefFor(
        otherUserId
      ).once("value");

    })
    .then(function(userSnapshot) {

      if (!userSnapshot) {
        return;
      }


      const userData =
        userSnapshot.val() || {};


      const oldPrivateUserId =
        privateUserId;


      const oldPrivateChatRef =
        privateChatRef;


      if (
        privateListener &&
        oldPrivateChatRef
      ) {

        oldPrivateChatRef.off(
          "child_added",
          privateListener
        );

      }


      if (
        privateProfileListener &&
        oldPrivateUserId
      ) {

        userRefFor(
          oldPrivateUserId
        ).off(
          "value",
          privateProfileListener
        );

      }


      privateUserId =
        otherUserId;

      privateUserName =
        userData.name ||
        "Unknown User";


      const chatId =
        getChatId(
          window.userId,
          privateUserId
        );


      privateChatRef =
        db.ref(
          "privateMessages/" +
          chatId
        );


      if (privateMessages) {

        privateMessages.innerHTML =
          "";

      }


      if (privatePartner) {

        privatePartner.textContent =
          "Private Chat: " +
          privateUserName;

      }


      if (deleteChatButton) {

        deleteChatButton.style.display =
          "block";

      }


      privateProfileListener =
        function(profileSnapshot) {

          if (
            privateUserId !==
            otherUserId
          ) {

            return;

          }


          const profile =
            profileSnapshot.val() || {};


          privateUserName =
            profile.name ||
            "Unknown User";


          if (privatePartner) {

            privatePartner.textContent =
              "Private Chat: " +
              privateUserName;

          }

        };


      userRefFor(
        otherUserId
      ).on(
        "value",
        privateProfileListener
      );


      privateListener =
        function(snapshot) {

          const data =
            snapshot.val();


          if (!data) {
            return;
          }


          if (!privateMessages) {
            return;
          }


          if (
            privateMessages.querySelector(
              '[data-message-id="' +
              CSS.escape(snapshot.key) +
              '"]'
            )
          ) {

            return;

          }


          const messageRow =
            document.createElement("div");

          messageRow.className =
            "privateMessageRow";

          messageRow.dataset.messageId =
            snapshot.key;


          const senderId =
            data.sender;


          const senderName =
            data.sender ===
            window.userId
              ? "You"
              : privateUserName;


          const profilePicture =
            createPrivateProfilePicture(
              senderId,
              senderName
            );


          messageRow.appendChild(
            profilePicture
          );


          const messageText =
            document.createElement("span");

          messageText.className =
            "privateMessageText";

          messageText.textContent =
            senderName +
            ": " +
            (data.message || "");


          messageRow.appendChild(
            messageText
          );


          const messageTime =
            document.createElement("span");

          messageTime.className =
            "privateMessageTime";

          messageTime.textContent =
            formatPrivateMessageTime(
              data.time
            );


          messageRow.appendChild(
            messageTime
          );


          if (
            data.sender ===
            window.userId
          ) {

            const deleteButton =
              document.createElement("button");

            deleteButton.className =
              "deletePrivateMessage";

            deleteButton.textContent =
              "Delete";


            deleteButton.addEventListener(
              "click",
              function() {

                deletePrivateMessage(
                  snapshot.key
                );

              }
            );


            messageRow.appendChild(
              deleteButton
            );

          }


          privateMessages.appendChild(
            messageRow
          );


          privateMessages.scrollTop =
            privateMessages.scrollHeight;

        };


      privateChatRef.on(
        "child_added",
        privateListener,
        function(error) {

          console.error(
            "Could not listen to private messages:",
            error
          );

        }
      );


      /*
         IMPORTANT:
         Use the renamed variable here.
      */

      if (privateMessageContainer) {

        privateMessageContainer.style.display =
          "block";

      }


      /*
         IMPORTANT:
         Use the renamed variable here.
      */

      if (privateRequestContainer) {

        privateRequestContainer.style.display =
          "none";

      }

    })
    .catch(function(error) {

      console.error(
        "Could not open private chat:",
        error
      );

      alert(
        "Could not open private chat: " +
        error.message
      );

    });

}


/* =======================================================
   DELETE PRIVATE MESSAGE
   ======================================================= */

function deletePrivateMessage(
  messageId
) {

  if (
    !privateChatRef ||
    !messageId
  ) {

    return;

  }


  const messageRef =
    privateChatRef.child(
      messageId
    );


  messageRef
    .once("value")
    .then(function(snapshot) {

      const data =
        snapshot.val();


      if (!data) {
        return null;
      }


      if (
        data.sender !==
        window.userId
      ) {

        alert(
          "You can only delete your own messages."
        );

        return null;

      }


      return messageRef.remove();

    })
    .then(function() {

      if (!privateMessages) {
        return;
      }


      const messageElement =
        privateMessages.querySelector(
          '[data-message-id="' +
          CSS.escape(messageId) +
          '"]'
        );


      if (messageElement) {

        messageElement.remove();

      }

    })
    .catch(function(error) {

      console.error(
        "Could not delete message:",
        error
      );

    });

}


/* =======================================================
   DELETE CHAT
   ======================================================= */

if (deleteChatButton) {

  deleteChatButton.addEventListener(
    "click",
    function() {

      if (!privateUserId) {
        return;
      }


      if (
        !confirm(
          "Are you sure you want to delete this chat?"
        )
      ) {

        return;

      }


      const deletedUserId =
        privateUserId;


      acceptedRefFor(
        window.userId
      )
        .child(deletedUserId)
        .remove()
        .then(function() {

          if (
            privateListener &&
            privateChatRef
          ) {

            privateChatRef.off(
              "child_added",
              privateListener
            );

          }


          if (
            privateProfileListener
          ) {

            userRefFor(
              deletedUserId
            ).off(
              "value",
              privateProfileListener
            );

          }


          privateUserId =
            null;

          privateUserName =
            null;

          privateChatRef =
            null;

          privateListener =
            null;

          privateProfileListener =
            null;


          if (privateMessages) {

            privateMessages.innerHTML =
              "";

          }


          if (privatePartner) {

            privatePartner.textContent =
              "Private Chat";

          }


          deleteChatButton.style.display =
            "none";


          if (privateMessageContainer) {

            privateMessageContainer.style.display =
              "none";

          }

        })
        .catch(function(error) {

          console.error(
            "Could not delete chat:",
            error
          );

          alert(
            "Could not delete chat: " +
            error.message
          );

        });

    }
  );

}


/* =======================================================
   SEND MESSAGE REQUEST
   ======================================================= */

function sendMessageRequest(
  receiverId
) {

  if (
    typeof receiverId !==
    "string"
  ) {

    console.error(
      "sendMessageRequest received invalid receiverId:",
      receiverId
    );

    return;

  }


  receiverId =
    receiverId.trim();


  if (!receiverId) {
    return;
  }


  if (
    receiverId ===
    window.userId
  ) {

    alert(
      "You cannot send yourself a request."
    );

    return;

  }


  /*
     Check if already connected.
  */

  return acceptedRefFor(
    window.userId
  )
    .child(receiverId)
    .once("value")
    .then(function(acceptedSnapshot) {

      if (
        acceptedSnapshot.exists()
      ) {

        openPrivateChatWithUser(
          receiverId
        );

        return null;

      }


      /*
         Check whether request already exists.
      */

      return requestRefFor(
        receiverId
      ).once("value");

    })
    .then(function(snapshot) {

      if (!snapshot) {
        return;
      }


      let alreadyRequested =
        false;


      snapshot.forEach(
        function(child) {

          const request =
            child.val();


          if (
            request &&
            request.sender ===
            window.userId
          ) {

            alreadyRequested =
              true;

          }

        }
      );


      if (alreadyRequested) {

        alert(
          "Request already sent."
        );

        return;

      }


      /*
         Send request.
      */

      return requestRefFor(
        receiverId
      )
        .push({

          sender:
            window.userId,

          time:
            firebase.database.ServerValue.TIMESTAMP

        })
        .then(function() {

          alert(
            "Message request sent."
          );

        });

    })
    .catch(function(error) {

      console.error(
        "Could not send message request:",
        error
      );

      alert(
        "Could not send message request: " +
        error.message
      );

    });

}


/* =======================================================
   GLOBAL EXPORT
   ======================================================= */

window.sendMessageRequest =
  sendMessageRequest;


/* =======================================================
   OPEN PRIVATE CHAT / SEND REQUEST
   ======================================================= */

function handlePrivateChatButton() {

  if (!privateUserIdInput) {
    return;
  }


  const receiverId =
    privateUserIdInput.value.trim();


  if (!receiverId) {
    return;
  }


  if (
    receiverId ===
    window.userId
  ) {

    alert(
      "You cannot message yourself."
    );

    return;

  }


  acceptedRefFor(
    window.userId
  )
    .child(receiverId)
    .once("value")
    .then(function(snapshot) {

      if (
        snapshot.exists()
      ) {

        openPrivateChatWithUser(
          receiverId
        );

      } else {

        window.sendMessageRequest(
          receiverId
        );

      }

    })
    .catch(function(error) {

      console.error(
        "Could not check contact:",
        error
      );

    });

}


if (openPrivateChatButton) {

  openPrivateChatButton.addEventListener(
    "click",
    handlePrivateChatButton
  );

}


/* =======================================================
   SEND PRIVATE MESSAGE
   ======================================================= */

function sendPrivateMessage() {

  if (
    !privateChatRef ||
    !privateUserId
  ) {

    return;

  }


  if (!privateMessageInput) {
    return;
  }


  const message =
    privateMessageInput.value.trim();


  if (!message) {
    return;
  }


  privateChatRef
    .push({

      sender:
        window.userId,

      receiver:
        privateUserId,

      message:
        message,

      time:
        firebase.database.ServerValue.TIMESTAMP

    })
    .then(function() {

      privateMessageInput.value =
        "";

    })
    .catch(function(error) {

      console.error(
        "Could not send private message:",
        error
      );

      alert(
        "Could not send private message: " +
        error.message
      );

    });

}


if (sendPrivateButton) {

  sendPrivateButton.addEventListener(
    "click",
    sendPrivateMessage
  );

}


if (privateMessageInput) {

  privateMessageInput.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key ===
        "Enter"
      ) {

        event.preventDefault();

        sendPrivateMessage();

      }

    }
  );

}


/* =======================================================
   START PRIVATE MESSAGING
   ======================================================= */

if (window.userId) {

  listenForRequests();

  loadAcceptedChats();

}


/* =======================================================
   FINAL GLOBAL EXPORTS
   ======================================================= */

window.sendMessageRequest =
  sendMessageRequest;

window.openPrivateChatWithUser =
  openPrivateChatWithUser;

window.acceptRequest =
  acceptRequest;

window.declineRequest =
  declineRequest;